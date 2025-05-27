import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radiogroup';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router, usePage } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { ConsultationForm, consultationFormSchema } from './data/schema';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Add Patient Consultation',
        href: '/consultation',
    },
];

export default function create() {
    const { patient_number } = usePage().props;

    const pat_number = patient_number.map((p)=>p.patient_number);


    const form = useForm<ConsultationForm({
        resolver: zodResolver(consultationFormSchema),
        defaultValues: {
            // case_id: '',
            patient_number: pat_number[0] as string,
           
        },
    });

    function onSubmit(values: consultationForm) {
        const payload = { ...values };

       

        router.post('/consultation', payload, {
            onSuccess: () => {
                form.reset();
            },
            onError: (errors) => {
                console.log('Validation failed:', errors);
            },
        });
    }

    // const admitted = form.watch('admitted');
    // const date_report = form.watch('date_report');
    // const date_investigation = form.watch('date_investigation');
    // const diphtheria_dose = form.watch('diphtheria_dose');
    // const travel14days = form.watch('travel14days');
    // const other_symptoms = form.watch('other_symptoms');
    // const outcome = form.watch('outcome');
    // const antibiotic = form.watch('antibiotic');
    // const diphtheriatoxin = form.watch('diphtheriatoxin');

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
                                <b>FORM</b>
                            </h1>
                            <div className="flex flex-row items-start gap-x-16">
                                <FormField
                                    control={form.control}
                                    name="admitted"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-start gap-x-8">
                                                <div className="flex flex-col">
                                                    <FormLabel className="mb-1">Patient Number:</FormLabel>
                                                </div>
                                                <RadioGroup
                                                    value={form.watch('admitted') ?? ''}
                                                    onValueChange={(val) => form.setValue('admitted', val as 'Y' | 'N')}
                                                    className="flex flex-row space-x-4"
                                                >
                                                    {['Y', 'N'].map((option) => (
                                                        <FormItem key={option} className="flex items-center space-x-2">
                                                            <FormControl>
                                                                <RadioGroupItem value={option} id={option} />
                                                            </FormControl>
                                                            <FormLabel htmlFor={option}>{option === 'Y' ? 'Yes' : 'No'}</FormLabel>
                                                        </FormItem>
                                                    ))}
                                                </RadioGroup>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {admitted === 'Y' ? (
                                    <FormField
                                        control={form.control}
                                        name="date_admitted"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">Date Admitted:</FormLabel>
                                                    </div>
                                                    <FormControl>
                                                        <Input
                                                            className="w-full border-2 border-black"
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
                                ) : (
                                    <FormField
                                        control={form.control}
                                        name="date_admitted"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">Date Admitted:</FormLabel>
                                                    </div>
                                                    <FormControl>
                                                        <Input
                                                            disabled
                                                            className="w-full border-2 border-black"
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
                                )}

                                <FormField
                                    control={form.control}
                                    name="outcome"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-start gap-x-8">
                                                <div className="flex flex-col">
                                                    <FormLabel className="mb-1">Outcome of the Patient:</FormLabel>
                                                    <FormDescription>
                                                        Select from either <strong>Alive</strong>, <strong>Dead</strong>, or{' '}
                                                        <strong>Home Against Medical Advice</strong>
                                                    </FormDescription>
                                                </div>

                                                <RadioGroup
                                                    value={form.watch('outcome') ?? ''}
                                                    onValueChange={(val) => form.setValue('outcome', Number(val) as 1 | 2 | 3)}
                                                    className="flex flex-row space-x-4"
                                                >
                                                    {(
                                                        [
                                                            { label: 'Alive', value: 1 },
                                                            { label: 'Died', value: 2 },
                                                            { label: 'Home Against Medical Advice', value: 3 },
                                                        ] as const
                                                    ).map((option) => (
                                                        <FormItem key={option.value} className="flex items-center space-x-2">
                                                            <FormControl>
                                                                <RadioGroupItem value={option.value} id={option.value} />
                                                            </FormControl>
                                                            <FormLabel htmlFor={option.value}>{option.label}</FormLabel>
                                                        </FormItem>
                                                    ))}
                                                </RadioGroup>
                                            </div>
                                            <FormMessage /> {/* Shows validation errors if any */}
                                        </FormItem>
                                    )}
                                />
                                {Number(outcome) === 2 ? (
                                    <FormField
                                        control={form.control}
                                        name="datedied"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">Date Died of Illness:</FormLabel>
                                                    </div>
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
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                ) : (
                                    <FormField
                                        control={form.control}
                                        name="datedied"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">Date Died of Illness:</FormLabel>
                                                    </div>
                                                    <FormControl>
                                                        <Input
                                                            disabled
                                                            className="w-38 min-w-[38px] flex-shrink-0 border-2 border-black"
                                                            type="date"
                                                            min="1925-01-01"
                                                            value={''}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </div>
                            <Separator />
                            
                            {/* 4th Column */}
                            <div className="flex flex-row items-start gap-x-32">
                                <FormField
                                    control={form.control}
                                    name="date_investigation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Date of Investigation:</FormLabel>
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
                                {date_investigation !== '' ? (
                                    <div className="flex flex-row items-start gap-x-32">
                                        <FormField
                                            control={form.control}
                                            name="investigator"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name of Investigator:</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} className="min-w-149 border-2 border-black" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="investigator_no"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Investigator Contact Number:</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} className="min-w-149 border-2 border-black" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                ) : (
                                    <div className="flex flex-row items-start gap-x-32">
                                        <FormField
                                            control={form.control}
                                            name="investigator"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name of Investigator:</FormLabel>
                                                    <FormControl>
                                                        <Input disabled {...field} className="min-w-149 border-2 border-black" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="investigator_no"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Investigator Contact Number:</FormLabel>
                                                    <FormControl>
                                                        <Input disabled {...field} className="min-w-149 border-2 border-black" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}
                            </div>
                            <Separator />
                            <h1 className="mt-10">
                                <b>BACKGROUND INFORMATION</b>
                            </h1>
                           
                          
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
