import React, { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";
import {
  Sun, BookOpen, Calculator, Languages, Film, Crown, Grid3x3,
  CheckCircle2, Circle, Star, Flame, Bell, ChevronLeft, RotateCcw,
  Lightbulb, PartyPopper, Plus, X, Camera, Play, Sparkles, Trophy,
  Music, Mic, Pause, Volume2, Minus, Dumbbell, Waves, CalendarDays,
  Drama, Disc3, Tv, Lock, Heart
} from "lucide-react";

/* ============================ İÇERİK BANKALARI ============================ */

const VOCAB = [
  ["summer","yaz","I love summer holidays."],["holiday","tatil","We are on holiday."],
  ["beach","plaj","Let's go to the beach."],["sun","güneş","The sun is bright."],
  ["water","su","I drink water."],["book","kitap","This is my book."],
  ["read","okumak","I read every day."],["write","yazmak","I write a story."],
  ["friend","arkadaş","She is my best friend."],["family","aile","My family is big."],
  ["morning","sabah","Good morning!"],["night","gece","Good night."],
  ["happy","mutlu","I am happy today."],["garden","bahçe","We have a garden."],
  ["tree","ağaç","The tree is tall."],["flower","çiçek","A red flower."],
  ["animal","hayvan","A wild animal."],["dog","köpek","My dog is friendly."],
  ["cat","kedi","The cat sleeps."],["bird","kuş","A bird is singing."],
  ["food","yemek","I like this food."],["apple","elma","An apple a day."],
  ["bread","ekmek","Fresh bread is nice."],["milk","süt","I drink milk."],
  ["school","okul","School is fun."],["teacher","öğretmen","My teacher is kind."],
  ["learn","öğrenmek","I learn English."],["play","oynamak","Let's play a game."],
  ["game","oyun","This game is easy."],["win","kazanmak","I want to win."],
  ["run","koşmak","I run fast."],["jump","zıplamak","Frogs jump high."],
  ["swim","yüzmek","I can swim."],["draw","çizmek","I draw a picture."],
  ["color","renk","My favorite color is blue."],["blue","mavi","The sky is blue."],
  ["red","kırmızı","A red car."],["green","yeşil","Green grass."],
  ["yellow","sarı","A yellow sun."],["small","küçük","A small box."],
  ["big","büyük","A big house."],["fast","hızlı","A fast train."],
  ["slow","yavaş","A slow turtle."],["new","yeni","A new phone."],
  ["old","eski","An old map."],["clean","temiz","A clean room."],
  ["help","yardım etmek","Can you help me?"],["open","açmak","Open the door."],
  ["close","kapatmak","Close the window."],["start","başlamak","Let's start now."],
  ["finish","bitirmek","I finish my homework."],["think","düşünmek","Think first."],
  ["know","bilmek","I know the answer."],["want","istemek","I want pizza."],
  ["need","ihtiyaç duymak","I need water."],["give","vermek","Give me the ball."],
  ["take","almak","Take this pen."],["make","yapmak","I make a cake."],
  ["use","kullanmak","Use a pencil."],["find","bulmak","I find my keys."],
  ["look","bakmak","Look at the stars."],["listen","dinlemek","Listen to music."],
  ["speak","konuşmak","I speak English."],["walk","yürümek","We walk to school."],
  ["sleep","uyumak","I sleep at ten."],["dream","rüya / hayal","I have a dream."],
  ["smile","gülümsemek","She has a nice smile."],["laugh","gülmek","We laugh a lot."],
  ["cold","soğuk","The water is cold."],["hot","sıcak","The soup is hot."],
  ["rain","yağmur","It is raining."],["cloud","bulut","White clouds."],
  ["star","yıldız","Count the stars."],["moon","ay","The moon is full."],
  ["sea","deniz","The sea is calm."],["mountain","dağ","A high mountain."],
  ["city","şehir","A big city."],["road","yol","A long road."],
  ["car","araba","A blue car."],["train","tren","The train is late."],
  ["money","para","I save money."],["time","zaman","What time is it?"],
  ["day","gün","Have a nice day."],["week","hafta","Next week."],
  ["question","soru","A hard question."],["answer","cevap","The right answer."],
  ["story","hikaye","A short story."],["music","müzik","I love music."],
];

// İspanyolca başlangıç bankası (çevrimdışı yedek + günlük takip) [es, tr]
const SPANISH = [
  ["hola","merhaba"],["adiós","hoşça kal"],["gracias","teşekkürler"],["por favor","lütfen"],
  ["sí","evet"],["no","hayır"],["agua","su"],["comida","yemek"],["casa","ev"],["perro","köpek"],
  ["gato","kedi"],["sol","güneş"],["luna","ay"],["día","gün"],["noche","gece"],["amigo","arkadaş"],
  ["familia","aile"],["niño","çocuk"],["niña","kız çocuk"],["libro","kitap"],["escuela","okul"],
  ["maestro","öğretmen"],["rojo","kırmızı"],["azul","mavi"],["verde","yeşil"],["amarillo","sarı"],
  ["grande","büyük"],["pequeño","küçük"],["bueno","iyi"],["malo","kötü"],["feliz","mutlu"],
  ["comer","yemek (fiil)"],["beber","içmek"],["jugar","oynamak"],["leer","okumak"],["escribir","yazmak"],
  ["correr","koşmak"],["dormir","uyumak"],["hablar","konuşmak"],["ver","görmek"],["flor","çiçek"],
  ["árbol","ağaç"],["mar","deniz"],["montaña","dağ"],["ciudad","şehir"],["coche","araba"],
  ["hoy","bugün"],["mañana","yarın"],["manzana","elma"],["pan","ekmek"],["leche","süt"],["tiempo","zaman"],
];

const MEB = {
  "Matematik": [
    { q: "Bir düzgün altıgenin kaç kenarı vardır?", c: ["4","5","6","8"], a: 2 },
    { q: "0,75 ondalık sayısı kesir olarak nedir?", c: ["1/2","3/4","2/3","7/5"], a: 1 },
    { q: "12 ve 18 sayılarının EBOB'u kaçtır?", c: ["3","6","9","12"], a: 1 },
    { q: "Bir dikdörtgenin alanı 24 cm², kısa kenarı 4 cm ise uzun kenarı kaç cm?", c: ["5","6","8","12"], a: 1 },
    { q: "(-3) + (+7) işleminin sonucu kaçtır?", c: ["-4","4","10","-10"], a: 1 },
  ],
  "Fen Bilimleri": [
    { q: "Güneş sistemindeki en büyük gezegen hangisidir?", c: ["Dünya","Mars","Jüpiter","Venüs"], a: 2 },
    { q: "Bitkiler besinlerini hangi olayla üretir?", c: ["Solunum","Fotosentez","Terleme","Sindirim"], a: 1 },
    { q: "Vücudumuzda kanı pompalayan organ hangisidir?", c: ["Akciğer","Mide","Kalp","Böbrek"], a: 2 },
    { q: "Suyun donma sıcaklığı kaç °C'dir?", c: ["0","10","50","100"], a: 0 },
    { q: "Maddenin ısı alarak katıdan sıvıya geçmesine ne denir?", c: ["Donma","Erime","Buharlaşma","Yoğuşma"], a: 1 },
  ],
  "Türkçe": [
    { q: "'Kitabı masaya koydum.' cümlesinde yüklem hangisidir?", c: ["Kitabı","masaya","koydum","Hiçbiri"], a: 2 },
    { q: "Aşağıdakilerden hangisi eş anlamlı kelime çiftidir?", c: ["sıcak-soğuk","yıl-sene","gece-gündüz","büyük-küçük"], a: 1 },
    { q: "'mutlu' kelimesinin zıt anlamlısı hangisidir?", c: ["sevinçli","neşeli","üzgün","keyifli"], a: 2 },
    { q: "'Çiçekler açtı.' cümlesinde özne hangisidir?", c: ["Çiçekler","açtı","cümlede yok","Çiçekler açtı"], a: 0 },
    { q: "Aşağıdakilerden hangisi bir noktalama işaretidir?", c: ["a","virgül","ünlem işareti","ikisi de (virgül ve ünlem)"], a: 3 },
  ],
  "Sosyal Bilgiler": [
    { q: "Türkiye'nin başkenti neresidir?", c: ["İstanbul","Ankara","İzmir","Bursa"], a: 1 },
    { q: "Pusulanın gösterdiği yön hangisidir?", c: ["Güney","Doğu","Kuzey","Batı"], a: 2 },
    { q: "Bir yerin yükseklik ve şekillerini gösteren çizime ne denir?", c: ["Plan","Kroki","Harita","Resim"], a: 2 },
    { q: "29 Ekim hangi bayramdır?", c: ["23 Nisan","Cumhuriyet Bayramı","30 Ağustos","19 Mayıs"], a: 1 },
    { q: "Dünya'nın kendi etrafında dönmesi neye sebep olur?", c: ["Mevsimler","Gece ve gündüz","Yağmur","Rüzgâr"], a: 1 },
  ],
  "İngilizce": [
    { q: "'Apple' kelimesinin Türkçesi nedir?", c: ["armut","elma","muz","çilek"], a: 1 },
    { q: "How ___ you? (boşluğa ne gelir?)", c: ["is","am","are","be"], a: 2 },
    { q: "'Pazartesi' İngilizcede nedir?", c: ["Sunday","Monday","Friday","Tuesday"], a: 1 },
    { q: "I ___ a student. (boşluk)", c: ["am","is","are","be"], a: 0 },
    { q: "'Blue' hangi renktir?", c: ["kırmızı","yeşil","mavi","sarı"], a: 2 },
  ],
};

const ENGLISH_TASKS = [
  { type: "Storytel kitap", text: "Storytel'de seçtiğin bir İngilizce çocuk kitabını 10 dakika dinle.", icon: "📖" },
  { type: "YouTube video", text: "Kolay İngilizce çizgi film / şarkı izle (ör. Peppa Pig, Super Simple Songs).", icon: "▶️" },
  { type: "Konuşma", text: "Bugün öğrendiğin 3 kelimeyle yüksek sesle birer cümle kur.", icon: "🗣️" },
];

const ENGLISH_QUIZ = [
  { q: "'Good morning' ne demek?", c: ["İyi geceler","Günaydın","Hoşça kal","Teşekkürler"], a: 1 },
  { q: "'Thank you' cevabı olarak ne deriz?", c: ["You're welcome","Good night","Hello","Goodbye"], a: 0 },
  { q: "'Cat' nedir?", c: ["köpek","kuş","kedi","balık"], a: 2 },
  { q: "What's your ___? (ismini sorarken)", c: ["age","name","color","food"], a: 1 },
  { q: "'Big' kelimesinin zıttı nedir?", c: ["small","tall","fast","new"], a: 0 },
  { q: "'I like ___' (severim) cümlesi doğru mu kuruluyor: I like pizza?", c: ["Evet doğru","Hayır yanlış"], a: 0 },
];

// Satranç: başlangıç için 1 hamlede mat bulmacaları (yaşa uygun)
const CHESS = [
  {
    desc: "Beyaz oynar — 1 hamlede mat. (Kale arka sırada)",
    board: ["......k.", ".....ppp", "........", "........", "........", "........", "........", "R.....K."],
    from: "a1", to: "a8", hint: "Kaleni boş bir sütundan en üst sıraya gönder.",
  },
  {
    desc: "Beyaz oynar — 1 hamlede mat. (İki kale merdiveni)",
    board: [".......k", "R.......", "........", "........", "........", "........", "........", "KR......"],
    from: "b1", to: "b8", hint: "Alttaki kaleni şahın olduğu sıraya çek.",
  },
  {
    desc: "Beyaz oynar — 1 hamlede mat. (Vezir + şah)",
    board: [".......k", "........", "......K.", "........", "........", "........", "........", "......Q."],
    from: "g1", to: "g7", hint: "Vezirini şahının yanına, kralın önüne koy.",
  },
  {
    desc: "Beyaz oynar — 1 hamlede mat. (Vezirle arka sıra)",
    board: ["......k.", ".....ppp", "........", "........", "........", "........", "........", "...Q..K."],
    from: "d1", to: "d8", hint: "Vezirini en üst sıraya çıkar.",
  },
  {
    desc: "Beyaz oynar — 1 hamlede mat. (Vezirle köşeden)",
    board: ["......k.", ".....ppp", "........", "........", "........", "........", "........", "Q.....K."],
    from: "a1", to: "a8", hint: "Vezirini boş a sütunundan yukarı sür.",
  },
];

const PIECE = { K:"♔",Q:"♕",R:"♖",B:"♗",N:"♘",P:"♙",k:"♚",q:"♛",r:"♜",b:"♝",n:"♞",p:"♟" };

const WEEKDAYS = [["pzt", "Pazartesi"], ["sal", "Salı"], ["car", "Çarşamba"], ["per", "Perşembe"], ["cum", "Cuma"], ["cmt", "Cumartesi"], ["paz", "Pazar"]];
const WD_ORDER = ["paz", "pzt", "sal", "car", "per", "cum", "cmt"]; // JS getDay() sırası
const weekdayKey = () => WD_ORDER[new Date().getDay()];
const READ_TARGET = 2;

// Tüm aktiviteler kataloğu
const ACT = {
  read: { label: "Kitap okuma — 2 seans", short: "Kitap", icon: BookOpen, color: "bg-orange-500", route: ["reading", null] },
  tonguc: { label: "Tonguç + MEB", short: "Tonguç", icon: Play, color: "bg-rose-500", route: ["study", "tonguc"] },
  words: { label: "İngilizce 10 kelime", short: "Kelime", icon: Languages, color: "bg-violet-500", route: ["study", "words"] },
  training: { label: "Antrenman", short: "Antrenman", icon: Dumbbell, color: "bg-red-500", route: ["sport", "training"] },
  swim: { label: "Yüzme", short: "Yüzme", icon: Waves, color: "bg-cyan-500", route: ["sport", "swim"] },
  math: { label: "Matematik testi", short: "Matematik", icon: Calculator, color: "bg-sky-500", route: ["study", "math"] },
  english: { label: "İngilizce video/kitap", short: "İngilizce", icon: Languages, color: "bg-emerald-500", route: ["study", "english"] },
  spanish: { label: "İspanyolca challenge", short: "İspanyolca", icon: Languages, color: "bg-amber-600", route: ["study", "words"] },
  chess: { label: "Satranç", short: "Satranç", icon: Crown, color: "bg-amber-500", route: ["games", "chess"] },
  sudoku: { label: "Sudoku", short: "Sudoku", icon: Grid3x3, color: "bg-fuchsia-500", route: ["games", "sudoku"] },
  guitar: { label: "Gitar", short: "Gitar", icon: Music, color: "bg-rose-400", route: ["music", null] },
  culture: { label: "Kültür günlüğü", short: "Kültür", icon: Film, color: "bg-indigo-500", route: ["library", null] },
  drawing: { label: "Çizim", short: "Çizim", icon: Sparkles, color: "bg-pink-500", route: ["sport", "draw"] },
};
const LOCKED = ["read", "tonguc", "words", "training"]; // her gün sabit, değiştirilemez
const OPTIONAL = ["swim", "math", "english", "spanish", "chess", "sudoku", "guitar", "culture", "drawing"];

const MODES = {
  tatil: { label: "Tatilde", emoji: "🏖️", opt: ["swim", "english", "culture", "guitar", "chess", "drawing"] },
  ev: { label: "Evde", emoji: "🏠", opt: ["swim", "math", "chess", "sudoku", "spanish", "guitar", "culture"] },
  londra: { label: "Londra'da", emoji: "🇬🇧", opt: ["english", "culture", "swim", "chess", "drawing"] },
};
const defaultWeek = (mode) => Object.fromEntries(WEEKDAYS.map(([k]) => [k, [...(MODES[mode] || MODES.tatil).opt]]));
const plannedFor = (week, wd) => [...LOCKED, ...((week?.[wd]) || [])].filter((k, i, a) => a.indexOf(k) === i);
const ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const isActDone = (day, k) => k === "read" ? (day?.read || 0) >= READ_TARGET : !!day?.tasks?.[k];

/* ============================ YARDIMCILAR ============================ */

const ri = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const shuffle = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = ri(0, i);[a[i], a[j]] = [a[j], a[i]]; } return a; };
const todayKey = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const dayIndex = (start) => { const ms = new Date(todayKey()) - new Date(start); return Math.max(0, Math.floor(ms / 86400000)); };

function distractors(ans) {
  const set = new Set([ans]);
  while (set.size < 4) {
    const delta = ri(1, Math.max(3, Math.round(Math.abs(ans) * 0.25) + 2));
    const cand = Math.random() < 0.5 ? ans + delta : ans - delta;
    if (cand !== ans) set.add(cand);
  }
  return shuffle([...set]);
}

function makeMath() {
  const t = ri(0, 9);
  let q, a;
  if (t === 0) { const x = ri(12, 99), y = ri(2, 9); q = `${x} × ${y} = ?`; a = x * y; }
  else if (t === 1) { const y = ri(2, 9), c = ri(3, 12); q = `${y * c} ÷ ${y} = ?`; a = c; }
  else if (t === 2) { const p = [10, 20, 25, 50][ri(0, 3)]; const x = p === 25 ? ri(1, 8) * 4 : p === 50 ? ri(1, 9) * 2 : ri(1, 9) * 10; q = `${x} sayısının %${p}'i kaçtır?`; a = (x * p) / 100; }
  else if (t === 3) { const b = [2, 3, 4, 5][ri(0, 3)]; const x = ri(2, 8) * b; const num = ri(1, b - 1) || 1; q = `${x} sayısının ${num}/${b}'i kaçtır?`; a = (x / b) * num; }
  else if (t === 4) { const x = ri(10, 90) / 10, y = ri(10, 90) / 10; q = `${x.toFixed(1)} + ${y.toFixed(1)} = ?`; a = Math.round((x + y) * 10) / 10; }
  else if (t === 5) { const a1 = ri(2, 12), b = ri(2, 9), c = ri(2, 9); q = `${a1} + ${b} × ${c} = ?  (işlem önceliği)`; a = a1 + b * c; }
  else if (t === 6) { const x = ri(2, 20), s = ri(x + 1, 40); q = `x + ${x} = ${s} ise x kaçtır?`; a = s - x; }
  else if (t === 7) { const en = ri(3, 15), boy = ri(3, 15); q = `Kenarları ${en} cm ve ${boy} cm olan dikdörtgenin alanı kaç cm²?`; a = en * boy; }
  else if (t === 8) { const en = ri(3, 15), boy = ri(3, 15); q = `Kenarları ${en} cm ve ${boy} cm olan dikdörtgenin çevresi kaç cm?`; a = 2 * (en + boy); }
  else { const x = ri(20, 99), y = ri(11, x - 1); q = `${x} − ${y} = ?`; a = x - y; }
  return { q, a, choices: distractors(a) };
}

// Challenge için çevrimdışı soru üretici (internet yoksa)
function offlineQuestions(lang, dir, count) {
  const bank = lang === "en" ? VOCAB.map((v) => [v[0], v[1]]) : SPANISH;
  return shuffle(bank).slice(0, count).map(([foreign, tr]) => {
    const showForeign = dir === "toTr";
    const answer = showForeign ? tr : foreign;
    const prompt = showForeign ? foreign : tr;
    const pool = bank.map((b) => (showForeign ? b[1] : b[0])).filter((x) => x !== answer);
    const choices = shuffle([answer, ...shuffle(pool).slice(0, 3)]);
    return { q: prompt, c: choices, a: choices.indexOf(answer) };
  });
}

// Sudoku üretici
function genSudoku(n, br, bc, holes) {
  const g = Array.from({ length: n }, () => Array(n).fill(0));
  const ok = (r, c, v) => {
    for (let i = 0; i < n; i++) if (g[r][i] === v || g[i][c] === v) return false;
    const r0 = Math.floor(r / br) * br, c0 = Math.floor(c / bc) * bc;
    for (let i = 0; i < br; i++) for (let j = 0; j < bc; j++) if (g[r0 + i][c0 + j] === v) return false;
    return true;
  };
  const fill = (p) => {
    if (p === n * n) return true;
    const r = Math.floor(p / n), c = p % n;
    for (const v of shuffle([...Array(n)].map((_, i) => i + 1))) {
      if (ok(r, c, v)) { g[r][c] = v; if (fill(p + 1)) return true; g[r][c] = 0; }
    }
    return false;
  };
  fill(0);
  const solution = g.map((row) => [...row]);
  const puzzle = g.map((row) => [...row]);
  let removed = 0;
  while (removed < holes) {
    const r = ri(0, n - 1), c = ri(0, n - 1);
    if (puzzle[r][c] !== 0) { puzzle[r][c] = 0; removed++; }
  }
  return { puzzle, solution, n, br, bc };
}

/* ============================ DEPOLAMA ============================ */

const KEY = "aryasu_yaz_v1";
async function loadData() {
  try { const r = await window.storage.get(KEY); return r ? JSON.parse(r.value) : null; } catch { return null; }
}
async function saveData(d) {
  try { await window.storage.set(KEY, JSON.stringify(d)); } catch (e) { /* sessiz */ }
}

const freshData = () => ({
  start: todayKey(),
  days: {},
  stars: 0,
  mode: "tatil",
  week: defaultWeek("tatil"),
  media: [],
  uploads: [],
  practice: { en: 0, es: 0 },
});

/* ============================ ANA UYGULAMA ============================ */

export default function App() {
  const [data, setData] = useState(null);
  const [view, setView] = useState("home");
  const [active, setActive] = useState(null); // hangi modül açık
  const saveTimer = useRef(null);

  useEffect(() => {
    loadData().then((d) => {
      if (!d) { setData(freshData()); return; }
      const merged = { ...freshData(), ...d };
      if (!merged.week) merged.week = defaultWeek(merged.mode || "tatil");
      if (!merged.media) merged.media = [];
      setData(merged);
    });
  }, []);

  useEffect(() => {
    if (!data) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => saveData(data), 400);
  }, [data]);

  const tk = todayKey();
  const today = (data?.days?.[tk]) || { tasks: {} };

  const completeTask = useCallback((key) => {
    setData((d) => {
      const days = { ...d.days };
      const day = { ...(days[tk] || { tasks: {} }) };
      day.tasks = { ...day.tasks };
      if (!day.tasks[key]) {
        day.tasks[key] = true;
        days[tk] = day;
        return { ...d, days, stars: d.stars + 1 };
      }
      return d;
    });
  }, [tk]);

  const addPractice = useCallback((langKey, n) => {
    if (!n) return;
    setData((d) => ({ ...d, practice: { en: 0, es: 0, ...(d.practice || {}), [langKey]: ((d.practice?.[langKey]) || 0) + n } }));
  }, []);

  const logReading = useCallback(() => {
    setData((d) => {
      const days = { ...d.days };
      const day = { ...(days[tk] || { tasks: {} }) };
      day.read = (day.read || 0) + 1;
      days[tk] = day;
      return { ...d, days, stars: d.stars + 1 };
    });
  }, [tk]);

  const setMode = useCallback((m) => setData((d) => ({ ...d, mode: m, week: defaultWeek(m) })), []);

  const toggleDay = useCallback((dayK, actK) => setData((d) => {
    const week = { ...(d.week || {}) };
    const set = new Set(week[dayK] || []);
    set.has(actK) ? set.delete(actK) : set.add(actK);
    week[dayK] = [...set];
    return { ...d, week };
  }), []);

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center bg-amber-50 text-amber-700 font-bold">Yükleniyor…</div>;
  }

  const todayActs = plannedFor(data.week, weekdayKey());
  const doneCount = todayActs.filter((k) => isActDone(today, k)).length;
  const goalMet = todayActs.length > 0 && doneCount === todayActs.length;

  // streak: planlanan her aktivite o gün tamamlandıysa
  let streak = 0;
  { let probe = new Date(tk);
    for (;;) {
      const k = ymd(probe);
      const dd = data.days[k];
      const planned = plannedFor(data.week, WD_ORDER[probe.getDay()]);
      const full = dd && planned.length > 0 && planned.every((x) => isActDone(dd, x));
      if (full) { streak++; probe.setDate(probe.getDate() - 1); } else break;
    }
  }

  const back = () => { setView("home"); setActive(null); };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-amber-50 to-rose-50 text-slate-800 pb-24"
         style={{ fontFamily: "'Quicksand', ui-rounded, 'Nunito', system-ui, sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&family=Fredoka:wght@600;700&display=swap');`}</style>

      {/* Üst başlık */}
      <header className="px-5 pt-6 pb-4">
        {view === "home" ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-amber-600 tracking-wide">ARYASU'NUN YAZ MACERASI ☀️</p>
              <h1 className="text-2xl text-slate-800" style={{ fontFamily: "'Fredoka', sans-serif" }}>Bugün ne yapıyoruz?</h1>
            </div>
            <div className="flex gap-2">
              <Badge icon={<Flame size={16} />} value={streak} label="gün" tone="bg-orange-500" />
              <Badge icon={<Star size={16} />} value={data.stars} label="yıldız" tone="bg-amber-400" />
            </div>
          </div>
        ) : (
          <button onClick={back} className="flex items-center gap-1 text-slate-600 font-bold">
            <ChevronLeft size={22} /> Ana sayfa
          </button>
        )}
      </header>

      <main className="px-5">
        {view === "home" && (
          <Home data={data} today={today} todayActs={todayActs} doneCount={doneCount} goalMet={goalMet}
                open={(v, a) => { setView(v); setActive(a); }} onPlan={() => { setView("plan"); setActive(null); }} />
        )}
        {view === "plan" && <Planner data={data} setMode={setMode} toggleDay={toggleDay} />}
        {view === "study" && active === "tonguc" && <Tonguc onDone={() => completeTask("tonguc")} done={!!today.tasks?.tonguc} />}
        {view === "study" && active === "words" && <Words dayIdx={dayIndex(data.start)} onDone={() => completeTask("words")} done={!!today.tasks?.words} award={addPractice} />}
        {view === "study" && active === "math" && <MathQuiz onDone={() => completeTask("math")} done={!!today.tasks?.math} />}
        {view === "study" && active === "english" && <English dayIdx={dayIndex(data.start)} onDone={() => completeTask("english")} done={!!today.tasks?.english} />}
        {view === "games" && active === "chess" && <Chess dayIdx={dayIndex(data.start)} onDone={() => completeTask("chess")} done={!!today.tasks?.chess} />}
        {view === "games" && active === "sudoku" && <Sudoku onDone={() => completeTask("sudoku")} done={!!today.tasks?.sudoku} />}
        {view === "reading" && <Reading day={today} onSession={logReading} />}
        {view === "sport" && <Sport sub={active} day={today} complete={completeTask} />}
        {view === "library" && <Culture data={data} setData={setData} onLogged={() => completeTask("culture")} />}
        {view === "music" && <Guitar onPracticed={() => completeTask("guitar")} practiced={!!today.tasks?.guitar} />}
        {view === "me" && <Me data={data} setData={setData} streak={streak} />}
      </main>

      {/* Alt menü */}
      <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-amber-100 flex justify-around py-2 shadow-2xl">
        <Tab icon={<Sun size={22} />} label="Bugün" on={view === "home"} onClick={() => { setView("home"); setActive(null); }} />
        <Tab icon={<CalendarDays size={22} />} label="Plan" on={view === "plan"} onClick={() => { setView("plan"); setActive(null); }} />
        <Tab icon={<Film size={22} />} label="Kültür" on={view === "library"} onClick={() => { setView("library"); setActive(null); }} />
        <Tab icon={<Trophy size={22} />} label="Ben" on={view === "me"} onClick={() => { setView("me"); setActive(null); }} />
      </nav>
    </div>
  );
}

/* ============================ ANA SAYFA ============================ */

function ActCard({ a, done, sub, onClick, bonus }) {
  const Icon = a.icon;
  return (
    <button onClick={onClick}
      className={`relative text-left rounded-3xl p-4 shadow-sm border transition active:scale-95 ${done ? "bg-emerald-50 border-emerald-200" : bonus ? "bg-amber-50 border-amber-100" : "bg-white border-amber-100"}`}>
      <div className={`w-11 h-11 rounded-2xl ${a.color} flex items-center justify-center text-white mb-2`}><Icon size={22} /></div>
      <p className="font-bold text-sm leading-tight text-slate-700">{a.label}</p>
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      {done
        ? <CheckCircle2 className="absolute top-3 right-3 text-emerald-500" size={20} />
        : <Circle className="absolute top-3 right-3 text-amber-200" size={20} />}
    </button>
  );
}

function Home({ data, today, todayActs, doneCount, goalMet, open, onPlan }) {
  const [more, setMore] = useState(false);
  const pct = todayActs.length ? Math.round((doneCount / todayActs.length) * 100) : 0;
  const pending = todayActs.filter((k) => !isActDone(today, k));
  const mode = MODES[data.mode] || MODES.tatil;
  const extras = OPTIONAL.filter((k) => !todayActs.includes(k));

  return (
    <div className="space-y-4">
      <button onClick={onPlan} className="w-full flex items-center justify-between bg-white rounded-2xl p-3 border border-amber-100 shadow-sm active:scale-95 transition">
        <span className="font-bold text-slate-700 flex items-center gap-2"><CalendarDays size={18} className="text-amber-500" /> {mode.emoji} {mode.label} · Haftalık plan</span>
        <span className="text-amber-600 font-bold text-sm">Düzenle →</span>
      </button>

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-amber-100">
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold text-slate-700">Bugünkü hedef</span>
          <span className="font-bold text-amber-600">{doneCount}/{todayActs.length}</span>
        </div>
        <div className="h-4 bg-amber-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        {goalMet ? (
          <p className="mt-3 text-emerald-600 font-bold flex items-center gap-2"><PartyPopper size={18} /> Bugünü tamamladın, harikasın! 🎉</p>
        ) : (
          <p className="mt-3 text-sm text-slate-500 flex items-center gap-2">
            <Bell size={15} className="text-rose-500" /> Kalan: {pending.map((k) => ACT[k].short).join(", ")}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {todayActs.map((k) => {
          const a = ACT[k];
          const sub = k === "read" ? `${today.read || 0}/${READ_TARGET} seans` : null;
          return <ActCard key={k} a={a} done={isActDone(today, k)} sub={sub} onClick={() => open(...a.route)} />;
        })}
      </div>

      {extras.length > 0 && (
        <div>
          <button onClick={() => setMore((m) => !m)} className="text-sm font-bold text-slate-500">
            {more ? "− Gizle" : "+ Bugün planda olmayan aktiviteler (bonus yıldız)"}
          </button>
          {more && (
            <div className="grid grid-cols-2 gap-3 mt-2">
              {extras.map((k) => <ActCard key={k} a={ACT[k]} done={isActDone(today, k)} onClick={() => open(...ACT[k].route)} bonus />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ============================ HAFTALIK PLAN ============================ */

function Planner({ data, setMode, toggleDay }) {
  const week = data.week || {};
  const today = weekdayKey();
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: "'Fredoka', sans-serif" }}>Haftalık planım</h2>
        <p className="text-sm text-slate-500">Önce nerede olduğunu seç, sonra her güne istediğin aktiviteleri ekle.</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {Object.entries(MODES).map(([k, m]) => (
          <button key={k} onClick={() => setMode(k)}
            className={`rounded-2xl py-3 font-bold transition active:scale-95 ${data.mode === k ? "bg-amber-500 text-white" : "bg-white text-slate-600 border border-amber-100"}`}>
            <div className="text-xl">{m.emoji}</div>{m.label}
          </button>
        ))}
      </div>
      <p className="text-xs text-slate-400 -mt-2 text-center">Mod değiştirince hazır şablon yüklenir; sonra günleri tek tek değiştirebilirsin.</p>

      <div className="bg-rose-50 border border-rose-100 rounded-2xl p-3">
        <p className="font-bold text-rose-600 text-sm mb-1 flex items-center gap-1"><Lock size={14} /> Her gün sabit (değişmez)</p>
        <p className="text-xs text-slate-600">📖 Kitap ×2 seans · ▶️ Tonguç + MEB · 🔤 İngilizce 10 kelime · 🏋️ Antrenman</p>
      </div>

      {WEEKDAYS.map(([dk, name]) => (
        <div key={dk} className={`bg-white rounded-3xl p-4 border shadow-sm ${dk === today ? "border-amber-300" : "border-amber-100"}`}>
          <p className="font-bold text-slate-700 mb-2">{name}{dk === today && <span className="text-amber-500 text-xs ml-2">bugün</span>}</p>
          <div className="flex flex-wrap gap-2">
            {OPTIONAL.map((ak) => {
              const on = (week[dk] || []).includes(ak);
              return (
                <button key={ak} onClick={() => toggleDay(dk, ak)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition active:scale-95 ${on ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-400"}`}>
                  {on ? "✓ " : "+ "}{ACT[ak].short}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================ OKUMA SEANSI ============================ */

function Reading({ day, onSession }) {
  const count = day?.read || 0;
  const done = count >= READ_TARGET;
  const [secs, setSecs] = useState(20 * 60);
  const [run, setRun] = useState(false);
  useEffect(() => {
    if (!run) return;
    const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [run]);
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  return (
    <Panel title="Kitap okuma" sub="Her gün en az 2 okuma seansı (yaklaşık 20'şer dakika)." done={done}>
      <div className="flex justify-center gap-2 mb-4">
        {Array.from({ length: Math.max(READ_TARGET, count) }, (_, i) => (
          <div key={i} className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${i < count ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-300"}`}>
            {i < count ? "✓" : i + 1}
          </div>
        ))}
      </div>
      <div className="text-center bg-orange-50 rounded-2xl py-6 mb-3">
        <p className="text-5xl font-bold text-slate-800 tabular-nums">{mm}:{ss}</p>
        <div className="flex justify-center gap-2 mt-3">
          <button onClick={() => setRun((r) => !r)} className="bg-orange-500 text-white rounded-xl px-4 py-2 font-bold flex items-center gap-1">
            {run ? <><Pause size={16} /> Duraklat</> : <><Play size={16} /> Başlat</>}
          </button>
          <button onClick={() => { setRun(false); setSecs(20 * 60); }} className="bg-slate-100 text-slate-600 rounded-xl px-4 py-2 font-bold"><RotateCcw size={16} /></button>
        </div>
      </div>
      <button onClick={() => { onSession(); setRun(false); setSecs(20 * 60); }} className="w-full bg-emerald-500 text-white rounded-2xl p-3 font-bold active:scale-95">
        Bu okuma seansını tamamladım ✓ (+1 yıldız)
      </button>
      <p className="text-xs text-slate-400 text-center mt-2">Okuduğun kitabı puanlamak için Kültür günlüğüne ekleyebilirsin.</p>
    </Panel>
  );
}

/* ============================ SPOR / ÇİZİM ============================ */

const SPORTS = {
  training: { label: "Antrenman", emoji: "🏋️", key: "training", tone: "bg-red-500", q: "Bugün hangi antrenmanı yaptın?" },
  swim: { label: "Yüzme", emoji: "🏊", key: "swim", tone: "bg-cyan-500", q: "Ne kadar yüzdün?" },
  draw: { label: "Çizim", emoji: "🎨", key: "drawing", tone: "bg-pink-500", q: "Bugün ne çizdin?" },
};

function Sport({ sub, day, complete }) {
  const s = SPORTS[sub] || SPORTS.training;
  const done = !!day?.tasks?.[s.key];
  const [min, setMin] = useState("");
  const [note, setNote] = useState("");
  return (
    <Panel title={s.label} sub="Gerçek hayatta yap, sonra burada işaretle." done={done}>
      <div className="text-center text-6xl mb-4">{s.emoji}</div>
      {!done ? (
        <>
          <p className="font-bold text-slate-600 mb-2 text-sm">{s.q}</p>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="İstersen kısa bir not yaz…" className="w-full bg-slate-50 rounded-xl p-2 text-sm outline-none mb-2" />
          {sub !== "draw" && (
            <input value={min} onChange={(e) => setMin(e.target.value.replace(/\D/g, ""))} inputMode="numeric" placeholder="Süre (dakika)" className="w-full bg-slate-50 rounded-xl p-2 text-sm outline-none mb-3" />
          )}
          <button onClick={() => complete(s.key)} className={`w-full ${s.tone} text-white rounded-2xl p-3 font-bold active:scale-95`}>Tamamladım ✓ (+1 yıldız)</button>
        </>
      ) : (
        <p className="text-center text-emerald-600 font-bold flex items-center justify-center gap-2"><CheckCircle2 size={18} /> Bugün tamamladın! 🎉</p>
      )}
    </Panel>
  );
}

/* ============================ TONGUÇ + MEB ============================ */

function Tonguc({ onDone, done }) {
  const [subject, setSubject] = useState(null);
  return (
    <Panel title="Tonguç 6. Sınıf + MEB Soruları" sub="Önce videoyu izle, sonra konunun sorularını çöz." done={done}>
      <a href="https://youtube.com/@tonguc6" target="_blank" rel="noreferrer"
        className="flex items-center gap-3 bg-rose-500 text-white rounded-2xl p-4 font-bold mb-4 active:scale-95 transition">
        <Play size={22} /> Tonguç 6 kanalını aç (YouTube)
      </a>
      <p className="font-bold text-slate-600 mb-2">Videoyu izledin mi? Şimdi bir ders seç:</p>
      {!subject ? (
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(MEB).map((s) => (
            <button key={s} onClick={() => setSubject(s)}
              className="bg-white border border-amber-100 rounded-2xl p-3 font-bold text-slate-700 active:scale-95">{s}</button>
          ))}
        </div>
      ) : (
        <Quiz title={subject} questions={MEB[subject]} onComplete={onDone}
          onRestart={() => setSubject(null)} restartLabel="Başka ders seç" />
      )}
    </Panel>
  );
}

/* ============================ KELİME + CHALLENGE ============================ */

function Words({ dayIdx, onDone, done, award }) {
  const [tab, setTab] = useState("daily");
  return (
    <Panel title="Kelime" sub="Her gün 10 kelime, ayrıca kendi challenge'ını seç." done={done}>
      <div className="flex gap-2 mb-4">
        <Seg on={tab === "daily"} onClick={() => setTab("daily")}>Bugünün 10'u</Seg>
        <Seg on={tab === "challenge"} onClick={() => setTab("challenge")}>Challenge 🚀</Seg>
      </div>
      {tab === "daily"
        ? <DailyWords dayIdx={dayIdx} onDone={onDone} />
        : <Challenge onDone={onDone} award={award} />}
    </Panel>
  );
}

function DailyWords({ dayIdx, onDone }) {
  const start = (dayIdx * 10) % VOCAB.length;
  const todays = Array.from({ length: 10 }, (_, i) => VOCAB[(start + i) % VOCAB.length]);
  const [mode, setMode] = useState("cards");
  const [flip, setFlip] = useState(Array(10).fill(false));
  const quizQs = todays.map(([w, tr]) => {
    const wrong = shuffle(VOCAB.filter((v) => v[1] !== tr)).slice(0, 3).map((v) => v[1]);
    const choices = shuffle([tr, ...wrong]);
    return { q: `"${w}" ne demek?`, c: choices, a: choices.indexOf(tr) };
  });
  return (
    <>
      <div className="flex gap-2 mb-4">
        <Seg on={mode === "cards"} onClick={() => setMode("cards")}>Kartlar</Seg>
        <Seg on={mode === "quiz"} onClick={() => setMode("quiz")}>Sınav</Seg>
      </div>
      {mode === "cards" ? (
        <div className="grid grid-cols-2 gap-2">
          {todays.map(([w, tr, ex], i) => (
            <button key={i} onClick={() => setFlip((f) => f.map((x, j) => j === i ? !x : x))}
              className="bg-white border border-violet-100 rounded-2xl p-3 text-left active:scale-95 min-h-20">
              {!flip[i] ? <p className="font-bold text-violet-700 text-lg">{w}</p>
                : <><p className="font-bold text-slate-700">{tr}</p><p className="text-xs text-slate-400 mt-1">{ex}</p></>}
            </button>
          ))}
        </div>
      ) : <Quiz title="Kelime Sınavı" questions={quizQs} onComplete={onDone} />}
    </>
  );
}

function Challenge({ onDone, award }) {
  const [lang, setLang] = useState("en");   // en | es
  const [level, setLevel] = useState(1000); // 1000 | 3000
  const [dir, setDir] = useState("toTr");   // toTr | fromTr
  const [phase, setPhase] = useState("setup");
  const [questions, setQuestions] = useState([]);
  const [source, setSource] = useState("");

  const langFull = lang === "en" ? "English" : "Spanish";
  const labels = lang === "en"
    ? { toTr: "İngilizce → Türkçe", fromTr: "Türkçe → İngilizce" }
    : { toTr: "İspanyolca → Türkçe", fromTr: "Türkçe → İspanyolca" };

  async function start() {
    setPhase("loading");
    const dirInstr = dir === "toTr"
      ? `Show a ${langFull} word as the prompt; the answer is its Turkish meaning.`
      : `Show a Turkish word as the prompt; the answer is its ${langFull} translation.`;
    const userMsg =
`Create 8 multiple-choice vocabulary questions for a 10-year-old Turkish child.
Language being learned: ${langFull}.
Use words from the ${level} most frequently used ${langFull} words. Keep them simple and age-appropriate.
${dirInstr}
Each question needs exactly one correct answer and three plausible but clearly wrong options, all in the same language as the answer. No duplicate words.
Return ONLY a JSON array, no markdown, in this shape:
[{"prompt":"...","answer":"...","distractors":["...","...","..."]}]`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: "You generate kids' vocabulary quizzes. Output ONLY valid JSON, no markdown fences, no commentary.",
          messages: [{ role: "user", content: userMsg }],
        }),
      });
      const data = await res.json();
      const text = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("");
      const arr = JSON.parse(text.replace(/```json|```/g, "").trim());
      const qs = arr
        .filter((x) => x && x.prompt && x.answer && Array.isArray(x.distractors) && x.distractors.length >= 3)
        .map((x) => {
          const choices = shuffle([x.answer, ...x.distractors.slice(0, 3)]);
          return { q: x.prompt, c: choices, a: choices.indexOf(x.answer) };
        });
      if (qs.length < 3) throw new Error("few");
      setQuestions(qs); setSource("ai"); setPhase("quiz");
    } catch {
      setQuestions(offlineQuestions(lang, dir, 8)); setSource("offline"); setPhase("quiz");
    }
  }

  if (phase === "loading")
    return <div className="text-center py-10"><div className="text-4xl mb-3 animate-bounce">🧠</div><p className="font-bold text-slate-600">Sana özel sorular hazırlanıyor…</p></div>;

  if (phase === "quiz")
    return (
      <div>
        <Quiz key={questions[0]?.q + source} title={`${labels[dir]} · ilk ${level}`} questions={questions}
          onComplete={(s) => { award(lang, s); onDone(); }}
          onRestart={() => setPhase("setup")} restartLabel="Yeni challenge" />
        {source === "offline" && <p className="text-xs text-slate-400 text-center mt-2">İnternet yok — çevrimdışı kelimelerle devam ediliyor.</p>}
      </div>
    );

  return (
    <div className="space-y-4">
      <div>
        <p className="font-bold text-slate-600 mb-2">Hangi dil?</p>
        <div className="flex gap-2">
          <PickBig on={lang === "en"} onClick={() => setLang("en")}>🇬🇧 İngilizce</PickBig>
          <PickBig on={lang === "es"} onClick={() => setLang("es")}>🇪🇸 İspanyolca</PickBig>
        </div>
      </div>
      <div>
        <p className="font-bold text-slate-600 mb-2">Seviye (en sık kullanılan kelimeler)</p>
        <div className="flex gap-2">
          <Seg on={level === 1000} onClick={() => setLevel(1000)}>İlk 1000</Seg>
          <Seg on={level === 3000} onClick={() => setLevel(3000)}>İlk 3000</Seg>
        </div>
      </div>
      <div>
        <p className="font-bold text-slate-600 mb-2">Yön</p>
        <div className="flex gap-2">
          <Seg on={dir === "toTr"} onClick={() => setDir("toTr")}>{labels.toTr}</Seg>
          <Seg on={dir === "fromTr"} onClick={() => setDir("fromTr")}>{labels.fromTr}</Seg>
        </div>
      </div>
      <button onClick={start} className="w-full bg-violet-500 text-white rounded-2xl p-4 font-bold active:scale-95">Challenge'ı başlat 🚀</button>
    </div>
  );
}

/* ============================ MATEMATİK ============================ */

function MathQuiz({ onDone, done }) {
  const [qs, setQs] = useState(() => Array.from({ length: 6 }, makeMath));
  const newSet = () => setQs(Array.from({ length: 6 }, makeMath));
  const quizQs = qs.map((m) => ({ q: m.q, c: m.choices.map(String), a: m.choices.indexOf(m.a) }));
  return (
    <Panel title="Matematik Testi" sub="5–6. sınıf konuları. Her seferinde yeni sorular!" done={done}>
      <Quiz key={qs[0].q} title="Test" questions={quizQs} onComplete={onDone}
        onRestart={newSet} restartLabel="Yeni sorular getir" />
    </Panel>
  );
}

/* ============================ İNGİLİZCE ============================ */

function English({ dayIdx, onDone, done }) {
  const task = ENGLISH_TASKS[dayIdx % ENGLISH_TASKS.length];
  const [step, setStep] = useState("task");
  const qs = shuffle(ENGLISH_QUIZ).slice(0, 4);
  return (
    <Panel title="İngilizce" sub="Önce dinle/izle, sonra soruları çöz." done={done}>
      {step === "task" ? (
        <>
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-4">
            <p className="font-bold text-emerald-700">{task.icon} {task.type}</p>
            <p className="text-slate-600 mt-1">{task.text}</p>
          </div>
          <button onClick={() => setStep("quiz")} className="w-full bg-emerald-500 text-white rounded-2xl p-4 font-bold active:scale-95">
            Bitirdim, soruları aç
          </button>
        </>
      ) : (
        <Quiz title="English Quiz" questions={qs} onComplete={onDone} />
      )}
    </Panel>
  );
}

/* ============================ SATRANÇ ============================ */

function sq(s) { return { c: s.charCodeAt(0) - 97, r: 8 - Number(s[1]) }; }

function Chess({ dayIdx, onDone, done }) {
  const puzzle = CHESS[dayIdx % CHESS.length];
  const [board, setBoard] = useState(puzzle.board.map((r) => r.split("")));
  const [sel, setSel] = useState(null);
  const [status, setStatus] = useState(null); // null | "wrong" | "solved"
  const [showHint, setShowHint] = useState(false);

  useEffect(() => { setBoard(puzzle.board.map((r) => r.split(""))); setSel(null); setStatus(null); setShowHint(false); }, [dayIdx]);

  const target = sq(puzzle.to), origin = sq(puzzle.from);

  const click = (r, c) => {
    if (status === "solved") return;
    if (sel) {
      if (sel.r === origin.r && sel.c === origin.c && r === target.r && c === target.c) {
        const nb = board.map((row) => [...row]);
        nb[target.r][target.c] = nb[origin.r][origin.c];
        nb[origin.r][origin.c] = ".";
        setBoard(nb); setStatus("solved"); setSel(null); onDone();
      } else { setStatus("wrong"); setSel(null); }
    } else if (board[r][c] !== "." && board[r][c] === board[r][c].toUpperCase()) {
      setSel({ r, c }); setStatus(null);
    }
  };

  const reset = () => { setBoard(puzzle.board.map((r) => r.split(""))); setSel(null); setStatus(null); };

  return (
    <Panel title="Satranç Bulmacası" sub={puzzle.desc} done={done}>
      <div className="mx-auto" style={{ maxWidth: 360 }}>
        <div className="grid grid-cols-8 rounded-2xl overflow-hidden border-4 border-amber-800 shadow-md">
          {board.map((row, r) => row.map((p, c) => {
            const light = (r + c) % 2 === 0;
            const isSel = sel && sel.r === r && sel.c === c;
            const isHint = showHint && ((r === origin.r && c === origin.c) || (r === target.r && c === target.c));
            return (
              <button key={`${r}-${c}`} onClick={() => click(r, c)}
                className={`aspect-square flex items-center justify-center text-2xl sm:text-3xl ${light ? "bg-amber-100" : "bg-amber-600"} ${isSel ? "ring-4 ring-sky-400 ring-inset" : ""} ${isHint ? "ring-4 ring-emerald-400 ring-inset" : ""}`}>
                <span className={p !== "." && p === p.toLowerCase() ? "text-slate-900" : "text-white"} style={{ textShadow: "0 1px 2px rgba(0,0,0,.3)" }}>
                  {p !== "." ? PIECE[p] : ""}
                </span>
              </button>
            );
          }))}
        </div>
      </div>

      {status === "solved" && <Result good text="Mat! Bulmacayı çözdün 👑" />}
      {status === "wrong" && <p className="mt-3 text-rose-500 font-bold text-center">O hamle mat etmiyor. Tekrar dene!</p>}

      <div className="flex gap-2 mt-4">
        <button onClick={() => setShowHint((s) => !s)} className="flex-1 bg-amber-100 text-amber-700 rounded-2xl p-3 font-bold flex items-center justify-center gap-2">
          <Lightbulb size={18} /> {showHint ? "İpucunu gizle" : "İpucu"}
        </button>
        <button onClick={reset} className="flex-1 bg-slate-100 text-slate-600 rounded-2xl p-3 font-bold flex items-center justify-center gap-2">
          <RotateCcw size={18} /> Baştan
        </button>
      </div>
      {showHint && <p className="mt-2 text-sm text-slate-500 text-center">{puzzle.hint}</p>}
      <p className="mt-3 text-xs text-slate-400 text-center">Önce taşına dokun, sonra gideceği kareye dokun.</p>
    </Panel>
  );
}

/* ============================ SUDOKU ============================ */

function Sudoku({ onDone, done }) {
  const [diff, setDiff] = useState("kolay"); // kolay(4x4) | orta(9x9)
  const [game, setGame] = useState(() => genSudoku(4, 2, 2, 6));
  const [cells, setCells] = useState(() => game.puzzle.map((r) => [...r]));
  const [sel, setSel] = useState(null);
  const [msg, setMsg] = useState(null);

  const start = (d) => {
    const g = d === "kolay" ? genSudoku(4, 2, 2, 6) : genSudoku(9, 3, 3, 40);
    setDiff(d); setGame(g); setCells(g.puzzle.map((r) => [...r])); setSel(null); setMsg(null);
  };

  const put = (v) => {
    if (!sel) return;
    const [r, c] = sel;
    if (game.puzzle[r][c] !== 0) return; // verilen sayı değişmez
    setCells((cs) => cs.map((row, i) => row.map((x, j) => (i === r && j === c ? v : x))));
    setMsg(null);
  };

  const check = () => {
    for (let r = 0; r < game.n; r++) for (let c = 0; c < game.n; c++) {
      if (cells[r][c] === 0) { setMsg({ ok: false, t: "Boş kareler var, hepsini doldur." }); return; }
      if (cells[r][c] !== game.solution[r][c]) { setMsg({ ok: false, t: "Bir hata var, tekrar bak." }); return; }
    }
    setMsg({ ok: true, t: "Tebrikler, doğru çözdün! 🌟" }); onDone();
  };

  const n = game.n;
  return (
    <Panel title="Sudoku" sub="Her satır, sütun ve kutu farklı sayılardan oluşmalı." done={done}>
      <div className="flex gap-2 mb-4">
        <Seg on={diff === "kolay"} onClick={() => start("kolay")}>Kolay (4×4)</Seg>
        <Seg on={diff === "orta"} onClick={() => start("orta")}>Zor (9×9)</Seg>
      </div>

      <div className="mx-auto" style={{ maxWidth: n === 4 ? 260 : 360 }}>
        <div className="grid border-2 border-slate-700 rounded-lg overflow-hidden" style={{ gridTemplateColumns: `repeat(${n},1fr)` }}>
          {cells.map((row, r) => row.map((v, c) => {
            const given = game.puzzle[r][c] !== 0;
            const isSel = sel && sel[0] === r && sel[1] === c;
            const br = (c + 1) % game.bc === 0 && c !== n - 1;
            const bb = (r + 1) % game.br === 0 && r !== n - 1;
            return (
              <button key={`${r}-${c}`} onClick={() => !given && setSel([r, c])}
                className={`aspect-square flex items-center justify-center font-bold ${n === 4 ? "text-xl" : "text-sm sm:text-base"} ${isSel ? "bg-fuchsia-200" : given ? "bg-slate-100" : "bg-white"} ${given ? "text-slate-800" : "text-fuchsia-600"}`}
                style={{ borderRight: br ? "2px solid #334155" : "1px solid #e2e8f0", borderBottom: bb ? "2px solid #334155" : "1px solid #e2e8f0" }}>
                {v !== 0 ? v : ""}
              </button>
            );
          }))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {Array.from({ length: n }, (_, i) => i + 1).map((d) => (
          <button key={d} onClick={() => put(d)} className="w-10 h-10 rounded-xl bg-fuchsia-500 text-white font-bold active:scale-90">{d}</button>
        ))}
        <button onClick={() => put(0)} className="w-10 h-10 rounded-xl bg-slate-200 text-slate-600 font-bold active:scale-90"><X size={18} className="mx-auto" /></button>
      </div>

      {msg && <p className={`mt-4 text-center font-bold ${msg.ok ? "text-emerald-600" : "text-rose-500"}`}>{msg.t}</p>}
      <div className="flex gap-2 mt-4">
        <button onClick={check} className="flex-1 bg-fuchsia-500 text-white rounded-2xl p-3 font-bold active:scale-95">Kontrol et</button>
        <button onClick={() => start(diff)} className="flex-1 bg-slate-100 text-slate-600 rounded-2xl p-3 font-bold active:scale-95">Yeni bulmaca</button>
      </div>
    </Panel>
  );
}

/* ============================ GİTAR ============================ */

let _voices = null;
async function ensureAudio() {
  await Tone.start();
  if (!_voices) {
    _voices = Array.from({ length: 6 }, () =>
      new Tone.PluckSynth({ attackNoise: 1, dampening: 2600, resonance: 0.96 }).toDestination());
  }
  return _voices;
}
const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const midiToName = (m) => NOTE_NAMES[((m % 12) + 12) % 12] + (Math.floor(m / 12) - 1);
const STRING_BASE = [40, 45, 50, 55, 59, 64]; // E2 A2 D3 G3 B3 E4 (kalın → ince)

async function playChord(frets) {
  const v = await ensureAudio();
  const t = Tone.now();
  let k = 0;
  frets.forEach((f, s) => {
    if (f >= 0) { v[s].triggerAttack(midiToName(STRING_BASE[s] + f), t + k * 0.055); k++; }
  });
}
async function playNote(note) { const v = await ensureAudio(); v[0].triggerAttack(note, Tone.now() + 0.02); }
async function playSequence(notes, bpm) {
  const v = await ensureAudio();
  const beat = 60 / bpm, t0 = Tone.now() + 0.08;
  notes.forEach((n, i) => v[i % 2].triggerAttack(n, t0 + i * beat));
}

const CHORDS = [
  { name: "Em", frets: [0, 2, 2, 0, 0, 0] },
  { name: "E", frets: [0, 2, 2, 1, 0, 0] },
  { name: "Am", frets: [-1, 0, 2, 2, 1, 0] },
  { name: "A", frets: [-1, 0, 2, 2, 2, 0] },
  { name: "C", frets: [-1, 3, 2, 0, 1, 0] },
  { name: "G", frets: [3, 2, 0, 0, 0, 3] },
  { name: "D", frets: [-1, -1, 0, 2, 3, 2] },
  { name: "Dm", frets: [-1, -1, 0, 2, 3, 1] },
];

const SONG = {
  title: "Yıldız Yıldız (Twinkle Twinkle)",
  phrases: [
    { lyric: "Yıldız yıldız parlıyor", notes: [["C4", "2.tel 1.perde"], ["C4", "2.tel 1.perde"], ["G4", "1.tel 3.perde"], ["G4", "1.tel 3.perde"], ["A4", "1.tel 5.perde"], ["A4", "1.tel 5.perde"], ["G4", "1.tel 3.perde"]] },
    { lyric: "Gökyüzünde duruyor", notes: [["F4", "1.tel 1.perde"], ["F4", "1.tel 1.perde"], ["E4", "1.tel boş"], ["E4", "1.tel boş"], ["D4", "2.tel 3.perde"], ["D4", "2.tel 3.perde"], ["C4", "2.tel 1.perde"]] },
    { lyric: "Yukarıda ışıl ışıl", notes: [["G4", "1.tel 3.perde"], ["G4", "1.tel 3.perde"], ["F4", "1.tel 1.perde"], ["F4", "1.tel 1.perde"], ["E4", "1.tel boş"], ["E4", "1.tel boş"], ["D4", "2.tel 3.perde"]] },
    { lyric: "Elmas gibi pırıl pırıl", notes: [["G4", "1.tel 3.perde"], ["G4", "1.tel 3.perde"], ["F4", "1.tel 1.perde"], ["F4", "1.tel 1.perde"], ["E4", "1.tel boş"], ["E4", "1.tel boş"], ["D4", "2.tel 3.perde"]] },
    { lyric: "Yıldız yıldız parlıyor", notes: [["C4", "2.tel 1.perde"], ["C4", "2.tel 1.perde"], ["G4", "1.tel 3.perde"], ["G4", "1.tel 3.perde"], ["A4", "1.tel 5.perde"], ["A4", "1.tel 5.perde"], ["G4", "1.tel 3.perde"]] },
    { lyric: "Gökyüzünde duruyor", notes: [["F4", "1.tel 1.perde"], ["F4", "1.tel 1.perde"], ["E4", "1.tel boş"], ["E4", "1.tel boş"], ["D4", "2.tel 3.perde"], ["D4", "2.tel 3.perde"], ["C4", "2.tel 1.perde"]] },
  ],
};

function Guitar({ onPracticed, practiced }) {
  const [tab, setTab] = useState("akor");
  return (
    <Panel title="Gitar" sub="Dinle, çal, akort et ve parçayı adım adım öğren." done={practiced}>
      <div className="grid grid-cols-4 gap-2 mb-4">
        <Seg on={tab === "akor"} onClick={() => setTab("akor")}>Akorlar</Seg>
        <Seg on={tab === "parca"} onClick={() => setTab("parca")}>Parça</Seg>
        <Seg on={tab === "metro"} onClick={() => setTab("metro")}>Metronom</Seg>
        <Seg on={tab === "akort"} onClick={() => setTab("akort")}>Akort</Seg>
      </div>
      {tab === "akor" && <Chords />}
      {tab === "parca" && <SongTrainer />}
      {tab === "metro" && <Metronome />}
      {tab === "akort" && <Tuner />}
      <div className="mt-5 pt-4 border-t border-amber-100">
        {practiced
          ? <p className="text-center text-emerald-600 font-bold flex items-center justify-center gap-2"><CheckCircle2 size={18} /> Bugün gitar çalıştın! 🎸</p>
          : <button onClick={onPracticed} className="w-full bg-rose-500 text-white rounded-2xl p-3 font-bold active:scale-95">Bugün çalıştım ✓ (+1 yıldız)</button>}
      </div>
    </Panel>
  );
}

function ChordDiagram({ frets }) {
  const xs = [12, 30, 48, 66, 84, 102];
  const fy = [22, 44, 66, 88]; // fret çizgileri
  return (
    <svg viewBox="0 0 114 110" className="w-full" style={{ maxHeight: 110 }}>
      {/* eşik */}
      <line x1="12" y1="22" x2="102" y2="22" stroke="#475569" strokeWidth="3" />
      {fy.slice(1).map((y, i) => <line key={i} x1="12" y1={y} x2="102" y2={y} stroke="#cbd5e1" strokeWidth="1.5" />)}
      {xs.map((x, i) => <line key={i} x1={x} y1="22" x2={x} y2="88" stroke="#cbd5e1" strokeWidth="1.5" />)}
      {frets.map((f, s) => {
        if (f === -1) return <text key={s} x={xs[s]} y="16" fontSize="11" fill="#ef4444" textAnchor="middle" fontWeight="bold">✕</text>;
        if (f === 0) return <circle key={s} cx={xs[s]} cy="13" r="4" fill="none" stroke="#475569" strokeWidth="1.5" />;
        const cy = fy[f - 1] + 11;
        return <circle key={s} cx={xs[s]} cy={cy} r="6.5" fill="#f43f5e" />;
      })}
      {["E", "A", "D", "G", "B", "e"].map((n, i) => <text key={i} x={xs[i]} y="106" fontSize="9" fill="#94a3b8" textAnchor="middle">{n}</text>)}
    </svg>
  );
}

function Chords() {
  const [ok, setOk] = useState({});
  return (
    <div className="grid grid-cols-2 gap-3">
      {CHORDS.map((ch) => (
        <div key={ch.name} className="bg-white border border-amber-100 rounded-2xl p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-slate-700 text-lg">{ch.name}</span>
            <button onClick={() => playChord(ch.frets)} className="bg-amber-500 text-white rounded-xl px-3 py-1 text-sm font-bold flex items-center gap-1 active:scale-90"><Play size={13} /> Çal</button>
          </div>
          <ChordDiagram frets={ch.frets} />
          <button onClick={() => setOk((d) => ({ ...d, [ch.name]: !d[ch.name] }))}
            className={`w-full mt-1 rounded-xl py-1.5 text-xs font-bold ${ok[ch.name] ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
            {ok[ch.name] ? "✓ Çalabiliyorum" : "Çalışıyorum"}
          </button>
        </div>
      ))}
    </div>
  );
}

function SongTrainer() {
  const [i, setI] = useState(0);
  const [bpm, setBpm] = useState(60);
  const ph = SONG.phrases[i];
  const pct = Math.round(((i + 1) / SONG.phrases.length) * 100);
  return (
    <div>
      <div className="flex justify-between text-xs text-slate-400 mb-1"><span>{SONG.title}</span><span>Cümle {i + 1}/{SONG.phrases.length}</span></div>
      <div className="h-2 bg-amber-100 rounded-full overflow-hidden mb-3"><div className="h-full bg-amber-500" style={{ width: `${pct}%` }} /></div>
      <p className="font-bold text-slate-700 mb-3 text-center">🎵 {ph.lyric}</p>
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {ph.notes.map((n, k) => (
          <div key={k} className="bg-amber-50 border border-amber-200 rounded-xl px-2 py-1 text-center">
            <p className="font-bold text-amber-700 text-sm">{n[0].replace(/\d/, "")}</p>
            <p className="text-[9px] text-slate-400">{n[1]}</p>
          </div>
        ))}
      </div>
      <div className="mb-3">
        <div className="flex justify-between text-xs text-slate-400 mb-1"><span>Hız (yavaş → hızlı)</span><span>{bpm} BPM</span></div>
        <input type="range" min="40" max="120" value={bpm} onChange={(e) => setBpm(Number(e.target.value))} className="w-full accent-amber-500" />
      </div>
      <button onClick={() => playSequence(ph.notes.map((n) => n[0]), bpm)} className="w-full bg-amber-500 text-white rounded-2xl p-3 font-bold mb-2 flex items-center justify-center gap-2 active:scale-95">
        <Play size={18} /> Bu cümleyi dinle
      </button>
      <div className="flex gap-2">
        <button disabled={i === 0} onClick={() => setI(i - 1)} className="flex-1 bg-slate-100 text-slate-600 rounded-2xl p-3 font-bold disabled:opacity-40">← Önceki</button>
        <button disabled={i === SONG.phrases.length - 1} onClick={() => setI(i + 1)} className="flex-1 bg-emerald-500 text-white rounded-2xl p-3 font-bold disabled:opacity-40">Sıradaki →</button>
      </div>
      <button onClick={() => playSequence(SONG.phrases.flatMap((p) => p.notes.map((n) => n[0])), bpm)} className="w-full mt-2 bg-rose-100 text-rose-600 rounded-2xl p-2.5 font-bold text-sm">🎶 Tüm parçayı dinle</button>
    </div>
  );
}

function Metronome() {
  const [bpm, setBpm] = useState(70);
  const [on, setOn] = useState(false);
  const [beat, setBeat] = useState(-1);
  const timer = useRef(null);
  const click = useRef(null);
  useEffect(() => {
    if (!on) { clearInterval(timer.current); setBeat(-1); return; }
    let b = 0;
    (async () => {
      await Tone.start();
      if (!click.current) click.current = new Tone.MembraneSynth({ pitchDecay: 0.008, octaves: 2, envelope: { attack: 0.001, decay: 0.18, sustain: 0 } }).toDestination();
    })();
    timer.current = setInterval(() => {
      try { click.current?.triggerAttackRelease(b % 4 === 0 ? "C3" : "G2", "16n"); } catch { }
      setBeat(b % 4); b++;
    }, 60000 / bpm);
    return () => clearInterval(timer.current);
  }, [on, bpm]);
  return (
    <div className="text-center">
      <div className="flex justify-center gap-3 my-4">
        {[0, 1, 2, 3].map((d) => (
          <div key={d} className={`w-5 h-5 rounded-full transition ${beat === d ? (d === 0 ? "bg-rose-500 scale-125" : "bg-amber-500 scale-125") : "bg-slate-200"}`} />
        ))}
      </div>
      <p className="text-4xl font-bold text-slate-800 mb-1">{bpm}</p>
      <p className="text-xs text-slate-400 mb-3">vuruş / dakika</p>
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setBpm((b) => Math.max(40, b - 5))} className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 font-bold flex items-center justify-center"><Minus size={18} /></button>
        <input type="range" min="40" max="160" value={bpm} onChange={(e) => setBpm(Number(e.target.value))} className="flex-1 accent-amber-500" />
        <button onClick={() => setBpm((b) => Math.min(160, b + 5))} className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 font-bold flex items-center justify-center"><Plus size={18} /></button>
      </div>
      <button onClick={() => setOn((o) => !o)} className={`w-full rounded-2xl p-3 font-bold flex items-center justify-center gap-2 active:scale-95 ${on ? "bg-rose-500 text-white" : "bg-amber-500 text-white"}`}>
        {on ? <><Pause size={18} /> Durdur</> : <><Play size={18} /> Başlat</>}
      </button>
    </div>
  );
}

const TUNE_STRINGS = [["6 · kalın E", "E2"], ["5 · A", "A2"], ["4 · D", "D3"], ["3 · G", "G3"], ["2 · B", "B3"], ["1 · ince E", "E4"]];

function Tuner() {
  const [mode, setMode] = useState("kulak");
  return (
    <div>
      <div className="flex gap-2 mb-4">
        <Seg on={mode === "kulak"} onClick={() => setMode("kulak")}>Kulaktan akort</Seg>
        <Seg on={mode === "mic"} onClick={() => setMode("mic")}>Mikrofon (deneysel)</Seg>
      </div>
      {mode === "kulak" ? (
        <div>
          <p className="text-sm text-slate-500 mb-3 text-center">Tele bas, sesi dinle ve gitarındaki teli aynı sese getir.</p>
          <div className="grid grid-cols-2 gap-2">
            {TUNE_STRINGS.map(([label, note]) => (
              <button key={note} onClick={() => playNote(note)} className="bg-amber-50 border border-amber-200 rounded-2xl p-3 font-bold text-amber-700 flex items-center justify-center gap-2 active:scale-95">
                <Volume2 size={16} /> {label}
              </button>
            ))}
          </div>
        </div>
      ) : <MicTuner />}
    </div>
  );
}

function autoCorrelate(buf, sampleRate) {
  const SIZE = buf.length;
  let rms = 0;
  for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i];
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.01) return -1;
  let r1 = 0, r2 = SIZE - 1;
  const thres = 0.2;
  for (let i = 0; i < SIZE / 2; i++) if (Math.abs(buf[i]) < thres) { r1 = i; break; }
  for (let i = 1; i < SIZE / 2; i++) if (Math.abs(buf[SIZE - i]) < thres) { r2 = SIZE - i; break; }
  const b = buf.slice(r1, r2), N = b.length, c = new Array(N).fill(0);
  for (let i = 0; i < N; i++) for (let j = 0; j < N - i; j++) c[i] += b[j] * b[j + i];
  let d = 0; while (d < N - 1 && c[d] > c[d + 1]) d++;
  let max = -1, pos = -1;
  for (let i = d; i < N; i++) if (c[i] > max) { max = c[i]; pos = i; }
  let T0 = pos;
  const x1 = c[T0 - 1] || 0, x2 = c[T0] || 0, x3 = c[T0 + 1] || 0;
  const a = (x1 + x3 - 2 * x2) / 2, bb = (x3 - x1) / 2;
  if (a) T0 = T0 - bb / (2 * a);
  return T0 > 0 ? sampleRate / T0 : -1;
}

function MicTuner() {
  const [status, setStatus] = useState("idle"); // idle | listening | error
  const [reading, setReading] = useState(null);
  const raf = useRef(null), ctx = useRef(null), ana = useRef(null), stream = useRef(null);

  const stop = useCallback(() => {
    cancelAnimationFrame(raf.current);
    stream.current?.getTracks().forEach((t) => t.stop());
    if (ctx.current && ctx.current.state !== "closed") ctx.current.close();
    setStatus("idle"); setReading(null);
  }, []);

  useEffect(() => () => stop(), [stop]);

  const start = async () => {
    try {
      stream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      ctx.current = new (window.AudioContext || window.webkitAudioContext)();
      const src = ctx.current.createMediaStreamSource(stream.current);
      ana.current = ctx.current.createAnalyser();
      ana.current.fftSize = 2048;
      src.connect(ana.current);
      setStatus("listening");
      const buf = new Float32Array(ana.current.fftSize);
      const loop = () => {
        ana.current.getFloatTimeDomainData(buf);
        const f = autoCorrelate(buf, ctx.current.sampleRate);
        if (f > 0) {
          const m = Math.round(12 * Math.log2(f / 440) + 69);
          const ref = 440 * Math.pow(2, (m - 69) / 12);
          const cents = Math.round(1200 * Math.log2(f / ref));
          setReading({ name: midiToName(m), cents });
        }
        raf.current = requestAnimationFrame(loop);
      };
      loop();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="text-center">
      {status === "idle" && (
        <>
          <p className="text-sm text-slate-500 mb-4">Bir teli çal, hangi notada olduğunu ve akortta olup olmadığını söyleyeyim.</p>
          <button onClick={start} className="bg-rose-500 text-white rounded-2xl px-6 py-3 font-bold inline-flex items-center gap-2 active:scale-95"><Mic size={18} /> Dinlemeye başla</button>
          <p className="text-[11px] text-slate-400 mt-3">Bu özellik deneyseldir; mikrofon izni gerekir ve her cihazda çalışmayabilir.</p>
        </>
      )}
      {status === "error" && (
        <div className="py-4">
          <p className="font-bold text-rose-500 mb-2">Mikrofona ulaşılamadı 🎤</p>
          <p className="text-sm text-slate-500">İzin verilmedi ya da bu ekranda mikrofon kapalı. "Kulaktan akort" her zaman çalışır — onu kullanabilirsin.</p>
        </div>
      )}
      {status === "listening" && (
        <div className="py-2">
          <p className="text-6xl font-bold text-slate-800">{reading?.name?.replace(/\d/, "") || "…"}</p>
          {reading && (
            <p className={`font-bold mt-1 ${Math.abs(reading.cents) <= 5 ? "text-emerald-600" : reading.cents < 0 ? "text-sky-600" : "text-rose-500"}`}>
              {Math.abs(reading.cents) <= 5 ? "✓ Akortta!" : reading.cents < 0 ? "↓ Biraz pes (tel gevşek)" : "↑ Biraz tiz (tel gergin)"}
            </p>
          )}
          <button onClick={stop} className="mt-5 bg-slate-100 text-slate-600 rounded-2xl px-6 py-2.5 font-bold">Durdur</button>
        </div>
      )}
    </div>
  );
}

/* ============================ KÜLTÜR GÜNLÜĞÜ ============================ */

const MEDIA_TYPES = [
  { k: "film", label: "Film", emoji: "🎬" },
  { k: "dizi", label: "Dizi", emoji: "📺" },
  { k: "kitap", label: "Kitap", emoji: "📚" },
  { k: "muzik", label: "Müzik", emoji: "🎵" },
  { k: "tiyatro", label: "Tiyatro", emoji: "🎭" },
  { k: "muzikal", label: "Müzikal", emoji: "🎼" },
];
const TYPE_EMOJI = Object.fromEntries(MEDIA_TYPES.map((t) => [t.k, t.emoji]));
const TYPE_LABEL = Object.fromEntries(MEDIA_TYPES.map((t) => [t.k, t.label]));
const STATUSES = [{ k: "done", label: "Bitti" }, { k: "progress", label: "Devam" }, { k: "want", label: "Sonra" }];
const prettyDate = (s) => { const [y, m, d] = s.split("-"); const mo = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"][Number(m) - 1]; return `${Number(d)} ${mo} ${y}`; };

function downscalePhoto(file) {
  return new Promise((res) => {
    const r = new FileReader();
    r.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 500, sc = Math.min(1, max / Math.max(img.width, img.height));
        const cv = document.createElement("canvas");
        cv.width = img.width * sc; cv.height = img.height * sc;
        cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
        res(cv.toDataURL("image/jpeg", 0.6));
      };
      img.src = r.result;
    };
    r.readAsDataURL(file);
  });
}

function Culture({ data, setData, onLogged }) {
  const [tab, setTab] = useState("list");
  const [type, setType] = useState("film");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [filter, setFilter] = useState("all");
  const media = data.media || [];

  const add = () => {
    if (!title.trim()) return;
    const entry = { id: Date.now(), type, title: title.trim(), year, status: "done", rating: 0, fav: false, review: "", photo: null, date: todayKey() };
    setData((d) => ({ ...d, media: [entry, ...(d.media || [])] }));
    setTitle(""); setYear(""); onLogged();
  };
  const upd = (id, patch) => setData((d) => ({ ...d, media: d.media.map((m) => m.id === id ? { ...m, ...patch } : m) }));
  const del = (id) => setData((d) => ({ ...d, media: d.media.filter((m) => m.id !== id) }));
  const shown = media.filter((m) => filter === "all" ? true : filter === "fav" ? m.fav : m.type === filter);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: "'Fredoka', sans-serif" }}>Kültür Günlüğüm</h2>
        <p className="text-sm text-slate-500">İzlediğin, okuduğun, dinlediğin her şeyi ekle · puanla · yorumla.</p>
      </div>

      <div className="bg-white rounded-3xl p-4 border border-indigo-100 shadow-sm">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {MEDIA_TYPES.map((t) => (
            <button key={t.k} onClick={() => setType(t.k)} className={`px-2.5 py-1 rounded-full text-xs font-bold ${type === t.k ? "bg-indigo-500 text-white" : "bg-slate-100 text-slate-500"}`}>{t.emoji} {t.label}</button>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={`${TYPE_LABEL[type]} adı`} className="flex-1 bg-indigo-50 rounded-xl p-3 outline-none" />
          <input value={year} onChange={(e) => setYear(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="Yıl" inputMode="numeric" className="w-16 bg-indigo-50 rounded-xl p-3 outline-none text-center" />
          <button onClick={add} className="bg-indigo-500 text-white rounded-xl px-4 font-bold active:scale-95"><Plus size={20} /></button>
        </div>
      </div>

      <div className="flex gap-2">
        <Seg on={tab === "list"} onClick={() => setTab("list")}>Liste</Seg>
        <Seg on={tab === "diary"} onClick={() => setTab("diary")}>Günlük</Seg>
        <Seg on={tab === "stats"} onClick={() => setTab("stats")}>İstatistik</Seg>
      </div>

      {tab === "list" && (
        <>
          <div className="flex flex-wrap gap-1.5">
            <FilterChip on={filter === "all"} onClick={() => setFilter("all")}>Hepsi</FilterChip>
            <FilterChip on={filter === "fav"} onClick={() => setFilter("fav")}>❤️</FilterChip>
            {MEDIA_TYPES.map((t) => <FilterChip key={t.k} on={filter === t.k} onClick={() => setFilter(t.k)}>{t.emoji}</FilterChip>)}
          </div>
          {shown.length === 0 && <Empty text="Henüz bir şey yok. Üstten bir film, kitap veya şarkı ekle!" />}
          {shown.map((m) => <MediaCard key={m.id} m={m} upd={upd} del={del} />)}
        </>
      )}
      {tab === "diary" && <Diary media={media} />}
      {tab === "stats" && <CultureStats media={media} />}
    </div>
  );
}

function MediaCard({ m, upd, del }) {
  const fileRef = useRef();
  const onPhoto = async (e) => { const f = e.target.files?.[0]; if (f) upd(m.id, { photo: await downscalePhoto(f) }); };
  return (
    <div className="bg-white rounded-3xl p-4 border border-indigo-100 shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <p className="font-bold text-slate-700">{TYPE_EMOJI[m.type]} {m.title} {m.year && <span className="text-slate-400 font-normal">({m.year})</span>}</p>
          <Stars value={m.rating} onChange={(v) => upd(m.id, { rating: v })} />
        </div>
        <button onClick={() => upd(m.id, { fav: !m.fav })}><Heart size={20} className={m.fav ? "text-rose-500 fill-rose-500" : "text-slate-300"} /></button>
        <button onClick={() => del(m.id)} className="text-slate-300"><X size={18} /></button>
      </div>
      <div className="flex gap-1.5">
        {STATUSES.map((s) => (
          <button key={s.k} onClick={() => upd(m.id, { status: s.k })} className={`flex-1 rounded-lg py-1.5 text-xs font-bold ${m.status === s.k ? "bg-indigo-500 text-white" : "bg-slate-100 text-slate-400"}`}>{s.label}</button>
        ))}
      </div>
      <textarea value={m.review} onChange={(e) => upd(m.id, { review: e.target.value })} rows={2} placeholder="Yorumun / incelemen…" className="w-full bg-indigo-50 rounded-xl p-2 text-sm outline-none" />
      <div className="flex items-center gap-3">
        {m.photo && <img src={m.photo} alt="" className="w-14 h-14 rounded-xl object-cover" />}
        <button onClick={() => fileRef.current.click()} className="text-xs font-bold text-indigo-500 flex items-center gap-1"><Camera size={14} /> {m.photo ? "Fotoğrafı değiştir" : "Fotoğraf ekle"}</button>
        <input ref={fileRef} type="file" accept="image/*" onChange={onPhoto} className="hidden" />
      </div>
    </div>
  );
}

function Diary({ media }) {
  if (media.length === 0) return <Empty text="Günlüğün boş. Bir şey ekleyince burada tarih tarih görünür." />;
  const byDate = {};
  media.forEach((m) => { (byDate[m.date] = byDate[m.date] || []).push(m); });
  const dates = Object.keys(byDate).sort().reverse();
  return (
    <div className="space-y-4">
      {dates.map((d) => (
        <div key={d} className="bg-white rounded-3xl p-4 border border-indigo-100 shadow-sm">
          <p className="font-bold text-indigo-600 mb-2">{prettyDate(d)}</p>
          {byDate[d].map((m) => (
            <p key={m.id} className="text-sm text-slate-600">{TYPE_EMOJI[m.type]} {m.title} {m.rating > 0 && <span className="text-amber-500">{"★".repeat(m.rating)}</span>}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

function CultureStats({ media }) {
  const done = media.filter((m) => m.status === "done");
  const rated = media.filter((m) => m.rating > 0);
  const avg = rated.length ? (rated.reduce((s, m) => s + m.rating, 0) / rated.length).toFixed(1) : "—";
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {MEDIA_TYPES.map((t) => (
          <div key={t.k} className="bg-white rounded-2xl p-3 border border-indigo-100 text-center">
            <div className="text-2xl">{t.emoji}</div>
            <p className="text-xl font-bold text-slate-800">{done.filter((m) => m.type === t.k).length}</p>
            <p className="text-[10px] text-slate-400 font-semibold">{t.label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white rounded-2xl p-3 border border-indigo-100 text-center"><p className="text-2xl font-bold text-slate-800">{media.length}</p><p className="text-xs text-slate-400">Toplam kayıt</p></div>
        <div className="bg-white rounded-2xl p-3 border border-indigo-100 text-center"><p className="text-2xl font-bold text-amber-500">★ {avg}</p><p className="text-xs text-slate-400">Ortalama puan</p></div>
      </div>
    </div>
  );
}

function FilterChip({ on, onClick, children }) {
  return <button onClick={onClick} className={`px-3 py-1.5 rounded-full text-xs font-bold ${on ? "bg-indigo-500 text-white" : "bg-white text-slate-500 border border-indigo-100"}`}>{children}</button>;
}

/* ============================ BEN / BAŞARILAR ============================ */

const BADGES = [
  { id: "first", label: "İlk Adım", icon: "🌱", need: (d) => d.stars >= 1 },
  { id: "star10", label: "10 Yıldız", icon: "⭐", need: (d) => d.stars >= 10 },
  { id: "star50", label: "Yıldız Avcısı", icon: "🌟", need: (d) => d.stars >= 50 },
  { id: "reader", label: "Kitap Kurdu", icon: "📚", need: (d) => (d.media || []).some((m) => m.type === "kitap" && m.status === "done") },
  { id: "cinema", label: "Film Eleştirmeni", icon: "🎬", need: (d) => (d.media || []).some((m) => m.type === "film") },
  { id: "star100", label: "Yaz Şampiyonu", icon: "🏆", need: (d) => d.stars >= 100 },
];

function Me({ data, setData, streak }) {
  const fileRef = useRef();

  const onUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 500, scale = Math.min(1, max / Math.max(img.width, img.height));
        const cv = document.createElement("canvas");
        cv.width = img.width * scale; cv.height = img.height * scale;
        cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
        const url = cv.toDataURL("image/jpeg", 0.6);
        setData((d) => ({ ...d, uploads: [{ id: Date.now(), url, date: todayKey() }, ...d.uploads].slice(0, 12) }));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const remove = (id) => setData((d) => ({ ...d, uploads: d.uploads.filter((u) => u.id !== id) }));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Stat icon={<Star className="text-amber-400" />} value={data.stars} label="Yıldız" />
        <Stat icon={<Flame className="text-orange-500" />} value={streak} label="Gün serisi" />
        <Stat icon={<BookOpen className="text-orange-400" />} value={(data.media || []).filter((m) => m.type === "kitap" && m.status === "done").length} label="Biten kitap" />
      </div>

      <div className="bg-white rounded-3xl p-4 border border-indigo-100 shadow-sm">
        <p className="font-bold text-slate-700 mb-1 flex items-center gap-2"><Film size={18} className="text-indigo-500" /> Kültür arşivi</p>
        <p className="text-sm text-slate-500">{(data.media || []).length} kayıt · {(data.media || []).filter((m) => m.fav).length} favori</p>
      </div>

      <div className="bg-white rounded-3xl p-4 border border-amber-100 shadow-sm">
        <p className="font-bold text-slate-700 mb-3 flex items-center gap-2"><Sparkles size={18} className="text-amber-500" /> Rozetlerim</p>
        <div className="grid grid-cols-3 gap-3">
          {BADGES.map((b) => {
            const earned = b.need(data);
            return (
              <div key={b.id} className={`rounded-2xl p-3 text-center ${earned ? "bg-amber-50 border border-amber-200" : "bg-slate-50 border border-slate-100 opacity-50"}`}>
                <div className="text-3xl">{earned ? b.icon : "🔒"}</div>
                <p className="text-xs font-bold text-slate-600 mt-1">{b.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-4 border border-amber-100 shadow-sm">
        <p className="font-bold text-slate-700 mb-3 flex items-center gap-2"><Languages size={18} className="text-violet-500" /> Diller</p>
        <div className="grid grid-cols-2 gap-3">
          <LangStat flag="🇬🇧" name="İngilizce" n={data.practice?.en || 0} />
          <LangStat flag="🇪🇸" name="İspanyolca" n={data.practice?.es || 0} />
        </div>
        <p className="text-xs text-slate-400 mt-3 text-center">Challenge'larda doğru bildiğin kelimeler burada birikir.</p>
      </div>

      <div className="bg-white rounded-3xl p-4 border border-amber-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-slate-700 flex items-center gap-2"><Camera size={18} className="text-rose-500" /> Çalışmalarım</p>
          <button onClick={() => fileRef.current.click()} className="bg-rose-500 text-white rounded-xl px-3 py-2 font-bold text-sm flex items-center gap-1 active:scale-95">
            <Plus size={16} /> Fotoğraf
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={onUpload} className="hidden" />
        </div>
        {data.uploads.length === 0 ? (
          <Empty text="Defterinden, resminden veya çözdüğün sorudan fotoğraf yükle, burada biriksin!" />
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {data.uploads.map((u) => (
              <div key={u.id} className="relative">
                <img src={u.url} alt="çalışma" className="w-full aspect-square object-cover rounded-xl" />
                <button onClick={() => remove(u.id)} className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full p-1"><X size={12} /></button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================ ORTAK PARÇALAR ============================ */

function Quiz({ title, questions, onComplete, onRestart, restartLabel }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const completed = useRef(false);

  const q = questions[i];
  const choose = (idx) => {
    if (picked !== null) return;
    setPicked(idx);
    const correct = idx === q.a;
    if (correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (i + 1 < questions.length) { setI(i + 1); setPicked(null); }
      else { setDone(true); if (!completed.current) { completed.current = true; onComplete?.(score + (correct ? 1 : 0), questions.length); } }
    }, 800);
  };

  if (done) {
    const perfect = score === questions.length;
    return (
      <div className="text-center py-4">
        <div className="text-5xl mb-2">{perfect ? "🏆" : score >= questions.length / 2 ? "🌟" : "👍"}</div>
        <p className="font-bold text-lg text-slate-700">{score} / {questions.length} doğru!</p>
        <p className="text-slate-500 text-sm mb-4">{perfect ? "Mükemmel! Hepsi doğru." : "Aferin, görevi tamamladın."}</p>
        {onRestart && <button onClick={() => { setI(0); setPicked(null); setScore(0); setDone(false); completed.current = false; onRestart(); }}
          className="bg-slate-100 text-slate-600 rounded-2xl px-5 py-3 font-bold">{restartLabel || "Tekrar"}</button>}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between text-xs text-slate-400 mb-2"><span>{title}</span><span>Soru {i + 1}/{questions.length}</span></div>
      <p className="font-bold text-slate-700 mb-4 text-lg leading-snug">{q.q}</p>
      <div className="space-y-2">
        {q.c.map((opt, idx) => {
          let cls = "bg-white border-amber-100 text-slate-700";
          if (picked !== null) {
            if (idx === q.a) cls = "bg-emerald-50 border-emerald-400 text-emerald-700";
            else if (idx === picked) cls = "bg-rose-50 border-rose-300 text-rose-600";
            else cls = "bg-white border-amber-100 text-slate-400";
          }
          return (
            <button key={idx} onClick={() => choose(idx)} disabled={picked !== null}
              className={`w-full text-left rounded-2xl border-2 p-3 font-semibold transition active:scale-95 ${cls}`}>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Panel({ title, sub, done, children }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: "'Fredoka', sans-serif" }}>{title}</h2>
        {done && <CheckCircle2 size={20} className="text-emerald-500" />}
      </div>
      {sub && <p className="text-sm text-slate-500 mb-3">{sub}</p>}
      <div className="bg-white rounded-3xl p-5 border border-amber-100 shadow-sm">{children}</div>
    </div>
  );
}

function Result({ good, text }) {
  return <div className={`mt-4 rounded-2xl p-3 text-center font-bold ${good ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-500"}`}>{text}</div>;
}

function Tab({ icon, label, on, onClick }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-0.5 px-2 ${on ? "text-amber-600" : "text-slate-400"}`}>
      {icon}<span className="text-[11px] font-bold">{label}</span>
    </button>
  );
}

function Badge({ icon, value, label, tone }) {
  return (
    <div className={`${tone} text-white rounded-2xl px-3 py-1.5 flex items-center gap-1 shadow-sm`}>
      {icon}<span className="font-bold">{value}</span><span className="text-[10px] opacity-80">{label}</span>
    </div>
  );
}

function Seg({ on, onClick, children }) {
  return <button onClick={onClick} className={`flex-1 rounded-2xl py-2.5 font-bold text-sm transition ${on ? "bg-amber-500 text-white" : "bg-white text-slate-500 border border-amber-100"}`}>{children}</button>;
}

function PickBig({ on, onClick, children }) {
  return <button onClick={onClick} className={`flex-1 rounded-2xl py-4 font-bold transition active:scale-95 ${on ? "bg-violet-500 text-white" : "bg-white text-slate-600 border border-violet-100"}`}>{children}</button>;
}

function LangStat({ flag, name, n }) {
  return (
    <div className="bg-violet-50 border border-violet-100 rounded-2xl p-3 text-center">
      <div className="text-2xl">{flag}</div>
      <p className="text-xl font-bold text-slate-800">{n}</p>
      <p className="text-[11px] text-slate-500 font-semibold">{name} · doğru kelime</p>
    </div>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div className="bg-white rounded-2xl p-3 border border-amber-100 shadow-sm text-center">
      <div className="flex justify-center mb-1">{icon}</div>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
      <p className="text-[11px] text-slate-400 font-semibold">{label}</p>
    </div>
  );
}

function Stars({ value, onChange }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} onClick={() => onChange(n)}>
          <Star size={16} className={n <= value ? "text-amber-400 fill-amber-400" : "text-slate-200"} />
        </button>
      ))}
    </div>
  );
}

function Empty({ text }) {
  return <div className="text-center text-slate-400 text-sm py-6 px-4">{text}</div>;
}
