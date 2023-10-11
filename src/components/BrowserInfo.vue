<template>
	<div class="loadingScreen fixed w-screen h-screen bg-offBlack text-white z-50 text-3xl p-5 font-DMregular leading-tight">
		{{info_text}} <span class=" text-black w-20 bg-white inline-block translate-y-1 h-7">{{ info_index }}</span>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import axios from 'axios';
	import { UAParser } from 'ua-parser-js';
	import { useStateStore } from '../stores/state'
	import { useClStore } from '../stores/CrossLucid'

	const state = useStateStore()
	const cl_store = useClStore()


	console.log('navigator',window.navigator)
	const uap = UAParser(navigator.userAgent);
	console.log('uap', uap)

	const info_text = ref('')
	const info_index = ref('')
	let splashText = []
	let title = ' /FOR /DATA /YOU /ARE, /AND /TO /DATA /YOU /SHALL /RETURN  /对于你所/是的数据, /对于你应该/返回的数据 '

	const strFmt = (str, pre='', post='') => {
		return pre.toUpperCase()+String(str).toUpperCase()+post.toUpperCase()+' '
	}

	const getDeviceInfo = async () => {
		let titleArray = title.split("/");
		for (let i = 0; i < titleArray.length; i++) {
			splashText.push(titleArray[i]);
		}
        let res = await axios.get('https://api.ipify.org?format=json')
        let ip = res.data.ip
        let ip_str = strFmt(ip, 'IPV4: ')
        splashText.push(ip_str)
        let ip_api = 'https://ipinfo.io/'+ip+'/?token=5119af49b37a8d'
        let res2 = await axios.get(ip_api)
        let geo = res2.data
        console.log('geo', geo)
        splashText.push(strFmt(geo.city,'',',')+strFmt(geo.region)+strFmt(geo.org))
        splashText.push(strFmt(geo.loc))
        let device
        if (uap.device.type === 'mobile'){
            device = 'mobile'
        } else {
            device = 'desktop or laptop'
        }
        splashText.push(strFmt(device))
        splashText.push(strFmt(uap.os.name)+strFmt(uap.os.version, 'VERSION: '))
        splashText.push(strFmt(uap.cpu.architecture, 'CPU: '))
        splashText.push(strFmt(window.navigator.hardwareConcurrency, 'CORES: '))
        splashText.push(strFmt(uap.browser.name)+strFmt(uap.browser.version, 'VERSION: '))
        splashText.push(strFmt(uap.engine.name, '(ENGINE: ')+strFmt(uap.engine.version, 'VERSION: ', ')'))
        splashText.push(strFmt(uap.ua))
        splashText.push('LANGUAGES ')
        window.navigator.languages.forEach((language) => {
            splashText.push(strFmt(language))
        })
        splashText.push(strFmt(new Date()))

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
          splashText.push(strFmt(videoinput, 'VIDEO INPUT(S): '))
          splashText.push(strFmt(audioinput, 'AUDIO INPUT(S): '))

          cl_store.$patch({'location': geo.country, 'device': device, 'platformVersion': uap.os.version, 'sessionStart': Date.now()})
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
			console.log(arr[index])
			info_text.value += arr[index];
			info_index.value = index;
			setTimeout(function () {
				processText(arr, index + 1);
			}, delay);
		}
		if(index == arr.length - 1){
			setTimeout(function () {
				state.splashComplete = true
			}, 1000);
		}
	}

	const showDeviceInfo = async () => {
		await getDeviceInfo()	
		console.log(splashText)
		let str = splashText.join(' ');
		state.$patch({browserInfo: str})
		console.log(splashText)
		await processText(splashText, 0)

	}
	
	// onMounted(() => {
	// 	setTimeout(async () => {
	// 		await showDeviceInfo()
	// 	}, 3000);
	// })
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