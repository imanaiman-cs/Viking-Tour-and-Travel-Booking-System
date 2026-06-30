// Admin — Dashboard page

function AdminDashboard(){
  return (
    <AdminShell active="dashboard"
      breadcrumb="OVERVIEW · TODAY 21 MAY 2026"
      title="Good morning, Ahmad. Here's the week ahead."
      subtitle="12 new bookings overnight, RM 32,480 in revenue, and one refund needs your attention.">

      <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:16, marginBottom:24}}>
        <Stat label="REVENUE (MTD)"  value="RM 286,420" delta="+12.4%" trend="up" sub="vs last month"/>
        <Stat label="BOOKINGS"        value="1,284"      delta="+8.2%"  trend="up" sub="487 this month"/>
        <Stat label="ACTIVE CUSTOMERS" value="6,142"     delta="+3.1%"  trend="up" sub="3,802 returning"/>
        <Stat label="AVG. RATING"     value="4.86"       delta="+0.04"  trend="up" sub="of 5.00 stars"/>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:16, marginBottom:24}}>
        <RevenueChart/>
        <UpcomingBookings/>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:16, marginBottom:24}}>
        <CalendarCard/>
        <TopPackages/>
        <ActivityFeed/>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
        <BookingsTablePreview/>
        <CustomerBreakdown/>
      </div>
    </AdminShell>
  );
}

function Stat({label, value, delta, trend, sub}){
  return (
    <div style={{
      padding:'22px 22px',
      background:'#fff', border:'1px solid var(--line)', borderRadius:16,
      position:'relative', overflow:'hidden',
    }}>
      <div className="kicker">{label}</div>
      <div style={{fontFamily:'var(--f-display)', fontSize:38, color:'var(--navy-900)', marginTop:8, lineHeight:1, letterSpacing:'-0.01em'}}>{value}</div>
      <div style={{display:'flex', alignItems:'center', gap:8, marginTop:8}}>
        <span style={{padding:'3px 9px', background: trend==='up' ? 'rgba(31,138,91,.10)' : 'var(--coral-soft)', color: trend==='up' ? 'var(--jade)' : 'var(--coral)', borderRadius:99, fontSize:11.5, fontWeight:600}}>
          {trend==='up' ? '↑' : '↓'} {delta}
        </span>
        <span style={{fontSize:11.5, color:'var(--ink-400)'}}>{sub}</span>
      </div>
      <Sparkline up={trend==='up'}/>
    </div>
  );
}

function Sparkline({up}){
  const pts = up ? [12,16,11,18,15,22,20,28,24,32] : [30,26,28,22,24,18,20,14,16,10];
  const path = pts.map((y,i)=> `${(i/(pts.length-1))*100},${40-y}`).join(' ');
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" style={{position:'absolute', right:18, top:18, width:90, height:38, opacity:.9}}>
      <polyline points={path} fill="none" stroke={up ? 'var(--jade)' : 'var(--coral)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points={`0,40 ${path} 100,40`} fill={up ? 'rgba(31,138,91,.10)' : 'rgba(232,99,58,.10)'}/>
    </svg>
  );
}

function RevenueChart(){
  // 12 months of fake-but-realistic revenue (RM '000)
  const data = [
    {m:'Jun', r:148, b:62}, {m:'Jul', r:172, b:74}, {m:'Aug', r:218, b:92},
    {m:'Sep', r:186, b:80}, {m:'Oct', r:204, b:88}, {m:'Nov', r:232, b:96},
    {m:'Dec', r:294, b:124},{m:'Jan', r:248, b:104},{m:'Feb', r:212, b:90},
    {m:'Mar', r:236, b:98}, {m:'Apr', r:268, b:112},{m:'May', r:286, b:118},
  ];
  const max = Math.max(...data.map(d=>d.r));
  const maxB = Math.max(...data.map(d=>d.b));
  return (
    <div style={{padding:'22px 24px', background:'#fff', border:'1px solid var(--line)', borderRadius:16}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'start', marginBottom:18}}>
        <div>
          <div className="kicker">REVENUE & BOOKINGS · LAST 12 MONTHS</div>
          <div style={{fontFamily:'var(--f-display)', fontSize:28, color:'var(--navy-800)', marginTop:6}}>RM 2.84M total</div>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:14, fontSize:12}}>
          <span style={{display:'inline-flex', alignItems:'center', gap:6}}><span style={{width:9, height:9, borderRadius:9, background:'var(--blue-500)'}}/>Revenue (RM '000)</span>
          <span style={{display:'inline-flex', alignItems:'center', gap:6}}><span style={{width:9, height:9, borderRadius:9, background:'var(--coral)'}}/>Bookings</span>
          <select style={{padding:'7px 11px', fontFamily:'inherit', fontSize:12, background:'var(--paper)', border:'1px solid var(--line)', borderRadius:8}}>
            <option>Last 12 months</option><option>YTD</option><option>QTD</option>
          </select>
        </div>
      </div>
      <div style={{position:'relative', height:260}}>
        <svg viewBox="0 0 720 260" preserveAspectRatio="none" style={{width:'100%', height:'100%'}}>
          {[0.25,0.5,0.75,1].map((p,i)=>(
            <g key={i}>
              <line x1="40" x2="710" y1={220-p*190-10} y2={220-p*190-10} stroke="var(--line-2)" strokeDasharray="3 4"/>
              <text x="34" y={220-p*190-7} textAnchor="end" fontSize="10" fill="var(--ink-400)" fontFamily="var(--f-mono)">{Math.round(p*max)}</text>
            </g>
          ))}
          {/* Bars */}
          {data.map((d,i)=>{
            const x = 50 + i*55;
            const h = (d.r / max) * 190;
            const bh = (d.b / maxB) * 190 * 0.6;
            return (
              <g key={i}>
                <rect x={x} y={210-h} width="22" height={h} rx="4" fill="var(--blue-500)" opacity={i===data.length-1 ? 1 : .85}/>
                <rect x={x+24} y={210-bh} width="14" height={bh} rx="3" fill="var(--coral)" opacity=".9"/>
                <text x={x+18} y="248" textAnchor="middle" fontSize="10" fill="var(--ink-400)" fontFamily="var(--f-mono)">{d.m}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function UpcomingBookings(){
  const items = [
    {n:'Nur Aisyah Rahman', pkg:'Langkawi 4D3N',     d:'22 May · 06:50',  pax:2, status:'today',    img:'ph-langkawi'},
    {n:'Daniel Lee',        pkg:'Cameron 3D2N',      d:'24 May · 08:30',  pax:4, status:'tomorrow', img:'ph-cameron'},
    {n:'Siti Khadijah',     pkg:'Kundasang 5D4N',    d:'26 May · 07:15',  pax:6, status:'in 5d',    img:'ph-kundasang'},
    {n:'Ahmad Firdaus',     pkg:'Redang 4D3N',       d:'27 May · 09:00',  pax:2, status:'in 6d',    img:'ph-redang'},
    {n:'Muhammad Amir',     pkg:'Penang 3D2N',       d:'28 May · 06:30',  pax:3, status:'in 7d',    img:'ph-penang'},
  ];
  const sc = {today:'var(--coral)', tomorrow:'var(--gold)', 'in 5d':'var(--blue-500)', 'in 6d':'var(--blue-500)', 'in 7d':'var(--blue-500)'};
  return (
    <div style={{padding:'22px 22px', background:'#fff', border:'1px solid var(--line)', borderRadius:16}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'start', marginBottom:14}}>
        <div>
          <div className="kicker">UPCOMING · 7 DAYS</div>
          <div style={{fontFamily:'var(--f-display)', fontSize:22, color:'var(--navy-800)', marginTop:6}}>5 departures</div>
        </div>
        <button style={{background:'none', border:0, color:'var(--blue-600)', fontSize:12, fontWeight:500, cursor:'pointer'}}>View all →</button>
      </div>
      <div style={{display:'flex', flexDirection:'column', gap:10}}>
        {items.map((b,i)=>(
          <div key={i} style={{display:'grid', gridTemplateColumns:'auto 1fr auto', gap:12, alignItems:'center', padding:'8px 0', borderBottom:'1px solid var(--line-2)'}}>
            <div className={`ph ${b.img}`} style={{width:38, height:38, borderRadius:8}}/>
            <div>
              <div style={{fontSize:13, fontWeight:600, color:'var(--ink-900)'}}>{b.n}</div>
              <div style={{fontSize:11.5, color:'var(--ink-400)', display:'flex', gap:8}}>
                <span>{b.pkg}</span><span>·</span><span>{b.d}</span><span>·</span><span>{b.pax}pax</span>
              </div>
            </div>
            <span style={{padding:'3px 9px', background:sc[b.status]+'1a', color:sc[b.status], fontSize:10.5, fontWeight:600, borderRadius:99}}>{b.status.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CalendarCard(){
  const days = ['M','T','W','T','F','S','S'];
  const today = 21; // May 21, 2026 is Thursday → adjust offset
  const cells = [];
  const startOffset = 4; // arbitrary visual offset (Fri=5)
  for (let i=0;i<35;i++){
    const d = i - startOffset + 1;
    if (d<1 || d>31){ cells.push(null); continue; }
    const events = [22,24,26,27,28].includes(d);
    const heavy  = [27,28].includes(d);
    cells.push({d, today: d===today, events, heavy});
  }
  return (
    <div style={{padding:'22px 22px', background:'#fff', border:'1px solid var(--line)', borderRadius:16}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:14}}>
        <div>
          <div className="kicker">CALENDAR</div>
          <div style={{fontFamily:'var(--f-display)', fontSize:24, color:'var(--navy-800)', marginTop:6}}>May 2026</div>
        </div>
        <div style={{display:'flex', gap:6}}>
          <button style={{...iconBtn, width:30, height:30}}><Icon name="arrow-l" size={14}/></button>
          <button style={{...iconBtn, width:30, height:30}}><Icon name="arrow-r" size={14}/></button>
        </div>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(7, 1fr)', gap:4}}>
        {days.map((d,i)=> <div key={i} className="kicker" style={{textAlign:'center', padding:'4px 0'}}>{d}</div>)}
        {cells.map((c,i)=>(
          <div key={i} style={{
            aspectRatio:'1', display:'grid', placeItems:'center',
            position:'relative', fontSize:13, fontWeight: c?.today?700:500,
            color: !c ? 'var(--ink-300)' : c.today ? '#fff' : 'var(--ink-700)',
            background: c?.today ? 'var(--navy-800)' : c?.heavy ? 'var(--coral-soft)' : c?.events ? 'var(--blue-50)' : 'transparent',
            borderRadius:8, cursor: c ? 'pointer' : 'default',
          }}>
            {c?.d}
            {c?.events && !c.today && <span style={{position:'absolute', bottom:4, width:4, height:4, borderRadius:4, background: c.heavy ? 'var(--coral)' : 'var(--blue-500)'}}/>}
          </div>
        ))}
      </div>
      <div style={{display:'flex', gap:16, marginTop:14, fontSize:11, color:'var(--ink-500)'}}>
        <span style={{display:'flex', alignItems:'center', gap:6}}><span style={{width:8, height:8, borderRadius:8, background:'var(--blue-500)'}}/>Bookings</span>
        <span style={{display:'flex', alignItems:'center', gap:6}}><span style={{width:8, height:8, borderRadius:8, background:'var(--coral)'}}/>Heavy day</span>
        <span style={{display:'flex', alignItems:'center', gap:6}}><span style={{width:8, height:8, borderRadius:8, background:'var(--navy-800)'}}/>Today</span>
      </div>
    </div>
  );
}

function TopPackages(){
  const items = [
    {n:'Langkawi 4D3N',   v:'RM 86,200', p:.92, c:'var(--blue-500)'},
    {n:'Kundasang 5D4N',  v:'RM 64,800', p:.74, c:'var(--blue-500)'},
    {n:'Cameron 3D2N',    v:'RM 42,400', p:.52, c:'var(--blue-500)'},
    {n:'Redang 4D3N',     v:'RM 38,920', p:.46, c:'var(--blue-500)'},
    {n:'Penang 3D2N',     v:'RM 28,100', p:.34, c:'var(--blue-500)'},
  ];
  return (
    <div style={{padding:'22px 22px', background:'#fff', border:'1px solid var(--line)', borderRadius:16}}>
      <div className="kicker">TOP PACKAGES · MTD</div>
      <div style={{fontFamily:'var(--f-display)', fontSize:22, color:'var(--navy-800)', marginTop:6, marginBottom:14}}>By revenue</div>
      <div style={{display:'flex', flexDirection:'column', gap:12}}>
        {items.map((p,i)=>(
          <div key={i}>
            <div style={{display:'flex', justifyContent:'space-between', fontSize:12.5, marginBottom:5}}>
              <span style={{color:'var(--ink-700)', fontWeight:500}}>{p.n}</span>
              <span className="mono" style={{color:'var(--ink-500)'}}>{p.v}</span>
            </div>
            <div style={{height:6, background:'var(--line-2)', borderRadius:6, overflow:'hidden'}}>
              <div style={{height:'100%', width:`${p.p*100}%`, background:p.c, borderRadius:6}}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityFeed(){
  const items = [
    {who:'Nur Aisyah',     v:'booked Langkawi 4D3N', t:'2m', c:'var(--blue-500)'},
    {who:'Daniel Lee',     v:'paid RM 3,776',         t:'8m', c:'var(--jade)'},
    {who:'Siti Khadijah',  v:'left a 5★ review',      t:'24m',c:'var(--gold)'},
    {who:'Muhammad Amir',  v:'requested refund',     t:'1h', c:'var(--coral)'},
    {who:'Ahmad Firdaus',  v:'updated promo MERDEKA32',t:'2h',c:'var(--ink-400)'},
  ];
  return (
    <div style={{padding:'22px 22px', background:'#fff', border:'1px solid var(--line)', borderRadius:16}}>
      <div className="kicker">ACTIVITY · LIVE</div>
      <div style={{fontFamily:'var(--f-display)', fontSize:22, color:'var(--navy-800)', marginTop:6, marginBottom:14}}>What's happening</div>
      <div style={{display:'flex', flexDirection:'column', gap:0}}>
        {items.map((a,i)=>(
          <div key={i} style={{display:'grid', gridTemplateColumns:'8px 1fr auto', gap:12, padding:'8px 0', borderBottom: i<items.length-1 ? '1px solid var(--line-2)' : 'none'}}>
            <span style={{width:8, height:8, marginTop:6, borderRadius:8, background:a.c}}/>
            <div style={{fontSize:13, color:'var(--ink-700)'}}><strong style={{fontWeight:600}}>{a.who}</strong> {a.v}</div>
            <div className="mono" style={{fontSize:11, color:'var(--ink-400)'}}>{a.t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BookingsTablePreview(){
  const rows = [
    {ref:'VK-26-04218', n:'Nur Aisyah Rahman',  pkg:'Langkawi 4D3N',     amt:2716, s:'Confirmed', p:'Paid'},
    {ref:'VK-26-04217', n:'Daniel Lee',         pkg:'Cameron 3D2N',      amt:3776, s:'Confirmed', p:'Paid'},
    {ref:'VK-26-04216', n:'Siti Khadijah',      pkg:'Kundasang 5D4N',    amt:12960,s:'Pending',   p:'Deposit'},
    {ref:'VK-26-04215', n:'Muhammad Amir',      pkg:'Redang 4D3N',       amt:3478, s:'Refund',    p:'Refunding'},
    {ref:'VK-26-04214', n:'Ahmad Firdaus',      pkg:'Penang 3D2N',       amt:1526, s:'Confirmed', p:'Paid'},
  ];
  const sc = {Confirmed:{fg:'var(--jade)', bg:'rgba(31,138,91,.10)'}, Pending:{fg:'var(--coral)', bg:'var(--coral-soft)'}, Refund:{fg:'var(--rose)', bg:'rgba(200,83,110,.10)'}};
  return (
    <div style={{padding:'22px 22px', background:'#fff', border:'1px solid var(--line)', borderRadius:16}}>
      <div style={{display:'flex', justifyContent:'space-between', marginBottom:14}}>
        <div>
          <div className="kicker">RECENT BOOKINGS</div>
          <div style={{fontFamily:'var(--f-display)', fontSize:22, color:'var(--navy-800)', marginTop:6}}>Latest 5</div>
        </div>
        <a href="#/reservations" onClick={(e)=>{e.preventDefault(); window.location.hash='#/reservations';}} style={{fontSize:12, color:'var(--blue-600)', fontWeight:500, alignSelf:'center'}}>Manage →</a>
      </div>
      <table style={{width:'100%', borderCollapse:'collapse', fontSize:13}}>
        <thead>
          <tr style={{textAlign:'left'}}>
            {['Ref','Customer','Package','Amount','Status'].map(h=>(
              <th key={h} className="kicker" style={{padding:'8px 6px', borderBottom:'1px solid var(--line-2)', fontWeight:500}}>{h.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i} style={{borderBottom:'1px solid var(--line-2)'}}>
              <td className="mono" style={{padding:'10px 6px', fontSize:11.5, color:'var(--ink-500)'}}>{r.ref}</td>
              <td style={{padding:'10px 6px', fontWeight:500}}>{r.n}</td>
              <td style={{padding:'10px 6px', color:'var(--ink-500)'}}>{r.pkg}</td>
              <td className="mono" style={{padding:'10px 6px'}}>RM {r.amt.toLocaleString()}</td>
              <td style={{padding:'10px 6px'}}>
                <span style={{padding:'2px 9px', background:sc[r.s].bg, color:sc[r.s].fg, fontSize:11, fontWeight:600, borderRadius:99}}>{r.s}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CustomerBreakdown(){
  return (
    <div style={{padding:'22px 22px', background:'#fff', border:'1px solid var(--line)', borderRadius:16}}>
      <div className="kicker">CUSTOMER MIX · LAST 90 DAYS</div>
      <div style={{fontFamily:'var(--f-display)', fontSize:22, color:'var(--navy-800)', marginTop:6, marginBottom:18}}>Where they're from</div>
      <div style={{display:'grid', gridTemplateColumns:'120px 1fr', gap:24, alignItems:'center'}}>
        <svg viewBox="0 0 120 120" width="120" height="120">
          <circle cx="60" cy="60" r="48" stroke="var(--line-2)" strokeWidth="20" fill="none"/>
          <circle cx="60" cy="60" r="48" stroke="var(--blue-500)"  strokeWidth="20" fill="none" strokeDasharray="160 302" transform="rotate(-90 60 60)"/>
          <circle cx="60" cy="60" r="48" stroke="var(--coral)"     strokeWidth="20" fill="none" strokeDasharray="60 302"  strokeDashoffset="-160" transform="rotate(-90 60 60)"/>
          <circle cx="60" cy="60" r="48" stroke="var(--gold)"      strokeWidth="20" fill="none" strokeDasharray="42 302"  strokeDashoffset="-220" transform="rotate(-90 60 60)"/>
          <circle cx="60" cy="60" r="48" stroke="var(--jade)"      strokeWidth="20" fill="none" strokeDasharray="40 302"  strokeDashoffset="-262" transform="rotate(-90 60 60)"/>
          <text x="60" y="58" textAnchor="middle" fontFamily="var(--f-display)" fontSize="22" fill="var(--navy-800)">6.1K</text>
          <text x="60" y="74" textAnchor="middle" fontFamily="var(--f-mono)" fontSize="9" fill="var(--ink-400)">CUSTOMERS</text>
        </svg>
        <div style={{display:'flex', flexDirection:'column', gap:9}}>
          {[
            {l:'Klang Valley',    v:'53%', c:'var(--blue-500)'},
            {l:'Penang & North',  v:'20%', c:'var(--coral)'},
            {l:'Johor & South',   v:'14%', c:'var(--gold)'},
            {l:'East Malaysia',   v:'13%', c:'var(--jade)'},
          ].map((r,i)=>(
            <div key={i} style={{display:'flex', alignItems:'center', gap:10, fontSize:12.5}}>
              <span style={{width:9, height:9, borderRadius:9, background:r.c}}/>
              <span style={{flex:1, color:'var(--ink-700)'}}>{r.l}</span>
              <span className="mono" style={{color:'var(--ink-500)', fontWeight:600}}>{r.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AdminDashboard });
