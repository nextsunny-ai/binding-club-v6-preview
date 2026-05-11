/* ============================================================
   바인딩 클럽 — 어드민 매니페스트
   - BINDING_TEXTS    : 화면 텍스트 (selector + key + default)
   - BINDING_BG_POOL  : 배경 이미지 풀 (uploads/ 폴더)
   - BINDING_FONT_POOL: 폰트 풀 (한글·영문·손글씨)
   - BINDING_BOOKS    : 5권 책 텍스트 (label·name·작가명)
   ============================================================ */
(function(){

/* ---------- 1. TEXTS (화면 텍스트) ---------- */
window.BINDING_TEXTS = [
  /* INTRO 화면 */
  { section: '인트로 화면', key: 'intro.tag',    label: '상단 태그',     selector: '#intro .intro-tag',  default: '★ ULTRA DEPT.STORE BUSAN ★' },
  { section: '인트로 화면', key: 'intro.title',  label: '메인 타이틀',   selector: '#intro .intro-title', default: '바인딩<br>클럽', html: true },
  { section: '인트로 화면', key: 'intro.en',     label: '영문 서브',     selector: '#intro .intro-en',   default: 'BINDING CLUB' },
  { section: '인트로 화면', key: 'intro.sub',    label: '카피',          selector: '#intro .intro-sub',  default: '5가지 무드 · 당신만의 한 권' },
  { section: '인트로 화면', key: 'intro.meta',   label: '메타 정보',     selector: '#intro .intro-meta', default: 'BUSAN · MAY 29 · 2026<br>LIMITED EDITION No.0237/9999', html: true },
  { section: '인트로 화면', key: 'intro.cta',    label: '시작 버튼',     selector: '#intro .intro-cta',  default: '▸ 시작하기 [ENTER]' },

  /* GALLERY 화면 */
  { section: '책 선택 화면', key: 'gallery.brand',      label: '브랜드명',     selector: '#gallery .g-brand .name', default: '바인딩 클럽<small>BINDING CLUB · DESK</small>', html: true },
  { section: '책 선택 화면', key: 'gallery.meta',       label: '우상단 메타',  selector: '#gallery .g-meta',        default: 'ULTRA DEPT.STORE BUSAN · 2026.05.29<br><strong>★ DEMO ED. · No.0237 ★</strong>', html: true },
  { section: '책 선택 화면', key: 'gallery.headline',   label: '헤드라인',     selector: '#gallery .g-headline',    default: '오늘 어떤 <em>무드</em>로 만들까?', html: true },
  { section: '책 선택 화면', key: 'gallery.subline',    label: '서브카피',     selector: '#gallery .g-sub',         default: '5가지 책 무드 중 하나를 골라 시작합니다. 표지 위에 텍스트·캐릭터·스티커를 자유롭게 배치해 본인만의 한정판을 만드세요.', long: true },
  { section: '책 선택 화면', key: 'gallery.foot',       label: '푸터 안내',    selector: '#gallery .g-foot',        default: '▸ TAP A BOOK TO START · 책을 터치해 시작' },

  /* DESIGNER 화면 */
  { section: '디자이너 화면', key: 'designer.brand',    label: '브랜드명',     selector: '#designer .d-logo > div:nth-child(2)', default: '바인딩 클럽<small>★ DESIGNER</small>', html: true },
  { section: '디자이너 화면', key: 'designer.cat.label',label: '카테고리 라벨',selector: '#designer .d-side-l .d-label:nth-of-type(1)', default: 'CATEGORY' },
  { section: '디자이너 화면', key: 'designer.back',     label: '돌아가기 버튼',selector: '#designer .d-back',       default: '← 다른 책 고르기' },
  { section: '디자이너 화면', key: 'designer.tab.animal',label: '탭1 동물',    selector: '.cat-tab[data-cat="animal"]', default: '동물' },
  { section: '디자이너 화면', key: 'designer.tab.nature',label: '탭2 자연',    selector: '.cat-tab[data-cat="nature"]', default: '자연' },
  { section: '디자이너 화면', key: 'designer.tab.object',label: '탭3 사물',    selector: '.cat-tab[data-cat="object"]', default: '사물' },
  { section: '디자이너 화면', key: 'designer.tab.effect',label: '탭4 효과',    selector: '.cat-tab[data-cat="effect"]', default: '효과' },
  { section: '디자이너 화면', key: 'designer.text.placeholder', label: '텍스트 입력 placeholder', selector: '#newText', default: '제목·작가명·인용 한 줄...', attr: 'placeholder' },
  { section: '디자이너 화면', key: 'designer.btn.add',  label: '추가 버튼',    selector: '.dr-add',                 default: '+ 캔버스에 추가' },
  { section: '디자이너 화면', key: 'designer.btn.print',label: '인쇄 버튼',    selector: '.dr-print',               default: 'PRINT ▸ 인쇄 [P]' },
  { section: '디자이너 화면', key: 'designer.howto',    label: 'HOW TO 안내',  selector: '#designer .dr-info',      default: '<strong>★ HOW TO</strong>▸ 좌측 팔레트 = 클릭해서 추가<br>▸ 캔버스 요소 = 드래그로 이동<br>▸ 우하단 빨간 점 = 크기 조정<br>▸ 더블탭 = 텍스트 편집<br>▸ 클릭 → DEL = 삭제', html: true, long: true },

  /* PRINTING 화면 */
  { section: '인쇄 화면', key: 'printing.title',  label: '인쇄 중 타이틀', selector: '#printing .print-title', default: 'PRINTING ★' },
  { section: '인쇄 화면', key: 'printing.sub',    label: '인쇄 중 서브',   selector: '#printing .print-sub',   default: '레이저 프린터 출력 중 · 약 12초' },
  { section: '인쇄 화면', key: 'printing.done.msg',label: '완료 메시지',    selector: '#printDone .done-msg',   default: '한정판 <em>내 책</em><br>발행 완료!', html: true },
  { section: '인쇄 화면', key: 'printing.done.tag',label: '완료 카피',      selector: '#printDone .done-tag',   default: '"오늘 만든 한 권은 전 세계 단 하나의 굿즈입니다."' },
  { section: '인쇄 화면', key: 'printing.done.cta',label: '다시 버튼',      selector: '#printDone .done-cta',   default: '▸ 다른 책 만들기 [SPACE]' }
];

/* ---------- 2. BOOK CONFIGS (5권 책 데이터) ---------- */
/* 어드민에서 = 책별 label·name·en·작가명·표지 인용 직접 편집 */
window.BINDING_BOOKS = [
  { key: 'astro',   label: '점성술',     en: 'CAT ASTROLOGY', name: '고양이의 운세',   author: '— BY ASTRO_CAT · STELLA —' },
  { key: 'scatter', label: '콜라주',     en: 'SCATTERED',     name: '흩어진 발자국',   author: '— BY SOMMUNGCHI —' },
  { key: 'diagram', label: '다이어그램', en: 'THE DIAGRAM',   name: '묘학 입문',       author: '— BY DOTORI HANAL · 2026 —' },
  { key: 'pop',     label: '비비드 팝',  en: 'CRAZY MONDAY',  name: '춤추는 월요일',   author: '— BY CUPRAMENMAT —' },
  { key: 'manga',   label: '만화체',     en: 'CHEER UP!',     name: '반항하는 우유',   author: '— BY CHECK_MUNI —' }
];

/* ---------- 3. BG_POOL (배경 이미지 풀) ---------- */
/* uploads/ 폴더 사진 18장 = 시연용 기본 풀. 운영자가 어드민에서 = 가리기·편집·추가 가능. */
window.BINDING_BG_POOL = [
  { key: 'miffy_dot',     label: '미피 · 컨페티 도트',  src: 'uploads/Cute Miffy Wallpaper Aesthetic _ Pastel Confetti iPhone Background.jpeg', mood: 'cute' },
  { key: 'miffy_doodle',  label: '미피 · 학용품 두들',   src: 'uploads/🎀 aesthetic doodles on Miffy 🎀.jpeg', mood: 'cute' },
  { key: 'hbd_cake',      label: 'HBD · 케이크',         src: 'uploads/happy birthday to you illustration.jpeg', mood: 'pop' },
  { key: 'hbd_cats',      label: 'HBD · 고양이들',       src: 'uploads/Advocate-Art _ London - Seville - New York.jpeg', mood: 'illustration' },
  { key: 'neo_brutal',    label: '네오 브루탈',          src: 'uploads/Neo-Brutal English School_ Learn & Design.jpeg', mood: 'pop' },
  { key: 'comic_font',    label: '코믹 폰트 레이아웃',   src: 'uploads/How to use comic font ibis paint in creative layouts.jpeg', mood: 'manga' },
  { key: 'nyonyo',        label: 'Nyonyo Chanel',        src: 'uploads/Nyonyo Chanel Typeface Font.jpeg', mood: 'pop' },
  { key: 'awwwards',      label: 'Awwwards 패턴',        src: 'uploads/- Awwwards.jpeg', mood: 'editorial' },
  { key: 'pasted_a',      label: '패턴 A',               src: 'uploads/pasted-1778252399438-0.png', mood: 'pattern' },
  { key: 'pasted_b',      label: '패턴 B',               src: 'uploads/pasted-1778252475828-0.png', mood: 'pattern' },
  { key: 'pasted_c',      label: '패턴 C',               src: 'uploads/pasted-1778255346767-0.png', mood: 'pattern' },
  { key: 'pasted_d',      label: '패턴 D',               src: 'uploads/pasted-1778255456578-0.png', mood: 'pattern' },
  { key: 'sample_2',      label: '샘플 2',               src: 'uploads/2.jpg', mood: 'sample' },
  { key: 'down_10',       label: '다운로드 10',          src: 'uploads/다운로드 (10).jpeg', mood: 'sample' },
  { key: 'down_11',       label: '다운로드 11',          src: 'uploads/다운로드 (11).jpeg', mood: 'sample' },
  { key: 'down_13',       label: '다운로드 13',          src: 'uploads/다운로드 (13).webp', mood: 'sample' },
  { key: 'down_16',       label: '다운로드 16',          src: 'uploads/다운로드 (16).webp', mood: 'sample' },
  { key: 'down_17',       label: '다운로드 17',          src: 'uploads/다운로드 (17).webp', mood: 'sample' }
];

/* ---------- 4. FONT_POOL (폰트 풀) ---------- */
/* CSS 변수: --kr (한글 본문), --en (영문 헤더), --hand (손글씨) */
/* Google Fonts 자동 로드 (어드민 적용 시) */
window.BINDING_FONT_POOL = {
  kr: [
    { key: 'pretendard',  label: 'Pretendard (현재)',     family: "'Pretendard', system-ui, sans-serif", google: null /* CDN 별도 로드됨 */ },
    { key: 'noto_sans_kr',label: '노토 산스 KR',           family: "'Noto Sans KR', sans-serif",          google: 'Noto+Sans+KR:wght@400;700;900' },
    { key: 'noto_serif_kr',label:'노토 세리프 KR',         family: "'Noto Serif KR', serif",              google: 'Noto+Serif+KR:wght@400;700;900' },
    { key: 'nanum_myeongjo',label:'나눔 명조',             family: "'Nanum Myeongjo', serif",             google: 'Nanum+Myeongjo:wght@400;700;800' },
    { key: 'gowun_batang',label: '고운 바탕',              family: "'Gowun Batang', serif",               google: 'Gowun+Batang:wght@400;700' },
    { key: 'black_han',   label: '블랙 한 산스',           family: "'Black Han Sans', sans-serif",        google: 'Black+Han+Sans' },
    { key: 'jua',         label: '주아',                   family: "'Jua', sans-serif",                   google: 'Jua' },
    { key: 'do_hyeon',    label: '도현',                   family: "'Do Hyeon', sans-serif",              google: 'Do+Hyeon' },
    { key: 'gamja',       label: '감자꽃',                 family: "'Gamja Flower', cursive",             google: 'Gamja+Flower' },
    { key: 'hi_melody',   label: '하이 멜로디',            family: "'Hi Melody', cursive",                google: 'Hi+Melody' },
    { key: 'east_sea',    label: '동해 도카치',            family: "'East Sea Dokdo', cursive",           google: 'East+Sea+Dokdo' },
    { key: 'plex_kr',     label: 'IBM Plex Sans KR',       family: "'IBM Plex Sans KR', sans-serif",      google: 'IBM+Plex+Sans+KR:wght@400;500;700' }
  ],
  en: [
    { key: 'lilita',      label: 'Lilita One (현재)',      family: "'Lilita One', 'Pretendard', sans-serif", google: 'Lilita+One' },
    { key: 'anton',       label: 'Anton',                  family: "'Anton', sans-serif",                  google: 'Anton' },
    { key: 'bebas',       label: 'Bebas Neue',             family: "'Bebas Neue', sans-serif",             google: 'Bebas+Neue' },
    { key: 'cinzel',      label: 'Cinzel',                 family: "'Cinzel', serif",                      google: 'Cinzel:wght@500;700;900' },
    { key: 'inter',       label: 'Inter',                  family: "'Inter', sans-serif",                  google: 'Inter:wght@400;700;900' },
    { key: 'space_grot',  label: 'Space Grotesk',          family: "'Space Grotesk', sans-serif",          google: 'Space+Grotesk:wght@500;700' },
    { key: 'plex_mono',   label: 'IBM Plex Mono',          family: "'IBM Plex Mono', monospace",           google: 'IBM+Plex+Mono:wght@400;500;700' },
    { key: 'jet_mono',    label: 'JetBrains Mono',         family: "'JetBrains Mono', monospace",          google: 'JetBrains+Mono:wght@500;700' },
    { key: 'playfair',    label: 'Playfair Display',       family: "'Playfair Display', serif",            google: 'Playfair+Display:wght@400;700;900' },
    { key: 'oswald',      label: 'Oswald',                 family: "'Oswald', sans-serif",                 google: 'Oswald:wght@400;700' },
    { key: 'archivo',     label: 'Archivo Black',          family: "'Archivo Black', sans-serif",          google: 'Archivo+Black' }
  ],
  hand: [
    { key: 'caveat',      label: 'Caveat Brush (현재)',    family: "'Caveat Brush', cursive",              google: 'Caveat+Brush' },
    { key: 'permanent',   label: 'Permanent Marker',       family: "'Permanent Marker', cursive",          google: 'Permanent+Marker' },
    { key: 'pacifico',    label: 'Pacifico',               family: "'Pacifico', cursive",                  google: 'Pacifico' },
    { key: 'shadows',     label: 'Shadows Into Light',     family: "'Shadows Into Light', cursive",        google: 'Shadows+Into+Light' },
    { key: 'kalam',       label: 'Kalam',                  family: "'Kalam', cursive",                     google: 'Kalam:wght@400;700' },
    { key: 'patrick',     label: 'Patrick Hand',           family: "'Patrick Hand', cursive",              google: 'Patrick+Hand' }
  ]
};

})();
