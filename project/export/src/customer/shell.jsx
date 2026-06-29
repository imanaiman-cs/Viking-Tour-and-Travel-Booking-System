// Customer site — header, footer, router scaffold
// Uses hash routing (#/page) so refreshes keep state.

const ROUTES = [
  {id:'home',     label:'Home',            path:'#/'},
  {id:'packages', label:'Travel Packages', path:'#/packages'},
  {id:'reservations', label:'Reservations', path:'#/reservations'},
  {id:'promotions', label:'Promotions',    path:'#/promotions'},
  {id:'about',    label:'About Us',        path:'#/about'},
  {id:'contact',  label:'Contact Us',      path:'#/contact'},
];

function useHashRoute(){
  const parse = ()=> {
    const h = (window.location.hash || '#/').replace(/^#/, '');
    const [path, ...rest] = h.split('?');
    const segs = path.split('/').filter(Boolean);
    return { segs, raw: h };
  };
  const [r, setR] = React.useState(parse());
  React.useEffect(()=>{
    const f = ()=> setR(parse());
    window.addEventListener('hashchange', f);
    return ()=> window.removeEventListener('hashchange', f);
  },[]);
  return r;
}

function nav(to){ window.location.hash = to; window.scrollTo({top:0, behavior:'instant'}); }

// ── Header ─────────────────────────────────────────────────────
function Header({activeId, onSearchOpen}){
  const [scrolled, setScrolled] = React.useState(false);
  const [openBell, setOpenBell] = React.useState(false);
  const [openUser, setOpenUser] = React.useState(false);
  const [openMobile, setOpenMobile] = React.useState(false);
  React.useEffect(()=>{
    const f = ()=> setScrolled(window.scrollY > 12);
    f(); window.addEventListener('scroll', f);
    return ()=> window.removeEventListener('scroll', f);
  },[]);
  React.useEffect(()=>{
    const f = (e)=>{ if(!e.target.closest('[data-pop]')){ setOpenBell(false); setOpenUser(false); } };
    document.addEventListener('click', f);
    return ()=> document.removeEventListener('click', f);
  },[]);

  return (
    <header style={{
      position:'sticky', top:0, zIndex:50,
      background: scrolled ? 'rgba(255,255,255,.86)' : 'rgba(255,255,255,.65)',
      backdropFilter:'saturate(1.4) blur(14px)',
      WebkitBackdropFilter:'saturate(1.4) blur(14px)',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      transition:'all .2s ease',
    }}>
      <div style={{maxWidth:1320, margin:'0 auto', padding:'14px 32px', display:'flex', alignItems:'center', gap:24}}>
        <a href="#/" onClick={(e)=>{e.preventDefault(); nav('#/');}} style={{display:'flex'}}>
          <Wordmark/>
        </a>
        <nav className="row" style={{gap:6, marginLeft:18}} data-hide-on-mobile>
          {ROUTES.map(r => (
            <a key={r.id} href={r.path}
              onClick={(e)=>{e.preventDefault(); nav(r.path);}}
              style={{
                position:'relative',
                padding:'8px 12px', fontSize:13.5, fontWeight:500,
                color: activeId===r.id ? 'var(--navy-800)' : 'var(--ink-500)',
                borderRadius:8, transition:'color .15s',
              }}>
              {r.label}
              {activeId===r.id && <span style={{
                position:'absolute', left:12, right:12, bottom:2,
                height:2, background:'var(--blue-500)', borderRadius:2,
              }}/>}
            </a>
          ))}
        </nav>
        <div className="row" style={{marginLeft:'auto', gap:8}}>
          <button onClick={onSearchOpen} aria-label="Search" style={iconBtn} data-hide-on-mobile>
            <Icon name="search" size={18}/>
          </button>
          <div style={{position:'relative'}} data-pop>
            <button aria-label="Notifications" style={iconBtn}
              onClick={(e)=>{e.stopPropagation(); setOpenBell(v=>!v); setOpenUser(false);}}>
              <Icon name="bell" size={18}/>
              <span style={{
                position:'absolute', top:6, right:6, width:7, height:7, borderRadius:7,
                background:'var(--coral)', boxShadow:'0 0 0 2px #fff'
              }}/>
            </button>
            {openBell && <NotifPopover/>}
          </div>
          <div style={{position:'relative', marginLeft:6}} data-pop>
            <button onClick={(e)=>{e.stopPropagation(); setOpenUser(v=>!v); setOpenBell(false);}}
              style={{
                display:'flex', alignItems:'center', gap:10,
                padding:'5px 5px 5px 12px', borderRadius:99,
                background:'#fff', border:'1px solid var(--line)', cursor:'pointer',
                fontFamily:'inherit', fontSize:13, color:'var(--ink-700)'
              }}>
              <span style={{fontWeight:500}} data-hide-on-mobile>Nur Aisyah</span>
              <span style={{
                width:30, height:30, borderRadius:99,
                background:'linear-gradient(135deg, var(--navy-700), var(--blue-500))',
                color:'#fff', display:'grid', placeItems:'center',
                fontSize:11, fontWeight:600, letterSpacing:.4,
              }}>NA</span>
            </button>
            {openUser && <UserPopover/>}
          </div>
          <button data-show-on-mobile style={{...iconBtn, display:'none'}} onClick={()=>setOpenMobile(true)} aria-label="Menu">
            <Icon name="menu" size={20}/>
          </button>
        </div>
      </div>
      {openMobile && <MobileMenu activeId={activeId} onClose={()=>setOpenMobile(false)}/>}
    </header>
  );
}

const iconBtn = {
  width:38, height:38, borderRadius:10,
  display:'grid', placeItems:'center',
  background:'rgba(255,255,255,.65)',
  border:'1px solid var(--line)',
  color:'var(--ink-700)', cursor:'pointer',
  position:'relative',
};

function NotifPopover(){
  const items = [
    {t:'Booking confirmed', d:'Langkawi Island Package · 18 Jun 2026', tag:'booking', time:'2m'},
    {t:'Flash promo — 28% off', d:'Sabah Kundasang Trip · Ends 23:59', tag:'promo', time:'1h'},
    {t:'Payment reminder', d:'Outstanding RM 480 · #BK-2026-0418', tag:'system', time:'5h'},
    {t:'Itinerary updated', d:'Pulau Redang · Day 2 schedule revised', tag:'system', time:'1d'},
  ];
  const tagColor = {booking:'var(--blue-500)', promo:'var(--coral)', system:'var(--ink-400)'};
  return (
    <div style={{
      position:'absolute', top:'calc(100% + 8px)', right:0, width:360,
      background:'#fff', border:'1px solid var(--line)', borderRadius:14,
      boxShadow:'var(--sh-3)', overflow:'hidden', zIndex:60,
    }}>
      <div style={{padding:'14px 16px', display:'flex', justifyContent:'space-between', alignItems:'baseline', borderBottom:'1px solid var(--line-2)'}}>
        <div style={{fontFamily:'var(--f-display)', fontSize:18, color:'var(--navy-800)'}}>Notifications</div>
        <span className="kicker">4 NEW</span>
      </div>
      <div style={{maxHeight:340, overflow:'auto'}} className="scroll">
        {items.map((n,i)=>(
          <div key={i} style={{
            display:'grid', gridTemplateColumns:'8px 1fr auto', gap:12,
            padding:'12px 16px', borderBottom:'1px solid var(--line-2)', cursor:'pointer',
          }} onMouseEnter={e=>e.currentTarget.style.background='#fafbfd'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
            <span style={{width:8, height:8, marginTop:7, borderRadius:8, background:tagColor[n.tag]}}/>
            <div>
              <div style={{fontSize:13.5, fontWeight:500, color:'var(--ink-900)'}}>{n.t}</div>
              <div style={{fontSize:12.5, color:'var(--ink-500)', marginTop:2}}>{n.d}</div>
            </div>
            <div style={{fontFamily:'var(--f-mono)', fontSize:10.5, color:'var(--ink-300)'}}>{n.time}</div>
          </div>
        ))}
      </div>
      <div style={{padding:'10px 16px', textAlign:'center', background:'#fafbfd'}}>
        <a href="#/promotions" onClick={(e)=>{e.preventDefault(); nav('#/promotions');}}
           style={{fontSize:12.5, color:'var(--blue-600)', fontWeight:500}}>View all notifications →</a>
      </div>
    </div>
  );
}

function UserPopover(){
  const items = [
    {ic:'user',     label:'My profile',     sub:'Personal details'},
    {ic:'cal',      label:'My bookings',    sub:'3 upcoming trips'},
    {ic:'tag',      label:'Saved promos',   sub:'2 active'},
    {ic:'settings', label:'Settings',       sub:'Preferences & privacy'},
  ];
  return (
    <div style={{
      position:'absolute', top:'calc(100% + 8px)', right:0, width:280,
      background:'#fff', border:'1px solid var(--line)', borderRadius:14,
      boxShadow:'var(--sh-3)', overflow:'hidden', zIndex:60, padding:6,
    }}>
      <div style={{display:'flex', gap:12, padding:'10px 12px 12px'}}>
        <div style={{
          width:42, height:42, borderRadius:99,
          background:'linear-gradient(135deg, var(--navy-700), var(--blue-500))',
          color:'#fff', display:'grid', placeItems:'center',
          fontSize:13, fontWeight:600
        }}>NA</div>
        <div>
          <div style={{fontWeight:600, fontSize:14, color:'var(--ink-900)'}}>Nur Aisyah Rahman</div>
          <div style={{fontSize:12, color:'var(--ink-400)'}}>aisyah.r@gmail.com</div>
        </div>
      </div>
      <div style={{height:1, background:'var(--line-2)', margin:'0 4px 4px'}}/>
      {items.map((it,i)=>(
        <button key={i} style={{
          display:'flex', alignItems:'center', gap:12, padding:'9px 10px',
          width:'100%', background:'transparent', border:'none', borderRadius:8,
          cursor:'pointer', textAlign:'left', color:'var(--ink-700)'
        }}
        onMouseEnter={e=>e.currentTarget.style.background='#fafbfd'}
        onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
          <Icon name={it.ic} size={17} color="var(--ink-500)"/>
          <div>
            <div style={{fontSize:13.5, fontWeight:500}}>{it.label}</div>
            <div style={{fontSize:11.5, color:'var(--ink-400)'}}>{it.sub}</div>
          </div>
        </button>
      ))}
      <div style={{height:1, background:'var(--line-2)', margin:'4px 4px'}}/>
      <button style={{
        display:'flex', alignItems:'center', gap:12, padding:'9px 10px',
        width:'100%', background:'transparent', border:'none', borderRadius:8,
        cursor:'pointer', textAlign:'left', color:'var(--coral)', fontWeight:500, fontSize:13.5,
      }}>
        <Icon name="logout" size={17}/> Log out
      </button>
    </div>
  );
}

function MobileMenu({activeId, onClose}){
  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(11,42,74,.4)',
      backdropFilter:'blur(4px)', zIndex:80,
    }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{
        position:'absolute', top:0, right:0, bottom:0, width:'min(360px, 86vw)',
        background:'#fff', padding:'20px 22px', display:'flex', flexDirection:'column', gap:6,
      }}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18}}>
          <Wordmark compact/>
          <button onClick={onClose} style={iconBtn}><Icon name="close" size={18}/></button>
        </div>
        {ROUTES.map(r => (
          <a key={r.id} href={r.path}
            onClick={(e)=>{e.preventDefault(); nav(r.path); onClose();}}
            style={{
              padding:'13px 12px', fontSize:15, fontWeight:500,
              color: activeId===r.id ? 'var(--navy-800)' : 'var(--ink-700)',
              borderRadius:10,
              background: activeId===r.id ? 'var(--blue-50)' : 'transparent',
            }}>
            {r.label}
          </a>
        ))}
        <div style={{marginTop:'auto', display:'flex', gap:10}}>
          <button style={{...btnGhost, flex:1}}>Log in</button>
          <button style={{...btnPrimary, flex:1}}>Sign up</button>
        </div>
      </div>
    </div>
  );
}

// ── Buttons ─────────────────────────────────────────────────────
const btnPrimary = {
  padding:'12px 22px', borderRadius:99,
  background:'var(--navy-800)', color:'#fff',
  border:'1px solid var(--navy-800)', cursor:'pointer',
  fontFamily:'inherit', fontSize:14, fontWeight:500,
  display:'inline-flex', alignItems:'center', gap:8,
  transition:'transform .15s, box-shadow .15s',
  boxShadow:'0 4px 16px rgba(11,42,74,.18)',
};
const btnGhost = {
  padding:'12px 22px', borderRadius:99,
  background:'#fff', color:'var(--navy-800)',
  border:'1px solid var(--line)', cursor:'pointer',
  fontFamily:'inherit', fontSize:14, fontWeight:500,
  display:'inline-flex', alignItems:'center', gap:8,
};
const btnAccent = {
  ...btnPrimary, background:'var(--blue-500)', borderColor:'var(--blue-500)',
};

// ── Footer ─────────────────────────────────────────────────────
function Footer(){
  return (
    <footer style={{background:'var(--navy-900)', color:'#fff', marginTop:120}}>
      {/* Newsletter */}
      <div style={{
        maxWidth:1320, margin:'0 auto', padding:'56px 32px 40px',
        display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:48,
        borderBottom:'1px solid rgba(255,255,255,.08)',
      }} className="footer-top">
        <div>
          <div style={{fontFamily:'var(--f-display)', fontSize:36, lineHeight:1.1, fontStyle:'italic'}}>
            Stories from the Strait — <br/>delivered monthly.
          </div>
          <p style={{color:'rgba(255,255,255,.6)', fontSize:14, maxWidth:440, marginTop:14}}>
            Curated Malaysian itineraries, member-only fares, and the occasional sunset photograph from our guides.
          </p>
        </div>
        <form onSubmit={e=>e.preventDefault()} style={{alignSelf:'end'}}>
          <label className="kicker" style={{color:'rgba(255,255,255,.5)'}}>Newsletter subscription</label>
          <div style={{
            marginTop:10, display:'flex', alignItems:'center',
            background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.12)',
            borderRadius:99, padding:'5px 5px 5px 22px',
          }}>
            <input placeholder="your.name@gmail.com" style={{
              flex:1, background:'transparent', border:0, outline:0,
              color:'#fff', fontFamily:'inherit', fontSize:14, padding:'8px 0',
            }}/>
            <button style={{
              padding:'10px 22px', borderRadius:99,
              background:'#fff', color:'var(--navy-800)', border:0,
              fontFamily:'inherit', fontWeight:500, fontSize:13.5, cursor:'pointer',
            }}>Subscribe →</button>
          </div>
          <div style={{fontSize:11.5, color:'rgba(255,255,255,.45)', marginTop:10}}>
            By subscribing you agree to our privacy policy. No spam, unsubscribe any time.
          </div>
        </form>
      </div>

      {/* Columns */}
      <div style={{
        maxWidth:1320, margin:'0 auto', padding:'48px 32px',
        display:'grid', gridTemplateColumns:'1.6fr 1fr 1fr 1fr 1fr', gap:40,
      }} className="footer-cols">
        <div>
          <Wordmark onDark/>
          <p style={{color:'rgba(255,255,255,.6)', fontSize:13, lineHeight:1.7, marginTop:18, maxWidth:300}}>
            Independent Malaysian tour operator, planning thoughtful trips across the archipelago since 2019.
          </p>
          <div style={{display:'flex', gap:8, marginTop:20}}>
            {['fb','ig','tw','tt'].map(s => (
              <a key={s} href="#" style={{
                width:36, height:36, borderRadius:99,
                background:'rgba(255,255,255,.06)',
                border:'1px solid rgba(255,255,255,.08)',
                display:'grid', placeItems:'center', color:'#fff',
              }}><Icon name={s} size={15}/></a>
            ))}
          </div>
        </div>
        <FooterCol title="Quick Links" items={['Home','Travel Packages','Reservations','Promotions','Loyalty Programme']}/>
        <FooterCol title="Destinations" items={['Langkawi Island','Sabah Kundasang','Cameron Highlands','Pulau Redang','Pulau Perhentian']}/>
        <FooterCol title="Customer Support" items={['Help Centre','Booking Guide','Cancellation Policy','Travel Insurance','FAQ']}/>
        <div>
          <div className="kicker" style={{color:'rgba(255,255,255,.5)', marginBottom:14}}>About Company</div>
          <div style={{fontSize:13, lineHeight:1.7, color:'rgba(255,255,255,.75)'}}>
            <div style={{fontWeight:500, color:'#fff', marginBottom:6}}>Viking Tour &amp; Travel Sdn. Bhd.</div>
            No. 18, Jalan Bukit Bintang,<br/>
            55100 Kuala Lumpur, Malaysia
            <div style={{marginTop:14, display:'flex', alignItems:'center', gap:8}}>
              <Icon name="phone" size={14} color="rgba(255,255,255,.6)"/> +60 12-345 6789
            </div>
            <div style={{display:'flex', alignItems:'center', gap:8, marginTop:6}}>
              <Icon name="mail" size={14} color="rgba(255,255,255,.6)"/> support@vikingtour.com.my
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{borderTop:'1px solid rgba(255,255,255,.08)'}}>
        <div style={{
          maxWidth:1320, margin:'0 auto', padding:'20px 32px',
          display:'flex', justifyContent:'space-between', alignItems:'center', gap:20,
          fontSize:12, color:'rgba(255,255,255,.5)',
        }} className="footer-bot">
          <div className="mono">© 2026 VIKING TOUR &amp; TRAVEL · MALAYSIA</div>
          <div style={{display:'flex', gap:24}}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms &amp; Conditions</a>
            <a href="#">Cookie Settings</a>
            <a href="#">Sitemap</a>
          </div>
          <div className="mono">MOTAC LICENSE · KPK/LN 8821</div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({title, items}){
  return (
    <div>
      <div className="kicker" style={{color:'rgba(255,255,255,.5)', marginBottom:14}}>{title}</div>
      <div style={{display:'flex', flexDirection:'column', gap:9}}>
        {items.map(x => <a key={x} href="#" style={{fontSize:13, color:'rgba(255,255,255,.75)'}}>{x}</a>)}
      </div>
    </div>
  );
}

Object.assign(window, { Header, Footer, useHashRoute, nav, btnPrimary, btnGhost, btnAccent, iconBtn, ROUTES });
