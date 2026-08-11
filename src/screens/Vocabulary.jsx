import { useTheme } from '../theme.jsx'

export default function Vocabulary({ m }) {
  const { sx, cf } = useTheme()

  return (
    <div style={sx({ padding: '26px 30px 60px', maxWidth: '1300px' })}>
      <div style={sx({ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '18px', flexWrap: 'wrap', marginBottom: '18px' })}>
        <div>
          <div style={sx({ font: '800 13px Nunito', letterSpacing: '1.1px', textTransform: 'uppercase', color: '#93A3AE' })}>Vocabulary</div>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '36px', lineHeight: '1.1' })}>150 SAT words, 10 a day</div>
        </div>
        <button className="ac4" onClick={m.goCards} style={sx({ padding: '14px 24px', borderRadius: '16px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #46A302', background: '#58CC02', color: '#fff', font: '900 13px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Start flashcards</button>
      </div>
      <div style={sx({ display: 'flex', alignItems: 'center', gap: '12px', padding: '15px 18px', borderRadius: '20px', background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', marginBottom: '18px' })}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={cf('#93A3AE')} strokeWidth="2.4" strokeLinecap="round">
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4 4" />
        </svg>
        <input value={m.vocabQ} onChange={m.onVocabSearch} placeholder="Search word" style={sx({ flex: '1', minWidth: '0', border: 'none', outline: 'none', background: 'transparent', font: '700 17px Nunito', color: '#1B2B36' })} />
      </div>
      <div style={sx({ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' })}>
        <div style={sx({ flex: '1 1 480px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '18px' })}>
          <div style={sx({ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '16px' })}>
            <div className="ho9" style={sx({ background: '#58CC02', borderBottom: '6px solid #46A302', borderRadius: '24px', padding: '20px', color: '#fff', cursor: 'pointer' })}>
              <div style={sx({ width: '46px', height: '46px', borderRadius: '15px', background: 'rgba(255,255,255,.22)', display: 'grid', placeItems: 'center', marginBottom: '16px' })}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={cf('#fff')} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 3.5h7l4 4V20.5H7z" />
                  <path d="M13.5 3.5V8H18" />
                </svg>
              </div>
              <div style={sx({ font: '800 15px Nunito', opacity: '.92' })}>My vocabulary</div>
              <div style={sx({ display: 'flex', alignItems: 'baseline', gap: '7px', marginTop: '4px' })}>
                <span style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '34px', lineHeight: '1' })}>{m.vocabLearned}</span>
                <span style={sx({ font: '800 15px Nunito', opacity: '.85' })}>words</span>
              </div>
            </div>
            <div className="ho9" style={sx({ background: '#FF4B4B', borderBottom: '6px solid #D93A3A', borderRadius: '24px', padding: '20px', color: '#fff', cursor: 'pointer' })}>
              <div style={sx({ width: '46px', height: '46px', borderRadius: '15px', background: 'rgba(255,255,255,.22)', display: 'grid', placeItems: 'center', marginBottom: '16px' })}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={cf('#fff')} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 11a8 8 0 1 1 2.6 5.9" />
                  <path d="M4 5.5V11h5.5" />
                  <path d="M12 8.5V12l2.5 1.5" />
                </svg>
              </div>
              <div style={sx({ font: '800 15px Nunito', opacity: '.92' })}>Repeat</div>
              <div style={sx({ display: 'flex', alignItems: 'baseline', gap: '7px', marginTop: '4px' })}>
                <span style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '34px', lineHeight: '1' })}>{m.vocabRepeat}</span>
                <span style={sx({ font: '800 15px Nunito', opacity: '.85' })}>words</span>
              </div>
            </div>
          </div>
          <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '24px', padding: '24px', display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap' })}>
            <div style={sx({ width: '172px', height: '172px', flex: 'none', borderRadius: '50%', background: `conic-gradient(#58CC02 ${m.vocabDeg}deg,#FF4B4B 0 ${m.vocabRepeatDeg}deg,#EFF4F7 0)`, display: 'grid', placeItems: 'center' })}>
              <div style={sx({ width: '124px', height: '124px', borderRadius: '50%', background: '#fff', display: 'grid', placeItems: 'center', textAlign: 'center' })}>
                <div>
                  <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '34px', lineHeight: '1' })}>{m.vocabTotal}</div>
                  <div style={sx({ font: '800 10px Nunito', letterSpacing: '1.2px', color: '#93A3AE', marginTop: '3px' })}>TOTAL WORDS</div>
                </div>
              </div>
            </div>
            <div style={sx({ flex: '1', minWidth: '190px', display: 'flex', flexDirection: 'column', gap: '14px' })}>
              <div style={sx({ display: 'flex', alignItems: 'center', gap: '12px' })}>
                <span style={sx({ width: '22px', height: '10px', borderRadius: '6px', background: '#58CC02' })} />
                <span style={sx({ font: '800 17px Nunito' })}>My vocabulary</span>
                <span style={sx({ marginLeft: 'auto', font: '900 16px Nunito', color: '#3F8C06' })}>{m.vocabLearned}</span>
              </div>
              <div style={sx({ display: 'flex', alignItems: 'center', gap: '12px' })}>
                <span style={sx({ width: '22px', height: '10px', borderRadius: '6px', background: '#FF4B4B' })} />
                <span style={sx({ font: '800 17px Nunito' })}>Repeat</span>
                <span style={sx({ marginLeft: 'auto', font: '900 16px Nunito', color: '#D93A3A' })}>{m.vocabRepeat}</span>
              </div>
              <div style={sx({ display: 'flex', alignItems: 'center', gap: '12px' })}>
                <span style={sx({ width: '22px', height: '10px', borderRadius: '6px', background: '#EFF4F7' })} />
                <span style={sx({ font: '800 17px Nunito', color: '#7B8B96' })}>Not started</span>
                <span style={sx({ marginLeft: 'auto', font: '900 16px Nunito', color: '#93A3AE' })}>142</span>
              </div>
            </div>
          </div>
          <div style={sx({ display: 'flex', flexDirection: 'column', gap: '12px' })}>
            {m.vocabUnits.map((u, uI) => (
              <div key={uI} style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '16px 18px' })}>
                <div onClick={u.tap} style={sx({ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' })}>
                  <div style={sx({ width: '46px', height: '46px', flex: 'none', borderRadius: '15px', background: '#F4F8FB', display: 'grid', placeItems: 'center' })}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={cf('#93A3AE')} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 5.5h6.5v13H4zM13.5 5.5H20v13h-6.5z" />
                    </svg>
                  </div>
                  <div style={sx({ flex: '1', minWidth: '0' })}>
                    <div style={sx({ font: '800 18px Nunito', marginBottom: '7px' })}>{u.name}</div>
                    <div style={sx({ display: 'flex', alignItems: 'center', gap: '11px' })}>
                      <div style={sx({ flex: '1', height: '9px', borderRadius: '6px', background: '#EFF4F7' })}>
                        <div style={sx({ height: '100%', width: `${u.pct}%`, borderRadius: '6px', background: '#FFC800' })} />
                      </div>
                      <div style={sx({ font: '800 13px Nunito', color: '#93A3AE' })}>{u.label}</div>
                    </div>
                  </div>
                  <div style={sx({ font: '900 17px Nunito', color: '#93A3AE' })}>{u.caret}</div>
                </div>
                <div style={sx({ display: 'flex', flexDirection: 'column', gap: '9px', marginTop: '12px' })}>
                  {u.subs.map((s, sI) => (
                    <div key={sI} style={sx({ padding: '14px 16px', borderRadius: '18px', background: '#F8FBFD', border: '2px solid #EEF3F7', animation: 'slidein .18s ease-out' })}>
                      <div style={sx({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' })}>
                        <div>
                          <div style={sx({ font: '800 16px Nunito' })}>{s.name}</div>
                          <div style={sx({ font: '700 13px Nunito', color: '#93A3AE' })}>{s.meta}</div>
                        </div>
                        <div style={sx({ font: '900 13px Nunito', color: '#93A3AE' })}>{s.label}</div>
                      </div>
                      <div style={sx({ height: '9px', borderRadius: '6px', background: '#EFF4F7' })}>
                        <div style={sx({ height: '100%', width: `${s.pct}%`, borderRadius: '6px', background: '#FFC800' })} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={sx({ width: '330px', flex: '1 1 290px', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '16px' })}>
          <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE', marginBottom: '12px' })}>Words</div>
            <div style={sx({ display: 'flex', flexDirection: 'column', gap: '9px' })}>
              {m.words.map((w, wI) => (
                <div key={wI} style={sx({ padding: '13px 14px', borderRadius: '16px', background: w.bg, border: `2px solid ${w.bd}` })}>
                  <div style={sx({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' })}>
                    <div style={sx({ font: '800 16px Nunito' })}>{w.word}</div>
                    <div style={sx({ font: '900 10px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', color: w.fg })}>{w.label}</div>
                  </div>
                  <div style={sx({ font: '700 13px/1.45 Nunito', color: '#5C7080', marginTop: '3px' })}>{w.def}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={sx({ background: '#FFF7E3', borderWidth: '2px', borderStyle: 'solid', borderColor: '#FFE3A3', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#B07A16', marginBottom: '8px' })}>Today's set</div>
            <div style={sx({ font: '800 17px Nunito', marginBottom: '4px' })}>10 words · 4 min</div>
            <div style={sx({ font: '700 13px Nunito', color: '#8C7A55', marginBottom: '14px' })}>Spaced repetition puts 3 repeat words back in this set.</div>
            <button className="ac4" onClick={m.startExam} style={sx({ width: '100%', padding: '13px', borderRadius: '15px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #D9A400', background: '#FFC800', color: '#5A4300', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Practice now</button>
          </div>
        </div>
      </div>
    </div>
  )
}
