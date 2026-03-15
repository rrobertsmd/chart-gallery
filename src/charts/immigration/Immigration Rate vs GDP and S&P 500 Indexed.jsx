import {
  ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer,
} from 'recharts'

const rawData = [
  { year: 1985, undoc: 3.0,  usPop: 238.5, gdp: 4.34,  sp500: 171.60 },
  { year: 1986, undoc: 3.2,  usPop: 241.1, gdp: 4.59,  sp500: 208.20 },
  { year: 1987, undoc: 3.4,  usPop: 243.4, gdp: 4.87,  sp500: 264.50 },
  { year: 1988, undoc: 3.5,  usPop: 245.8, gdp: 5.25,  sp500: 250.50 },
  { year: 1989, undoc: 3.5,  usPop: 248.2, gdp: 5.66,  sp500: 285.40 },
  { year: 1990, undoc: 3.5,  usPop: 249.6, gdp: 5.98,  sp500: 339.97 },
  { year: 1991, undoc: 3.8,  usPop: 252.2, gdp: 6.17,  sp500: 325.49 },
  { year: 1992, undoc: 4.2,  usPop: 255.0, gdp: 6.54,  sp500: 416.08 },
  { year: 1993, undoc: 4.7,  usPop: 257.8, gdp: 6.88,  sp500: 435.23 },
  { year: 1994, undoc: 5.3,  usPop: 260.3, gdp: 7.31,  sp500: 472.99 },
  { year: 1995, undoc: 5.7,  usPop: 262.8, gdp: 7.66,  sp500: 465.25 },
  { year: 1996, undoc: 6.5,  usPop: 265.2, gdp: 8.10,  sp500: 614.42 },
  { year: 1997, undoc: 7.0,  usPop: 267.8, gdp: 8.61,  sp500: 766.22 },
  { year: 1998, undoc: 7.6,  usPop: 270.2, gdp: 9.09,  sp500: 963.36 },
  { year: 1999, undoc: 8.2,  usPop: 272.7, gdp: 9.66,  sp500: 1248.77 },
  { year: 2000, undoc: 8.4,  usPop: 282.2, gdp: 10.25, sp500: 1425.59 },
  { year: 2001, undoc: 9.3,  usPop: 285.1, gdp: 10.58, sp500: 1335.63 },
  { year: 2002, undoc: 9.8,  usPop: 287.8, gdp: 10.94, sp500: 1140.21 },
  { year: 2003, undoc: 10.2, usPop: 290.1, gdp: 11.51, sp500: 895.84 },
  { year: 2004, undoc: 10.4, usPop: 292.8, gdp: 12.27, sp500: 1132.52 },
  { year: 2005, undoc: 10.5, usPop: 295.5, gdp: 13.09, sp500: 1181.41 },
  { year: 2006, undoc: 11.5, usPop: 298.4, gdp: 13.86, sp500: 1278.73 },
  { year: 2007, undoc: 12.2, usPop: 301.6, gdp: 14.48, sp500: 1424.16 },
  { year: 2008, undoc: 11.6, usPop: 304.1, gdp: 14.72, sp500: 1378.55 },
  { year: 2009, undoc: 10.8, usPop: 306.8, gdp: 14.42, sp500: 865.58 },
  { year: 2010, undoc: 10.4, usPop: 309.3, gdp: 14.96, sp500: 1123.58 },
  { year: 2011, undoc: 10.4, usPop: 311.7, gdp: 15.52, sp500: 1257.64 },
  { year: 2012, undoc: 10.7, usPop: 314.0, gdp: 16.16, sp500: 1312.41 },
  { year: 2013, undoc: 10.6, usPop: 316.1, gdp: 16.78, sp500: 1480.40 },
  { year: 2014, undoc: 11.1, usPop: 318.9, gdp: 17.52, sp500: 1822.36 },
  { year: 2015, undoc: 10.9, usPop: 320.7, gdp: 18.21, sp500: 2028.18 },
  { year: 2016, undoc: 10.7, usPop: 323.1, gdp: 18.71, sp500: 2038.20 },
  { year: 2017, undoc: 10.5, usPop: 325.1, gdp: 19.48, sp500: 2275.12 },
  { year: 2018, undoc: 10.6, usPop: 327.2, gdp: 20.53, sp500: 2789.80 },
  { year: 2019, undoc: 10.5, usPop: 328.2, gdp: 21.38, sp500: 2506.85 },
  { year: 2020, undoc: 10.2, usPop: 331.4, gdp: 21.06, sp500: 3230.78 },
  { year: 2021, undoc: 10.5, usPop: 332.0, gdp: 23.32, sp500: 3700.65 },
  { year: 2022, undoc: 12.3, usPop: 333.3, gdp: 25.46, sp500: 4796.56 },
  { year: 2023, undoc: 14.0, usPop: 335.0, gdp: 27.36, sp500: 3839.50 },
]

const BASE = rawData[0]
const BASE_RATE = (BASE.undoc / BASE.usPop) * 1000

const data = rawData.map(d => {
  const rate = (d.undoc / d.usPop) * 1000
  return {
    year: d.year,
    undoc: d.undoc, gdp: d.gdp, sp500: d.sp500,
    rate: parseFloat(rate.toFixed(2)),
    rateIdx:  parseFloat(((rate / BASE_RATE) * 100).toFixed(1)),
    gdpIdx:   parseFloat(((d.gdp / BASE.gdp) * 100).toFixed(1)),
    sp500Idx: parseFloat(((d.sp500 / BASE.sp500) * 100).toFixed(1)),
  }
})

const C = { undoc: '#5bb8ff', gdp: '#4ade80', sp500: '#fbbf24' }

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  const d = data.find(x => x.year === label)
  if (!d) return null
  return (
    <div style={{
      background: '#0c1c2e', border: '1px solid #1e3a5a', borderRadius: 8,
      padding: '12px 16px', fontFamily: "'IBM Plex Mono', monospace",
      fontSize: 12, color: '#c8d8e8', minWidth: 240,
    }}>
      <div style={{ color: '#7dd3fc', fontWeight: 700, marginBottom: 8, borderBottom: '1px solid #1e3a5a', paddingBottom: 6 }}>
        {label}
      </div>
      {[
        { color: C.undoc, label: 'Undoc Rate', idx: d.rateIdx, actual: `${d.rate.toFixed(2)}/1k` },
        { color: C.gdp,   label: 'US GDP',     idx: d.gdpIdx,  actual: `$${d.gdp.toFixed(2)}T` },
        { color: C.sp500, label: 'S&P 500',    idx: d.sp500Idx, actual: d.sp500.toLocaleString() },
      ].map(row => (
        <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 14, marginBottom: 4 }}>
          <span style={{ color: row.color }}>● {row.label}</span>
          <span>
            <span style={{ color: '#fff', fontWeight: 600 }}>{row.idx}</span>
            <span style={{ color: '#4a7a9a', fontSize: 10, marginLeft: 5 }}>idx · {row.actual}</span>
          </span>
        </div>
      ))}
    </div>
  )
}

export default function ImmigrationGdpSp500() {
  return (
    <div style={{ padding: '28px 28px 8px', fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* Indexing explainer */}
      <div style={{
        background: '#091624', border: '1px solid #1a3050', borderLeft: '3px solid #3b82f6',
        borderRadius: 6, padding: '10px 14px', marginBottom: 20,
        fontSize: 12, color: '#5a8ab0', lineHeight: 1.65,
      }}>
        <strong style={{ color: '#7dd3fc' }}>Why indexed?</strong> Each series starts at a different scale — GDP in trillions, S&P 500 in price points, immigration as a rate.
        Indexing to <strong style={{ color: '#c8d8e8' }}>100 at 1985</strong> puts them on the same footing so you can compare relative growth directly.
        A value of 200 means the series has doubled since 1985.
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 20, marginBottom: 16, flexWrap: 'wrap' }}>
        {[['Undocumented rate /1k', C.undoc], ['US GDP', C.gdp], ['S&P 500', C.sp500]].map(([label, color]) => (
          <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: '#7a9ab8' }}>
            <span style={{ display: 'inline-block', width: 20, height: 2.5, background: color, borderRadius: 2 }} />
            {label}
          </span>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={360}>
        <ComposedChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#0d2035" vertical={false} />
          <XAxis dataKey="year"
            tick={{ fill: '#4a7a9a', fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" }}
            axisLine={{ stroke: '#1a3050' }} tickLine={false} interval={4} />
          <YAxis
            tick={{ fill: '#4a7a9a', fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" }}
            axisLine={false} tickLine={false}
            label={{ value: 'index (1985 = 100)', angle: -90, position: 'insideLeft', offset: 10, fill: '#2a5a7a', fontSize: 11 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#1e4a7a', strokeWidth: 1, strokeDasharray: '4 4' }} />
          <ReferenceLine y={100} stroke="#1e3a5a" strokeDasharray="4 3" />
          <Line type="monotone" dataKey="rateIdx"  stroke={C.undoc} strokeWidth={2.5} strokeDasharray="5 3"
            dot={{ r: 3, fill: C.undoc, stroke: '#0c1c2e', strokeWidth: 1.5 }} activeDot={{ r: 5 }} />
          <Line type="monotone" dataKey="gdpIdx"   stroke={C.gdp}   strokeWidth={2}   strokeDasharray="5 3"
            dot={{ r: 3, fill: C.gdp, stroke: '#0c1c2e', strokeWidth: 1.5 }}   activeDot={{ r: 5 }} />
          <Line type="monotone" dataKey="sp500Idx" stroke={C.sp500} strokeWidth={2}   strokeDasharray="5 3"
            dot={{ r: 3, fill: C.sp500, stroke: '#0c1c2e', strokeWidth: 1.5 }} activeDot={{ r: 5 }} />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Insight cards */}
      <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
        {[
          { title: '1990s Co-movement', body: 'All three series rose together through the dot-com boom. Immigration roughly tracked economic expansion.', color: C.undoc },
          { title: '2008 Divergence', body: 'GDP dipped briefly and S&P crashed 40%+, while immigration fell sharply as construction/service jobs evaporated.', color: C.sp500 },
          { title: '2020s Surge', body: 'Post-COVID S&P and GDP rebounded sharply. Undocumented immigration followed — reaching a revised record 14M in 2023.', color: C.undoc },
        ].map(o => (
          <div key={o.title} style={{
            flex: '1 1 220px', background: '#091624', border: '1px solid #1a3050',
            borderTop: `2px solid ${o.color}`, borderRadius: 8, padding: '12px 14px',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: o.color, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{o.title}</div>
            <div style={{ fontSize: 11, color: '#7a9ab8', lineHeight: 1.6 }}>{o.body}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16, fontSize: 10, color: '#2a4a6a', lineHeight: 1.6 }}>
        <strong style={{ color: '#3a6a8a' }}>Sources:</strong> GDP — U.S. Bureau of Economic Analysis. S&P 500 — Standard & Poor's (Jan 1 price). Unauthorized immigrants — Pew Research Center / DHS OHSS. All series indexed to 100 at 1985.
      </div>
    </div>
  )
}
