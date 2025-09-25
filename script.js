document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-btn');
  const gridItems = document.querySelectorAll('.grid-item');
  const modal = document.getElementById('result-modal');
  const resultImg = document.getElementById('result-img');
  const resultText = document.getElementById('result-text');
  const closeModal = document.querySelector('.close');

  // 獎品數據
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

  // 抽獎路徑（模擬順時針移動）
  const drawPath = [0, 1, 2, 5, 8, 7, 6, 3, 0]; // 九宮格路徑：1->2->3->6->9->8->7->4->1

  startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    let currentIndex = 0;
    let rounds = Math.floor(Math.random() * 3) + 3; // 隨機3-5圈
    let totalSteps = rounds * drawPath.length + Math.floor(Math.random() * drawPath.length); // 總步數
    let step = 0;

    const interval = setInterval(() => {
      // 移除上一個高亮
      gridItems.forEach(item => item.classList.remove('active'));
      // 高亮當前格子
      const currentGridIndex = drawPath[currentIndex];
      gridItems[currentGridIndex].classList.add('active');

      currentIndex = (currentIndex + 1) % drawPath.length;
      step++;

      if (step >= totalSteps) {
        clearInterval(interval);
        // 顯示中獎結果
        const finalIndex = drawPath[currentIndex === 0 ? drawPath.length - 1 : currentIndex - 1];
        const prize = prizes.find(p => p.id === finalIndex);
        resultImg.src = prize.image;
        resultText.textContent = `恭喜獲得：${prize.name}`;
        modal.style.display = 'flex';
        startBtn.disabled = false;
      }
    }, 100); // 每100ms移動一次
  });

  // 關閉彈窗
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    gridItems.forEach(item => item.classList.remove('active'));
  });
});