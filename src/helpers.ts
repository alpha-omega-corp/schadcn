import {useI18n} from 'vue-i18n'
import {NotificationType} from '@/enums/notification'
import {useNotificationStore} from '@/stores/notificationStore'

let _instance: {
    error: (key: string, data?: unknown[]) => Promise<unknown> | void;
    success: (key: string, data?: unknown[]) => Promise<unknown> | void;
} | null = null

function useNotify() {
    // TODO: Singleton?
    if (_instance) return _instance

    const notificationStore = useNotificationStore()
    const {t} = useI18n({useScope: 'global'})

    function success(key: string, data?: unknown[]) {
        return notificationStore.dispatch('notify', {
            type: NotificationType.SUCCESS,
            description: t(key, data as any)
        })
    }

    function error(key: string, data?: unknown[]) {
        return notificationStore.dispatch('notify', {
            type: NotificationType.ERROR,
            description: t(key, data as any)
        })
    }

    _instance = {success, error}
    return _instance
}

export {useNotify}