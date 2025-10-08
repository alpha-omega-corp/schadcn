<script lang="ts" setup>
import {CalendarDate, DateFormatter, getLocalTimeZone, today} from "@internationalized/date"
import {CalendarIcon} from "lucide-vue-next"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading
} from "@/components/ui/calendar"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {
  CalendarRoot,
  CalendarRootEmits,
  CalendarRootProps,
  DateValue,
  useDateFormatter,
  useForwardPropsEmits
} from "reka-ui"
import {createDecade, createYear, toDate} from "reka-ui/date"
import {computed, ref, watch} from "vue"

const df = new DateFormatter("en-US", {
  dateStyle: "long",
})

const props = withDefaults(defineProps<CalendarRootProps & {
  class?: HTMLAttributes["class"],
  label: string,
  name: string,
  description?: string
}>(), {
  modelValue: undefined,
  placeholder() {
    return today(getLocalTimeZone())
  },
  weekdayFormat: "short",

})

const emits = defineEmits<CalendarRootEmits>()

const delegatedProps = computed(() => {
  const {class: _, placeholder: __, ...delegated} = props

  return delegated
})

// Internal state to hold the DateValue for the calendar
const internalDateValue = ref<DateValue | undefined>(undefined)

const placeholder = ref<DateValue>(today(getLocalTimeZone()))

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const formatter = useDateFormatter("en")

// Ref to hidden input to trigger vee-validate updates programmatically
const hiddenInputEl = ref<HTMLInputElement | null>(null)

// helper to push current timestamp into the form field via input event (keeps pipeline intact)
function syncFormFieldFromInternal() {
  const el = hiddenInputEl.value
  if (!el) return
  const ts = internalDateValue.value ? toDate(internalDateValue.value).getTime() : undefined
  // ensure number type by using type=number and valueAsNumber
  if (typeof ts === 'number') {
    el.valueAsNumber = ts
  } else {
    el.value = ''
  }
  el.dispatchEvent(new Event("input", { bubbles: true }))
}

// Watch for changes to modelValue and convert to DateValue if needed
watch(() => props.modelValue, (newValue) => {
  if (newValue && typeof newValue === 'object' && 'calendar' in newValue) {
    // Create a new reference to trigger reactivity
    internalDateValue.value = new CalendarDate(newValue.year, newValue.month, newValue.day)
    // Update placeholder to show the correct month/year
    placeholder.value = new CalendarDate(newValue.year, newValue.month, newValue.day)
    // push into form field
    syncFormFieldFromInternal()
  } else if (typeof newValue === 'number') {
    const d = new Date(newValue)
    internalDateValue.value = new CalendarDate(d.getFullYear(), d.getMonth() + 1, d.getDate())
    placeholder.value = new CalendarDate(d.getFullYear(), d.getMonth() + 1, d.getDate())
    syncFormFieldFromInternal()
  } else {
    internalDateValue.value = undefined
    syncFormFieldFromInternal()
  }
}, {immediate: true})
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem class="flex flex-col">
      <FormLabel>{{ label }}</FormLabel>
      <Popover>
        <PopoverTrigger as-child>
          <FormControl>
            <Button
                :class="cn(
                  'ps-3 text-start font-normal',
                  !internalDateValue && 'text-muted-foreground',
                )" variant="outline"
            >
              <span>{{
                  internalDateValue ? df.format(toDate(internalDateValue)) : "Pick a date"
                }}</span>
              <CalendarIcon class="ms-auto h-4 w-4 opacity-50"/>
            </Button>
            <input ref="hiddenInputEl" hidden type="number" v-bind="componentField" :value="internalDateValue ? toDate(internalDateValue).getTime() : ''">
          </FormControl>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
          <CalendarRoot
              v-slot="{ date, grid, weekDays }"
              v-model="internalDateValue"
              v-model:placeholder="placeholder"
              :calendar-label="label"
              :class="cn('rounded-md border p-3', props.class)"
              :max-value="today(getLocalTimeZone())"
              :min-value="new CalendarDate(1900, 1, 1)"
              initial-focus
              v-bind="forwarded"
              @update:model-value="(v: DateValue | undefined) => {
                const timestamp = v ? toDate(v).getTime() : undefined
                componentField['onUpdate:modelValue']?.(timestamp)
              }"
          >
            <CalendarHeader>
              <CalendarHeading class="flex w-full items-center justify-between gap-2">
                <Select
                    :default-value="placeholder.month.toString()"
                    @update:model-value="(v) => {
                        if (!v || !placeholder) return;
                        if (Number(v) === placeholder?.month) return;
                        placeholder = placeholder.set({
                          month: Number(v),
                        })
                    }"
                >
                  <SelectTrigger aria-label="Select month" class="w-[60%]">
                    <SelectValue placeholder="Select month"/>
                  </SelectTrigger>
                  <SelectContent class="max-h-[200px]">
                    <SelectItem
                        v-for="month in createYear({ dateObj: date })"
                        :key="month.toString()" :value="month.month.toString()"
                    >
                      {{ formatter.custom(toDate(month), {month: 'long'}) }}
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select
                    :default-value="placeholder.year.toString()"
                    @update:model-value="(v) => {
                      if (!v || !placeholder) return;
                      if (Number(v) === placeholder?.year) return;
                      placeholder = placeholder.set({
                        year: Number(v),
                      })
                    }"
                >
                  <SelectTrigger aria-label="Select year" class="w-[40%]">
                    <SelectValue placeholder="Select year"/>
                  </SelectTrigger>
                  <SelectContent class="max-h-[200px]">
                    <SelectItem
                        v-for="yearValue in createDecade({ dateObj: date, startIndex: -10, endIndex: 10 })"
                        :key="yearValue.toString()" :value="yearValue.year.toString()"
                    >
                      {{ yearValue.year }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </CalendarHeading>
            </CalendarHeader>

            <div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
              <CalendarGrid v-for="month in grid" :key="month.value.toString()">
                <CalendarGridHead>
                  <CalendarGridRow>
                    <CalendarHeadCell
                        v-for="day in weekDays" :key="day"
                    >
                      {{ day }}
                    </CalendarHeadCell>
                  </CalendarGridRow>
                </CalendarGridHead>
                <CalendarGridBody class="grid">
                  <CalendarGridRow v-for="(weekDates, index) in month.rows" :key="`weekDate-${index}`"
                                   class="mt-2 w-full">
                    <CalendarCell
                        v-for="weekDate in weekDates"
                        :key="weekDate.toString()"
                        :date="weekDate"
                    >
                      <CalendarCellTrigger
                          :day="weekDate"
                          :month="month.value"
                      />
                    </CalendarCell>
                  </CalendarGridRow>
                </CalendarGridBody>
              </CalendarGrid>
            </div>
          </CalendarRoot>

        </PopoverContent>
      </Popover>
      <FormDescription>
        {{ description }}
      </FormDescription>
      <FormMessage/>
    </FormItem>
  </FormField>
</template>