'use client';

import { Button } from "@/components/ui/button";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { createRoomAction } from "./actions";

const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(250),
    githubRepo: z.string().min(2).max(50),
    tags: z.array(z.object({
        value: z.string().min(2).max(50)
    })),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateRoomForm() {
    const router = useRouter();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            githubRepo: "",
            tags: [],
        },
    });

    const { fields, append } = useFieldArray<FormValues, "tags", "id">({
        control: form.control,
        name: "tags",
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        //TODO: invoke a server action to store the data in our databse

        const transformedValues = {
            ...values,
            // Transform tags from an array of objects to an array of strings
            tags: values.tags.map(tag => tag.value)
        };
        await createRoomAction(transformedValues)
        router.push("/");
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public room name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Desciption</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                Please describe what you'll be coding on
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="githubRepo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Github Repo</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                Please put a link to the project you are working on
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {fields.map((field, index) => (
                    <FormItem key={field.id}>
                        <FormLabel>Tag {index + 1}</FormLabel>
                        <FormControl>
                            <Input {...form.register(`tags.${index}.value` as const)} />
                        </FormControl>
                        {index === 0 &&
                            <FormDescription>
                                Add a tag that describes the technologies you are working on
                            </FormDescription>
                        }
                    </FormItem>
                ))}
                <div className="flex space-x-4">
                    <Button type="button" onClick={() => append({ value: '' })}>
                        Add Tag
                    </Button>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </FormProvider >
    )
}