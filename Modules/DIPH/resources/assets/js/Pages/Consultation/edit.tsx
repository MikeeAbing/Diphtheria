import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router, usePage } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { ConsultationForm, consultationFormSchema } from './data/schema';

interface Consultation {
    id: number,
    patient_number: string;
    consultation_id: string;
    consultation_date: string | undefined;
    consultation_time: string | undefined;
    mode_of_transaction: 'Admitted' | 'Referral' | 'Visited' | 'Walk-in';
    type_of_consultation: 'Adult Immunization' | 'Animal Bite' | 'Diphtheria' | 'General';
    chief_complaint: string;
}

export default function create() {
    const { consultation } = usePage().props;

    const consult = consultation as Consultation;

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
        {
            title: 'Edit Patient Consultation',
            href: `/consultation/${consult.id}/edit`,
        },
    ];

    const pat_number = sessionStorage.getItem('patient_number');

    const form = useForm<ConsultationForm>({
        resolver: zodResolver(consultationFormSchema),
        defaultValues: {
            patient_number: consult.patient_number,
            consultation_date: consult.consultation_date,
            consultation_time: consult.consultation_time?.slice(0,5),
            mode_of_transaction: consult.mode_of_transaction,
            type_of_consultation: consult.type_of_consultation,
            chief_complaint: consult.chief_complaint,
        },
    });

    function onSubmit(values: ConsultationForm) {
        const payload = { ...values };

        router.put(`/consultation/${consult.id}`, payload, {
            onSuccess: () => {
                form.reset();
            },
            onError: (errors) => {
                console.log('Validation failed:', errors);
            },
        });
    }

    const consultation_date = form.watch('consultation_date');
    const consultation_time = form.watch('consultation_time');
    const mode_of_transaction = form.watch('mode_of_transaction');
    const type_of_consultation = form.watch('type_of_consultation');
    const chief_complaint = form.watch('chief_complaint');

    const onError = (errors: any) => {
        console.log('Form validation errors:', errors);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Consultation Form" />
            <div className="overflow-x flex w-full space-y-4 p-4">
                <div className="flex w-full flex-row justify-start">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8">
                            {/* 1st Column */}
                            <h1>
                                <b>Consultation Details</b>
                            </h1>

                            <div className="flex flex-row items-start gap-x-32">
                                <FormField
                                    control={form.control}
                                    name="consultation_date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="mb-1">
                                                Consultation Date{' '}
                                                <div className="text-red-500">
                                                    <b>*</b>
                                                </div>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="w-38 min-w-[38px] flex-shrink-0 border-2 border-black"
                                                    type="date"
                                                    min="1925-01-01"
                                                    value={field.value ?? ''}
                                                    onChange={(e) => {
                                                        const date = e.target.value;
                                                        field.onChange(date);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-row items-start gap-x-32">
                                <FormField
                                    control={form.control}
                                    name="consultation_time"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="mb-1">
                                                Consultation Time{' '}
                                                <div className="text-red-500">
                                                    <b>*</b>
                                                </div>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="w-38 min-w-[38px] flex-shrink-0 border-2 border-black"
                                                    type="time"
                                                    value={field.value ?? ''}
                                                    onChange={(e) => {
                                                        const time = e.target.value;
                                                        field.onChange(time);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-row items-start gap-x-32">
                                <FormField
                                    control={form.control}
                                    name="mode_of_transaction"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-start gap-x-8">
                                                <div className="flex flex-col">
                                                    <FormLabel className="mb-1">
                                                        Mode Of Transaction{' '}
                                                        <div className="text-red-500">
                                                            <b>*</b>
                                                        </div>
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Select from either <strong>Admitted</strong>, <strong>Referral</strong>,{' '}
                                                        <strong>Visited</strong>, or <strong>Walk-in</strong>.
                                                    </FormDescription>
                                                </div>
                                                <Select
                                                    value={form.watch('mode_of_transaction')}
                                                    onValueChange={(val) => {
                                                        form.setValue('mode_of_transaction', val);
                                                    }}
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Please Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {(['Admitted', 'Referral', 'Visited', 'Walk-in'] as const).map((option) => (
                                                            <FormItem key={option} className="flex items-center space-x-2">
                                                                <FormControl>
                                                                    <SelectItem value={option} id={option}>
                                                                        {option}
                                                                    </SelectItem>
                                                                </FormControl>
                                                            </FormItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <FormMessage /> {/* Shows validation errors if any */}
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-row items-start gap-x-32">
                                <FormField
                                    control={form.control}
                                    name="type_of_consultation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-start gap-x-8">
                                                <div className="flex flex-col">
                                                    <FormLabel className="mb-1">
                                                        Type of Consultation{' '}
                                                        <div className="text-red-500">
                                                            <b>*</b>
                                                        </div>
                                                    </FormLabel>
                                                    {/* <FormDescription>
                                                        Select from either <strong>Confirmed Case</strong>, <strong>Probable Case</strong>,{' '}
                                                        <strong>Carrier</strong>, <strong>International Traveler</strong> or <strong>Unknown</strong>.
                                                    </FormDescription> */}
                                                </div>
                                                <Select
                                                    value={form.watch('type_of_consultation')}
                                                    onValueChange={(val) => {
                                                        form.setValue('type_of_consultation', val);
                                                    }}
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Please Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {(['Adult Immunization', 'Animal Bite', 'Diphtheria', 'General'] as const).map((option) => (
                                                            <FormItem key={option} className="flex items-center space-x-2">
                                                                <FormControl>
                                                                    <SelectItem value={option} id={option}>
                                                                        {option}
                                                                    </SelectItem>
                                                                </FormControl>
                                                            </FormItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <FormMessage /> {/* Shows validation errors if any */}
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-row items-start gap-x-10">
                                <FormField
                                    control={form.control}
                                    name="chief_complaint"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Chief Complaint</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} placeholder="Write here..." className="min-w-149 border-2 border-black" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex justify-center">
                                <Button className="bg-blue-500 text-white hover:bg-blue-600" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}
