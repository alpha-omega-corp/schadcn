<script lang="ts" setup>

import {getCurrentInstance, h, ref} from "vue";
import type {Player} from "@/models/player";
import {apiGet} from "@/http";
import type {AxiosResponse} from "axios";
import type {ColumnDef} from "@tanstack/vue-table";
import {Checkbox} from "@/components/ui/checkbox";
import PlayerAvatar from "@/views/user/PlayerAvatar.vue";
import PlayerName from "@/views/user/PlayerName.vue";
import TableComponent from "@/components/app/TableComponent.vue";

const instance = getCurrentInstance();
defineSlots<{
  actions: (slotProps: { player: Player }) => any
}>();

const players = ref<Player[]>([])
apiGet<{ items: Player[] }>(`/players`).then((res: AxiosResponse<{ items: Player[] }>) => {
  players.value = res.data.items;
})

const columns: ColumnDef<Player>[] = [
  {
    id: "select",
    header: ({table}) =>
        h(Checkbox, {
          modelValue:
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate"),
          "onUpdate:modelValue": (value: boolean) =>
              table.toggleAllPageRowsSelected(value),
          ariaLabel: "Select all",
        }),
    cell: ({row}) =>
        h(Checkbox, {
          modelValue: row.getIsSelected(),
          "onUpdate:modelValue": (value: boolean) => row.toggleSelected(value),
          ariaLabel: "Select row",
        }),
    enableSorting: false,
    enableHiding: false,
    size: 32,
  },
  {
    header: "Avatar",
    accessorKey: "avatar",
    cell: ({row}) => {
      const player = row.original

      return h('div', {class: 'relative'}, h(PlayerAvatar, {
        player,
      }))
    },
    enableSorting: false,
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({row}) => {
      const player = row.original

      return h('div', {class: 'relative'}, h(PlayerName, {
        player,
      }))
    },
    enableSorting: false,
  },
  {
    header: "Height",
    accessorKey: "height",
    cell: info => String(info.getValue()),
    enableSorting: true,
  },
  {
    header: "Weight",
    accessorKey: "weight",
    cell: info => String(info.getValue()),
    enableSorting: true,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({row}) => {
      const player = row.original;
      const slot = instance?.slots?.actions;

      return h(
          "div", {class: "relative"}, slot({player})
      );
    },
  },
]
</script>

<template>
  <TableComponent
      :columns="columns"
      :data="players"
      placeholder="Search players..."
      total-label="Total players"
  />
</template>
