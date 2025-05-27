import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PatientForm, patientFormSchema } from './data/schema';

interface Patient {
    id: number,
    firstname: string | '',
    middlename: string | '',
    lastname: string | '',
    suffixname: string | '',
    sex: 'M' | 'F' | undefined,
    dateofbirth: string | undefined,
    ageinyears: number,
    ageinmonths: number,
    ageindays: number,
    member_of_IP: undefined,
    IP_tribe: number | undefined,
    IP_tribe_specify: string | '',
    pat_address_reg: string | '',
    pat_address_prov: string | '',
    pat_address_city: string | '',
    pat_address_brgy: string | '',
    pat_address_street_name: string | '',
    pat_perm_address_reg: string | '',
    pat_perm_address_prov: string | '',
    pat_perm_address_city: string | '',
    pat_perm_address_brgy: string | '',
    pat_perm_address_street_name: string | '',
    facilityname: string | '',
    occupation: string | '',
    phone_no: string | '',
}

export default function edit({ provinces, regions, citymuns }) {
    const { patient } = usePage().props;

    const patient_data = patient as Patient;

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
            title: 'Edit Patient Data',
            href: `/diph/patient/${patient_data.id}/edit`,
        },
    ];

    const form = useForm<PatientForm>({
        resolver: zodResolver(patientFormSchema),
        defaultValues: {
            firstname: patient_data.firstname || undefined,
            middlename: patient_data.middlename || undefined,
            lastname: patient_data.lastname || undefined,
            suffixname: patient_data.suffixname || undefined,
            sex: patient_data.sex || undefined,
            dateofbirth: patient_data.dateofbirth || undefined,
            ageinyears: patient_data.ageinyears || undefined,
            ageinmonths: patient_data.ageinmonths || undefined,
            ageindays: patient_data.ageindays || undefined,
            member_of_IP: patient_data.member_of_IP || undefined,
            IP_tribe: patient_data.IP_tribe || undefined,
            IP_tribe_specify: patient_data.IP_tribe_specify || undefined,
            pat_address_reg: patient_data.pat_address_reg || undefined,
            pat_address_prov: patient_data.pat_address_prov || undefined,
            pat_address_city: patient_data.pat_address_city || undefined,
            pat_address_brgy: patient_data.pat_address_brgy || undefined,
            pat_address_street_name: patient_data.pat_address_street_name || undefined,
            pat_perm_address_reg: patient_data.pat_perm_address_reg || undefined,
            pat_perm_address_prov: patient_data.pat_perm_address_prov || undefined,
            pat_perm_address_city: patient_data.pat_perm_address_city || undefined,
            pat_perm_address_brgy: patient_data.pat_perm_address_brgy || undefined,
            pat_perm_address_street_name: patient_data.pat_perm_address_street_name || undefined,
            facilityname: patient_data.facilityname || undefined,
            occupation: patient_data.occupation || undefined,
            phone_no: patient_data.phone_no || undefined,
        },
    });

    const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

    function calculateAge(dobString) {
        const dob = new Date(dobString);
        const today = new Date();

        let years = today.getFullYear() - dob.getFullYear();
        let months = today.getMonth() - dob.getMonth();
        let days = today.getDay() - dob.getDay();

        if (days < 0) {
            months -= 1;

            const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += previousMonth.getDate();
        }

        if (months < 0) {
            years -= 1;
            months += 12;
        }
        return { years, months, days };
    }

    const handleCalculate = (dobString: string) => {
        if (dobString) {
            const result = calculateAge(dobString);
            setAge(result);
        }
    };

    function onSubmit(values: PatientForm) {
        const payload = {
            ...values,
        };

        payload.ageinyears = age?.years as number;
        payload.ageinmonths = age?.months as number;
        payload.ageindays = age?.days as number;

        router.put(`/patient/${patient_data.id}`, payload, {
            onSuccess: () => {
                form.reset();
            },
            onError: (errors) => {
                console.log('Validation failed:', errors);
            },
        });
    }

    const member_of_IP = form.watch('member_of_IP');

    // const region = regions;
    // const permRegion = regions;
    const province = provinces;
    const permProvince = provinces;
    const citymun = citymuns;
    const permCityMun = citymuns;

    const IP_tribe = form.watch('IP_tribe');
    const selectedRegionId = form.watch('pat_address_reg');
    const selectedPermRegionId = form.watch('pat_perm_address_reg');
    const selectedProvId = form.watch('pat_address_prov');
    const selectedPermProvId = form.watch('pat_perm_address_prov');
    const barangays = [
        { label: 'Bao', value: 1204701001 },
        { label: 'Barangiran', value: 1204701002 },
        { label: 'Camansi', value: 1204701003 },
        { label: 'Dado', value: 1204701004 },
        { label: 'Guiling', value: 1204701005 },
    ];
    const facilities = [
        { id: 3208, facilityName: 'PIDDIG DISTRICT HOSPITAL' },
        { id: 20067, facilityName: 'CEBU CITY MEDICAL CENTER' },
        { id: 17768, facilityName: 'DON LEOVIGILDO N. DIAPO SR. MUNICIPAL HOSPITAL' },
        { id: 24493, facilityName: 'LABASON DISTRICT HOSPITAL' },
        { id: 10315, facilityName: 'BAGONG POOK DIST. III HEALTH CENTER' },
    ];

    const filteredProvinces = useMemo(() => {
        return province.filter((p) => String(p.region_id) === selectedRegionId);
    }, [selectedRegionId, province]);

    const filteredPermProvinces = useMemo(() => {
        return permProvince.filter((p) => String(p.region_id) === selectedPermRegionId);
    }, [selectedPermRegionId, permProvince]);

    const filteredCityMun = useMemo(() => {
        if (!selectedRegionId || !selectedProvId) return [];

        return citymun.filter((c) => String(c.region_id) === selectedRegionId && String(c.province_id) === String(selectedProvId));
    }, [selectedRegionId, selectedProvId, citymun]);

    const filteredPermCityMun = useMemo(() => {
        if (!selectedPermRegionId || !selectedPermProvId) return [];

        return permCityMun.filter((c) => String(c.region_id) === selectedPermRegionId && String(c.province_id) === String(selectedPermProvId));
    }, [selectedPermRegionId, selectedPermProvId, permCityMun]);

    useEffect(() => {
        if (selectedRegionId === null || selectedRegionId === '') {
            form.setValue('pat_address_prov', undefined);
            form.setValue('pat_address_city', undefined);
        }
        if (selectedPermRegionId === null || selectedPermRegionId === '') {
            form.setValue('pat_perm_address_prov', undefined);
            form.setValue('pat_perm_address_city', undefined);
        }
    }, [selectedRegionId, selectedPermRegionId]);
    const onError = (errors: any) => {
        console.log('Form validation errors:', errors);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Patient Data" />
            <div className="overflow-x flex w-full space-y-4 p-4">
                <div className="flex w-full flex-row justify-start">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8">
                            {/* 1st Column */}
                            <h1>
                                <b>General Data</b>
                            </h1>

                            <div className="flex flex-row items-start gap-x-2">
                                <FormField
                                    control={form.control}
                                    name="firstname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-center gap-x-2">
                                                <div className="flex flex-col">
                                                    <FormLabel>First Name:</FormLabel>
                                                </div>
                                                <FormControl className="flex items-center">
                                                    <Input className="w-auto border-2 border-black" type="text" placeholder="First Name" {...field} />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="middlename"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-center gap-x-2">
                                                <div className="flex flex-col">
                                                    <FormLabel>Middle Name:</FormLabel>
                                                </div>
                                                <FormControl className="flex items-center">
                                                    <Input
                                                        className="w-auto border-2 border-black"
                                                        type="text"
                                                        placeholder="Middle Name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-center gap-x-2">
                                                <div className="flex flex-col">
                                                    <FormLabel>Last Name:</FormLabel>
                                                </div>
                                                <FormControl>
                                                    <Input className="w-auto border-2 border-black" type="text" placeholder="Last Name" {...field} />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="suffixname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-center gap-x-2">
                                                <div className="flex flex-col">
                                                    <FormLabel>Suffix Name:</FormLabel>
                                                </div>
                                                <FormControl>
                                                    <Input
                                                        className="w-auto border-2 border-black"
                                                        type="text"
                                                        placeholder="Suffix Name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="sex"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-center gap-x-2">
                                                <div className="flex flex-col">
                                                    <FormLabel>Sex:</FormLabel>
                                                </div>
                                                <Select
                                                    value={form.watch('sex')}
                                                    onValueChange={(val) => {
                                                        form.setValue('sex', val as 'M' | 'F');
                                                    }}
                                                    className="w-auto border-2 border-black"
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Please Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {(
                                                            [
                                                                { label: 'Male', value: 'M' },
                                                                { label: 'Female', value: 'F' },
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
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {/* 2nd Column */}
                            <div className="flex flex-row items-start gap-x-12">
                                <FormField
                                    control={form.control}
                                    name="dateofbirth"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-center gap-x-2">
                                                <div className="flex flex-col">
                                                    <FormLabel>Date of Birth:</FormLabel>
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
                                                            handleCalculate(date);
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                <div className="flex flex-row gap-x-2">
                                    <FormField
                                        control={form.control}
                                        name="ageinyears"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-center gap-x-2">
                                                    <div className="flex flex-col">
                                                        <FormLabel>Age Year:</FormLabel>
                                                    </div>
                                                    <FormControl>
                                                        <p className="justify-text h-8 w-10 rounded-sm border-2 border-black text-center">
                                                            {age?.years || patient_data.ageinyears}
                                                        </p>
                                                    </FormControl>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="ageinmonths"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-center gap-x-2">
                                                    <div className="flex flex-col">
                                                        <FormLabel>Month:</FormLabel>
                                                    </div>
                                                    <FormControl>
                                                        <p className="justify-text h-8 w-10 rounded-sm border-2 border-black text-center">
                                                            {age?.months || patient_data.ageinmonths}
                                                        </p>
                                                    </FormControl>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="ageindays"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-center gap-x-2">
                                                    <div className="flex flex-col">
                                                        <FormLabel>Day:</FormLabel>
                                                    </div>
                                                    <FormControl>
                                                        <p className="justify-text h-8 w-10 rounded-sm border-2 border-black text-center">
                                                            {age?.days || patient_data.ageindays}
                                                        </p>
                                                    </FormControl>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="member_of_IP"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-center gap-x-2">
                                                <div className="flex flex-col">
                                                    <FormLabel>Member of Indigenous People :</FormLabel>
                                                </div>
                                                <Select
                                                    value={form.watch('member_of_IP')}
                                                    onValueChange={(val) => {
                                                        form.setValue('member_of_IP', val as 'Y' | 'N');
                                                    }}
                                                    className="w-auto"
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Please Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {(
                                                            [
                                                                { label: 'Yes', value: 'Y' },
                                                                { label: 'No', value: 'N' },
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
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {member_of_IP == 'Y' ? (
                                    <FormField
                                        control={form.control}
                                        name="IP_tribe"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-center gap-x-2">
                                                    <div className="flex flex-col">
                                                        <FormLabel>Indigenous People Tribe:</FormLabel>
                                                    </div>
                                                    <Select
                                                        value={Number(form.watch('IP_tribe')) ?? ''}
                                                        onValueChange={(val) => {
                                                            form.setValue(
                                                                'IP_tribe',
                                                                Number(val) as
                                                                | 1
                                                                | 2
                                                                | 3
                                                                | 4
                                                                | 5
                                                                | 6
                                                                | 7
                                                                | 8
                                                                | 9
                                                                | 10
                                                                | 11
                                                                | 12
                                                                | 13
                                                                | 14
                                                                | 15
                                                                | 16
                                                                | 17
                                                                | 18
                                                                | 19
                                                                | 20
                                                                | 21
                                                                | 22
                                                                | 23
                                                                | 24
                                                                | 25
                                                                | 26
                                                                | 27
                                                                | 28
                                                                | 29
                                                                | 30
                                                                | 31
                                                                | 32
                                                                | 33,
                                                            );
                                                        }}
                                                        className="w-auto"
                                                    >
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="Please Select" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {[
                                                                { label: 'Aetas', value: 1 },
                                                                { label: 'Ati', value: 2 },
                                                                { label: 'Badjao', value: 3 },
                                                                { label: 'Batak', value: 4 },
                                                                { label: 'Blaan', value: 5 },
                                                                { label: 'Bontoc', value: 6 },
                                                                { label: 'Bukidnon', value: 7 },
                                                                { label: 'Higaonon', value: 8 },
                                                                { label: 'Ibaloi', value: 9 },
                                                                { label: 'Igorot', value: 10 },
                                                                { label: 'Ilongots', value: 11 },
                                                                { label: 'Isnag', value: 12 },
                                                                { label: 'Isneg', value: 13 },
                                                                { label: 'Kalinga', value: 14 },
                                                                { label: 'Kankanaey', value: 15 },
                                                                { label: 'Lumad', value: 16 },
                                                                { label: 'Mamanwa', value: 17 },
                                                                { label: 'Mandaya', value: 18 },
                                                                { label: 'Mangyan', value: 19 },
                                                                { label: 'Manobo', value: 20 },
                                                                { label: 'Mansaka', value: 21 },
                                                                { label: 'Palawano', value: 22 },
                                                                { label: 'Palaweño', value: 23 },
                                                                { label: 'Sangir', value: 24 },
                                                                { label: 'Subanen', value: 25 },
                                                                { label: 'T`boli', value: 26 },
                                                                { label: 'Tagabawa', value: 27 },
                                                                { label: 'Tagakaulo', value: 28 },
                                                                { label: 'Tagbanwa', value: 29 },
                                                                { label: 'Tasaday', value: 30 },
                                                                { label: 'Tinguian', value: 31 },
                                                                { label: 'Tumandok', value: 32 },
                                                                { label: 'Others', value: 33 },
                                                            ].map((option) => (
                                                                <FormItem key={option.value} className="flex items-center space-x-2">
                                                                    <FormControl>
                                                                        <SelectItem value={parseInt(option.value.toString())} id={option.value}>
                                                                            {option.label}
                                                                        </SelectItem>
                                                                    </FormControl>
                                                                </FormItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ) : (
                                    <FormField
                                        control={form.control}
                                        name="IP_tribe"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-center gap-x-2">
                                                    <div className="flex flex-col">
                                                        <FormLabel>Indigenous People Tribe:</FormLabel>
                                                    </div>
                                                    <Select
                                                        disabled
                                                        value={Number(form.watch('IP_tribe')) ?? ''}
                                                        onValueChange={(val) => {
                                                            form.setValue(
                                                                'IP_tribe',
                                                                parseInt(val) as
                                                                | 1
                                                                | 2
                                                                | 3
                                                                | 4
                                                                | 5
                                                                | 6
                                                                | 7
                                                                | 8
                                                                | 9
                                                                | 10
                                                                | 11
                                                                | 12
                                                                | 13
                                                                | 14
                                                                | 15
                                                                | 16
                                                                | 17
                                                                | 18
                                                                | 19
                                                                | 20
                                                                | 21
                                                                | 22
                                                                | 23
                                                                | 24
                                                                | 25
                                                                | 26
                                                                | 27
                                                                | 28
                                                                | 29
                                                                | 30
                                                                | 31
                                                                | 32
                                                                | 33,
                                                            );
                                                        }}
                                                        className="w-auto"
                                                    >
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="Please Select" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {[
                                                                { label: 'Aetas', value: 1 },
                                                                { label: 'Ati', value: 2 },
                                                                { label: 'Badjao', value: 3 },
                                                                { label: 'Batak', value: 4 },
                                                                { label: 'Blaan', value: 5 },
                                                                { label: 'Bontoc', value: 6 },
                                                                { label: 'Bukidnon', value: 7 },
                                                                { label: 'Higaonon', value: 8 },
                                                                { label: 'Ibaloi', value: 9 },
                                                                { label: 'Igorot', value: 10 },
                                                                { label: 'Ilongots', value: 11 },
                                                                { label: 'Isnag', value: 12 },
                                                                { label: 'Isneg', value: 13 },
                                                                { label: 'Kalinga', value: 14 },
                                                                { label: 'Kankanaey', value: 15 },
                                                                { label: 'Lumad', value: 16 },
                                                                { label: 'Mamanwa', value: 17 },
                                                                { label: 'Mandaya', value: 18 },
                                                                { label: 'Mangyan', value: 19 },
                                                                { label: 'Manobo', value: 20 },
                                                                { label: 'Mansaka', value: 21 },
                                                                { label: 'Palawano', value: 22 },
                                                                { label: 'Palaweño', value: 23 },
                                                                { label: 'Sangir', value: 24 },
                                                                { label: 'Subanen', value: 25 },
                                                                { label: 'T`boli', value: 26 },
                                                                { label: 'Tagabawa', value: 27 },
                                                                { label: 'Tagakaulo', value: 28 },
                                                                { label: 'Tagbanwa', value: 29 },
                                                                { label: 'Tasaday', value: 30 },
                                                                { label: 'Tinguian', value: 31 },
                                                                { label: 'Tumandok', value: 32 },
                                                                { label: 'Others', value: 33 },
                                                            ].map((option) => (
                                                                <FormItem key={option.value} className="flex items-center space-x-2">
                                                                    <FormControl>
                                                                        <SelectItem value={parseInt(option.value.toString())} id={option.value}>
                                                                            {option.label}
                                                                        </SelectItem>
                                                                    </FormControl>
                                                                </FormItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </div>
                            <Separator />
                            {/* 3rd Column */}
                            <div className="flex flex-row items-start gap-x-12">
                                {IP_tribe == 33 ? (
                                    <FormField
                                        control={form.control}
                                        name="IP_tribe_specify"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-center gap-x-2">
                                                    <div className="flex flex-col">
                                                        <FormLabel>Other tribes, specify:</FormLabel>
                                                    </div>
                                                    <FormControl>
                                                        <Input
                                                            className="w-auto border-2 border-black"
                                                            type="text"
                                                            placeholder="Other tribes"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ) : (
                                    <FormField
                                        control={form.control}
                                        name="IP_tribe_specify"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full items-center gap-x-2">
                                                    <div className="flex flex-col">
                                                        <FormLabel>Other tribes, specify:</FormLabel>
                                                    </div>
                                                    <FormControl>
                                                        <Input
                                                            disabled
                                                            className="w-auto border-2 border-black"
                                                            type="text"
                                                            placeholder="Other tribes"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                                <FormField
                                    control={form.control}
                                    name="occupation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-center gap-x-2">
                                                <div className="flex flex-col">
                                                    <FormLabel>Occupation:</FormLabel>
                                                </div>
                                                <FormControl>
                                                    <Input className="w-auto border-2 border-black" type="text" placeholder="Type here" {...field} />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="facilityname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-center gap-x-2">
                                                <div className="flex flex-col">
                                                    <FormLabel>
                                                        Facility Name of the Disease Reporting Unit based National Health Facility Registry:
                                                    </FormLabel>
                                                </div>
                                                <Select
                                                    value={String(field.value ?? '')}
                                                    onValueChange={(val) => {
                                                        form.setValue('facilityname', String(val) ?? '');
                                                    }}
                                                >
                                                    <SelectTrigger className="w-[300px]">
                                                        <SelectValue placeholder="Please Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {facilities.map((reg) => (
                                                            <SelectItem key={String(reg.id)} value={String(reg.id)} id={String(reg.id)}>
                                                                {reg.facilityName}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-row items-start gap-x-12">
                                <FormField
                                    control={form.control}
                                    name="phone_no"
                                    render={({ field }) => (
                                        <FormItem>
                                            {' '}
                                            <div className="flex w-full items-center gap-x-2">
                                                <div className="flex flex-col">
                                                    <FormLabel>Phone Number:</FormLabel>
                                                </div>{' '}
                                                <FormControl>
                                                    <Input
                                                        className="w-auto border-2 border-black"
                                                        type="text"
                                                        placeholder="Phone Number"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Separator />
                            <h1>
                                <b>Demographic Information</b>
                            </h1>
                            <Separator />
                            <h4>
                                <b>Current Address</b>
                            </h4>
                            {/* 4th Column */}
                            <div className="flex flex-row items-start gap-x-12">
                                <FormField
                                    control={form.control}
                                    name="pat_address_reg"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-center gap-x-2">
                                                <div className="flex flex-col">
                                                    <FormLabel>Patient Current Address (Region):</FormLabel>
                                                </div>
                                                <Select
                                                    value={String(field.value ?? '')}
                                                    onValueChange={(val) => {
                                                        form.setValue('pat_address_reg', String(val) ?? '');
                                                    }}
                                                >
                                                    <SelectTrigger className="w-[300px]">
                                                        <SelectValue placeholder="Please Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {regions.map((reg) => (
                                                            <SelectItem key={String(reg.id)} value={String(reg.id)} id={String(reg.id)}>
                                                                {reg.region_name}
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
                                    name="pat_address_prov"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-center gap-x-2">
                                                <div className="flex flex-col">
                                                    <FormLabel>Patient Current Address (Province):</FormLabel>
                                                </div>
                                                <Select
                                                    value={String(field.value ?? '')}
                                                    onValueChange={(val) => {
                                                        form.setValue('pat_address_prov', String(val) ?? '');
                                                    }}
                                                    disabled={!selectedRegionId}
                                                >
                                                    <SelectTrigger className="w-[300px]">
                                                        <SelectValue placeholder="Please Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {filteredProvinces.map((prov) => (
                                                            <SelectItem key={String(prov.id)} value={String(prov.id)} id={String(prov.id)}>
                                                                {prov.province_name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {/* 5th Column */}
                            <div className="flex flex-row items-start gap-x-12">
                                <FormField
                                    control={form.control}
                                    name="pat_address_city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-center gap-x-2">
                                                <div className="flex flex-col">
                                                    <FormLabel>Patient Current Address (City/Municipality):</FormLabel>
                                                </div>
                                                <Select
                                                    value={String(field.value ?? '')}
                                                    onValueChange={(val) => {
                                                        form.setValue('pat_address_city', String(val));
                                                    }}
                                                    disabled={!selectedRegionId}
                                                >
                                                    <SelectTrigger className="w-[300px]">
                                                        <SelectValue placeholder="Please Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {filteredCityMun.map((city) => (
                                                            <SelectItem key={String(city.id)} value={String(city.id)} id={String(city.id)}>
                                                                {city.city_name}
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
                                    name="pat_address_brgy"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-center gap-x-2">
                                                <div className="flex flex-col">
                                                    <FormLabel>Patient Current Address (Barangay):</FormLabel>
                                                </div>
                                                <Select
                                                    value={form.watch('pat_address_brgy')}
                                                    onValueChange={(val) => {
                                                        form.setValue('pat_address_brgy', String(val));
                                                    }}
                                                >
                                                    <SelectTrigger className="w-[300px]">
                                                        <SelectValue placeholder="Please Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {barangays.map((bar) => (
                                                            <SelectItem
                                                                key={String(bar.value)}
                                                                className="flex items-center space-x-2"
                                                                value={String(bar.value)}
                                                                id={String(bar.value)}
                                                            >
                                                                {bar.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {/* 6th Column */}
                            <div className="flex flex-row items-start gap-x-8">
                                <FormField
                                    control={form.control}
                                    name="pat_address_street_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-center gap-x-2">
                                                <div className="flex flex-col">
                                                    <FormLabel>Patient Current Address (Street Name / House Number / Purok / Sitio):</FormLabel>
                                                </div>
                                                <FormControl>
                                                    <Textarea
                                                        className="w-auto border-2 border-black"
                                                        type="text"
                                                        placeholder="Street Name / House Number / Purok / Sitio"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Separator />
                            {/* 7th Column */}
                            <h4>
                                <b>Permanent Address</b>
                            </h4>
                            <div className="flex flex-row items-start gap-x-8">
                                <FormField
                                    control={form.control}
                                    name="pat_perm_address_reg"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-center gap-x-2">
                                                <div className="flex flex-col">
                                                    <FormLabel>Patient Current Address (Region):</FormLabel>
                                                </div>
                                                <Select
                                                    value={String(field.value ?? '')}
                                                    onValueChange={(val) => {
                                                        form.setValue('pat_perm_address_reg', String(val) ?? '');
                                                    }}
                                                >
                                                    <SelectTrigger className="w-[300px]">
                                                        <SelectValue placeholder="Please Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {regions.map((reg) => (
                                                            <SelectItem key={String(reg.id)} value={String(reg.id)} id={String(reg.id)}>
                                                                {reg.region_name}
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
                                    name="pat_perm_address_prov"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-center gap-x-2">
                                                <div className="flex flex-col">
                                                    <FormLabel>Patient Current Address (Province):</FormLabel>
                                                </div>
                                                <Select
                                                    value={String(field.value ?? '')}
                                                    onValueChange={(val) => {
                                                        form.setValue('pat_perm_address_prov', String(val) ?? '');
                                                    }}
                                                    disabled={!selectedPermRegionId}
                                                >
                                                    <SelectTrigger className="w-[300px]">
                                                        <SelectValue placeholder="Please Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {filteredPermProvinces.map((prov) => (
                                                            <SelectItem key={String(prov.id)} value={String(prov.id)} id={String(prov.id)}>
                                                                {prov.province_name}
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
                                    name="pat_perm_address_city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-center gap-x-2">
                                                <div className="flex flex-col">
                                                    <FormLabel>Patient Current Address (City/Municipality):</FormLabel>
                                                </div>
                                                <Select
                                                    value={String(field.value ?? '')}
                                                    onValueChange={(val) => {
                                                        form.setValue('pat_perm_address_city', String(val));
                                                    }}
                                                    disabled={!selectedPermRegionId}
                                                >
                                                    <SelectTrigger className="w-[300px]">
                                                        <SelectValue placeholder="Please Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {filteredPermCityMun.map((city) => (
                                                            <SelectItem key={String(city.id)} value={String(city.id)} id={String(city.id)}>
                                                                {city.city_name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {/* 8th Column */}
                            <div className="flex flex-row items-start gap-x-8">
                                <FormField
                                    control={form.control}
                                    name="pat_perm_address_brgy"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-center gap-x-2">
                                                <div className="flex flex-col">
                                                    <FormLabel>Patient Current Address (Barangay):</FormLabel>
                                                </div>
                                                <Select
                                                    value={form.watch('pat_perm_address_brgy')}
                                                    onValueChange={(val) => {
                                                        form.setValue('pat_perm_address_brgy', String(val));
                                                    }}
                                                >
                                                    <SelectTrigger className="w-[300px]">
                                                        <SelectValue placeholder="Please Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {barangays.map((bar) => (
                                                            <SelectItem
                                                                key={String(bar.value)}
                                                                className="flex items-center space-x-2"
                                                                value={String(bar.value)}
                                                                id={String(bar.value)}
                                                            >
                                                                {bar.label}
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
                                    name="pat_perm_address_street_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex w-full items-center gap-x-2">
                                                <div className="flex flex-col">
                                                    <FormLabel>Patient Current Address (Street Name / House Number / Purok / Sitio):</FormLabel>
                                                </div>
                                                <FormControl>
                                                    <Textarea
                                                        className="w-auto border-2 border-black"
                                                        type="text"
                                                        placeholder="Street Name / House Number / Purok / Sitio"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex justify-center">
                                <Button className="bg-blue-500 text-white hover:bg-blue-600" type="submit">
                                    Save Patient
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}
