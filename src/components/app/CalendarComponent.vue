<script lang="ts" setup>
import {CalendarDate, DateFormatter, getLocalTimeZone, today} from "@internationalized/date"
import {CalendarIcon} from "lucide-vue-next"
import {toDate} from "reka-ui/date"
import {ref} from "vue"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"

defineProps<{
  label: string,
  name: string
}>()

const df = new DateFormatter("en-US", {
  dateStyle: "long",
})

const placeholder = ref()

</script>
<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem class="flex flex-col">
      <FormLabel>Date of birth</FormLabel>
      <Popover>
        <PopoverTrigger as-child>
          <FormControl>
            <Button
                :class="cn(
                  'w-[240px] ps-3 text-start font-normal',
                  !componentField.modelValue && 'text-muted-foreground',
                )" variant="outline"
            >
              <span>{{
                  componentField.modelValue ? df.format(toDate(componentField.modelValue)) : "Pick a date"
                }}</span>
              <CalendarIcon class="ms-auto h-4 w-4 opacity-50"/>
            </Button>
            <input hidden>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
          <Calendar
              v-model:placeholder="placeholder"
              :max-value="today(getLocalTimeZone())"
              :min-value="new CalendarDate(1900, 1, 1)"
              :model-value="componentField.modelValue"
              calendar-label="Date of birth"
              initial-focus
              @update:model-value="(v) => {
                componentField['onUpdate:modelValue']?.(v)
              }"
          />
        </PopoverContent>
      </Popover>
      <FormDescription>
        Your date of birth is used to calculate your age.
      </FormDescription>
      <FormMessage/>
    </FormItem>
  </FormField>
</template>
