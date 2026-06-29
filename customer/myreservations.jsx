// Customer — "My Reservations" list (for nav item)

function MyReservationsPage(){
  const bookings = [
    {ref:'VK-2026-04218', pkg:'Langkawi Island Escape',     date:'18 Jun 2026', pax:2, status:'Confirmed', paid:'Full', total:2716, img:'ph-langkawi'},
    {ref:'VK-2026-04201', pkg:'Cameron Highlands Tour',     date:'03 Jul 2026', pax:4, status:'Paid',       paid:'Full', total:3776, img:'ph-cameron'},
    {ref:'VK-2026-04157', pkg:'Pulau Redang Marine Park',   date:'12 Aug 2026', pax:2, status:'Pending payment', paid:'Deposit', total:3478, img:'ph-redang'},
    {ref:'VK-2025-03889', pkg:'Penang Heritage & Food',     date:'24 Nov 2025', pax:2, status:'Completed',  paid:'Full', total:1526, img:'ph-penang'},
  ];
  const status = {
    'Confirmed':       {fg:'var(--jade)',     bg:'rgba(31,138,91,.10)'},
    'Paid':            {fg:'var(--blue-600)', bg:'var(--blue-50)'},
    'Pending payment': {fg:'var(--coral)',    bg:'var(--coral-soft)'},
    'Completed':       {fg:'var(--ink-500)',  bg:'var(--cream-2)'},
  };
  const [tab, setTab] = React.useState('all');
  return (
    <main style={{maxWidth:1320, margin:'0 auto', padding:'56px 32px 0'}}>
      <Crumbs items={['Home','My Reservations']}/>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'end', marginTop:18, marginBottom:30}}>
        <div>
          <h1 style={{fontFamily:'var(--f-display)', fontSize:'clamp(40px, 5vw, 64px)', lineHeight:1.05, margin:0, color:'var(--navy-900)', letterSpacing:'-0.01em'}}>
            Your reservations
          </h1>
          <p style={{color:'var(--ink-500)', fontSize:15, marginTop:10}}>4 bookings total · 3 upcoming · 1 completed</p>
        </div>
        <button style={btnPrimary} onClick={()=>nav('#/packages')}>
          <Icon name="plus" size={15}/> New booking
        </button>
      </div>

      <div style={{display:'flex', gap:8, marginBottom:24, borderBottom:'1px solid var(--line)'}}>
        {[['all','All','4'],['up','Upcoming','3'],['done','Completed','1'],['cxl','Cancelled','0']].map(([id,l,c])=>(
          <button key={id} onClick={()=>setTab(id)} style={{
            padding:'12px 18px', background:'none', border:0,
            fontFamily:'inherit', fontSize:14, cursor:'pointer',
            color: tab===id ? 'var(--navy-800)' : 'var(--ink-400)',
            fontWeight: tab===id ? 600 : 500,
            borderBottom: '2px solid ' + (tab===id ? 'var(--blue-500)' : 'transparent'),
            marginBottom:-1, display:'flex', alignItems:'center', gap:8,
          }}>{l} <span style={{padding:'1px 7px', background:'var(--line-2)', borderRadius:99, fontSize:11}}>{c}</span></button>
        ))}
      </div>

      <div style={{display:'flex', flexDirection:'column', gap:14}}>
        {bookings.map(b => {
          const s = status[b.status];
          return (
            <div key={b.ref} style={{display:'grid', gridTemplateColumns:'180px 1fr auto auto', gap:24, background:'#fff', border:'1px solid var(--line)', borderRadius:18, padding:14, alignItems:'center'}}>
              <div className={`ph ${b.img}`} data-label={b.date.toUpperCase()} style={{height:130, borderRadius:12}}/>
              <div>
                <div className="mono" style={{fontSize:11, color:'var(--ink-400)', letterSpacing:'.08em'}}>{b.ref}</div>
                <div style={{fontFamily:'var(--f-display)', fontSize:24, color:'var(--navy-800)', lineHeight:1.2, margin:'4px 0 8px'}}>{b.pkg}</div>
                <div style={{display:'flex', alignItems:'center', gap:18, fontSize:13, color:'var(--ink-500)'}}>
                  <span style={{display:'flex', alignItems:'center', gap:6}}><Icon name="cal" size={14}/> {b.date}</span>
                  <span style={{display:'flex', alignItems:'center', gap:6}}><Icon name="users" size={14}/> {b.pax} pax</span>
                  <span style={{display:'flex', alignItems:'center', gap:6}}><Icon name="card" size={14}/> {b.paid} paid</span>
                </div>
              </div>
              <div style={{textAlign:'right'}}>
                <div className="mono" style={{fontSize:11, color:'var(--ink-400)'}}>TOTAL</div>
                <div style={{fontFamily:'var(--f-display)', fontSize:24, color:'var(--navy-900)', lineHeight:1}}>RM {b.total.toLocaleString()}</div>
                <div style={{padding:'4px 10px', background:s.bg, color:s.fg, fontSize:11, fontWeight:600, borderRadius:99, marginTop:8, display:'inline-block'}}>{b.status}</div>
              </div>
              <div style={{display:'flex', flexDirection:'column', gap:6, paddingRight:8}}>
                <button style={{...btnPrimary, padding:'9px 14px', fontSize:12.5}}>View itinerary</button>
                <button style={{...btnGhost, padding:'9px 14px', fontSize:12.5}}>Manage</button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

Object.assign(window, { MyReservationsPage });
