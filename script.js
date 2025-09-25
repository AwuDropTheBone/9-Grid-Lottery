document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-btn');
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  const modal = document.getElementById('result-modal');
  const resultImg = document.getElementById('result-img');
  const resultText = document.getElementById('result-text');
  const backBtn = document.getElementById('back-btn');
  const closeModal = document.querySelector('.close');
  const gridItems = document.querySelectorAll('.grid-item');
  const drawSound = document.getElementById('draw-sound');
  const resultSound = document.getElementById('result-sound');

  const prizes = [
    { id: 0, name: '獎品1', image: 'images/prize1.png' },
    { id: 1, name: '獎品2', image: 'images/prize2.png' },
    { id: 2, name: '獎品3', image: 'images/prize3.png' },
    { id: 3, name: '獎品4', image: 'images/prize4.png' },
    { id: 4, name: '獎品5', image: 'images/prize5.png' },
    { id: 5, name: '獎品6', image: 'images/prize6.png' },
    { id: 6, name: '獎品7', image: 'images/prize7.png' },
    { id: 7, name: '獎品8', image: 'images/prize8.png' },
    { id: 8, name: '獎品9', image: 'images/prize9.png' },
  ];

  const drawPath = [0, 1, 2, 5, 8, 7, 6, 3, 0];
  let lastPrizeId = null;

  startBtn.addEventListener('click', () => {
    if (startBtn.disabled) return;
    startBtn.disabled = true;
    drawSound.play();
    let currentIndex = 0;
    let rounds = Math.floor(Math.random() * 3) + 3;
    let availablePrizes = prizes.filter(p => p.id !== lastPrizeId);
    let finalPrize = availablePrizes[Math.floor(Math.random() * availablePrizes.length)];
    let totalSteps = rounds * drawPath.length + drawPath.indexOf(finalPrize.id);
    let step = 0;

    const interval = setInterval(() => {
      gridItems.forEach(item => item.classList.remove('active'));
      const currentGridIndex = drawPath[currentIndex];
      gridItems[currentGridIndex].classList.add('active');

      currentIndex = (currentIndex + 1) % drawPath.length;
      step++;

      if (step >= totalSteps) {
        clearInterval(interval);
        drawSound.pause();
        drawSound.currentTime = 0;
        resultSound.play();
        resultImg.src = finalPrize.image;
        resultText.textContent = `恭喜獲得：${finalPrize.name}`;
        modal.style.display = 'flex';
        lastPrizeId = finalPrize.id;
        startBtn.disabled = false;
      }
    }, 100);
  });

  backBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    gridItems.forEach(item => item.classList.remove('active'));
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    gridItems.forEach(item => item.classList.remove('active'));
  });

  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error('全螢幕模式失敗:', err);
      });
    } else {
      document.exitFullscreen();
    }
  });
});