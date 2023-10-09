import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStateStore = defineStore('state', () => {
  const splashComplete = ref(false)

  const splashDone = () => {
    splashComplete.value = true
  }

  const browserInfo = ref(null)

  const hmData = ref([])

  const siteLang = ref('en')

  const worksInfo = ref([])

  const siteInfo = ref({})

  return { splashComplete, splashDone, browserInfo, hmData, siteLang, worksInfo, siteInfo }
})
