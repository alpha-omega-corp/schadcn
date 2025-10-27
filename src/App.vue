<script lang="ts" setup>
import {computed, defineAsyncComponent} from "vue";
import {useRoute} from "vue-router";
import NotificationComponent from "@/components/app/NotificationComponent.vue";

const route = useRoute();

const layouts = {
  GuestLayout: defineAsyncComponent(() => import("@/layouts/GuestLayout.vue")),
  UserLayout: defineAsyncComponent(() => import("@/layouts/UserLayout.vue")),
  AdminLayout: defineAsyncComponent(() => import("@/layouts/AdminLayout.vue")),
} as const;

type LayoutName = keyof typeof layouts;

const layoutComponent = computed(() => {
  const name = (route.meta?.layout as LayoutName) || "GuestLayout";
  return layouts[name] ?? layouts.GuestLayout;
});

</script>

<template>

  <NotificationComponent/>

  <component :is="layoutComponent">
    <router-view/>
  </component>
</template>