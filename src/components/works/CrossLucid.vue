<template>
    <VideoComponent v-if="videos.length" :video_file="videos[0]"></VideoComponent>
    <div>
        <p>Site Visitors: {{visitsToday}}</p>
        <p>Browser Updates Available: {{cl_store.platformUpToDate}} </p>
        <p>Session Length: {{cl_store.sessionLength}} milliseconds</p>
        <p></p>
    </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue';
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

//
const about_viewed__and_11_mins = () => {
    if (cl_store.aboutTextViewed && cl_store.sessionLength > 600000){
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
    if (cl_store.browserSize > 3.55 || cl.compareWorks){
        return true
    } else {
        return false
    }
}

const last_work = () => {
    if (cl_store.artworksViewed.length && cl_store.artworksViewed[-1] == 'symbiotic-ai'){
        return true
    } else {
        return false
    }
}

const selectScene = async () => {

    if(cl_store.aboutTextViewed && cl_store.sessionLength > 600000){
        // PLAY SCENE 1
    }else if(cl_store.clicks > 20 && cl_store.clicks < 50 && cl_store.artworksViewed < 5){
        // PLAY SCENE 2
    }else if(cl_store.artworksViewed > 3 && cl_store.aboutTextViewed){
        // PLAY SCENE 3
    }else if(visitorsToday > 100 && cl_store.device != 'mobile'){
        // PLAY SCENE 4
    // }else if(platformVersionNumberTotal == 7 || platformVersionNumberTotal == 11 && device == 'mobile'){
    //     // PLAY SCENE 5
    }else if(charge < 20){
        // PLAY SCENE 6
    // }else if(windowRatio < .5 || windowRatio < 1.5 && lastKeyPressed == 'x'){
        // PLAY SCENE 7
    }else{
        // what if none of these conditions are met?
    }

}

if (cl_store.location == 'ru'){
    // PLAY UKRAINE VICTORY SIGIL
}else if(cl_store.location == 'us'){
    // PLAY SCENE 4
}else{
    selectScene();
}

</script>