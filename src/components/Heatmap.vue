<template>
	<div aria-hidden="true" class="heatmap" ref="hm_div"></div>
	<div class="fake-heatmap" v-show="heatmap_faked"></div>
	<HeatmapDownload v-if="hm_div !== null" :heatmap="hm_div" />
</template>

<script setup>
	import { ref, onMounted, watch } from 'vue';
	import { useRoute } from "vue-router";
	import h337 from 'heatmap.js';
	import { fromEvent, map, mergeWith, debounceTime } from 'rxjs';
	import axios from 'axios';
	import { useStateStore } from '../stores/state'
	import { useClStore } from '../stores/CrossLucid'
	import HeatmapDownload from './HeatmapDownload.vue'

	const state = useStateStore()
	const cl_store = useClStore()

	const props = defineProps(['monitored'])
	const monitored = props.monitored
	const route = useRoute();

	const hm_div = ref(null)
	const heatmap_faked = ref(true)
	let heatmap

	const no_cache = {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0',
    }

	const addValue = (e, value) => {
     	e.value = value;
     	return e;
    };

    const api_base =  import.meta.env.VITE_API_BASE

    const renderHeatmap = async (pull=true) => {
    	// fill screen with data
	    let start_data = []
	    // Placeholder values
	    for (let i = 0; i <= monitored.scrollHeight; i += 10) {
	    	// console.log(i)
	    	for (let n = 0; n <= monitored.scrollWidth; n += 10) {
	    		let new_point = {
	    			'x': n,
	    			'y': i,
	    			'value': 1,
					'radius': 10
	    		}
	    		start_data.push(new_point)
	    	}
	    }

	    //From latest session in DB
		  if (pull){
				try {
					let res = await axios.get(api_base+'items/heatmap_sessions?sort=-date_updated&limit=1', {headers: no_cache})
					console.log(res)
					if (res.data.data.length > 0) {
						const old_data = JSON.parse(res.data.data[0].data)
						console.log('Using '+ res.data.data[0].id)
						start_data = start_data.concat(old_data)
					}
				} catch (error) {
					console.error(error);
				}
			}

	    const click_max = 100
	    let data_max = 100
			heatmap = h337.create({
	        maxOpacity: 1,
	        minOpacity: 1,
	        gradient: {
					'.1': '#201E21',
					'.3': '#574C2D',
					'.4': '#63127E',
					'.45': '#370E79',
					'.8': '#40886D',
					'.96': '#24C9D2',
					'.97': '#24C9D2',
					'.99': '#24C9D2'
			},
			blur: .999,
      radius: 90,
      container: hm_div.value,
			});

			heatmap.setData({min:0, max:data_max, data:start_data})
			console.log(heatmap)
			let hm_size = hm_div.value.scrollWidth / hm_div.value.scrollHeight
			cl_store.$patch({'browser_size': hm_size})
	
	    const move = fromEvent(monitored, 'mousemove').pipe(map((value) => {return {x: value.clientX, y: value.clientY, value: 5}}));
	    const touch = fromEvent(monitored, 'touchmove').pipe(map((value) => {return {x: value.clientX, y: value.clientY, value: 5}}));;
	    const click = fromEvent(monitored, 'click').pipe(map((value) => {return {x: value.clientX, y: value.clientY, value: 40, radius: 10}}));

	    const all_points = []

	    move
		  .pipe(mergeWith(click, touch))
		  .subscribe(new_val => {
		  	// console.log(new_val);
		  	let pos_val = heatmap.getValueAt({'x':new_val.x,'y':new_val.y })
		  	// console.log(pos_val)
		  	if (pos_val <= click_max){
		  		heatmap.addData(new_val);
		  	}
		  	all_points.push(new_val)
		  });

		let session_id = null;
		const all_clicks = []

		click.subscribe(async click => {
			// if (data_max > 20){
			// 	data_max -= 5
				
			// }
			// heatmap.setDataMax(data_max)
			cl_store.clicks ++
			let first = 0
			if (all_points.length > 1000){
				first = -1000
			}
			let recent_points = all_points.slice(first, -1)
			console.log(recent_points)
			state.$patch({hmData: recent_points})
			

		})

		watch(
		  () => route.fullPath,
		  async () => {
		  	if (!route.fullPath.includes('#')){
		  		let payload = {data: all_points}
					//send to an API for database storage
					if (session_id === null){
						let res = await axios.post(api_base+'items/heatmap_sessions', payload)
						session_id = res.data.data.id
					} else {
						let res = await axios.patch(api_base+'items/heatmap_sessions/'+session_id, payload)
						console.log(res)
					}
		  	}
		    
		  }
		);
				
		const resize = fromEvent(window, 'resize');
		const result = resize.pipe(debounceTime(1));
		
		result.subscribe(x => {
			// fake heatmap to hide background text
			heatmap_faked.value = true
			console.log(heatmap_faked.value)
			// fill screen with data
	    let start_data = []
	    // Placeholder values
	    for (let i = 0; i <= monitored.scrollHeight; i += 10) {
	    	// console.log(i)
	    	for (let n = 0; n <= monitored.scrollWidth; n += 10) {
	    		let new_point = {
	    			'x': n,
	    			'y': i,
	    			'value': 1,
					'radius': 10
	    		}
	    		start_data.push(new_point)
	    	}
	    }
			heatmap = h337.create({
	        maxOpacity: 1,
	        minOpacity: 1,
	        gradient: {
					'.1': '#201E21',
					'.3': '#574C2D',
					'.4': '#63127E',
					'.45': '#370E79',
					'.8': '#40886D',
					'.96': '#24C9D2',
					'.97': '#24C9D2',
					'.99': '#24C9D2'
				},
				blur: .999,
	      radius: 90,
	      container: hm_div.value,
			});
			heatmap.setData({min:0, max:data_max, data:start_data})
			// const pre_hms = hm_div.value.children.length
			const hm_canvases = hm_div.value.children
			for (let c = 0; c < hm_canvases.length -1; c ++) {
				console.log(hm_canvases[c])
				hm_div.value.removeChild(hm_canvases[c])
			}
			console.log('unhiding heatmap')
			heatmap_faked.value = false
			let new_hm_size = hm_div.value.scrollWidth / hm_div.value.scrollHeight
			cl_store.$patch({'browser_size': new_hm_size})
		});

	}

	onMounted(() => {
		renderHeatmap()
		heatmap_faked.value = false
	})

</script>

<style scoped>
  .heatmap .fake-heatmap {
    width: 100vw;
    height:100vh;
    position: fixed;
    top: 0;
  }

  .fake-heatmap {
  	background-color: #201E21;
  	z-index: 20;
  }
</style>