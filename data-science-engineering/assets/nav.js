(function () {
  "use strict";

  // built: true means pages actually exist; false renders as a disabled "coming soon" entry
  var SITE = [
    { n: 1, dir: "phase-01-foundations", name: "Foundations", built: true, topics: [
      ["1-1-data-science-vs-data-engineering", "1.1 Data science vs. data engineering vs. analytics engineering"],
      ["1-2-the-data-lifecycle", "1.2 The data lifecycle"],
      ["1-3-tools-landscape-2026", "1.3 The 2026 tools landscape"],
      ["1-4-your-first-data-pipeline", "1.4 Your first data pipeline"]
    ]},
    { n: 2, dir: "phase-02-sql-data-manipulation", name: "SQL & data manipulation", built: true, topics: [
      ["2-1-sql-fundamentals-refresher", "2.1 SQL fundamentals refresher"],
      ["2-2-window-functions-ctes", "2.2 Window functions & CTEs"],
      ["2-3-query-optimization-execution-plans", "2.3 Query optimization & execution plans"],
      ["2-4-pandas-vs-polars-vs-sql", "2.4 Pandas vs. Polars vs. SQL"],
      ["2-5-data-manipulation-patterns", "2.5 Data manipulation patterns"]
    ]},
    { n: 3, dir: "phase-03-statistics-probability", name: "Statistics & probability", built: true, topics: [
      ["3-1-descriptive-statistics", "3.1 Descriptive statistics"],
      ["3-2-probability-distributions", "3.2 Probability distributions"],
      ["3-3-hypothesis-testing", "3.3 Hypothesis testing"],
      ["3-4-confidence-intervals", "3.4 Confidence intervals"],
      ["3-5-ab-testing-fundamentals", "3.5 A/B testing fundamentals"]
    ]},
    { n: 4, dir: "phase-04-eda-visualization", name: "EDA & visualization", built: true, topics: [
      ["4-1-eda-workflow", "4.1 The EDA workflow"],
      ["4-2-choosing-the-right-chart", "4.2 Choosing the right chart"],
      ["4-3-storytelling-with-data", "4.3 Storytelling with data"],
      ["4-4-visualization-pitfalls", "4.4 Visualization pitfalls"]
    ]},
    { n: 5, dir: "phase-05-data-engineering-fundamentals", name: "Data engineering fundamentals", built: true, topics: [
      ["5-1-etl-vs-elt", "5.1 ETL vs. ELT"],
      ["5-2-batch-vs-streaming", "5.2 Batch vs. streaming"],
      ["5-3-data-pipeline-design-patterns", "5.3 Data pipeline design patterns"],
      ["5-4-data-ingestion-strategies", "5.4 Data ingestion strategies"],
      ["5-5-idempotency-and-reliability", "5.5 Idempotency & reliability"]
    ]},
    { n: 6, dir: "phase-06-data-modeling-warehousing", name: "Data modeling & warehousing", built: true, topics: [
      ["6-1-oltp-vs-olap", "6.1 OLTP vs. OLAP"],
      ["6-2-dimensional-modeling-star-schema", "6.2 Dimensional modeling & star schema"],
      ["6-3-snowflake-schema-and-normalization", "6.3 Snowflake schema & normalization"],
      ["6-4-slowly-changing-dimensions", "6.4 Slowly changing dimensions"],
      ["6-5-modern-warehouse-architecture", "6.5 Modern warehouse architecture"],
      ["6-6-cloud-data-platforms", "6.6 Cloud data platforms: Snowflake vs. BigQuery vs. Azure"]
    ]},
    { n: 7, dir: "phase-07-orchestration-workflow", name: "Orchestration & workflow management", built: true, topics: [
      ["7-1-dags-and-dependency-management", "7.1 DAGs & dependency management"],
      ["7-2-airflow-concepts", "7.2 Airflow concepts"],
      ["7-3-scheduling-and-retries", "7.3 Scheduling & retries"],
      ["7-4-orchestration-observability", "7.4 Orchestration observability"],
      ["7-5-containerizing-data-pipelines", "7.5 Containerizing data pipelines"]
    ]},
    { n: 8, dir: "phase-08-big-data-distributed", name: "Big data & distributed processing", built: true, topics: [
      ["8-1-distributed-computing-fundamentals", "8.1 Distributed computing fundamentals"],
      ["8-2-spark-architecture", "8.2 Spark architecture"],
      ["8-3-partitioning-and-shuffle", "8.3 Partitioning & shuffle"],
      ["8-4-streaming-with-kafka", "8.4 Streaming with Kafka"]
    ]},
    { n: 9, dir: "phase-09-ml-fundamentals", name: "Machine learning fundamentals", built: true, topics: [
      ["9-1-supervised-vs-unsupervised-learning", "9.1 Supervised vs. unsupervised learning"],
      ["9-2-classical-ml-algorithms", "9.2 Classical ML algorithms"],
      ["9-3-feature-engineering", "9.3 Feature engineering"],
      ["9-4-bias-variance-tradeoff", "9.4 Bias-variance tradeoff"],
      ["9-5-regularization", "9.5 Regularization"]
    ]},
    { n: 10, dir: "phase-10-ml-evaluation-experimentation", name: "ML evaluation & experimentation", built: true, topics: [
      ["10-1-train-validation-test-splits", "10.1 Train/validation/test splits"],
      ["10-2-cross-validation", "10.2 Cross-validation"],
      ["10-3-evaluation-metrics", "10.3 Evaluation metrics"],
      ["10-4-experiment-tracking", "10.4 Experiment tracking"]
    ]},
    { n: 11, dir: "phase-11-data-quality-governance", name: "Data quality, governance & observability", built: true, topics: [
      ["11-1-data-contracts", "11.1 Data contracts"],
      ["11-2-data-testing-great-expectations", "11.2 Data testing & Great Expectations"],
      ["11-3-data-lineage", "11.3 Data lineage"],
      ["11-4-data-governance-basics", "11.4 Data governance basics"]
    ]},
    { n: 12, dir: "phase-12-capstones", name: "Capstone projects", built: true, topics: [
      ["12-1-capstone-end-to-end-pipeline", "12.1 Capstone: End-to-end data pipeline"],
      ["12-2-capstone-eda-to-ml-project", "12.2 Capstone: EDA-to-ML project"],
      ["12-3-capstone-analytics-dashboard", "12.3 Capstone: Analytics dashboard"]
    ]}
  ];

  var STORAGE_KEY = "ds-track-visited";

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
  html += '<a class="sb-brand" href="' + prefix + 'index.html">Data <span class="plain">Track</span></a>';
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

  // Homepage phase-card progress decoration
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
