import { useTheme } from '../theme.jsx'

export default function MockResults({ m }) {
  const { sx, cf } = useTheme()

  return (
    <div style={sx({ padding: '26px 30px 60px', maxWidth: '1300px' })}>
      <div style={sx({ background: '#0E2430', borderBottom: '6px solid #071620', borderRadius: '26px', padding: '26px', color: '#fff', position: 'relative', overflow: 'hidden', marginBottom: '18px' })}>
        <div style={sx({ position: 'absolute', inset: '0', background: 'radial-gradient(260px 210px at 86% 0%,rgba(0,154,218,.45),transparent 70%)' })} />
        <div style={sx({ position: 'relative', display: 'flex', alignItems: 'center', gap: '26px', flexWrap: 'wrap' })}>
          <div style={sx({ textAlign: 'center' })}>
            <div style={sx({ font: '800 11px Nunito', letterSpacing: '1.2px', textTransform: 'uppercase', opacity: '.7' })}>Mock 06 · 12 Jul</div>
            <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '74px', lineHeight: '1' })}>1180</div>
            <div style={sx({ display: 'inline-block', marginTop: '4px', padding: '6px 13px', borderRadius: '999px', background: 'rgba(88,204,2,.22)', color: '#9BE85B', font: '900 12px Nunito', letterSpacing: '.6px' })}>+60 vs last mock</div>
          </div>
          <div style={sx({ flex: '1', minWidth: '250px', display: 'flex', flexDirection: 'column', gap: '14px' })}>
            <div>
              <div style={sx({ display: 'flex', justifyContent: 'space-between', font: '800 14px Nunito', marginBottom: '6px' })}>
                <span>Reading & Writing</span>
                <span>570 / 800</span>
              </div>
              <div style={sx({ height: '16px', borderRadius: '10px', background: 'rgba(255,255,255,.16)', padding: '3px' })}>
                <div style={sx({ height: '100%', width: '71%', borderRadius: '8px', background: '#009ADA' })} />
              </div>
            </div>
            <div>
              <div style={sx({ display: 'flex', justifyContent: 'space-between', font: '800 14px Nunito', marginBottom: '6px' })}>
                <span>Math</span>
                <span>610 / 800</span>
              </div>
              <div style={sx({ height: '16px', borderRadius: '10px', background: 'rgba(255,255,255,.16)', padding: '3px' })}>
                <div style={sx({ height: '100%', width: '76%', borderRadius: '8px', background: '#58CC02' })} />
              </div>
            </div>
            <div style={sx({ font: '700 14px Nunito', opacity: '.75' })}>Percentile 78 · 2h 06m used of 2h 14m</div>
          </div>
        </div>
      </div>
      <div style={sx({ display: 'flex', gap: '6px', padding: '5px', background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', borderRadius: '18px', marginBottom: '18px', width: 'fit-content' })}>
        {m.resTabs.map((t, tI) => (
          <button key={tI} onClick={t.tap} style={sx({ padding: '12px 22px', borderRadius: '13px', border: 'none', cursor: 'pointer', background: t.bg, color: t.fg, boxShadow: t.sh, font: '900 12px Nunito', letterSpacing: '.7px', textTransform: 'uppercase', transition: 'background .18s' })}>{t.label}</button>
        ))}
      </div>
      {m.resIsScore && (
        <div style={sx({ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' })}>
          <div style={sx({ flex: '1 1 520px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '18px' })}>
            <div style={sx({ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '14px' })}>
              <div style={sx({ background: '#F1FAE6', borderWidth: '2px', borderStyle: 'solid', borderColor: '#CFEBA8', borderBottomWidth: '5px', borderRadius: '20px', padding: '16px', textAlign: 'center' })}>
                <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '30px', color: '#3F8C06' })}>44</div>
                <div style={sx({ font: '800 11px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', color: '#7B8B96' })}>Correct</div>
              </div>
              <div style={sx({ background: '#FFF0F0', borderWidth: '2px', borderStyle: 'solid', borderColor: '#FFCFCF', borderBottomWidth: '5px', borderRadius: '20px', padding: '16px', textAlign: 'center' })}>
                <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '30px', color: '#D93A3A' })}>12</div>
                <div style={sx({ font: '800 11px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', color: '#7B8B96' })}>Wrong</div>
              </div>
              <div style={sx({ background: '#FFF6E9', borderWidth: '2px', borderStyle: 'solid', borderColor: '#FFE1B3', borderBottomWidth: '5px', borderRadius: '20px', padding: '16px', textAlign: 'center' })}>
                <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '30px', color: '#CC7800' })}>6</div>
                <div style={sx({ font: '800 11px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', color: '#7B8B96' })}>Careless</div>
              </div>
              <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '20px', padding: '16px', textAlign: 'center' })}>
                <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '30px', color: '#93A3AE' })}>8</div>
                <div style={sx({ font: '800 11px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', color: '#7B8B96' })}>Skipped</div>
              </div>
            </div>
            <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '24px', padding: '22px' })}>
              <div style={sx({ font: '800 13px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE', marginBottom: '14px' })}>Where you lost points</div>
              <div style={sx({ display: 'flex', flexDirection: 'column', gap: '13px' })}>
                {m.radarBars.map((s, sI) => (
                  <div key={sI}>
                    <div style={sx({ display: 'flex', justifyContent: 'space-between', font: '800 14px Nunito', marginBottom: '5px' })}>
                      <span>{s.name}</span>
                      <span style={sx({ color: s.pctColor })}>{s.pct}%</span>
                    </div>
                    <div style={sx({ height: '12px', borderRadius: '8px', background: '#EFF4F7' })}>
                      <div style={sx({ height: '100%', width: `${s.pct}%`, borderRadius: '8px', background: s.color })} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={sx({ width: '330px', flex: '1 1 290px', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '16px' })}>
            <div style={sx({ background: '#009ADA', borderBottom: '6px solid #007AB0', borderRadius: '22px', padding: '20px', color: '#fff' })}>
              <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', opacity: '.8', marginBottom: '8px' })}>Next step</div>
              <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '22px', lineHeight: '1.2', marginBottom: '5px' })}>18 misses ready to drill</div>
              <div style={sx({ font: '700 14px Nunito', opacity: '.85', marginBottom: '14px' })}>We grouped them into 2 drills you can finish today.</div>
              <button className="ac4" onClick={m.goDrills} style={sx({ width: '100%', padding: '13px', borderRadius: '15px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #DDE6EC', background: '#fff', color: '#007AB0', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Add to drills</button>
            </div>
            <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
              <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE', marginBottom: '12px' })}>Share</div>
              <div style={sx({ font: '700 14px/1.5 Nunito', color: '#42525C', marginBottom: '13px' })}>Send this report to a parent or tutor as a weekly summary.</div>
              <button className="ho1" onClick={m.goReport} style={sx({ width: '100%', padding: '13px', borderRadius: '15px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', background: '#fff', color: '#1B2B36', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Open share view</button>
            </div>
            <div style={sx({ background: '#E9F7FD', borderWidth: '2px', borderStyle: 'solid', borderColor: '#C2E7F7', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
              <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#007AB0', marginBottom: '9px' })}>Tutor summary</div>
              <div style={sx({ font: '700 14px/1.55 Nunito', color: '#245A73', marginBottom: '13px' })}>Six careless misses cost you about 40 points. Slow down on the questions you find easy.</div>
              <button className="ac4" onClick={m.goTutor} style={sx({ width: '100%', padding: '13px', borderRadius: '15px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #007AB0', background: '#009ADA', color: '#fff', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Walk me through it</button>
            </div>
          </div>
        </div>
      )}
      {m.resIsReview && (
        <>
          <div style={sx({ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' })}>
            {m.resFilters.map((f, fI) => (
              <button key={fI} onClick={f.tap} style={sx({ padding: '10px 16px', borderRadius: '13px', cursor: 'pointer', background: f.bg, borderWidth: '2px', borderStyle: 'solid', borderColor: f.bd, borderBottomWidth: '4px', color: f.fg, font: '900 11px Nunito', letterSpacing: '.7px', textTransform: 'uppercase' })}>{f.label}</button>
            ))}
          </div>
          <div style={sx({ display: 'flex', flexDirection: 'column', gap: '11px' })}>
            {m.resRows.map((r, rI) => (
              <div key={rI} style={sx({ display: 'flex', gap: '14px', padding: '16px 17px', borderRadius: '20px', background: r.tint, borderWidth: '2px', borderStyle: 'solid', borderColor: r.bd, borderBottomWidth: '4px' })}>
                <div style={sx({ width: '34px', height: '34px', flex: 'none', borderRadius: '11px', background: r.color, display: 'grid', placeItems: 'center', font: '900 15px Nunito', color: '#fff' })}>{r.glyph}</div>
                <div style={sx({ flex: '1', minWidth: '0' })}>
                  <div style={sx({ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '5px' })}>
                    <span style={sx({ font: '900 15px Nunito' })}>Q{r.n}</span>
                    <span style={sx({ font: '800 15px Nunito' })}>{r.topic}</span>
                    <span style={sx({ padding: '4px 9px', borderRadius: '8px', background: '#fff', border: `2px solid ${r.bd}`, font: '900 10px Nunito', letterSpacing: '.6px', textTransform: 'uppercase', color: r.fg })}>{r.label}</span>
                    <span style={sx({ padding: '4px 9px', borderRadius: '8px', background: '#fff', border: '2px solid #EEF3F7', font: '900 10px Nunito', letterSpacing: '.6px', textTransform: 'uppercase', color: '#93A3AE' })}>{r.domainLabel} · {r.time}</span>
                  </div>
                  {r.hasWhy && (
                    <div style={sx({ font: '700 14px/1.5 Nunito', color: '#54646F' })}>{r.why}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
