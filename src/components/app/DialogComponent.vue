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
import {type FunctionalComponent, type HTMLAttributes, type VNodeProps} from "vue";
import {BadgePlusIcon, PencilIcon, PlusIcon} from "lucide-vue-next";

const emit = defineEmits(['submit'])
const props = defineProps<{
  action: ActionEnum
  form?: TypedSchema<T>,
  icon?: FunctionalComponent<HTMLAttributes & VNodeProps> | string
  title: string,
  description?: string,
}>()


const form = useForm({
  validationSchema: props.form,
})

const onSubmit = form.handleSubmit((values) => {
  emit('submit', values)
})

const variant = props.action === ActionEnum.CREATE ? 'primary' : 'destructive'

function getIcon() {
  switch (props.action) {
    case ActionEnum.CREATE:
      return PlusIcon
    case ActionEnum.UPDATE:
      return PencilIcon
    case ActionEnum.DELETE:
      return BadgePlusIcon
    default:
      return props.icon
  }
}


</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="dialog-btn" variant="default">
        <component :is="getIcon()" class="size-4"/>
        <span>{{ action }}</span>
      </Button>
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
button {
  text-transform: capitalize;
}

svg {
  vector-effect: non-scaling-stroke;
  shape-rendering: crispEdges;
}
</style>
