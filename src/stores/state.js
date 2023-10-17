import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const api_base =  import.meta.env.VITE_API_BASE

export const useStateStore = defineStore('state', () => {
  const splashComplete = ref(false)
  const infoVisible = ref(false)

  const access_bg_images = ref(true)
  const access_animations = ref(true)
  const interfaceVisible = ref(false)

  const navIntent = ref('mouse')
  
  const mainTransition = ref('zoom-fade')

  const splashDone = () => {
    splashComplete.value = true
  }

  const browserInfo = ref(null)

  const hmData = ref([])

  const siteLang = ref('en')

  const worksInfo = ref([])

  const workLinks = computed( () => {
    if (worksInfo.value.length === 0) {
      return ['','','','','','']
    } else {
      return worksInfo.value.map((work) => {
        let slug = work.slug
        let lang = siteLang.value
        return `/works/${slug}/${lang}`
      })
    }
  })

  const workCovers = computed(() => {
    if (worksInfo.value.length === 0){
      return [null,null,null,null,null,null]
    } else {
      return worksInfo.value.map((workInfo) => {
        if (workInfo.cover === null){
          return null
        } else {
          return `${api_base}assets/${workInfo.cover.filename_disk}`
        }    
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
          workLinks,
          workCovers,
          siteInfo, 
          access_bg_images, 
          access_animations,
          navIntent
        }
})
