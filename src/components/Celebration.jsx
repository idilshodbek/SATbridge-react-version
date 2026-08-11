import { useTheme } from '../theme.jsx'

export default function Celebration({ m }) {
  const { sx, cf } = useTheme()

  return (
    <div style={sx({ position: 'fixed', inset: '0', zIndex: '80', background: 'rgba(14,36,48,.55)', display: 'grid', placeItems: 'center', padding: '26px' })}>
      <div style={sx({ width: '460px', maxWidth: '100%', background: '#fff', borderBottom: '7px solid #DDE6EC', borderRadius: '28px', overflow: 'hidden', textAlign: 'center', animation: 'pop .32s ease-out' })}>
        <div style={sx({ padding: '30px 26px 24px', background: m.cele.color, color: '#fff', position: 'relative', overflow: 'hidden' })}>
          <div style={sx({ position: 'absolute', inset: '0', background: 'repeating-linear-gradient(135deg,rgba(255,255,255,.08) 0 16px,transparent 16px 32px)' })} />
          <div style={sx({ position: 'relative' })}>
            <div style={sx({ fontSize: '58px', lineHeight: '1', animation: 'bob 2.2s ease-in-out infinite' })}>{m.cele.glyph}</div>
            <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '29px', lineHeight: '1.2', marginTop: '12px' })}>{m.cele.title}</div>
            <div style={sx({ display: 'inline-block', marginTop: '12px', padding: '8px 18px', borderRadius: '999px', background: 'rgba(255,255,255,.22)', font: '900 15px Nunito', letterSpacing: '.6px' })}>{m.cele.stat}</div>
          </div>
        </div>
        <div style={sx({ padding: '24px 26px 26px' })}>
          <div style={sx({ font: '700 16px/1.6 Nunito', color: '#54646F', marginBottom: '20px' })}>{m.cele.body}</div>
          <button className="ac17" onClick={m.celeContinue} style={sx({ width: '100%', padding: '16px', borderRadius: '17px', borderWidth: '0', borderStyle: 'none', borderBottom: `5px solid ${m.cele.dark}`, background: m.cele.color, color: '#fff', font: '900 14px Nunito', letterSpacing: '.9px', textTransform: 'uppercase', cursor: 'pointer' })}>Continue</button>
          <button className="ho1" onClick={m.closeCele} style={sx({ width: '100%', marginTop: '9px', padding: '13px', borderRadius: '17px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', background: '#fff', color: '#93A3AE', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Dismiss</button>
        </div>
      </div>
    </div>
  )
}
