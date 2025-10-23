<script lang="ts" setup>

import InputComponent from "@/components/app/form/InputComponent.vue";
import SelectComponent from "@/components/app/form/SelectComponent.vue";
import CalendarComponent from "@/components/app/form/CalendarComponent.vue";
import FileComponent from "@/components/app/form/FileComponent.vue";
import {Player} from "@/models/player";
import {DataSelect} from "@/models/app/data";

const props = defineProps<{
  data?: Player
  positions: DataSelect[]
}>()

const player = props.data ?? {} as Player
console.log(player.positions);


</script>

<template>
  <InputComponent
      :model-value="player.id"
      name="id"
      type="hidden"
  />

  <FileComponent
      :initial-url="player.avatar"
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
      :model-value="player.birthDate"
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
      :model-value="player.positions ? player.positions[0].id : undefined"
      name="positionId"
  />
</template>
