import { useTheme } from '../theme.jsx'

export default function QuestionBank({ m }) {
  const { sx, cf } = useTheme()

  return (
    <div style={sx({ padding: '26px 30px 60px', maxWidth: '1400px' })}>
      <div style={sx({ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '18px', flexWrap: 'wrap', marginBottom: '18px' })}>
        <div>
          <div style={sx({ font: '800 13px Nunito', letterSpacing: '1.1px', textTransform: 'uppercase', color: '#93A3AE' })}>Question bank</div>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '36px', lineHeight: '1.1' })}>4,280 questions, filtered your way</div>
          <div style={sx({ font: '700 15px Nunito', color: '#7B8B96', marginTop: '2px' })}>Official-style items tagged by domain, skill and difficulty — build a custom set</div>
        </div>
        <div style={sx({ display: 'flex', gap: '10px', flexWrap: 'wrap' })}>
          <div style={sx({ padding: '11px 16px', borderRadius: '14px', background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', font: '900 13px Nunito', color: '#D93A3A' })}>62 missed</div>
          <div style={sx({ padding: '11px 16px', borderRadius: '14px', background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', font: '900 13px Nunito', color: '#B07A16' })}>18 flagged</div>
        </div>
      </div>
      <div style={sx({ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' })}>
        <div style={sx({ flex: '1 1 320px', display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 17px', borderRadius: '18px', background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px' })}>
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={cf('#93A3AE')} strokeWidth="2.4" strokeLinecap="round">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>
          <input value={m.qbSearch} onChange={m.onQbSearch} placeholder="Search question text or skill" style={sx({ flex: '1', minWidth: '0', border: 'none', outline: 'none', background: 'transparent', font: '700 16px Nunito', color: '#1B2B36' })} />
        </div>
        <div style={sx({ display: 'flex', gap: '6px', padding: '5px', background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', borderRadius: '18px', overflow: 'auto' })}>
          {m.qbDomains.map((t, tI) => (
            <button key={tI} onClick={t.tap} style={sx({ padding: '11px 17px', borderRadius: '13px', border: 'none', cursor: 'pointer', background: t.bg, color: t.fg, boxShadow: t.sh, font: '900 12px Nunito', letterSpacing: '.7px', textTransform: 'uppercase', transition: 'background .18s' })}>{t.label}</button>
          ))}
        </div>
      </div>
      <div style={sx({ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' })}>
        <div style={sx({ flex: '1 1 540px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '11px' })}>
          {m.qbRows.map((r, rI) => (
            <div className="ho16" key={rI} onClick={r.tap} style={sx({ display: 'flex', gap: '14px', padding: '17px 18px', borderRadius: '20px', background: r.rowBg, borderWidth: '2px', borderStyle: 'solid', borderColor: r.rowBd, borderBottomWidth: '4px', cursor: 'pointer' })}>
              <div style={sx({ width: '28px', height: '28px', flex: 'none', borderRadius: '9px', background: r.boxBg, border: `2px solid ${r.boxBd}`, display: 'grid', placeItems: 'center', font: '900 14px Nunito', color: '#fff' })}>{r.check}</div>
              <div style={sx({ flex: '1', minWidth: '0' })}>
                <div style={sx({ font: '700 16px/1.5 Nunito', color: '#22313B', marginBottom: '10px' })}>{r.p}</div>
                <div style={sx({ display: 'flex', gap: '7px', flexWrap: 'wrap' })}>
                  <div style={sx({ padding: '6px 11px', borderRadius: '10px', background: r.domainBg, color: r.domainFg, font: '900 11px Nunito', letterSpacing: '.7px', textTransform: 'uppercase' })}>{r.domainLabel}</div>
                  <div style={sx({ padding: '6px 11px', borderRadius: '10px', background: '#F8FBFD', border: '2px solid #EEF3F7', color: '#54646F', font: '900 11px Nunito', letterSpacing: '.7px', textTransform: 'uppercase' })}>{r.topic}</div>
                  <div style={sx({ padding: '6px 11px', borderRadius: '10px', background: '#F8FBFD', border: '2px solid #EEF3F7', color: r.diffFg, font: '900 11px Nunito', letterSpacing: '.7px', textTransform: 'uppercase' })}>{r.diff}</div>
                  <div style={sx({ padding: '6px 11px', borderRadius: '10px', background: '#F8FBFD', border: '2px solid #EEF3F7', color: '#93A3AE', font: '900 11px Nunito', letterSpacing: '.7px', textTransform: 'uppercase' })}>{r.src}</div>
                  <div style={sx({ padding: '6px 11px', borderRadius: '10px', background: '#fff', border: '2px solid #EEF3F7', color: r.statusFg, font: '900 11px Nunito', letterSpacing: '.7px', textTransform: 'uppercase' })}>{r.statusLabel}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={sx({ width: '320px', flex: '1 1 280px', maxWidth: '350px', display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '26px' })}>
          <div style={sx({ background: '#0E2430', borderBottom: '6px solid #071620', borderRadius: '22px', padding: '20px', color: '#fff' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', opacity: '.7', marginBottom: '6px' })}>Your custom set</div>
            <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '40px', lineHeight: '1' })}>{m.qbCount}</div>
            <div style={sx({ font: '700 14px Nunito', opacity: '.75', margin: '2px 0 14px' })}>questions selected · tap rows to add</div>
            <button className="ac4" onClick={m.qbPractice} style={sx({ width: '100%', padding: '14px', borderRadius: '15px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #46A302', background: '#58CC02', color: '#fff', font: '900 13px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer', marginBottom: '9px' })}>Practice set</button>
            <button className="ho15" onClick={m.qbClear} style={sx({ width: '100%', padding: '12px', borderRadius: '15px', border: '2px solid rgba(255,255,255,.3)', background: 'rgba(255,255,255,.1)', color: '#fff', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Clear selection</button>
          </div>
          <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE', marginBottom: '12px' })}>Bank coverage</div>
            <div style={sx({ display: 'flex', flexDirection: 'column', gap: '12px' })}>
              {m.radarBars.map((s, sI) => (
                <div key={sI}>
                  <div style={sx({ display: 'flex', justifyContent: 'space-between', font: '800 13px Nunito', marginBottom: '5px' })}>
                    <span>{s.name}</span>
                    <span style={sx({ color: s.pctColor })}>{s.pct}%</span>
                  </div>
                  <div style={sx({ height: '11px', borderRadius: '8px', background: '#EFF4F7' })}>
                    <div style={sx({ height: '100%', width: `${s.pct}%`, borderRadius: '8px', background: s.color })} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={sx({ background: '#E9F7FD', borderWidth: '2px', borderStyle: 'solid', borderColor: '#C2E7F7', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#007AB0', marginBottom: '9px' })}>Shortcut</div>
            <div style={sx({ font: '700 14px/1.55 Nunito', color: '#245A73', marginBottom: '13px' })}>Let the tutor pick 12 questions from everything you have ever missed.</div>
            <button className="ac4" onClick={m.goDrills} style={sx({ width: '100%', padding: '13px', borderRadius: '15px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #007AB0', background: '#009ADA', color: '#fff', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Build smart set</button>
          </div>
        </div>
      </div>
    </div>
  )
}
