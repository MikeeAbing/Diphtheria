import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { MoreHorizontal, PencilLine, PlusCircleIcon, Trash2 } from 'lucide-react';
import * as React from 'react';

import { Input } from '@/components/ui/input';

import TableSortHeader from '@/components/data-table/data-table-sort-header.jsx';
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { toast } from 'sonner';
import useDebouncedSearch from '@/hooks/use-debounced-search';
import useSorting from '@/hooks/use-sorting';

import { useEffect, useState } from 'react';
import TableNoSortHeader from '../../../../../../../resources/js/components/data-table/data-table-no-sort-header';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Diphtheria Cases List',
        href: '/diph',
    },
];

export default function Diph() {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            toast(flash?.success);
        }
    }, [flash?.success]);

    const { data: diph } = usePage().props.diph;

    type Diph = {
        id: string;
        case_id: number;
        admitted: string;
        date_admitted: string,
        patient: {
            id: string;
            patient_number: string,
            full_name: string;
        } | null;
    };

    const [data, setData] = useState<Diph[]>([...diph]);

    console.log(data);

    // const { links, meta } = usePage().props;
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const { filters, users } = usePage().props;
    const { params, setParams, setTimeDebounce } = useDebouncedSearch('/diph', filters);
    const { sort } = useSorting(filters, setParams);

    const [search, setSearch] = useState('');

    const columns: ColumnDef<Diph>[] = [
        {
            id: 'actions',
            header: ({ }) => <TableNoSortHeader title="Actions" />,
            cell: ({ row }) => (
                <center>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <Link href={`/diph/${row.original.id}/edit`}>
                                <DropdownMenuItem>
                                    <PencilLine className="h-4 w-4" />
                                    Edit Diphtheria Case
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            <sub><u>Laboratory</u></sub>
                            <Link href='/lab/create'>
                                <DropdownMenuItem>
                                    <PencilLine className="h-4 w-4" />
                                    Add Laboratory Data
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            {/* {row.original.diph?.[0]?.id && (
                                <div><Link href={`/diph/${row.original.diph?.[0]?.id}/edit`}>
                                    <DropdownMenuItem>
                                        <PencilLine className="h-4 w-4" />
                                        Edit Diphtheria Case
                                    </DropdownMenuItem>
                                </Link>
                                    <DropdownMenuSeparator /></div>
                            )} */}
                            <Link href="/iam/users/create">
                                <DropdownMenuItem>
                                    <Trash2 className="h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </center>
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'case_id',
            header: ({ column }) => (
                <TableSortHeader
                    title="Case ID"
                    onClick={() => {
                        setTimeDebounce(50);
                        sort('encoded_by');
                    }}
                    sort={params.col === 'encoded_by' ? params.sort : null}
                />
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue('case_id')}</div>,
        },
        {
            accessorKey: 'admitted',
            header: ({ column }) => (
                <TableSortHeader
                    title="Admitted(Y/N)"
                    onClick={() => {
                        setTimeDebounce(50);
                        sort('encoded_by');
                    }}
                    sort={params.col === 'encoded_by' ? params.sort : null}
                />
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue('admitted')}</div>,
        },
        {
            accessorKey: 'date_admitted',
            header: ({ column }) => (
                <TableSortHeader
                    title="Date Admitted"
                    onClick={() => {
                        setTimeDebounce(50);
                        sort('encoded_by');
                    }}
                    sort={params.col === 'encoded_by' ? params.sort : null}
                />
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue('date_admitted')}</div>,
        },
        {
            accessorKey: 'patient',
            header: ({ column }) => (
                <TableSortHeader
                    title="Name of Patient"
                    onClick={() => {
                        setTimeDebounce(50);
                        sort('epi_id');
                    }}
                    sort={params.col === 'epi_id' ? params.sort : null}
                />
            ),
            cell: ({ row }) => {
                return <div className="capitalize">{row.original.patient?.full_name}</div>;
            },
        },
    ];

    const table = useReactTable({
        data: data,
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
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="w-full space-y-4 p-4">
                <div className="flex items-center gap-2">
                    {/* <TableToolbar
                        placeholder="Search user"
                        search={params?.search}
                        params={params}
                        setParams={setParams}
                        setTimeDebounce={setTimeDebounce}
                    /> */}
                    {/* <Link href="/patient/create">
                        <Button className="h-8 px-2 lg:px-3">
                            <PlusCircleIcon className="h-4 w-4" />
                            Add Patient
                        </Button>
                    </Link> */}
                    {/* <Dialog>
                        <DialogTrigger asChild>
                            <Button className="h-8 px-2 lg:px-3">
                                <PlusCircleIcon className="h-4 w-4" />
                                Add Diphtheria
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Search for Patient</DialogTitle>
                                <DialogDescription>Type the patient number of first name/middle name/last name of the patient.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Search:
                                    </Label>
                                    <Input
                                        id="search"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search..."
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Link href={`/diph/create?search=${search}`}>
                                    <Button>Search patient</Button>
                                </Link>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog> */}

                    {/* <Input
                        placeholder="Search using patient's full name..."
                        value={(table.getColumn('full_name')?.getFilterValue() as string) ?? ''}
                        onChange={(event) => table.getColumn('full_name')?.setFilterValue(event.target.value)}
                        className="max-w-sm"
                    /> */}
                    <DataTableViewOptions table={table} />
                    {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu> */}
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                {/* <DataTablePagination
                    table={table}
                    params={params}
                    setParams={setParams}
                    setTimeDebounce={setTimeDebounce}
                    links={links}
                    meta={meta}
                /> */}
                {/* <div className="flex items-center justify-end space-x-2 py-4">
                        <div className="text-muted-foreground flex-1 text-sm">
                            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
                        </div>
                        <div className="space-x-2">
                            <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                                Previous
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                                Next
                            </Button>
                        </div>
                    </div> */}
            </div>
        </AppLayout>
    );
}
