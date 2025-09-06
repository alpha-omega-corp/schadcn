<script setup lang="ts">
  import {apiGet} from "@/http.ts";
  import type {AxiosResponse} from "axios";
  import { ref } from "vue"
  import type {Player} from "@/models/player.ts";
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
  } from "@/components/ui/table";

  const players = ref<Player[]>();
  apiGet<Player[]>(`/players`).then((res: AxiosResponse<Player[]>) => {
    players.value = res.data['items'];
  })

</script>

<template>
  <Table>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>FirstName</TableHead>
        <TableHead>LastName</TableHead>
        <TableHead>Height</TableHead>
        <TableHead>Weight</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="player in players" :key="player.id">
        <TableCell class="font-medium">
          {{ player.firstName }}
        </TableCell>
        <TableCell>{{ player.lastName }}</TableCell>
        <TableCell>{{ player.height }}</TableCell>
        <TableCell>{{ player.weight }}</TableCell>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell :colspan="3">
          Total
        </TableCell>
        <TableCell class="text-right">
          $2,500.00
        </TableCell>
      </TableRow>
    </TableFooter>
  </Table>
</template>