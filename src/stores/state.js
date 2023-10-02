import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStateStore = defineStore('state', () => {
  const splashComplete = ref(false)
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }

  const splashDone = () => {
    splashComplete.value = true
  }

  const browserInfo = ref(null)

  const hmData = ref([])

  return { splashComplete, splashDone, browserInfo, hmData }
})
