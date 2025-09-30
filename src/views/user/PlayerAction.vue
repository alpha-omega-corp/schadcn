<script lang="ts" setup>

import {Player} from "@/models/player.ts";
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
      <DropdownMenuLabel class="font-bold">Actions</DropdownMenuLabel>
      <DropdownMenuSeparator/>
      <DropdownMenuItem @click="update(player)">

      </DropdownMenuItem>
      <DropdownMenuItem @click="delete(player)">
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>