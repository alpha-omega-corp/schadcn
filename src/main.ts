import {createApp} from 'vue'
import './assets/css/main.css'
import App from '@/App.vue'
import {can} from "@/directives/can";
import router from '@/router/index'
import {userKey, userStore} from "@/stores/userStore.ts";
import {createI18n} from "vue-i18n";


const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: {
            message: {
                create_player: 'Create Player',
            },
        },
        fr: {
            message: {
                create_player: 'Nouveau Joueur'
            }
        }
    }
})


createApp(App)
    .directive('can', can)
    .use(router)
    .use(userStore, userKey)
    .use(i18n)
    .mount('#app')
