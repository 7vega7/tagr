// TAGR Worker — Main Router
import { getLoginPage, getRegisterPage } from './pages/auth.js';
import { getDashboardPage } from './pages/dashboard.js';
import { getGeneratePage } from './pages/generate.js';
import { getTopupPage } from './pages/topup.js';
import { getOrdersPage } from './pages/orders.js';
import { getLabelsPage } from './pages/labels.js';
import { getAdminFullPage } from './pages/admin-full.js';
import { handleVerifyAPI } from './api/verify.js';
import { handlePaymentCreate, handlePaymentCallback } from './api/payment.js';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey',
};

function html(content, status = 200) {
  return new Response(content, {
    status,
    headers: { 'Content-Type': 'text/html;charset=UTF-8' },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    // ── STATIC / LANDING ──
    if (path === '/' || path === '') {
      const { getLandingPage } = await import('./pages/landing.js');
      return html(getLandingPage());
    }

    // ── VERIFY ──
    if (path === '/verify') {
      const { getVerifyPage } = await import('./pages/verify.js');
      return html(getVerifyPage());
    }

    // ── AUTH ──
    if (path === '/login')    return html(getLoginPage());
    if (path === '/register') return html(getRegisterPage());

    // ── DASHBOARD ──
    if (path === '/dashboard')          return html(getDashboardPage());
    if (path === '/dashboard/generate') return html(getGeneratePage());
    if (path === '/dashboard/topup')    return html(getTopupPage());
    if (path === '/dashboard/orders')   return html(getOrdersPage());
    if (path === '/dashboard/labels')   return html(getLabelsPage());

    // ── ADMIN ──
    if (path === '/admin' || path === '/admin/') {
      return html(getAdminFullPage());
    }

    // ── API ──
    if (path === '/api/config') {
      return new Response(JSON.stringify({
        supabase_url: env.SUPABASE_URL,
        supabase_key: env.SUPABASE_ANON_KEY,
      }), { headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } });
    }

    if (path === '/api/verify' && request.method === 'POST') {
      return handleVerifyAPI(request, env, CORS_HEADERS);
    }

    if (path === '/api/payment/create' && request.method === 'POST') {
      return handlePaymentCreate(request, env, CORS_HEADERS);
    }

    if (path === '/api/payment/callback' && request.method === 'POST') {
      return handlePaymentCallback(request, env, CORS_HEADERS);
    }

    // ── 404 ──
    return new Response(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"/><title>404 — TAGR</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@800&family=DM+Sans&display=swap" rel="stylesheet"/>
<style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#050A0E;color:#E8F4F2;font-family:"DM Sans",sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;flex-direction:column;gap:1rem;}
h1{font-family:"Syne",sans-serif;font-size:6rem;font-weight:800;color:#00D2B4;line-height:1;}
p{color:#7A9EA8;}a{color:#00D2B4;text-decoration:none;font-family:"Syne",sans-serif;font-weight:700;border:1px solid rgba(0,210,180,0.3);padding:0.6rem 1.4rem;border-radius:8px;margin-top:0.5rem;display:inline-block;}
a:hover{background:rgba(0,210,180,0.08);}</style></head>
<body><h1>404</h1><p>Page not found — <code>${path}</code></p><a href="/">← Go Home</a></body></html>`,
      { status: 404, headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
  }
};
