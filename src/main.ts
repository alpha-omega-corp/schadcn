import { createApp } from 'vue'
import './style.css'
import App from '@/App.vue'
import {can} from "@/directives/can";
import router from '@/router/index'


createApp(App)
    .directive('can', can)
    .use(router)
    .mount('#app')
