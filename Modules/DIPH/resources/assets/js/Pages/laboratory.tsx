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
        title: 'Add Laboratory',
        href: '/diph/laboratory',
    },
];

export default function laboratory() {
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
            <Head title="Add Laboratory" />
            <div className="w-full space-y-4 p-4">
                <div className="flex w-full flex-row justify-start">
                    <div className="align-start flex w-full max-w-full flex-col space-y-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <h1>
                                    <b>Add Laboratory Data</b>
                                </h1>
                                {/* 1st Column */}
                                <div className="flex flex-row items-start gap-x-32">
                                    <FormField
                                        control={form.control}
                                        name="id"
                                        render={({ field }) => ( 
                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">
                                                            Laboratory ID{' '}
                                                            <div className="text-red-500">
                                                                <b>*</b>
                                                            </div>
                                                        </FormLabel>
                                                        <FormItem>
                                            <FormControl>
                                                <Input type="text" placeholder="Lab ID" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                                
                                                    </div>

                                                </div>
                                                <FormMessage /> {/* Shows validation errors if any */}
                                            </FormItem>
                                            
                                        )}
                                    />
                                  
                                </div>
                                
                                <div className="flex flex-row items-start gap-x-32">
                                    <FormField
                                        control={form.control}
                                        name="specimen_type"
                                        render={({ field }) => (
                                            

                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">
                                                            Specimen Type{' '}
                                                            <div className="text-red-500">
                                                                <b>*</b>
                                                            </div>
                                                        </FormLabel>
                                                              <Select
                                                                                                              value={form.watch('specimen_type')}
                                                                                                              onValueChange={(val) => {
                                                                                                                  form.setValue('specimen_type', val as 1 | 2 );
                                                                                                                  console.log(form.getValues('specimen_type'));
                                                                                                              }}
                                                                                                          >
                                                                                                              <SelectTrigger className="w-[180px]">
                                                                                                                  <SelectValue placeholder="Please Select" />
                                                                                                              </SelectTrigger>
                                                                                                              <SelectContent>
                                                                                                                  {(
                                                                                                                      [
                                                                                                                          { label: 'Saliva', value: 1 },
                                                                                                                          { label: 'Nasopharyngeal/Oropharyngeal Swab (NPS/OPS)', value: 2 },
                                                                                                                      
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

                                                </div>
                                                <FormMessage /> {/* Shows validation errors if any */}
                                            </FormItem>
                                            
                                        )}
                                    />
                                  
                                </div>
                                <div className="flex flex-row items-start gap-x-32">
                                    <FormField
                                        control={form.control}
                                        name="date_specimen_collected"
                                        render={({ field }) => (
                                            

                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">
                                                           Date Specimen Collected{' '}
                                                            <div className="text-red-500">
                                                                <b>*</b>
                                                            </div>
                                                        </FormLabel>
                                                    <FormControl>
                                                                                                           <Input
                                                                                                               className="w-auto"
                                                                                                               type="date"
                                                                                                               min="1925-01-01"
                                                                                                               value={field.value}
                                                                                                               onChange={field.onValueChange}
                                                                                                           />
                                                                                                       </FormControl>
                                                
                                                    </div>

                                                </div>
                                                <FormMessage /> {/* Shows validation errors if any */}
                                            </FormItem>
                                            
                                        )}
                                    />
                                  
                                </div>
                                <div className="flex flex-row items-start gap-x-32">
                                    <FormField
                                        control={form.control}
                                        name="date_sent_RITM"
                                        render={({ field }) => (
                                            

                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">
                                                           Date Specimen Sent/RITM or SNL{' '}
                                                            <div className="text-red-500">
                                                                <b>*</b>
                                                            </div>
                                                        </FormLabel>
                                                    <FormControl>
                                                                                                           <Input
                                                                                                               className="w-auto"
                                                                                                               type="date"
                                                                                                               min="1925-01-01"
                                                                                                               value={field.value}
                                                                                                               onChange={field.onValueChange}
                                                                                                           />
                                                                                                       </FormControl>
                                                
                                                    </div>

                                                </div>
                                                <FormMessage /> {/* Shows validation errors if any */}
                                            </FormItem>
                                            
                                        )}
                                    />
                                  
                                </div>
                                <div className="flex flex-row items-start gap-x-32">
                                    <FormField
                                        control={form.control}
                                        name="date_received_by_lab"
                                        render={({ field }) => (
                                            

                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">
                                                           Date Received by RITM/SNL{' '}
                                                            <div className="text-red-500">
                                                                <b>*</b>
                                                            </div>
                                                        </FormLabel>
                                                    <FormControl>
                                                                                                           <Input
                                                                                                               className="w-auto"
                                                                                                               type="date"
                                                                                                               min="1925-01-01"
                                                                                                               value={field.value}
                                                                                                               onChange={field.onValueChange}
                                                                                                           />
                                                                                                       </FormControl>
                                                
                                                    </div>

                                                </div>
                                                <FormMessage /> {/* Shows validation errors if any */}
                                            </FormItem>
                                            
                                        )}
                                    />
                                  
                                </div>
                                <div className="flex flex-row items-start gap-x-32">
                                    <FormField
                                        control={form.control}
                                        name="lab_result"
                                        render={({ field }) => (
                                            

                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">
                                                            Result{' '}
                                                            <div className="text-red-500">
                                                                <b>*</b>
                                                            </div>
                                                        </FormLabel>
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
                                                                                                                          { label: 'POSITIVE', value: 'POS' },
                                                                                                                          { label: 'NEGATIVE', value: 'NEG' },
                                                                                                                          { label: 'UNDETERMINED', value: 'UD' },
                                                                                                                          { label: 'NOT PROCESSED', value: 'NP' },
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

                                                </div>
                                                <FormMessage /> {/* Shows validation errors if any */}
                                            </FormItem>
                                            
                                        )}
                                    />
                                  
                                </div>
                                <div className="flex flex-row items-start gap-x-32">
                                    <FormField
                                        control={form.control}
                                        name="typeoforganism"
                                        render={({ field }) => (
                                            






                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">
                                                            Type of Organism{' '}
                                                            <div className="text-red-500">
                                                                <b>*</b>
                                                            </div>
                                                        </FormLabel>
                                                        <FormItem>
                                            <FormControl>
                                                <Input type="text" placeholder="Type of Organism" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                                
                                                    </div>

                                                </div>
                                                <FormMessage /> {/* Shows validation errors if any */}
                                            </FormItem>
                                            
                                        )}
                                    />
                                  
                                </div>
                                <div className="flex flex-row items-start gap-x-32">
                                    <FormField
                                        control={form.control}
                                        name="interpretation"
                                        render={({ field }) => (
                                            






                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">
                                                            Interpretation{' '}
                                                            <div className="text-red-500">
                                                                <b>*</b>
                                                            </div>
                                                        </FormLabel>
                                                        <FormItem>
                                            <FormControl>
                                                <Input type="text" placeholder=" Interpretation" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                                
                                                    </div>

                                                </div>
                                                <FormMessage /> {/* Shows validation errors if any */}
                                            </FormItem>
                                            
                                        )}
                                    />
                                  
                                </div>
                                <div className="flex flex-row items-start gap-x-32">
                                    <FormField
                                        control={form.control}
                                        name="type_test"
                                        render={({ field }) => (
                                            

                                            <FormItem>
                                                <div className="flex w-full items-start gap-x-8">
                                                    <div className="flex flex-col">
                                                        <FormLabel className="mb-1">
                                                          Type of Test{' '}
                                                            <div className="text-red-500">
                                                                <b>*</b>
                                                            </div>
                                                        </FormLabel>
                                                              <Select
                                                                                                              value={form.watch('type_test')}
                                                                                                              onValueChange={(val) => {
                                                                                                                  form.setValue('type_test', val as 1 | 2 );
                                                                                                                  console.log(form.getValues('type_test'));
                                                                                                              }}
                                                                                                          >
                                                                                                              <SelectTrigger className="w-[180px]">
                                                                                                                  <SelectValue placeholder="Please Select" />
                                                                                                              </SelectTrigger>
                                                                                                              <SelectContent>
                                                                                                                  {(
                                                                                                                      [
                                                                                                                          { label: 'Polymerase Chain Reaction', value: 1 },
                                                                                                                          { label: 'Virus Isolation', value: 2 },
                                                                                                                       
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

                                                </div>
                                                <FormMessage /> {/* Shows validation errors if any */}
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
            </div>+
        </AppLayout>
    );
}
