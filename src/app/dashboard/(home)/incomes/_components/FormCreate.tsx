"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

export const FormCreate = () => {
    const form = useForm()
  return (
    <Dialog>
      <Form {...form}>
        <form action="">
            <DialogTrigger asChild>
                <Button className="bg-gnrPrimary cursor-pointer hover:bg-gnrPrimary/80">
                <Plus />
                <span>Tambah Pemasukan</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambah Pemasukan Baru</DialogTitle>
                    <DialogDescription>Masukkan detail pemasukan yang akan dicatat</DialogDescription>
                </DialogHeader>
                <div>
                    <Label>
                        <span></span>

                    </Label>
                </div>
            </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
};
