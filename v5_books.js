/* ============================================
   BINDING CLUB v5 — BOOK CONFIGS
   Each book = mood + cover template + sticker pool + palette
   ============================================ */

const BOOK_CONFIGS = {

  /* 1. ASTRO — lavender, mystical cat */
  astro: {
    label: '점성술',
    en: 'CAT ASTROLOGY',
    name: '고양이의 운세',
    coverHTML: () => `
      <div class="num">01 · ASTRO</div>
      <div class="b-en">CAT ASTROLOGY</div>
      <h3 class="b-kr">고양이의<br>운세</h3>
      <div class="b-illo">${ICONS.catBlack.replace('viewBox="0 0 100 100"','viewBox="-10 -10 120 120"').replace('<svg ', '<svg style="overflow:visible" ')}</div>
      <div class="b-foot">— BY ASTRO_CAT · STELLA —</div>
    `,
    template: [
      { type: 'text', content: '고양이의', x: 36, y: 38, fs: 56, color: '#FBF2DD' },
      { type: 'text', content: '운세', x: 36, y: 100, fs: 80, color: '#FBD449' },
      { type: 'text', content: 'CAT ASTROLOGY · 2026', x: 36, y: 200, fs: 14, color: '#1F1F1D', font: "'Lilita One', sans-serif" },
      { type: 'sticker', name: 'catBlack', x: 130, y: 260, size: 220 },
      { type: 'sticker', name: 'moon', x: 360, y: 70, size: 80 },
      { type: 'sticker', name: 'star', x: 50, y: 540, size: 50 },
      { type: 'sticker', name: 'sparkle', x: 380, y: 510, size: 60 },
      { type: 'sticker', name: 'star', x: 100, y: 590, size: 40 },
      { type: 'text', content: '— BY ASTRO_CAT —', x: 36, y: 630, fs: 12, color: '#FBF2DD', font: "'Lilita One', sans-serif" }
    ],
    stickers: ['catBlack','cat','catCalico','moon','star','sparkle','heart','heartPink','flower','cloud','dot','dotYellow','dotSky','smile'],
    bgPattern: 'radial-gradient(circle at 18% 28%, rgba(255,255,255,0.5) 0 1.5px, transparent 2px), radial-gradient(circle at 78% 60%, rgba(255,255,255,0.4) 0 1.2px, transparent 2px), radial-gradient(circle at 35% 75%, rgba(251,212,73,0.45) 0 2px, transparent 3px), radial-gradient(circle at 65% 18%, rgba(255,255,255,0.5) 0 1px, transparent 2px), radial-gradient(circle at 90% 35%, rgba(251,212,73,0.4) 0 1.5px, transparent 2px)',
    bgSize: 'auto'
  },

  /* 2. SCATTER — cream, scattered animals/dots */
  scatter: {
    label: '콜라주',
    en: 'SCATTERED',
    name: '흩어진 발자국',
    coverHTML: () => `
      <div class="num">02 · SCATTER</div>
      <div class="b-en">SCATTERED</div>
      <h3 class="b-kr">흩어진<br>발자국</h3>
      <div class="b-illo"><div class="scatter-grid">
        ${ICONS.bunny}${ICONS.cat}${ICONS.catBlack}
        ${ICONS.bird}${ICONS.heart}${ICONS.dog}
        ${ICONS.flower}${ICONS.star}${ICONS.dotSky}
      </div></div>
      <div class="b-foot">— BY SOMMUNGCHI —</div>
    `,
    template: [
      { type: 'text', content: '흩어진', x: 30, y: 36, fs: 52, color: '#1F1F1D' },
      { type: 'text', content: '발자국', x: 30, y: 96, fs: 64, color: '#E64535' },
      { type: 'text', content: 'A JOURNAL OF SMALL ADVENTURES', x: 30, y: 178, fs: 12, color: '#1F1F1D', font: "'Lilita One', sans-serif" },
      { type: 'sticker', name: 'bunny', x: 50, y: 220, size: 100 },
      { type: 'sticker', name: 'cat', x: 200, y: 240, size: 110 },
      { type: 'sticker', name: 'catBlack', x: 350, y: 220, size: 90 },
      { type: 'sticker', name: 'bird', x: 80, y: 360, size: 80 },
      { type: 'sticker', name: 'dog', x: 220, y: 380, size: 100 },
      { type: 'sticker', name: 'flower', x: 360, y: 360, size: 80 },
      { type: 'sticker', name: 'heart', x: 80, y: 510, size: 60 },
      { type: 'sticker', name: 'star', x: 200, y: 510, size: 70 },
      { type: 'sticker', name: 'dotSky', x: 340, y: 510, size: 60 },
      { type: 'text', content: '— BY SOMMUNGCHI —', x: 30, y: 630, fs: 12, color: '#E64535', font: "'Lilita One', sans-serif" }
    ],
    stickers: ['bunny','cat','catBlack','catCalico','dog','bear','fox','bird','flower','heart','heartPink','star','sparkle','dot','dotYellow','dotSky','smile','cherry'],
    bgPattern: 'radial-gradient(circle at 1px 1px, rgba(230,69,53,0.25) 1.4px, transparent 1.4px)',
    bgSize: '20px 20px'
  },

  /* 3. DIAGRAM — sky blue, studious bear */
  diagram: {
    label: '다이어그램',
    en: 'DIAGRAM',
    name: '묘학 입문',
    coverHTML: () => `
      <div class="num">03 · DIAGRAM</div>
      <div class="b-en">THE DIAGRAM</div>
      <h3 class="b-kr">묘학<br>입문</h3>
      <div class="b-illo">${ICONS.bear}</div>
      <div class="b-foot">— BY DOTORI HANAL · 2026 —</div>
    `,
    template: [
      { type: 'text', content: '묘학', x: 30, y: 30, fs: 100, color: '#1F1F1D' },
      { type: 'text', content: '입문', x: 30, y: 140, fs: 100, color: '#1F1F1D' },
      { type: 'text', content: 'THE DIAGRAM OF WONDER · vol.01', x: 30, y: 250, fs: 12, color: '#E64535', font: "'Lilita One', sans-serif" },
      { type: 'text', content: '— Fig.01 —', x: 30, y: 280, fs: 11, color: '#1F1F1D', font: "'Lilita One', sans-serif" },
      { type: 'sticker', name: 'bear', x: 180, y: 310, size: 160 },
      { type: 'sticker', name: 'book', x: 70, y: 480, size: 90 },
      { type: 'sticker', name: 'pencil', x: 290, y: 490, size: 100 },
      { type: 'sticker', name: 'leaf', x: 200, y: 510, size: 70 },
      { type: 'text', content: '— BY DOTORI HANAL —', x: 30, y: 630, fs: 11, color: '#1F1F1D', font: "'Lilita One', sans-serif" }
    ],
    stickers: ['bear','dog','fox','bunny','cat','book','pencil','notebook','leaf','tree','cloud','sun','moon','star','flower','speech','arrow','dotSky'],
    bgPattern: 'linear-gradient(rgba(0,0,0,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.09) 1px, transparent 1px)',
    bgSize: '18px 18px'
  },

  /* 4. POP — red, dancing bunny */
  pop: {
    label: '비비드 팝',
    en: 'CRAZY POP',
    name: '춤추는 월요일',
    coverHTML: () => `
      <div class="num">04 · POP</div>
      <div class="b-en">CRAZY MONDAY</div>
      <h3 class="b-kr">춤추는<br>월요일</h3>
      <div class="b-illo">${ICONS.bunny}</div>
      <div class="b-foot">— BY CUPRAMENMAT —</div>
    `,
    template: [
      { type: 'text', content: '춤추는', x: 36, y: 36, fs: 70, color: '#FBF2DD' },
      { type: 'text', content: '월요일', x: 36, y: 116, fs: 70, color: '#FBD449' },
      { type: 'text', content: 'CRAZY MONDAY DIARY', x: 36, y: 210, fs: 16, color: '#FBF2DD', font: "'Lilita One', sans-serif" },
      { type: 'sticker', name: 'bunny', x: 160, y: 270, size: 220 },
      { type: 'sticker', name: 'music', x: 50, y: 300, size: 70 },
      { type: 'sticker', name: 'sparkle', x: 380, y: 300, size: 70 },
      { type: 'sticker', name: 'heart', x: 70, y: 510, size: 60 },
      { type: 'sticker', name: 'lightning', x: 380, y: 520, size: 70 },
      { type: 'text', content: '— BY CUPRAMENMAT —', x: 36, y: 630, fs: 12, color: '#FBD449', font: "'Lilita One', sans-serif" }
    ],
    stickers: ['bunny','cat','heart','heartPink','music','sparkle','star','lightning','balloon','ribbon','lollipop','cake','cherry','smile','dotYellow','rainbow','flower','boom'],
    bgPattern: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 1px)',
    bgSize: '14px 14px'
  },

  /* 5. MANGA — yellow, lightning rebel cat */
  manga: {
    label: '만화체',
    en: 'NEON MANGA',
    name: '반항하는 우유',
    coverHTML: () => `
      <div class="num">05 · MANGA</div>
      <div class="b-en">CHEER UP!</div>
      <h3 class="b-kr">반항하는<br>우유</h3>
      <div class="b-illo">${ICONS.lightning}</div>
      <div class="b-foot">— BY CHECK_MUNI —</div>
    `,
    template: [
      { type: 'text', content: '반항하는', x: 30, y: 36, fs: 56, color: '#1F1F1D' },
      { type: 'text', content: '우유', x: 30, y: 110, fs: 88, color: '#E64535' },
      { type: 'text', content: 'CHEER UP!', x: 30, y: 220, fs: 22, color: '#1F1F1D', font: "'Lilita One', sans-serif" },
      { type: 'sticker', name: 'lightning', x: 220, y: 280, size: 200 },
      { type: 'sticker', name: 'boom', x: 50, y: 460, size: 90 },
      { type: 'sticker', name: 'sparkle', x: 360, y: 460, size: 70 },
      { type: 'sticker', name: 'star', x: 240, y: 540, size: 70 },
      { type: 'sticker', name: 'arrow', x: 130, y: 555, size: 60 },
      { type: 'text', content: '— BY CHECK_MUNI —', x: 30, y: 630, fs: 12, color: '#1F1F1D', font: "'Lilita One', sans-serif" }
    ],
    stickers: ['lightning','boom','sparkle','star','arrow','speech','music','heart','smile','catBlack','frog','fish','cassette','camera','envelope','rainbow','dot','dotSky'],
    bgPattern: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.05) 0 8px, transparent 8px 18px)',
    bgSize: 'auto'
  }
};

window.BOOK_CONFIGS = BOOK_CONFIGS;
window.BOOK_ORDER = ['astro','scatter','diagram','pop','manga'];
