// TAGR - NFC Anti-Counterfeiting Label Service
// Cloudflare Workers Entry Point

import { getLandingPage } from './pages/landing.js';
import { getVerifyPage } from './pages/verify.js';
import { getAdminPage } from './pages/admin.js';
import { handleVerifyAPI } from './api/verify.js';

function decodeToken(t) {
  try {
    var base64 = t.replace(/-/g, '+').replace(/_/g, '/');
    var decoded = atob(base64);
    return decoded.toUpperCase();
  } catch(e) {
    return null;
  }
}

export default {
  async fetch(request, env, ctx) {
    var url = new URL(request.url);
    var path = url.pathname;

    var corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // API: verify
    if (path === '/api/verify' && request.method === 'POST') {
      return handleVerifyAPI(request, env, corsHeaders);
    }

    // API: config for admin panel
    if (path === '/api/config' && request.method === 'GET') {
      return new Response(
        JSON.stringify({
          supabase_url: env.SUPABASE_URL || '',
          supabase_key: env.SUPABASE_ANON_KEY || '',
        }),
        { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Landing page
    if (path === '/' || path === '/index.html') {
      return new Response(getLandingPage(), {
        headers: { 'Content-Type': 'text/html;charset=UTF-8' },
      });
    }

    // Verify page
    if (path === '/verify' || path === '/verify.html') {
      var code = '';
      var t = url.searchParams.get('t');
      var plainCode = url.searchParams.get('code');
      if (t) {
        code = decodeToken(t) || '';
      } else if (plainCode) {
        code = plainCode;
      }
      return new Response(getVerifyPage(code), {
        headers: { 'Content-Type': 'text/html;charset=UTF-8' },
      });
    }

    // Admin panel
    if (path === '/admin' || path === '/admin.html') {
      return new Response(getAdminPage(), {
        headers: { 'Content-Type': 'text/html;charset=UTF-8' },
      });
    }

    return new Response('Not Found', { status: 404 });
  },
};
