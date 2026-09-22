/* ============================================================
   qllqovo.github.io — shared application logic
   Auth UI, edit mode, modal, toast, image upload, reveal.
   ============================================================ */
"use strict";

/* ---------- toast ---------- */
let toastTimer = null;
function toast(msg) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
}

/* ---------- modal ---------- */
function openModal(html, opts) {
  opts = opts || {};
  let mask = document.getElementById("modal-mask");
  if (!mask) {
    mask = document.createElement("div");
    mask.id = "modal-mask";
    mask.className = "modal-mask";
    mask.addEventListener("click", function (e) {
      if (e.target === mask) closeModal();
    });
    document.body.appendChild(mask);
  }
  mask.innerHTML =
    '<div class="modal">' +
    '<button class="modal-close" aria-label="Close">&times;</button>' +
    '<div class="modal-body">' + html + "</div></div>";
  mask.querySelector(".modal-close").addEventListener("click", closeModal);
  mask.classList.add("open");
  document.body.classList.add("no-scroll");
  return mask.querySelector(".modal-body");
}
function closeModal() {
  const mask = document.getElementById("modal-mask");
  if (mask) mask.classList.remove("open");
  document.body.classList.remove("no-scroll");
}

/* ---------- image upload & compression ---------- */
function compressImageFile(file, maxW, cb) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      const scale = Math.min(1, maxW / img.width);
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      cb(canvas.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = function () { toast("Could not read that image."); };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function bindImageUpload(container, onData) {
  const input = container.querySelector("input[type=file]");
  if (!input) return;
  const btn = container.querySelector(".img-btn");
  const openPicker = function () {
    if (!document.body.classList.contains("edit-on")) return;
    input.click();
  };
  if (btn) btn.addEventListener("click", openPicker);
  /* clicking the photo area itself also opens the picker (editor mode) */
  container.addEventListener("click", function (e) {
    if (e.target.closest(".img-btn")) return;
    openPicker();
  });
  input.addEventListener("change", function () {
    if (input.files && input.files[0]) {
      compressImageFile(input.files[0], 900, function (dataUrl) {
        onData(dataUrl);
        toast("Image updated — click Save to persist.");
      });
    }
    input.value = "";
  });
}

/* ---------- auth UI ---------- */
function renderAuthPill() {
  const host = document.getElementById("auth-slot");
  if (!host) return;
  const on = isLoggedIn();
  host.innerHTML = on
    ? '<button class="auth-pill on" id="auth-logout" title="Sign out"><span class="u-dot"></span>qllqovo · sign out</button>'
    : '<button class="auth-pill" id="auth-login">Sign in</button>';
  document.getElementById("auth-login") && document
    .getElementById("auth-login")
    .addEventListener("click", showLoginModal);
  document.getElementById("auth-logout") && document
    .getElementById("auth-logout")
    .addEventListener("click", function () {
      doLogout();
      renderAuthPill();
      setEditMode(false);
      toast("Signed out.");
      location.reload();
    });
}

function showLoginModal() {
  openModal(
    '<form id="login-form">' +
      '<p class="eyebrow">Member access</p>' +
      "<h3>Sign in</h3>" +
      '<div class="field"><label>Account</label><input type="text" id="login-account" autocomplete="username" placeholder="Your account"></div>' +
      '<div class="field"><label>Password</label><input type="password" id="login-password" autocomplete="current-password" placeholder="Your password"></div>' +
      '<p id="login-error" class="muted2 small" style="min-height:1.2em"></p>' +
      '<div class="modal-foot"><button type="button" class="btn btn-ghost btn-sm" data-close="1">Cancel</button><button type="submit" class="btn btn-sm">Sign in</button></div>' +
    "</form>"
  );
  const body = document.getElementById("modal-mask");
  const errEl = body.querySelector("#login-error");
  body.querySelector("#login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const acc = body.querySelector("#login-account").value;
    const pwd = body.querySelector("#login-password").value;
    if (doLogin(acc, pwd)) {
      closeModal();
      renderAuthPill();
      toast("Welcome back, qllqovo.");
      window.dispatchEvent(new CustomEvent("qlauth"));
      if (typeof setupEditMode === "function") setupEditMode();
      maybePromptSyncKey();
    } else {
      errEl.textContent = "Wrong account or password.";
    }
  });
  body.querySelectorAll("[data-close]").forEach(function (b) {
    b.addEventListener("click", closeModal);
  });
  setTimeout(function () {
    const f = body.querySelector("#login-account");
    if (f) f.focus();
  }, 60);
}

/* ---------- cloud sync pairing ---------- */
function showSyncKeyModal() {
  if (!gistConfigured()) {
    toast("Cloud sync is not configured.");
    return;
  }
  const body = openModal(
    '<p class="eyebrow">Cloud sync</p>' +
    "<h3>Link this device</h3>" +
    '<p class="muted2 small" style="margin:10px 0 16px;">Paste your GitHub key to save edits to the cloud from this device. Create it with ONLY the "gist" scope (GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)). It is kept only in this browser — never on the site.</p>' +
    '<div class="field"><label>Sync key (ghp_…)</label><input type="password" id="sync-token" autocomplete="off" placeholder="ghp_…"></div>' +
    '<p id="sync-status" class="muted2 small" style="min-height:1.2em"></p>' +
    '<div class="modal-foot"><button type="button" class="btn btn-ghost btn-sm" data-close="1">Skip</button><button type="button" class="btn btn-sm" id="sync-save">Save key</button></div>'
  );
  const status = body.querySelector("#sync-status");
  const inp = body.querySelector("#sync-token");
  body.querySelector("#sync-save").addEventListener("click", function () {
    const tok = inp.value.trim();
    if (!tok) { status.textContent = "Paste the key first."; return; }
    setSyncToken(tok);
    status.textContent = "Checking with GitHub…";
    pushRemoteData(loadData()).then(function (ok) {
      if (ok) {
        status.textContent = "";
        closeModal();
        toast("Cloud sync enabled on this device ✓");
      } else {
        setSyncToken("");
        status.textContent = "Key rejected by GitHub — check it and try again.";
      }
    });
  });
  setTimeout(function () { if (inp) inp.focus(); }, 60);
}

function maybePromptSyncKey() {
  if (!gistConfigured()) return;
  if (getSyncToken()) return;
  showSyncKeyModal();
}

/* ---------- edit mode ---------- */
let EDIT_ON = false;
function isEditMode() { return EDIT_ON; }

function setupEditMode() {
  const barHost = document.getElementById("edit-bar-slot");
  if (!barHost || !isLoggedIn()) return;
  const syncBtn = gistConfigured() && !getSyncToken()
    ? '<button id="edit-sync" type="button">Sync key</button>'
    : "";
  barHost.innerHTML =
    '<div class="edit-bar" id="edit-bar">' +
      '<span class="eb-tag">Editor</span>' +
      '<button id="edit-toggle" type="button">Edit</button>' +
      '<button id="edit-save" type="button">Save</button>' +
      syncBtn +
      '<button id="edit-exit" type="button">Exit</button>' +
    "</div>";
  document.getElementById("edit-toggle").addEventListener("click", function () {
    setEditMode(!EDIT_ON);
  });
  document.getElementById("edit-save").addEventListener("click", saveEdits);
  document.getElementById("edit-exit").addEventListener("click", function () {
    setEditMode(false);
  });
  const syncB = document.getElementById("edit-sync");
  if (syncB) syncB.addEventListener("click", showSyncKeyModal);
  if (typeof pageOnEditToggle === "function") {
    window.addEventListener("qledit", function () { pageOnEditToggle(EDIT_ON); });
  }
}

function applyEditState() {
  document.querySelectorAll(".editable").forEach(function (el) {
    el.contentEditable = EDIT_ON ? "plaintext-only" : "false";
  });
}

function setEditMode(on) {
  EDIT_ON = on;
  document.body.classList.toggle("edit-on", on);
  applyEditState();
  const toggle = document.getElementById("edit-toggle");
  if (toggle) toggle.textContent = on ? "Editing…" : "Edit";
  window.dispatchEvent(new CustomEvent("qledit"));
}

/* Persist all .editable fields (by data-path) into the store */
function saveEdits() {
  const data = loadData();
  document.querySelectorAll(".editable[data-path], .img-edit[data-path]").forEach(function (el) {
    const path = el.getAttribute("data-path").split(".");
    let cur = data;
    for (let i = 0; i < path.length - 1; i++) cur = cur[path[i]];
    const key = path[path.length - 1];
    if (el.dataset.field === "image") {
      const img = el.querySelector("img");
      if (img) cur[key] = img.src;
    } else {
      cur[key] = el.innerText.trim();
    }
  });
  if (saveData(data)) { /* saveData shows status toast (synced / offline) */ }
}

/* ---------- reveal on scroll ---------- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  const io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
  );
  els.forEach(function (el) { io.observe(el); });
}

/* ---------- shell init ---------- */
function initShell() {
  renderAuthPill();
  setupEditMode();
  initReveal();
  initNavToggle();
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    const href = a.getAttribute("href");
    if (href === current) a.classList.add("active");
  });
  /* cloud sync: warm cache and re-render if remote data differs */
  if (typeof refreshFromRemote === "function") {
    refreshFromRemote(window.__pageRender);
  }
}

/* mobile hamburger menu */
function initNavToggle() {
  const btn = document.getElementById("nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!btn || !links) return;
  btn.addEventListener("click", function () {
    const open = links.classList.toggle("open");
    btn.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A" || e.target.closest("#auth-slot")) {
      links.classList.remove("open");
      btn.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
}

/* ---------- common empty-state builder ---------- */
function emptyState(title, hint) {
  return (
    '<div class="empty-state"><div class="e-title">' + esc(title) + "</div><p>" +
    esc(hint) + "</p></div>"
  );
}

/* ---------- global error guard ---------- */
window.addEventListener("error", function (e) {
  console.error("Page error:", e.message);
});
