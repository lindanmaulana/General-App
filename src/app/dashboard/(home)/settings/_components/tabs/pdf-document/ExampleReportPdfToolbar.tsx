"use client";

import { ExampleReportPdf } from "@/components/ExampleReportPdf.tsx";
import { Button } from "@/components/ui/button";
import { handleParseDate } from "@/lib/helpers/parsing";
import { usePDF } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { Download } from "lucide-react";

export const ExampleReportPdfToolbar = () => {
    const [instance, update] = usePDF({});

    const handleDownloadSample = () => {
        const dateNow = handleParseDate(Date.now().toString(), "YYYY-MM-DD");

        update(<ExampleReportPdf />);

        if (instance.url) saveAs(instance.url, `Example report - ${dateNow}`);
    };

    console.log({ instance });

    return (
        <Button
            type="button"
            variant={"outline"}
            onClick={handleDownloadSample}
            disabled={instance.loading}
            className="dark:bg-transparent dark:text-gnrWhite dark:border-white/20 dark:hover:bg-gnrDark dark:hover:text-gnrWhite/70 cursor-pointer"
        >
            <Download />
            {!instance.url ? (
                <span>Generate Sample</span>
            ) : (
                <span>{instance.loading ? "Generating" : "Download Sample"}</span>
            )}
        </Button>
    );
};
