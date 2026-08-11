import { useTheme } from '../theme.jsx'

export default function Leaderboard({ m }) {
  const { sx, cf } = useTheme()

  return (
    <div style={sx({ padding: '26px 30px 60px', maxWidth: '1200px' })}>
      <div style={sx({ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '18px', flexWrap: 'wrap', marginBottom: '20px' })}>
        <div>
          <div style={sx({ font: '800 13px Nunito', letterSpacing: '1.1px', textTransform: 'uppercase', color: '#93A3AE' })}>Leaderboard</div>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '36px', lineHeight: '1.1' })}>Sapphire league</div>
          <div style={sx({ font: '700 15px Nunito', color: '#7B8B96', marginTop: '2px' })}>Top 3 move up to Ruby · bottom 2 drop · 4 days left</div>
        </div>
        <div style={sx({ display: 'flex', gap: '6px', padding: '5px', background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', borderRadius: '16px' })}>
          {m.lbTabs.map((t, tI) => (
            <button key={tI} onClick={t.tap} style={sx({ padding: '11px 18px', borderRadius: '12px', border: 'none', cursor: 'pointer', background: t.bg, color: t.fg, boxShadow: t.sh, font: '900 12px Nunito', letterSpacing: '.7px', textTransform: 'uppercase', transition: 'background .18s' })}>{t.label}</button>
          ))}
        </div>
      </div>
      <div style={sx({ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '14px', marginBottom: '26px', flexWrap: 'wrap' })}>
        {m.podium.map((p, pI) => (
          <div key={pI} style={sx({ flex: '1 1 150px', maxWidth: '190px', background: p.bg, borderWidth: '2px', borderStyle: 'solid', borderColor: p.bd, borderBottomWidth: '6px', borderRadius: '22px', padding: '18px', textAlign: 'center', height: `${p.h}px`, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '6px' })}>
            <div style={sx({ font: '900 24px Nunito' })}>{p.medal}</div>
            <div style={sx({ width: '46px', height: '46px', margin: '0 auto', borderRadius: '50%', background: p.av, display: 'grid', placeItems: 'center', font: '900 15px Nunito', color: '#fff' })}>{p.ini}</div>
            <div style={sx({ font: '800 16px Nunito' })}>{p.name}</div>
            <div style={sx({ font: '900 14px Nunito', color: '#009ADA' })}>{p.xp} XP</div>
          </div>
        ))}
      </div>
      <div style={sx({ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' })}>
        <div style={sx({ flex: '1 1 520px', minWidth: '0', background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '24px', padding: '18px' })}>
          <div style={sx({ display: 'flex', flexDirection: 'column', gap: '8px' })}>
            {m.lbRows.map((r, rI) => (
              <div className="ho16" key={rI} style={sx({ display: 'flex', alignItems: 'center', gap: '13px', padding: '12px 14px', borderRadius: '18px', background: r.bg, border: `2px solid ${r.bd}` })}>
                <div style={sx({ width: '30px', font: '900 17px Nunito', color: r.rankColor, textAlign: 'center' })}>{r.rank}</div>
                <div style={sx({ width: '42px', height: '42px', flex: 'none', borderRadius: '50%', background: r.av, display: 'grid', placeItems: 'center', font: '900 14px Nunito', color: '#fff' })}>{r.ini}</div>
                <div style={sx({ flex: '1', minWidth: '0' })}>
                  <div style={sx({ font: '800 16px Nunito', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' })}>{r.name}</div>
                  <div style={sx({ font: '700 12px Nunito', color: '#93A3AE' })}>{r.country}</div>
                </div>
                {r.zoneLabel && (
                  <div style={sx({ padding: '5px 11px', borderRadius: '9px', background: r.zoneBg, color: r.zoneFg, font: '900 10px Nunito', letterSpacing: '.8px', textTransform: 'uppercase' })}>{r.zoneLabel}</div>
                )}
                <div style={sx({ font: '900 12px Nunito', color: r.deltaColor, width: '32px', textAlign: 'right' })}>{r.delta}</div>
                <div style={sx({ font: '900 16px Nunito', color: '#009ADA', width: '66px', textAlign: 'right' })}>{r.xp}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={sx({ width: '330px', flex: '1 1 290px', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '16px' })}>
          <div style={sx({ background: '#009ADA', borderBottom: '6px solid #007AB0', borderRadius: '22px', padding: '20px', color: '#fff' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', opacity: '.8', marginBottom: '6px' })}>Your position</div>
            <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '40px', lineHeight: '1' })}>#3</div>
            <div style={sx({ font: '700 14px Nunito', opacity: '.85', margin: '2px 0 14px' })}>370 XP behind 2nd · 135 XP ahead of 4th</div>
            <button className="ac4" onClick={m.goPath} style={sx({ width: '100%', padding: '13px', borderRadius: '15px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #DDE6EC', background: '#fff', color: '#007AB0', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Earn XP now</button>
          </div>
          <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE', marginBottom: '12px' })}>XP this week</div>
            <div style={sx({ display: 'flex', alignItems: 'flex-end', gap: '7px', height: '104px' })}>
              {m.pace.map((p, pI) => (
                <div key={pI} style={sx({ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' })}>
                  <div title={p.title} style={sx({ width: '100%', height: `${p.h}%`, borderRadius: '9px 9px 4px 4px', background: '#009ADA', opacity: '.85' })} />
                  <div style={sx({ font: '800 10px Nunito', color: '#93A3AE', letterSpacing: '.4px' })}>{p.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={sx({ background: '#FFF7E3', borderWidth: '2px', borderStyle: 'solid', borderColor: '#FFE3A3', borderBottomWidth: '5px', borderRadius: '22px', padding: '20px' })}>
            <div style={sx({ font: '800 12px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#B07A16', marginBottom: '8px' })}>League reward</div>
            <div style={sx({ font: '800 16px Nunito', marginBottom: '4px' })}>Finish top 3 → Ruby league</div>
            <div style={sx({ font: '700 13px Nunito', color: '#8C7A55' })}>Unlocks 2 extra mock exams and a streak freeze.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
