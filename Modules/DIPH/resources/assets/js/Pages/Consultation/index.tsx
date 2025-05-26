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
        title: 'Consultation List',
        href: '/consultation',
    },
];

export default function Consultation({patient_number}) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Consultation List" />
            <div className="overflow-x flex w-full space-y-4 p-4">
                <div className="flex flex-col items-start gap-y-8">
                    <div className="grid grid-cols-2 items-center gap-4"><Link href={`/diph/?id=${patient_number}`}>
                        <Button>Diphtheria</Button></Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
