<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Viking Tour · Admin</title>
<link rel="stylesheet" href="shared.css"/>
<style>
  body { background: var(--paper); }
  @media (max-width: 1100px) {
    aside[data-sidebar="true"]{display:none}
  }
  input:focus, textarea:focus, select:focus { outline: 2px solid var(--blue-500); outline-offset: 1px; border-color: var(--blue-500) !important; }
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
function App(){
  const h = window.location.hash || '#/dashboard';
  const seg = h.replace(/^#\//,'').split('/').filter(Boolean)[0] || 'dashboard';
  const [, force] = React.useReducer(x=>x+1, 0);
  React.useEffect(()=>{
    const f = ()=> force();
    window.addEventListener('hashchange', f);
    return ()=> window.removeEventListener('hashchange', f);
  },[]);

  if (seg==='reservations') return <AdminReservations/>;
  if (seg==='packages')     return <AdminPackages/>;
  if (seg==='customers')    return <AdminCustomers/>;
  if (seg==='notifications')return <AdminNotifications/>;
  if (seg==='promotions')   return <AdminPromotions/>;
  if (seg==='settings')     return <AdminSettings/>;
  return <AdminDashboard/>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
</script>
</body>
</html>
