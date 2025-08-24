import { ref, onMounted, onUnmounted } from 'vue'

export interface CountdownTime {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function useCountdown() {
  const timeLeft = ref<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  let intervalId: number | null = null

  const getNextNewYear = (): Date => {
    const now = new Date()
    const currentYear = now.getFullYear()
    let nextYear = currentYear + 1
    
    // Se ainda não passou do Ano Novo atual, usar o ano atual
    const thisYearNewYear = new Date(currentYear, 0, 1, 0, 0, 0, 0)
    if (now < thisYearNewYear) {
      nextYear = currentYear
    }
    
    return new Date(nextYear, 0, 1, 0, 0, 0, 0)
  }

  const calculateTimeLeft = (): CountdownTime => {
    const now = new Date().getTime()
    const targetDate = getNextNewYear().getTime()
    const difference = targetDate - now

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      return { days, hours, minutes, seconds }
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const updateCountdown = () => {
    timeLeft.value = calculateTimeLeft()
  }

  const startCountdown = () => {
    updateCountdown() // Atualização inicial
    intervalId = window.setInterval(updateCountdown, 1000)
  }

  const stopCountdown = () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  onMounted(() => {
    startCountdown()
  })

  onUnmounted(() => {
    stopCountdown()
  })

  return {
    timeLeft,
    startCountdown,
    stopCountdown
  }
}
