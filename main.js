/* ══════════════════════════════════════════════════════════
   COVER → VIDEO → HERO  flow
══════════════════════════════════════════════════════════ */
(function () {
  var cover     = document.getElementById('cover');
  var overlay   = document.getElementById('video-overlay');
  var video     = document.getElementById('reveal-video');
  var skipBtn   = document.getElementById('skip-btn');
  var fadeMask  = document.getElementById('video-fade-mask');
  var openBtn   = document.getElementById('open-btn');
  var hero      = document.getElementById('hero');

  var skipTimer = null;
  var dismissed = false;

  /* ── Step 2: video ends or skip → directly go to hero ── */
  function goToHero() {
    if (dismissed) return;
    dismissed = true;

    clearTimeout(skipTimer);

    // Instantly hide the video overlay
    overlay.style.display = 'none';

    // Scroll smoothly to hero
    hero.scrollIntoView({ behavior: 'smooth' });

    // Clean up DOM
    cover.remove();
    overlay.remove();
  }

  /* ── Step 1: button click → hide cover, show & play video ── */
  function startVideo() {
    openBtn.disabled = true;

    // Instantly hide the cover
    cover.style.transition = 'opacity 0.35s ease';
    cover.style.opacity    = '0';
    cover.style.pointerEvents = 'none';

    // Show video overlay on top (z-index 1001)
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'all';
    overlay.classList.add('active');

    // Play
    video.play().catch(function () {
      // Autoplay blocked – show native controls as fallback
      video.controls = true;
    });

    // Show skip button after 2 s
    skipTimer = setTimeout(function () {
      skipBtn.classList.add('visible');
    }, 2000);
  }

  /* ── Wire events ── */
  openBtn.addEventListener('click', startVideo);
  skipBtn.addEventListener('click', goToHero);
  video.addEventListener('ended', goToHero);

  // ESC / Space skips when video is playing
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Escape' || e.key === ' ') && overlay.classList.contains('active')) {
      e.preventDefault();
      goToHero();
    }
  });
})();


/* ══════════════════════════════════════════════════════════
   LIVE COUNTDOWN  –  19 Sep 2026 · 7:00 PM UAE (UTC+4)
══════════════════════════════════════════════════════════ */
(function () {
  var target = new Date('2026-09-19T19:00:00+04:00').getTime();

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    var diff = target - Date.now();
    if (diff <= 0) {
      ['cd-days', 'cd-hours', 'cd-minutes', 'cd-seconds'].forEach(function (id) {
        document.getElementById(id).textContent = '00';
      });
      return;
    }
    var d = Math.floor(diff / 86400000);
    var h = Math.floor((diff % 86400000) / 3600000);
    var m = Math.floor((diff % 3600000)  / 60000);
    var s = Math.floor((diff % 60000)    / 1000);

    document.getElementById('cd-days').textContent    = pad(d);
    document.getElementById('cd-hours').textContent   = pad(h);
    document.getElementById('cd-minutes').textContent = pad(m);
    document.getElementById('cd-seconds').textContent = pad(s);
  }

  tick();
  setInterval(tick, 1000);
})();


/* ══════════════════════════════════════════════════════════
   SCROLL FADE-IN  (IntersectionObserver)
══════════════════════════════════════════════════════════ */
(function () {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach(function (el) {
    observer.observe(el);
  });
})();
