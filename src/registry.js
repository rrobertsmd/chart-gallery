// ============================================================
//  AUTO-DISCOVERY REGISTRY
//
//  To add a chart:
//    1. Drop a .jsx file into src/charts/<category>/
//    2. Name the file exactly what you want displayed as the title
//       e.g. "Undocumented Immigrants per 1000 Residents.jsx"
//    3. Push — done. No edits to this file needed.
//
//  To rename a chart: just rename the .jsx file.
//  To change category: move the file to a different folder.
//
//  CATEGORY COLORS — only thing you'd ever edit here:
// ============================================================

export const CATEGORY_META = {
  immigration: { label: 'Immigration', color: '#5bb8ff' },
  finance:     { label: 'Finance',     color: '#4ade80' },
  medical:     { label: 'Medical',     color: '#f87171' },
  clinical:    { label: 'Clinical',    color: '#fb923c' },
  other:       { label: 'Other',       color: '#a78bfa' },
}

// Vite glob — eagerly imports every .jsx under src/charts/
// Path format: "./charts/immigration/My Chart Title.jsx"
const modules = import.meta.glob('./charts/**/*.jsx', { eager: true })

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function titleFromPath(path) {
  // "./charts/immigration/My Title.jsx" → "My Title"
  const filename = path.split('/').pop()
  return filename.replace(/\.jsx$/, '')
}

function categoryFromPath(path) {
  // "./charts/immigration/My Title.jsx" → "immigration"
  const parts = path.split('/')
  return parts[parts.length - 2]
}

export const CHARTS = Object.entries(modules)
  .map(([path, mod]) => {
    const title = titleFromPath(path)
    const category = categoryFromPath(path)
    return {
      id: slugify(title),
      title,
      category,
      component: mod.default,
      path,
    }
  })
  .sort((a, b) => a.title.localeCompare(b.title))

export const CATEGORIES = Object.entries(CATEGORY_META)
  .map(([id, meta]) => ({ id, ...meta }))
  .filter(cat => CHARTS.some(c => c.category === cat.id))
