/* ============================================
   BINDING CLUB v5 — SVG ICON LIBRARY
   - All icons: viewBox 0 0 100 100
   - stroke #1F1F1D, stroke-width 5, stroke-linecap/join round
   - flat fills from palette
   ============================================ */

const PAL = {
  ink:    '#1F1F1D',
  white:  '#FFFFFF',
  cream:  '#FBF2DD',
  pink:   '#F8C8D0',
  red:    '#E64535',
  yellow: '#FBD449',
  sky:    '#7DC3E8',
  mint:   '#A8D8C0',
  lav:    '#C5B8E0',
  peach:  '#F4A88E',
  orange: '#F08A4B'
};

/* style helper */
const S = `stroke="${PAL.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"`;
const SF = `stroke="${PAL.ink}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"`;

const ICONS = {

  /* ============ ANIMALS ============ */

  bunny: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="22" rx="9" ry="20" fill="${PAL.white}" ${S}/>
    <ellipse cx="32" cy="22" rx="3" ry="11" fill="${PAL.pink}"/>
    <ellipse cx="68" cy="22" rx="9" ry="20" fill="${PAL.white}" ${S}/>
    <ellipse cx="68" cy="22" rx="3" ry="11" fill="${PAL.pink}"/>
    <circle cx="50" cy="58" r="30" fill="${PAL.white}" ${S}/>
    <circle cx="40" cy="55" r="2.5" fill="${PAL.ink}"/>
    <circle cx="60" cy="55" r="2.5" fill="${PAL.ink}"/>
    <path d="M46 68 L50 71 L54 68" ${SF}/>
  </svg>`,

  cat: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 78 L18 38 L34 50 L50 44 L66 50 L82 38 L78 78 Z" fill="${PAL.white}" ${S}/>
    <path d="M18 38 L28 30 L34 50 Z" fill="${PAL.white}" ${S}/>
    <path d="M82 38 L72 30 L66 50 Z" fill="${PAL.white}" ${S}/>
    <circle cx="40" cy="56" r="3" fill="${PAL.ink}"/>
    <circle cx="60" cy="56" r="3" fill="${PAL.ink}"/>
    <path d="M46 64 Q50 68 54 64" ${SF}/>
    <path d="M30 60 L20 60 M30 64 L22 66" ${SF} stroke-width="2.5"/>
    <path d="M70 60 L80 60 M70 64 L78 66" ${SF} stroke-width="2.5"/>
  </svg>`,

  catBlack: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 78 L18 38 L34 50 L50 44 L66 50 L82 38 L78 78 Z" fill="${PAL.ink}" ${S}/>
    <path d="M18 38 L28 30 L34 50 Z" fill="${PAL.ink}" ${S}/>
    <path d="M82 38 L72 30 L66 50 Z" fill="${PAL.ink}" ${S}/>
    <ellipse cx="40" cy="56" rx="3" ry="4" fill="${PAL.yellow}"/>
    <ellipse cx="60" cy="56" rx="3" ry="4" fill="${PAL.yellow}"/>
    <path d="M46 66 Q50 70 54 66" stroke="${PAL.white}" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`,

  catCalico: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 78 L18 38 L34 50 L50 44 L66 50 L82 38 L78 78 Z" fill="${PAL.white}" ${S}/>
    <path d="M18 38 L28 30 L34 50 Z" fill="${PAL.ink}" ${S}/>
    <path d="M82 38 L72 30 L66 50 Z" fill="${PAL.orange}" ${S}/>
    <path d="M30 50 Q40 56 48 52 L42 78 L24 78 Z" fill="${PAL.ink}"/>
    <path d="M62 52 Q70 56 78 50 L78 78 L60 78 Z" fill="${PAL.orange}"/>
    <circle cx="40" cy="58" r="2.5" fill="${PAL.ink}"/>
    <circle cx="60" cy="58" r="2.5" fill="${PAL.ink}"/>
    <path d="M46 65 Q50 69 54 65" ${SF}/>
  </svg>`,

  dog: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="28" cy="42" rx="10" ry="16" fill="${PAL.peach}" ${S}/>
    <ellipse cx="72" cy="42" rx="10" ry="16" fill="${PAL.peach}" ${S}/>
    <circle cx="50" cy="55" r="32" fill="${PAL.cream}" ${S}/>
    <ellipse cx="50" cy="68" rx="14" ry="10" fill="${PAL.peach}"/>
    <circle cx="40" cy="52" r="2.8" fill="${PAL.ink}"/>
    <circle cx="60" cy="52" r="2.8" fill="${PAL.ink}"/>
    <ellipse cx="50" cy="62" rx="3" ry="2.2" fill="${PAL.ink}"/>
    <path d="M50 65 L50 72 M44 72 Q50 77 56 72" ${SF}/>
  </svg>`,

  bear: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="26" cy="28" r="10" fill="${PAL.peach}" ${S}/>
    <circle cx="74" cy="28" r="10" fill="${PAL.peach}" ${S}/>
    <circle cx="26" cy="28" r="4" fill="${PAL.pink}"/>
    <circle cx="74" cy="28" r="4" fill="${PAL.pink}"/>
    <circle cx="50" cy="55" r="32" fill="${PAL.peach}" ${S}/>
    <ellipse cx="50" cy="65" rx="16" ry="11" fill="${PAL.cream}"/>
    <circle cx="40" cy="52" r="2.8" fill="${PAL.ink}"/>
    <circle cx="60" cy="52" r="2.8" fill="${PAL.ink}"/>
    <ellipse cx="50" cy="62" rx="3.5" ry="2.5" fill="${PAL.ink}"/>
    <path d="M50 65 L50 70 M45 70 Q50 74 55 70" ${SF}/>
  </svg>`,

  fox: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 25 L34 50 L18 55 Z" fill="${PAL.orange}" ${S}/>
    <path d="M78 25 L66 50 L82 55 Z" fill="${PAL.orange}" ${S}/>
    <path d="M22 50 Q22 80 50 86 Q78 80 78 50 Q78 30 50 30 Q22 30 22 50 Z" fill="${PAL.orange}" ${S}/>
    <path d="M35 65 Q50 80 65 65 L60 75 Q50 82 40 75 Z" fill="${PAL.cream}"/>
    <ellipse cx="50" cy="68" rx="10" ry="8" fill="${PAL.cream}"/>
    <circle cx="42" cy="56" r="2.8" fill="${PAL.ink}"/>
    <circle cx="58" cy="56" r="2.8" fill="${PAL.ink}"/>
    <ellipse cx="50" cy="65" rx="3" ry="2" fill="${PAL.ink}"/>
  </svg>`,

  bird: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="55" rx="32" ry="28" fill="${PAL.sky}" ${S}/>
    <circle cx="58" cy="40" r="3" fill="${PAL.ink}"/>
    <path d="M68 48 L80 50 L68 54 Z" fill="${PAL.yellow}" ${S}/>
    <path d="M30 68 Q40 78 48 70" ${SF}/>
    <path d="M52 78 L46 88 M58 78 L62 88" ${SF}/>
    <ellipse cx="42" cy="58" rx="6" ry="4" fill="${PAL.white}" stroke="${PAL.ink}" stroke-width="2.5"/>
  </svg>`,

  fish: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 50 L35 30 Q70 25 80 50 Q70 75 35 70 Z" fill="${PAL.sky}" ${S}/>
    <path d="M15 50 L5 35 L15 50 L5 65 Z" fill="${PAL.sky}" ${S}/>
    <circle cx="65" cy="48" r="4" fill="${PAL.white}" stroke="${PAL.ink}" stroke-width="2.5"/>
    <circle cx="65" cy="48" r="2" fill="${PAL.ink}"/>
    <path d="M40 50 Q55 45 70 50 M40 58 Q55 53 70 58" ${SF} stroke-width="2.5"/>
  </svg>`,

  frog: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="32" r="13" fill="${PAL.mint}" ${S}/>
    <circle cx="70" cy="32" r="13" fill="${PAL.mint}" ${S}/>
    <circle cx="30" cy="32" r="5" fill="${PAL.white}"/>
    <circle cx="70" cy="32" r="5" fill="${PAL.white}"/>
    <circle cx="30" cy="32" r="2.5" fill="${PAL.ink}"/>
    <circle cx="70" cy="32" r="2.5" fill="${PAL.ink}"/>
    <path d="M18 50 Q18 82 50 86 Q82 82 82 50 Q82 38 50 38 Q18 38 18 50 Z" fill="${PAL.mint}" ${S}/>
    <path d="M30 62 Q50 78 70 62" ${SF}/>
  </svg>`,

  /* ============ NATURE ============ */

  star: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 8 L62 38 L94 40 L68 60 L78 92 L50 74 L22 92 L32 60 L6 40 L38 38 Z" fill="${PAL.yellow}" ${S}/>
    <circle cx="42" cy="48" r="2" fill="${PAL.ink}"/>
    <circle cx="58" cy="48" r="2" fill="${PAL.ink}"/>
    <path d="M44 58 Q50 62 56 58" ${SF} stroke-width="2.5"/>
  </svg>`,

  heart: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 86 C 10 60, 10 22, 32 22 C 42 22, 50 32, 50 38 C 50 32, 58 22, 68 22 C 90 22, 90 60, 50 86 Z" fill="${PAL.red}" ${S}/>
  </svg>`,

  heartPink: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 86 C 10 60, 10 22, 32 22 C 42 22, 50 32, 50 38 C 50 32, 58 22, 68 22 C 90 22, 90 60, 50 86 Z" fill="${PAL.pink}" ${S}/>
  </svg>`,

  flower: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="22" r="14" fill="${PAL.pink}" ${S}/>
    <circle cx="78" cy="50" r="14" fill="${PAL.pink}" ${S}/>
    <circle cx="50" cy="78" r="14" fill="${PAL.pink}" ${S}/>
    <circle cx="22" cy="50" r="14" fill="${PAL.pink}" ${S}/>
    <circle cx="50" cy="50" r="12" fill="${PAL.yellow}" ${S}/>
  </svg>`,

  rainbow: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 75 A40 40 0 0 1 90 75" fill="none" stroke="${PAL.red}" stroke-width="9" stroke-linecap="round"/>
    <path d="M19 75 A31 31 0 0 1 81 75" fill="none" stroke="${PAL.yellow}" stroke-width="9" stroke-linecap="round"/>
    <path d="M28 75 A22 22 0 0 1 72 75" fill="none" stroke="${PAL.mint}" stroke-width="9" stroke-linecap="round"/>
    <path d="M37 75 A13 13 0 0 1 63 75" fill="none" stroke="${PAL.sky}" stroke-width="9" stroke-linecap="round"/>
    <path d="M10 75 L90 75" ${SF}/>
    <path d="M10 75 A40 40 0 0 1 90 75" fill="none" ${S}/>
  </svg>`,

  cloud: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 70 Q12 70 12 58 Q12 46 26 46 Q28 30 46 30 Q60 30 64 42 Q82 40 86 56 Q90 70 76 72 Z" fill="${PAL.white}" ${S}/>
  </svg>`,

  lightning: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M58 8 L24 54 L44 54 L36 92 L74 40 L52 40 L62 8 Z" fill="${PAL.yellow}" ${S}/>
  </svg>`,

  moon: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M70 14 A40 40 0 1 0 70 86 A30 30 0 1 1 70 14 Z" fill="${PAL.cream}" ${S}/>
    <circle cx="56" cy="48" r="3" fill="${PAL.ink}"/>
    <circle cx="50" cy="62" r="2" fill="${PAL.ink}"/>
  </svg>`,

  sun: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g ${S}>
      <line x1="50" y1="6" x2="50" y2="18"/>
      <line x1="50" y1="82" x2="50" y2="94"/>
      <line x1="6" y1="50" x2="18" y2="50"/>
      <line x1="82" y1="50" x2="94" y2="50"/>
      <line x1="18" y1="18" x2="26" y2="26"/>
      <line x1="74" y1="74" x2="82" y2="82"/>
      <line x1="82" y1="18" x2="74" y2="26"/>
      <line x1="26" y1="74" x2="18" y2="82"/>
    </g>
    <circle cx="50" cy="50" r="22" fill="${PAL.yellow}" ${S}/>
    <circle cx="42" cy="46" r="2.5" fill="${PAL.ink}"/>
    <circle cx="58" cy="46" r="2.5" fill="${PAL.ink}"/>
    <path d="M42 56 Q50 62 58 56" ${SF}/>
  </svg>`,

  leaf: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 12 Q86 38 80 70 Q60 92 30 80 Q14 60 22 38 Q34 18 50 12 Z" fill="${PAL.mint}" ${S}/>
    <path d="M40 76 Q50 50 70 30" ${SF}/>
  </svg>`,

  tree: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="36" r="16" fill="${PAL.mint}" ${S}/>
    <circle cx="68" cy="36" r="16" fill="${PAL.mint}" ${S}/>
    <circle cx="50" cy="22" r="16" fill="${PAL.mint}" ${S}/>
    <circle cx="50" cy="48" r="20" fill="${PAL.mint}" ${S}/>
    <rect x="44" y="60" width="12" height="28" fill="${PAL.peach}" ${S}/>
  </svg>`,

  /* ============ OBJECTS ============ */

  pencil: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="14" y="38" width="62" height="24" fill="${PAL.red}" ${S}/>
    <path d="M76 38 L94 50 L76 62 Z" fill="${PAL.cream}" ${S}/>
    <path d="M86 44 L94 50 L86 56 Z" fill="${PAL.ink}"/>
    <rect x="14" y="38" width="10" height="24" fill="${PAL.pink}" ${S}/>
    <circle cx="32" cy="50" r="2.5" fill="${PAL.ink}"/>
    <path d="M40 54 Q44 58 48 54" ${SF} stroke-width="2.5"/>
  </svg>`,

  notebook: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="22" y="20" width="56" height="68" rx="6" fill="${PAL.yellow}" ${S}/>
    <line x1="32" y1="14" x2="32" y2="26" ${S}/>
    <line x1="46" y1="14" x2="46" y2="26" ${S}/>
    <line x1="60" y1="14" x2="60" y2="26" ${S}/>
    <line x1="74" y1="14" x2="74" y2="26" ${S}/>
    <circle cx="38" cy="48" r="2.5" fill="${PAL.ink}"/>
    <circle cx="62" cy="48" r="2.5" fill="${PAL.ink}"/>
    <path d="M40 60 Q50 66 60 60" ${SF}/>
    <ellipse cx="32" cy="58" rx="4" ry="2.5" fill="${PAL.pink}"/>
    <ellipse cx="68" cy="58" rx="4" ry="2.5" fill="${PAL.pink}"/>
  </svg>`,

  cake: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 70 L80 70 L72 88 L28 88 Z" fill="${PAL.peach}" ${S}/>
    <rect x="18" y="50" width="64" height="22" fill="${PAL.cream}" ${S}/>
    <path d="M18 50 Q26 44 34 50 Q42 44 50 50 Q58 44 66 50 Q74 44 82 50" ${SF}/>
    <rect x="46" y="22" width="8" height="22" fill="${PAL.pink}" ${S}/>
    <path d="M50 22 Q46 14 50 10 Q54 14 50 22" fill="${PAL.yellow}" ${S}/>
    <circle cx="32" cy="60" r="3" fill="${PAL.red}"/>
    <circle cx="68" cy="60" r="3" fill="${PAL.sky}"/>
  </svg>`,

  balloon: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="42" rx="28" ry="34" fill="${PAL.red}" ${S}/>
    <path d="M50 76 L46 82 L54 82 Z" fill="${PAL.red}" ${S}/>
    <path d="M50 82 Q46 90 52 96" ${SF}/>
    <ellipse cx="42" cy="32" rx="5" ry="8" fill="${PAL.white}" opacity="0.5"/>
  </svg>`,

  ribbon: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 30 Q14 56 50 50 Q14 56 14 80 Q40 80 50 50" fill="${PAL.pink}" ${S}/>
    <path d="M86 30 Q86 56 50 50 Q86 56 86 80 Q60 80 50 50" fill="${PAL.pink}" ${S}/>
    <ellipse cx="50" cy="50" rx="10" ry="14" fill="${PAL.red}" ${S}/>
    <path d="M44 64 L40 92 M56 64 L60 92" ${SF}/>
  </svg>`,

  lollipop: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="34" r="26" fill="${PAL.pink}" ${S}/>
    <path d="M50 14 Q60 24 50 34 Q40 44 50 54 M40 18 Q52 30 40 42 Q28 54 40 54" ${SF} stroke-width="3"/>
    <rect x="46" y="56" width="8" height="36" fill="${PAL.cream}" ${S}/>
  </svg>`,

  cassette: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="26" width="80" height="50" rx="4" fill="${PAL.sky}" ${S}/>
    <rect x="20" y="36" width="60" height="22" fill="${PAL.white}" ${S}/>
    <circle cx="34" cy="47" r="6" fill="${PAL.ink}"/>
    <circle cx="66" cy="47" r="6" fill="${PAL.ink}"/>
    <line x1="20" y1="68" x2="80" y2="68" ${S}/>
    <line x1="22" y1="76" x2="22" y2="82" ${S}/>
    <line x1="78" y1="76" x2="78" y2="82" ${S}/>
  </svg>`,

  camera: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="32" width="76" height="50" rx="6" fill="${PAL.red}" ${S}/>
    <rect x="32" y="22" width="20" height="14" fill="${PAL.red}" ${S}/>
    <circle cx="50" cy="58" r="16" fill="${PAL.cream}" ${S}/>
    <circle cx="50" cy="58" r="9" fill="${PAL.ink}"/>
    <circle cx="46" cy="54" r="3" fill="${PAL.white}"/>
    <circle cx="76" cy="40" r="3" fill="${PAL.yellow}"/>
  </svg>`,

  book: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 20 L16 84 Q34 76 50 80 L50 24 Q34 18 16 20 Z" fill="${PAL.mint}" ${S}/>
    <path d="M84 20 L84 84 Q66 76 50 80 L50 24 Q66 18 84 20 Z" fill="${PAL.sky}" ${S}/>
    <line x1="50" y1="24" x2="50" y2="80" ${S}/>
    <line x1="22" y1="40" x2="44" y2="38" ${SF} stroke-width="2.5"/>
    <line x1="22" y1="50" x2="44" y2="48" ${SF} stroke-width="2.5"/>
    <line x1="22" y1="60" x2="44" y2="58" ${SF} stroke-width="2.5"/>
    <line x1="56" y1="38" x2="78" y2="40" ${SF} stroke-width="2.5"/>
    <line x1="56" y1="48" x2="78" y2="50" ${SF} stroke-width="2.5"/>
  </svg>`,

  envelope: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="28" width="80" height="50" fill="${PAL.cream}" ${S}/>
    <path d="M10 28 L50 56 L90 28" ${SF}/>
    <path d="M50 50 L50 60 L42 56 L58 56 Z" fill="${PAL.red}" ${S}/>
    <path d="M50 50 L42 56 L50 60 L58 56 Z M44 56 L50 52 L56 56" ${SF}/>
  </svg>`,

  /* ============ EFFECTS ============ */

  boom: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 6 L58 24 L76 12 L72 32 L94 30 L78 46 L94 60 L72 60 L78 80 L60 70 L52 92 L44 70 L26 80 L32 60 L8 60 L24 46 L8 30 L30 32 L24 12 L42 24 Z" fill="${PAL.yellow}" ${S}/>
  </svg>`,

  sparkle: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 8 Q54 44 92 50 Q54 54 50 92 Q46 54 8 50 Q46 46 50 8 Z" fill="${PAL.yellow}" ${S}/>
  </svg>`,

  music: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="74" rx="14" ry="11" fill="${PAL.ink}" ${S}/>
    <ellipse cx="72" cy="68" rx="14" ry="11" fill="${PAL.ink}" ${S}/>
    <line x1="46" y1="74" x2="46" y2="22" ${S}/>
    <line x1="86" y1="68" x2="86" y2="16" ${S}/>
    <path d="M46 22 Q66 18 86 16" ${SF}/>
    <path d="M46 32 Q66 28 86 26" ${SF}/>
  </svg>`,

  arrow: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 50 L66 50 L60 32 L92 50 L60 68 L66 50" fill="${PAL.red}" ${S}/>
  </svg>`,

  speech: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 22 Q14 14 22 14 L78 14 Q86 14 86 22 L86 60 Q86 68 78 68 L46 68 L30 86 L34 68 L22 68 Q14 68 14 60 Z" fill="${PAL.white}" ${S}/>
  </svg>`,

  /* ============ EXTRA TINY (fillers) ============ */

  dot: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="32" fill="${PAL.pink}" ${S}/>
  </svg>`,

  dotYellow: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="32" fill="${PAL.yellow}" ${S}/>
  </svg>`,

  dotSky: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="32" fill="${PAL.sky}" ${S}/>
  </svg>`,

  smile: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" fill="${PAL.yellow}" ${S}/>
    <circle cx="36" cy="44" r="3.5" fill="${PAL.ink}"/>
    <circle cx="64" cy="44" r="3.5" fill="${PAL.ink}"/>
    <path d="M34 60 Q50 74 66 60" ${SF}/>
    <ellipse cx="30" cy="58" rx="5" ry="3" fill="${PAL.pink}" opacity="0.7"/>
    <ellipse cx="70" cy="58" rx="5" ry="3" fill="${PAL.pink}" opacity="0.7"/>
  </svg>`,

  cherry: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="34" cy="68" r="16" fill="${PAL.red}" ${S}/>
    <circle cx="66" cy="72" r="16" fill="${PAL.red}" ${S}/>
    <path d="M34 52 Q40 30 70 18" ${SF}/>
    <path d="M66 56 Q60 32 70 18" ${SF}/>
    <path d="M70 18 L74 14 L78 22" ${SF} stroke-width="3"/>
    <ellipse cx="28" cy="62" rx="3" ry="2" fill="${PAL.white}" opacity="0.6"/>
  </svg>`,

  /* exposed */
};

/* category groupings for the palette tabs */
const ICON_GROUPS = {
  animal: ['bunny','cat','catBlack','catCalico','dog','bear','fox','bird','fish','frog'],
  nature: ['star','heart','heartPink','flower','rainbow','cloud','lightning','moon','sun','leaf','tree','cherry'],
  object: ['pencil','notebook','cake','balloon','ribbon','lollipop','cassette','camera','book','envelope'],
  effect: ['boom','sparkle','music','arrow','speech','smile','dot','dotYellow','dotSky']
};

/* helper: render an icon as an HTML string */
function renderIcon(name, size) {
  const svg = ICONS[name];
  if (!svg) return '';
  if (size) return svg.replace('<svg', `<svg style="width:${size}px;height:${size}px"`);
  return svg;
}

window.PAL = PAL;
window.ICONS = ICONS;
window.ICON_GROUPS = ICON_GROUPS;
window.renderIcon = renderIcon;
