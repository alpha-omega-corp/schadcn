<script lang="ts" setup>
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {Button} from "@/components/ui/button";
</script>

<template>
  <div class="flex justify-between items-center p-4 border-b-1 border-slate-200">
    <div class="flex w-full justify-between">
      <NavigationMenu class="flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink :class="navigationMenuTriggerStyle()" href="/docs/introduction">
              Documentation
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div class="flex gap-4" style="max-width: 300px">
        <router-link to="/login">
          <Button variant="outline">
            Login
          </Button>
        </router-link>

        <Button variant="default">
          Get Started
        </Button>
      </div>
    </div>
  </div>

  <slot></slot>
</template>
