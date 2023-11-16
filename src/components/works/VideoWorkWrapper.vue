<template>
	<VideoComponent v-if="videos.length" :video_file="videos[0]"></VideoComponent>
</template>
<script setup>
	import VideoComponent from './VideoComponent.vue'
	import { defineProps, computed } from 'vue';
	import { useStateStore } from '../../stores/state'
	const state = useStateStore()

	const props = defineProps(['work'])

	const videos = computed(() => {
    let filter_work = state.worksInfo.filter((work_obj) => work_obj.slug == props.work)
    if (filter_work.length === 1 && filter_work[0].videos.length > 0){
        return filter_work[0].videos.map((video_info) => video_info.directus_files_id.filename_disk)
    } else {
        return []
    }
})
</script>