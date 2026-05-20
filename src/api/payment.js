// TAGR Payment API — Midtrans Integration

export async function handlePaymentCreate(request, env, corsHeaders) {
  try {
    const authHeader = request.headers.get('Authorization') || '';
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    const body = await request.json();
    const { package_id, user_id } = body;

    const supabaseUrl = env.SUPABASE_URL;
    const supabaseKey = env.SUPABASE_ANON_KEY;
    const midtransServerKey = env.MIDTRANS_SERVER_KEY || '';
    const midtransClientKey = env.MIDTRANS_CLIENT_KEY || '';
    const midtransSandbox = env.MIDTRANS_SANDBOX !== 'false';

    // Get package
    const pkgRes = await fetch(`${supabaseUrl}/rest/v1/credit_packages?id=eq.${package_id}&limit=1`, {
      headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${token}` }
    });
    const pkgData = await pkgRes.json();
    if (!pkgData || !pkgData[0]) {
      return new Response(JSON.stringify({ error: 'Package not found' }), { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }
    const pkg = pkgData[0];

    // Get user profile
    const profileRes = await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${user_id}&limit=1`, {
      headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${token}` }
    });
    const profileData = await profileRes.json();
    if (!profileData || !profileData[0]) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }
    const profile = profileData[0];

    const orderId = 'TAGR-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    const totalCredits = pkg.credits + (pkg.bonus || 0);

    // Create Midtrans transaction
    const midtransBase = midtransSandbox
      ? 'https://app.sandbox.midtrans.com'
      : 'https://app.midtrans.com';

    const midtransAuth = btoa(midtransServerKey + ':');

    const snapRes = await fetch(`${midtransBase}/snap/v1/transactions`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${midtransAuth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transaction_details: {
          order_id: orderId,
          gross_amount: pkg.price
        },
        customer_details: {
          first_name: profile.full_name || 'User',
          email: profile.email,
          phone: profile.phone || '',
        },
        item_details: [{
          id: pkg.id,
          price: pkg.price,
          quantity: 1,
          name: `TAGR Credits - ${pkg.name} (${totalCredits} credits)`,
        }],
        callbacks: {
          finish: `${env.BASE_URL || 'https://tagr.irfanvegaibara.workers.dev'}/dashboard/topup?status=success`,
        }
      })
    });

    const snapData = await snapRes.json();

    if (!snapData.token) {
      console.error('Midtrans error:', JSON.stringify(snapData));
      return new Response(JSON.stringify({ error: 'Payment creation failed. Configure Midtrans keys.', detail: snapData }), {
        status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Save payment record
    await fetch(`${supabaseUrl}/rest/v1/payments`, {
      method: 'POST',
      headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
      body: JSON.stringify({
        user_id: user_id,
        package_id: package_id,
        midtrans_order_id: orderId,
        status: 'pending',
        amount: pkg.price,
        credits_amount: totalCredits,
        snap_token: snapData.token,
        expired_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      })
    });

    return new Response(JSON.stringify({
      snap_token: snapData.token,
      order_id: orderId,
      redirect_url: snapData.redirect_url,
      client_key: midtransClientKey,
      sandbox: midtransSandbox,
    }), { headers: { 'Content-Type': 'application/json', ...corsHeaders } });

  } catch (err) {
    console.error('Payment create error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

export async function handlePaymentCallback(request, env, corsHeaders) {
  try {
    const body = await request.json();
    const { order_id, transaction_status, fraud_status, gross_amount } = body;

    const supabaseUrl = env.SUPABASE_URL;
    const supabaseKey = env.SUPABASE_SERVICE_KEY || env.SUPABASE_ANON_KEY;

    let status = 'pending';
    if (transaction_status === 'capture' && fraud_status === 'accept') status = 'success';
    else if (transaction_status === 'settlement') status = 'success';
    else if (['deny', 'cancel', 'failure'].includes(transaction_status)) status = 'failed';
    else if (transaction_status === 'expire') status = 'expired';

    // Update payment
    const payRes = await fetch(`${supabaseUrl}/rest/v1/payments?midtrans_order_id=eq.${order_id}&limit=1`, {
      headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` }
    });
    const payData = await payRes.json();

    if (payData && payData[0]) {
      const payment = payData[0];
      await fetch(`${supabaseUrl}/rest/v1/payments?midtrans_order_id=eq.${order_id}`, {
        method: 'PATCH',
        headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}`, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
        body: JSON.stringify({ status, paid_at: status === 'success' ? new Date().toISOString() : null })
      });

      // Credit user on success
      if (status === 'success' && payment.status !== 'success') {
        const profileRes = await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${payment.user_id}&limit=1`, {
          headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` }
        });
        const profileData = await profileRes.json();
        if (profileData && profileData[0]) {
          const profile = profileData[0];
          const newCredits = (profile.credits || 0) + payment.credits_amount;
          await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${payment.user_id}`, {
            method: 'PATCH',
            headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}`, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
            body: JSON.stringify({ credits: newCredits })
          });
          await fetch(`${supabaseUrl}/rest/v1/credit_transactions`, {
            method: 'POST',
            headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}`, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
            body: JSON.stringify({
              user_id: payment.user_id,
              type: 'topup',
              amount: payment.credits_amount,
              balance_after: newCredits,
              description: `Top up ${payment.credits_amount} credits via Midtrans`,
              reference_id: order_id,
            })
          });
        }
      }
    }

    return new Response(JSON.stringify({ status: 'ok' }), { headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  } catch (err) {
    console.error('Payment callback error:', err);
    return new Response(JSON.stringify({ error: 'Callback error' }), { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  }
}
