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
import { MoreHorizontal, PlusCircleIcon, Trash2 } from 'lucide-react';
import * as React from 'react';

import TableSortHeader from '@/components/data-table/data-table-sort-header.jsx';
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import useDebouncedSearch from '@/hooks/use-debounced-search';
import useSorting from '@/hooks/use-sorting';
import { toast } from 'sonner';

import { useEffect, useState } from 'react';
import TableNoSortHeader from '../../../../../../../resources/js/components/data-table/data-table-no-sort-header';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Patient List',
        href: '/patient',
    },
    {
        title: 'Consultation List',
        href: '/consultation',
    },
];

export default function Consultation() {
    const patient_number = sessionStorage.getItem('patient_number');

    //const { data: consultations} = usePage().props.consultations;
    const { data: consultations = [] } = usePage().props.consultations || {};

    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            toast(flash?.success);
        }
    }, [flash?.success]);

    type Consultation = {
        patient_number: string;
        consultation_id: string;
        consultation_date: string;
        consultation_time: string;
        mode_of_transaction: string;
        type_of_consultation: string;
        chief_complaint: string;
        fullname: string;
        case_report_id: number;
    };

    // const { links, meta } = usePage().props;
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const { filters, consultation, users } = usePage().props;
    const { params, setParams, setTimeDebounce } = useDebouncedSearch('/consultation', filters);
    const { sort } = useSorting(filters, setParams);

    const [search, setSearch] = useState('');

    const columns: ColumnDef<Consultation>[] = [
        {
            id: 'actions',
            header: ({}) => <TableNoSortHeader title="Actions" />,
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
                            <DropdownMenuSeparator />
                            {/* <Link href={`/diph/create?search=${row.original.patient_number}`}>
                                   <DropdownMenuItem>
                                       <PlusCircleIcon className="h-4 w-4" />
                                       Add Diphtheria Case
                                   </DropdownMenuItem>
                               </Link> */}
                            <Link href={`/consultation/${row.original.consultation_id}/edit`}>
                                <DropdownMenuItem>
                                    <PlusCircleIcon className="h-4 w-4" />
                                    Edit Patient Consultation
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />

                            <Link href={`/diph/create?search=${sessionStorage.getItem('case_id')}`}>
                                <DropdownMenuItem>
                                    <PlusCircleIcon className="h-4 w-4" />
                                    Add Diptheria Case
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
            accessorKey: 'patient_number',
            header: ({ column }) => (
                <TableSortHeader
                    title="Patient Number"
                    onClick={() => {
                        setTimeDebounce(50);
                        sort('patient_number');
                    }}
                    sort={params.col === 'patient_number' ? params.sort : null}
                />
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue('patient_number')}</div>,
        },
        {
            accessorKey: 'fullname',
            header: ({ column }) => (
                <TableSortHeader
                    title="Full Name"
                    onClick={() => {
                        setTimeDebounce(50);
                        sort('fullname');
                    }}
                    sort={params.col === 'fullname' ? params.sort : null}
                />
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue('fullname')}</div>,
        },
        {
            accessorKey: 'consultation_id',
            header: ({ column }) => (
                <TableSortHeader
                    title="Consultation ID"
                    onClick={() => {
                        setTimeDebounce(50);
                        sort('consultation_id');
                    }}
                    sort={params.col === 'consultation_id' ? params.sort : null}
                />
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue('consultation_id')}</div>,
        },
        {
            accessorKey: 'consultation_date',
            header: ({ column }) => (
                <TableSortHeader
                    title="Consultation Date"
                    onClick={() => {
                        setTimeDebounce(50);
                        sort('consultation_date');
                    }}
                    sort={params.col === 'consultation_date' ? params.sort : null}
                />
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue('consultation_date')}</div>,
        },
        {
            accessorKey: 'consultation_time',
            header: ({ column }) => (
                <TableSortHeader
                    title="Consultation Time"
                    onClick={() => {
                        setTimeDebounce(50);
                        sort('consultation_time');
                    }}
                    sort={params.col === 'consultation_time' ? params.sort : null}
                />
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue('consultation_time')}</div>,
        },
        {
            accessorKey: 'mode_of_transaction',
            header: ({ column }) => (
                <TableSortHeader
                    title="Mode Of Transaction"
                    onClick={() => {
                        setTimeDebounce(50);
                        sort('mode_of_transaction');
                    }}
                    sort={params.col === 'mode_of_transaction' ? params.sort : null}
                />
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue('mode_of_transaction')}</div>,
        },
        {
            accessorKey: 'type_of_consultation',
            header: ({ column }) => (
                <TableSortHeader
                    title="Type Of Consultation"
                    onClick={() => {
                        setTimeDebounce(50);
                        sort('type_of_consultation');
                    }}
                    sort={params.col === 'type_of_consultation' ? params.sort : null}
                />
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue('type_of_consultation')}</div>,
        },
        {
            accessorKey: 'chief_complaint',
            header: ({ column }) => (
                <TableSortHeader
                    title="Chief Complaint"
                    onClick={() => {
                        setTimeDebounce(50);
                        sort('chief_complaint');
                    }}
                    sort={params.col === 'chief_complaint' ? params.sort : null}
                />
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue('chief_complaint')}</div>,
        },
    ];

    const table = useReactTable({
        data: consultations,
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
            <Head title="Consultation" />
            <div className="w-full space-y-4 p-4">
                <div className="flex items-center gap-2">
                    {/* <TableToolbar
                                          placeholder="Search user"
                                          search={params?.search}
                                          params={params}
                                          setParams={setParams}
                                          setTimeDebounce={setTimeDebounce}
                                      /> */}

                    <Link href="/consultation/create">
                        <Button className="h-8 px-2 lg:px-3">
                            <PlusCircleIcon className="h-4 w-4" />
                            Add Consultation
                        </Button>
                    </Link>

                    <DataTableViewOptions table={table} />
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
                {}
                {}
            </div>
        </AppLayout>
    );
}
