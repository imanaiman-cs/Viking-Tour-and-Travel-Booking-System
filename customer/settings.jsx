// Customer — Settings (account preferences, notifications, payment methods, security, privacy)

function CustomerSettings(){
  const [tab, setTab] = React.useState('profile');
  const user = window.__vikingUser || {};
  const tabs = [
    {id:'profile',  l:'Profile',           ic:'user'},
    {id:'security', l:'Security',          ic:'settings'},
    {id:'notif',    l:'Notifications',     ic:'bell'},
    {id:'pay',      l:'Payment methods',   ic:'card'},
    {id:'travel',   l:'Travel preferences',ic:'plane'},
    {id:'privacy',  l:'Privacy & data',    ic:'eye'},
    {id:'lang',     l:'Language & region', ic:'globe'},
  ];
  return (
    <main style={{maxWidth:1320, margin:'0 auto', padding:'56px 32px 0'}}>
      <Crumbs items={['Home','Account Settings']}/>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'end', marginTop:18, marginBottom:30}}>
        <div>
          <h1 style={{fontFamily:'var(--f-display)', fontSize:'clamp(40px, 5vw, 64px)', lineHeight:1.05, margin:0, color:'var(--navy-900)', letterSpacing:'-0.01em'}}>
            Account settings
          </h1>
          <p style={{color:'var(--ink-500)', fontSize:15, marginTop:10, maxWidth:520}}>
            Manage your profile, payment options, travel preferences, and how Viking Tour keeps in touch.
          </p>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <span className="kicker">SIGNED IN AS</span>
          <div style={{display:'flex', alignItems:'center', gap:10, padding:'7px 12px 7px 7px', background:'#fff', border:'1px solid var(--line)', borderRadius:99}}>
            <span style={{width:30, height:30, borderRadius:99, background:'linear-gradient(135deg, var(--navy-700), var(--blue-500))', color:'#fff', display:'grid', placeItems:'center', fontSize:11, fontWeight:600}}>
              {(user.name||'?').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()}
            </span>
            <div style={{fontSize:13}}>
              <div style={{fontWeight:600}}>{user.name || 'Guest'}</div>
              <div style={{fontSize:11, color:'var(--ink-400)'}}>{user.tier || 'Bronze'}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'240px 1fr', gap:32, alignItems:'start'}} className="settings-grid">
        <aside style={{position:'sticky', top:100, alignSelf:'start'}}>
          <nav style={{background:'#fff', border:'1px solid var(--line)', borderRadius:14, padding:8}}>
            {tabs.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{
                display:'flex', alignItems:'center', gap:10, padding:'11px 12px', width:'100%',
                background: tab===t.id ? 'var(--blue-50)' : 'transparent',
                color: tab===t.id ? 'var(--navy-800)' : 'var(--ink-700)',
                border:0, borderRadius:8, cursor:'pointer', fontFamily:'inherit', fontSize:13.5, fontWeight:500,
                textAlign:'left', marginBottom:2,
              }}>
                <Icon name={t.ic} size={16} color={tab===t.id?'var(--blue-600)':'var(--ink-500)'}/>
                <span style={{flex:1}}>{t.l}</span>
                {tab===t.id && <Icon name="chev-r" size={14} color="var(--blue-600)"/>}
              </button>
            ))}
            <div style={{height:1, background:'var(--line-2)', margin:'6px 8px'}}/>
            <button style={{
              display:'flex', alignItems:'center', gap:10, padding:'11px 12px', width:'100%',
              background:'transparent', color:'var(--coral)',
              border:0, borderRadius:8, cursor:'pointer', fontFamily:'inherit', fontSize:13.5, fontWeight:500, textAlign:'left',
            }}>
              <Icon name="logout" size={16}/> Log out everywhere
            </button>
          </nav>

          <div style={{marginTop:14, padding:'18px 18px', background:'linear-gradient(160deg, var(--navy-900), var(--blue-600))', color:'#fff', borderRadius:14}}>
            <div className="kicker" style={{color:'rgba(255,255,255,.55)'}}>VIP · GOLD TIER</div>
            <div style={{fontFamily:'var(--f-display)', fontSize:24, lineHeight:1.1, marginTop:6}}>3 trips to <span style={{fontStyle:'italic'}}>Platinum</span></div>
            <div style={{height:6, background:'rgba(255,255,255,.16)', borderRadius:6, overflow:'hidden', marginTop:14}}>
              <div style={{height:'100%', width:'72%', background:'#fff'}}/>
            </div>
            <div style={{fontSize:11, color:'rgba(255,255,255,.65)', marginTop:6}}>9 of 12 trips · expires Dec 2026</div>
          </div>
        </aside>

        <div style={{display:'flex', flexDirection:'column', gap:16}}>
          {tab==='profile'  && <CProfile/>}
          {tab==='security' && <CSecurity/>}
          {tab==='notif'    && <CNotif/>}
          {tab==='pay'      && <CPay/>}
          {tab==='travel'   && <CTravel/>}
          {tab==='privacy'  && <CPrivacy/>}
          {tab==='lang'     && <CLang/>}
        </div>
      </div>
    </main>
  );
}

function SCard({title, subtitle, children, actions}){
  return (
    <div style={{background:'#fff', border:'1px solid var(--line)', borderRadius:18, padding:'26px 28px'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'start', marginBottom:20}}>
        <div>
          <div style={{fontFamily:'var(--f-display)', fontSize:24, color:'var(--navy-800)'}}>{title}</div>
          {subtitle && <div style={{fontSize:13, color:'var(--ink-500)', marginTop:5, maxWidth:520}}>{subtitle}</div>}
        </div>
        {actions}
      </div>
      {children}
    </div>
  );
}

function SLbl({label, children, hint}){
  return (
    <label style={{display:'block'}}>
      <div className="kicker" style={{marginBottom:7}}>{label}</div>
      {children}
      {hint && <div style={{fontSize:11.5, color:'var(--ink-400)', marginTop:5}}>{hint}</div>}
    </label>
  );
}
const sInp = {width:'100%', padding:'12px 14px', border:'1px solid var(--line)', borderRadius:10, background:'#fff', fontSize:14, fontFamily:'inherit', color:'var(--ink-900)'};

function CProfile(){
  const user = window.__vikingUser || {};
  const nameParts = (user.name||'').split(' ');
  const [form, setForm] = React.useState({
    firstName: nameParts[0] || '',
    lastName:  nameParts.slice(1).join(' ') || '',
    ic:        user.ic    || '',
    email:     user.email || '',
    phone:     user.phone || '',
    addr:      user.address || '',
    city:      user.city   || '',
  });
  const [saving, setSaving]   = React.useState(false);
  const [saved, setSaved]     = React.useState(false);
  const [err, setErr]         = React.useState('');
  const u = (k,v) => setForm(f=>({...f,[k]:v}));

  const initials = [form.firstName[0]||'', form.lastName[0]||''].join('').toUpperCase() || '?';

  async function save(){
    if (!user.id) return;
    setSaving(true); setSaved(false); setErr('');
    try {
      const res = await fetch(`/api/customers.php?id=${user.id}`, {
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          first_name: form.firstName,
          last_name:  form.lastName,
          phone:      form.phone,
          email:      form.email,
          city:       form.city,
          address:    form.addr,
        }),
      });
      const data = await res.json();
      if (data.success) {
        window.__vikingUser = {...user, name:`${form.firstName} ${form.lastName}`, email:form.email, phone:form.phone};
        setSaved(true);
      } else {
        setErr(data.error || 'Failed to save.');
      }
    } catch(e){ setErr('Network error. Try again.'); }
    finally { setSaving(false); }
  }

  return (
    <>
      <SCard title="Personal information" subtitle="As shown on your MyKad / passport. Used on every booking invoice.">
        <div style={{display:'flex', alignItems:'center', gap:18, marginBottom:22}}>
          <div style={{width:72, height:72, borderRadius:99, background:'linear-gradient(135deg, var(--navy-700), var(--blue-500))', color:'#fff', display:'grid', placeItems:'center', fontFamily:'var(--f-display)', fontSize:28}}>{initials}</div>
          <div>
            <div style={{fontWeight:600, fontSize:15}}>{user.name || 'Your Name'}</div>
            <div style={{fontSize:12.5, color:'var(--ink-500)', marginTop:2}}>{user.tier || 'Bronze'} member</div>
          </div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
          <SLbl label="FIRST NAME"><input value={form.firstName} onChange={e=>u('firstName',e.target.value)} style={sInp}/></SLbl>
          <SLbl label="LAST NAME"><input value={form.lastName} onChange={e=>u('lastName',e.target.value)} style={sInp}/></SLbl>
          <SLbl label="IC NUMBER" hint="Cannot be changed — contact support"><input value={form.ic} disabled style={{...sInp, color:'var(--ink-400)', background:'var(--paper)'}}/></SLbl>
          <SLbl label="EMAIL"><input value={form.email} onChange={e=>u('email',e.target.value)} type="email" style={sInp}/></SLbl>
          <SLbl label="PHONE"><input value={form.phone} onChange={e=>u('phone',e.target.value)} style={sInp}/></SLbl>
        </div>
        {err  && <div style={{marginTop:12, fontSize:12.5, color:'var(--coral)'}}>{err}</div>}
        {saved && <div style={{marginTop:12, fontSize:12.5, color:'var(--jade)'}}>Profile saved successfully.</div>}
        <div style={{display:'flex', gap:8, marginTop:20, justifyContent:'flex-end'}}>
          <button style={{...btnPrimary, padding:'11px 20px', opacity:saving?.6:1}} onClick={save} disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </SCard>

      <SCard title="Home address" subtitle="Used as the default billing address on new bookings.">
        <div style={{display:'flex', flexDirection:'column', gap:14}}>
          <SLbl label="STREET ADDRESS"><input value={form.addr} onChange={e=>u('addr',e.target.value)} placeholder="e.g. A-12-3, Jalan Pjs 8/5" style={sInp}/></SLbl>
          <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:14}}>
            <SLbl label="CITY"><input value={form.city} onChange={e=>u('city',e.target.value)} placeholder="e.g. Petaling Jaya" style={sInp}/></SLbl>
            <SLbl label="STATE">
              <select style={sInp}>
                <option>Selangor</option><option>Kuala Lumpur</option><option>Pulau Pinang</option><option>Johor</option><option>Melaka</option>
              </select>
            </SLbl>
          </div>
        </div>
        <div style={{display:'flex', gap:8, marginTop:20, justifyContent:'flex-end'}}>
          <button style={{...btnPrimary, padding:'11px 20px', opacity:saving?.6:1}} onClick={save} disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </SCard>
    </>
  );
}

function CSecurity(){
  return (
    <>
      <SCard title="Password" subtitle="Choose a strong password. We recommend 12+ characters with a mix of letters, numbers and symbols.">
        <div style={{display:'flex', flexDirection:'column', gap:14, maxWidth:480}}>
          <SLbl label="CURRENT PASSWORD"><input type="password" defaultValue="••••••••••••" style={sInp}/></SLbl>
          <SLbl label="NEW PASSWORD" hint="Strength: Good · 14 chars">
            <input type="password" defaultValue="•••••••••••••••" style={{...sInp, borderColor:'var(--jade)'}}/>
          </SLbl>
          <SLbl label="CONFIRM NEW PASSWORD"><input type="password" defaultValue="•••••••••••••••" style={sInp}/></SLbl>
          <button style={{...btnPrimary, padding:'12px 22px', alignSelf:'flex-start'}}>Update password</button>
        </div>
      </SCard>

      <SCard title="Two-factor authentication" subtitle="Add a second step when signing in. Strongly recommended.">
        <div style={{display:'flex', flexDirection:'column', gap:12}}>
          <Method ic="phone" name="SMS verification" sub="Codes sent to +60 12-***-6789" on={true} badge="Active"/>
          <Method ic="bolt"  name="Authenticator app" sub="Google Authenticator, Authy, 1Password" on={false} badge="Recommended"/>
          <Method ic="mail"  name="Email backup codes" sub="10 single-use codes · 7 remaining" on={true}/>
        </div>
      </SCard>

      <SCard title="Active sessions" subtitle="Devices currently signed into your account.">
        <div style={{display:'flex', flexDirection:'column'}}>
          {[
            {d:'MacBook Pro · Safari', l:'Petaling Jaya, Selangor', t:'Active now', c:true},
            {d:'iPhone 15 · Viking iOS app', l:'Petaling Jaya, Selangor', t:'2 hours ago', c:false},
            {d:'Chrome on Windows', l:'Bukit Bintang, KL', t:'3 days ago', c:false},
          ].map((s,i)=>(
            <div key={i} style={{display:'grid', gridTemplateColumns:'auto 1fr auto auto', gap:14, alignItems:'center', padding:'14px 0', borderBottom: i<2 ? '1px solid var(--line-2)' : 'none'}}>
              <span style={{width:40, height:40, borderRadius:10, background:'var(--paper)', color:'var(--ink-500)', display:'grid', placeItems:'center'}}>
                <Icon name={s.d.startsWith('iPhone') ? 'phone' : 'card'} size={16}/>
              </span>
              <div>
                <div style={{fontWeight:600, fontSize:13.5}}>{s.d}</div>
                <div style={{fontSize:11.5, color:'var(--ink-400)', marginTop:2}}>{s.l} · {s.t}</div>
              </div>
              {s.c && <span style={{padding:'3px 10px', background:'rgba(31,138,91,.10)', color:'var(--jade)', fontSize:11, fontWeight:600, borderRadius:99}}>This device</span>}
              {!s.c && <button style={{padding:'7px 12px', background:'transparent', border:'1px solid var(--line)', borderRadius:99, fontSize:12, cursor:'pointer', fontFamily:'inherit', color:'var(--ink-700)'}}>Sign out</button>}
              <span/>
            </div>
          ))}
        </div>
      </SCard>
    </>
  );
}

function Method({ic, name, sub, on, badge}){
  return (
    <div style={{display:'grid', gridTemplateColumns:'auto 1fr auto auto', gap:14, alignItems:'center', padding:'14px 16px', background:on?'var(--blue-50)':'var(--paper)', borderRadius:12, border:'1px solid ' + (on?'var(--blue-100)':'var(--line-2)')}}>
      <span style={{width:42, height:42, borderRadius:10, background:'#fff', color:'var(--navy-700)', display:'grid', placeItems:'center'}}>
        <Icon name={ic} size={17}/>
      </span>
      <div>
        <div style={{fontWeight:600, fontSize:13.5}}>{name}</div>
        <div style={{fontSize:12, color:'var(--ink-500)', marginTop:2}}>{sub}</div>
      </div>
      {badge && <span style={{padding:'3px 10px', background: badge==='Active' ? 'rgba(31,138,91,.10)' : 'var(--coral-soft)', color: badge==='Active' ? 'var(--jade)' : 'var(--coral)', fontSize:11, fontWeight:600, borderRadius:99}}>{badge}</span>}
      <Toggle on={on}/>
    </div>
  );
}

function CNotif(){
  const groups = [
    {sect:'Trips & bookings', items:[
      {l:'Booking confirmed', d:'When a new reservation is paid', email:true, sms:true, push:true},
      {l:'Pre-trip reminder', d:'48 hours before departure',     email:true, sms:true, push:true},
      {l:'Itinerary updates', d:'When guides edit the schedule',  email:true, sms:false, push:true},
      {l:'Payment reminder',  d:'3 days before deposit deadline',email:true, sms:true, push:false},
    ]},
    {sect:'Promotions & news', items:[
      {l:'Flash sales',      d:'Limited-time offers (high signal)', email:true, sms:false, push:true},
      {l:'Monthly newsletter',d:'Travel stories &amp; new packages', email:true, sms:false, push:false},
      {l:'Personalised suggestions',d:'Based on past trips', email:false, sms:false, push:false},
    ]},
    {sect:'Reviews & community', items:[
      {l:'Review request',  d:'3 days after a trip ends',         email:true, sms:false, push:true},
      {l:'Reply to my review', d:'When a guide responds',          email:true, sms:false, push:true},
    ]},
  ];
  return (
    <SCard title="Notifications" subtitle="Choose which messages you receive and on which channels. We never share your contact info.">
      <div style={{display:'grid', gridTemplateColumns:'1fr 70px 70px 70px', gap:8, alignItems:'center'}}>
        <div></div>
        {['EMAIL','SMS','PUSH'].map(h=> <div key={h} className="kicker" style={{textAlign:'center'}}>{h}</div>)}
      </div>
      {groups.map((g,gi)=>(
        <div key={gi} style={{marginTop:gi>0?22:14}}>
          <div className="kicker" style={{color:'var(--blue-600)', marginBottom:6}}>{g.sect.toUpperCase()}</div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 70px 70px 70px', gap:8, alignItems:'center'}}>
            {g.items.map((it,i)=>(
              <React.Fragment key={i}>
                <div style={{padding:'12px 0', borderTop:'1px solid var(--line-2)'}}>
                  <div style={{fontSize:13.5, fontWeight:500}}>{it.l}</div>
                  <div style={{fontSize:11.5, color:'var(--ink-400)', marginTop:2}} dangerouslySetInnerHTML={{__html: it.d}}/>
                </div>
                {['email','sms','push'].map(k => (
                  <div key={k} style={{padding:'12px 0', textAlign:'center', borderTop:'1px solid var(--line-2)', display:'grid', placeItems:'center'}}>
                    <Toggle on={it[k]}/>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
      <div style={{padding:'12px 14px', background:'var(--paper)', borderRadius:10, fontSize:12.5, color:'var(--ink-500)', marginTop:22, display:'flex', gap:8}}>
        <Icon name="check" size={15} color="var(--jade)"/>
        Critical safety messages (e.g. trip cancellations due to weather) cannot be turned off.
      </div>
    </SCard>
  );
}

function CPay(){
  return (
    <>
      <SCard title="Saved payment methods" subtitle="Used for one-click checkout. Stored securely by iPay88 — we never see your card details." actions={
        <button style={{...btnGhost, padding:'9px 14px', fontSize:12.5}}><Icon name="plus" size={13}/> Add method</button>
      }>
        <div style={{display:'flex', flexDirection:'column', gap:10}}>
          {[
            {kind:'card',  brand:'VISA',     n:'•••• 4218', s:'Expires 08/28 · Nur Aisyah Rahman', def:true},
            {kind:'fpx',   brand:'Maybank',  n:'•••• ••• 8821', s:'Maybank2u · linked Aug 2024',     def:false},
            {kind:'ewallet', brand:'Touch \'n Go', n:'eWallet', s:'+60 12-***-6789',                  def:false},
          ].map((m,i)=>(
            <div key={i} style={{display:'grid', gridTemplateColumns:'56px 1fr auto auto', gap:14, alignItems:'center', padding:'16px 18px', border:'1px solid ' + (m.def?'var(--blue-500)':'var(--line)'), borderRadius:12, background: m.def?'var(--blue-50)':'#fff'}}>
              <div style={{width:52, height:34, borderRadius:6, background: m.kind==='card'?'var(--navy-800)': m.kind==='fpx'?'#ffc20e':'var(--coral)', color:'#fff', display:'grid', placeItems:'center', fontFamily:'var(--f-mono)', fontSize:10, fontWeight:600, letterSpacing:'.05em'}}>
                {m.brand.slice(0,4).toUpperCase()}
              </div>
              <div>
                <div style={{fontWeight:600, fontSize:14}}>{m.brand} <span style={{color:'var(--ink-400)', fontWeight:400}}>· {m.n}</span></div>
                <div style={{fontSize:11.5, color:'var(--ink-500)', marginTop:2}}>{m.s}</div>
              </div>
              {m.def && <span style={{padding:'3px 10px', background:'rgba(31,138,91,.10)', color:'var(--jade)', fontSize:11, fontWeight:600, borderRadius:99}}>Default</span>}
              <div style={{display:'flex', gap:4}}>
                <button style={{width:30, height:30, borderRadius:7, border:0, background:'transparent', color:'var(--ink-400)', cursor:'pointer'}}><Icon name="edit" size={14}/></button>
                <button style={{width:30, height:30, borderRadius:7, border:0, background:'transparent', color:'var(--coral)', cursor:'pointer'}}><Icon name="trash" size={14}/></button>
              </div>
            </div>
          ))}
        </div>
      </SCard>

      <SCard title="Billing address" subtitle="Appears on your invoices and receipts.">
        <div style={{display:'grid', gridTemplateColumns:'1fr', gap:14}}>
          <SLbl label="STREET ADDRESS"><input defaultValue="A-12-3, Residensi Tropika, Jalan Pjs 8/5" style={sInp}/></SLbl>
          <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:14}}>
            <SLbl label="CITY"><input defaultValue="Petaling Jaya" style={sInp}/></SLbl>
            <SLbl label="POSKOD"><input defaultValue="46150" style={sInp}/></SLbl>
            <SLbl label="STATE"><select defaultValue="Selangor" style={sInp}><option>Selangor</option><option>Kuala Lumpur</option></select></SLbl>
          </div>
        </div>
      </SCard>
    </>
  );
}

function CTravel(){
  return (
    <>
      <SCard title="Travel preferences" subtitle="We use these to pre-fill booking forms and suggest packages you'll actually like.">
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
          <SLbl label="MEAL PREFERENCE">
            <select style={sInp}><option>Halal · standard</option><option>Vegetarian</option><option>Vegan</option><option>Pescatarian</option><option>No preference</option></select>
          </SLbl>
          <SLbl label="ALLERGIES">
            <input defaultValue="Shellfish · peanuts" style={sInp}/>
          </SLbl>
          <SLbl label="ROOM TYPE">
            <select style={sInp}><option>Double · standard</option><option>Single supplement</option><option>Twin beds</option><option>Family room</option></select>
          </SLbl>
          <SLbl label="ACTIVITY LEVEL">
            <select style={sInp}><option>Moderate · some hiking</option><option>Easy · sightseeing only</option><option>Active · long hikes &amp; diving</option></select>
          </SLbl>
        </div>
      </SCard>

      <SCard title="Trip interests" subtitle="Tap the topics you enjoy. We'll prioritise these in your suggestions.">
        <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
          {[
            {l:'Beaches',    on:true},
            {l:'Mountains',  on:true},
            {l:'Snorkelling',on:true},
            {l:'Diving',     on:false},
            {l:'Heritage',   on:true},
            {l:'Street food',on:true},
            {l:'Nature & wildlife',on:true},
            {l:'Photography',on:false},
            {l:'Spa & wellness',on:true},
            {l:'Family-friendly',on:false},
            {l:'Romantic',   on:true},
            {l:'Adventure',  on:false},
            {l:'Cultural',   on:true},
            {l:'Cycling',    on:false},
          ].map((t,i)=>(
            <button key={i} style={{
              padding:'8px 14px', borderRadius:99, cursor:'pointer', fontSize:12.5, fontFamily:'inherit', fontWeight:500,
              background: t.on ? 'var(--navy-800)' : '#fff',
              color: t.on ? '#fff' : 'var(--ink-700)',
              border:'1px solid ' + (t.on ? 'var(--navy-800)' : 'var(--line)'),
              display:'inline-flex', alignItems:'center', gap:6,
            }}>
              {t.on && <Icon name="check" size={13}/>}{t.l}
            </button>
          ))}
        </div>
      </SCard>

      <SCard title="Communication style" subtitle="How chatty do you want our guides to be on WhatsApp?">
        <div style={{display:'flex', gap:8}}>
          {['Bare minimum','Standard','Highly engaged'].map((s,i)=>(
            <button key={s} style={{
              flex:1, padding:'14px 16px', borderRadius:12, cursor:'pointer', fontSize:13, fontWeight:500, fontFamily:'inherit',
              background: i===1 ? 'var(--navy-800)' : '#fff', color: i===1 ? '#fff' : 'var(--ink-700)',
              border:'1px solid ' + (i===1 ? 'var(--navy-800)' : 'var(--line)'),
            }}>{s}</button>
          ))}
        </div>
      </SCard>
    </>
  );
}

function CPrivacy(){
  return (
    <>
      <SCard title="Data sharing" subtitle="Control how Viking Tour uses your information for personalisation and analytics.">
        <div style={{display:'flex', flexDirection:'column'}}>
          {[
            {l:'Personalised package recommendations', d:'Based on your past trips and interests', on:true},
            {l:'Anonymous analytics',                   d:'Helps us improve the platform — no personal data shared', on:true},
            {l:'Share reviews publicly',                d:'Your name appears on reviews you submit', on:true},
            {l:'Partner offers',                        d:'Hotel and airline partners may contact you with deals', on:false},
            {l:'Cross-device tracking',                 d:'Sync activity between mobile and desktop', on:true},
          ].map((r,i,arr)=>(
            <div key={i} style={{display:'grid', gridTemplateColumns:'1fr auto', gap:14, alignItems:'center', padding:'14px 0', borderBottom: i<arr.length-1 ? '1px solid var(--line-2)' : 'none'}}>
              <div>
                <div style={{fontWeight:600, fontSize:13.5}}>{r.l}</div>
                <div style={{fontSize:12, color:'var(--ink-500)', marginTop:2}}>{r.d}</div>
              </div>
              <Toggle on={r.on}/>
            </div>
          ))}
        </div>
      </SCard>

      <SCard title="Your data" subtitle="Download a copy of everything we hold about you, or close your account. Required by Malaysian PDPA 2010.">
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
          <div style={{padding:'18px 20px', background:'var(--paper)', borderRadius:12, display:'flex', flexDirection:'column', gap:8}}>
            <Icon name="down" size={20} color="var(--blue-600)"/>
            <div style={{fontFamily:'var(--f-display)', fontSize:18, color:'var(--navy-800)', marginTop:4}}>Download my data</div>
            <div style={{fontSize:12.5, color:'var(--ink-500)'}}>JSON archive of all bookings, reviews, preferences, and contact records. Delivered within 24 hours.</div>
            <button style={{...btnGhost, padding:'9px 14px', fontSize:12.5, alignSelf:'flex-start', marginTop:6}}>Request export</button>
          </div>
          <div style={{padding:'18px 20px', background:'rgba(232,99,58,.04)', border:'1px solid var(--coral-soft)', borderRadius:12, display:'flex', flexDirection:'column', gap:8}}>
            <Icon name="trash" size={20} color="var(--coral)"/>
            <div style={{fontFamily:'var(--f-display)', fontSize:18, color:'var(--coral)', marginTop:4}}>Close my account</div>
            <div style={{fontSize:12.5, color:'var(--ink-500)'}}>Permanently delete your account and personal data. Upcoming trips will be cancelled per our refund policy.</div>
            <button style={{padding:'9px 14px', borderRadius:99, background:'transparent', color:'var(--coral)', border:'1px solid var(--coral)', cursor:'pointer', fontFamily:'inherit', fontSize:12.5, fontWeight:500, alignSelf:'flex-start', marginTop:6}}>Close account…</button>
          </div>
        </div>
      </SCard>
    </>
  );
}

function CLang(){
  return (
    <>
      <SCard title="Language &amp; region" subtitle="Affects on-site copy, dates, currency and outbound emails.">
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
          <SLbl label="LANGUAGE">
            <select defaultValue="English" style={sInp}>
              <option>English (Malaysia)</option>
              <option>Bahasa Malaysia</option>
              <option>简体中文 · Simplified Chinese</option>
              <option>தமிழ் · Tamil</option>
            </select>
          </SLbl>
          <SLbl label="CURRENCY">
            <select style={sInp}><option>Malaysian Ringgit (RM)</option><option>Singapore Dollar (S$)</option><option>US Dollar ($)</option></select>
          </SLbl>
          <SLbl label="DATE FORMAT">
            <select style={sInp}><option>DD MMM YYYY · 18 Jun 2026</option><option>YYYY-MM-DD</option><option>MM/DD/YYYY</option></select>
          </SLbl>
          <SLbl label="TIMEZONE">
            <select style={sInp}><option>(UTC+08:00) Kuala Lumpur · Singapore</option><option>Auto-detect from device</option></select>
          </SLbl>
        </div>
      </SCard>
      <SCard title="Accessibility" subtitle="Make Viking Tour easier to use, however you browse.">
        <div style={{display:'flex', flexDirection:'column'}}>
          {[
            {l:'Reduce motion',         d:'Less animation on page transitions',     on:false},
            {l:'Larger text',           d:'Increase base font size by 1.2×',         on:false},
            {l:'High-contrast mode',    d:'Stronger borders and bolder text colour', on:false},
            {l:'Screen-reader hints',   d:'Verbose ARIA labels and descriptions',    on:true},
          ].map((r,i,arr)=>(
            <div key={i} style={{display:'grid', gridTemplateColumns:'1fr auto', gap:14, alignItems:'center', padding:'14px 0', borderBottom: i<arr.length-1 ? '1px solid var(--line-2)' : 'none'}}>
              <div>
                <div style={{fontWeight:600, fontSize:13.5}}>{r.l}</div>
                <div style={{fontSize:12, color:'var(--ink-500)', marginTop:2}}>{r.d}</div>
              </div>
              <Toggle on={r.on}/>
            </div>
          ))}
        </div>
      </SCard>
    </>
  );
}

// Toggle (customer copy — separate name to avoid collision with admin's)
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

Object.assign(window, { CustomerSettings });
