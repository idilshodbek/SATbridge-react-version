import { useTheme } from '../theme.jsx'

export default function MockExams({ m }) {
  const { sx, cf } = useTheme()

  return (
    <div style={sx({ padding: '26px 30px 60px', maxWidth: '1500px' })}>
      <div style={sx({ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '18px', flexWrap: 'wrap', marginBottom: '20px' })}>
        <div>
          <div style={sx({ font: '800 13px Nunito', letterSpacing: '1.1px', textTransform: 'uppercase', color: '#93A3AE' })}>Mock exams</div>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '36px', lineHeight: '1.1' })}>Ready to test, Sukhrob?</div>
        </div>
        <div style={sx({ display: 'flex', gap: '10px', flexWrap: 'wrap' })}>
          <div style={sx({ padding: '11px 16px', borderRadius: '14px', background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', font: '900 13px Nunito', color: '#009ADA' })}>3 mocks left this month</div>
          <div style={sx({ padding: '11px 16px', borderRadius: '14px', background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', font: '900 13px Nunito', color: '#FF9600' })}>Exam in 45 days</div>
        </div>
      </div>
      <div style={sx({ background: '#0E2430', borderBottom: '6px solid #071620', borderRadius: '26px', padding: '24px 26px', color: '#fff', position: 'relative', overflow: 'hidden', marginBottom: '20px' })}>
        <div style={sx({ position: 'absolute', inset: '0', background: 'radial-gradient(220px 180px at 92% 0%,rgba(0,154,218,.42),transparent 70%)' })} />
        <div style={sx({ position: 'relative', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' })}>
          <div style={sx({ width: '132px', height: '132px', flex: 'none', borderRadius: '50%', background: `conic-gradient(#009ADA ${m.scoreDeg}deg,rgba(255,255,255,.12) 0)`, display: 'grid', placeItems: 'center' })}>
            <div style={sx({ width: '104px', height: '104px', borderRadius: '50%', background: '#0E2430', display: 'grid', placeItems: 'center', textAlign: 'center' })}>
              <div>
                <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '34px', lineHeight: '1' })}>1080</div>
                <div style={sx({ font: '800 9px Nunito', letterSpacing: '1.3px', opacity: '.6' })}>CURRENT</div>
              </div>
            </div>
          </div>
          <div style={sx({ flex: '1', minWidth: '230px' })}>
            <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '28px', lineHeight: '1.1' })}>Target score 1550</div>
            <div style={sx({ font: '700 15px Nunito', opacity: '.72', margin: '4px 0 14px' })}>Best mock 1180 · avg 1090 · 6 mocks taken</div>
            <div style={sx({ display: 'flex', gap: '9px', flexWrap: 'wrap' })}>
              {m.heroChips.map((c, cI) => (
                <div key={cI} style={sx({ padding: '9px 14px', borderRadius: '12px', background: c.bg, color: c.fg, font: '900 13px Nunito' })}>{c.label}</div>
              ))}
            </div>
          </div>
          <div style={sx({ flex: 'none', display: 'flex', flexDirection: 'column', gap: '9px', minWidth: '180px' })}>
            <button className="ac4" onClick={m.startExam} style={sx({ padding: '15px 22px', borderRadius: '16px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #46A302', background: '#58CC02', color: '#fff', font: '900 14px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Resume Test 01</button>
            <button className="ho15" style={sx({ padding: '14px 22px', borderRadius: '16px', border: '2px solid rgba(255,255,255,.35)', background: 'rgba(255,255,255,.1)', color: '#fff', font: '900 13px Nunito', letterSpacing: '.7px', textTransform: 'uppercase', cursor: 'pointer' })}>View score report</button>
          </div>
        </div>
      </div>
      <div style={sx({ display: 'flex', gap: '8px', padding: '5px', background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', borderRadius: '18px', marginBottom: '20px', overflow: 'auto' })}>
        {m.modeTabs.map((t, tI) => (
          <button key={tI} onClick={t.tap} style={sx({ flex: '1', minWidth: '130px', padding: '13px 16px', borderRadius: '14px', border: 'none', cursor: 'pointer', background: t.bg, color: t.fg, font: '900 13px Nunito', letterSpacing: '.6px', textTransform: 'uppercase', boxShadow: t.sh, transition: 'background .18s' })}>{t.label}<span style={sx({ font: '800 11px Nunito', opacity: '.65', marginLeft: '7px' })}>{t.count}</span></button>
        ))}
      </div>
      <div style={sx({ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' })}>
        <div style={sx({ flex: '1 1 520px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '14px' })}>
          <div style={sx({ font: '800 13px Nunito', letterSpacing: '.9px', textTransform: 'uppercase', color: '#93A3AE' })}>{m.listTitle}</div>
          {m.tests.map((t, tI) => (
            <div className="ho6" key={tI} style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: t.bd, borderBottomWidth: '5px', borderRadius: '24px', padding: '20px' })}>
              <div style={sx({ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' })}>
                <div style={sx({ width: '74px', height: '74px', flex: 'none', borderRadius: t.thumbRadius, background: t.ringBg, display: 'grid', placeItems: 'center' })}>
                  <div style={sx({ width: '56px', height: '56px', borderRadius: '50%', background: '#fff', display: 'grid', placeItems: 'center', font: '900 15px Nunito', color: t.ringFg })}>{t.thumb}</div>
                </div>
                <div style={sx({ flex: '1', minWidth: '200px' })}>
                  <div style={sx({ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' })}>
                    <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '23px', lineHeight: '1.15' })}>{t.name}</div>
                    <div style={sx({ padding: '5px 11px', borderRadius: '9px', background: t.tagBg, color: t.tagFg, font: '900 11px Nunito', letterSpacing: '.8px', textTransform: 'uppercase' })}>{t.tag}</div>
                  </div>
                  <div style={sx({ font: '700 14px Nunito', color: '#7B8B96', marginTop: '3px' })}>{t.meta}</div>
                  <div style={sx({ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' })}>
                    {t.sections.map((s, sI) => (
                      <div key={sI} style={sx({ padding: '8px 13px', borderRadius: '12px', background: s.bg, border: `2px solid ${s.bd}`, color: s.fg, font: '900 12px Nunito', letterSpacing: '.3px' })}>{s.label}</div>
                    ))}
                  </div>
                </div>
                <button className="ac4" onClick={t.go} style={sx({ flex: 'none', padding: '15px 26px', borderRadius: '16px', borderWidth: '0', borderStyle: 'none', borderBottom: `4px solid ${t.ctaDark}`, background: t.ctaBg, color: t.ctaFg, font: '900 13px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>{t.cta}</button>
              </div>
            </div>
          ))}
          <div style={sx({ marginTop: '8px', font: '800 13px Nunito', letterSpacing: '.9px', textTransform: 'uppercase', color: '#93A3AE' })}>Practice one section</div>
          <div style={sx({ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '14px' })}>
            {m.sectionTiles.map((s, sI) => (
              <button className="ho9" key={sI} onClick={s.go} style={sx({ textAlign: 'left', cursor: 'pointer', borderWidth: '0', borderStyle: 'none', borderBottom: `6px solid ${s.dark}`, borderRadius: '22px', padding: '18px', background: s.bg, color: s.fg, minHeight: '132px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' })}>
                <div style={sx({ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' })}>
                  <span style={sx({ font: '900 22px Nunito' })}>{s.icon}</span>
                  <span style={sx({ padding: '5px 11px', borderRadius: '999px', background: s.pillBg, color: s.pillFg, font: '900 12px Nunito' })}>{s.score}</span>
                </div>
                <div>
                  <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '21px', lineHeight: '1.15' })}>{s.name}</div>
                  <div style={sx({ font: '700 13px Nunito', opacity: '.85', marginTop: '2px' })}>{s.meta}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div style={sx({ width: '330px', flex: '1 1 300px', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '16px' })}>
          <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE', marginBottom: '14px' })}>Recent mock results</div>
            <div style={sx({ display: 'flex', flexDirection: 'column', gap: '11px' })}>
              {m.results.map((r, rI) => (
                <div key={rI} style={sx({ display: 'flex', alignItems: 'center', gap: '12px' })}>
                  <div style={sx({ width: '52px', font: '900 17px Nunito', color: '#1B2B36' })}>{r.score}</div>
                  <div style={sx({ flex: '1', minWidth: '0' })}>
                    <div style={sx({ font: '800 13px Nunito', marginBottom: '4px' })}>{r.name}</div>
                    <div style={sx({ height: '10px', borderRadius: '7px', background: '#EEF3F7' })}>
                      <div style={sx({ height: '100%', width: `${r.pct}%`, borderRadius: '7px', background: r.color })} />
                    </div>
                  </div>
                  <div style={sx({ font: '900 12px Nunito', color: r.deltaColor, minWidth: '38px', textAlign: 'right' })}>{r.delta}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={sx({ background: '#E9F7FD', borderWidth: '2px', borderStyle: 'solid', borderColor: '#C2E7F7', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#007AB0', marginBottom: '10px' })}>Exam-day simulation</div>
            <div style={sx({ font: '700 14px/1.55 Nunito', color: '#245A73', marginBottom: '14px' })}>Full timing, 10-minute break, no pausing. Closest thing to the real Bluebook test.</div>
            <div style={sx({ display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: '14px' })}>
              <div style={sx({ display: 'flex', justifyContent: 'space-between', font: '800 13px Nunito', color: '#245A73' })}>
                <span>Duration</span>
                <span>2h 14m</span>
              </div>
              <div style={sx({ display: 'flex', justifyContent: 'space-between', font: '800 13px Nunito', color: '#245A73' })}>
                <span>Modules</span>
                <span>4 adaptive</span>
              </div>
              <div style={sx({ display: 'flex', justifyContent: 'space-between', font: '800 13px Nunito', color: '#245A73' })}>
                <span>Report</span>
                <span>Instant</span>
              </div>
            </div>
            <button className="ac4" onClick={m.startExam} style={sx({ width: '100%', padding: '14px', borderRadius: '15px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #007AB0', background: '#009ADA', color: '#fff', font: '900 13px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Start simulation</button>
          </div>
          <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE', marginBottom: '12px' })}>Time per question</div>
            <div style={sx({ display: 'flex', alignItems: 'flex-end', gap: '7px', height: '104px' })}>
              {m.pace.map((p, pI) => (
                <div key={pI} style={sx({ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' })}>
                  <div title={p.title} style={sx({ width: '100%', height: `${p.h}%`, borderRadius: '9px 9px 4px 4px', background: p.color })} />
                  <div style={sx({ font: '800 10px Nunito', color: '#93A3AE', letterSpacing: '.4px' })}>{p.label}</div>
                </div>
              ))}
            </div>
            <div style={sx({ font: '700 13px Nunito', color: '#7B8B96', marginTop: '10px' })}>You slow down most on geometry — 2m 10s avg vs 1m 25s target.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
