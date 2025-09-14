import {createStore, Store, useStore as baseUseStore} from 'vuex'
import {apiGet} from "@/http";
import type {InjectionKey} from 'vue'
import type {AxiosResponse} from "axios";
import type {User} from "@/models/app/user";

interface UserState {
    user: User | null
    permissions: object
}

export const userKey: InjectionKey<Store<UserState>> = Symbol()

export const userStore: Store<UserState> = createStore<UserState>({
    state: {
        user: JSON.parse(sessionStorage.getItem('user'))
    },
    mutations: {
        login(state: UserState, user: User): void {
            state.user = user
            console.log(user)

            if (user) {
                apiGet<{ matrix: object }>(`/user/${user.id}/permissions`)
                    .then((res: AxiosResponse<{ matrix: object }>) => {
                        createSession(user)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        },
        logout(state: UserState): void {
            sessionStorage.clear()
        },
    },
    getters: {
        current(state: UserState) {
            return state.user
        }
    }
})

export const createSession = (user: User): void => {
    sessionStorage.setItem('user', JSON.stringify(user))
}

export function useUserStore(): Store<UserState> {
    return baseUseStore(userKey)
}
