// TAGR Worker — Main Router (self-contained, no shared.js dependency)

import { getLoginPage, getRegisterPage } from './pages/auth.js';
import { getDashboardPage } from './pages/dashboard.js';
import { getGeneratePage } from './pages/generate.js';
import { getTopupPage } from './pages/topup.js';
import { getOrdersPage } from './pages/orders.js';
import { getLabelsPage } from './pages/labels.js';
import { getAdminFullPage } from './pages/admin-full.js';
import { handleVerifyAPI } from './api/verify.js';
import { handlePaymentCreate, handlePaymentCallback } from './api/payment.js';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey',
};

function html(content, status = 200) {
  return new Response(content, { status, headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });

    if (path === '/' || path === '') {
      const { getLandingPage } = await import('./pages/landing.js');
      return html(getLandingPage());
    }
    if (path === '/verify') {
      const { getVerifyPage } = await import('./pages/verify.js');
      return html(getVerifyPage());
    }
    if (path === '/login')                return html(getLoginPage());
    if (path === '/register')             return html(getRegisterPage());
    if (path === '/dashboard')            return html(getDashboardPage());
    if (path === '/dashboard/generate')   return html(getGeneratePage());
    if (path === '/dashboard/topup')      return html(getTopupPage());
    if (path === '/dashboard/orders')     return html(getOrdersPage());
    if (path === '/dashboard/labels')     return html(getLabelsPage());
    if (path === '/admin' || path === '/admin/') return html(getAdminFullPage());

    if (path === '/api/config') {
      return new Response(JSON.stringify({ supabase_url: env.SUPABASE_URL, supabase_key: env.SUPABASE_ANON_KEY }),
        { headers: { 'Content-Type': 'application/json', ...CORS } });
    }
    if (path === '/api/verify' && request.method === 'POST') return handleVerifyAPI(request, env, CORS);
    if (path === '/api/payment/create' && request.method === 'POST') return handlePaymentCreate(request, env, CORS);
    if (path === '/api/payment/callback' && request.method === 'POST') return handlePaymentCallback(request, env, CORS);

    return new Response('Not found', { status: 404 });
  }
};
