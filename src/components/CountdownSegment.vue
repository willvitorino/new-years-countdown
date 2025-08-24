<template>
  <div class="countdown-segment">
    <div class="number-container">
      <Transition name="flip" mode="out-in">
        <span :key="number" class="number">{{ formattedNumber }}</span>
      </Transition>
    </div>
    <div class="label">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  number: number
  label: string
}

const props = defineProps<Props>()

const formattedNumber = computed(() => {
  return props.number.toString().padStart(2, '0')
})
</script>

<style scoped>
.countdown-segment {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1rem;
}

.number-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 1.5rem 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.number {
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-family: 'Courier New', monospace;
}

.label {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

/* Transições */
.flip-enter-active {
  transition: transform 0.3s ease-in-out;
}

.flip-leave-active {
  transition: transform 0.3s ease-in-out;
}

.flip-enter-from {
  transform: rotateX(-90deg);
}

.flip-leave-to {
  transform: rotateX(90deg);
}

.flip-enter-to,
.flip-leave-from {
  transform: rotateX(0deg);
}

@media (max-width: 768px) {
  .countdown-segment {
    margin: 0 0.5rem;
  }
  
  .number-container {
    min-width: 60px;
    height: 60px;
    padding: 1rem 0.75rem;
  }
  
  .number {
    font-size: 1.8rem;
  }
  
  .label {
    font-size: 0.8rem;
  }
}
</style>
