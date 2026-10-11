(function () {
  "use strict";

  var SITE = [
    { n: 1, dir: "phase-01-cloud-foundations", name: "Cloud foundations", built: true, topics: [
      ["1-1-how-azure-is-organised", "1.1 How Azure is organised"],
      ["1-2-identity-and-rbac", "1.2 Identity and RBAC"],
      ["1-3-cost-management-and-budgets", "1.3 Cost management and budgets"],
      ["1-4-ways-to-drive-azure", "1.4 Ways to drive Azure"]
    ]},
    { n: 2, dir: "phase-02-compute-and-apps", name: "Compute and apps", built: true, topics: [
      ["2-1-virtual-machines-and-scale-sets", "2.1 Virtual machines and scale sets"],
      ["2-2-app-service", "2.2 App Service"],
      ["2-3-azure-functions", "2.3 Azure Functions"],
      ["2-4-containers-aci-container-apps-aks", "2.4 Containers: ACI, Container Apps and AKS"]
    ]},
    { n: 3, dir: "phase-03-networking", name: "Networking", built: true, topics: [
      ["3-1-virtual-networks-subnets-nsgs", "3.1 Virtual networks, subnets and NSGs"],
      ["3-2-private-endpoints-and-dns", "3.2 Private endpoints and DNS"],
      ["3-3-hub-spoke-vpn-expressroute-firewall", "3.3 Hub and spoke, VPN, ExpressRoute and Firewall"],
      ["3-4-load-balancing-options", "3.4 Load balancing options"]
    ]},
    { n: 4, dir: "phase-04-storage-and-databases", name: "Storage and databases", built: true, topics: [
      ["4-1-storage-accounts-and-data-lake-gen2", "4.1 Storage accounts and Data Lake Gen2"],
      ["4-2-azure-sql", "4.2 Azure SQL"],
      ["4-3-cosmos-db", "4.3 Cosmos DB"],
      ["4-4-postgresql-pgvector-choosing-a-database", "4.4 PostgreSQL, pgvector and choosing a database"]
    ]},
    { n: 5, dir: "phase-05-security", name: "Security", built: true, topics: [
      ["5-1-managed-identities-and-workload-identity-federation", "5.1 Managed identities and workload identity federation"],
      ["5-2-key-vault-and-app-configuration", "5.2 Key Vault and App Configuration"],
      ["5-3-policy-defender-and-security-posture", "5.3 Policy, Defender and security posture"]
    ]},
    { n: 6, dir: "phase-06-infrastructure-as-code", name: "Infrastructure as code", built: true, topics: [
      ["6-1-bicep-fundamentals", "6.1 Bicep fundamentals"],
      ["6-2-bicep-modules-what-if-deployment-stacks", "6.2 Bicep in practice: modules, what-if and deployment stacks"],
      ["6-3-terraform-on-azure", "6.3 Terraform on Azure"],
      ["6-4-choosing-bicep-terraform-azapi-avm", "6.4 Choosing: Bicep, Terraform, AzAPI and Verified Modules"],
      ["6-5-ci-cd-github-actions-azure-devops-azd", "6.5 CI/CD: GitHub Actions, Azure DevOps and azd"]
    ]},
    { n: 7, dir: "phase-07-data-engineering", name: "Data engineering", built: true, topics: [
      ["7-1-lake-design-and-medallion", "7.1 Lake design and the medallion pattern"],
      ["7-2-orchestration", "7.2 Orchestration: Data Factory, Synapse, Fabric and workflows"],
      ["7-3-engines-synapse-fabric-databricks", "7.3 Engines: Synapse, Fabric and Databricks"],
      ["7-4-data-modeling-scd", "7.4 Data modeling: facts, dimensions and slowly changing data"],
      ["7-5-streaming", "7.5 Streaming: Event Hubs, Stream Analytics, Spark and Fabric real time"],
      ["7-6-governance-and-lineage", "7.6 Governance and lineage: Purview, Unity Catalog and OpenLineage"],
      ["7-7-serving-to-bi", "7.7 Serving to BI: Import, DirectQuery and Direct Lake"]
    ]},
    { n: 8, dir: "phase-08-ai-and-ml", name: "AI and ML", built: true, topics: [
      ["8-1-foundry-and-model-access", "8.1 Foundry and model access"],
      ["8-2-rag-on-azure", "8.2 RAG on Azure: AI Search or pgvector"],
      ["8-3-agents-on-azure", "8.3 Agents on Azure"],
      ["8-4-training-and-serving-ml", "8.4 Training and serving ML: Azure ML or Databricks"],
      ["8-5-prebuilt-ai-services-vs-llms", "8.5 Prebuilt AI services versus LLMs"],
      ["8-6-evaluate-and-observe-ai-apps", "8.6 Evaluate and observe AI apps"]
    ]},
    { n: 9, dir: "phase-09-operations", name: "Operations", built: true, topics: [
      ["9-1-azure-monitor-and-kql", "9.1 Azure Monitor and KQL"],
      ["9-2-reliability-and-waf", "9.2 Reliability and the Well-Architected Framework"],
      ["9-3-landing-zones", "9.3 Landing zones and governance at scale"],
      ["9-4-cost-optimisation", "9.4 Cost optimisation"]
    ]},
    { n: 10, dir: "phase-10-certifications-and-capstone", name: "Certifications and capstone", built: true, topics: [
      ["10-1-certification-path", "10.1 Certification path"],
      ["10-2-practice-projects", "10.2 Practice projects"],
      ["10-3-capstone-landing-zone-from-code", "10.3 Capstone: a landing zone from code"]
    ]}
  ];

  var STORAGE_KEY = "azure-track-visited";

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
  html += '<a class="sb-brand" href="' + prefix + 'index.html">Azure <span class="plain">Track</span></a>';
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
