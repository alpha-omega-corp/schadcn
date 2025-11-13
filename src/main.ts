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
            app: {
                name: 'EasyIDP',
                login: 'Login',
                login_title: 'Platform Access',
                login_trainer: 'Login with your email and password',
                login_player: 'Login with your access token',
                login_token_fail: 'Unable to login. Please check with your trainer.',
                signup: 'Sign Up',
                signup_title: 'Create Account',
                trainer: 'Trainer',
                player: 'Player',
                email: 'Email',
                password: 'Password',
                password_confirm: 'Confirm Password',
                password_forgot: 'Forgot Password?',

                player_token: 'Player Token',
                no_account: 'Don\'t have an account?',
                have_account: 'Already have an account?',
                register: 'Sign up',
                login_fail: 'Unable to login. Please check your credentials.',
            },
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
