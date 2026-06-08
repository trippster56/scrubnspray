/* ============================================================
   SCRUB N SPRAY — shared site behavior
   Injects nav + footer, handles menu, reveals, bubbles, hero switch.
   Each page sets <body data-page="home|services|pricing|refund|contact">
   ============================================================ */
(function () {
  var GFORM = "https://forms.gle/your-google-form"; // TODO: paste real Google Form link

  var NAV = [
    { label: "Home", href: "index.html", key: "home" },
    { label: "Services", href: "services.html", key: "services" },
    { label: "Pricing", href: "pricing.html", key: "pricing" },
    { label: "Contact", href: "contact.html", key: "contact" }
  ];

  var page = document.body.getAttribute("data-page") || "home";

  function navLinks(extraClass) {
    return NAV.map(function (n) {
      var active = n.key === page ? " active" : "";
      return '<a class="nav-link' + active + (extraClass || "") + '" href="' + n.href + '">' + n.label + "</a>";
    }).join("");
  }

  var dropIcon = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5C12 2.5 5 11 5 15.5a7 7 0 0 0 14 0C19 11 12 2.5 12 2.5z"/></svg>';

  /* ---------- NAV ---------- */
  var nav = document.createElement("div");
  nav.innerHTML =
    '<nav class="nav">' +
      '<div class="nav-inner">' +
        '<a class="nav-logo" href="index.html" aria-label="Scrub N Spray home"><img src="assets/wordmark.png" alt="Scrub N Spray Car Wash"></a>' +
        '<div class="nav-links">' + navLinks() + '</div>' +
        '<div class="nav-cta">' +
          '<a class="btn btn-accent" href="refund.html">Lost money? File a claim</a>' +
          '<button class="nav-burger" aria-label="Open menu" aria-expanded="false">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
      '<div class="nav-mobile">' + navLinks() +
        '<a class="btn btn-accent" href="refund.html">Lost money? File a claim</a>' +
      '</div>' +
    '</nav>';
  document.body.insertBefore(nav, document.body.firstChild);

  var burger = nav.querySelector(".nav-burger");
  var mobile = nav.querySelector(".nav-mobile");
  burger.addEventListener("click", function () {
    var open = mobile.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });

  /* ---------- FOOTER ---------- */
  var year = new Date().getFullYear();
  var fb = document.createElement("footer");
  fb.className = "footer";
  fb.innerHTML =
    '<div class="footer-top">' +
      '<div class="footer-brand">' +
        '<img src="assets/wordmark.png" alt="Scrub N Spray">' +
        '<p>Four express car washes across Florence. Pull up, pick your wash, and you\u2019re back on the road in minutes \u2014 windows down, free vacuums included.</p>' +
      '</div>' +
      '<div class="footer-col">' +
        '<h4>Visit</h4>' +
        '<p style="color:#b9d3ee;font-size:15px;line-height:1.8;margin:0">4 locations across Florence<br>Mon\u2013Sun \u00b7 8am\u20138pm<br>(843) 000-0000</p>' +
      '</div>' +
      '<div class="footer-col">' +
        '<h4>Pages</h4>' +
        NAV.map(function (n) { return '<a href="' + n.href + '">' + n.label + "</a>"; }).join("") +
        '<a href="refund.html">Refund</a>' +
        '<a href="#" style="opacity:.6">Careers \u2014 coming soon</a>' +
      '</div>' +
      '<div class="footer-col">' +
        '<h4>Follow along</h4>' +
        '<div class="social-row" style="margin-bottom:14px">' +
          '<a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v6h3v-6h2.5l.5-3H14V9.5c0-.3.2-.5.5-.5z"/></svg></a>' +
          '<a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>' +
        '</div>' +
        '<a href="#">Newsletter \u2197</a>' +
      '</div>' +
    '</div>' +
    '<div class="footer-bottom">' +
      '<span>\u00a9 ' + year + ' Scrub N Spray \u00b7 Car Wash</span>' +
      '<span>Florence &nbsp;\u00b7&nbsp; A faster, cleaner wash.</span>' +
    '</div>';
  document.body.appendChild(fb);

  /* ---------- REVEAL ON SCROLL ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll("[data-reveal]").forEach(function (el, i) {
    el.style.transitionDelay = (Math.min(i % 4, 3) * 0.08) + "s";
    io.observe(el);
  });

  /* ---------- BUBBLES ---------- */
  window.spawnBubbles = function (host, count) {
    count = count || 14;
    var b = document.createElement("div");
    b.className = "bubbles";
    for (var i = 0; i < count; i++) {
      var d = document.createElement("span");
      d.className = "bubble";
      var size = 8 + Math.random() * 42;
      d.style.width = size + "px";
      d.style.height = size + "px";
      d.style.left = Math.random() * 100 + "%";
      d.style.animationDuration = (7 + Math.random() * 10) + "s";
      d.style.animationDelay = (-Math.random() * 12) + "s";
      b.appendChild(d);
    }
    host.appendChild(b);
  };

  /* ---------- PAGE-HERO VARIANT SWITCHER (inner pages only) ---------- */
  var phero = document.querySelector(".page-hero");
  if (phero) {
    var deco = document.createElement("div");
    deco.className = "phero-deco";
    deco.innerHTML =
      '<div class="phero-glow"></div>' +
      '<div class="phero-streaks"></div>' +
      '<div class="phero-dots"></div>' +
      '<div class="phero-bubbles"></div>' +
      '<div class="phero-wave"><svg viewBox="0 0 1440 120" preserveAspectRatio="none">' +
        '<path d="M0,72 C220,118 430,30 680,54 C930,78 1160,120 1440,66 L1440,120 L0,120 Z"></path></svg></div>';
    phero.insertBefore(deco, phero.firstChild);

    var PHEROS = [
      { k: "a", t: "Clean gradient" },
      { k: "b", t: "Floating bubbles" },
      { k: "c", t: "Water waves" },
      { k: "d", t: "Bright foam" }
    ];
    var pswitch = document.createElement("div");
    pswitch.className = "hero-switch phero-switch";
    pswitch.innerHTML = '<span class="lbl">Header style</span>' +
      PHEROS.map(function (p) { return '<button data-p="' + p.k + '" title="' + p.t + '">' + p.k.toUpperCase() + "</button>"; }).join("");
    document.body.appendChild(pswitch);

    var bubblesDone = false;
    function setPhero(k) {
      document.querySelectorAll(".page-hero").forEach(function (h) { h.setAttribute("data-phero", k); });
      localStorage.setItem("sns-phero-" + page, k);
      pswitch.querySelectorAll("button").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-p") === k); });
      if (k === "b" && !bubblesDone) {
        bubblesDone = true;
        window.spawnBubbles(phero.querySelector(".phero-bubbles"), 16);
      }
    }
    pswitch.querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function () { setPhero(b.getAttribute("data-p")); });
    });
    // Per-page default header style (overridable + persisted per page)
    var PHERO_DEFAULTS = { services: "b", pricing: "d", contact: "c", refund: "a" };
    setPhero(localStorage.getItem("sns-phero-" + page) || PHERO_DEFAULTS[page] || "a");
  }

  /* ---------- expose form link ---------- */
  window.SCRUB_GFORM = GFORM;
})();
