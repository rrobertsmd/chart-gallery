import { useState, useMemo } from 'react'
import { CHARTS, CATEGORIES, CATEGORY_META } from './registry.js'

const S = {
  app: {
    display: 'flex', minHeight: '100vh', background: '#060e1a',
    fontFamily: "'IBM Plex Sans', sans-serif",
  },
  sidebar: {
    width: 280, minWidth: 280, background: '#080f1c',
    borderRight: '1px solid #0d2035', display: 'flex',
    flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
  },
  sidebarHeader: {
    padding: '28px 20px 16px', borderBottom: '1px solid #0d2035',
  },
  wordmark: {
    fontSize: 11, fontWeight: 600, color: '#3a6a9a',
    letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4,
  },
  sidebarTitle: {
    fontSize: 18, fontWeight: 600, color: '#e8f4ff', lineHeight: 1.2,
  },
  sidebarSubtitle: {
    fontSize: 11, color: '#2a4a6a', marginTop: 6,
  },
  searchWrap: {
    padding: '12px 16px', borderBottom: '1px solid #0d2035',
  },
  searchInput: {
    width: '100%', background: '#0a1826', border: '1px solid #1a3050',
    borderRadius: 6, padding: '7px 10px', fontSize: 12,
    color: '#c8d8e8', fontFamily: "'IBM Plex Sans', sans-serif", outline: 'none',
  },
  catSection: { padding: '10px 0' },
  catLabel: {
    fontSize: 10, fontWeight: 600, letterSpacing: '0.12em',
    textTransform: 'uppercase', color: '#2a4a6a',
    padding: '8px 20px 5px', display: 'flex', alignItems: 'center', gap: 6,
  },
  catDot: (color) => ({
    display: 'inline-block', width: 6, height: 6,
    borderRadius: '50%', background: color, flexShrink: 0,
  }),
  chartItem: (active) => ({
    padding: '8px 20px', cursor: 'pointer',
    background: active ? '#0d2035' : 'transparent',
    borderLeft: active ? '2px solid #5bb8ff' : '2px solid transparent',
    transition: 'background 0.1s',
  }),
  chartItemTitle: (active) => ({
    fontSize: 13, color: active ? '#e8f4ff' : '#5a8ab0',
    fontWeight: active ? 500 : 400, lineHeight: 1.35,
  }),
  main: { flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 },
  topBar: {
    padding: '14px 28px', borderBottom: '1px solid #0d2035',
    background: '#080f1c', position: 'sticky', top: 0, zIndex: 10,
    display: 'flex', alignItems: 'center', gap: 12,
  },
  catBadge: (color) => ({
    fontSize: 10, fontWeight: 600, letterSpacing: '0.1em',
    textTransform: 'uppercase', color, padding: '3px 8px',
    background: color + '18', border: `1px solid ${color}35`,
    borderRadius: 4, whiteSpace: 'nowrap',
  }),
  topBarTitle: { fontSize: 16, fontWeight: 500, color: '#e8f4ff' },
  content: { flex: 1, overflow: 'auto' },
  empty: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: '60vh', flexDirection: 'column', gap: 12,
  },
  emptyText: { fontSize: 14, color: '#2a4a6a' },
  hint: {
    margin: '0 28px 28px', padding: '12px 16px',
    background: '#080f1c', border: '1px solid #0d2035',
    borderLeft: '3px solid #1e4a7a', borderRadius: 6,
    fontSize: 12, color: '#3a6a8a', lineHeight: 1.8,
  },
  code: { fontFamily: "'IBM Plex Mono', monospace", color: '#5bb8ff', fontSize: 11 },
}

export default function App() {
  const [activeId, setActiveId] = useState(CHARTS[0]?.id ?? null)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return CHARTS
    return CHARTS.filter(c =>
      c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
    )
  }, [search])

  const grouped = useMemo(() => {
    const map = {}
    // Known categories first (preserves order)
    for (const cat of CATEGORIES) {
      const charts = filtered.filter(c => c.category === cat.id)
      if (charts.length) map[cat.id] = { ...cat, charts }
    }
    // Any unknown category folders get auto-added
    for (const chart of filtered) {
      if (!map[chart.category]) {
        map[chart.category] = {
          id: chart.category,
          label: chart.category.charAt(0).toUpperCase() + chart.category.slice(1),
          color: '#a78bfa',
          charts: filtered.filter(c => c.category === chart.category),
        }
      }
    }
    return map
  }, [filtered])

  const active = CHARTS.find(c => c.id === activeId)
  const ActiveComponent = active?.component ?? null
  const activeCatMeta = active
    ? (CATEGORY_META[active.category] ?? { label: active.category, color: '#a78bfa' })
    : null

  return (
    <div style={S.app}>
      <aside style={S.sidebar}>
        <div style={S.sidebarHeader}>
          <div style={S.wordmark}>Roberts Vision</div>
          <div style={S.sidebarTitle}>Chart Gallery</div>
          <div style={S.sidebarSubtitle}>
            {CHARTS.length} chart{CHARTS.length !== 1 ? 's' : ''} · {CATEGORIES.length} categor{CATEGORIES.length !== 1 ? 'ies' : 'y'}
          </div>
        </div>

        <div style={S.searchWrap}>
          <input
            style={S.searchInput}
            placeholder="Search charts…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <nav style={S.catSection}>
          {Object.values(grouped).map(cat => (
            <div key={cat.id}>
              <div style={S.catLabel}>
                <span style={S.catDot(cat.color)} />
                {cat.label}
              </div>
              {cat.charts.map(chart => (
                <div
                  key={chart.id}
                  style={S.chartItem(chart.id === activeId)}
                  onClick={() => setActiveId(chart.id)}
                >
                  <div style={S.chartItemTitle(chart.id === activeId)}>{chart.title}</div>
                </div>
              ))}
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: '20px', fontSize: 12, color: '#2a4a6a' }}>
              No charts match "{search}"
            </div>
          )}
        </nav>
      </aside>

      <main style={S.main}>
        {active ? (
          <>
            <div style={S.topBar}>
              {activeCatMeta && (
                <span style={S.catBadge(activeCatMeta.color)}>{activeCatMeta.label}</span>
              )}
              <span style={S.topBarTitle}>{active.title}</span>
            </div>
            <div style={S.content}>
              <ActiveComponent />
              <div style={S.hint}>
                <strong style={{ color: '#5bb8ff' }}>To add or rename a chart</strong><br />
                Drop any <span style={S.code}>.jsx</span> into <span style={S.code}>src/charts/&lt;category&gt;/</span> — the filename is the title.
                Rename the file → title updates. Move it → category changes. No other edits needed.
              </div>
            </div>
          </>
        ) : (
          <div style={S.empty}>
            <div style={S.emptyText}>Select a chart from the sidebar</div>
          </div>
        )}
      </main>
    </div>
  )
}
