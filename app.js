(function(){
  "use strict";

  const mainEl = document.getElementById('main');
  const sidebarNav = document.getElementById('sidebarNav');
  const tocNav = document.getElementById('tocNav');
  const tocRail = document.getElementById('tocRail');

  /* ---------------- Sidebar ---------------- */
  function buildSidebar(activeSlug){
    sidebarNav.innerHTML = NAV.map(group => `
      <div class="nav-group">
        <div class="nav-group-title">${group.group}</div>
        ${group.items.map(item => `<a class="nav-link${item.slug===activeSlug?' active':''}" href="#/${item.slug}">${item.title}</a>`).join("")}
      </div>
    `).join("");
  }

  /* ---------------- TOC ---------------- */
  function buildToc(){
    const headings = mainEl.querySelectorAll('h2[id], h3[id]');
    if(!headings.length){ tocRail.style.visibility='hidden'; return; }
    tocRail.style.visibility='visible';
    tocNav.innerHTML = Array.from(headings).map(h => {
      const indent = h.tagName === 'H3' ? ' style="padding-left:22px;"' : '';
      return `<a href="#toc-${h.id}" data-target="${h.id}"${indent}>${h.textContent}</a>`;
    }).join("");
    tocNav.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click', (e)=>{
        e.preventDefault();
        const target = document.getElementById(a.dataset.target);
        if(target){ target.scrollIntoView({behavior:'smooth', block:'start'}); history.replaceState(null,'', '#/' + currentSlug + '#' + a.dataset.target); }
      });
    });
    observeToc(headings);
  }

  let tocObserver;
  function observeToc(headings){
    if(tocObserver) tocObserver.disconnect();
    tocObserver = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        const link = tocNav.querySelector(`a[data-target="${entry.target.id}"]`);
        if(!link) return;
        if(entry.isIntersecting){
          tocNav.querySelectorAll('a').forEach(a=>a.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-80px 0px -70% 0px' });
    headings.forEach(h => tocObserver.observe(h));
  }

  /* ---------------- Page render ---------------- */
  let currentSlug = null;

  function renderPage(slug){
    const page = PAGES[slug];
    if(!page){ renderNotFound(slug); return; }
    currentSlug = slug;
    buildSidebar(slug);

    const { prev, next } = navNeighbors(slug);
    const badges = page.badgesHtml || '';

    mainEl.innerHTML = `
      <div class="page-kicker">${page.kicker}</div>
      <h1 class="page-title">${page.title}${page.accent ? `<span class="provider-dot" style="background:${page.accent};margin-left:10px;width:12px;height:12px;"></span>` : ''}</h1>
      ${page.lede ? `<p class="page-lede">${page.lede}</p>` : ''}
      ${badges}
      ${page.html}
      <div class="pager">
        ${prev ? `<a href="#/${prev.slug}"><span class="p-dir">← Previous</span><span class="p-title">${prev.title}</span></a>` : `<span></span>`}
        ${next ? `<a href="#/${next.slug}" class="p-next"><span class="p-dir">Next →</span><span class="p-title">${next.title}</span></a>` : `<span></span>`}
      </div>
    `;

    // syntax highlight
    mainEl.querySelectorAll('pre code').forEach(block => {
      try { hljs.highlightElement(block); } catch(e){}
    });

    // copy buttons
    mainEl.querySelectorAll('[data-copy]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const codeEl = btn.closest('.code-block').querySelector('code');
        navigator.clipboard.writeText(codeEl.textContent).then(()=>{
          const original = btn.textContent;
          btn.textContent = 'Copied';
          btn.classList.add('copied');
          setTimeout(()=>{ btn.textContent = original; btn.classList.remove('copied'); }, 1500);
        });
      });
    });

    // faq accordion
    mainEl.querySelectorAll('.faq-item').forEach(item=>{
      const q = item.querySelector('.faq-q');
      const a = item.querySelector('.faq-a');
      q.addEventListener('click', ()=>{
        const isOpen = item.classList.contains('open');
        mainEl.querySelectorAll('.faq-item.open').forEach(o=>{
          if(o!==item){ o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null; }
        });
        if(isOpen){ item.classList.remove('open'); a.style.maxHeight = null; }
        else{ item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
      });
    });

    buildToc();
    mainEl.focus({preventScroll:true});
    window.scrollTo(0,0);
    closeMobileSidebar();
  }

  function renderNotFound(slug){
    mainEl.innerHTML = `
      <div class="page-kicker">Not found</div>
      <h1 class="page-title">No page called "${slug}"</h1>
      <p class="page-lede">Try the sidebar, or head back to the <a href="#/overview">overview</a>.</p>
    `;
    buildSidebar(null);
    tocRail.style.visibility = 'hidden';
  }

  /* ---------------- Router ---------------- */
  function handleRoute(){
    const hash = location.hash.replace(/^#\/?/, '');
    const [slug, anchor] = hash.split('#');
    const target = slug || 'overview';
    if(target !== currentSlug){
      renderPage(target);
    }
    if(anchor){
      setTimeout(()=>{
        const el = document.getElementById(anchor);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }, 60);
    }
  }
  window.addEventListener('hashchange', handleRoute);

  /* ---------------- Search ---------------- */
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  function buildSearchIndex(){
    return FLAT_NAV.map(item=>{
      const page = PAGES[item.slug];
      const text = (page.title + ' ' + (page.lede||'') + ' ' + page.html.replace(/<[^>]+>/g,' ')).toLowerCase();
      return { slug:item.slug, title:item.title, group:item.group, text };
    });
  }
  const SEARCH_INDEX = buildSearchIndex();

  function runSearch(q){
    q = q.trim().toLowerCase();
    if(!q){ searchResults.hidden = true; searchResults.innerHTML=''; return; }
    const hits = SEARCH_INDEX.filter(i => i.text.includes(q)).slice(0,8);
    if(!hits.length){
      searchResults.innerHTML = `<div class="search-empty">No results for "${q}"</div>`;
    } else {
      searchResults.innerHTML = hits.map(h=>`
        <a href="#/${h.slug}">
          <div class="sr-group">${h.group}</div>
          <div class="sr-title">${h.title}</div>
        </a>
      `).join("");
    }
    searchResults.hidden = false;
  }
  searchInput.addEventListener('input', (e)=>runSearch(e.target.value));
  searchInput.addEventListener('focus', (e)=>{ if(e.target.value) runSearch(e.target.value); });
  document.addEventListener('click', (e)=>{
    if(!e.target.closest('.search-wrap')){ searchResults.hidden = true; }
  });
  searchResults.addEventListener('click', ()=>{ searchResults.hidden = true; searchInput.value=''; });
  document.addEventListener('keydown', (e)=>{
    if(e.key === '/' && document.activeElement !== searchInput){
      e.preventDefault(); searchInput.focus();
    }
    if(e.key === 'Escape'){ searchResults.hidden = true; searchInput.blur(); }
  });

  /* ---------------- Theme toggle ---------------- */
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = document.getElementById('themeIconSun');
  const moonIcon = document.getElementById('themeIconMoon');
  const root = document.documentElement;

  function applyTheme(theme){
    root.setAttribute('data-theme', theme);
    sunIcon.hidden = theme === 'dark';
    moonIcon.hidden = theme !== 'dark';
    try{ localStorage.setItem('uap-theme', theme); }catch(e){}
  }
  let savedTheme = 'light';
  try{ savedTheme = localStorage.getItem('uap-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); }catch(e){}
  applyTheme(savedTheme);
  themeToggle.addEventListener('click', ()=>{
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  /* ---------------- Mobile sidebar ---------------- */
  const sidebar = document.getElementById('sidebar');
  const navToggle = document.getElementById('navToggle');
  const backdrop = document.getElementById('mobileBackdrop');
  function closeMobileSidebar(){ sidebar.classList.remove('open'); backdrop.classList.remove('open'); }
  navToggle.addEventListener('click', ()=>{
    sidebar.classList.toggle('open'); backdrop.classList.toggle('open');
  });
  backdrop.addEventListener('click', closeMobileSidebar);

  /* ---------------- Live GitHub star pill ---------------- */
  const starPill = document.getElementById('starPill');
  fetch('https://api.github.com/repos/idyWilliams/use-africa-pay')
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(data => { if(typeof data.stargazers_count === 'number') starPill.textContent = '★ ' + data.stargazers_count; })
    .catch(()=>{ starPill.textContent = '★ 69'; });

  /* ---------------- Boot ---------------- */
  handleRoute();

})();
