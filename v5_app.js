/* ============================================
   BINDING CLUB v5 — APP
   ============================================ */

const TEXT_COLORS = ['#1F1F1D','#FBF2DD','#FFFFFF','#E64535','#FBD449','#7DC3E8','#A8D8C0','#C5B8E0'];

const GUEST_FONTS = [
  { key: 'modern',  label: '모던',   sample: '가',  family: "'Pretendard', sans-serif",     weight: 900 },
  { key: 'classic', label: '명조',   sample: '가',  family: "'Nanum Myeongjo', serif",       weight: 800 },
  { key: 'bold',    label: '블랙',   sample: '가',  family: "'Black Han Sans', sans-serif",  weight: 400 }
];

let currentStyle = 'astro';
let currentCat = 'animal';
let selectedEl = null;
let history = [];
let textColor = '#1F1F1D';
let textFontFamily = GUEST_FONTS[0].family;
let textFontWeight = GUEST_FONTS[0].weight;

/* ----- screen routing ----- */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
function goGallery() {
  showScreen('gallery');
  const pa = document.getElementById('printActive');
  if (pa) pa.style.display = 'flex';
  const pd = document.getElementById('printDone');
  if (pd) pd.classList.remove('show');
}
function goIntro() {
  showScreen('intro');
  const pa = document.getElementById('printActive');
  if (pa) pa.style.display = 'flex';
  const pd = document.getElementById('printDone');
  if (pd) pd.classList.remove('show');
  beep(440, 0.08);
}
function pickBook(style) {
  currentStyle = style;
  const canvas = document.getElementById('canvas');
  canvas.dataset.style = style;
  clearAll();
  const cfg = BOOK_CONFIGS[style];
  if (cfg) {
    canvas.style.backgroundImage = cfg.bgPattern || '';
    canvas.style.backgroundSize = cfg.bgSize || 'auto';
    cfg.template.forEach(item => {
      if (item.type === 'text') {
        addTextElement(item.content, item.x, item.y, item.fs, item.color, item.font);
      } else if (item.type === 'sticker') {
        addStickerElement(item.name, item.x, item.y, item.size);
      }
    });
    renderPalette();
  }
  showScreen('designer');
  beep(660, 0.1);
  if (selectedEl) selectedEl.classList.remove('selected');
  selectedEl = null;
  pushHistory();
}
function snapshotCanvasTo(targetId) {
  const canvas = document.getElementById('canvas');
  const preview = document.getElementById(targetId);
  if (!canvas || !preview) return;
  preview.innerHTML = canvas.innerHTML;
  const cs = window.getComputedStyle(canvas);
  preview.style.backgroundColor = cs.backgroundColor;
  preview.style.backgroundImage = canvas.style.backgroundImage || cs.backgroundImage;
  preview.style.backgroundSize = canvas.style.backgroundSize || cs.backgroundSize;
  preview.style.backgroundPosition = canvas.style.backgroundPosition || cs.backgroundPosition;
  preview.style.backgroundRepeat = canvas.style.backgroundRepeat || cs.backgroundRepeat;
}
function fitPreview(wrapSel, previewId) {
  const wrap = document.querySelector(wrapSel);
  const preview = document.getElementById(previewId);
  if (!wrap || !preview) return;
  const scale = wrap.clientWidth / 480;
  preview.style.transform = `scale(${scale})`;
}
function fitDonePreview() { fitPreview('.done-preview-wrap', 'donePreview'); }
function fitPrintPreview() { fitPreview('.print-preview-wrap', 'printPreview'); }
window.addEventListener('resize', () => { fitDonePreview(); fitPrintPreview(); });

function goPrint() {
  // 선택 상태 / 리사이즈 핸들 숨겨서 인쇄에 안 보이게
  if (selectedEl) selectedEl.classList.remove('selected');
  selectedEl = null;

  // 메인 흐름 = 시뮬레이션만 (관람객) → 발행 완료 → OS 기억된 프린터로 자동 출력
  document.getElementById('dStyle').textContent = 'No.0' + (BOOK_ORDER.indexOf(currentStyle) + 1);
  document.getElementById('dSerial').textContent =
    String(237 + Math.floor(Math.random() * 50)).padStart(4, '0');
  // 캔버스 → 미리보기 스냅샷 (인쇄 중 + 인쇄 완료 둘 다)
  snapshotCanvasTo('printPreview');
  snapshotCanvasTo('donePreview');
  showScreen('printing');
  document.getElementById('printActive').style.display = 'flex';
  document.getElementById('printDone').classList.remove('show');
  setTimeout(fitPrintPreview, 50);
  setTimeout(() => {
    document.getElementById('printActive').style.display = 'none';
    document.getElementById('printDone').classList.add('show');
    setTimeout(fitDonePreview, 50);
  }, 2800);
  beep(880, 0.2);
}
// 어드민에서 호출 = 운영자 셋업 시 다이얼로그
window.goPrint = goPrint;
// 어드민에서 호출 = 운영자 셋업 시 다이얼로그
window.goPrint = goPrint;

/* ----- gallery ----- */
function renderGallery() {
  const grid = document.getElementById('bookGrid');
  grid.innerHTML = BOOK_ORDER.map(key => {
    const c = BOOK_CONFIGS[key];
    return `<div class="book" data-style="${key}" onclick="pickBook('${key}')">${c.coverHTML()}</div>`;
  }).join('');
  // brand badge
  document.getElementById('brandBadge').innerHTML = ICONS.book;
  document.getElementById('dBadge').innerHTML = ICONS.book;
  document.getElementById('printGlyph').innerHTML = ICONS.book;
}

/* ----- intro confetti ----- */
function renderIntroConfetti() {
  const wrap = document.getElementById('introConfetti');
  const items = [
    { name: 'star', x: '8%', y: '12%', size: 70, r: -12 },
    { name: 'heart', x: '85%', y: '14%', size: 64, r: 14 },
    { name: 'flower', x: '12%', y: '78%', size: 70, r: -8 },
    { name: 'sparkle', x: '88%', y: '78%', size: 64, r: 18 },
    { name: 'cloud', x: '6%', y: '46%', size: 80, r: -6 },
    { name: 'rainbow', x: '90%', y: '46%', size: 70, r: 8 },
    { name: 'lightning', x: '20%', y: '8%', size: 50, r: 16 },
    { name: 'cherry', x: '78%', y: '85%', size: 60, r: -10 },
    { name: 'dotSky', x: '4%', y: '28%', size: 36, r: 0 },
    { name: 'dotYellow', x: '92%', y: '28%', size: 40, r: 0 }
  ];
  wrap.innerHTML = items.map((it, i) => `
    <div class="float" style="
      position:absolute;
      left:${it.x}; top:${it.y};
      width:${it.size}px; height:${it.size}px;
      --r:${it.r}deg;
      transform:rotate(${it.r}deg);
      animation-delay:${(i * 0.2).toFixed(2)}s;
    ">${ICONS[it.name]}</div>
  `).join('');
}

/* ----- palette ----- */
document.querySelectorAll('.cat-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentCat = tab.dataset.cat;
    renderPalette();
  });
});

function renderPalette() {
  const grid = document.getElementById('palette');

  /* ========== 배경 카테고리 ========== */
  if (currentCat === 'bg') {
    const bgs = collectBgPool();
    let html = `<div class="bg-default-btn" data-bg-default title="이 책의 기본 배경으로 되돌리기">
                  ★ 책 기본 배경으로
                </div>`;
    bgs.forEach(b => {
      const src = (b.src || '').replace(/'/g, "\\'");
      const label = (b.label || '').replace(/"/g, '&quot;');
      html += `<div class="pal-item bg-pal-item"
                    data-bg-src="${src}"
                    title="${label}"
                    style="background-image:url('${src}');"></div>`;
    });
    grid.innerHTML = html;
    grid.querySelectorAll('[data-bg-default]').forEach(el => {
      el.addEventListener('click', () => { resetCanvasBg(); beep(550, 0.06); });
    });
    grid.querySelectorAll('[data-bg-src]').forEach(el => {
      el.addEventListener('click', () => {
        applyCanvasBg(el.getAttribute('data-bg-src'));
        beep(720, 0.05);
      });
    });
    return;
  }

  /* ========== 아이콘 카테고리 (기존) ========== */
  let pool;
  if (currentCat === 'animal' && BOOK_CONFIGS[currentStyle]) {
    const picks = BOOK_CONFIGS[currentStyle].stickers.filter(n => ICON_GROUPS.animal.includes(n));
    const rest = ICON_GROUPS.animal.filter(n => !picks.includes(n));
    pool = [...picks, ...rest];
  } else {
    pool = ICON_GROUPS[currentCat] || [];
  }
  grid.innerHTML = pool.map(name =>
    `<div class="pal-item" data-name="${name}">${ICONS[name]}</div>`
  ).join('');
  grid.querySelectorAll('.pal-item[data-name]').forEach(item => {
    item.addEventListener('click', () => {
      addStickerElement(item.dataset.name);
      beep(720, 0.05);
    });
  });
}

/* 어드민 등록 + 매니페스트 풀 모두 합쳐서 반환 (어드민에서 가린 기본 풀 = 제외) */
function collectBgPool() {
  const list = [];
  const adminStore = window.__bindingStore || {};
  const hidden = adminStore.hiddenBaseBgs || {};
  const labelOverride = adminStore.bgLabels || {};

  (window.BINDING_BG_POOL || []).forEach(b => {
    if (hidden[b.key]) return;  /* 어드민에서 가린 거 = 디자이너 화면에서도 안 보임 */
    list.push({
      key: b.key,
      label: labelOverride[b.key] != null ? labelOverride[b.key] : b.label,
      src: b.src
    });
  });
  (adminStore.folderRefs || []).forEach(f => {
    list.push({ key: f.key, label: f.label, src: f.src });
  });
  (adminStore.uploads || []).forEach(u => {
    list.push({ key: u.key, label: u.label, src: u.dataUrl });
  });
  return list;
}

/* 캔버스 배경 = 사진으로 적용 */
function applyCanvasBg(src) {
  const canvas = document.getElementById('canvas');
  if (!canvas || !src) return;
  canvas.style.backgroundImage = `url('${src}')`;
  canvas.style.backgroundSize  = 'cover';
  canvas.style.backgroundPosition = 'center';
  canvas.style.backgroundRepeat = 'no-repeat';
}

/* 캔버스 배경 = 책 기본으로 리셋 */
function resetCanvasBg() {
  const canvas = document.getElementById('canvas');
  if (!canvas) return;
  const cfg = BOOK_CONFIGS[currentStyle];
  if (!cfg) { canvas.style.backgroundImage = ''; canvas.style.backgroundSize = ''; return; }
  canvas.style.backgroundImage = cfg.bgPattern || '';
  canvas.style.backgroundSize  = cfg.bgSize || 'auto';
  canvas.style.backgroundPosition = '';
  canvas.style.backgroundRepeat = '';
}

/* ----- color row ----- */
function renderColorRow() {
  const row = document.getElementById('colorRow');
  row.innerHTML = TEXT_COLORS.map((c, i) =>
    `<div class="color-chip ${i===0?'active':''}" data-color="${c}" style="background:${c}"></div>`
  ).join('');
  row.querySelectorAll('.color-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      row.querySelectorAll('.color-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      textColor = chip.dataset.color;
      // also recolor the selected text element if any
      if (selectedEl && selectedEl.dataset.type === 'text') {
        selectedEl.style.color = textColor;
        pushHistory();
      }
    });
  });
}

/* ----- font row ----- */
function getActiveGuestFonts() {
  /* 어드민에서 셋팅된 = store.guestFonts 우선. 빈 슬롯 = default fallback. */
  const adminFonts = (window.__bindingStore && window.__bindingStore.guestFonts) || [];
  return GUEST_FONTS.map((def, i) => {
    const ov = adminFonts[i];
    if (ov && ov.family) {
      return {
        key: ov.key || def.key,
        label: ov.label || def.label,
        family: ov.family,
        weight: ov.weight || def.weight,
        sample: '가'
      };
    }
    return def;
  });
}
function renderFontRow() {
  const row = document.getElementById('fontRow');
  if (!row) return;
  const fonts = getActiveGuestFonts();
  /* 첫 슬롯을 default로 */
  textFontFamily = fonts[0].family;
  textFontWeight = fonts[0].weight;
  row.innerHTML = fonts.map((f, i) =>
    `<div class="font-chip ${i===0?'active':''}" data-font-idx="${i}" style="font-family:${f.family};font-weight:${f.weight};">
       ${f.sample}<small>${f.label}</small>
     </div>`
  ).join('');
  row.querySelectorAll('.font-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      row.querySelectorAll('.font-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const idx = parseInt(chip.dataset.fontIdx);
      const f = getActiveGuestFonts()[idx];
      if (!f) return;
      textFontFamily = f.family;
      textFontWeight = f.weight;
      if (selectedEl && selectedEl.dataset.type === 'text') {
        selectedEl.style.fontFamily = textFontFamily;
        selectedEl.style.fontWeight = textFontWeight;
        pushHistory();
      }
    });
  });
}

/* ----- canvas elements ----- */
function addStickerElement(name, x, y, size) {
  const canvas = document.getElementById('canvas');
  const el = document.createElement('div');
  el.className = 'cv-el sticker';
  const auto = (x === undefined);
  el.style.left = (auto ? 80 + Math.random() * 240 : x) + 'px';
  el.style.top  = (auto ? 220 + Math.random() * 280 : y) + 'px';
  const sz = size || 90;
  el.style.width = sz + 'px';
  el.style.height = sz + 'px';
  el.dataset.type = 'sticker';
  el.dataset.name = name;
  el.innerHTML = ICONS[name] + '<div class="resize"></div>';
  attachElementEvents(el);
  canvas.appendChild(el);
  if (auto) {
    selectElement(el);
    pushHistory();
  }
}
function addTextElement(text, x, y, fs, color, font) {
  const canvas = document.getElementById('canvas');
  const el = document.createElement('div');
  el.className = 'cv-el text';
  el.style.left = (x ?? 60) + 'px';
  el.style.top  = (y ?? 100) + 'px';
  el.style.fontSize = (fs ?? 36) + 'px';
  el.style.color = color || textColor;
  el.style.fontFamily = font || "'Pretendard', sans-serif";
  el.style.fontWeight = '900';
  el.style.letterSpacing = '-0.04em';
  el.dataset.type = 'text';
  el.textContent = text;
  el.innerHTML += '<div class="resize"></div>';
  attachElementEvents(el);
  canvas.appendChild(el);
  return el;
}
function addText() {
  const inp = document.getElementById('newText');
  const t = inp.value.trim();
  if (!t) return;
  const el = addTextElement(t, 60 + Math.random()*120, 220 + Math.random()*220, 40, textColor, textFontFamily);
  el.style.fontWeight = textFontWeight;
  selectElement(el);
  inp.value = '';
  pushHistory();
  beep(550, 0.08);
}
function selectElement(el) {
  document.querySelectorAll('.cv-el').forEach(e => e.classList.remove('selected'));
  el.classList.add('selected');
  selectedEl = el;
}
function deleteSelected() {
  if (selectedEl) {
    selectedEl.remove();
    selectedEl = null;
    pushHistory();
    beep(220, 0.08);
  }
}
function clearAll() {
  document.querySelectorAll('.cv-el').forEach(e => e.remove());
  selectedEl = null;
  history = [];
}
function pushHistory() {
  const canvas = document.getElementById('canvas');
  history.push(canvas.innerHTML);
  if (history.length > 30) history.shift();
}
function undo() {
  if (history.length < 2) return;
  history.pop();
  const last = history[history.length - 1];
  const canvas = document.getElementById('canvas');
  canvas.innerHTML = last;
  canvas.querySelectorAll('.cv-el').forEach(attachElementEvents);
  selectedEl = null;
  beep(330, 0.08);
}

function attachElementEvents(el) {
  let dragging = false, resizing = false, editing = false;
  let sx, sy, ox, oy, sw, sfs;

  el.addEventListener('pointerdown', (e) => {
    if (editing) return;
    if (e.target.classList && e.target.classList.contains('resize')) {
      resizing = true;
      sx = e.clientX;
      const cs = window.getComputedStyle(el);
      if (el.dataset.type === 'sticker') {
        sw = parseInt(cs.width);
      } else {
        sfs = parseFloat(cs.fontSize);
      }
    } else {
      dragging = true;
      sx = e.clientX; sy = e.clientY;
      ox = parseInt(el.style.left || 0);
      oy = parseInt(el.style.top || 0);
    }
    selectElement(el);
    e.stopPropagation();
    e.preventDefault();
  });

  el.addEventListener('dblclick', (e) => {
    if (el.dataset.type !== 'text') return;
    editing = true;
    el.classList.add('editing');
    el.contentEditable = 'true';
    const rh = el.querySelector('.resize'); if (rh) rh.style.display = 'none';
    el.focus();
    document.execCommand('selectAll');
    e.stopPropagation();
  });
  el.addEventListener('blur', () => {
    if (!editing) return;
    editing = false;
    el.classList.remove('editing');
    el.contentEditable = 'false';
    const rh = el.querySelector('.resize'); if (rh) rh.style.display = '';
    pushHistory();
  });
  el.addEventListener('keydown', (e) => {
    if (editing && e.key === 'Enter') { e.preventDefault(); el.blur(); }
  });

  document.addEventListener('pointermove', (e) => {
    if (dragging) {
      el.style.left = (ox + (e.clientX - sx)) + 'px';
      el.style.top  = (oy + (e.clientY - sy)) + 'px';
    } else if (resizing) {
      const dx = e.clientX - sx;
      if (el.dataset.type === 'sticker') {
        const newW = Math.max(30, sw + dx);
        el.style.width = newW + 'px';
        el.style.height = newW + 'px';
      } else {
        el.style.fontSize = Math.max(12, sfs + dx * 0.5) + 'px';
      }
    }
  });
  document.addEventListener('pointerup', () => {
    if (dragging || resizing) pushHistory();
    dragging = false; resizing = false;
  });
}

/* canvas empty click = deselect */
document.getElementById('canvas').addEventListener('pointerdown', (e) => {
  if (e.target.id === 'canvas') {
    document.querySelectorAll('.cv-el').forEach(el => el.classList.remove('selected'));
    selectedEl = null;
  }
});

/* keyboard */
document.addEventListener('keydown', (e) => {
  const active = document.querySelector('.screen.active').id;
  if (document.activeElement.tagName === 'INPUT' ||
      document.activeElement.classList?.contains('editing')) return;

  if (active === 'intro' && (e.key === 'Enter' || e.key === ' ')) goGallery();
  else if (active === 'designer') {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (selectedEl) { e.preventDefault(); deleteSelected(); }
    } else if (e.key.toLowerCase() === 'p') goPrint();
    else if (e.key === 'Escape') goGallery();
    else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); undo(); }
  } else if (active === 'printing' && (e.key === ' ' || e.key === 'Enter')) {
    if (document.getElementById('printDone').classList.contains('show')) goGallery();
  }
});

document.getElementById('newText').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); addText(); }
});

/* beep */
let audioCtx = null;
function beep(freq, dur) {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    g.gain.value = 0.04;
    osc.connect(g); g.connect(audioCtx.destination);
    osc.start();
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
    osc.stop(audioCtx.currentTime + dur);
  } catch(e) {}
}

/* init */
renderGallery();
renderIntroConfetti();
renderPalette();
renderColorRow();
renderFontRow();
window.renderFontRow = renderFontRow;  /* 어드민에서 호출 가능하게 expose */
