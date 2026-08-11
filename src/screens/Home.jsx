import { useTheme } from '../theme.jsx'

export default function Home({ m }) {
  const { sx, cf } = useTheme()

  return (
    <div style={sx({ padding: '26px 30px 60px', maxWidth: '1560px' })}>
      <div style={sx({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap', marginBottom: '24px' })}>
        <div>
          <div style={sx({ font: '800 13px Nunito', textTransform: 'uppercase', letterSpacing: '1.1px', color: '#93A3AE' })}>Wednesday · week 7 of your plan</div>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '38px', lineHeight: '1.1', marginTop: '2px' })}>Hi, Sukhrob!</div>
        </div>
        <div style={sx({ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' })}>
          <div style={sx({ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 17px', borderRadius: '999px', background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', font: '900 18px Nunito', color: '#009ADA' })}><svg width="21" height="21" viewBox="0 0 24 24">
            <path d="M12 2.6 20 7v10l-8 4.4L4 17V7z" fill={cf('#009ADA')} opacity=".2" />
            <path d="M12 2.6 20 7l-8 4.4L4 7z" fill={cf('#009ADA')} />
            <path d="M4 7v10l8 4.4V11.4z" fill={cf('#007AB0')} opacity=".6" />
          </svg>1240</div>
          <div style={sx({ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 17px', borderRadius: '999px', background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', font: '900 18px Nunito', color: '#FF7A00' })}><svg width="21" height="21" viewBox="0 0 24 24">
            <path d="M12 2c3 4 6 5.6 6 9.6A6 6 0 0 1 6 11.6C6 8.4 8.4 6.6 12 2Z" fill={cf('#FF9600')} />
            <path d="M12 9.6c1.6 2 2.8 2.7 2.8 4.6a2.8 2.8 0 0 1-5.6 0c0-1.7 1.2-2.7 2.8-4.6Z" fill={cf('#FFC800')} />
          </svg>24</div>
          <div style={sx({ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 16px 9px 10px', borderRadius: '999px', background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px' })}>
            <div style={sx({ width: '34px', height: '34px', borderRadius: '50%', background: '#009ADA', display: 'grid', placeItems: 'center', font: '900 13px Nunito', color: '#fff' })}>SJ</div>
            <div style={sx({ lineHeight: '1.1' })}>
              <div style={sx({ font: '800 14px Nunito' })}>Sukhrob J.</div>
              <div style={sx({ font: '700 11px Nunito', color: '#93A3AE', letterSpacing: '.4px', textTransform: 'uppercase' })}>Sapphire · rank 3</div>
            </div>
          </div>
        </div>
      </div>
      <div style={sx({ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '18px' })}>
        <button className="ho6" onClick={m.goRes} style={sx({ display: 'flex', alignItems: 'center', gap: '9px', padding: '12px 17px', borderRadius: '15px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', background: '#fff', color: '#1B2B36', font: '900 12px Nunito', letterSpacing: '.7px', textTransform: 'uppercase', cursor: 'pointer' })}><span style={sx({ width: '22px', height: '22px', borderRadius: '7px', background: '#E9F7FD', display: 'grid', placeItems: 'center', font: '900 11px Nunito', color: '#007AB0' })}>06</span>Mock 06 report</button>
        <button className="ho7" onClick={m.goRun} style={sx({ display: 'flex', alignItems: 'center', gap: '9px', padding: '12px 17px', borderRadius: '15px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', background: '#fff', color: '#1B2B36', font: '900 12px Nunito', letterSpacing: '.7px', textTransform: 'uppercase', cursor: 'pointer' })}><span style={sx({ width: '22px', height: '22px', borderRadius: '7px', background: '#F1FAE6', display: 'grid', placeItems: 'center', font: '900 11px Nunito', color: '#3F8C06' })}>▶</span>Resume lesson</button>
        <button className="ho8" onClick={m.goCards} style={sx({ display: 'flex', alignItems: 'center', gap: '9px', padding: '12px 17px', borderRadius: '15px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', background: '#fff', color: '#1B2B36', font: '900 12px Nunito', letterSpacing: '.7px', textTransform: 'uppercase', cursor: 'pointer' })}><span style={sx({ width: '22px', height: '22px', borderRadius: '7px', background: '#FFF7E3', display: 'grid', placeItems: 'center', font: '900 11px Nunito', color: '#B07A16' })}>10</span>Flashcards</button>
        <button className="ho8" onClick={m.goAchv} style={sx({ display: 'flex', alignItems: 'center', gap: '9px', padding: '12px 17px', borderRadius: '15px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', background: '#fff', color: '#1B2B36', font: '900 12px Nunito', letterSpacing: '.7px', textTransform: 'uppercase', cursor: 'pointer' })}><span style={sx({ width: '22px', height: '22px', borderRadius: '7px', background: '#FFF7E3', display: 'grid', placeItems: 'center', font: '900 11px Nunito', color: '#B07A16' })}>★</span>Achievements</button>
        <button className="ho6" onClick={m.goOnb} style={sx({ display: 'flex', alignItems: 'center', gap: '9px', padding: '12px 17px', borderRadius: '15px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', background: '#fff', color: '#54646F', font: '900 12px Nunito', letterSpacing: '.7px', textTransform: 'uppercase', cursor: 'pointer' })}><span style={sx({ width: '22px', height: '22px', borderRadius: '7px', background: '#F1F6FA', display: 'grid', placeItems: 'center', font: '900 11px Nunito', color: '#93A3AE' })}>1</span>Onboarding</button>
        <button className="ho7" onClick={m.celeUnit} style={sx({ display: 'flex', alignItems: 'center', gap: '9px', padding: '12px 17px', borderRadius: '15px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', background: '#fff', color: '#54646F', font: '900 12px Nunito', letterSpacing: '.7px', textTransform: 'uppercase', cursor: 'pointer' })}><span style={sx({ width: '22px', height: '22px', borderRadius: '7px', background: '#F1FAE6', display: 'grid', placeItems: 'center', font: '900 11px Nunito', color: '#3F8C06' })}>🏆</span>Reward moment</button>
      </div>
      <div style={sx({ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(330px,1fr))', gap: '18px', alignItems: 'start' })}>
        <div style={sx({ display: 'flex', flexDirection: 'column', gap: '18px' })}>
          <div style={sx({ background: '#0E2430', borderBottom: '6px solid #071620', borderRadius: '24px', padding: '24px', color: '#fff', position: 'relative', overflow: 'hidden' })}>
            <div style={sx({ position: 'absolute', inset: '0', background: 'radial-gradient(120px 120px at 88% 12%,rgba(0,154,218,.45),transparent 70%)' })} />
            <div style={sx({ position: 'relative', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' })}>
              <div style={sx({ width: '118px', height: '118px', flex: 'none', borderRadius: '50%', background: `conic-gradient(#009ADA ${m.scoreDeg}deg,rgba(255,255,255,.12) 0)`, display: 'grid', placeItems: 'center' })}>
                <div style={sx({ width: '92px', height: '92px', borderRadius: '50%', background: '#0E2430', display: 'grid', placeItems: 'center', textAlign: 'center' })}>
                  <div>
                    <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '31px', lineHeight: '1' })}>1080</div>
                    <div style={sx({ font: '800 9px Nunito', letterSpacing: '1.2px', opacity: '.6' })}>CURRENT</div>
                  </div>
                </div>
              </div>
              <div style={sx({ flex: '1', minWidth: '170px' })}>
                <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '27px', lineHeight: '1.1' })}>Target 1550</div>
                <div style={sx({ font: '700 14px Nunito', opacity: '.72', margin: '4px 0 12px' })}>470 points to go · exam on 3 Oct</div>
                <div style={sx({ display: 'flex', gap: '8px', flexWrap: 'wrap' })}>
                  <div style={sx({ padding: '7px 13px', borderRadius: '11px', background: 'rgba(255,255,255,.12)', font: '900 13px Nunito' })}>R&W 510</div>
                  <div style={sx({ padding: '7px 13px', borderRadius: '11px', background: 'rgba(255,255,255,.12)', font: '900 13px Nunito' })}>Math 570</div>
                  <div style={sx({ padding: '7px 13px', borderRadius: '11px', background: 'rgba(88,204,2,.22)', color: '#9BE85B', font: '900 13px Nunito' })}>+130 / mo</div>
                </div>
                <div style={sx({ display: 'flex', alignItems: 'center', gap: '11px', marginTop: '14px', padding: '11px 13px', borderRadius: '14px', background: 'rgba(255,255,255,.1)', border: '2px solid rgba(255,255,255,.16)' })}>
                  <div style={sx({ width: '36px', height: '36px', flex: 'none', borderRadius: '11px', background: '#A51C30', display: 'grid', placeItems: 'center', font: '900 15px Nunito', color: '#fff' })}>H</div>
                  <div style={sx({ minWidth: '0' })}>
                    <div style={sx({ font: '800 10px Nunito', letterSpacing: '1.1px', textTransform: 'uppercase', opacity: '.65' })}>Target university</div>
                    <div style={sx({ font: '800 16px Nunito', lineHeight: '1.2' })}>Harvard University</div>
                  </div>
                  <div style={sx({ marginLeft: 'auto', font: '800 12px Nunito', opacity: '.7', textAlign: 'right' })}>Median SAT<br /><span style={sx({ font: '900 14px Nunito', opacity: '1' })}>1520</span></div>
                </div>
              </div>
            </div>
          </div>
          <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '24px', padding: '22px' })}>
            <div style={sx({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' })}>
              <div style={sx({ font: '800 13px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE' })}>Score trend · last 6 mocks</div>
              <div style={sx({ font: '900 13px Nunito', color: '#58CC02' })}>▲ 130</div>
            </div>
            <svg viewBox="0 0 320 130" style={sx({ width: '100%', height: 'auto', overflow: 'visible' })}>
              <line x1="0" y1="20" x2="320" y2="20" stroke={cf('#EEF3F7')} strokeWidth="2" />
              <line x1="0" y1="65" x2="320" y2="65" stroke={cf('#EEF3F7')} strokeWidth="2" />
              <line x1="0" y1="110" x2="320" y2="110" stroke={cf('#EEF3F7')} strokeWidth="2" />
              <polyline points={m.trendArea} fill="rgba(0,154,218,.12)" stroke="none" />
              <polyline points={m.trendLine} fill="none" stroke={cf('#009ADA')} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
              {m.trendPts.map((p, pI) => (
                <circle key={pI} cx={p.x} cy={p.y} r="6" fill={cf('#fff')} stroke={cf('#009ADA')} strokeWidth="4" />
              ))}
            </svg>
            <div style={sx({ display: 'flex', marginTop: '6px' })}>
              {m.trendPts.map((p, pI) => (
                <div key={pI} style={sx({ flex: '1', textAlign: 'center', font: '800 11px Nunito', color: '#93A3AE' })}>{p.label}</div>
              ))}
            </div>
          </div>
          <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '24px', padding: '22px' })}>
            <div style={sx({ font: '800 13px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE', marginBottom: '14px' })}>Today's quests</div>
            <div style={sx({ display: 'flex', flexDirection: 'column', gap: '11px' })}>
              {m.quests.map((q, qI) => (
                <div key={qI} style={sx({ display: 'flex', alignItems: 'center', gap: '13px', padding: '13px', borderRadius: '18px', background: q.tint, border: `2px solid ${q.bd}` })}>
                  <div style={sx({ width: '42px', height: '42px', flex: 'none', borderRadius: '14px', background: q.color, display: 'grid', placeItems: 'center', font: '900 16px Nunito', color: '#fff' })}>{q.icon}</div>
                  <div style={sx({ flex: '1', minWidth: '0' })}>
                    <div style={sx({ font: '800 15px Nunito', marginBottom: '6px' })}>{q.title}</div>
                    <div style={sx({ height: '11px', borderRadius: '8px', background: '#fff' })}>
                      <div style={sx({ height: '100%', width: `${q.pct}%`, borderRadius: '8px', background: q.color, transition: 'width .4s' })} />
                    </div>
                  </div>
                  <button className="ac4" onClick={q.go} style={sx({ flex: 'none', padding: '10px 17px', borderRadius: '14px', borderWidth: '0', borderStyle: 'none', borderBottom: `4px solid ${q.dark}`, background: q.color, color: '#fff', font: '900 12px Nunito', letterSpacing: '.6px', textTransform: 'uppercase', cursor: 'pointer' })}>{q.cta}</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={sx({ display: 'flex', flexDirection: 'column', gap: '18px' })}>
          <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '24px', padding: '22px' })}>
            <div style={sx({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' })}>
              <div style={sx({ font: '800 13px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE' })}>Progress radar</div>
              <div style={sx({ display: 'flex', padding: '4px', background: '#F1F5F8', borderRadius: '999px' })}>
                <button onClick={m.showRw} style={sx({ padding: '7px 15px', borderRadius: '999px', border: 'none', cursor: 'pointer', font: '900 12px Nunito', letterSpacing: '.6px', textTransform: 'uppercase', background: m.tabRw.bg, color: m.tabRw.fg, boxShadow: m.tabRw.sh })}>R&W</button>
                <button onClick={m.showMath} style={sx({ padding: '7px 15px', borderRadius: '999px', border: 'none', cursor: 'pointer', font: '900 12px Nunito', letterSpacing: '.6px', textTransform: 'uppercase', background: m.tabMath.bg, color: m.tabMath.fg, boxShadow: m.tabMath.sh })}>Math</button>
              </div>
            </div>
            <div style={sx({ display: 'grid', placeItems: 'center' })}>
              <div style={sx({ position: 'relative', width: '100%', maxWidth: '330px', aspectRatio: '330/292' })}>
                <svg viewBox="0 0 330 292" style={sx({ width: '100%', height: '100%', display: 'block' })}>
                  <g transform="translate(46.2,41.4) scale(0.72)">
                    <polygon points="165,30 283,116 238,255 92,255 47,116" fill={cf('#F4F8FB')} />
                    <polygon points="165,66 248,127 216,225 114,225 82,127" fill="none" stroke={cf('#E4EBF0')} strokeWidth="2.8" />
                    <polygon points="165,102 213,138 194,196 136,196 117,138" fill="none" stroke={cf('#E4EBF0')} strokeWidth="2.8" />
                    <polygon points={m.radarPts} fill={cf(m.radarFill)} stroke={cf(m.radarStroke)} strokeWidth="5" strokeLinejoin="round" style={sx({ transition: 'all .45s' })} />
                    {m.radarAxes.map((a, aI) => (
                      <circle key={aI} cx={a.cx} cy={a.cy} r="7" fill={cf(a.color)} />
                    ))}
                  </g>
                </svg>
                {m.radarAxes.map((a, aI) => (
                  <div key={aI} style={sx({ position: 'absolute', left: a.lxPct, top: a.lyPct, transform: a.tf, width: a.w, textAlign: a.align, pointerEvents: 'none' })}>
                    <div style={sx({ font: '800 12.5px/1.2 Nunito', color: '#54646F' })}>{a.name}</div>
                    <div style={sx({ font: '900 13px Nunito', color: a.color, marginTop: '1px' })}>{a.pctLabel}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={sx({ height: '2px', background: '#EEF3F7', margin: '6px 0 16px' })} />
            <div style={sx({ display: 'flex', flexDirection: 'column', gap: '13px' })}>
              {m.radarBars.map((s, sI) => (
                <div key={sI}>
                  <div style={sx({ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', font: '800 15px Nunito', marginBottom: '6px' })}>
                    <span>{s.name}</span>
                    <span style={sx({ font: '900 14px Nunito', color: s.pctColor })}>{s.pct}%</span>
                  </div>
                  <div style={sx({ height: '14px', borderRadius: '10px', background: '#EFF4F7' })}>
                    <div style={sx({ height: '100%', width: `${s.pct}%`, borderRadius: '10px', background: s.color, transition: 'width .45s' })} />
                  </div>
                </div>
              ))}
            </div>
            <button className="ho1" onClick={m.goPath} style={sx({ width: '100%', marginTop: '16px', padding: '12px', borderRadius: '14px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', background: '#fff', color: '#54646F', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Practice weakest skill</button>
          </div>
          <div style={sx({ background: '#009ADA', borderBottom: '6px solid #007AB0', borderRadius: '24px', padding: '22px', color: '#fff' })}>
            <div style={sx({ font: '800 13px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', opacity: '.78', marginBottom: '12px' })}>Exam countdown</div>
            <div style={sx({ display: 'flex', gap: '9px' })}>
              {m.countdown.map((c, cI) => (
                <div key={cI} style={sx({ flex: '1', background: 'rgba(255,255,255,.16)', borderRadius: '16px', padding: '12px 4px', textAlign: 'center' })}>
                  <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '32px', lineHeight: '1' })}>{c.v}</div>
                  <div style={sx({ font: '800 10px Nunito', letterSpacing: '1px', opacity: '.8', marginTop: '2px' })}>{c.l}</div>
                </div>
              ))}
            </div>
            <button className="ac4" onClick={m.goMock} style={sx({ width: '100%', marginTop: '15px', padding: '14px', borderRadius: '16px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #DDE6EC', background: '#fff', color: '#007AB0', font: '900 14px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Open mock exams</button>
          </div>
        </div>
        {m.showRightRail && (
          <div style={sx({ display: 'flex', flexDirection: 'column', gap: '18px' })}>
            <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '24px', padding: '22px', textAlign: 'center' })}>
              <div style={sx({ animation: 'bob 3s ease-in-out infinite', display: 'inline-block' })}>
                <svg width="70" height="70" viewBox="0 0 24 24">
                  <path d="M12 2c3 4 6 5.6 6 9.6A6 6 0 0 1 6 11.6C6 8.4 8.4 6.6 12 2Z" fill={cf('#FF9600')} />
                  <path d="M12 9.6c1.6 2 2.8 2.7 2.8 4.6a2.8 2.8 0 0 1-5.6 0c0-1.7 1.2-2.7 2.8-4.6Z" fill={cf('#FFC800')} />
                </svg>
              </div>
              <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '44px', lineHeight: '1', color: '#FF9600' })}>24</div>
              <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '1px', color: '#93A3AE', margin: '2px 0 16px' })}>day streak · best 31</div>
              <div style={sx({ display: 'flex', justifyContent: 'space-between', gap: '4px' })}>
                {m.week.map((d, dI) => (
                  <div key={dI} style={sx({ flex: '1', textAlign: 'center' })}>
                    <div style={sx({ height: '34px', borderRadius: '12px', background: d.bg, border: `2px solid ${d.bd}`, display: 'grid', placeItems: 'center', font: '900 12px Nunito', color: d.fg })}>{d.mark}</div>
                    <div style={sx({ font: '800 10px Nunito', color: '#93A3AE', marginTop: '5px', letterSpacing: '.5px' })}>{d.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '24px', padding: '22px', textAlign: 'center' })}>
              <div style={sx({ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' })}>
                <svg width="42" height="42" viewBox="0 0 24 24">
                  <path d="M12 2.6 20 7v10l-8 4.4L4 17V7z" fill={cf('#009ADA')} opacity=".2" />
                  <path d="M12 2.6 20 7l-8 4.4L4 7z" fill={cf('#009ADA')} />
                  <path d="M4 7v10l8 4.4V11.4z" fill={cf('#007AB0')} opacity=".6" />
                </svg>
                <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '44px', lineHeight: '1', color: '#009ADA' })}>1240</div>
              </div>
              <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '1px', color: '#93A3AE', margin: '4px 0 16px' })}>XP (experience points)</div>
              <div style={sx({ textAlign: 'left', font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.8px', color: '#93A3AE', marginBottom: '9px' })}>Your ranking</div>
              <div style={sx({ display: 'flex', alignItems: 'center', gap: '11px', padding: '9px 10px', borderRadius: '16px', background: '#E9F7FD', border: '2px solid #C2E7F7', marginBottom: '13px' })}>
                <div style={sx({ padding: '5px 11px', borderRadius: '10px', background: '#fff', font: '900 13px Nunito', color: '#007AB0' })}>#3</div>
                <div style={sx({ width: '34px', height: '34px', flex: 'none', borderRadius: '50%', background: '#009ADA', display: 'grid', placeItems: 'center', font: '900 12px Nunito', color: '#fff' })}>SJ</div>
                <div style={sx({ flex: '1', minWidth: '0', textAlign: 'left' })}>
                  <div style={sx({ font: '800 14px Nunito' })}>You</div>
                  <div style={sx({ font: '700 11px Nunito', color: '#5C7080' })}>Tashkent · Sapphire</div>
                </div>
                <div style={sx({ font: '900 13px Nunito', color: '#009ADA' })}>1240</div>
              </div>
              <button className="ho1" onClick={m.goLb} style={sx({ width: '100%', padding: '13px', borderRadius: '15px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', background: '#fff', color: '#1B2B36', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>See full leaderboard</button>
            </div>
            <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '24px', padding: '22px' })}>
              <div style={sx({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' })}>
                <div style={sx({ font: '800 13px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE' })}>Sapphire league</div>
                <div style={sx({ font: '800 12px Nunito', color: '#009ADA' })}>4 days left</div>
              </div>
              <div style={sx({ display: 'flex', flexDirection: 'column', gap: '7px' })}>
                {m.league.map((r, rI) => (
                  <div key={rI} style={sx({ display: 'flex', alignItems: 'center', gap: '11px', padding: '10px 11px', borderRadius: '16px', background: r.bg, border: `2px solid ${r.bd}` })}>
                    <div style={sx({ width: '22px', font: '900 15px Nunito', color: r.rankColor, textAlign: 'center' })}>{r.rank}</div>
                    <div style={sx({ width: '34px', height: '34px', flex: 'none', borderRadius: '50%', background: r.av, display: 'grid', placeItems: 'center', font: '900 12px Nunito', color: '#fff' })}>{r.ini}</div>
                    <div style={sx({ flex: '1', minWidth: '0' })}>
                      <div style={sx({ font: '800 14px Nunito', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' })}>{r.name}</div>
                      <div style={sx({ font: '700 11px Nunito', color: '#93A3AE' })}>{r.country}</div>
                    </div>
                    <div style={sx({ font: '900 13px Nunito', color: '#009ADA' })}>{r.xp}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '24px', padding: '22px' })}>
              <div style={sx({ font: '800 13px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE', marginBottom: '14px' })}>Badge shelf</div>
              <div style={sx({ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px' })}>
                {m.badges.map((b, bI) => (
                  <div className="ho9" key={bI} title={b.title} style={sx({ aspectRatio: '1', borderRadius: '18px', background: b.bg, border: `2px solid ${b.bd}`, display: 'grid', placeItems: 'center', font: '900 18px Nunito', color: b.fg, cursor: 'pointer' })}>{b.glyph}</div>
                ))}
              </div>
              <div style={sx({ font: '700 13px Nunito', color: '#93A3AE', marginTop: '12px' })}>5 of 8 unlocked · next at 1500 XP</div>
            </div>
            <div style={sx({ background: '#FFF7E3', borderWidth: '2px', borderStyle: 'solid', borderColor: '#FFE3A3', borderBottomWidth: '5px', borderRadius: '24px', padding: '20px' })}>
              <div style={sx({ font: '800 13px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#B07A16', marginBottom: '8px' })}>Word of the day</div>
              <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '24px', lineHeight: '1.1' })}>obfuscate</div>
              <div style={sx({ font: '700 14px Nunito', color: '#8C7A55', margin: '4px 0 14px' })}>to make unclear on purpose · appeared in 3 past tests</div>
              <button className="ac4" style={sx({ width: '100%', padding: '12px', borderRadius: '14px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #D9A400', background: '#FFC800', color: '#5A4300', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Add to my deck</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
