<script lang='ts' setup>
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"

defineProps<{
  title: string
  description: string

}>()
</script>

<template>
  <Card class="w-fit">
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
      <CardDescription>{{ description }}</CardDescription>
    </CardHeader>
    <CardContent>
      <slot name="content"></slot>
    </CardContent>
    <CardFooter class="flex justify-end">
      <slot name="footer"></slot>
    </CardFooter>
  </Card>
</template>