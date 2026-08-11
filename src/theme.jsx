import { createContext, useContext, useMemo, useEffect } from 'react'

/* ------------------------------------------------------------------ *
 * Colour maths
 * ------------------------------------------------------------------ */

const hex2 = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]
const rgb2 = c => '#' + c.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('')
const mixW = (h, t) => rgb2(hex2(h).map(v => v + (255 - v) * t))
const mixC = (h, target, t) => { const b = hex2(target); return rgb2(hex2(h).map((v, i) => v + (b[i] - v) * t)) }
const darken = (h, t) => rgb2(hex2(h).map(v => v * (1 - t)))

/**
 * The design is authored against one canonical palette (sky blue on white).
 * `brandMap` re-derives every blue token from whatever primary colour is
 * active, so switching the accent recolours the whole app coherently.
 */
function brandMap(primary, isDark) {
  const p = primary
  const base = isDark ? '#101B22' : '#ffffff'
  const t = amt => mixC(p, base, amt)
  return {
    '#009ADA': p,
    '#0AA6E8': isDark ? mixC(p, '#ffffff', 0.14) : mixW(p, 0.08),
    '#007AB0': darken(p, 0.2),
    '#66CFF5': isDark ? mixC(p, '#ffffff', 0.2) : mixW(p, 0.42),
    '#66D2FF': isDark ? mixC(p, '#ffffff', 0.22) : mixW(p, 0.45),
    '#B8E4F7': t(0.62),
    '#C2E7F7': t(0.7),
    '#D2ECF8': t(0.8),
    '#D6EFFA': t(0.85),
    '#E9F7FD': isDark ? t(0.88) : mixW(p, 0.93),
    '#F1FBFF': isDark ? t(0.9) : mixW(p, 0.96),
    '#245A73': isDark ? mixC(p, '#ffffff', 0.55) : darken(p, 0.55),
  }
}

/** Light-palette hex -> dark-palette hex, split by the role the colour plays. */
const DARK_MAPS = {
  bg: {
    '#ffffff': '#16232C', '#fff': '#16232C', '#F8FBFD': '#1A2830', '#F4F8FB': '#101B22',
    '#F7FAFC': '#101B22', '#F1F6FA': '#1E2C35', '#EFF4F7': '#22323C', '#EEF3F7': '#22323C',
    '#E6EEF3': '#27373F', '#DDE6EC': '#2D3E48', '#D7E3EB': '#2D3E48', '#B9C6CE': '#3A4C56',
    '#0E2430': '#1D2C37', '#071620': '#101C25', '#FFF7E3': '#2E2818', '#FFE3A3': '#4A3F20',
    '#F1FAE6': '#1C2A18', '#CFEBA8': '#31491F', '#FFF0F0': '#2E1B1B', '#FFCFCF': '#4A2626',
    '#FFF6E9': '#2E2418', '#FFE1B3': '#4A3820', '#F6F1FF': '#221D2E', '#DCC9FF': '#3A2F55',
    '#EDE3FF': '#2A2340', '#FFFBEF': '#2A2517', '#FFE9A8': '#453B1E',
  },
  fg: {
    '#1B2B36': '#E9F1F6', '#22313B': '#E2ECF2', '#2E3338': '#E2ECF2', '#42525C': '#C4D3DC',
    '#54646F': '#B2C3CD', '#5C7080': '#A6B8C3', '#7B8B96': '#91A4AF', '#93A3AE': '#8496A1',
    '#B9C6CE': '#6C7E89', '#5A4300': '#FFD98A', '#B07A16': '#F0C264', '#8C7A55': '#CBB88C',
    '#3F8C06': '#9BE85B', '#D93A3A': '#FF8A8A', '#CC7800': '#FFB652', '#6B45C8': '#C4A9FF',
    '#4A3B6B': '#CFC2EE', '#A85A5A': '#E4A0A0',
  },
}

/** Which dark-mode lookup table applies to a given CSS property. */
function roleFor(prop) {
  const p = prop.replace(/[A-Z]/g, c => '-' + c.toLowerCase())
  if (p === 'color') return DARK_MAPS.fg
  if (p === 'fill' || p === 'stroke') return null
  if (p.includes('background') || p.includes('border') || p === 'box-shadow' || p.startsWith('outline')) return DARK_MAPS.bg
  return null
}

/* ------------------------------------------------------------------ *
 * Translator
 * ------------------------------------------------------------------ */

function createTranslator(primary, isDark) {
  const brand = brandMap(primary, isDark)
  const primaryRgb = hex2(primary).join(', ')

  const forms = map => Object.keys(map).filter(k => k[0] === '#').map(k => {
    const full = k.length === 4 ? '#' + k[1] + k[1] + k[2] + k[2] + k[3] + k[3] : k
    const c = hex2(full)
    return {
      to: map[k],
      variants: [k, k.toLowerCase(), k.toUpperCase(), `rgb(${c.join(', ')})`, `rgb(${c.join(',')})`],
    }
  })
  const brandForms = forms(brand)
  const bgForms = forms(DARK_MAPS.bg)
  const fgForms = forms(DARK_MAPS.fg)
  const extraForms = extra => (extra === DARK_MAPS.bg ? bgForms : extra === DARK_MAPS.fg ? fgForms : null)

  const applyForms = (v, list) => {
    for (const { to, variants } of list) {
      for (const form of variants) {
        if (v.includes(form)) v = v.split(form).join(to)
      }
    }
    return v
  }

  const swap = (value, extra) => {
    let v = value
    if (v.includes('rgba(0, 154, 218,')) v = v.split('rgba(0, 154, 218,').join(`rgba(${primaryRgb},`)
    if (v.includes('rgba(0,154,218,')) v = v.split('rgba(0,154,218,').join(`rgba(${primaryRgb},`)
    v = applyForms(v, brandForms)
    const list = isDark ? extraForms(extra) : null
    if (list) v = applyForms(v, list)
    return v
  }

  const cache = new Map()

  /** Translate a single CSS declaration value. */
  const value = (prop, val) => {
    if (typeof val !== 'string' || !val) return val
    const key = prop + '|' + val
    const hit = cache.get(key)
    if (hit !== undefined) return hit
    const out = swap(val, isDark ? roleFor(prop) : null)
    cache.set(key, out)
    return out
  }

  /** Translate a whole CSS text block (stylesheets, hover rules). */
  const sheet = css => css.replace(/([-a-zA-Z]+)(\s*:\s*)([^;{}]+)/g, (_, prop, sep, val) => prop + sep + value(prop, val))

  return { value, sheet }
}

/* ------------------------------------------------------------------ *
 * Context
 * ------------------------------------------------------------------ */

const ThemeContext = createContext(null)

export function ThemeProvider({ primary = '#009ADA', isDark = false, children }) {
  const api = useMemo(() => {
    const tr = createTranslator(primary, isDark)

    /** Translate an inline-style object. Per-declaration results are memoised. */
    const sx = obj => {
      const out = {}
      for (const k in obj) out[k] = tr.value(k, obj[k])
      return out
    }

    /** Translate a bare colour used in an SVG `fill` / `stroke` attribute. */
    const cf = v => tr.value('fill', v)

    return { sx, cf, sheet: tr.sheet, isDark, primary }
  }, [primary, isDark])

  useEffect(() => {
    document.body.style.background = isDark ? '#101B22' : '#F4F8FB'
    document.body.style.color = isDark ? '#E9F1F6' : '#1B2B36'
  }, [isDark])

  return <ThemeContext.Provider value={api}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}
