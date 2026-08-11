import { useTheme } from './theme.jsx'
import { PSEUDO_CSS } from './pseudoStyles.js'

const BASE_CSS = `
*{box-sizing:border-box}
body{margin:0;background:#F4F8FB;font-family:Nunito,system-ui,sans-serif;color:#1B2B36;-webkit-font-smoothing:antialiased}
a{color:#009ADA;text-decoration:none}
a:hover{color:#007AB0}
button{font-family:Nunito,system-ui,sans-serif}
input{font-family:Nunito,system-ui,sans-serif}
::-webkit-scrollbar{width:10px;height:10px}
::-webkit-scrollbar-thumb{background:#D7E3EB;border-radius:8px}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
@keyframes glow{0%,100%{box-shadow:0 0 0 0 rgba(0,154,218,.5)}50%{box-shadow:0 0 0 16px rgba(0,154,218,0)}}
@keyframes slidein{from{transform:translateY(14px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes dash{to{stroke-dashoffset:-40}}
`

/**
 * Base stylesheet plus the hover/active/focus rules the design carried as
 * `style-hover` attributes. Both go through the theme translator so the
 * accent colour and dark mode reach pseudo-states too.
 */
export default function GlobalStyles() {
  const { sheet } = useTheme()
  return <style>{sheet(BASE_CSS + '\n' + PSEUDO_CSS)}</style>
}
