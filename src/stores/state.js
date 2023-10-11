import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStateStore = defineStore('state', () => {
  const splashComplete = ref(false)
  const infoVisible = ref(false)

  const access_bg_images = ref(true)
  const access_animations = ref(true)
  const interfaceVisible = ref(true)
  
  const mainTransition = ref('zoom-fade');

  const splashDone = () => {
    splashComplete.value = true
  }

  const browserInfo = ref(null)

  const hmData = ref([])

  const siteLang = ref('en')

  const worksInfo = ref([])

  const gridWorks = computed( () => {
    if (worksInfo.value.length === 0) {
      return []
    } else {
      return worksInfo.value.map((work) => {
        let slug = work.slug
        let lang = siteLang.value
        return `/works/${slug}/${lang}`
      })
    }
  })

  const siteInfo = ref({})

  return {interfaceVisible, 
          mainTransition, 
          splashComplete, 
          splashDone, 
          infoVisible, 
          browserInfo, 
          hmData, 
          siteLang, 
          worksInfo,
          gridWorks,
          siteInfo, 
          access_bg_images, 
          access_animations,}
})
