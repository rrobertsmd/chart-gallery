# Chart Gallery

A personal chart viewer — organized by category, deployed on Vercel.

## Local development

```bash
npm install
npm run dev
```

## Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

---

## Adding a chart — it's just a filename

1. Drop a `.jsx` file into the right category folder
2. Name it exactly what you want shown as the title

```
src/charts/immigration/Undocumented Immigrants per 1000 Residents.jsx
src/charts/finance/S&P 500 Annual Returns Since 1980.jsx
src/charts/medical/LASIK Outcomes by Attempted Correction.jsx
```

3. Push to Vercel — done. No other files to edit.

**To rename:** just rename the `.jsx` file — title updates automatically.  
**To recategorize:** move the file to a different folder.

---

## Adding a new category

Just create a new subfolder under `src/charts/`:
```
src/charts/clinical/My Chart.jsx
```

It auto-appears in the sidebar. To give it a custom color, add one line to `src/registry.js`:
```js
clinical: { label: 'Clinical', color: '#fb923c' },
```

---

## Project structure

```
src/
  charts/
    immigration/
      Undocumented Immigrants per 1000 Residents.jsx
      Immigration Rate vs GDP and S&P 500 Indexed.jsx
    finance/        ← drop finance charts here
    medical/        ← drop medical/clinical charts here
    other/
  registry.js       ← only edit for category colors
  App.jsx
  main.jsx
index.html
package.json
vite.config.js
```
