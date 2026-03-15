import { useState, useRef, useCallback } from 'react'
import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer,
} from 'recharts'

const rawData = [
  { year: 1985, undoc: 3.0,  usPop: 238.5 },
  { year: 1986, undoc: 3.2,  usPop: 241.1 },
  { year: 1987, undoc: 3.4,  usPop: 243.4 },
  { year: 1988, undoc: 3.5,  usPop: 245.8 },
  { year: 1989, undoc: 3.5,  usPop: 248.2 },
  { year: 1990, undoc: 3.5,  usPop: 249.6 },
  { year: 1991, undoc: 3.8,  usPop: 252.2 },
  { year: 1992, undoc: 4.2,  usPop: 255.0 },
  { year: 1993, undoc: 4.7,  usPop: 257.8 },
  { year: 1994, undoc: 5.3,  usPop: 260.3 },
  { year: 1995, undoc: 5.7,  usPop: 262.8 },
  { year: 1996, undoc: 6.5,  usPop: 265.2 },
  { year: 1997, undoc: 7.0,  usPop: 267.8 },
  { year: 1998, undoc: 7.6,  usPop: 270.2 },
  { year: 1999, undoc: 8.2,  usPop: 272.7 },
  { year: 2000, undoc: 8.4,  usPop: 282.2 },
  { year: 2001, undoc: 9.3,  usPop: 285.1 },
  { year: 2002, undoc: 9.8,  usPop: 287.8 },
  { year: 2003, undoc: 10.2, usPop: 290.1 },
  { year: 2004, undoc: 10.4, usPop: 292.8 },
  { year: 2005, undoc: 10.5, usPop: 295.5 },
  { year: 2006, undoc: 11.5, usPop: 298.4 },
  { year: 2007, undoc: 12.2, usPop: 301.6 },
  { year: 2008, undoc: 11.6, usPop: 304.1 },
  { year: 2009, undoc: 10.8, usPop: 306.8 },
  { year: 2010, undoc: 10.4, usPop: 309.3 },
  { year: 2011, undoc: 10.4, usPop: 311.7 },
  { year: 2012, undoc: 10.7, usPop: 314.0 },
  { year: 2013, undoc: 10.6, usPop: 316.1 },
  { year: 2014, undoc: 11.1, usPop: 318.9 },
  { year: 2015, undoc: 10.9, usPop: 320.7 },
  { year: 2016, undoc: 10.7, usPop: 323.1 },
  { year: 2017, undoc: 10.5, usPop: 325.1 },
  { year: 2018, undoc: 10.6, usPop: 327.2 },
  { year: 2019, undoc: 10.5, usPop: 328.2 },
  { year: 2020, undoc: 10.2, usPop: 331.4 },
  { year: 2021, undoc: 10.5, usPop: 332.0 },
  { year: 2022, undoc: 12.3, usPop: 333.3 },
  { year: 2023, undoc: 14.0, usPop: 335.0 },
]

const data = rawData.map(d => ({
  year: d.year,
  undoc: d.undoc,
  rate: parseFloat(((d.undoc / d.usPop) * 1000).toFixed(2)),
}))

const events = [
  { year: 1986, label: 'IRCA Amnesty' },
  { year: 2001, label: 'Post-9/11' },
  { year: 2008, label: 'Great Recession' },
  { year: 2020, label: 'COVID-19' },
]

// Pinned tooltip shown above chart on mobile
function PinnedTooltip({ entry }) {
  if (!entry) return null
  return (
    <div style={{
      background: '#0c1c2e', border: '1px solid #1e3a5a', borderRadius: 8,
      padding: '10px 14px', fontFamily: "'IBM Plex Mono', monospace",
      fontSize: 13, color: '#c8d8e8', marginBottom: 10,
    }}>
      <span style={{ color: '#7dd3fc', fontWeight: 700, marginRight: 12 }}>{entry.year}</span>
      <span style={{ color: '#5bb8ff' }}>● {entry.rate.toFixed(2)} per 1,000 residents</span>
      <span style={{ color: '#4a7a9a', fontSize: 11, marginLeft: 10 }}>{entry.undoc}M undocumented</span>
    </div>
  )
}

// Standard floating tooltip for desktop
const FloatingTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  const d = data.find(x => x.year === label)
  if (!d) return null
  return (
    <div style={{
      background: '#0c1c2e', border: '1px solid #1e3a5a', borderRadius: 8,
      padding: '10px 14px', fontFamily: "'IBM Plex Mono', monospace",
      fontSize: 12, color: '#c8d8e8',
    }}>
      <div style={{ color: '#7dd3fc', fontWeight: 700, marginBottom: 6 }}>{label}</div>
      <div style={{ color: '#5bb8ff' }}>● {d.rate.toFixed(2)} per 1,000 residents</div>
      <div style={{ color: '#4a7a9a', fontSize: 10, marginTop: 2 }}>{d.undoc}M undocumented</div>
    </div>
  )
}

export default function UndocumentedPer1000() {
  const isMobile = window.innerWidth < 768
  const [touching, setTouching] = useState(false)
  const [pinnedEntry, setPinnedEntry] = useState(null)
  const timerRef = useRef(null)

  const handleTouchMove = useCallback(() => {
    clearTimeout(timerRef.current)
    setTouching(true)
    setPinnedEntry(null)
  }, [])

  const handleTouchEnd = useCallback(() => {
    timerRef.current = setTimeout(() => setTouching(false), 300)
  }, [])

  // On mobile, capture the hovered data point for pinned display
  const handleMouseMove = useCallback((state) => {
    if (!isMobile) return
    if (state?.activePayload?.[0]) {
      const year = state.activeLabel
      const entry = data.find(x => x.year === year)
      if (entry && !touching) setPinnedEntry(entry)
    }
  }, [isMobile, touching])

  return (
    <div style={{ padding: '28px 28px 8px', fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <p style={{ fontSize: 13, color: '#5a8ab0', marginBottom: isMobile ? 10 : 20 }}>
        Dots mark actual Pew Research / DHS data points · connecting lines interpolated
      </p>

      {/* Pinned tooltip above chart — mobile only */}
      {isMobile && <PinnedTooltip entry={pinnedEntry} />}

      <div
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <ResponsiveContainer width="100%" height={isMobile ? 300 : 380}>
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 20, bottom: 10, left: 10 }}
            onMouseMove={handleMouseMove}
          >
            <defs>
              <linearGradient id="areaGrad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#0d2035" vertical={false} />
            <XAxis
              dataKey="year"
              tick={{ fill: '#4a7a9a', fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" }}
              axisLine={{ stroke: '#1a3050' }} tickLine={false} interval={4}
            />
            <YAxis
              tick={{ fill: '#4a7a9a', fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" }}
              axisLine={false} tickLine={false} domain={[0, 50]}
              label={{ value: 'per 1,000 residents', angle: -90, position: 'insideLeft', offset: 10, fill: '#2a5a7a', fontSize: 11 }}
            />
            {/* Hide floating tooltip while touching on mobile */}
            <Tooltip
              content={isMobile ? (touching ? () => null : <FloatingTooltip />) : <FloatingTooltip />}
              cursor={{ stroke: '#1e4a7a', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            {events.map(e => (
              <ReferenceLine key={e.year} x={e.year} stroke="#1e3a5a" strokeDasharray="4 3"
                label={{ value: e.label, position: 'top', fill: '#3a6a8a', fontSize: 9.5 }} />
            ))}
            <Area type="monotone" dataKey="rate" fill="url(#areaGrad1)" stroke="none" />
            <Line type="monotone" dataKey="rate" stroke="#5bb8ff" strokeWidth={2}
              strokeDasharray="5 3"
              dot={{ r: 3.5, fill: '#5bb8ff', stroke: '#0c1c2e', strokeWidth: 1.5 }}
              activeDot={{ r: 5, fill: '#7dd3fc' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: 12, fontSize: 10, color: '#2a4a6a', lineHeight: 1.7 }}>
        <strong style={{ color: '#3a6a8a' }}>Sources:</strong> Pew Research Center (Aug 2025 revised), DHS OHSS, U.S. Census Bureau.
        The 2023 figure of 14M reflects Pew's revised methodology incorporating Census Bureau Vintage 2024 data.
      </div>
      <div style={{
        marginTop: 10, padding: '12px 14px',
        background: '#091624', border: '1px solid #1a3050',
        borderTop: '2px solid #5bb8ff', borderRadius: 8,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#5bb8ff', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Methodology Note</div>
        <div style={{ fontSize: 11, color: '#7a9ab8', lineHeight: 1.7 }}>
          The 2023 figure of 14M reflects a retroactive statistical correction — the "record" was constructed in December 2024 looking backward, not measured live in 2023. The underlying immigration was real, but the magnitude of the spike is partly an artifact of underreporting over decades. The U.S. Census Bureau operates under the Executive Branch (Department of Commerce). The Vintage 2024 methodology change was made by career Census Bureau statisticians on December 19, 2024 — during the Biden administration, with Biden's Commerce Secretary Gina Raimondo overseeing the Department. No legislation was passed and no law was signed.
        </div>
      </div>
    </div>
  )
}
