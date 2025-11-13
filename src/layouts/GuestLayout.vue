<script lang="ts" setup>
import {
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/app/navigation/AppSidebar.vue";
import {Separator} from "@/components/ui/separator";
import BreadcrumbComponent from "@/components/app/BreadcrumbComponent.vue";
import NavGroup from "@/components/app/navigation/NavGroup.vue";
import {guestRoutes} from "@/router/routes";
import {useRouter} from "vue-router";

const router = useRouter()

function getPath(): string[] {
  let fullPath = router.currentRoute.value.fullPath.split()
  fullPath.unshift('Home')

  console.log(fullPath.length)

  return fullPath.map(item => item.replace(/\//g, ''))
}
</script>

<template>
  <SidebarProvider>
    <AppSidebar>
      <template #header>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton as-child size="lg">
              <a href="#">
                <div
                    class="flex aspect-square size-8 items-center justify-center rounded-lg bg-gray-700 text-sidebar-primary-foreground">
                  <img alt="logo" class="size-fit" src="../assets/images/logo.png"/>
                </div>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold">{{ $t('app.name') }}</span>
                  <span class="truncate text-xs">v 1.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </template>
      <template #content>
        <NavGroup :route-groups="guestRoutes" title="Platform"/>
      </template>
    </AppSidebar>
    <SidebarInset>
      <header
          class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1"/>
          <Separator class="mr-2 h-4" orientation="vertical"/>

          <BreadcrumbComponent :segments="getPath()"/>
        </div>
      </header>

      <div class="flex flex-1 flex-col gap-4 pt-0">
        <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-mi">
          <slot></slot>
        </div>
      </div>

    </SidebarInset>
  </SidebarProvider>
</template>
