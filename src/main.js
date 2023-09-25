import './assets/main.css'
import h337 from 'heatmap.js';
import { fromEvent, map, mergeWith } from 'rxjs';
import axios from 'axios';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.config.globalProperties.window = window
app.use(createPinia())
app.use(router)

app.directive('heatmap', {
    async updated(el, binding, vnode) {

    	const addValue = (e, value) => {
	     	e.value = value;
	     	return e;
	    };

	    const api_base =  import.meta.env.VITE_API_BASE

	    // fill screen with data
	    let start_data = []
	    // Placeholder values
	    for (let i = 0; i <= el.scrollHeight; i += 20) {
	    	// console.log(i)
	    	for (let n = 0; n <= el.scrollWidth; n += 20) {
	    		let new_point = {
	    			'x': n,
	    			'y': i,
	    			'value': 1,
	    		}
	    		start_data.push(new_point)
	    	}
	    }

	    //From latest session in DB
	    let res = await axios.get(api_base+'items/heatmap_sessions?sort=-date_updated&limit=1')
	    // console.log(res)
	    if (res.data.data.length > 0 && res.data.data[0].data.length > 0){
	    	console.log('Using '+ res.data.data[0].id)
	    	start_data = start_data.concat(res.data.data[0].data)
	    }
	    const click_max = 100
	    let data_max = 100
    	const heatmap = h337.create({
	        maxOpacity: 0.5,
	        minOpacity: 0.999999,
	        gradient: {0.1: 'Black', 0.3: 'BlueViolet', 0.6: 'Lime', 0.9: 'Black'},
	        radius: 50,
	        blur: 0.90,
	        backgroundColor: 'rgba(0, 0, 0, 0)',
	        container: binding.value,
		});

		// console.log(start_data)

		heatmap.setData({min:0, max:data_max, data:start_data})

	    const move = fromEvent(el, 'mousemove').pipe(map((value) => {return {x: value.layerX, y: value.layerY, value: 5}}));
        const touch = fromEvent(el, 'touchmove').pipe(map((value) => {return {x: value.layerX, y: value.layerY, value: 5}}));;
        const click = fromEvent(el, 'click').pipe(map((value) => {return {x: value.layerX, y: value.layerY, value: 10}}));

        const all_points = []

        move
		  .pipe(mergeWith(click, touch))
		  .subscribe(new_val => {
		  	// console.log(new_val);
		  	let pos_val = heatmap.getValueAt({'x':new_val.x,'y':new_val.y })
		  	// console.log(pos_val)
		  	if (pos_val <= click_max){
		  		heatmap.addData(new_val);
		  	}
		  	all_points.push(new_val)
		  });

		let session_id = null;
		const all_clicks = []

		click.subscribe(async click => {
			if (data_max > 20){
				data_max -= 5
				
			}
			heatmap.setDataMax(data_max)
			let payload = {data: all_points}
			//send to an API for database storage
			if (session_id === null){
				let res = await axios.post(api_base+'items/heatmap_sessions', payload)
				session_id = res.data.data.id
			} else {
				let res = await axios.patch(api_base+'items/heatmap_sessions/'+session_id, payload)
				console.log(res)
			}
			

		})
		
    }
})

app.mount('#app')
