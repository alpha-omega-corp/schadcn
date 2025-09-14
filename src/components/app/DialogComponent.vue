<script lang="ts" setup>
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {Button} from "@/components/ui/button";
import {TypedSchema, useForm} from "vee-validate";

const props = defineProps<{
  label: string,
  title: string,
  form?: TypedSchema<T>,
  description?: string,
}>()

const emit = defineEmits<{
  (e: 'submit', payload: SubmitPayload): void
}>()

const form = useForm({
  validationSchema: props.form,
})

const onSubmit = form.handleSubmit((values) => {
  emit('submit', values)
})

</script>

<template>
  <Dialog>
    <DialogTrigger>
      {{ label }}
    </DialogTrigger>
    <DialogContent @open-auto-focus="(e) => e.preventDefault()">
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogDescription>
          {{ description }}
        </DialogDescription>
      </DialogHeader>

      <form v-if="form" @submit="onSubmit">
        <slot></slot>

        <DialogFooter>
          <Button type="submit">
            Submit
          </Button>
        </DialogFooter>
      </form>

      <div v-else>
        Cunt
      </div>


    </DialogContent>
  </Dialog>
</template>

<style scoped>

</style>