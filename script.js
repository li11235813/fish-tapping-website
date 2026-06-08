const heroScreen = document.getElementById('hero-screen');
const practiceScreen = document.getElementById('practice-screen');
const startButton = document.getElementById('start-button');
const backButton = document.getElementById('back-button');
const beijingTime = document.getElementById('beijing-time');
const countdown = document.getElementById('countdown');
const mokugyoButton = document.getElementById('mokugyo-button');
const meritCount = document.getElementById('merit-count');
const meritLevel = document.getElementById('merit-level');
const meritBursts = document.getElementById('merit-bursts');
const statusText = document.getElementById('status-text');
const floatingFlowers = document.getElementById('floating-flowers');

let merits = 0;
const burstMessages = ['功德 +1', '摸鱼成功', '心情变好', '下班更近一步', '今天也很稳'];
const levelMap = [
  '刚进入摸鱼状态',
  '已经开始放松',
  '心态逐渐平稳',
  '功德持续上涨',
  '离下班更近了',
  '今日状态良好',
];

function switchToPractice() {
  heroScreen.classList.remove('active');
  practiceScreen.classList.add('active');
}

function switchToHero() {
  practiceScreen.classList.remove('active');
  heroScreen.classList.add('active');
}

function formatBeijingTime(date) {
  return new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date).replace(/\//g, '-');
}

function getBeijingNow() {
  const now = new Date();
  const localized = now.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' });
  return new Date(localized);
}

function updateClock() {
  const beijingNow = getBeijingNow();
  beijingTime.textContent = formatBeijingTime(new Date());

  const endOfWork = new Date(beijingNow);
  endOfWork.setHours(18, 0, 0, 0);

  let diff = endOfWork.getTime() - beijingNow.getTime();
  if (diff <= 0) {
    countdown.textContent = '已经下班啦';
    return;
  }

  const hours = String(Math.floor(diff / 3600000)).padStart(2, '0');
  diff %= 3600000;
  const minutes = String(Math.floor(diff / 60000)).padStart(2, '0');
  diff %= 60000;
  const seconds = String(Math.floor(diff / 1000)).padStart(2, '0');

  countdown.textContent = `${hours}小时 ${minutes}分 ${seconds}秒`;
}

function createFlower(index) {
  const flower = document.createElement('span');
  flower.className = 'flower';
  flower.textContent = index % 3 === 0 ? '❀' : index % 3 === 1 ? '✿' : '❁';
  flower.style.left = `${Math.random() * 100}%`;
  flower.style.animationDuration = `${12 + Math.random() * 10}s`;
  flower.style.animationDelay = `${-Math.random() * 12}s`;
  flower.style.opacity = `${0.28 + Math.random() * 0.42}`;
  flower.style.fontSize = `${14 + Math.random() * 20}px`;
  return flower;
}

function seedFlowers() {
  for (let i = 0; i < 24; i += 1) {
    floatingFlowers.appendChild(createFlower(i));
  }
}

function spawnBurst() {
  const burst = document.createElement('span');
  burst.className = 'burst';
  burst.textContent = burstMessages[merits % burstMessages.length];
  burst.style.left = `${42 + Math.random() * 16}%`;
  meritBursts.appendChild(burst);
  window.setTimeout(() => burst.remove(), 1200);
}

function updateLevel() {
  const levelIndex = Math.min(levelMap.length - 1, Math.floor(merits / 3));
  meritLevel.textContent = levelMap[levelIndex];
}

function tapMokugyo() {
  merits += 1;
  meritCount.textContent = String(merits);
  updateLevel();
  statusText.textContent = '功德加一，继续轻松摸鱼。';
  mokugyoButton.classList.remove('tap');
  void mokugyoButton.offsetWidth;
  mokugyoButton.classList.add('tap');
  spawnBurst();
}

startButton.addEventListener('click', switchToPractice);
backButton.addEventListener('click', switchToHero);
mokugyoButton.addEventListener('click', tapMokugyo);
mokugyoButton.addEventListener('animationend', () => {
  mokugyoButton.classList.remove('tap');
});

seedFlowers();
updateLevel();
updateClock();
window.setInterval(updateClock, 1000);
