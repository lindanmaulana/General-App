import { queryOptions } from "@tanstack/react-query";
import { settingsKeys } from "./queryKeys";
import { getPdfDocumentSetting } from "@/lib/services/settings.service";

export const pdfDocumentSettingListOptions = () => queryOptions({
    queryKey: settingsKeys.pdf_document.lists(),
    queryFn: getPdfDocumentSetting,
    staleTime: 1 * 60 * 60 * 1000
})