# 🌀 物理海洋：波浪理论

波浪是海水受外力作用产生的周期性起伏运动。在本模块中，我们通过交互式仿真来探索规则波的特性。

## 1. 规则波实验室 (Regular Wave Lab)

这是一个基于 HTML5 Canvas 构建的实时仿真组件。你可以通过滑动条调节波浪的参数，观察其物理特性的变化。

<div style="background: var(--vp-c-bg-soft); padding: 24px; border-radius: 12px; border: 1px solid var(--vp-c-brand); margin: 20px 0;">
  <canvas id="waveCanvas" style="width: 100%; height: 200px; background: #000c19; border-radius: 8px;"></canvas>
  
  <div style="display: flex; gap: 20px; margin-top: 20px; flex-wrap: wrap; justify-content: center; font-size: 14px;">
    <div style="display: flex; align-items: center; gap: 8px;">
      <label>振幅 (A):</label>
      <input type="range" id="ampRange" min="5" max="50" value="30" style="cursor: pointer;">
    </div>
    <div style="display: flex; align-items: center; gap: 8px;">
      <label>频率 (f):</label>
      <input type="range" id="freqRange" min="1" max="10" value="3" style="cursor: pointer;">
    </div>
    <button id="toggleWave" style="background: var(--vp-c-brand); color: white; border: none; padding: 4px 16px; border-radius: 4px; cursor: pointer; font-weight: bold;">
      暂停/开始
    </button>
  </div>
</div>

<script setup>
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  const canvas = document.getElementById('waveCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const ampInput = document.getElementById('ampRange');
  const freqInput = document.getElementById('freqRange');
  const btn = document.getElementById('toggleWave');

  let animationId;
  let offset = 0;
  let isRunning = true;

  // 响应式画布尺寸
  const resize = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };
  window.addEventListener('resize', resize);
  resize();

  function draw() {
    if (!isRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制参考线
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    // 绘制波浪
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#00d4ff';
    
    const amplitude = parseFloat(ampInput.value);
    const frequency = parseFloat(freqInput.value) / 100;

    for (let x = 0; x < canvas.width; x++) {
      const y = canvas.height / 2 + amplitude * Math.sin(x * frequency + offset);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    
    ctx.stroke();
    offset += 0.05;
    animationId = requestAnimationFrame(draw);
  }

  btn.onclick = () => {
    isRunning = !isRunning;
    if (isRunning) draw();
  };

  draw();

  onUnmounted(() => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resize);
  });
});
</script>
### 核心物理参数
* **波速 (c)**：波形在单位时间内传播的距离。对于深水波，c = L / T。
* **周期 (T)**：相邻两个波峰通过固定点所需的时间。
* **波长 (L)**：相邻两个波峰之间的水平距离。



## 2. 不规则波理论 (Irregular Waves)

实际海面是由无数规则波线性叠加而成的。

### 能量谱分析
我们无法用简单的正弦函数描述真实海面，因此引入了“波谱”概念。它描述了能量在不同频率上的分布情况。

* **P-M 谱**：适用于充分发育海面的经典谱。
* **JONSWAP 谱**：考虑了波浪随风程成长的过程。



::: info 统计学描述
在处理不规则波时，我们常用 **有效波高 (Significant Wave Height, Hs)** 来定义海况，它代表了波高序列中前 1/3 大波高的平均值。
:::
