<template>
	<canvas class="test" v-show="false" ref="canvas_download"></canvas>
	<a ref="download"></a>
</template>

<script setup>
	import {ref, defineProps, watch } from 'vue'
	import {storeToRefs} from 'pinia'
	import { useStateStore } from '../stores/state'
	import { useClStore } from '../stores/CrossLucid'
	const state = useStateStore()
	const cl_store = useClStore()
	const props = defineProps(['heatmap'])
	const canvas_download = ref(null)
	const download = ref(null)

	let text_size = 25
	let text_height = Math.floor(text_size * 1.28)
	let border = text_size * 2

	const { download_heatmap } = storeToRefs(state)

	const artists = [
		"XU HAOMIN", "RUINI SHI", "REBECCA ALLEN", "IRIS QU", "CROSSLUCID", "APRIL LIN", "ALICE YUAN ZHANG"
	]

	const gen_download = () => {
		if (canvas_download === null){
			return
		}
		console.log(props.heatmap)
		const canvas = props.heatmap.firstChild
		const context = canvas_download.value.getContext('2d')

		canvas_download.value.height = canvas.height
		canvas_download.value.width = canvas.width
		//set background
		context.fillStyle='black';
		context.fillRect(0,0, canvas.width, canvas.height);
		//
		// Draw heatmap
		context.drawImage(canvas, 0, 0)
		//
		// Font formatting
		context.font = `${text_size}px dm-mono-regular`
		context.strokeStyle = "white";
		context.fillStyle = "#ffffff";
		context.textAlign = "left";
		context.textBaseline = 'top';
		//
		// Set font size + border
		const dateStr = String(new Date()).replace(/\(.*\)/g, '')
		let longLine = `${dateStr} ${cl_store.latLng}`.toUpperCase()
		let text = context.measureText(longLine)
		let text_max = canvas.height - border
		while(text.width > text_max){
			text_size -= 1
			border = text_size * 2
			text_max = canvas.height - border
			context.font = `${text_size}px dm-mono-regular`
			text = context.measureText(longLine)
			if (text.width < text_max){
				text_height = Math.floor(text_size * 1.28)
			}
		}
		//
		// dynamic text
		context.save();
		context.translate( 0, 0 );
		context.rotate( Math.PI / 2 );
		let text_start = (0 - canvas.width) + border
		context.fillText( "FOR DATA YOU ARE, AND TO DATA YOU SHALL RETURN", border, text_start);
		text_start += text_height
		context.fillText( "对于你所是的数据, 对于你应该返回的数据", border, text_start);
		text_start += text_height
		context.fillText( longLine, border, text_start)
		text_start += text_height
		context.fillText( "AREBYTE + CHRONOS ART CENTER", border, text_start);
		context.restore();
		// artists 
		text_start = canvas.height - border
		artists.forEach((artist) => {
			context.fillText(artist, border, text_start)
			text_start -= text_height
		})
		
		const fileSafe = longLine.replaceAll(' ', '_').replaceAll(':', '.').replaceAll('+', '_')
		const imageName = `FDYA-${fileSafe}.png`
		download.value.href = canvas_download.value.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
		download.value.download = imageName
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

<style scoped>
	.test {
		z-index: 20000;
		position: fixed;
		top: 0;
	}
</style>