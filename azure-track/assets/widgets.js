(function () {
  "use strict";
  function ready(fn) { if (document.readyState !== "loading") fn(); else document.addEventListener("DOMContentLoaded", fn); }
  ready(function () {
    // quiz
    document.querySelectorAll(".q-block").forEach(function (block) {
      var options = block.querySelectorAll(".q-option");
      var explain = block.querySelector(".q-explain");
      options.forEach(function (opt) {
        opt.addEventListener("click", function () {
          if (block.dataset.answered) return;
          block.dataset.answered = "true";
          options.forEach(function (o) { o.classList.add(o.dataset.correct === "true" ? "correct" : "incorrect"); });
          explain.classList.add("show");
        });
      });
    });
    // chooser
    document.querySelectorAll('[data-w="chooser"] .ch-item').forEach(function (item) {
      var opts = item.querySelectorAll(".ch-opt");
      var ex = item.querySelector(".ch-explain");
      opts.forEach(function (o) {
        o.addEventListener("click", function () {
          if (item.dataset.done) return;
          item.dataset.done = "1";
          opts.forEach(function (x) { x.classList.add(x.dataset.correct === "true" ? "correct" : "incorrect"); });
          ex.classList.add("show");
        });
      });
    });
    // tabs
    document.querySelectorAll('[data-w="tabs"]').forEach(function (w) {
      var btns = w.querySelectorAll(".tab-btn"), panes = w.querySelectorAll(".tab-pane");
      btns.forEach(function (b) {
        b.addEventListener("click", function () {
          btns.forEach(function (x) { x.classList.toggle("active", x === b); });
          panes.forEach(function (pn) { pn.classList.toggle("active", pn.dataset.t === b.dataset.t); });
        });
      });
    });
    // stepper
    document.querySelectorAll('[data-w="stepper"]').forEach(function (w) {
      var steps = w.querySelectorAll(".st-step"), cnt = w.querySelector(".st-count");
      var prev = w.querySelector(".st-prev"), next = w.querySelector(".st-next"), i = 0;
      function show() {
        steps.forEach(function (s, k) { s.classList.toggle("active", k === i); });
        cnt.textContent = "Step " + (i + 1) + " of " + steps.length;
        prev.disabled = i === 0; next.disabled = i === steps.length - 1;
      }
      prev.addEventListener("click", function () { if (i > 0) { i--; show(); } });
      next.addEventListener("click", function () { if (i < steps.length - 1) { i++; show(); } });
      show();
    });
    // checklist
    document.querySelectorAll('[data-w="checklist"]').forEach(function (w) {
      var key = "cl:" + location.pathname + ":" + (w.dataset.key || "x");
      var boxes = w.querySelectorAll("input[type=checkbox]");
      var saved = {};
      try { saved = JSON.parse(localStorage.getItem(key)) || {}; } catch (e) {}
      function update() {
        var n = 0; boxes.forEach(function (b) { if (b.checked) n++; });
        w.querySelector(".cl-fill").style.width = Math.round(100 * n / boxes.length) + "%";
        w.querySelector(".cl-count").textContent = n + " of " + boxes.length + " done";
      }
      boxes.forEach(function (b) {
        if (saved[b.dataset.i]) b.checked = true;
        b.addEventListener("change", function () {
          var s = {}; boxes.forEach(function (x) { if (x.checked) s[x.dataset.i] = 1; });
          try { localStorage.setItem(key, JSON.stringify(s)); } catch (e) {}
          update();
        });
      });
      update();
    });
    // flip cards
    document.querySelectorAll('[data-w="flip"] .flip-card').forEach(function (c) {
      c.addEventListener("click", function () { c.classList.toggle("flipped"); });
    });
  });
})();
