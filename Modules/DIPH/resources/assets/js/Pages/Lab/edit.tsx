import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radiogroup';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from "@/components/ui/label"
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router, usePage } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { LabForm, labFormSchema } from './data/schema';

interface Lab {
    id: number,
    case_id: string,
    date_specimen_collected: string | '',
    specimen_type: number | undefined
    lab_sent_RITM: 'Y' | 'N' | undefined,
    date_sent_RITM: string | '',
    date_received_by_lab: string | '',
    time_received_by_lab: string | '',
    type_test: number | undefined
    lab_result: number | undefined
    typeoforganism: '',
    interpretation: ''
    epi_id: string,
}

export default function create({ specimenType, testType, labResult }) {
    const { lab } = usePage().props;

    const lab_data = lab as Lab;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: `/dashboard/`,
        },
        {
            title: 'Diphtheria Cases List',
            href: `/diph/`,
        },
        {
            title: 'Edit Laboratory Data',
            href: `/lab/${lab_data.id}/edit`,
        },
    ];

    const form = useForm<LabForm>({
        resolver: zodResolver(labFormSchema),
        defaultValues: {
            case_id: lab_data.case_id,
            date_specimen_collected: lab_data.date_specimen_collected || undefined,
            specimen_type: lab_data.specimen_type || undefined,
            lab_sent_RITM: lab_data.lab_sent_RITM || undefined,
            date_sent_RITM: lab_data.date_sent_RITM || undefined,
            date_received_by_lab: lab_data.date_received_by_lab || undefined,
            time_received_by_lab: lab_data.time_received_by_lab || undefined,
            type_test: lab_data.type_test || undefined,
            lab_result: lab_data.lab_result || undefined,
            typeoforganism: lab_data.typeoforganism || undefined,
            interpretation: lab_data.interpretation || undefined,
            epi_id: lab_data.epi_id
        },
    });

    console.log(lab_data)

    function onSubmit(values: LabForm) {
        const payload = { ...values };

        router.put(`/lab/${lab_data.id}`, payload, {
            onSuccess: () => {
                form.reset();
            },
            onError: (errors) => {
                console.log('Validation failed:', errors);
            },
        });
    }

    const lab_result = Number(form.watch('lab_result'));

    const onError = (errors: any) => {
        console.log('Form validation errors:', errors);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Laboratory Result" />
            <div className="overflow-x flex w-full space-y-4 p-4">
                <div className="flex flex-col items-start gap-y-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8">
                            {/* 1st Column */}
                            <h1>
                                <b>Add Laboratory Data</b>
                            </h1>
                            {/* <div className="flex flex-col items-start gap-y-8"> */}
                            <FormField
                                control={form.control}
                                name="specimen_type"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <FormLabel className="text-right">Type of Specimen Collected:</FormLabel>
                                            <Select
                                                id="specimen_type"
                                                value={String(field.value ?? '')}
                                                onValueChange={(val) => {
                                                    form.setValue('specimen_type', Number(val) as 4 | 5);
                                                }}
                                            >
                                                <SelectTrigger className="w-[300px]">
                                                    <SelectValue placeholder="Please Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {specimenType.map((spec) => (
                                                        <SelectItem key={Number(spec.id)} value={String(spec.id)} id={String(spec.id)}>
                                                            {spec.specimen_description}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date_specimen_collected"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <FormLabel>Date Specimen Collected:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="w-auto border-2 border-black"
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
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date_sent_RITM"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <FormLabel>Date Specimen Sent to RITM or SNL:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="w-auto border-2 border-black"
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
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date_received_by_lab"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <FormLabel>Date Received by RITM or SNL:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="w-auto border-2 border-black"
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
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lab_result"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <FormLabel className="text-right">Result of Laboratory Test:</FormLabel>
                                            <Select
                                                id="lab_result"
                                                value={String(field.value ?? '')}
                                                onValueChange={(val) => {
                                                    form.setValue('lab_result', Number(val) as 1 | 2 | 21 | 22);
                                                }}
                                            >
                                                <SelectTrigger className="w-[300px]">
                                                    <SelectValue placeholder="Please Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {labResult.map((lab) => (
                                                        <SelectItem key={Number(lab.id)} value={String(lab.id)} id={String(lab.id)}>
                                                            {lab.lab_result_desc}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {lab_result === 1 ? (
                                <FormField
                                    control={form.control}
                                    name="typeoforganism"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="grid grid-cols-2 items-center gap-4">
                                                <FormLabel>(If Lab Result is positive) Type of Organism:</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="w-auto border-2 border-black"
                                                        type="text"
                                                        placeholder="Write here"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ) : (<FormField
                                control={form.control}
                                name="typeoforganism"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <FormLabel>(If Lab Result is positive) Type of Organism:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled
                                                    className="w-auto border-2 border-black"
                                                    type="text"
                                                    placeholder="Write here"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />)}
                            <FormField
                                control={form.control}
                                name="interpretation"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <FormLabel>Interpretation:</FormLabel>
                                            <FormControl className="flex items-center">
                                                <Input className="w-auto border-2 border-black" type="text" placeholder="Write here" {...field} />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type_test"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <FormLabel>Type of Test Conducted:</FormLabel>
                                            <Select
                                                id="type_test"
                                                value={String(field.value ?? '')}
                                                onValueChange={(val) => {
                                                    form.setValue('type_test', Number(val) as 4 | 5);
                                                }}
                                            >
                                                <SelectTrigger className="w-[300px]">
                                                    <SelectValue placeholder="Please Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {testType.map((test) => (
                                                        <SelectItem key={Number(test.id)} value={String(test.id)} id={String(test.id)}>
                                                            {test.test_description}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-center">
                                <Button className="bg-blue-500 text-white hover:bg-blue-600" type="submit">
                                    Update Laboratory Data
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}
