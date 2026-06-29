// Customer — About, Contact, Promotions

function AboutPage(){
  return (
    <main>
      <section style={{maxWidth:1320, margin:'0 auto', padding:'56px 32px 0'}}>
        <Crumbs items={['Home','About Us']}/>
        <div style={{display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:80, marginTop:30, alignItems:'end'}} className="about-hero">
          <div>
            <div className="kicker">ABOUT US · SINCE 2019</div>
            <h1 style={{fontFamily:'var(--f-display)', fontSize:'clamp(54px, 7vw, 100px)', lineHeight:.98, margin:'10px 0 22px', color:'var(--navy-900)', letterSpacing:'-0.02em'}}>
              Five guides,<br/>
              <span style={{fontStyle:'italic', color:'var(--blue-600)'}}>one</span> opinion: <br/>
              Malaysia is enough.
            </h1>
            <p style={{fontSize:17, lineHeight:1.6, color:'var(--ink-500)', maxWidth:540}}>
              Viking Tour &amp; Travel started in a Kuala Lumpur shop-lot above a kopitiam. Six years on, we run small-group trips
              across the peninsula and Sabah-Sarawak — never more than twelve guests at a time, never an itinerary we haven't walked ourselves.
            </p>
          </div>
          <div className="ph ph-kl" data-label="VIKING HQ · BUKIT BINTANG" style={{height:380, borderRadius:18}}/>
        </div>
      </section>

      {/* Mission / Vision */}
      <section style={{maxWidth:1320, margin:'120px auto 0', padding:'0 32px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:24}}>
        {[
          {k:'MISSION', t:'Make local travel feel local.', d:'We design Malaysian holidays the way we\'d plan them for our own families — generous time, fair prices, real guides who know which warung is open on Monday.'},
          {k:'VISION',  t:'A quieter kind of tourism.',     d:'Smaller groups, longer stays, more of the money in local hands. We measure success in repeat customers and the postcards we still receive by post.'},
        ].map((x,i)=>(
          <div key={i} style={{padding:'42px 44px', background: i===0 ? 'var(--navy-900)' : '#fff', color: i===0 ? '#fff' : 'var(--ink-900)', border:'1px solid ' + (i===0 ? 'var(--navy-900)' : 'var(--line)'), borderRadius:22}}>
            <div className="kicker" style={{color: i===0 ? 'rgba(255,255,255,.55)' : 'var(--ink-400)'}}>{x.k}</div>
            <div style={{fontFamily:'var(--f-display)', fontSize:42, lineHeight:1.1, marginTop:12, letterSpacing:'-0.01em'}}>{x.t}</div>
            <p style={{fontSize:15, color: i===0 ? 'rgba(255,255,255,.7)' : 'var(--ink-500)', lineHeight:1.7, marginTop:18}}>{x.d}</p>
          </div>
        ))}
      </section>

      {/* Numbers */}
      <section style={{maxWidth:1320, margin:'80px auto 0', padding:'56px 48px', background:'var(--cream)', borderRadius:24}}>
        <div className="kicker" style={{textAlign:'center'}}>SIX YEARS IN NUMBERS</div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24, marginTop:28}}>
          {[
            {n:'14,200+', l:'guests hosted'},
            {n:'92',      l:'curated itineraries'},
            {n:'48',      l:'local partners paid fairly'},
            {n:'4.86',    l:'avg. guest rating'},
          ].map((x,i)=>(
            <div key={i} style={{textAlign:'center'}}>
              <div style={{fontFamily:'var(--f-display)', fontSize:72, color:'var(--navy-800)', lineHeight:1, letterSpacing:'-0.02em'}}>{x.n}</div>
              <div className="kicker" style={{marginTop:8}}>{x.l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{maxWidth:1320, margin:'120px auto 0', padding:'0 32px'}}>
        <div className="kicker">THE TEAM</div>
        <h2 style={{fontFamily:'var(--f-display)', fontSize:54, lineHeight:1.05, margin:'8px 0 36px', color:'var(--navy-900)', letterSpacing:'-0.01em'}}>
          Five who actually know.
        </h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:18}} className="team-grid">
          {[
            {n:'Ahmad Firdaus',  r:'Founder · Head Guide',     loc:'KL · Selangor',     ph:'ph-kl'},
            {n:'Nur Aisyah',     r:'Operations Director',      loc:'Petaling Jaya',     ph:'ph-cameron'},
            {n:'Daniel Lee',     r:'East-Coast Lead Guide',    loc:'Kuantan',           ph:'ph-redang'},
            {n:'Siti Khadijah',  r:'Sabah · Sarawak Lead',     loc:'Kota Kinabalu',     ph:'ph-kundasang'},
            {n:'Muhammad Amir',  r:'Photography &amp; Drones', loc:'George Town',       ph:'ph-penang'},
          ].map((m,i)=>(
            <div key={i}>
              <div className={`ph ${m.ph}`} data-label="" style={{aspectRatio:'3/4', borderRadius:14, marginBottom:14}}/>
              <div style={{fontFamily:'var(--f-display)', fontSize:22, color:'var(--navy-800)', lineHeight:1.15}} dangerouslySetInnerHTML={{__html:m.n}}/>
              <div style={{fontSize:12.5, color:'var(--ink-500)', marginTop:4}} dangerouslySetInnerHTML={{__html:m.r}}/>
              <div className="kicker" style={{marginTop:6}}>{m.loc.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Office map */}
      <section style={{maxWidth:1320, margin:'120px auto 0', padding:'0 32px'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, alignItems:'stretch'}}>
          <div>
            <div className="kicker">OFFICE</div>
            <h2 style={{fontFamily:'var(--f-display)', fontSize:48, lineHeight:1.05, margin:'8px 0 26px', color:'var(--navy-900)', letterSpacing:'-0.01em'}}>
              Drop by the shoplot.
            </h2>
            <div style={{display:'grid', gridTemplateColumns:'auto 1fr', gap:'18px 16px', maxWidth:420}}>
              <Icon name="pin" size={18} color="var(--blue-600)"/>
              <div style={{fontSize:14, lineHeight:1.6, color:'var(--ink-700)'}}>
                No. 18, Jalan Bukit Bintang<br/>55100 Kuala Lumpur, Malaysia
              </div>
              <Icon name="phone" size={18} color="var(--blue-600)"/>
              <div style={{fontSize:14, color:'var(--ink-700)'}}>+60 12-345 6789 · WhatsApp 24/7</div>
              <Icon name="mail" size={18} color="var(--blue-600)"/>
              <div style={{fontSize:14, color:'var(--ink-700)'}}>support@vikingtour.com.my</div>
              <Icon name="cal" size={18} color="var(--blue-600)"/>
              <div style={{fontSize:14, color:'var(--ink-700)'}}>Mon–Sat · 10:00 – 19:00 MYT</div>
            </div>
          </div>
          <FakeMap label="JLN BUKIT BINTANG · KL"/>
        </div>
      </section>
    </main>
  );
}

function FakeMap({label}){
  return (
    <div style={{
      height:380, borderRadius:18, position:'relative', overflow:'hidden', border:'1px solid var(--line)',
      background:`
        repeating-linear-gradient(45deg, transparent 0 36px, rgba(11,42,74,.04) 36px 37px),
        repeating-linear-gradient(-45deg, transparent 0 36px, rgba(11,42,74,.04) 36px 37px),
        linear-gradient(180deg, #e7f1fb, #f5f1e8)
      `}}>
      <svg viewBox="0 0 800 380" preserveAspectRatio="none" style={{position:'absolute', inset:0, width:'100%', height:'100%'}}>
        <path d="M0,180 L800,180" stroke="rgba(11,42,74,.18)" strokeWidth="22"/>
        <path d="M380,0 L380,380" stroke="rgba(11,42,74,.18)" strokeWidth="22"/>
        <path d="M0,90 L800,90" stroke="rgba(11,42,74,.10)" strokeWidth="8"/>
        <path d="M0,270 L800,270" stroke="rgba(11,42,74,.10)" strokeWidth="8"/>
        <path d="M180,0 L180,380" stroke="rgba(11,42,74,.10)" strokeWidth="8"/>
        <path d="M580,0 L580,380" stroke="rgba(11,42,74,.10)" strokeWidth="8"/>
      </svg>
      <div style={{position:'absolute', left:'48%', top:'42%', transform:'translate(-50%,-100%)'}}>
        <div style={{width:42, height:42, borderRadius:99, background:'var(--coral)', color:'#fff', display:'grid', placeItems:'center', boxShadow:'0 6px 20px rgba(232,99,58,.5)', animation:'pulse 2s infinite'}}>
          <Icon name="pin" size={20}/>
        </div>
      </div>
      <div style={{position:'absolute', bottom:16, left:16, right:16, padding:'14px 18px', background:'rgba(255,255,255,.95)', borderRadius:14, display:'flex', alignItems:'center', gap:14, boxShadow:'var(--sh-2)'}}>
        <div className="ph ph-kl" style={{width:50, height:50, borderRadius:10}}/>
        <div style={{flex:1}}>
          <div style={{fontWeight:600, fontSize:14}}>Viking Tour HQ</div>
          <div style={{fontSize:11.5, color:'var(--ink-500)'}}>No. 18, Jalan Bukit Bintang · 200m from MRT Bukit Bintang</div>
        </div>
        <button style={{...btnPrimary, padding:'8px 14px', fontSize:12.5}}>Directions</button>
      </div>
    </div>
  );
}

function ContactPage(){
  const [sent, setSent] = React.useState(false);
  return (
    <main style={{maxWidth:1320, margin:'0 auto', padding:'56px 32px 0'}}>
      <Crumbs items={['Home','Contact Us']}/>
      <div style={{display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:80, marginTop:30, alignItems:'start'}}>
        <div>
          <div className="kicker">CONTACT</div>
          <h1 style={{fontFamily:'var(--f-display)', fontSize:'clamp(48px, 6vw, 84px)', lineHeight:1, margin:'10px 0 18px', color:'var(--navy-900)', letterSpacing:'-0.02em'}}>
            Anyone here knows<br/>the answer.
          </h1>
          <p style={{fontSize:16, lineHeight:1.6, color:'var(--ink-500)', maxWidth:480, marginBottom:36}}>
            Drop us a note — typical response is under 90 minutes during office hours. For urgent things, WhatsApp is always faster.
          </p>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:36}}>
            {[
              {ic:'phone', l:'Call us',      v:'+60 12-345 6789', s:'Mon–Sat · 10:00 – 19:00 MYT'},
              {ic:'mail',  l:'Email',         v:'support@vikingtour.com.my', s:'Reply within 90 mins'},
              {ic:'pin',   l:'Office',        v:'Jalan Bukit Bintang', s:'KL 55100, Malaysia'},
              {ic:'globe', l:'Languages',     v:'BM · EN · 中文 · தமிழ்', s:'And a bit of Iban'},
            ].map((x,i)=>(
              <div key={i} style={{padding:'18px 18px', background:'#fff', border:'1px solid var(--line)', borderRadius:14}}>
                <Icon name={x.ic} size={17} color="var(--blue-600)"/>
                <div className="kicker" style={{marginTop:10}}>{x.l}</div>
                <div style={{fontSize:14, fontWeight:600, marginTop:2}}>{x.v}</div>
                <div style={{fontSize:11.5, color:'var(--ink-400)', marginTop:2}}>{x.s}</div>
              </div>
            ))}
          </div>

          <FakeMap/>
        </div>

        {/* Form */}
        <div style={{background:'#fff', border:'1px solid var(--line)', borderRadius:20, padding:'30px 32px', position:'sticky', top:100}}>
          {!sent ? (
            <>
              <div style={{fontFamily:'var(--f-display)', fontSize:32, color:'var(--navy-800)', lineHeight:1.1}}>Send a message</div>
              <p style={{color:'var(--ink-500)', fontSize:13.5, marginTop:8, marginBottom:24}}>We'll reply by email and WhatsApp if you provide a number.</p>
              <div style={{display:'flex', flexDirection:'column', gap:14}}>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
                  <Field2 label="FULL NAME" value="Ahmad Firdaus" onChange={()=>{}}/>
                  <Field2 label="PHONE" value="+60 12-345 6789" onChange={()=>{}}/>
                </div>
                <Field2 label="EMAIL" value="firdaus.ahmad@gmail.com" onChange={()=>{}}/>
                <label style={{display:'block'}}>
                  <div className="kicker" style={{marginBottom:7}}>TOPIC</div>
                  <select style={{padding:'13px 14px', width:'100%', border:'1px solid var(--line)', borderRadius:10, background:'#fff', fontFamily:'inherit', fontSize:14}}>
                    <option>Custom itinerary enquiry</option>
                    <option>Existing booking support</option>
                    <option>Corporate &amp; group bookings</option>
                    <option>Press &amp; partnerships</option>
                  </select>
                </label>
                <label style={{display:'block'}}>
                  <div className="kicker" style={{marginBottom:7}}>MESSAGE</div>
                  <textarea defaultValue="We're planning an anniversary trip for end of August — looking at 5 days in Sabah. Could you suggest options for a couple with light hiking experience?"
                    style={{
                      width:'100%', minHeight:120, padding:'14px 16px',
                      background:'#fff', border:'1px solid var(--line)', borderRadius:10,
                      fontFamily:'inherit', fontSize:14, color:'var(--ink-900)', resize:'vertical',
                    }}/>
                </label>
                <button onClick={()=>setSent(true)} style={{...btnPrimary, justifyContent:'center', padding:'14px 0'}}>
                  Send message <Icon name="arrow-r" size={15}/>
                </button>
                <div style={{fontSize:11, color:'var(--ink-400)', textAlign:'center'}}>By submitting, you agree to our privacy policy.</div>
              </div>
            </>
          ) : (
            <div style={{textAlign:'center', padding:'30px 10px'}}>
              <div style={{width:60, height:60, borderRadius:99, background:'var(--blue-50)', color:'var(--jade)', margin:'0 auto', display:'grid', placeItems:'center'}}>
                <Icon name="check" size={28}/>
              </div>
              <div style={{fontFamily:'var(--f-display)', fontSize:32, color:'var(--navy-900)', marginTop:18}}>Message received</div>
              <p style={{color:'var(--ink-500)', fontSize:14, marginTop:10}}>Reference #VK-MSG-7821 · We'll be in touch within 90 minutes.</p>
              <button style={{...btnGhost, marginTop:18}} onClick={()=>setSent(false)}>Send another</button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function PromotionsPage(){
  const promos = [
    {code:'MERDEKA32', name:'Hari Merdeka special — 32% off Sabah trips', d:'Valid for departures 28 Aug – 15 Sep 2026', tag:'limited', ends:'14 days', img:'ph-kundasang'},
    {code:'RAYA15',    name:'Hari Raya family bundles — kids stay free', d:'Up to 2 kids under 12 with paying parent', tag:'family', ends:'21 days', img:'ph-langkawi'},
    {code:'COUPLE20',  name:'Honeymoon Pulau Redang — 20% off + spa',    d:'Includes private dinner on the beach', tag:'couple', ends:'30 days', img:'ph-redang'},
    {code:'CNY28',     name:'Cameron Highlands CNY weekend escape',      d:'Strawberry farms · tea estate breakfast', tag:'seasonal', ends:'06 days', img:'ph-cameron'},
    {code:'GROUP10',   name:'Group of 8+ save an extra 10%',              d:'Stacks with all other promos', tag:'group', ends:'∞', img:'ph-perhentian'},
    {code:'EARLY25',   name:'Book 90 days early — 25% off any package',  d:'Auto-applied at checkout', tag:'early', ends:'∞', img:'ph-tioman'},
  ];
  return (
    <main style={{maxWidth:1320, margin:'0 auto', padding:'56px 32px 0'}}>
      <Crumbs items={['Home','Promotions']}/>
      <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:48, marginTop:30, alignItems:'end', marginBottom:48}}>
        <div>
          <div className="kicker">PROMOTIONS · UPDATED MONTHLY</div>
          <h1 style={{fontFamily:'var(--f-display)', fontSize:'clamp(48px, 6vw, 84px)', lineHeight:1, margin:'10px 0 0', color:'var(--navy-900)', letterSpacing:'-0.02em'}}>
            Six honest offers,<br/>no asterisks.
          </h1>
        </div>
        <div style={{position:'relative'}}>
          <Icon name="search" size={16} color="var(--ink-400)"/>
          <input placeholder="Search promos by code or destination…" style={{
            width:'100%', padding:'14px 16px 14px 44px',
            background:'#fff', border:'1px solid var(--line)', borderRadius:99,
            fontSize:14, fontFamily:'inherit', boxShadow:'var(--sh-1)',
          }}/>
          <div style={{position:'absolute', left:18, top:17}}><Icon name="search" size={16} color="var(--ink-400)"/></div>
        </div>
      </div>

      {/* Featured promo */}
      <div style={{
        position:'relative', overflow:'hidden', borderRadius:24, color:'#fff',
        background:'linear-gradient(110deg, var(--coral) 0%, #c14a2a 60%, var(--navy-900) 100%)',
        padding:'52px 56px', display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:42, alignItems:'center', marginBottom:48,
      }}>
        <div style={{position:'absolute', inset:0, opacity:.16,
          background:'radial-gradient(700px 400px at 80% 30%, #fff, transparent), radial-gradient(800px 400px at 20% 110%, #2674e5, transparent)'}}/>
        <div style={{position:'relative'}}>
          <span style={{padding:'5px 12px', background:'rgba(255,255,255,.16)', backdropFilter:'blur(6px)', borderRadius:99, fontSize:11, fontFamily:'var(--f-mono)', letterSpacing:'.12em'}}>FLASH SALE · ENDS 23:59 TONIGHT</span>
          <div style={{fontFamily:'var(--f-display)', fontSize:64, lineHeight:1.02, margin:'18px 0 14px', letterSpacing:'-0.01em'}}>
            48-hour drop:<br/>Penang heritage from <span style={{fontStyle:'italic'}}>RM 549</span>.
          </div>
          <p style={{color:'rgba(255,255,255,.7)', maxWidth:500, fontSize:15, lineHeight:1.6}}>
            All seven trips during the Penang World Music Festival, with George Town hawker tours and the festival pass included.
          </p>
          <div style={{display:'flex', gap:12, marginTop:24, alignItems:'center'}}>
            <button style={{...btnPrimary, background:'#fff', color:'var(--navy-800)', borderColor:'#fff'}}>Claim now</button>
            <span style={{padding:'10px 14px', border:'1px dashed rgba(255,255,255,.4)', borderRadius:8, fontFamily:'var(--f-mono)', fontSize:13, letterSpacing:'.16em'}}>PENANG48</span>
          </div>
        </div>
        <div style={{position:'relative', display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:10}}>
          {[{l:'Trips left', v:'12'},{l:'Avg. saving', v:'RM 290'},{l:'Departures', v:'07'},{l:'Ends in', v:'06h 24m'}].map((s,i)=>(
            <div key={i} style={{padding:'18px 18px', background:'rgba(255,255,255,.08)', border:'1px solid rgba(255,255,255,.14)', borderRadius:14, backdropFilter:'blur(6px)'}}>
              <div className="kicker" style={{color:'rgba(255,255,255,.55)'}}>{s.l}</div>
              <div style={{fontFamily:'var(--f-display)', fontSize:30, marginTop:4}}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20}}>
        {promos.map(p => (
          <div key={p.code} style={{background:'#fff', border:'1px solid var(--line)', borderRadius:18, overflow:'hidden', display:'flex', flexDirection:'column'}}>
            <div className={`ph ${p.img}`} data-label={p.tag.toUpperCase()} style={{height:170, position:'relative'}}>
              <span style={{position:'absolute', top:14, left:14, padding:'5px 11px', background:'#fff', color:'var(--navy-800)', fontSize:11, fontWeight:600, borderRadius:99, fontFamily:'var(--f-mono)', letterSpacing:'.1em'}}>{p.code}</span>
              <span style={{position:'absolute', top:14, right:14, padding:'5px 11px', background:'rgba(11,26,46,.55)', backdropFilter:'blur(6px)', color:'#fff', fontSize:11, borderRadius:99}}>{p.ends} left</span>
            </div>
            <div style={{padding:'20px 22px', display:'flex', flexDirection:'column', gap:8, flex:1}}>
              <div style={{fontFamily:'var(--f-display)', fontSize:22, color:'var(--navy-800)', lineHeight:1.2}}>{p.name}</div>
              <div style={{fontSize:13, color:'var(--ink-500)'}}>{p.d}</div>
              <div style={{marginTop:'auto', display:'flex', gap:10, alignItems:'center'}}>
                <button style={{...btnPrimary, padding:'9px 14px', fontSize:13, flex:1, justifyContent:'center'}}>Apply code</button>
                <button style={iconBtn}><Icon name="tag" size={15}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Notifications */}
      <section style={{marginTop:80}}>
        <div style={{display:'flex', alignItems:'end', justifyContent:'space-between', marginBottom:24}}>
          <div>
            <div className="kicker">NOTIFICATIONS · 12 UNREAD</div>
            <h2 style={{fontFamily:'var(--f-display)', fontSize:42, color:'var(--navy-900)', lineHeight:1.1, margin:'8px 0 0', letterSpacing:'-0.01em'}}>
              Your recent activity
            </h2>
          </div>
          <button style={btnGhost}>Mark all as read</button>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:14}}>
          {[
            {tag:'BOOKING',  t:'Booking VK-2026-04218 confirmed', d:'Langkawi Island Escape · 18 Jun 2026 · 2 pax', time:'2 min', c:'var(--blue-500)'},
            {tag:'PROMO',    t:'New code MERDEKA32 is live',     d:'32% off Sabah trips — auto-applied at checkout', time:'1 hour', c:'var(--coral)'},
            {tag:'SYSTEM',   t:'Itinerary update · Pulau Redang', d:'Day 2 schedule revised due to weather', time:'5 hours', c:'var(--ink-400)'},
            {tag:'PAYMENT',  t:'Payment reminder · #BK-2026-0418', d:'Outstanding RM 480 · due 14 Jun', time:'1 day', c:'var(--gold)'},
            {tag:'BOOKING',  t:'Booking VK-2026-04201 paid in full', d:'Cameron Highlands · 03 Jul 2026 · 4 pax', time:'2 days', c:'var(--blue-500)'},
            {tag:'PROMO',    t:'GROUP10 available for your cart',  d:'You have 8+ travellers — extra 10% applied', time:'3 days', c:'var(--coral)'},
          ].map((n,i)=>(
            <div key={i} style={{padding:'18px 20px', background:'#fff', border:'1px solid var(--line)', borderRadius:14, display:'grid', gridTemplateColumns:'10px 1fr auto', gap:14}}>
              <span style={{width:10, height:10, marginTop:8, borderRadius:10, background:n.c}}/>
              <div>
                <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:4}}>
                  <span className="mono" style={{fontSize:10, color:n.c, fontWeight:600, letterSpacing:'.1em'}}>{n.tag}</span>
                </div>
                <div style={{fontSize:14, fontWeight:600}}>{n.t}</div>
                <div style={{fontSize:12.5, color:'var(--ink-500)', marginTop:3}}>{n.d}</div>
              </div>
              <div className="mono" style={{fontSize:11, color:'var(--ink-400)'}}>{n.time}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { AboutPage, ContactPage, PromotionsPage });
