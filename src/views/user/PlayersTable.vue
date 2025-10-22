<script lang="ts" setup>

import {getCurrentInstance, h} from "vue";
import type {Player} from "@/models/player";
import type {ColumnDef} from "@tanstack/vue-table";
import TableComponent from "@/components/app/table/TableComponent.vue";
import TableHeader from "@/components/app/table/TableHeader.vue";


const instance = getCurrentInstance();
defineSlots<{
  avatar: (slotProps: { player: Player }) => any,
  actions: (slotProps: { player: Player }) => any,
  number: (slotProps: { player: Player }) => any,
  name: (slotProps: { player: Player }) => any,
}>();

defineProps<{
  data: Player[],
}>()

const columns: ColumnDef<Player>[] = [
  {
    header: "Avatar",
    accessorKey: "avatar",
    cell: ({row}) => {
      const player = row.original
      const slot = instance?.slots?.avatar;

      return h(
          "div", {class: ""}, slot({player})
      );
    },
  },
  {
    accessorKey: "number",
    header: ({column}) => h(TableHeader, {column, title: 'Number', class: 'text-center'}),
    cell: ({row}) => {
      const player = row.original
      const slot = instance?.slots?.number;

      return h(
          "div", {class: "flex justify-center me-4"}, slot({player})
      );
    },
  },
  {
    id: "Name",
    header: ({column}) => h(TableHeader, {column, title: 'Name'}),
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    cell: ({row}) => {
      const player = row.original
      const slot = instance?.slots?.name;

      return h(
          "div", {class: "relative"}, slot({player})
      );
    },
  },
  {
    header: ({column}) => h(TableHeader, {column, title: 'Height'}),
    accessorKey: "height",
    cell: info => String(info.getValue()),
    enableGlobalFilter: false
  },
  {
    header: ({column}) => h(TableHeader, {column, title: 'Weight'}),
    accessorKey: "weight",
    cell: info => String(info.getValue()),
    enableSorting: true,
    enableGlobalFilter: false
  },
  {
    id: "actions",
    header: () => h('div', {class: ''}, 'Actions'),
    enableHiding: false,
    cell: ({row}) => {
      const player = row.original;
      const slot = instance?.slots?.actions;

      return h(
          "div", {class: "relative text-right"}, slot({player})
      );
    },
  },
]
</script>

<template>
  <TableComponent
      :columns="columns"
      :data="data"
      placeholder="Search players..."
      total-label="Total players"
  />
</template>
