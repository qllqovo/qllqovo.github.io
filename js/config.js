/* ============================================================
   qllqovo.github.io — cloud sync configuration
   ------------------------------------------------------------
   How it works:
   - All editable content is stored in a GitHub Gist
     (site-data.json). Every device reads the same file, so
     edits made on your computer appear on your phone and
     anywhere else.
   - Reading the gist needs NO key — it is public.
   - Writing needs a personal access token with ONLY the `gist`
     scope. The token is NEVER stored in this repo: GitHub
     auto-revokes any token committed to a public repository.
     Instead, each of YOUR devices keeps its own copy in the
     browser (you paste it once into the site after signing in,
     under "cloud sync"). Visitors never need it.

   Pairing (one-time per device you edit from):
   1. Create a classic PAT with ONLY the `gist` scope:
      GitHub → Settings → Developer settings → Personal access
      tokens → Tokens (classic) → Generate new token.
   2. Open the site on that device, sign in, and paste the token
      when the site asks for it.
   ============================================================ */
"use strict";

const QL_GIST_ID = "3071aff71a0a7d704f75517468d775b8";   // gist id (public, safe)
const QL_GIST_FILENAME = "site-data.json";
