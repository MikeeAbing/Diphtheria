import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { PatientForm, patientFormSchema } from './data/schema';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Add Patient',
        href: '/diph/patient/create',
    },
];

export default function create() {
    const form = useForm<PatientForm>({
        resolver: zodResolver(patientFormSchema),
        defaultValues: {
            patient_number: '',
            firstname: '',
            middlename: '',
            lastname: '',
            suffixname: '',
            sex: undefined,
            dateofbirth: undefined,
            ageinyears: 0,
            ageinmonths: 0,
            ageindays: 0,
            member_of_IP: undefined,
            IP_tribe: undefined,
            IP_tribe_specify: '',
            pat_address_reg: undefined,
            pat_address_prov: undefined,
            pat_address_city: undefined,
            pat_address_brgy: undefined,
            pat_address_street_name: undefined,
            pat_perm_address_reg: undefined,
            pat_perm_address_prov: undefined,
            pat_perm_address_city: undefined,
            pat_perm_address_brgy: undefined,
            pat_perm_address_street_name: undefined,
            facilityname: undefined,
            occupation: '',
            phone_no: '',
        },
    });

    function onSubmit(values: PatientForm) {
        const payload = {
            ...values,
        };

        router.post('/iam/users', payload, {
            onSuccess: () => {
                toast('User is successfully registered!');
                form.reset();
            },
            onError: (errors) => {
                console.log('Validation failed:', errors);
            },
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Users" />
            <div className="w-full space-y-4 p-4">
                <div className="flex justify-start">
                    <div className="align-start flex w-full max-w-5xl flex-col space-y-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="firstname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="text" placeholder="First Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="middlename"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="text" placeholder="Middle Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="text" placeholder="Last Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="phone_no"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="text" placeholder="Phone Number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-center">
                                    <Button className="bg-blue-500 text-white hover:bg-blue-600" type="submit">
                                        Save Patient
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
