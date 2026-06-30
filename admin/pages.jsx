// Admin — Reservations management, Packages management, Notifications, Settings

const RESERVATIONS = [
  {ref:'VK-2026-04218', n:'Nur Aisyah Rahman',  ic:'990408-14-5238', ph:'+60 12-345 6789', pkg:'Langkawi Island Escape',    pax:2, date:'18 Jun 2026', amt:2716,  s:'Confirmed', p:'Paid',     ch:'FPX'},
  {ref:'VK-2026-04217', n:'Daniel Lee',         ic:'870921-08-5172', ph:'+60 16-742 1109', pkg:'Cameron Highlands Tour',    pax:4, date:'03 Jul 2026', amt:3776,  s:'Confirmed', p:'Paid',     ch:'Card'},
  {ref:'VK-2026-04216', n:'Siti Khadijah',      ic:'940522-12-6634', ph:'+60 19-228 4012', pkg:'Sabah Kundasang Trip',      pax:6, date:'12 Aug 2026', amt:12960, s:'Pending',   p:'Deposit',  ch:'GrabPay'},
  {ref:'VK-2026-04215', n:'Muhammad Amir',      ic:'910311-05-7281', ph:'+60 13-991 8842', pkg:'Pulau Redang Vacation',     pax:2, date:'22 Jul 2026', amt:3478,  s:'Refund',    p:'Refunding',ch:'FPX'},
  {ref:'VK-2026-04214', n:'Ahmad Firdaus',      ic:'880715-14-5511', ph:'+60 17-562 0934', pkg:'Penang Heritage & Food',    pax:3, date:'29 Jun 2026', amt:2160,  s:'Confirmed', p:'Paid',     ch:'TnG'},
  {ref:'VK-2026-04213', n:'Lim Wei Ling',       ic:'960428-07-8923', ph:'+60 12-883 4471', pkg:'Melaka Strait Heritage',    pax:2, date:'14 Jun 2026', amt:1018,  s:'Confirmed', p:'Paid',     ch:'FPX'},
  {ref:'VK-2026-04212', n:'Tengku Iskandar',    ic:'900919-03-6612', ph:'+60 11-1928 5523',pkg:'Langkawi Island Escape',    pax:4, date:'30 Jun 2026', amt:5432,  s:'Confirmed', p:'Paid',     ch:'Card'},
  {ref:'VK-2026-04211', n:'Vanitha Subramaniam',ic:'940204-10-4438', ph:'+60 14-228 7710', pkg:'Cameron Highlands Tour',    pax:2, date:'08 Jul 2026', amt:1888,  s:'Pending',   p:'Unpaid',   ch:'—'},
  {ref:'VK-2026-04210', n:'Wong Mei Ling',      ic:'920708-08-3329', ph:'+60 12-661 4488', pkg:'Pulau Redang Vacation',     pax:2, date:'05 Jul 2026', amt:3478,  s:'Confirmed', p:'Paid',     ch:'Boost'},
  {ref:'VK-2026-04209', n:'Raj Kumar',          ic:'891003-14-7123', ph:'+60 19-455 8821', pkg:'Sabah Kundasang Trip',      pax:3, date:'18 Aug 2026', amt:6480,  s:'Confirmed', p:'Paid',     ch:'CIMB'},
];

function AdminReservations(){
  const [q, setQ] = React.useState('');
  const [filter, setFilter] = React.useState('All');
  const [sel, setSel] = React.useState([]);
  const [modal, setModal] = React.useState(null);

  const filtered = RESERVATIONS.filter(r =>
    (filter==='All' || r.s===filter) &&
    (q==='' || (r.n+r.ref+r.pkg+r.ph).toLowerCase().includes(q.toLowerCase()))
  );
  const toggle = ref => setSel(s => s.includes(ref) ? s.filter(x=>x!==ref) : [...s, ref]);

  const sc = {
    Confirmed:{fg:'var(--jade)',     bg:'rgba(31,138,91,.10)'},
    Pending:  {fg:'var(--coral)',    bg:'var(--coral-soft)'},
    Refund:   {fg:'var(--rose)',     bg:'rgba(200,83,110,.10)'},
  };
  const pc = {
    Paid:     {fg:'var(--jade)',     bg:'rgba(31,138,91,.10)'},
    Deposit:  {fg:'var(--gold)',     bg:'rgba(202,161,90,.14)'},
    Unpaid:   {fg:'var(--coral)',    bg:'var(--coral-soft)'},
    Refunding:{fg:'var(--rose)',     bg:'rgba(200,83,110,.10)'},
  };

  return (
    <AdminShell active="reservations"
      breadcrumb="OPERATIONS"
      title="Reservations"
      subtitle={`${RESERVATIONS.length} active bookings · RM ${RESERVATIONS.reduce((s,r)=>s+r.amt,0).toLocaleString()} in pipeline this quarter`}>

      {/* Filter bar */}
      <div style={{background:'#fff', border:'1px solid var(--line)', borderRadius:14, padding:14, marginBottom:16}}>
        <div style={{display:'flex', gap:10, alignItems:'center', flexWrap:'wrap'}}>
          <div style={{position:'relative', flex:'1 1 280px', maxWidth:380}}>
            <input placeholder="Search by name, IC, ref, or phone…" value={q} onChange={e=>setQ(e.target.value)}
              style={{width:'100%', padding:'10px 14px 10px 40px', border:'1px solid var(--line)', borderRadius:10, fontSize:13, fontFamily:'inherit', background:'var(--paper)'}}/>
            <div style={{position:'absolute', left:14, top:11}}><Icon name="search" size={15} color="var(--ink-400)"/></div>
          </div>
          <div style={{display:'flex', gap:6}}>
            {['All','Confirmed','Pending','Refund'].map(t=>{
              const on = filter===t;
              const count = t==='All' ? RESERVATIONS.length : RESERVATIONS.filter(r=>r.s===t).length;
              return <button key={t} onClick={()=>setFilter(t)} style={{
                padding:'8px 13px', borderRadius:99, cursor:'pointer', fontFamily:'inherit',
                fontSize:12.5, fontWeight:500, display:'flex', alignItems:'center', gap:6,
                background: on ? 'var(--navy-800)' : '#fff', color: on ? '#fff' : 'var(--ink-700)',
                border:'1px solid ' + (on ? 'var(--navy-800)' : 'var(--line)'),
              }}>{t} <span style={{padding:'1px 7px', background: on ? 'rgba(255,255,255,.15)' : 'var(--paper)', borderRadius:99, fontSize:11}}>{count}</span></button>;
            })}
          </div>
          <button style={{...btnGhost, padding:'10px 14px', fontSize:13, marginLeft:'auto'}}>
            <Icon name="filter" size={14}/> Advanced filters
          </button>
          <button style={{...btnGhost, padding:'10px 14px', fontSize:13}}>
            <Icon name="down" size={14}/> Export CSV
          </button>
          <button style={{...btnPrimary, padding:'10px 16px', fontSize:13}}>
            <Icon name="plus" size={14}/> New booking
          </button>
        </div>
        {sel.length>0 && (
          <div style={{display:'flex', alignItems:'center', gap:14, padding:'10px 12px', marginTop:12, background:'var(--blue-50)', borderRadius:10, fontSize:13, color:'var(--navy-800)'}}>
            <strong>{sel.length} selected</strong>
            <button style={pillBtn}>Mark as confirmed</button>
            <button style={pillBtn}>Send reminder</button>
            <button style={pillBtn}>Issue refund</button>
            <button style={{...pillBtn, color:'var(--coral)', marginLeft:'auto'}}>Delete</button>
          </div>
        )}
      </div>

      {/* Table */}
      <div style={{background:'#fff', border:'1px solid var(--line)', borderRadius:14, overflow:'hidden'}}>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%', minWidth:1080, borderCollapse:'collapse', fontSize:13}}>
            <thead>
              <tr style={{textAlign:'left', background:'var(--paper)'}}>
                <th style={th(40)}><input type="checkbox" onChange={e=>setSel(e.target.checked?filtered.map(r=>r.ref):[])} style={{accentColor:'var(--blue-500)'}}/></th>
                <th style={th()}>REF</th>
                <th style={th()}>CUSTOMER</th>
                <th style={th()}>PACKAGE · DATE</th>
                <th style={th()}>PAX</th>
                <th style={th()}>AMOUNT (MYR)</th>
                <th style={th()}>STATUS</th>
                <th style={th()}>PAYMENT</th>
                <th style={th(40)}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r=>(
                <tr key={r.ref} style={{borderTop:'1px solid var(--line-2)'}}
                  onMouseEnter={e=>e.currentTarget.style.background='#fafbfd'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <td style={td()}><input type="checkbox" checked={sel.includes(r.ref)} onChange={()=>toggle(r.ref)} style={{accentColor:'var(--blue-500)'}}/></td>
                  <td className="mono" style={{...td(), color:'var(--ink-500)', fontSize:11.5}}>{r.ref}</td>
                  <td style={td()}>
                    <div style={{display:'flex', alignItems:'center', gap:10}}>
                      <div style={{width:32, height:32, borderRadius:99, background:'var(--cream)', color:'var(--navy-800)', display:'grid', placeItems:'center', fontWeight:600, fontSize:11}}>{r.n.split(' ').map(x=>x[0]).slice(0,2).join('')}</div>
                      <div>
                        <div style={{fontWeight:600}}>{r.n}</div>
                        <div className="mono" style={{fontSize:11, color:'var(--ink-400)'}}>{r.ph}</div>
                      </div>
                    </div>
                  </td>
                  <td style={td()}>
                    <div>{r.pkg}</div>
                    <div style={{fontSize:11.5, color:'var(--ink-400)'}}>{r.date}</div>
                  </td>
                  <td style={td()}>{r.pax}</td>
                  <td className="mono tnum" style={{...td(), fontWeight:600}}>RM {r.amt.toLocaleString()}</td>
                  <td style={td()}>
                    <span style={{padding:'3px 10px', background:sc[r.s].bg, color:sc[r.s].fg, fontSize:11, fontWeight:600, borderRadius:99}}>{r.s}</span>
                  </td>
                  <td style={td()}>
                    <span style={{padding:'3px 10px', background:pc[r.p].bg, color:pc[r.p].fg, fontSize:11, fontWeight:600, borderRadius:99}}>{r.p}</span>
                    <span style={{fontSize:11, color:'var(--ink-400)', marginLeft:6}}>{r.ch}</span>
                  </td>
                  <td style={td()}>
                    <div style={{display:'flex', gap:2}}>
                      <button onClick={()=>setModal(r)} style={rowBtn}><Icon name="eye" size={15}/></button>
                      <button style={rowBtn}><Icon name="edit" size={15}/></button>
                      <button style={{...rowBtn, color:'var(--coral)'}}><Icon name="trash" size={15}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 18px', borderTop:'1px solid var(--line-2)', background:'var(--paper)'}}>
          <div style={{fontSize:12, color:'var(--ink-500)'}}>Showing {filtered.length} of {RESERVATIONS.length} bookings</div>
          <div style={{display:'flex', gap:4, alignItems:'center'}}>
            <button style={pagBtn}><Icon name="arrow-l" size={13}/></button>
            {['1','2','3','…','42'].map((p,i)=>(
              <button key={i} style={{...pagBtn, ...(p==='1'?{background:'var(--navy-800)', color:'#fff', borderColor:'var(--navy-800)'}:{})}}>{p}</button>
            ))}
            <button style={pagBtn}><Icon name="arrow-r" size={13}/></button>
          </div>
        </div>
      </div>

      {modal && <BookingModal r={modal} onClose={()=>setModal(null)} sc={sc} pc={pc}/>}
    </AdminShell>
  );
}

const th = (w)=>({padding:'12px 14px', fontFamily:'var(--f-mono)', fontSize:10.5, color:'var(--ink-400)', fontWeight:500, letterSpacing:'.1em', borderBottom:'1px solid var(--line-2)', width:w});
const td = ()=>({padding:'14px 14px', verticalAlign:'middle'});
const rowBtn = {width:30, height:30, borderRadius:7, border:0, background:'transparent', color:'var(--ink-400)', cursor:'pointer', display:'grid', placeItems:'center'};
const pillBtn = {padding:'5px 12px', background:'#fff', border:'1px solid var(--line)', borderRadius:99, fontSize:12, fontWeight:500, cursor:'pointer', fontFamily:'inherit', color:'var(--navy-800)'};
const pagBtn = {minWidth:30, height:30, padding:'0 8px', borderRadius:7, border:'1px solid var(--line)', background:'#fff', cursor:'pointer', fontSize:12, fontFamily:'inherit', color:'var(--ink-700)', display:'grid', placeItems:'center'};

function BookingModal({r, onClose, sc, pc}){
  return (
    <div onClick={onClose} style={{position:'fixed', inset:0, zIndex:100, background:'rgba(11,42,74,.5)', backdropFilter:'blur(6px)', display:'grid', placeItems:'center', padding:32}}>
      <div onClick={e=>e.stopPropagation()} style={{
        width:'min(720px, 100%)', maxHeight:'90vh', overflow:'auto', background:'#fff', borderRadius:18, boxShadow:'var(--sh-4)',
      }} className="scroll">
        <div style={{padding:'22px 28px', borderBottom:'1px solid var(--line-2)', display:'flex', justifyContent:'space-between', alignItems:'start'}}>
          <div>
            <div className="mono" style={{fontSize:11, color:'var(--ink-400)', letterSpacing:'.1em'}}>{r.ref}</div>
            <div style={{fontFamily:'var(--f-display)', fontSize:28, color:'var(--navy-900)', marginTop:4}}>{r.pkg}</div>
            <div style={{display:'flex', gap:10, marginTop:10}}>
              <span style={{padding:'3px 10px', background:sc[r.s].bg, color:sc[r.s].fg, fontSize:11, fontWeight:600, borderRadius:99}}>{r.s}</span>
              <span style={{padding:'3px 10px', background:pc[r.p].bg, color:pc[r.p].fg, fontSize:11, fontWeight:600, borderRadius:99}}>{r.p} · {r.ch}</span>
            </div>
          </div>
          <button onClick={onClose} style={iconBtn}><Icon name="close" size={16}/></button>
        </div>
        <div style={{padding:'24px 28px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:18}}>
          <ModalRow l="Customer" v={r.n}/>
          <ModalRow l="IC Number" v={r.ic} mono/>
          <ModalRow l="Phone"    v={r.ph} mono/>
          <ModalRow l="Email"    v="aisyah.r@gmail.com"/>
          <ModalRow l="Departure" v={r.date}/>
          <ModalRow l="Travellers" v={`${r.pax} adults · 0 children`}/>
          <ModalRow l="Address"  v="A-12-3, Residensi Tropika, Petaling Jaya, Selangor"/>
        </div>
        <div style={{padding:'0 28px 24px'}}>
          <div className="kicker" style={{marginBottom:10}}>PAYMENT BREAKDOWN</div>
          <div style={{background:'var(--paper)', borderRadius:12, padding:'14px 18px'}}>
            <Row l={`Package × ${r.pax}`} v={`RM ${(r.amt-Math.round(r.amt*0.06)).toLocaleString()}`}/>
            <Row l="SST 6%" v={`RM ${Math.round(r.amt*0.06).toLocaleString()}`}/>
            <Row l="MERDEKA32 discount" v={`− RM ${Math.round(r.amt*0.1).toLocaleString()}`} color="var(--coral)"/>
            <div className="divider" style={{margin:'8px 0'}}/>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <span style={{fontWeight:600}}>Total received</span>
              <span className="mono" style={{fontFamily:'var(--f-display)', fontSize:22, color:'var(--navy-900)'}}>RM {r.amt.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div style={{padding:'18px 28px', background:'var(--paper)', display:'flex', justifyContent:'space-between', gap:12, borderTop:'1px solid var(--line-2)'}}>
          <div style={{display:'flex', gap:8}}>
            <button style={btnGhost}>Send invoice</button>
            <button style={btnGhost}>WhatsApp guide</button>
          </div>
          <div style={{display:'flex', gap:8}}>
            <button style={btnGhost}>Edit booking</button>
            <button style={btnPrimary}>Mark as completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalRow({l, v, mono}){
  return (
    <div>
      <div className="kicker">{l.toUpperCase()}</div>
      <div className={mono?'mono':''} style={{fontSize:14, fontWeight:500, marginTop:4}}>{v}</div>
    </div>
  );
}

// ── Packages management ────────────────────────────────────────
function AdminPackages(){
  const data = [
    {n:'Langkawi Island Escape',     loc:'Langkawi, Kedah',     d:'4D3N', p:1280, was:1490, bookings:142, rating:4.9, status:'Live',   img:'ph-langkawi'},
    {n:'Sabah Kundasang Trip',       loc:'Sabah',               d:'5D4N', p:2160, was:2480, bookings:98,  rating:4.8, status:'Live',   img:'ph-kundasang'},
    {n:'Cameron Highlands Tour',     loc:'Pahang',              d:'3D2N', p:890,  was:1050, bookings:184, rating:4.7, status:'Live',   img:'ph-cameron'},
    {n:'Pulau Redang Vacation',      loc:'Terengganu',          d:'4D3N', p:1640, was:1840, bookings:62,  rating:4.9, status:'Live',   img:'ph-redang'},
    {n:'Penang Heritage & Food',     loc:'George Town',         d:'3D2N', p:720,  was:880,  bookings:201, rating:4.8, status:'Live',   img:'ph-penang'},
    {n:'Melaka Strait Heritage',     loc:'Melaka',              d:'2D1N', p:480,  was:560,  bookings:140, rating:4.6, status:'Live',   img:'ph-melaka'},
    {n:'Mulu Caves Expedition',      loc:'Sarawak',             d:'4D3N', p:1980, was:2200, bookings:18,  rating:4.9, status:'Draft',  img:'ph-mulu'},
    {n:'Perhentian Diving Camp',     loc:'Terengganu',          d:'5D4N', p:1820, was:1980, bookings:54,  rating:4.8, status:'Live',   img:'ph-perhentian'},
  ];
  return (
    <AdminShell active="packages"
      breadcrumb="OPERATIONS"
      title="Travel packages"
      subtitle={`${data.length} packages · ${data.filter(p=>p.status==='Live').length} live · ${data.reduce((s,p)=>s+p.bookings,0)} bookings this quarter`}>

      {/* Filter bar */}
      <div style={{display:'flex', gap:10, marginBottom:18, alignItems:'center'}}>
        <div style={{position:'relative', flex:'0 1 320px'}}>
          <input placeholder="Search packages…" style={{width:'100%', padding:'10px 14px 10px 40px', border:'1px solid var(--line)', borderRadius:10, fontSize:13, fontFamily:'inherit', background:'#fff'}}/>
          <div style={{position:'absolute', left:14, top:11}}><Icon name="search" size={15} color="var(--ink-400)"/></div>
        </div>
        <select style={{padding:'10px 14px', fontFamily:'inherit', fontSize:13, background:'#fff', border:'1px solid var(--line)', borderRadius:10}}>
          <option>All destinations</option><option>Peninsular</option><option>East Malaysia</option>
        </select>
        <select style={{padding:'10px 14px', fontFamily:'inherit', fontSize:13, background:'#fff', border:'1px solid var(--line)', borderRadius:10}}>
          <option>All statuses</option><option>Live</option><option>Draft</option><option>Archived</option>
        </select>
        <button style={{...btnPrimary, padding:'10px 16px', fontSize:13, marginLeft:'auto'}}>
          <Icon name="plus" size={14}/> Add new package
        </button>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:16}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:14}}>
          {data.map(p => <PackageAdminCard key={p.n} p={p}/>)}
        </div>
        <PackageEditorPreview/>
      </div>
    </AdminShell>
  );
}

function PackageAdminCard({p}){
  return (
    <div style={{background:'#fff', border:'1px solid var(--line)', borderRadius:14, overflow:'hidden', display:'flex', flexDirection:'column'}}>
      <div className={`ph ${p.img}`} data-label={p.loc.toUpperCase()} style={{height:140, position:'relative'}}>
        <span style={{position:'absolute', top:12, right:12, padding:'3px 9px', background: p.status==='Live'?'rgba(31,138,91,.18)':'rgba(11,42,74,.4)', backdropFilter:'blur(6px)', color:'#fff', fontSize:11, fontWeight:600, borderRadius:99}}>{p.status}</span>
      </div>
      <div style={{padding:'16px 18px', display:'flex', flexDirection:'column', gap:6, flex:1}}>
        <div style={{display:'flex', alignItems:'center', gap:6, color:'var(--ink-400)', fontSize:11.5}}>
          <Icon name="pin" size={12}/> {p.loc} · {p.d}
        </div>
        <div style={{fontFamily:'var(--f-display)', fontSize:18, color:'var(--navy-800)', lineHeight:1.2}}>{p.n}</div>
        <div style={{display:'flex', alignItems:'center', gap:10, marginTop:6, fontSize:11.5, color:'var(--ink-500)'}}>
          <span><Icon name="star" size={11} color="var(--gold)"/> {p.rating}</span>
          <span>·</span>
          <span>{p.bookings} bookings</span>
          <span style={{marginLeft:'auto', fontFamily:'var(--f-display)', fontSize:18, color:'var(--navy-900)'}}>RM {p.p.toLocaleString()}</span>
        </div>
        <div style={{display:'flex', gap:6, marginTop:10, paddingTop:10, borderTop:'1px solid var(--line-2)'}}>
          <button style={{...pillBtn, fontSize:11.5, padding:'5px 10px', flex:1}}><Icon name="edit" size={12}/> Edit</button>
          <button style={{...pillBtn, fontSize:11.5, padding:'5px 10px', flex:1}}><Icon name="eye" size={12}/> Preview</button>
          <button style={{...pillBtn, fontSize:11.5, padding:'5px 10px'}}><Icon name="trash" size={12} color="var(--coral)"/></button>
        </div>
      </div>
    </div>
  );
}

function PackageEditorPreview(){
  return (
    <div style={{background:'#fff', border:'1px solid var(--line)', borderRadius:14, padding:'22px 22px', position:'sticky', top:88, alignSelf:'start'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14}}>
        <div className="kicker">PACKAGE EDITOR · NEW</div>
        <button style={{...pillBtn, fontSize:11}}><Icon name="close" size={11}/> Discard</button>
      </div>
      <div style={{display:'flex', flexDirection:'column', gap:14}}>
        <div>
          <div className="kicker" style={{marginBottom:7}}>PACKAGE NAME</div>
          <input defaultValue="Tioman Sailing Adventure" style={inp}/>
        </div>
        <div>
          <div className="kicker" style={{marginBottom:7}}>UPLOAD COVER PHOTO</div>
          <div className="ph ph-tioman" data-label="DRAG IMAGE HERE OR" style={{height:120, borderRadius:10, border:'2px dashed rgba(255,255,255,.4)', position:'relative'}}>
            <button style={{position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)', padding:'8px 16px', background:'#fff', border:0, borderRadius:99, fontFamily:'inherit', fontSize:12, fontWeight:500, cursor:'pointer'}}>Browse files</button>
          </div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
          <div>
            <div className="kicker" style={{marginBottom:7}}>PRICE (RM)</div>
            <input defaultValue="1,540" style={inp}/>
          </div>
          <div>
            <div className="kicker" style={{marginBottom:7}}>DURATION</div>
            <input defaultValue="4D3N" style={inp}/>
          </div>
        </div>
        <div>
          <div className="kicker" style={{marginBottom:7}}>PROMOTION CODE</div>
          <input defaultValue="TIOMAN20" style={inp}/>
        </div>
        <div>
          <div className="kicker" style={{marginBottom:7}}>STATUS</div>
          <div style={{display:'flex', gap:6}}>
            {['Draft','Live','Archived'].map((s,i)=>(
              <button key={s} style={{
                flex:1, padding:'8px 10px', borderRadius:8, cursor:'pointer', fontSize:12, fontFamily:'inherit', fontWeight:500,
                background: i===1 ? 'var(--navy-800)' : '#fff', color: i===1 ? '#fff' : 'var(--ink-700)',
                border: '1px solid ' + (i===1 ? 'var(--navy-800)' : 'var(--line)'),
              }}>{s}</button>
            ))}
          </div>
        </div>
        <button style={{...btnPrimary, justifyContent:'center', marginTop:6}}>Publish package</button>
      </div>
    </div>
  );
}

const inp = {width:'100%', padding:'10px 12px', border:'1px solid var(--line)', borderRadius:9, background:'var(--paper)', fontSize:13, fontFamily:'inherit'};

// ── Notifications page ─────────────────────────────────────────
function AdminNotifications(){
  const [q, setQ] = React.useState('');
  const [tab, setTab] = React.useState('all');
  const all = [
    {tag:'BOOKING',  t:'New booking · VK-2026-04218', d:'Nur Aisyah Rahman booked Langkawi 4D3N · RM 2,716', time:'2 min ago',   c:'var(--blue-500)', read:false},
    {tag:'PAYMENT',  t:'Payment received',            d:'CIMB transfer · RM 3,776 · Daniel Lee · VK-2026-04217', time:'8 min ago',  c:'var(--jade)',     read:false},
    {tag:'ACTION',   t:'Refund requested',            d:'Muhammad Amir · VK-2026-04215 · Reason: schedule conflict', time:'24 min ago', c:'var(--coral)',  read:false},
    {tag:'PROMO',    t:'Promo expiring soon',         d:'MERDEKA32 ends 14 days · 32 bookings so far', time:'1 hour ago',  c:'var(--gold)',     read:false},
    {tag:'REVIEW',   t:'New 5★ review',               d:'Siti Khadijah · Sabah Kundasang Trip · "Excellent guides…"', time:'2 hours ago', c:'var(--ink-400)', read:true},
    {tag:'SYSTEM',   t:'Itinerary updated',           d:'Pulau Redang Day 2 schedule revised by Nur Aisyah', time:'5 hours ago', c:'var(--blue-500)', read:true},
    {tag:'BOOKING',  t:'Booking VK-2026-04209 paid',  d:'Raj Kumar · Sabah Kundasang Trip · RM 6,480 · FPX', time:'1 day ago',   c:'var(--blue-500)', read:true},
    {tag:'CUSTOMER', t:'New customer registered',     d:'Tengku Iskandar created an account', time:'2 days ago', c:'var(--ink-400)', read:true},
  ];
  const filtered = all.filter(n =>
    (tab==='all' || (tab==='unread' && !n.read) || tab.toUpperCase()===n.tag) &&
    (q==='' || (n.t+n.d).toLowerCase().includes(q.toLowerCase()))
  );
  return (
    <AdminShell active="notifications"
      breadcrumb="SYSTEM"
      title="Notifications"
      subtitle={`${all.filter(n=>!n.read).length} unread of ${all.length} total · auto-archived after 30 days`}>

      <div style={{display:'flex', gap:10, marginBottom:18, alignItems:'center'}}>
        <div style={{position:'relative', flex:'0 1 360px'}}>
          <input placeholder="Search notifications…" value={q} onChange={e=>setQ(e.target.value)}
            style={{width:'100%', padding:'10px 14px 10px 40px', border:'1px solid var(--line)', borderRadius:10, fontSize:13, fontFamily:'inherit', background:'#fff'}}/>
          <div style={{position:'absolute', left:14, top:11}}><Icon name="search" size={15} color="var(--ink-400)"/></div>
        </div>
        <button style={{...btnGhost, padding:'10px 14px', fontSize:13}}>Mark all read</button>
        <button style={{...btnGhost, padding:'10px 14px', fontSize:13, marginLeft:'auto'}}>
          <Icon name="settings" size={14}/> Preferences
        </button>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'220px 1fr', gap:16}}>
        <aside style={{background:'#fff', border:'1px solid var(--line)', borderRadius:14, padding:8, alignSelf:'start'}}>
          {[
            {id:'all',      l:'All',           c:all.length, ic:'bell'},
            {id:'unread',   l:'Unread',        c:all.filter(n=>!n.read).length, ic:'bolt'},
            {id:'booking', l:'Bookings',      c:all.filter(n=>n.tag==='BOOKING').length, ic:'cal'},
            {id:'payment', l:'Payments',      c:all.filter(n=>n.tag==='PAYMENT').length, ic:'card'},
            {id:'promo',   l:'Promotions',    c:all.filter(n=>n.tag==='PROMO').length, ic:'tag'},
            {id:'review',  l:'Reviews',       c:all.filter(n=>n.tag==='REVIEW').length, ic:'star-o'},
            {id:'system',  l:'System',        c:all.filter(n=>n.tag==='SYSTEM').length, ic:'settings'},
          ].map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{
              display:'flex', alignItems:'center', gap:10, padding:'9px 12px', width:'100%',
              background: tab===t.id ? 'var(--blue-50)' : 'transparent',
              color: tab===t.id ? 'var(--navy-800)' : 'var(--ink-700)',
              border:0, borderRadius:8, cursor:'pointer', fontFamily:'inherit', fontSize:13, fontWeight:500,
              textAlign:'left', marginBottom:2,
            }}>
              <Icon name={t.ic} size={15} color={tab===t.id?'var(--blue-600)':'var(--ink-500)'}/>
              <span style={{flex:1}}>{t.l}</span>
              <span className="mono" style={{fontSize:11, color: tab===t.id?'var(--navy-800)':'var(--ink-400)'}}>{t.c}</span>
            </button>
          ))}
        </aside>

        <div style={{background:'#fff', border:'1px solid var(--line)', borderRadius:14, overflow:'hidden'}}>
          {filtered.map((n,i)=>(
            <div key={i} style={{
              display:'grid', gridTemplateColumns:'4px auto 1fr auto auto', gap:14, padding:'18px 22px',
              borderTop: i>0 ? '1px solid var(--line-2)' : 'none', background: n.read ? 'transparent' : '#fafbfd',
            }}>
              <span style={{width:4, background:n.c, borderRadius:4}}/>
              <span style={{width:36, height:36, borderRadius:99, background: n.c+'22', color:n.c, display:'grid', placeItems:'center'}}>
                <Icon name={n.tag==='BOOKING'?'cal':n.tag==='PAYMENT'?'card':n.tag==='PROMO'?'tag':n.tag==='REVIEW'?'star-o':n.tag==='ACTION'?'bolt':n.tag==='CUSTOMER'?'user':'bell'} size={15}/>
              </span>
              <div>
                <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:4}}>
                  <span className="mono" style={{fontSize:10, color:n.c, fontWeight:600, letterSpacing:'.12em'}}>{n.tag}</span>
                  {!n.read && <span style={{padding:'1px 7px', background:'var(--blue-500)', color:'#fff', borderRadius:99, fontSize:9.5, fontWeight:600}}>NEW</span>}
                </div>
                <div style={{fontSize:14, fontWeight:600, color:'var(--ink-900)'}}>{n.t}</div>
                <div style={{fontSize:12.5, color:'var(--ink-500)', marginTop:3}}>{n.d}</div>
              </div>
              <div className="mono" style={{fontSize:11, color:'var(--ink-400)', alignSelf:'center'}}>{n.time}</div>
              <div style={{display:'flex', gap:4, alignSelf:'center'}}>
                <button style={rowBtn}><Icon name="check" size={15}/></button>
                <button style={rowBtn}><Icon name="trash" size={15}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

Object.assign(window, { AdminReservations, AdminPackages, AdminNotifications, BookingModal });
