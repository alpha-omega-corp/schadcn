<script lang="ts" setup>
import {ref, watch} from 'vue'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Button} from '@/components/ui/button'
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'

const props = defineProps<{
  name: string,
  label?: string,
  description?: string,
  initialUrl?: string,
}>()


const previewUrl = ref<string | undefined>(props.initialUrl)
const lastObjectUrl = ref<string | null>(null)
const inputEl = ref<HTMLInputElement | null>(null)

watch(() => props.initialUrl, (v) => {
  if (v !== undefined) previewUrl.value = v
})

function revokeLastUrl() {
  if (lastObjectUrl.value) {
    URL.revokeObjectURL(lastObjectUrl.value)
    lastObjectUrl.value = null
  }
}

function onFileChange(e: Event, componentField: any) {
  const files = (e.target as HTMLInputElement)?.files
  if (!files || files.length === 0) return
  const file = files[0]

  // Local preview only (no upload)
  revokeLastUrl()
  const localUrl = URL.createObjectURL(file)
  lastObjectUrl.value = localUrl
  previewUrl.value = localUrl

  // Set the form field value to the selected File so the parent can handle upload on submit
  componentField['onUpdate:modelValue']?.(file)

  // Reset input so selecting the same file twice still triggers change
  if (inputEl.value) inputEl.value.value = ''
}
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem class="mb-8 mt-2">
      <FormLabel v-if="label">{{ label }}</FormLabel>
      <div class="flex items-center gap-4">
        <Avatar class="h-16 w-16 rounded-lg overflow-hidden border-gray-300 border-1">
          <AvatarImage v-if="previewUrl" :src="previewUrl" alt="avatar"/>
          <AvatarFallback class="rounded-lg">AV</AvatarFallback>
        </Avatar>

        <div class="flex flex-col gap-2">

          <FormControl>
            <div class="flex items-center gap-2">
              <input
                  ref="inputEl"
                  accept="image/*"
                  class="hidden"
                  type="file"
                  @change="(e) => onFileChange(e, componentField)"
              />
              <Button type="button" variant="secondary" @click="() => inputEl?.click()">
                Choose image
              </Button>
              <Button v-if="previewUrl" type="button" variant="ghost"
                      @click="() => { revokeLastUrl(); previewUrl = undefined; componentField['onUpdate:modelValue']?.(undefined) }">
                Remove
              </Button>
            </div>
          </FormControl>
          <p v-if="description" class="text-sm text-muted-foreground">{{ description }}</p>
          <FormMessage/>
        </div>
      </div>
    </FormItem>
  </FormField>
</template>
