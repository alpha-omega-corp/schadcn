<script lang="ts" setup>
import {apiPost} from "@/http.ts";
import type {AxiosResponse} from "axios";
import type {Player} from "@/models/player.ts";
import DialogComponent from "@/components/app/DialogComponent.vue";
import {toTypedSchema} from '@vee-validate/zod'
import * as z from 'zod'
import InputComponent from "@/components/app/InputComponent.vue";
import CalendarComponent from "@/components/app/CalendarComponent.vue";
import {DateValue} from "reka-ui";
import {ActionEnum} from "@/enums/action";
import CardComponent from "@/components/app/CardComponent.vue";
import PlayersTable from "@/views/user/PlayersTable.vue";

interface CreatePlayerRequest {
  lastName: string;
  firstName: string;
  birthDate: number;
}


const playerSchema = toTypedSchema<CreatePlayerRequest>(z.object({
  firstName: z.string().min(2).max(20),
  lastName: z.string().min(2).max(20),
  // TODO: why the fuck
  birthDate: z.preprocess((d?: DateValue) => d ? d.toDate().getTime() : 0, z.number())
}))

const createPlayer = (data: CreatePlayerRequest) => {
  console.log(data);
  apiPost<Player>(`/players`, data).then((res: AxiosResponse<CreatePlayerRequest>) => {
    console.log(res.data);
  })
}

</script>

<template>
  <div class="grid auto-rows-min gap-4 md:grid-cols-2">
    <CardComponent
        :description="$t('message.player_description')"
        :title="$t('message.player')"
    >

      <template v-slot:content>
        <PlayersTable/>
      </template>

      <template v-slot:footer>
        <DialogComponent
            :action="ActionEnum.CREATE"
            :form="playerSchema"
            :title="$t('message.create_player')"
            @submit="createPlayer"
        >
          <InputComponent label="First Name" name="firstName"/>
          <InputComponent label="Last Name" name="lastName"/>
          <CalendarComponent label="Birth Date" name="birthDate"/>
        </DialogComponent>
      </template>
    </CardComponent>
  </div>
</template>
