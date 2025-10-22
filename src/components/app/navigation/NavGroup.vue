<script lang="ts" setup>
import {ChevronRight} from "lucide-vue-next"
import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import type {RouteGroup} from "@/models/app/router.ts";

defineProps<{
  title: string,
  routeGroups: RouteGroup[]
}>()

</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>{{ title }}</SidebarGroupLabel>
    <SidebarMenu>

      <SidebarMenuItem
          v-for="item in routeGroups"
          :key="item.name"
          as-child
      >
        <Collapsible
            v-if="item.routes.length > 1"
            :default-open="item.isActive"
            class="group/collapsible"
        >
          <CollapsibleTrigger as-child>
            <SidebarMenuButton :tooltip="item.name">
              <component :is="item.icon" v-if="item.icon"/>
              <span>{{ item.name }}</span>
              <ChevronRight
                  class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"/>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              <SidebarMenuSubItem v-for="subItem in item.routes" :key="subItem.name">
                <SidebarMenuSubButton v-can="(subItem.service + '.read')" as-child>
                  <router-link
                      :class="['text-gray-700 hover:text-indigo-600 hover:bg-gray-50', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']"
                      :to="subItem.path">
                    <span>{{ subItem.name }}</span>
                  </router-link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>

        <SidebarMenuButton v-else as-child>
          <router-link
              :class="['text-gray-700 hover:text-indigo-600 hover:bg-gray-50', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']"
              :to="item.routes[0].path">
            <component :is="item.icon"/>
            <span>{{ item.name }}</span>
          </router-link>
        </SidebarMenuButton>

      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
