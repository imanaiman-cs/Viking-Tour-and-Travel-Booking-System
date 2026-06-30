// Customer — Packages list page

function PackagesPage(){
  const [q, setQ] = React.useState('');
  const [tag, setTag] = React.useState('All');
  const [sort, setSort] = React.useState('Popular');
  const [price, setPrice] = React.useState(3000);
  const [view, setView] = React.useState('grid');

  const tags = ['All','Beaches','Mountains','Highlands','Diving','Culture','Heritage'];
  const filtered = PACKAGES.filter(p =>
    (tag==='All' || p.tag===tag) &&
    p.price <= price &&
    (q==='' || (p.name+p.loc).toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <main style={{maxWidth:1320, margin:'0 auto', padding:'36px 32px 0'}}>
      <Crumbs items={['Home','Travel Packages']}/>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'end', marginTop:18, marginBottom:30}}>
        <div>
          <h1 style={{fontFamily:'var(--f-display)', fontSize:'clamp(40px, 5vw, 64px)', lineHeight:1.05, margin:0, color:'var(--navy-900)', letterSpacing:'-0.01em'}}>
            All travel packages
          </h1>
          <p style={{color:'var(--ink-500)', fontSize:15, marginTop:10}}>
            {filtered.length} curated itineraries across Peninsular &amp; East Malaysia · prices in ringgit, taxes included.
          </p>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <div className="kicker">SORT BY</div>
          <select value={sort} onChange={e=>setSort(e.target.value)} style={{
            padding:'10px 14px', fontFamily:'inherit', fontSize:13,
            background:'#fff', border:'1px solid var(--line)', borderRadius:10, color:'var(--ink-900)',
          }}>
            <option>Popular</option><option>Price · low to high</option><option>Price · high to low</option><option>Rating</option>
          </select>
          <div style={{display:'flex', gap:0, background:'#fff', border:'1px solid var(--line)', borderRadius:10, padding:3}}>
            <button onClick={()=>setView('grid')} style={{...viewBtn, ...(view==='grid'?viewBtnActive:{})}}><Icon name="pkg" size={15}/></button>
            <button onClick={()=>setView('list')} style={{...viewBtn, ...(view==='list'?viewBtnActive:{})}}><Icon name="menu" size={15}/></button>
          </div>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'280px 1fr', gap:32}} className="pkg-page-grid">
        {/* Filters */}
        <aside style={{position:'sticky', top:100, alignSelf:'start'}}>
          <div style={{background:'#fff', border:'1px solid var(--line)', borderRadius:18, padding:'22px 22px'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18}}>
              <div style={{fontFamily:'var(--f-display)', fontSize:22, color:'var(--navy-800)'}}>Filters</div>
              <button style={{background:'none', border:0, fontSize:12, color:'var(--blue-600)', fontWeight:500, cursor:'pointer'}}>Clear all</button>
            </div>

            <div className="kicker" style={{marginBottom:10}}>SEARCH</div>
            <div style={{position:'relative', marginBottom:24}}>
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Langkawi, Kundasang…"
                style={{
                  width:'100%', padding:'10px 14px 10px 36px',
                  border:'1px solid var(--line)', borderRadius:10,
                  fontSize:13, fontFamily:'inherit', background:'var(--paper)',
                }}/>
              <div style={{position:'absolute', left:12, top:11}}><Icon name="search" size={15} color="var(--ink-400)"/></div>
            </div>

            <div className="kicker" style={{marginBottom:10}}>DESTINATION TYPE</div>
            <div style={{display:'flex', flexWrap:'wrap', gap:6, marginBottom:24}}>
              {tags.map(t => (
                <button key={t} onClick={()=>setTag(t)} style={{
                  padding:'6px 11px', borderRadius:99, fontSize:12, fontWeight:500, cursor:'pointer',
                  background: tag===t ? 'var(--navy-800)' : '#fff',
                  color: tag===t ? '#fff' : 'var(--ink-700)',
                  border:'1px solid ' + (tag===t ? 'var(--navy-800)' : 'var(--line)'),
                }}>{t}</button>
              ))}
            </div>

            <div className="kicker" style={{marginBottom:10}}>PRICE PER PAX</div>
            <div style={{padding:'4px 0 0'}}>
              <input type="range" min="400" max="3000" step="20" value={price} onChange={e=>setPrice(+e.target.value)}
                style={{width:'100%', accentColor:'var(--blue-500)'}}/>
              <div style={{display:'flex', justifyContent:'space-between', fontSize:12, color:'var(--ink-500)', marginTop:8}}>
                <span>RM 400</span>
                <span style={{fontWeight:600, color:'var(--navy-800)'}}>up to RM {price.toLocaleString()}</span>
              </div>
            </div>

            <div className="divider" style={{margin:'22px 0'}}/>
            <div className="kicker" style={{marginBottom:10}}>DURATION</div>
            {['1–2 days','3–4 days','5–7 days','8+ days'].map(d=>(
              <label key={d} style={{display:'flex', alignItems:'center', gap:10, padding:'7px 0', fontSize:13.5, color:'var(--ink-700)', cursor:'pointer'}}>
                <input type="checkbox" defaultChecked={d.startsWith('3')} style={{accentColor:'var(--blue-500)'}}/> {d}
              </label>
            ))}

            <div className="divider" style={{margin:'18px 0'}}/>
            <div className="kicker" style={{marginBottom:10}}>RATING</div>
            {['4.5 & up','4.0 & up','3.5 & up'].map((d,i)=>(
              <label key={d} style={{display:'flex', alignItems:'center', gap:10, padding:'7px 0', fontSize:13.5, color:'var(--ink-700)', cursor:'pointer'}}>
                <input type="radio" name="rating" defaultChecked={i===0} style={{accentColor:'var(--blue-500)'}}/>
                <span style={{display:'flex', alignItems:'center', gap:4}}>
                  <Icon name="star" size={13} color="var(--gold)"/> {d}
                </span>
              </label>
            ))}
          </div>
        </aside>

        {/* Grid */}
        <div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18, padding:'12px 18px', background:'var(--blue-50)', borderRadius:12}}>
            <div style={{fontSize:13, color:'var(--navy-800)', display:'flex', alignItems:'center', gap:8}}>
              <Icon name="bolt" size={15}/> Up to 32% off this monsoon — discount auto-applied at checkout.
            </div>
            <a href="#/promotions" onClick={(e)=>{e.preventDefault(); nav('#/promotions');}} style={{fontSize:12.5, color:'var(--blue-600)', fontWeight:500}}>See all offers →</a>
          </div>
          {view==='grid' ? (
            <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:20}}>
              {filtered.map(p => <PackageCard key={p.id} pkg={p}/>)}
            </div>
          ) : (
            <div style={{display:'flex', flexDirection:'column', gap:14}}>
              {filtered.map(p => <PackageRow key={p.id} pkg={p}/>)}
            </div>
          )}
          <div style={{display:'flex', justifyContent:'center', marginTop:36}}>
            <button style={btnGhost}>Load more</button>
          </div>
        </div>
      </div>
    </main>
  );
}

const viewBtn = {width:30, height:30, borderRadius:7, border:0, background:'transparent', color:'var(--ink-400)', cursor:'pointer', display:'grid', placeItems:'center'};
const viewBtnActive = {background:'var(--navy-800)', color:'#fff'};

function PackageRow({pkg}){
  return (
    <a href={`#/package/${pkg.id}`} onClick={(e)=>{e.preventDefault(); nav(`#/package/${pkg.id}`);}}
      style={{
        display:'grid', gridTemplateColumns:'260px 1fr auto', gap:24,
        background:'#fff', border:'1px solid var(--line)', borderRadius:18, padding:14, alignItems:'stretch',
      }}>
      <div className={`ph ${pkg.img}`} data-label={pkg.loc.toUpperCase()} style={{height:180, borderRadius:12}}/>
      <div style={{padding:'4px 0', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
        <div>
          <div style={{display:'flex', alignItems:'center', gap:5, color:'var(--ink-400)', fontSize:12, marginBottom:6}}>
            <Icon name="pin" size={13}/> {pkg.loc} · {pkg.days}
          </div>
          <div style={{fontFamily:'var(--f-display)', fontSize:26, color:'var(--navy-800)', lineHeight:1.15}}>{pkg.name}</div>
          <p style={{color:'var(--ink-500)', fontSize:13.5, lineHeight:1.6, margin:'10px 0 0', maxWidth:480}}>
            Includes airport transfers, half-board meals, licensed guides, and a private boat charter for one full day.
          </p>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:14, fontSize:12, color:'var(--ink-500)'}}>
          <span style={{display:'flex', alignItems:'center', gap:4}}><Icon name="star" size={13} color="var(--gold)"/>{pkg.rating} ({pkg.reviews})</span>
          <span style={{padding:'3px 9px', background:'var(--cream)', borderRadius:99, fontSize:11}}>{pkg.tag}</span>
          {pkg.badge && <span style={{padding:'3px 9px', background:'var(--coral-soft)', color:'var(--coral)', borderRadius:99, fontSize:11, fontWeight:600}}>{pkg.badge}</span>}
        </div>
      </div>
      <div style={{padding:'4px 14px 4px 0', textAlign:'right', display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'flex-end'}}>
        <div>
          {pkg.was && <div style={{textDecoration:'line-through', color:'var(--ink-300)', fontSize:12}}>RM {pkg.was}</div>}
          <div style={{fontFamily:'var(--f-display)', fontSize:30, color:'var(--navy-900)', lineHeight:1}}>RM {pkg.price.toLocaleString()}</div>
          <div style={{fontSize:11, color:'var(--ink-400)'}}>per pax · taxes inc.</div>
        </div>
        <button style={{...btnPrimary, padding:'10px 18px', fontSize:13}}>Book now <Icon name="arrow-r" size={14}/></button>
      </div>
    </a>
  );
}

function Crumbs({items}){
  return (
    <div style={{display:'flex', alignItems:'center', gap:8, fontSize:12, color:'var(--ink-400)'}}>
      {items.map((x,i)=>(
        <React.Fragment key={i}>
          {i>0 && <Icon name="chev-r" size={12}/>}
          <span style={i===items.length-1 ? {color:'var(--ink-700)', fontWeight:500} : {}}>{x}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

Object.assign(window, { PackagesPage, Crumbs, PackageRow });
