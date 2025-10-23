<script lang="ts" setup>

import {image} from "@/http";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

defineProps<{
  alt: string,
  path?: string
}>()
</script>

<template>
  <Avatar class="size-10">
    <AvatarImage :src="image(path)"/>
    <AvatarFallback class="rounded-lg">
      <img :alt="alt" :src="`https://robohash.org/${alt}`">
    </AvatarFallback>
  </Avatar>
</template>

<style scoped>

</style>