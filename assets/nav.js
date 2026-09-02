(function () {
  "use strict";

  var SITE = [
    { n: 1, dir: "phase-01-foundations", name: "Foundations", topics: [
      ["1-1-what-is-an-ai-engineer", "1.1 What is an AI engineer in 2026?"],
      ["1-2-how-llms-work", "1.2 How LLMs actually work"],
      ["1-3-prompting-as-engineering", "1.3 Prompting as an engineering skill"],
      ["1-4-ai-engineering-stack", "1.4 The AI engineering stack"],
      ["1-5-first-llm-call", "1.5 Your first LLM call"]
    ]},
    { n: 2, dir: "phase-02-transformers", name: "Transformers & foundation models", topics: [
      ["2-1-tokenization-bpe", "2.1 Tokenization & byte-pair encoding"],
      ["2-2-embeddings-vector-space", "2.2 Embeddings & vector space"],
      ["2-3-attention-deep-dive", "2.3 Attention mechanism deep dive"],
      ["2-4-transformers-vs-rnns", "2.4 Why transformers replaced RNNs"],
      ["2-5-context-windows-models", "2.5 Context windows & model families"]
    ]},
    { n: 3, dir: "phase-03-prompt-engineering", name: "Prompt engineering deep dive", topics: [
      ["3-1-advanced-reasoning-patterns", "3.1 Advanced reasoning patterns"],
      ["3-2-structured-output-schemas", "3.2 Structured output & schemas"],
      ["3-3-system-prompt-design", "3.3 System prompt design patterns"],
      ["3-4-prompt-injection-security", "3.4 Prompt injection & security risks"],
      ["3-5-prompt-chaining-decomposition", "3.5 Prompt chaining & decomposition"]
    ]},
    { n: 4, dir: "phase-04-llm-apis", name: "Working with LLM APIs", topics: [
      ["4-1-streaming-responses", "4.1 Streaming responses"],
      ["4-2-function-calling-tool-use", "4.2 Function calling & tool use"],
      ["4-3-async-concurrent-requests", "4.3 Async & concurrent requests"],
      ["4-4-cost-token-accounting", "4.4 Cost & token accounting"]
    ]},
    { n: 5, dir: "phase-05-embeddings-vector-search", name: "Embeddings & vector search", topics: [
      ["5-1-embedding-models-practice", "5.1 Embedding models in practice"],
      ["5-2-vector-index-internals", "5.2 Vector index internals: HNSW vs IVF"],
      ["5-3-chunking-strategies", "5.3 Chunking strategies"],
      ["5-4-hybrid-search", "5.4 Hybrid search"]
    ]},
    { n: 6, dir: "phase-06-rag-systems", name: "RAG systems", topics: [
      ["6-1-rag-architecture-end-to-end", "6.1 RAG architecture end-to-end"],
      ["6-2-reranking", "6.2 Reranking"],
      ["6-3-hyde-query-transformation", "6.3 HyDE & query transformation"],
      ["6-4-evaluating-retrieval-quality", "6.4 Evaluating retrieval quality"],
      ["6-5-knowledge-graphs-for-rag", "6.5 Knowledge graphs for RAG"]
    ]},
    { n: 7, dir: "phase-07-multi-llm-orchestration", name: "Multi-LLM orchestration", topics: [
      ["7-1-routing-strategies", "7.1 Routing strategies"],
      ["7-2-fallback-chains", "7.2 Fallback chains"],
      ["7-3-orchestration-frameworks", "7.3 Orchestration frameworks"],
      ["7-4-caching-strategies", "7.4 Caching strategies"],
      ["7-5-multi-provider-abstraction", "7.5 Multi-provider abstraction layers"]
    ]},
    { n: 8, dir: "phase-08-ai-agents", name: "AI agents", topics: [
      ["8-1-react-loop", "8.1 The ReAct loop"],
      ["8-2-tool-design-for-agents", "8.2 Tool design for agents"],
      ["8-3-multi-agent-patterns", "8.3 Multi-agent patterns"],
      ["8-4-agent-memory-systems", "8.4 Agent memory systems"]
    ]},
    { n: 9, dir: "phase-09-evaluation", name: "Evaluation", topics: [
      ["9-1-golden-datasets", "9.1 Golden datasets"],
      ["9-2-llm-as-judge", "9.2 LLM-as-judge"],
      ["9-3-offline-vs-online-evals", "9.3 Offline vs. online evals"],
      ["9-4-building-eval-pipeline", "9.4 Building an eval pipeline"]
    ]},
    { n: 10, dir: "phase-10-fine-tuning", name: "Fine-tuning & adaptation", topics: [
      ["10-1-when-to-fine-tune", "10.1 When to fine-tune vs. prompt or RAG"],
      ["10-2-lora-qlora-peft", "10.2 LoRA, QLoRA & PEFT"],
      ["10-3-alignment-dpo-rlhf", "10.3 Alignment: DPO vs. RLHF"],
      ["10-4-fine-tuning-workflow", "10.4 Fine-tuning workflow & failure modes"]
    ]},
    { n: 11, dir: "phase-11-production-mlops", name: "Production & MLOps", topics: [
      ["11-1-deployment-patterns", "11.1 Deployment patterns"],
      ["11-2-monitoring-observability", "11.2 Monitoring & observability"],
      ["11-3-drift-detection", "11.3 Drift detection"],
      ["11-4-incident-response", "11.4 Incident response & production readiness"],
      ["11-5-containerization-for-ai-services", "11.5 Containerization for AI services"]
    ]},
    { n: 12, dir: "phase-12-capstones", name: "Capstone projects", topics: [
      ["12-1-capstone-rag-with-evals", "12.1 Capstone: RAG system with evaluation"],
      ["12-2-capstone-tool-using-agent", "12.2 Capstone: Tool-using agent"],
      ["12-3-capstone-multi-llm-app", "12.3 Capstone: Multi-LLM orchestrated app"]
    ]}
  ];

  var STORAGE_KEY = "ai-architect-visited";

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

  // Determine relative path prefix ("" at root, "../" one level deep)
  var path = window.location.pathname;
  var atRoot = !/\/phase-\d\d-[a-z-]+\//.test(path);
  var prefix = atRoot ? "" : "../";

  // Identify current slug (filename without extension) for active-state matching
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

  // ---- Build sidebar HTML ----
  var html = '';
  html += '<a class="sb-brand" href="' + prefix + 'index.html">AI <span class="plain">Architect</span></a>';
  html += '<div class="sb-progress-wrap"><div class="sb-progress-label"><span>Progress</span><strong>' + visitedTopics + ' / ' + totalTopics + '</strong></div>';
  html += '<div class="sb-progress-track"><div class="sb-progress-fill" style="width:' + Math.round((visitedTopics / totalTopics) * 100) + '%"></div></div></div>';

  SITE.forEach(function (ph) {
    var hasActive = ph.topics.some(function (t) { return t[0] === currentFile; });
    var completeCount = ph.topics.filter(function (t) { return visited[t[0]]; }).length;
    var isComplete = completeCount === ph.topics.length;
    var openClass = hasActive ? " open" : "";
    var stateClass = isComplete ? " complete" : (hasActive ? " has-active" : "");

    html += '<div class="sb-phase' + openClass + stateClass + '">';
    html += '<button class="sb-phase-head" type="button" aria-expanded="' + (hasActive ? "true" : "false") + '">';
    html += '<span class="sb-phase-num">' + (isComplete ? "✓" : ph.n) + '</span>';
    html += '<span class="sb-phase-name">' + ph.name + '</span>';
    html += '<svg class="sb-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';
    html += '</button>';
    html += '<div class="sb-topics">';
    ph.topics.forEach(function (t) {
      var isActive = t[0] === currentFile;
      var isVisited = !!visited[t[0]];
      html += '<a class="sb-topic' + (isActive ? " active" : "") + (isVisited ? " visited" : "") + '" href="' + prefix + ph.dir + '/' + t[0] + '.html">';
      html += '<span class="sb-dot"></span><span>' + t[1] + '</span></a>';
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

  // Toggle collapsible phase groups
  aside.querySelectorAll(".sb-phase-head").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var group = btn.closest(".sb-phase");
      var wasOpen = group.classList.contains("open");
      aside.querySelectorAll(".sb-phase.open").forEach(function (g) { g.classList.remove("open"); });
      if (!wasOpen) group.classList.add("open");
    });
  });

  // Mobile hamburger button, injected into existing topnav
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
})();

// ---- Homepage phase-card progress decoration ----
(function () {
  var cards = document.querySelectorAll(".phase-card[data-phase]");
  if (!cards.length) return;
  var visited;
  try { visited = JSON.parse(localStorage.getItem("ai-architect-visited")) || {}; } catch (e) { visited = {}; }

  var SITE_BY_NUM = {};
  document.querySelectorAll("script").length; // no-op, keep linter calm

  cards.forEach(function (card) {
    var n = parseInt(card.getAttribute("data-phase"), 10);
    var total = parseInt(card.getAttribute("data-total"), 10);
    // topic slugs are embedded as a data attribute, comma-separated
    var slugs = (card.getAttribute("data-slugs") || "").split(",").filter(Boolean);
    var done = slugs.filter(function (s) { return visited[s]; }).length;
    var fill = card.querySelector(".phase-card-bar-fill");
    var count = card.querySelector(".phase-card-count");
    if (fill) fill.style.width = Math.round((done / total) * 100) + "%";
    if (count) count.textContent = done + " / " + total + " done";
  });
})();
