<template>
	<Transition name="fade">
		<div v-show="show_info_layer">
			<div v-if="!is_paused" @click="pause()"
				class="fixed w-screen h-screen h-fill-available top-0 left-0 z-50 grid place-items-center cursor-pointer" >
				<PauseButton style="width: 78px; height: 78px;"/>
			</div>
			<div v-if="is_paused && can_play" @click="play()" 
				class="fixed w-screen h-screen top-0 left-0 z-50 grid place-items-center cursor-pointer">
				<PlayButton />
			</div>
			<h1 class="fixed z-50 bottom-0 left-0 invisible sm:visible p-2 lg:p-4 text-white text-lg xl:text-2xl font-DMregular">
				<i>{{ work_info.title }}</i>
				<br>{{ work_info.artist }}
			</h1>
			
			<button @click="toggleInfo" 
				class="fixed bottom-0 right-0 p-2 lg:p-4 text-white text-lg xl:text-2xl font-DMregular z-50 hover:text-yellow">
				<span class="sr-only">{{state.getTrans('about-this-artwork')}}</span>
				<span aria-hidden="true">{{state.getTrans('info').toUpperCase()}}</span>
			</button>

			<router-link to="/" class="fixed z-50 top-0 right-0 p-2 lg:p-4 text-white text-lg xl:text-2xl font-DMregular hover:text-yellow">
				<span class="sr-only">{{state.getTrans('back-to-index-page')}}</span>
				<span aria-hidden="true">{{state.getTrans('close').toUpperCase()}}</span>
			</router-link>
		</div>
	</Transition>
	<Transition name="zoom-fade">
		<div v-show="showInfo" class="fixed w-screen h-screen h-fill-available top-0 left-0 overflow-y-auto bg-black-40 backdrop-blur-3xl text-white z-50 text-lg font-DMregular leading-tighter "> 
			<div class="grid-cols-modal lg:grid-cols-modal-xl grid gap-1">
            <div class="modal-body grid grid-cols-2 gap-16 p-2 lg:p-4  max-w-[1200px]">
                <div class="col-span-2">
					<h2 class="pb-8 text-lg xl:text-2xl uppercase">
						<div v-html="work_info.artist"></div>
						<div v-html="work_info.listing"></div>
					</h2>
					<AudioGuide v-if="showInfo" :work="props.work" />
					<div class="text-base xl:text-lg rte" v-html="work_info.description"></div>
                </div>   
            </div>
            <div class="close-button">
				<button ref="closeInfo" @click="toggleInfo" class="sticky p-2 lg:p-4 top-0 text-lg xl:text-2xl text-white text-right block w-full hover:text-yellow">{{state.getTrans('close').toUpperCase()}}</button>
            </div>
        </div>
		</div>
	</Transition>
</template>
<script setup>
	import { ref, computed, inject, watch } from 'vue'
	import { useStateStore } from '../../stores/state'
	import { useClStore } from '../../stores/CrossLucid'
	import AudioGuide from './AudioGuide.vue'
	import PlayButton from '../../components/icons/PlayButton.vue'
	import PauseButton from '../../components/icons/PauseButton.vue'

	const cl_store = useClStore()
	const state = useStateStore()
	const props = defineProps(['work', 'show_info_layer'])
	console.log(props.work)
	const showInfoLayer = ref(true)
	const showInfo = ref(false)
	const closeInfo = ref(null)
	const v_player = inject('player')
	const is_paused = ref(true)
	const can_play = ref(false)

	const work_info = computed(() => {
		const filter_work = state.worksInfoTranslated.filter((work_obj) => work_obj.slug == props.work)
		console.log(filter_work)
		if (filter_work.length != 0) {
			return filter_work[0]
		} else {
			return null
		}
	})

	function toggleInfo(){
		showInfo.value = !showInfo.value
		console.log(showInfo.value)
		closeInfo.value.focus()
		if (showInfo.value){
			cl_store.addText(props.work)
		}
	}

	const play = () => {
		if (v_player.value){
			v_player.value.play()
			is_paused.value = false
		}
	}

	const pause = () => {
		if (v_player.value){
			v_player.value.pause()
			is_paused.value = true
		}
	} 

	watch(v_player, (player_obj)=>{
		if(player_obj){
			console.log('player', player_obj)
			is_paused.value = player_obj.paused
			v_player.value.onpause = () => {
				is_paused.value = true
			}
			v_player.value.onplay = () => {
				is_paused.value = false
			}
			v_player.value.onplaying = () => {
				is_paused.value = false
			}
			v_player.value.oncanplay = () => {
	    		console.log('can_play')
	    		v_player.value.play()
	    		can_play.value = true
	    		setTimeout(() => {
		    		if (v_player.value.paused){
		    			is_paused.value = true
		    		}
		    	}, 500)

	    	}

		}
	})
	
</script>
<style scoped lang="scss">
	
	button:hover{
		color:#B8F33A;
		path{
			fill: #B8F33A!important
		}
	}

</style>