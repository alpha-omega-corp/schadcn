import {createStore, Store, useStore as baseUseStore} from "vuex";
import {InjectionKey} from "vue";
import {toast} from "@/components/ui/toast";
import {NotificationType} from "@/enums/notification";

interface Notification {
    description: string
}

export const notificationKey: InjectionKey<Store> = Symbol()

export const notificationStore: Store = createStore({
    actions: {
        success({commit}, props: Notification): void {
            toast({
                title: NotificationType.SUCCESS,
                description: props.description,
            });
        },
        error({commit}, props: Notification): void {
            toast({
                title: NotificationType.ERROR,
                description: props.description,
                variant: 'destructive',
            });
        }
    },
})

export function useNotificationStore(): Store {
    return baseUseStore(notificationKey)
}