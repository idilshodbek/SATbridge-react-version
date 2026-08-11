import { useTheme } from '../theme.jsx'

export default function ScoreReport({ m }) {
  const { sx, cf } = useTheme()

  return (
    <div style={sx({ padding: '26px 30px 60px', maxWidth: '900px' })}>
      <div style={sx({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap', marginBottom: '18px' })}>
        <div>
          <div style={sx({ font: '800 13px Nunito', letterSpacing: '1.1px', textTransform: 'uppercase', color: '#93A3AE' })}>Share view</div>
          <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '34px', lineHeight: '1.1' })}>Weekly report · week 7</div>
        </div>
        <div style={sx({ display: 'flex', gap: '9px', flexWrap: 'wrap' })}>
          <button className="ac4" style={sx({ padding: '13px 20px', borderRadius: '15px', borderWidth: '0', borderStyle: 'none', borderBottom: '4px solid #007AB0', background: '#009ADA', color: '#fff', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Email report</button>
          <button className="ho1" onClick={m.goRes} style={sx({ padding: '13px 20px', borderRadius: '15px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '4px', background: '#fff', color: '#54646F', font: '900 12px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', cursor: 'pointer' })}>Back to results</button>
        </div>
      </div>
      <div style={sx({ background: '#fff', borderWidth: '2px', borderStyle: 'solid', borderColor: '#E6EEF3', borderBottomWidth: '5px', borderRadius: '26px', padding: '26px' })}>
        <div style={sx({ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '20px', borderBottom: '2px solid #EEF3F7', marginBottom: '20px', flexWrap: 'wrap' })}>
          <div style={sx({ width: '60px', height: '60px', borderRadius: '20px', background: '#009ADA', display: 'grid', placeItems: 'center', font: '900 20px Nunito', color: '#fff' })}>SJ</div>
          <div style={sx({ flex: '1', minWidth: '180px' })}>
            <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '24px', lineHeight: '1.15' })}>Sukhrob Jamolov</div>
            <div style={sx({ font: '700 14px Nunito', color: '#7B8B96' })}>Target 1550 · Harvard · exam 3 Oct 2026</div>
          </div>
          <div style={sx({ textAlign: 'right' })}>
            <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '30px', color: '#009ADA' })}>1180</div>
            <div style={sx({ font: '800 11px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', color: '#93A3AE' })}>Latest mock</div>
          </div>
        </div>
        <div style={sx({ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '14px', marginBottom: '22px' })}>
          <div style={sx({ padding: '16px', borderRadius: '18px', background: '#F8FBFD', border: '2px solid #EEF3F7' })}>
            <div style={sx({ font: '800 11px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', color: '#93A3AE' })}>Study time</div>
            <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '26px' })}>4h 20m</div>
            <div style={sx({ font: '700 12px Nunito', color: '#7B8B96' })}>of 6h planned</div>
          </div>
          <div style={sx({ padding: '16px', borderRadius: '18px', background: '#F8FBFD', border: '2px solid #EEF3F7' })}>
            <div style={sx({ font: '800 11px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', color: '#93A3AE' })}>Lessons</div>
            <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '26px' })}>11</div>
            <div style={sx({ font: '700 12px Nunito', color: '#7B8B96' })}>4 drills, 1 mock</div>
          </div>
          <div style={sx({ padding: '16px', borderRadius: '18px', background: '#F8FBFD', border: '2px solid #EEF3F7' })}>
            <div style={sx({ font: '800 11px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', color: '#93A3AE' })}>Accuracy</div>
            <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '26px', color: '#58CC02' })}>72%</div>
            <div style={sx({ font: '700 12px Nunito', color: '#7B8B96' })}>up 9 points</div>
          </div>
          <div style={sx({ padding: '16px', borderRadius: '18px', background: '#F8FBFD', border: '2px solid #EEF3F7' })}>
            <div style={sx({ font: '800 11px Nunito', letterSpacing: '.8px', textTransform: 'uppercase', color: '#93A3AE' })}>Attendance</div>
            <div style={sx({ fontFamily: '\'Baloo 2\',Nunito,sans-serif', fontWeight: '800', fontSize: '26px', color: '#FF9600' })}>7 / 7</div>
            <div style={sx({ font: '700 12px Nunito', color: '#7B8B96' })}>days active</div>
          </div>
        </div>
        <div style={sx({ font: '800 13px Nunito', textTransform: 'uppercase', letterSpacing: '.9px', color: '#93A3AE', marginBottom: '12px' })}>Progress this week</div>
        <div style={sx({ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '22px' })}>
          {m.radarBars.map((s, sI) => (
            <div key={sI}>
              <div style={sx({ display: 'flex', justifyContent: 'space-between', font: '800 14px Nunito', marginBottom: '5px' })}>
                <span>{s.name}</span>
                <span style={sx({ color: s.pctColor })}>{s.pct}%</span>
              </div>
              <div style={sx({ height: '12px', borderRadius: '8px', background: '#EFF4F7' })}>
                <div style={sx({ height: '100%', width: `${s.pct}%`, borderRadius: '8px', background: s.color })} />
              </div>
            </div>
          ))}
        </div>
        <div style={sx({ padding: '18px', borderRadius: '20px', background: '#E9F7FD', border: '2px solid #C2E7F7' })}>
          <div style={sx({ font: '800 12px Nunito', letterSpacing: '.9px', textTransform: 'uppercase', color: '#007AB0', marginBottom: '7px' })}>Coach note</div>
          <div style={sx({ font: '700 15px/1.6 Nunito', color: '#245A73' })}>Sukhrob is on pace for roughly 1420 by exam day. Math is strong; the fastest gain left is vocabulary in context and slowing down on easy questions.</div>
        </div>
      </div>
    </div>
  )
}
