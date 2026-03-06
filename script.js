const MAX_GUESSES = 6;
const FLIP_DURATION_MS = 420;
const FLIP_STAGGER_MS = 180;
const DICTIONARY_API_ROOT = "https://api.dictionaryapi.dev/api/v2/entries/en";
const STATS_STORAGE_KEY = "wordleCloneStatsV2";
const THEME_STORAGE_KEY = "wordleCloneThemeV1";
const SUPABASE_URL_STORAGE_KEY = "wordlerSupabaseUrl";
const SUPABASE_ANON_STORAGE_KEY = "wordlerSupabaseAnon";

const VERY_EASY_WORDS = [
  "ANT", "APE", "ARM", "BAG", "BAR", "BAT", "BEE", "BIG", "BOX", "BOY",
  "BUS", "CAN", "CAP", "CAR", "CAT", "CUP", "DOG", "DRY", "EAR", "EAT",
  "EGG", "EYE", "FAN", "FAR", "FEW", "FIG", "FIN", "FIT", "FLY", "FOG",
  "FOX", "FUN", "GAS", "GEM", "GOD", "GUN", "HAT", "HEN", "HOP", "HOT",
  "ICE", "INK", "JAM", "JET", "JOY", "KEY", "KID", "LEG", "LIP", "LOG",
  "MAP", "MIX", "NET", "NOD", "NUT", "OAK", "OWL", "PAN", "PEN", "PET",
  "PIG", "PIN", "RAT", "RAY", "RED", "RUG", "RUN", "SEA", "SIT", "SKY",
  "SON", "SUN", "TAG", "TEN", "TIN", "TIP", "TOP", "TOY", "USE", "VAN",
  "WAR", "WAX", "WEB", "WIN", "ZIP"
];

const EASY_WORDS = [
  "ABLE", "ACID", "AGED", "ALSO", "AREA", "ARMY", "AWAY", "BABY", "BACK", "BALL",
  "BAND", "BANK", "BASE", "BATH", "BEAR", "BEAT", "BEEN", "BELL", "BELT", "BEST",
  "BILL", "BIRD", "BLOW", "BLUE", "BOAT", "BODY", "BOMB", "BOND", "BONE", "BOOK",
  "BORN", "BOSS", "BOTH", "BOWL", "BULK", "BURN", "BUSH", "BUSY", "CALL", "CALM",
  "CAME", "CAMP", "CARD", "CARE", "CASE", "CASH", "CAST", "CELL", "CHAT", "CHIP",
  "CITY", "CLUB", "COAL", "COAT", "CODE", "COLD", "COME", "COOK", "COOL", "COPE",
  "COPY", "CORE", "COST", "CREW", "CROP", "DARK", "DATA", "DATE", "DAWN", "DAYS",
  "DEAL", "DEAR", "DEEP", "DESK", "DIAL", "DIET", "DISC", "DOES", "DONE", "DOOR",
  "DOWN", "DRAW", "DROP", "DRUG", "DUAL", "DUST", "DUTY", "EACH", "EARN", "EASE"
];

const NORMAL_WORDS = [
  "ABOUT", "ABOVE", "ABUSE", "ACTOR", "ACUTE", "ADMIT", "ADOPT", "ADULT",
  "AFTER", "AGAIN", "AGENT", "AGREE", "AHEAD", "ALARM", "ALBUM", "ALERT",
  "ALIKE", "ALIVE", "ALLOW", "ALONE", "ALONG", "ALTER", "AMONG", "ANGER",
  "ANGLE", "ANGRY", "APART", "APPLE", "APPLY", "ARENA", "ARGUE", "ARISE",
  "ARRAY", "ASIDE", "ASSET", "AUDIO", "AUDIT", "AVOID", "AWARD", "AWARE",
  "BADLY", "BAKER", "BASES", "BASIC", "BEACH", "BEGAN", "BEGIN", "BEING",
  "BELOW", "BENCH", "BILLY", "BIRTH", "BLACK", "BLAME", "BLIND", "BLOCK",
  "BLOOD", "BOARD", "BOOST", "BOOTH", "BOUND", "BRAIN", "BRAND", "BREAD",
  "BREAK", "BREED", "BRIEF", "BRING", "BROAD", "BROKE", "BROWN", "BUILD",
  "BUILT", "BUYER", "CABLE", "CARRY", "CATCH", "CAUSE", "CHAIN", "CHAIR",
  "CHART", "CHASE", "CHEAP", "CHECK", "CHEST", "CHIEF", "CHILD", "CHINA",
  "CHOSE", "CIVIL", "CLAIM", "CLASS", "CLEAN", "CLEAR", "CLICK", "CLOCK",
  "CLOSE", "COACH", "COAST", "COULD", "COUNT", "COURT", "COVER", "CRAFT",
  "CRASH", "CREAM", "CRIME", "CROSS", "CROWD", "CROWN", "CURVE", "CYCLE",
  "DAILY", "DANCE", "DATED", "DEALT", "DEATH", "DEBUT", "DELAY", "DEPTH",
  "DOING", "DOUBT", "DOZEN", "DRAFT", "DRAMA", "DRAWN", "DREAM", "DRESS",
  "DRILL", "DRINK", "DRIVE", "DROVE", "DYING", "EAGER", "EARLY", "EARTH",
  "EIGHT", "ELDER", "ELECT", "ELITE", "EMPTY", "ENEMY", "ENJOY", "ENTER",
  "ENTRY", "EQUAL", "ERROR", "EVENT", "EVERY", "EXACT", "EXIST", "EXTRA",
  "FAITH", "FALSE", "FAULT", "FIBER", "FIELD", "FIFTH", "FIFTY", "FIGHT",
  "FINAL", "FIRST", "FIXED", "FLASH", "FLEET", "FLOOR", "FLUID", "FOCUS",
  "FORCE", "FORTH", "FORTY", "FORUM", "FOUND", "FRAME", "FRANK", "FRAUD",
  "FRESH", "FRONT", "FRUIT", "FULLY", "FUNNY", "GIANT", "GIVEN", "GLASS",
  "GLOBE", "GOING", "GRACE", "GRADE", "GRAND", "GRANT", "GRASS", "GREAT",
  "GREEN", "GROSS", "GROUP", "GROWN", "GUARD", "GUESS", "GUEST", "GUIDE",
  "HAPPY", "HEART", "HEAVY", "HENCE", "HONEY", "HORSE", "HOTEL", "HOUSE",
  "HUMAN", "IDEAL", "IMAGE", "INDEX", "INNER", "INPUT", "ISSUE", "JAPAN",
  "JUDGE", "KNOWN", "LABEL", "LARGE", "LASER", "LATER", "LAUGH", "LAYER",
  "LEARN", "LEASE", "LEAST", "LEAVE", "LEGAL", "LEMON", "LEVEL", "LIGHT",
  "LIMIT", "LOCAL", "LOGIC", "LOOSE", "LOWER", "LUCKY", "LUNCH", "MAJOR",
  "MAKER", "MARCH", "MATCH", "MAYBE", "MAYOR", "MEANT", "MEDIA", "METAL",
  "MIGHT", "MINOR", "MINUS", "MIXED", "MODEL", "MONEY", "MONTH", "MORAL",
  "MOTOR", "MOUNT", "MOUSE", "MOUTH", "MOVIE", "MUSIC", "NEEDS", "NEVER",
  "NEWLY", "NIGHT", "NOISE", "NORTH", "NOTED", "NOVEL", "NURSE", "OCEAN",
  "OFFER", "OFTEN", "ORDER", "OTHER", "OUGHT", "PAINT", "PANEL", "PAPER",
  "PARTY", "PEACE", "PHASE", "PHONE", "PHOTO", "PIANO", "PIECE", "PILOT",
  "PITCH", "PLACE", "PLAIN", "PLANE", "PLANT", "PLATE", "POINT", "POUND",
  "POWER", "PRESS", "PRICE", "PRIDE", "PRIME", "PRINT", "PRIOR", "PRIZE",
  "PROOF", "PROUD", "PROVE", "QUEEN", "QUICK", "QUIET", "QUITE", "RADIO",
  "RAISE", "RANGE", "RAPID", "RATIO", "REACH", "READY", "REFER", "RIGHT",
  "RIVAL", "RIVER", "ROBOT", "ROUGH", "ROUND", "ROUTE", "ROYAL", "RURAL",
  "SAFER", "SAINT", "SALAD", "SCALE", "SCENE", "SCOPE", "SCORE", "SENSE",
  "SERVE", "SEVEN", "SHALL", "SHAPE", "SHARE", "SHARP", "SHEET", "SHELF",
  "SHELL", "SHIFT", "SHINE", "SHIRT", "SHOCK", "SHOOT", "SHORT", "SHOWN",
  "SIDES", "SIGHT", "SINCE", "SKILL", "SLEEP", "SLIDE", "SMALL", "SMART",
  "SMILE", "SMOKE", "SOLID", "SOLVE", "SORRY", "SOUND", "SOUTH", "SPACE",
  "SPARE", "SPEAK", "SPEED", "SPEND", "SPENT", "SPLIT", "SPOKE", "SPORT",
  "STAFF", "STAGE", "STAKE", "STAND", "START", "STATE", "STEAM", "STEEL",
  "STEEP", "STILL", "STOCK", "STONE", "STOOD", "STORE", "STORM", "STORY",
  "STRIP", "STUCK", "STUDY", "STUFF", "STYLE", "SUGAR", "SUITE", "SUPER",
  "SWEET", "TABLE", "TAKEN", "TASTE", "TAXES", "TEACH", "TEETH", "THANK",
  "THEIR", "THEME", "THERE", "THESE", "THICK", "THING", "THINK", "THIRD",
  "THOSE", "THREE", "THREW", "THROW", "TIGHT", "TIMES", "TIRED", "TITLE",
  "TODAY", "TOPIC", "TOTAL", "TOUCH", "TOUGH", "TOWER", "TRACK", "TRADE",
  "TRAIN", "TREAT", "TREND", "TRIAL", "TRIED", "TRIES", "TRUCK", "TRULY",
  "TRUST", "TRUTH", "TWICE", "UNDER", "UNDUE", "UNION", "UNITY", "UNTIL",
  "UPPER", "UPSET", "URBAN", "USAGE", "USUAL", "VALID", "VALUE", "VIDEO",
  "VIRUS", "VISIT", "VITAL", "VOICE", "WASTE", "WATCH", "WATER", "WHEEL",
  "WHERE", "WHICH", "WHILE", "WHITE", "WHOLE", "WHOSE", "WOMAN", "WOMEN",
  "WORLD", "WORRY", "WORSE", "WORST", "WORTH", "WOULD", "WRITE", "WRONG",
  "YIELD", "YOUNG", "YOUTH"
];

const HARD_WORDS = [
  "ABSORB", "ACCESS", "ACROSS", "ACTION", "ACTIVE", "ADVICE", "ALMOST", "ALWAYS",
  "AMOUNT", "ANIMAL", "ANNUAL", "ANSWER", "ANYONE", "APPEAR", "AROUND", "ARRIVE",
  "ARTIST", "ASPECT", "ASSESS", "ASSIST", "ASSUME", "ATTEND", "AUGUST", "AUTHOR",
  "BACKUP", "BECOME", "BEFORE", "BEHALF", "BELIEF", "BESIDE", "BETTER", "BOTTLE",
  "BOTTOM", "BRIDGE", "BRIGHT", "BROKEN", "BUDGET", "CAMERA", "CANNOT", "CARBON",
  "CAREER", "CASTLE", "CAUGHT", "CENTER", "CHANCE", "CHANGE", "CHOICE", "CHURCH",
  "CIRCLE", "CLIENT", "CLOSED", "COFFEE", "COLUMN", "COMMIT", "COMMON", "CORNER",
  "CREATE", "CREDIT", "CUSTOM", "DAMAGE", "DANGER", "DEBATE", "DECADE", "DECIDE",
  "DEFEND", "DEGREE", "DELETE", "DEMAND", "DEPEND", "DESIGN", "DETAIL", "DEVICE",
  "DOCTOR", "DOUBLE", "DRIVER", "EASILY", "EDITOR", "EFFECT", "EFFORT", "EITHER",
  "ELSEWHERE", "EMERGE", "EMPIRE", "ENABLE", "ENERGY", "ENGAGE", "ENGINE", "ENOUGH",
  "ESCAPE", "ESTATE", "ETHICS", "EXCEPT", "EXPORT", "EXTEND", "FAMILY", "FAMOUS",
  "FATHER", "FELLOW", "FEMALE", "FIGURE", "FILTER", "FOLLOW", "FORMAT", "FORMER",
  "FUTURE", "GARDEN", "GLOBAL", "GOLDEN", "GROWTH", "HANDLE", "HAPPEN", "HEALTH",
  "HIGHLY", "HONEST", "IMPACT", "IMPORT", "INCOME", "INDEED", "INFORM", "INSIDE",
  "INTEND", "INVEST", "ISLAND", "ITSELF", "JUNIOR", "KINDLY", "LATEST", "LAUNCH",
  "LEADER", "LEAGUE", "LENGTH", "LETTER", "LIKELY", "LISTEN", "LITTLE", "LIVING",
  "LOCKED", "LONELY", "MANAGE", "MARKET", "MASTER", "MEMORY", "MIDDLE", "MILLER",
  "MINUTE", "MODERN", "MODULE", "MOMENT", "MOSTLY", "MOTHER", "NATION", "NATIVE",
  "NEARLY", "NOTICE", "OBJECT", "OPTION", "ORANGE", "PARENT", "PEOPLE", "PERIOD",
  "PERSON", "PHRASE", "POCKET", "POLICY", "POSTER", "POWDER", "PREFER", "PRETTY",
  "PRIEST", "PRISON", "PUBLIC", "RANDOM", "RARELY", "RATHER", "READER", "RECORD",
  "REDUCE", "REFORM", "REGION", "RELATE", "REMAIN", "REMOVE", "REPORT", "RESCUE",
  "RESULT", "RETURN", "RHYTHM", "ROBUST", "SCREEN", "SEARCH", "SEASON", "SECOND",
  "SECRET", "SERIES", "SEVERE", "SHADOW", "SHOULD", "SILVER", "SIMPLE", "SINGLE",
  "SISTER", "SLIGHT", "SOCIAL", "SPIRIT", "SPREAD", "SPRING", "STABLE", "STATUS",
  "STREET", "STRIKE", "STRONG", "SUMMER", "SYSTEM", "TARGET", "THOUGH", "THREAD",
  "TIMING", "TOWARD", "TRAVEL", "UNIQUE", "UNITED", "UPDATE", "USEFUL", "VISION",
  "WEALTH", "WEIGHT", "WINNER", "WONDER", "WORKER", "YELLOW"
].filter((word) => word.length === 6);

const VERY_HARD_WORDS = [
  "ABSENCE", "ACCOUNT", "ACHIEVE", "ADVANCE", "ADVISER", "AGAINST", "AIRPORT", "ANCIENT",
  "ANOTHER", "ANXIETY", "APPEARS", "ARRIVAL", "ARTICLE", "ASSAULT", "BALANCE", "BARRIER",
  "BENEATH", "BROTHER", "CAPTAIN", "CENTRAL", "CERTAIN", "CHARGED", "CHOICES", "CLIMATE",
  "COMPANY", "CONCEPT", "CONCERN", "CONDUCT", "CONNECT", "CONSENT", "CONTEXT", "CONTROL",
  "CRUCIAL", "CURRENT", "DEFAULT", "DEFENCE", "DELIVER", "DENSITY", "DESERVE", "DESPITE",
  "DISPLAY", "DISTANT", "DYNAMIC", "EARNEST", "ECONOMY", "ELEMENT", "EMOTION", "EXAMPLE",
  "EXHIBIT", "EXPLAIN", "EXTREME", "FACTORY", "FANTASY", "FREEDOM", "GENERAL", "GENUINE",
  "HARMONY", "HEALTHY", "HELPFUL", "HOLIDAY", "HOUSING", "IMAGINE", "IMPROVE", "INCLUDE",
  "INITIAL", "INSIGHT", "INSPIRE", "JOURNEY", "JUSTICE", "KITCHEN", "KNOWING", "LEADING",
  "LIBRARY", "LOYALTY", "MACHINE", "MANAGER", "MEASURE", "MENTION", "MILLION", "MIRACLE",
  "MISSION", "MISTAKE", "MIXTURE", "MONITOR", "MYSTERY", "NATURAL", "NEITHER", "NOTHING",
  "OFFICER", "OUTCOME", "OVERALL", "PACKAGE", "PASSION", "PATIENT", "PAYMENT", "PEOPLE",
  "PERFECT", "PIONEER", "PLATFORM", "POPULAR", "POSSIBLE", "PRECISE", "PREMIUM", "PRIMARY",
  "PRINTER", "PRIVATE", "PROCESS", "PROGRAM", "PROTECT", "PURPOSE", "REALITY", "RECEIVE",
  "REGULAR", "RELATED", "RESPECT", "REVENUE", "SCIENCE", "SECTION", "SENTENCE", "SERIOUS",
  "SERVICE", "SESSIONS", "SEVERAL", "SHADOWY", "SHELTER", "SHORTLY", "SPECIAL", "STATION",
  "STORAGE", "STRANGE", "SUCCESS", "SUPPORT", "SURFACE", "THEATER", "THOUGHT", "THROUGH",
  "TONIGHT", "TRAFFIC", "TRIGGER", "UNIFORM", "UTILITY", "VARIETY", "VERSION", "VIRTUAL",
  "WEATHER", "WEEKEND", "WELCOME", "WITHOUT"
].filter((word) => word.length === 7);

const MODES = {
  "very-easy": { label: "Very Easy", length: 3, words: VERY_EASY_WORDS },
  easy: { label: "Easy", length: 4, words: EASY_WORDS },
  normal: { label: "Normal", length: 5, words: NORMAL_WORDS },
  hard: { label: "Hard", length: 6, words: HARD_WORDS },
  "very-hard": { label: "Very Hard", length: 7, words: VERY_HARD_WORDS }
};

const boardEl = document.getElementById("game-board");
const keyboardEl = document.getElementById("keyboard");
const statusMessageEl = document.getElementById("status-message");
const newGameBtn = document.getElementById("new-game-btn");
const shareBtn = document.getElementById("share-btn");
const challengeBtn = document.getElementById("challenge-btn");
const settingsBtn = document.getElementById("settings-btn");
const readyBtn = document.getElementById("ready-btn");
const rematchBtn = document.getElementById("rematch-btn");
const modeSelect = document.getElementById("mode-select");
const themeSelect = document.getElementById("theme-select");
const timerEl = document.getElementById("timer");
const challengeLabelEl = document.getElementById("challenge-label");
const helpBtn = document.getElementById("help-btn");
const statsBtn = document.getElementById("stats-btn");
const helpModal = document.getElementById("help-modal");
const closeHelpBtn = document.getElementById("close-help-btn");
const statsModal = document.getElementById("stats-modal");
const closeStatsBtn = document.getElementById("close-stats-btn");
const settingsModal = document.getElementById("settings-modal");
const closeSettingsBtn = document.getElementById("close-settings-btn");
const saveSettingsBtn = document.getElementById("save-settings-btn");
const clearSettingsBtn = document.getElementById("clear-settings-btn");
const testRealtimeBtn = document.getElementById("test-realtime-btn");
const supabaseUrlInput = document.getElementById("supabase-url-input");
const supabaseAnonInput = document.getElementById("supabase-anon-input");
const settingsStatusEl = document.getElementById("settings-status");
const statsLineEl = document.getElementById("stats-line");
const statsModalContentEl = document.getElementById("stats-modal-content");
const winBurstEl = document.getElementById("win-burst");

const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"]
];

const priority = { unknown: 0, absent: 1, present: 2, correct: 3 };

const allWordsSet = new Set([
  ...VERY_EASY_WORDS,
  ...EASY_WORDS,
  ...NORMAL_WORDS,
  ...HARD_WORDS,
  ...VERY_HARD_WORDS
]);

const dictionaryCache = new Map();
let stats = { played: 0, wins: 0, streak: 0, bestStreak: 0 };

let currentMode = "normal";
let currentWordLength = 5;
let targetWord = "";
let guesses = [];
let currentRow = 0;
let currentCol = 0;
let gameOver = false;
let gameWon = false;
let isSubmitting = false;
let isRevealing = false;
let keyState = {};
let gameResults = [];
let timerStartMs = 0;
let timerIntervalId = null;
let finalElapsedMs = null;
let challengeSeed = "";
let challengeId = "";
let challengeActive = false;
let challengeWord = "";
let challengeWaitingToStart = false;
let challengeCountdownActive = false;
let localReady = false;
let remoteReadyCount = 0;
let opponentName = "Opponent";
let hasRecordedRound = false;

let playerId = localStorage.getItem("wordlerPlayerId");
if (!playerId) {
  playerId = `p_${Math.random().toString(36).slice(2, 10)}`;
  localStorage.setItem("wordlerPlayerId", playerId);
}
let playerName = localStorage.getItem("wordlerPlayerName");
if (!playerName) {
  playerName = `Player-${playerId.slice(-4).toUpperCase()}`;
  localStorage.setItem("wordlerPlayerName", playerName);
}

let supabaseClient = null;
let challengeChannel = null;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatElapsed(ms) {
  const seconds = Math.floor(ms / 1000);
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  return `${min}:${sec}`;
}

function updateTimerDisplay() {
  const elapsed = finalElapsedMs ?? (Date.now() - timerStartMs);
  timerEl.textContent = formatElapsed(Math.max(elapsed, 0));
}

function startTimer() {
  finalElapsedMs = null;
  timerStartMs = Date.now();
  if (timerIntervalId) {
    clearInterval(timerIntervalId);
  }
  updateTimerDisplay();
  timerIntervalId = setInterval(updateTimerDisplay, 200);
}

function stopTimer() {
  if (timerIntervalId) {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
  }
  finalElapsedMs = Date.now() - timerStartMs;
  updateTimerDisplay();
}

function getWinPercentage() {
  if (!stats.played) {
    return 0;
  }
  return Math.round((stats.wins / stats.played) * 100);
}

function loadStats() {
  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    if (!raw) {
      return;
    }
    const parsed = JSON.parse(raw);
    stats = {
      played: Number(parsed.played) || 0,
      wins: Number(parsed.wins) || 0,
      streak: Number(parsed.streak) || 0,
      bestStreak: Number(parsed.bestStreak) || 0
    };
  } catch (error) {
    // Ignore malformed storage.
  }
}

function saveStats() {
  localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
}

function renderStatsLine() {
  statsLineEl.textContent = `Played: ${stats.played} • Win %: ${getWinPercentage()} • Streak: ${stats.streak}`;
}

function openStatsModal() {
  statsModalContentEl.innerHTML = `Games Played: ${stats.played}<br />Win Percentage: ${getWinPercentage()}%<br />Current Streak: ${stats.streak}<br />Best Streak: ${stats.bestStreak}`;
  statsModal.showModal();
}

function recordGameResult(didWin) {
  stats.played += 1;
  if (didWin) {
    stats.wins += 1;
    stats.streak += 1;
    stats.bestStreak = Math.max(stats.bestStreak, stats.streak);
  } else {
    stats.streak = 0;
  }
  saveStats();
  renderStatsLine();
}

function applyTheme(themeName) {
  themeSelect.value = themeName;
  if (themeName === "nyt") {
    document.body.removeAttribute("data-theme");
  } else {
    document.body.setAttribute("data-theme", themeName);
  }
  localStorage.setItem(THEME_STORAGE_KEY, themeName);
}

function loadTheme() {
  const saved = localStorage.getItem(THEME_STORAGE_KEY) || "nyt";
  applyTheme(saved);
}

function hashString(value) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash >>> 0);
}

function randomSeed() {
  return Math.random().toString(36).slice(2, 10);
}

function chooseTargetWord(modeId, seed = "") {
  const words = MODES[modeId].words;
  if (seed) {
    const idx = hashString(`${modeId}:${seed}`) % words.length;
    return words[idx];
  }
  const idx = Math.floor(Math.random() * words.length);
  return words[idx];
}

function parseChallengeFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const isChallenge = params.get("challenge") === "1";
  if (!isChallenge) {
    challengeActive = false;
    challengeSeed = "";
    challengeId = "";
    challengeWord = "";
    return;
  }

  const modeFromUrl = params.get("mode");
  const seedFromUrl = params.get("seed");
  const wordFromUrl = params.get("word");
  challengeId = params.get("id") || "race";
  if (modeFromUrl && MODES[modeFromUrl]) {
    currentMode = modeFromUrl;
  }
  const expectedLength = MODES[currentMode].length;
  if (wordFromUrl && /^[a-z]+$/i.test(wordFromUrl) && wordFromUrl.length === expectedLength) {
    challengeWord = wordFromUrl.toUpperCase();
  } else {
    challengeWord = "";
  }
  if (seedFromUrl) {
    challengeSeed = seedFromUrl;
  }
  if (!challengeSeed) {
    challengeSeed = challengeId;
  }
  challengeActive = Boolean(challengeWord || challengeSeed);
}

function updateChallengeLabel() {
  if (challengeActive) {
    const totalPlayers = 1 + (getOpponentPlayer() ? 1 : 0);
    const readyPlayers = (localReady ? 1 : 0) + remoteReadyCount;
    const readyText = totalPlayers > 1 ? ` • ${readyPlayers}/${totalPlayers} ready` : "";
    challengeLabelEl.textContent = `Challenge ${challengeId}${readyText}`;
  } else {
    challengeLabelEl.textContent = "";
  }
}

function updateChallengeControls() {
  readyBtn.classList.toggle("hidden", !challengeActive);
  rematchBtn.classList.toggle("hidden", !challengeActive || !gameOver);
  readyBtn.disabled = !challengeActive || challengeCountdownActive || !challengeWaitingToStart;
  readyBtn.textContent = localReady ? "Ready ✓" : "Ready";
}

function stopTimerAndReset() {
  if (timerIntervalId) {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
  }
  finalElapsedMs = 0;
  timerEl.textContent = "00:00";
}

function getPresencePlayers() {
  if (!challengeChannel) {
    return [];
  }
  const state = challengeChannel.presenceState();
  return Object.values(state).flatMap((arr) => arr || []);
}

function getOpponentPlayer() {
  const players = getPresencePlayers().filter((entry) => entry.playerId !== playerId);
  return players[0] || null;
}

async function syncPresence() {
  if (!challengeChannel) {
    return;
  }
  try {
    await challengeChannel.track({
      playerId,
      name: playerName,
      ready: localReady,
      mode: currentMode,
      updatedAt: Date.now()
    });
  } catch (error) {
    showStatus("Realtime sync issue. Check Supabase connection.");
  }
}

async function sendChallengeEvent(eventName, payload = {}) {
  if (!challengeChannel) {
    return;
  }
  await challengeChannel.send({
    type: "broadcast",
    event: eventName,
    payload: {
      ...payload,
      from: playerId,
      name: playerName
    }
  });
}

function refreshChallengePresence() {
  if (!challengeActive || !challengeChannel) {
    remoteReadyCount = 0;
    updateChallengeLabel();
    return;
  }
  const opponent = getOpponentPlayer();
  remoteReadyCount = opponent ? (opponent.ready ? 1 : 0) : 0;
  if (opponent?.name) {
    opponentName = opponent.name;
  }
  updateChallengeLabel();
}

async function setReadyState(ready) {
  localReady = ready;
  updateChallengeControls();
  await syncPresence();
  refreshChallengePresence();
  maybeStartCountdown();
}

function isCountdownLeader() {
  const players = getPresencePlayers().map((entry) => entry.playerId).concat(playerId);
  const sorted = [...new Set(players)].sort();
  return sorted[0] === playerId;
}

function beginLocalCountdown(startsAtMs) {
  challengeCountdownActive = true;
  setInputEnabled(false);
  updateChallengeControls();

  const tick = () => {
    const secondsLeft = Math.max(0, Math.ceil((startsAtMs - Date.now()) / 1000));
    if (secondsLeft > 0) {
      showStatus(`Starting in ${secondsLeft}...`);
      setTimeout(tick, 180);
    } else {
      challengeCountdownActive = false;
      challengeWaitingToStart = false;
      localReady = false;
      void syncPresence();
      startNewGame();
    }
  };

  tick();
}

function maybeStartCountdown() {
  if (!challengeActive || !challengeWaitingToStart || challengeCountdownActive) {
    return;
  }
  const opponent = getOpponentPlayer();
  if (!opponent || !localReady || !opponent.ready) {
    return;
  }
  if (!isCountdownLeader()) {
    return;
  }
  const startsAt = Date.now() + 3000;
  const nextWord = challengeWord || chooseTargetWord(currentMode, challengeSeed || challengeId);
  challengeWord = nextWord;
  void sendChallengeEvent("countdown-start", {
    startsAt,
    mode: currentMode,
    word: nextWord
  });
  beginLocalCountdown(startsAt);
}

function enterChallengeLobby(message = "Challenge lobby: click Ready when both players are set.") {
  challengeWaitingToStart = true;
  challengeCountdownActive = false;
  localReady = false;
  gameOver = false;
  gameWon = false;
  isSubmitting = false;
  isRevealing = false;
  shareBtn.disabled = true;
  hasRecordedRound = false;
  keyState = {};
  guesses = Array.from({ length: MAX_GUESSES }, () => Array(currentWordLength).fill(""));
  createBoard();
  createKeyboard();
  setInputEnabled(false);
  updateBoard();
  stopTimerAndReset();
  showStatus(message);
  updateChallengeControls();
  void syncPresence();
}

function setSettingsStatus(message) {
  settingsStatusEl.textContent = message;
}

function fillSettingsFormFromStorage() {
  supabaseUrlInput.value = localStorage.getItem(SUPABASE_URL_STORAGE_KEY) || "";
  supabaseAnonInput.value = localStorage.getItem(SUPABASE_ANON_STORAGE_KEY) || "";
  setSettingsStatus("");
}

function openSettingsModal() {
  fillSettingsFormFromStorage();
  settingsModal.showModal();
}

function getRealtimeCredentials() {
  return {
    url: (localStorage.getItem(SUPABASE_URL_STORAGE_KEY) || "").trim(),
    anonKey: (localStorage.getItem(SUPABASE_ANON_STORAGE_KEY) || "").trim()
  };
}

function saveRealtimeCredentialsFromForm() {
  const url = supabaseUrlInput.value.trim();
  const anonKey = supabaseAnonInput.value.trim();
  if (!url || !anonKey) {
    setSettingsStatus("Please enter both URL and key.");
    return false;
  }
  if (!/^https?:\/\//i.test(url)) {
    setSettingsStatus("Supabase URL must start with http:// or https://");
    return false;
  }
  localStorage.setItem(SUPABASE_URL_STORAGE_KEY, url);
  localStorage.setItem(SUPABASE_ANON_STORAGE_KEY, anonKey);
  setSettingsStatus("Saved.");
  return true;
}

function clearRealtimeCredentials() {
  localStorage.removeItem(SUPABASE_URL_STORAGE_KEY);
  localStorage.removeItem(SUPABASE_ANON_STORAGE_KEY);
  fillSettingsFormFromStorage();
  setSettingsStatus("Cleared.");
}

async function teardownChallengeRealtime() {
  if (supabaseClient && challengeChannel) {
    try {
      await supabaseClient.removeChannel(challengeChannel);
    } catch (error) {
      // Ignore teardown failures.
    }
  }
  challengeChannel = null;
  supabaseClient = null;
}

async function testRealtimeConnection() {
  if (typeof window.supabase?.createClient !== "function") {
    setSettingsStatus("Supabase SDK not loaded.");
    return;
  }

  if (!saveRealtimeCredentialsFromForm()) {
    return;
  }

  setSettingsStatus("Testing realtime...");
  const { url, anonKey } = getRealtimeCredentials();

  try {
    const testClient = window.supabase.createClient(url, anonKey);
    const testChannel = testClient.channel(`wordler-test-${Date.now()}`);
    await new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error("timeout"));
      }, 7000);
      testChannel.subscribe((status) => {
        if (status === "SUBSCRIBED") {
          clearTimeout(timeoutId);
          resolve();
        } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          clearTimeout(timeoutId);
          reject(new Error(status));
        }
      });
    });
    await testClient.removeChannel(testChannel);
    setSettingsStatus("Realtime test passed.");
  } catch (error) {
    setSettingsStatus("Realtime test failed. Verify URL/key and project settings.");
  }
}

async function setupChallengeRealtime() {
  if (!challengeActive) {
    return;
  }
  if (typeof window.supabase?.createClient !== "function") {
    showStatus("Supabase SDK failed to load. Refresh and retry.");
    return;
  }
  const { url, anonKey } = getRealtimeCredentials();
  if (!url || !anonKey) {
    showStatus("Realtime disabled: configure Supabase in Settings.");
    openSettingsModal();
    return;
  }

  try {
    await teardownChallengeRealtime();
    supabaseClient = window.supabase.createClient(url, anonKey);
    challengeChannel = supabaseClient.channel(`wordler-challenge-${challengeId}`, {
      config: { presence: { key: playerId }, broadcast: { self: false } }
    });

    challengeChannel
      .on("presence", { event: "sync" }, () => {
        refreshChallengePresence();
        maybeStartCountdown();
      })
      .on("broadcast", { event: "countdown-start" }, ({ payload }) => {
        if (payload.mode && MODES[payload.mode]) {
          setMode(payload.mode);
        }
        if (payload.word && payload.word.length === MODES[currentMode].length) {
          challengeWord = payload.word.toUpperCase();
        }
        beginLocalCountdown(payload.startsAt || Date.now() + 3000);
      })
      .on("broadcast", { event: "mode-change" }, ({ payload }) => {
        if (payload.mode && MODES[payload.mode]) {
          setMode(payload.mode);
        }
        if (payload.word && payload.word.length === MODES[currentMode].length) {
          challengeWord = payload.word.toUpperCase();
        } else {
          challengeWord = chooseTargetWord(currentMode, challengeSeed || challengeId);
        }
        if (!gameOver) {
          gameOver = true;
          stopTimer();
          setInputEnabled(false);
          if (!hasRecordedRound) {
            recordGameResult(false);
            hasRecordedRound = true;
          }
        }
        enterChallengeLobby(`${payload.name || "Opponent"} changed mode. Round forfeited.`);
      })
      .on("broadcast", { event: "game-won" }, ({ payload }) => {
        if (payload.from === playerId || gameWon) {
          return;
        }
        if (!gameOver) {
          gameOver = true;
          stopTimer();
          setInputEnabled(false);
          shareBtn.disabled = false;
          if (!hasRecordedRound) {
            recordGameResult(false);
            hasRecordedRound = true;
          }
        }
        const timeText = payload.elapsedMs ? formatElapsed(payload.elapsedMs) : "unknown time";
        showStatus(`${payload.name || "Opponent"} solved it in ${timeText}.`);
        updateChallengeControls();
      })
      .on("broadcast", { event: "rematch-request" }, ({ payload }) => {
        enterChallengeLobby(`${payload.name || "Opponent"} requested a rematch.`);
      });

    challengeChannel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        void syncPresence();
        refreshChallengePresence();
        enterChallengeLobby("Challenge lobby: click Ready when both players are set.");
        showStatus("Connected to challenge room.");
      } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
        showStatus("Realtime connect failed. Verify Supabase URL and Publishable (anon) key.");
      } else if (status === "CLOSED") {
        showStatus("Realtime room closed.");
      }
    });
  } catch (error) {
    showStatus("Realtime setup failed. Check Supabase settings and retry.");
  }
}

function setMode(modeId) {
  currentMode = modeId;
  currentWordLength = MODES[modeId].length;
  modeSelect.value = modeId;
  document.documentElement.style.setProperty("--word-length", String(currentWordLength));
}

function createBoard() {
  boardEl.innerHTML = "";
  for (let row = 0; row < MAX_GUESSES; row += 1) {
    const rowEl = document.createElement("div");
    rowEl.className = "board-row";
    rowEl.dataset.row = String(row);
    for (let col = 0; col < currentWordLength; col += 1) {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.dataset.row = String(row);
      tile.dataset.col = String(col);
      rowEl.appendChild(tile);
    }
    boardEl.appendChild(rowEl);
  }
}

function createKeyboard() {
  keyboardEl.innerHTML = "";
  keyboardRows.forEach((row, index) => {
    const rowEl = document.createElement("div");
    rowEl.className = `kb-row row-${index + 1}`;
    row.forEach((key) => {
      const keyEl = document.createElement("button");
      keyEl.type = "button";
      keyEl.className = "key";
      keyEl.dataset.key = key;
      keyEl.tabIndex = -1;
      keyEl.textContent = key === "BACK" ? "Back" : key;
      keyEl.addEventListener("mousedown", (event) => event.preventDefault());
      keyEl.addEventListener("click", () => handleInput(key));
      rowEl.appendChild(keyEl);
    });
    keyboardEl.appendChild(rowEl);
  });
}

function getTile(row, col) {
  return boardEl.querySelector(`.tile[data-row="${row}"][data-col="${col}"]`);
}

function updateBoard() {
  for (let row = 0; row < MAX_GUESSES; row += 1) {
    for (let col = 0; col < currentWordLength; col += 1) {
      const tile = getTile(row, col);
      const letter = guesses[row][col];
      tile.textContent = letter;
      tile.classList.toggle("filled", letter !== "");
    }
  }
}

function showStatus(message, tone = "") {
  statusMessageEl.textContent = message;
  statusMessageEl.classList.remove("win");
  if (tone) {
    statusMessageEl.classList.add(tone);
  }
}

function setInputEnabled(enabled) {
  keyboardEl.querySelectorAll(".key").forEach((keyEl) => {
    keyEl.disabled = !enabled;
  });
}

function triggerRowShake(row) {
  const rowEl = boardEl.querySelector(`.board-row[data-row="${row}"]`);
  if (!rowEl) {
    return;
  }
  rowEl.classList.remove("shake");
  void rowEl.offsetWidth;
  rowEl.classList.add("shake");
}

function triggerTilePop(row, col) {
  const tile = getTile(row, col);
  if (!tile) {
    return;
  }
  tile.classList.remove("pop");
  void tile.offsetWidth;
  tile.classList.add("pop");
}

function updateKeyState(letter, state) {
  const currentState = keyState[letter] || "unknown";
  if (priority[state] > priority[currentState]) {
    keyState[letter] = state;
  }
  const keyEl = keyboardEl.querySelector(`.key[data-key="${letter}"]`);
  if (!keyEl) {
    return;
  }
  keyEl.classList.remove("correct", "present", "absent");
  keyEl.classList.add(keyState[letter]);
}

function evaluateGuess(guess) {
  const result = Array(currentWordLength).fill("absent");
  const targetArray = targetWord.split("");
  const guessArray = guess.split("");
  const counts = {};

  targetArray.forEach((letter) => {
    counts[letter] = (counts[letter] || 0) + 1;
  });

  for (let i = 0; i < currentWordLength; i += 1) {
    if (guessArray[i] === targetArray[i]) {
      result[i] = "correct";
      counts[guessArray[i]] -= 1;
    }
  }

  for (let i = 0; i < currentWordLength; i += 1) {
    if (result[i] === "correct") {
      continue;
    }
    const letter = guessArray[i];
    if (counts[letter] > 0) {
      result[i] = "present";
      counts[letter] -= 1;
    }
  }

  return result;
}

async function revealGuess(row, guess, result) {
  for (let col = 0; col < currentWordLength; col += 1) {
    const tile = getTile(row, col);
    tile.classList.remove("flip");
    void tile.offsetWidth;
    tile.classList.add("flip");
    setTimeout(() => {
      tile.classList.remove("correct", "present", "absent");
      tile.classList.add(result[col]);
      updateKeyState(guess[col], result[col]);
    }, FLIP_DURATION_MS / 2);
    await wait(FLIP_STAGGER_MS);
  }
  await wait(FLIP_DURATION_MS);
}

function playWinBurst() {
  winBurstEl.innerHTML = "";
  const colors = ["#538d4e", "#b59f3b", "#ffffff", "#818384", "#6aaa64"];
  for (let i = 0; i < 42; i += 1) {
    const dot = document.createElement("span");
    dot.className = "burst-dot";
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${52 + Math.random() * 33}%`;
    dot.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    dot.style.animationDelay = `${Math.random() * 200}ms`;
    winBurstEl.appendChild(dot);
  }
  setTimeout(() => {
    winBurstEl.innerHTML = "";
  }, 1300);
}

async function validateGuessWord(guess) {
  if (guess.length !== currentWordLength) {
    return false;
  }
  if (allWordsSet.has(guess)) {
    return true;
  }
  if (dictionaryCache.has(guess)) {
    return dictionaryCache.get(guess);
  }
  try {
    const response = await fetch(`${DICTIONARY_API_ROOT}/${guess.toLowerCase()}`);
    const ok = response.ok;
    dictionaryCache.set(guess, ok);
    return ok;
  } catch (error) {
    return null;
  }
}

function buildShareGrid() {
  const emojiByState = { correct: "🟩", present: "🟨", absent: "⬛" };
  const rows = gameResults.map((entry) => entry.result.map((state) => emojiByState[state]).join(""));
  const score = gameWon ? String(gameResults.length) : "X";
  const modeLabel = MODES[currentMode].label;
  const timeLabel = formatElapsed(finalElapsedMs ?? (Date.now() - timerStartMs));
  const challengeLine = challengeActive ? `Challenge ${challengeId}` : "Solo";
  return `WORDLER ${score}/${MAX_GUESSES} (${modeLabel})\n${challengeLine} • ${timeLabel}\n\n${rows.join("\n")}`;
}

async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

async function shareResult() {
  if (!gameOver || !gameResults.length) {
    return;
  }
  try {
    await copyToClipboard(buildShareGrid());
    showStatus("Result copied to clipboard.");
  } catch (error) {
    showStatus("Unable to copy result.");
  }
}

function createChallengeLink() {
  const seed = challengeSeed || randomSeed();
  challengeSeed = seed;
  const id = Date.now().toString(36).slice(-6).toUpperCase();
  const params = new URLSearchParams({
    challenge: "1",
    mode: currentMode,
    seed,
    word: targetWord.toLowerCase(),
    id
  });
  const url = new URL(window.location.href);
  url.search = params.toString();
  url.hash = "";
  return url.toString();
}

async function copyChallengeLink() {
  try {
    const url = createChallengeLink();
    await copyToClipboard(url);
    showStatus("Challenge URL copied. Share it with your friend.");
  } catch (error) {
    showStatus("Could not copy challenge URL.");
  }
}

async function submitGuess() {
  if (isSubmitting) {
    return;
  }
  isSubmitting = true;

  if (currentCol < currentWordLength) {
    showStatus(`Need ${currentWordLength} letters.`);
    triggerRowShake(currentRow);
    isSubmitting = false;
    return;
  }

  const guess = guesses[currentRow].join("");
  const valid = await validateGuessWord(guess);
  if (valid === null) {
    showStatus("Unable to verify word right now.");
    triggerRowShake(currentRow);
    isSubmitting = false;
    return;
  }
  if (!valid) {
    showStatus(`"${guess}" is not a valid word.`);
    triggerRowShake(currentRow);
    isSubmitting = false;
    return;
  }

  const result = evaluateGuess(guess);
  isRevealing = true;
  setInputEnabled(false);
  await revealGuess(currentRow, guess, result);
  gameResults.push({ guess, result });
  isRevealing = false;
  setInputEnabled(true);

  if (guess === targetWord) {
    gameOver = true;
    gameWon = true;
    stopTimer();
    setInputEnabled(false);
    shareBtn.disabled = false;
    const guessCount = currentRow + 1;
    showStatus(`You win! Solved in ${guessCount} guesses (${formatElapsed(finalElapsedMs)}).`, "win");
    playWinBurst();
    if (!hasRecordedRound) {
      recordGameResult(true);
      hasRecordedRound = true;
    }
    if (challengeActive) {
      void sendChallengeEvent("game-won", {
        guesses: guessCount,
        elapsedMs: finalElapsedMs || 0
      });
    }
    updateChallengeControls();
    isSubmitting = false;
    return;
  }

  currentRow += 1;
  currentCol = 0;
  if (currentRow >= MAX_GUESSES) {
    gameOver = true;
    gameWon = false;
    stopTimer();
    setInputEnabled(false);
    shareBtn.disabled = false;
    showStatus(`Game over. The word was "${targetWord}".`);
    if (!hasRecordedRound) {
      recordGameResult(false);
      hasRecordedRound = true;
    }
    updateChallengeControls();
  } else {
    showStatus("");
  }

  isSubmitting = false;
}

function insertLetter(letter) {
  if (currentCol >= currentWordLength) {
    return;
  }
  guesses[currentRow][currentCol] = letter;
  triggerTilePop(currentRow, currentCol);
  currentCol += 1;
  updateBoard();
}

function removeLetter() {
  if (currentCol === 0) {
    return;
  }
  currentCol -= 1;
  guesses[currentRow][currentCol] = "";
  updateBoard();
}

function handleInput(value) {
  if (gameOver || isRevealing || isSubmitting) {
    return;
  }
  if (value === "ENTER") {
    void submitGuess();
    return;
  }
  if (value === "BACK") {
    removeLetter();
    return;
  }
  if (/^[A-Z]$/.test(value)) {
    insertLetter(value);
  }
}

function handlePhysicalKeyboard(event) {
  if (gameOver || isRevealing || isSubmitting) {
    return;
  }
  const key = event.key.toUpperCase();
  if (key === "ENTER") {
    event.preventDefault();
    handleInput("ENTER");
    return;
  }
  if (key === "BACKSPACE") {
    event.preventDefault();
    handleInput("BACK");
    return;
  }
  if (/^[A-Z]$/.test(key)) {
    handleInput(key);
  }
}

function startNewGame() {
  if (challengeActive && challengeWord) {
    targetWord = challengeWord;
  } else {
    targetWord = chooseTargetWord(currentMode, challengeActive ? challengeSeed : "");
  }
  guesses = Array.from({ length: MAX_GUESSES }, () => Array(currentWordLength).fill(""));
  currentRow = 0;
  currentCol = 0;
  gameOver = false;
  gameWon = false;
  isSubmitting = false;
  isRevealing = false;
  keyState = {};
  gameResults = [];
  hasRecordedRound = false;
  challengeWaitingToStart = false;
  challengeCountdownActive = false;
  localReady = false;

  createBoard();
  createKeyboard();
  setInputEnabled(true);
  updateBoard();
  shareBtn.disabled = true;
  showStatus("");
  updateChallengeLabel();
  updateChallengeControls();
  startTimer();
  if (challengeActive) {
    void syncPresence();
  }
}

function handleModeChange() {
  const selectedMode = modeSelect.value;

  if (challengeActive && !gameOver && !challengeWaitingToStart) {
    const confirmForfeit = window.confirm("Changing mode now will forfeit this active round. Continue?");
    if (!confirmForfeit) {
      modeSelect.value = currentMode;
      return;
    }
  }

  if (challengeActive) {
    setMode(selectedMode);
    challengeWord = chooseTargetWord(currentMode, challengeSeed || challengeId);
    void sendChallengeEvent("mode-change", {
      mode: currentMode,
      word: challengeWord
    });
    enterChallengeLobby(`Mode set to ${MODES[currentMode].label}. Click Ready to start.`);
    return;
  }
  setMode(selectedMode);
  startNewGame();
}

function initialize() {
  loadStats();
  renderStatsLine();
  loadTheme();
  parseChallengeFromUrl();
  setMode(currentMode);

  updateChallengeControls();
  updateChallengeLabel();

  document.addEventListener("keydown", handlePhysicalKeyboard);
  newGameBtn.addEventListener("click", () => {
    if (challengeActive) {
      enterChallengeLobby("New round lobby. Click Ready when both players are set.");
      return;
    }
    startNewGame();
  });
  shareBtn.addEventListener("click", () => void shareResult());
  challengeBtn.addEventListener("click", () => void copyChallengeLink());
  settingsBtn.addEventListener("click", openSettingsModal);
  closeSettingsBtn.addEventListener("click", () => settingsModal.close());
  clearSettingsBtn.addEventListener("click", clearRealtimeCredentials);
  saveSettingsBtn.addEventListener("click", () => {
    const saved = saveRealtimeCredentialsFromForm();
    if (!saved) {
      return;
    }
    if (challengeActive) {
      showStatus("Reconnecting challenge room...");
      void setupChallengeRealtime();
    }
  });
  testRealtimeBtn.addEventListener("click", () => {
    void testRealtimeConnection();
  });
  readyBtn.addEventListener("click", () => {
    if (!challengeActive || challengeCountdownActive) {
      return;
    }
    void setReadyState(!localReady);
  });
  rematchBtn.addEventListener("click", () => {
    if (!challengeActive) {
      return;
    }
    void sendChallengeEvent("rematch-request");
    enterChallengeLobby("Rematch requested. Click Ready.");
  });
  modeSelect.addEventListener("change", handleModeChange);
  themeSelect.addEventListener("change", () => applyTheme(themeSelect.value));
  helpBtn.addEventListener("click", () => helpModal.showModal());
  closeHelpBtn.addEventListener("click", () => helpModal.close());
  statsBtn.addEventListener("click", openStatsModal);
  closeStatsBtn.addEventListener("click", () => statsModal.close());

  if (challengeActive) {
    enterChallengeLobby("Connecting challenge room...");
    void setupChallengeRealtime();
  } else {
    startNewGame();
  }
}

initialize();
