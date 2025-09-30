<script lang="ts" setup>
import {apiPost} from "@/http.ts";
import type {AxiosResponse} from "axios";
import {Player, PlayerSchema} from "@/models/player.ts";
import InputComponent from "@/components/app/InputComponent.vue";
import CalendarComponent from "@/components/app/CalendarComponent.vue";
import {ActionEnum} from "@/enums/action";
import CardComponent from "@/components/app/CardComponent.vue";
import PlayersTable from "@/views/user/PlayersTable.vue";
import ModalComponent from "@/components/app/ModalComponent.vue";
import {CalendarDate} from "@internationalized/date";

const createPlayer = (data: Player) => {
  console.log(data);
  apiPost<Player>(`/players`, data).then((res: AxiosResponse<Player>) => {
    console.log(res.data);
  })
}

const updatePlayer = (data: Player) => {
  console.log(data);
}
</script>

<template>
  <div class="grid auto-rows-min gap-4 md:grid-cols-2">
    <CardComponent
        :description="$t('message.player_description')"
        :title="$t('message.player')"
    >
      <template v-slot:content>
        <PlayersTable>
          <template v-slot:actions="{player}">
            <!-- Update -->
            <ModalComponent
                :action="ActionEnum.UPDATE"
                :form="PlayerSchema"
                :title="$t('player.update')"
                @submit="updatePlayer"
            >
              <InputComponent
                  :label="$t('player.first_name')"
                  :model-value="player.firstName"
                  name="firstName"
              />

              <InputComponent
                  :label="$t('player.last_name')"
                  :model-value="player.lastName"
                  name="lastName"
              />

              <CalendarComponent
                  :label="$t('player.birth_date')"
                  :model-value="player.birthDate ? (() => { const d = new Date(player.birthDate); return new CalendarDate(d.getFullYear(), d.getMonth() + 1, d.getDate()); })() : undefined"
                  name="birthDate"
              />


            </ModalComponent>
          </template>
        </PlayersTable>
      </template>

      <template v-slot:footer>
        <ModalComponent
            :action="ActionEnum.CREATE"
            :form="PlayerSchema"
            :title="$t('message.create_player')"
            @submit="createPlayer"
        >
          <InputComponent label="First Name" name="firstName"/>
          <InputComponent label="Last Name" name="lastName"/>
          <CalendarComponent label="Birth Date" name="birthDate"/>
        </ModalComponent>
      </template>
    </CardComponent>
  </div>
</template>
