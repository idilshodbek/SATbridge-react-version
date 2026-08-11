import { useTheme } from '../theme.jsx'

export default function Onboarding({ m }) {
  const { sx, cf } = useTheme()

  return (
    <div style={sx({ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '30px', background: '#F7FAFC' })}>
      <div style={sx({ width: '620px', maxWidth: '100%' })}>
        <div style={sx({ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' })}>
          <div style={sx({ width: '42px', height: '42px', borderRadius: '14px', background: '#009ADA', borderBottom: '4px solid #007AB0', display: 'grid', placeItems: 'center' })}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={cf('#fff')} strokeWidth="2.4" strokeLinecap="round">
              <path d="M4 17V8M12 17V5M20 17v-6" />
              <path d="M3 20.5h18" />
            </svg>
          </div>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '23px' })}>SATbridge</div>
          <div style={sx({ marginLeft: 'auto', font: '800 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', color: '#93A3AE' })}>{m.onbStepLabel}</div>
        </div>
        <div style={sx({ height: '14px', borderRadius: '10px', background: '#E6EEF3', padding: '3px', marginBottom: '22px' })}>
          <div style={sx({ height: '100%', width: `${m.onbPct}%`, borderRadius: '8px', background: 'linear-gradient(90deg,#66CFF5,#009ADA)', transition: 'width .35s' })} />
        </div>
        {m.onbDone && (
          <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '6px', borderRadius: '26px', padding: '30px', textAlign: 'center', animation: 'pop .3s ease-out' })}>
            <div style={sx({ width: '78px', height: '78px', margin: '0 auto 14px', borderRadius: '26px', background: '#F1FAE6', display: 'grid', placeItems: 'center', fontSize: '36px', animation: 'bob 2.4s ease-in-out infinite' })}>🎯</div>
            <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '30px', lineHeight: '1.15' })}>Your 13-week plan is ready</div>
            <div style={sx({ font: '700 15px/1.6 Nunito', color: '#7B8B96', margin: '8px 0 20px' })}>6 hours a week, rebalanced every Sunday. Take a 20-question diagnostic now and we will tune the starting difficulty.</div>
            <div style={sx({ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' })}>
              <button className="ac4" onClick={m.onbDiagnostic} style={sx({ flex: '1', minWidth: '190px', padding: '15px', borderRadius: '16px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #46A302', background: '#58CC02', color: '#fff', font: '900 13px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Take diagnostic</button>
              <button className="ho1" onClick={m.onbFinish} style={sx({ flex: '1', minWidth: '190px', padding: '15px', borderRadius: '16px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', background: '#fff', color: '#54646F', font: '900 13px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>See my plan</button>
            </div>
          </div>
        )}
        {m.onbNotDone && (
          <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '6px', borderRadius: '26px', padding: '28px' })}>
            <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '28px', lineHeight: '1.2' })}>{m.onbCur.q}</div>
            <div style={sx({ font: '700 15px Nunito', color: '#93A3AE', margin: '5px 0 20px' })}>{m.onbCur.sub}</div>
            <div style={sx({ display: 'flex', flexDirection: 'column', gap: '11px' })}>
              {m.onbOpts.map((o, oI) => (
                <button className="ho16" key={oI} onClick={o.tap} style={sx({ display: 'flex', alignItems: 'center', gap: '13px', width: '100%', padding: '16px 17px', borderRadius: '18px', cursor: 'pointer', textAlign: 'left', background: o.bg, borderWidth: '2px', borderStyle: 'solid', borderColor: o.bd, borderBottomWidth: '4px', font: '800 17px Nunito', color: o.fg })}>
                  <span style={sx({ width: '26px', height: '26px', flex: 'none', borderRadius: '9px', background: o.boxBg, border: `2px solid ${o.boxBd}`, display: 'grid', placeItems: 'center', font: '900 13px Nunito', color: '#fff' })}>{o.check}</span>
                  <span style={sx({ flex: '1' })}>{o.label}</span>
                </button>
              ))}
            </div>
            <div style={sx({ display: 'flex', gap: '10px', marginTop: '22px' })}>
              <button className="ho1" onClick={m.onbBack} style={sx({ padding: '15px 22px', borderRadius: '16px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', background: '#fff', color: '#54646F', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Back</button>
              <button className="ac4" onClick={m.onbNext} style={sx({ flex: '1', padding: '15px', borderRadius: '16px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #007AB0', background: '#009ADA', color: '#fff', font: '900 13px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Continue</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
