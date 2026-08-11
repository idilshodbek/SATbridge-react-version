import { useTheme } from '../theme.jsx'

export default function AiTutor({ m }) {
  const { sx, cf } = useTheme()

  return (
    <div style={sx({ height: '100vh', display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', background: '#F4F8FB' })}>
      <div style={sx({ flex: '1 1 520px', minWidth: '0', display: 'flex', flexDirection: 'column', height: '100%' })}>
        <div style={sx({ flex: 'none', padding: '22px 30px 16px', borderBottom: '2px solid #E1EBF1', background: '#fff', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' })}>
          <div style={sx({ width: '52px', height: '52px', flex: 'none', borderRadius: '18px', background: '#009ADA', borderBottom: '4px solid #007AB0', display: 'grid', placeItems: 'center' })}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={cf('#fff')} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="6" width="16" height="12" rx="4" />
              <path d="M9 11v2M15 11v2M12 6V3" />
            </svg>
          </div>
          <div style={sx({ flex: '1', minWidth: '180px' })}>
            <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '25px', lineHeight: '1.1' })}>Bridge AI tutor</div>
            <div style={sx({ font: '700 13px Nunito', color: '#7B8B96' })}>Knows your last 6 mocks and every missed question</div>
          </div>
          <div style={sx({ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 14px', borderRadius: '999px', background: '#F1FAE6', border: '2px solid #CFEBA8', font: '900 12px Nunito', letterSpacing: '.6px', textTransform: 'uppercase', color: '#3F8C06' })}>● Online</div>
        </div>
        <div style={sx({ flex: '1', minHeight: '0', overflow: 'auto', padding: '24px 30px', display: 'flex', flexDirection: 'column', gap: '16px' })}>
          {m.chat.map((m, mI) => (
            <div key={mI} style={sx({ display: 'flex', flexDirection: 'column', alignItems: m.align, gap: '5px' })}>
              <div style={sx({ font: '900 10px Nunito', letterSpacing: '1px', textTransform: 'uppercase', color: m.nameColor })}>{m.who}</div>
              <div style={sx({ maxWidth: '74%', padding: '15px 18px', borderRadius: m.radius, background: m.bg, color: m.fg, font: '700 16px/1.55 Nunito', border: '2px solid rgba(14,36,48,.06)', animation: 'slidein .2s ease-out' })}>{m.text}</div>
            </div>
          ))}
          {m.thinking && (
            <div style={sx({ display: 'flex', alignItems: 'center', gap: '9px', padding: '13px 17px', borderRadius: '20px 20px 20px 6px', background: '#fff', border: '2px solid #E6EEF3', alignSelf: 'flex-start', font: '800 14px Nunito', color: '#93A3AE' })}><span style={sx({ width: '9px', height: '9px', borderRadius: '50%', background: '#009ADA', animation: 'bob 1s ease-in-out infinite' })} /><span style={sx({ width: '9px', height: '9px', borderRadius: '50%', background: '#009ADA', animation: 'bob 1s ease-in-out .15s infinite' })} /><span style={sx({ width: '9px', height: '9px', borderRadius: '50%', background: '#009ADA', animation: 'bob 1s ease-in-out .3s infinite' })} />Thinking
        </div>
          )}
        </div>
        <div style={sx({ flex: 'none', padding: '14px 30px 20px', background: '#fff', borderTop: '2px solid #E1EBF1' })}>
          <div style={sx({ display: 'flex', gap: '8px', overflow: 'auto', paddingBottom: '12px' })}>
            {m.chips.map((c, cI) => (
              <button className="ho2" key={cI} onClick={c.tap} style={sx({ flex: 'none', padding: '10px 15px', borderRadius: '999px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#C2E7F7', borderBottomWidth: '4px', background: '#E9F7FD', color: '#007AB0', font: '800 13px Nunito', cursor: 'pointer' })}>{c.text}</button>
            ))}
          </div>
          <div style={sx({ display: 'flex', gap: '10px', alignItems: 'center' })}>
            <input className="fo20" value={m.chatDraft} onChange={m.onDraft} onKeyDown={m.onKey} placeholder="Ask about any question, skill, or your plan…" style={sx({ flex: '1', minWidth: '0', padding: '16px 18px', borderRadius: '18px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', font: '700 16px Nunito', color: '#1B2B36', outline: 'none', background: '#F8FBFD' })} />
            <button className="ac4" onClick={m.send} style={sx({ flex: 'none', padding: '16px 26px', borderRadius: '18px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #007AB0', background: '#009ADA', color: '#fff', font: '900 13px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Send</button>
          </div>
        </div>
      </div>
      <div style={sx({ width: '340px', flex: '1 1 300px', maxWidth: '380px', height: '100%', overflow: 'auto', padding: '22px', display: 'flex', flexDirection: 'column', gap: '16px', borderLeft: '2px solid #E1EBF1' })}>
        <div style={sx({ background: '#0E2430', borderBottom: '6px solid #071620', borderRadius: '22px', padding: '20px', color: '#fff' })}>
          <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', opacity: '.7', marginBottom: '8px' })}>Session focus</div>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '23px', lineHeight: '1.15' })}>Vocabulary in context</div>
          <div style={sx({ font: '700 14px Nunito', opacity: '.75', margin: '5px 0 14px' })}>27% mastery · 12 misses in 3 drills · worth about +30 points</div>
          <button className="ac4" onClick={m.goMock} style={sx({ width: '100%', padding: '13px', borderRadius: '15px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #46A302', background: '#58CC02', color: '#fff', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Drill 10 questions</button>
        </div>
        <div style={sx({ background: '#F6F1FF', borderWidth: '2px', borderStyle: 'solid', borderColor: '#DCC9FF', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
          <div style={sx({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '10px' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#6B45C8' })}>Hint ladder</div>
            <button className="ho21" onClick={m.resetHint} style={sx({ padding: '6px 11px', borderRadius: '10px', border: '2px solid #DCC9FF', background: '#fff', color: '#7B8B96', font: '900 9.5px Nunito', letterSpacing: '.6px', textTransform: 'uppercase', cursor: 'pointer' })}>Reset</button>
          </div>
          <div style={sx({ font: '700 13px/1.5 Nunito', color: '#4A3B6B', marginBottom: '12px' })}>Mock 06 · Q3 circles. Reveal one step at a time instead of the answer.</div>
          <div style={sx({ display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: '13px' })}>
            {m.hintLadder.map((h, hI) => (
              <div key={hI} style={sx({ display: 'flex', gap: '10px', padding: '12px 13px', borderRadius: '15px', background: '#fff', border: '2px solid #EDE3FF', animation: 'slidein .18s ease-out' })}>
                <span style={sx({ width: '22px', height: '22px', flex: 'none', borderRadius: '50%', background: '#F6F1FF', display: 'grid', placeItems: 'center', font: '900 11px Nunito', color: '#6B45C8' })}>{h.n}</span>
                <span style={sx({ font: '700 13.5px/1.45 Nunito', color: '#42525C' })}>{h.text}</span>
              </div>
            ))}
          </div>
          <button className="ac4" onClick={m.moreHint} style={sx({ width: '100%', padding: '13px', borderRadius: '15px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #5C2FD6', background: '#7C4DFF', color: '#fff', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>{m.hintBtnLabel}</button>
        </div>
        <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
          <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE', marginBottom: '12px' })}>Recent mistakes</div>
          <div style={sx({ display: 'flex', flexDirection: 'column', gap: '10px' })}>
            {m.radarBars.map((s, sI) => (
              <div key={sI} style={sx({ display: 'flex', alignItems: 'center', gap: '11px', padding: '10px 12px', borderRadius: '16px', background: '#F8FBFD', border: '2px solid #EEF3F7' })}>
                <div style={sx({ width: '36px', height: '36px', flex: 'none', borderRadius: '12px', background: '#fff', border: '2px solid #E6EEF3', display: 'grid', placeItems: 'center', font: '900 11px Nunito', color: s.pctColor })}>{s.pct}</div>
                <div style={sx({ flex: '1', minWidth: '0', font: '800 14px Nunito', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' })}>{s.name}</div>
                <div style={sx({ font: '900 11px Nunito', letterSpacing: '.6px', textTransform: 'uppercase', color: '#009ADA', cursor: 'pointer' })}>Explain</div>
              </div>
            ))}
          </div>
        </div>
        <div style={sx({ background: '#E9F7FD', borderWidth: '2px', borderStyle: 'solid', borderColor: '#C2E7F7', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
          <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#007AB0', marginBottom: '10px' })}>Tutor credits</div>
          <div style={sx({ height: '14px', borderRadius: '10px', background: '#D2ECF8', marginBottom: '10px' })}>
            <div style={sx({ height: '100%', width: '62%', borderRadius: '10px', background: '#009ADA' })} />
          </div>
          <div style={sx({ font: '700 13px Nunito', color: '#245A73' })}>31 of 50 explanations used this month. Resets 1 Aug.</div>
        </div>
      </div>
    </div>
  )
}
