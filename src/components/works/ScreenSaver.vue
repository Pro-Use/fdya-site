<template>
	<div v-if="ss_active">
<!-- 		<iframe 
			class="ss-iframe"  
			allowtransparency="true"
			src="http://works.fordatayouareandtodatayoushallreturn.online/threejs_yunshi/">

		</iframe> -->
	</div>
	<div v-show="!ss_loaded || ss_active" class="fixed top-0 pointer-events-none" :style="{ 'z-index': z_index}">
		<Meteorite ref="meteorite" @loaded="handleLoaded"
		 	:resource="{ 
			 	gltf: `${resource_base}/models/final.glb`, 
			 	normal: `${resource_base}/textures/normal_1.jpg`, 
			 	environment: `${resource_base}/textures/iStock-1609113229.jpg` 
		 	}" 
		/>
	</div>
	<div v-show="ss_active"
		 class="ss-iframe hide"  
		 ref="ss_monitor">
	</div>
</template>
<script setup>
	import { ref, onMounted } from 'vue';
	import { fromEvent, mergeWith} from 'rxjs';
	import { useStateStore } from '../../stores/state'
	import Meteorite from './glimpse/Meteorite.vue';


	const meteorite = ref(null)
	const state = useStateStore()

	const ss_monitor = ref(null)
	const timeout_ms = 20000
	const timeout_id = ref(null)
	const ss_active = ref(false)
	const ss_loaded = ref(false)
	const z_index = ref(0)
	const props = defineProps(['monitored'])
	const monitored = props.monitored

	const resource_base = "/works/glimpse"

	const getDelay = () => {
	  return (Math.random() * 10 + 10) * 1000;
	}

	const handleLoaded = () => {
		ss_loaded.value = true
		z_index.value = 1000
	  	set_timeout()
	}

	const set_timeout = () => {
		if (timeout_id.value !== null){
			clearTimeout(timeout_id.value)
		}
		const delay = getDelay();
		timeout_id.value = setTimeout(() => {
			console.log('disabled', state.screensaver_disabled)
			console.log('focus', document.hasFocus())
			if(state.screensaver_disabled == false && document.hasFocus()){
				ss_active.value = true
				console.log('meteorite')
				meteorite.value?.start()

			}
		}, delay)
	}

	onMounted(() => {

		const move = fromEvent(monitored, 'mousemove')
		const ss_move = fromEvent(ss_monitor._value, 'mousemove')

		move
		.pipe(mergeWith(ss_move))
		.subscribe(() => {
			if (ss_active.value){
				ss_active.value = false
				// stop meteorite
				meteorite.value?.reset()
			}
			set_timeout()
			
		})
	})

	
</script>
<style scoped>
	.ss-iframe {
		width: 100vw;
	    height:100vh;
	    position: fixed;
	    top: 0;
		z-index: 10000;
/*		opacity: .75;*/
		background-color : transparent;
	}
	
</style>