<script lang="ts" setup>
import type {Player} from "@/models/player";
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'

defineProps<{
  player: Player
}>()
</script>

<template>
  <Avatar>
    <AvatarImage v-if="player.avatar" :alt="player.name" :src="player.avatar"/>

    <AvatarFallback v-else class="rounded-lg">
      PL
    </AvatarFallback>
  </Avatar>
</template>