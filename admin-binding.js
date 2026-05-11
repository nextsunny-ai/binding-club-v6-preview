/* ============================================================
   바인딩 클럽 — Admin Panel
   - bottom-left ⚙ button + Ctrl+Shift+A toggle
   - 4 tabs: 텍스트 / 이미지 / 폰트 / 백업
   - persists to localStorage scoped by file path
   - JSON export / import
   ============================================================ */
(function(){
  if (window.__bindingAdminLoaded) return;
  window.__bindingAdminLoaded = true;

  var STORAGE_KEY = 'binding_admin_' + (location.pathname || 'default');

  function loadStore(){
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaults();
      var v = JSON.parse(raw);
      v.texts     = v.texts     || {};
      v.books     = v.books     || {};
      v.bgs       = v.bgs       || {};   /* per-book bg key */
      v.fonts     = v.fonts     || {};   /* { kr, en, hand } selected keys */
      v.uploads   = v.uploads   || [];   /* user-uploaded base64 images */
      v.folderRefs= v.folderRefs|| [];   /* uploads/ 폴더 사진 영구 등록 */
      v.bgLabels  = v.bgLabels  || {};   /* 매니페스트 사진 라벨 override */
      v.hiddenBaseBgs = v.hiddenBaseBgs || {};  /* 기본 풀에서 가린 사진 키 */
      v.guestFonts    = v.guestFonts    || [];  /* 관람객 폰트 풀 3개 */
      return v;
    } catch(e){ return defaults(); }
  }
  function defaults(){ return { texts:{}, books:{}, bgs:{}, fonts:{}, uploads:[], folderRefs:[], bgLabels:{}, hiddenBaseBgs:{}, guestFonts:[] }; }
  function saveStore(s){ try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch(e){} }
  var store = loadStore();
  window.__bindingStore = store;

  /* ---------- text application ---------- */
  function applyText(key, value){
    var manifest = (window.BINDING_TEXTS || []).find(function(m){ return m.key === key; });
    if (!manifest) return;
    var nodes = document.querySelectorAll(manifest.selector);
    nodes.forEach(function(n){
      if (manifest.attr) {
        n.setAttribute(manifest.attr, value);
      } else if (manifest.html) {
        n.innerHTML = value;
      } else {
        n.textContent = value;
      }
    });
  }
  function applyAllTexts(){
    (window.BINDING_TEXTS || []).forEach(function(m){
      var v = store.texts[m.key];
      if (v != null && v !== '') applyText(m.key, v);
    });
  }

  /* ---------- book overrides (label·name·en·author) ---------- */
  function applyBookOverrides(){
    if (!window.BOOK_CONFIGS || !window.BINDING_BOOKS) return;
    window.BINDING_BOOKS.forEach(function(b){
      var ov = store.books[b.key]; if (!ov) return;
      var cfg = window.BOOK_CONFIGS[b.key]; if (!cfg) return;
      if (ov.label) cfg.label = ov.label;
      if (ov.en)    cfg.en    = ov.en;
      if (ov.name)  cfg.name  = ov.name;
      if (ov.author) {
        cfg._customAuthor = ov.author;
      }
      /* re-render coverHTML using new values */
      var orig = b._origCoverHTML || cfg.coverHTML;
      b._origCoverHTML = orig;
      cfg.coverHTML = (function(book, cfgRef){
        return function(){
          var num = String(window.BOOK_ORDER.indexOf(book.key) + 1).padStart(2,'0');
          var iconKey = (book.key === 'astro') ? 'catBlack'
                       : (book.key === 'scatter') ? null
                       : (book.key === 'diagram') ? 'bear'
                       : (book.key === 'pop') ? 'bunny'
                       : 'lightning';
          var illo;
          if (book.key === 'scatter') {
            illo = '<div class="scatter-grid">' +
                   ICONS.bunny + ICONS.cat + ICONS.catBlack +
                   ICONS.bird + ICONS.heart + ICONS.dog +
                   ICONS.flower + ICONS.star + ICONS.dotSky +
                   '</div>';
          } else {
            illo = ICONS[iconKey];
            if (book.key === 'astro') {
              illo = illo.replace('viewBox="0 0 100 100"','viewBox="-10 -10 120 120"').replace('<svg ','<svg style="overflow:visible" ');
            }
          }
          return ''+
            '<div class="num">' + num + ' · ' + cfgRef.en.split(' ')[0] + '</div>' +
            '<div class="b-en">' + cfgRef.en + '</div>' +
            '<h3 class="b-kr">' + cfgRef.name.replace(/\s/g,'<br>') + '</h3>' +
            '<div class="b-illo">' + illo + '</div>' +
            '<div class="b-foot">' + (cfgRef._customAuthor || ('— ' + cfgRef.en + ' —')) + '</div>';
        };
      })(b, cfg);
    });
    if (typeof window.renderGallery === 'function') window.renderGallery();
  }

  /* ---------- background image per book ---------- */
  function getBgImageSrc(bgKey){
    if (!bgKey) return null;
    /* 1) 사용자 업로드 (base64) */
    var up = (store.uploads || []).find(function(u){ return u.key === bgKey; });
    if (up) return up.dataUrl;
    /* 2) 폴더 사진 등록 (영구) */
    var fr = (store.folderRefs || []).find(function(f){ return f.key === bgKey; });
    if (fr) return fr.src;
    /* 3) 매니페스트 기본 풀 */
    var pool = window.BINDING_BG_POOL || [];
    var item = pool.find(function(b){ return b.key === bgKey; });
    return item ? item.src : null;
  }
  function applyBookBackgrounds(){
    /* deprecated: 책 매핑 X (관람객이 디자이너 화면 좌측 [배경 ✦] 탭에서 캔버스에만 적용).
       갤러리 책 표지 = 책 자체의 디자인 그대로 유지.
       옛 인라인 스타일이 남아있으면 클리어. */
    document.querySelectorAll('.book').forEach(function(el){
      el.style.backgroundImage = '';
      el.style.backgroundSize = '';
      el.style.backgroundPosition = '';
    });
  }

  /* ---------- font application ---------- */
  function loadGoogleFont(googleSpec){
    if (!googleSpec) return;
    var existing = document.querySelector('link[data-google-font="' + googleSpec + '"]');
    if (existing) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=' + googleSpec + '&display=swap';
    link.setAttribute('data-google-font', googleSpec);
    document.head.appendChild(link);
  }
  function applyFonts(){
    var pool = window.BINDING_FONT_POOL || {};
    ['kr','en','hand'].forEach(function(slot){
      var key = store.fonts[slot]; if (!key) return;
      var item = (pool[slot] || []).find(function(f){ return f.key === key; });
      if (!item) return;
      if (item.google) loadGoogleFont(item.google);
      var cssVar = '--' + slot;
      document.documentElement.style.setProperty(cssVar, item.family);
    });
  }

  /* ---------- styles ---------- */
  var css = (
    '#bindAdminBtn{position:fixed;left:18px;bottom:18px;width:46px;height:46px;border-radius:50%;'+
    'background:#1F1F1D;color:#FBD449;border:2px solid #FBD449;cursor:pointer;'+
    'font-family:"Lilita One",sans-serif;font-size:20px;z-index:99998;display:flex;'+
    'align-items:center;justify-content:center;box-shadow:0 3px 12px rgba(0,0,0,0.3);'+
    'transition:all .2s;letter-spacing:0;}'+
    '#bindAdminBtn:hover{background:#E64535;color:#FBF2DD;transform:scale(1.05);}'+
    '#bindAdminPanel{position:fixed;inset:0;background:rgba(31,31,29,0.92);z-index:99999;'+
    'display:none;align-items:center;justify-content:center;backdrop-filter:blur(8px);'+
    'font-family:"Pretendard",-apple-system,sans-serif;color:#1F1F1D;}'+
    '#bindAdminPanel.open{display:flex;}'+
    '#bindAdminCard{background:#FBF2DD;border:4px solid #1F1F1D;width:min(1180px,94vw);'+
    'height:min(860px,92vh);display:flex;flex-direction:column;border-radius:16px;'+
    'box-shadow:8px 12px 0 rgba(230,69,53,0.3);}'+
    '.bAd-head{padding:18px 26px;border-bottom:3px solid #1F1F1D;'+
    'display:flex;align-items:center;justify-content:space-between;background:#FBD449;'+
    'border-radius:12px 12px 0 0;}'+
    '.bAd-head h1{font-family:"Lilita One","Pretendard",sans-serif;font-weight:400;font-size:22px;'+
    'letter-spacing:0.04em;color:#1F1F1D;margin:0;}'+
    '.bAd-head h1 small{display:block;font-family:"Pretendard",sans-serif;font-weight:600;'+
    'font-size:11px;letter-spacing:0.04em;color:#1F1F1D;margin-top:2px;opacity:0.7;}'+
    '.bAd-close{background:#1F1F1D;border:2px solid #1F1F1D;color:#FBF2DD;'+
    'padding:8px 16px;font-family:"Lilita One",sans-serif;font-size:11px;letter-spacing:0.16em;'+
    'cursor:pointer;border-radius:100px;}'+
    '.bAd-close:hover{background:#E64535;border-color:#E64535;}'+
    '.bAd-tabs{display:flex;border-bottom:3px solid #1F1F1D;background:#FBF2DD;}'+
    '.bAd-tab{padding:14px 26px;background:transparent;border:0;color:#1F1F1D;'+
    'font-family:"Pretendard",sans-serif;font-weight:800;font-size:14px;letter-spacing:0.02em;'+
    'cursor:pointer;border-bottom:3px solid transparent;margin-bottom:-3px;}'+
    '.bAd-tab.active{color:#E64535;border-bottom-color:#E64535;background:rgba(251,212,73,0.3);}'+
    '.bAd-body{flex:1;overflow-y:auto;padding:24px 32px;}'+
    '.bAd-section{margin-bottom:32px;}'+
    '.bAd-section-title{font-family:"Lilita One","Pretendard",sans-serif;font-weight:400;font-size:13px;'+
    'letter-spacing:0.16em;color:#E64535;border-bottom:2px solid #1F1F1D;'+
    'padding-bottom:8px;margin-bottom:16px;}'+
    '.bAd-row{display:grid;grid-template-columns:240px 1fr 80px;gap:14px;align-items:start;'+
    'margin-bottom:14px;}'+
    '.bAd-label{padding-top:8px;}'+
    '.bAd-label .ko{font-family:"Pretendard",sans-serif;font-weight:700;font-size:13px;color:#1F1F1D;display:block;}'+
    '.bAd-label .en{font-family:"Lilita One",sans-serif;font-size:9px;letter-spacing:0.16em;'+
    'color:#1F1F1D;opacity:0.55;display:block;margin-top:2px;}'+
    '.bAd-input,.bAd-textarea{width:100%;background:#FFFFFF;border:2px solid #1F1F1D;'+
    'color:#1F1F1D;padding:10px 12px;font-family:"Pretendard",sans-serif;font-size:13px;font-weight:600;'+
    'border-radius:8px;outline:none;transition:border-color .15s;}'+
    '.bAd-input:focus,.bAd-textarea:focus{border-color:#E64535;box-shadow:0 0 0 3px rgba(230,69,53,0.2);}'+
    '.bAd-textarea{resize:vertical;min-height:64px;line-height:1.5;}'+
    '.bAd-action{display:flex;flex-direction:column;gap:6px;}'+
    '.bAd-btn{background:#FBF2DD;border:2px solid #1F1F1D;color:#1F1F1D;'+
    'padding:8px 12px;font-family:"Pretendard",sans-serif;font-weight:700;font-size:11px;letter-spacing:0.04em;'+
    'cursor:pointer;border-radius:100px;}'+
    '.bAd-btn:hover{background:#FBD449;}'+
    '.bAd-btn.danger{border-color:#E64535;color:#E64535;}'+
    '.bAd-btn.danger:hover{background:#E64535;color:#FFFFFF;}'+
    '.bAd-btn.primary{background:#1F1F1D;color:#FBF2DD;}'+
    '.bAd-btn.primary:hover{background:#E64535;}'+
    '.bAd-foot{padding:14px 26px;border-top:3px solid #1F1F1D;background:#FBD449;'+
    'display:flex;justify-content:space-between;align-items:center;gap:12px;'+
    'border-radius:0 0 12px 12px;}'+
    '.bAd-status{font-family:"Pretendard",sans-serif;font-size:12px;letter-spacing:0.04em;'+
    'color:#1F1F1D;font-weight:600;}'+
    '.bAd-status .ok{color:#1FA351;}'+
    '.bAd-foot-actions{display:flex;gap:10px;}'+
    '.bAd-help{font-family:"Pretendard",sans-serif;font-size:12px;color:#1F1F1D;line-height:1.6;'+
    'background:#FFFFFF;border:2px dashed #1F1F1D;padding:12px 16px;'+
    'margin-bottom:18px;border-radius:8px;}'+
    /* image grid */
    '.bAd-img-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px;margin-bottom:24px;}'+
    '.bAd-img-card{background:#FFFFFF;border:2px solid #1F1F1D;border-radius:8px;overflow:hidden;'+
    'cursor:pointer;transition:transform .15s,border-color .15s;display:flex;flex-direction:column;'+
    'position:relative;}'+
    '.bAd-img-card:hover{transform:translateY(-3px);border-color:#E64535;}'+
    '.bAd-img-card.selected{border-color:#E64535;box-shadow:0 0 0 3px rgba(230,69,53,0.3);}'+
    '.bAd-img-thumb{width:100%;aspect-ratio:1/1;background:#FBF2DD center/cover no-repeat;}'+
    '.bAd-img-label{padding:6px 8px;font-size:11px;font-weight:700;text-align:center;color:#1F1F1D;'+
    'word-break:break-all;line-height:1.3;}'+
    '.bAd-img-actions{position:absolute;top:6px;right:6px;display:flex;gap:4px;opacity:0;transition:opacity .15s;}'+
    '.bAd-img-card:hover .bAd-img-actions{opacity:1;}'+
    '.bAd-img-act{width:24px;height:24px;border-radius:50%;border:2px solid #1F1F1D;background:#FBF2DD;'+
    'font-size:11px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;'+
    'padding:0;color:#1F1F1D;}'+
    '.bAd-img-act:hover{background:#FBD449;}'+
    '.bAd-img-act.del:hover{background:#E64535;color:#FFFFFF;border-color:#E64535;}'+
    '.bAd-img-tag{position:absolute;top:6px;left:6px;background:#1F1F1D;color:#FBD449;'+
    'font-size:9px;font-weight:700;letter-spacing:0.04em;padding:2px 8px;border-radius:100px;}'+
    '.bAd-img-tag.user{background:#E64535;color:#FFFFFF;}'+
    /* folder add inline form */
    '.bAd-folder-form{display:grid;grid-template-columns:1fr 1fr auto;gap:8px;padding:12px;background:#FFFFFF;'+
    'border:2px dashed #1F1F1D;border-radius:8px;margin-bottom:14px;align-items:center;}'+
    '.bAd-folder-form .bAd-input{padding:8px 10px;}'+
    '.bAd-folder-form .hint{grid-column:1/-1;font-size:11px;color:#1F1F1D;opacity:0.65;line-height:1.5;}'+
    '.bAd-pool-title{font-family:"Lilita One","Pretendard",sans-serif;font-weight:400;font-size:12px;'+
    'letter-spacing:0.16em;color:#1F1F1D;opacity:0.7;margin:18px 0 10px;}'+
    '.bAd-book-tabs{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;}'+
    '.bAd-book-tab{padding:8px 14px;background:#FFFFFF;border:2px solid #1F1F1D;'+
    'font-family:"Pretendard",sans-serif;font-weight:800;font-size:12px;cursor:pointer;border-radius:100px;}'+
    '.bAd-book-tab.active{background:#1F1F1D;color:#FBD449;}'+
    /* font cards */
    '.bAd-font-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;}'+
    '.bAd-font-card{background:#FFFFFF;border:2px solid #1F1F1D;padding:14px 16px;cursor:pointer;'+
    'border-radius:8px;transition:transform .15s,border-color .15s;}'+
    '.bAd-font-card:hover{transform:translateY(-2px);border-color:#E64535;}'+
    '.bAd-font-card.selected{border-color:#E64535;background:#FBD449;box-shadow:0 0 0 3px rgba(230,69,53,0.3);}'+
    '.bAd-font-name{font-size:11px;font-weight:700;color:#1F1F1D;opacity:0.7;margin-bottom:4px;letter-spacing:0.04em;}'+
    '.bAd-font-sample{font-size:18px;line-height:1.2;color:#1F1F1D;}'+
    '.bAd-slot{display:flex;gap:14px;align-items:center;margin-bottom:10px;}'+
    '.bAd-slot strong{font-family:"Lilita One",sans-serif;font-size:13px;letter-spacing:0.16em;color:#E64535;}'
  );

  var styleEl = document.createElement('style');
  styleEl.id = 'bindAdminStyle';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ---------- DOM ---------- */
  var btn = document.createElement('button');
  btn.id = 'bindAdminBtn';
  btn.title = '관리자 열기 (Ctrl+Shift+A)';
  btn.textContent = '⚙';
  document.body.appendChild(btn);

  var panel = document.createElement('div');
  panel.id = 'bindAdminPanel';
  panel.innerHTML = (
    '<div id="bindAdminCard">'+
    '  <div class="bAd-head">'+
    '    <h1>BINDING · ADMIN<small>★ 운영자 패널 · 텍스트·이미지·폰트 관리</small></h1>'+
    '    <button class="bAd-close" data-act="close">CLOSE · ESC</button>'+
    '  </div>'+
    '  <div class="bAd-tabs">'+
    '    <button class="bAd-tab active" data-tab="texts">텍스트</button>'+
    '    <button class="bAd-tab" data-tab="books">책 5권</button>'+
    '    <button class="bAd-tab" data-tab="images">배경 이미지</button>'+
    '    <button class="bAd-tab" data-tab="fonts">폰트</button>'+
    '    <button class="bAd-tab" data-tab="data">백업</button>'+
    '  </div>'+
    '  <div class="bAd-body" id="bAdBody"></div>'+
    '  <div class="bAd-foot">'+
    '    <span class="bAd-status" id="bAdStatus">변경 사항이 즉시 반영됩니다 · localStorage에 자동 저장</span>'+
    '    <div class="bAd-foot-actions">'+
    '      <button class="bAd-btn danger" data-act="resetAll">모두 초기화</button>'+
    '      <button class="bAd-btn" data-act="close2">닫기</button>'+
    '    </div>'+
    '  </div>'+
    '</div>'
  );
  document.body.appendChild(panel);

  var body = panel.querySelector('#bAdBody');
  var statusEl = panel.querySelector('#bAdStatus');
  var currentTab = 'texts';
  var currentBookKey = 'astro';
  var folderFormOpen = false;

  function flash(msg, ok){
    statusEl.innerHTML = '<span class="' + (ok ? 'ok' : '') + '">' + msg + '</span>';
    setTimeout(function(){
      statusEl.innerHTML = '변경 사항이 즉시 반영됩니다 · localStorage에 자동 저장';
    }, 2400);
  }

  function escapeHtml(s){ return String(s==null?'':s).replace(/[&<>]/g, function(c){return ({'&':'&amp;','<':'&lt;','>':'&gt;'})[c];}); }
  function escapeAttr(s){ return String(s==null?'':s).replace(/[&<>"']/g, function(c){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];}); }

  /* ============ TEXTS TAB ============ */
  function renderTexts(){
    var manifest = window.BINDING_TEXTS || [];
    if (!manifest.length){ body.innerHTML = '<div class="bAd-help">텍스트 매니페스트가 비어있습니다.</div>'; return; }
    var groups = {};
    manifest.forEach(function(m){ var g = m.section || '기타'; (groups[g] = groups[g] || []).push(m); });
    var html = '<div class="bAd-help">화면에 표시되는 텍스트를 즉시 바꿀 수 있어요. 줄바꿈은 그대로 반영. 길면 화면 깨짐 주의.</div>';
    Object.keys(groups).forEach(function(g){
      html += '<div class="bAd-section"><div class="bAd-section-title">' + g + '</div>';
      groups[g].forEach(function(m){
        var current = (store.texts[m.key] != null) ? store.texts[m.key] : (m.default || '');
        var isLong = (m.long || (current && current.length > 50));
        var input = isLong
          ? '<textarea class="bAd-textarea" data-key="' + m.key + '" rows="3">' + escapeHtml(current) + '</textarea>'
          : '<input class="bAd-input" data-key="' + m.key + '" value="' + escapeAttr(current) + '">';
        html += '<div class="bAd-row">' +
                '  <div class="bAd-label"><span class="ko">' + (m.label||m.key) + '</span><span class="en">' + (m.note||m.key) + '</span></div>' +
                '  ' + input +
                '  <div class="bAd-action"><button class="bAd-btn" data-reset="' + m.key + '">기본값</button></div>' +
                '</div>';
      });
      html += '</div>';
    });
    body.innerHTML = html;
    body.querySelectorAll('[data-key]').forEach(function(el){
      el.addEventListener('input', function(){
        var k = el.getAttribute('data-key');
        store.texts[k] = el.value;
        applyText(k, el.value);
        saveStore(store);
      });
    });
    body.querySelectorAll('[data-reset]').forEach(function(el){
      el.addEventListener('click', function(){
        var k = el.getAttribute('data-reset');
        var m = manifest.find(function(x){ return x.key === k; });
        delete store.texts[k];
        saveStore(store);
        if (m) applyText(k, m.default || '');
        var inp = body.querySelector('[data-key="'+k+'"]');
        if (inp) inp.value = (m && m.default) || '';
        flash('기본값으로 복원', true);
      });
    });
  }

  /* ============ BOOKS TAB ============ */
  function renderBooks(){
    var books = window.BINDING_BOOKS || [];
    if (!books.length){ body.innerHTML = '<div class="bAd-help">책 매니페스트가 비어있습니다.</div>'; return; }
    var html = '<div class="bAd-help">5권 책의 한글 제목·영문·작가명을 바꿀 수 있어요. 변경 후 갤러리 화면이 자동 새로고침됩니다.</div>';
    books.forEach(function(b){
      var ov = store.books[b.key] || {};
      html += '<div class="bAd-section"><div class="bAd-section-title">' + b.label + ' · ' + b.en + '</div>';
      ['label','en','name','author'].forEach(function(field){
        var labelMap = { label:'카테고리', en:'영문 제목', name:'한글 제목', author:'작가명' };
        var current = ov[field] != null ? ov[field] : b[field];
        html += '<div class="bAd-row">' +
                '  <div class="bAd-label"><span class="ko">' + labelMap[field] + '</span><span class="en">' + b.key + '.' + field + '</span></div>' +
                '  <input class="bAd-input" data-book="' + b.key + '" data-field="' + field + '" value="' + escapeAttr(current) + '">' +
                '  <div class="bAd-action"><button class="bAd-btn" data-book-reset="' + b.key + '" data-book-reset-field="' + field + '">기본값</button></div>' +
                '</div>';
      });
      html += '</div>';
    });
    body.innerHTML = html;
    body.querySelectorAll('[data-book]').forEach(function(el){
      el.addEventListener('input', function(){
        var k = el.getAttribute('data-book');
        var f = el.getAttribute('data-field');
        store.books[k] = store.books[k] || {};
        store.books[k][f] = el.value;
        saveStore(store);
        applyBookOverrides();
      });
    });
    body.querySelectorAll('[data-book-reset]').forEach(function(el){
      el.addEventListener('click', function(){
        var k = el.getAttribute('data-book-reset');
        var f = el.getAttribute('data-book-reset-field');
        if (store.books[k]) delete store.books[k][f];
        saveStore(store);
        var orig = books.find(function(b){ return b.key === k; });
        var inp = body.querySelector('[data-book="'+k+'"][data-field="'+f+'"]');
        if (inp && orig) inp.value = orig[f];
        applyBookOverrides();
        flash('기본값으로 복원', true);
      });
    });
  }

  /* ---------- image resize helper (canvas) ---------- */
  function resizeImageToDataURL(file, maxDim){
    return new Promise(function(resolve, reject){
      var reader = new FileReader();
      reader.onload = function(){
        var img = new Image();
        img.onload = function(){
          var w = img.width, h = img.height;
          if (w > maxDim || h > maxDim){
            var ratio = Math.min(maxDim / w, maxDim / h);
            w = Math.round(w * ratio);
            h = Math.round(h * ratio);
          }
          var canvas = document.createElement('canvas');
          canvas.width = w; canvas.height = h;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        };
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /* ============ IMAGES TAB — 소스 등록만 ============ */
  /* 운영자가 = 풀(라이브러리)에 사진 추가/관리.
     관람객이 = 디자이너 화면 좌측 팔레트 '배경' 탭에서 골라 캔버스 적용. */
  function renderImages(){
    var basePool   = (window.BINDING_BG_POOL || []).slice();
    var folderRefs = (store.folderRefs || []).slice();
    var uploads    = (store.uploads || []).slice();
    var totalCount = basePool.length + folderRefs.length + uploads.length;

    var html = '<div class="bAd-help">' +
      '<b>여기는 = 배경 소스 등록 화면입니다.</b> 책 매핑 X.<br>' +
      '관람객이 = 책 선택 후 디자이너 화면에서 = 좌측 팔레트의 <b>"배경"</b> 카테고리에서 = 여기 등록된 사진을 골라 = 자기 책 배경에 적용합니다.<br>' +
      '<b>운영자 작업:</b> ⬆ PC 업로드 / + 폴더 사진 등록 / 카드 hover ✏라벨 ✕삭제 (사용자 추가분만).' +
      '</div>';

    html += '<div class="bAd-section">' +
            '<div class="bAd-section-title">배경 소스 풀 (총 ' + totalCount + '장)</div>' +
            '<div style="display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap;align-items:center;">' +
            '  <label class="bAd-btn primary" style="cursor:pointer;">' +
            '    ⬆ PC에서 사진 업로드 (자동 리사이즈)' +
            '    <input type="file" accept="image/*" multiple id="bAdImgUpload" style="display:none;">' +
            '  </label>' +
            '</div>';

    /* 통합 풀 = 기본(visible) + 폴더 + 업로드 한 그리드로 */
    var visibleBase = basePool.filter(function(it){ return !store.hiddenBaseBgs[it.key]; });
    var visibleCount = visibleBase.length + folderRefs.length + uploads.length;

    html += '<div class="bAd-pool-title">▾ 등록된 사진 (' + visibleCount + '장) · 카드 hover ✏ 라벨 · ✕ 삭제</div>';
    html += '<div class="bAd-img-grid">';

    /* 기본 풀 (코드에 박힌 거, 가리기만 가능) */
    visibleBase.forEach(function(it){
      var labelOverride = store.bgLabels[it.key];
      var label = labelOverride != null ? labelOverride : it.label;
      html += '<div class="bAd-img-card">' +
              '  <div class="bAd-img-actions">' +
              '    <button class="bAd-img-act" data-edit-base="' + escapeAttr(it.key) + '" title="라벨 편집">✏</button>' +
              '    <button class="bAd-img-act del" data-hide-base="' + escapeAttr(it.key) + '" title="삭제">✕</button>' +
              '  </div>' +
              '  <div class="bAd-img-thumb" style="background-image:url(\'' + escapeAttr(it.src) + '\')"></div>' +
              '  <div class="bAd-img-label">' + escapeHtml(label) + '</div>' +
              '</div>';
    });

    /* 폴더 등록 (옛 데이터 호환) */
    folderRefs.forEach(function(it){
      html += '<div class="bAd-img-card">' +
              '  <div class="bAd-img-actions">' +
              '    <button class="bAd-img-act" data-edit-folder="' + escapeAttr(it.key) + '" title="라벨 편집">✏</button>' +
              '    <button class="bAd-img-act del" data-del-folder="' + escapeAttr(it.key) + '" title="삭제">✕</button>' +
              '  </div>' +
              '  <div class="bAd-img-thumb" style="background-image:url(\'' + escapeAttr(it.src) + '\')"></div>' +
              '  <div class="bAd-img-label">' + escapeHtml(it.label) + '</div>' +
              '</div>';
    });

    /* PC 업로드 */
    uploads.forEach(function(it){
      html += '<div class="bAd-img-card">' +
              '  <div class="bAd-img-actions">' +
              '    <button class="bAd-img-act" data-edit-upload="' + escapeAttr(it.key) + '" title="라벨 편집">✏</button>' +
              '    <button class="bAd-img-act del" data-del-upload="' + escapeAttr(it.key) + '" title="삭제">✕</button>' +
              '  </div>' +
              '  <div class="bAd-img-thumb" style="background-image:url(\'' + escapeAttr(it.dataUrl) + '\')"></div>' +
              '  <div class="bAd-img-label">' + escapeHtml(it.label) + '</div>' +
              '</div>';
    });

    html += '</div>';

    html += '</div>';
    body.innerHTML = html;

    /* ----- 이벤트 ----- */

    /* show/hide folder form */
    var showFolderBtn = body.querySelector('[data-act="show-folder-form"]');
    if (showFolderBtn) showFolderBtn.addEventListener('click', function(){
      folderFormOpen = !folderFormOpen;
      renderImages();
      if (folderFormOpen) {
        var nameInp = body.querySelector('#bAdFolderName');
        if (nameInp) nameInp.focus();
      }
    });

    /* save folder ref */
    var saveFolderBtn = body.querySelector('[data-act="save-folder"]');
    if (saveFolderBtn) saveFolderBtn.addEventListener('click', function(){
      var nameInp  = body.querySelector('#bAdFolderName');
      var labelInp = body.querySelector('#bAdFolderLabel');
      var fname = (nameInp.value || '').trim();
      var label = (labelInp.value || '').trim() || fname.replace(/\.[^.]+$/, '');
      if (!fname) { flash('파일명을 입력하세요', false); nameInp.focus(); return; }
      var key = 'folder_' + Date.now() + '_' + Math.random().toString(36).slice(2,5);
      store.folderRefs.push({
        key: key,
        label: label,
        src: 'uploads/' + fname
      });
      saveStore(store);
      folderFormOpen = false;
      renderImages();
      flash('폴더 사진 등록: ' + label, true);
    });

    /* upload (자동 리사이즈 max 1400px → JPEG 0.85) */
    var upInput = body.querySelector('#bAdImgUpload');
    if (upInput) upInput.addEventListener('change', function(ev){
      var files = ev.target.files;
      if (!files || !files.length) return;
      flash('처리 중... ' + files.length + '장', false);
      var promises = Array.prototype.map.call(files, function(f){
        return resizeImageToDataURL(f, 1400).then(function(dataUrl){
          var key = 'upload_' + Date.now() + '_' + Math.random().toString(36).slice(2,7);
          store.uploads.push({
            key: key,
            label: f.name.replace(/\.[^.]+$/, ''),
            dataUrl: dataUrl
          });
        });
      });
      Promise.all(promises).then(function(){
        saveStore(store);
        renderImages();
        flash(files.length + '장 업로드 완료 (자동 리사이즈)', true);
      }).catch(function(err){
        flash('업로드 실패: ' + (err && err.message || err), false);
      });
    });

    /* 가리기 — 기본 풀 */
    body.querySelectorAll('[data-hide-base]').forEach(function(el){
      el.addEventListener('click', function(ev){
        ev.stopPropagation();
        var k = el.getAttribute('data-hide-base');
        store.hiddenBaseBgs[k] = true;
        saveStore(store);
        renderImages();
        flash('풀에서 가렸어요 (복원 가능)', true);
      });
    });

    /* 복원 — 기본 풀 */
    body.querySelectorAll('[data-show-base]').forEach(function(el){
      el.addEventListener('click', function(ev){
        ev.stopPropagation();
        var k = el.getAttribute('data-show-base');
        delete store.hiddenBaseBgs[k];
        saveStore(store);
        renderImages();
        flash('복원되었습니다', true);
      });
    });

    /* 라벨 편집 — 기본 풀 */
    body.querySelectorAll('[data-edit-base]').forEach(function(el){
      el.addEventListener('click', function(ev){
        ev.stopPropagation();
        var k = el.getAttribute('data-edit-base');
        var item = (window.BINDING_BG_POOL||[]).find(function(b){return b.key===k;});
        if (!item) return;
        var current = store.bgLabels[k] != null ? store.bgLabels[k] : item.label;
        var v = prompt('라벨 편집 (기본값: ' + item.label + ')', current);
        if (v == null) return;
        v = v.trim();
        if (v === '' || v === item.label) {
          delete store.bgLabels[k];
        } else {
          store.bgLabels[k] = v;
        }
        saveStore(store);
        renderImages();
        flash('라벨 변경됨', true);
      });
    });

    /* 라벨 편집 — 폴더 */
    body.querySelectorAll('[data-edit-folder]').forEach(function(el){
      el.addEventListener('click', function(ev){
        ev.stopPropagation();
        var k = el.getAttribute('data-edit-folder');
        var item = (store.folderRefs||[]).find(function(f){return f.key===k;});
        if (!item) return;
        var v = prompt('라벨 편집', item.label);
        if (v == null) return;
        v = v.trim();
        if (v === '') return;
        item.label = v;
        saveStore(store);
        renderImages();
        flash('라벨 변경됨', true);
      });
    });

    /* 삭제 — 폴더 */
    body.querySelectorAll('[data-del-folder]').forEach(function(el){
      el.addEventListener('click', function(ev){
        ev.stopPropagation();
        var k = el.getAttribute('data-del-folder');
        var item = (store.folderRefs||[]).find(function(f){return f.key===k;});
        if (!item) return;
        if (!confirm('"' + item.label + '" 사진 등록을 삭제할까요? (폴더의 실제 파일은 안 지워집니다)')) return;
        store.folderRefs = store.folderRefs.filter(function(f){return f.key!==k;});
        /* 책 배경에서 사용 중이면 = 해제 */
        Object.keys(store.bgs).forEach(function(bk){
          if (store.bgs[bk] === k) delete store.bgs[bk];
        });
        saveStore(store);
        applyBookBackgrounds();
        renderImages();
        flash('삭제됨', true);
      });
    });

    /* 라벨 편집 — 업로드 */
    body.querySelectorAll('[data-edit-upload]').forEach(function(el){
      el.addEventListener('click', function(ev){
        ev.stopPropagation();
        var k = el.getAttribute('data-edit-upload');
        var item = (store.uploads||[]).find(function(u){return u.key===k;});
        if (!item) return;
        var v = prompt('라벨 편집', item.label);
        if (v == null) return;
        v = v.trim();
        if (v === '') return;
        item.label = v;
        saveStore(store);
        renderImages();
        flash('라벨 변경됨', true);
      });
    });

    /* 삭제 — 업로드 */
    body.querySelectorAll('[data-del-upload]').forEach(function(el){
      el.addEventListener('click', function(ev){
        ev.stopPropagation();
        var k = el.getAttribute('data-del-upload');
        var item = (store.uploads||[]).find(function(u){return u.key===k;});
        if (!item) return;
        if (!confirm('"' + item.label + '" 업로드 사진을 삭제할까요?')) return;
        store.uploads = store.uploads.filter(function(u){return u.key!==k;});
        Object.keys(store.bgs).forEach(function(bk){
          if (store.bgs[bk] === k) delete store.bgs[bk];
        });
        saveStore(store);
        applyBookBackgrounds();
        renderImages();
        flash('삭제됨', true);
      });
    });
  }

  /* ============ FONTS TAB ============ */
  function renderFonts(){
    var pool = window.BINDING_FONT_POOL || {};
    var html = '<div class="bAd-help">' +
      '<b>① 사이트 기본 폰트</b> = CSS 변수 (<code>--kr / --en / --hand</code>) 적용 = 전체 화면 텍스트.<br>' +
      '<b>② 관람객용 폰트 3개</b> = 디자이너 화면에서 관람객이 제목 쓸 때 = 3가지 중 선택 (모던·명조·블랙 등 무드).<br>' +
      'Google Fonts 자동 로드.' +
      '</div>';

    /* === ① 사이트 기본 폰트 (CSS 변수 적용) === */
    html += '<div class="bAd-section"><div class="bAd-section-title">① 사이트 기본 폰트 (전체 화면)</div>';
    [['kr','한글 본문','--kr'], ['en','영문 헤더','--en'], ['hand','손글씨','--hand']].forEach(function(entry){
      var slot = entry[0], label = entry[1];
      var items = pool[slot] || [];
      var current = store.fonts[slot];
      html += '<div class="bAd-slot" style="margin-top:14px;">' +
              '<div style="font-family:\'Lilita One\',sans-serif;font-size:12px;letter-spacing:0.16em;color:#1F1F1D;flex:1;">' + label + ' · <code style="opacity:0.55;font-size:11px;">' + entry[2] + '</code></div>' +
              '<button class="bAd-btn" data-font-reset="' + slot + '">기본값</button></div>' +
              '<div class="bAd-font-grid">';
      items.forEach(function(f){
        var sel = (current === f.key) ? ' selected' : '';
        var sample = (slot === 'kr') ? '오늘 어떤 무드' : (slot === 'en') ? 'BINDING CLUB' : 'Hello, friend!';
        html += '<div class="bAd-font-card' + sel + '" data-font-slot="' + slot + '" data-font-key="' + f.key + '" data-font-google="' + (f.google||'') + '">' +
                '  <div class="bAd-font-name">' + escapeHtml(f.label) + '</div>' +
                '  <div class="bAd-font-sample" style="font-family:' + f.family.replace(/"/g,'&quot;') + ';">' + sample + '</div>' +
                '</div>';
      });
      html += '</div>';
    });
    html += '</div>';

    /* === ② 관람객용 폰트 풀 (3개 슬롯) === */
    html += '<div class="bAd-section"><div class="bAd-section-title">② 관람객용 폰트 풀 — 디자이너 우측 [폰트] 칩 3개</div>';
    var GUEST_DEFAULT = [
      { key:'modern',  label:'모던', family:"'Pretendard', sans-serif",     weight:900, google:null },
      { key:'classic', label:'명조', family:"'Nanum Myeongjo', serif",      weight:800, google:'Nanum+Myeongjo:wght@400;700;800' },
      { key:'bold',    label:'블랙', family:"'Black Han Sans', sans-serif", weight:400, google:'Black+Han+Sans' }
    ];
    /* allFonts = 한글·손글씨 통합 (운영자가 선택 가능한 풀) */
    var allFonts = (pool.kr || []).concat(pool.hand || []).concat(pool.en || []);

    /* 슬롯 1·2·3 */
    [0,1,2].forEach(function(idx){
      var current = (store.guestFonts && store.guestFonts[idx]) || GUEST_DEFAULT[idx];
      html += '<div class="bAd-slot" style="margin-top:14px;">' +
              '<div style="font-family:\'Lilita One\',sans-serif;font-size:12px;letter-spacing:0.16em;color:#E64535;flex:1;">슬롯 ' + (idx+1) + ' · 라벨:</div>' +
              '<input class="bAd-input" data-guest-label-idx="' + idx + '" value="' + escapeAttr(current.label) + '" style="max-width:140px;">' +
              '<button class="bAd-btn" data-guest-reset="' + idx + '">기본값</button>' +
              '</div>' +
              '<div class="bAd-font-grid">';
      allFonts.forEach(function(f){
        var sel = (current.key === f.key || current.family === f.family) ? ' selected' : '';
        html += '<div class="bAd-font-card' + sel + '" data-guest-slot="' + idx + '" data-guest-key="' + f.key + '" data-guest-google="' + (f.google||'') + '" data-guest-family="' + escapeAttr(f.family) + '">' +
                '  <div class="bAd-font-name">' + escapeHtml(f.label) + '</div>' +
                '  <div class="bAd-font-sample" style="font-family:' + f.family.replace(/"/g,'&quot;') + ';">가</div>' +
                '</div>';
      });
      html += '</div>';
    });
    html += '</div>';

    body.innerHTML = html;

    /* === ① 이벤트 === */
    body.querySelectorAll('[data-font-slot]').forEach(function(el){
      var g = el.getAttribute('data-font-google');
      if (g) loadGoogleFont(g);
      el.addEventListener('click', function(){
        var slot = el.getAttribute('data-font-slot');
        var key  = el.getAttribute('data-font-key');
        store.fonts[slot] = key;
        saveStore(store);
        applyFonts();
        renderFonts();
        flash('사이트 폰트 적용: ' + slot + ' → ' + key, true);
      });
    });
    body.querySelectorAll('[data-font-reset]').forEach(function(el){
      el.addEventListener('click', function(){
        var slot = el.getAttribute('data-font-reset');
        delete store.fonts[slot];
        saveStore(store);
        document.documentElement.style.removeProperty('--' + slot);
        renderFonts();
        flash('기본값으로 복원: ' + slot, true);
      });
    });

    /* === ② 관람객 풀 이벤트 === */
    body.querySelectorAll('[data-guest-slot]').forEach(function(el){
      var g = el.getAttribute('data-guest-google');
      if (g) loadGoogleFont(g);
      el.addEventListener('click', function(){
        var idx = parseInt(el.getAttribute('data-guest-slot'));
        var key = el.getAttribute('data-guest-key');
        var family = el.getAttribute('data-guest-family');
        var labelInp = body.querySelector('[data-guest-label-idx="' + idx + '"]');
        var label = labelInp ? labelInp.value.trim() : '';
        if (!label) {
          /* 폰트 라벨 자동 추출 */
          var item = allFonts.find(function(f){ return f.key === key; });
          label = item ? item.label.replace(/\s*\(현재\)\s*/, '').slice(0, 6) : '폰트' + (idx+1);
        }
        if (!Array.isArray(store.guestFonts)) store.guestFonts = [];
        while (store.guestFonts.length < 3) store.guestFonts.push(null);
        store.guestFonts[idx] = {
          key: key, label: label, family: family, weight: 800, google: g || null
        };
        saveStore(store);
        renderFonts();
        if (typeof window.renderFontRow === 'function') window.renderFontRow();
        flash('관람객 폰트 슬롯 ' + (idx+1) + ' = ' + label, true);
      });
    });
    body.querySelectorAll('[data-guest-label-idx]').forEach(function(el){
      el.addEventListener('input', function(){
        var idx = parseInt(el.getAttribute('data-guest-label-idx'));
        if (!Array.isArray(store.guestFonts)) store.guestFonts = [];
        while (store.guestFonts.length < 3) store.guestFonts.push(null);
        if (!store.guestFonts[idx]) store.guestFonts[idx] = Object.assign({}, GUEST_DEFAULT[idx]);
        store.guestFonts[idx].label = el.value;
        saveStore(store);
      });
    });
    body.querySelectorAll('[data-guest-reset]').forEach(function(el){
      el.addEventListener('click', function(){
        var idx = parseInt(el.getAttribute('data-guest-reset'));
        if (Array.isArray(store.guestFonts)) store.guestFonts[idx] = null;
        saveStore(store);
        renderFonts();
        if (typeof window.renderFontRow === 'function') window.renderFontRow();
        flash('관람객 슬롯 ' + (idx+1) + ' = 기본값', true);
      });
    });
  }

  /* ============ DATA TAB ============ */
  function renderData(){
    body.innerHTML = (
      /* === 프린트 셋업 (운영자 1회 셋업용) === */
      '<div class="bAd-section" style="margin-bottom:20px;">'+
      '<div class="bAd-section-title">프린트 셋업 (운영자 1회 셋업용)</div>'+
      '<div class="bAd-help" style="line-height:1.6;">'+
      '관람객 메인 흐름 = 다이얼로그 X · 시뮬레이션만 · OS가 기억한 프린터로 자동 출력.<br>'+
      '<b>첫 셋업 시</b> = 아래 "프린트 테스트" 버튼 → 다이얼로그 → 프린터·사이즈·컬러 셋팅 (한 번).<br>'+
      '<b>iPad/iOS</b> = AirPrint 프린터 첫 선택 후 = OS가 기억 = 이후 관람객 출력 = 같은 프린터로 자동.'+
      '</div>'+
      '<div style="display:flex;gap:10px;align-items:center;">'+
      '  <button class="bAd-btn primary" data-act="print-test" style="font-size:13px;padding:10px 18px;">▶ 프린트 테스트 (다이얼로그 호출)</button>'+
      '  <span style="font-size:11px;color:#1F1F1D;opacity:0.6;">현재 책 표지로 테스트 인쇄</span>'+
      '</div></div>'+

      /* === JSON 백업 === */
      '<div class="bAd-help">설정을 JSON 파일로 내보내고 다른 키오스크에 붙여넣어 동일한 운영값을 공유할 수 있어요. 업로드 이미지는 base64로 함께 저장됩니다 (파일 용량 큼).</div>'+
      '<div class="bAd-section"><div class="bAd-section-title">현재 설정 (편집 가능)</div>'+
      '<textarea class="bAd-textarea" id="bAdJson" rows="20" style="font-family:\'IBM Plex Mono\',monospace;font-size:11px;">' + escapeHtml(JSON.stringify(store, null, 2)) + '</textarea>'+
      '<div style="display:flex;gap:10px;margin-top:12px;flex-wrap:wrap;">'+
      '  <button class="bAd-btn primary" data-act="apply">▼ 위 JSON 적용</button>'+
      '  <button class="bAd-btn" data-act="copy">📋 클립보드 복사</button>'+
      '  <button class="bAd-btn" data-act="download">⬇ 파일 다운로드</button>'+
      '  <label class="bAd-btn" style="cursor:pointer;">⬆ 파일 업로드<input type="file" accept="application/json" id="bAdUpload" style="display:none;"></label>'+
      '</div></div>'
    );

    /* 프린트 테스트 버튼 이벤트 */
    var ptEl = body.querySelector('[data-act="print-test"]');
    if (ptEl) ptEl.addEventListener('click', function(){
      panel.classList.remove('open');
      try {
        if (typeof window.goPrint === 'function') {
          window.goPrint();
          setTimeout(function(){ try { window.print(); } catch(e){} }, 200);
        } else {
          window.print();
        }
        flash('프린트 테스트 → 다이얼로그 호출', true);
      } catch(e) { flash('실패', false); }
    });
    body.querySelector('[data-act="apply"]').addEventListener('click', function(){
      try {
        var v = JSON.parse(body.querySelector('#bAdJson').value);
        v.texts=v.texts||{}; v.books=v.books||{}; v.bgs=v.bgs||{}; v.fonts=v.fonts||{}; v.uploads=v.uploads||[]; v.folderRefs=v.folderRefs||[]; v.bgLabels=v.bgLabels||{}; v.hiddenBaseBgs=v.hiddenBaseBgs||{}; v.guestFonts=v.guestFonts||[];
        store = v;
        window.__bindingStore = store;
        saveStore(store);
        applyAllTexts();
        applyBookOverrides();
        applyBookBackgrounds();
        applyFonts();
        flash('적용됨', true);
      } catch(e){ flash('JSON 파싱 실패', false); }
    });
    body.querySelector('[data-act="copy"]').addEventListener('click', function(){
      navigator.clipboard.writeText(JSON.stringify(store, null, 2)).then(function(){ flash('복사됨', true); });
    });
    body.querySelector('[data-act="download"]').addEventListener('click', function(){
      var blob = new Blob([JSON.stringify(store, null, 2)], { type:'application/json' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'binding-admin-' + (new Date().toISOString().slice(0,10)) + '.json';
      a.click();
      flash('다운로드 시작', true);
    });
    body.querySelector('#bAdUpload').addEventListener('change', function(ev){
      var f = ev.target.files[0]; if (!f) return;
      var r = new FileReader();
      r.onload = function(){
        try {
          var v = JSON.parse(r.result);
          v.texts=v.texts||{}; v.books=v.books||{}; v.bgs=v.bgs||{}; v.fonts=v.fonts||{}; v.uploads=v.uploads||[]; v.folderRefs=v.folderRefs||[]; v.bgLabels=v.bgLabels||{}; v.hiddenBaseBgs=v.hiddenBaseBgs||{}; v.guestFonts=v.guestFonts||[];
          store = v;
          window.__bindingStore = store;
          saveStore(store);
          applyAllTexts();
          applyBookOverrides();
          applyBookBackgrounds();
          applyFonts();
          renderData();
          flash('업로드 적용됨', true);
        } catch(e){ flash('파일 파싱 실패', false); }
      };
      r.readAsText(f);
    });
  }

  function render(){
    if (currentTab === 'texts') renderTexts();
    else if (currentTab === 'books') renderBooks();
    else if (currentTab === 'images') renderImages();
    else if (currentTab === 'fonts') renderFonts();
    else renderData();
    panel.querySelectorAll('.bAd-tab').forEach(function(t){
      t.classList.toggle('active', t.getAttribute('data-tab') === currentTab);
    });
  }

  function open(){ panel.classList.add('open'); render(); }
  function close(){ panel.classList.remove('open'); }

  btn.addEventListener('click', open);
  panel.addEventListener('click', function(ev){
    var t = ev.target;
    if (t.matches('.bAd-tab')) { currentTab = t.getAttribute('data-tab'); render(); return; }
    if (t.matches('[data-act="close"]') || t.matches('[data-act="close2"]')) { close(); return; }
    if (t.matches('[data-act="resetAll"]')) {
      if (confirm('모든 텍스트·책·이미지·폰트 설정을 초기화할까요? (업로드 이미지도 삭제됩니다)')) {
        store = defaults();
        window.__bindingStore = store;
        saveStore(store);
        (window.BINDING_TEXTS || []).forEach(function(m){ applyText(m.key, m.default || ''); });
        ['kr','en','hand'].forEach(function(s){ document.documentElement.style.removeProperty('--' + s); });
        if (typeof window.renderGallery === 'function') window.renderGallery();
        render();
        flash('초기화 완료', true);
      }
    }
    if (t === panel) close();
  });

  document.addEventListener('keydown', function(ev){
    if ((ev.ctrlKey || ev.metaKey) && ev.shiftKey && (ev.key === 'A' || ev.key === 'a')) {
      ev.preventDefault();
      if (panel.classList.contains('open')) close(); else open();
    } else if (ev.key === 'Escape' && panel.classList.contains('open')) {
      close();
    }
  });

  /* ---------- bootstrap ---------- */
  function init(){
    /* 옛 책 매핑 데이터 = 한 번 정리 (이제 X) */
    if (store.bgs && Object.keys(store.bgs).length){
      store.bgs = {};
      saveStore(store);
    }
    applyAllTexts();
    applyBookOverrides();
    applyBookBackgrounds();
    applyFonts();
    /* 관람객 폰트 풀 = Google Fonts 미리 로드 */
    (store.guestFonts || []).forEach(function(g){ if (g && g.google) loadGoogleFont(g.google); });
    /* 디자이너 화면 폰트 칩 = 어드민 셋팅 반영해서 다시 그리기 */
    if (typeof window.renderFontRow === 'function') window.renderFontRow();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else setTimeout(init, 0);

  /* expose for debugging */
  window.bindingAdmin = { open: open, close: close, store: function(){ return store; } };
})();
