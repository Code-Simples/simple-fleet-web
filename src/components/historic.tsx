import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Calendar as CalendarIcon,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useState } from 'react'

import { MapView } from '@/components/map-view'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export type Historic = {
  _id: string
  coords: {
    latitude: number
    longitude: number
    timestamp: number
  }[]
  user_id: string
  user_name: string
  license_plate: string
  description: string
  status: string
  created_at: string
  updated_at: string
}

export const columns: ColumnDef<Historic>[] = [
  {
    accessorKey: 'user_name',
    header: 'Motorista',
    cell: ({ row }) => (
      <div className="w-56">
        <Label>{row.getValue('user_name')}</Label>
      </div>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Motivo',
    cell: ({ row }) => (
      <div className="w-56">
        <Label>{row.getValue('description')}</Label>
      </div>
    ),
  },
  {
    accessorKey: 'license_plate',
    header: 'Placa do veículo',
    cell: ({ row }) => (
      <div className="w-20 text-right">
        <Label>{row.getValue('license_plate')}</Label>
      </div>
    ),
  },
  {
    accessorKey: 'updated_at',
    header: 'Última atualização',
    cell: ({ row }) => (
      <div className="w-20 text-right">
        <Label>
          {`às ${format(new Date(row.getValue('updated_at')), 'HH:mm', {
            locale: ptBR,
          })}`}
        </Label>
      </div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const coords = row.original.coords
      console.log(coords)
      return (
        <div className="w-10 text-right">
          <MapView coords={coords} />
        </div>
      )
    },
  },
]

export function Historic({ data }: { data: Historic[] }) {
  const [date, setDate] = useState<Date>()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-3">
          <CalendarDays className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-semibold tracking-tight">Histórico</h1>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="lg"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                {date ? (
                  format(date, 'PPP', { locale: ptBR })
                ) : (
                  <span className="text-muted-foreground">
                    Selecione a data
                  </span>
                )}
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <p className="text-sm text-muted-foreground">
        Consulte o histórico de utilização de veículos
      </p>

      <div>
        <div className="w-full">
          <div className="flex items-center justify-between py-4">
            <Input
              placeholder="Pesquise aqui..."
              value={
                (table
                  .getColumn('license_plate')
                  ?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table
                  .getColumn('license_plate')
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <div className="inline-flex gap-2 text-sm font-medium text-muted-foreground sm:text-base">
              Registros
              <span className="items-center rounded-sm bg-primary px-3 text-white">
                {table.getFilteredRowModel().rows.length}
              </span>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Nenhum resultado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between py-4">
            <Label className="text-muted-foreground">
              Página {table.getState().pagination.pageIndex + 1} de{' '}
              {table.getPageCount()}
            </Label>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
