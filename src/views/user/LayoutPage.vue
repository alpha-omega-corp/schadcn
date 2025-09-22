<script lang="ts" setup>

import {ref} from "vue";
import {Player} from "@/models/player";
import {apiGet} from "@/http";
import type {AxiosResponse} from "axios";


const players = ref<Player[]>([])
apiGet<{ items: Player[] }>(`/players`).then((res: AxiosResponse<{ items: Player[] }>) => {
  players.value = res.data.items;
})

console.log(players.value)


</script>

<template>

</template>