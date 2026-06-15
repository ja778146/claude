/* =====================================================================
   NEXT LEVEL RESTORATION CONSULTANT — Funnel interactions
   ===================================================================== */
(function () {
  'use strict';

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector('[data-nav-toggle]');
  var menu = document.querySelector('[data-mobile-menu]');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }
  /* Safety net: if anything is still hidden a moment after load, reveal it */
  window.addEventListener('load', function () {
    setTimeout(function () {
      document.querySelectorAll('.reveal:not(.in)').forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight) el.classList.add('in');
      });
    }, 400);
  });

  /* ---- Current year ---- */
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

  /* ---- Multi-step application form ---- */
  var form = document.querySelector('[data-multistep]');
  if (form) {
    var steps = Array.prototype.slice.call(form.querySelectorAll('[data-step]'));
    var bar = form.querySelector('[data-progress-bar]');
    var stepLabel = form.querySelector('[data-step-label]');
    var current = 0;

    function show(i) {
      steps.forEach(function (s, idx) { s.hidden = idx !== i; });
      current = i;
      var pct = Math.round(((i) / (steps.length - 1)) * 100);
      if (bar) bar.style.width = pct + '%';
      if (stepLabel) stepLabel.textContent = 'Step ' + (i + 1) + ' of ' + steps.length;
      var firstField = steps[i].querySelector('input, select, textarea, button');
      if (firstField) { try { firstField.focus({ preventScroll: true }); } catch (e) {} }
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function validStep(i) {
      var fields = steps[i].querySelectorAll('input, select, textarea');
      for (var k = 0; k < fields.length; k++) {
        if (!fields[k].checkValidity()) { fields[k].reportValidity(); return false; }
      }
      // radio groups: ensure at least one checked if marked required
      var groups = steps[i].querySelectorAll('[data-required-group]');
      for (var g = 0; g < groups.length; g++) {
        var name = groups[g].getAttribute('data-required-group');
        if (!steps[i].querySelector('input[name="' + name + '"]:checked')) {
          alert('Please choose an option to continue.');
          return false;
        }
      }
      return true;
    }

    form.querySelectorAll('[data-next]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (validStep(current) && current < steps.length - 1) show(current + 1);
      });
    });
    form.querySelectorAll('[data-prev]').forEach(function (btn) {
      btn.addEventListener('click', function () { if (current > 0) show(current - 1); });
    });

    /* Choice cards auto-advance */
    form.querySelectorAll('[data-autoadvance] input[type="radio"]').forEach(function (input) {
      input.addEventListener('change', function () {
        setTimeout(function () { if (current < steps.length - 1) show(current + 1); }, 240);
      });
    });

    /* Submit -> redirect to thank-you (replace with GHL submit handler) */
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validStep(current)) return;
      var submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Submitting…'; }
      // NOTE: In GoHighLevel, connect this form to your GHL form/booking action.
      // Default behavior: forward to the booking/thank-you step.
      var redirect = form.getAttribute('data-redirect') || 'booking.html';
      setTimeout(function () { window.location.href = redirect; }, 600);
    });

    show(0);
  }
})();
