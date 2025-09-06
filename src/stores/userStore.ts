import {createStore, Store, useStore as baseUseStore} from 'vuex'
import {apiGet} from "@/http";

import type {InjectionKey} from 'vue'
import type {AxiosResponse} from "axios";
import type {UserState} from "@/models/app/user";

export const userKey: InjectionKey<Store<UserState>> = Symbol()

export const userStore: Store<UserState> = createStore<UserState>({
    state: {
        token: sessionStorage.getItem('token'),
        user: null,
    },
    mutations: {
        login(state: UserState, res: UserState): void {
            state.token = res.token
            state.user = res.user

            if (res.user) {
                apiGet<{ matrix: object }>(`/users/${res.user.id}/permissions`)
                    .then((permRes: AxiosResponse<{ matrix: object }>) => {
                        createSession(res, permRes.data.matrix)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        },
        logout(state: UserState): void {
            deleteSession(state)
        },
    },
    getters: {
        current(state: UserState) {
            return state.user
        }
    }
})

export const createSession = (state: UserState, permMatrix: object): void => {
    if (state.token) {
        let d: Date = new Date();
        d.setTime((d.getTime() + 1) * 24 * 60 * 60 * 1000);
        let expires: string = "expires=" + d.toUTCString();

        document.cookie = "ALPHOMEGA=" + state.token + ";" + expires + ";path=/" + ";SameSite=None;Secure";
        sessionStorage.setItem('user', JSON.stringify(state.user))
        sessionStorage.setItem('permissions', JSON.stringify(permMatrix))
        sessionStorage.setItem('token', state.token)
    }
}

const deleteSession = (state: UserState): void => {
    state.token = null
    document.cookie = encodeURIComponent('JWT-TOKEN') +
        "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
        ";SameSite=None;secure"
    sessionStorage.clear()
}

export function useUserStore(): Store<UserState> {
    return baseUseStore(userKey)
}
