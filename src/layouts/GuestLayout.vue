<script lang="ts" setup>
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {Button} from "@/components/ui/button";

const components: { title: string, href: string, description: string }[] = [
  {
    title: "Alert DialogComponent",
    href: "/docs/components/alert-dialog",
    description:
        "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/components/hover-card",
    description:
        "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/components/progress",
    description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/components/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/components/tabs",
    description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/components/tooltip",
    description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]
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

<style scoped>

</style>