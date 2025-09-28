"use client";

import { updateSystemSetting } from "@/actions/settings";
import { ButtonSubmit } from "@/components/ButtonSubmit";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { errorHandler } from "@/lib/helpers/errorHandler";
import { SystemUpdateSettingSchema, typeSystemUpdateSettingSchema } from "@/lib/validations/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { system_settings } from "../../../_types/system-setting";
import { settingsKeys } from "@/lib/queries/settings/queryKeys";
import { logoStorageListOptions } from "@/lib/queries/storage/logoStorageListOptions";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getPublicUrlImageList } from "@/lib/supabase/getPublicUrlImageList";
import { BUCKET_APP_IMAGES, PATH_LOGO } from "@/lib/supabase/index";
import { imageSupabase } from "@/lib/validations/image-supabase";
import Image from "next/image";
import { getPublicUrlImage } from "@/lib/supabase/getPublicUrl";
import { Label } from "@/components/ui/label";

interface SystemFormProps {
    defaultValues?: system_settings;
}

export const SystemForm = ({ defaultValues }: SystemFormProps) => {
    const queryClient = useQueryClient();
    const { data: dataLogo, isLoading: isLoadingLogo, isError: isErrorLogo } = useQuery(logoStorageListOptions());

    const { mutate, isPending } = useMutation({
        mutationKey: ["updateBrandingSystemSetting"],
        mutationFn: (data: typeSystemUpdateSettingSchema) => updateSystemSetting(data, defaultValues?.id ?? ""),
    });

    const form = useForm<typeSystemUpdateSettingSchema>({
        resolver: zodResolver(SystemUpdateSettingSchema),
        defaultValues: {
            app_name: defaultValues?.app_name ?? "",
            logo_url: defaultValues?.logo_url ?? "",
            organization_address: defaultValues?.organization_address ?? "",
            tagline: defaultValues?.tagline ?? "",
        },
    });

    const handleForm = form.handleSubmit((value) => {
        if (isPending) toast.loading("Loading update system");

        mutate(value, {
            onSuccess: () => {
                toast.success("System Setting updated");
                queryClient.invalidateQueries({ queryKey: settingsKeys.system.lists() });
            },

            onError: (err) => {
                const error = errorHandler(err);

                toast.error(error);
            },
        });
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
                                            <div className="flex items-center gap-2">
                                                {defaultValues?.logo_url && (
                                                    <Image
                                                        src={getPublicUrlImage(
                                                            BUCKET_APP_IMAGES,
                                                            defaultValues.logo_url
                                                        )}
                                                        alt={defaultValues.app_name}
                                                        width={50}
                                                        height={50}
                                                    />
                                                )}
                                                {isLoadingLogo || isErrorLogo ? (
                                                    <p>Loading...</p>
                                                ) : (
                                                    <Select>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Pilih logo" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Logo</SelectLabel>
                                                                {dataLogo
                                                                    .filter(
                                                                        (logo: imageSupabase) =>
                                                                            logo.name !== ".emptyFolderPlaceholder"
                                                                    )
                                                                    .map((logo: imageSupabase) => {
                                                                        const imageUrl = getPublicUrlImageList(
                                                                            BUCKET_APP_IMAGES,
                                                                            PATH_LOGO,
                                                                            logo.name
                                                                        );
                                                                        return (
                                                                            <SelectItem
                                                                                key={logo.id}
                                                                                value={logo.name}
                                                                                className="flex items-center justify-center"
                                                                            >
                                                                                <Image
                                                                                    src={imageUrl}
                                                                                    alt={logo.name}
                                                                                    width={40}
                                                                                    height={40}
                                                                                />
                                                                            </SelectItem>
                                                                        );
                                                                    })}

                                                                {/* <SelectItem value="addImage">
                                                                    <Label id="upload-image">Upload Logo</Label>
                                                                </SelectItem> */}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                )}

                                                {/* <Input
                                                    {...field}
                                                    id="upload-image"
                                                    type="file"
                                                    accept="image/*"
                                                    placeholder="Pilih logo aplikasi anda..."
                                                    className="hidden dark:text-gnrWhite dark:border-white/20"
                                                /> */}
                                            </div>
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

                <div className="flex items-center justify-end">
                    <ButtonSubmit
                        type="submit"
                        isLoading={isPending}
                        loading="Loading..."
                        title="Simpan Pengaturan"
                        style="bg-gnrPrimary hover:bg-gnrPrimary/80 py-5 cursor-pointer"
                    ></ButtonSubmit>
                </div>
            </form>
        </Form>
    );
};
