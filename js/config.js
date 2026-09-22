/* ============================================================
   qllqovo.github.io — cloud sync configuration
   ------------------------------------------------------------
   How it works:
   - The site stores all editable content in a GitHub Gist
     (site-data.json). Every device reads the same file, so
     edits made on your computer appear on your phone and
     anywhere else.
   - Reads need no key (the gist is readable by anyone).
   - Writes use a personal access token with ONLY the `gist`
     scope (see the setup note below).

   If both fields are left empty, the site runs in local-only
   mode (storage stays on each device separately).

   Setup note (one-time, ~1 minute):
   1. Open GitHub → Settings → Developer settings →
      Personal access tokens → Tokens (classic) → Generate new token.
   2. Give it any name (e.g. "qllqovo-site"), set an expiration,
      tick ONLY the `gist` checkbox, then Generate.
   3. Copy the token (shown once) and paste it below, then tell
      the assistant; it will create the gist and fill QL_GIST_ID.

   Security: this token is embedded in the public site's JS, so
   it can be read by anyone. Keep it scoped to `gist` only and
   set a short expiration — a leaked token can only touch this
   one gist, never your repositories.
   ============================================================ */
"use strict";

const QL_GIST_ID = "3071aff71a0a7d704f75517468d775b8";   // gist id
const QL_GIST_TOKEN = "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";  // gist-scoped PAT
const QL_GIST_FILENAME = "site-data.json";
