// Admin — Customers management page

function useCustomers() {
  const [data, setData]       = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetch('/api/customers.php')
      .then(r => r.json())
      .then(rows => {
        if (Array.isArray(rows)) {
          setData(rows.map(c => ({
            ...c,
            n:        `${c.first_name} ${c.last_name}`,
            ic:       c.ic,
            ph:       c.phone || '—',
            em:       c.email,
            city:     c.city || '—',
            joined:   c.created_at ? new Date(c.created_at).toLocaleDateString('en-MY', {month:'short', year:'numeric'}) : '—',
            last:     c.last_booking ? new Date(c.last_booking).toLocaleDateString('en-MY', {day:'2-digit',month:'short',year:'numeric'}) : 'Never',
            bookings: c.booking_count,
            spent:    c.total_spent,
          })));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);
  return { data, loading };
}

function AdminCustomers(){
  const [q, setQ] = React.useState('');
  const [seg, setSeg] = React.useState('All');
  const [tier, setTier] = React.useState('All');
  const [sel, setSel] = React.useState(null);
  const [sort, setSort] = React.useState('Recent');
  const { data: CUSTOMERS, loading } = useCustomers();

  const segments = [
    {l:'All',      f:c=>true},
    {l:'VIP',      f:c=>c.status==='VIP'},
    {l:'Active',   f:c=>c.status==='Active'},
    {l:'New',      f:c=>c.status==='New'},
    {l:'Inactive', f:c=>c.status==='Inactive'},
  ];
  const segFn = segments.find(s=>s.l===seg)?.f || (()=>true);
  let filtered = CUSTOMERS.filter(c => segFn(c) &&
    (tier==='All' || c.tier===tier) &&
    (q==='' || (c.n+c.ic+c.em+c.ph+c.city).toLowerCase().includes(q.toLowerCase()))
  );
  if (sort==='Spend high') filtered = [...filtered].sort((a,b)=>b.spent-a.spent);
  if (sort==='Spend low')  filtered = [...filtered].sort((a,b)=>a.spent-b.spent);
  if (sort==='Bookings')   filtered = [...filtered].sort((a,b)=>b.bookings-a.bookings);

  const totalCustomers = CUSTOMERS.length;
  const totalSpent     = CUSTOMERS.reduce((s,c)=>s+c.spent,0);
  const avgSpent       = Math.round(totalSpent / totalCustomers);
  const vipCount       = CUSTOMERS.filter(c=>c.status==='VIP').length;

  const sc = {
    'VIP':      {fg:'var(--gold)',     bg:'rgba(202,161,90,.14)'},
    'Active':   {fg:'var(--jade)',     bg:'rgba(31,138,91,.10)'},
    'New':      {fg:'var(--blue-600)', bg:'var(--blue-50)'},
    'Inactive': {fg:'var(--ink-400)',  bg:'var(--cream-2)'},
  };
  const tc = {
    'Platinum': '#7a8fa8',
    'Gold':     '#caa15a',
    'Silver':   '#a1a8b3',
    'Bronze':   '#b07a4a',
  };

  return (
    <AdminShell active="customers"
      breadcrumb="OPERATIONS"
      title="Customers"
      subtitle={`${totalCustomers} active customers · RM ${totalSpent.toLocaleString()} total lifetime value · avg. RM ${avgSpent.toLocaleString()} per guest`}>

      {/* Top stat cards */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:20}}>
        <CustStat label="TOTAL CUSTOMERS"    value={totalCustomers.toLocaleString()} delta="+12.4%" sub="this quarter"/>
        <CustStat label="VIP MEMBERS"         value={vipCount.toString()}             delta="+3" sub="Gold &amp; Platinum"/>
        <CustStat label="AVG. LIFETIME SPEND" value={`RM ${avgSpent.toLocaleString()}`} delta="+8.2%" sub="vs last quarter"/>
        <CustStat label="REPEAT RATE"         value="62%"                              delta="+4 pp"  sub="of all bookings"/>
      </div>

      {/* Filter bar */}
      <div style={{background:'#fff', border:'1px solid var(--line)', borderRadius:14, padding:14, marginBottom:16}}>
        <div style={{display:'flex', gap:10, alignItems:'center', flexWrap:'wrap'}}>
          <div style={{position:'relative', flex:'1 1 280px', maxWidth:380}}>
            <input placeholder="Search by name, IC, phone, email…" value={q} onChange={e=>setQ(e.target.value)}
              style={{width:'100%', padding:'10px 14px 10px 40px', border:'1px solid var(--line)', borderRadius:10, fontSize:13, fontFamily:'inherit', background:'var(--paper)'}}/>
            <div style={{position:'absolute', left:14, top:11}}><Icon name="search" size={15} color="var(--ink-400)"/></div>
          </div>
          <div style={{display:'flex', gap:6}}>
            {segments.map(s=>{
              const on = seg===s.l;
              const c = CUSTOMERS.filter(s.f).length;
              return <button key={s.l} onClick={()=>setSeg(s.l)} style={{
                padding:'8px 13px', borderRadius:99, cursor:'pointer', fontFamily:'inherit',
                fontSize:12.5, fontWeight:500, display:'flex', alignItems:'center', gap:6,
                background: on ? 'var(--navy-800)' : '#fff', color: on ? '#fff' : 'var(--ink-700)',
                border:'1px solid ' + (on ? 'var(--navy-800)' : 'var(--line)'),
              }}>{s.l} <span style={{padding:'1px 7px', background: on ? 'rgba(255,255,255,.15)' : 'var(--paper)', borderRadius:99, fontSize:11}}>{c}</span></button>;
            })}
          </div>
          <select value={tier} onChange={e=>setTier(e.target.value)} style={{padding:'9px 12px', fontFamily:'inherit', fontSize:12.5, background:'#fff', border:'1px solid var(--line)', borderRadius:10}}>
            <option>All</option><option>Platinum</option><option>Gold</option><option>Silver</option><option>Bronze</option>
          </select>
          <select value={sort} onChange={e=>setSort(e.target.value)} style={{padding:'9px 12px', fontFamily:'inherit', fontSize:12.5, background:'#fff', border:'1px solid var(--line)', borderRadius:10}}>
            <option>Recent</option><option>Spend high</option><option>Spend low</option><option>Bookings</option>
          </select>
          <button style={{padding:'10px 14px', borderRadius:10, background:'#fff', border:'1px solid var(--line)', cursor:'pointer', fontFamily:'inherit', fontSize:13, color:'var(--ink-700)', display:'flex', alignItems:'center', gap:8, marginLeft:'auto'}}>
            <Icon name="down" size={14}/> Export
          </button>
          <button style={{padding:'10px 16px', borderRadius:99, background:'var(--navy-800)', color:'#fff', border:0, cursor:'pointer', fontFamily:'inherit', fontSize:13, fontWeight:500, display:'flex', alignItems:'center', gap:8}}>
            <Icon name="plus" size={14}/> Add customer
          </button>
        </div>
      </div>

      {/* Main grid — customer table + side panel */}
      <div style={{display:'grid', gridTemplateColumns: sel ? '1.4fr 1fr' : '1fr', gap:16, transition:'grid-template-columns .2s ease'}}>
        <div style={{background:'#fff', border:'1px solid var(--line)', borderRadius:14, overflow:'hidden'}}>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%', minWidth: sel ? 760 : 1080, borderCollapse:'collapse', fontSize:13}}>
              <thead>
                <tr style={{textAlign:'left', background:'var(--paper)'}}>
                  <th style={cth()}>CUSTOMER</th>
                  <th style={cth()}>CONTACT</th>
                  {!sel && <th style={cth()}>LOCATION</th>}
                  <th style={cth()}>BOOKINGS</th>
                  <th style={cth()}>LIFETIME VALUE</th>
                  <th style={cth()}>TIER</th>
                  <th style={cth()}>STATUS</th>
                  <th style={cth(40)}></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c=>{
                  const on = sel?.id===c.id;
                  return (
                    <tr key={c.id}
                      onClick={()=>setSel(on ? null : c)}
                      style={{borderTop:'1px solid var(--line-2)', cursor:'pointer', background: on ? 'var(--blue-50)' : 'transparent'}}
                      onMouseEnter={e=>{ if(!on) e.currentTarget.style.background='#fafbfd'; }}
                      onMouseLeave={e=>{ if(!on) e.currentTarget.style.background='transparent'; }}>
                      <td style={ctd()}>
                        <div style={{display:'flex', alignItems:'center', gap:12}}>
                          <div style={{width:38, height:38, borderRadius:99, background:'linear-gradient(135deg, var(--navy-700), var(--blue-500))', color:'#fff', display:'grid', placeItems:'center', fontWeight:600, fontSize:12}}>
                            {c.n.split(' ').map(x=>x[0]).slice(0,2).join('')}
                          </div>
                          <div>
                            <div style={{fontWeight:600, color:'var(--ink-900)'}}>{c.n}</div>
                            <div className="mono" style={{fontSize:11, color:'var(--ink-400)'}}>{c.id} · joined {c.joined}</div>
                          </div>
                        </div>
                      </td>
                      <td style={ctd()}>
                        <div style={{fontSize:12.5, color:'var(--ink-700)'}}>{c.em}</div>
                        <div className="mono" style={{fontSize:11.5, color:'var(--ink-400)'}}>{c.ph}</div>
                      </td>
                      {!sel && (
                        <td style={ctd()}>
                          <div style={{fontSize:12.5, color:'var(--ink-700)'}}>{c.city.split(',')[0]}</div>
                          <div style={{fontSize:11, color:'var(--ink-400)'}}>{c.city.split(',')[1]?.trim()}</div>
                        </td>
                      )}
                      <td style={{...ctd(), textAlign:'left'}}>
                        <div style={{display:'flex', alignItems:'baseline', gap:6}}>
                          <span style={{fontFamily:'var(--f-display)', fontSize:18, color:'var(--navy-900)'}}>{c.bookings}</span>
                          <span style={{fontSize:11, color:'var(--ink-400)'}}>trips</span>
                        </div>
                        <div style={{fontSize:11, color:'var(--ink-400)'}}>last: {c.last}</div>
                      </td>
                      <td className="mono tnum" style={{...ctd(), fontWeight:600, color:'var(--navy-900)'}}>RM {c.spent.toLocaleString()}</td>
                      <td style={ctd()}>
                        <span style={{display:'inline-flex', alignItems:'center', gap:6}}>
                          <span style={{width:8, height:8, borderRadius:8, background:tc[c.tier]}}/>
                          <span style={{fontSize:12.5, fontWeight:500}}>{c.tier}</span>
                        </span>
                      </td>
                      <td style={ctd()}>
                        <span style={{padding:'3px 10px', background:sc[c.status].bg, color:sc[c.status].fg, fontSize:11, fontWeight:600, borderRadius:99}}>{c.status}</span>
                      </td>
                      <td style={ctd()}>
                        <Icon name={on ? 'close' : 'arrow-r'} size={15} color="var(--ink-400)"/>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 18px', borderTop:'1px solid var(--line-2)', background:'var(--paper)'}}>
            <div style={{fontSize:12, color:'var(--ink-500)'}}>Showing {filtered.length} of {CUSTOMERS.length} customers</div>
            <div style={{display:'flex', gap:4, alignItems:'center'}}>
              <button style={cpag}><Icon name="arrow-l" size={13}/></button>
              {['1','2','3','…','24'].map((p,i)=>(
                <button key={i} style={{...cpag, ...(p==='1'?{background:'var(--navy-800)', color:'#fff', borderColor:'var(--navy-800)'}:{})}}>{p}</button>
              ))}
              <button style={cpag}><Icon name="arrow-r" size={13}/></button>
            </div>
          </div>
        </div>

        {sel && <CustomerDetail c={sel} onClose={()=>setSel(null)} sc={sc} tc={tc}/>}
      </div>
    </AdminShell>
  );
}

const cth = (w)=>({padding:'12px 14px', fontFamily:'var(--f-mono)', fontSize:10.5, color:'var(--ink-400)', fontWeight:500, letterSpacing:'.1em', borderBottom:'1px solid var(--line-2)', width:w});
const ctd = ()=>({padding:'14px 14px', verticalAlign:'middle'});
const cpag = {minWidth:30, height:30, padding:'0 8px', borderRadius:7, border:'1px solid var(--line)', background:'#fff', cursor:'pointer', fontSize:12, fontFamily:'inherit', color:'var(--ink-700)', display:'grid', placeItems:'center'};

function CustStat({label, value, delta, sub}){
  return (
    <div style={{padding:'18px 20px', background:'#fff', border:'1px solid var(--line)', borderRadius:14}}>
      <div className="kicker">{label}</div>
      <div style={{fontFamily:'var(--f-display)', fontSize:30, color:'var(--navy-900)', marginTop:6, lineHeight:1, letterSpacing:'-0.01em'}} dangerouslySetInnerHTML={{__html: value}}/>
      <div style={{display:'flex', alignItems:'center', gap:8, marginTop:8}}>
        <span style={{padding:'2px 8px', background:'rgba(31,138,91,.10)', color:'var(--jade)', borderRadius:99, fontSize:11, fontWeight:600}}>↑ {delta}</span>
        <span style={{fontSize:11.5, color:'var(--ink-400)'}}>{sub}</span>
      </div>
    </div>
  );
}

function CustomerDetail({c, onClose, sc, tc}){
  // Mock booking history derived from customer
  const bookings = [
    {ref:'VK-2026-04218', pkg:'Langkawi Island Escape', date:'18 Jun 2026', amt:2716, s:'Upcoming'},
    {ref:'VK-2026-03921', pkg:'Cameron Highlands Tour', date:'14 Mar 2026', amt:1888, s:'Completed'},
    {ref:'VK-2025-02814', pkg:'Penang Heritage & Food', date:'22 Nov 2025', amt:1526, s:'Completed'},
    {ref:'VK-2025-02411', pkg:'Pulau Redang Vacation',  date:'08 Aug 2025', amt:3478, s:'Completed'},
    {ref:'VK-2024-01902', pkg:'Sabah Kundasang Trip',   date:'12 Dec 2024', amt:4320, s:'Completed'},
  ].slice(0, Math.min(c.bookings, 5));
  const bs = {
    'Upcoming':  {fg:'var(--blue-600)', bg:'var(--blue-50)'},
    'Completed': {fg:'var(--ink-500)',  bg:'var(--cream-2)'},
  };
  return (
    <div style={{background:'#fff', border:'1px solid var(--line)', borderRadius:14, overflow:'hidden', alignSelf:'start', position:'sticky', top:88}}>
      {/* Header */}
      <div style={{padding:'24px 24px', background:'linear-gradient(160deg, var(--navy-900), var(--navy-700) 70%, var(--blue-600))', color:'#fff', position:'relative'}}>
        <button onClick={onClose} style={{position:'absolute', top:14, right:14, width:30, height:30, borderRadius:99, background:'rgba(255,255,255,.12)', border:0, color:'#fff', cursor:'pointer', display:'grid', placeItems:'center'}}>
          <Icon name="close" size={14}/>
        </button>
        <div style={{display:'flex', alignItems:'center', gap:14}}>
          <div style={{width:60, height:60, borderRadius:99, background:'rgba(255,255,255,.16)', display:'grid', placeItems:'center', fontFamily:'var(--f-display)', fontSize:24, fontStyle:'italic'}}>
            {c.n.split(' ').map(x=>x[0]).slice(0,2).join('')}
          </div>
          <div>
            <div style={{fontFamily:'var(--f-display)', fontSize:24, lineHeight:1.1}}>{c.n}</div>
            <div style={{display:'flex', gap:8, marginTop:8}}>
              <span style={{padding:'3px 9px', background:'rgba(255,255,255,.14)', borderRadius:99, fontSize:11, fontWeight:500, display:'inline-flex', alignItems:'center', gap:6}}>
                <span style={{width:7, height:7, borderRadius:7, background:tc[c.tier]}}/> {c.tier}
              </span>
              <span style={{padding:'3px 9px', background:'rgba(255,255,255,.14)', borderRadius:99, fontSize:11, fontWeight:500}}>{c.status}</span>
              <span className="mono" style={{padding:'3px 9px', background:'rgba(255,255,255,.06)', borderRadius:99, fontSize:10, letterSpacing:'.1em', color:'rgba(255,255,255,.7)'}}>{c.id}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:0, borderBottom:'1px solid var(--line-2)'}}>
        {[
          {l:'TRIPS',          v:c.bookings, s:'lifetime'},
          {l:'SPENT (MYR)',    v:`RM ${c.spent.toLocaleString()}`, s:'lifetime'},
          {l:'AVG. PER TRIP',  v:`RM ${Math.round(c.spent/c.bookings).toLocaleString()}`, s:''},
        ].map((x,i)=>(
          <div key={i} style={{padding:'18px 18px', borderRight: i<2 ? '1px solid var(--line-2)' : 'none'}}>
            <div className="kicker">{x.l}</div>
            <div style={{fontFamily:'var(--f-display)', fontSize:24, color:'var(--navy-900)', marginTop:4, lineHeight:1, letterSpacing:'-0.01em'}}>{x.v}</div>
            {x.s && <div style={{fontSize:11, color:'var(--ink-400)', marginTop:2}}>{x.s}</div>}
          </div>
        ))}
      </div>

      {/* Contact info */}
      <div style={{padding:'18px 24px', borderBottom:'1px solid var(--line-2)'}}>
        <div className="kicker" style={{marginBottom:12}}>CONTACT</div>
        <div style={{display:'flex', flexDirection:'column', gap:8, fontSize:13}}>
          <Detail ic="mail"  l="Email"   v={c.em}/>
          <Detail ic="phone" l="Phone"   v={c.ph} mono/>
          <Detail ic="user"  l="IC"      v={c.ic} mono/>
          <Detail ic="pin"   l="City"    v={c.city}/>
          <Detail ic="cal"   l="Joined"  v={`${c.joined} · last active ${c.last}`}/>
        </div>
        <div style={{display:'flex', gap:6, marginTop:14}}>
          <button style={{flex:1, padding:'9px 12px', borderRadius:9, background:'var(--navy-800)', color:'#fff', border:0, cursor:'pointer', fontFamily:'inherit', fontSize:12.5, fontWeight:500, display:'flex', alignItems:'center', justifyContent:'center', gap:6}}>
            <Icon name="mail" size={13}/> Email
          </button>
          <button style={{flex:1, padding:'9px 12px', borderRadius:9, background:'#fff', color:'var(--ink-700)', border:'1px solid var(--line)', cursor:'pointer', fontFamily:'inherit', fontSize:12.5, fontWeight:500, display:'flex', alignItems:'center', justifyContent:'center', gap:6}}>
            <Icon name="phone" size={13}/> WhatsApp
          </button>
          <button style={{padding:'9px 10px', borderRadius:9, background:'#fff', color:'var(--ink-700)', border:'1px solid var(--line)', cursor:'pointer'}}>
            <Icon name="edit" size={13}/>
          </button>
        </div>
      </div>

      {/* Booking history */}
      <div style={{padding:'18px 24px 22px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:12}}>
          <div className="kicker">BOOKING HISTORY · LATEST {bookings.length}</div>
          <button style={{background:'none', border:0, fontSize:12, color:'var(--blue-600)', fontWeight:500, cursor:'pointer'}}>View all →</button>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:8}}>
          {bookings.map((b,i)=>(
            <div key={i} style={{display:'grid', gridTemplateColumns:'1fr auto', gap:10, padding:'10px 12px', background:'var(--paper)', borderRadius:10}}>
              <div>
                <div className="mono" style={{fontSize:10.5, color:'var(--ink-400)', letterSpacing:'.06em'}}>{b.ref}</div>
                <div style={{fontSize:13, fontWeight:500, marginTop:2}}>{b.pkg}</div>
                <div style={{fontSize:11, color:'var(--ink-400)', marginTop:2}}>{b.date}</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div className="mono" style={{fontSize:13, fontWeight:600, color:'var(--navy-900)'}}>RM {b.amt.toLocaleString()}</div>
                <span style={{display:'inline-block', marginTop:4, padding:'2px 8px', background:bs[b.s].bg, color:bs[b.s].fg, fontSize:10.5, fontWeight:600, borderRadius:99}}>{b.s}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Detail({ic, l, v, mono}){
  return (
    <div style={{display:'grid', gridTemplateColumns:'18px 80px 1fr', gap:10, alignItems:'baseline'}}>
      <Icon name={ic} size={14} color="var(--ink-400)"/>
      <span className="kicker">{l.toUpperCase()}</span>
      <span className={mono?'mono':''} style={{color:'var(--ink-900)', fontWeight:500}}>{v}</span>
    </div>
  );
}

Object.assign(window, { AdminCustomers, useCustomers });
