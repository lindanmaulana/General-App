"use client";

import { updateSystemSetting } from "@/actions/settings";
import { ButtonSubmit } from "@/components/ButtonSubmit";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { errorHandler } from "@/lib/helpers/errorHandler";
import { SystemUpdateSettingSchema, typeSystemUpdateSettingSchema } from "@/lib/validations/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { system_settings } from "../../../_types/system-setting";

interface SystemFormProps {
    defaultValues?: system_settings
}

export const SystemForm = ({defaultValues}: SystemFormProps) => {
    const {mutate, reset, isPending} = useMutation({
        mutationKey: ['updateBrandingSystemSetting'],
        mutationFn: (data: typeSystemUpdateSettingSchema) => updateSystemSetting(data, defaultValues?.id ?? ""),
    })

    const form = useForm<typeSystemUpdateSettingSchema>({
        resolver: zodResolver(SystemUpdateSettingSchema),
        defaultValues: {
            app_name: defaultValues?.app_name ?? "",
            logo_url: defaultValues?.logo_url ?? "",
            organization_address: defaultValues?.organization_address ?? "",
            tagline: defaultValues?.tagline ?? "",
            wellcome_message_login: defaultValues?.wellcome_message_login ?? "",
            wellcome_message_dashboard: defaultValues?.wellcome_message_dashboard ?? "",
        },
    });

    const handleForm = form.handleSubmit((value) => {
        if(isPending) toast.loading("Loading update system")
        
        mutate(value, {
            onSuccess: () => {
                toast.success("System Setting updated")
            },

            onError: (err) => {
                const error = errorHandler(err)

                toast.error(error)
            }
        })
    });


    return (
        <Form {...form}>
            <form onSubmit={handleForm} className="space-y-8">
                <div className="space-y-6">
                    <h3 className="dark:text-gnrWhite font-medium">Branding</h3>
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="app_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="dark:text-gnrWhite">Nama Aplikasi</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                placeholder="Masukan nama aplikasi anda..."
                                                className="dark:text-gnrWhite dark:border-white/20 py-5"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="logo_url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="dark:text-gnrWhite">URL Logo</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Pilih logo aplikasi anda..."
                                                className="dark:text-gnrWhite dark:border-white/20 py-5"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="organization_address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="dark:text-gnrWhite">Alamat Organisasi</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Masukan alamat organisasi anda..."
                                            className="dark:text-gnrWhite dark:border-white/20 py-5"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tagline"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="dark:text-gnrWhite">Tagline</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Masukan tagline organisasi anda..."
                                            className="dark:text-gnrWhite dark:border-white/20 py-5"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <hr className="bg-gnrGray/10 h-0.5 my-10" />

                <div className="space-y-6">
                    <h3 className="dark:text-gnrWhite font-medium">Appearance</h3>

                    <div className="grid grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="wellcome_message_login"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="dark:text-gnrWhite">Pesan Selamat Datang Login</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" placeholder="Wellcome back..." className="dark:text-gnrWhite dark:border-white/20 py-5" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="wellcome_message_dashboard"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="dark:text-gnrWhite">Pesan Selamat Datang Dashboard</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Selamat Datang di General CashFlow..."
                                            className="dark:text-gnrWhite dark:border-white/20 py-5"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end">
                    <ButtonSubmit type="submit" isLoading={isPending} loading="Loading..." title="Simpan Pengaturan" style="bg-gnrPrimary hover:bg-gnrPrimary/80 py-5 cursor-pointer"></ButtonSubmit>
                </div>
            </form>
        </Form>
    );
};
