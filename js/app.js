(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ============================================================
     DONNÉES
  ============================================================ */

  var ICONS = {
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16.2"/><circle cx="12" cy="7.6" r="0.9" fill="currentColor" stroke="none"/></svg>',
    pulse: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,12 7,12 9,6 13,18 16,12 22,12"/></svg>',
    scale: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="3" x2="12" y2="20"/><line x1="5" y1="7" x2="19" y2="7"/><path d="M5 7 L2.2 13.8a4 3.6 0 0 0 5.6 0Z"/><path d="M19 7 L16.2 13.8a4 3.6 0 0 0 5.6 0Z"/><line x1="8" y1="20" x2="16" y2="20"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7.5" height="7.5" rx="1.6"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.6"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.6"/></svg>',
    question: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.2 9.3a2.9 2.9 0 1 1 4.1 2.6c-1 .5-1.3 1.1-1.3 2.1"/><circle cx="12" cy="16.8" r="0.9" fill="currentColor" stroke="none"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 3 L13.7 9.9 20.5 12 13.7 14.1 12 21 10.3 14.1 3.5 12 10.3 9.9 Z"/></svg>',
    health: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><line x1="12" y1="7.5" x2="12" y2="16.5"/><line x1="7.5" y1="12" x2="16.5" y2="12"/></svg>',
    plane: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5 L12 21.5"/><path d="M12 8 L21 14.5 L21 16.5 L12 13.5 L3 16.5 L3 14.5 Z"/><path d="M9.5 19 L12 21.5 L14.5 19"/></svg>',
    tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12.6 L11.4 3.5 L20.5 3.5 L20.5 12.6 L11.9 21.5 Z"/><circle cx="15.5" cy="8" r="1.5" fill="currentColor" stroke="none"/></svg>',
    frame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.7"/><path d="M4.5 17.5 L9.5 12.5 L13.5 16.5 L16 14 L20 18"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11 L12 4 L20 11"/><path d="M6 9.5 L6 20 L18 20 L18 9.5"/><line x1="10" y1="20" x2="10" y2="14.5"/><line x1="14" y1="20" x2="14" y2="14.5"/></svg>'
  };

  var TABS = [
    { id: "explication", icon: ICONS.info, label: "Explication" },
    { id: "simulation", icon: ICONS.pulse, label: "Simulation" },
    { id: "comparatif", icon: ICONS.scale, label: "Comparatif" },
    { id: "cas-usage", icon: ICONS.grid, label: "Cas d'usage" },
    { id: "quiz", icon: ICONS.question, label: "Quiz" },
    { id: "sais-tu", icon: ICONS.spark, label: "Le sais-tu" }
  ];

  var STEPS = [
    { title: "Message", desc: "Vous saisissez un texte à envoyer, comme sur n'importe quelle messagerie." },
    { title: "Données binaires", desc: "Le texte est converti en une suite de 0 et de 1, le langage des ordinateurs." },
    { title: "Modulation de la LED", desc: "La LED de l'émetteur s'allume et s'éteint des millions de fois par seconde pour coder ces bits." },
    { title: "Propagation lumineuse", desc: "La lumière modulée traverse la pièce jusqu'au récepteur — invisible à l'œil nu." },
    { title: "Réception (photodiode)", desc: "Un capteur photosensible détecte les variations de lumière et les reconvertit en signal électrique." },
    { title: "Décodage", desc: "Le récepteur retraduit la suite de bits en données exploitables." },
    { title: "Message reçu", desc: "Le texte original s'affiche côté destinataire, identique à l'original." }
  ];

  var COMPARE_ROWS = [
    ["Débit (norme)", "10 Mb/s à 9,6 Gb/s au point d'accès (IEEE 802.11bb-2023)", "Variable selon la norme Wi-Fi utilisée"],
    ["Portée", "Généralement limitée à la pièce éclairée", "Plusieurs dizaines de mètres, traverse les murs"],
    ["Sécurité locale", "Signal en grande partie confiné à la zone éclairée", "Signal détectable au-delà des murs"],
    ["Interférences radio", "Aucune", "Sensible aux ondes environnantes"],
    ["Propagation dans un obstacle opaque", "Non — la lumière ne le traverse pas", "Oui, dans une certaine mesure"],
    ["Infrastructure", "Nécessite des LED ou sources optiques dédiées", "Box et routeurs déjà largement répandus"],
    ["Cas d'usage typique", "Hôpitaux, avions, zones sensibles", "Usage domestique et bureautique général"]
  ];

  var USE_CASES = [
    { icon: "health", title: "Hôpitaux", desc: "La communication optique peut présenter un intérêt dans certains environnements où l'utilisation des radiofréquences doit être maîtrisée." },
    { icon: "plane", title: "Avions", desc: "Les communications optiques peuvent constituer une solution complémentaire dans certains environnements où la gestion des radiofréquences est importante." },
    { icon: "tag", title: "Retail", desc: "Une géolocalisation indoor est envisageable via l'éclairage, comme cas d'usage potentiel dépendant de l'infrastructure et du système réellement déployés." },
    { icon: "frame", title: "Musées", desc: "Un point lumineux pourrait, selon l'installation retenue, déclencher un contenu numérique lorsqu'un visiteur oriente son smartphone vers lui." },
    { icon: "home", title: "Domotique", desc: "L'éclairage existant pourrait, dans certaines configurations, servir de support à des échanges de données avec des objets connectés." }
  ];

  var FACTS = [
    "Le terme « Li-Fi » (Light Fidelity) a été proposé par le professeur Harald Haas en 2011, lors d'une conférence TEDGlobal.",
    "Une LED peut moduler son intensité plusieurs millions de fois par seconde — bien trop vite pour que l'œil humain le perçoive.",
    "La norme IEEE 802.11bb-2023 définit des débits allant de 10 Mb/s à 9,6 Gb/s au point d'accès selon la couche physique utilisée.",
    "La lumière ne traverse pas les obstacles opaques comme les murs. Certaines communications optiques peuvent toutefois exploiter des réflexions et fonctionner sans ligne de vue directe parfaite.",
    "Les communications par lumière ne se limitent pas au spectre visible : IEEE 802.11bb-2023 spécifie aussi des transmissions en proche infrarouge, entre 800 et 1000 nm.",
    "Le Li-Fi peut s'appuyer sur l'éclairage déjà en place : une source lumineuse existante peut potentiellement servir de point d'accès.",
    "La lumière ne repose pas sur les radiofréquences comme le Wi-Fi, ce qui peut présenter un intérêt dans certains environnements où leur usage doit être maîtrisé.",
    "Le Li-Fi est étudié comme un complément du Wi-Fi pour des usages spécifiques, pas comme un remplacement généralisé."
  ];

  var SOURCES = [
    { label: "IEEE 802.11bb-2023", desc: "Norme définissant les communications par lumière (Light Communication) au sein de la famille IEEE 802.11." },
    { label: "IEEE Technology Navigator", desc: "Ressource de référence sur le Light Fidelity et les communications par lumière visible (Visible Light Communication)." },
    { label: "TEDGlobal 2011 — Harald Haas", desc: "Conférence à l'origine de la présentation publique du concept et du terme « Li-Fi »." }
  ];

  var LEVELS = [
    { min: 0, max: 3, title: "Découverte", msg: "Les bases commencent à s'éclairer. Parcours encore l'expérience pour progresser." },
    { min: 4, max: 6, title: "Explorateur Li-Fi", msg: "Tu maîtrises déjà plusieurs principes essentiels du Li-Fi." },
    { min: 7, max: 8, title: "Expert Photon", msg: "Très bonne compréhension de la communication par la lumière." },
    { min: 9, max: 10, title: "Maître de la lumière", msg: "Excellente maîtrise des principes présentés dans Li-Fi Explorer." }
  ];

  function getLevel(score) {
    for (var i = 0; i < LEVELS.length; i++) {
      if (score >= LEVELS[i].min && score <= LEVELS[i].max) return LEVELS[i];
    }
    return LEVELS[0];
  }

  var QUIZ = [
    { q: "Que signifie « Li-Fi » ?", options: ["Light Fidelity", "Linear Fiber", "Light Frequency", "Link Fidelity"], correct: 0, exp: "Li-Fi signifie « Light Fidelity ». Le nom fait écho à celui du Wi-Fi, mais attention : contrairement à une idée reçue, « Wi-Fi » n'est pas officiellement l'acronyme de « Wireless Fidelity »." },
    { q: "Quel composant émet les données en Li-Fi ?", options: ["Une antenne radio", "Une LED", "Un câble fibre optique", "Un haut-parleur"], correct: 1, exp: "La LED module son intensité lumineuse pour transmettre les données." },
    { q: "Quel composant reçoit le signal lumineux ?", options: ["Un microphone", "Une antenne", "Une photodiode", "Un aimant"], correct: 2, exp: "La photodiode (ou un capteur photosensible) détecte les variations de lumière." },
    { q: "Pourquoi ne voit-on pas la LED clignoter ?", options: ["Elle est infrarouge", "Elle clignote trop vite pour l'œil", "Elle est trop faible", "Elle est filtrée par un verre spécial"], correct: 1, exp: "La modulation est si rapide (millions de fois par seconde) que l'œil humain ne la perçoit pas." },
    { q: "Le Li-Fi peut-il traverser un mur ?", options: ["Oui, comme le Wi-Fi", "Non, la lumière ne traverse pas les obstacles opaques", "Seulement les murs fins", "Uniquement la nuit"], correct: 1, exp: "La lumière ne traverse pas un mur. Une ligne de vue directe est le cas le plus courant, mais certaines communications optiques peuvent aussi exploiter des réflexions pour fonctionner sans visibilité directe parfaite." },
    { q: "Quel est un avantage potentiel du Li-Fi en milieu hospitalier ?", options: ["Il chauffe moins", "Il ne repose pas sur les radiofréquences", "Il est gratuit", "Il fonctionne sans électricité"], correct: 1, exp: "La lumière ne repose pas sur les radiofréquences, ce qui peut présenter un intérêt dans certains environnements où leur usage doit être maîtrisé." },
    { q: "Qui a inventé le terme « Li-Fi » ?", options: ["Nikola Tesla", "Harald Haas", "Steve Jobs", "Claude Shannon"], correct: 1, exp: "Le professeur Harald Haas a introduit le terme en 2011 lors d'une conférence TED." },
    { q: "En quelle unité mesure-t-on le débit du Li-Fi ?", options: ["Watt", "Lumen", "Bit/s (ou Gbit/s)", "Décibel"], correct: 2, exp: "Comme pour le Wi-Fi, le débit se mesure en bits par seconde." },
    { q: "Le Li-Fi remplace-t-il totalement le Wi-Fi ?", options: ["Oui, systématiquement", "Non, les deux sont complémentaires", "Non, il est obsolète", "Oui, dans tous les avions"], correct: 1, exp: "Le Li-Fi est surtout envisagé comme complément du Wi-Fi dans des contextes spécifiques." },
    { q: "Le Li-Fi utilise-t-il uniquement la lumière visible ?", options: ["Oui, exclusivement", "Non, il peut aussi utiliser le proche infrarouge", "Non, il utilise les ultraviolets uniquement", "Non, il utilise des ondes sonores"], correct: 1, exp: "IEEE 802.11bb-2023 spécifie aussi des communications en proche infrarouge (800–1000 nm), en plus de la lumière visible." }
  ];

  /* ============================================================
     ROUTING
  ============================================================ */

  var screens = {};
  document.querySelectorAll(".screen").forEach(function (el) {
    var id = el.id.replace("screen-", "");
    screens[id] = el;
  });

  function goto(id) {
    Object.keys(screens).forEach(function (key) {
      screens[key].classList.toggle("active", key === id);
    });
    updateTabbars(id);
    window.scrollTo(0, 0);
    var main = screens[id];
    if (main) main.setAttribute("tabindex", "-1");
    syncTabbarHeight();
  }

  document.querySelectorAll("[data-goto]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      goto(btn.getAttribute("data-goto"));
    });
  });

  document.getElementById("btn-lancer").addEventListener("click", function () {
    goto("explication");
  });

  function buildTabbars() {
    document.querySelectorAll(".tabbar").forEach(function (bar) {
      TABS.forEach(function (tab) {
        var btn = document.createElement("button");
        btn.className = "tab-btn";
        btn.type = "button";
        btn.setAttribute("role", "tab");
        btn.dataset.tabTarget = tab.id;
        btn.innerHTML = '<span class="tab-icon" aria-hidden="true">' + tab.icon + '</span><span>' + tab.label + '</span>';
        btn.addEventListener("click", function () { goto(tab.id); });
        bar.appendChild(btn);
      });
    });
    syncTabbarHeight();
  }

  /**
   * Mesure la hauteur réelle de la barre de navigation (icônes + libellés
   * potentiellement sur deux lignes + safe-area) et l'expose en variable
   * CSS, pour que chaque écran réserve exactement l'espace nécessaire et
   * qu'aucun contenu ne se retrouve jamais masqué dessous.
   */
  function syncTabbarHeight() {
    var bar = document.querySelector(".tabbar");
    if (!bar) return;
    var h = bar.getBoundingClientRect().height;
    if (h > 0) {
      document.documentElement.style.setProperty("--tabbar-h", h + "px");
    }
  }

  window.addEventListener("resize", syncTabbarHeight);
  window.addEventListener("orientationchange", function () {
    setTimeout(syncTabbarHeight, 200);
  });

  function updateTabbars(activeId) {
    document.querySelectorAll(".tab-btn").forEach(function (btn) {
      var isActive = btn.dataset.tabTarget === activeId;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  /* ============================================================
     EXPLICATION
  ============================================================ */

  function renderSteps() {
    var container = document.getElementById("explication-steps");
    var html = "";
    STEPS.forEach(function (step, i) {
      html += '<div class="step-item">' +
        '<div class="step-num">' + (i + 1) + '</div>' +
        '<div class="step-body"><h3>' + step.title + '</h3><p>' + step.desc + '</p></div>' +
        '</div>';
      if (i < STEPS.length - 1) html += '<div class="step-connector"></div>';
    });
    container.innerHTML = html;
  }

  /* ============================================================
     COMPARATIF
  ============================================================ */

  function renderCompare() {
    var table = document.getElementById("compare-table");
    var html = '<tr><th>Critère</th><th>Li-Fi</th><th>Wi-Fi</th></tr>';
    COMPARE_ROWS.forEach(function (row) {
      html += '<tr><td>' + row[0] + '</td><td class="lifi">' + row[1] + '</td><td class="wifi">' + row[2] + '</td></tr>';
    });
    table.innerHTML = html;
  }

  /* ============================================================
     CAS D'USAGE
  ============================================================ */

  function renderUseCases() {
    var list = document.getElementById("usecase-list");
    var html = "";
    USE_CASES.forEach(function (uc) {
      html += '<div class="usecase-card">' +
        '<div class="usecase-icon" aria-hidden="true">' + ICONS[uc.icon] + '</div>' +
        '<div><h3>' + uc.title + '</h3><p>' + uc.desc + '</p></div>' +
        '</div>';
    });
    list.innerHTML = html;
  }

  /* ============================================================
     LE SAIS-TU
  ============================================================ */

  function renderFacts() {
    var list = document.getElementById("facts-list");
    var html = "";
    FACTS.forEach(function (fact, i) {
      html += '<div class="fact-card">' +
        '<span class="fact-num">Fait n°' + (i + 1) + '</span>' +
        '<p>' + fact + '</p>' +
        '</div>';
    });
    list.innerHTML = html;

    var sourcesList = document.getElementById("sources-list");
    var sHtml = "";
    SOURCES.forEach(function (s) {
      sHtml += '<div class="source-item">' +
        '<span class="source-label">' + s.label + '</span>' +
        '<p>' + s.desc + '</p>' +
        '</div>';
    });
    sourcesList.innerHTML = sHtml;
  }

  /* ============================================================
     SIMULATION
  ============================================================ */

  var PIPELINE_LABELS = ["Message", "Données", "Modulation", "Lumière", "Réception", "Décodage", "Reçu"];
  var simRunning = false;

  function textToBinary(str) {
    // Encodage UTF-8 (via TextEncoder) pour gérer correctement les accents
    // et caractères Unicode, chaque octet étant représenté sur 8 bits.
    var bytes = new TextEncoder().encode(str);
    var bits = "";
    for (var i = 0; i < bytes.length; i++) {
      bits += bytes[i].toString(2).padStart(8, "0");
    }
    return bits;
  }

  /**
   * Présentation compacte de la chaîne binaire sur mobile : un extrait
   * suivi de "…" pour les messages longs. Les données réellement
   * utilisées par la simulation (particules, etc.) restent inchangées.
   */
  function formatBinaryPreview(bin, limit) {
    limit = limit || 64;
    if (bin.length <= limit) return bin;
    return bin.slice(0, limit) + "…";
  }

  function renderPipeline(activeIndex, doneUpTo) {
    var el = document.getElementById("sim-pipeline");
    var html = "";
    PIPELINE_LABELS.forEach(function (label, i) {
      var cls = "pipeline-stage";
      if (i === activeIndex) cls += " active";
      else if (i <= doneUpTo) cls += " done";
      html += '<div class="' + cls + '">' + label + '</div>';
    });
    el.innerHTML = html;
  }

  function sleep(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  function setNodeActive(id, active) {
    document.getElementById(id).classList.toggle("active", active);
  }

  function pingNode(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("pulse-ring");
    // force reflow pour permettre de rejouer l'animation si déclenchée à nouveau rapidement
    void el.offsetWidth;
    el.classList.add("pulse-ring");
    setTimeout(function () { el.classList.remove("pulse-ring"); }, 750);
  }

  function setChannelOn(on) {
    document.getElementById("sim-channel").classList.toggle("on", on);
  }

  /**
   * Anime le flux de particules (bits) le long du canal photonique,
   * de l'émetteur vers le récepteur. La majorité des bits voyagent sous
   * forme de particules lumineuses (cyan, quelques violettes) ; une
   * petite partie s'affiche explicitement comme chiffre "0"/"1" pour
   * garder l'intérêt pédagogique, sans surcharger l'écran de chiffres.
   */
  function spawnParticles(binary) {
    return new Promise(function (resolve) {
      var holder = document.getElementById("beam-particles");
      holder.innerHTML = "";

      var maxBits = 40;
      var bits = binary.slice(0, maxBits);

      if (prefersReducedMotion) {
        setTimeout(resolve, 250);
        return;
      }

      var travelDuration = 0.9; // secondes
      var stagger = 55; // ms entre deux particules
      var violetEvery = 5;
      var digitEvery = 6; // un bit sur six s'affiche explicitement en chiffre

      for (var i = 0; i < bits.length; i++) {
        (function (i) {
          setTimeout(function () {
            var p = document.createElement("div");
            var showDigit = i % digitEvery === 3;
            if (showDigit) {
              p.className = "beam-particle beam-bit" + (bits[i] === "0" ? " bit-off" : "");
              p.textContent = bits[i];
            } else {
              p.className = "beam-particle" + (bits[i] === "0" ? " bit-off" : (i % violetEvery === 0 ? " violet" : ""));
            }
            p.style.animationDuration = travelDuration + "s";
            holder.appendChild(p);
            p.addEventListener("animationend", function () {
              p.remove();
            });
          }, i * stagger);
        })(i);
      }

      var totalTime = bits.length * stagger + travelDuration * 1000;
      setTimeout(resolve, totalTime);
    });
  }

  async function runSimulation() {
    if (simRunning) return;
    var input = document.getElementById("sim-input");
    var message = (input.value || "").trim();
    if (!message) {
      input.focus();
      input.placeholder = "Écris d'abord un message…";
      return;
    }
    simRunning = true;
    document.getElementById("sim-send").disabled = true;
    document.getElementById("sim-output").textContent = "Transmission en cours…";
    document.getElementById("sim-binary").textContent = "";

    var binary = textToBinary(message);
    var stepDelay = prefersReducedMotion ? 120 : 380;

    renderPipeline(0, -1);
    await sleep(stepDelay);

    renderPipeline(1, 0);
    document.getElementById("sim-binary").textContent = formatBinaryPreview(binary);
    await sleep(stepDelay);

    renderPipeline(2, 1);
    setNodeActive("channel-emitter", true);
    setChannelOn(true);
    pingNode("channel-emitter");
    await sleep(stepDelay);

    renderPipeline(3, 2);
    await spawnParticles(binary);

    renderPipeline(4, 3);
    setNodeActive("channel-receiver", true);
    pingNode("channel-receiver");
    await sleep(stepDelay);

    renderPipeline(5, 4);
    await sleep(stepDelay);

    renderPipeline(6, 5);
    document.getElementById("sim-output").textContent = message;
    await sleep(150);
    renderPipeline(6, 6);

    setChannelOn(false);
    setNodeActive("channel-emitter", false);
    setNodeActive("channel-receiver", false);

    simRunning = false;
    document.getElementById("sim-send").disabled = false;
  }

  function resetSimulation() {
    document.getElementById("sim-input").value = "";
    document.getElementById("sim-output").textContent = "En attente d'une transmission…";
    document.getElementById("sim-binary").textContent = "";
    renderPipeline(-1, -1);
    setChannelOn(false);
    setNodeActive("channel-emitter", false);
    setNodeActive("channel-receiver", false);
    var holder = document.getElementById("beam-particles");
    if (holder) holder.innerHTML = "";
  }

  /* ============================================================
     QUIZ
  ============================================================ */

  var quizState = { index: 0, score: 0, answered: false };

  function startQuiz() {
    quizState = { index: 0, score: 0, answered: false };
    document.getElementById("quiz-play").style.display = "";
    document.getElementById("quiz-result").style.display = "none";
    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    var q = QUIZ[quizState.index];
    document.getElementById("quiz-count").textContent = "Question " + (quizState.index + 1) + " / " + QUIZ.length;
    document.getElementById("quiz-score-live").textContent = "Score : " + quizState.score;
    document.getElementById("quiz-progress").style.width = ((quizState.index) / QUIZ.length * 100) + "%";
    document.getElementById("quiz-question").textContent = q.q;

    var optsEl = document.getElementById("quiz-options");
    optsEl.innerHTML = "";
    q.options.forEach(function (opt, i) {
      var btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.type = "button";
      btn.textContent = opt;
      btn.addEventListener("click", function () { answerQuiz(i, btn); });
      optsEl.appendChild(btn);
    });

    var expEl = document.getElementById("quiz-explanation");
    expEl.classList.remove("show");
    expEl.textContent = "";
    document.getElementById("quiz-next").disabled = true;
    quizState.answered = false;
  }

  function answerQuiz(selectedIndex, btnEl) {
    if (quizState.answered) return;
    quizState.answered = true;
    var q = QUIZ[quizState.index];
    var options = document.querySelectorAll("#quiz-options .quiz-option");
    options.forEach(function (opt, i) {
      opt.disabled = true;
      if (i === q.correct) opt.classList.add("correct");
      else if (i === selectedIndex) opt.classList.add("wrong");
    });
    if (selectedIndex === q.correct) quizState.score++;

    document.getElementById("quiz-score-live").textContent = "Score : " + quizState.score;
    var expEl = document.getElementById("quiz-explanation");
    expEl.textContent = q.exp;
    expEl.classList.add("show");
    document.getElementById("quiz-next").disabled = false;
  }

  function nextQuizQuestion() {
    if (!quizState.answered) return;
    quizState.index++;
    if (quizState.index >= QUIZ.length) {
      finishQuiz();
    } else {
      renderQuizQuestion();
    }
  }

  function finishQuiz() {
    document.getElementById("quiz-progress").style.width = "100%";
    document.getElementById("quiz-play").style.display = "none";
    document.getElementById("quiz-result").style.display = "";
    document.getElementById("quiz-final-score").textContent = quizState.score + "/" + QUIZ.length;

    var level = getLevel(quizState.score);
    document.getElementById("quiz-level-title").textContent = level.title;
    document.getElementById("quiz-level-msg").textContent = level.msg;

    var best = 0;
    try {
      best = parseInt(localStorage.getItem("lifi-quiz-best") || "0", 10);
    } catch (e) { best = 0; }
    if (quizState.score > best) {
      best = quizState.score;
      try { localStorage.setItem("lifi-quiz-best", String(best)); } catch (e) {}
    }
    document.getElementById("quiz-best-score").textContent = "Meilleur score : " + best + "/" + QUIZ.length;
  }

  /* ============================================================
     INIT
  ============================================================ */

  function init() {
    buildTabbars();
    renderSteps();
    renderCompare();
    renderUseCases();
    renderFacts();
    resetSimulation();
    startQuiz();

    document.getElementById("sim-send").addEventListener("click", runSimulation);
    document.getElementById("sim-input").addEventListener("keydown", function (e) {
      if (e.key === "Enter") runSimulation();
    });
    document.getElementById("sim-reset").addEventListener("click", resetSimulation);
    document.getElementById("quiz-next").addEventListener("click", nextQuizQuestion);
    document.getElementById("quiz-restart").addEventListener("click", startQuiz);

    updateTabbars("accueil");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  /* ============================================================
     PWA — Service worker
  ============================================================ */

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }
})();
