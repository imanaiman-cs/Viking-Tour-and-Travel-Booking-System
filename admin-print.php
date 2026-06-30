<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Viking Tour · Admin — Print</title>
<link rel="stylesheet" href="shared.css"/>
<style>
  body { background: #fff; }
  input:focus, textarea:focus, select:focus { outline: 0 !important; }

  /* Print-friendly overrides — applied screen + print so the on-screen preview
     matches the PDF exactly. */
  .print-page {
    background: var(--paper);
    width: 297mm;            /* A4 landscape width */
    max-width: 100%;
    margin: 0 auto;
    box-shadow: 0 8px 32px rgba(11,42,74,.08);
    break-after: page;
    page-break-after: always;
    overflow: hidden;
    border-radius: 0;
  }
  .print-page:last-child { break-after: auto; page-break-after: auto; }

  /* Each admin view is wrapped — neutralise its sticky chrome */
  .print-page .admin-shell,
  .print-page > div[data-screen-label] {
    min-height: 0 !important;
    display: grid !important;
    grid-template-columns: 248px 1fr !important;
  }
  .print-page header { position: static !important; }
  .print-page aside {
    position: static !important;
    height: auto !important;
    min-height: 100%;
  }
  /* Drop sticky panels inside any admin page (right-side detail sticky etc.) */
  .print-page [style*="position:sticky"],
  .print-page [style*="position: sticky"] { position: static !important; }
  /* Buttons are non-interactive in print — keep visuals only */
  .print-page button { cursor: default !important; }

  /* Sheet header strip above each page */
  .sheet-hdr {
    display: flex; align-items: baseline; justify-content: space-between;
    padding: 14px 28px;
    background: var(--navy-900); color: #fff;
    font-family: var(--f-sans);
  }
  .sheet-hdr .l { font-family: var(--f-display); font-size: 18px; letter-spacing: -.01em; }
  .sheet-hdr .l em { font-style: italic; color: #7cb8ee; }
  .sheet-hdr .r { font-family: var(--f-mono); font-size: 10.5px; letter-spacing: .12em; color: rgba(255,255,255,.65); }

  /* Cover sheet */
  .cover {
    height: 210mm;
    background:
      radial-gradient(800px 600px at 80% 20%, rgba(124,184,238,.18), transparent),
      radial-gradient(900px 500px at 20% 110%, rgba(30,136,229,.18), transparent),
      linear-gradient(160deg, var(--navy-900) 0%, var(--navy-700) 55%, var(--blue-600) 100%);
    color: #fff;
    display: grid; grid-template-rows: auto 1fr auto;
    padding: 40px 56px;
  }
  .cover .top { display:flex; justify-content:space-between; align-items:center; }
  .cover .top .mono { font-family: var(--f-mono); font-size: 11px; letter-spacing: .18em; color: rgba(255,255,255,.65); }
  .cover h1 {
    font-family: var(--f-display); font-weight: 400;
    font-size: clamp(56px, 7vw, 110px); line-height: .98; letter-spacing: -.02em;
    margin: 0; max-width: 12ch;
  }
  .cover h1 em { font-style: italic; color: #7cb8ee; }
  .cover .lede {
    font-size: 16px; line-height: 1.5; color: rgba(255,255,255,.7);
    max-width: 480px; margin: 22px 0 0;
  }
  .cover .toc {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px;
    margin-top: 24px;
  }
  .cover .toc .item {
    padding: 14px 16px;
    background: rgba(255,255,255,.06);
    border: 1px solid rgba(255,255,255,.10);
    border-radius: 12px;
  }
  .cover .toc .item .n {
    font-family: var(--f-mono); font-size: 10.5px; letter-spacing: .14em;
    color: rgba(255,255,255,.55); margin-bottom: 6px;
  }
  .cover .toc .item .t { font-family: var(--f-display); font-size: 20px; line-height: 1.15; }
  .cover .bot {
    display:flex; justify-content:space-between; align-items:flex-end;
    font-family: var(--f-mono); font-size: 11px; letter-spacing: .14em;
    color: rgba(255,255,255,.55);
  }

  /* Print rules */
  @page {
    size: A4 landscape;
    margin: 0;
  }
  @media print {
    html, body { background: #fff; margin: 0; padding: 0; }
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact; }
    .print-page { box-shadow: none; margin: 0; width: 100%; }
    .print-page > * { break-inside: auto; }
    .cover { break-after: page; page-break-after: always; }
    .no-print { display: none !important; }
  }

  /* On-screen — show pages as sheets with breathing room */
  body { padding: 24px 0; }
  .print-page + .print-page { margin-top: 24px; }
</style>
</head>
<body>
<div id="root"></div>

<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>
<script src="destination-images.js"></script>

<script type="text/babel" src="brand.jsx"></script>
<script type="text/babel" src="customer/shell.jsx"></script>
<script type="text/babel" src="customer/reservation.jsx"></script>
<script type="text/babel" src="admin/shell.jsx"></script>
<script type="text/babel" src="admin/dashboard.jsx"></script>
<script type="text/babel" src="admin/pages.jsx"></script>
<script type="text/babel" src="admin/customers.jsx"></script>
<script type="text/babel" src="admin/promotions-settings.jsx"></script>

<script type="text/babel">
const PAGES = [
  {n:'01', t:'Dashboard',        view: <AdminDashboard/>},
  {n:'02', t:'Reservations',     view: <AdminReservations/>},
  {n:'03', t:'Packages',         view: <AdminPackages/>},
  {n:'04', t:'Customers',        view: <AdminCustomers/>},
  {n:'05', t:'Promotions',       view: <AdminPromotions/>},
  {n:'06', t:'Notifications',    view: <AdminNotifications/>},
  {n:'07', t:'Settings',         view: <AdminSettings/>},
];

function Cover(){
  return (
    <div className="print-page">
      <div className="cover">
        <div className="top">
          <Wordmark onDark/>
          <div className="mono">VIKING / OPS / 2026.05</div>
        </div>
        <div>
          <div className="mono" style={{fontFamily:'var(--f-mono)', fontSize:11, letterSpacing:'.18em', color:'rgba(255,255,255,.65)', marginBottom:18}}>
            ADMIN PANEL DOCUMENTATION
          </div>
          <h1>The <em>operations</em> console, on paper.</h1>
          <p className="lede">
            Seven internal surfaces — dashboard, bookings, packages, customers,
            promotions, notifications and system settings — for the team running
            Viking Tour &amp; Travel out of Banda Hilir, Melaka.
          </p>
          <div className="toc">
            {PAGES.map(p => (
              <div key={p.n} className="item">
                <div className="n">{p.n}</div>
                <div className="t">{p.t}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bot">
          <span>VIKING TOUR &amp; TRAVEL SDN. BHD. · MOTAC KPK/LN 8821</span>
          <span>NO. 2A, JLN TEMENGGONG · BANDA HILIR · 75000 MELAKA</span>
        </div>
      </div>
    </div>
  );
}

function PrintPage({n, t, children}){
  return (
    <div className="print-page">
      <div className="sheet-hdr">
        <div className="l">Viking Tour <em>&amp; Travel</em></div>
        <div className="r">ADMIN · {n} · {t.toUpperCase()}</div>
      </div>
      <div className="admin-shell">{children}</div>
    </div>
  );
}

function App(){
  return (
    <>
      <Cover/>
      {PAGES.map(p => <PrintPage key={p.n} n={p.n} t={p.t}>{p.view}</PrintPage>)}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);

// Auto-print once fonts are loaded and Babel-transformed JSX has had time to
// mount + the runtime destination-image fetcher has had a moment to settle.
(async () => {
  try { await document.fonts.ready; } catch(e){}
  await new Promise(r => setTimeout(r, 2400));
  window.print();
})();
</script>
</body>
</html>
