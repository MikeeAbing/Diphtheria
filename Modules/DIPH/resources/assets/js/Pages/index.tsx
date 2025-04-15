import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Permission } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Diphtheria',
        href: '/diph',
    },
];

export default function index(){
    return(
        <p>Hello World!</p>
    )
}
