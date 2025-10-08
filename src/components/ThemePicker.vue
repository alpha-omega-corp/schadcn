<script lang="ts" setup>
import {Button} from '@/components/ui/button'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {Check, Palette} from 'lucide-vue-next'
import {computed} from 'vue'

const {theme, setTheme} = useConfigStore()

const themes = [
  {name: 'zinc', label: 'Zinc', color: 'bg-zinc-500'},
  {name: 'slate', label: 'Slate', color: 'bg-slate-500'},
  {name: 'stone', label: 'Stone', color: 'bg-stone-500'},
  {name: 'gray', label: 'Gray', color: 'bg-gray-500'},
  {name: 'neutral', label: 'Neutral', color: 'bg-neutral-500'},
  {name: 'red', label: 'Red', color: 'bg-red-500'},
  {name: 'rose', label: 'Rose', color: 'bg-rose-500'},
  {name: 'orange', label: 'Orange', color: 'bg-orange-500'},
  {name: 'green', label: 'Green', color: 'bg-green-500'},
  {name: 'blue', label: 'Blue', color: 'bg-blue-500'},
  {name: 'yellow', label: 'Yellow', color: 'bg-yellow-500'},
  {name: 'violet', label: 'Violet', color: 'bg-violet-500'},
] as const

const currentTheme = computed(() => themes.find(t => t.name === theme.value))

const handleThemeChange = (themeName: string) => {
  setTheme(themeName as any)
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button class="gap-2" size="sm" variant="outline">
        <Palette class="h-4 w-4"/>
        <span class="hidden sm:inline">Theme</span>
        <span class="sm:hidden">{{ currentTheme?.label }}</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent align="end" class="w-[280px] p-4">
      <div class="space-y-3">
        <div class="space-y-1">
          <h4 class="font-medium text-sm">
            Theme
          </h4>
          <p class="text-xs text-muted-foreground">
            Select a theme for your application
          </p>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <button
              v-for="t in themes"
              :key="t.name"
              :class="[
              theme === t.name
                ? 'border-primary'
                : 'border-muted hover:border-muted-foreground/50'
            ]"
              class="group relative flex flex-col items-center gap-2 rounded-md border-2 p-3 hover:bg-accent transition-colors"
              type="button"
              @click="handleThemeChange(t.name)"
          >
            <div :class="t.color" class="flex h-8 w-8 items-center justify-center rounded-full">
              <Check
                  v-if="theme === t.name"
                  class="h-4 w-4 text-white"
              />
            </div>
            <span class="text-xs font-medium">{{ t.label }}</span>
          </button>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>