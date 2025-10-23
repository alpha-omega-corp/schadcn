<script lang="ts" setup>

import {getCurrentInstance, h} from "vue";
import type {Player} from "@/models/player";
import type {ColumnDef, Table} from "@tanstack/vue-table";
import TableComponent from "@/components/app/table/TableComponent.vue";
import TableHeader from "@/components/app/table/TableHeader.vue";
import {formatDate} from "@/http";


const instance = getCurrentInstance();
defineSlots<{
  avatar: (slotProps: { player: Player }) => any,
  actions: (slotProps: { player: Player }) => any,
  number: (slotProps: { player: Player }) => any,
  name: (slotProps: { player: Player }) => any,
  positions: (slotProps: { player: Player }) => any,
  filters: (slotProps: { table: Table<Player> }) => any,
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
    id: "positions",
    header: "Positions",
    accessorFn: (row) => row.positions?.map(p => p.name) ?? [],
    filterFn: 'arrIncludesSome',
    cell: ({row}) => {
      const player = row.original
      const slot = instance?.slots?.positions;

      return h(
          "div", {class: "flex justify-center me-4"}, slot({player})
      );
    },
  },
  {
    header: ({column}) => h(TableHeader, {column, title: 'Height'}),
    accessorKey: "height",
    cell: ({row}) => {
      const player = row.original

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'unit',
        unit: 'centimeter',
        unitDisplay: 'short',
      }).format(player.height)

      return h('div', {class: 'font-medium'}, formatted)
    },
    enableGlobalFilter: false
  },
  {
    header: ({column}) => h(TableHeader, {column, title: 'Weight'}),
    accessorKey: "weight",
    cell: ({row}) => {
      const player = row.original

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'unit',
        unit: 'kilogram',
        unitDisplay: 'short',
      }).format(player.weight)

      return h('div', {class: 'font-medium'}, formatted)
    },
    enableGlobalFilter: false
  },
  {
    id: 'birthday',
    accessorKey: 'birthDate',
    header: ({column}) => h(TableHeader, {column, title: 'Birthday'}),
    cell: ({row}) => {
      const player = row.original

      return h("div", {class: "flex justify-center me-4"}, formatDate(player.birthDate))
    },
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
      v-slot="{ table }"
      :columns="columns"
      :data="data"
      placeholder="Search players..."
      total-label="Total players"
  >
    <slot :table="table" name="filters"></slot>
  </TableComponent>
</template>
