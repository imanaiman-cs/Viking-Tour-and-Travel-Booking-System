// Customer home page

const PACKAGES = [
  {id:'lk-001', name:'Langkawi Island Escape',     loc:'Langkawi, Kedah',  days:'4 days 3 nights', price:1280, was:1490, rating:4.9, reviews:284, badge:'Bestseller', img:'ph-langkawi', tag:'Beaches'},
  {id:'sb-014', name:'Kundasang Highland Retreat', loc:'Sabah, East Malaysia', days:'5 days 4 nights', price:2160, was:2480, rating:4.8, reviews:192, badge:'New',      img:'ph-kundasang', tag:'Mountains'},
  {id:'ch-022', name:'Cameron Tea Country Tour',   loc:'Pahang Highlands', days:'3 days 2 nights', price:890,  was:1050, rating:4.7, reviews:341, badge:'Limited',  img:'ph-cameron', tag:'Highlands'},
  {id:'pr-008', name:'Pulau Redang Marine Park',   loc:'Terengganu',       days:'4 days 3 nights', price:1640, was:1840, rating:4.9, reviews:218, badge:'',         img:'ph-redang', tag:'Diving'},
  {id:'pn-019', name:'Penang Heritage & Food',     loc:'George Town',      days:'3 days 2 nights', price:720,  was:880,  rating:4.8, reviews:512, badge:'Trending', img:'ph-penang', tag:'Culture'},
  {id:'ml-007', name:'Melaka Strait Heritage',     loc:'Melaka',           days:'2 days 1 night',  price:480,  was:560,  rating:4.6, reviews:267, badge:'',         img:'ph-melaka', tag:'Heritage'},
];

function Home(){
  return (
    <main>
      <Hero/>
      <Strip/>
      <FeaturedDestinations/>
      <PromoBanner/>
      <PopularPackages/>
      <Why/>
      <Reviews/>
    </main>
  );
}

function Hero(){
  return (
    <section style={{
      position:'relative', overflow:'hidden',
      background:'linear-gradient(180deg, #eef5fc 0%, var(--paper) 100%)',
    }}>
      <div style={{
        maxWidth:1320, margin:'0 auto', padding:'72px 32px 36px',
        display:'grid', gridTemplateColumns:'1.05fr .95fr', gap:60, alignItems:'center',
      }} className="hero-grid">
        <div>
          <div className="kicker" style={{display:'inline-flex', alignItems:'center', gap:10, padding:'7px 14px', borderRadius:99, background:'#fff', border:'1px solid var(--line)', color:'var(--navy-700)'}}>
            <span style={{width:6, height:6, borderRadius:6, background:'var(--coral)'}}/>
            Monsoon offers — up to 32% off
          </div>
          <h1 style={{
            fontFamily:'var(--f-display)', fontWeight:400,
            fontSize:'clamp(48px, 5.8vw, 86px)', lineHeight:1.02,
            letterSpacing:'-0.01em', color:'var(--navy-900)',
            margin:'22px 0 18px', textWrap:'pretty',
          }}>
            The archipelago, <br/>
            <span style={{fontStyle:'italic', color:'var(--blue-600)'}}>quietly</span> arranged for you.
          </h1>
          <p style={{
            fontSize:17, lineHeight:1.6, color:'var(--ink-500)',
            maxWidth:520, marginBottom:30,
          }}>
            Hand-picked Malaysian itineraries, local guides, and honest pricing in ringgit.
            From Langkawi's mangroves to Kundasang's morning mist — book a trip you'll actually remember.
          </p>
          <div style={{display:'flex', gap:12, marginBottom:42}}>
            <button style={btnPrimary} onClick={()=>nav('#/packages')}>
              Explore packages <Icon name="arrow-r" size={16}/>
            </button>
            <button style={btnGhost} onClick={()=>nav('#/about')}>How it works</button>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:36, maxWidth:520}}>
            {[
              {n:'14,200+', l:'travellers since 2019'},
              {n:'92', l:'curated itineraries'},
              {n:'4.86', l:'avg. guest rating'},
            ].map((s,i)=>(
              <div key={i}>
                <div style={{fontFamily:'var(--f-display)', fontSize:34, color:'var(--navy-800)'}}>{s.n}</div>
                <div className="kicker">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero photo collage */}
        <div style={{position:'relative', height:580}}>
          <div className="ph ph-langkawi" data-label="LANGKAWI · MANGROVE TOUR" style={{
            position:'absolute', top:0, right:0, width:'78%', height:380,
            borderRadius:'18px',
          }}>
            <div style={{
              position:'absolute', left:18, top:18,
              padding:'5px 12px', borderRadius:99, background:'rgba(255,255,255,.18)',
              backdropFilter:'blur(8px)', fontSize:11, fontFamily:'var(--f-mono)', letterSpacing:'.1em', textTransform:'uppercase'
            }}>06°21′N · 99°48′E</div>
          </div>
          <div className="ph ph-kundasang" data-label="KUNDASANG · MT. KINABALU" style={{
            position:'absolute', bottom:30, left:0, width:'56%', height:300,
            borderRadius:'18px', border:'8px solid var(--paper)',
          }}/>
          <div style={{
            position:'absolute', right:-12, bottom:18, width:230, padding:'16px 18px',
            background:'#fff', border:'1px solid var(--line)', borderRadius:16,
            boxShadow:'var(--sh-3)',
          }}>
            <div className="kicker" style={{color:'var(--jade)'}}>● LIVE WEATHER · LANGKAWI</div>
            <div style={{display:'flex', alignItems:'baseline', gap:10, marginTop:8}}>
              <div style={{fontFamily:'var(--f-display)', fontSize:42, color:'var(--navy-800)', lineHeight:1}}>31°</div>
              <div style={{fontSize:12, color:'var(--ink-400)'}}>partly cloudy<br/>humidity 76%</div>
            </div>
            <div className="divider" style={{margin:'12px 0'}}/>
            <div style={{fontSize:11.5, color:'var(--ink-500)', display:'flex', justifyContent:'space-between'}}>
              <span>Sunrise 06:58</span><span>Sunset 19:24</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div style={{maxWidth:1180, margin:'-24px auto 0', padding:'0 32px', position:'relative', zIndex:5}}>
        <SearchBar/>
      </div>
    </section>
  );
}

function SearchBar(){
  return (
    <div style={{
      background:'#fff', borderRadius:18, padding:8,
      border:'1px solid var(--line)', boxShadow:'var(--sh-3)',
      display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1fr auto', gap:6,
    }} className="search-grid">
      <Field icon="pin"  label="Destination" value="Langkawi, Kedah"/>
      <Field icon="cal"  label="Check-in" value="18 Jun 2026"/>
      <Field icon="cal"  label="Check-out" value="22 Jun 2026"/>
      <Field icon="users" label="Travellers" value="2 adults · 1 child"/>
      <button style={{
        ...btnPrimary, background:'var(--blue-500)', borderColor:'var(--blue-500)',
        padding:'0 26px', minWidth:120, height:64,
      }} onClick={()=>nav('#/packages')}>
        <Icon name="search" size={16}/> Search
      </button>
    </div>
  );
}

function Field({icon, label, value}){
  return (
    <button style={{
      display:'flex', alignItems:'center', gap:12, padding:'8px 14px',
      background:'transparent', border:0, borderRadius:14, cursor:'pointer',
      textAlign:'left', fontFamily:'inherit',
    }}
    onMouseEnter={e=>e.currentTarget.style.background='var(--cream)'}
    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
      <Icon name={icon} size={18} color="var(--navy-700)"/>
      <div>
        <div className="kicker">{label}</div>
        <div style={{fontSize:14, color:'var(--ink-900)', fontWeight:500, marginTop:2}}>{value}</div>
      </div>
    </button>
  );
}

function Strip(){
  const items = ['Local guides','Free cancellation up to 7 days','MOTAC licensed','24/7 WhatsApp support','RM-priced, no FX surprises'];
  return (
    <div style={{borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)', marginTop:60, background:'#fff'}}>
      <div style={{maxWidth:1320, margin:'0 auto', padding:'18px 32px', display:'flex', justifyContent:'space-between', gap:32, flexWrap:'wrap'}}>
        {items.map((x,i)=>(
          <div key={i} style={{display:'flex', alignItems:'center', gap:10, color:'var(--ink-500)', fontSize:13}}>
            <Icon name="check" size={16} color="var(--blue-500)"/> {x}
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturedDestinations(){
  const items = [
    {n:'Langkawi',   sub:'93 islands · UNESCO Geopark',     ph:'ph-langkawi'},
    {n:'Kundasang',  sub:'Mt. Kinabalu foothills',          ph:'ph-kundasang'},
    {n:'Cameron Highlands', sub:'Tea plateaus · 1500m alt', ph:'ph-cameron'},
    {n:'Pulau Redang', sub:'Coral reef · Marine park',      ph:'ph-redang'},
    {n:'Penang',     sub:'George Town heritage',            ph:'ph-penang'},
    {n:'Melaka',     sub:'Straits historic city',           ph:'ph-melaka'},
  ];
  return (
    <section style={{maxWidth:1320, margin:'120px auto 0', padding:'0 32px'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'end', marginBottom:32}}>
        <div>
          <div className="kicker">FEATURED DESTINATIONS · 06</div>
          <h2 style={{fontFamily:'var(--f-display)', fontSize:54, lineHeight:1.05, margin:'8px 0 0', color:'var(--navy-900)', letterSpacing:'-0.01em'}}>
            Six corners of <span style={{fontStyle:'italic', color:'var(--blue-600)'}}>Malaysia</span>,<br/>worth a long detour.
          </h2>
        </div>
        <a href="#/packages" onClick={(e)=>{e.preventDefault(); nav('#/packages');}}
          style={{display:'inline-flex', alignItems:'center', gap:8, fontSize:14, color:'var(--navy-800)', fontWeight:500, paddingBottom:8, borderBottom:'1px solid var(--navy-800)'}}>
          See all destinations <Icon name="arrow-r" size={14}/>
        </a>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gridTemplateRows:'280px 280px', gap:18}} className="dest-grid">
        {items.map((d,i)=>(
          <a key={d.n} href="#/packages" onClick={(e)=>{e.preventDefault(); nav('#/packages');}}
            className={`ph ${d.ph}`} data-label={d.sub.toUpperCase()}
            style={{
              borderRadius:18, position:'relative', overflow:'hidden',
              gridColumn: i===0 ? 'span 1' : 'auto',
              gridRow:    i===0 ? 'span 2' : 'auto',
            }}>
            <div style={{
              position:'absolute', left:0, right:0, bottom:0,
              padding:'24px 22px 18px',
              background:'linear-gradient(180deg, transparent, rgba(11,26,46,.65))'
            }}>
              <div style={{fontFamily:'var(--f-display)', fontSize: i===0 ? 44 : 28, lineHeight:1, color:'#fff'}}>{d.n}</div>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'end', marginTop:8}}>
                <div style={{fontSize:12, color:'rgba(255,255,255,.8)', maxWidth:'70%'}}>{d.sub}</div>
                <div style={{width:34, height:34, borderRadius:99, background:'rgba(255,255,255,.18)', backdropFilter:'blur(6px)', display:'grid', placeItems:'center', color:'#fff'}}>
                  <Icon name="arrow-r" size={14}/>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function PromoBanner(){
  return (
    <section style={{maxWidth:1320, margin:'120px auto 0', padding:'0 32px'}}>
      <div style={{
        position:'relative', overflow:'hidden',
        background:'linear-gradient(110deg, var(--navy-900) 0%, var(--navy-700) 60%, var(--blue-600) 100%)',
        borderRadius:24, color:'#fff', padding:'56px 64px',
        display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:48, alignItems:'center',
      }}>
        <div style={{position:'absolute', inset:0, opacity:.18, pointerEvents:'none',
          background:'radial-gradient(600px 300px at 90% 20%, #fff, transparent), radial-gradient(800px 400px at 10% 110%, #2674e5, transparent)'}}/>
        <div style={{position:'relative'}}>
          <div className="kicker" style={{color:'rgba(255,255,255,.6)'}}>HARI MERDEKA SPECIAL · 31.08.2026</div>
          <div style={{fontFamily:'var(--f-display)', fontSize:54, lineHeight:1.05, margin:'12px 0 14px', letterSpacing:'-0.01em'}}>
            Three nights in Sabah, <span style={{fontStyle:'italic', color:'#7cb8ee'}}>32% off</span>.
          </div>
          <p style={{color:'rgba(255,255,255,.7)', maxWidth:480, fontSize:15, lineHeight:1.6}}>
            Highland farms, hot springs at Poring, sunrise on the Kinabalu ridge — booked through any Malaysian bank card.
          </p>
          <div style={{display:'flex', gap:12, marginTop:24}}>
            <button style={{...btnPrimary, background:'#fff', color:'var(--navy-800)', borderColor:'#fff'}} onClick={()=>nav('#/promotions')}>
              Claim offer <Icon name="arrow-r" size={16}/>
            </button>
            <div style={{display:'flex', alignItems:'center', gap:14, color:'rgba(255,255,255,.65)', fontSize:13}}>
              <span className="mono">CODE</span>
              <span style={{padding:'8px 14px', border:'1px dashed rgba(255,255,255,.4)', borderRadius:8, fontFamily:'var(--f-mono)', fontSize:13, letterSpacing:'.16em', color:'#fff'}}>MERDEKA32</span>
            </div>
          </div>
        </div>
        <div style={{position:'relative', display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:14}}>
          {[
            {l:'Trips left', v:'47'},
            {l:'Departures', v:'12'},
            {l:'Avg. saving', v:'RM 780'},
            {l:'Ends in', v:'14d 06h'},
          ].map((s,i)=>(
            <div key={i} style={{padding:'18px 18px', background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.12)', borderRadius:14}}>
              <div className="kicker" style={{color:'rgba(255,255,255,.5)'}}>{s.l}</div>
              <div style={{fontFamily:'var(--f-display)', fontSize:34, marginTop:6}}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PopularPackages(){
  return (
    <section style={{maxWidth:1320, margin:'120px auto 0', padding:'0 32px'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'end', marginBottom:32}}>
        <div>
          <div className="kicker">POPULAR PACKAGES · UPDATED WEEKLY</div>
          <h2 style={{fontFamily:'var(--f-display)', fontSize:54, lineHeight:1.05, margin:'8px 0 0', color:'var(--navy-900)', letterSpacing:'-0.01em'}}>
            What other Malaysians<br/>are booking this month.
          </h2>
        </div>
        <div style={{display:'flex', gap:8}}>
          {['All','Beach','Mountain','Heritage','Diving'].map((t,i)=>(
            <button key={t} style={{
              padding:'8px 14px', borderRadius:99,
              fontSize:13, fontWeight:500, cursor:'pointer',
              background: i===0 ? 'var(--navy-800)' : '#fff',
              color: i===0 ? '#fff' : 'var(--ink-700)',
              border:'1px solid ' + (i===0 ? 'var(--navy-800)' : 'var(--line)'),
            }}>{t}</button>
          ))}
        </div>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:22}} className="pkg-grid">
        {PACKAGES.slice(0,6).map(p => <PackageCard key={p.id} pkg={p}/>)}
      </div>
    </section>
  );
}

function PackageCard({pkg}){
  return (
    <a href={`#/package/${pkg.id}`} onClick={(e)=>{e.preventDefault(); nav(`#/package/${pkg.id}`);}}
      style={{
        background:'#fff', border:'1px solid var(--line)', borderRadius:18,
        overflow:'hidden', display:'flex', flexDirection:'column',
        transition:'transform .2s ease, box-shadow .2s ease',
      }}
      onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='var(--sh-3)';}}
      onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none';}}>
      <div className={`ph ${pkg.img}`} data-label={pkg.loc.toUpperCase()} style={{height:220, position:'relative'}}>
        {pkg.badge && <span style={{
          position:'absolute', top:14, left:14, padding:'5px 11px',
          background:'#fff', color:'var(--navy-800)', fontSize:11, fontWeight:600,
          letterSpacing:'.06em', textTransform:'uppercase', borderRadius:99,
        }}>{pkg.badge}</span>}
        <span style={{
          position:'absolute', top:14, right:14, padding:'5px 11px',
          background:'rgba(11,26,46,.45)', backdropFilter:'blur(6px)',
          color:'#fff', fontSize:11, fontFamily:'var(--f-mono)', letterSpacing:'.08em',
          textTransform:'uppercase', borderRadius:99,
        }}>{pkg.tag}</span>
      </div>
      <div style={{padding:'20px 22px', display:'flex', flexDirection:'column', gap:8, flex:1}}>
        <div style={{display:'flex', alignItems:'center', gap:5, color:'var(--ink-400)', fontSize:12}}>
          <Icon name="pin" size={13}/> {pkg.loc} · {pkg.days}
        </div>
        <div style={{fontFamily:'var(--f-display)', fontSize:24, color:'var(--navy-800)', lineHeight:1.15}}>{pkg.name}</div>
        <div style={{display:'flex', alignItems:'center', gap:6, marginTop:'auto'}}>
          <Icon name="star" size={14} color="var(--gold)"/>
          <span style={{fontSize:13, fontWeight:600}}>{pkg.rating}</span>
          <span style={{fontSize:12, color:'var(--ink-400)'}}>({pkg.reviews} reviews)</span>
        </div>
        <div className="divider" style={{margin:'8px 0 4px'}}/>
        <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
          <div>
            <span className="mono" style={{fontSize:11, color:'var(--ink-400)'}}>FROM </span>
            {pkg.was && <span style={{textDecoration:'line-through', color:'var(--ink-300)', fontSize:13, marginRight:6}}>RM {pkg.was}</span>}
            <span style={{fontFamily:'var(--f-display)', fontSize:26, color:'var(--navy-900)'}}>RM {pkg.price.toLocaleString()}</span>
            <span style={{fontSize:11, color:'var(--ink-400)', marginLeft:4}}>/ pax</span>
          </div>
          <span style={{
            width:38, height:38, borderRadius:99, background:'var(--cream)',
            display:'grid', placeItems:'center', color:'var(--navy-800)',
          }}><Icon name="arrow-r" size={15}/></span>
        </div>
      </div>
    </a>
  );
}

function Why(){
  const items = [
    {ic:'pin',    t:'Booked by Malaysians, for Malaysians',     d:'Pricing in ringgit, local SIMs sorted, halal-friendly stops marked. We know the school holidays.'},
    {ic:'users',  t:'Small groups, never tour-bus crowds',      d:'Max 12 travellers per departure. You\'ll hear the guide and find a seat at the warung.'},
    {ic:'card',   t:'Pay any way you like',                      d:'FPX, GrabPay, Touch \'n Go, Boost, Atome, or major cards — split payments allowed up to 6 instalments.'},
    {ic:'bolt',   t:'Itineraries you can re-arrange',            d:'Skip the museum, double the snorkelling. Each trip is editable up to 72h before departure.'},
  ];
  return (
    <section style={{maxWidth:1320, margin:'140px auto 0', padding:'0 32px'}}>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:80, alignItems:'start'}} className="why-grid">
        <div style={{position:'sticky', top:100}}>
          <div className="kicker">WHY VIKING TOUR</div>
          <h2 style={{fontFamily:'var(--f-display)', fontSize:54, lineHeight:1.05, margin:'8px 0 18px', color:'var(--navy-900)', letterSpacing:'-0.01em'}}>
            Tourism done <span style={{fontStyle:'italic', color:'var(--blue-600)'}}>quietly</span>.
          </h2>
          <p style={{color:'var(--ink-500)', fontSize:15, lineHeight:1.7, maxWidth:340}}>
            We're not the loudest operator in the country, and that's the point.
            Every itinerary is field-tested by our own team before any guest sees it.
          </p>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
          {items.map((x,i)=>(
            <div key={i} style={{
              background:'#fff', border:'1px solid var(--line)', borderRadius:18,
              padding:'24px 22px', display:'flex', flexDirection:'column', gap:10,
            }}>
              <div style={{
                width:42, height:42, borderRadius:12, background:'var(--blue-50)',
                color:'var(--blue-600)', display:'grid', placeItems:'center',
              }}><Icon name={x.ic} size={18}/></div>
              <div style={{fontFamily:'var(--f-display)', fontSize:22, color:'var(--navy-800)', lineHeight:1.2, marginTop:6}}>{x.t}</div>
              <div style={{fontSize:13.5, color:'var(--ink-500)', lineHeight:1.6}}>{x.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews(){
  const reviews = [
    {n:'Ahmad Firdaus',  loc:'Shah Alam',     r:5, t:'"The Langkawi mangrove paddle at sunrise was the calmest part of my year. Our guide Khairul knew every bird by name."', p:'Langkawi Island · 4D3N · Apr 2026'},
    {n:'Daniel Lee',     loc:'Petaling Jaya', r:5, t:'"Booked it for our anniversary. Zero upselling at any stage and the homestay in Kundasang was nicer than the hotels next door."', p:'Sabah Kundasang · 5D4N · Mar 2026'},
    {n:'Siti Khadijah',  loc:'Johor Bahru',   r:5, t:'"Took my parents to Cameron. They\'re fussy. They\'ve already asked when we\'re going again."', p:'Cameron Highlands · 3D2N · Feb 2026'},
  ];
  return (
    <section style={{maxWidth:1320, margin:'140px auto 0', padding:'0 32px'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'end', marginBottom:32}}>
        <div>
          <div className="kicker">GUEST REVIEWS · 4.86 / 5 AVG</div>
          <h2 style={{fontFamily:'var(--f-display)', fontSize:54, lineHeight:1.05, margin:'8px 0 0', color:'var(--navy-900)', letterSpacing:'-0.01em'}}>
            People talk, <span style={{fontStyle:'italic', color:'var(--blue-600)'}}>thankfully</span>.
          </h2>
        </div>
        <div style={{display:'flex', gap:6}}>
          <button style={iconBtn}><Icon name="arrow-l" size={16}/></button>
          <button style={iconBtn}><Icon name="arrow-r" size={16}/></button>
        </div>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:18}} className="rev-grid">
        {reviews.map((r,i)=>(
          <div key={i} style={{
            background: i===1 ? 'var(--navy-900)' : '#fff',
            color: i===1 ? '#fff' : 'var(--ink-900)',
            border:'1px solid ' + (i===1 ? 'var(--navy-900)' : 'var(--line)'),
            borderRadius:20, padding:'28px 26px',
            display:'flex', flexDirection:'column', gap:16,
          }}>
            <div style={{display:'flex', gap:4}}>
              {[...Array(r.r)].map((_,j)=> <Icon key={j} name="star" size={14} color={i===1 ? '#fce7df' : 'var(--gold)'}/>)}
            </div>
            <p style={{fontFamily:'var(--f-display)', fontSize:22, fontStyle:'italic', lineHeight:1.35, margin:0}}>{r.t}</p>
            <div className="divider" style={{background: i===1 ? 'rgba(255,255,255,.12)' : 'var(--line)'}}/>
            <div>
              <div style={{fontSize:14, fontWeight:600}}>{r.n}</div>
              <div style={{fontSize:12, color: i===1 ? 'rgba(255,255,255,.5)' : 'var(--ink-400)', marginTop:2}}>{r.loc}</div>
            </div>
            <div className="mono" style={{fontSize:10.5, color: i===1 ? 'rgba(255,255,255,.5)' : 'var(--ink-400)', letterSpacing:'.06em'}}>{r.p.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Home, PACKAGES, PackageCard });
