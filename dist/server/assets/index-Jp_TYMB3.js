import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
const timeframeOptions = [{
  label: "Today",
  value: "today"
}, {
  label: "7 days",
  value: "7d"
}, {
  label: "30 days",
  value: "30d"
}];
const timelineFilters = [{
  label: "All",
  value: "all"
}, {
  label: "Automation",
  value: "automation"
}, {
  label: "Handoff",
  value: "handoff"
}, {
  label: "Signals",
  value: "signal"
}];
const timeframeScales = {
  today: 0.25,
  "7d": 0.65,
  "30d": 1
};
const kpiStats = [{
  label: "Meetings booked",
  value: 62,
  change: "+11 vs prior window",
  trend: "up"
}, {
  label: "Positive replies",
  value: 184,
  change: "42% reply rate",
  trend: "up"
}, {
  label: "Campaigns live",
  value: 14,
  change: "4 in active testing",
  trend: "steady"
}, {
  label: "Human handoffs",
  value: 23,
  change: "SLA 1h 12m",
  trend: "down"
}];
const pipelineStages = [{
  name: "New Prospects",
  volume: 142,
  change: "+18% this week",
  sla: "2.1 days",
  progress: 0.72,
  highlight: "AI scoring 93% relevance"
}, {
  name: "Engaged",
  volume: 96,
  change: "+9% from last week",
  sla: "18 hours",
  progress: 0.58,
  highlight: "Personal video step auto-inserted"
}, {
  name: "Interested",
  volume: 44,
  change: "+6 net new",
  sla: "9 hours",
  progress: 0.41,
  highlight: "Live replies routed to Priya"
}, {
  name: "Book Meeting",
  volume: 21,
  change: "78% conversion",
  sla: "3 hours",
  progress: 0.86,
  highlight: "Calendar guardrails on"
}];
const campaigns = [{
  id: "seed",
  name: "Seed Fund Partners",
  persona: "Investors",
  steps: 5,
  replyRate: 42,
  meetings: 18,
  owner: "Rhea Patel",
  status: "scaling",
  nextStep: "Voice note follow-up"
}, {
  id: "people-leaders",
  name: "People Leaders Series B",
  persona: "HR and Talent",
  steps: 6,
  replyRate: 31,
  meetings: 14,
  owner: "Marcus Boyd",
  status: "testing",
  nextStep: "Swap hook copy v3"
}, {
  id: "revops",
  name: "RevOps Modern Stack",
  persona: "Revenue Ops",
  steps: 4,
  replyRate: 38,
  meetings: 11,
  owner: "Luisa Klein",
  status: "scaling",
  nextStep: "Sync CRM intent tags"
}, {
  id: "dormant",
  name: "Dormant Champions",
  persona: "Past Advocates",
  steps: 3,
  replyRate: 24,
  meetings: 5,
  owner: "Automation",
  status: "paused",
  nextStep: "Legal review CTA"
}];
const inboxThreads = [{
  contact: "Priya Raman",
  role: "Head of People / Northwind",
  channel: "LinkedIn DM",
  snippet: "Thanks for the context, can you send over a one-pager for Friday?",
  status: "Awaiting follow-up",
  timeAgo: "2m ago",
  priority: "high"
}, {
  contact: "Julien Hart",
  role: "COO / LumenIQ",
  channel: "InMail",
  snippet: "Loop Marta in for the pilot seats and we can launch next sprint.",
  status: "Forwarded to CSM",
  timeAgo: "14m ago",
  priority: "standard"
}, {
  contact: "Daphne Soto",
  role: "VP Talent / Apex Labs",
  channel: "Comment -> DM",
  snippet: "Love the candidate warm up angle - how do you ensure brand tone?",
  status: "Need voice memo reply",
  timeAgo: "32m ago",
  priority: "high"
}];
const activityTimeline = [{
  time: "08:20",
  label: "Campaign step 3 launched",
  detail: "112 prospects received personalized DMs referencing yesterday's webinar.",
  owner: "Automation",
  type: "automation"
}, {
  time: "09:05",
  label: "Human handoff triggered",
  detail: "4 high-intent replies routed to Priya for manual voice notes.",
  owner: "Priya",
  type: "handoff"
}, {
  time: "09:40",
  label: "Signal: Funding news detected",
  detail: "Series B announcement for StrataLoop - enrichment refreshed and prioritized.",
  owner: "Signal Engine",
  type: "signal"
}, {
  time: "10:15",
  label: "Smart send window optimized",
  detail: "West coast block shifted 22 minutes based on last-touch open data.",
  owner: "Automation",
  type: "automation"
}];
const qaChecks = [{
  label: "Duplicate detection",
  value: "12 removed",
  status: "pass"
}, {
  label: "Brand guardrails",
  value: "Tone = Warm advisor",
  status: "pass"
}, {
  label: "Compliance holdouts",
  value: "1 contact needs opt-in proof",
  status: "warn"
}];
const smartPlays = ["Adaptive send windows per timezone", "Intent boost from job changes + funding news", "Auto-generated snippets signed by your AE", "Voice memo follow-ups queued for teams"];
const enrichmentSignals = [{
  label: "Fresh data",
  value: "Updated 3h ago",
  status: "good"
}, {
  label: "ICP coverage",
  value: "92% of list",
  status: "good"
}, {
  label: "Data gaps",
  value: "5 contacts missing email",
  status: "watch"
}];
function Home() {
  const [timeframe, setTimeframe] = React.useState("today");
  const [sandboxEngaged, setSandboxEngaged] = React.useState(true);
  const [pipelineShift, setPipelineShift] = React.useState(0);
  const [focusStage, setFocusStage] = React.useState(pipelineStages[0].name);
  const [selectedCampaignId, setSelectedCampaignId] = React.useState(campaigns[0].id);
  const [campaignOverrides, setCampaignOverrides] = React.useState({});
  const [autoPilot, setAutoPilot] = React.useState(true);
  const [claimedThreads, setClaimedThreads] = React.useState({});
  const [timelineFilter, setTimelineFilter] = React.useState("all");
  const computedKpis = React.useMemo(() => {
    const scale = timeframeScales[timeframe];
    return kpiStats.map((metric) => ({
      ...metric,
      displayValue: Math.max(1, Math.round(metric.value * scale))
    }));
  }, [timeframe]);
  const adjustedPipeline = React.useMemo(() => {
    return pipelineStages.map((stage, index) => {
      const weight = 1 - index * 0.2;
      const volumeDelta = Math.round(pipelineShift * weight);
      return {
        ...stage,
        adjustedVolume: Math.max(0, stage.volume + volumeDelta),
        volumeDelta
      };
    });
  }, [pipelineShift]);
  const selectedCampaign = React.useMemo(() => {
    return campaigns.find((campaign) => campaign.id === selectedCampaignId) ?? campaigns[0];
  }, [selectedCampaignId]);
  const liveCampaignStatus = campaignOverrides[selectedCampaign.id] ?? selectedCampaign.status;
  const filteredTimeline = React.useMemo(() => {
    if (timelineFilter === "all") {
      return activityTimeline;
    }
    return activityTimeline.filter((item) => item.type === timelineFilter);
  }, [timelineFilter]);
  const handleCycleCampaignStatus = () => {
    const order = ["testing", "scaling", "paused"];
    const current = liveCampaignStatus;
    const next = order[(order.indexOf(current) + 1) % order.length];
    setCampaignOverrides((prev) => ({
      ...prev,
      [selectedCampaign.id]: next
    }));
  };
  const handleThreadClaim = (contact) => {
    setClaimedThreads((prev) => ({
      ...prev,
      [contact]: !prev[contact]
    }));
  };
  const heroStatusCopy = sandboxEngaged ? "Sandbox is streaming live signals for hands-on exploration." : "Sandbox is paused so you can review a frozen moment in the journey.";
  return /* @__PURE__ */ jsxs("div", { className: "bg-slate-950 text-slate-50", children: [
    /* @__PURE__ */ jsx("section", { id: "overview", className: "mx-auto max-w-6xl px-6 pb-16 pt-12 lg:pb-20 lg:pt-16", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-12 lg:grid-cols-[1.15fr,0.85fr] lg:items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-300", children: [
          /* @__PURE__ */ jsx("span", { children: "LinkedIn workspace" }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 text-emerald-300", children: [
            /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-emerald-400 animate-pulse" }),
            "Demo site"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl", children: "Tules automates thoughtful LinkedIn outreach campaigns end to end." }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-slate-300 md:text-xl", children: "Tules blends AI research, tone-safe copy, and human handoffs into one command center. Click around to feel how your team will run outreach before the real seats go live." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setSandboxEngaged((value) => !value), className: `rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide transition ${sandboxEngaged ? "bg-white text-slate-900" : "border border-white/30 text-white hover:border-white"}`, children: sandboxEngaged ? "Pause sandbox stream" : "Resume sandbox stream" }),
          /* @__PURE__ */ jsx("a", { href: "#pipeline", className: "rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white", children: "See live pipeline" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400", children: heroStatusCopy }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 pt-2 text-xs", children: timeframeOptions.map((option) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setTimeframe(option.value), className: `rounded-full border px-3 py-1 transition ${timeframe === option.value ? "border-emerald-400 bg-emerald-400/10 text-emerald-200" : "border-white/20 text-slate-300 hover:border-white/60 hover:text-white"}`, children: option.label }, option.value)) }),
        /* @__PURE__ */ jsx("ul", { className: "grid gap-3 text-sm text-slate-300 md:grid-cols-2", children: smartPlays.map((copy) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-400" }),
          copy
        ] }, copy)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800/80 p-6 shadow-2xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-slate-400", children: timeframe === "today" ? "Today" : timeframe === "7d" ? "Last 7 days" : "Last 30 days" }),
            /* @__PURE__ */ jsxs("p", { className: "mt-2 text-4xl font-semibold text-white", children: [
              computedKpis[0].displayValue,
              " meetings"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-right text-xs text-slate-300", children: [
            /* @__PURE__ */ jsx("p", { children: "Cadence health" }),
            /* @__PURE__ */ jsx("p", { className: "text-emerald-400", children: sandboxEngaged ? "97%" : "Holding" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-10 space-y-4", children: pipelineStages.slice(0, 3).map((stage) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/5 bg-white/5 p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm", children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium text-white", children: stage.name }),
            /* @__PURE__ */ jsx("span", { className: "text-slate-300", children: stage.change })
          ] }),
          /* @__PURE__ */ jsx(ProgressBar, { value: stage.progress }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-slate-400", children: stage.highlight })
        ] }, stage.name)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-100", children: [
          "Smart priorities updated 6 minutes ago / ",
          sandboxEngaged ? "4" : "0",
          " prospects escalated for human touch."
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-6xl px-6 pb-16", children: /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-4", children: computedKpis.map((metric) => /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-white/5 bg-white/5 p-5", children: [
      /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-slate-400", children: metric.label }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-baseline gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-3xl font-semibold text-white", children: metric.displayValue }),
        /* @__PURE__ */ jsx(TrendBadge, { trend: metric.trend, label: metric.change })
      ] })
    ] }, metric.label)) }) }),
    /* @__PURE__ */ jsxs("section", { id: "pipeline", className: "mx-auto max-w-6xl px-6 pb-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 pb-8", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-slate-400", children: "Pipeline board" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-white", children: "Where every prospect sits right now." }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-300", children: "Drag-and-drop like a CRM, but tuned for LinkedIn. Stages blend automation and human touch with clear SLAs." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 pt-4 text-sm text-slate-300 md:flex-row md:items-center", children: [
          /* @__PURE__ */ jsxs("label", { className: "font-medium text-white", children: [
            "Adjust prospect boost",
            /* @__PURE__ */ jsx("input", { type: "range", min: "-15", max: "35", value: pipelineShift, onChange: (event) => setPipelineShift(Number(event.target.value)), className: "mt-2 w-full accent-emerald-400" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "md:ml-auto", children: [
            pipelineShift >= 0 ? "+" : "",
            pipelineShift,
            " prospects redistributed"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs uppercase tracking-[0.3em] text-slate-400", children: [
          "Focused stage: ",
          focusStage
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-6 lg:grid-cols-2", children: adjustedPipeline.map((stage) => /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setFocusStage(stage.name), className: `rounded-3xl border bg-white/5 p-6 text-left transition ${focusStage === stage.name ? "border-emerald-500/50 shadow-lg shadow-emerald-500/10" : "border-white/5"}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xl font-semibold text-white", children: stage.name }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400", children: stage.highlight })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300", children: [
            stage.sla,
            " SLA"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-end justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-4xl font-semibold text-white", children: stage.adjustedVolume }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400", children: "prospects" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-emerald-400", children: [
            stage.volumeDelta >= 0 ? "+" : "",
            stage.volumeDelta,
            " shift"
          ] })
        ] }),
        /* @__PURE__ */ jsx(ProgressBar, { value: stage.progress, className: "mt-6" })
      ] }, stage.name)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { id: "campaigns", className: "mx-auto max-w-6xl px-6 pb-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 pb-6", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-slate-400", children: "Campaign lab" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-white", children: "Experiment fast, scale winners even faster." }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-300", children: "Mock data refreshes every reload so clients can imagine their own personas." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-[1.6fr,0.8fr]", children: [
        /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-3xl border border-white/5 bg-white/5", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[2fr,1fr,1fr,1fr,1fr] border-b border-white/5 px-6 py-3 text-xs uppercase tracking-[0.25em] text-slate-400", children: [
            /* @__PURE__ */ jsx("span", { children: "Campaign" }),
            /* @__PURE__ */ jsx("span", { children: "Reply rate" }),
            /* @__PURE__ */ jsx("span", { children: "Meetings" }),
            /* @__PURE__ */ jsx("span", { children: "Owner" }),
            /* @__PURE__ */ jsx("span", { children: "Status" })
          ] }),
          campaigns.map((campaign) => /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setSelectedCampaignId(campaign.id), className: `grid w-full grid-cols-[2fr,1fr,1fr,1fr,1fr] items-center gap-2 px-6 py-4 text-left text-sm transition ${selectedCampaignId === campaign.id ? "bg-white/10" : "bg-transparent"}`, children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium text-white", children: campaign.name }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-400", children: [
                campaign.persona,
                " / ",
                campaign.steps,
                " steps / Next: ",
                campaign.nextStep
              ] })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-white", children: [
              campaign.replyRate,
              "%"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-white", children: campaign.meetings }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-300", children: campaign.owner }),
            /* @__PURE__ */ jsx(StatusBadge, { status: campaignOverrides[campaign.id] ?? campaign.status })
          ] }, campaign.id))
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-white/5 bg-white/5 p-6", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-slate-400", children: "Selected campaign" }),
          /* @__PURE__ */ jsx("h3", { className: "mt-2 text-2xl font-semibold text-white", children: selectedCampaign.name }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-300", children: [
            "Owner: ",
            selectedCampaign.owner
          ] }),
          /* @__PURE__ */ jsxs("dl", { className: "mt-6 grid gap-4 text-sm text-slate-300", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "text-xs uppercase tracking-[0.3em]", children: "Reply rate" }),
              /* @__PURE__ */ jsxs("dd", { className: "text-2xl text-white", children: [
                selectedCampaign.replyRate,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "text-xs uppercase tracking-[0.3em]", children: "Meetings" }),
              /* @__PURE__ */ jsx("dd", { className: "text-2xl text-white", children: selectedCampaign.meetings })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-3 text-sm", children: [
            /* @__PURE__ */ jsxs("button", { type: "button", onClick: handleCycleCampaignStatus, className: "w-full rounded-full border border-white/20 px-4 py-2 text-white transition hover:border-white/60", children: [
              "Cycle status (now ",
              liveCampaignStatus,
              ")"
            ] }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setAutoPilot((value) => !value), className: `w-full rounded-full px-4 py-2 text-sm font-semibold transition ${autoPilot ? "bg-emerald-400/20 text-emerald-200" : "border border-amber-400/30 text-amber-200"}`, children: autoPilot ? "Auto-personalization active" : "Human assist only" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { id: "activity", className: "mx-auto max-w-6xl px-6 pb-20", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-[1.1fr,0.9fr]", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-white/5 bg-white/5 p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-slate-400", children: "Live inbox" }),
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold text-white", children: "Human-ready replies" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400", children: "SLA 1h" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 space-y-4", children: inboxThreads.map((thread) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/5 bg-slate-950/40 p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium text-white", children: thread.contact }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400", children: thread.role })
            ] }),
            /* @__PURE__ */ jsx("span", { className: `rounded-full px-3 py-1 text-xs ${thread.priority === "high" ? "border border-amber-400/50 text-amber-200" : "border border-white/10 text-slate-300"}`, children: thread.channel })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-slate-200", children: thread.snippet }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between text-xs text-slate-400", children: [
            /* @__PURE__ */ jsx("p", { children: claimedThreads[thread.contact] ? "Claimed by you" : thread.status }),
            /* @__PURE__ */ jsx("p", { children: thread.timeAgo })
          ] }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => handleThreadClaim(thread.contact), className: `mt-4 w-full rounded-full border px-3 py-1 text-xs font-semibold transition ${claimedThreads[thread.contact] ? "border-emerald-400 text-emerald-200" : "border-white/20 text-white hover:border-white/60"}`, children: claimedThreads[thread.contact] ? "Release reply" : "Claim reply" })
        ] }, thread.contact)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-white/5 bg-white/5 p-6", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-slate-400", children: "Automation log" }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-2 text-xs", children: timelineFilters.map((filter) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setTimelineFilter(filter.value), className: `rounded-full border px-3 py-1 transition ${timelineFilter === filter.value ? "border-emerald-400 bg-emerald-500/10 text-emerald-200" : "border-white/15 text-slate-300 hover:border-white/60 hover:text-white"}`, children: filter.label }, filter.value)) }),
          /* @__PURE__ */ jsx("div", { className: "mt-6 space-y-4", children: filteredTimeline.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400", children: item.time }),
              /* @__PURE__ */ jsx(TimelineMarker, { type: item.type })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium text-white", children: item.label }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-300", children: item.detail }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-500", children: [
                "Owner: ",
                item.owner
              ] })
            ] })
          ] }, item.label)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900 to-slate-800 p-6", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-slate-400", children: "Quality gates" }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-3", children: qaChecks.map((check) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-white", children: check.label }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400", children: check.value })
            ] }),
            /* @__PURE__ */ jsx("span", { className: `text-xs ${check.status === "pass" ? "text-emerald-300" : "text-amber-300"}`, children: check.status === "pass" ? "OK" : "Review" })
          ] }, check.label)) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300", children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium text-white", children: "Enrichment health" }),
            /* @__PURE__ */ jsx("div", { className: "mt-3 grid gap-3 text-xs text-slate-400 sm:grid-cols-3", children: enrichmentSignals.map((signal) => /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-slate-300", children: signal.label }),
              /* @__PURE__ */ jsx("p", { className: "text-white", children: signal.value })
            ] }, signal.label)) })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
function TrendBadge({
  trend,
  label
}) {
  const styles = {
    up: "text-emerald-300",
    down: "text-rose-300",
    steady: "text-slate-400"
  };
  return /* @__PURE__ */ jsx("span", { className: `text-xs ${styles[trend]}`, children: label });
}
function ProgressBar({
  value,
  className = ""
}) {
  return /* @__PURE__ */ jsx("div", { className: `mt-3 h-2 rounded-full bg-slate-800 ${className}`, children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-300 to-blue-300", style: {
    width: `${Math.min(1, Math.max(0, value)) * 100}%`
  } }) });
}
function StatusBadge({
  status
}) {
  const styles = {
    scaling: "border-emerald-500/40 text-emerald-200 bg-emerald-500/10",
    testing: "border-sky-400/40 text-sky-200 bg-sky-500/10",
    paused: "border-amber-400/40 text-amber-200 bg-amber-500/10"
  };
  return /* @__PURE__ */ jsx("span", { className: `justify-self-end rounded-full border px-3 py-1 text-xs uppercase tracking-wide ${styles[status]}`, children: status });
}
function TimelineMarker({
  type
}) {
  const colors = {
    automation: "bg-emerald-400",
    handoff: "bg-sky-400",
    signal: "bg-violet-400"
  };
  return /* @__PURE__ */ jsx("span", { className: `mt-2 block h-2 w-8 rounded-full ${colors[type]}` });
}
export {
  Home as component
};
