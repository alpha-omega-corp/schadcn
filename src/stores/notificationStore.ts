import {createStore, Store, useStore as baseUseStore} from "vuex";
import {InjectionKey} from "vue";
import {toast} from "@/components/ui/toast";
import {NotificationType} from "@/enums/notification";

interface NotificationState {
    type: NotificationType | null,
}

export const notificationKey: InjectionKey<Store<NotificationState>> = Symbol()

export const notificationStore: Store<NotificationState> = createStore({
    state: {
        type: null
    },
    mutations: {
        update(state: NotificationState, type: NotificationType) {
            state.type = type
        }
    },
    actions: {
        notify({commit}, payload: { type: NotificationType; description: string }): void {
            commit('update', payload.type)

            toast({
                title: payload.type.toString(),
                description: payload.description,
            });
        },
    },
    getters: {
        type(state) {
            return state.type
        }
    }

})

export function useNotificationStore(): Store {
    return baseUseStore(notificationKey)
}