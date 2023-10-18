<template>
	<canvas v-show="false" ref="canvas_download"></canvas>
	<a ref="download"></a>
</template>

<script setup>
	import {ref, defineProps, watch } from 'vue'
	import {storeToRefs} from 'pinia'
	import { useStateStore } from '../stores/state'
	const state = useStateStore()
	const props = defineProps(['heatmap'])
	const canvas_download = ref(null)
	const download = ref(null)

	const { download_heatmap } = storeToRefs(state)

	const gen_download = () => {
		if (canvas_download === null){
			return
		}
		console.log(props.heatmap)
		const canvas = props.heatmap.firstChild
		const context = canvas_download.value.getContext('2d')

		canvas_download.value.height = canvas.height
		canvas_download.value.width = canvas.width

		context.drawImage(canvas, 0, 0)

		console.log(canvas_download.value.toDataURL())

		download.value.href = canvas_download.value.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
		download.value.download = "heatmap.png"
		download.value.click()

		state.$patch({'download_heatmap': false})
	}

	watch( download_heatmap, (newVal, oldVal) => {
		console.log('val change')
		if (newVal === true && oldVal === false){
			console.log('generating download')
			gen_download()
		}
	})
</script>