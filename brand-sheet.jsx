// Brand system sheet — shown as one artboard inside the design canvas

function BrandSheet(){
  return (
    <div style={{background:'var(--paper)', minHeight:'100%', padding:'56px 64px', fontFamily:'var(--f-sans)', color:'var(--ink-900)'}}>
      <div style={{display:'flex', alignItems:'end', justifyContent:'space-between', marginBottom:48}}>
        <div>
          <div className="kicker">DESIGN SYSTEM · v1.0</div>
          <h1 style={{fontFamily:'var(--f-display)', fontSize:96, lineHeight:.95, margin:'10px 0 0', color:'var(--navy-900)', letterSpacing:'-0.02em'}}>
            Viking Tour <br/><span style={{fontStyle:'italic', color:'var(--blue-600)'}}>&amp; Travel</span> system.
          </h1>
        </div>
        <div style={{textAlign:'right', maxWidth:380}}>
          <Wordmark/>
          <p style={{color:'var(--ink-500)', fontSize:14, lineHeight:1.6, marginTop:14}}>
            Editorial Malaysian-tourism aesthetic — deep nautical navy, a single sail-blue accent, warm paper backgrounds, and serif display for restraint over drama.
          </p>
        </div>
      </div>

      {/* Colors */}
      <Block title="01 · Colors" sub="Brand palette in OKLCH-balanced steps. Cream paper as canvas, navy as foreground, sail blue as the single accent. Coral reserved for promo and warning states.">
        <div style={{display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gap:12}}>
          {[
            {n:'Navy 900',  v:'#061a2e', use:'Footer · Sidebar'},
            {n:'Navy 800',  v:'#0b2a4a', use:'Primary text'},
            {n:'Navy 700',  v:'#103a66', use:'Buttons'},
            {n:'Blue 600',  v:'#1565c0', use:'Links'},
            {n:'Blue 500',  v:'#1e88e5', use:'Accent · Charts'},
            {n:'Blue 50',   v:'#eef5fc', use:'Surface'},
            {n:'Cream',     v:'#f5f1e8', use:'Canvas'},
            {n:'Paper',     v:'#fbf9f4', use:'Page bg'},
            {n:'White',     v:'#ffffff', use:'Card bg'},
            {n:'Coral',     v:'#e8633a', use:'Promo'},
            {n:'Gold',      v:'#caa15a', use:'Stars'},
            {n:'Jade',      v:'#1f8a5b', use:'Success'},
          ].map((c,i)=>(
            <div key={i}>
              <div style={{height:80, borderRadius:12, background:c.v, border: c.v==='#ffffff'||c.v==='#fbf9f4'||c.v==='#f5f1e8' ? '1px solid var(--line)' : 'none'}}/>
              <div style={{fontFamily:'var(--f-display)', fontSize:16, marginTop:10}}>{c.n}</div>
              <div className="mono" style={{fontSize:11, color:'var(--ink-400)', marginTop:2}}>{c.v.toUpperCase()}</div>
              <div style={{fontSize:11, color:'var(--ink-500)', marginTop:1}}>{c.use}</div>
            </div>
          ))}
        </div>
      </Block>

      {/* Type */}
      <Block title="02 · Typography" sub="Instrument Serif for display and editorial moments. Geist Sans for body and UI. Geist Mono for tabular numbers and metadata.">
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, alignItems:'start'}}>
          <div>
            <div className="kicker" style={{marginBottom:14}}>INSTRUMENT SERIF · DISPLAY</div>
            <div style={{fontFamily:'var(--f-display)', fontSize:88, lineHeight:1, color:'var(--navy-900)', letterSpacing:'-0.02em'}}>Aa Bb 28</div>
            <div style={{fontFamily:'var(--f-display)', fontStyle:'italic', fontSize:54, color:'var(--blue-600)', marginTop:10}}>Quietly arranged.</div>
            <div style={{height:1, background:'var(--line)', margin:'24px 0'}}/>
            <div className="kicker" style={{marginBottom:14}}>GEIST SANS · BODY</div>
            <div style={{fontFamily:'var(--f-sans)', fontSize:48, color:'var(--ink-900)', fontWeight:400}}>Aa Bb 28</div>
            <p style={{fontFamily:'var(--f-sans)', fontSize:14, color:'var(--ink-500)', lineHeight:1.6, marginTop:14, maxWidth:420}}>
              The quick brown fox jumps over the lazy dog. 1234567890. RM 1,280.00 · +60 12-345 6789. Halal · MOTAC.
            </p>
          </div>
          <div>
            <div className="kicker" style={{marginBottom:14}}>SCALE</div>
            <div style={{display:'flex', flexDirection:'column', gap:14}}>
              {[
                {l:'Display XL · 84px', f:'var(--f-display)', s:48, w:400},
                {l:'Display L · 54px',  f:'var(--f-display)', s:32, w:400},
                {l:'Display M · 36px',  f:'var(--f-display)', s:24, w:400},
                {l:'Body L · 17px',     f:'var(--f-sans)',    s:17, w:400},
                {l:'Body M · 14px',     f:'var(--f-sans)',    s:14, w:400},
                {l:'Caption · 12px',    f:'var(--f-sans)',    s:12, w:400},
                {l:'Mono / kicker · 11px', f:'var(--f-mono)', s:11, w:500},
              ].map((t,i)=>(
                <div key={i} style={{display:'grid', gridTemplateColumns:'160px 1fr', gap:24, alignItems:'baseline', padding:'8px 0', borderBottom: i<6?'1px solid var(--line-2)':'none'}}>
                  <div className="kicker">{t.l}</div>
                  <div style={{fontFamily:t.f, fontSize:t.s, color:'var(--ink-900)', fontWeight:t.w, letterSpacing: t.f.includes('mono')?'.1em':'0', textTransform: t.f.includes('mono')?'uppercase':'none'}}>
                    {t.f.includes('mono') ? 'BOOKING REF · MYR' : 'Pulau Redang Marine Park'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Block>

      {/* Components */}
      <Block title="03 · Core components" sub="Buttons, inputs, cards, status badges — same vocabulary across customer and admin surfaces.">
        <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:32}}>
          <div>
            <div className="kicker" style={{marginBottom:12}}>BUTTONS</div>
            <div style={{display:'flex', gap:10, flexWrap:'wrap', marginBottom:30}}>
              <button style={btnPrimary}>Primary action <Icon name="arrow-r" size={14}/></button>
              <button style={btnAccent}>Accent action</button>
              <button style={btnGhost}>Ghost action</button>
              <button style={{...btnGhost, color:'var(--coral)', borderColor:'var(--coral-soft)'}}>Danger</button>
              <button style={{...btnPrimary, padding:'10px 16px', fontSize:12.5}}>Small primary</button>
            </div>

            <div className="kicker" style={{marginBottom:12}}>INPUTS</div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:30}}>
              <label>
                <div className="kicker" style={{marginBottom:7}}>EMAIL</div>
                <input defaultValue="aisyah.r@gmail.com" style={{width:'100%', padding:'12px 14px', background:'#fff', border:'1px solid var(--line)', borderRadius:10, fontSize:14, fontFamily:'inherit'}}/>
              </label>
              <label>
                <div className="kicker" style={{marginBottom:7}}>PHONE</div>
                <input defaultValue="+60 12-345 6789" style={{width:'100%', padding:'12px 14px', background:'#fff', border:'1px solid var(--blue-500)', borderRadius:10, fontSize:14, fontFamily:'inherit', outline:'2px solid var(--blue-100)'}}/>
              </label>
            </div>

            <div className="kicker" style={{marginBottom:12}}>BADGES</div>
            <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
              <Badge bg="rgba(31,138,91,.10)" fg="var(--jade)">Confirmed</Badge>
              <Badge bg="var(--coral-soft)" fg="var(--coral)">Pending</Badge>
              <Badge bg="rgba(202,161,90,.14)" fg="var(--gold)">Deposit</Badge>
              <Badge bg="rgba(200,83,110,.10)" fg="var(--rose)">Refund</Badge>
              <Badge bg="var(--blue-50)" fg="var(--blue-600)">Live</Badge>
              <Badge bg="var(--cream-2)" fg="var(--ink-500)">Completed</Badge>
            </div>
          </div>

          <div>
            <div className="kicker" style={{marginBottom:12}}>STAT CARD</div>
            <div style={{padding:'22px 22px', background:'#fff', border:'1px solid var(--line)', borderRadius:16, position:'relative', overflow:'hidden', marginBottom:18}}>
              <div className="kicker">REVENUE (MTD)</div>
              <div style={{fontFamily:'var(--f-display)', fontSize:38, color:'var(--navy-900)', marginTop:8, lineHeight:1}}>RM 286,420</div>
              <div style={{display:'flex', alignItems:'center', gap:8, marginTop:8}}>
                <span style={{padding:'3px 9px', background:'rgba(31,138,91,.10)', color:'var(--jade)', borderRadius:99, fontSize:11.5, fontWeight:600}}>↑ +12.4%</span>
                <span style={{fontSize:11.5, color:'var(--ink-400)'}}>vs last month</span>
              </div>
              <svg viewBox="0 0 100 40" preserveAspectRatio="none" style={{position:'absolute', right:18, top:18, width:90, height:38}}>
                <polyline points="0,32 11,28 22,30 33,22 44,25 55,18 66,20 77,12 88,16 100,8" fill="none" stroke="var(--jade)" strokeWidth="1.5"/>
              </svg>
            </div>

            <div className="kicker" style={{marginBottom:12}}>NOTIFICATION CARD</div>
            <div style={{padding:'14px 16px', background:'#fff', border:'1px solid var(--line)', borderRadius:14, display:'grid', gridTemplateColumns:'10px 1fr auto', gap:12}}>
              <span style={{width:10, height:10, marginTop:5, borderRadius:10, background:'var(--blue-500)'}}/>
              <div>
                <span className="mono" style={{fontSize:10, color:'var(--blue-500)', fontWeight:600, letterSpacing:'.12em'}}>BOOKING</span>
                <div style={{fontSize:13.5, fontWeight:600, marginTop:2}}>New booking confirmed</div>
                <div style={{fontSize:12, color:'var(--ink-500)', marginTop:2}}>Nur Aisyah · Langkawi 4D3N · RM 2,716</div>
              </div>
              <div className="mono" style={{fontSize:10.5, color:'var(--ink-300)'}}>2m</div>
            </div>
          </div>
        </div>
      </Block>

      {/* Iconography */}
      <Block title="04 · Iconography" sub="Single 1.6-weight stroke set, 18px optical size. Drawn in-house — no third-party icon fonts.">
        <div style={{display:'grid', gridTemplateColumns:'repeat(12, 1fr)', gap:14}}>
          {['search','bell','user','pin','cal','users','star','star-o','plane','plus','edit','trash','eye','tag','check','filter','card','home','pkg','chart','bolt','wifi','wave','mail','phone','globe','logout','settings','menu','close','arrow-r','arrow-l','chev','chev-r'].map(n=>(
            <div key={n} style={{aspectRatio:'1', background:'#fff', border:'1px solid var(--line)', borderRadius:10, display:'grid', placeItems:'center', position:'relative'}}>
              <Icon name={n} size={20} color="var(--navy-800)"/>
              <div className="mono" style={{position:'absolute', bottom:5, fontSize:9, color:'var(--ink-400)'}}>{n}</div>
            </div>
          ))}
        </div>
      </Block>
    </div>
  );
}

function Block({title, sub, children}){
  return (
    <section style={{marginBottom:64, paddingBottom:48, borderBottom:'1px solid var(--line-2)'}}>
      <div style={{display:'grid', gridTemplateColumns:'320px 1fr', gap:48, marginBottom:30}}>
        <div>
          <div className="kicker" style={{color:'var(--blue-600)'}}>{title.split('·')[0].trim()}</div>
          <div style={{fontFamily:'var(--f-display)', fontSize:38, lineHeight:1.05, marginTop:6, color:'var(--navy-900)', letterSpacing:'-0.01em'}}>{title.split('·')[1]?.trim()}</div>
        </div>
        <p style={{color:'var(--ink-500)', fontSize:14, lineHeight:1.6, maxWidth:560, alignSelf:'center'}}>{sub}</p>
      </div>
      {children}
    </section>
  );
}

function Badge({bg, fg, children}){
  return <span style={{padding:'4px 11px', background:bg, color:fg, fontSize:11.5, fontWeight:600, borderRadius:99}}>{children}</span>;
}

Object.assign(window, { BrandSheet });
