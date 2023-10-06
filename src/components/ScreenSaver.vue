<template>
	<div v-if="ss_active">
		<iframe 
			class="ss-iframe"  
			src="http://works.fordatayouareandtodatayoushallreturn.online/threejs_yunshi/">
		</iframe>
	</div>
	<div
		class="ss-iframe"  
		ref="ss_monitor">
	</div>
</template>
<script setup>
	import { ref, defineProps, onMounted } from 'vue';
	import { fromEvent, mergeWith} from 'rxjs';

	const ss_disabled = true

	const ss_monitor = ref(null)
	const timeout_ms = 10000
	const timeout_id = ref(null)
	const ss_active = ref(false)
	const props = defineProps(['monitored'])
	const monitored = props.monitored

	const set_timeout = () => {
		if (timeout_id.value !== null){
			clearTimeout(timeout_id.value)
		}
		timeout_id.value = setTimeout(() => {
			if(!ss_disabled){
				ss_active.value = true
			}
		}, timeout_ms)
	}

	onMounted(() => {
		set_timeout()

		console.log(monitored)
		console.log(ss_monitor)

		const move = fromEvent(monitored, 'mousemove')
		const ss_move = fromEvent(ss_monitor._value, 'mousemove')

		move
		.pipe(mergeWith(ss_move))
		.subscribe(() => {
			if (ss_active.value){
				ss_active.value = false
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
		opacity: .75;
	}
	
</style>