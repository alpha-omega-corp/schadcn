<script lang="ts" setup>
import {Item, ItemContent, ItemDescription, ItemMedia, ItemTitle,} from '@/components/ui/item'

defineProps<{
  title: string,
  description?: string
}>()
</script>

<template>
  <Item variant="outline">
    <ItemMedia>
      <slot></slot>
    </ItemMedia>
    <ItemContent>
      <ItemTitle>{{ title }}</ItemTitle>
      <ItemDescription>{{ description }}</ItemDescription>
    </ItemContent>
  </Item>
</template>