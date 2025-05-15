import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

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

import TableSortHeader from '@/components/data-table/data-table-sort-header.jsx';
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { useState } from 'react';
import TableNoSortHeader from '../../../../../../../resources/js/components/data-table/data-table-no-sort-header';
import {useEffect} from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Diphtheria',
        href: '/patient',
    },
];

export default function Patient({success}) {
    useEffect(()=>{
        if(success){
            toast('Case Investigation Form successfully saved');
        }
    },[success]);

    // const { links, meta } = usePage().props;
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    // const { params, setParams, setTimeDebounce } = useDebouncedSearch('/diph/', filters);
    // const { sort } = useSorting(filters, setParams);

    type Patient = {
        encoded_by: string;
        case_id: string;
        epi_id: string;
        patient_no: string;
        first_name: string;
        middle_name: string | null;
        last_name: string;
        suffix_name: string | null;
        sex: string;
        dob: string;
        age_in_years: number;
        current_addr_region: string | null;
        current_addr_province: string | null;
        current_addr_city: string | null;
        current_addr_barangay: string | null;
        current_addr_purok: string | null;
    };

    const [data, setData] = useState<Patient[]>([
        {
            encoded_by: 'John Doe',
            case_id: '2024-1234704RP29M',
            epi_id: '0000639-DIP-041824-24-1063',
            patient_no: '24-1063',
            first_name: 'REY MARK',
            middle_name: 'SUNIT',
            last_name: 'PELARIOS',
            suffix_name: '',
            sex: 'Male',
            dob: '04/14/1995',
            age_in_years: 29,
            current_addr_region: 'Region XII (SOCCSKSARGEN)',
            current_addr_province: 'Cotabato',
            current_addr_city: 'Makilala',
            current_addr_barangay: 'Taluntalunan',
            current_addr_purok: 'Purok 3A',
        },
        {
            encoded_by: 'John Doe',
            case_id: '2024-1234704RP29M',
            epi_id: '0000639-DIP-041824-24-1063',
            patient_no: '24-1063',
            first_name: 'REY MARK',
            middle_name: 'SUNIT',
            last_name: 'PELARIOS',
            suffix_name: '',
            sex: 'Male',
            dob: '04/14/1995',
            age_in_years: 29,
            current_addr_region: 'Region XII (SOCCSKSARGEN)',
            current_addr_province: 'Cotabato',
            current_addr_city: 'Makilala',
            current_addr_barangay: 'Taluntalunan',
            current_addr_purok: 'Purok 3A',
        },
        {
            encoded_by: 'John Doe',
            case_id: '2024-1234704RP29M',
            epi_id: '0000639-DIP-041824-24-1063',
            patient_no: '24-1063',
            first_name: 'REY MARK',
            middle_name: 'SUNIT',
            last_name: 'PELARIOS',
            suffix_name: '',
            sex: 'Male',
            dob: '04/14/1995',
            age_in_years: 29,
            current_addr_region: 'Region XII (SOCCSKSARGEN)',
            current_addr_province: 'Cotabato',
            current_addr_city: 'Makilala',
            current_addr_barangay: 'Taluntalunan',
            current_addr_purok: 'Purok 3A',
        },
    ]);

    const columns: ColumnDef<Patient>[] = [
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
                            {/* <Link href="/diph/create">
                                <DropdownMenuItem>
                                    <PlusCircleIcon className="h-4 w-4" />
                                    Add Case
                                </DropdownMenuItem>
                            </Link> */}
                            <DropdownMenuSeparator />
                            <Link href="/iam/users/create">
                                <DropdownMenuItem>
                                    <PencilLine className="h-4 w-4" />
                                    Edit
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
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
            accessorKey: 'encoded_by',
            header: ({ column }) => (
                <TableSortHeader
                    title="Encoded By"
                    onClick={() => {
                        // setTimeDebounce(50);
                        // sort('encoded_by');
                    }}
                    // sort={params.col === 'encoded_by' ? params.sort : null}
                />
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue('encoded_by')}</div>,
        },
        {
            accessorKey: 'case_id',
            header: ({ column }) => (
                <TableSortHeader
                    title="Case ID"
                    onClick={() => {
                        // setTimeDebounce(50);
                        // sort('case_id');
                    }}
                    // sort={params.col === 'case_id' ? params.sort : null}
                />
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue('case_id')}</div>,
        },
        {
            accessorKey: 'epi_id',
            header: ({ column }) => (
                <TableSortHeader
                    title="EPI ID"
                    onClick={() => {
                        // setTimeDebounce(50);
                        // sort('epi_id');
                    }}
                    // sort={params.col === 'epi_id' ? params.sort : null}
                />
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue('epi_id')}</div>,
        },
        {
            accessorKey: 'patient_no',
            header: ({ column }) => (
                <TableSortHeader
                    title="Patient No.(*)"
                    onClick={() => {
                        // setTimeDebounce(50);
                        // sort('patient_no');
                    }}
                    // sort={params.col === 'patient_no' ? params.sort : null}
                />
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue('patient_no')}</div>,
        },
        {
            accessorKey: 'first_name',
            header: ({ column }) => (
                <TableSortHeader
                    title="First Name (*)"
                    onClick={() => {
                        // setTimeDebounce(50);
                        // sort('first_name');
                    }}
                    // sort={params.col === 'first_name' ? params.sort : null}
                />
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue('first_name')}</div>,
        },
        {
            accessorKey: 'middle_name',
            header: ({ column }) => (
                <TableSortHeader
                    title="Middle Name (*)"
                    onClick={() => {
                        // setTimeDebounce(50);
                        // sort('middle_name');
                    }}
                    // sort={params.col === 'middle_name' ? params.sort : null}
                />
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue('middle_name')}</div>,
        },
        {
            accessorKey: 'last_name',
            header: ({ column }) => (
                <TableSortHeader
                    title="Last Name (*)"
                    onClick={() => {
                        // setTimeDebounce(50);
                        // sort('last_name');
                    }}
                    // sort={params.col === 'last_name' ? params.sort : null}
                />
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue('last_name')}</div>,
        },
        {
            accessorKey: 'suffix_name',
            header: ({ column }) => (
                <TableSortHeader
                    title="Suffix Name (*)"
                    onClick={() => {
                        // setTimeDebounce(50);
                        // sort('suffix_name');
                    }}
                    // sort={params.col === 'suffix_name' ? params.sort : null}
                />
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue('suffix_name')}</div>,
        },
        {
            accessorKey: 'sex',
            header: ({ column }) => (
                <TableSortHeader
                    title="Sex"
                    onClick={() => {
                        // setTimeDebounce(50);
                        // sort('sex');
                    }}
                    // sort={params.col === 'sex' ? params.sort : null}
                />
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue('sex')}</div>,
        },
        {
            accessorKey: 'dob',
            header: ({ column }) => (
                <TableSortHeader
                    title="Date of Birth"
                    onClick={() => {
                        // setTimeDebounce(50);
                        // sort('dob');
                    }}
                    // sort={params.col === 'dob' ? params.sort : null}
                />
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue('dob')}</div>,
        },
        {
            accessorKey: 'age_in_years',
            header: ({ column }) => (
                <TableSortHeader
                    title="Age In Years"
                    onClick={() => {
                        // setTimeDebounce(50);
                        // sort('age_in_years');
                    }}
                    // sort={params.col === 'age_in_years' ? params.sort : null}
                />
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue('age_in_years')}</div>,
        },
        {
            accessorKey: 'current_addr_region',
            header: ({ column }) => (
                <TableSortHeader
                    title="(Current Address) Region"
                    onClick={() => {
                        // setTimeDebounce(50);
                        // sort('current_addr_region');
                    }}
                    // sort={params.col === 'current_addr_region' ? params.sort : null}
                />
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue('current_addr_region')}</div>,
        },

        {
            accessorKey: 'current_addr_province',
            header: ({ column }) => (
                <TableSortHeader
                    title="(Current Address) Province"
                    onClick={() => {
                        // setTimeDebounce(50);
                        // sort('current_addr_province');
                    }}
                    // sort={params.col === 'current_addr_province' ? params.sort : null}
                />
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue('current_addr_province')}</div>,
        },
        {
            accessorKey: 'current_addr_city',
            header: ({ column }) => (
                <TableSortHeader
                    title="(Current Address) City / Municipality"
                    onClick={() => {
                        // setTimeDebounce(50);
                        // sort('current_addr_city');
                    }}
                    // sort={params.col === 'current_addr_city' ? params.sort : null}
                />
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue('current_addr_city')}</div>,
        },
        {
            accessorKey: 'current_addr_barangay',
            header: ({ column }) => (
                <TableSortHeader
                    title="(Current Address) Barangay"
                    onClick={() => {
                        // setTimeDebounce(50);
                        // sort('current_addr_barangay');
                    }}
                    // sort={params.col === 'current_addr_barangay' ? params.sort : null}
                />
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue('current_addr_barangay')}</div>,
        },
        {
            accessorKey: 'current_addr_purok',
            header: ({ column }) => (
                <TableSortHeader
                    title="(Current Address) Sitio / Purok"
                    onClick={() => {
                        // setTimeDebounce(50);
                        // sort('current_addr_purok');
                    }}
                    // sort={params.col === 'current_addr_purok' ? params.sort : null}
                />
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue('current_addr_purok')}</div>,
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
                    <Link href="/patient/create">
                        <Button className="h-8 px-2 lg:px-3">
                            <PlusCircleIcon className="h-4 w-4" />
                            Add Patient
                        </Button>
                    </Link>
                    <Link href="/diph/create">
                        <Button className="h-8 px-2 lg:px-3">
                            <PlusCircleIcon className="h-4 w-4" />
                            Add Diphtheria
                        </Button>
                    </Link>

                    {/* <Input
                        placeholder="Filter user..."
                        value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
                        onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
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
