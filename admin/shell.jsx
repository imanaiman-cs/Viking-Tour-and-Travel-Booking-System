// Admin shell — sidebar, topbar, layout

function AdminShell({active, title, subtitle, children, breadcrumb}){
  const [openBell, setOpenBell] = React.useState(false);
  const [openUser, setOpenUser] = React.useState(false);
  React.useEffect(()=>{
    const f = (e)=>{ if(!e.target.closest('[data-pop]')){ setOpenBell(false); setOpenUser(false); } };
    document.addEventListener('click', f);
    return ()=> document.removeEventListener('click', f);
  },[]);

  return (
    <div style={{display:'grid', gridTemplateColumns:'248px 1fr', minHeight:'100vh', background:'var(--paper)'}} data-screen-label={`Admin · ${active}`}>
      <Sidebar active={active}/>
      <div style={{display:'flex', flexDirection:'column'}}>
        <header style={{
          position:'sticky', top:0, zIndex:30,
          padding:'16px 36px', background:'rgba(251,249,244,.85)',
          backdropFilter:'blur(14px)', borderBottom:'1px solid var(--line)',
          display:'flex', alignItems:'center', gap:24,
        }}>
          <div style={{flex:1}}>
            {breadcrumb && <div className="kicker" style={{marginBottom:4}}>{breadcrumb}</div>}
            <div style={{fontFamily:'var(--f-display)', fontSize:30, lineHeight:1.05, color:'var(--navy-900)', letterSpacing:'-0.01em'}}>{title}</div>
          </div>

          <div style={{position:'relative', maxWidth:360, flex:1}}>
            <input placeholder="Search bookings, customers, packages…" style={{
              width:'100%', padding:'10px 14px 10px 40px',
              background:'#fff', border:'1px solid var(--line)', borderRadius:99,
              fontSize:13, fontFamily:'inherit',
            }}/>
            <div style={{position:'absolute', left:14, top:11}}><Icon name="search" size={15} color="var(--ink-400)"/></div>
            <span style={{position:'absolute', right:8, top:7, padding:'4px 8px', background:'var(--paper)', border:'1px solid var(--line)', borderRadius:6, fontSize:11, fontFamily:'var(--f-mono)', color:'var(--ink-500)'}}>⌘K</span>
          </div>

          <div style={{position:'relative'}} data-pop>
            <button onClick={(e)=>{e.stopPropagation(); setOpenBell(v=>!v); setOpenUser(false);}}
              style={{...iconBtn, background:'#fff'}}>
              <Icon name="bell" size={17}/>
              <span style={{position:'absolute', top:7, right:7, width:8, height:8, borderRadius:8, background:'var(--coral)', boxShadow:'0 0 0 2px #fff'}}/>
            </button>
            {openBell && <AdminBell/>}
          </div>

          <div style={{position:'relative'}} data-pop>
            <button onClick={(e)=>{e.stopPropagation(); setOpenUser(v=>!v); setOpenBell(false);}}
              style={{display:'flex', alignItems:'center', gap:10, padding:'5px 10px 5px 5px', borderRadius:99, background:'#fff', border:'1px solid var(--line)', cursor:'pointer', fontFamily:'inherit'}}>
              <span style={{width:32, height:32, borderRadius:99, background:'linear-gradient(135deg, var(--navy-700), var(--blue-500))', color:'#fff', display:'grid', placeItems:'center', fontSize:12, fontWeight:600}}>AF</span>
              <div style={{textAlign:'left', lineHeight:1.15}}>
                <div style={{fontSize:13, fontWeight:600}}>Ahmad Firdaus</div>
                <div style={{fontSize:11, color:'var(--ink-400)'}}>Super Admin</div>
              </div>
              <Icon name="chev" size={14} color="var(--ink-400)"/>
            </button>
            {openUser && <UserPopover/>}
          </div>
        </header>

        <div style={{padding:'28px 36px 60px'}}>
          {subtitle && <p style={{color:'var(--ink-500)', fontSize:14, margin:'0 0 24px', maxWidth:680}}>{subtitle}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}

function Sidebar({active}){
  const groups = [
    {l:'Overview', items:[
      {id:'dashboard', label:'Dashboard',     ic:'home',  to:'#/dashboard'},
    ]},
    {l:'Operations', items:[
      {id:'reservations', label:'Reservations', ic:'cal',  to:'#/reservations', badge:'12'},
      {id:'packages',     label:'Packages',     ic:'pkg',  to:'#/packages'},
      {id:'customers',    label:'Customers',    ic:'users',to:'#/customers'},
    ]},
    {l:'System', items:[
      {id:'notifications', label:'Notifications', ic:'bell',     to:'#/notifications', badge:'8'},
      {id:'promotions',    label:'Promotions',    ic:'tag',      to:'#/promotions'},
      {id:'settings',      label:'Settings',      ic:'settings', to:'#/settings'},
    ]},
  ];
  return (
    <aside style={{
      background:'var(--navy-900)', color:'#fff', position:'sticky', top:0, height:'100vh',
      display:'flex', flexDirection:'column', padding:'20px 16px',
    }}>
      <div style={{padding:'4px 8px 18px'}}><Wordmark onDark/></div>

      <div style={{padding:'12px 12px', background:'rgba(255,255,255,.04)', borderRadius:12, marginBottom:18, border:'1px solid rgba(255,255,255,.06)'}}>
        <div className="kicker" style={{color:'rgba(255,255,255,.45)'}}>● OPERATIONS</div>
        <div style={{fontFamily:'var(--f-display)', fontSize:18, marginTop:6}}>Today is busy.</div>
        <div style={{fontSize:11.5, color:'rgba(255,255,255,.6)', marginTop:2}}>12 new bookings · RM 32,480 in</div>
      </div>

      {groups.map((g,gi)=>(
        <div key={gi} style={{marginBottom:18}}>
          <div className="kicker" style={{color:'rgba(255,255,255,.4)', padding:'6px 12px', marginBottom:4}}>{g.l}</div>
          {g.items.map(it => {
            const on = active===it.id;
            return (
              <a key={it.id} href={it.to} onClick={(e)=>{e.preventDefault(); window.location.hash = it.to;}}
                style={{
                  display:'flex', alignItems:'center', gap:11, padding:'9px 12px',
                  borderRadius:9, marginBottom:2, position:'relative',
                  background: on ? 'rgba(255,255,255,.10)' : 'transparent',
                  color: on ? '#fff' : 'rgba(255,255,255,.65)',
                }}>
                {on && <span style={{position:'absolute', left:-16, top:6, bottom:6, width:3, background:'var(--blue-500)', borderRadius:3}}/>}
                <Icon name={it.ic} size={17} color={on ? '#fff' : 'rgba(255,255,255,.6)'}/>
                <span style={{fontSize:13.5, fontWeight: on ? 600 : 500, flex:1}}>{it.label}</span>
                {it.badge && <span style={{padding:'2px 8px', background:'var(--coral)', borderRadius:99, fontSize:10.5, fontWeight:600, color:'#fff'}}>{it.badge}</span>}
              </a>
            );
          })}
        </div>
      ))}

      <div style={{marginTop:'auto', padding:'14px', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.06)', borderRadius:12}}>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <span style={{width:34, height:34, borderRadius:99, background:'linear-gradient(135deg, var(--blue-500), var(--blue-600))', color:'#fff', display:'grid', placeItems:'center', fontSize:12, fontWeight:600}}>AF</span>
          <div style={{flex:1, lineHeight:1.2}}>
            <div style={{fontSize:13, fontWeight:600}}>Ahmad Firdaus</div>
            <div style={{fontSize:11, color:'rgba(255,255,255,.5)'}}>admin@vikingtour.com.my</div>
          </div>
          <button style={{background:'none', border:0, color:'rgba(255,255,255,.6)', cursor:'pointer'}} onClick={()=>window.location.href='auth.php#admin'}><Icon name="logout" size={16}/></button>
        </div>
      </div>
    </aside>
  );
}

function AdminBell(){
  const items = [
    {t:'New booking · VK-2026-04218', d:'Nur Aisyah · Langkawi 4D3N · RM 2,716', tag:'BOOKING', time:'2 min',  c:'var(--blue-500)'},
    {t:'Payment received',            d:'CIMB · RM 3,776 · Daniel Lee',          tag:'PAYMENT', time:'8 min',  c:'var(--jade)'},
    {t:'Refund requested',            d:'#VK-2026-04102 · Cameron 3D2N',        tag:'ACTION',  time:'24 min', c:'var(--coral)'},
    {t:'Promo expiring',              d:'MERDEKA32 ends in 14 days',             tag:'PROMO',   time:'1 h',    c:'var(--gold)'},
    {t:'Review posted',               d:'★★★★★ Siti Khadijah · Kundasang',      tag:'REVIEW',  time:'2 h',    c:'var(--ink-400)'},
  ];
  return (
    <div style={{
      position:'absolute', top:'calc(100% + 10px)', right:0, width:380,
      background:'#fff', border:'1px solid var(--line)', borderRadius:14,
      boxShadow:'var(--sh-3)', overflow:'hidden', zIndex:60,
    }}>
      <div style={{padding:'16px 18px', display:'flex', justifyContent:'space-between', alignItems:'baseline', borderBottom:'1px solid var(--line-2)'}}>
        <div>
          <div style={{fontFamily:'var(--f-display)', fontSize:20, color:'var(--navy-800)'}}>Notifications</div>
          <div style={{fontSize:11.5, color:'var(--ink-400)', marginTop:2}}>8 unread · Today</div>
        </div>
        <button style={{background:'none', border:0, fontSize:12, color:'var(--blue-600)', fontWeight:500, cursor:'pointer'}}>Mark all read</button>
      </div>
      <div style={{maxHeight:380, overflow:'auto'}} className="scroll">
        {items.map((n,i)=>(
          <div key={i} style={{display:'grid', gridTemplateColumns:'10px 1fr auto', gap:12, padding:'12px 18px', borderBottom:'1px solid var(--line-2)', cursor:'pointer'}}>
            <span style={{width:10, height:10, marginTop:7, borderRadius:10, background:n.c}}/>
            <div>
              <span className="mono" style={{fontSize:10, color:n.c, fontWeight:600, letterSpacing:'.12em'}}>{n.tag}</span>
              <div style={{fontSize:13.5, fontWeight:500, marginTop:2}}>{n.t}</div>
              <div style={{fontSize:12, color:'var(--ink-500)', marginTop:2}}>{n.d}</div>
            </div>
            <div className="mono" style={{fontSize:10.5, color:'var(--ink-300)'}}>{n.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UserPopover(){
  return (
    <div style={{position:'absolute', top:'calc(100% + 10px)', right:0, width:240, background:'#fff', border:'1px solid var(--line)', borderRadius:12, boxShadow:'var(--sh-3)', padding:6, zIndex:60}}>
      {[
        {ic:'user', l:'Profile'},
        {ic:'settings', l:'Account settings'},
        {ic:'globe', l:'Switch organisation'},
        {ic:'mail', l:'Contact support'},
      ].map((x,i)=>(
        <button key={i} style={{display:'flex', alignItems:'center', gap:10, padding:'9px 12px', width:'100%', background:'transparent', border:0, borderRadius:7, cursor:'pointer', textAlign:'left', fontSize:13, fontFamily:'inherit', color:'var(--ink-700)'}}
          onMouseEnter={e=>e.currentTarget.style.background='var(--paper)'}
          onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
          <Icon name={x.ic} size={15} color="var(--ink-500)"/> {x.l}
        </button>
      ))}
      <div style={{height:1, background:'var(--line-2)', margin:'4px 4px'}}/>
      <button onClick={()=>window.location.href='auth.php#admin'} style={{display:'flex', alignItems:'center', gap:10, padding:'9px 12px', width:'100%', background:'transparent', border:0, borderRadius:7, cursor:'pointer', textAlign:'left', fontSize:13, fontFamily:'inherit', color:'var(--coral)'}}>
        <Icon name="logout" size={15}/> Log out
      </button>
    </div>
  );
}

Object.assign(window, { AdminShell });
