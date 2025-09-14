<script lang="ts" setup>

import type {Player} from "@/models/player.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from 'lucide-vue-next'

defineProps<{
  player: Player
}>()

function copy(player: Player) {
  navigator.clipboard.writeText(JSON.stringify(player))
}

</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button class="w-8 h-8 p-0" variant="ghost">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4"/>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(player)">
        Copy Player
      </DropdownMenuItem>
      <DropdownMenuSeparator/>
      <DropdownMenuItem>View customer</DropdownMenuItem>
      <DropdownMenuItem>View payment details</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>