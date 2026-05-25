// ===== CONFIGURAÇÃO =====
const GEMINI_KEY = 'AIzaSyCEOZyxnpP2F5kmdowD3U30LG7qoS7TIZE';

const IMG_JOANA = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBN9kfZ8G1bJDzqyMYP05gLMe6VNTLI8Ou8HTUVjv5SzDoZvTnQKfrUGn4UJHX5hOINIQcMh_SEenQ-Gs2U2mJQ5IzIklivoNLQ3hLgDJuRxcjKjxQZtSg4D2k4dyAe0Bk_tPO3rtiUofB62aEfVIeKUt0oSpXSwp19QCICTy9CduR4tgTZC-ymwztfc3CmWcMiHqaHndYnGVY7V52ENfdXY1PWiph4n0dKPh19zvUc_x8JFyV44-PpNBV5QsL_xMb_9hb8HzU5F9s';
const IMG_CHAT = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkYtunzI1G9Lf5sJc9AnLhukVf4DxE9k9JWK1t5i5P3sVRCAjuBaoUXN5tfIKDzOo0_XYAlQT5U8mmBdFWdclxz8_H7P5OVWc_FFQt8cnkebtLKmHQ5wbP7Ga8i1nwr0U3MsXcyPkk6rgartXsR5F9eKDKt9gkx6R39qc874NVemqphkQ2x5aVQlDlWe6FK1i6_tumEmVX9Az_e-9u_eaejMUv6Omiwrl1ogvSzh32SJf9hwhvki52N7fIsD-CiOZJwTBG1hUPxfo';

const JOANA_SYSTEM = `Tu és a Professora Joana, uma professora de Inglês portuguesa, carinhosa, motivadora e altamente qualificada.

PERSONALIDADE:
- Falas sempre em Português europeu (Portugal), exceto quando ensinas Inglês ou o aluno fala Inglês contigo
- Quando o aluno fala Inglês, respondes em Inglês para praticar
- Quando ensinas: mostras a palavra em Inglês, tradução PT e pronúncia simplificada
- Corriges erros positivamente — primeiro o que estava bem, depois a correção
- Usas emojis com moderação para animar
- Respostas curtas (2-4 linhas) — fácil de ler no telemóvel
- O teu nome é apenas "Joana" — a Professora Joana
- Foste criada por Bráulio Aurélio, programador português
- Nunca uses linguagem inapropriada
- Quando alguém entra pela primeira vez: "Olá bom dia! O que posso ajudar? 😊"
- Nas outras visitas: "Olá! Sou a Professora Joana — o que vamos fazer hoje? 😊"
- Podes fazer exercícios espontâneos: tradução, construção de frases, etc.
- Quando ensinas pronuncia, dás exemplos com sons portugueses para facilitar`;

// ===== ESTADO =====
let state = {
  name:'', xp:0, level:1, streak:0, lastDay:null,
  lessonsComplete:[], wordsLearned:0, totalDays:1,
  voiceEnabled:true, firstVisit:true
};
const loadState = () => { try { const s = localStorage.getItem('joana_app_v4'); if(s) state = {...state, ...JSON.parse(s)}; } catch(e){} };
const saveState = () => { try { localStorage.setItem('joana_app_v4', JSON.stringify(state)); } catch(e){} };

// ===== CURRICULUM =====
const LEVELS = [
  { id:1, icon:'🅰️', name:'Vogais em Inglês', desc:'A,E,I,O,U — som e escrita', xp:30, cat:'Básico',
    intro:'As vogais em Inglês têm sons completamente diferentes do Português! Ouça com atenção e repita cada uma. 🎤',
    items:[{en:'A',pt:'A',ph:'/eɪ/ — como "ÊI"'},{en:'E',pt:'E',ph:'/iː/ — como "Í" longo'},
           {en:'I',pt:'I',ph:'/aɪ/ — como "ÁI"'},{en:'O',pt:'O',ph:'/oʊ/ — como "ÔU"'},
           {en:'U',pt:'U',ph:'/juː/ — como "IÚ"'}]},
  { id:2, icon:'🔤', name:'Alfabeto A–Z', desc:'26 letras — pronúncia inglesa', xp:50, cat:'Básico',
    intro:'O alfabeto inglês tem 26 letras — igual ao português! Mas a pronúncia é muito diferente. Vamos aprender! 📚',
    items:[{en:'A',pt:'A',ph:'/eɪ/'},{en:'B',pt:'B',ph:'/biː/'},{en:'C',pt:'C',ph:'/siː/'},
           {en:'D',pt:'D',ph:'/diː/'},{en:'E',pt:'E',ph:'/iː/'},{en:'F',pt:'F',ph:'/ɛf/'},
           {en:'G',pt:'G',ph:'/dʒiː/'},{en:'H',pt:'H',ph:'/eɪtʃ/'},{en:'I',pt:'I',ph:'/aɪ/'},
           {en:'J',pt:'J',ph:'/dʒeɪ/'},{en:'K',pt:'K',ph:'/keɪ/'},{en:'L',pt:'L',ph:'/ɛl/'},
           {en:'M',pt:'M',ph:'/ɛm/'},{en:'N',pt:'N',ph:'/ɛn/'},{en:'O',pt:'O',ph:'/oʊ/'},
           {en:'P',pt:'P',ph:'/piː/'},{en:'R',pt:'R',ph:'/ɑːr/'},{en:'S',pt:'S',ph:'/ɛs/'},
           {en:'T',pt:'T',ph:'/tiː/'},{en:'U',pt:'U',ph:'/juː/'},{en:'V',pt:'V',ph:'/viː/'},
           {en:'W',pt:'W',ph:'/ˈdʌbljuː/'},{en:'X',pt:'X',ph:'/ɛks/'},{en:'Y',pt:'Y',ph:'/waɪ/'},
           {en:'Z',pt:'Z',ph:'/ziː/'}]},
  { id:3, icon:'👋', name:'Cumprimentos', desc:'Hello, Goodbye e mais', xp:40, cat:'Básico',
    intro:'Os cumprimentos são a primeira coisa que usas ao falar inglês! Vamos aprender os essenciais. 😊',
    items:[{en:'Hello',pt:'Olá',ph:'/həˈloʊ/'},{en:'Hi',pt:'Olá (informal)',ph:'/haɪ/'},
           {en:'Good morning',pt:'Bom dia',ph:'/ɡʊd ˈmɔːrnɪŋ/'},{en:'Good afternoon',pt:'Boa tarde',ph:'/ˌæftərˈnuːn/'},
           {en:'Good night',pt:'Boa noite',ph:'/ɡʊd naɪt/'},{en:'Goodbye',pt:'Adeus',ph:'/ˌɡʊdˈbaɪ/'},
           {en:'See you later',pt:'Até logo',ph:'/siː juː ˈleɪtər/'},{en:'See you tomorrow',pt:'Até amanhã',ph:'/siː juː təˈmɒroʊ/'}]},
  { id:4, icon:'💬', name:'Palavras Essenciais', desc:'Yes, No, Please, Thank you', xp:45, cat:'Básico',
    intro:'Estas palavras usam-se todos os dias em qualquer situação! Aprende-as bem. 🗣️',
    items:[{en:'Yes',pt:'Sim',ph:'/jɛs/'},{en:'No',pt:'Não',ph:'/noʊ/'},
           {en:'Please',pt:'Por favor',ph:'/pliːz/'},{en:'Thank you',pt:'Obrigado/a',ph:'/θæŋk juː/'},
           {en:"You're welcome",pt:'De nada',ph:"/jɔːr ˈwɛlkəm/"},{en:'Sorry',pt:'Desculpa',ph:'/ˈsɒri/'},
           {en:'Excuse me',pt:'Com licença',ph:'/ɪkˈskjuːz miː/'},{en:'Help!',pt:'Ajuda!',ph:'/hɛlp/'},
           {en:"I don't know",pt:'Não sei',ph:"/aɪ doʊnt noʊ/"},{en:"I don't understand",pt:'Não percebo',ph:"/aɪ doʊnt ʌndərˈstænd/"}]},
  { id:5, icon:'🔢', name:'Números 1–20', desc:'Contar em inglês', xp:50, cat:'Intermédio',
    intro:'Os números são fundamentais para preços, horas, idades e muito mais! Vamos contar juntos. 🔢',
    items:[{en:'One',pt:'1',ph:'/wʌn/'},{en:'Two',pt:'2',ph:'/tuː/'},{en:'Three',pt:'3',ph:'/θriː/'},
           {en:'Four',pt:'4',ph:'/fɔːr/'},{en:'Five',pt:'5',ph:'/faɪv/'},{en:'Six',pt:'6',ph:'/sɪks/'},
           {en:'Seven',pt:'7',ph:'/ˈsɛvən/'},{en:'Eight',pt:'8',ph:'/eɪt/'},{en:'Nine',pt:'9',ph:'/naɪn/'},
           {en:'Ten',pt:'10',ph:'/tɛn/'},{en:'Eleven',pt:'11',ph:'/ɪˈlɛvən/'},{en:'Twelve',pt:'12',ph:'/twɛlv/'},
           {en:'Fifteen',pt:'15',ph:'/ˌfɪfˈtiːn/'},{en:'Twenty',pt:'20',ph:'/ˈtwɛnti/'}]},
  { id:6, icon:'🎨', name:'Cores', desc:'Todas as cores em inglês', xp:40, cat:'Intermédio',
    intro:'As cores são umas das primeiras coisas que aprendemos em qualquer língua! 🌈',
    items:[{en:'Red',pt:'Vermelho',ph:'/rɛd/'},{en:'Blue',pt:'Azul',ph:'/bluː/'},
           {en:'Green',pt:'Verde',ph:'/ɡriːn/'},{en:'Yellow',pt:'Amarelo',ph:'/ˈjɛloʊ/'},
           {en:'Black',pt:'Preto',ph:'/blæk/'},{en:'White',pt:'Branco',ph:'/waɪt/'},
           {en:'Orange',pt:'Laranja',ph:'/ˈɒrɪndʒ/'},{en:'Purple',pt:'Roxo',ph:'/ˈpɜːrpəl/'},
           {en:'Pink',pt:'Rosa',ph:'/pɪŋk/'},{en:'Brown',pt:'Castanho',ph:'/braʊn/'},
           {en:'Grey',pt:'Cinzento',ph:'/ɡreɪ/'}]},
  { id:7, icon:'👨‍👩‍👧', name:'Família', desc:'Mother, Father, Sister...', xp:50, cat:'Intermédio',
    intro:'Falar da família é muito comum nas conversas em inglês! Aprende estes membros. 👨‍👩‍👧',
    items:[{en:'Mother',pt:'Mãe',ph:'/ˈmʌðər/'},{en:'Father',pt:'Pai',ph:'/ˈfɑːðər/'},
           {en:'Brother',pt:'Irmão',ph:'/ˈbrʌðər/'},{en:'Sister',pt:'Irmã',ph:'/ˈsɪstər/'},
           {en:'Grandmother',pt:'Avó',ph:'/ˈɡrænˌmʌðər/'},{en:'Grandfather',pt:'Avô',ph:'/ˈɡrænˌfɑːðər/'},
           {en:'Son',pt:'Filho',ph:'/sʌn/'},{en:'Daughter',pt:'Filha',ph:'/ˈdɔːtər/'},
           {en:'Friend',pt:'Amigo/a',ph:'/frɛnd/'},{en:'Wife',pt:'Esposa',ph:'/waɪf/'},
           {en:'Husband',pt:'Marido',ph:'/ˈhʌzbənd/'}]},
  { id:8, icon:'⏰', name:'Dias & Horas', desc:'Days, morning, afternoon...', xp:55, cat:'Intermédio',
    intro:'Essencial para marcar encontros e fazer planos! Aprende os dias da semana. 📅',
    items:[{en:'Monday',pt:'Segunda-feira',ph:'/ˈmʌndeɪ/'},{en:'Tuesday',pt:'Terça-feira',ph:'/ˈtjuːzdeɪ/'},
           {en:'Wednesday',pt:'Quarta-feira',ph:'/ˈwɛnzdeɪ/'},{en:'Thursday',pt:'Quinta-feira',ph:'/ˈθɜːrzdeɪ/'},
           {en:'Friday',pt:'Sexta-feira',ph:'/ˈfraɪdeɪ/'},{en:'Saturday',pt:'Sábado',ph:'/ˈsætərdeɪ/'},
           {en:'Sunday',pt:'Domingo',ph:'/ˈsʌndeɪ/'},{en:'Morning',pt:'Manhã',ph:'/ˈmɔːrnɪŋ/'},
           {en:'Afternoon',pt:'Tarde',ph:'/ˌæftərˈnuːn/'},{en:'Night',pt:'Noite',ph:'/naɪt/'}]},
  { id:9, icon:'🍽️', name:'Comida & Bebida', desc:'Food, water, coffee...', xp:55, cat:'Intermédio',
    intro:'Num restaurante ou supermercado vais precisar destas palavras! 🍽️',
    items:[{en:'Water',pt:'Água',ph:'/ˈwɔːtər/'},{en:'Food',pt:'Comida',ph:'/fuːd/'},
           {en:'Bread',pt:'Pão',ph:'/brɛd/'},{en:'Coffee',pt:'Café',ph:'/ˈkɒfi/'},
           {en:'Tea',pt:'Chá',ph:'/tiː/'},{en:'Chicken',pt:'Frango',ph:'/ˈtʃɪkɪn/'},
           {en:'Fish',pt:'Peixe',ph:'/fɪʃ/'},{en:'Rice',pt:'Arroz',ph:'/raɪs/'},
           {en:'Salad',pt:'Salada',ph:'/ˈsæləd/'},{en:'Milk',pt:'Leite',ph:'/mɪlk/'}]},
  { id:10, icon:'🗣️', name:'Frases do Dia a Dia', desc:'Conversação real em inglês', xp:80, cat:'Avançado',
    intro:'Chegou a hora de falar em frases completas! Estas são as mais usadas no mundo. 💪',
    items:[{en:'How are you?',pt:'Como estás?',ph:'/haʊ ɑːr juː/'},{en:"I'm fine, thanks!",pt:'Estou bem, obrigado!',ph:"/aɪm faɪn θæŋks/"},
           {en:"What's your name?",pt:'Qual é o teu nome?',ph:"/wɒts jɔːr neɪm/"},{en:'My name is...',pt:'O meu nome é...',ph:'/maɪ neɪm ɪz/'},
           {en:'Where are you from?',pt:'De onde és?',ph:'/wɛr ɑːr juː frɒm/'},{en:"I'm from Portugal",pt:'Sou de Portugal',ph:"/aɪm frɒm ˈpɔːrtʃʊɡəl/"},
           {en:'Nice to meet you!',pt:'Prazer em conhecer-te!',ph:'/naɪs tə miːt juː/'},{en:'Can you repeat, please?',pt:'Podes repetir?',ph:'/kæn juː rɪˈpiːt pliːz/'},
           {en:"I'm learning English",pt:'Estou a aprender Inglês',ph:"/aɪm ˈlɜːrnɪŋ ˈɪŋɡlɪʃ/"}]},
  { id:11, icon:'🏙️', name:'Direções & Lugares', desc:'Where is...? Turn left...', xp:70, cat:'Avançado',
    intro:'Em qualquer cidade do mundo, pedir direções é essencial! Aprende estas expressões. 🗺️',
    items:[{en:'Where is...?',pt:'Onde fica...?',ph:'/wɛr ɪz/'},{en:'Turn left',pt:'Vira à esquerda',ph:'/tɜːrn lɛft/'},
           {en:'Turn right',pt:'Vira à direita',ph:'/tɜːrn raɪt/'},{en:'Go straight ahead',pt:'Segue em frente',ph:'/ɡoʊ streɪt əˈhɛd/'},
           {en:'Near here',pt:'Perto daqui',ph:'/nɪər hɪər/'},{en:'Airport',pt:'Aeroporto',ph:'/ˈɛrpɔːrt/'},
           {en:'Hotel',pt:'Hotel',ph:'/hoʊˈtɛl/'},{en:'Hospital',pt:'Hospital',ph:'/ˈhɒspɪtəl/'},
           {en:'Supermarket',pt:'Supermercado',ph:'/ˈsuːpərˌmɑːrkɪt/'}]},
  { id:12, icon:'💼', name:'Business English', desc:'Inglês profissional essencial', xp:90, cat:'Avançado',
    intro:'O inglês profissional é diferente! Aprende expressões para reuniões e emails. 💼',
    items:[{en:'I agree',pt:'Concordo',ph:'/aɪ əˈɡriː/'},{en:'I disagree',pt:'Discordo',ph:'/aɪ ˌdɪsəˈɡriː/'},
           {en:'Could you clarify?',pt:'Pode esclarecer?',ph:'/kʊd juː ˈklærɪfaɪ/'},{en:'In my opinion',pt:'Na minha opinião',ph:'/ɪn maɪ əˈpɪnjən/'},
           {en:'As soon as possible',pt:'O mais rápido possível',ph:'/æz suːn æz ˈpɒsɪbəl/'},{en:'Let me think...',pt:'Deixa-me pensar...',ph:'/lɛt miː θɪŋk/'},
           {en:'Nice to work with you',pt:'Prazer trabalhar contigo',ph:'/naɪs tə wɜːrk wɪð juː/'}]}
];

const ACHIEVEMENTS = [
  {id:'first',icon:'🌟',name:'1ª Aula',cond:s=>s.lessonsComplete.length>=1},
  {id:'five',icon:'📚',name:'5 Lições',cond:s=>s.lessonsComplete.length>=5},
  {id:'all',icon:'🏆',name:'Mestre',cond:s=>s.lessonsComplete.length>=LEVELS.length},
  {id:'str3',icon:'🔥',name:'3 Dias',cond:s=>s.streak>=3},
  {id:'str7',icon:'💎',name:'7 Dias',cond:s=>s.streak>=7},
  {id:'xp200',icon:'⚡',name:'200 XP',cond:s=>s.xp>=200},
  {id:'xp500',icon:'🚀',name:'500 XP',cond:s=>s.xp>=500},
  {id:'w30',icon:'📖',name:'30 Palavras',cond:s=>s.wordsLearned>=30},
];

const ALL_WORDS = LEVELS.flatMap(l => l.items);

// ===== VOZ FEMININA =====
let voices = [], voicesLoaded = false;
function loadVoices() {
  if (!('speechSynthesis' in window)) return;
  const upd = () => { voices = speechSynthesis.getVoices(); voicesLoaded = voices.length > 0; };
  upd(); speechSynthesis.onvoiceschanged = upd;
}
function getBestVoice(lang) {
  if (!voicesLoaded) loadVoices();
  const lc = lang === 'en' ? 'en' : 'pt';
  const femEN = ['Samantha','Victoria','Karen','Moira','Fiona','Zoe','Kate','Emily','Amy','Joanna',
                 'Google UK English Female','Google US English Female','Microsoft Zira','Microsoft Hazel'];
  const femPT = ['Luciana','Catarina','Joana','Google português','Microsoft Maria','Francisca'];
  const names = lang === 'en' ? femEN : femPT;
  for (const n of names) {
    const v = voices.find(v => v.lang.startsWith(lc) && v.name.toLowerCase().includes(n.toLowerCase()));
    if (v) return v;
  }
  return voices.find(v => v.lang.startsWith(lc) && v.localService)
      || voices.find(v => v.lang.startsWith(lc))
      || voices[0] || null;
}
function speak(text, lang = 'en', onEnd = null) {
  if (!state.voiceEnabled || !('speechSynthesis' in window)) { if (onEnd) onEnd(); return; }
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === 'en' ? 'en-GB' : 'pt-PT';
    u.rate = lang === 'en' ? 0.82 : 0.90;
    u.pitch = lang === 'en' ? 1.15 : 1.08;
    u.volume = 1;
    const v = getBestVoice(lang);
    if (v) u.voice = v;
    if (onEnd) u.onend = onEnd;
    u.onerror = () => { if (onEnd) onEnd(); };
    speechSynthesis.speak(u);
  } catch(e) { if (onEnd) onEnd(); }
}
function joanaSpeak(text) {
  if (!state.voiceEnabled) return;
  const clean = text.replace(/[\u{1F300}-\u{1FFFF}]/gu, '').replace(/[*_`#]/g, '').trim();
  speak(clean.substring(0, 260), 'pt');
}

// ===== GEMINI IA =====
let chatHistory = [];
async function askJoana(userMsg, isFloat = false, isFullChat = false) {
  chatHistory.push({ role: 'user', parts: [{ text: userMsg }] });
  if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);
  const thinkId = 'think_' + Date.now();
  if (isFloat) addFloatMsg('think', '💭 A pensar...', thinkId);
  else if (isFullChat) addChatMsg('think', '💭 A pensar...', thinkId);
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
      { method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ system_instruction:{ parts:[{ text: JOANA_SYSTEM }]}, contents: chatHistory }) }
    );
    const data = await res.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Desculpa, tive um problema. Podes repetir? 😊';
    chatHistory.push({ role:'model', parts:[{ text: reply }] });
    document.getElementById(thinkId)?.remove();
    if (isFloat) addFloatMsg('joana', reply);
    else if (isFullChat) addChatMsg('joana', reply);
    joanaSpeak(reply);
  } catch(e) {
    document.getElementById(thinkId)?.remove();
    const err = 'Problema de ligação 🌐 Verifica o WiFi!';
    if (isFloat) addFloatMsg('joana', err);
    else if (isFullChat) addChatMsg('joana', err);
  }
}

// ===== FLOAT CHAT =====
let floatOpen = false;
function toggleFloatChat() {
  floatOpen = !floatOpen;
  const fc = document.getElementById('floatChat');
  floatOpen ? fc.classList.remove('hidden') : fc.classList.add('hidden');
  if (floatOpen && document.getElementById('floatMsgs').children.length === 0) {
    const g = state.name ? `Olá, ${state.name}! Como posso ajudar? 😊` : 'Olá! Sou a Professora Joana. Em que posso ajudar? 😊';
    addFloatMsg('joana', g);
    joanaSpeak(g);
  }
}
function addFloatMsg(type, text, id = null) {
  const wrap = document.getElementById('floatMsgs');
  const div = document.createElement('div');
  div.className = `fp-msg ${type}`;
  div.textContent = text;
  if (id) div.id = id;
  wrap.appendChild(div);
  wrap.scrollTop = wrap.scrollHeight;
}
async function sendFloatChat() {
  const inp = document.getElementById('floatInput');
  const msg = inp.value.trim(); if (!msg) return;
  inp.value = '';
  addFloatMsg('user', msg);
  await askJoana(msg, true, false);
}
document.getElementById('floatInput').addEventListener('keydown', e => { if (e.key === 'Enter') sendFloatChat(); });

// ===== FULL CHAT =====
function addChatMsg(type, text, id = null) {
  const wrap = document.getElementById('fullChatMessages');
  if (type === 'joana' || type === 'think') {
    const row = document.createElement('div');
    row.className = 'chat-row joana';
    if (id) row.id = id;
    const av = document.createElement('div'); av.className = 'chat-av';
    av.innerHTML = `<img src="${IMG_CHAT}" alt="Joana"/>`;
    const bub = document.createElement('div'); bub.className = 'chat-bubble';
    if (type === 'think') {
      bub.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
    } else { bub.textContent = text; }
    row.appendChild(av); row.appendChild(bub);
    wrap.appendChild(row);
  } else {
    const row = document.createElement('div'); row.className = 'chat-row user';
    if (id) row.id = id;
    const inner = document.createElement('div');
    inner.style.cssText = 'display:flex;flex-direction:column;align-items:flex-end';
    const bub = document.createElement('div'); bub.className = 'chat-bubble'; bub.textContent = text;
    const time = document.createElement('div'); time.className = 'chat-time';
    time.textContent = new Date().toLocaleTimeString('pt', { hour:'2-digit', minute:'2-digit' });
    inner.appendChild(bub); inner.appendChild(time);
    row.appendChild(inner); wrap.appendChild(row);
  }
  wrap.scrollTop = wrap.scrollHeight;
}
async function sendFullChat() {
  const inp = document.getElementById('fullChatInput');
  const msg = inp.value.trim(); if (!msg) return;
  inp.value = '';
  addChatMsg('user', msg);
  await askJoana(msg, false, true);
}
document.getElementById('fullChatInput').addEventListener('keydown', e => { if (e.key === 'Enter') sendFullChat(); });

let langMode = 'pt';
function toggleLang() {
  langMode = langMode === 'pt' ? 'en' : 'pt';
  document.getElementById('langToggle').classList.toggle('off');
}

// ===== VOZ INPUT =====
let recognition = null, voiceTarget = 'float';
function startVoiceInput(target = 'float') {
  voiceTarget = target;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { showToast('Voz não suportada neste browser'); return; }
  const fabMic = document.getElementById('floatMicBtn');
  const fullMic = document.getElementById('fullVoiceBtn');
  const wave = document.getElementById('voiceWaveRow');
  if (recognition) {
    recognition.stop();
    fabMic?.classList.remove('listening'); fullMic?.classList.remove('listening'); wave?.classList.remove('active');
    return;
  }
  recognition = new SR();
  recognition.lang = 'pt-PT'; recognition.continuous = false; recognition.interimResults = false;
  recognition.onstart = () => {
    fabMic?.classList.add('listening'); fullMic?.classList.add('listening'); wave?.classList.add('active');
  };
  recognition.onresult = e => {
    const txt = e.results[0][0].transcript;
    if (voiceTarget === 'full') { document.getElementById('fullChatInput').value = txt; sendFullChat(); }
    else { document.getElementById('floatInput').value = txt; sendFloatChat(); }
  };
  recognition.onend = () => {
    fabMic?.classList.remove('listening'); fullMic?.classList.remove('listening'); wave?.classList.remove('active'); recognition = null;
  };
  recognition.onerror = () => {
    fabMic?.classList.remove('listening'); fullMic?.classList.remove('listening'); wave?.classList.remove('active'); recognition = null;
    showToast('Não te ouvi. Tenta de novo! 🎙');
  };
  recognition.start();
}

// ===== NAVEGAÇÃO =====
let currentPage = 'home';
function goPage(page, btn) {
  if (currentPage === page) return;
  currentPage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`page-${page}`).classList.add('active');
  if (btn) btn.classList.add('active');
  const fab = document.getElementById('joanaFab');
  const fc = document.getElementById('floatChat');
  if (page === 'chat') { fab.style.display = 'none'; fc.classList.add('hidden'); floatOpen = false; }
  else { fab.style.display = ''; }
  if (page === 'aulas') showLevelsList();
  if (page === 'perfil') renderPerfil();
  if (page === 'home') renderHome();
}

// ===== HOME =====
function renderHome() {
  const s = state;
  document.getElementById('heroGreeting').textContent = s.name ? `Olá, ${s.name}! 👋` : 'Olá! Bem-vindo 👋';
  document.getElementById('userLevel').textContent = s.level;
  document.getElementById('streakCount').textContent = s.streak;
  const need = s.level * 100, cur = s.xp % need, pct = Math.min(100, Math.round(cur/need*100));
  document.getElementById('xpFill').style.width = pct + '%';
  document.getElementById('xpText').textContent = `${cur} / ${need} XP`;
  const gp = Math.min(100, s.lessonsComplete.length * 9);
  document.getElementById('goalPct').textContent = gp + '%';
  document.getElementById('goalBar').style.width = gp + '%';
  document.getElementById('bStreak').textContent = s.streak;
  document.getElementById('bXP').textContent = s.xp;
  document.getElementById('bLevel').textContent = s.level;
  const nxt = LEVELS.find(l => !s.lessonsComplete.includes(l.id));
  document.getElementById('nextLessonTitle').textContent = nxt ? nxt.name : '🎉 Todas concluídas!';
  const tips = ['Pratica vocabulário hoje para subir de nível!','Tenta o Listening — melhora muito a pronúncia!','Business English desbloqueia novas oportunidades!','Faz 3 lições seguidas para ganhar o badge 🔥'];
  document.getElementById('joanaHomeTip').textContent = `"${tips[s.lessonsComplete.length % tips.length]}"`;
  renderLessonsGrid();
  renderBadges('achievementsRow');
}

function renderLessonsGrid() {
  const grid = document.getElementById('lessonsGrid'); grid.innerHTML = '';
  LEVELS.forEach((lv, i) => {
    const done = state.lessonsComplete.includes(lv.id);
    const locked = i > 0 && !state.lessonsComplete.includes(LEVELS[i-1].id);
    const d = document.createElement('div');
    d.className = `lesson-tile${done?' done':''}${locked?' locked':''}`;
    d.innerHTML = `<div class="tile-icon">${lv.icon}</div><div class="tile-name">${lv.name}</div><div class="tile-sub">${lv.cat}</div><div class="tile-xp">+${lv.xp} XP</div>${done?'<div class="tile-done">✅ Concluído</div>':''}`;
    if (!locked) d.onclick = () => { goPage('aulas', document.querySelector('[data-page="aulas"]')); setTimeout(() => openLesson(lv), 120); };
    grid.appendChild(d);
  });
}

function renderBadges(id) {
  const row = document.getElementById(id); if (!row) return; row.innerHTML = '';
  ACHIEVEMENTS.forEach(a => {
    const earned = a.cond(state);
    const d = document.createElement('div'); d.className = `badge-item${earned?' earned':''}`;
    d.innerHTML = `<span class="badge-icon">${earned?a.icon:'🔒'}</span><span class="badge-name">${a.name}</span>`;
    row.appendChild(d);
  });
}

// ===== AULAS =====
let currentLesson = null;
function showLevelsList() {
  document.getElementById('levelsView').classList.remove('hidden');
  document.getElementById('lessonView').classList.add('hidden');
  document.getElementById('backBtn').classList.add('hidden');
  document.getElementById('aulasTitle').textContent = 'Lições';
  const list = document.getElementById('levelsList'); list.innerHTML = '';
  LEVELS.forEach((lv, i) => {
    const done = state.lessonsComplete.includes(lv.id);
    const locked = i > 0 && !state.lessonsComplete.includes(LEVELS[i-1].id);
    const d = document.createElement('div');
    d.className = `level-row${done?' done':''}${locked?' locked':''}`;
    d.innerHTML = `<div class="lvl-num">${lv.id}</div><div class="lvl-info"><div class="lvl-name">${lv.icon} ${lv.name}</div><div class="lvl-desc">${lv.desc} · +${lv.xp} XP · ${lv.cat}</div></div><span class="ms">${done?'check_circle':locked?'lock':'chevron_right'}</span>`;
    if (done) d.querySelector('.ms').style.color = '#16a34a';
    if (!locked) d.onclick = () => openLesson(lv);
    list.appendChild(d);
  });
}

function openLesson(lv) {
  currentLesson = lv;
  document.getElementById('levelsView').classList.add('hidden');
  document.getElementById('lessonView').classList.remove('hidden');
  document.getElementById('backBtn').classList.remove('hidden');
  document.getElementById('aulasTitle').textContent = lv.name;
  const already = state.lessonsComplete.includes(lv.id);
  document.getElementById('lessonContent').innerHTML = `
    <div class="lesson-intro-card">
      <img class="lesson-ai-av" src="${IMG_JOANA}" alt="Joana"/>
      <div class="lesson-intro-txt">${lv.intro}</div>
    </div>
    <div class="lesson-items">
      ${lv.items.map(it => `
        <div class="lesson-item">
          <div>
            <div class="item-en">${it.en}</div>
            <div class="item-pt">${it.pt}</div>
            <div class="item-phone">${it.ph}</div>
          </div>
          <button class="speak-btn" onclick="speak('${it.en.replace(/'/g,"\\'")}','en')">
            <span class="ms filled">volume_up</span>
          </button>
        </div>`).join('')}
    </div>
    <button class="lesson-done-btn" onclick="completeLesson()">
      ${already ? '🔄 Repetir lição' : `🎉 Concluir e ganhar +${lv.xp} XP`}
    </button>
    <div class="page-sig">Bráulio Aurélio<small>Criador</small></div>`;
  setTimeout(() => { const t = lv.intro.replace(/[\u{1F300}-\u{1FFFF}]/gu,'').trim(); speak(t,'pt'); }, 500);
}

function completeLesson() {
  if (!currentLesson) return;
  const already = state.lessonsComplete.includes(currentLesson.id);
  if (!already) {
    state.lessonsComplete.push(currentLesson.id);
    state.xp += currentLesson.xp;
    state.wordsLearned += currentLesson.items.length;
    checkLevelUp(); confettiBurst();
    showToast(`+${currentLesson.xp} XP! Muito bem! 🎉`);
    const msg = `Parabéns por concluíres "${currentLesson.name}"! Continua assim, estás a aprender muito bem! 🎓`;
    addFloatMsg('joana', msg);
    joanaSpeak(`Parabéns! Completaste a lição ${currentLesson.name}!`);
    checkAchievements();
  } else { showToast('Lição já concluída! Pratica no Chat 💪'); }
  saveState(); renderHome();
}

function checkLevelUp() {
  if (state.xp >= state.level * 100) { state.level++; showToast(`🚀 Nível ${state.level} desbloqueado!`); confettiBurst(); }
}

// ===== QUIZ =====
let quiz = { type:null, questions:[], index:0, score:0, total:8 };
const shuffle = a => { const b=[...a]; for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b; };

function startQuiz(type) {
  goPage('aulas', document.querySelector('[data-page="aulas"]'));
  setTimeout(() => {
    quiz = { type, questions: shuffle(ALL_WORDS).slice(0,8), index:0, score:0, total:8 };
    document.getElementById('levelsView').classList.add('hidden');
    document.getElementById('lessonView').classList.remove('hidden');
    document.getElementById('backBtn').classList.remove('hidden');
    document.getElementById('aulasTitle').textContent =
      type==='vocab'?'📝 Vocabulário':type==='listen'?'👂 Listening':type==='translate'?'🔄 Tradução':'🔤 Pronúncia';
    renderQuiz();
  }, 150);
}

function renderQuiz() {
  if (quiz.index >= quiz.total) { showQuizResult(); return; }
  const q = quiz.questions[quiz.index];
  const pct = Math.round(quiz.index/quiz.total*100);
  let html = `<div class="quiz-wrap">
    <div class="qz-prog-lbl">Pergunta ${quiz.index+1} de ${quiz.total}</div>
    <div class="qz-prog-track"><div class="qz-prog-fill" style="width:${pct}%"></div></div>
    <div class="qz-header"><img class="qz-av" src="${IMG_JOANA}" alt="Joana"/><div>`;

  if (quiz.type === 'vocab') {
    const wrong = shuffle(ALL_WORDS.filter(w=>w.en!==q.en)).slice(0,3).map(w=>w.pt);
    const opts = shuffle([q.pt,...wrong]); const lets=['A','B','C','D'];
    html += `<div class="qz-q">${q.en}</div><div class="qz-qs">O que significa esta palavra?</div></div></div>
    <div class="qz-opts">`;
    opts.forEach((o,i) => {
      html += `<button class="qopt" onclick="selectOpt(this,'${o}','${q.pt.replace(/'/g,"\\'")}')"><span class="opt-ltr">${lets[i]}</span>${o}</button>`;
    }); html += `</div>`;
  } else if (quiz.type === 'listen') {
    html += `<div class="qz-q" style="font-size:14px">Ouve e escreve em Inglês</div></div></div>
    <button class="lesson-done-btn" style="margin-bottom:10px" onclick="speak('${q.en.replace(/'/g,"\\'")}','en')">🔊 Ouvir palavra</button>
    <input class="qz-inp" id="qInp" placeholder="Escreve a palavra..." autocomplete="off"/>
    <button class="qz-sub" onclick="checkTxt(document.getElementById('qInp').value,'${q.en.replace(/'/g,"\\'")}')">Confirmar ✓</button>`;
  } else if (quiz.type === 'translate') {
    const ptEn = Math.random()>.5; const ans = ptEn?q.en:q.pt;
    html += `<div class="qz-q">${ptEn?q.pt:q.en}</div><div class="qz-qs">Traduz para ${ptEn?'Inglês':'Português'}</div></div></div>
    <input class="qz-inp" id="qInp" placeholder="A tua resposta..." autocomplete="off"/>
    <button class="qz-sub" onclick="checkTxt(document.getElementById('qInp').value,'${ans.replace(/'/g,"\\'")}')">Confirmar ✓</button>`;
  } else {
    const scr = q.en.split('').sort(()=>Math.random()-.5).join(' ');
    html += `<div class="qz-q" style="font-size:14px">Organiza as letras</div></div></div>
    <div style="font-size:24px;font-weight:900;letter-spacing:6px;color:#286a50;text-align:center;margin:10px 0">${scr}</div>
    <div style="font-size:11px;color:#717974;text-align:center;margin-bottom:10px">Tradução: ${q.pt}</div>
    <input class="qz-inp" id="qInp" placeholder="Escreve a palavra..." autocomplete="off"/>
    <button class="qz-sub" onclick="checkTxt(document.getElementById('qInp').value,'${q.en.replace(/'/g,"\\'")}')">Confirmar ✓</button>`;
  }
  html += `</div>`;
  document.getElementById('lessonContent').innerHTML = html;
  if (quiz.type === 'listen') setTimeout(() => speak(q.en,'en'), 700);
}

function selectOpt(el, sel, correct) {
  document.querySelectorAll('.qopt').forEach(o => o.style.pointerEvents='none');
  const ok = sel === correct;
  el.classList.add(ok?'correct':'wrong');
  if (!ok) document.querySelectorAll('.qopt').forEach(o => { if(o.textContent.trim()===correct) o.classList.add('correct'); });
  if (ok) quiz.score++;
  showFeedback(ok, correct);
  setTimeout(() => { hideFeedback(); quiz.index++; renderQuiz(); }, 1800);
}

function checkTxt(val, correct) {
  const cl = s => s.trim().toLowerCase().replace(/[.,!?']/g,'');
  const ok = cl(val) === cl(correct);
  if (ok) quiz.score++;
  showFeedback(ok, correct);
  setTimeout(() => { hideFeedback(); quiz.index++; renderQuiz(); }, 1800);
}

function showFeedback(ok, correct) {
  const inner = document.getElementById('feedbackInner');
  inner.className = `feedback-inner ${ok?'ok':'fail'}`;
  document.getElementById('fbIcon').textContent = ok?'✓':'✕';
  document.getElementById('fbTitle').textContent = ok?'Correto! 🎉':'Quase lá!';
  document.getElementById('fbMsg').textContent = ok?'Excelente! Continua assim!':`Era: "${correct}"`;
  document.getElementById('feedbackTray').classList.remove('hidden');
  speak(ok?'Correct! Well done!':correct,'en');
}
function hideFeedback() { document.getElementById('feedbackTray').classList.add('hidden'); }
function nextQuestion() { hideFeedback(); quiz.index++; renderQuiz(); }

function showQuizResult() {
  const pct = Math.round(quiz.score/quiz.total*100), xp = quiz.score*6;
  state.xp += xp; checkLevelUp(); saveState(); renderHome();
  if (pct>=70) confettiBurst();
  const emoji = pct>=80?'🏆':pct>=60?'👍':'📖';
  const msg = pct>=80?'Excelente trabalho!':pct>=60?'Muito bem!':'Continua a praticar!';
  document.getElementById('lessonContent').innerHTML = `
    <div style="text-align:center;padding:20px 12px">
      <div style="font-size:60px;margin-bottom:12px">${emoji}</div>
      <div style="font-size:22px;font-weight:900;color:#00261a;margin-bottom:8px">${msg}</div>
      <div style="font-size:42px;font-weight:900;color:#286a50">${quiz.score}/${quiz.total}</div>
      <div style="color:#717974;font-size:13px;margin:5px 0">${pct}% correto</div>
      <div style="color:#0f3d2e;font-weight:800;font-size:15px;margin-bottom:20px">+${xp} XP ganhos!</div>
      <button class="lesson-done-btn" onclick="showLevelsList()">Ver mais lições ▶</button>
    </div>`;
  const jm = `${msg} Fizeste ${quiz.score} de ${quiz.total} certas e ganhaste ${xp} XP! ${pct>=70?'Estou muito orgulhosa de ti! 🌟':'Continua a praticar comigo! 💪'}`;
  addFloatMsg('joana', jm);
  joanaSpeak(jm);
}

// ===== PERFIL =====
function renderPerfil() {
  const s = state;
  document.getElementById('profileName').textContent = s.name || 'Estudante';
  document.getElementById('profileLevel').textContent = s.level;
  document.getElementById('pRoleLvl').textContent = s.level;
  document.getElementById('pStreak').textContent = s.streak + ' Dias';
  document.getElementById('pWords').textContent = s.wordsLearned;
  document.getElementById('pXP').textContent = s.xp;
  const f = Math.min(100, Math.round(s.lessonsComplete.length/LEVELS.length*100));
  document.getElementById('perfFluency').textContent = f + '%';
  document.getElementById('perfFluencyBar').style.width = f + '%';
  document.getElementById('pfPron').textContent = Math.min(100,f+4)+'%';
  document.getElementById('pfGram').textContent = Math.max(0,f-7)+'%';
  document.getElementById('pfEsc').textContent = Math.min(100,f+9)+'%';
  renderBadges('profileBadges');
  const nxtA = ACHIEVEMENTS.find(a=>!a.cond(s));
  document.getElementById('nextAch').textContent = nxtA ? `"${nxtA.name}" — continua a praticar!` : 'Todas as conquistas desbloqueadas! 🏆';
  const achDone = ACHIEVEMENTS.filter(a=>a.cond(s)).length;
  document.getElementById('nextAchBar').style.width = Math.round(achDone/ACHIEVEMENTS.length*100)+'%';
  const tips=['Pratica vocabulário hoje para subir de nível!','Tenta o Listening!','Business English!','Faz lições seguidas!'];
  document.getElementById('joanaInsight').textContent = tips[s.lessonsComplete.length%tips.length];
}

// ===== SETTINGS =====
function editName() {
  openModal(`<div class="modal-title">✏️ O teu nome</div>
    <input class="modal-inp" id="nameInp" placeholder="Escreve o teu nome..." maxlength="30" value="${state.name||''}"/>
    <button class="modal-btn" onclick="saveName()">Guardar</button>`);
  setTimeout(() => document.getElementById('nameInp')?.focus(), 100);
}
function saveName() {
  const v = document.getElementById('nameInp')?.value.trim();
  if (v) { state.name=v; saveState(); renderHome(); renderPerfil(); closeModal(); showToast(`Olá, ${v}! 👋`); joanaSpeak(`Olá ${v}! Que bom ter-te aqui!`); }
}
function toggleVoice() {
  state.voiceEnabled = !state.voiceEnabled;
  document.getElementById('voiceToggle').textContent = state.voiceEnabled?'Ativada':'Desativada';
  saveState(); showToast(state.voiceEnabled?'🔊 Voz ativada':'🔇 Voz desativada');
  if (state.voiceEnabled) joanaSpeak('Voz ativada!');
}
function resetProgress() {
  openModal(`<div class="modal-title">🔄 Reiniciar progresso</div>
    <p style="color:#717974;margin-bottom:13px;font-size:13px">Tens a certeza? Todo o progresso será apagado.</p>
    <button class="modal-btn danger" onclick="confirmReset()">Sim, reiniciar tudo</button>`);
}
function confirmReset() {
  state = { name:state.name, xp:0, level:1, streak:0, lastDay:null, lessonsComplete:[], wordsLearned:0, totalDays:1, voiceEnabled:true, firstVisit:false };
  saveState(); renderHome(); renderPerfil(); closeModal();
  showToast('Reiniciado! Vamos começar de novo 💪');
}

// ===== ACHIEVEMENTS =====
function checkAchievements() {
  ACHIEVEMENTS.forEach(a => {
    const k = `joana_ach_v4_${a.id}`;
    if (!localStorage.getItem(k) && a.cond(state)) {
      localStorage.setItem(k,'1');
      setTimeout(() => { showToast(`🏅 Conquista: ${a.name}!`); joanaSpeak(`Parabéns! Desbloqueaste a conquista ${a.name}!`); }, 1200);
    }
  });
  renderBadges('achievementsRow');
  renderBadges('profileBadges');
}

// ===== STREAK =====
function checkStreak() {
  const today = new Date().toDateString();
  if (state.lastDay !== today) {
    const y = new Date(); y.setDate(y.getDate()-1);
    state.streak = state.lastDay === y.toDateString() ? state.streak+1 : 1;
    state.lastDay = today; state.totalDays = (state.totalDays||0)+1; saveState();
  }
}

// ===== MODAL =====
function openModal(html) { document.getElementById('modalContent').innerHTML=html; document.getElementById('modal').classList.remove('hidden'); }
function closeModal() { document.getElementById('modal').classList.add('hidden'); }
document.getElementById('modal').addEventListener('click', e => { if(e.target===document.getElementById('modal')) closeModal(); });

// ===== TOAST =====
function showToast(msg) {
  document.querySelector('.toast')?.remove();
  const t = document.createElement('div'); t.className='toast'; t.textContent=msg;
  document.body.appendChild(t); setTimeout(()=>t.remove(), 3200);
}

// ===== CONFETTI =====
function confettiBurst() {
  const e=['🎉','⭐','🌟','✨','🎊','💫','🏆','🎓'];
  for(let i=0;i<10;i++) setTimeout(()=>{
    const el=document.createElement('div'); el.className='confetti';
    el.textContent=e[Math.floor(Math.random()*e.length)];
    el.style.left=`${15+Math.random()*70}%`; el.style.top=`${10+Math.random()*50}%`;
    document.body.appendChild(el); setTimeout(()=>el.remove(),2200);
  }, i*80);
}

// ===== BOOT =====
function boot() {
  loadState(); loadVoices(); checkStreak();
  const isFirst = state.firstVisit !== false;
  if (isFirst) { state.firstVisit=false; saveState(); }
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(()=>{});

  setTimeout(() => {
    const s = document.getElementById('splash');
    s.style.transition = 'opacity .4s ease'; s.style.opacity = '0';
    setTimeout(() => {
      s.classList.add('hidden');
      document.getElementById('app').classList.remove('hidden');
      renderHome();
      const greeting = isFirst
        ? 'Olá bom dia! O que posso ajudar? 😊'
        : `Olá${state.name?', '+state.name:''}! Sou a Professora Joana — o que vamos fazer hoje? 😊`;
      setTimeout(() => {
        addFloatMsg('joana', greeting);
        addChatMsg('joana', greeting);
        joanaSpeak(greeting);
      }, 700);
    }, 420);
  }, 3000);
}

window.addEventListener('load', boot);
