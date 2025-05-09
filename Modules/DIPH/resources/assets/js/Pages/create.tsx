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
import { Head } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { UserForm, userFormSchema } from './data/schema';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Add Diphtheria Case',
        href: '/diph/create',
    },
];

export default function create() {
    const form = useForm<UserForm>({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            admitted: 'Y',
            date_admitted: '2025-12-12',
            caregiver: 'John Doe',
            caregiver_no: '09987654321',
            date_report: '2025-12-12',
            reporter: 'John Doe',
            reporter_no: '09987654321',
            date_investigation: '2025-12-12',
            investigator: 'John Doe',
            investigator_no: '09987654321',
            diphtheria_dose: 'Y',
            total_dose: 2,
            date_last_vaccination: '2025-12-12',
            sourceinformation: 2,
            known_exposure: 1,
            exposure_other: '',
            name_school: '',
            travel14days: 'Y',
            travel_detail: 'Sample',
            date_onset: '2025-12-12',
            fever: 'Y',
            cough: 'Y',
            sorethroat: 'Y',
            pseudomembrane: 'Y',
            swallowing: 'Y',
            breathing: 'Y',
            other_symptoms: 'Y',
            other_symptoms_specify: 'Sample',
            outcome: 2,
            datedied: '2025-12-12',
            antibiotic: 'Y',
            antibiotic_date: '2025-12-12',
            diphtheriatoxin: 'Y',
            diphtheriatoxin_date: '2025-12-12',
            final_classi: 1,
        },
    });

    function onSubmit(values: UserForm) {
        const payload = { ...values };

        if (payload.admitted === 'N') {
            payload.date_admitted = '';
        }
        if (payload.outcome !== 2) {
            payload.datedied === '';
        }
        if (payload.date_report === '') {
            payload.reporter = '';
            payload.reporter_no = '';
        }
        if (payload.date_investigation === '') {
            payload.investigator = '';
            payload.investigator_no = '';
        }
        if (payload.diphtheria_dose === 'N') {
            payload.total_dose = undefined;
            payload.date_last_vaccination = '';
            payload.sourceinformation = undefined;
        }
        if (payload.travel14days === 'N') {
            payload.travel_detail = '';
        }
        if (payload.other_symptoms === 'N') {
            payload.other_symptoms_specify = '';
        }
        if (payload.antibiotic === 'N') {
            payload.antibiotic_date = '';
        }
        if (payload.diphtheriatoxin === 'N') {
            payload.diphtheriatoxin_date = '';
        }
        console.log(payload);

        // router.post('/diph', payload, {
        //     onSuccess: () => {
        //         toast('User is successfully registered!');
        //         form.reset();
        //     },
        //     onError: (errors) => {
        //         console.log('Validation failed:', errors);
        //     },
        // });
    }

    const admitted = form.watch('admitted');
    const date_report = form.watch('date_report');
    const date_investigation = form.watch('date_investigation');
    const diphtheria_dose = form.watch('diphtheria_dose');
    const travel14days = form.watch('travel14days');
    const other_symptoms = form.watch('other_symptoms');
    const outcome = form.watch('outcome');
    const antibiotic = form.watch('antibiotic');
    const diphtheriatoxin = form.watch('diphtheriatoxin');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Diphtheria Case" />
            <div className="overflow-x flex w-full space-y-4 p-4">
                <div className="flex w-full flex-row justify-start">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                                    <FormLabel className="mb-1">Patient Admitted:</FormLabel>
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
                            {/* 2nd Column */}
                            <div className="flex flex-row items-start gap-x-32">
                                <FormField
                                    control={form.control}
                                    name="caregiver"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name of parent/caregiver:</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Write here..." className="min-w-149 border-2 border-black" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="caregiver_no"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Parent/caregiver contact number:</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Write here..." className="min-w-149 border-2 border-black" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Separator />
                            {/* 3rd Column */}
                            <div className="flex flex-row items-start gap-x-32">
                                <FormField
                                    control={form.control}
                                    name="date_report"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Date of Report:</FormLabel>
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
                                {date_report !== '' ? (
                                    <div className="flex flex-row items-start gap-x-32">
                                        <FormField
                                            control={form.control}
                                            name="reporter"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name of Reporter:</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} className="min-w-149 border-2 border-black" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="reporter_no"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Reporter Contact Number:</FormLabel>
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
                                            name="reporter"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name of Reporter:</FormLabel>
                                                    <FormControl>
                                                        <Input disabled {...field} className="min-w-149 border-2 border-black" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="reporter_no"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Reporter Contact Number:</FormLabel>
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
                            {/* 5th Column */}
                            <div className="flex flex-row items-start gap-x-32">
                                <FormField
                                    control={form.control}
                                    name="diphtheria_dose"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-start gap-x-8">
                                                <div className="flex flex-col">
                                                    <FormLabel className="mb-1">
                                                        Diphtheria-containing vaccine doses{' '}
                                                        <div className="text-red-500">
                                                            <b>*</b>
                                                        </div>
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Select <strong>Yes</strong> if they have received it, or <strong>No</strong> if they haven't.
                                                    </FormDescription>
                                                </div>

                                                <RadioGroup
                                                    value={form.watch('diphtheria_dose') ?? ''}
                                                    onValueChange={(val) => form.setValue('diphtheria_dose', val as 'Y' | 'N')}
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
                                            <FormMessage /> {/* Shows validation errors if any */}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="known_exposure"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-start gap-x-8">
                                                <div className="flex flex-col">
                                                    <FormLabel className="mb-1">
                                                        Known Exposure{' '}
                                                        <div className="text-red-500">
                                                            <b>*</b>
                                                        </div>
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Select from either <strong>Confirmed Case</strong>, <strong>Probable Case</strong>,{' '}
                                                        <strong>Carrier</strong>, <strong>International Traveler</strong> or <strong>Unknown</strong>.
                                                    </FormDescription>
                                                </div>
                                                <Select
                                                    value={form.watch('known_exposure')}
                                                    onValueChange={(val) => {
                                                        form.setValue('known_exposure', Number(val) as 1 | 2 | 3 | 4);
                                                        console.log(typeof form.getValues('known_exposure'));
                                                    }}
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Please Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {(
                                                            [
                                                                { label: 'Confirmed Case', value: 1 },
                                                                { label: 'Probable Case', value: 2 },
                                                                { label: 'Carrier', value: 3 },
                                                                { label: 'International Traveler', value: 4 },
                                                            ] as const
                                                        ).map((option) => (
                                                            <FormItem key={option.value} className="flex items-center space-x-2">
                                                                <FormControl>
                                                                    <SelectItem value={option.value} id={option.value}>
                                                                        {option.label}
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
                            <Separator />
                            <h4>
                                <b>If given diphtheria-containing vaccine doses</b>
                            </h4>
                            {/* {6th Column} */}
                            {diphtheria_dose === 'Y' ? (
                                <div className="flex flex-row items-start gap-x-32">
                                    <FormField
                                        control={form.control}
                                        name="total_dose"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">
                                                            Number of total doses Diphtheria-containing vaccine{' '}
                                                            <div className="text-red-500">
                                                                <b>*</b>
                                                            </div>
                                                        </FormLabel>
                                                        <FormDescription>
                                                            Select from either <strong>None</strong>, <strong>1</strong>, <strong>2</strong>,{' '}
                                                            <strong>3</strong> or <strong>Unknown</strong>.
                                                        </FormDescription>
                                                    </div>

                                                    <RadioGroup
                                                        value={form.watch('total_dose') ?? ''}
                                                        onValueChange={(val) => form.setValue('total_dose', val as 'None' | 1 | 2 | 3 | 'Unknown')}
                                                        className="flex flex-row space-x-4"
                                                    >
                                                        {['None', 1, 2, 3, 'Unknown'].map((option) => (
                                                            <FormItem key={option} className="flex items-center space-x-2">
                                                                <FormControl>
                                                                    <RadioGroupItem value={option} id={option} />
                                                                </FormControl>
                                                                <FormLabel htmlFor={option}>{option}</FormLabel>
                                                            </FormItem>
                                                        ))}
                                                    </RadioGroup>
                                                </div>
                                                <FormMessage /> {/* Shows validation errors if any */}
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="date_last_vaccination"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">
                                                            Date of last vaccination{' '}
                                                            <div className="text-red-500">
                                                                <b>*</b>
                                                            </div>
                                                        </FormLabel>
                                                    </div>
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
                                </div>
                            ) : (
                                <div className="flex flex-row items-start gap-x-32">
                                    <FormField
                                        control={form.control}
                                        name="total_dose"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">
                                                            Number of total doses Diphtheria-containing vaccine{' '}
                                                            <div className="text-red-500">
                                                                <b>*</b>
                                                            </div>
                                                        </FormLabel>
                                                        <FormDescription>
                                                            Select from either <strong>None</strong>, <strong>1</strong>, <strong>2</strong>,{' '}
                                                            <strong>3</strong> or <strong>Unknown</strong>.
                                                        </FormDescription>
                                                    </div>

                                                    <RadioGroup
                                                        disabled
                                                        value={form.watch('total_dose') ?? ''}
                                                        onValueChange={(val) => form.setValue('total_dose', val as 'None' | 1 | 2 | 3 | 'Unknown')}
                                                        className="flex flex-row space-x-4"
                                                    >
                                                        {['None', 1, 2, 3, 'Unknown'].map((option) => (
                                                            <FormItem key={option} className="flex items-center space-x-2">
                                                                <FormControl>
                                                                    <RadioGroupItem value={option} id={option} />
                                                                </FormControl>
                                                                <FormLabel htmlFor={option}>{option}</FormLabel>
                                                            </FormItem>
                                                        ))}
                                                    </RadioGroup>
                                                </div>
                                                <FormMessage /> {/* Shows validation errors if any */}
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="date_last_vaccination"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">
                                                            Date of last vaccination{' '}
                                                            <div className="text-red-500">
                                                                <b>*</b>
                                                            </div>
                                                        </FormLabel>
                                                    </div>
                                                    <FormControl>
                                                        <Input
                                                            disabled
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
                                </div>
                            )}
                            <Separator />
                            {/* 7th Column */}
                            {diphtheria_dose === 'Y' ? (
                                <FormField
                                    control={form.control}
                                    name="sourceinformation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-start gap-x-8">
                                                <div className="flex flex-col">
                                                    <FormLabel className="mb-1">
                                                        Source of Information{' '}
                                                        <div className="text-red-500">
                                                            <b>*</b>
                                                        </div>
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Select from either <strong>Card</strong>, <strong>Recall</strong>, or <strong>TCL</strong>
                                                    </FormDescription>
                                                </div>

                                                <RadioGroup
                                                    value={form.watch('sourceinformation') ?? ''}
                                                    onValueChange={(val) => form.setValue('sourceinformation', Number(val) as 1 | 2 | 3)}
                                                    className="flex flex-row space-x-4"
                                                >
                                                    {(
                                                        [
                                                            { label: 'CARD', value: 1 },
                                                            { label: 'RECALL', value: 2 },
                                                            { label: 'TCL', value: 3 },
                                                        ] as const
                                                    ).map((option) => (
                                                        <FormItem key={option.value} className="flex items-center space-x-2">
                                                            <FormControl>
                                                                <RadioGroupItem value={option.value} id={option.value} />
                                                            </FormControl>
                                                            <FormLabel htmlFor={option.value}>
                                                                {option.label === 'TCL'
                                                                    ? option.label
                                                                    : option.label.charAt(0).toUpperCase() + option.label.slice(1).toLowerCase()}
                                                            </FormLabel>
                                                        </FormItem>
                                                    ))}
                                                </RadioGroup>
                                            </div>
                                            <FormMessage /> {/* Shows validation errors if any */}
                                        </FormItem>
                                    )}
                                />
                            ) : (
                                <FormField
                                    control={form.control}
                                    name="sourceinformation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-start gap-x-8">
                                                <div className="flex flex-col">
                                                    <FormLabel className="mb-1">
                                                        Source of Information{' '}
                                                        <div className="text-red-500">
                                                            <b>*</b>
                                                        </div>
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Select from either <strong>Card</strong>, <strong>Recall</strong>, or <strong>TCL</strong>
                                                    </FormDescription>
                                                </div>

                                                <RadioGroup
                                                    disabled
                                                    value={form.watch('sourceinformation') ?? ''}
                                                    onValueChange={(val) => form.setValue('sourceinformation', Number(val) as 1 | 2 | 3)}
                                                    className="flex flex-row space-x-4"
                                                >
                                                    {(
                                                        [
                                                            { label: 'CARD', value: 1 },
                                                            { label: 'RECALL', value: 2 },
                                                            { label: 'TCL', value: 3 },
                                                        ] as const
                                                    ).map((option) => (
                                                        <FormItem key={option.value} className="flex items-center space-x-2">
                                                            <FormControl>
                                                                <RadioGroupItem value={option.value} id={option.value} />
                                                            </FormControl>
                                                            <FormLabel htmlFor={option.value}>
                                                                {option.label === 'TCL'
                                                                    ? option.label
                                                                    : option.label.charAt(0).toUpperCase() + option.label.slice(1).toLowerCase()}
                                                            </FormLabel>
                                                        </FormItem>
                                                    ))}
                                                </RadioGroup>
                                            </div>
                                            <FormMessage /> {/* Shows validation errors if any */}
                                        </FormItem>
                                    )}
                                />
                            )}
                            <Separator />
                            {/* 8th Column */}
                            <div className="flex flex-row items-start gap-x-10">
                                <FormField
                                    control={form.control}
                                    name="exposure_other"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Other means of exposure</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} placeholder="Write here..." className="min-w-149 border-2 border-black" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="name_school"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>School name, if applicable</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} placeholder="Write here..." className="min-w-149 border-2 border-black" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Separator />
                            {/* 9th Column */}
                            <div className="flex flex-row items-start gap-x-40">
                                <FormField
                                    control={form.control}
                                    name="travel14days"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-start gap-x-8">
                                                <div className="flex flex-col">
                                                    <FormLabel className="mb-1">
                                                        Any travel within 14 days before onset of illness{' '}
                                                        <div className="text-red-500">
                                                            <b>*</b>
                                                        </div>
                                                    </FormLabel>
                                                </div>

                                                <RadioGroup
                                                    value={form.watch('travel14days') ?? ''}
                                                    onValueChange={(val) => form.setValue('travel14days', val as 'Y' | 'N')}
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
                                            <FormMessage /> {/* Shows validation errors if any */}
                                        </FormItem>
                                    )}
                                />
                                {/* Will only appear if travel_detail has a value */}
                                {travel14days === 'Y' ? (
                                    <FormField
                                        control={form.control}
                                        name="travel_detail"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1 w-full">
                                                            If yes, where (in detail){' '}
                                                            <div className="text-red-500">
                                                                <b>*</b>
                                                            </div>
                                                        </FormLabel>
                                                    </div>
                                                    <FormControl>
                                                        <Textarea {...field} placeholder="Write here..." className="min-w-100 border-2 border-black" />
                                                    </FormControl>
                                                </div>
                                                <FormMessage /> {/* Shows validation errors if any */}
                                            </FormItem>
                                        )}
                                    />
                                ) : (
                                    <FormField
                                        control={form.control}
                                        name="travel_detail"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1 w-full">
                                                            If yes, where (in detail){' '}
                                                            <div className="text-red-500">
                                                                <b>*</b>
                                                            </div>
                                                        </FormLabel>
                                                    </div>
                                                    <FormControl>
                                                        <Textarea disabled {...field} placeholder="Write here..." className="min-w-100 border-2 border-black" />
                                                    </FormControl>
                                                </div>
                                                <FormMessage /> {/* Shows validation errors if any */}
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </div>
                            <h4 className="mt-10">
                                <b>CLINICAL DETAILS:</b>
                            </h4>
                            {/* 10th Column */}
                            <div className="flex flex-row items-start gap-x-12">
                                <FormField
                                    control={form.control}
                                    name="date_onset"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-start gap-x-8">
                                                <div className="flex flex-col">
                                                    <FormLabel className="mb-1">
                                                        Date onset of symptoms{' '}
                                                        <div className="text-red-500">
                                                            <b>*</b>
                                                        </div>
                                                    </FormLabel>
                                                </div>
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
                                <FormLabel>Check Signs/Symptoms which apply:</FormLabel>
                                {[
                                    { id: 'fever', label: 'Fever' },
                                    { id: 'cough', label: 'Cough' },
                                    { id: 'sorethroat', label: 'Sore Throat' },
                                    { id: 'pseudomembrane', label: 'Pseudomembrane' },
                                    { id: 'swallowing', label: 'Swallowing' },
                                    { id: 'breathing', label: 'Breathing' },
                                    { id: 'other_symptoms', label: 'Other Symptoms' },
                                ].map((option) => (
                                    <FormField
                                        className="bg-neutral-500"
                                        key={option.id}
                                        control={form.control}
                                        name={option.id as any}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value === 'Y'}
                                                        onCheckedChange={(checked) => field.onChange(checked ? 'Y' : 'N')}
                                                        className="rounded-sm border-2 border-black"
                                                    />
                                                </FormControl>
                                                <FormLabel className="text-sm leading-none font-medium">{option.label}</FormLabel>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                            <Separator />
                            {/* 11th column */}
                            <div className="flex flex-grow flex-row items-start gap-x-22">
                                {other_symptoms === 'Y' ? (
                                    <FormField
                                        control={form.control}
                                        name="other_symptoms_specify"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">Other symptoms, specify</FormLabel>
                                                    </div>
                                                    <FormControl>
                                                        <Input className="border-2 border-black" type="text" placeholder="Write here..." {...field} />
                                                    </FormControl>
                                                </div>
                                                <FormMessage /> {/* Shows validation errors if any */}
                                            </FormItem>
                                        )}
                                    />
                                ) : (
                                    <FormField
                                        control={form.control}
                                        name="other_symptoms_specify"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">Other symptoms, specify</FormLabel>
                                                    </div>
                                                    <FormControl>
                                                        <Input
                                                            className="border-2 border-black"
                                                            disabled
                                                            type="text"
                                                            placeholder="Write here..."
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <FormMessage /> {/* Shows validation errors if any */}
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </div>
                            <h4 className="pt-10">
                                <b>TREATMENT INFORMATION</b>
                            </h4>
                            {/* 12th Column */}
                            <div className="flex flex-grow flex-row items-start gap-x-22">
                                <FormField
                                    control={form.control}
                                    name="antibiotic"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-start gap-x-8">
                                                <div className="flex flex-col">
                                                    <FormLabel className="mb-1">Administered antibiotic therapy?:</FormLabel>
                                                </div>
                                                <RadioGroup
                                                    value={form.watch('antibiotic') ?? ''}
                                                    onValueChange={(val) => form.setValue('antibiotic', val as 'Y' | 'N')}
                                                    className="flex flex-row space-x-4"
                                                >
                                                    {(
                                                        [
                                                            { label: 'Yes', value: 'Y' },
                                                            { label: 'No', value: 'N' },
                                                        ] as const
                                                    ).map((option) => (
                                                        <FormItem key={String(option.value)} className="flex items-center space-x-2">
                                                            <FormControl>
                                                                <RadioGroupItem value={String(option.value)} id={String(option.value)} />
                                                            </FormControl>
                                                            <FormLabel htmlFor={String(option.value)}>{option.label}</FormLabel>
                                                        </FormItem>
                                                    ))}
                                                </RadioGroup>
                                            </div>
                                            <FormMessage /> {/* Shows validation errors if any */}
                                        </FormItem>
                                    )}
                                />
                                {antibiotic === 'Y' ? (
                                    <FormField
                                        control={form.control}
                                        name="antibiotic_date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">If yes, date</FormLabel>
                                                    </div>
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
                                ) : (
                                    <FormField
                                        control={form.control}
                                        name="antibiotic_date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">If yes, date</FormLabel>
                                                    </div>
                                                    <FormControl>
                                                        <Input
                                                            disabled
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
                                )}
                                <FormField
                                    control={form.control}
                                    name="diphtheriatoxin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-start gap-x-8">
                                                <div className="flex flex-col">
                                                    <FormLabel className="mb-1">Administered Diphtheria Anti toxin (DAT) therapy:</FormLabel>
                                                </div>
                                                <RadioGroup
                                                    value={form.watch('diphtheriatoxin') ?? ''}
                                                    onValueChange={(val) => form.setValue('diphtheriatoxin', val as 'Y' | 'N')}
                                                    className="flex flex-row space-x-4"
                                                >
                                                    {(
                                                        [
                                                            { label: 'Yes', value: 'Y' },
                                                            { label: 'No', value: 'N' },
                                                        ] as const
                                                    ).map((option) => (
                                                        <FormItem key={String(option.value)} className="flex items-center space-x-2">
                                                            <FormControl>
                                                                <RadioGroupItem value={String(option.value)} id={String(option.value)} />
                                                            </FormControl>
                                                            <FormLabel htmlFor={String(option.value)}>{option.label}</FormLabel>
                                                        </FormItem>
                                                    ))}
                                                </RadioGroup>
                                            </div>
                                            <FormMessage /> {/* Shows validation errors if any */}
                                        </FormItem>
                                    )}
                                />
                                {diphtheriatoxin === 'Y' ? (
                                    <FormField
                                        control={form.control}
                                        name="diphtheriatoxin_date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">If yes, date</FormLabel>
                                                    </div>
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
                                ) : (
                                    <FormField
                                        control={form.control}
                                        name="diphtheriatoxin_date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">If yes, date</FormLabel>
                                                    </div>
                                                    <FormControl>
                                                        <Input
                                                            disabled
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
                                )}
                            </div>
                            {/* <h4 className="mt-10">
                                <b>SPECIMEN COLLECTION for Corynebacterium diphtheriae</b>
                            </h4> */}
                            {/* 13th Column */}
                            {/* 14th Column */}
                            {/* 15th Column */}
                            <Separator />
                            <div className="flex flex-grow flex-row items-start gap-x-22">
                                <FormField
                                    control={form.control}
                                    name="final_classi"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-start gap-x-8">
                                                <div className="flex flex-col">
                                                    <FormLabel className="mb-1">
                                                        <h4>
                                                            <b>FINAL CLASSIFICATION</b>
                                                        </h4>
                                                    </FormLabel>
                                                </div>
                                                <RadioGroup
                                                    value={form.watch('final_classi') ?? ''}
                                                    onValueChange={(val) => form.setValue('final_classi', Number(val) as 1 | 2 | 3 | 4 | 5)}
                                                    className="flex flex-row space-x-4"
                                                >
                                                    {(
                                                        [
                                                            { label: 'Suspect Case', value: 1 },
                                                            { label: 'Laboratory Confirmed', value: 2 },
                                                            { label: 'Epidemiologically Linked', value: 3 },
                                                            { label: 'Clinically Compatible', value: 4 },
                                                            { label: 'Discarded', value: 5 },
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
                            </div>
                            <div className="flex justify-center">
                                <Button className="bg-blue-500 text-white hover:bg-blue-600" type="submit">
                                    Register User
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}
