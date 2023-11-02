<template>
    <VideoComponent v-if="videoSelected" :video_file="videoSelected"></VideoComponent>
    <div v-if="overlayVisible" class="data-overlay z-50 top-0 left-0 p-2 lg:p-4 text-white text-lg xl:text-2xl font-DMregular" v-html="overlay">
    </div>
</template>

<script setup>
import { ref, computed, defineProps, onMounted } from 'vue';
import { useStateStore } from '../../stores/state'
import { useClStore } from '../../stores/CrossLucid'
import VideoComponent from './VideoComponent.vue'
import axios from 'axios';


const cl_store = useClStore()
const state = useStateStore()
const props = defineProps(['work'])
const visitsToday = ref(0)
const charge = ref(100)
const workOrder = ['']
const overlayTexts = []
const overlay = ref('')
const overlayVisible = ref(true) // set to true
const videoSelected = ref(null)

const videos = computed(() => {
    let filter_work = state.worksInfo.filter((work_obj) => work_obj.slug == props.work)
    if (filter_work.length === 1 && filter_work[0].videos.length > 0){
        return filter_work[0].videos.map((video_info) => video_info.directus_files_id)
    } else {
        return []
    }
})

const get_visitors = async() => {
    const now = new Date()
    const then = new Date()
    then.setHours(0,0,0)
    const now_str = now.toISOString()
    const then_str = then.toISOString()
    const api_base =  import.meta.env.VITE_API_BASE
    const query = {"date_updated": 
        {"_between": [then_str, now_str] }
    }
    const query_str = JSON.stringify(query)
    const get_url = `${api_base}/items/heatmap_sessions?filter=${query_str}&aggregate[count]=*`
    try {
        const res = await axios.get(get_url)
        return res.data.data[0].count
    } catch {
        return 0
    }
}

const get_charge = async() => {
    try {
        const battery = await window.navigator.getBattery()
        return battery.level * 100
    } catch {
        return 100
    }
}


// Logic Functions
const about_viewed_and_11_mins = () => {
    if (cl_store.aboutTextViewed && cl_store.sessionLength() > 600000){
        return true
    } else {
        return false
    }
}

const clicks_20_50_and_less_works = () => {
    if (cl_store.clicks >= 20 && cl_store.click <= 50 && cl_store.artworksViewed.length < 5){
        return true
    } else {
        return false
    }
}

const more_works_and_1_text = () => {
    if (cl_store.artworksViewed.length >4 && cl_textsViewed.lenth >= 1){
        return true
    } else {
        return false
    }
}

const more_viewers_and_desktop = () => {
    if (visitsToday.value > 20 && cl_store.device != 'mobile') {
        return true
    } else {
        return false
    }
}

const platform_version_and_mobile = () => {
    if (cl_store.platformUpToDate && cl_store.device == 'mobile'){
        return true
    } else {
        return false
    }
}

const small_browser_work_order = () => {
    if (cl_store.browserSize > 3.55 || cl_store.compareWorks){
        return true
    } else {
        return false
    }
}

const last_work = () => {
    if (cl_store.lastWork == 'symbiotic-ai'){
        return true
    } else {
        return false
    }
}

const add_to_overlay = (val, key) => {
    overlayTexts.push(`${key}: ${val}`)
}

const highlight_overlay = (key) => {
    const index = overlayTexts.findIndex((text) => text.includes(key))
    if (index !== -1){
        overlayTexts[index] = `<span class="italic">${overlayTexts[index]}</span>`
    }
}

const gen_overlay = (index) => {
    if (index <= overlayTexts.length){
        if (index < overlayTexts.length){
            overlay.value += `${overlayTexts[index]} <br>`
        } else {
            setTimeout(() => {
                overlayVisible.value = false
            }, 2000)
        }
        setTimeout(() => {gen_overlay(index + 1)}, 500)
    }
}

const selectScene = async () => {
    let scene = 0

    if (last_work()){
        scene = 8
        highlight_overlay('artworksViewed')
    }else if (small_browser_work_order()){
        scene = 7
        highlight_overlay('artworksViewed')
        highlight_overlay('browserSizeDecimal')
    } else if (charge.value < 20){
        scene = 6
        highlight_overlay('charge')
    } else if (platform_version_and_mobile()){
        scene = 5
        highlight_overlay('device')
        highlight_overlay('browserUpToDate')
    } else if (more_viewers_and_desktop()){
        scene = 4
        highlight_overlay('device')
        highlight_overlay('visitorsToday')
    } else if (more_works_and_1_text()){
        scene = 3
        highlight_overlay('artworksViewed')
        highlight_overlay('artworkTextsViewed')
    } else if (clicks_20_50_and_less_works()){
        scene = 2
        highlight_overlay('artworksViewed')
        highlight_overlay('clicks')
    } else if (about_viewed_and_11_mins()){
        scene = 1
        highlight_overlay('aboutTextViewed')
        highlight_overlay('sessionLength')
    }

    videoSelected.value = videos.value[scene]

    console.log(`Scene selected = ${scene}`)

}

onMounted( async() => {
    await get_visitors()
    await get_charge()

    add_to_overlay(visitsToday.value, 'visitorsToday')
    add_to_overlay(cl_store.location, 'location')
    add_to_overlay(cl_store.device, 'device')
    add_to_overlay(cl_store.platformUpToDate, 'browserUpToDate')
    add_to_overlay(`${charge.value}%`, 'charge')
    add_to_overlay(cl_store.browser_size, 'browserSizeDecimal')
    add_to_overlay(`${cl_store.sessionLength()}ms`, 'sessionLength')
    add_to_overlay(cl_store.clicks, 'clicks')
    add_to_overlay(cl_store.aboutTextViewed, 'aboutTextViewed')
    add_to_overlay(cl_store.artworksViewed, 'artworksViewed')
    add_to_overlay(cl_store.compareWorks, 'artworkPageKnock')
    add_to_overlay(cl_store.textsViewed.length, 'artworkTextsViewed')

    gen_overlay(0)

    if (cl_store.location == 'us'){
        videoSelected.value = videos.value[4]
    // }else if(cl_store.location == 'ru'){
    //     PLAY UKRAINE VICTORY SIGIL
    }else{
        selectScene();
    }

})


</script>

<style scoped>
    .data-overlay {
        z-index: 100;
        position: fixed;
    }
</style>