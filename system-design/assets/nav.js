(function () {
  "use strict";

  var SITE = [
    { n: 1, dir: "phase-01-launch-day", name: "Launch Day", built: true, topics: [
      ["1-1-meet-chirp-why-starting-simple-is-correct", "1.1 Meet Chirp: why starting simple is correct"],
      ["1-2-the-fragility-nobody-notices-yet", "1.2 The fragility nobody notices yet"]
    ]},
    { n: 2, dir: "phase-02-first-growing-pains", name: "First Growing Pains", built: true, topics: [
      ["2-1-the-bottleneck-one-machine-two-jobs", "2.1 The bottleneck: one machine, two jobs"],
      ["2-2-the-fix-splitting-app-and-database", "2.2 The fix: splitting app and database"],
      ["2-3-the-ceiling-why-vertical-scaling-runs-out", "2.3 The ceiling: why vertical scaling runs out"]
    ]},
    { n: 3, dir: "phase-03-the-weekend-spike", name: "The Weekend Spike", built: true, topics: [
      ["3-1-the-bottleneck-one-server-cant-keep-up", "3.1 The bottleneck: one server can't keep up"],
      ["3-2-the-fix-load-balancing-and-horizontal-scaling", "3.2 The fix: load balancing & horizontal scaling"],
      ["3-3-deep-dive-load-balancing-algorithms", "3.3 Deep dive: load balancing algorithms"],
      ["3-4-the-new-problem-users-keep-getting-logged-out", "3.4 The new problem: users keep getting logged out"]
    ]},
    { n: 4, dir: "phase-04-the-read-storm", name: "The Read Storm", built: true, topics: [
      ["4-1-the-bottleneck-everyones-feed-hits-the-database", "4.1 The bottleneck: everyone's feed hits the DB"],
      ["4-2-the-fix-caching-and-cdn", "4.2 The fix: caching & CDN"],
      ["4-3-deep-dive-cache-eviction-and-write-strategies", "4.3 Deep dive: cache eviction & write strategies"],
      ["4-4-the-new-problem-stale-data-after-you-edit", "4.4 The new problem: stale data after you edit"]
    ]},
    { n: 5, dir: "phase-05-half-a-million-and-climbing", name: "Half a Million and Climbing", built: true, topics: [
      ["5-1-the-bottleneck-primary-database-drowning-in-reads", "5.1 The bottleneck: primary DB drowning in reads"],
      ["5-2-the-fix-read-replicas", "5.2 The fix: read replicas"],
      ["5-3-the-new-problem-i-just-posted-but-cant-see-it", "5.3 The new problem: \"I just posted but can't see it\""]
    ]},
    { n: 6, dir: "phase-06-the-database-ceiling", name: "The Database Ceiling", built: true, topics: [
      ["6-1-the-bottleneck-one-database-cant-hold-everyone", "6.1 The bottleneck: one database can't hold everyone"],
      ["6-2-the-fix-sharding-chirps-data", "6.2 The fix: sharding Chirp's data"],
      ["6-3-deep-dive-consistent-hashing", "6.3 Deep dive: consistent hashing"],
      ["6-4-the-new-problem-celebrities-and-cross-shard-search", "6.4 The new problem: celebrities & cross-shard search"]
    ]},
    { n: 7, dir: "phase-07-everything-is-on-fire", name: "Everything's on Fire at Once", built: true, topics: [
      ["7-1-the-bottleneck-notifications-and-video-blocking-everything", "7.1 The bottleneck: notifications & video blocking everything"],
      ["7-2-the-fix-message-queues-and-workers", "7.2 The fix: message queues & workers"],
      ["7-3-the-new-problem-the-double-notification-bug", "7.3 The new problem: the double-notification bug"]
    ]},
    { n: 8, dir: "phase-08-one-team-one-outage", name: "One Codebase, One Team, One Outage", built: true, topics: [
      ["8-1-the-bottleneck-nobody-can-deploy-safely", "8.1 The bottleneck: nobody can deploy safely"],
      ["8-2-the-fix-breaking-chirp-into-services", "8.2 The fix: breaking Chirp into services"],
      ["8-3-the-new-problem-when-three-services-have-to-agree", "8.3 The new problem: when three services have to agree"]
    ]},
    { n: 9, dir: "phase-09-the-other-side-of-the-world", name: "The Other Side of the World", built: true, topics: [
      ["9-1-the-bottleneck-chirp-is-slow-far-from-home", "9.1 The bottleneck: Chirp is slow far from home"],
      ["9-2-the-fix-cdn-edge-and-multi-region", "9.2 The fix: CDN edge & multi-region"],
      ["9-3-the-new-problem-whose-copy-of-the-data-is-right", "9.3 The new problem: whose copy of the data is right?"]
    ]},
    { n: 10, dir: "phase-10-when-failure-is-the-default", name: "When Failure Is the Default", built: true, topics: [
      ["10-1-the-bottleneck-one-slow-dependency-takes-down-everything", "10.1 The bottleneck: one slow dependency takes down everything"],
      ["10-2-the-fix-circuit-breakers-rate-limiting-graceful-degradation", "10.2 The fix: circuit breakers, rate limiting, graceful degradation"],
      ["10-3-the-mindset-designing-for-failure", "10.3 The mindset: designing for failure"]
    ]},
    { n: 11, dir: "phase-11-the-toolbox", name: "The Toolbox", built: true, topics: [
      ["11-1-api-design-principles", "11.1 API design principles"],
      ["11-2-rate-limiting-algorithms", "11.2 Rate limiting algorithms"],
      ["11-3-cap-theorem-and-pacelc", "11.3 CAP theorem & PACELC"],
      ["11-4-the-database-taxonomy", "11.4 The database taxonomy"],
      ["11-5-indexes-bloom-filters-and-search-basics", "11.5 Indexes, bloom filters & search basics"],
      ["11-6-coordination-primitives", "11.6 Coordination primitives"],
      ["11-7-back-of-envelope-estimation", "11.7 Back-of-envelope estimation"],
      ["11-8-the-system-design-interview-framework", "11.8 The system design interview framework"],
      ["11-9-acid-transactions-and-isolation-levels", "11.9 ACID transactions & isolation levels"],
      ["11-10-leaderless-replication-and-quorums", "11.10 Leaderless replication & quorums"],
      ["11-11-b-trees-vs-lsm-trees", "11.11 B-trees vs. LSM-trees"],
      ["11-12-linearizability-and-consensus", "11.12 Linearizability & consensus"],
      ["11-13-log-based-brokers-vs-task-queues", "11.13 Log-based brokers vs. task queues"],
      ["11-14-percentile-literacy", "11.14 Percentile literacy: p50, p95, p99"],
      ["11-15-sharding-by-key-range-and-secondary-indexes", "11.15 Sharding by key range & secondary indexes"],
      ["11-16-two-phase-commit", "11.16 Two-phase commit"],
      ["11-17-event-sourcing-and-cqrs", "11.17 Event sourcing & CQRS"],
      ["11-18-vector-embeddings-and-ann-search", "11.18 Vector embeddings & ANN search"]
    ]},
    { n: 12, dir: "phase-12-the-patterns-everyone-asks", name: "The Patterns Everyone Asks", built: true, topics: [
      ["12-1-design-a-url-shortener", "12.1 Design a URL shortener"],
      ["12-2-design-a-social-feed", "12.2 Design a social feed"],
      ["12-3-design-a-chat-app", "12.3 Design a chat app"],
      ["12-4-design-ubers-dispatch-system", "12.4 Design Uber's dispatch system"],
      ["12-5-design-a-rate-limiter", "12.5 Design a rate limiter"],
      ["12-6-design-search-autocomplete", "12.6 Design search autocomplete"]
    ]},
    { n: 13, dir: "phase-13-specialized-patterns", name: "Specialized Patterns", built: true, topics: [
      ["13-1-design-a-video-streaming-service", "13.1 Design a video streaming service"],
      ["13-2-design-a-notification-system", "13.2 Design a notification system"],
      ["13-3-design-dropbox", "13.3 Design Dropbox"],
      ["13-4-design-a-payment-system", "13.4 Design a payment system"],
      ["13-5-design-collaborative-editing", "13.5 Design collaborative editing"],
      ["13-6-design-a-rag-chatbot", "13.6 Design a RAG chatbot"]
    ]}
  ];

  var STORAGE_KEY = "system-design-visited";

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
  html += '<a class="sb-brand" href="' + prefix + 'index.html">System <span class="plain">Design</span></a>';
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
