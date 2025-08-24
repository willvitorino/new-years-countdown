<script setup lang="ts">
import CountdownSegment from '@/components/CountdownSegment.vue'
import { useCountdown } from '@/composables/useCountdown'

const { timeLeft } = useCountdown()

const getStarStyle = (index: number) => {
  const size = Math.random() * 3 + 1
  return {
    width: `${size}px`,
    height: `${size}px`,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 3}s`,
    animationDuration: `${Math.random() * 2 + 2}s`
  }
}
</script>

<template>
  <div class="countdown-base">
    <div class="container">
      <header class="header">
        <h1 class="title">Contagem Regressiva</h1>
        <h2 class="subtitle">Para o Ano Novo</h2>
      </header>

      <main class="countdown-container">
        <div class="countdown-display">
          <CountdownSegment 
            :number="timeLeft.days" 
            label="Dias" 
          />
          <div class="separator">:</div>
          <CountdownSegment 
            :number="timeLeft.hours" 
            label="Horas" 
          />
          <div class="separator">:</div>
          <CountdownSegment 
            :number="timeLeft.minutes" 
            label="Minutos" 
          />
          <div class="separator">:</div>
          <CountdownSegment 
            :number="timeLeft.seconds" 
            label="Segundos" 
          />
        </div>
      </main>

      <footer class="footer">
        <p class="message">🎉 Prepare-se para comemorar! 🎉</p>
      </footer>
    </div>

    <!-- Elementos decorativos -->
    <div class="stars">
      <div class="star" v-for="i in 20" :key="i" :style="getStarStyle(i)"></div>
    </div>
  </div>
</template>

<style scoped>
.countdown-base {
  min-height: 100vh;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
  text-align: center;
  z-index: 2;
  max-width: 1200px;
  padding: 2rem;
}

.header {
  margin-bottom: 3rem;
}

.title {
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease-in-out infinite;
  margin-bottom: 0.5rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.subtitle {
  font-size: 1.5rem;
  color: #e2e8f0;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.countdown-container {
  margin: 3rem 0;
}

.countdown-display {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.separator {
  font-size: 3rem;
  color: #64748b;
  font-weight: bold;
  margin: 0 0.5rem;
  animation: pulse 2s ease-in-out infinite;
}

.footer {
  margin-top: 3rem;
}

.message {
  font-size: 1.2rem;
  color: #cbd5e1;
  font-weight: 500;
  animation: bounce 2s ease-in-out infinite;
}

/* Animações */
@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* Estrelas decorativas */
.stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.star {
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: twinkle 3s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* Responsividade */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  .title {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
  
  .countdown-display {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .separator {
    display: none;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
}
</style>
