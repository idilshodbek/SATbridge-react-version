import { useTheme } from '../theme.jsx'

export default function LearningPath({ m }) {
  const { sx, cf } = useTheme()

  return (
    <div style={sx({ minHeight: '100%', background: 'linear-gradient(#F4F8FB,#EAF4F9)' })}>
      <div style={sx({ position: 'sticky', top: '0', zIndex: '12', background: 'rgba(244,248,251,.94)', backdropFilter: 'blur(6px)', borderBottom: '2px solid #E1EBF1', padding: '18px 30px 14px' })}>
        <div style={sx({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '18px', flexWrap: 'wrap', marginBottom: '14px' })}>
          <div>
            <div style={sx({ font: '800 12px Nunito', letterSpacing: '1.2px', textTransform: 'uppercase', color: '#93A3AE' })}>Learning path · adaptive plan</div>
            <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '30px', lineHeight: '1.15' })}>{m.unit.name}</div>
          </div>
          <div style={sx({ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' })}>
            <div style={sx({ padding: '9px 15px', borderRadius: '14px', background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', font: '900 13px Nunito', color: '#009ADA' })}>Level 7 · {m.xpEarned} XP</div>
            <div style={sx({ padding: '9px 15px', borderRadius: '14px', background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', font: '900 13px Nunito', color: '#FF9600' })}>🔥 24 days</div>
          </div>
        </div>
        <div style={sx({ display: 'flex', gap: '9px', overflow: 'auto', paddingBottom: '4px' })}>
          {m.unitChips.map((u, uI) => (
            <button className="ho3" key={uI} onClick={u.tap} style={sx({ flex: 'none', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', borderRadius: '16px', cursor: 'pointer', background: u.bg, borderWidth: '2px', borderStyle: 'solid', borderColor: u.bd, borderBottomWidth: '4px', color: u.fg, font: '900 13px Nunito', letterSpacing: '.4px' })}><span style={sx({ width: '24px', height: '24px', borderRadius: '50%', background: u.dotBg, display: 'grid', placeItems: 'center', font: '900 11px Nunito', color: u.dotFg })}>{u.n}</span>{u.short}
          <span style={sx({ font: '800 11px Nunito', opacity: '.7' })}>{u.pct}%</span></button>
          ))}
        </div>
      </div>
      <div style={sx({ display: 'flex', flexWrap: 'wrap', gap: '24px', padding: '24px 30px 130px', maxWidth: '1500px', alignItems: 'flex-start' })}>
        <div style={sx({ flex: '1 1 460px', minWidth: '0' })}>
          <div style={sx({ borderRadius: '26px', padding: '22px 26px', background: m.unit.color, borderBottom: `7px solid ${m.unit.dark}`, color: '#fff', position: 'relative', overflow: 'hidden', marginBottom: '8px' })}>
            <div style={sx({ position: 'absolute', inset: '0', opacity: '.16', background: 'repeating-linear-gradient(135deg,#fff 0 12px,transparent 12px 26px)' })} />
            <div style={sx({ position: 'relative', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px' })}>
              <div style={sx({ minWidth: '200px' })}>
                <div style={sx({ font: '800 12px Nunito', letterSpacing: '1.2px', textTransform: 'uppercase', opacity: '.85' })}>Unit {m.unit.n} · {m.unit.section}</div>
                <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '26px', lineHeight: '1.2' })}>{m.unit.name}</div>
                <div style={sx({ font: '700 14px Nunito', opacity: '.85', marginTop: '3px' })}>{m.unit.blurb}</div>
              </div>
              <div style={sx({ display: 'flex', gap: '9px', flexWrap: 'wrap' })}>
                <button className="ho10" style={sx({ display: 'flex', alignItems: 'center', gap: '8px', padding: '11px 15px', borderRadius: '14px', border: '2px solid rgba(255,255,255,.5)', background: 'rgba(0,0,0,.1)', color: '#fff', font: '900 12px Nunito', letterSpacing: '.6px', textTransform: 'uppercase', cursor: 'pointer' })}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M5 5h8a3 3 0 0 1 3 3v11H8a3 3 0 0 1-3-3V5Z" />
                  <path d="M16 8h3v11" />
                </svg>Guidebook</button>
                <button className="ac4" onClick={m.jumpCurrent} style={sx({ padding: '11px 15px', borderRadius: '14px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #DDE6EC', background: '#fff', color: m.unit.dark, font: '900 12px Nunito', letterSpacing: '.6px', textTransform: 'uppercase', cursor: 'pointer' })}>Jump to current</button>
              </div>
            </div>
          </div>
          <div style={sx({ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '18px' })}>
            {m.nodes.map((n, nI) => (
              <div key={nI} style={sx({ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' })}>
                <div style={sx({ width: '6px', height: '34px', borderRadius: '4px', background: n.spine, opacity: n.spineOp })} />
                <div style={sx({ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: `${n.dx}px` })}>
                  {n.isCurrent && (
                    <div style={sx({ marginBottom: '9px', padding: '7px 15px', background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', borderRadius: '13px', font: '900 12px Nunito', letterSpacing: '1.1px', color: '#009ADA', textTransform: 'uppercase', animation: 'bob 2.2s ease-in-out infinite' })}>Start here</div>
                  )}
                  <button className="ho11" onClick={n.tap} title={n.title} style={sx({ width: '96px', height: '96px', padding: '0', border: 'none', borderRadius: '50%', cursor: 'pointer', background: `conic-gradient(${n.ring} ${n.ringDeg}deg,${n.ringTrack} 0)`, display: 'grid', placeItems: 'center', animation: n.anim })}>
                    <span style={sx({ width: '78px', height: '78px', borderRadius: '50%', background: n.bg, borderBottom: `7px solid ${n.dark}`, display: 'grid', placeItems: 'center', font: '900 25px Nunito', color: n.iconColor })}>{n.glyph}</span>
                  </button>
                  <div style={sx({ marginTop: '8px', textAlign: 'center', maxWidth: '190px' })}>
                    <div style={sx({ font: '800 14px Nunito', color: n.labelColor, lineHeight: '1.25' })}>{n.title}</div>
                    <div style={sx({ font: '800 11px Nunito', letterSpacing: '.6px', textTransform: 'uppercase', color: '#A3B1BB', marginTop: '2px' })}>{n.meta}</div>
                  </div>
                  {n.open && (
                    <div style={sx({ position: 'absolute', top: '104px', left: '50%', transform: 'translateX(-50%)', width: '322px', zIndex: '20', background: n.bg, borderBottom: `6px solid ${n.dark}`, borderRadius: '22px', padding: '20px', color: '#fff', animation: 'slidein .18s ease-out', boxShadow: '0 18px 40px rgba(11,42,58,.18)' })}>
                      <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '21px', lineHeight: '1.2' })}>{n.title}</div>
                      <div style={sx({ font: '700 14px Nunito', opacity: '.88', margin: '6px 0 14px' })}>{n.sub}</div>
                      <div style={sx({ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' })}>
                        {n.tags.map((t, tI) => (
                          <div key={tI} style={sx({ padding: '6px 11px', borderRadius: '10px', background: 'rgba(255,255,255,.2)', font: '900 11px Nunito', letterSpacing: '.6px', textTransform: 'uppercase' })}>{t}</div>
                        ))}
                      </div>
                      <button className="ac4" onClick={n.start} style={sx({ width: '100%', padding: '14px', borderRadius: '15px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #DDE6EC', background: '#fff', color: n.dark, font: '900 14px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>{n.cta}</button>
                      {n.canWatch && (
                        <button className="ho12" onClick={n.watch} style={sx({ width: '100%', marginTop: '9px', padding: '12px', borderRadius: '15px', border: '2px solid rgba(255,255,255,.5)', background: 'rgba(0,0,0,.12)', color: '#fff', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' })}><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                        </svg>Open lesson</button>
                      )}
                    </div>
                  )}
                </div>
                {n.checkpoint && (
                  <div style={sx({ width: '100%', maxWidth: '560px', margin: '26px 0 4px', padding: '16px 20px', borderRadius: '20px', background: '#fff', border: '2px dashed #C2E7F7', display: 'flex', alignItems: 'center', gap: '14px' })}>
                    <div style={sx({ width: '44px', height: '44px', flex: 'none', borderRadius: '14px', background: '#E9F7FD', display: 'grid', placeItems: 'center', font: '900 18px Nunito', color: '#009ADA' })}>⚑</div>
                    <div style={sx({ flex: '1' })}>
                      <div style={sx({ font: '800 15px Nunito' })}>{n.checkpointTitle}</div>
                      <div style={sx({ font: '700 13px Nunito', color: '#93A3AE' })}>{n.checkpointSub}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div style={sx({ margin: '34px 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' })}>
              <div style={sx({ width: '100%', maxWidth: '520px', height: '2px', background: '#DCE7EE' })} />
              <div style={sx({ padding: '9px 18px', borderRadius: '999px', background: '#E6EEF3', font: '900 12px Nunito', letterSpacing: '1.2px', color: '#7B8B96', textTransform: 'uppercase' })}>{m.nextUnitLabel}</div>
            </div>
          </div>
        </div>
        <div style={sx({ width: '330px', flex: '1 1 300px', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '150px' })}>
          <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
            <div style={sx({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' })}>
              <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE' })}>Unit progress</div>
              <div style={sx({ font: '900 14px Nunito', color: '#009ADA' })}>{m.unitPct}%</div>
            </div>
            <div style={sx({ height: '18px', borderRadius: '12px', background: '#EEF3F7', padding: '3px', marginBottom: '14px' })}>
              <div style={sx({ height: '100%', width: `${m.unitPct}%`, borderRadius: '10px', background: 'linear-gradient(90deg,#4CC3F0,#009ADA)', transition: 'width .4s' })} />
            </div>
            <div style={sx({ display: 'flex', gap: '9px' })}>
              <div style={sx({ flex: '1', textAlign: 'center', padding: '11px', borderRadius: '16px', background: '#F1FAE6' })}>
                <div style={sx({ font: '900 21px Nunito', color: '#58CC02' })}>{m.doneCount}</div>
                <div style={sx({ font: '800 10px Nunito', color: '#7B8B96', letterSpacing: '.6px', textTransform: 'uppercase' })}>Done</div>
              </div>
              <div style={sx({ flex: '1', textAlign: 'center', padding: '11px', borderRadius: '16px', background: '#E9F7FD' })}>
                <div style={sx({ font: '900 21px Nunito', color: '#009ADA' })}>{m.xpEarned}</div>
                <div style={sx({ font: '800 10px Nunito', color: '#7B8B96', letterSpacing: '.6px', textTransform: 'uppercase' })}>XP</div>
              </div>
              <div style={sx({ flex: '1', textAlign: 'center', padding: '11px', borderRadius: '16px', background: '#F4F8FB' })}>
                <div style={sx({ font: '900 21px Nunito', color: '#7B8B96' })}>{m.lockCount}</div>
                <div style={sx({ font: '800 10px Nunito', color: '#7B8B96', letterSpacing: '.6px', textTransform: 'uppercase' })}>Locked</div>
              </div>
            </div>
          </div>
          <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE', marginBottom: '12px' })}>Mastery in this unit</div>
            <div style={sx({ display: 'flex', flexDirection: 'column', gap: '11px' })}>
              {m.unitSkills.map((s, sI) => (
                <div key={sI}>
                  <div style={sx({ display: 'flex', justifyContent: 'space-between', font: '800 13px Nunito', marginBottom: '5px' })}>
                    <span>{s.name}</span>
                    <span style={sx({ color: s.color })}>{s.pct}%</span>
                  </div>
                  <div style={sx({ height: '11px', borderRadius: '8px', background: '#EEF3F7' })}>
                    <div style={sx({ height: '100%', width: `${s.pct}%`, borderRadius: '8px', background: s.color })} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE', marginBottom: '12px' })}>Friends on this path</div>
            <div style={sx({ display: 'flex', flexDirection: 'column', gap: '10px' })}>
              {m.friends.map((f, fI) => (
                <div key={fI} style={sx({ display: 'flex', alignItems: 'center', gap: '11px' })}>
                  <div style={sx({ width: '34px', height: '34px', flex: 'none', borderRadius: '50%', background: f.av, display: 'grid', placeItems: 'center', font: '900 12px Nunito', color: '#fff' })}>{f.ini}</div>
                  <div style={sx({ flex: '1', minWidth: '0' })}>
                    <div style={sx({ font: '800 14px Nunito' })}>{f.name}</div>
                    <div style={sx({ font: '700 12px Nunito', color: '#93A3AE' })}>{f.at}</div>
                  </div>
                  <div style={sx({ font: '900 12px Nunito', color: f.color })}>{f.delta}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={sx({ background: '#0E2430', borderBottom: '6px solid #071620', borderRadius: '22px', padding: '20px', color: '#fff' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', opacity: '.7', marginBottom: '8px' })}>Coach note</div>
            <div style={sx({ font: '700 15px/1.55 Nunito', opacity: '.92' })}>Vocabulary in context is holding your R&W score back — 27% mastery. Two 10-question drills this week would move you about +30 points.</div>
            <button className="ac4" onClick={m.goMock} style={sx({ width: '100%', marginTop: '14px', padding: '13px', borderRadius: '15px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #007AB0', background: '#009ADA', color: '#fff', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Drill it now</button>
          </div>
        </div>
      </div>
      <div style={sx({ position: 'sticky', bottom: '0', zIndex: '14', padding: '14px 30px', background: 'rgba(255,255,255,.95)', borderTop: '2px solid #E1EBF1', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' })}>
        <div style={sx({ display: 'flex', alignItems: 'center', gap: '13px', minWidth: '220px' })}>
          <div style={sx({ width: '44px', height: '44px', flex: 'none', borderRadius: '14px', background: '#E9F7FD', display: 'grid', placeItems: 'center', font: '900 17px Nunito', color: '#009ADA' })}>▶</div>
          <div>
            <div style={sx({ font: '800 11px Nunito', letterSpacing: '1px', textTransform: 'uppercase', color: '#93A3AE' })}>Up next</div>
            <div style={sx({ font: '800 16px Nunito' })}>{m.nextTitle}</div>
          </div>
        </div>
        <div style={sx({ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' })}>
          <div style={sx({ font: '800 13px Nunito', color: '#7B8B96' })}>{m.goalXp}/60 XP today</div>
          <button className="ac4" onClick={m.startNext} style={sx({ padding: '14px 26px', borderRadius: '16px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #46A302', background: '#58CC02', color: '#fff', font: '900 14px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Continue</button>
        </div>
      </div>
      {m.lessonOpen && (
        <div style={sx({ position: 'fixed', inset: '0', zIndex: '60', background: 'rgba(14,36,48,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', overflow: 'auto' })}>
          <div style={sx({ width: '860px', maxWidth: '100%', background: '#fff', borderBottom: '7px solid #DDE6EC', borderRadius: '26px', overflow: 'hidden', animation: 'slidein .2s ease-out' })}>
            <div style={sx({ padding: '18px 22px', background: m.lesson.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap' })}>
              <div style={sx({ minWidth: '200px' })}>
                <div style={sx({ font: '800 11px Nunito', letterSpacing: '1.1px', textTransform: 'uppercase', opacity: '.85' })}>{m.lesson.unit}</div>
                <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '25px', lineHeight: '1.15' })}>{m.lesson.title}</div>
              </div>
              <button className="ho13" onClick={m.closeLesson} style={sx({ width: '40px', height: '40px', flex: 'none', borderRadius: '13px', border: '2px solid rgba(255,255,255,.45)', background: 'rgba(0,0,0,.12)', color: '#fff', font: '900 16px Nunito', cursor: 'pointer' })}>✕</button>
            </div>
            <div style={sx({ padding: '22px', display: 'flex', flexWrap: 'wrap', gap: '22px' })}>
              <div style={sx({ flex: '1 1 380px', minWidth: '0' })}>
                <div style={sx({ position: 'relative', aspectRatio: '16/9', borderRadius: '20px', background: '#0E2430', display: 'grid', placeItems: 'center', overflow: 'hidden' })}>
                  <div style={sx({ position: 'absolute', inset: '0', background: 'repeating-linear-gradient(135deg,rgba(255,255,255,.05) 0 14px,transparent 14px 28px)' })} />
                  <div style={sx({ position: 'relative', textAlign: 'center', color: '#fff' })}>
                    <div className="ho14" style={sx({ width: '74px', height: '74px', margin: '0 auto 10px', borderRadius: '50%', background: m.lesson.color, display: 'grid', placeItems: 'center', boxShadow: '0 8px 20px rgba(0,0,0,.35)', cursor: 'pointer' })}>
                      <svg width="30" height="30" viewBox="0 0 24 24" fill={cf('#fff')}>
                        <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                      </svg>
                    </div>
                    <div style={sx({ font: '800 12px Nunito', letterSpacing: '1px', textTransform: 'uppercase', opacity: '.7' })}>Video placeholder · 6 min</div>
                  </div>
                  <div style={sx({ position: 'absolute', left: '16px', right: '16px', bottom: '14px' })}>
                    <div style={sx({ height: '7px', borderRadius: '5px', background: 'rgba(255,255,255,.25)' })}>
                      <div style={sx({ height: '100%', width: '18%', borderRadius: '5px', background: m.lesson.color })} />
                    </div>
                  </div>
                </div>
                <div style={sx({ display: 'flex', gap: '8px', marginTop: '14px', flexWrap: 'wrap' })}>
                  <div style={sx({ padding: '7px 13px', borderRadius: '11px', background: '#F4F8FB', border: '2px solid #E6EEF3', font: '900 11px Nunito', letterSpacing: '.7px', textTransform: 'uppercase', color: '#7B8B96' })}>{m.lesson.meta}</div>
                  <div style={sx({ padding: '7px 13px', borderRadius: '11px', background: '#E9F7FD', border: '2px solid #C2E7F7', font: '900 11px Nunito', letterSpacing: '.7px', textTransform: 'uppercase', color: '#007AB0' })}>Video + notes</div>
                  <div style={sx({ padding: '7px 13px', borderRadius: '11px', background: '#F1FAE6', border: '2px solid #CFEBA8', font: '900 11px Nunito', letterSpacing: '.7px', textTransform: 'uppercase', color: '#3F8C06' })}>Transcript</div>
                </div>
              </div>
              <div style={sx({ flex: '1 1 300px', minWidth: '0', display: 'flex', flexDirection: 'column' })}>
                <div style={sx({ font: '800 12px Nunito', letterSpacing: '.9px', textTransform: 'uppercase', color: '#93A3AE', marginBottom: '8px' })}>Description</div>
                <div style={sx({ font: '700 15px/1.6 Nunito', color: '#42525C', marginBottom: '16px' })}>{m.lesson.desc}</div>
                <div style={sx({ font: '800 12px Nunito', letterSpacing: '.9px', textTransform: 'uppercase', color: '#93A3AE', marginBottom: '9px' })}>What you'll practice</div>
                <div style={sx({ display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: '18px' })}>
                  {m.lesson.bullets.map((b, bI) => (
                    <div key={bI} style={sx({ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '11px 13px', borderRadius: '15px', background: '#F8FBFD', border: '2px solid #EEF3F7' })}>
                      <span style={sx({ width: '22px', height: '22px', flex: 'none', borderRadius: '50%', background: '#E9F7FD', display: 'grid', placeItems: 'center', font: '900 11px Nunito', color: '#009ADA' })}>✓</span>
                      <span style={sx({ font: '700 14px/1.45 Nunito' })}>{b}</span>
                    </div>
                  ))}
                </div>
                <div style={sx({ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '9px' })}>
                  <button className="ac4" onClick={m.doExercises} style={sx({ width: '100%', padding: '15px', borderRadius: '16px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #46A302', background: '#58CC02', color: '#fff', font: '900 14px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '9px' })}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>Exercises</button>
                  <button className="ho1" onClick={m.completeLesson} style={sx({ width: '100%', padding: '13px', borderRadius: '16px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', background: '#fff', color: '#54646F', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Mark lesson complete · +20 XP</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
