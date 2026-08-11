import { useTheme } from '../theme.jsx'

export default function Profile({ m }) {
  const { sx, cf } = useTheme()

  return (
    <div style={sx({ padding: '26px 30px 60px', maxWidth: '1200px' })}>
      <div style={sx({ background: '#0E2430', borderBottom: '6px solid #071620', borderRadius: '26px', padding: '26px', color: '#fff', position: 'relative', overflow: 'hidden', marginBottom: '20px' })}>
        <div style={sx({ position: 'absolute', inset: '0', background: 'radial-gradient(240px 200px at 88% 0%,rgba(0,154,218,.4),transparent 70%)' })} />
        <div style={sx({ position: 'relative', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' })}>
          <div style={sx({ width: '96px', height: '96px', flex: 'none', borderRadius: '32px', background: '#009ADA', borderBottom: '5px solid #007AB0', display: 'grid', placeItems: 'center', fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '34px' })}>SJ</div>
          <div style={sx({ flex: '1', minWidth: '220px' })}>
            <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '32px', lineHeight: '1.1' })}>Sukhrob Jamolov</div>
            <div style={sx({ font: '700 15px Nunito', opacity: '.75', marginTop: '3px' })}>Tashkent · joined Feb 2026 · Sapphire league rank 3</div>
            <div style={sx({ display: 'flex', gap: '8px', marginTop: '13px', flexWrap: 'wrap' })}>
              <div style={sx({ padding: '8px 13px', borderRadius: '11px', background: 'rgba(255,255,255,.12)', font: '900 12px Nunito', letterSpacing: '.5px' })}>Target 1550</div>
              <div style={sx({ padding: '8px 13px', borderRadius: '11px', background: 'rgba(255,255,255,.12)', font: '900 12px Nunito', letterSpacing: '.5px' })}>Harvard University</div>
              <div style={sx({ padding: '8px 13px', borderRadius: '11px', background: 'rgba(88,204,2,.22)', color: '#9BE85B', font: '900 12px Nunito', letterSpacing: '.5px' })}>Exam 3 Oct</div>
            </div>
          </div>
          <button className="ho15" style={sx({ flex: 'none', padding: '14px 22px', borderRadius: '16px', border: '2px solid rgba(255,255,255,.35)', background: 'rgba(255,255,255,.1)', color: '#fff', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Edit profile</button>
        </div>
      </div>
      <div style={sx({ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '14px', marginBottom: '22px' })}>
        <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '18px', textAlign: 'center' })}>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '30px', color: '#009ADA' })}>1240</div>
          <div style={sx({ font: '800 11px Nunito', letterSpacing: '.9px', textTransform: 'uppercase', color: '#93A3AE' })}>Total XP</div>
        </div>
        <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '18px', textAlign: 'center' })}>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '30px', color: '#FF9600' })}>24</div>
          <div style={sx({ font: '800 11px Nunito', letterSpacing: '.9px', textTransform: 'uppercase', color: '#93A3AE' })}>Day streak</div>
        </div>
        <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '18px', textAlign: 'center' })}>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '30px', color: '#58CC02' })}>6</div>
          <div style={sx({ font: '800 11px Nunito', letterSpacing: '.9px', textTransform: 'uppercase', color: '#93A3AE' })}>Mocks taken</div>
        </div>
        <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '18px', textAlign: 'center' })}>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '30px', color: '#1B2B36' })}>1180</div>
          <div style={sx({ font: '800 11px Nunito', letterSpacing: '.9px', textTransform: 'uppercase', color: '#93A3AE' })}>Best score</div>
        </div>
        <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '18px', textAlign: 'center' })}>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '30px', color: '#B07A16' })}>72%</div>
          <div style={sx({ font: '800 11px Nunito', letterSpacing: '.9px', textTransform: 'uppercase', color: '#93A3AE' })}>Accuracy</div>
        </div>
      </div>
      <div style={sx({ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' })}>
        <div style={sx({ flex: '1 1 480px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '20px' })}>
          <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '24px', padding: '22px' })}>
            <div style={sx({ font: '800 13px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE', marginBottom: '14px' })}>Score history</div>
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
            <div style={sx({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '14px' })}>
              <div style={sx({ font: '800 13px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE' })}>Badges · 5 of 9</div>
              <button className="ho1" onClick={m.goAchv} style={sx({ padding: '8px 14px', borderRadius: '12px', border: '2px solid #E6EEF3', background: '#fff', color: '#54646F', font: '900 10px Nunito', letterSpacing: '.7px', textTransform: 'uppercase', cursor: 'pointer' })}>See all</button>
            </div>
            <div style={sx({ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(84px,1fr))', gap: '12px' })}>
              {m.badges.map((b, bI) => (
                <div className="ho9" key={bI} title={b.title} style={sx({ aspectRatio: '1', borderRadius: '20px', background: b.bg, border: `2px solid ${b.bd}`, display: 'grid', placeItems: 'center', font: '900 22px Nunito', color: b.fg, cursor: 'pointer' })}>{b.glyph}</div>
              ))}
            </div>
          </div>
          <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '24px', padding: '22px' })}>
            <div style={sx({ font: '800 13px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE', marginBottom: '14px' })}>Preferences</div>
            <div style={sx({ display: 'flex', flexDirection: 'column', gap: '11px' })}>
              {m.toggleRows.map((t, tI) => (
                <div className="ho1" key={tI} onClick={t.tap} style={sx({ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderRadius: '18px', background: '#F8FBFD', border: '2px solid #EEF3F7', cursor: 'pointer' })}>
                  <div style={sx({ flex: '1', minWidth: '0' })}>
                    <div style={sx({ font: '800 16px Nunito' })}>{t.name}</div>
                    <div style={sx({ font: '700 13px Nunito', color: '#93A3AE' })}>{t.sub}</div>
                  </div>
                  <div style={sx({ width: '48px', height: '27px', flex: 'none', borderRadius: '999px', background: t.trackBg, position: 'relative', transition: 'background .2s' })}>
                    <div style={sx({ position: 'absolute', top: '3px', left: t.knobLeft, width: '21px', height: '21px', borderRadius: '50%', background: '#fff', transition: 'left .2s' })} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={sx({ width: '330px', flex: '1 1 290px', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '16px' })}>
          <div style={sx({ background: '#009ADA', borderBottom: '6px solid #007AB0', borderRadius: '22px', padding: '20px', color: '#fff' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', opacity: '.8', marginBottom: '6px' })}>Plan</div>
            <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '24px', lineHeight: '1.15' })}>SATbridge Pro</div>
            <div style={sx({ font: '700 14px Nunito', opacity: '.85', margin: '3px 0 14px' })}>Unlimited mocks · renews 12 Aug</div>
            <button className="ac4" style={sx({ width: '100%', padding: '13px', borderRadius: '15px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #DDE6EC', background: '#fff', color: '#007AB0', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Manage subscription</button>
          </div>
          <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE', marginBottom: '12px' })}>Account</div>
            <div style={sx({ display: 'flex', flexDirection: 'column', gap: '2px' })}>
              <div className="ho18" style={sx({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 12px', borderRadius: '14px', cursor: 'pointer', font: '800 15px Nunito' })}>
                <span>Email & password</span>
                <span style={sx({ color: '#93A3AE' })}>›</span>
              </div>
              <div className="ho18" style={sx({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 12px', borderRadius: '14px', cursor: 'pointer', font: '800 15px Nunito' })}>
                <span>Target score & date</span>
                <span style={sx({ color: '#93A3AE' })}>›</span>
              </div>
              <div className="ho18" style={sx({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 12px', borderRadius: '14px', cursor: 'pointer', font: '800 15px Nunito' })}>
                <span>Connected school</span>
                <span style={sx({ color: '#93A3AE' })}>›</span>
              </div>
              <div className="ho19" style={sx({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 12px', borderRadius: '14px', cursor: 'pointer', font: '800 15px Nunito', color: '#D93A3A' })}>
                <span>Log out</span>
                <span>›</span>
              </div>
            </div>
          </div>
          <div style={sx({ background: '#FFF7E3', borderWidth: '2px', borderStyle: 'solid', borderColor: '#FFE3A3', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#B07A16', marginBottom: '8px' })}>Streak protection</div>
            <div style={sx({ font: '800 16px Nunito', marginBottom: '4px' })}>2 streak freezes ready</div>
            <div style={sx({ font: '700 13px Nunito', color: '#8C7A55' })}>Automatically used on a missed day.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
