<script lang="ts" setup>

import InputComponent from "@/components/app/InputComponent.vue";
import SelectComponent from "@/components/app/SelectComponent.vue";
import CalendarComponent from "@/components/app/CalendarComponent.vue";
import AvatarPicker from "@/components/app/AvatarPicker.vue";
import {Player} from "@/models/player";
import {ref} from "vue";
import {DataSelect} from "@/models/app/data";
import {apiGet, image} from "@/http";
import type {AxiosResponse} from "axios";
import {CalendarDate} from "@internationalized/date";

const props = defineProps<{
  data?: Player
}>()

const positions = ref<DataSelect[]>([])
const getPositions = () => {
  apiGet<{ items: DataSelect[] }>(`/positions`).then((res: AxiosResponse<{ items: DataSelect[] }>) => {
    positions.value = res.data.items
  })
}

getPositions()
const player = props.data ?? {} as Player
console.log(player.id);


</script>

<template>
  <InputComponent
      :model-value="player.id"
      name="id"
      type="hidden"
  />

  <AvatarPicker
      :initial-url="player.avatar ? image(player.avatar) : `https://robohash.org/${player.firstName}`"
      description="Upload a square image for best results"
      name="avatar"
  />

  <InputComponent
      :label="$t('player.schema.first_name')"
      :model-value="player.firstName"
      name="firstName"
  />

  <InputComponent
      :label="$t('player.schema.last_name')"
      :model-value="player.lastName"
      name="lastName"
  />

  <CalendarComponent
      :label="$t('player.schema.birth_date')"
      :model-value="player.birthDate ? (() => { const d = new Date(player.birthDate); return new CalendarDate(d.getFullYear(), d.getMonth() + 1, d.getDate()); })() : undefined"
      name="birthDate"
  />

  <div class="flex justify-between gap-2">
    <InputComponent
        :label="$t('player.schema.height')"
        :model-value="player.height"
        name="height"
        type="number"
    />

    <InputComponent
        :label="$t('player.schema.weight')"
        :model-value="player.weight"
        name="weight"
        type="number"
    />
  </div>

  <InputComponent
      :label="$t('player.schema.number')"
      :model-value="player.number"
      name="number"
      type="number"
  />

  <SelectComponent
      :data="positions"
      :label="$t('player.schema.position')"
      :model-value="player.positionId"
      name="positionId"
  />
</template>
