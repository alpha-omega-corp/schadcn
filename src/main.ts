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
            player: {
                schema: {
                    first_name: 'First Name',
                    last_name: 'Last Name',
                    birth_date: 'Birth Date',
                    weight: 'Weight',
                    height: 'Height',
                    number: 'Number',
                    gender: 'Gender',
                    position: 'Position',
                },
            },
        },
    }
})


createApp(App)
    .directive('can', can)
    .use(router)
    .use(userStore, userKey)
    .use(i18n)
    .mount('#app')
