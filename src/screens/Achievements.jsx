import { useTheme } from '../theme.jsx'

export default function Achievements({ m }) {
  const { sx, cf } = useTheme()

  return (
    <div style={sx({ padding: '26px 30px 60px', maxWidth: '1150px' })}>
      <div style={sx({ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '20px' })}>
        <div>
          <div style={sx({ font: '800 13px Nunito', letterSpacing: '1.1px', textTransform: 'uppercase', color: '#93A3AE' })}>Achievements</div>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '34px', lineHeight: '1.1' })}>5 of 9 unlocked</div>
        </div>
        <button className="ho1" onClick={m.goProfile} style={sx({ padding: '13px 20px', borderRadius: '15px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', background: '#fff', color: '#54646F', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Back to profile</button>
      </div>
      <div style={sx({ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '16px' })}>
        {m.achv.map((a, aI) => (
          <div className="ho9" key={aI} style={sx({ background: a.bg, borderWidth: '2px', borderStyle: 'solid', borderColor: a.bd, borderBottomWidth: '5px', borderRadius: '22px', padding: '18px', display: 'flex', gap: '14px' })}>
            <div style={sx({ width: '54px', height: '54px', flex: 'none', borderRadius: '18px', background: a.badgeBg, display: 'grid', placeItems: 'center', fontSize: '24px' })}>{a.glyph}</div>
            <div style={sx({ flex: '1', minWidth: '0' })}>
              <div style={sx({ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '8px' })}>
                <div style={sx({ font: '800 16px Nunito' })}>{a.name}</div>
                <div style={sx({ font: '900 10px Nunito', letterSpacing: '.7px', textTransform: 'uppercase', color: a.labelFg })}>{a.label}</div>
              </div>
              <div style={sx({ font: '700 13px/1.4 Nunito', color: '#7B8B96', margin: '3px 0 9px' })}>{a.sub}</div>
              <div style={sx({ height: '9px', borderRadius: '6px', background: '#EFF4F7' })}>
                <div style={sx({ height: '100%', width: `${a.pct}%`, borderRadius: '6px', background: a.barColor })} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
