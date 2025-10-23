<script lang="ts" setup>
import {apiDelete, apiGet, apiPost, apiPut, formatDate} from "@/http.ts";
import type {AxiosResponse} from "axios";
import {Player, PlayerSchema} from "@/models/player.ts";
import {ActionEnum} from "@/enums/action";
import CardComponent from "@/components/app/CardComponent.vue";
import PlayersTable from "@/views/user/PlayersTable.vue";
import ModalComponent from "@/components/app/ModalComponent.vue";
import PlayerForm from "@/views/user/PlayerForm.vue";
import {useNotificationStore} from "@/stores/notificationStore";
import {NotificationType} from "@/enums/notification";
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import {Badge} from "@/components/ui/badge";
import AvatarComponent from "@/components/app/AvatarComponent.vue";
import ItemComponent from "@/components/app/ItemComponent.vue";
import {DataSelect} from "@/models/app/data";
import TableFilter from "@/components/app/table/TableFilter.vue";

const notifications = useNotificationStore()
const i18n = useI18n();

const players = ref<Player[]>([])
const positions = ref<DataSelect[]>([])

apiGet<{ items: DataSelect[] }>(`/positions`).then((res: AxiosResponse<{ items: DataSelect[] }>) => {
  positions.value = res.data.items
})

function getPlayers() {
  apiGet<{ items: Player[] }>(`/players`).then((res: AxiosResponse<{ items: Player[] }>) => {
    players.value = res.data.items;
    console.log(players.value);
  })
}

const createPlayer = (data: Player) => {
  apiPost<Player>(`/player`, data, true).then((res: AxiosResponse<Player>) => {
    console.log(res.data);
  })
}

const updatePlayer = (data: Player) => {
  console.log(data);
  apiPut<Player>(`/player/${data.id}`, data, true).then((res: AxiosResponse<Player>) => {
    notifications.dispatch(NotificationType.SUCCESS, {
      description: i18n.t('action.update', [`${data.firstName} ${data.lastName}`])
    })

    getPlayers()
  }).catch((err: any) => {
    notifications.dispatch(NotificationType.ERROR, {
      description: err
    })
  })
}

const deletePlayer = (data: Player) => {
  apiDelete(`player/${data.id}`).then(() => {
    notifications.dispatch(NotificationType.SUCCESS, {
      description: i18n.t('action.delete', [`${data.firstName} ${data.lastName}`])
    })

    getPlayers()
  }).catch((err: any) => {
    notifications.dispatch(NotificationType.ERROR, {
      description: err
    })
  })
}

getPlayers()

</script>

<template>
  <CardComponent
      :description="$t('player.table.description')"
      :title="$t('player.table.title')"
  >
    <template v-slot:content>
      <PlayersTable :data="players" :positions="positions">

        <template v-slot:filters="{table}">
          <TableFilter
              :column="table.getColumn('positions')"
              :options="positions"
              title="Positions"
          />
        </template>

        <template v-slot:number="{player}">
          <Badge variant="secondary">{{ player.number }}</Badge>
        </template>

        <template v-slot:name="{player}">
          {{ player.firstName }} {{ player.lastName }}
        </template>

        <template v-slot:positions="{player}">
          <Badge variant="secondary">{{ player.positions[0].name }}</Badge>
        </template>

        <template v-slot:avatar="{player}">
          <AvatarComponent :alt="player.firstName" :path="player.avatar"/>
        </template>

        <template v-slot:actions="{player}">
          <!-- Update -->
          <div class="flex gap-2">
            <ModalComponent
                :action="ActionEnum.UPDATE"
                :form="PlayerSchema"
                :title="$t('player.value')"
                @submit="updatePlayer"
            >
              <PlayerForm :data="player" :positions="positions"/>
            </ModalComponent>

            <!-- Delete -->
            <ModalComponent
                :action="ActionEnum.DELETE"
                :description="$t('action.delete_confirm')"
                :payload="player"
                :title="$t('player.value')"
                @submit="deletePlayer"
            >
              <ItemComponent
                  :description="`Player created ${formatDate(player.createdAt)}`"
                  :title="`${player.firstName} ${player.lastName}`"
              >
                <AvatarComponent :alt="player.firstName" :path="player.avatar" size="64"/>
              </ItemComponent>
            </ModalComponent>
          </div>
        </template>
      </PlayersTable>
    </template>

    <template v-slot:footer>
      <!-- Create -->
      <ModalComponent
          :action="ActionEnum.CREATE"
          :form="PlayerSchema"
          :title="$t('player.value')"
          @submit="createPlayer"
      >
        <PlayerForm :positions="positions"/>
      </ModalComponent>
    </template>
  </CardComponent>
</template>
