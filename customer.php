<?php
/**
 * Viking Tour & Travel — Customer Site
 * Public-facing pages: Home, Packages, Package Detail, Reservation Flow,
 * My Reservations, Promotions, About, Contact, Account Settings.
 * Hash-routed single-page app powered by React + Babel.
 */
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Viking Tour &amp; Travel — Malaysia</title>
<link rel="stylesheet" href="shared.css"/>
<style>
  /* Customer-site responsive tweaks */
  @keyframes pulse {
    0%,100% { box-shadow: 0 6px 20px rgba(232,99,58,.5); }
    50%     { box-shadow: 0 6px 24px rgba(232,99,58,.9), 0 0 0 12px rgba(232,99,58,.18); }
  }
  [data-show-on-mobile]{display:none !important}
  @media (max-width: 980px) {
    .hero-grid, .why-grid, .dest-grid, .pkg-grid, .rev-grid,
    .detail-grid, .rsv-grid, .pkg-page-grid, .team-grid, .about-hero, .footer-top, .footer-cols, .footer-bot{
      grid-template-columns: 1fr !important; gap: 28px !important;
    }
    .search-grid{grid-template-columns: 1fr !important}
    .footer-bot{flex-direction: column !important; align-items:flex-start !important}
    [data-hide-on-mobile]{display:none !important}
    [data-show-on-mobile]{display:grid !important}
  }
  /* hide focus rings only where we control them */
  input:focus, textarea:focus, select:focus { outline: 2px solid var(--blue-500); outline-offset: 1px; border-color: var(--blue-500) !important; }
  button:focus-visible { outline: 2px solid var(--blue-500); outline-offset: 2px; }
</style>
</head>
<body>
<div id="root"></div>

<?php include 'includes/react-cdn.php'; ?>
<script src="destination-images.js"></script>

<script type="text/babel" src="brand.jsx"></script>
<script type="text/babel" src="customer/shell.jsx"></script>
<script type="text/babel" src="customer/home.jsx"></script>
<script type="text/babel" src="customer/packages.jsx"></script>
<script type="text/babel" src="customer/detail.jsx"></script>
<script type="text/babel" src="customer/reservation.jsx"></script>
<script type="text/babel" src="customer/static.jsx"></script>
<script type="text/babel" src="customer/myreservations.jsx"></script>
<script type="text/babel" src="customer/settings.jsx"></script>

<script type="text/babel">
function App(){
  const {segs} = useHashRoute();
  const [search, setSearch] = React.useState(false);

  let page='home', body=null, activeId='home';
  if (segs.length===0)                       { page='home';    body=<Home/>;              activeId='home'; }
  else if (segs[0]==='packages')             { page='packages'; body=<PackagesPage/>;     activeId='packages'; }
  else if (segs[0]==='package')              { page='detail';   body=<DetailPage id={segs[1]}/>;     activeId='packages'; }
  else if (segs[0]==='reservation')          { page='rsv';      body=<ReservationPage id={segs[1]}/>;activeId='packages'; }
  else if (segs[0]==='reservations')         { page='myrsv';    body=<MyReservationsPage/>;          activeId='reservations'; }
  else if (segs[0]==='about')                { page='about';    body=<AboutPage/>;        activeId='about'; }
  else if (segs[0]==='contact')              { page='contact';  body=<ContactPage/>;      activeId='contact'; }
  else if (segs[0]==='promotions')           { page='promos';   body=<PromotionsPage/>;   activeId='promotions'; }
  else if (segs[0]==='settings')             { page='settings'; body=<CustomerSettings/>; activeId='home'; }
  else                                       { body=<Home/>;                              activeId='home'; }

  return (
    <div data-screen-label={`Customer · ${activeId}`}>
      <Header activeId={activeId} onSearchOpen={()=>setSearch(true)}/>
      {body}
      <Footer/>
      {search && <SearchOverlay onClose={()=>setSearch(false)}/>}
    </div>
  );
}

function SearchOverlay({onClose}){
  const [q, setQ] = React.useState('');
  const hits = PACKAGES.filter(p => q==='' || (p.name+p.loc+p.tag).toLowerCase().includes(q.toLowerCase())).slice(0,5);
  return (
    <div onClick={onClose} style={{
      position:'fixed', inset:0, zIndex:100, background:'rgba(11,42,74,.5)',
      backdropFilter:'blur(6px)', display:'grid', placeItems:'start center', paddingTop:'10vh',
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        width:'min(720px, 92vw)', background:'#fff', borderRadius:18, boxShadow:'var(--sh-4)', overflow:'hidden',
      }}>
        <div style={{display:'flex', alignItems:'center', gap:14, padding:'16px 22px', borderBottom:'1px solid var(--line-2)'}}>
          <Icon name="search" size={20} color="var(--ink-400)"/>
          <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Search destinations, packages, places…"
            style={{flex:1, border:0, outline:0, fontFamily:'inherit', fontSize:17, color:'var(--ink-900)'}}/>
          <kbd style={{padding:'3px 8px', background:'var(--paper)', border:'1px solid var(--line)', borderRadius:6, fontSize:11, fontFamily:'var(--f-mono)', color:'var(--ink-500)'}}>ESC</kbd>
        </div>
        <div style={{padding:'12px 12px 16px'}}>
          <div className="kicker" style={{padding:'8px 14px'}}>{q ? 'PACKAGES' : 'POPULAR RIGHT NOW'}</div>
          {hits.map(h => (
            <a key={h.id} href={`#/package/${h.id}`} onClick={(e)=>{e.preventDefault(); nav(`#/package/${h.id}`); onClose();}}
              style={{display:'flex', gap:14, alignItems:'center', padding:'10px 14px', borderRadius:10, cursor:'pointer'}}
              onMouseEnter={e=>e.currentTarget.style.background='var(--paper)'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <div className={`ph ${h.img}`} style={{width:56, height:42, borderRadius:8}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:14, fontWeight:600, color:'var(--ink-900)'}}>{h.name}</div>
                <div style={{fontSize:12, color:'var(--ink-500)'}}>{h.loc} · {h.days}</div>
              </div>
              <div className="mono" style={{fontSize:13, color:'var(--navy-800)', fontWeight:600}}>RM {h.price.toLocaleString()}</div>
            </a>
          ))}
          {hits.length===0 && <div style={{padding:'24px 14px', textAlign:'center', color:'var(--ink-400)', fontSize:13}}>No matches — try "Langkawi" or "Kundasang".</div>}
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
window.addEventListener('keydown', e => { if (e.key==='Escape') document.querySelectorAll('[data-pop]').forEach(()=>{}); });
</script>
</body>
</html>
