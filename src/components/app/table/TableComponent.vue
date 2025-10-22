<script lang="ts" setup>
import {ref} from 'vue'
import type {ColumnDef, ColumnFiltersState, SortingState, VisibilityState,} from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable
} from '@tanstack/vue-table'
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow,} from '@/components/ui/table'
import {valueUpdater} from "@/lib/utils";
import TablePagination from "@/components/app/table/TablePagination.vue";
import TableToolbar from "@/components/app/table/TableToolbar.vue";

type AnyRow = Record<string, any>

const props = defineProps<{
  data: AnyRow[]
  columns: ColumnDef<AnyRow, any>[]
  totalLabel?: string
  placeholder?: string
}>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})

const globalFilter = ref<string>('')
const rowSelection = ref<Record<string, boolean>>({})

const table = useVueTable<AnyRow>({
  get data() {
    return props.data ?? []
  },
  get columns() {
    return props.columns ?? []
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  state: {
    get sorting() {
      return sorting.value
    },
    get columnFilters() {
      return columnFilters.value
    },
    get globalFilter() {
      return globalFilter.value
    },
    get rowSelection() {
      return rowSelection.value
    },
    get columnVisibility() {
      return columnVisibility.value
    },
  },
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onSortingChange: updater => {
    sorting.value = typeof updater === "function" ? updater(sorting.value) : updater
  },
  onColumnFiltersChange: updater => {
    columnFilters.value = typeof updater === "function" ? updater(columnFilters.value) : updater
  },
  onGlobalFilterChange: updater => {
    globalFilter.value = typeof updater === "function" ? updater(globalFilter.value) : updater
  },
  onRowSelectionChange: updater => {
    rowSelection.value = typeof updater === "function" ? updater(rowSelection.value) : updater
  },
})

</script>

<template>
  <div class="relative inline-block max-w-full overflow-auto">
    <TableToolbar :table="table"/>

    <Table>
      <TableHeader>
        <template v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableRow>
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender v-if="!header.isPlaceholder" :props="header.getContext()"
                          :render="header.column.columnDef.header"/>
            </TableHead>
          </TableRow>
        </template>
      </TableHeader>

      <TableBody>
        <template v-if="table.getRowModel().rows.length">
          <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :props="cell.getContext()" :render="cell.column.columnDef.cell"/>
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colspan="columns.length" class="text-center text-sm py-6">
              No results.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>

      <TableFooter class="border-t border-t-teal-900">
        <TableRow>
          <TableCell :colspan="columns.length">
            <TablePagination :table="table"/>
          </TableCell>
        </TableRow>

      </TableFooter>
    </Table>
  </div>

</template>