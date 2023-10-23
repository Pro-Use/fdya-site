import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const start_session = Date.now()
const works_order = ['landscape-enter-life', 'digital-traces', 'funeral-play']

export const useClStore = defineStore('crossLucid', () => {
  
  const location = ref(null);

  const latLng = ref('');

  const device = ref(null);

  const browser_size = ref(null);
  
  const artworksViewed = ref([]);
  
  const addWork = (work) => {
    if (! artworksViewed.value.includes(work)){
      artworksViewed.value.push(work)
    }
  }

  const compareWorks = computed(() => {
   return artworksViewed.value.length === works_order.length && artworksViewed.value.every((element, index) => element === works_order[index]);
  })
  
  const sessionStart = ref(start_session);
  const sessionLength = computed(() => Date.now() - sessionStart.value )
  
  const aboutTextViewed = ref(false);
  
  const clicks = ref(0);
  
  const textsViewed = ref([]);

  const addText = (work) => {
    if (! textsViewed.value.includes(work)){
      textsViewed.value.push(work)
    }
    
  }
  
  const platformVersion = ref(null);

  const platformUpToDate = computed(() => {
    return false
  })

  return { location, latLng, device, browser_size, artworksViewed, addWork, compareWorks, sessionStart, sessionLength, aboutTextViewed, clicks, textsViewed, addText, platformVersion, platformUpToDate}
})
