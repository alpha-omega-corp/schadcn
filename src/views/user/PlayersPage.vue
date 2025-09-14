<script lang="ts" setup>
import {apiGet, apiPost} from "@/http.ts";
import type {AxiosResponse} from "axios";
import {computed, h, ref} from "vue"
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
import {Mail} from "lucide-vue-next"
import {
  type ColumnDef,
  type ColumnFiltersState,
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useVueTable,
} from "@tanstack/vue-table"
import {Checkbox} from "@/components/ui/checkbox"
import PlayerAction from "@/views/user/PlayerAction.vue";
import {Button} from "@/components/ui/button";
import DialogComponent from "@/components/app/DialogComponent.vue";
import {toTypedSchema} from '@vee-validate/zod'
import * as z from 'zod'
import {Input} from "@/components/ui/input";
import InputComponent from "@/components/app/InputComponent.vue";
import CalendarComponent from "@/components/app/CalendarComponent.vue";


const players = ref<Player[]>([])
apiGet<{ items: Player[] }>(`/players`).then((res: AxiosResponse<{ items: Player[] }>) => {
  players.value = res.data.items;
})

const data = computed(() => players.value)

function toDate(value: unknown): Date | null {
  if (!value && value !== 0) return null
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value

  // numeric string or number
  if (typeof value === "number" || (typeof value === "string" && /^\d+$/.test(value))) {
    const num = typeof value === "number" ? value : Number(value)
    const ms = num < 1e12 ? num * 1000 : num // seconds -> ms if too small
    const d = new Date(ms)
    return isNaN(d.getTime()) ? null : d
  }

  if (typeof value === "string") {
    // Handle date-only safely as UTC to avoid TZ off-by-one
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [y, m, d] = value.split("-").map(Number)
      const dt = new Date(Date.UTC(y, m - 1, d))
      return isNaN(dt.getTime()) ? null : dt
    }
    const d = new Date(value)
    return isNaN(d.getTime()) ? null : d
  }
  return null
}


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
    header: "First name",
    accessorKey: "firstName",
    cell: info => info.getValue() as string,
    enableSorting: true,
  },
  {
    header: "Last name",
    accessorKey: "lastName",
    cell: info => info.getValue() as string,
    enableSorting: true,
  },
  {
    header: "Birth date",
    accessorKey: "birthDate",
    cell: info => {
      const d = toDate(info.getValue())
      return d ? new Intl.DateTimeFormat(undefined, {year: "numeric", month: "2-digit", day: "2-digit"}).format(d) : ""
    },

    enableSorting: true,
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
    id: 'actions',
    enableHiding: false,
    cell: ({row}) => {
      const player = row.original

      return h('div', {class: 'relative'}, h(PlayerAction, {
        player,
      }))
    },
  },
]

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const globalFilter = ref<string>("")
const rowSelection = ref<Record<string, boolean>>({})

const table = useVueTable({
  data,
  columns,
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
  },
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

  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
})

interface CreatePlayerRequest {
  username: string;
}

const formSchema = toTypedSchema<CreatePlayerRequest>(z.object({
  firstName: z.string().min(2).max(20),
  lastName: z.string().min(2).max(20),
  birthDate: z.string()
}))

const createPlayer = (data: CreatePlayerRequest) => {
  console.log(data);
  apiPost<Player>(`/players`, data).then((res: AxiosResponse<CreatePlayerRequest>) => {
    console.log(res.data);
  })
}

</script>

<template>
  <div class="grid auto-rows-min gap-4 md:grid-cols-2">

    <div class="aspect-video rounded-xl bg-muted/50 p-4 border-1">

      <DialogComponent :form="formSchema" label="Create" title="Create Player" @submit="createPlayer">
        <InputComponent label="First Name" name="firstName"/>
        <InputComponent label="Last Name" name="lastName"/>

        <CalendarComponent label="Birth Date" name="birthDate"/>


      </DialogComponent>

      <Button>
        <Mail class="w-4 h-4 mr-2"/>
        Login with Email
      </Button>

      <div class="flex items-center justify-between gap-4 mb-4">
        <Input
            v-model="globalFilter"
            class="border rounded px-3 py-2 text-sm w-full max-w-sm"
            placeholder="Search players..."
            type="text"
        />
        <div class="flex items-center gap-2">
          <button
              :disabled="!table.getCanPreviousPage()"
              class="border rounded px-3 py-1 text-sm"
              @click="table.previousPage()"
          >
            Prev
          </button>
          <span class="text-sm">
          Page {{ table.getState().pagination.pageIndex + 1 }} of {{ table.getPageCount() }}
        </span>
          <button
              :disabled="!table.getCanNextPage()"
              class="border rounded px-3 py-1 text-sm"
              @click="table.nextPage()"
          >
            Next
          </button>
        </div>
      </div>

      <Table>
        <TableCaption>Players</TableCaption>
        <TableHeader>
          <template v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableRow>
              <template v-for="header in headerGroup.headers" :key="header.id">
                <TableHead
                    :class="['cursor-pointer select-none']"
                    @click="header.column.getToggleSortingHandler()?.($event)"
                >
                  <FlexRender
                      v-if="!header.isPlaceholder"
                      :props="header.getContext()"
                      :render="header.column.columnDef.header"
                  />
                </TableHead>
              </template>
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
        <TableFooter>
          <TableRow>
            <TableCell :colspan="columns.length" class="text-right text-sm">
              Total players: {{ data.length }}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>

    <div class="aspect-video rounded-xl bg-muted/50">
      Player
    </div>

  </div>


</template>
