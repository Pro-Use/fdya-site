<template>
	<div class="bg_content_wrapper">
		{{info_text}}
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import axios from 'axios';
	import { UAParser } from 'ua-parser-js';
	import { useStateStore } from '../stores/state'

	const state = useStateStore()

	console.log('navigator',window.navigator)
	const uap = UAParser(navigator.userAgent);
	console.log('uap', uap)

	const info_text = ref('')
	let device_info_str = 'FOR DATA YOU ARE, AND TO DATA YOU SHALL RETURN '

	const strFmt = (str, pre='', post='') => {
		return pre.toUpperCase()+String(str).toUpperCase()+post.toUpperCase()+' '
	}

	const getDeviceInfo = async () => {
		let res = await axios.get('https://api.ipify.org?format=json')
		let ip = res.data.ip
		let ip_str = strFmt(ip, 'IPV4: ')
		device_info_str += ip_str
		let ip_api = 'https://ipinfo.io/'+ip+'/?token=5119af49b37a8d'
		let res2 = await axios.get(ip_api)
		let geo = res2.data
		console.log('geo', geo)
		device_info_str += (strFmt(geo.city,'',',')+strFmt(geo.region)+strFmt(geo.org))
		device_info_str += strFmt(geo.loc)
		if (uap.device.type === 'mobile'){
			device_info_str += 'MOBILE '
		} else {
			device_info_str += 'DESKTOP OR LAPTOP '
		}
		device_info_str += (strFmt(uap.os.name)+strFmt(uap.os.version, 'VERSION: '))
		device_info_str += strFmt(uap.cpu.architecture, 'CPU: ')
		device_info_str += strFmt(window.navigator.hardwareConcurrency, 'CORES: ')
		device_info_str += (strFmt(uap.browser.name)+strFmt(uap.browser.version, 'VERSION: '))
		device_info_str += (strFmt(uap.engine.name, '(ENGINE: ')+strFmt(uap.engine.version, 'VERSION: ', ')'))
		device_info_str += strFmt(uap.ua)
		device_info_str += 'LANGUAGES '
		window.navigator.languages.forEach((language) => {
			device_info_str += strFmt(language)
		})
		device_info_str += strFmt(new Date())

		if (!window.navigator.mediaDevices?.enumerateDevices) {
		  console.log("enumerateDevices() not supported.");
		} else {
		  let videoinput = 0
		  let audioinput = 0
		  // List cameras and microphones.
		  let devices = await window.navigator.mediaDevices.enumerateDevices()

	      devices.forEach((device) => {
	        if (device.kind == 'videoinput'){
	        	videoinput ++
	        } else if (device.kind == 'audioinput'){
	        	audioinput ++
	        }
	      });
	      device_info_str += strFmt(videoinput, 'VIDEO INPUT(S): ')
	      device_info_str += strFmt(audioinput, 'AUDIO INPUT(S): ')

		}



	}

	const infoChunk = async (str, start=0, last=false) => {
		let chars = parseInt(Math.random() * 7)
		if ((start + chars) > str.length){
			chars = str.length - chars
			last = true
		}
		let chunk = str.substr(start, chars)
		start += chars
		let delay = Math.random() * 100
		info_text.value += chunk
		if (!last){
			setTimeout(() => {
				infoChunk(str, start, last)
			}, delay)	
		} else {
			console.log('Print done')
			state.splashDone()
		}

	}

	const showDeviceInfo = async () => {
		await getDeviceInfo()	
		console.log(device_info_str)
		infoChunk(device_info_str)

	}
	
	
	showDeviceInfo()

</script>

<style scoped>

  .bg_content_wrapper {
    width: 100vw;
    height:100vh;
    position: fixed;
    color: black;
    font-size: 60px;
	font-family: monospace;
	top: 0px;
  }

</style>