<template>
	<canvas class="test" v-show="false" ref="canvas_download"></canvas>
	<a ref="download"></a>
</template>

<script setup>
	import {ref, defineProps, watch } from 'vue'
	import {storeToRefs} from 'pinia'
	import { useStateStore } from '../stores/state'
	import { useClStore } from '../stores/CrossLucid'
	import axios from 'axios';
	import { drawText } from 'canvas-txt'
	import logoStrip from "../assets/Logo_Strip1.5x.png"
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

	const gen_download = async () => {
		if (canvas_download === null){
			return
		}
		const canvas = props.heatmap.firstChild
		const context = canvas_download.value.getContext('2d')

		let browserInfo = ""
		const api_base =  import.meta.env.VITE_API_BASE
		const res = await axios.get(api_base+'items/browser_info?sort=-date_created&limit=20')
		console.log(res.data.data)
		res.data.data.forEach((data) => {
			browserInfo += data.info
		})

		let canvasBlobTxt = canvas.toDataURL()
		canvasBlobTxt = canvasBlobTxt.slice(0,8000)

		canvas_download.value.height = canvas.height
		canvas_download.value.width = canvas.width
		//set background
		context.fillStyle='black';
		context.fillRect(0,0, canvas.width, canvas.height);
		//
		// Background Text
		let border = 16
		let bg_text_size = 10
		let bg_text_start = border
		let bg_contents
		let text_width
		context.fillStyle = "rgb(208, 109, 255)";
		context.textAlign = "left";
		context.textBaseline = 'top';

		if (canvas.width > canvas.height){
			text_width = (canvas.width / 3 ) - ( border * 2 )
			bg_contents = [
				browserInfo,
				canvasBlobTxt,
				JSON.stringify(state.hmData)
			]
		} else {
			text_width = canvas.width - ( border * 2 )
			bg_contents = [
				browserInfo
			]
		}

		bg_contents.forEach((bg_txt) => {
			drawText(context, bg_txt, {
	  			x: bg_text_start,
	  			y: border,
	  			width: text_width,
	  			height: canvas.height - (border * 2),
	  			font: 'monospace',
	  			fontSize: bg_text_size,
	  			align: 'left',
	  			justify: true,
	  			lineHeight: bg_text_size * 1.5
	  		})

	  		bg_text_start += border + text_width
		})

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
		context.fillText( "为数据所生，亦归数据而去", border, text_start);
		text_start += text_height
		context.fillText( longLine, border, text_start)
		text_start += text_height
		context.fillText( "AREBYTE + CHRONOS ART CENTER", border, text_start);
		context.restore();
		// logos
		const logo_src = logoStrip
		const logo_min = 20
		let logo_height = (canvas.height / 1080) * 50
		if (logo_height < logo_min){
			logo_height = logo_min
		}
		let logo_y = canvas_download.value.height - ( border + logo_height)
		let logo_x = border

		const logo = new Image()
		logo.src = logo_src
		await logo.decode()
		const ratio = logo_height/logo.naturalHeight
		const logo_width = logo.naturalWidth * ratio
		context.drawImage(logo, logo_x, logo_y, logo_width, logo_height)
		logo_x += border + logo_width


		// artists 
		text_start = canvas_download.value.height - ((border*2) + logo_height + text_height)
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