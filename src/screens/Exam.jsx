import { useTheme } from '../theme.jsx'

export default function Exam({ m }) {
  const { sx, cf } = useTheme()

  return (
    <div style={sx({ height: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' })}>
      <div style={sx({ flex: 'none', padding: '13px 24px', borderBottom: '3px dashed #B8E4F7', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '18px', flexWrap: 'wrap' })}>
        <div>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '19px', color: '#009ADA' })}>{m.q.module}</div>
          <div style={sx({ font: '800 12px Nunito', color: '#93A3AE', letterSpacing: '.6px', textTransform: 'uppercase' })}>Directions ⌄</div>
        </div>
        <div style={sx({ display: 'flex', alignItems: 'center', gap: '9px', flexWrap: 'wrap' })}>
          {m.showTimer && (
            <div style={sx({ padding: '10px 18px', borderRadius: '14px', background: m.timerBg, borderWidth: '2px', borderStyle: 'solid', borderColor: m.timerBd, borderBottomWidth: '4px', fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '22px', color: m.timerFg, minWidth: '114px', textAlign: 'center' })}>{m.clock}</div>
          )}
          <button className="ho1" style={sx({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '8px 13px', borderRadius: '14px', border: '2px solid #E6EEF3', background: '#fff', color: '#54646F', font: '800 10px Nunito', letterSpacing: '.6px', textTransform: 'uppercase', cursor: 'pointer' })}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={cf('#009ADA')} strokeWidth="2.2" strokeLinecap="round">
            <rect x="5" y="3" width="14" height="18" rx="3" />
            <path d="M8.5 7.5h7M8.5 12h2M12.5 12h2M8.5 16h2M12.5 16h2" />
          </svg>Calculator</button>
          <button className="ho1" style={sx({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '8px 13px', borderRadius: '14px', border: '2px solid #E6EEF3', background: '#fff', color: '#54646F', font: '800 10px Nunito', letterSpacing: '.6px', textTransform: 'uppercase', cursor: 'pointer' })}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={cf('#009ADA')} strokeWidth="2.2" strokeLinecap="round">
            <path d="M4 12h3l3 7 4-15h6" />
          </svg>Reference</button>
          <button className="ho2" onClick={m.toggleHint} style={sx({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '8px 13px', borderRadius: '14px', border: '2px solid #B8E4F7', background: '#E9F7FD', color: '#007AB0', font: '800 10px Nunito', letterSpacing: '.6px', textTransform: 'uppercase', cursor: 'pointer' })}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={cf('#009ADA')} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="6" width="16" height="12" rx="4" />
            <path d="M9 11v2M15 11v2M12 6V3" />
          </svg>AI tutor</button>
        </div>
      </div>
      <div style={sx({ flex: 'none', display: 'flex', gap: '4px', padding: '10px 24px' })}>
        {m.dots.map((d, dI) => (
          <div key={dI} onClick={d.tap} title={d.title} style={sx({ flex: '1', height: '9px', borderRadius: '6px', background: d.bg, cursor: 'pointer', transition: 'background .2s' })} />
        ))}
      </div>
      <div style={sx({ flex: '1', minHeight: '0', display: 'flex', flexWrap: 'wrap' })}>
        <div style={sx({ flex: '1 1 380px', minWidth: '0', padding: '30px 36px', overflow: 'auto', borderRight: '3px dashed #B8E4F7' })}>
          <div style={sx({ font: '800 12px Nunito', letterSpacing: '1px', textTransform: 'uppercase', color: '#93A3AE', marginBottom: '14px' })}>{m.q.kind}</div>
          <div style={sx({ fontFamily: 'Georgia,serif', fontSize: '19px', lineHeight: '1.65', maxWidth: '640px', color: '#22313B' })}>{m.q.passage}</div>
          {m.q.hasFig && (
            <div style={sx({ marginTop: '26px', maxWidth: '400px', padding: '26px', border: '2px dashed #D3DEE6', borderRadius: '20px', background: '#FAFCFD', textAlign: 'center', font: '800 12px Nunito', color: '#93A3AE', letterSpacing: '.6px', textTransform: 'uppercase' })}>Figure placeholder<div style={sx({ font: '700 13px Nunito', textTransform: 'none', letterSpacing: '0', marginTop: '6px' })}>{m.q.figNote}</div></div>
          )}
        </div>
        <div style={sx({ flex: '1 1 380px', minWidth: '0', padding: '24px 36px', overflow: 'auto', display: 'flex', flexDirection: 'column' })}>
          <div style={sx({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', paddingBottom: '13px', borderBottom: '2px dashed #E4EBF0', marginBottom: '18px' })}>
            <div style={sx({ display: 'flex', alignItems: 'center', gap: '11px' })}>
              <div style={sx({ width: '34px', height: '34px', borderRadius: '10px', background: '#0E2430', color: '#fff', display: 'grid', placeItems: 'center', font: '900 16px Nunito' })}>{m.qNum}</div>
              <button onClick={m.toggleMark} style={sx({ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 13px', borderRadius: '12px', border: `2px solid ${m.mark.bd}`, background: m.mark.bg, color: m.mark.fg, font: '800 12px Nunito', letterSpacing: '.6px', textTransform: 'uppercase', cursor: 'pointer' })}><svg width="15" height="15" viewBox="0 0 24 24" fill={cf(m.mark.fill)} stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
                <path d="M7 4h10v17l-5-4-5 4V4Z" />
              </svg>{m.mark.label}</button>
            </div>
            <div style={sx({ font: '800 12px Nunito', letterSpacing: '.6px', textTransform: 'uppercase', color: '#93A3AE' })}>{m.q.topic}</div>
          </div>
          <div style={sx({ font: '800 19px/1.5 Nunito', marginBottom: '16px' })}>{m.q.prompt}</div>
          <div style={sx({ display: 'flex', flexDirection: 'column', gap: '11px' })}>
            {m.choices.map((c, cI) => (
              <button className="ho22" key={cI} onClick={c.pick} style={sx({ display: 'flex', alignItems: 'center', gap: '13px', width: '100%', padding: '15px 16px', borderRadius: '16px', cursor: 'pointer', textAlign: 'left', background: c.bg, borderWidth: '2px', borderStyle: 'solid', borderColor: c.bd, borderBottomWidth: '4px', font: '700 17px Nunito', color: c.fg })}>
                <span style={sx({ width: '33px', height: '33px', flex: 'none', borderRadius: '50%', border: `2px solid ${c.bd}`, display: 'grid', placeItems: 'center', font: '900 15px Nunito' })}>{c.letter}</span>
                <span style={sx({ flex: '1' })}>{c.text}</span>
                <span style={sx({ font: '900 18px Nunito' })}>{c.badge}</span>
              </button>
            ))}
          </div>
          {m.hintOpen && (
            <div style={sx({ marginTop: '16px', padding: '16px 18px', borderRadius: '18px', background: '#E9F7FD', border: '2px solid #B8E4F7', animation: 'slidein .18s ease-out' })}>
              <div style={sx({ font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', color: '#007AB0', marginBottom: '6px' })}>AI tutor nudge</div>
              <div style={sx({ font: '700 15px/1.55 Nunito', color: '#245A73' })}>{m.q.hint}</div>
            </div>
          )}
          {m.feedback.show && (
            <div style={sx({ marginTop: 'auto', padding: '18px 20px', borderRadius: '20px', background: m.feedback.bg, border: `2px solid ${m.feedback.bd}`, animation: 'slidein .2s ease-out' })}>
              <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '22px', color: m.feedback.fg })}>{m.feedback.title}</div>
              <div style={sx({ font: '700 15px/1.5 Nunito', color: '#54646F', marginTop: '5px' })}>{m.feedback.body}</div>
            </div>
          )}
        </div>
      </div>
      <div style={sx({ flex: 'none', padding: '13px 24px', borderTop: '3px dashed #B8E4F7', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap' })}>
        <button className="ho1" onClick={m.goRes} style={sx({ display: 'flex', alignItems: 'center', gap: '9px', padding: '11px 16px', borderRadius: '14px', border: '2px solid #E6EEF3', background: '#fff', color: '#54646F', font: '900 12px Nunito', letterSpacing: '.7px', textTransform: 'uppercase', cursor: 'pointer' })}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.5 10 17.5 19 7" />
        </svg>Finish & see report</button>
        <button className="ac4" onClick={m.toggleNav} style={sx({ display: 'flex', alignItems: 'center', gap: '9px', padding: '12px 22px', borderRadius: '14px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #071620', background: '#0E2430', color: '#fff', font: '900 14px Nunito', letterSpacing: '.6px', cursor: 'pointer' })}>{m.navLabel}
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 15 6-6 6 6" />
        </svg></button>
        <div style={sx({ display: 'flex', gap: '10px' })}>
          <button className="ho1" onClick={m.prevQ} style={sx({ padding: '12px 20px', borderRadius: '14px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', background: '#fff', color: '#54646F', font: '900 13px Nunito', letterSpacing: '.7px', textTransform: 'uppercase', cursor: 'pointer' })}>Back</button>
          <button className="ac4" onClick={m.nextQ} style={sx({ padding: '12px 28px', borderRadius: '14px', borderWidth: '0', borderStyle: 'none', borderBottom: `4px solid ${m.nextBtn.dark}`, background: m.nextBtn.bg, color: '#fff', font: '900 13px Nunito', letterSpacing: '.7px', textTransform: 'uppercase', cursor: 'pointer' })}>{m.nextBtn.label}</button>
        </div>
      </div>
      {m.navOpen && (
        <div onClick={m.toggleNav} style={sx({ position: 'fixed', inset: '0', background: 'rgba(14,36,48,.4)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '92px', zIndex: '40' })}>
          <div style={sx({ width: '560px', maxWidth: '92vw', background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '6px', borderRadius: '24px', padding: '22px', animation: 'slidein .2s ease-out' })}>
            <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '20px', marginBottom: '4px' })}>Module 1 · question navigator</div>
            <div style={sx({ display: 'flex', gap: '16px', font: '800 11px Nunito', letterSpacing: '.6px', textTransform: 'uppercase', color: '#93A3AE', marginBottom: '16px', flexWrap: 'wrap' })}>
              <span style={sx({ color: '#58CC02' })}>■ answered</span>
              <span style={sx({ color: '#FFC800' })}>■ for review</span>
              <span>□ unseen</span>
            </div>
            <div style={sx({ display: 'grid', gridTemplateColumns: 'repeat(10,1fr)', gap: '8px' })}>
              {m.grid.map((g, gI) => (
                <button key={gI} onClick={g.tap} style={sx({ aspectRatio: '1', borderRadius: '12px', cursor: 'pointer', background: g.bg, borderWidth: '2px', borderStyle: 'solid', borderColor: g.bd, borderBottomWidth: '4px', color: g.fg, font: '900 15px Nunito' })}>{g.n}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
