<script lang="ts" setup>

import InputComponent from "@/components/app/InputComponent.vue";
import SelectComponent from "@/components/app/SelectComponent.vue";
import CalendarComponent from "@/components/app/CalendarComponent.vue";
import {Player} from "@/models/player";
import {ref} from "vue";
import {DataSelect} from "@/models/app/data";
import {apiGet} from "@/http";
import type {AxiosResponse} from "axios";
import {CalendarDate} from "@internationalized/date";

defineProps<{
  data?: Player
}>()

const positions = ref<DataSelect[]>([])
const getPositions = () => {
  apiGet<{ items: DataSelect[] }>(`/positions`).then((res: AxiosResponse<{ items: DataSelect[] }>) => {
    positions.value = res.data.items
  })
}

getPositions()

</script>

<template>
  <InputComponent
      :label="$t('player.schema.first_name')"
      :model-value="data.firstName"
      name="firstName"
  />

  <InputComponent
      :label="$t('player.schema.last_name')"
      :model-value="data.lastName"
      name="lastName"
  />

  <CalendarComponent
      :label="$t('player.schema.birth_date')"
      :model-value="data.birthDate ? (() => { const d = new Date(data.birthDate); return new CalendarDate(d.getFullYear(), d.getMonth() + 1, d.getDate()); })() : undefined"
      name="birthDate"
  />

  <div class="flex justify-between gap-2">
    <InputComponent
        :label="$t('player.schema.height')"
        :model-value="data.height"
        name="height"
        type="number"
    />

    <InputComponent
        :label="$t('player.schema.weight')"
        :model-value="data.weight"
        name="weight"
        type="number"
    />
  </div>

  <InputComponent
      :label="$t('player.schema.number')"
      :model-value="data.number"
      name="number"
      type="number"
  />

  <SelectComponent
      :data="positions"
      :label="$t('player.schema.position')"
      :model-value="data.positionId"
      name="positionId"
  />
</template>
