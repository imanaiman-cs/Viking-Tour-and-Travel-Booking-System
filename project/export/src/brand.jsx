// Viking Tour & Travel — shared brand bits (logo, icons)
// Loaded after React and Babel.

function VikingLogo({size=22, color='currentColor'}){
  // Stylized longship + sun — original mark, no copyrighted vectors.
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="22" cy="9" r="3.2" stroke={color} strokeWidth="1.6"/>
      <path d="M3 19c4 0 5-2 8-2s4 2 8 2 5-2 8-2" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M5 22h22l-2.5 4H7.5L5 22Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M16 6v13" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M16 7l5 2.5L16 12V7Z" fill={color}/>
    </svg>
  );
}

function Wordmark({onDark=false, compact=false}){
  const ink = onDark ? '#ffffff' : 'var(--navy-800)';
  const sub = onDark ? 'rgba(255,255,255,.65)' : 'var(--ink-400)';
  return (
    <div style={{display:'flex', alignItems:'center', gap:10}}>
      <div style={{
        width:34, height:34, borderRadius:10,
        background: onDark ? 'rgba(255,255,255,.10)' : 'var(--navy-800)',
        display:'grid', placeItems:'center',
        color: onDark ? '#fff' : '#fff',
        boxShadow: onDark ? 'none' : '0 4px 12px rgba(11,42,74,.18)',
      }}>
        <VikingLogo size={18} color="#fff"/>
      </div>
      {!compact && (
        <div style={{lineHeight:1.05}}>
          <div style={{fontFamily:'var(--f-display)', fontSize:19, color:ink, letterSpacing:'.01em'}}>
            Viking Tour <span style={{fontStyle:'italic', opacity:.75}}>&amp; Travel</span>
          </div>
          <div style={{fontFamily:'var(--f-mono)', fontSize:9.5, letterSpacing:'.22em', color:sub, textTransform:'uppercase', marginTop:1}}>
            Malaysia · Est. 2019
          </div>
        </div>
      )}
    </div>
  );
}

// Lightweight icon set — stroke-based, 20px default.
function Icon({name, size=18, stroke=1.6, color='currentColor'}){
  const p = {width:size, height:size, viewBox:'0 0 24 24', fill:'none', stroke:color, strokeWidth:stroke, strokeLinecap:'round', strokeLinejoin:'round'};
  switch(name){
    case 'search':   return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case 'bell':     return <svg {...p}><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"/><path d="M10 19a2 2 0 0 0 4 0"/></svg>;
    case 'user':     return <svg {...p}><circle cx="12" cy="8" r="3.5"/><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>;
    case 'chev':     return <svg {...p}><path d="m6 9 6 6 6-6"/></svg>;
    case 'chev-r':   return <svg {...p}><path d="m9 6 6 6-6 6"/></svg>;
    case 'menu':     return <svg {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    case 'close':    return <svg {...p}><path d="M6 6l12 12M18 6 6 18"/></svg>;
    case 'pin':      return <svg {...p}><path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
    case 'cal':      return <svg {...p}><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/></svg>;
    case 'users':    return <svg {...p}><circle cx="9" cy="9" r="3.2"/><path d="M3 19c1-3 3-5 6-5s5 2 6 5"/><path d="M16 11a3 3 0 0 0 0-6"/><path d="M21 19c-.6-2-1.8-3.5-3.5-4.3"/></svg>;
    case 'star':     return <svg {...p} fill={color}><path d="M12 3.5l2.6 5.5 5.9.6-4.4 4 1.3 5.9L12 16.8 6.6 19.5 8 13.6 3.5 9.6l5.9-.6L12 3.5Z"/></svg>;
    case 'star-o':   return <svg {...p}><path d="M12 3.5l2.6 5.5 5.9.6-4.4 4 1.3 5.9L12 16.8 6.6 19.5 8 13.6 3.5 9.6l5.9-.6L12 3.5Z"/></svg>;
    case 'arrow-r':  return <svg {...p}><path d="M5 12h14M14 6l6 6-6 6"/></svg>;
    case 'arrow-l':  return <svg {...p}><path d="M19 12H5M10 6l-6 6 6 6"/></svg>;
    case 'plane':    return <svg {...p}><path d="M2 13l8-2 4-8 2 1-2 7 6 2-1 2-6-1-3 6-2-1 1-5-7-1Z"/></svg>;
    case 'plus':     return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>;
    case 'edit':     return <svg {...p}><path d="M4 20h4l11-11-4-4L4 16v4Z"/><path d="m13 6 4 4"/></svg>;
    case 'trash':    return <svg {...p}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>;
    case 'eye':      return <svg {...p}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>;
    case 'tag':      return <svg {...p}><path d="M3 13l8-9 9 1 1 9-9 8-9-9Z"/><circle cx="14" cy="9" r="1.5"/></svg>;
    case 'check':    return <svg {...p}><path d="m5 12 5 5 9-11"/></svg>;
    case 'filter':   return <svg {...p}><path d="M3 5h18l-7 9v6l-4-2v-4L3 5Z"/></svg>;
    case 'card':     return <svg {...p}><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/></svg>;
    case 'down':     return <svg {...p}><path d="M12 5v14M6 13l6 6 6-6"/></svg>;
    case 'home':     return <svg {...p}><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9Z"/></svg>;
    case 'pkg':      return <svg {...p}><path d="M12 3 3 7v10l9 4 9-4V7l-9-4Z"/><path d="M3 7l9 4 9-4M12 11v10"/></svg>;
    case 'chart':    return <svg {...p}><path d="M4 20V8M10 20v-7M16 20v-4M22 20H2"/></svg>;
    case 'bolt':     return <svg {...p}><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/></svg>;
    case 'wifi':     return <svg {...p}><path d="M5 12.5a10 10 0 0 1 14 0M8 16a6 6 0 0 1 8 0"/><circle cx="12" cy="19.5" r="1" fill={color}/></svg>;
    case 'wave':     return <svg {...p}><path d="M2 9c2 0 3-2 5-2s3 2 5 2 3-2 5-2 3 2 5 2"/><path d="M2 15c2 0 3-2 5-2s3 2 5 2 3-2 5-2 3 2 5 2"/></svg>;
    case 'mail':     return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>;
    case 'phone':    return <svg {...p}><path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>;
    case 'logout':   return <svg {...p}><path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4"/><path d="M10 8l-4 4 4 4M6 12h11"/></svg>;
    case 'settings': return <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h0a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></svg>;
    case 'globe':    return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
    case 'fb':       return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M13 22v-8h3l.5-4H13V7.5c0-1.1.3-1.9 2-1.9h2.1V2.1A28 28 0 0 0 14.2 2C11.4 2 9.5 3.7 9.5 6.9V10H7v4h2.5v8H13Z"/></svg>;
    case 'ig':       return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill={color}/></svg>;
    case 'tw':       return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M18.2 3H21l-6.4 7.3L22 21h-6l-4.7-6.2L5.8 21H3l6.8-7.8L2 3h6.2L12.5 8.6 18.2 3Zm-1 16h1.7L7 5H5.2l12 14Z"/></svg>;
    case 'tt':       return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M16 3c.4 2 1.7 3.6 3.7 4v3a8 8 0 0 1-3.7-1v6.2a6 6 0 1 1-6-6c.3 0 .6 0 1 .1V12a3 3 0 1 0 2 2.8V3h3Z"/></svg>;
    default: return <svg {...p}><circle cx="12" cy="12" r="9"/></svg>;
  }
}

Object.assign(window, { VikingLogo, Wordmark, Icon });
