import { useTheme } from '../theme.jsx'

export default function Flashcards({ m }) {
  const { sx, cf } = useTheme()

  return (
    <div style={sx({ height: '100vh', display: 'flex', flexDirection: 'column', background: '#F7FAFC' })}>
      <div style={sx({ flex: 'none', padding: '18px 26px', display: 'flex', alignItems: 'center', gap: '16px' })}>
        <button className="ho1" onClick={m.goVocab} style={sx({ width: '40px', height: '40px', flex: 'none', borderRadius: '13px', border: '2px solid #E6EEF3', background: '#fff', color: '#93A3AE', font: '900 16px Nunito', cursor: 'pointer' })}>✕</button>
        <div style={sx({ flex: '1', height: '18px', borderRadius: '12px', background: '#E6EEF3', padding: '3px' })}>
          <div style={sx({ height: '100%', width: `${m.cardPct}%`, borderRadius: '9px', background: 'linear-gradient(90deg,#FFD84D,#FFC800)', transition: 'width .35s' })} />
        </div>
        <div style={sx({ font: '900 14px Nunito', color: '#7B8B96' })}>{m.cardCounter}</div>
        <div style={sx({ padding: '9px 15px', borderRadius: '999px', background: '#F1FAE6', border: '2px solid #CFEBA8', font: '900 14px Nunito', color: '#3F8C06' })}>{m.cardKnownCount} known</div>
      </div>
      <div style={sx({ flex: '1', minHeight: '0', display: 'grid', placeItems: 'center', padding: '20px 26px' })}>
        <div className="ho16" onClick={m.flipCard} style={sx({ width: '560px', maxWidth: '100%', minHeight: '280px', borderRadius: '28px', background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '7px', padding: '34px', display: 'grid', placeItems: 'center', textAlign: 'center', cursor: 'pointer', animation: 'pop .25s ease-out' })}>
          {m.cardFlipped && (
            <div>
              <div style={sx({ font: '800 11px Nunito', letterSpacing: '1.2px', textTransform: 'uppercase', color: '#93A3AE', marginBottom: '12px' })}>Definition</div>
              <div style={sx({ font: '700 24px/1.5 Nunito', color: '#22313B' })}>{m.card.def}</div>
              <div style={sx({ font: '800 15px Nunito', color: '#009ADA', marginTop: '18px' })}>{m.card.word}</div>
            </div>
          )}
          {m.cardNotFlipped && (
            <div>
              <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '46px', lineHeight: '1.1' })}>{m.card.word}</div>
              <div style={sx({ font: '800 12px Nunito', letterSpacing: '1px', textTransform: 'uppercase', color: '#93A3AE', marginTop: '14px' })}>Tap the card to flip</div>
            </div>
          )}
        </div>
      </div>
      <div style={sx({ flex: 'none', padding: '20px 26px', display: 'flex', justifyContent: 'center' })}>
        <div style={sx({ width: '560px', maxWidth: '100%', display: 'flex', gap: '12px' })}>
          <button className="ac17" onClick={m.cardRepeat} style={sx({ flex: '1', padding: '17px', borderRadius: '18px', borderWidth: '0', borderStyle: 'none', borderBottom: '5px solid #D93A3A', background: '#FF4B4B', color: '#fff', font: '900 13px Nunito', letterSpacing: '.9px', textTransform: 'uppercase', cursor: 'pointer' })}>Repeat later</button>
          <button className="ac17" onClick={m.cardKnow} style={sx({ flex: '1', padding: '17px', borderRadius: '18px', borderWidth: '0', borderStyle: 'none', borderBottom: '5px solid #46A302', background: '#58CC02', color: '#fff', font: '900 13px Nunito', letterSpacing: '.9px', textTransform: 'uppercase', cursor: 'pointer' })}>I know it</button>
        </div>
      </div>
    </div>
  )
}
