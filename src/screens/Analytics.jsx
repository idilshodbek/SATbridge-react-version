import { useTheme } from '../theme.jsx'

export default function Analytics({ m }) {
  const { sx, cf } = useTheme()

  return (
    <div style={sx({ padding: '26px 30px 60px', maxWidth: '1400px' })}>
      <div style={sx({ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '18px', flexWrap: 'wrap', marginBottom: '20px' })}>
        <div>
          <div style={sx({ font: '800 13px Nunito', letterSpacing: '1.1px', textTransform: 'uppercase', color: '#93A3AE' })}>Analytics</div>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '36px', lineHeight: '1.1' })}>Where the next 370 points are</div>
          <div style={sx({ font: '700 15px Nunito', color: '#7B8B96', marginTop: '2px' })}>6 mocks · 1,842 questions answered · {m.anaHoursTotal} studied in 7 weeks</div>
        </div>
        <div style={sx({ display: 'flex', gap: '6px', padding: '5px', background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', borderRadius: '18px', overflow: 'auto' })}>
          {m.anaTabs.map((t, tI) => (
            <button key={tI} onClick={t.tap} style={sx({ padding: '11px 17px', borderRadius: '13px', border: 'none', cursor: 'pointer', background: t.bg, color: t.fg, boxShadow: t.sh, font: '900 12px Nunito', letterSpacing: '.7px', textTransform: 'uppercase', transition: 'background .18s' })}>{t.label}</button>
          ))}
        </div>
      </div>
      <div style={sx({ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', gap: '14px', marginBottom: '22px' })}>
        <div style={sx({ background: '#009ADA', borderBottom: '6px solid #007AB0', borderRadius: '22px', padding: '18px', color: '#fff' })}>
          <div style={sx({ font: '800 11px Nunito', letterSpacing: '1px', textTransform: 'uppercase', opacity: '.8' })}>Latest mock</div>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '32px', lineHeight: '1.1' })}>1180</div>
          <div style={sx({ font: '700 13px Nunito', opacity: '.85' })}>+60 vs mock 05</div>
        </div>
        <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '18px' })}>
          <div style={sx({ font: '800 11px Nunito', letterSpacing: '1px', textTransform: 'uppercase', color: '#93A3AE' })}>Accuracy</div>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '32px', lineHeight: '1.1', color: '#58CC02' })}>72%</div>
          <div style={sx({ font: '700 13px Nunito', color: '#7B8B96' })}>up 9 pts this month</div>
        </div>
        <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '18px' })}>
          <div style={sx({ font: '800 11px Nunito', letterSpacing: '1px', textTransform: 'uppercase', color: '#93A3AE' })}>Avg per question</div>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '32px', lineHeight: '1.1' })}>1:21</div>
          <div style={sx({ font: '700 13px Nunito', color: '#7B8B96' })}>target 1:15</div>
        </div>
        <div style={sx({ background: '#FFF0F0', borderWidth: '2px', borderStyle: 'solid', borderColor: '#FFCFCF', borderBottomWidth: '5px', borderRadius: '22px', padding: '18px' })}>
          <div style={sx({ font: '800 11px Nunito', letterSpacing: '1px', textTransform: 'uppercase', color: '#D93A3A' })}>Careless misses</div>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '32px', lineHeight: '1.1', color: '#D93A3A' })}>19</div>
          <div style={sx({ font: '700 13px Nunito', color: '#A85A5A' })}>knew it, rushed it</div>
        </div>
        <div style={sx({ background: '#FFF7E3', borderWidth: '2px', borderStyle: 'solid', borderColor: '#FFE3A3', borderBottomWidth: '5px', borderRadius: '22px', padding: '18px' })}>
          <div style={sx({ font: '800 11px Nunito', letterSpacing: '1px', textTransform: 'uppercase', color: '#B07A16' })}>Projected</div>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '32px', lineHeight: '1.1' })}>1420</div>
          <div style={sx({ font: '700 13px Nunito', color: '#8C7A55' })}>at current pace by 3 Oct</div>
        </div>
      </div>
      <div style={sx({ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' })}>
        <div style={sx({ flex: '1 1 560px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '20px' })}>
          <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '24px', padding: '22px' })}>
            <div style={sx({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '6px' })}>
              <div style={sx({ font: '800 13px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE' })}>Score trend</div>
              <div style={sx({ font: '900 12px Nunito', color: '#009ADA' })}>Feb → Jul · +230</div>
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
            <div style={sx({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '4px' })}>
              <div style={sx({ font: '800 13px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE' })}>Skill heatmap</div>
              <div style={sx({ display: 'flex', alignItems: 'center', gap: '7px', font: '800 10px Nunito', letterSpacing: '.7px', textTransform: 'uppercase', color: '#93A3AE' })}>
            Weak
            <span style={sx({ width: '16px', height: '10px', borderRadius: '4px', background: '#FF4B4B' })} /><span style={sx({ width: '16px', height: '10px', borderRadius: '4px', background: '#FF9600' })} /><span style={sx({ width: '16px', height: '10px', borderRadius: '4px', background: '#FFC800' })} /><span style={sx({ width: '16px', height: '10px', borderRadius: '4px', background: '#9BE85B' })} /><span style={sx({ width: '16px', height: '10px', borderRadius: '4px', background: '#58CC02' })} />
            Strong
          </div>
            </div>
            <div style={sx({ font: '700 13px Nunito', color: '#93A3AE', marginBottom: '14px' })}>Accuracy and average time per question — tap a tile to drill it</div>
            <div style={sx({ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '11px' })}>
              {m.anaCells.map((c, cI) => (
                <div className="ho9" key={cI} onClick={c.go} style={sx({ padding: '14px', borderRadius: '18px', background: c.bg, color: c.fg, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '104px' })}>
                  <div style={sx({ font: '900 9.5px Nunito', letterSpacing: '.9px', textTransform: 'uppercase', opacity: '.75' })}>{c.domainLabel}</div>
                  <div style={sx({ font: '800 14px/1.3 Nunito' })}>{c.name}</div>
                  <div style={sx({ marginTop: 'auto', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '8px' })}>
                    <span style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '24px', lineHeight: '1' })}>{c.acc}%</span>
                    <span style={sx({ font: '800 12px Nunito', opacity: '.8' })}>{c.sec}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '24px', padding: '22px' })}>
            <div style={sx({ font: '800 13px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE', marginBottom: '16px' })}>Mock comparison</div>
            <div style={sx({ display: 'flex', flexDirection: 'column', gap: '11px' })}>
              {m.anaMocks.map((m, mI) => (
                <div key={mI} style={sx({ padding: '16px 17px', borderRadius: '20px', background: m.bg, borderWidth: '2px', borderStyle: 'solid', borderColor: m.bd, borderBottomWidth: '4px' })}>
                  <div style={sx({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '11px' })}>
                    <div style={sx({ display: 'flex', alignItems: 'baseline', gap: '11px' })}>
                      <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '26px', lineHeight: '1', color: m.totalFg })}>{m.total}</div>
                      <div>
                        <div style={sx({ font: '800 15px Nunito' })}>{m.name}</div>
                        <div style={sx({ font: '700 12px Nunito', color: '#93A3AE' })}>{m.when}</div>
                      </div>
                    </div>
                    <div style={sx({ font: '900 11px Nunito', letterSpacing: '.7px', textTransform: 'uppercase', color: m.deltaFg })}>{m.delta}</div>
                  </div>
                  <div style={sx({ display: 'flex', flexDirection: 'column', gap: '8px' })}>
                    <div style={sx({ display: 'flex', alignItems: 'center', gap: '11px' })}>
                      <span style={sx({ width: '38px', font: '900 10px Nunito', letterSpacing: '.6px', color: '#007AB0' })}>R&W</span>
                      <span style={sx({ flex: '1', height: '12px', borderRadius: '8px', background: '#EFF4F7' })}>
                        <span style={sx({ display: 'block', height: '100%', width: `${m.rwPct}%`, borderRadius: '8px', background: '#009ADA' })} />
                      </span>
                      <span style={sx({ width: '36px', textAlign: 'right', font: '900 13px Nunito', color: '#007AB0' })}>{m.rw}</span>
                    </div>
                    <div style={sx({ display: 'flex', alignItems: 'center', gap: '11px' })}>
                      <span style={sx({ width: '38px', font: '900 10px Nunito', letterSpacing: '.6px', color: '#3F8C06' })}>MATH</span>
                      <span style={sx({ flex: '1', height: '12px', borderRadius: '8px', background: '#EFF4F7' })}>
                        <span style={sx({ display: 'block', height: '100%', width: `${m.mathPct}%`, borderRadius: '8px', background: '#58CC02' })} />
                      </span>
                      <span style={sx({ width: '36px', textAlign: 'right', font: '900 13px Nunito', color: '#3F8C06' })}>{m.math}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={sx({ width: '330px', flex: '1 1 290px', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '16px' })}>
          <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE', marginBottom: '6px' })}>Study hours</div>
            <div style={sx({ font: '700 13px Nunito', color: '#93A3AE', marginBottom: '14px' })}>Last 7 weeks</div>
            <div style={sx({ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '130px' })}>
              {m.anaWeeks.map((w, wI) => (
                <div key={wI} style={sx({ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' })}>
                  <div style={sx({ font: '900 10px Nunito', color: w.fg })}>{w.h}</div>
                  <div style={sx({ width: '100%', height: `${w.pct}%`, borderRadius: '9px 9px 4px 4px', background: w.bg, transition: 'height .4s' })} />
                  <div style={sx({ font: '800 10px Nunito', color: '#93A3AE', letterSpacing: '.5px' })}>{w.w}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE', marginBottom: '14px' })}>Pacing vs target</div>
            <div style={sx({ display: 'flex', flexDirection: 'column', gap: '14px' })}>
              {m.anaPace.map((p, pI) => (
                <div key={pI}>
                  <div style={sx({ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '8px', font: '800 14px Nunito', marginBottom: '6px' })}>
                    <span>{p.name}</span>
                    <span style={sx({ font: '900 13px Nunito', color: p.color })}>{p.yours}</span>
                  </div>
                  <div style={sx({ height: '11px', borderRadius: '8px', background: '#EFF4F7', position: 'relative' })}>
                    <div style={sx({ height: '100%', width: `${p.pct}%`, borderRadius: '8px', background: p.color })} />
                  </div>
                  <div style={sx({ font: '700 11px Nunito', color: '#93A3AE', marginTop: '4px' })}>target {p.target} per question</div>
                </div>
              ))}
            </div>
          </div>
          <div style={sx({ background: '#0E2430', borderBottom: '6px solid #071620', borderRadius: '22px', padding: '20px', color: '#fff' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', opacity: '.7', marginBottom: '9px' })}>Biggest lever</div>
            <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '22px', lineHeight: '1.2', marginBottom: '5px' })}>Vocabulary in context</div>
            <div style={sx({ font: '700 14px/1.55 Nunito', opacity: '.75', marginBottom: '15px' })}>27% accuracy across 46 attempts. Fixing this alone is worth roughly +40 R&W points.</div>
            <button className="ac4" onClick={m.goVocab} style={sx({ width: '100%', padding: '13px', borderRadius: '15px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #46A302', background: '#58CC02', color: '#fff', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Fix it now</button>
          </div>
          <div style={sx({ background: '#E9F7FD', borderWidth: '2px', borderStyle: 'solid', borderColor: '#C2E7F7', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#007AB0', marginBottom: '9px' })}>Tutor read-out</div>
            <div style={sx({ font: '700 14px/1.55 Nunito', color: '#245A73', marginBottom: '13px' })}>Your math is 40 points ahead of R&W but you skip 8 questions per mock — mostly the last 5 minutes.</div>
            <button className="ac4" onClick={m.goTutor} style={sx({ width: '100%', padding: '13px', borderRadius: '15px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #007AB0', background: '#009ADA', color: '#fff', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Discuss with tutor</button>
          </div>
        </div>
      </div>
    </div>
  )
}
