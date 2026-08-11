import { useTheme } from '../theme.jsx'

export default function Notes({ m }) {
  const { sx, cf } = useTheme()

  return (
    <div style={sx({ padding: '26px 30px 60px', maxWidth: '1100px' })}>
      <div style={sx({ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '18px' })}>
        <div>
          <div style={sx({ font: '800 13px Nunito', letterSpacing: '1.1px', textTransform: 'uppercase', color: '#93A3AE' })}>Notes</div>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '34px', lineHeight: '1.1' })}>Everything you flagged and wrote</div>
        </div>
        <button className="ac4" style={sx({ padding: '13px 20px', borderRadius: '15px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #007AB0', background: '#009ADA', color: '#fff', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>New note</button>
      </div>
      <div style={sx({ display: 'flex', gap: '6px', padding: '5px', background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', borderRadius: '18px', marginBottom: '18px', width: 'fit-content', flexWrap: 'wrap' })}>
        {m.noteTabs.map((t, tI) => (
          <button key={tI} onClick={t.tap} style={sx({ padding: '11px 18px', borderRadius: '13px', border: 'none', cursor: 'pointer', background: t.bg, color: t.fg, boxShadow: t.sh, font: '900 12px Nunito', letterSpacing: '.7px', textTransform: 'uppercase', transition: 'background .18s' })}>{t.label}</button>
        ))}
      </div>
      <div style={sx({ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '14px' })}>
        {m.noteRows.map((n, nI) => (
          <div className="ho16" key={nI} style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#EEF3F7', borderBottomWidth: '5px', borderLeft: `6px solid ${n.color}`, borderRadius: '20px', padding: '18px', cursor: 'pointer' })}>
            <div style={sx({ display: 'flex', gap: '12px', alignItems: 'flex-start' })}>
              <div style={sx({ width: '36px', height: '36px', flex: 'none', borderRadius: '12px', background: n.iconBg, display: 'grid', placeItems: 'center', font: '900 13px Nunito', color: n.iconFg })}>{n.icon}</div>
              <div style={sx({ flex: '1', minWidth: '0' })}>
                <div style={sx({ font: '800 16px/1.4 Nunito', marginBottom: '5px' })}>{n.t}</div>
                <div style={sx({ font: '700 12px Nunito', color: '#93A3AE' })}>{n.meta} · {n.when}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
