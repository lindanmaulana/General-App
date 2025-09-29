"use client";

import { uploadLogoStorage } from "@/actions/storage";
import { ButtonSubmit } from "@/components/ButtonSubmit";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { errorHandler } from "@/lib/helpers/errorHandler";
import { storageKeys } from "@/lib/queries/storage/queryKeys";
import { typeUploadImageSchema, UploadImageSchema } from "@/lib/validations/images";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const UploadLogo = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [preview, setPreview] = useState<string>("");
    const queryClient = useQueryClient()

    const form = useForm<typeUploadImageSchema>({
        resolver: zodResolver(UploadImageSchema),
        defaultValues: {
            image: null,
        },
    });

    const {mutate, isPending} = useMutation({
        mutationKey: ["uploadLogo"],
        mutationFn: (data: typeUploadImageSchema) => uploadLogoStorage(data)
    });

    const handleForm = form.handleSubmit((value) => {
        console.log({ value });

        mutate(value, {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: storageKeys.logo.lists()})
                toast.success("Gambar berhasil di simpan")
                form.reset()
                setIsOpen(false)
            }, 

            onError: (err) => {
                toast.error(errorHandler(err), {
                    style: {backgroundColor: "red"}
                })
            }
        })
    });

    const handleChangeUpload = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: File | null) => void) => {
        const file = e.target.files?.[0];

        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
            onChange(file);
        } else {
            setPreview("");
            onChange(null);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-gnrPrimary hover:bg-gnrPrimary/80 cursor-pointer">
                    {" "}
                    <Upload /> Upload Logo
                </Button>
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form className="space-y-2">
                        <DialogTitle>Upload Logo</DialogTitle>
                        <DialogDescription className="mb-4">
                            Pilih file gambar untuk logo baru. Preview akan ditampilkan sebelum menyimpan ke database.
                        </DialogDescription>

                        <div className="space-y-4">
                            <div className="min-h-20 max-h-50 flex items-center justify-center border py-4 rounded overflow-y-auto">
                                {preview && (
                                    <Image
                                        src={preview}
                                        alt="Preview image"
                                        width={100}
                                        height={100}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>

                            <div className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pilih File</FormLabel>
                                            <FormControl>
                                                <Input
                                                    onChange={(e) => handleChangeUpload(e, field.onChange)}
                                                    type="file"
                                                    placeholder=""
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex items-center justify-end gap-2">
                                    <Button variant={"destructive"} type="button" onClick={() => {setPreview(""); form.reset()}} className="cursor-pointer">Batal</Button>
                                    <ButtonSubmit
                                        type="button"
                                        onClick={handleForm}
                                        title="Upload"
                                        style="bg-gnrPrimary"
                                        isLoading={isPending}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
