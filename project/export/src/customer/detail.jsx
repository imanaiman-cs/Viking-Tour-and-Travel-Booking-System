// Customer — Package detail page

function DetailPage({id}){
  const pkg = PACKAGES.find(p => p.id===id) || PACKAGES[0];
  const [tab, setTab] = React.useState('overview');
  const [date, setDate] = React.useState('18 Jun 2026');
  const [pax, setPax] = React.useState(2);

  return (
    <main>
      <div style={{maxWidth:1320, margin:'0 auto', padding:'28px 32px 0'}}>
        <Crumbs items={['Home','Travel Packages', pkg.name]}/>
      </div>

      {/* Hero gallery */}
      <section style={{maxWidth:1320, margin:'18px auto 0', padding:'0 32px'}}>
        <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gridTemplateRows:'200px 200px', gap:10, height:420}}>
          <div className={`ph ${pkg.img}`} data-label={pkg.loc.toUpperCase()} style={{gridColumn:'1 / 2', gridRow:'1 / 3', borderRadius:18}}/>
          <div className="ph ph-perhentian" data-label="DAY 2 · ISLAND HOPPING" style={{borderRadius:18}}/>
          <div className="ph ph-tioman" data-label="DAY 3 · BOAT CHARTER" style={{borderRadius:18}}/>
          <div className="ph ph-penang" data-label="DAY 1 · ARRIVAL" style={{borderRadius:18}}/>
          <div className={`ph ph-mulu`} data-label="VIEW ALL · 28 PHOTOS" style={{borderRadius:18, position:'relative'}}>
            <div style={{position:'absolute', inset:0, display:'grid', placeItems:'center', color:'#fff', background:'rgba(11,26,46,.45)', borderRadius:18}}>
              <div style={{textAlign:'center'}}>
                <div style={{fontFamily:'var(--f-display)', fontSize:32}}>+28</div>
                <div className="kicker" style={{color:'rgba(255,255,255,.7)'}}>PHOTOS &amp; CLIPS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{maxWidth:1320, margin:'48px auto 0', padding:'0 32px', display:'grid', gridTemplateColumns:'1fr 380px', gap:48}} className="detail-grid">
        {/* Left */}
        <div>
          <div style={{display:'flex', alignItems:'center', gap:8, color:'var(--ink-400)', fontSize:13, marginBottom:8}}>
            <Icon name="pin" size={14}/> {pkg.loc} · {pkg.days}
            <span style={{padding:'3px 9px', background:'var(--cream)', borderRadius:99, fontSize:11}}>{pkg.tag}</span>
            {pkg.badge && <span style={{padding:'3px 9px', background:'var(--coral-soft)', color:'var(--coral)', borderRadius:99, fontSize:11, fontWeight:600}}>{pkg.badge}</span>}
          </div>
          <h1 style={{fontFamily:'var(--f-display)', fontSize:'clamp(40px, 5vw, 64px)', lineHeight:1.05, margin:0, color:'var(--navy-900)', letterSpacing:'-0.01em'}}>
            {pkg.name}
          </h1>
          <div style={{display:'flex', alignItems:'center', gap:20, marginTop:18}}>
            <div style={{display:'flex', alignItems:'center', gap:6}}>
              <div style={{display:'flex', gap:2}}>
                {[...Array(5)].map((_,i)=> <Icon key={i} name="star" size={15} color="var(--gold)"/>)}
              </div>
              <span style={{fontWeight:600}}>{pkg.rating}</span>
              <span style={{fontSize:13, color:'var(--ink-500)'}}>· {pkg.reviews} verified reviews</span>
            </div>
            <span className="divider" style={{width:1, height:18}}/>
            <span style={{fontSize:13, color:'var(--ink-500)'}}>Departs from Kuala Lumpur · Wednesdays &amp; Saturdays</span>
          </div>

          {/* Tabs */}
          <div style={{marginTop:36, borderBottom:'1px solid var(--line)', display:'flex', gap:32}}>
            {['overview','itinerary','inclusions','reviews','map'].map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{
                background:'none', border:0, padding:'14px 0', cursor:'pointer',
                fontFamily:'inherit', fontSize:14, textTransform:'capitalize',
                color: tab===t ? 'var(--navy-800)' : 'var(--ink-400)',
                fontWeight: tab===t ? 600 : 500,
                borderBottom: '2px solid ' + (tab===t ? 'var(--blue-500)' : 'transparent'),
                marginBottom:-1,
              }}>{t}</button>
            ))}
          </div>

          <div style={{marginTop:32}}>
            {tab==='overview' && <Overview pkg={pkg}/>}
            {tab==='itinerary' && <Itinerary/>}
            {tab==='inclusions' && <Inclusions/>}
            {tab==='reviews' && <ReviewsDetail/>}
            {tab==='map' && <MapPanel pkg={pkg}/>}
          </div>
        </div>

        {/* Booking card sticky */}
        <aside>
          <div style={{position:'sticky', top:100, background:'#fff', border:'1px solid var(--line)', borderRadius:20, padding:'24px 24px 22px', boxShadow:'var(--sh-2)'}}>
            <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
              <div>
                <span className="mono" style={{fontSize:11, color:'var(--ink-400)'}}>FROM </span>
                {pkg.was && <span style={{textDecoration:'line-through', color:'var(--ink-300)', fontSize:13, marginRight:6}}>RM {pkg.was}</span>}
                <span style={{fontFamily:'var(--f-display)', fontSize:34, color:'var(--navy-900)'}}>RM {pkg.price.toLocaleString()}</span>
              </div>
              <span style={{fontSize:11, color:'var(--ink-400)'}}>/ pax</span>
            </div>
            <div style={{padding:'4px 10px', display:'inline-block', background:'var(--coral-soft)', color:'var(--coral)', fontSize:11, fontWeight:600, borderRadius:99, marginTop:8}}>
              SAVE RM {(pkg.was - pkg.price).toLocaleString()} · MERDEKA32
            </div>

            <div className="divider" style={{margin:'18px 0'}}/>
            <div className="kicker" style={{marginBottom:8}}>DEPARTURE DATE</div>
            <div style={{display:'flex', gap:6, flexWrap:'wrap', marginBottom:16}}>
              {['11 Jun','18 Jun','25 Jun','02 Jul','09 Jul'].map(d=>{
                const v = d+' 2026';
                const on = v===date || d==='18 Jun';
                return <button key={d} onClick={()=>setDate(v)} style={{
                  padding:'8px 12px', borderRadius:10, fontSize:12.5, fontWeight:500, cursor:'pointer',
                  background: on ? 'var(--navy-800)' : '#fff',
                  color: on ? '#fff' : 'var(--ink-700)',
                  border:'1px solid ' + (on ? 'var(--navy-800)' : 'var(--line)'),
                }}>{d}</button>;
              })}
            </div>

            <div className="kicker" style={{marginBottom:8}}>TRAVELLERS</div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', border:'1px solid var(--line)', borderRadius:10, marginBottom:16}}>
              <span style={{fontSize:13.5}}>Adults <span style={{color:'var(--ink-400)'}}>· 12+</span></span>
              <div style={{display:'flex', alignItems:'center', gap:10}}>
                <button onClick={()=>setPax(Math.max(1, pax-1))} style={paxBtn}>−</button>
                <span style={{minWidth:14, textAlign:'center', fontWeight:600}}>{pax}</span>
                <button onClick={()=>setPax(pax+1)} style={paxBtn}>+</button>
              </div>
            </div>

            <div className="divider" style={{margin:'8px 0 16px'}}/>
            <div style={{display:'flex', justifyContent:'space-between', fontSize:13, color:'var(--ink-500)', marginBottom:6}}>
              <span>RM {pkg.price.toLocaleString()} × {pax} pax</span>
              <span className="mono">RM {(pkg.price * pax).toLocaleString()}</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', fontSize:13, color:'var(--ink-500)', marginBottom:6}}>
              <span>Service fee (6% SST)</span>
              <span className="mono">RM {Math.round(pkg.price * pax * 0.06).toLocaleString()}</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', fontSize:13, color:'var(--coral)', marginBottom:14}}>
              <span>MERDEKA32 discount</span>
              <span className="mono">− RM {Math.round((pkg.was-pkg.price)*pax).toLocaleString()}</span>
            </div>
            <div className="divider" style={{margin:'8px 0 14px'}}/>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
              <span style={{fontSize:13.5, fontWeight:500}}>Total payable</span>
              <span style={{fontFamily:'var(--f-display)', fontSize:30, color:'var(--navy-900)'}}>RM {Math.round(pkg.price*pax*1.06).toLocaleString()}</span>
            </div>

            <button style={{...btnPrimary, width:'100%', justifyContent:'center', marginTop:18, padding:'14px 0', fontSize:15}}
              onClick={()=>nav('#/reservation/'+pkg.id)}>
              Reserve now · pay later
            </button>
            <div style={{textAlign:'center', fontSize:11.5, color:'var(--ink-400)', marginTop:10}}>
              No charge today · Free cancellation up to 7 days before departure
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

const paxBtn = {width:28, height:28, borderRadius:8, border:'1px solid var(--line)', background:'#fff', cursor:'pointer', fontSize:16, color:'var(--ink-700)'};

function Overview({pkg}){
  return (
    <div>
      <p style={{fontFamily:'var(--f-display)', fontSize:24, lineHeight:1.4, color:'var(--ink-700)', margin:'0 0 28px', fontStyle:'italic'}}>
        "Mangrove dawns, sunset BBQ on the beach, and a private boat for the day. Built for couples who want to actually relax."
      </p>
      <p style={{color:'var(--ink-500)', fontSize:15, lineHeight:1.75, margin:'0 0 16px'}}>
        Four days threaded around Langkawi's slower side. We start in Cenang for arrival comfort, paddle the mangrove channels at first light on day two,
        then move you to a quieter east-coast resort for the back half — sunset cocktails facing Thailand, snorkel run to Pulau Payar, and a final morning
        with absolutely nothing planned.
      </p>
      <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginTop:30}}>
        {[
          {ic:'cal',   l:'Duration',   v:pkg.days},
          {ic:'users', l:'Group size', v:'Max 12 pax'},
          {ic:'globe', l:'Language',   v:'BM · English'},
          {ic:'wave',  l:'Activity',   v:'Easy · Moderate'},
        ].map((x,i)=>(
          <div key={i} style={{padding:'18px 18px', background:'var(--paper)', border:'1px solid var(--line)', borderRadius:14}}>
            <Icon name={x.ic} size={18} color="var(--blue-600)"/>
            <div className="kicker" style={{marginTop:10}}>{x.l}</div>
            <div style={{fontSize:14, fontWeight:500, marginTop:2}}>{x.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Itinerary(){
  const days = [
    {d:'Day 01', t:'Arrival · Cenang Beach',    bits:['Pickup from LGK Airport','Check-in at Cenang resort','Sunset welcome dinner at Kampung Tok Senik'], dist:'12 km'},
    {d:'Day 02', t:'Mangrove · Eagle feeding',  bits:['Dawn paddle through Kilim Geoforest','Fish farm visit + lunch','Free afternoon at Tanjung Rhu'], dist:'34 km'},
    {d:'Day 03', t:'Island hop · Pulau Payar',  bits:['Charter boat departs 09:00','Snorkel briefing + 2 dive sites','BBQ lunch on the platform'], dist:'48 nm'},
    {d:'Day 04', t:'Departure · Open morning',  bits:['Late checkout (2pm)','Optional cable car at Mat Cincang','Transfer to LGK Airport'], dist:'18 km'},
  ];
  return (
    <div style={{position:'relative'}}>
      <div style={{position:'absolute', left:50, top:8, bottom:8, width:1, background:'var(--line)'}}/>
      {days.map((d,i)=>(
        <div key={i} style={{display:'grid', gridTemplateColumns:'100px 1fr', gap:24, padding:'18px 0', position:'relative'}}>
          <div style={{textAlign:'right', paddingRight:24}}>
            <div className="mono" style={{fontSize:12, color:'var(--ink-400)', letterSpacing:'.1em'}}>{d.d}</div>
            <div className="mono" style={{fontSize:11, color:'var(--ink-300)', marginTop:6}}>{d.dist}</div>
          </div>
          <div style={{paddingLeft:24, position:'relative'}}>
            <div style={{position:'absolute', left:-4.5, top:6, width:10, height:10, borderRadius:10, background:'var(--blue-500)', boxShadow:'0 0 0 4px var(--paper)'}}/>
            <div style={{fontFamily:'var(--f-display)', fontSize:24, color:'var(--navy-800)', lineHeight:1.2}}>{d.t}</div>
            <ul style={{margin:'8px 0 0', padding:0, listStyle:'none'}}>
              {d.bits.map(b => (
                <li key={b} style={{fontSize:13.5, color:'var(--ink-500)', padding:'5px 0', display:'flex', gap:8}}>
                  <Icon name="check" size={14} color="var(--jade)"/> {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

function Inclusions(){
  const yes = ['3 nights hotel accommodation','Airport transfers (return)','Halal breakfast daily','Licensed local guide','Private boat charter Day 3','Snorkel equipment','SST &amp; service charge'];
  const no  = ['International flights','Travel insurance','Personal expenses','Additional excursions','Alcoholic beverages'];
  return (
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:32}}>
      <div>
        <div className="kicker" style={{color:'var(--jade)', marginBottom:14}}>● WHAT'S INCLUDED</div>
        {yes.map(x => (
          <div key={x} style={{padding:'10px 0', display:'flex', gap:10, fontSize:14, color:'var(--ink-700)', borderBottom:'1px solid var(--line-2)'}} dangerouslySetInnerHTML={{__html:`<span style="display:inline-flex; align-items:center; gap:10px;"><span style="width:18px; height:18px; display:grid; place-items:center; background:var(--blue-50); color:var(--jade); border-radius:99;">✓</span> ${x}</span>`}}/>
        ))}
      </div>
      <div>
        <div className="kicker" style={{color:'var(--coral)', marginBottom:14}}>○ NOT INCLUDED</div>
        {no.map(x => (
          <div key={x} style={{padding:'10px 0', display:'flex', gap:10, fontSize:14, color:'var(--ink-500)', borderBottom:'1px solid var(--line-2)'}}>
            <span style={{width:18, height:18, display:'grid', placeItems:'center', background:'#fff', border:'1px solid var(--line)', color:'var(--ink-400)', borderRadius:99, fontSize:11}}>×</span> {x}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewsDetail(){
  const rs = [
    {n:'Muhammad Amir', d:'Mar 2026', r:5, t:'"Worth every ringgit. The boat captain on Day 3 found us a quiet reef no other group was at."'},
    {n:'Siti Khadijah', d:'Feb 2026', r:5, t:'"Excellent trip for my family. The guide kept things relaxed and answered every question my dad threw at him."'},
    {n:'Daniel Lee',    d:'Jan 2026', r:4, t:'"Hotel on the first night was a little tired but day two onwards was excellent. Loved the mangrove paddle."'},
  ];
  return (
    <div>
      <div style={{display:'grid', gridTemplateColumns:'auto 1fr', gap:36, marginBottom:30, alignItems:'center'}}>
        <div>
          <div style={{fontFamily:'var(--f-display)', fontSize:80, lineHeight:1, color:'var(--navy-800)'}}>4.9</div>
          <div style={{display:'flex', gap:2, marginTop:6}}>{[...Array(5)].map((_,i)=> <Icon key={i} name="star" size={14} color="var(--gold)"/>)}</div>
          <div className="kicker" style={{marginTop:6}}>284 REVIEWS</div>
        </div>
        <div>
          {[5,4,3,2,1].map(n => (
            <div key={n} style={{display:'grid', gridTemplateColumns:'24px 1fr 40px', alignItems:'center', gap:10, padding:'3px 0', fontSize:12, color:'var(--ink-500)'}}>
              <span>{n}★</span>
              <div style={{height:6, background:'var(--line-2)', borderRadius:6, overflow:'hidden'}}>
                <div style={{height:'100%', width: n===5? '82%': n===4?'14%':n===3?'3%':'1%', background:'var(--gold)'}}/>
              </div>
              <span className="tnum">{n===5?233:n===4?40:n===3?8:n===2?2:1}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{display:'flex', flexDirection:'column', gap:12}}>
        {rs.map((r,i)=>(
          <div key={i} style={{padding:'20px 20px', background:'#fff', border:'1px solid var(--line)', borderRadius:14}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div style={{display:'flex', alignItems:'center', gap:12}}>
                <div style={{width:38, height:38, borderRadius:99, background:'var(--cream)', color:'var(--navy-800)', display:'grid', placeItems:'center', fontWeight:600, fontSize:13}}>{r.n.split(' ').map(x=>x[0]).slice(0,2).join('')}</div>
                <div>
                  <div style={{fontSize:13.5, fontWeight:600}}>{r.n}</div>
                  <div style={{fontSize:11.5, color:'var(--ink-400)'}}>{r.d} · verified booking</div>
                </div>
              </div>
              <div style={{display:'flex', gap:2}}>{[...Array(r.r)].map((_,j)=> <Icon key={j} name="star" size={13} color="var(--gold)"/>)}</div>
            </div>
            <p style={{margin:'12px 0 0', fontSize:14, color:'var(--ink-700)', lineHeight:1.6, fontStyle:'italic'}}>{r.t}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MapPanel({pkg}){
  return (
    <div style={{height:380, borderRadius:18, position:'relative', overflow:'hidden', border:'1px solid var(--line)',
      background:`
        radial-gradient(800px 400px at 70% 30%, rgba(30,136,229,.18), transparent),
        radial-gradient(600px 300px at 30% 80%, rgba(31,138,91,.15), transparent),
        linear-gradient(180deg, #e7f1fb, #f5f1e8)
      `}}>
      {/* Decorative map grid */}
      <svg width="100%" height="100%" style={{position:'absolute', inset:0, opacity:.5}}>
        <defs><pattern id="g" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(11,42,74,.07)" strokeWidth="1"/>
        </pattern></defs>
        <rect width="100%" height="100%" fill="url(#g)"/>
      </svg>
      {/* Coastline curve */}
      <svg viewBox="0 0 800 380" preserveAspectRatio="none" style={{position:'absolute', inset:0, width:'100%', height:'100%'}}>
        <path d="M0,200 C120,170 220,230 320,210 S540,180 640,200 800,220 800,220" stroke="var(--navy-700)" strokeWidth="2" fill="none" opacity=".6"/>
        <path d="M0,260 C120,240 240,290 360,280 S560,260 660,290 800,300 800,300" stroke="var(--navy-700)" strokeWidth="1.5" fill="none" opacity=".3"/>
      </svg>
      {[{x:200,y:160,l:'Cenang'},{x:380,y:130,l:'Kilim Mangroves'},{x:520,y:200,l:'Pulau Payar'},{x:620,y:140,l:'Mat Cincang'}].map((m,i)=>(
        <div key={i} style={{position:'absolute', left:m.x, top:m.y, transform:'translate(-50%,-100%)'}}>
          <div style={{width:32, height:32, borderRadius:99, background:'var(--blue-500)', color:'#fff', display:'grid', placeItems:'center', boxShadow:'var(--sh-2)'}}>
            <Icon name="pin" size={15}/>
          </div>
          <div style={{marginTop:6, padding:'4px 10px', background:'#fff', borderRadius:99, fontSize:11, fontWeight:500, boxShadow:'var(--sh-1)', textAlign:'center'}}>{m.l}</div>
        </div>
      ))}
      <div style={{position:'absolute', bottom:16, left:16, padding:'10px 14px', background:'#fff', borderRadius:10, boxShadow:'var(--sh-2)', display:'flex', alignItems:'center', gap:10}}>
        <Icon name="pin" size={14} color="var(--blue-500)"/>
        <div>
          <div className="kicker">ROUTE</div>
          <div style={{fontSize:13, fontWeight:500}}>{pkg.loc} — 4 stops · 112 km total</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DetailPage });
