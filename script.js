/* ============================================================
   Sharan Venkatesh — Portfolio scripts
   1. Inline SVG icons (social / copy / arrows)
   2. Slide-out menu
   3. Scroll reveal (fade-in)
   4. Sliding-text sweep on scroll
   5. Copy-to-clipboard buttons
   6. Timeline connector line (clamp between first & last node)
   You normally won't need to edit this file to change content.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- 1. ICONS ----------
     Lightweight inline SVGs so the site needs no icon library. */
  var ICONS = {
    linkedin: '<svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM5 8H0v16h5V8zm7.98 0H8.05v16h4.93v-8.4c0-4.67 6.02-5.05 6.02 0V24H24V13.8c0-7.84-8.6-7.55-11.02-3.69V8z"/></svg>',
    github: '<svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 7L22 6"/></svg>',
    copy: '<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    up: '<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>'
  };
  document.querySelectorAll("[data-icon]").forEach(function (el) {
    var name = el.getAttribute("data-icon");
    if (ICONS[name]) el.innerHTML = ICONS[name];
  });

  /* ---------- 2. SLIDE-OUT MENU ---------- */
  var menu = document.getElementById("slideMenu");
  var openBtn = document.getElementById("menuToggle");
  var closeBtn = document.getElementById("menuClose");
  var backdrop = document.getElementById("menuBackdrop");
  function setMenu(isOpen) {
    menu.classList.toggle("open", isOpen);
    if (backdrop) backdrop.classList.toggle("open", isOpen);
    openBtn.classList.toggle("is-open", isOpen);   /* turns the two lines into an X */
    menu.setAttribute("aria-hidden", isOpen ? "false" : "true");
    openBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    openBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  }
  function closeMenu() { setMenu(false); }
  /* the two-line button now toggles: click once to open, again to close */
  if (openBtn) openBtn.addEventListener("click", function () { setMenu(!menu.classList.contains("open")); });
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (backdrop) backdrop.addEventListener("click", closeMenu);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  document.querySelectorAll(".menu-link").forEach(function (l) { l.addEventListener("click", closeMenu); });

  /* ---------- 3. SCROLL REVEAL ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { obs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- 4. SLIDING-TEXT SWEEP ----------
     Each .sweep-line moves horizontally based on how far the
     section has scrolled through the viewport. Clamped so it
     never forces a horizontal scrollbar. */
  var sweeps = document.querySelectorAll("[data-sweep]");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var MAX_SHIFT = 15; /* how far each line travels (% of its width); lower = calmer */

  function updateSweep() {
    var vh = window.innerHeight;
    sweeps.forEach(function (line) {
      /* measure the whole section (not each line) so both lines
         hit their resting position at the same moment */
      var rect = (line.closest(".sweep-section") || line).getBoundingClientRect();
      /* progress: 0 when entering from bottom, 1 when leaving at top */
      /* exactly 0.5 when the section's center is at the screen's center */
      var progress = (vh - rect.top) / (vh + rect.height);
      progress = Math.max(0, Math.min(1, progress));
      var dir = line.getAttribute("data-sweep") === "right" ? 1 : -1;
      /* center the sweep around the mid-scroll point */
      /* data-offset sets where a line rests (e.g. -15 = shifted left) */
      var base = parseFloat(line.getAttribute("data-offset") || 0);
      var shift = base + (progress - 0.5) * 2 * MAX_SHIFT * dir;
      line.style.transform = "translateX(" + shift.toFixed(2) + "%)";
    });
  }

  if (!reduceMotion && sweeps.length) {
    var ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(function () { updateSweep(); ticking = false; });
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateSweep);
    updateSweep();
  }

  /* ---------- 5. COPY-TO-CLIPBOARD ---------- */
  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      if (!text) return;
      navigator.clipboard.writeText(text).then(function () {
        var span = btn.childNodes[btn.childNodes.length - 1];
        var original = btn.textContent.trim();
        btn.lastChild.textContent = " COPIED";
        setTimeout(function () { btn.lastChild.textContent = " COPY ADDRESS"; }, 1500);
      }).catch(function () {});
    });
  });

  /* ---------- 6. TIMELINE CONNECTOR LINE ----------
     Make the line span only from the first node to the last node,
     regardless of how the text wraps at different widths. */
  function fixTimelineLines() {
    document.querySelectorAll(".timeline").forEach(function (tl) {
      var nodes = tl.querySelectorAll(".tl-node");
      if (nodes.length < 2) { tl.style.setProperty("--line-hide", "1"); return; }
      var first = nodes[0].getBoundingClientRect();
      var last = nodes[nodes.length - 1].getBoundingClientRect();
      var tlRect = tl.getBoundingClientRect();
      var top = first.top - tlRect.top + first.height / 2;
      var bottom = last.top - tlRect.top + last.height / 2;
      tl.style.setProperty("--tl-top", top + "px");
      tl.style.setProperty("--tl-height", (bottom - top) + "px");
    });
  }
  /* apply via a style element so we use the measured values */
  function applyTimelineStyle() {
    document.querySelectorAll(".timeline").forEach(function (tl) {
      var top = tl.style.getPropertyValue("--tl-top");
      var h = tl.style.getPropertyValue("--tl-height");
      if (top && h) {
        var before = tl.querySelector(".tl-line-dyn");
        if (!before) {
          before = document.createElement("span");
          before.className = "tl-line-dyn";
          before.style.position = "absolute";
          before.style.left = "5px";
          before.style.width = "1px";
          before.style.background = "#cfc9bc";
          tl.appendChild(before);
          /* hide the static CSS line in favor of the measured one */
          tl.style.setProperty("background-image", "none");
        }
        before.style.top = top;
        before.style.height = h;
      }
    });
  }
  /* hide the static ::before line and use a measured one instead */
  var styleTag = document.createElement("style");
  styleTag.textContent = ".timeline::before{display:none!important}";
  document.head.appendChild(styleTag);
  function refreshTimeline() { fixTimelineLines(); applyTimelineStyle(); }
  window.addEventListener("load", refreshTimeline);
  window.addEventListener("resize", refreshTimeline);
  refreshTimeline();

  /* ---------- 7. CASE STUDY POP-UPS ----------
     Clicking anywhere on a project card (except its Code link) opens its case study. */
  document.querySelectorAll(".project-card").forEach(function (card) {
    var btn = card.querySelector("[data-open]");
    if (!btn) return;
    var d = document.getElementById(btn.getAttribute("data-open"));
    if (!d || !d.showModal) return;
    card.style.cursor = "pointer";
    card.addEventListener("click", function (e) {
      if (e.target.closest("a")) return;            /* the Code link still goes to GitHub */
      if (!d.open) d.showModal();
    });
  });
  document.querySelectorAll("dialog.case-study").forEach(function (d) {
    d.querySelector(".cs-close").addEventListener("click", function () { d.close(); });
    /* clicking the dimmed area outside the panel closes it */
    d.addEventListener("click", function (e) { if (e.target === d) d.close(); });
  });

  /* ---------- 8. CERTIFICATE VIEWER ----------
     Clicking a cert card "lifts" it and grows it into a centered panel
     showing the certificate image; closing shrinks it back into the card. */
  var viewer = document.getElementById("certViewer");
  if (viewer) {
    var panel = viewer.querySelector(".cv-panel");
    var backdrop2 = viewer.querySelector(".cv-backdrop");
    var vImg = viewer.querySelector(".cv-img");
    var vTitle = viewer.querySelector(".cv-title");
    var vSub = viewer.querySelector(".cv-sub");
    var vOpen = viewer.querySelector(".cv-open");
    var vClose = viewer.querySelector(".cv-close");
    var activeCard = null, busy = false;
    var EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";

    /* preload certificate images so the panel opens at the right size */
    document.querySelectorAll(".cert-card[data-img]").forEach(function (c) { new Image().src = c.getAttribute("data-img"); });

    function cardToPanel(card) {
      var from = card.getBoundingClientRect(), to = panel.getBoundingClientRect();
      var dx = (from.left + from.width / 2) - (to.left + to.width / 2);
      var dy = (from.top + from.height / 2) - (to.top + to.height / 2);
      return "translate(" + dx + "px," + dy + "px) scale(" + (from.width / to.width) + "," + (from.height / to.height) + ")";
    }

    function openCert(card) {
      if (busy || activeCard) return;
      busy = true; activeCard = card;
      var src = card.getAttribute("data-img");
      vImg.src = src;
      vImg.alt = card.querySelector(".cert-title").textContent + " certificate";
      vTitle.textContent = card.querySelector(".cert-title").textContent;
      vSub.textContent = card.querySelector(".cert-issuer").textContent + " · Issued " + (card.getAttribute("data-issued") || "");
      vOpen.href = src;
      var ready = vImg.decode ? vImg.decode().catch(function () {}) : Promise.resolve();
      ready.then(function () {
        if (vImg.naturalWidth) panel.style.setProperty("--r", (vImg.naturalWidth / vImg.naturalHeight).toFixed(3));
        viewer.hidden = false;
        document.body.style.overflow = "hidden";
        var done = function () { busy = false; vClose.focus(); };
        if (reduceMotion || !panel.animate) { card.style.visibility = "hidden"; done(); return; }
        var start = cardToPanel(card);
        card.style.visibility = "hidden";   /* the card "lifts off" the grid */
        backdrop2.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 350, easing: "ease" });
        vImg.animate([{ opacity: 0 }, { opacity: 0, offset: 0.35 }, { opacity: 1 }], { duration: 600, easing: "ease" });
        panel.animate([{ transform: start, borderRadius: "12px" }, { transform: "none", borderRadius: "14px" }],
          { duration: 560, easing: EASE }).onfinish = done;
      });
    }

    function closeCert() {
      if (busy || !activeCard) return;
      busy = true;
      var card = activeCard;
      var finish = function () {
        viewer.hidden = true; card.style.visibility = "";
        document.body.style.overflow = ""; activeCard = null; busy = false;
        var btn = card.querySelector(".cert-view-btn"); if (btn) btn.focus({ preventScroll: true });
      };
      if (reduceMotion || !panel.animate) { finish(); return; }
      backdrop2.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 380, easing: "ease", fill: "forwards" });
      vImg.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, easing: "ease", fill: "forwards" });
      panel.animate([{ transform: "none" }, { transform: cardToPanel(card) }],
        { duration: 460, easing: EASE, fill: "forwards" }).onfinish = function () {
          finish();
          panel.getAnimations().forEach(function (a) { a.cancel(); });
          backdrop2.getAnimations().forEach(function (a) { a.cancel(); });
          vImg.getAnimations().forEach(function (a) { a.cancel(); });
        };
    }

    document.querySelectorAll(".cert-card[data-img]").forEach(function (card) {
      card.addEventListener("click", function (e) {
        if (e.target.closest("a")) return;
        openCert(card);
      });
    });
    vClose.addEventListener("click", closeCert);
    backdrop2.addEventListener("click", closeCert);
    viewer.addEventListener("click", function (e) { if (e.target === viewer) closeCert(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && activeCard) closeCert(); });
  }

  /* ---------- 9. HERO DOT GRID ----------
     A permanent, even dot grid across the whole hero. Dots near the mouse
     turn gold and grow slightly, then ease back when it moves away.
     Touch screens and Reduce Motion simply show the grid. */
  (function () {
    var canvas = document.querySelector(".hero-dots");
    if (!canvas || !canvas.getContext) return;
    var hero = canvas.parentElement, ctx = canvas.getContext("2d");
    var GAP = 24, BASE = 1.3, GROW = 0.3, REACH = 260;   /* REACH = size of the soft gold circle */
    var interactive = !reduceMotion && !window.matchMedia("(hover: none)").matches;
    var W = 0, H = 0, dpr = 1, mx = -9999, my = -9999, tx = -9999, ty = -9999, power = 0, target = 0, raf = null;

    function accent() {
      return getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#b8902f";
    }
    function size() {
      var r = hero.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      var gold = accent(), k = 2 * REACH * REACH / 2.2;
      for (var x = GAP / 2; x < W; x += GAP) {
        for (var y = GAP / 2; y < H; y += GAP) {
          var hot = 0;
          if (power > 0.01) { var dx = x - mx, dy = y - my; hot = power * Math.exp(-(dx * dx + dy * dy) / k); }
          var r = BASE * (1 + GROW * hot);
          ctx.globalAlpha = 0.55; ctx.fillStyle = "#c4bdae";
          ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
          if (hot > 0.02) {                                  /* gold layer fades in near the cursor */
            ctx.globalAlpha = Math.min(1, hot * 1.15); ctx.fillStyle = gold;
            ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
          }
        }
      }
      ctx.globalAlpha = 1;
    }
    function tick() {
      mx += (tx - mx) * 0.18; my += (ty - my) * 0.18;
      power += (target - power) * 0.12;
      draw();
      if (Math.abs(target - power) > 0.005 || Math.abs(tx - mx) > 0.5 || Math.abs(ty - my) > 0.5) {
        raf = requestAnimationFrame(tick);
      } else { raf = null; }
    }
    function kick() { if (!raf) raf = requestAnimationFrame(tick); }
    if (interactive) {
      hero.addEventListener("mousemove", function (e) {
        var r = hero.getBoundingClientRect();
        tx = e.clientX - r.left; ty = e.clientY - r.top;
        if (mx < -999) { mx = tx; my = ty; }
        target = 1; kick();
      });
      hero.addEventListener("mouseleave", function () { target = 0; kick(); });
    }
    window.addEventListener("resize", size);
    size();
  })();

  /* ---------- 10. PHOTO STRIP (Behind the Lens) ----------
     Each row drifts slowly; a card that leaves one edge is moved to the
     other end, so the moving layer stays small (Safari renders this
     reliably, unlike one very wide animated strip). Pauses off-screen. */
  (function () {
    var rows = document.querySelectorAll(".lens-track");
    if (!rows.length || reduceMotion) return;
    var SPEED = 30;                                  // pixels per second
    function gap(row) { return parseFloat(getComputedStyle(row).columnGap) || 16; }
    var state = [].map.call(rows, function (row) {
      return { row: row, dir: row.classList.contains("reverse") ? 1 : -1, x: 0 };
    });
    state.forEach(function (s) {                     // reverse row starts shifted so its left edge is filled
      if (s.dir === 1) {
        var lastC = s.row.lastElementChild, w = lastC.getBoundingClientRect().width + gap(s.row);
        s.row.insertBefore(lastC, s.row.firstElementChild); s.x = -w;
        s.row.style.transform = "translate3d(" + s.x + "px,0,0)";
      }
    });
    var visible = false, last = null;
    function step(t) {
      if (!visible) { last = null; return; }
      var dt = last ? Math.min((t - last) / 1000, 0.05) : 0; last = t;
      state.forEach(function (s) {
        s.x += s.dir * SPEED * dt;
        var g = gap(s.row);
        if (s.dir === -1) {                          // moving left: recycle the first card to the end
          var first = s.row.firstElementChild, fw = first.getBoundingClientRect().width + g;
          if (-s.x >= fw) { s.row.appendChild(first); s.x += fw; }
        } else if (s.x >= 0) {                       // moving right: recycle the last card to the front
          var lc = s.row.lastElementChild, lw = lc.getBoundingClientRect().width + g;
          s.row.insertBefore(lc, s.row.firstElementChild); s.x -= lw;
        }
        s.row.style.transform = "translate3d(" + s.x.toFixed(2) + "px,0,0)";
      });
      requestAnimationFrame(step);
    }
    var section = document.getElementById("off-the-clock");
    new IntersectionObserver(function (entries) {
      var was = visible; visible = entries[0].isIntersecting;
      if (visible && !was) requestAnimationFrame(step);
    }, { rootMargin: "200px" }).observe(section);
  })();

})();
