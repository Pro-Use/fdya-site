import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const api_base =  import.meta.env.VITE_API_BASE

export const useStateStore = defineStore('state', () => {
  const splashComplete = ref(false)
  const infoVisible = ref(false)

  const access_bg_images = ref(true)
  const access_animations = ref(true)
  const interfaceVisible = ref(false)
  const small_screen = ref('false')
  
  const navIntent = ref('mouse')
  
  const mainTransition = ref('zoom-fade')

  const splashDone = () => {
    splashComplete.value = true
  }

  const browserInfo = ref(null)

  const hmData = ref([])

  const siteLang = ref('en')

  const changeLang = () => {
    if (siteLang.value == 'en'){
      siteLang.value = 'cn'
    } else {
      siteLang.value = 'en'
    }
  }

  const worksInfo = ref([])

  const worksInfoTranslated = computed(() => {
    let info = []
    worksInfo.value.forEach((workInfo) => {
      //loop through object keys, make new object with data from en/cn as appropriate
      let translated = {}
      let keys = Object.keys(workInfo)
      keys.forEach((key) => {
        if (siteLang.value == 'en' && key.includes('_en') || siteLang.value == 'cn' && key.includes('_cn')){
          let new_key = key.replace('_en', '').replace('_cn', '')
          translated[new_key] = workInfo[key]
        } else if (!key.includes('_en') && !key.includes('_cn') ){
          translated[key] = workInfo[key]
        }
      })
      info.push(translated)
    })
    return info
  })

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

  const siteInfoTranslated = computed(()=> {
    let translated = {}
    let keys = Object.keys(siteInfo.value)
    keys.forEach((key) => {
      if (siteLang.value == 'en' && key.includes('_en') || siteLang.value == 'cn' && key.includes('_cn')){
        let new_key = key.replace('_en', '').replace('_cn', '')
        translated[new_key] = siteInfo.value[key]
      } else if (!key.includes('_en') && !key.includes('_cn') ){
        translated[key] = siteInfo.value[key]
      }
    })
    return translated
  })

  const accessInfo = ref([])

  const accessInfoTranslated = computed(()=> {
    let translated = {}
    let keys = Object.keys(accessInfo.value)
    keys.forEach((key) => {
      if (siteLang.value == 'en' && key.includes('_en') || siteLang.value == 'cn' && key.includes('_cn')){
        let new_key = key.replace('_en', '').replace('_cn', '')
        translated[new_key] = accessInfo.value[key]
      } else if (!key.includes('_en') && !key.includes('_cn') ){
        translated[key] = accessInfo.value[key]
      }
    })
    return translated
  })

  const elTranslations = ref([])

  const siteElsTranslated = computed(() =>{
    let transEls = {}
    elTranslations.value.forEach((element) => {
      if (siteLang.value == 'en'){
        if (element.slug == 'language') {
          transEls[element.slug] = element.chinese
        } else {
          transEls[element.slug] = element.english
        }
      } else {
        if (element.slug == 'language') {
          transEls[element.slug] = element.english
        } else {
          transEls[element.slug] = element.chinese
        }
      }
    })
    return transEls
  })

  const getTrans = (slug) => {
    if (siteElsTranslated.value[slug]){
      return siteElsTranslated.value[slug]
    } else {
      return slug
    }
  }

  const screensaver_disabled = ref(true)

  const download_heatmap = ref(false)

  return {
    interfaceVisible, 
    mainTransition, 
    splashComplete, 
    splashDone, 
    infoVisible, 
    browserInfo, 
    hmData, 
    siteLang,
    changeLang,
    worksInfo,
    worksInfoTranslated,
    workLinks,
    workCovers,
    siteInfo,
    siteInfoTranslated, 
    elTranslations,
    siteElsTranslated,
    getTrans,
    access_bg_images, 
    access_animations,
    navIntent,
    screensaver_disabled,
    small_screen,
    download_heatmap,
  }
})
