// ========== 全局变量 ==========
let meritCount = 0;

// ========== 开始游戏 ==========
function startGame() {
    const welcomePage = document.getElementById('welcomePage');
    const gamePage = document.getElementById('gamePage');
    
    welcomePage.style.display = 'none';
    gamePage.style.display = 'flex';
    
    // 启动时间和倒计时更新
    updateTime();
    setInterval(updateTime, 1000);
}

// ========== 更新时间和倒计时 ==========
function updateTime() {
    const now = new Date();
    
    // 格式化当前时间 (北京时间)
    const timeString = now.toLocaleString('zh-CN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Shanghai'
    });
    
    document.getElementById('currentTime').textContent = timeString;
    
    // 计算距离18:00的倒计时
    const today = new Date(now.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }));
    today.setHours(18, 0, 0, 0);
    
    // 如果已经过了18:00，则计算到明天的18:00
    if (now > today) {
        today.setDate(today.getDate() + 1);
    }
    
    const timeDiff = today - now;
    
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    const countdownString = 
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');
    
    document.getElementById('countdownTime').textContent = countdownString;
}

// ========== 敲木鱼 ==========
function tapFish() {
    // 增加功德计数
    meritCount++;
    document.getElementById('meritCount').textContent = meritCount;
    
    // 木鱼动画
    const fish = document.getElementById('woodenFish');
    fish.classList.remove('tap-animation');
    
    // 触发重排以重新启动动画
    void fish.offsetWidth;
    
    fish.classList.add('tap-animation');
    
    // 播放点击反馈动画
    showTapFeedback();
    
    // 播放声音效果 (可选)
    playTapSound();
}

// ========== 显示点击反馈 ==========
function showTapFeedback() {
    const feedback = document.getElementById('tapFeedback');
    
    // 重置反馈位置的随机偏移
    const offsetX = (Math.random() - 0.5) * 50;
    const offsetY = (Math.random() - 0.5) * 50;
    
    feedback.style.left = `calc(50% + ${offsetX}px)`;
    feedback.style.top = `calc(50% + ${offsetY}px)`;
    
    // 移除之前的动画类
    feedback.classList.remove('show');
    
    // 触发重排以重新启动动画
    void feedback.offsetWidth;
    
    // 添加动画类
    feedback.classList.add('show');
}

// ========== 播放声音效果 (可选实现) ==========
function playTapSound() {
    // 使用 Web Audio API 创建简单的木鱼声音效果
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // 创建振荡器生成音调
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // 设置音调参数（木鱼声）
        oscillator.frequency.value = 400; // 频率
        oscillator.type = 'sine';
        
        // 设置音量包络
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        // 播放声音
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // 如果浏览器不支持 Web Audio API，则静默失败
        console.log('Web Audio API 不可用');
    }
}

// ========== 页面加载完成时的初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
    // 初始化完成
    console.log('摸鱼网站已加载！');
});
