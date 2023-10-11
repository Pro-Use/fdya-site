import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useClStore = defineStore('crossLucid', () => {
  
  const location = ref(null);

  const device = ref(null);
  
  const artworksViewed = ref([]);
  
  const sessionStart = ref(0);
  const sessionLength = computed(() => Date.now() - sessionStart.value )
  
  const aboutTextViewed = ref(false);
  
  const clicks = ref(0);
  
  const textViewed = ref(0);
  
  // const currentVisitors = ref(null); // Not needed
  
  const platformVersion = ref(null);
  
  // const volume = ref(null);
  
  // const charge = ref(null); // Do in page
  
  // const windowRatio = ref(null); // Do in page
  
  // const lastKeyPressed = ref(null); // Not needed

  return { location, device, artworksViewed, sessionStart, sessionLength, aboutTextViewed, clicks, textViewed, platformVersion}
})
