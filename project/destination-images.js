// destination-images.js — fetches lead images from Wikipedia REST API at runtime
// and applies them to .ph-<destination> elements. The CSS gradient stays as a
// fallback if any image fails to load.

(function(){
  // Wikipedia article titles for each destination keyword.
  // The Wikipedia REST summary endpoint returns originalimage.source for each.
  const DESTS = {
    'ph-langkawi':   'Langkawi',
    'ph-kundasang':  'Kundasang',
    'ph-cameron':    'Cameron_Highlands',
    'ph-redang':     'Redang_Island',
    'ph-penang':     'George_Town,_Penang',
    'ph-melaka':     'Malacca_City',
    'ph-tioman':     'Tioman_Island',
    'ph-kl':         'Petronas_Towers',
    'ph-mulu':       'Gunung_Mulu_National_Park',
    'ph-perhentian': 'Perhentian_Islands',
  };

  // Known-good direct URLs for cases where the Wikipedia lead image is poor
  // or rate-limited. These are stable Wikimedia Commons URLs.
  const OVERRIDES = {
    // Langkawi — confirmed Unsplash photo (Max, @notquitemax — Free to use under the Unsplash License)
    'ph-langkawi': 'https://images.unsplash.com/photo-1517655027799-8b4fab574f54?w=1800&q=80&auto=format&fit=crop',
  };

  const cache = {};
  async function fetchImg(title){
    if (cache[title]) return cache[title];
    try {
      const r = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`);
      if (!r.ok) return null;
      const j = await r.json();
      const src = j.originalimage?.source || j.thumbnail?.source || null;
      cache[title] = src;
      return src;
    } catch(e){
      return null;
    }
  }

  function applyToAll(klass, url){
    document.querySelectorAll('.' + klass).forEach(el => {
      // Subtle dark overlay so white text/labels stay legible
      el.style.backgroundImage =
        `linear-gradient(180deg, rgba(6,26,46,.10) 0%, rgba(6,26,46,.45) 100%), url("${url}")`;
      el.style.backgroundSize = 'auto, cover';
      el.style.backgroundPosition = 'center, center';
      el.style.backgroundRepeat = 'no-repeat';
      el.classList.add('ph-loaded');
    });
  }

  async function run(){
    // Apply overrides first (instant) then fetch the rest in parallel.
    for (const k of Object.keys(OVERRIDES)){
      applyToAll(k, OVERRIDES[k]);
    }
    const fetches = Object.entries(DESTS)
      .filter(([k]) => !OVERRIDES[k])
      .map(async ([klass, title]) => {
        const url = await fetchImg(title);
        if (url) applyToAll(klass, url);
      });
    await Promise.all(fetches);
  }

  // Run on initial load AND watch for dynamically-rendered .ph-* nodes
  // (React renders many of these after the initial paint).
  function go(){ run(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go);
  else go();

  // Re-apply when new .ph-* nodes are added (React renders).
  let rerunTimer = null;
  const obs = new MutationObserver(()=>{
    clearTimeout(rerunTimer);
    rerunTimer = setTimeout(()=>{
      // Re-apply cached URLs to any new unloaded elements.
      for (const [klass, title] of Object.entries(DESTS)){
        const url = OVERRIDES[klass] || cache[title];
        if (!url) continue;
        document.querySelectorAll('.' + klass + ':not(.ph-loaded)').forEach(el => {
          applyToAll(klass, url);
        });
      }
    }, 80);
  });
  obs.observe(document.documentElement, { childList: true, subtree: true });
})();
