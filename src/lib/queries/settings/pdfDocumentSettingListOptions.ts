import { queryOptions, UseQueryOptions } from "@tanstack/react-query";
import { settingsKeys } from "./queryKeys";
import { getPdfDocumentSetting } from "@/lib/services/settings.service";
import { pdf_document_settings } from "../../../../types/setttings";

export const pdfDocumentSettingListOptions = (options?: Partial<UseQueryOptions<pdf_document_settings>>) => queryOptions({
    queryKey: settingsKeys.pdf_document.lists(),
    queryFn: getPdfDocumentSetting,
    staleTime: 1 * 60 * 60 * 1000,
    ...options
})