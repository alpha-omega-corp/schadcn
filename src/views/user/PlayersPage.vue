<script lang="ts" setup>
import {apiDelete, apiGet, apiPost, apiPut, image} from "@/http.ts";
import type {AxiosResponse} from "axios";
import {Player, PlayerSchema} from "@/models/player.ts";
import {ActionEnum} from "@/enums/action";
import CardComponent from "@/components/app/CardComponent.vue";
import PlayersTable from "@/views/user/PlayersTable.vue";
import ModalComponent from "@/components/app/ModalComponent.vue";
import PlayerForm from "@/views/user/PlayerForm.vue";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useNotificationStore} from "@/stores/notificationStore";
import {NotificationType} from "@/enums/notification";
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import {Badge} from "@/components/ui/badge";

const players = ref<Player[]>([])
const notifications = useNotificationStore()
const i18n = useI18n();

function getPlayers() {
  apiGet<{ items: Player[] }>(`/players`).then((res: AxiosResponse<{ items: Player[] }>) => {
    players.value = res.data.items;
  })
}

const createPlayer = (data: Player) => {
  apiPost<Player>(`/player`, data, true).then((res: AxiosResponse<Player>) => {
    console.log(res.data);
  })
}

const updatePlayer = (data: Player) => {
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
      <PlayersTable :data="players">

        <template v-slot:number="{player}">
          <Badge>{{ player.number }}</Badge>
        </template>

        <template v-slot:name="{player}">
          {{ player.firstName }} {{ player.lastName }}
        </template>

        <template v-slot:avatar="{player}">
          <Avatar>
            <AvatarImage :alt="player.name" :src="image(player.avatar)"/>
            <AvatarFallback class="rounded-lg">
              <img :src="`https://robohash.org/${player.firstName}`" alt="">
            </AvatarFallback>
          </Avatar>
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
              <PlayerForm :data="player"/>
            </ModalComponent>

            <!-- Delete -->
            <ModalComponent
                :action="ActionEnum.DELETE"
                :payload="player"
                :title="$t('player.value')"
                @submit="deletePlayer"
            >
              {{ player.firstName }} {{ player.lastName }}
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
        <PlayerForm/>
      </ModalComponent>
    </template>
  </CardComponent>
</template>
