// ── Navbar scroll effect ─────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Hamburger / mobile menu ───────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        const open = hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
    });
    document.querySelectorAll('.mobile-nav-link, .mobile-menu .btn').forEach(el => {
        el.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

// ── Scroll reveal ─────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Contact form ──────────────────────────────────
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = 'Sending…';
        setTimeout(() => {
            form.reset();
            formSuccess.classList.add('visible');
            btn.disabled = false;
            btn.innerHTML = `Send Message <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
            setTimeout(() => formSuccess.classList.remove('visible'), 6000);
        }, 1000);
    });
}

// ── Smooth anchor scroll ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ══════════════════════════════════════════════════
// AI DEMO ENGINE
// ══════════════════════════════════════════════════

const SCENARIOS = {
    support: {
        userMsg: "How would you automate our customer support?",
        tools: [
            { fn: "analyze_tickets",        args: '{ period: "90d" }',               result: "12,400 tickets · 73% are tier-1 resolvable", ms: 900 },
            { fn: "index_knowledge_base",   args: '{ source: "help_center" }',        result: "847 articles indexed · 94.2% coverage",     ms: 750 },
            { fn: "design_resolution_flow", args: '{ channels: ["chat","email"] }',   result: "3-stage flow · escalation path defined",     ms: 800 },
        ],
        response:
`Here's what I'd build for your support operation:

**Tier-1 resolution agent** — handles ~70% of incoming volume without any human involvement.

**Architecture:**
→ RAG retrieval over your 847 KB articles (semantic search, not keyword match)
→ Tool-use loop for account lookups, order status, password resets, and refunds
→ Confidence threshold: below 0.82, the ticket auto-escalates to a human agent
→ Full conversation audit trail per ticket for compliance

**What it resolves automatically:**
→ Billing questions · how-to requests · account changes · status lookups
→ Standard refund requests · reset flows · FAQ variants

**What it always escalates:**
→ Complaints requiring empathy · legal exposure · genuine edge cases

**Projected deflection: 68–72%** of your current ticket volume.

Stack: Claude API · FastAPI · pgvector · your existing helpdesk via webhook.
Timeline: **6–8 weeks** to production. Want me to scope the data requirements?`
    },

    sales: {
        userMsg: "What's causing our sales pipeline to stall?",
        tools: [
            { fn: "pull_crm_data",      args: '{ stages: "all" }',       result: "1,847 deals fetched across 6 stages",  ms: 800 },
            { fn: "identify_dropoffs",  args: '{ threshold: 0.3 }',      result: "Stage 3→4: 61% drop-off detected",     ms: 950 },
            { fn: "analyze_velocity",   args: '{ segment: "enterprise" }',result: "Avg. 47 days stalled in stage 3",      ms: 700 },
        ],
        response:
`Pulled your pipeline data. The bottleneck is clear:

**Stage 3 → 4 is where 61% of deals die.** Enterprise deals average 47 days stuck there — more than twice your target velocity.

Pattern analysis shows three clusters:

**Cluster 1 — No internal champion (44% of stalled deals)**
→ Deal was sold to the wrong stakeholder. Nobody pushing it forward internally.
→ Fix: flag deals with zero champion activity after 10 days · auto-draft re-engagement

**Cluster 2 — Technical validation incomplete (33%)**
→ The buyer's engineering team has questions your AEs can't answer.
→ Fix: trigger an SE intro or auto-surface the right technical doc based on objection signals

**Cluster 3 — Price before value (23%)**
→ Pricing conversation happened before ROI was established.
→ Fix: block price discussion in CRM until ROI calculator is completed

**What I'd build:** An AI deal coach on top of your CRM — monitors signals, flags at-risk deals at day 14, and drafts the right next action per cluster. Not generic follow-ups.

Timeline: **4–6 weeks.** Works on Salesforce or HubSpot. Want the full architecture?`
    },

    cloud: {
        userMsg: "Can AI help reduce our cloud infrastructure costs?",
        tools: [
            { fn: "scan_cloud_spend",        args: '{ provider: "aws", period: "30d" }', result: "$84,200/mo · EC2 is 67% of spend",     ms: 900 },
            { fn: "identify_idle_resources", args: '{ util_threshold: 0.15 }',           result: "34 underutilized instances found",      ms: 800 },
            { fn: "model_savings",           args: '{ actions: ["rightsize","spot"] }',  result: "~$29k/mo projected savings",            ms: 700 },
        ],
        response:
`Scanned your AWS environment. Here's what's burning budget:

**$84,200/month in current spend. ~35% is recoverable without touching performance.**

The wins, in order of effort:

**1. Rightsize 34 underutilized EC2 instances — saves $11,200/mo**
→ Your prod API cluster is sized for peak load. All the time. Auto-scaling + right-sized baseline fixes this immediately.

**2. Convert stable workloads to Reserved Instances — saves $8,800/mo**
→ Database fleet and core services have predictable load. 1-year reserved pricing cuts the bill significantly.

**3. Move batch jobs to Spot — saves $9,000/mo**
→ Nightly ETL, ML training, report generation — all interruptible. Spot pricing is 70–90% cheaper.

**Total: ~$29,000/month recovered.** That's $348k/year back in your budget.

On top of the savings: I'd build an **AI cost monitor** that flags spend anomalies in real time, auto-tags resources by team, and surfaces new optimizations as your infrastructure evolves.

Timeline: **3 weeks** for audit + execution. Want the full service-by-service breakdown?`
    },

    fraud: {
        userMsg: "Build a fraud detection system for our payment platform.",
        tools: [
            { fn: "analyze_transactions",    args: '{ sample: "500k", window: "90d" }', result: "0.3% fraud rate · 7 distinct patterns",  ms: 1000 },
            { fn: "identify_patterns",       args: '{ min_confidence: 0.8 }',           result: "Velocity · geo-spoofing · synthetic ID",  ms: 800  },
            { fn: "design_detection_stack",  args: '{ latency_sla: "<50ms" }',          result: "2-layer architecture · sub-50ms feasible", ms: 750 },
        ],
        response:
`Analyzed 500k transactions. Here's the architecture I'd build:

**Two-layer detection — rules fast, model accurate.**

**Layer 1: Rules Engine (< 5ms)**
→ Hard blocks for unambiguous signals: impossible geo (NYC + Tokyo in 2 hrs)
→ Transaction velocity breaches · known bad device fingerprints · high-risk merchant combos
→ Catches ~60% of fraud before a model is ever needed

**Layer 2: ML Model (< 50ms)**
→ Gradient-boosted classifier trained on your 7 identified fraud patterns
→ Features: transaction graph · user behavioral baseline · device reputation · network signals
→ Retrained weekly on newly-labeled data — adapts as fraud patterns evolve

**The 7 patterns in your data:**
→ Account takeover via credential stuffing · synthetic identity fraud in onboarding
→ Card testing on micro-transactions · refund abuse · promo stacking
→ Two emerging patterns — flag and monitor, don't hard-block yet

**False positive target: < 0.5%.** Your review team handles the remainder.

Stack: Kafka · XGBoost · FastAPI · Redis (velocity counters) · Postgres (rules) · your existing AWS.
Timeline: **10–12 weeks** to production. Want to start with a prototype on your historical data?`
    }
};

// ── Helpers ───────────────────────────────────────
const sleep = ms => new Promise(r => setTimeout(r, ms));

function esc(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Parse response text into typed segments for streaming
function parseSegments(text) {
    const segs = [];
    let i = 0;
    while (i < text.length) {
        if (text[i] === '\n') {
            segs.push({ type: 'br' });
            i++;
        } else if (text[i] === '*' && text[i + 1] === '*') {
            const end = text.indexOf('**', i + 2);
            if (end !== -1) {
                segs.push({ type: 'bold', text: text.slice(i + 2, end) });
                i = end + 2;
            } else {
                segs.push({ type: 'text', text: '**' });
                i += 2;
            }
        } else if (text[i] === '→') {
            segs.push({ type: 'arrow', text: '→' });
            i++;
        } else {
            let j = i + 1;
            while (j < text.length && text[j] !== '\n' && text[j] !== '*' && text[j] !== '→') j++;
            segs.push({ type: 'text', text: text.slice(i, j) });
            i = j;
        }
    }
    return segs;
}

// ── DOM refs ──────────────────────────────────────
const tMsgs    = document.getElementById('tMsgs');
const tActLog  = document.getElementById('tActLog');
const tInput   = document.getElementById('tInput');
const tSend    = document.getElementById('tSend');
const tStatus  = document.getElementById('tStatus');
const tLabel   = document.getElementById('tStatusLabel');
const chipWrap = document.getElementById('demoChips');
const demoTerminal = document.querySelector('.demo-terminal');
const agentCore = document.getElementById('agentCore');
const orbit     = document.getElementById('orbit');
const coreState = document.getElementById('coreState');
const telLatency = document.getElementById('telLatency');
const telTokens  = document.getElementById('telTokens');
const telTools   = document.getElementById('telTools');
const telConf    = document.getElementById('telConf');

if (!tMsgs) throw new Error('Demo elements not found');

// ── State ─────────────────────────────────────────
let running = false;
let toolCount = 0;
let telTimer = null;

// ── Agent core / orb state ────────────────────────
function setOrb(state, label) {
    agentCore.className = 'agent-core' + (state ? ' ' + state : '');
    coreState.textContent = label;
}

// Short mono labels for orbiting tool nodes, e.g. analyze_tickets → AT
function shortLabel(fn) {
    return fn.split('_').map(w => w[0]).join('').slice(0, 3).toUpperCase();
}

// Lay out tool nodes evenly around the orbit ring
function buildOrbit(tools) {
    orbit.innerHTML = '';
    const r = 58, c = 70;
    return tools.map((t, i) => {
        const ang = (-90 + i * (360 / tools.length)) * Math.PI / 180;
        const n = document.createElement('div');
        n.className = 'orbit-node';
        n.style.left = (c + r * Math.cos(ang)) + 'px';
        n.style.top  = (c + r * Math.sin(ang)) + 'px';
        n.innerHTML = `<span>${shortLabel(t.fn)}</span>`;
        orbit.appendChild(n);
        return n;
    });
}

// ── Telemetry HUD ─────────────────────────────────
function resetTelemetry() {
    toolCount = 0;
    telTools.textContent = '0';
    telLatency.textContent = '—';
    telTokens.textContent = '—';
    telConf.textContent = '—';
}
function startTelemetry() {
    telTimer = setInterval(() => {
        telLatency.textContent = (26 + Math.floor(Math.random() * 38)) + 'ms';
        telTokens.textContent  = (64 + Math.floor(Math.random() * 88));
    }, 110);
}
function stopTelemetry() {
    clearInterval(telTimer); telTimer = null;
    telTokens.textContent = '—';
    telLatency.textContent = '42ms';
}
function rampConfidence(target) {
    let v = 0;
    const t = setInterval(() => {
        v += 4;
        if (v >= target) { v = target; clearInterval(t); }
        telConf.textContent = v + '%';
    }, 24);
}

// ── Reasoning stream entry ────────────────────────
function appendReasoning(html) {
    const idle = tActLog.querySelector('.t-act-idle');
    if (idle) idle.remove();
    const el = document.createElement('div');
    el.className = 'rs-think';
    el.innerHTML = html;
    tActLog.appendChild(el);
    tActLog.scrollTop = tActLog.scrollHeight;
}

// ── Chip clicks ───────────────────────────────────
chipWrap?.querySelectorAll('.demo-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        if (running) return;
        chipWrap.querySelectorAll('.demo-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        runDemo(chip.dataset.s);
    });
});

// ── Custom input ──────────────────────────────────
function sendCustom() {
    if (running) return;
    const val = tInput.value.trim();
    if (!val) return;
    tInput.value = '';

    const lower = val.toLowerCase();
    let key = 'support';
    if (/sales|pipeline|crm|deal|revenue|conversion/.test(lower))          key = 'sales';
    else if (/cloud|aws|gcp|azure|infra|cost|spend|server|ec2/.test(lower)) key = 'cloud';
    else if (/fraud|payment|transact|security|detect|scam|money/.test(lower)) key = 'fraud';

    chipWrap?.querySelectorAll('.demo-chip').forEach(c => {
        c.classList.toggle('active', c.dataset.s === key);
    });
    runDemo(key, val);
}
tSend?.addEventListener('click', sendCustom);
tInput?.addEventListener('keydown', e => { if (e.key === 'Enter') sendCustom(); });

// ── Core demo runner ──────────────────────────────
async function runDemo(scenarioKey, customUserMsg = null) {
    const s = SCENARIOS[scenarioKey];
    if (!s) return;
    running = true;

    // Lock + power up the console
    demoTerminal.classList.add('active');
    setStatus('thinking', 'Reasoning');
    setOrb('thinking', 'Reasoning');
    tSend.disabled = true;
    tInput.disabled = true;
    chipWrap?.querySelectorAll('.demo-chip').forEach(c => c.disabled = true);

    // Clear panels + spin up visualizer
    tMsgs.innerHTML = '';
    tActLog.innerHTML = '';
    resetTelemetry();
    const nodes = buildOrbit(s.tools);
    startTelemetry();

    await sleep(150);

    // User message
    appendUserMsg(customUserMsg || s.userMsg);
    await sleep(480);

    // Thinking
    const thinkEl = appendThinking();
    appendReasoning('Parsing objective · selecting <b>tools</b>…');
    await sleep(720);
    thinkEl.remove();

    // Tool calls — light up the matching orbit node as each runs
    for (let i = 0; i < s.tools.length; i++) {
        nodes[i]?.classList.add('active');
        await appendToolCall(s.tools[i]);
        nodes[i]?.classList.remove('active');
        nodes[i]?.classList.add('done');
        toolCount++;
        telTools.textContent = String(toolCount);
        await sleep(160);
    }

    appendReasoning('Synthesizing findings into a <b>plan</b>…');
    await sleep(300);

    // Stream AI response
    setStatus('streaming', 'Responding');
    setOrb('streaming', 'Streaming');
    const bubble = appendAIBubble();
    await streamInto(bubble, s.response);

    // Done
    stopTelemetry();
    rampConfidence(90 + Math.floor(Math.random() * 8));
    setStatus('ready', 'Online');
    setOrb('ready', 'Complete');
    running = false;
    tSend.disabled = false;
    tInput.disabled = false;
    chipWrap?.querySelectorAll('.demo-chip').forEach(c => c.disabled = false);
}

// ── Status bar ────────────────────────────────────
function setStatus(state, label) {
    tStatus.className = 't-status ' + state;
    tLabel.textContent = label;
}

// ── Message builders ──────────────────────────────
function appendUserMsg(text) {
    const msg = document.createElement('div');
    msg.className = 't-msg user';
    msg.innerHTML = `<div class="t-avatar">U</div><div class="t-bubble">${esc(text)}</div>`;
    tMsgs.appendChild(msg);
    scrollChat();
}

function appendThinking() {
    const msg = document.createElement('div');
    msg.className = 't-msg ai';
    const av = document.createElement('div');
    av.className = 't-avatar'; av.textContent = 'S';
    const bub = document.createElement('div');
    bub.className = 't-bubble';
    bub.innerHTML = '<div class="t-thinking"><span></span><span></span><span></span></div>';
    msg.appendChild(av); msg.appendChild(bub);
    tMsgs.appendChild(msg);
    scrollChat();
    return msg;
}

function appendAIBubble() {
    const msg = document.createElement('div');
    msg.className = 't-msg ai';
    const av = document.createElement('div');
    av.className = 't-avatar'; av.textContent = 'S';
    const bub = document.createElement('div');
    bub.className = 't-bubble';
    msg.appendChild(av); msg.appendChild(bub);
    tMsgs.appendChild(msg);
    scrollChat();
    return bub;
}

// ── Tool call card ────────────────────────────────
async function appendToolCall(tool) {
    const item = document.createElement('div');
    item.className = 'tc-item';
    item.innerHTML = `
        <div class="tc-header">
            <div class="tc-icon"><div class="tc-spin"></div></div>
            <span class="tc-name">${esc(tool.fn)}</span>
            <span class="tc-args">${esc(tool.args)}</span>
        </div>
        <div class="tc-result">${esc(tool.result)}</div>`;
    tActLog.appendChild(item);
    tActLog.scrollTop = tActLog.scrollHeight;

    await sleep(tool.ms);

    item.classList.add('done');
    item.querySelector('.tc-icon').innerHTML =
        `<svg class="tc-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`;
    tActLog.scrollTop = tActLog.scrollHeight;
}

// ── Streaming text renderer ───────────────────────
async function streamInto(bubble, text) {
    const cursor = document.createElement('span');
    cursor.className = 't-cursor';
    bubble.appendChild(cursor);

    for (const seg of parseSegments(text)) {
        if (seg.type === 'br') {
            bubble.insertBefore(document.createElement('br'), cursor);
            await sleep(55);
        } else if (seg.type === 'arrow') {
            const sp = document.createElement('span');
            sp.className = 'resp-arrow';
            sp.textContent = '→';
            bubble.insertBefore(sp, cursor);
            await sleep(25);
        } else {
            const el = document.createElement(seg.type === 'bold' ? 'strong' : 'span');
            bubble.insertBefore(el, cursor);
            for (const ch of seg.text) {
                el.textContent += ch;
                await sleep(8 + Math.random() * 8);
                scrollChat();
            }
        }
    }

    cursor.remove();
    scrollChat();
}

function scrollChat() {
    tMsgs.scrollTop = tMsgs.scrollHeight;
}

// ── Auto-run on load (after reveal animation) ─────
window.addEventListener('load', () => {
    setTimeout(() => runDemo('support'), 1600);
});
