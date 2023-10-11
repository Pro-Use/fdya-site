<template>
    
</template>

<script setup>
import { useClStore } from '../../stores/CrossLucid'
import axios from 'axios';

const cl_store = useClStore()

const selectScene = async () => {
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
    let visitorsToday
    try {
        const res = await axios.get(get_url)
        visitorsToday = res.data.data[0].count
    } catch {
        visitorsToday = 0
    }
    let charge
    try {
        const battery = await window.navigator.getBattery()
        charge = battery.level * 100
    } catch {
        charge = 100
    }
    console.log(charge)
    console.log(visitorsToday)


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