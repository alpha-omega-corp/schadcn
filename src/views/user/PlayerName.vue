<script lang="ts" setup>
import type {Player} from "@/models/player";

defineProps<{
  player: Player
}>()
</script>

<template>
  <div>
    <span>{{ player.firstName }}</span>
    <span class="font-mono text-sm mx-2">{{ player.lastName }}</span>
  </div>
</template>