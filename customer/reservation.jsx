// Customer — Reservation / Booking flow (multi-step, live API)

function ReservationPage({id}){
  const [pkg, setPkg]   = React.useState(null);
  const [step, setStep] = React.useState(1);
  const [submitting, setSubmitting] = React.useState(false);
  const [bookingRef, setBookingRef] = React.useState('');
  const [error, setError] = React.useState('');

  const user = window.__vikingUser || {};
  const nameParts = (user.name||'').split(' ');

  const [form, setForm] = React.useState({
    firstName: nameParts[0] || '',
    lastName:  nameParts.slice(1).join(' ') || '',
    ic:        user.ic   || '',
    phone:     user.phone || '',
    email:     user.email || '',
    addr:'', city:'', poskod:'',
    pax:1,
    date: '',
    special:'',
    pay:'fpx', bank:'Maybank2u',
    promoCode:'', promoSaved:0,
  });

  React.useEffect(()=>{
    fetch(`/api/packages.php?id=${encodeURIComponent(id)}`)
      .then(r=>r.json())
      .then(data=>{
        if (data && data.id) {
          setPkg({
            ...data,
            loc:  data.location,
            img:  data.img_class,
            was:  data.original_price,
            days: `${data.days} days ${data.nights} nights`,
          });
        }
      })
      .catch(()=>{});
  },[id]);

  const steps = ['Traveller details','Add-ons','Payment','Confirm'];
  const subtotal = pkg ? pkg.price * form.pax : 0;
  const tax      = Math.round(subtotal * 0.06);
  const disc     = form.promoSaved;
  const total    = subtotal + tax - disc;

  function genRef(){
    const y = new Date().getFullYear();
    const n = String(Math.floor(10000 + Math.random()*90000));
    return `VK-${y}-${n}`;
  }

  async function handleConfirmPay(){
    if (!pkg) return;
    setSubmitting(true);
    setError('');
    const ref = genRef();
    const travelDate = form.date || new Date().toISOString().slice(0,10);
    const payload = {
      ref,
      user_id:          user.id || null,
      package_id:       pkg.id,
      customer_name:    `${form.firstName} ${form.lastName}`.trim(),
      customer_ic:      form.ic,
      customer_phone:   form.phone,
      pax:              Number(form.pax),
      travel_date:      travelDate,
      amount:           total,
      status:           'Confirmed',
      payment_status:   'Paid',
      payment_channel:  form.pay,
      special_requests: form.special,
    };
    try {
      const res = await fetch('/api/reservations.php', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success || data.id) {
        setBookingRef(ref);
        setStep(4);
      } else {
        setError(data.error || 'Booking failed. Please try again.');
      }
    } catch(e){
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (!pkg) return (
    <main style={{maxWidth:1320, margin:'80px auto', padding:'0 32px', textAlign:'center', color:'var(--ink-400)'}}>
      Loading package…
    </main>
  );

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
          {step===4 && <StepConfirm form={form} pkg={pkg} total={total} bookingRef={bookingRef}/>}

          {error && (
            <div style={{marginTop:16, padding:'12px 16px', background:'var(--coral-soft)', border:'1px solid var(--coral)', borderRadius:10, color:'var(--coral)', fontSize:13}}>
              {error}
            </div>
          )}

          <div style={{display:'flex', justifyContent:'space-between', marginTop:36}}>
            {step < 4 && (
              <button style={btnGhost} onClick={()=> step>1 ? setStep(step-1) : nav('#/package/'+id)}>
                <Icon name="arrow-l" size={14}/> {step>1 ? 'Previous' : 'Back to package'}
              </button>
            )}
            {step < 3 && (
              <button style={btnPrimary} onClick={()=>setStep(step+1)}>
                Continue <Icon name="arrow-r" size={14}/>
              </button>
            )}
            {step===3 && (
              <button style={{...btnAccent, opacity: submitting ? .6 : 1}} onClick={handleConfirmPay} disabled={submitting}>
                {submitting ? 'Processing…' : 'Confirm & pay'} <Icon name="arrow-r" size={14}/>
              </button>
            )}
            {step===4 && (
              <button style={btnPrimary} onClick={()=>nav('#/reservations')}>View my reservations</button>
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
                  <div style={{fontWeight:500, marginTop:2}}>{form.date ? new Date(form.date).toLocaleDateString('en-MY',{day:'numeric',month:'short',year:'numeric'}) : '—'}</div>
                </div>
                <div style={{padding:'10px 12px', background:'var(--paper)', borderRadius:10}}>
                  <div className="kicker">PAX</div>
                  <div style={{fontWeight:500, marginTop:2}}>{form.pax} adult{form.pax!==1?'s':''}</div>
                </div>
              </div>

              <div className="divider" style={{margin:'2px 0 14px'}}/>
              <Row l={`RM ${pkg.price.toLocaleString()} × ${form.pax}`} v={`RM ${subtotal.toLocaleString()}`}/>
              <Row l="SST (6%)" v={`RM ${tax.toLocaleString()}`}/>
              {disc > 0 && <Row l={form.promoCode} v={`− RM ${disc.toLocaleString()}`} color="var(--coral)"/>}
              <div className="divider" style={{margin:'10px 0 12px'}}/>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                <span style={{fontSize:13.5, fontWeight:500}}>Total</span>
                <span style={{fontFamily:'var(--f-display)', fontSize:28, color:'var(--navy-900)'}}>RM {total.toLocaleString()}</span>
              </div>
              <div style={{padding:'10px 12px', background:'var(--blue-50)', borderRadius:10, fontSize:11.5, color:'var(--navy-700)', marginTop:14, display:'flex', gap:8}}>
                <Icon name="check" size={14} color="var(--jade)"/>
                Free cancellation up to 7 days before departure.
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
          <Field2 label="FIRST NAME" value={form.firstName} onChange={e=>u('firstName',e.target.value)} placeholder="e.g. Ahmad"/>
          <Field2 label="LAST NAME"  value={form.lastName}  onChange={e=>u('lastName',e.target.value)}  placeholder="e.g. bin Abdullah"/>
          <Field2 label="IC NUMBER"  value={form.ic}        onChange={e=>u('ic',e.target.value)}         placeholder="e.g. 990408-14-5238"/>
          <Field2 label="PHONE"      value={form.phone}     onChange={e=>u('phone',e.target.value)}      placeholder="e.g. +60 12-345 6789"/>
          <Field2 label="EMAIL"      value={form.email}     onChange={e=>u('email',e.target.value)}      type="email" placeholder="your@email.com"/>
          <label style={{display:'block'}}>
            <div className="kicker" style={{marginBottom:7}}>NUMBER OF PAX</div>
            <div style={{display:'flex', alignItems:'center', gap:8, padding:'12px 14px', background:'#fff', border:'1px solid var(--line)', borderRadius:10}}>
              <button onClick={()=>u('pax',Math.max(1,form.pax-1))} style={{width:28,height:28,borderRadius:99,border:'1px solid var(--line)',background:'var(--paper)',cursor:'pointer',fontFamily:'inherit',fontSize:16}}>−</button>
              <span style={{flex:1, textAlign:'center', fontSize:16, fontWeight:600, color:'var(--navy-800)'}}>{form.pax}</span>
              <button onClick={()=>u('pax',Math.min(20,form.pax+1))} style={{width:28,height:28,borderRadius:99,border:'1px solid var(--line)',background:'var(--paper)',cursor:'pointer',fontFamily:'inherit',fontSize:16}}>+</button>
            </div>
          </label>
        </div>
      </Section>

      <Section title="Travel date" subtitle="Select your preferred departure date.">
        <input type="date" value={form.date} onChange={e=>u('date',e.target.value)}
          min={new Date().toISOString().slice(0,10)}
          style={{padding:'13px 14px', width:'100%', border:'1px solid var(--line)', borderRadius:10, background:'#fff', fontFamily:'inherit', fontSize:14, color:'var(--ink-900)', boxSizing:'border-box'}}/>
      </Section>

      <Section title="Address (for billing)" subtitle="We'll send your e-invoice here.">
        <div style={{display:'grid', gridTemplateColumns:'1fr', gap:14}}>
          <Field2 label="STREET ADDRESS" value={form.addr}   onChange={e=>u('addr',e.target.value)}   placeholder="e.g. A-12-3, Jalan Pjs 8/5"/>
          <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:14}}>
            <Field2 label="CITY"   value={form.city}   onChange={e=>u('city',e.target.value)}   placeholder="e.g. Petaling Jaya"/>
            <Field2 label="POSKOD" value={form.poskod} onChange={e=>u('poskod',e.target.value)} placeholder="46150"/>
            <label style={{display:'block'}}>
              <div className="kicker" style={{marginBottom:7}}>STATE</div>
              <select style={{padding:'13px 14px', width:'100%', border:'1px solid var(--line)', borderRadius:10, background:'#fff', fontFamily:'inherit', fontSize:14}}>
                <option>Selangor</option><option>Kuala Lumpur</option><option>Pulau Pinang</option><option>Johor</option><option>Perak</option><option>Kedah</option><option>Kelantan</option><option>Sabah</option><option>Sarawak</option>
              </select>
            </label>
          </div>
        </div>
      </Section>

      <Section title="Special requests" subtitle="Dietary, accessibility, room preference — anything we should know.">
        <textarea value={form.special} onChange={e=>setForm({...form, special:e.target.value})}
          placeholder="e.g. No seafood, please. Prefer ground-floor room. Halal meals throughout."
          style={{
            width:'100%', minHeight:90, padding:'14px 16px',
            background:'#fff', border:'1px solid var(--line)', borderRadius:12,
            fontFamily:'inherit', fontSize:14, color:'var(--ink-900)', resize:'vertical', boxSizing:'border-box',
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
  const [addons, setAddons] = React.useState([
    {id:'ins',  t:'Travel insurance',         d:'AmAssurance domestic plan · medical + trip cancellation', p:48,  on:true},
    {id:'tx',   t:'Premium airport transfer',  d:'Toyota Vellfire · meet & greet at LGK',                 p:120, on:false},
    {id:'cam',  t:'Drone photography hour',    d:'Personal drone shoot at sunset, Day 2',                  p:280, on:true},
    {id:'spa',  t:'Couple spa package',        d:'90-min traditional Malay massage',                       p:340, on:false},
    {id:'wifi', t:'Pocket WiFi',               d:'Unlimited 4G across Malaysia, 4 days',                   p:35,  on:false},
  ]);
  return (
    <Section title="Optional add-ons" subtitle="Charged with the trip. You can remove these up to 48 hours before departure.">
      <div style={{display:'flex', flexDirection:'column', gap:10}}>
        {addons.map((a,i) => (
          <label key={a.id} onClick={()=>{const next=[...addons]; next[i]={...a, on:!a.on}; setAddons(next);}} style={{
            display:'grid', gridTemplateColumns:'auto 1fr auto', gap:16, alignItems:'center',
            padding:'14px 16px', border:'1px solid ' + (a.on ? 'var(--blue-500)':'var(--line)'),
            borderRadius:12, cursor:'pointer',
            background: a.on ? 'var(--blue-50)' : '#fff',
          }}>
            <input type="checkbox" checked={a.on} readOnly style={{width:18, height:18, accentColor:'var(--blue-500)'}}/>
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
  const [promoInput, setPromoInput] = React.useState(form.promoCode || '');
  const [promoErr, setPromoErr]     = React.useState('');
  const [promoLoading, setPromoLoading] = React.useState(false);

  async function applyPromo(){
    if (!promoInput.trim()) return;
    setPromoLoading(true); setPromoErr('');
    try {
      const res = await fetch('/api/promotions.php?code=' + encodeURIComponent(promoInput.trim()));
      const data = await res.json();
      if (data && data.status==='Active') {
        const saved = data.type==='percentage'
          ? Math.round(total * data.value / 100)
          : Math.min(Number(data.value), total);
        setForm({...form, promoCode: promoInput.trim(), promoSaved: saved});
        setPromoErr('');
      } else {
        setPromoErr('Invalid or expired promo code.');
      }
    } catch(e){
      setPromoErr('Could not verify code. Try again.');
    } finally {
      setPromoLoading(false);
    }
  }

  const methods = [
    {id:'fpx',   l:'FPX online banking',   s:'All Malaysian banks'},
    {id:'card',  l:'Credit / debit card',  s:'Visa · Mastercard'},
    {id:'grab',  l:'GrabPay',              s:'Pay with your e-wallet'},
    {id:'tng',   l:"Touch 'n Go eWallet",  s:'TnG e-wallet'},
    {id:'atome', l:'Atome',                s:'Split into 3 · 0% interest'},
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
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginTop:14}}>
            <Field2 label="CARD NUMBER" value="" onChange={()=>{}} placeholder="1234 5678 9012 3456"/>
            <Field2 label="NAME ON CARD" value="" onChange={()=>{}} placeholder="As on card"/>
            <Field2 label="EXPIRY" value="" onChange={()=>{}} placeholder="MM / YY"/>
            <Field2 label="CVV" value="" onChange={()=>{}} type="password" placeholder="•••"/>
          </div>
        )}
      </Section>

      <Section title="Promo code">
        {form.promoCode ? (
          <div style={{display:'flex', gap:10}}>
            <div style={{flex:1, padding:'12px 14px', background:'var(--coral-soft)', border:'1px solid var(--coral)', borderRadius:10, display:'flex', alignItems:'center', gap:10}}>
              <Icon name="tag" size={16} color="var(--coral)"/>
              <span style={{fontFamily:'var(--f-mono)', fontSize:13, fontWeight:600, color:'var(--coral)', letterSpacing:'.1em'}}>{form.promoCode}</span>
              <span style={{fontSize:12, color:'var(--ink-500)', marginLeft:'auto'}}>Saved RM {form.promoSaved.toLocaleString()}</span>
              <button onClick={()=>setForm({...form, promoCode:'', promoSaved:0})} style={{background:'none', border:0, color:'var(--coral)', fontSize:12, cursor:'pointer'}}>Remove</button>
            </div>
          </div>
        ) : (
          <div style={{display:'flex', gap:10}}>
            <div style={{flex:1, padding:'12px 14px', background:'#fff', border:'1px solid var(--line)', borderRadius:10, display:'flex', alignItems:'center', gap:10}}>
              <Icon name="tag" size={16} color="var(--ink-400)"/>
              <input value={promoInput} onChange={e=>setPromoInput(e.target.value)}
                placeholder="Enter promo code"
                style={{flex:1, background:'transparent', border:0, outline:0, fontFamily:'var(--f-mono)', fontSize:13, color:'var(--ink-900)', letterSpacing:'.08em'}}/>
            </div>
            <button style={{...btnPrimary, padding:'12px 20px'}} onClick={applyPromo} disabled={promoLoading}>
              {promoLoading ? '…' : 'Apply'}
            </button>
          </div>
        )}
        {promoErr && <div style={{marginTop:8, fontSize:12, color:'var(--coral)'}}>{promoErr}</div>}
      </Section>

      <label style={{display:'flex', alignItems:'flex-start', gap:10, padding:'14px 18px', background:'#fff', border:'1px solid var(--line)', borderRadius:12}}>
        <input type="checkbox" defaultChecked style={{accentColor:'var(--blue-500)', marginTop:3}}/>
        <span style={{fontSize:13, color:'var(--ink-500)', lineHeight:1.5}}>
          I agree to Viking Tour &amp; Travel's <a href="#" style={{color:'var(--blue-600)', fontWeight:500}}>Terms &amp; Conditions</a>,{' '}
          <a href="#" style={{color:'var(--blue-600)', fontWeight:500}}>Privacy Policy</a>, and the package-specific cancellation rules.
          I confirm all travellers' details are accurate.
        </span>
      </label>
    </div>
  );
}

function StepConfirm({form, pkg, total, bookingRef}){
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
          <div className="mono" style={{fontSize:16, fontWeight:600, color:'var(--navy-900)', marginTop:4, letterSpacing:'.1em'}}>{bookingRef}</div>
        </div>
        <div>
          <div className="kicker">PACKAGE</div>
          <div style={{fontSize:14, fontWeight:500, marginTop:4}}>{pkg.name}</div>
        </div>
        <div>
          <div className="kicker">DEPART</div>
          <div style={{fontSize:14, fontWeight:500, marginTop:4}}>{form.date ? new Date(form.date).toLocaleDateString('en-MY',{day:'numeric',month:'short',year:'numeric'}) : '—'}</div>
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
