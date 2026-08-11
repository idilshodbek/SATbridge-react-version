import { useTheme } from '../theme.jsx'

export default function ThemePicker({ m }) {
  const { sx, cf } = useTheme()

  return (
    <div style={sx({ position: 'fixed', right: '18px', bottom: '18px', zIndex: '70', display: 'flex', alignItems: 'center', gap: '10px' })}>
      {m.themeOpen && (
        <div style={sx({ display: 'flex', alignItems: 'center', gap: '9px', padding: '11px 14px', borderRadius: '18px', background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', animation: 'slidein .18s ease-out' })}>
          <span style={sx({ font: '900 10px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', color: '#93A3AE' })}>Primary</span>
          {m.themeSwatches.map((s, sI) => (
            <button className="ho23" key={sI} onClick={s.tap} title={s.name} style={sx({ width: '28px', height: '28px', borderRadius: '50%', border: 'none', cursor: 'pointer', background: s.hex, boxShadow: s.ring })} />
          ))}
          <span style={sx({ width: '2px', height: '24px', background: '#E6EEF3' })} />
          <button className="ho24" onClick={m.toggleDark} style={sx({ display: 'flex', alignItems: 'center', gap: '7px', padding: '8px 12px', borderRadius: '12px', border: '2px solid #E6EEF3', background: '#F1F6FA', color: '#54646F', font: '900 10px Nunito', letterSpacing: '.7px', textTransform: 'uppercase', cursor: 'pointer' })}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
          </svg>{m.darkLabel}</button>
        </div>
      )}
      <button className="ac4" onClick={m.toggleTheme} title="Change primary color" style={sx({ width: '50px', height: '50px', flex: 'none', borderRadius: '17px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #007AB0', background: '#009ADA', cursor: 'pointer', display: 'grid', placeItems: 'center' })}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={cf('#fff')} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.4 0 2-.9 2-1.8s-.7-1.7-.7-2.5c0-.9.7-1.5 1.7-1.5h1.6c2 0 3.4-1.4 3.4-3.6C20 6.6 16.4 3.5 12 3.5Z" />
          <circle cx="8.4" cy="9.4" r="1.2" fill={cf('#fff')} stroke="none" />
          <circle cx="12" cy="7.6" r="1.2" fill={cf('#fff')} stroke="none" />
          <circle cx="15.6" cy="9.4" r="1.2" fill={cf('#fff')} stroke="none" />
        </svg>
      </button>
    </div>
  )
}
