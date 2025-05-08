import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radiogroup';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { UserForm, userFormSchema } from './data/schema';
import React from 'react';

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
            diphtheria_dose: undefined,
            total_dose: undefined,
            date_last_vaccination: undefined,
            known_exposure: undefined,
            exposure_other: '',
            name_school: '',
            travel14days: undefined,
            travel_detail: '',
            date_onset: undefined,
            fever: undefined,
            cough: undefined,
            sorethroat: undefined,
            pseudomembrane: undefined,
            swallowing: undefined,
            breathing: undefined,
            other_symptoms: undefined,
            other_symptoms_specify: undefined,
            outcome: undefined,
            datedied: undefined,
            antibiotic: undefined,
            antibiotic_date: undefined,
            final_classi: undefined,
        },
    });

    function onSubmit(values: UserForm) {
        const payload = values;

        router.post('/diph', payload, {
            onSuccess: () => {
                toast('User is successfully registered!');
                form.reset();
            },
            onError: (errors) => {
                console.log('Validation failed:', errors);
            },
        });
    }

    const diphtheria_dose = form.watch('diphtheria_dose');
    const travel14days = form.watch('travel14days');
    const other_symptoms = form.watch('other_symptoms');
    const outcome = form.watch('outcome');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Diphtheria Case" />
            <div className="w-full space-y-4 p-4">
                <div className="flex w-full flex-row justify-start">
                    <div className="align-start flex w-full max-w-full flex-col space-y-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <h1>
                                    <b>CLINICAL DETAILS</b>
                                </h1>
                                {/* 1st Column */}
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
                                                            Select <strong>Yes</strong> if they have received it, or <strong>No</strong> if they
                                                            haven't.
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
                                                            <strong>Carrier</strong>, <strong>International Traveler</strong> or{' '}
                                                            <strong>Unknown</strong>.
                                                        </FormDescription>
                                                    </div>
                                                    <Select
                                                        value={form.watch('known_exposure')}
                                                        onValueChange={(val) => {
                                                            form.setValue('known_exposure', val as 1 | 2 | 3 | 4);
                                                            console.log(form.getValues('known_exposure'));
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
                                                                <FormItem key={String(option.value)} className="flex items-center space-x-2">
                                                                    <FormControl>
                                                                        <SelectItem value={String(option.value)} id={String(option.value)}>
                                                                            {option.label}
                                                                        </SelectItem>
                                                                    </FormControl>
                                                                </FormItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {/* Optional Column. Diphtheria dose response must be Yes before this appears. */}
                                {diphtheria_dose === 'Y' && (
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
                                                            onValueChange={(val) =>
                                                                form.setValue('total_dose', val as 'None' | 1 | 2 | 3 | 'Unknown')
                                                            }
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
                                                                className="w-auto"
                                                                type="date"
                                                                min="1925-01-01"
                                                                value={field.value}
                                                                onChange={field.onValueChange}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}
                                {/* Optional Column - part 2. Diphtheria dose response must be Yes before this appears. */}
                                {diphtheria_dose === 'Y' && (
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
                                                        onValueChange={(val) => form.setValue('sourceinformation', val as 1 | 2 | 3)}
                                                        className="flex flex-row space-x-4"
                                                    >
                                                        {(
                                                            [
                                                                { label: 'CARD', value: 1 },
                                                                { label: 'RECALL', value: 2 },
                                                                { label: 'TCL', value: 3 },
                                                            ] as const
                                                        ).map((option) => (
                                                            <FormItem key={String(option.value)} className="flex items-center space-x-2">
                                                                <FormControl>
                                                                    <RadioGroupItem value={String(option.value)} id={String(option.value)} />
                                                                </FormControl>
                                                                <FormLabel htmlFor={String(option.value)}>
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
                                {/* 2nd Column */}
                                <div className="flex flex-row items-start gap-x-10">
                                    <FormField
                                        control={form.control}
                                        name="exposure_other"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Other means of exposure</FormLabel>
                                                <FormControl>
                                                    <Textarea {...field} placeholder="Write here..." className="min-w-149" />
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
                                                    <Textarea {...field} placeholder="Write here..." className="min-w-149" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {/* 3rd Column */}
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
                                    {travel14days === 'Y' && (
                                        <FormField
                                            control={form.control}
                                            name="travel_detail"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex w-full items-start gap-x-8">
                                                        <div className="flex flex-col">
                                                            <FormLabel className="mb-1">
                                                                If yes, where (in detail){' '}
                                                                <div className="text-red-500">
                                                                    <b>*</b>
                                                                </div>
                                                            </FormLabel>
                                                        </div>
                                                        <FormControl>
                                                            <Textarea {...field} placeholder="Write here..." className="min-w-100" />
                                                        </FormControl>
                                                    </div>
                                                    <FormMessage /> {/* Shows validation errors if any */}
                                                </FormItem>
                                            )}
                                        />
                                    )}
                                </div>
                                <h4>
                                    <b>Check Signs / Symptoms which apply:</b>
                                </h4>
                                {/* 4th Column */}
                                <div className="flex flex-row items-start gap-x-32">
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
                                                            className="w-auto"
                                                            type="date"
                                                            min="1925-01-01"
                                                            value={field.value}
                                                            onChange={field.onValueChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="fever"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">Fever</FormLabel>
                                                    </div>

                                                    <RadioGroup
                                                        value={form.watch('fever') ?? ''}
                                                        onValueChange={(val) => form.setValue('fever', val as 'Y' | 'N')}
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
                                        name="cough"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">Cough</FormLabel>
                                                    </div>

                                                    <RadioGroup
                                                        value={form.watch('cough') ?? ''}
                                                        onValueChange={(val) => form.setValue('cough', val as 'Y' | 'N')}
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
                                        name="sorethroat"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">Sore Throat</FormLabel>
                                                    </div>

                                                    <RadioGroup
                                                        value={form.watch('sorethroat') ?? ''}
                                                        onValueChange={(val) => form.setValue('sorethroat', val as 'Y' | 'N')}
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
                                </div>
                                {/* 5th Column */}
                                <div className="flex flex-row items-start gap-x-32">
                                    <FormField
                                        control={form.control}
                                        name="pseudomembrane"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">Pseudomembrane</FormLabel>
                                                    </div>

                                                    <RadioGroup
                                                        value={form.watch('pseudomembrane') ?? ''}
                                                        onValueChange={(val) => form.setValue('pseudomembrane', val as 'Y' | 'N')}
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
                                        name="swallowing"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">Difficulty of swallowing</FormLabel>
                                                    </div>

                                                    <RadioGroup
                                                        value={form.watch('swallowing') ?? ''}
                                                        onValueChange={(val) => form.setValue('swallowing', val as 'Y' | 'N')}
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
                                        name="breathing"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">Difficulty of breathing</FormLabel>
                                                    </div>

                                                    <RadioGroup
                                                        value={form.watch('breathing') ?? ''}
                                                        onValueChange={(val) => form.setValue('breathing', val as 'Y' | 'N')}
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
                                        name="other_symptoms"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">Other</FormLabel>
                                                    </div>

                                                    <RadioGroup
                                                        value={form.watch('other_symptoms') ?? ''}
                                                        onValueChange={(val) => form.setValue('other_symptoms', val as 'Y' | 'N')}
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
                                </div>
                                {/* 6th column */}
                                <div className="flex flex-row items-start gap-x-32">
                                    {other_symptoms === 'Y' && (
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
                                                            <Input type="text" placeholder="Write here..." {...field} />
                                                        </FormControl>
                                                    </div>
                                                    <FormMessage /> {/* Shows validation errors if any */}
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
                                                        <FormLabel className="mb-1">
                                                        Outcome of the Patient
                                                        </FormLabel>
                                                        <FormDescription>
                                                            Select from either <strong>Alive</strong>, <strong>Dead</strong>, or <strong>Home Against Medical Advice</strong>
                                                        </FormDescription>
                                                    </div>

                                                    <RadioGroup
                                                        value={form.watch('outcome') ?? ''}
                                                        onValueChange={(val) => form.setValue('outcome', val as 1 | 2 | 3)}
                                                        className="flex flex-row space-x-4"
                                                    >
                                                        {(
                                                            [
                                                                { label: 'Alive', value: 1 },
                                                                { label: 'Died', value: 2 },
                                                                { label: 'Home Against Medical Advice', value: 3 },
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
                                    {outcome === 2 && (
                                        <FormField
                                        control={form.control}
                                        name="datedied"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">
                                                        Date Died of Illness
                                                        </FormLabel>
                                                    </div>
                                                    <FormControl>
                                                        <Input
                                                            className="w-auto"
                                                            type="date"
                                                            min="1925-01-01"
                                                            value={field.value}
                                                            onChange={field.onValueChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    )}
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
            </div>
        </AppLayout>
    );
}
