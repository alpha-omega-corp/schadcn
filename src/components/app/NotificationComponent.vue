<script lang="ts" setup>
import {CheckCheckIcon, ShieldAlertIcon} from 'lucide-vue-next';
import {useNotificationStore} from "@/stores/notificationStore";
import {computed, isVNode} from "vue";
import {NotificationType} from "@/enums/notification";
import {cn} from "@/lib/utils";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  useToast
} from "@/components/ui/toast"

const {toasts} = useToast()
const notificationStore = useNotificationStore()
const type = computed<NotificationType | undefined>(() => notificationStore.state.type)

const icon = computed(() => {
  switch (type.value) {
    case NotificationType.SUCCESS:
      return CheckCheckIcon
    case NotificationType.ERROR:
      return ShieldAlertIcon
    default:
      return CheckCheckIcon
  }
})

</script>

<template>
  <ToastProvider>
    <Toast v-for="toast in toasts" :key="toast.id" :class="cn('border-destructive p-0')" v-bind="toast">
      <div class="flex items-center gap-4">
        <div class="p-3 border-r bg-destructive">
          <div class="p-2">
            <component :is="icon"
                       :class="cn('size-6 text-white')"/>
          </div>
        </div>

        <div class="grid gap-1">
          <ToastTitle v-if="toast.title" class="capitalize text-destructive">
            {{ toast.title }}
          </ToastTitle>
          <template v-if="toast.description">
            <ToastDescription v-if="isVNode(toast.description)">
              <component :is="toast.description"/>
            </ToastDescription>
            <ToastDescription v-else>
              {{ toast.description }}
            </ToastDescription>
          </template>
          <ToastClose class="text-destructive"/>
        </div>
      </div>
      <component :is="toast.action"/>
    </Toast>
    <ToastViewport/>
  </ToastProvider>

</template>