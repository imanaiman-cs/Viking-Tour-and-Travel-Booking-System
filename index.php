<?php
/**
 * Viking Tour & Travel — Design Canvas
 * Main entry point: shows all 28 artboards across 5 sections.
 * Serves the Figma-style pan/zoom canvas with live iframe previews.
 */
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Viking Tour &amp; Travel — Design System</title>
<link rel="stylesheet" href="shared.css"/>
<style>
  html, body { height: 100%; overflow: hidden; background:#f0eee9; font-family: var(--f-sans); }
  iframe { border: 0; display: block; width: 100%; height: 100%; background: var(--paper); }
  .ab-frame { width: 100%; height: 100%; }
</style>
</head>
<body>
<div id="root"></div>

<?php include 'includes/react-cdn.php'; ?>

<script type="text/babel" src="design-canvas.jsx"></script>
<script type="text/babel" src="brand.jsx"></script>
<script type="text/babel" src="customer/shell.jsx"></script>
<script type="text/babel" src="brand-sheet.jsx"></script>

<script type="text/babel">
function Frame({src}){
  return <iframe className="ab-frame" src={src} loading="lazy" scrolling="yes"/>;
}

function App(){
  const W = 1440, H = 900;
  const WM = 420; // mobile width
  const HM = 880;
  return (
    <DesignCanvas>

      <DCSection id="brand" title="Brand & Design System" subtitle="Foundations — palette, type scale, components, iconography">
        <DCArtboard id="system" label="01 · Design System Sheet" width={1280} height={1900}>
          <BrandSheet/>
        </DCArtboard>
      </DCSection>

      <DCSection id="customer" title="Customer Site" subtitle="Public-facing — booking flow, packages, content pages, account">
        <DCArtboard id="home"          label="02 · Home"                width={W} height={H}><Frame src="customer.php#/"/></DCArtboard>
        <DCArtboard id="packages"      label="03 · Packages List"       width={W} height={H}><Frame src="customer.php#/packages"/></DCArtboard>
        <DCArtboard id="detail"        label="04 · Package Detail"      width={W} height={H}><Frame src="customer.php#/package/lk-001"/></DCArtboard>
        <DCArtboard id="reservation"   label="05 · Reservation Flow"    width={W} height={H}><Frame src="customer.php#/reservation/lk-001"/></DCArtboard>
        <DCArtboard id="myrsv"         label="06 · My Reservations"     width={W} height={H}><Frame src="customer.php#/reservations"/></DCArtboard>
        <DCArtboard id="promotions"    label="07 · Promotions"          width={W} height={H}><Frame src="customer.php#/promotions"/></DCArtboard>
        <DCArtboard id="cust-settings" label="08 · Customer Settings"   width={W} height={H}><Frame src="customer.php#/settings"/></DCArtboard>
        <DCArtboard id="about"         label="09 · About Us"            width={W} height={H}><Frame src="customer.php#/about"/></DCArtboard>
        <DCArtboard id="contact"       label="10 · Contact Us"          width={W} height={H}><Frame src="customer.php#/contact"/></DCArtboard>
      </DCSection>

      <DCSection id="admin" title="Admin Panel" subtitle="Internal operations — dashboard, bookings, packages, customers, promotions, settings">
        <DCArtboard id="dashboard"     label="11 · Admin Dashboard"     width={W} height={H}><Frame src="admin.php#/dashboard"/></DCArtboard>
        <DCArtboard id="rsv-admin"     label="12 · Reservations Mgmt"   width={W} height={H}><Frame src="admin.php#/reservations"/></DCArtboard>
        <DCArtboard id="pkg-admin"     label="13 · Package Management"  width={W} height={H}><Frame src="admin.php#/packages"/></DCArtboard>
        <DCArtboard id="cust-admin"    label="14 · Customers"           width={W} height={H}><Frame src="admin.php#/customers"/></DCArtboard>
        <DCArtboard id="promo-admin"   label="15 · Manage Promotions"   width={W} height={H}><Frame src="admin.php#/promotions"/></DCArtboard>
        <DCArtboard id="notif-admin"   label="16 · Notifications"       width={W} height={H}><Frame src="admin.php#/notifications"/></DCArtboard>
        <DCArtboard id="settings-admin" label="17 · System Settings"    width={W} height={H}><Frame src="admin.php#/settings"/></DCArtboard>
      </DCSection>

      <DCSection id="auth" title="Authentication" subtitle="Login, register, password recovery, profile settings">
        <DCArtboard id="login"         label="18 · Customer Sign-in"    width={W} height={H}><Frame src="auth.php#login"/></DCArtboard>
        <DCArtboard id="admin-login"   label="19 · Admin / Staff Sign-in" width={W} height={H}><Frame src="auth.php#admin"/></DCArtboard>
        <DCArtboard id="register"      label="20 · Create Account"      width={W} height={H}><Frame src="auth.php#register"/></DCArtboard>
        <DCArtboard id="forgot"        label="21 · Forgot Password"     width={W} height={H}><Frame src="auth.php#forgot"/></DCArtboard>
        <DCArtboard id="profile"       label="22 · Profile Settings"    width={W} height={H}><Frame src="auth.php#profile"/></DCArtboard>
      </DCSection>

      <DCSection id="mobile" title="Mobile Responsive Views" subtitle="Same pages, 420px viewport — header collapses to hamburger drawer">
        <DCArtboard id="m-home"        label="23 · Mobile · Home"       width={WM} height={HM}><Frame src="customer.php#/"/></DCArtboard>
        <DCArtboard id="m-packages"    label="24 · Mobile · Packages"   width={WM} height={HM}><Frame src="customer.php#/packages"/></DCArtboard>
        <DCArtboard id="m-detail"      label="25 · Mobile · Detail"     width={WM} height={HM}><Frame src="customer.php#/package/lk-001"/></DCArtboard>
        <DCArtboard id="m-rsv"         label="26 · Mobile · Reservation" width={WM} height={HM}><Frame src="customer.php#/reservation/lk-001"/></DCArtboard>
        <DCArtboard id="m-promo"       label="27 · Mobile · Promotions" width={WM} height={HM}><Frame src="customer.php#/promotions"/></DCArtboard>
        <DCArtboard id="m-login"       label="28 · Mobile · Sign in"    width={WM} height={HM}><Frame src="auth.php#login"/></DCArtboard>
      </DCSection>

      <DCPostIt top={140} left={60} rotate={-3}>
        <strong>Project:</strong> Viking Tour &amp; Travel — Malaysian booking platform.<br/><br/>
        Drag artboards to reorder · double-click labels to rename · click any artboard's expand icon for fullscreen focus mode.
      </DCPostIt>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
</script>
</body>
</html>
