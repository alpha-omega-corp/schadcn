<script lang="ts" setup>

import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

defineProps<{
  segments: string[]
}>()
</script>

<template>
  <BreadcrumbList>
    <BreadcrumbItem class="md:block">
      <BreadcrumbLink href="#">
        {{ segments[0] }}
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator class="md:block"/>
    <BreadcrumbItem class="capitalize">
      <template v-for="(segment, index) in segments" :key="index">
        <BreadcrumbPage v-if="index > 0"> {{ segment }}</BreadcrumbPage>
      </template>
    </BreadcrumbItem>
  </BreadcrumbList>
</template>
