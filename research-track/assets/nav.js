(function () {
  "use strict";

  var SITE = [
    { n: 1, dir: "phase-01-how-research-works", name: "How research works", built: true, topics: [
      ["1-1-what-counts-as-research", "1.1 What counts as research, and what a contribution is"],
      ["1-2-anatomy-of-a-paper", "1.2 The anatomy of a paper"],
      ["1-3-venues-preprints-and-peer-review", "1.3 Venues, preprints and peer review"]
    ]},
    { n: 2, dir: "phase-02-reading-and-mapping-papers", name: "Reading and mapping papers", built: true, topics: [
      ["2-1-the-three-pass-method", "2.1 The three-pass method"],
      ["2-2-finding-and-mapping-the-literature", "2.2 Finding and mapping the literature"],
      ["2-3-notes-and-a-reading-log", "2.3 Notes and a reading log"]
    ]},
    { n: 3, dir: "phase-03-foundations-you-must-own", name: "Foundations you must own", built: true, topics: [
      ["3-1-the-math-map", "3.1 The math map"],
      ["3-2-statistics-for-experiments", "3.2 Statistics for experiments"],
      ["3-3-machine-learning-core", "3.3 Machine learning core you must be fluent in"],
      ["3-4-data-systems-foundations", "3.4 Data systems foundations"]
    ]},
    { n: 4, dir: "phase-04-doing-the-experiment", name: "Doing the experiment", built: true, topics: [
      ["4-1-asking-a-falsifiable-question", "4.1 Asking a falsifiable question"],
      ["4-2-baselines-and-ablations", "4.2 Baselines and ablations"],
      ["4-3-reproducibility-and-tracking", "4.3 Reproducibility and tracking"],
      ["4-4-data-hygiene-and-leakage", "4.4 Data hygiene and leakage"],
      ["4-5-compute-budgets-and-cheap-experiments", "4.5 Compute budgets and cheap experiments"]
    ]},
    { n: 5, dir: "phase-05-fields-that-fit-you", name: "Fields that fit you", built: true, topics: [
      ["5-1-data-centric-ai-and-data-quality", "5.1 Data-centric AI and data quality"],
      ["5-2-llms-for-data-management", "5.2 LLMs for data management"],
      ["5-3-rag-evaluation-and-data-defects", "5.3 RAG evaluation and data defects"],
      ["5-4-provenance-lineage-and-ml-systems", "5.4 Provenance, lineage and ML systems"]
    ]},
    { n: 6, dir: "phase-06-projects-that-produce-an-artifact", name: "Projects that produce an artifact", built: true, topics: [
      ["6-1-project-a-reproduce-and-extend", "6.1 Project A: reproduce and extend one paper"],
      ["6-2-project-b-data-defects-in-rag", "6.2 Project B: data defects in RAG"],
      ["6-3-project-c-your-rag-evaluation-study", "6.3 Project C: your RAG evaluation study"],
      ["6-4-project-d-lineage-capture-benchmark", "6.4 Project D: a lineage capture benchmark"]
    ]},
    { n: 7, dir: "phase-07-writing-and-sharing", name: "Writing and sharing", built: true, topics: [
      ["7-1-writing-the-paper", "7.1 Writing the paper"],
      ["7-2-figures-tables-and-honest-results", "7.2 Figures, tables and honest results"],
      ["7-3-releasing-code-data-and-preprints", "7.3 Releasing code, data and preprints"]
    ]},
    { n: 8, dir: "phase-08-getting-into-research-groups", name: "Getting into research groups", built: true, topics: [
      ["8-1-finding-and-vetting-groups", "8.1 Finding and vetting research groups"],
      ["8-2-the-cold-email", "8.2 The cold email"],
      ["8-3-calls-follow-ups-and-what-to-ask", "8.3 Calls, follow-ups and what to ask"],
      ["8-4-open-communities-and-independent-paths", "8.4 Open communities and independent paths"],
      ["8-5-applications-cv-statement-and-deadlines", "8.5 Applications: CV, statement and deadlines"]
    ]},
    { n: 9, dir: "phase-09-plan-and-capstone", name: "Plan and capstone", built: true, topics: [
      ["9-1-the-12-week-plan", "9.1 The 12 week plan"],
      ["9-2-pitfalls-clinic", "9.2 Pitfalls clinic"],
      ["9-3-capstone-your-outreach-package", "9.3 Capstone: your outreach package"]
    ]}
  ];

  var STORAGE_KEY = "research-track-visited";

  function getVisited() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function markVisited(slug) {
    try {
      var v = getVisited();
      v[slug] = true;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
    } catch (e) {}
  }

  var path = window.location.pathname;
  var atRoot = !/\/phase-\d\d-[a-z-]+\//.test(path);
  var prefix = atRoot ? "" : "../";
  var hubPrefix = atRoot ? "../" : "../../";

  var currentFile = path.split("/").pop().replace(/\.html?$/, "") || "index";

  var visited = getVisited();
  if (currentFile !== "index") markVisited(currentFile);
  visited = getVisited();

  var totalTopics = 0, visitedTopics = 0;
  SITE.forEach(function (ph) {
    ph.topics.forEach(function (t) {
      totalTopics++;
      if (visited[t[0]]) visitedTopics++;
    });
  });

  var html = '';
  html += '<a class="sb-hub-link" href="' + hubPrefix + 'index.html">&larr; All learning paths</a>';
  html += '<a class="sb-brand" href="' + prefix + 'index.html">Research <span class="plain">Track</span></a>';
  html += '<div class="sb-progress-wrap"><div class="sb-progress-label"><span>Progress</span><strong>' + visitedTopics + ' / ' + totalTopics + '</strong></div>';
  html += '<div class="sb-progress-track"><div class="sb-progress-fill" style="width:' + Math.round((visitedTopics / totalTopics) * 100) + '%"></div></div></div>';

  SITE.forEach(function (ph) {
    var hasActive = ph.topics.some(function (t) { return t[0] === currentFile; });
    var completeCount = ph.topics.filter(function (t) { return visited[t[0]]; }).length;
    var isComplete = ph.built && completeCount === ph.topics.length;
    var openClass = hasActive ? " open" : "";
    var stateClass = isComplete ? " complete" : (hasActive ? " has-active" : "");
    var soonClass = ph.built ? "" : " soon";

    html += '<div class="sb-phase' + openClass + stateClass + soonClass + '">';
    html += '<button class="sb-phase-head" type="button" aria-expanded="' + (hasActive ? "true" : "false") + '">';
    html += '<span class="sb-phase-num">' + (isComplete ? "✓" : ph.n) + '</span>';
    html += '<span class="sb-phase-name">' + ph.name + (ph.built ? '' : ' <em>(soon)</em>') + '</span>';
    html += '<svg class="sb-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';
    html += '</button>';
    html += '<div class="sb-topics">';
    ph.topics.forEach(function (t) {
      var isActive = t[0] === currentFile;
      var isVisited = !!visited[t[0]];
      if (ph.built) {
        html += '<a class="sb-topic' + (isActive ? " active" : "") + (isVisited ? " visited" : "") + '" href="' + prefix + ph.dir + '/' + t[0] + '.html">';
        html += '<span class="sb-dot"></span><span>' + t[1] + '</span></a>';
      } else {
        html += '<span class="sb-topic disabled"><span class="sb-dot"></span><span>' + t[1] + '</span></span>';
      }
    });
    html += '</div></div>';
  });

  var aside = document.createElement("aside");
  aside.id = "site-sidebar";
  aside.innerHTML = html;
  document.body.insertBefore(aside, document.body.firstChild);

  var overlay = document.createElement("div");
  overlay.className = "sb-overlay";
  document.body.appendChild(overlay);

  document.body.classList.add("has-sidebar");

  aside.querySelectorAll(".sb-phase-head").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var group = btn.closest(".sb-phase");
      var wasOpen = group.classList.contains("open");
      aside.querySelectorAll(".sb-phase.open").forEach(function (g) { g.classList.remove("open"); });
      if (!wasOpen) group.classList.add("open");
    });
  });

  var topnav = document.querySelector(".topnav");
  if (topnav) {
    var btn = document.createElement("button");
    btn.className = "menu-toggle";
    btn.setAttribute("aria-label", "Toggle navigation");
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
    topnav.insertBefore(btn, topnav.firstChild);
    btn.addEventListener("click", function () {
      document.body.classList.toggle("sidebar-open");
    });
    overlay.addEventListener("click", function () {
      document.body.classList.remove("sidebar-open");
    });
  }

  var cards = document.querySelectorAll(".phase-card[data-phase]");
  if (cards.length) {
    cards.forEach(function (card) {
      var total = parseInt(card.getAttribute("data-total"), 10);
      var slugs = (card.getAttribute("data-slugs") || "").split(",").filter(Boolean);
      var done = slugs.filter(function (s) { return visited[s]; }).length;
      var fill = card.querySelector(".phase-card-bar-fill");
      var count = card.querySelector(".phase-card-count");
      if (fill) fill.style.width = Math.round((done / total) * 100) + "%";
      if (count) count.textContent = done + " / " + total + " done";
    });
  }
})();
