// Admin — Manage Promotions & Settings pages

// ── PROMOTIONS ────────────────────────────────────────────────
const PROMO_DATA = [
  {code:'MERDEKA32', name:'Hari Merdeka Special',          type:'Percentage', value:'32%',  applies:'Sabah trips', start:'01 Aug 2026', end:'15 Sep 2026', uses:142, max:500, revenue:386240, status:'Active'},
  {code:'PENANG48',  name:'Penang 48-hour Flash',          type:'Fixed',      value:'RM 280', applies:'Penang packages', start:'21 May 2026', end:'23 May 2026', uses:12, max:50, revenue:14820, status:'Active'},
  {code:'RAYA15',    name:'Hari Raya Family Bundle',       type:'Percentage', value:'15%',  applies:'All packages',   start:'15 Mar 2026', end:'30 Apr 2026', uses:218, max:'∞', revenue:284100, status:'Ended'},
  {code:'COUPLE20',  name:'Honeymoon Redang',              type:'Percentage', value:'20%',  applies:'Redang · Tioman', start:'01 May 2026', end:'31 Jul 2026', uses:34, max:80,  revenue:48720, status:'Active'},
  {code:'CNY28',     name:'CNY Cameron Weekend',           type:'Percentage', value:'28%',  applies:'Cameron Highlands', start:'08 Feb 2026', end:'24 Feb 2026', uses:96, max:'∞', revenue:67200, status:'Ended'},
  {code:'GROUP10',   name:'Group of 8+ extra discount',    type:'Percentage', value:'10%',  applies:'All packages',    start:'01 Jan 2026', end:'31 Dec 2026', uses:24, max:'∞', revenue:38440, status:'Active'},
  {code:'EARLY25',   name:'Book 90 days early',            type:'Percentage', value:'25%',  applies:'All packages',    start:'01 Jan 2026', end:'31 Dec 2026', uses:88, max:'∞', revenue:142800, status:'Active'},
  {code:'STUDENT15', name:'Student weekday escape',         type:'Percentage', value:'15%',  applies:'All packages',    start:'01 Mar 2026', end:'30 Sep 2026', uses:0,  max:300, revenue:0, status:'Scheduled'},
];

function AdminPromotions(){
  const [q, setQ] = React.useState('');
  const [tab, setTab] = React.useState('Active');
  const [sel, setSel] = React.useState(PROMO_DATA[0]);
  const [editing, setEditing] = React.useState(false);

  const filtered = PROMO_DATA.filter(p =>
    (tab==='All' || p.status===tab) &&
    (q==='' || (p.code+p.name+p.applies).toLowerCase().includes(q.toLowerCase()))
  );

  const sc = {
    'Active':    {fg:'var(--jade)',     bg:'rgba(31,138,91,.10)'},
    'Scheduled': {fg:'var(--blue-600)', bg:'var(--blue-50)'},
    'Ended':     {fg:'var(--ink-400)',  bg:'var(--cream-2)'},
  };

  const totalRevenue = PROMO_DATA.reduce((s,p)=>s+p.revenue,0);
  const activeCount  = PROMO_DATA.filter(p=>p.status==='Active').length;
  const totalUses    = PROMO_DATA.reduce((s,p)=>s+p.uses,0);

  return (
    <AdminShell active="promotions"
      breadcrumb="SYSTEM"
      title="Manage promotions"
      subtitle={`${PROMO_DATA.length} promo codes · ${activeCount} active · RM ${totalRevenue.toLocaleString()} revenue generated · ${totalUses} redemptions`}>

      <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:20}}>
        <CustStat label="REVENUE FROM PROMOS"  value={`RM ${totalRevenue.toLocaleString()}`} delta="+24%" sub="all-time"/>
        <CustStat label="ACTIVE CODES"          value={activeCount.toString()}                delta="+2"   sub="this quarter"/>
        <CustStat label="REDEMPTIONS"           value={totalUses.toString()}                  delta="+18%" sub="this month"/>
        <CustStat label="AVG. ORDER WITH PROMO" value="RM 2,420"                              delta="+RM 180" sub="vs RM 2,240 baseline"/>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:16}}>
        {/* Left: list */}
        <div style={{background:'#fff', border:'1px solid var(--line)', borderRadius:14, padding:14}}>
          <div style={{display:'flex', gap:10, alignItems:'center', marginBottom:14, flexWrap:'wrap'}}>
            <div style={{position:'relative', flex:'1 1 200px', maxWidth:280}}>
              <input placeholder="Search promo code or campaign…" value={q} onChange={e=>setQ(e.target.value)}
                style={{width:'100%', padding:'9px 14px 9px 36px', border:'1px solid var(--line)', borderRadius:10, fontSize:12.5, fontFamily:'inherit', background:'var(--paper)'}}/>
              <div style={{position:'absolute', left:12, top:10}}><Icon name="search" size={14} color="var(--ink-400)"/></div>
            </div>
            <div style={{display:'flex', gap:5}}>
              {['All','Active','Scheduled','Ended'].map(t=>{
                const on = tab===t;
                const c = t==='All' ? PROMO_DATA.length : PROMO_DATA.filter(p=>p.status===t).length;
                return <button key={t} onClick={()=>setTab(t)} style={{
                  padding:'7px 12px', borderRadius:99, cursor:'pointer', fontFamily:'inherit',
                  fontSize:12, fontWeight:500, display:'flex', alignItems:'center', gap:5,
                  background: on ? 'var(--navy-800)' : '#fff', color: on ? '#fff' : 'var(--ink-700)',
                  border:'1px solid ' + (on ? 'var(--navy-800)' : 'var(--line)'),
                }}>{t} <span style={{padding:'1px 6px', background: on ? 'rgba(255,255,255,.15)' : 'var(--paper)', borderRadius:99, fontSize:10.5}}>{c}</span></button>;
              })}
            </div>
            <button onClick={()=>{ setSel(null); setEditing(true); }} style={{...btnPrimary, padding:'9px 14px', fontSize:12.5, marginLeft:'auto'}}>
              <Icon name="plus" size={13}/> New promo
            </button>
          </div>

          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            {filtered.map(p => {
              const on = sel?.code===p.code;
              const pct = p.max==='∞' ? 0 : (p.uses / p.max);
              return (
                <div key={p.code} onClick={()=>{setSel(p); setEditing(false);}}
                  style={{
                    padding:'14px 16px', borderRadius:12,
                    background: on ? 'var(--blue-50)' : 'var(--paper)',
                    border:'1px solid ' + (on ? 'var(--blue-500)' : 'var(--line-2)'),
                    cursor:'pointer',
                  }}>
                  <div style={{display:'grid', gridTemplateColumns:'auto 1fr auto auto', gap:14, alignItems:'center'}}>
                    <div style={{padding:'8px 12px', background:'#fff', border:'1px dashed var(--navy-700)', borderRadius:8, fontFamily:'var(--f-mono)', fontSize:12, fontWeight:600, letterSpacing:'.14em', color:'var(--navy-800)'}}>
                      {p.code}
                    </div>
                    <div>
                      <div style={{fontSize:13.5, fontWeight:600, color:'var(--ink-900)'}}>{p.name}</div>
                      <div style={{fontSize:11.5, color:'var(--ink-500)', marginTop:2}}>{p.applies} · {p.type} · {p.value} off</div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div className="mono" style={{fontSize:13, fontWeight:600, color:'var(--navy-900)'}}>RM {p.revenue.toLocaleString()}</div>
                      <div style={{fontSize:11, color:'var(--ink-400)'}}>{p.uses} / {p.max} used</div>
                    </div>
                    <span style={{padding:'3px 10px', background:sc[p.status].bg, color:sc[p.status].fg, fontSize:11, fontWeight:600, borderRadius:99}}>{p.status}</span>
                  </div>
                  {p.max!=='∞' && (
                    <div style={{marginTop:10, height:4, background:'rgba(0,0,0,.06)', borderRadius:4, overflow:'hidden'}}>
                      <div style={{height:'100%', width:`${pct*100}%`, background: pct > .8 ? 'var(--coral)' : 'var(--jade)', borderRadius:4}}/>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: detail / editor */}
        <div style={{background:'#fff', border:'1px solid var(--line)', borderRadius:14, padding:'20px 22px', alignSelf:'start', position:'sticky', top:88}}>
          {sel && !editing && <PromoDetail p={sel} sc={sc} onEdit={()=>setEditing(true)}/>}
          {(editing || !sel) && <PromoEditor p={sel} onCancel={()=>{ setEditing(false); if(!sel) setSel(PROMO_DATA[0]); }}/>}
        </div>
      </div>
    </AdminShell>
  );
}

function PromoDetail({p, sc, onEdit}){
  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'start', marginBottom:18}}>
        <div>
          <div className="kicker">PROMO DETAIL</div>
          <div style={{fontFamily:'var(--f-display)', fontSize:24, color:'var(--navy-800)', lineHeight:1.2, marginTop:6}}>{p.name}</div>
        </div>
        <span style={{padding:'3px 10px', background:sc[p.status].bg, color:sc[p.status].fg, fontSize:11, fontWeight:600, borderRadius:99}}>{p.status}</span>
      </div>

      <div style={{padding:'18px 18px', background:'linear-gradient(110deg, var(--navy-900), var(--blue-600))', borderRadius:12, color:'#fff', marginBottom:16}}>
        <div style={{fontFamily:'var(--f-mono)', fontSize:10.5, letterSpacing:'.12em', opacity:.65}}>YOUR CODE</div>
        <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginTop:6}}>
          <div style={{fontFamily:'var(--f-mono)', fontSize:22, fontWeight:600, letterSpacing:'.18em'}}>{p.code}</div>
          <div style={{fontFamily:'var(--f-display)', fontSize:34, lineHeight:1}}>{p.value} <span style={{fontSize:14, opacity:.65}}>off</span></div>
        </div>
        <div style={{fontSize:11.5, opacity:.7, marginTop:8}}>{p.applies}</div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:18}}>
        <Mini l="STARTS"  v={p.start}/>
        <Mini l="ENDS"    v={p.end}/>
        <Mini l="USES"    v={`${p.uses} of ${p.max}`}/>
        <Mini l="REVENUE" v={`RM ${p.revenue.toLocaleString()}`}/>
      </div>

      <div className="kicker" style={{marginBottom:8}}>PERFORMANCE · LAST 30 DAYS</div>
      <svg viewBox="0 0 280 80" preserveAspectRatio="none" style={{width:'100%', height:80, marginBottom:14}}>
        <defs>
          <linearGradient id="pf" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--blue-500)" stopOpacity=".25"/>
            <stop offset="100%" stopColor="var(--blue-500)" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <polyline points="0,60 28,52 56,58 84,40 112,46 140,32 168,38 196,24 224,30 252,18 280,12"
          fill="none" stroke="var(--blue-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="0,80 0,60 28,52 56,58 84,40 112,46 140,32 168,38 196,24 224,30 252,18 280,12 280,80"
          fill="url(#pf)" stroke="none"/>
      </svg>

      <div style={{display:'flex', gap:8, marginTop:18}}>
        <button onClick={onEdit} style={{...btnPrimary, padding:'10px 16px', fontSize:13, flex:1, justifyContent:'center'}}>
          <Icon name="edit" size={13}/> Edit promo
        </button>
        <button style={{...btnGhost, padding:'10px 14px', fontSize:13}}>
          <Icon name="eye" size={13}/> Preview email
        </button>
        <button style={{padding:'10px 14px', borderRadius:99, background:'#fff', border:'1px solid var(--coral-soft)', color:'var(--coral)', cursor:'pointer', fontFamily:'inherit', fontSize:13, fontWeight:500}}>
          {p.status==='Active' ? 'End now' : 'Delete'}
        </button>
      </div>
    </div>
  );
}

function Mini({l, v}){
  return (
    <div style={{padding:'12px 14px', background:'var(--paper)', borderRadius:10}}>
      <div className="kicker">{l}</div>
      <div className="mono" style={{fontSize:13, fontWeight:600, color:'var(--ink-900)', marginTop:3}}>{v}</div>
    </div>
  );
}

function PromoEditor({p, onCancel}){
  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', marginBottom:18}}>
        <div>
          <div className="kicker">{p ? 'EDIT PROMO' : 'NEW PROMO'}</div>
          <div style={{fontFamily:'var(--f-display)', fontSize:22, color:'var(--navy-800)', marginTop:4}}>{p ? p.code : 'Create campaign'}</div>
        </div>
        <button onClick={onCancel} style={{...iconBtn, width:30, height:30}}><Icon name="close" size={14}/></button>
      </div>

      <div style={{display:'flex', flexDirection:'column', gap:14}}>
        <Lbl label="PROMO CODE">
          <input defaultValue={p?.code || 'NEWCODE'} style={inpA}/>
        </Lbl>
        <Lbl label="CAMPAIGN NAME">
          <input defaultValue={p?.name || ''} placeholder="e.g. Hari Raya Family Bundle" style={inpA}/>
        </Lbl>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
          <Lbl label="DISCOUNT TYPE">
            <select defaultValue={p?.type || 'Percentage'} style={inpA}>
              <option>Percentage</option><option>Fixed (MYR)</option><option>Free upgrade</option>
            </select>
          </Lbl>
          <Lbl label="VALUE">
            <input defaultValue={p?.value?.replace(/[^0-9]/g,'') || '15'} style={inpA}/>
          </Lbl>
        </div>
        <Lbl label="APPLIES TO">
          <select defaultValue={p?.applies || 'All packages'} style={inpA}>
            <option>All packages</option><option>Sabah trips</option><option>Penang packages</option><option>Cameron Highlands</option><option>Redang · Tioman</option>
          </select>
        </Lbl>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
          <Lbl label="START DATE">
            <input defaultValue={p?.start || '01 Jul 2026'} style={inpA}/>
          </Lbl>
          <Lbl label="END DATE">
            <input defaultValue={p?.end || '31 Jul 2026'} style={inpA}/>
          </Lbl>
        </div>
        <Lbl label="USAGE LIMIT">
          <div style={{display:'flex', gap:10, alignItems:'center'}}>
            <input defaultValue="500" style={{...inpA, flex:1}}/>
            <label style={{display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--ink-500)'}}>
              <input type="checkbox" style={{accentColor:'var(--blue-500)'}}/> Unlimited
            </label>
          </div>
        </Lbl>
        <Lbl label="VISIBILITY">
          <div style={{display:'flex', gap:6}}>
            {['Public','Members-only','Private link'].map((s,i)=>(
              <button key={s} style={{flex:1, padding:'9px 10px', borderRadius:8, cursor:'pointer', fontSize:12, fontFamily:'inherit', fontWeight:500, background: i===0?'var(--navy-800)':'#fff', color: i===0?'#fff':'var(--ink-700)', border:'1px solid ' + (i===0?'var(--navy-800)':'var(--line)')}}>{s}</button>
            ))}
          </div>
        </Lbl>

        <div style={{display:'flex', gap:8, marginTop:14}}>
          <button style={{...btnPrimary, padding:'11px 16px', fontSize:13, flex:1, justifyContent:'center'}}>
            <Icon name="check" size={14}/> Save promo
          </button>
          <button onClick={onCancel} style={{...btnGhost, padding:'11px 16px', fontSize:13}}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function Lbl({label, children}){
  return (
    <label style={{display:'block'}}>
      <div className="kicker" style={{marginBottom:7}}>{label}</div>
      {children}
    </label>
  );
}
const inpA = {width:'100%', padding:'10px 12px', border:'1px solid var(--line)', borderRadius:9, background:'var(--paper)', fontSize:13, fontFamily:'inherit', color:'var(--ink-900)'};

// ── ADMIN SETTINGS ────────────────────────────────────────────
function AdminSettings(){
  const [tab, setTab] = React.useState('company');
  const tabs = [
    {id:'company',  l:'Company',         ic:'home'},
    {id:'payment',  l:'Payment & taxes', ic:'card'},
    {id:'team',     l:'Team & access',   ic:'users'},
    {id:'notif',    l:'Notifications',   ic:'bell'},
    {id:'email',    l:'Email templates', ic:'mail'},
    {id:'api',      l:'API & webhooks',  ic:'bolt'},
    {id:'audit',    l:'Audit log',       ic:'eye'},
  ];
  return (
    <AdminShell active="settings"
      breadcrumb="SYSTEM"
      title="Settings"
      subtitle="Company details, payment, taxes, team permissions, and integrations.">

      <div style={{display:'grid', gridTemplateColumns:'220px 1fr', gap:24}}>
        <aside style={{background:'#fff', border:'1px solid var(--line)', borderRadius:14, padding:8, alignSelf:'start'}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{
              display:'flex', alignItems:'center', gap:10, padding:'10px 12px', width:'100%',
              background: tab===t.id ? 'var(--blue-50)' : 'transparent',
              color: tab===t.id ? 'var(--navy-800)' : 'var(--ink-700)',
              border:0, borderRadius:8, cursor:'pointer', fontFamily:'inherit', fontSize:13, fontWeight:500,
              textAlign:'left', marginBottom:2,
            }}>
              <Icon name={t.ic} size={15} color={tab===t.id?'var(--blue-600)':'var(--ink-500)'}/>
              <span style={{flex:1}}>{t.l}</span>
            </button>
          ))}
        </aside>

        <div style={{display:'flex', flexDirection:'column', gap:16}}>
          {tab==='company' && <CompanySettings/>}
          {tab==='payment' && <PaymentSettings/>}
          {tab==='team'    && <TeamSettings/>}
          {tab==='notif'   && <NotifSettings/>}
          {tab==='email'   && <EmailSettings/>}
          {tab==='api'     && <ApiSettings/>}
          {tab==='audit'   && <AuditLog/>}
        </div>
      </div>
    </AdminShell>
  );
}

function Card({title, subtitle, children, actions}){
  return (
    <div style={{background:'#fff', border:'1px solid var(--line)', borderRadius:14, padding:'22px 24px'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'start', marginBottom:18}}>
        <div>
          <div style={{fontFamily:'var(--f-display)', fontSize:22, color:'var(--navy-800)'}}>{title}</div>
          {subtitle && <div style={{fontSize:12.5, color:'var(--ink-500)', marginTop:4, maxWidth:520}}>{subtitle}</div>}
        </div>
        {actions}
      </div>
      {children}
    </div>
  );
}

function CompanySettings(){
  return (
    <>
      <Card title="Company information" subtitle="Public details used in invoices, footer, and outbound emails.">
        <div style={{display:'flex', gap:18, marginBottom:18, alignItems:'center'}}>
          <div style={{width:64, height:64, borderRadius:14, background:'var(--navy-800)', display:'grid', placeItems:'center', color:'#fff'}}>
            <VikingLogo size={32} color="#fff"/>
          </div>
          <div>
            <div style={{fontWeight:600, fontSize:15}}>Viking Tour &amp; Travel Sdn. Bhd.</div>
            <div style={{fontSize:12, color:'var(--ink-500)'}}>Co. Reg. 201901048221 (1345672-K)</div>
          </div>
          <div style={{marginLeft:'auto', display:'flex', gap:8}}>
            <button style={{...btnGhost, padding:'8px 14px', fontSize:12.5}}>Upload logo</button>
            <button style={{...btnGhost, padding:'8px 14px', fontSize:12.5}}>Edit company</button>
          </div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
          <Lbl label="LEGAL NAME"><input defaultValue="Viking Tour & Travel Sdn. Bhd." style={inpA}/></Lbl>
          <Lbl label="MOTAC LICENSE NUMBER"><input defaultValue="KPK/LN 8821" style={inpA}/></Lbl>
          <Lbl label="STREET ADDRESS"><input defaultValue="No. 2A, Jalan Temenggong" style={inpA}/></Lbl>
          <Lbl label="AREA / DISTRICT"><input defaultValue="Banda Hilir" style={inpA}/></Lbl>
          <Lbl label="POSKOD"><input defaultValue="75000" style={inpA}/></Lbl>
          <Lbl label="STATE"><input defaultValue="Melaka" style={inpA}/></Lbl>
          <Lbl label="PHONE"><input defaultValue="+60 12-345 6789" style={inpA}/></Lbl>
          <Lbl label="EMAIL"><input defaultValue="support@vikingtour.com.my" style={inpA}/></Lbl>
        </div>
      </Card>

      <Card title="Operating hours" subtitle="Office shop-front hours. Online bookings stay 24/7.">
        <div style={{display:'flex', flexDirection:'column', gap:8}}>
          {[
            {d:'Monday – Friday',  o:'10:00 – 19:00', on:true},
            {d:'Saturday',         o:'10:00 – 18:00', on:true},
            {d:'Sunday',           o:'Closed',        on:false},
            {d:'Public holidays',  o:'Closed',        on:false},
          ].map((row,i)=>(
            <div key={i} style={{display:'grid', gridTemplateColumns:'180px 1fr auto', gap:14, alignItems:'center', padding:'10px 0', borderBottom: i<3 ? '1px solid var(--line-2)' : 'none'}}>
              <div style={{fontSize:13, fontWeight:500}}>{row.d}</div>
              <div className="mono" style={{fontSize:12.5, color:row.on?'var(--ink-700)':'var(--ink-400)'}}>{row.o}</div>
              <Toggle on={row.on}/>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Brand defaults" subtitle="Used across customer-facing surfaces and exported documents.">
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
          <Lbl label="DEFAULT CURRENCY">
            <select style={inpA}><option>Malaysian Ringgit (RM)</option><option>USD</option><option>SGD</option></select>
          </Lbl>
          <Lbl label="DATE FORMAT">
            <select style={inpA}><option>DD MMM YYYY · 18 Jun 2026</option><option>YYYY-MM-DD</option></select>
          </Lbl>
          <Lbl label="DEFAULT LANGUAGE">
            <select style={inpA}><option>English (Malaysia)</option><option>Bahasa Malaysia</option><option>简体中文</option></select>
          </Lbl>
          <Lbl label="TIMEZONE">
            <select style={inpA}><option>(UTC+08:00) Kuala Lumpur · Singapore</option></select>
          </Lbl>
        </div>
        <div style={{display:'flex', gap:8, marginTop:18, justifyContent:'flex-end'}}>
          <button style={{...btnGhost, padding:'10px 18px', fontSize:13}}>Cancel</button>
          <button style={{...btnPrimary, padding:'10px 18px', fontSize:13}}>Save changes</button>
        </div>
      </Card>
    </>
  );
}

function PaymentSettings(){
  const methods = [
    {l:'FPX online banking',   s:'8 banks · most popular method',   fee:'No fee',     on:true,  ic:'card'},
    {l:'Credit / debit card',  s:'Visa, Mastercard via iPay88',     fee:'2.4% + RM 1', on:true,  ic:'card'},
    {l:'GrabPay',              s:'E-wallet · instant',               fee:'2.0%',       on:true,  ic:'bolt'},
    {l:"Touch 'n Go eWallet",  s:'Direct integration',               fee:'1.5%',       on:true,  ic:'wifi'},
    {l:'Boost',                s:'Direct integration',               fee:'1.8%',       on:true,  ic:'bolt'},
    {l:'Atome',                s:'Buy now pay later · 3 instalments',fee:'4.8% (BNPL)', on:false, ic:'card'},
  ];
  return (
    <>
      <Card title="Accepted payment methods" subtitle="Toggle methods on or off. Transaction fees are paid to the processor, not us.">
        <div style={{display:'flex', flexDirection:'column', gap:0}}>
          {methods.map((m,i)=>(
            <div key={i} style={{display:'grid', gridTemplateColumns:'42px 1fr auto auto', gap:14, alignItems:'center', padding:'14px 0', borderBottom: i<methods.length-1 ? '1px solid var(--line-2)' : 'none'}}>
              <span style={{width:42, height:42, borderRadius:10, background:'var(--cream)', color:'var(--navy-800)', display:'grid', placeItems:'center'}}>
                <Icon name={m.ic} size={18}/>
              </span>
              <div>
                <div style={{fontWeight:600, fontSize:13.5}}>{m.l}</div>
                <div style={{fontSize:12, color:'var(--ink-500)', marginTop:2}}>{m.s}</div>
              </div>
              <div className="mono" style={{fontSize:11.5, color:'var(--ink-500)'}}>{m.fee}</div>
              <Toggle on={m.on}/>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Tax &amp; pricing">
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
          <Lbl label="SST RATE"><input defaultValue="6%" style={inpA}/></Lbl>
          <Lbl label="MYTRIP SDN BHD GST NUMBER"><input defaultValue="C24832701040" style={inpA}/></Lbl>
          <Lbl label="DEFAULT DEPOSIT %"><input defaultValue="30%" style={inpA}/></Lbl>
          <Lbl label="REFUND WINDOW (DAYS)"><input defaultValue="7" style={inpA}/></Lbl>
        </div>
        <div style={{padding:'12px 14px', background:'var(--blue-50)', borderRadius:10, marginTop:16, fontSize:12.5, color:'var(--navy-800)', display:'flex', gap:8}}>
          <Icon name="check" size={15} color="var(--blue-600)"/>
          SST is auto-applied to all bookings. Show inclusive on invoice: <strong style={{marginLeft:4}}>Yes</strong>
        </div>
      </Card>

      <Card title="Payout account" subtitle="Where revenue is deposited weekly (every Tuesday).">
        <div style={{display:'flex', alignItems:'center', gap:14, padding:'16px 18px', background:'var(--paper)', borderRadius:12}}>
          <span style={{width:46, height:46, borderRadius:10, background:'var(--navy-800)', color:'#fff', display:'grid', placeItems:'center', fontWeight:600, fontSize:11}}>MBB</span>
          <div style={{flex:1}}>
            <div style={{fontWeight:600, fontSize:14}}>Maybank · Current</div>
            <div className="mono" style={{fontSize:12, color:'var(--ink-500)'}}>•••• 4218 · Viking Tour &amp; Travel Sdn. Bhd.</div>
          </div>
          <button style={{...btnGhost, padding:'8px 14px', fontSize:12.5}}>Change</button>
        </div>
      </Card>
    </>
  );
}

function TeamSettings(){
  const team = [
    {n:'Ahmad Firdaus',  e:'admin@vikingtour.com.my',       r:'Super Admin',  last:'now',         on:true},
    {n:'Nur Aisyah',     e:'aisyah@vikingtour.com.my',       r:'Operations',   last:'12 min ago',  on:true},
    {n:'Daniel Lee',     e:'daniel@vikingtour.com.my',       r:'Guide Lead',   last:'2 h ago',     on:true},
    {n:'Siti Khadijah',  e:'siti@vikingtour.com.my',         r:'Guide Lead',   last:'5 h ago',     on:true},
    {n:'Muhammad Amir',  e:'amir@vikingtour.com.my',         r:'Content',      last:'yesterday',   on:false},
  ];
  const rc = {'Super Admin':'var(--coral)','Operations':'var(--blue-600)','Guide Lead':'var(--jade)','Content':'var(--gold)'};
  return (
    <>
      <Card title="Team members" subtitle="Active staff with access to the operations console." actions={
        <button style={{...btnPrimary, padding:'9px 14px', fontSize:13}}><Icon name="plus" size={13}/> Invite member</button>
      }>
        <div style={{display:'flex', flexDirection:'column'}}>
          {team.map((u,i)=>(
            <div key={i} style={{display:'grid', gridTemplateColumns:'42px 1fr auto auto auto', gap:14, alignItems:'center', padding:'14px 0', borderBottom: i<team.length-1 ? '1px solid var(--line-2)' : 'none'}}>
              <span style={{width:42, height:42, borderRadius:99, background:'linear-gradient(135deg, var(--navy-700), var(--blue-500))', color:'#fff', display:'grid', placeItems:'center', fontSize:12, fontWeight:600}}>
                {u.n.split(' ').map(x=>x[0]).slice(0,2).join('')}
              </span>
              <div>
                <div style={{fontWeight:600, fontSize:13.5}}>{u.n}</div>
                <div className="mono" style={{fontSize:11.5, color:'var(--ink-400)'}}>{u.e}</div>
              </div>
              <span style={{padding:'3px 10px', background:rc[u.r]+'18', color:rc[u.r], fontSize:11, fontWeight:600, borderRadius:99}}>{u.r}</span>
              <div className="mono" style={{fontSize:11, color:'var(--ink-400)'}}>{u.last}</div>
              <div style={{display:'flex', gap:4}}>
                <button style={{width:30, height:30, borderRadius:7, border:0, background:'transparent', color:'var(--ink-400)', cursor:'pointer'}}><Icon name="edit" size={14}/></button>
                <button style={{width:30, height:30, borderRadius:7, border:0, background:'transparent', color:'var(--coral)', cursor:'pointer'}}><Icon name="trash" size={14}/></button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Roles &amp; permissions">
        <div style={{display:'grid', gridTemplateColumns:'1fr 80px 80px 80px 80px', gap:8, fontSize:12.5}}>
          <div className="kicker">CAPABILITY</div>
          <div className="kicker" style={{textAlign:'center'}}>SUPER ADMIN</div>
          <div className="kicker" style={{textAlign:'center'}}>OPERATIONS</div>
          <div className="kicker" style={{textAlign:'center'}}>GUIDE</div>
          <div className="kicker" style={{textAlign:'center'}}>CONTENT</div>
          {[
            ['View bookings',          true,true,true,false],
            ['Edit bookings',           true,true,false,false],
            ['Issue refunds',           true,true,false,false],
            ['Manage packages',         true,true,false,true],
            ['Manage promotions',       true,true,false,true],
            ['View financial reports',  true,true,false,false],
            ['Manage team & access',    true,false,false,false],
            ['System settings',         true,false,false,false],
          ].map((row,i)=>(
            <React.Fragment key={i}>
              <div style={{padding:'9px 0', borderTop:'1px solid var(--line-2)'}}>{row[0]}</div>
              {row.slice(1).map((on,j)=>(
                <div key={j} style={{padding:'9px 0', textAlign:'center', borderTop:'1px solid var(--line-2)'}}>
                  {on ? <Icon name="check" size={15} color="var(--jade)"/> : <span style={{color:'var(--ink-300)'}}>—</span>}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </Card>
    </>
  );
}

function NotifSettings(){
  const groups = [
    {l:'New booking confirmed',       email:true,  sms:true,  push:true,  slack:true},
    {l:'Payment received',             email:true,  sms:false, push:true,  slack:true},
    {l:'Refund requested',             email:true,  sms:true,  push:true,  slack:true},
    {l:'New customer registered',      email:true,  sms:false, push:false, slack:false},
    {l:'5★ review received',           email:true,  sms:false, push:true,  slack:true},
    {l:'Itinerary edited by guide',    email:false, sms:false, push:true,  slack:true},
    {l:'Promo expiring < 48h',         email:true,  sms:false, push:true,  slack:true},
    {l:'Weekly summary report',        email:true,  sms:false, push:false, slack:false},
  ];
  return (
    <Card title="Notification preferences" subtitle="Set which channels you receive each event on. Per-user — saved separately for each staff member.">
      <div style={{display:'grid', gridTemplateColumns:'1.6fr repeat(4, 70px)', gap:8, alignItems:'center'}}>
        <div></div>
        {['EMAIL','SMS','PUSH','SLACK'].map(h => <div key={h} className="kicker" style={{textAlign:'center'}}>{h}</div>)}
        {groups.map((g,i)=>(
          <React.Fragment key={i}>
            <div style={{padding:'10px 0', fontSize:13, borderTop:'1px solid var(--line-2)'}}>{g.l}</div>
            {['email','sms','push','slack'].map(k=>(
              <div key={k} style={{padding:'10px 0', textAlign:'center', borderTop:'1px solid var(--line-2)', display:'grid', placeItems:'center'}}>
                <Toggle on={g[k]}/>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
}

function EmailSettings(){
  const templates = [
    {n:'Booking confirmation',   s:'Sent on payment success',            last:'edited 2 days ago'},
    {n:'Pre-trip reminder',      s:'Sent 48 hours before departure',     last:'edited 1 week ago'},
    {n:'Payment reminder',       s:'Sent 3 days before deposit deadline',last:'edited 3 days ago'},
    {n:'Post-trip review request',s:'Sent 3 days after trip completion', last:'edited 1 month ago'},
    {n:'Refund processed',       s:'Sent on refund approval',            last:'edited 2 weeks ago'},
    {n:'Promo announcement',     s:'Sent when new promo goes live',      last:'edited 1 month ago'},
  ];
  return (
    <Card title="Email templates" subtitle="Editable HTML templates sent on key system events. Variables wrap in {{…}}.">
      <div style={{display:'flex', flexDirection:'column'}}>
        {templates.map((t,i)=>(
          <div key={i} style={{display:'grid', gridTemplateColumns:'auto 1fr auto auto', gap:14, alignItems:'center', padding:'14px 0', borderBottom: i<templates.length-1 ? '1px solid var(--line-2)' : 'none'}}>
            <span style={{width:38, height:38, borderRadius:8, background:'var(--blue-50)', color:'var(--blue-600)', display:'grid', placeItems:'center'}}>
              <Icon name="mail" size={16}/>
            </span>
            <div>
              <div style={{fontWeight:600, fontSize:13.5}}>{t.n}</div>
              <div style={{fontSize:12, color:'var(--ink-500)', marginTop:2}}>{t.s}</div>
            </div>
            <div style={{fontSize:11, color:'var(--ink-400)'}}>{t.last}</div>
            <button style={{...btnGhost, padding:'7px 12px', fontSize:12}}>Edit →</button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ApiSettings(){
  return (
    <>
      <Card title="API keys" subtitle="Generate keys to read bookings, sync customers, or trigger refunds programmatically.">
        <div style={{padding:'14px 16px', background:'var(--paper)', borderRadius:12, display:'flex', alignItems:'center', gap:14}}>
          <Icon name="bolt" size={20} color="var(--navy-700)"/>
          <div style={{flex:1}}>
            <div style={{fontWeight:600, fontSize:13.5}}>Production key</div>
            <div className="mono" style={{fontSize:12, color:'var(--ink-500)'}}>vk_live_4218••••••••••••••a90f</div>
          </div>
          <button style={{...btnGhost, padding:'8px 14px', fontSize:12.5}}>Reveal</button>
          <button style={{...btnGhost, padding:'8px 14px', fontSize:12.5}}>Rotate</button>
        </div>
        <div style={{padding:'14px 16px', background:'var(--paper)', borderRadius:12, display:'flex', alignItems:'center', gap:14, marginTop:10}}>
          <Icon name="bolt" size={20} color="var(--ink-400)"/>
          <div style={{flex:1}}>
            <div style={{fontWeight:600, fontSize:13.5}}>Sandbox key</div>
            <div className="mono" style={{fontSize:12, color:'var(--ink-500)'}}>vk_test_8821••••••••••••••dc12</div>
          </div>
          <button style={{...btnGhost, padding:'8px 14px', fontSize:12.5}}>Reveal</button>
          <button style={{...btnGhost, padding:'8px 14px', fontSize:12.5}}>Rotate</button>
        </div>
      </Card>
      <Card title="Webhook endpoints">
        <div style={{display:'flex', flexDirection:'column', gap:10}}>
          {[
            {u:'https://hooks.zapier.com/hooks/catch/2018392/booking',  ev:'booking.confirmed', s:'Active'},
            {u:'https://discord.com/api/webhooks/882…/refunds',          ev:'refund.requested',  s:'Active'},
            {u:'https://my-erp.example.com/viking/sync',                 ev:'customer.created',  s:'Failing'},
          ].map((w,i)=>(
            <div key={i} style={{padding:'12px 14px', background:'var(--paper)', borderRadius:10, display:'grid', gridTemplateColumns:'1fr auto auto', gap:14, alignItems:'center'}}>
              <div>
                <div className="mono" style={{fontSize:11.5, color:'var(--ink-700)'}}>{w.u}</div>
                <div style={{fontSize:11, color:'var(--ink-400)', marginTop:2}}>{w.ev}</div>
              </div>
              <span style={{padding:'3px 10px', background: w.s==='Active'?'rgba(31,138,91,.10)':'var(--coral-soft)', color: w.s==='Active'?'var(--jade)':'var(--coral)', fontSize:11, fontWeight:600, borderRadius:99}}>{w.s}</span>
              <button style={{padding:'7px 12px', background:'#fff', border:'1px solid var(--line)', borderRadius:99, fontSize:11.5, cursor:'pointer', fontFamily:'inherit'}}>Test</button>
            </div>
          ))}
          <button style={{padding:'10px 16px', border:'1px dashed var(--line)', background:'transparent', borderRadius:10, color:'var(--blue-600)', fontWeight:500, fontSize:13, cursor:'pointer', fontFamily:'inherit', marginTop:6}}>+ Add endpoint</button>
        </div>
      </Card>
    </>
  );
}

function AuditLog(){
  const log = [
    {who:'Ahmad Firdaus',  v:'updated SST rate from 5% to 6%',          time:'12 min ago',  ip:'175.142.42.18',   ic:'edit'},
    {who:'Nur Aisyah',     v:'issued refund for VK-2026-04215',          time:'1 hour ago',  ip:'175.142.42.22',   ic:'card'},
    {who:'Ahmad Firdaus',  v:'created promo code STUDENT15',             time:'3 hours ago', ip:'175.142.42.18',   ic:'plus'},
    {who:'Daniel Lee',     v:'edited Day 2 itinerary · Langkawi 4D3N',   time:'5 hours ago', ip:'202.184.91.74',   ic:'edit'},
    {who:'Nur Aisyah',     v:'invited siti@vikingtour.com.my (Guide Lead)',time:'yesterday',ip:'175.142.42.22',   ic:'users'},
    {who:'System',         v:'auto-archived 28 read notifications',      time:'yesterday',  ip:'internal',         ic:'bell'},
    {who:'Ahmad Firdaus',  v:'rotated production API key',                time:'2 days ago', ip:'175.142.42.18',   ic:'bolt'},
  ];
  return (
    <Card title="Audit log" subtitle="Every consequential action logged with user, IP, and timestamp. Retained for 12 months.">
      <div style={{display:'flex', flexDirection:'column'}}>
        {log.map((l,i)=>(
          <div key={i} style={{display:'grid', gridTemplateColumns:'36px 1fr auto auto', gap:14, alignItems:'center', padding:'12px 0', borderBottom: i<log.length-1 ? '1px solid var(--line-2)' : 'none'}}>
            <span style={{width:36, height:36, borderRadius:99, background:'var(--paper)', color:'var(--ink-500)', display:'grid', placeItems:'center'}}>
              <Icon name={l.ic} size={15}/>
            </span>
            <div style={{fontSize:13}}>
              <strong style={{color:'var(--ink-900)'}}>{l.who}</strong>{' '}
              <span style={{color:'var(--ink-500)'}}>{l.v}</span>
            </div>
            <div className="mono" style={{fontSize:11, color:'var(--ink-400)'}}>{l.ip}</div>
            <div className="mono" style={{fontSize:11, color:'var(--ink-400)'}}>{l.time}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Toggle({on}){
  const [v, setV] = React.useState(on);
  return (
    <button onClick={()=>setV(!v)} style={{
      width:38, height:22, borderRadius:99, position:'relative',
      background: v ? 'var(--blue-500)' : 'var(--line)',
      border:0, cursor:'pointer', transition:'background .2s',
    }}>
      <span style={{
        position:'absolute', top:2, left: v ? 18 : 2, width:18, height:18,
        borderRadius:99, background:'#fff', transition:'left .2s', boxShadow:'0 1px 3px rgba(0,0,0,.2)',
      }}/>
    </button>
  );
}

Object.assign(window, { AdminPromotions, AdminSettings, Toggle });
