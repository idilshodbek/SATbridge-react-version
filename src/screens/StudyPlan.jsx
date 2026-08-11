import { useTheme } from '../theme.jsx'

export default function StudyPlan({ m }) {
  const { sx, cf } = useTheme()

  return (
    <div style={sx({ padding: '26px 30px 60px', maxWidth: '1400px' })}>
      <div style={sx({ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '18px', flexWrap: 'wrap', marginBottom: '20px' })}>
        <div>
          <div style={sx({ font: '800 13px Nunito', letterSpacing: '1.1px', textTransform: 'uppercase', color: '#93A3AE' })}>Study plan</div>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '36px', lineHeight: '1.1' })}>Week 7 of 13 · to 1550 by 3 Oct</div>
          <div style={sx({ font: '700 15px Nunito', color: '#7B8B96', marginTop: '2px' })}>6 hours a week · rebalanced every Sunday from your mock results</div>
        </div>
        <button className="ho1" style={sx({ padding: '13px 22px', borderRadius: '16px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', background: '#fff', color: '#1B2B36', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Edit plan</button>
      </div>
      <div style={sx({ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '16px', marginBottom: '22px' })}>
        <div style={sx({ background: '#009ADA', borderBottom: '6px solid #007AB0', borderRadius: '22px', padding: '18px', color: '#fff' })}>
          <div style={sx({ font: '800 11px Nunito', letterSpacing: '1px', textTransform: 'uppercase', opacity: '.8' })}>Today</div>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '32px', lineHeight: '1.1' })}>{m.planDoneCount} / 4</div>
          <div style={sx({ font: '700 13px Nunito', opacity: '.85' })}>tasks done · {m.planPct}%</div>
        </div>
        <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '18px' })}>
          <div style={sx({ font: '800 11px Nunito', letterSpacing: '1px', textTransform: 'uppercase', color: '#93A3AE' })}>This week</div>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '32px', lineHeight: '1.1' })}>4h 20m</div>
          <div style={sx({ font: '700 13px Nunito', color: '#7B8B96' })}>of 6h planned</div>
        </div>
        <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '18px' })}>
          <div style={sx({ font: '800 11px Nunito', letterSpacing: '1px', textTransform: 'uppercase', color: '#93A3AE' })}>Phase</div>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '26px', lineHeight: '1.15' })}>Skill building</div>
          <div style={sx({ font: '700 13px Nunito', color: '#7B8B96' })}>Mock phase starts week 10</div>
        </div>
        <div style={sx({ background: '#FFF7E3', borderWidth: '2px', borderStyle: 'solid', borderColor: '#FFE3A3', borderBottomWidth: '5px', borderRadius: '22px', padding: '18px' })}>
          <div style={sx({ font: '800 11px Nunito', letterSpacing: '1px', textTransform: 'uppercase', color: '#B07A16' })}>On track</div>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '32px', lineHeight: '1.1' })}>+130</div>
          <div style={sx({ font: '700 13px Nunito', color: '#8C7A55' })}>points per month pace</div>
        </div>
      </div>
      <div style={sx({ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' })}>
        <div style={sx({ flex: '1 1 560px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '20px' })}>
          <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '24px', padding: '20px' })}>
            <div style={sx({ font: '800 13px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE', marginBottom: '14px' })}>Your week</div>
            <div style={sx({ display: 'grid', gridTemplateColumns: 'repeat(7,minmax(0,1fr))', gap: '8px' })}>
              {m.planWeek.map((d, dI) => (
                <div key={dI} style={sx({ display: 'flex', flexDirection: 'column', gap: '7px' })}>
                  <div style={sx({ padding: '8px 4px', borderRadius: '12px', background: d.headBg, textAlign: 'center', font: '900 11px Nunito', letterSpacing: '.8px', color: d.headFg })}>{d.d}</div>
                  {d.items.map((i, iI) => (
                    <div key={iI} style={sx({ padding: '10px 9px', borderRadius: '14px', background: i.bg, borderWidth: '2px', borderStyle: 'solid', borderColor: '#EEF3F7', borderLeft: `5px solid ${i.color}`, font: '800 11.5px/1.35 Nunito', color: i.fg, minHeight: '56px' })}>{i.t}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '24px', padding: '20px' })}>
            <div style={sx({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '14px' })}>
              <div style={sx({ font: '800 13px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE' })}>Today · Wednesday</div>
              <div style={sx({ font: '900 13px Nunito', color: '#009ADA' })}>{m.planPct}% complete</div>
            </div>
            <div style={sx({ display: 'flex', flexDirection: 'column', gap: '10px' })}>
              {m.planToday.map((t, tI) => (
                <div className="ho1" key={tI} onClick={t.tap} style={sx({ display: 'flex', alignItems: 'center', gap: '13px', padding: '15px 16px', borderRadius: '18px', background: '#F8FBFD', borderWidth: '2px', borderStyle: 'solid', borderColor: '#EEF3F7', borderLeft: `6px solid ${t.color}`, cursor: 'pointer' })}>
                  <div style={sx({ width: '28px', height: '28px', flex: 'none', borderRadius: '9px', background: t.boxBg, border: `2px solid ${t.boxBd}`, display: 'grid', placeItems: 'center', font: '900 14px Nunito', color: '#fff' })}>{t.check}</div>
                  <div style={sx({ flex: '1', minWidth: '0', font: '800 16px Nunito', color: t.titleColor, textDecoration: t.deco })}>{t.t}</div>
                  <div style={sx({ font: '800 13px Nunito', color: '#93A3AE' })}>{t.min}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={sx({ width: '330px', flex: '1 1 290px', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '16px' })}>
          <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE', marginBottom: '14px' })}>Plan phases</div>
            <div style={sx({ display: 'flex', flexDirection: 'column', gap: '12px' })}>
              <div style={sx({ display: 'flex', gap: '12px', alignItems: 'flex-start' })}>
                <div style={sx({ width: '26px', height: '26px', flex: 'none', borderRadius: '50%', background: '#58CC02', display: 'grid', placeItems: 'center', font: '900 12px Nunito', color: '#fff' })}>✓</div>
                <div>
                  <div style={sx({ font: '800 15px Nunito' })}>Foundations</div>
                  <div style={sx({ font: '700 12px Nunito', color: '#93A3AE' })}>Weeks 1–4 · complete</div>
                </div>
              </div>
              <div style={sx({ display: 'flex', gap: '12px', alignItems: 'flex-start' })}>
                <div style={sx({ width: '26px', height: '26px', flex: 'none', borderRadius: '50%', background: '#009ADA', display: 'grid', placeItems: 'center', font: '900 12px Nunito', color: '#fff' })}>●</div>
                <div>
                  <div style={sx({ font: '800 15px Nunito' })}>Skill building</div>
                  <div style={sx({ font: '700 12px Nunito', color: '#93A3AE' })}>Weeks 5–9 · you are here</div>
                </div>
              </div>
              <div style={sx({ display: 'flex', gap: '12px', alignItems: 'flex-start' })}>
                <div style={sx({ width: '26px', height: '26px', flex: 'none', borderRadius: '50%', background: '#EFF4F7', display: 'grid', placeItems: 'center', font: '900 12px Nunito', color: '#93A3AE' })}>3</div>
                <div>
                  <div style={sx({ font: '800 15px Nunito', color: '#7B8B96' })}>Full mocks</div>
                  <div style={sx({ font: '700 12px Nunito', color: '#93A3AE' })}>Weeks 10–13</div>
                </div>
              </div>
            </div>
          </div>
          <div style={sx({ background: '#E9F7FD', borderWidth: '2px', borderStyle: 'solid', borderColor: '#C2E7F7', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#007AB0', marginBottom: '9px' })}>Plan adjustment</div>
            <div style={sx({ font: '700 14px/1.55 Nunito', color: '#245A73', marginBottom: '13px' })}>Your vocab mastery is 27%. Sunday's rebalance will swap one math drill for two vocab sets.</div>
            <button className="ac4" onClick={m.goVocab} style={sx({ width: '100%', padding: '13px', borderRadius: '15px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #007AB0', background: '#009ADA', color: '#fff', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Start vocab now</button>
          </div>
          <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE', marginBottom: '12px' })}>Upcoming</div>
            <div style={sx({ display: 'flex', flexDirection: 'column', gap: '11px' })}>
              <div style={sx({ display: 'flex', alignItems: 'center', gap: '12px' })}>
                <div style={sx({ width: '10px', height: '36px', borderRadius: '6px', background: '#0E2430' })} />
                <div style={sx({ flex: '1' })}>
                  <div style={sx({ font: '800 14px Nunito' })}>Full mock 04</div>
                  <div style={sx({ font: '700 12px Nunito', color: '#93A3AE' })}>Saturday · 2h 14m</div>
                </div>
              </div>
              <div style={sx({ display: 'flex', alignItems: 'center', gap: '12px' })}>
                <div style={sx({ width: '10px', height: '36px', borderRadius: '6px', background: '#009ADA' })} />
                <div style={sx({ flex: '1' })}>
                  <div style={sx({ font: '800 14px Nunito' })}>Score review with tutor</div>
                  <div style={sx({ font: '700 12px Nunito', color: '#93A3AE' })}>Sunday · 20 min</div>
                </div>
              </div>
              <div style={sx({ display: 'flex', alignItems: 'center', gap: '12px' })}>
                <div style={sx({ width: '10px', height: '36px', borderRadius: '6px', background: '#FFC800' })} />
                <div style={sx({ flex: '1' })}>
                  <div style={sx({ font: '800 14px Nunito' })}>Vocab unit 1.2 opens</div>
                  <div style={sx({ font: '700 12px Nunito', color: '#93A3AE' })}>Monday</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
