<template>
	<main id="#main" class="loadingScreen fixed w-screen h-screen bg-offBlack text-white z-50 text-3xl p-5 font-DMregular leading-tighter overflow-y-auto">
		<h1 class="sr-only">{{ accessTitle }}</h1>
		<p class="introduction sr-only">
			An online exhibition featuring, Alice Yuan Zhang, April Lin, Crosslucid, Iris QU, Rebecca Allen, Ruini Shi and XU Haomin.
		</p>
		<span aria-hidden="true">{{info_text}}</span> <span v-if="!data_complete" aria-hidden="true" class="flash text-black w-20 bg-white inline-block translate-y-1 h-7"></span>	
		<div v-if="data_complete" class="pt-4">
			<button class="p-4 border border-solid border-white" aria-label="Enter the exhibition" @click="skipIntro">Enter</button>
		</div>
		<button class="focus:p-4 border border-solid border-white sr-only focus:not-sr-only focus:fixed bottom-[32px] left-[50%] translate-x-[-50%] bg-offBlack" aria-label="Enter the exhibition" @click="skipIntro">Enter</button>
	</main>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import axios from 'axios';
	import { UAParser } from 'ua-parser-js';
	import { useStateStore } from '../stores/state'
	import { useClStore } from '../stores/CrossLucid'
	import { useRoute } from 'vue-router'

	const state = useStateStore()
	const cl_store = useClStore()

	const route = useRoute()
	const api_base =  import.meta.env.VITE_API_BASE

	console.log('route', route.fullPath)

	console.log('navigator',window.navigator)
	const uap = UAParser(navigator.userAgent);
	console.log('uap', uap)

	const info_text = ref('')
	const info_index = ref('')

	const data_complete = ref(false)

	let splashText = []
	let splashTextSave = ''
	let title = ' /FOR /DATA /YOU /ARE, /AND /TO /DATA /YOU /SHALL /RETURN  /为数据所生，/亦归数据而去 '
	let accessTitle = ' FOR DATA YOU ARE, AND TO DATA YOU SHALL RETURN  为数据所生，亦归数据而去 '
	const artists = [
		"XU HAOMIN ", "RUINI SHI ", "REBECCA ALLEN ", "IRIS QU ", "CROSSLUCID ", "APRIL LIN ", "ALICE YUAN ZHANG "
	]
	const orgs = ["AREBYTE ", "+ ", "CHRONOS ART CENTER "]

	info_text.value = 'Loading'

	const strFmt = (str, pre='', post='') => {
		return pre.toUpperCase()+String(str).toUpperCase()+post.toUpperCase()+' '
	}

	const addText = (str) => {
		splashText.push(str)
		splashTextSave += str
	}

	const getDeviceInfo = async () => {
		let titleArray = title.split("/");
		titleArray.forEach((title) => {
			splashText.push(title);
		})
		artists.forEach( (artist) => {
			splashText.push(artist);
		})
		orgs.forEach((org) => {
			splashText.push(org)
		})
        let res = await axios.get('https://api.ipify.org?format=json')
        let ip = res.data.ip
        let ip_str = strFmt(ip, 'IPV4: ')
        splashText.push(ip_str)
        splashTextSave += 'IPV4: xxx.xxx.xxx.xxx '
        let ip_api = 'https://ipinfo.io/'+ip+'/?token=5119af49b37a8d'
        let res2 = await axios.get(ip_api)
        let geo = res2.data
        console.log('geo', geo)
        addText(strFmt(geo.city,'',',')+strFmt(geo.region)+strFmt(geo.org))
        splashText.push(strFmt(geo.loc))
        splashTextSave += 'xx.xxx, xx.xxx '
        cl_store.$patch({'latLng': String(geo.loc)})
        let device
        if (uap.device.type === 'mobile'){
            device = 'mobile'
        } else {
            device = 'desktop or laptop'
        }
        addText(strFmt(device))
        addText(strFmt(uap.os.name)+strFmt(uap.os.version, 'VERSION: '))
        addText(strFmt(uap.cpu.architecture, 'CPU: '))
        addText(strFmt(window.navigator.hardwareConcurrency, 'CORES: '))
        addText(strFmt(uap.browser.name)+strFmt(uap.browser.version, 'VERSION: '))
        addText(strFmt(uap.engine.name, '(ENGINE: ')+strFmt(uap.engine.version, 'VERSION: ', ')'))
        addText(strFmt(uap.ua))
        addText('LANGUAGES ')
        window.navigator.languages.forEach((language) => {
            addText(strFmt(language))
        })
        addText(strFmt(new Date()))

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
          addText(strFmt(videoinput, 'VIDEO INPUT(S): '))
          addText(strFmt(audioinput, 'AUDIO INPUT(S): '))

          cl_store.$patch({'location': geo.country, 'device': device, 'platformVersion': uap.engine.version, 'sessionStart': Date.now()})
          console.log(splashTextSave)
          let payload = {info: splashTextSave}
		  await axios.post(api_base+'items/browser_info', payload)
        }
    }

		
	const processText = async (arr, index) => {
		if (index < arr.length - 1) {
			let delay = 400;
			if(index == 0){
				delay = 1200
			}
			else if(index > 0 && index < 8){
				delay = Math.floor(Math.random() * (1200 - 500 + 1)) + 500;
			}
			else if(index > 8 && index < 12){
				delay = Math.floor(Math.random() * (1200 - 500 + 1)) + 500;
			}else if(index > 12 && index < 20){
				delay = Math.floor(Math.random() * (750 - 500 + 1)) + 500;
			}else{
				delay = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
			}
			// console.log(arr[index])
			if (index == 0){
				info_text.value = arr[index];
			}else{
				info_text.value += arr[index];
			}
			
			info_index.value = index;
			setTimeout(function () {
				processText(arr, index + 1);
			}, delay);
		}
		if(index == arr.length - 1){
			setTimeout(function () {
				// state.splashComplete = true
				data_complete.value = true
			}, 1000);
		}
	}

	const showDeviceInfo = async () => {
		await getDeviceInfo()	
		console.log(splashText)
		let str = splashText.join(' ');
		state.$patch({browserInfo: str})
		console.log(splashText)
		if (route.fullPath === '/'){
			await processText(splashText, 0)
		} else {
			state.splashComplete = true
			state.interfaceVisible = true
		}
	}

	const skipIntro = async () => {
		state.splashComplete = true
		state.interfaceVisible = true
		document.getElementById('skip-to-main').focus()
	}
	
	showDeviceInfo()


</script>

<style scoped>

  .bg_content_wrapper {
    width: 100vw;
    height:100vh;
    position: fixed;
    background-color: DarkMagenta;
    color: black;
    font-size: 60px;
		font-family: monospace;
		top: 0px;
  }

  .flash{
	opacity: 0;
	animation-name: flash;
	animation-duration: .9s;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
	}

  @keyframes flash {
	0%, 59.99%{
		opacity: 0;
	}
	60%, 100%{
		opacity: 1;
	}
	
  }

</style>