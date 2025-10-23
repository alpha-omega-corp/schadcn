import {createApp} from 'vue'
import './assets/css/main.css'
import App from '@/App.vue'
import {can} from "@/directives/can";
import router from '@/router/index'
import {userKey, userStore} from "@/stores/userStore.ts";
import {createI18n} from "vue-i18n";
import {notificationKey, notificationStore} from "@/stores/notificationStore";


const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',

    messages: {
        en: {
            action: {
                delete_confirm: 'You are about to permanently remove the data from our servers.',
                delete: 'Deleted {0}',
            },
            player: {
                value: 'Player',
                table: {
                    title: 'Players Table',
                    description: "Manage players in the team"
                },
                schema: {
                    first_name: 'First Name',
                    last_name: 'Last Name',
                    birth_date: 'Birth Date',
                    weight: 'Weight',
                    height: 'Height',
                    number: 'Number',
                    gender: 'Gender',
                    position: 'Position',
                    avatar: 'Avatar',
                },

            },
        },
    }
})


createApp(App)
    .directive('can', can)
    .use(router)
    .use(userStore, userKey)
    .use(notificationStore, notificationKey)
    .use(i18n)
    .mount('#app')
