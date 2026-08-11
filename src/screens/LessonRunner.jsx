import { useTheme } from '../theme.jsx'

export default function LessonRunner({ m }) {
  const { sx, cf } = useTheme()

  return (
    <div style={sx({ height: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' })}>
      <div style={sx({ flex: 'none', padding: '18px 26px', display: 'flex', alignItems: 'center', gap: '16px' })}>
        <button className="ho1" onClick={m.runQuit} style={sx({ width: '40px', height: '40px', flex: 'none', borderRadius: '13px', border: '2px solid #E6EEF3', background: '#fff', color: '#93A3AE', font: '900 16px Nunito', cursor: 'pointer' })}>✕</button>
        <div style={sx({ flex: '1', height: '18px', borderRadius: '12px', background: '#E6EEF3', padding: '3px' })}>
          <div style={sx({ height: '100%', width: `${m.runPct}%`, borderRadius: '9px', background: 'linear-gradient(90deg,#9BE85B,#58CC02)', transition: 'width .35s' })} />
        </div>
        <div style={sx({ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 15px', borderRadius: '999px', background: '#E9F7FD', border: '2px solid #C2E7F7', font: '900 15px Nunito', color: '#007AB0' })}>{m.runXpNow} XP</div>
        <div style={sx({ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 15px', borderRadius: '999px', background: '#FFF6E9', border: '2px solid #FFE1B3', font: '900 15px Nunito', color: '#CC7800' })}>🔥 {m.runStreakNow}</div>
      </div>
      <div style={sx({ flex: '1', minHeight: '0', overflow: 'auto', display: 'flex', justifyContent: 'center', padding: '20px 26px' })}>
        <div style={sx({ width: '680px', maxWidth: '100%' })}>
          <div style={sx({ font: '800 12px Nunito', letterSpacing: '1px', textTransform: 'uppercase', color: '#93A3AE', marginBottom: '10px' })}>Question {m.runCounter}</div>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '30px', lineHeight: '1.25', marginBottom: '22px' })}>{m.runQ.p}</div>
          <div style={sx({ display: 'flex', flexDirection: 'column', gap: '12px' })}>
            {m.runChoices.map((c, cI) => (
              <button className="ho16" key={cI} onClick={c.tap} style={sx({ display: 'flex', alignItems: 'center', gap: '14px', width: '100%', padding: '17px 18px', borderRadius: '18px', cursor: 'pointer', textAlign: 'left', background: c.bg, borderWidth: '2px', borderStyle: 'solid', borderColor: c.bd, borderBottomWidth: '5px', font: '800 18px Nunito', color: c.fg })}>
                <span style={sx({ width: '34px', height: '34px', flex: 'none', borderRadius: '11px', border: `2px solid ${c.bd}`, display: 'grid', placeItems: 'center', font: '900 15px Nunito' })}>{c.letter}</span>
                <span style={sx({ flex: '1' })}>{c.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {m.runChecked && (
        <div style={sx({ flex: 'none', padding: '18px 26px', background: m.runFeedback.bg, borderTop: `2px solid ${m.runFeedback.bd}`, animation: 'slidein .18s ease-out' })}>
          <div style={sx({ maxWidth: '680px', margin: '0 auto' })}>
            <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '22px', color: m.runFeedback.fg })}>{m.runFeedback.title}</div>
            <div style={sx({ font: '700 15px/1.5 Nunito', color: '#54646F', marginTop: '3px' })}>{m.runFeedback.body}</div>
          </div>
        </div>
      )}
      <div style={sx({ flex: 'none', padding: '18px 26px', borderTop: '2px solid #EEF3F7', display: 'flex', justifyContent: 'center' })}>
        <div style={sx({ width: '680px', maxWidth: '100%', display: 'flex', gap: '12px' })}>
          <button className="ho2" onClick={m.goTutor} style={sx({ padding: '16px 20px', borderRadius: '16px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#C2E7F7', borderBottomWidth: '4px', background: '#E9F7FD', color: '#007AB0', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Hint</button>
          <button className="ac17" onClick={m.runNext} style={sx({ flex: '1', padding: '16px', borderRadius: '16px', borderWidth: '0', borderStyle: 'none', borderBottom: `5px solid ${m.runBtnDark}`, background: m.runBtnBg, color: '#fff', font: '900 14px Nunito', letterSpacing: '.9px', textTransform: 'uppercase', cursor: 'pointer' })}>{m.runBtnLabel}</button>
        </div>
      </div>
    </div>
  )
}
