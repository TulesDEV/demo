import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

type CampaignStatus = 'testing' | 'scaling' | 'paused'
type TimelineType = 'automation' | 'handoff' | 'signal'
type Timeframe = 'today' | '7d' | '30d'

type KPIMetric = {
  label: string
  value: number
  change: string
  trend: 'up' | 'down' | 'steady'
}

type PipelineStage = {
  name: string
  volume: number
  change: string
  sla: string
  progress: number
  highlight: string
}

type CampaignSummary = {
  id: string
  name: string
  persona: string
  steps: number
  replyRate: number
  meetings: number
  owner: string
  status: CampaignStatus
  nextStep: string
}

type InboxThread = {
  contact: string
  role: string
  channel: string
  snippet: string
  status: string
  timeAgo: string
  priority: 'high' | 'standard'
}

type TimelineItem = {
  time: string
  label: string
  detail: string
  owner: string
  type: TimelineType
}

type AutomationCheck = {
  label: string
  value: string
  status: 'pass' | 'warn'
}

const timeframeOptions: { label: string; value: Timeframe }[] = [
  { label: 'Today', value: 'today' },
  { label: '7 days', value: '7d' },
  { label: '30 days', value: '30d' },
]

const timelineFilters: { label: string; value: TimelineType | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Automation', value: 'automation' },
  { label: 'Handoff', value: 'handoff' },
  { label: 'Signals', value: 'signal' },
]

const timeframeScales: Record<Timeframe, number> = {
  today: 0.25,
  '7d': 0.65,
  '30d': 1,
}

const kpiStats: KPIMetric[] = [
  {
    label: 'Meetings booked',
    value: 62,
    change: '+11 vs prior window',
    trend: 'up',
  },
  {
    label: 'Positive replies',
    value: 184,
    change: '42% reply rate',
    trend: 'up',
  },
  {
    label: 'Campaigns live',
    value: 14,
    change: '4 in active testing',
    trend: 'steady',
  },
  {
    label: 'Human handoffs',
    value: 23,
    change: 'SLA 1h 12m',
    trend: 'down',
  },
]

const pipelineStages: PipelineStage[] = [
  {
    name: 'New Prospects',
    volume: 142,
    change: '+18% this week',
    sla: '2.1 days',
    progress: 0.72,
    highlight: 'AI scoring 93% relevance',
  },
  {
    name: 'Engaged',
    volume: 96,
    change: '+9% from last week',
    sla: '18 hours',
    progress: 0.58,
    highlight: 'Personal video step auto-inserted',
  },
  {
    name: 'Interested',
    volume: 44,
    change: '+6 net new',
    sla: '9 hours',
    progress: 0.41,
    highlight: 'Live replies routed to Priya',
  },
  {
    name: 'Book Meeting',
    volume: 21,
    change: '78% conversion',
    sla: '3 hours',
    progress: 0.86,
    highlight: 'Calendar guardrails on',
  },
]

const campaigns: CampaignSummary[] = [
  {
    id: 'seed',
    name: 'Seed Fund Partners',
    persona: 'Investors',
    steps: 5,
    replyRate: 42,
    meetings: 18,
    owner: 'Rhea Patel',
    status: 'scaling',
    nextStep: 'Voice note follow-up',
  },
  {
    id: 'people-leaders',
    name: 'People Leaders Series B',
    persona: 'HR and Talent',
    steps: 6,
    replyRate: 31,
    meetings: 14,
    owner: 'Marcus Boyd',
    status: 'testing',
    nextStep: 'Swap hook copy v3',
  },
  {
    id: 'revops',
    name: 'RevOps Modern Stack',
    persona: 'Revenue Ops',
    steps: 4,
    replyRate: 38,
    meetings: 11,
    owner: 'Luisa Klein',
    status: 'scaling',
    nextStep: 'Sync CRM intent tags',
  },
  {
    id: 'dormant',
    name: 'Dormant Champions',
    persona: 'Past Advocates',
    steps: 3,
    replyRate: 24,
    meetings: 5,
    owner: 'Automation',
    status: 'paused',
    nextStep: 'Legal review CTA',
  },
]

const inboxThreads: InboxThread[] = [
  {
    contact: 'Priya Raman',
    role: 'Head of People / Northwind',
    channel: 'LinkedIn DM',
    snippet: 'Thanks for the context, can you send over a one-pager for Friday?',
    status: 'Awaiting follow-up',
    timeAgo: '2m ago',
    priority: 'high',
  },
  {
    contact: 'Julien Hart',
    role: 'COO / LumenIQ',
    channel: 'InMail',
    snippet: 'Loop Marta in for the pilot seats and we can launch next sprint.',
    status: 'Forwarded to CSM',
    timeAgo: '14m ago',
    priority: 'standard',
  },
  {
    contact: 'Daphne Soto',
    role: 'VP Talent / Apex Labs',
    channel: 'Comment -> DM',
    snippet: 'Love the candidate warm up angle - how do you ensure brand tone?',
    status: 'Need voice memo reply',
    timeAgo: '32m ago',
    priority: 'high',
  },
]

const activityTimeline: TimelineItem[] = [
  {
    time: '08:20',
    label: 'Campaign step 3 launched',
    detail: "112 prospects received personalized DMs referencing yesterday's webinar.",
    owner: 'Automation',
    type: 'automation',
  },
  {
    time: '09:05',
    label: 'Human handoff triggered',
    detail: '4 high-intent replies routed to Priya for manual voice notes.',
    owner: 'Priya',
    type: 'handoff',
  },
  {
    time: '09:40',
    label: 'Signal: Funding news detected',
    detail: 'Series B announcement for StrataLoop - enrichment refreshed and prioritized.',
    owner: 'Signal Engine',
    type: 'signal',
  },
  {
    time: '10:15',
    label: 'Smart send window optimized',
    detail: 'West coast block shifted 22 minutes based on last-touch open data.',
    owner: 'Automation',
    type: 'automation',
  },
]

const qaChecks: AutomationCheck[] = [
  { label: 'Duplicate detection', value: '12 removed', status: 'pass' },
  { label: 'Brand guardrails', value: 'Tone = Warm advisor', status: 'pass' },
  { label: 'Compliance holdouts', value: '1 contact needs opt-in proof', status: 'warn' },
]

const smartPlays = [
  'Adaptive send windows per timezone',
  'Intent boost from job changes + funding news',
  'Auto-generated snippets signed by your AE',
  'Voice memo follow-ups queued for teams',
]

const enrichmentSignals = [
  { label: 'Fresh data', value: 'Updated 3h ago', status: 'good' },
  { label: 'ICP coverage', value: '92% of list', status: 'good' },
  { label: 'Data gaps', value: '5 contacts missing email', status: 'watch' },
]

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const [timeframe, setTimeframe] = React.useState<Timeframe>('today')
  const [sandboxEngaged, setSandboxEngaged] = React.useState(true)
  const [pipelineShift, setPipelineShift] = React.useState(0)
  const [focusStage, setFocusStage] = React.useState(pipelineStages[0].name)
  const [selectedCampaignId, setSelectedCampaignId] = React.useState(campaigns[0].id)
  const [campaignOverrides, setCampaignOverrides] = React.useState<Record<string, CampaignStatus>>({})
  const [autoPilot, setAutoPilot] = React.useState(true)
  const [claimedThreads, setClaimedThreads] = React.useState<Record<string, boolean>>({})
  const [timelineFilter, setTimelineFilter] = React.useState<TimelineType | 'all'>('all')

  const computedKpis = React.useMemo(() => {
    const scale = timeframeScales[timeframe]
    return kpiStats.map((metric) => ({
      ...metric,
      displayValue: Math.max(1, Math.round(metric.value * scale)),
    }))
  }, [timeframe])

  const adjustedPipeline = React.useMemo(() => {
    return pipelineStages.map((stage, index) => {
      const weight = 1 - index * 0.2
      const volumeDelta = Math.round(pipelineShift * weight)
      return {
        ...stage,
        adjustedVolume: Math.max(0, stage.volume + volumeDelta),
        volumeDelta,
      }
    })
  }, [pipelineShift])

  const selectedCampaign = React.useMemo(() => {
    return campaigns.find((campaign) => campaign.id === selectedCampaignId) ?? campaigns[0]
  }, [selectedCampaignId])

  const liveCampaignStatus = campaignOverrides[selectedCampaign.id] ?? selectedCampaign.status

  const filteredTimeline = React.useMemo(() => {
    if (timelineFilter === 'all') {
      return activityTimeline
    }
    return activityTimeline.filter((item) => item.type === timelineFilter)
  }, [timelineFilter])

  const handleCycleCampaignStatus = () => {
    const order: CampaignStatus[] = ['testing', 'scaling', 'paused']
    const current = liveCampaignStatus
    const next = order[(order.indexOf(current) + 1) % order.length]
    setCampaignOverrides((prev) => ({
      ...prev,
      [selectedCampaign.id]: next,
    }))
  }

  const handleThreadClaim = (contact: string) => {
    setClaimedThreads((prev) => ({
      ...prev,
      [contact]: !prev[contact],
    }))
  }

  const heroStatusCopy = sandboxEngaged
    ? 'Sandbox is streaming live signals for hands-on exploration.'
    : 'Sandbox is paused so you can review a frozen moment in the journey.'

  return (
    <div className="bg-slate-950 text-slate-50">
      <section id="overview" className="mx-auto max-w-6xl px-6 pb-16 pt-12 lg:pb-20 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.15fr,0.85fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">
              <span>LinkedIn workspace</span>
              <span className="flex items-center gap-2 text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Demo site
              </span>
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                Tules automates thoughtful LinkedIn outreach campaigns end to end.
              </h1>
              <p className="text-lg text-slate-300 md:text-xl">
                Tules blends AI research, tone-safe copy, and human handoffs into one command center. Click around to feel how your team will run outreach before the real seats go live.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setSandboxEngaged((value) => !value)}
                className={`rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide transition ${
                  sandboxEngaged
                    ? 'bg-white text-slate-900'
                    : 'border border-white/30 text-white hover:border-white'
                }`}
              >
                {sandboxEngaged ? 'Pause sandbox stream' : 'Resume sandbox stream'}
              </button>
              <a
                href="#pipeline"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white"
              >
                See live pipeline
              </a>
            </div>
            <p className="text-sm text-slate-400">{heroStatusCopy}</p>
            <div className="flex flex-wrap gap-2 pt-2 text-xs">
              {timeframeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTimeframe(option.value)}
                  className={`rounded-full border px-3 py-1 transition ${
                    timeframe === option.value
                      ? 'border-emerald-400 bg-emerald-400/10 text-emerald-200'
                      : 'border-white/20 text-slate-300 hover:border-white/60 hover:text-white'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <ul className="grid gap-3 text-sm text-slate-300 md:grid-cols-2">
              {smartPlays.map((copy) => (
                <li key={copy} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {copy}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800/80 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{timeframe === 'today' ? 'Today' : timeframe === '7d' ? 'Last 7 days' : 'Last 30 days'}</p>
                <p className="mt-2 text-4xl font-semibold text-white">
                  {computedKpis[0].displayValue} meetings
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-right text-xs text-slate-300">
                <p>Cadence health</p>
                <p className="text-emerald-400">{sandboxEngaged ? '97%' : 'Holding'}</p>
              </div>
            </div>
            <div className="mt-10 space-y-4">
              {pipelineStages.slice(0, 3).map((stage) => (
                <div key={stage.name} className="rounded-2xl border border-white/5 bg-white/5 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <p className="font-medium text-white">{stage.name}</p>
                    <span className="text-slate-300">{stage.change}</span>
                  </div>
                  <ProgressBar value={stage.progress} />
                  <p className="mt-2 text-xs text-slate-400">{stage.highlight}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-100">
              Smart priorities updated 6 minutes ago / {sandboxEngaged ? '4' : '0'} prospects escalated for human touch.
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-4 md:grid-cols-4">
          {computedKpis.map((metric) => (
            <div key={metric.label} className="rounded-3xl border border-white/5 bg-white/5 p-5">
              <div className="text-xs uppercase tracking-[0.3em] text-slate-400">{metric.label}</div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-semibold text-white">{metric.displayValue}</span>
                <TrendBadge trend={metric.trend} label={metric.change} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="pipeline" className="mx-auto max-w-6xl px-6 pb-16">
        <div className="flex flex-col gap-3 pb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Pipeline board</p>
          <h2 className="text-3xl font-semibold text-white">Where every prospect sits right now.</h2>
          <p className="text-slate-300">
            Drag-and-drop like a CRM, but tuned for LinkedIn. Stages blend automation and human touch with clear SLAs.
          </p>
          <div className="flex flex-col gap-2 pt-4 text-sm text-slate-300 md:flex-row md:items-center">
            <label className="font-medium text-white">
              Adjust prospect boost
              <input
                type="range"
                min="-15"
                max="35"
                value={pipelineShift}
                onChange={(event) => setPipelineShift(Number(event.target.value))}
                className="mt-2 w-full accent-emerald-400"
              />
            </label>
            <p className="md:ml-auto">
              {pipelineShift >= 0 ? '+' : ''}
              {pipelineShift} prospects redistributed
            </p>
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Focused stage: {focusStage}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {adjustedPipeline.map((stage) => (
            <button
              key={stage.name}
              type="button"
              onClick={() => setFocusStage(stage.name)}
              className={`rounded-3xl border bg-white/5 p-6 text-left transition ${
                focusStage === stage.name ? 'border-emerald-500/50 shadow-lg shadow-emerald-500/10' : 'border-white/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-semibold text-white">{stage.name}</p>
                  <p className="text-sm text-slate-400">{stage.highlight}</p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                  {stage.sla} SLA
                </span>
              </div>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="text-4xl font-semibold text-white">{stage.adjustedVolume}</p>
                  <p className="text-sm text-slate-400">prospects</p>
                </div>
                <p className="text-sm text-emerald-400">
                  {stage.volumeDelta >= 0 ? '+' : ''}
                  {stage.volumeDelta} shift
                </p>
              </div>
              <ProgressBar value={stage.progress} className="mt-6" />
            </button>
          ))}
        </div>
      </section>

      <section id="campaigns" className="mx-auto max-w-6xl px-6 pb-16">
        <div className="flex flex-col gap-3 pb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Campaign lab</p>
          <h2 className="text-3xl font-semibold text-white">Experiment fast, scale winners even faster.</h2>
          <p className="text-slate-300">Mock data refreshes every reload so clients can imagine their own personas.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.6fr,0.8fr]">
          <div className="overflow-hidden rounded-3xl border border-white/5 bg-white/5">
            <div className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] border-b border-white/5 px-6 py-3 text-xs uppercase tracking-[0.25em] text-slate-400">
              <span>Campaign</span>
              <span>Reply rate</span>
              <span>Meetings</span>
              <span>Owner</span>
              <span>Status</span>
            </div>
            {campaigns.map((campaign) => (
              <button
                key={campaign.id}
                type="button"
                onClick={() => setSelectedCampaignId(campaign.id)}
                className={`grid w-full grid-cols-[2fr,1fr,1fr,1fr,1fr] items-center gap-2 px-6 py-4 text-left text-sm transition ${
                  selectedCampaignId === campaign.id ? 'bg-white/10' : 'bg-transparent'
                }`}
              >
                <div>
                  <p className="font-medium text-white">{campaign.name}</p>
                  <p className="text-xs text-slate-400">
                    {campaign.persona} / {campaign.steps} steps / Next: {campaign.nextStep}
                  </p>
                </div>
                <p className="text-white">{campaign.replyRate}%</p>
                <p className="text-white">{campaign.meetings}</p>
                <p className="text-slate-300">{campaign.owner}</p>
                <StatusBadge status={campaignOverrides[campaign.id] ?? campaign.status} />
              </button>
            ))}
          </div>
          <div className="rounded-3xl border border-white/5 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Selected campaign</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{selectedCampaign.name}</h3>
            <p className="text-sm text-slate-300">Owner: {selectedCampaign.owner}</p>
            <dl className="mt-6 grid gap-4 text-sm text-slate-300">
              <div>
                <dt className="text-xs uppercase tracking-[0.3em]">Reply rate</dt>
                <dd className="text-2xl text-white">{selectedCampaign.replyRate}%</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.3em]">Meetings</dt>
                <dd className="text-2xl text-white">{selectedCampaign.meetings}</dd>
              </div>
            </dl>
            <div className="mt-6 space-y-3 text-sm">
              <button
                type="button"
                onClick={handleCycleCampaignStatus}
                className="w-full rounded-full border border-white/20 px-4 py-2 text-white transition hover:border-white/60"
              >
                Cycle status (now {liveCampaignStatus})
              </button>
              <button
                type="button"
                onClick={() => setAutoPilot((value) => !value)}
                className={`w-full rounded-full px-4 py-2 text-sm font-semibold transition ${
                  autoPilot
                    ? 'bg-emerald-400/20 text-emerald-200'
                    : 'border border-amber-400/30 text-amber-200'
                }`}
              >
                {autoPilot ? 'Auto-personalization active' : 'Human assist only'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="activity" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-3xl border border-white/5 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Live inbox</p>
                <h3 className="text-2xl font-semibold text-white">Human-ready replies</h3>
              </div>
              <span className="text-xs text-slate-400">SLA 1h</span>
            </div>
            <div className="mt-6 space-y-4">
              {inboxThreads.map((thread) => (
                <div key={thread.contact} className="rounded-2xl border border-white/5 bg-slate-950/40 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium text-white">{thread.contact}</p>
                      <p className="text-xs text-slate-400">{thread.role}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        thread.priority === 'high'
                          ? 'border border-amber-400/50 text-amber-200'
                          : 'border border-white/10 text-slate-300'
                      }`}
                    >
                      {thread.channel}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-200">{thread.snippet}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                    <p>{claimedThreads[thread.contact] ? 'Claimed by you' : thread.status}</p>
                    <p>{thread.timeAgo}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleThreadClaim(thread.contact)}
                    className={`mt-4 w-full rounded-full border px-3 py-1 text-xs font-semibold transition ${
                      claimedThreads[thread.contact]
                        ? 'border-emerald-400 text-emerald-200'
                        : 'border-white/20 text-white hover:border-white/60'
                    }`}
                  >
                    {claimedThreads[thread.contact] ? 'Release reply' : 'Claim reply'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/5 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Automation log</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {timelineFilters.map((filter) => (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => setTimelineFilter(filter.value)}
                    className={`rounded-full border px-3 py-1 transition ${
                      timelineFilter === filter.value
                        ? 'border-emerald-400 bg-emerald-500/10 text-emerald-200'
                        : 'border-white/15 text-slate-300 hover:border-white/60 hover:text-white'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              <div className="mt-6 space-y-4">
                {filteredTimeline.map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div>
                      <p className="text-sm text-slate-400">{item.time}</p>
                      <TimelineMarker type={item.type} />
                    </div>
                    <div>
                      <p className="font-medium text-white">{item.label}</p>
                      <p className="text-sm text-slate-300">{item.detail}</p>
                      <p className="text-xs text-slate-500">Owner: {item.owner}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900 to-slate-800 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Quality gates</p>
              <div className="mt-4 space-y-3">
                {qaChecks.map((check) => (
                  <div key={check.label} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="text-white">{check.label}</p>
                      <p className="text-xs text-slate-400">{check.value}</p>
                    </div>
                    <span className={`text-xs ${check.status === 'pass' ? 'text-emerald-300' : 'text-amber-300'}`}>
                      {check.status === 'pass' ? 'OK' : 'Review'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                <p className="font-medium text-white">Enrichment health</p>
                <div className="mt-3 grid gap-3 text-xs text-slate-400 sm:grid-cols-3">
                  {enrichmentSignals.map((signal) => (
                    <div key={signal.label}>
                      <p className="text-slate-300">{signal.label}</p>
                      <p className="text-white">{signal.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function TrendBadge({
  trend,
  label,
}: {
  trend: KPIMetric['trend']
  label: string
}) {
  const styles: Record<KPIMetric['trend'], string> = {
    up: 'text-emerald-300',
    down: 'text-rose-300',
    steady: 'text-slate-400',
  }

  return <span className={`text-xs ${styles[trend]}`}>{label}</span>
}

function ProgressBar({ value, className = '' }: { value: number; className?: string }) {
  return (
    <div className={`mt-3 h-2 rounded-full bg-slate-800 ${className}`}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-300 to-blue-300"
        style={{ width: `${Math.min(1, Math.max(0, value)) * 100}%` }}
      />
    </div>
  )
}

function StatusBadge({ status }: { status: CampaignStatus }) {
  const styles: Record<CampaignStatus, string> = {
    scaling: 'border-emerald-500/40 text-emerald-200 bg-emerald-500/10',
    testing: 'border-sky-400/40 text-sky-200 bg-sky-500/10',
    paused: 'border-amber-400/40 text-amber-200 bg-amber-500/10',
  }

  return (
    <span className={`justify-self-end rounded-full border px-3 py-1 text-xs uppercase tracking-wide ${styles[status]}`}>
      {status}
    </span>
  )
}

function TimelineMarker({ type }: { type: TimelineType }) {
  const colors: Record<TimelineType, string> = {
    automation: 'bg-emerald-400',
    handoff: 'bg-sky-400',
    signal: 'bg-violet-400',
  }

  return <span className={`mt-2 block h-2 w-8 rounded-full ${colors[type]}`} />
}
