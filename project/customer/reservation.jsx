// Customer — Reservation / Booking flow (multi-step)

function ReservationPage({id}){
  const pkg = PACKAGES.find(p => p.id===id) || PACKAGES[0];
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState({
    firstName:'Nur Aisyah', lastName:'Rahman',
    ic:'990408-14-5238', phone:'+60 12-345 6789',
    email:'aisyah.r@gmail.com', addr:'A-12-3, Residensi Tropika, Jalan Pjs 8/5',
    city:'Petaling Jaya', poskod:'46150',
    pax:2, date:'18 Jun 2026', special:'',
    pay:'fpx', bank:'Maybank2u',
    card:'•••• 4218', name:'NUR AISYAH RAHMAN',
  });

  const steps = ['Traveller details','Add-ons','Payment','Confirm'];
  const subtotal = pkg.price * form.pax;
  const tax = Math.round(subtotal * 0.06);
  const disc = (pkg.was-pkg.price) * form.pax;
  const total = subtotal + tax;

  return (
    <main style={{maxWidth:1320, margin:'0 auto', padding:'36px 32px 0'}}>
      <Crumbs items={['Home','Travel Packages', pkg.name, 'Reservation']}/>
      <div style={{display:'grid', gridTemplateColumns:'1fr 380px', gap:48, marginTop:30}} className="rsv-grid">
        <div>
          <h1 style={{fontFamily:'var(--f-display)', fontSize:'clamp(36px, 4vw, 52px)', lineHeight:1.05, margin:0, color:'var(--navy-900)', letterSpacing:'-0.01em'}}>
            Reserve your trip
          </h1>
          <p style={{color:'var(--ink-500)', fontSize:15, marginTop:10}}>
            Four short steps. No payment is taken until step three. You can save and come back anytime.
          </p>

          {/* Stepper */}
          <div style={{display:'flex', alignItems:'center', gap:0, margin:'30px 0 36px'}}>
            {steps.map((s,i)=>{
              const n = i+1;
              const done = step > n, active = step===n;
              return (
                <React.Fragment key={s}>
                  <div style={{display:'flex', alignItems:'center', gap:10}}>
                    <div style={{
                      width:32, height:32, borderRadius:99,
                      background: done ? 'var(--blue-500)' : active ? 'var(--navy-800)' : '#fff',
                      color: (done||active) ? '#fff' : 'var(--ink-400)',
                      border:'1px solid ' + (done||active ? 'transparent' : 'var(--line)'),
                      display:'grid', placeItems:'center', fontSize:13, fontWeight:600,
                    }}>{done ? <Icon name="check" size={14}/> : n}</div>
                    <div style={{fontSize:13, fontWeight: active ? 600 : 500, color: active ? 'var(--navy-800)' : 'var(--ink-400)'}}>{s}</div>
                  </div>
                  {i<steps.length-1 && <div style={{flex:1, height:1, background: step>n ? 'var(--blue-500)' : 'var(--line)', margin:'0 16px'}}/>}
                </React.Fragment>
              );
            })}
          </div>

          {step===1 && <StepDetails form={form} setForm={setForm}/>}
          {step===2 && <StepAddons/>}
          {step===3 && <StepPayment form={form} setForm={setForm} total={total} disc={disc}/>}
          {step===4 && <StepConfirm form={form} pkg={pkg} total={total}/>}

          <div style={{display:'flex', justifyContent:'space-between', marginTop:36}}>
            <button style={btnGhost} onClick={()=> step>1 ? setStep(step-1) : nav('#/package/'+id)}>
              <Icon name="arrow-l" size={14}/> {step>1 ? 'Previous' : 'Back to package'}
            </button>
            {step < 4 ? (
              <button style={btnPrimary} onClick={()=>setStep(step+1)}>
                {step===3 ? 'Confirm & pay' : 'Continue'} <Icon name="arrow-r" size={14}/>
              </button>
            ) : (
              <button style={btnAccent} onClick={()=>nav('#/')}>Done · view itinerary</button>
            )}
          </div>
        </div>

        <aside>
          <div style={{position:'sticky', top:100, background:'#fff', border:'1px solid var(--line)', borderRadius:20, overflow:'hidden', boxShadow:'var(--sh-2)'}}>
            <div className={`ph ${pkg.img}`} data-label={pkg.loc.toUpperCase()} style={{height:160}}/>
            <div style={{padding:'20px 22px 22px'}}>
              <div style={{display:'flex', alignItems:'center', gap:6, color:'var(--ink-400)', fontSize:12}}>
                <Icon name="pin" size={13}/> {pkg.loc} · {pkg.days}
              </div>
              <div style={{fontFamily:'var(--f-display)', fontSize:22, color:'var(--navy-800)', lineHeight:1.2, margin:'8px 0 14px'}}>{pkg.name}</div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, fontSize:12.5, marginBottom:16}}>
                <div style={{padding:'10px 12px', background:'var(--paper)', borderRadius:10}}>
                  <div className="kicker">DEPART</div>
                  <div style={{fontWeight:500, marginTop:2}}>{form.date}</div>
                </div>
                <div style={{padding:'10px 12px', background:'var(--paper)', borderRadius:10}}>
                  <div className="kicker">PAX</div>
                  <div style={{fontWeight:500, marginTop:2}}>{form.pax} adults</div>
                </div>
              </div>

              <div className="divider" style={{margin:'2px 0 14px'}}/>
              <Row l={`RM ${pkg.price.toLocaleString()} × ${form.pax}`} v={`RM ${subtotal.toLocaleString()}`}/>
              <Row l="SST (6%)" v={`RM ${tax.toLocaleString()}`}/>
              <Row l="MERDEKA32" v={`− RM ${disc.toLocaleString()}`} color="var(--coral)"/>
              <div className="divider" style={{margin:'10px 0 12px'}}/>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                <span style={{fontSize:13.5, fontWeight:500}}>Total</span>
                <span style={{fontFamily:'var(--f-display)', fontSize:28, color:'var(--navy-900)'}}>RM {(total-disc).toLocaleString()}</span>
              </div>
              <div style={{padding:'10px 12px', background:'var(--blue-50)', borderRadius:10, fontSize:11.5, color:'var(--navy-700)', marginTop:14, display:'flex', gap:8}}>
                <Icon name="check" size={14} color="var(--jade)"/>
                Free cancellation up to <strong>11 Jun 2026</strong> · 7 days before departure.
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Row({l, v, color}){
  return (
    <div style={{display:'flex', justifyContent:'space-between', fontSize:13, color: color||'var(--ink-500)', padding:'4px 0'}}>
      <span>{l}</span><span className="mono">{v}</span>
    </div>
  );
}

function Field2({label, value, onChange, prefix, suffix, type='text', placeholder}){
  return (
    <label style={{display:'block'}}>
      <div className="kicker" style={{marginBottom:7}}>{label}</div>
      <div style={{
        display:'flex', alignItems:'center', gap:8,
        padding:'12px 14px', background:'#fff', border:'1px solid var(--line)', borderRadius:10,
        transition:'border-color .15s',
      }}>
        {prefix && <span style={{color:'var(--ink-400)', fontSize:13.5}}>{prefix}</span>}
        <input value={value} onChange={onChange} type={type} placeholder={placeholder}
          style={{flex:1, background:'transparent', border:0, outline:0, fontFamily:'inherit', fontSize:14, color:'var(--ink-900)'}}/>
        {suffix && <span style={{color:'var(--ink-400)', fontSize:13.5}}>{suffix}</span>}
      </div>
    </label>
  );
}

function StepDetails({form, setForm}){
  const u = (k, v)=> setForm({...form, [k]:v});
  return (
    <div style={{display:'flex', flexDirection:'column', gap:22}}>
      <Section title="Lead traveller" subtitle="As shown on your MyKad or passport.">
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
          <Field2 label="FIRST NAME" value={form.firstName} onChange={e=>u('firstName',e.target.value)}/>
          <Field2 label="LAST NAME" value={form.lastName} onChange={e=>u('lastName',e.target.value)}/>
          <Field2 label="IC NUMBER" value={form.ic} onChange={e=>u('ic',e.target.value)}/>
          <Field2 label="PHONE" value={form.phone} onChange={e=>u('phone',e.target.value)}/>
          <Field2 label="EMAIL" value={form.email} onChange={e=>u('email',e.target.value)}/>
          <Field2 label="ALTERNATE PHONE" value="" onChange={()=>{}} placeholder="Optional"/>
        </div>
      </Section>

      <Section title="Address (for billing)" subtitle="We'll send your e-invoice here.">
        <div style={{display:'grid', gridTemplateColumns:'1fr', gap:14}}>
          <Field2 label="STREET ADDRESS" value={form.addr} onChange={e=>u('addr',e.target.value)}/>
          <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:14}}>
            <Field2 label="CITY" value={form.city} onChange={e=>u('city',e.target.value)}/>
            <Field2 label="POSKOD" value={form.poskod} onChange={e=>u('poskod',e.target.value)}/>
            <label style={{display:'block'}}>
              <div className="kicker" style={{marginBottom:7}}>STATE</div>
              <select style={{padding:'13px 14px', width:'100%', border:'1px solid var(--line)', borderRadius:10, background:'#fff', fontFamily:'inherit', fontSize:14}}>
                <option>Selangor</option><option>Kuala Lumpur</option><option>Pulau Pinang</option><option>Johor</option>
              </select>
            </label>
          </div>
        </div>
      </Section>

      <Section title="Other travellers" subtitle="Add names later — required 5 days before departure.">
        <div style={{padding:'14px 16px', background:'var(--paper)', border:'1px dashed var(--line)', borderRadius:12, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{fontSize:13, color:'var(--ink-500)'}}>1 additional adult · details required by 13 Jun 2026</div>
          <button style={{...btnGhost, padding:'8px 14px', fontSize:13}}><Icon name="plus" size={14}/> Add traveller</button>
        </div>
      </Section>

      <Section title="Special requests" subtitle="Dietary, accessibility, room preference — anything we should know.">
        <textarea placeholder="e.g. No seafood, please. Prefer ground-floor room. Halal meals throughout."
          style={{
            width:'100%', minHeight:90, padding:'14px 16px',
            background:'#fff', border:'1px solid var(--line)', borderRadius:12,
            fontFamily:'inherit', fontSize:14, color:'var(--ink-900)', resize:'vertical',
          }}/>
      </Section>
    </div>
  );
}

function Section({title, subtitle, children}){
  return (
    <div style={{background:'#fff', border:'1px solid var(--line)', borderRadius:18, padding:'24px 26px'}}>
      <div style={{marginBottom:18}}>
        <div style={{fontFamily:'var(--f-display)', fontSize:24, color:'var(--navy-800)'}}>{title}</div>
        {subtitle && <div style={{fontSize:13, color:'var(--ink-500)', marginTop:4}}>{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}

function StepAddons(){
  const addons = [
    {id:'ins',  t:'Travel insurance',     d:'AmAssurance domestic plan · medical + trip cancellation', p:48, on:true},
    {id:'tx',   t:'Premium airport transfer', d:'Toyota Vellfire · meet & greet at LGK', p:120, on:false},
    {id:'cam',  t:'Drone photography hour',d:'Personal drone shoot at sunset, Day 2',  p:280, on:true},
    {id:'spa',  t:'Couple spa package',    d:'90-min traditional Malay massage',        p:340, on:false},
    {id:'wifi', t:'Pocket WiFi',           d:'Unlimited 4G across Malaysia, 4 days',    p:35,  on:false},
  ];
  return (
    <Section title="Optional add-ons" subtitle="Charged with the trip. You can remove these up to 48 hours before departure.">
      <div style={{display:'flex', flexDirection:'column', gap:10}}>
        {addons.map(a => (
          <label key={a.id} style={{
            display:'grid', gridTemplateColumns:'auto 1fr auto', gap:16, alignItems:'center',
            padding:'14px 16px', border:'1px solid ' + (a.on ? 'var(--blue-500)':'var(--line)'),
            borderRadius:12, cursor:'pointer',
            background: a.on ? 'var(--blue-50)' : '#fff',
          }}>
            <input type="checkbox" defaultChecked={a.on} style={{width:18, height:18, accentColor:'var(--blue-500)'}}/>
            <div>
              <div style={{fontSize:14, fontWeight:600, color:'var(--ink-900)'}}>{a.t}</div>
              <div style={{fontSize:12.5, color:'var(--ink-500)', marginTop:2}}>{a.d}</div>
            </div>
            <div className="mono" style={{fontSize:14, color:'var(--navy-800)', fontWeight:500}}>+ RM {a.p}</div>
          </label>
        ))}
      </div>
    </Section>
  );
}

function StepPayment({form, setForm, total, disc}){
  const u = (k,v)=> setForm({...form, [k]:v});
  const methods = [
    {id:'fpx',     l:'FPX online banking', s:'All Malaysian banks'},
    {id:'card',    l:'Credit / debit card', s:'Visa · Mastercard'},
    {id:'grab',    l:'GrabPay',            s:'Pay with your e-wallet'},
    {id:'tng',     l:"Touch 'n Go eWallet", s:'TnG e-wallet'},
    {id:'atome',   l:'Atome',              s:'Split into 3 · 0% interest'},
  ];
  return (
    <div style={{display:'flex', flexDirection:'column', gap:22}}>
      <Section title="Payment method" subtitle="All transactions secured via iPay88 · 256-bit TLS.">
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:10, marginBottom:18}}>
          {methods.map(m => (
            <label key={m.id} style={{
              display:'flex', flexDirection:'column', gap:6,
              padding:'14px 14px', borderRadius:12, cursor:'pointer',
              background: form.pay===m.id ? 'var(--blue-50)' : '#fff',
              border:'1px solid ' + (form.pay===m.id ? 'var(--blue-500)' : 'var(--line)'),
            }}>
              <div style={{display:'flex', alignItems:'center', gap:10}}>
                <input type="radio" name="pay" checked={form.pay===m.id} onChange={()=>u('pay',m.id)} style={{accentColor:'var(--blue-500)'}}/>
                <Icon name="card" size={17} color="var(--navy-700)"/>
                <span style={{fontSize:13.5, fontWeight:600}}>{m.l}</span>
              </div>
              <div style={{fontSize:11.5, color:'var(--ink-400)', marginLeft:28}}>{m.s}</div>
            </label>
          ))}
        </div>

        {form.pay==='fpx' && (
          <div>
            <div className="kicker" style={{marginBottom:8}}>SELECT BANK</div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(140px,1fr))', gap:8}}>
              {['Maybank2u','CIMB Clicks','Public Bank','RHB Now','Bank Islam','Hong Leong','Ambank','Bank Rakyat'].map(b=>(
                <button key={b} onClick={()=>u('bank',b)} style={{
                  padding:'12px 14px', borderRadius:10, cursor:'pointer',
                  background: form.bank===b ? 'var(--navy-800)' : '#fff',
                  color: form.bank===b ? '#fff' : 'var(--ink-700)',
                  border:'1px solid ' + (form.bank===b ? 'var(--navy-800)' : 'var(--line)'),
                  fontSize:12.5, fontFamily:'inherit', fontWeight:500, textAlign:'left',
                }}>{b}</button>
              ))}
            </div>
          </div>
        )}

        {form.pay==='card' && (
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
            <Field2 label="CARD NUMBER" value="4218 •••• •••• ••••" onChange={()=>{}}/>
            <Field2 label="NAME ON CARD" value={form.name} onChange={e=>u('name', e.target.value)}/>
            <Field2 label="EXPIRY" value="08 / 28" onChange={()=>{}}/>
            <Field2 label="CVV" value="•••" onChange={()=>{}}/>
          </div>
        )}
      </Section>

      <Section title="Promo code">
        <div style={{display:'flex', gap:10}}>
          <div style={{flex:1, padding:'12px 14px', background:'var(--coral-soft)', border:'1px solid var(--coral)', borderRadius:10, display:'flex', alignItems:'center', gap:10}}>
            <Icon name="tag" size={16} color="var(--coral)"/>
            <span style={{fontFamily:'var(--f-mono)', fontSize:13, fontWeight:600, color:'var(--coral)', letterSpacing:'.1em'}}>MERDEKA32</span>
            <span style={{fontSize:12, color:'var(--ink-500)', marginLeft:'auto'}}>Saved RM {disc.toLocaleString()}</span>
            <button style={{background:'none', border:0, color:'var(--coral)', fontSize:12, cursor:'pointer'}}>Remove</button>
          </div>
        </div>
      </Section>

      <label style={{display:'flex', alignItems:'flex-start', gap:10, padding:'14px 18px', background:'#fff', border:'1px solid var(--line)', borderRadius:12}}>
        <input type="checkbox" defaultChecked style={{accentColor:'var(--blue-500)', marginTop:3}}/>
        <span style={{fontSize:13, color:'var(--ink-500)', lineHeight:1.5}}>
          I agree to Viking Tour &amp; Travel's <a href="#" style={{color:'var(--blue-600)', fontWeight:500}}>Terms &amp; Conditions</a>,
          <a href="#" style={{color:'var(--blue-600)', fontWeight:500}}> Privacy Policy</a>, and the package-specific cancellation rules.
          I confirm all travellers' details are accurate.
        </span>
      </label>
    </div>
  );
}

function StepConfirm({form, pkg, total}){
  return (
    <div style={{padding:'40px 40px', background:'#fff', border:'1px solid var(--line)', borderRadius:20, textAlign:'center'}}>
      <div style={{width:72, height:72, borderRadius:99, background:'var(--blue-50)', color:'var(--jade)', margin:'0 auto', display:'grid', placeItems:'center'}}>
        <Icon name="check" size={32}/>
      </div>
      <h2 style={{fontFamily:'var(--f-display)', fontSize:42, lineHeight:1.1, margin:'22px 0 8px', color:'var(--navy-900)'}}>
        Reservation confirmed
      </h2>
      <p style={{color:'var(--ink-500)', fontSize:15, maxWidth:480, margin:'0 auto'}}>
        We've emailed the e-invoice and itinerary to <strong style={{color:'var(--ink-900)'}}>{form.email}</strong>. You'll also receive a WhatsApp from your guide 48 hours before departure.
      </p>
      <div style={{display:'inline-grid', gridTemplateColumns:'auto auto', gap:'12px 36px', marginTop:30, padding:'24px 36px', background:'var(--paper)', borderRadius:14, textAlign:'left'}}>
        <div>
          <div className="kicker">BOOKING REF</div>
          <div className="mono" style={{fontSize:16, fontWeight:600, color:'var(--navy-900)', marginTop:4, letterSpacing:'.1em'}}>VK-2026-04218</div>
        </div>
        <div>
          <div className="kicker">PACKAGE</div>
          <div style={{fontSize:14, fontWeight:500, marginTop:4}}>{pkg.name}</div>
        </div>
        <div>
          <div className="kicker">DEPART</div>
          <div style={{fontSize:14, fontWeight:500, marginTop:4}}>{form.date} · 06:50 KL</div>
        </div>
        <div>
          <div className="kicker">TOTAL PAID</div>
          <div className="mono" style={{fontSize:14, fontWeight:600, color:'var(--navy-900)', marginTop:4}}>RM {total.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ReservationPage });
