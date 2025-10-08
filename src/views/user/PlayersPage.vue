<script lang="ts" setup>
import {apiGet, apiPost} from "@/http.ts";
import type {AxiosResponse} from "axios";
import {Player, PlayerSchema} from "@/models/player.ts";
import {ActionEnum} from "@/enums/action";
import CardComponent from "@/components/app/CardComponent.vue";
import PlayersTable from "@/views/user/PlayersTable.vue";
import ModalComponent from "@/components/app/ModalComponent.vue";
import {DataSelect} from "@/models/app/data";
import {ref} from "vue";
import PlayerForm from "@/views/user/PlayerForm.vue";

const positions = ref<DataSelect[]>([])
const getPositions = () => {
  apiGet<{ items: DataSelect[] }>(`/positions`).then((res: AxiosResponse<{ items: DataSelect[] }>) => {
    positions.value = res.data.items
    console.log(positions.value);
  })
}

getPositions()

const createPlayer = (data: Player) => {
  console.log(data);
  apiPost<Player>(`/players`, data).then((res: AxiosResponse<Player>) => {
    console.log(res.data);
  })
}

const updatePlayer = (data: Player) => {
  console.log(data);
}

const deletePlayer = (data: Player) => {
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
              <PlayerForm :data="player"/>
            </ModalComponent>

            <!-- Delete -->
            <ModalComponent
                :action="ActionEnum.DELETE"
                :title="$t('player.delete')"
                @submit="deletePlayer"
            >
              {{ player.firstName }} {{ player.lastName }}
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
          <PlayerForm/>
        </ModalComponent>
      </template>
    </CardComponent>
  </div>
</template>
