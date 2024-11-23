/* eslint-disable prettier/prettier */
'use dom';
import '~/global.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import LocationSelector from '~/components/ui/location-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { fetchAPI } from '~/lib/utils/fetch-api';
import { TNoParams } from '~/lib/types/common';
import { useAuth } from '~/lib/hooks/use-auth';
import { user } from '~/lib/types/prisma';

const formSchema = z.object({
  age: z.number().min(6).max(120),
  gender: z.string(),
  location: z.tuple([z.string(), z.string().optional()]),
});

export default function OnboardingForm({
  onSubmit: onSubmitHandler,
}: {
  onSubmit: (val: any) => Promise<void>;
}) {
  const [countryName, setCountryName] = useState<string>('');
  const [stateName, setStateName] = useState<string>('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      await onSubmitHandler(values);
      //   toast(
      //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //       <code className="text-white">{JSON.stringify(values, null, 2)}</code>
      //     </pre>
      //   );
    } catch (error) {
      console.error('Form submission error', error);
      //   toast.error('Failed to submit the form. Please try again.');
    }
  }

  return (
    <div className="w-[100vw] p-6">
      <Form {...form}>
        <h1 className="text-4xl font-bold">Onboarding</h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-3xl space-y-8 py-10">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    placeholder="24"
                    type="number"
                    {...field}
                    onChange={(e) => form.setValue('age', parseInt(e.target.value))}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Country</FormLabel>
                <FormControl>
                  <LocationSelector
                    onCountryChange={(country) => {
                      setCountryName(country?.name || '');
                      form.setValue(field.name, [country?.name || '', stateName || '']);
                    }}
                    onStateChange={(state) => {
                      setStateName(state?.name || '');
                      form.setValue(field.name, [countryName || '', state?.name || '']);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  If your country has states, it will be appear after selecting country
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
