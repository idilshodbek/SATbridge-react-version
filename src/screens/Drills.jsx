import { useTheme } from '../theme.jsx'

export default function Drills({ m }) {
  const { sx, cf } = useTheme()

  return (
    <div style={sx({ padding: '26px 30px 60px', maxWidth: '1400px' })}>
      <div style={sx({ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '18px', flexWrap: 'wrap', marginBottom: '20px' })}>
        <div>
          <div style={sx({ font: '800 13px Nunito', letterSpacing: '1.1px', textTransform: 'uppercase', color: '#93A3AE' })}>Drills</div>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '36px', lineHeight: '1.1' })}>Short sets, one skill each</div>
          <div style={sx({ font: '700 15px Nunito', color: '#7B8B96', marginTop: '2px' })}>10–12 questions · instant explanations · counts toward your daily goal</div>
        </div>
        <div style={sx({ display: 'flex', gap: '10px', flexWrap: 'wrap' })}>
          <div style={sx({ padding: '11px 16px', borderRadius: '14px', background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', font: '900 13px Nunito', color: '#009ADA' })}>14 drills done</div>
          <div style={sx({ padding: '11px 16px', borderRadius: '14px', background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', font: '900 13px Nunito', color: '#FF9600' })}>🔥 4-day drill streak</div>
        </div>
      </div>
      <div style={sx({ background: '#0E2430', borderBottom: '6px solid #071620', borderRadius: '26px', padding: '24px 26px', color: '#fff', position: 'relative', overflow: 'hidden', marginBottom: '20px' })}>
        <div style={sx({ position: 'absolute', inset: '0', background: 'radial-gradient(220px 180px at 90% 0%,rgba(0,154,218,.42),transparent 70%)' })} />
        <div style={sx({ position: 'relative', display: 'flex', alignItems: 'center', gap: '22px', flexWrap: 'wrap' })}>
          <div style={sx({ width: '70px', height: '70px', flex: 'none', borderRadius: '22px', background: '#009ADA', display: 'grid', placeItems: 'center', font: '900 26px Nunito' })}>⚡</div>
          <div style={sx({ flex: '1', minWidth: '220px' })}>
            <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '26px', lineHeight: '1.15' })}>Smart drill · built from your 12 latest misses</div>
            <div style={sx({ font: '700 14px Nunito', opacity: '.75', marginTop: '4px' })}>Vocabulary in context, circles and arcs, percent change — 12 questions, adaptive difficulty.</div>
          </div>
          <button className="ac4" onClick={m.startExam} style={sx({ flex: 'none', padding: '15px 26px', borderRadius: '16px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #46A302', background: '#58CC02', color: '#fff', font: '900 14px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Start smart drill</button>
        </div>
      </div>
      <div style={sx({ display: 'flex', gap: '7px', padding: '5px', background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', borderRadius: '18px', marginBottom: '20px', overflow: 'auto' })}>
        {m.drillTabs.map((t, tI) => (
          <button key={tI} onClick={t.tap} style={sx({ flex: '1', minWidth: '140px', padding: '13px 16px', borderRadius: '14px', border: 'none', cursor: 'pointer', background: t.bg, color: t.fg, boxShadow: t.sh, font: '900 13px Nunito', letterSpacing: '.6px', textTransform: 'uppercase', transition: 'background .18s' })}>{t.label}</button>
        ))}
      </div>
      <div style={sx({ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' })}>
        <div style={sx({ flex: '1 1 540px', minWidth: '0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '16px' })}>
          {m.drills.map((d, dI) => (
            <div className="ho6" key={dI} style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' })}>
              <div style={sx({ display: 'flex', alignItems: 'center', gap: '14px' })}>
                <div style={sx({ width: '62px', height: '62px', flex: 'none', borderRadius: '50%', background: d.ring, display: 'grid', placeItems: 'center' })}>
                  <div style={sx({ width: '48px', height: '48px', borderRadius: '50%', background: '#fff', display: 'grid', placeItems: 'center', font: '900 14px Nunito', color: d.color })}>{d.acc}%</div>
                </div>
                <div style={sx({ minWidth: '0' })}>
                  <div style={sx({ font: '800 17px/1.25 Nunito' })}>{d.name}</div>
                  <div style={sx({ font: '700 13px Nunito', color: '#93A3AE', marginTop: '2px' })}>{d.q} · {d.min}</div>
                </div>
              </div>
              <div style={sx({ display: 'flex', gap: '7px', flexWrap: 'wrap' })}>
                <div style={sx({ padding: '6px 11px', borderRadius: '10px', background: d.domainBg, color: d.domainFg, font: '900 11px Nunito', letterSpacing: '.7px', textTransform: 'uppercase' })}>{d.domainLabel}</div>
                <div style={sx({ padding: '6px 11px', borderRadius: '10px', background: '#F4F8FB', border: '2px solid #E6EEF3', color: '#7B8B96', font: '900 11px Nunito', letterSpacing: '.7px', textTransform: 'uppercase' })}>{d.diff}</div>
              </div>
              <button className="ac4" onClick={d.go} style={sx({ marginTop: 'auto', width: '100%', padding: '13px', borderRadius: '15px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #007AB0', background: '#009ADA', color: '#fff', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Start drill</button>
            </div>
          ))}
        </div>
        <div style={sx({ width: '320px', flex: '1 1 280px', maxWidth: '350px', display: 'flex', flexDirection: 'column', gap: '16px' })}>
          <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE', marginBottom: '12px' })}>Recent drills</div>
            <div style={sx({ display: 'flex', flexDirection: 'column', gap: '11px' })}>
              {m.drillHistory.map((h, hI) => (
                <div key={hI} style={sx({ display: 'flex', alignItems: 'center', gap: '12px' })}>
                  <div style={sx({ width: '10px', height: '38px', borderRadius: '6px', background: h.color })} />
                  <div style={sx({ flex: '1', minWidth: '0' })}>
                    <div style={sx({ font: '800 14px Nunito', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' })}>{h.name}</div>
                    <div style={sx({ font: '700 12px Nunito', color: '#93A3AE' })}>{h.when}</div>
                  </div>
                  <div style={sx({ font: '900 14px Nunito', color: h.color })}>{h.score}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={sx({ background: '#E9F7FD', borderWidth: '2px', borderStyle: 'solid', borderColor: '#C2E7F7', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#007AB0', marginBottom: '10px' })}>Drill goal</div>
            <div style={sx({ font: '700 14px/1.55 Nunito', color: '#245A73', marginBottom: '14px' })}>3 drills a day keeps your streak and adds roughly +20 points a week.</div>
            <div style={sx({ display: 'flex', gap: '8px' })}>
              <div style={sx({ flex: '1', height: '36px', borderRadius: '12px', background: '#009ADA', display: 'grid', placeItems: 'center', font: '900 13px Nunito', color: '#fff' })}>✓</div>
              <div style={sx({ flex: '1', height: '36px', borderRadius: '12px', background: '#009ADA', display: 'grid', placeItems: 'center', font: '900 13px Nunito', color: '#fff' })}>✓</div>
              <div style={sx({ flex: '1', height: '36px', borderRadius: '12px', background: '#D2ECF8' })} />
            </div>
          </div>
          <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE', marginBottom: '12px' })}>Ask the tutor</div>
            <div style={sx({ font: '700 14px/1.5 Nunito', color: '#42525C', marginBottom: '14px' })}>Not sure why a drill answer was wrong? Bridge AI has the full history.</div>
            <button className="ho1" onClick={m.goTutor} style={sx({ width: '100%', padding: '13px', borderRadius: '15px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', background: '#fff', color: '#1B2B36', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Open AI tutor</button>
          </div>
        </div>
      </div>
    </div>
  )
}
