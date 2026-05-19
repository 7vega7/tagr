// TAGR - NFC Anti-Counterfeiting Label Service
// Cloudflare Workers Entry Point

import { getLandingPage } from './pages/landing.js';
import { getVerifyPage } from './pages/verify.js';
import { handleVerifyAPI } from './api/verify.js';

// Decode Base64URL to plain code
function decodeToken(t) {
  try {
    // Base64URL → Base64 → string
    const base64 = t.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(base64);
    return decoded.toUpperCase();
  } catch {
    return null;
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // API Routes
    if (path === '/api/verify' && request.method === 'POST') {
      return handleVerifyAPI(request, env, corsHeaders);
    }

    // Page Routes
    if (path === '/' || path === '/index.html') {
      return new Response(getLandingPage(), {
        headers: { 'Content-Type': 'text/html;charset=UTF-8' },
      });
    }

    if (path === '/verify' || path === '/verify.html') {
      // Support both ?t=encoded (new) and ?code=plain (legacy)
      let code = '';
      const t = url.searchParams.get('t');
      const plainCode = url.searchParams.get('code');

      if (t) {
        code = decodeToken(t) || '';
      } else if (plainCode) {
        code = plainCode;
      }

      return new Response(getVerifyPage(code), {
        headers: { 'Content-Type': 'text/html;charset=UTF-8' },
      });
    }

    // 404
    return new Response('Not Found', { status: 404 });
  },
};
