// TAGR Verify API — checks NFC code against Supabase

export async function handleVerifyAPI(request, env, corsHeaders) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code || typeof code !== 'string' || code.trim().length === 0) {
      return new Response(
        JSON.stringify({ valid: false, error: 'No code provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const sanitizedCode = code.trim().toUpperCase();

    const supabaseUrl = env.SUPABASE_URL;
    const supabaseKey = env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({ valid: false, error: 'Server configuration error' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Query Supabase REST API
    const queryUrl = `${supabaseUrl}/rest/v1/nfc_labels?select=*&code=eq.${encodeURIComponent(sanitizedCode)}&limit=1`;

    const supabaseRes = await fetch(queryUrl, {
      method: 'GET',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!supabaseRes.ok) {
      const errText = await supabaseRes.text();
      console.error('Supabase error:', errText);
      return new Response(
        JSON.stringify({ valid: false, error: 'Database query failed' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const data = await supabaseRes.json();

    if (data && data.length > 0) {
      const label = data[0];

      // Optional: update scan count and last_scanned_at
      await fetch(`${supabaseUrl}/rest/v1/nfc_labels?code=eq.${encodeURIComponent(sanitizedCode)}`, {
        method: 'PATCH',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          scan_count: (label.scan_count || 0) + 1,
          last_scanned_at: new Date().toISOString(),
        }),
      });

      return new Response(
        JSON.stringify({
          valid: true,
          code: sanitizedCode,
          product_name: label.product_name || null,
          manufacturer: label.manufacturer || null,
          issued_at: label.issued_at || null,
          serial_number: label.serial_number || null,
          manufactured_at: label.manufactured_at || null,
          scan_count: (label.scan_count || 0) + 1,
        }),
        { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    } else {
      return new Response(
        JSON.stringify({ valid: false, code: sanitizedCode }),
        { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }
  } catch (err) {
    console.error('Verify API error:', err);
    return new Response(
      JSON.stringify({ valid: false, error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
}
}
