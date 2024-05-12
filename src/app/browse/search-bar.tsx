'use client';

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScanSearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";


const formSchema = z.object({
    search: z.string().min(0).max(50),
});

type FormValues = z.infer<typeof formSchema>;


export function SearchBar() {
    const router = useRouter();
    const query = useSearchParams();
    const search = query.get("search");

    async function onSubmit(values: FormValues) {
        if (values.search) {
            router.push(`/?search=${values.search}`);
        } else {
            router.push("/");
        }
    }

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: search ?? "",
        },
    });

    useEffect(() => {
        form.setValue("search", search ?? "");
    }, [search, form])

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field}
                                    className="w-[440px]"
                                    placeholder="Filter rooms by keywords, such as typescript, nextjs etc." />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit"><ScanSearchIcon className="mr-2" />Search</Button>

                {query.get("search") && (
                    <Button
                        variant="link"
                        onClick={() => {
                            form.setValue("search", "");
                            router.push("/")
                        }}>
                        Clear
                    </Button>
                )}
            </form>
        </FormProvider>
    )
}

