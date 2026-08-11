import { useTheme } from '../theme.jsx'

export default function Sidebar({ m }) {
  const { sx, cf } = useTheme()

  return (
    <aside style={sx({ width: '258px', flex: 'none', height: '100%', background: '#fff', borderRight: '2px solid #E6EEF3', padding: '22px 15px', flexDirection: 'column', gap: '5px', overflow: 'auto', display: m.sidebarDisplay })}>
      <div style={sx({ display: 'flex', alignItems: 'center', gap: '11px', padding: '4px 8px 22px' })}>
        <div style={sx({ width: '44px', height: '44px', flex: 'none', borderRadius: '14px', background: '#009ADA', borderBottom: '4px solid #007AB0', display: 'grid', placeItems: 'center' })}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={cf('#fff')} strokeWidth="2.4" strokeLinecap="round">
            <path d="M2.5 16c4.5 0 6-9 9.5-9s5 9 9.5 9" />
            <path d="M7 16v4M12 12.5V20M17 16v4" />
          </svg>
        </div>
        <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '23px', letterSpacing: '-.4px' })}>SAT<span style={sx({ color: '#009ADA' })}>bridge</span></div>
      </div>
      <button className="ho1" onClick={m.goMain} style={sx({ display: 'flex', alignItems: 'center', gap: '13px', padding: '13px 14px', borderRadius: '16px', borderWidth: '2px', borderStyle: 'solid', cursor: 'pointer', font: '800 15px Nunito', textTransform: 'uppercase', letterSpacing: '.4px', background: m.navMain.bg, borderColor: m.navMain.bd, color: m.navMain.fg })}><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5.5 9.7V20h13V9.7" />
        <path d="M10 20v-5h4v5" />
      </svg>Home</button>
      <button className="ho1" onClick={m.goPath} style={sx({ display: 'flex', alignItems: 'center', gap: '13px', padding: '13px 14px', borderRadius: '16px', borderWidth: '2px', borderStyle: 'solid', cursor: 'pointer', font: '800 15px Nunito', textTransform: 'uppercase', letterSpacing: '.4px', background: m.navPath.bg, borderColor: m.navPath.bd, color: m.navPath.fg })}><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M5 20c6.5 0 3-7 8-7s5.5-2.4 5.5-5" />
        <circle cx="5" cy="20" r="1.9" fill="currentColor" stroke="none" />
        <circle cx="18.5" cy="5.6" r="2.6" />
      </svg>Learning path</button>
      <button className="ho1" onClick={m.goMock} style={sx({ display: 'flex', alignItems: 'center', gap: '13px', padding: '13px 14px', borderRadius: '16px', borderWidth: '2px', borderStyle: 'solid', cursor: 'pointer', font: '800 15px Nunito', textTransform: 'uppercase', letterSpacing: '.4px', background: m.navMock.bg, borderColor: m.navMock.bd, color: m.navMock.fg })}><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4.5" y="3.5" width="15" height="17" rx="3" />
        <path d="M8.5 9.5h7M8.5 13.5h7M8.5 17h4" />
      </svg>Mock exams</button>
      <button className="ho1" onClick={m.goTutor} style={sx({ display: 'flex', alignItems: 'center', gap: '13px', padding: '13px 14px', borderRadius: '16px', borderWidth: '2px', borderStyle: 'solid', cursor: 'pointer', font: '800 15px Nunito', textTransform: 'uppercase', letterSpacing: '.4px', background: m.navTutor.bg, borderColor: m.navTutor.bd, color: m.navTutor.fg })}><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="16" height="12" rx="4" />
        <path d="M9 11v2M15 11v2M12 6V3" />
      </svg>AI tutor</button>
      <button className="ho1" onClick={m.goLb} style={sx({ display: 'flex', alignItems: 'center', gap: '13px', padding: '13px 14px', borderRadius: '16px', borderWidth: '2px', borderStyle: 'solid', cursor: 'pointer', font: '800 15px Nunito', textTransform: 'uppercase', letterSpacing: '.4px', background: m.navLb.bg, borderColor: m.navLb.bd, color: m.navLb.fg })}><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M5 20V12M12 20V5M19 20v-6" />
      </svg>Leaderboard</button>
      <button className="ho1" onClick={m.goDrills} style={sx({ display: 'flex', alignItems: 'center', gap: '13px', padding: '13px 14px', borderRadius: '16px', borderWidth: '2px', borderStyle: 'solid', cursor: 'pointer', font: '800 15px Nunito', textTransform: 'uppercase', letterSpacing: '.4px', background: m.navDrills.bg, borderColor: m.navDrills.bd, color: m.navDrills.fg })}><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
      </svg>Drills</button>
      <button className="ho1" onClick={m.goVocab} style={sx({ display: 'flex', alignItems: 'center', gap: '13px', padding: '13px 14px', borderRadius: '16px', borderWidth: '2px', borderStyle: 'solid', cursor: 'pointer', font: '800 15px Nunito', textTransform: 'uppercase', letterSpacing: '.4px', background: m.navVocab.bg, borderColor: m.navVocab.bd, color: m.navVocab.fg })}><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h7v13H4zM13 6h7v13h-7z" />
        <path d="M6.5 10h2M15.5 10h2" />
      </svg>Vocabulary</button>
      <div style={sx({ height: '2px', background: '#EEF3F7', margin: '12px 6px' })} />
      <button className="ho1" onClick={m.goQb} style={sx({ display: 'flex', alignItems: 'center', gap: '13px', padding: '13px 14px', borderRadius: '16px', borderWidth: '2px', borderStyle: 'solid', cursor: 'pointer', font: '800 15px Nunito', textTransform: 'uppercase', letterSpacing: '.4px', background: m.navQb.bg, borderColor: m.navQb.bd, color: m.navQb.fg })}><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 4.5h9a3 3 0 0 1 3 3v12H8a3 3 0 0 1-3-3v-12Z" />
        <path d="M17 8h2v11.5" />
      </svg>Question bank</button>
      <button className="ho1" onClick={m.goNotes} style={sx({ display: 'flex', alignItems: 'center', gap: '13px', padding: '13px 14px', borderRadius: '16px', borderWidth: '2px', borderStyle: 'solid', cursor: 'pointer', font: '800 15px Nunito', textTransform: 'uppercase', letterSpacing: '.4px', background: m.navNotes.bg, borderColor: m.navNotes.bd, color: m.navNotes.fg })}><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3.5h9l4 4v13H6z" />
        <path d="M9 10h7M9 14h7M9 18h4" />
      </svg>Notes</button>
      <button className="ho1" onClick={m.goAna} style={sx({ display: 'flex', alignItems: 'center', gap: '13px', padding: '13px 14px', borderRadius: '16px', borderWidth: '2px', borderStyle: 'solid', cursor: 'pointer', font: '800 15px Nunito', textTransform: 'uppercase', letterSpacing: '.4px', background: m.navAna.bg, borderColor: m.navAna.bd, color: m.navAna.fg })}><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5V4" />
        <path d="M4 19.5h16" />
        <path d="M8 16V11M12.5 16V7.5M17 16v-3" />
      </svg>Analytics</button>
      <button className="ho1" onClick={m.goPlan} style={sx({ display: 'flex', alignItems: 'center', gap: '13px', padding: '13px 14px', borderRadius: '16px', borderWidth: '2px', borderStyle: 'solid', cursor: 'pointer', font: '800 15px Nunito', textTransform: 'uppercase', letterSpacing: '.4px', background: m.navPlan.bg, borderColor: m.navPlan.bd, color: m.navPlan.fg })}><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4.5" width="16" height="16" rx="4" />
        <path d="M8 3v3M16 3v3M8 12h8M8 16h5" />
      </svg>Study plan</button>
      <button className="ho1" onClick={m.goProfile} style={sx({ display: 'flex', alignItems: 'center', gap: '13px', padding: '13px 14px', borderRadius: '16px', borderWidth: '2px', borderStyle: 'solid', cursor: 'pointer', font: '800 15px Nunito', textTransform: 'uppercase', letterSpacing: '.4px', background: m.navProfile.bg, borderColor: m.navProfile.bd, color: m.navProfile.fg })}><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="3.4" />
        <path d="M5 20c0-3.6 3.1-5.5 7-5.5s7 1.9 7 5.5" />
      </svg>Profile</button>
      <div style={sx({ marginTop: 'auto', padding: '15px', borderRadius: '20px', background: '#E9F7FD', borderWidth: '2px', borderStyle: 'solid', borderColor: '#C2E7F7', borderBottomWidth: '5px' })}>
        <div style={sx({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '11px' })}>
          <div style={sx({ font: '800 11px Nunito', textTransform: 'uppercase', letterSpacing: '.8px', color: '#007AB0' })}>Daily goal</div>
          <button className="ho2" onClick={m.resetGoal} title="Reset today" style={sx({ width: '24px', height: '24px', borderRadius: '8px', border: '2px solid #C2E7F7', background: '#fff', color: '#7B8B96', font: '900 11px Nunito', cursor: 'pointer', display: 'grid', placeItems: 'center' })}>↺</button>
        </div>
        <div style={sx({ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' })}>
          <div style={sx({ width: '62px', height: '62px', flex: 'none', borderRadius: '50%', background: `conic-gradient(#009ADA ${m.goalRingDeg}deg,#D2ECF8 0)`, display: 'grid', placeItems: 'center', transition: 'background .45s' })}>
            <div style={sx({ width: '46px', height: '46px', borderRadius: '50%', background: '#E9F7FD', display: 'grid', placeItems: 'center', fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '17px', color: '#0E2430' })}>{m.goalXp}</div>
          </div>
          <div style={sx({ minWidth: '0' })}>
            <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '19px', lineHeight: '1.15', color: '#0E2430' })}>{m.goalXp}<span style={sx({ fontSize: '13px', color: '#5C7080' })}> / {m.goalTarget} XP</span></div>
            <div style={sx({ font: '800 11px Nunito', color: '#007AB0' })}>{m.goalLeftLabel}</div>
          </div>
        </div>
        <div style={sx({ display: 'flex', gap: '4px', marginBottom: '12px' })}>
          {m.goalPips.map((p, pI) => (
            <div key={pI} onClick={p.tap} style={sx({ flex: '1', height: '10px', borderRadius: '6px', background: p.bg, cursor: 'pointer', transition: 'background .25s' })} />
          ))}
        </div>
        <div style={sx({ display: 'flex', gap: '5px', marginBottom: '11px' })}>
          {m.goalModes.map((m, mI) => (
            <button className="ho3" key={mI} onClick={m.tap} style={sx({ flex: '1', padding: '7px 4px', borderRadius: '11px', cursor: 'pointer', background: m.bg, border: `2px solid ${m.bd}`, color: m.fg, font: '900 9.5px Nunito', letterSpacing: '.5px', textTransform: 'uppercase' })}>{m.label}</button>
          ))}
        </div>
        <button className="ac4 ho5" onClick={m.addXp} style={sx({ width: '100%', padding: '11px', borderRadius: '14px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #007AB0', background: '#009ADA', color: '#fff', font: '900 11px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px' })}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>{m.goalBtnLabel}</button>
      </div>
    </aside>
  )
}
