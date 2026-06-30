// Customer — "My Reservations" list (live data from API)

function MyReservationsPage(){
  const [bookings, setBookings] = React.useState([]);
  const [loading, setLoading]   = React.useState(true);
  const [tab, setTab]           = React.useState('all');

  React.useEffect(()=>{
    const uid = window.__vikingUser?.id;
    const url = uid ? `/api/reservations.php?user_id=${uid}` : '/api/reservations.php';
    fetch(url)
      .then(r=>r.json())
      .then(data=>{
        if (Array.isArray(data)) setBookings(data);
      })
      .catch(()=>{})
      .finally(()=>setLoading(false));
  },[]);

  const statusStyle = {
    'Confirmed':  {fg:'var(--jade)',     bg:'rgba(31,138,91,.10)'},
    'Pending':    {fg:'var(--coral)',    bg:'var(--coral-soft)'},
    'Refund':     {fg:'var(--ink-500)',  bg:'var(--cream-2)'},
    'Cancelled':  {fg:'var(--ink-400)',  bg:'var(--line-2)'},
  };

  const today = new Date();
  const filtered = bookings.filter(b=>{
    if (tab==='all')  return true;
    if (tab==='up')   return b.status==='Confirmed' || b.status==='Pending';
    if (tab==='done') return b.status==='Refund';
    if (tab==='cxl')  return b.status==='Cancelled';
    return true;
  });

  const counts = {
    all:  bookings.length,
    up:   bookings.filter(b=>b.status==='Confirmed'||b.status==='Pending').length,
    done: bookings.filter(b=>b.status==='Refund').length,
    cxl:  bookings.filter(b=>b.status==='Cancelled').length,
  };

  function fmtDate(d){
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-MY',{day:'numeric',month:'short',year:'numeric'});
  }

  function imgClass(pkgName){
    if (!pkgName) return 'ph-langkawi';
    const n = pkgName.toLowerCase();
    if (n.includes('langkawi')) return 'ph-langkawi';
    if (n.includes('cameron'))  return 'ph-cameron';
    if (n.includes('redang'))   return 'ph-redang';
    if (n.includes('penang'))   return 'ph-penang';
    if (n.includes('sabah')||n.includes('kundasang')) return 'ph-kundasang';
    if (n.includes('perhentian')) return 'ph-perhentian';
    return 'ph-langkawi';
  }

  return (
    <main style={{maxWidth:1320, margin:'0 auto', padding:'56px 32px 0'}}>
      <Crumbs items={['Home','My Reservations']}/>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'end', marginTop:18, marginBottom:30}}>
        <div>
          <h1 style={{fontFamily:'var(--f-display)', fontSize:'clamp(40px, 5vw, 64px)', lineHeight:1.05, margin:0, color:'var(--navy-900)', letterSpacing:'-0.01em'}}>
            Your reservations
          </h1>
          <p style={{color:'var(--ink-500)', fontSize:15, marginTop:10}}>
            {loading ? 'Loading…' : `${bookings.length} booking${bookings.length!==1?'s':''} total`}
          </p>
        </div>
        <button style={btnPrimary} onClick={()=>nav('#/packages')}>
          <Icon name="plus" size={15}/> New booking
        </button>
      </div>

      <div style={{display:'flex', gap:8, marginBottom:24, borderBottom:'1px solid var(--line)'}}>
        {[['all','All'],['up','Upcoming'],['done','Completed'],['cxl','Cancelled']].map(([id,l])=>(
          <button key={id} onClick={()=>setTab(id)} style={{
            padding:'12px 18px', background:'none', border:0,
            fontFamily:'inherit', fontSize:14, cursor:'pointer',
            color: tab===id ? 'var(--navy-800)' : 'var(--ink-400)',
            fontWeight: tab===id ? 600 : 500,
            borderBottom: '2px solid ' + (tab===id ? 'var(--blue-500)' : 'transparent'),
            marginBottom:-1, display:'flex', alignItems:'center', gap:8,
          }}>{l} <span style={{padding:'1px 7px', background:'var(--line-2)', borderRadius:99, fontSize:11}}>{counts[id]}</span></button>
        ))}
      </div>

      {loading && (
        <div style={{textAlign:'center', padding:'80px 0', color:'var(--ink-400)', fontSize:15}}>Loading reservations…</div>
      )}

      {!loading && filtered.length===0 && (
        <div style={{textAlign:'center', padding:'80px 0'}}>
          <div style={{fontSize:48, marginBottom:16}}>🗓️</div>
          <div style={{fontSize:18, fontWeight:600, color:'var(--navy-800)', marginBottom:8}}>No reservations yet</div>
          <div style={{color:'var(--ink-500)', marginBottom:24}}>Start by browsing our travel packages.</div>
          <button style={btnPrimary} onClick={()=>nav('#/packages')}>Explore packages</button>
        </div>
      )}

      <div style={{display:'flex', flexDirection:'column', gap:14}}>
        {filtered.map(b => {
          const s = statusStyle[b.status] || {fg:'var(--ink-500)', bg:'var(--line-2)'};
          const img = imgClass(b.package_name);
          return (
            <div key={b.ref} style={{display:'grid', gridTemplateColumns:'180px 1fr auto auto', gap:24, background:'#fff', border:'1px solid var(--line)', borderRadius:18, padding:14, alignItems:'center'}}>
              <div className={`ph ${img}`} data-label={fmtDate(b.travel_date).toUpperCase()} style={{height:130, borderRadius:12}}/>
              <div>
                <div className="mono" style={{fontSize:11, color:'var(--ink-400)', letterSpacing:'.08em'}}>{b.ref}</div>
                <div style={{fontFamily:'var(--f-display)', fontSize:24, color:'var(--navy-800)', lineHeight:1.2, margin:'4px 0 8px'}}>{b.package_name || 'Custom Package'}</div>
                <div style={{display:'flex', alignItems:'center', gap:18, fontSize:13, color:'var(--ink-500)'}}>
                  <span style={{display:'flex', alignItems:'center', gap:6}}><Icon name="cal" size={14}/> {fmtDate(b.travel_date)}</span>
                  <span style={{display:'flex', alignItems:'center', gap:6}}><Icon name="users" size={14}/> {b.pax} pax</span>
                  <span style={{display:'flex', alignItems:'center', gap:6}}><Icon name="card" size={14}/> {b.payment_status}</span>
                </div>
              </div>
              <div style={{textAlign:'right'}}>
                <div className="mono" style={{fontSize:11, color:'var(--ink-400)'}}>TOTAL</div>
                <div style={{fontFamily:'var(--f-display)', fontSize:24, color:'var(--navy-900)', lineHeight:1}}>RM {Number(b.amount).toLocaleString()}</div>
                <div style={{padding:'4px 10px', background:s.bg, color:s.fg, fontSize:11, fontWeight:600, borderRadius:99, marginTop:8, display:'inline-block'}}>{b.status}</div>
              </div>
              <div style={{display:'flex', flexDirection:'column', gap:6, paddingRight:8}}>
                <button style={{...btnPrimary, padding:'9px 14px', fontSize:12.5}} onClick={()=>nav(`#/reservation/${b.package_id||''}`)}>View details</button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

Object.assign(window, { MyReservationsPage });
