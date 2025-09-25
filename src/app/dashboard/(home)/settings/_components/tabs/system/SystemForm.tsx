"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SystemSettingSchema, typeSystemSettingSchema } from "@/lib/validations/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { appearance_settings, branding_settinggs } from "../../../_types/system-setting";

interface SystemFormProps {
    defaultValues?: branding_settinggs & appearance_settings
}

export const SystemForm = ({defaultValues}: SystemFormProps) => {
    const form = useForm<typeSystemSettingSchema>({
        resolver: zodResolver(SystemSettingSchema),
        defaultValues: {
            appName: defaultValues?.app_name,
            logoUrl: defaultValues?.logo_url,
            organizationAddress: defaultValues?.organization_address,
            tagline: defaultValues?.tagline,
            welcomeMessageLogin: defaultValues?.wellcome_message_login,
            welcomeMessageDashboard: defaultValues?.wellcome_message_dashboard,
        },
    });

    const { handleSubmit } = form;

    const handleForm = handleSubmit((value) => {});
    return (
        <Form {...form}>
            <form onSubmit={handleForm} className="space-y-8">
                <div className="space-y-6">
                    <h3 className="dark:text-gnrWhite font-medium">Branding</h3>
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="appName"
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
                                name="logoUrl"
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
                            name="organizationAddress"
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
                            name="welcomeMessageLogin"
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
                            name="welcomeMessageDashboard"
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
                    <Button type="submit" className="bg-gnrPrimary hover:bg-gnrPrimary/80 py-5 cursor-pointer">
                        Simpan Pengaturan
                    </Button>
                </div>
            </form>
        </Form>
    );
};
