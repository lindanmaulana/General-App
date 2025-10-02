"use client";

import { ButtonSubmit } from "@/components/ButtonSubmit";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PdfDocumentUpdateSettingSchema, typePdfDocumentUpdateSettingSchema } from "@/lib/validations/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { pdf_document_settings } from "../../../_types/pdf-document-setting";
import { updatePdfDocumentSetting } from "@/actions/settings";
import { toast } from "sonner";
import { errorHandler } from "@/lib/helpers/errorHandler";
import { settingsKeys } from "@/lib/queries/settings/queryKeys";
import { Badge } from "@/components/ui/badge";
import { CustomTooltip } from "@/components/CustomTooltip";

interface PdfDocumentFormProps {
    defaulValues?: pdf_document_settings;
}

export const PdfDocumentForm = ({ defaulValues }: PdfDocumentFormProps) => {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationKey: ["updatePdfDocumentSetting"],
        mutationFn: (data: typePdfDocumentUpdateSettingSchema) => updatePdfDocumentSetting(data, defaulValues?.id ?? ""),
    });

    const form = useForm<typePdfDocumentUpdateSettingSchema>({
        resolver: zodResolver(PdfDocumentUpdateSettingSchema),
        defaultValues: {
            organization_type: defaulValues?.organization_type,
            organization_name: defaulValues?.organization_name,
            organization_address: defaulValues?.organization_address,
            document_title: defaulValues?.document_title,
            footer_text: defaulValues?.footer_text,
            watermark_text: defaulValues?.watermark_text,
        },
    });

    const handleForm = form.handleSubmit((value) => {
        console.log({value})
        mutate(value, {
            onSuccess: () => {
                toast.success("Pdf Document Setting updated");
                queryClient.invalidateQueries({ queryKey: settingsKeys.pdf_document.lists() });
            },

            onError: (err) => {
                toast.error(errorHandler(err));
            },
        });
    });

    return (
        <Form {...form}>
            <form onSubmit={handleForm} className="space-y-8">
                <div className="space-y-6">
                    <h3 className="dark:text-gnrWhite font-medium">Header Dokumen PDF</h3>
                    <div className="space-y-6">
                        <FormField
                            control={form.control}
                            name="organization_type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="dark:text-gnrWhite">Jenis Organisasi</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="DEWAN KEMAKMURAN MASJID (DKM)"
                                            className="dark:text-gnrWhite dark:border-white/20 py-5"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription className="text-xs">Baris pertama header PDF</FormDescription>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="organization_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="dark:text-gnrWhite">Nama Organisasi</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder='MUSHOLA "AL HIDAYAH"'
                                            className="dark:text-gnrWhite dark:border-white/20 py-5"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription className="text-xs">Baris kedua header PDF</FormDescription>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="organization_address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="dark:text-gnrWhite">Alamat Lengkap Organisasi</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="lingkungan Al hidayah..."
                                            className="dark:text-gnrWhite dark:border-white/20 py-5"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription className="text-xs">
                                        Alamat lengkap di bawah nama organisasi
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="document_title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="dark:text-gnrWhite">Judul Dokumen</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="CATATAN KEUANGAN DEWAN KEMAKMURAN MASJID MUSHOLA AL HIDAYAH"
                                            className="dark:text-gnrWhite dark:border-white/20 py-5"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription className="text-xs">
                                        Judul utama dokumen (gunakan \n untuk garis baru){" "}
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <hr />

                <div className="space-y-6">
                    <h3 className="dark:text-gnrWhite font-medium">Footer Dokumen <CustomTooltip textTooltip="Footer dan Watermark segera..."><Badge className="bg-gnrPrimary text-xs">Beta</Badge></CustomTooltip> </h3>
                    <div className="space-y-6">
                        <FormField
                            control={form.control}
                            name="footer_text"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="dark:text-gnrWhite">Teks Footer</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Informasi tambahan untuk footer..."
                                            className="dark:text-gnrWhite dark:border-white/20 py-5"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="watermark_text"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="dark:text-gnrWhite">Text Watermark</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder='Watermark file...'
                                            className="dark:text-gnrWhite dark:border-white/20 py-5"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                </div>
            </form>
        </Form>
    );
};
