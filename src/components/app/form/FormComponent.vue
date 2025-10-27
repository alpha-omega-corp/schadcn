<script lang="ts" setup>
import {TypedSchema, useForm} from "vee-validate";

const emit = defineEmits(['submit'])
const props = defineProps<{
  schema: TypedSchema<T>
}>()

const form = useForm({
  validationSchema: props.schema,
})

const onSubmit = form.handleSubmit((values) => {
  emit('submit', values)
})

</script>

<template>
  <form @submit.prevent="onSubmit" novalidate>
    <slot name="form"></slot>

    <slot name="submit"></slot>
  </form>
</template>

<style scoped>

</style>