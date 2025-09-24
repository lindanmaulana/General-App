"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { brandSystemSettingSchema, typeBrandSystemSettingSchema } from "@/lib/validations/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const BrandingSystemSettings = () => {
    const form = useForm<typeBrandSystemSettingSchema>({
        resolver: zodResolver(brandSystemSettingSchema),
        defaultValues: {
            appName: "",
            logoUrl: "",
            organizationAddress: "",
            tagline: "",
        },
    });

    const { handleSubmit } = form;

    const handleForm = handleSubmit((value) => {
        console.log({ value });
    });

    return (
        <div className="space-y-6">
            <h3 className="font-medium">Branding</h3>

            <Form {...form}>
                <form onSubmit={handleForm} className="space-y-3">
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="appName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nama Aplikasi</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" placeholder="Masukan nama aplikasi anda..." className="py-5" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="logoUrl"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>URL Logo</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Pilih logo aplikasi anda..." className="py-5" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField 
                            control={form.control}
                            name="organizationAddress"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Alamat Organisasi</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" placeholder="Masukan alamat organisasi anda..." className="py-5" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField 
                            control={form.control}
                            name="tagline"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Tagline</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" placeholder="Masukan tagline organisasi anda..." className="py-5" />
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

export default BrandingSystemSettings;
