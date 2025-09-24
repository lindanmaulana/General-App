"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { appearanceSystemSettingSchema, typeAppearanceSystemSettingSchema } from "@/lib/validations/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const AppearanceSystemSettings = () => {
    const form = useForm<typeAppearanceSystemSettingSchema>({
        resolver: zodResolver(appearanceSystemSettingSchema),
        defaultValues: {
            welcomeMessageDashboard: "",
            welcomeMessageLogin: "",
        },
    });
    const { handleSubmit } = form;

    const handleForm = handleSubmit((value) => {});
    return (
        <div className="space-y-6">
            <h3 className="font-medium">Appearance</h3>

            <Form {...form}>
                <form onSubmit={handleForm} className="space-y-3">
                    <div className="grid grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="welcomeMessageLogin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pesan Selamat Datang Login</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" placeholder="Wellcome back..." className="py-5" />
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
                                    <FormLabel>Pesan Selamat Datang Dashboard</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" placeholder="Selamat Datang di General CashFlow..." className="py-5" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
            </Form>
        </div>
    );
};
