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

const CustomTooltip = ({ active, payload, label }) => {
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
  return (
    <div style={{ padding: '28px 28px 8px', fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <p style={{ fontSize: 13, color: '#5a8ab0', marginBottom: 20 }}>
        Dots mark actual Pew Research / DHS data points · connecting lines interpolated
      </p>

      <ResponsiveContainer width="100%" height={380}>
        <ComposedChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 10 }}>
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
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#1e4a7a', strokeWidth: 1, strokeDasharray: '4 4' }} />
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

      <div style={{ marginTop: 12, fontSize: 10, color: '#2a4a6a', lineHeight: 1.6 }}>
        <strong style={{ color: '#3a6a8a' }}>Sources:</strong> Pew Research Center (Aug 2025 revised), DHS OHSS, U.S. Census Bureau.
        The 2023 figure of 14M reflects Pew's revised methodology incorporating Census Bureau Vintage 2024 data.
      </div>
    </div>
  )
}
