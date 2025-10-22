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
import {ActionEnum} from "@/enums/action";
import {type FunctionalComponent, type HTMLAttributes, ref, type VNodeProps} from "vue";
import {PencilIcon, PlusIcon, Trash2Icon} from "lucide-vue-next";
import {cn} from "@/lib/utils";

const variant = ref()
const open = ref(false)

const emit = defineEmits(['submit'])
const props = defineProps<{
  action: ActionEnum,
  form?: TypedSchema<T>,
  icon?: FunctionalComponent<HTMLAttributes & VNodeProps> | string
  title: string,
  description?: string,
  payload?: unknown,
}>()

const form = useForm({
  validationSchema: props.form,
})

const onSubmit = form.handleSubmit((values) => {
  open.value = false
  emit('submit', values)
})

function confirm() {
  open.value = false
  emit('submit', props.payload)
}

function getIcon() {
  switch (props.action) {
    case ActionEnum.CREATE:
      return PlusIcon
    case ActionEnum.UPDATE:
      variant.value = 'outline'
      return PencilIcon
    case ActionEnum.DELETE:
      variant.value = 'outline'
      return Trash2Icon
    default:
      return props.icon
  }
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button :variant="variant" class="dialog-btn">
        <component :is="getIcon()" :class="cn('size-4', action === ActionEnum.DELETE && 'text-destructive')"/>
        <span v-if="action !== ActionEnum.DELETE">{{ action }}</span>
      </Button>
    </DialogTrigger>

    <DialogContent @open-auto-focus="(e) => e.preventDefault()">
      <DialogHeader>
        <DialogTitle class="flex gap-1">
          <span class="capitalize">{{ action }}</span>
          <span>{{ title }}</span>
        </DialogTitle>
        <DialogDescription>
          {{ description }}
        </DialogDescription>
      </DialogHeader>

      <div v-if="payload">
        <slot></slot>
        <DialogFooter>
          <Button variant="destructive" @click="confirm">Delete</Button>
        </DialogFooter>
      </div>

      <form v-else @submit="onSubmit">
        <slot></slot>

        <DialogFooter>
          <Button type="submit">
            Submit
          </Button>
        </DialogFooter>
      </form>


    </DialogContent>
  </Dialog>
</template>

<style scoped>
button {
  text-transform: capitalize;
}

svg {
  vector-effect: non-scaling-stroke;
  shape-rendering: crispEdges;
}
</style>
