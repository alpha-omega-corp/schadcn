import {createApp} from 'vue'
import './style.css'
import App from '@/App.vue'
import {can} from "@/directives/can";
import router from '@/router/index'
import {userKey, userStore} from "@/stores/userStore.ts";

createApp(App)
    .directive('can', can)
    .use(router)
    .use(userStore, userKey)
    .mount('#app')
