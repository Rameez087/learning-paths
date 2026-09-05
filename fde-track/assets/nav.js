(function () {
  "use strict";

  var SITE = [
    { n: 1, dir: "phase-01-foundations", name: "Foundations", built: true, topics: [
      ["1-1-what-is-an-fde", "1.1 What is a Forward Deployed Engineer?"],
      ["1-2-fde-vs-adjacent-roles", "1.2 FDE vs. adjacent roles"],
      ["1-3-the-engagement-lifecycle", "1.3 The engagement lifecycle"],
      ["1-4-the-2026-fde-landscape", "1.4 The 2026 FDE landscape"]
    ]},
    { n: 2, dir: "phase-02-software-engineering", name: "Software engineering foundations", built: true, topics: [
      ["2-1-git-cli-linux-for-field-work", "2.1 Git, CLI & Linux for field work"],
      ["2-2-api-design-integration-patterns", "2.2 API design & integration patterns"],
      ["2-3-authentication-and-authorization", "2.3 Authentication & authorization"],
      ["2-4-debugging-under-pressure", "2.4 Debugging under pressure"]
    ]},
    { n: 3, dir: "phase-03-full-stack", name: "Full-stack for FDEs", built: true, topics: [
      ["3-1-frontend-essentials", "3.1 Frontend essentials"],
      ["3-2-backend-essentials", "3.2 Backend essentials"],
      ["3-3-databases-in-integration-contexts", "3.3 Databases in integration contexts"],
      ["3-4-background-jobs-and-webhooks", "3.4 Background jobs & webhooks"]
    ]},
    { n: 4, dir: "phase-04-cloud-infrastructure", name: "Cloud & infrastructure", built: true, topics: [
      ["4-1-cloud-fundamentals-that-transfer", "4.1 Cloud fundamentals that transfer"],
      ["4-2-networking-for-enterprise-environments", "4.2 Networking for enterprise environments"],
      ["4-3-containers-and-orchestration", "4.3 Containers & orchestration"],
      ["4-4-infrastructure-as-code-and-cicd", "4.4 Infrastructure as code & CI/CD"]
    ]},
    { n: 5, dir: "phase-05-devops-sre", name: "DevOps, SRE & observability", built: true, topics: [
      ["5-1-deployment-strategies", "5.1 Deployment strategies"],
      ["5-2-monitoring-logging-tracing", "5.2 Monitoring, logging & tracing"],
      ["5-3-slis-slos-and-incident-response", "5.3 SLIs, SLOs & incident response"],
      ["5-4-diagnosing-a-5x-slowdown", "5.4 Diagnosing a 5x slowdown"]
    ]},
    { n: 6, dir: "phase-06-enterprise-integration", name: "Enterprise integration", built: true, topics: [
      ["6-1-the-enterprise-environment-mindset", "6.1 The enterprise environment mindset"],
      ["6-2-identity-and-access-at-scale", "6.2 Identity & access at scale"],
      ["6-3-legacy-systems-and-investigation", "6.3 Legacy systems & investigation"],
      ["6-4-private-networking-and-hybrid-cloud", "6.4 Private networking & hybrid cloud"],
      ["6-5-api-gateways-and-integration-patterns", "6.5 API gateways & integration patterns"]
    ]},
    { n: 7, dir: "phase-07-ai-llm-deployment", name: "AI/LLM deployment for FDEs", built: true, topics: [
      ["7-1-from-api-to-enterprise-application", "7.1 From API to enterprise application"],
      ["7-2-ai-security-for-customer-deployments", "7.2 AI security for customer deployments"],
      ["7-3-evaluation-as-a-deliverable", "7.3 Evaluation as a deliverable"],
      ["7-4-mcp-and-enterprise-tool-integration", "7.4 MCP & enterprise tool integration"]
    ]},
    { n: 8, dir: "phase-08-system-design", name: "System design for FDE scenarios", built: true, topics: [
      ["8-1-the-fde-system-design-method", "8.1 The FDE system design method"],
      ["8-2-design-enterprise-document-search", "8.2 Design: enterprise document search"],
      ["8-3-design-a-customer-support-agent", "8.3 Design: a customer support agent"],
      ["8-4-design-for-private-network-constraints", "8.4 Design: private network constraints"]
    ]},
    { n: 9, dir: "phase-09-customer-consulting", name: "Customer & consulting skills", built: true, topics: [
      ["9-1-discovery-and-problem-framing", "9.1 Discovery & problem framing"],
      ["9-2-stakeholder-communication", "9.2 Stakeholder communication"],
      ["9-3-scope-and-expectation-management", "9.3 Scope & expectation management"],
      ["9-4-workshops-demos-and-tradeoffs", "9.4 Workshops, demos & tradeoffs"]
    ]},
    { n: 10, dir: "phase-10-business-product", name: "Business & product thinking", built: true, topics: [
      ["10-1-roi-and-business-impact", "10.1 ROI & business impact"],
      ["10-2-build-vs-buy-and-tco", "10.2 Build vs. buy & TCO"],
      ["10-3-domain-landscapes-across-industries", "10.3 Domain landscapes across industries"]
    ]},
    { n: 11, dir: "phase-11-security-governance", name: "Security & governance", built: true, topics: [
      ["11-1-owasp-llm-risks-in-deployment", "11.1 OWASP LLM risks in deployment"],
      ["11-2-data-governance-and-compliance", "11.2 Data governance & compliance"],
      ["11-3-red-teaming-and-guardrails", "11.3 Red teaming & guardrails"]
    ]},
    { n: 12, dir: "phase-12-capstones", name: "Capstone: the FDE engagement", built: true, topics: [
      ["12-1-capstone-full-engagement-simulation", "12.1 Capstone: full engagement simulation"],
      ["12-2-capstone-incident-under-pressure", "12.2 Capstone: incident under pressure"],
      ["12-3-capstone-portfolio-and-interview-prep", "12.3 Capstone: portfolio & interview prep"]
    ]}
  ];

  var STORAGE_KEY = "fde-track-visited";

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
  html += '<a class="sb-brand" href="' + prefix + 'index.html">FDE <span class="plain">Track</span></a>';
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
