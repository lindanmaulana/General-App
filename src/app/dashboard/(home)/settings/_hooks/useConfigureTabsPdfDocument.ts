import { pdfDocumentSettingListOptions } from "@/lib/queries/settings/pdfDocumentSettingListOptions";
import { usePdfDocumentSetting } from "@/lib/zustand/usePdfDocumentSetting";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useConfigureTabsPdfDocument = () => {
    const { data, isLoading, isError } = useQuery(pdfDocumentSettingListOptions());
    const setStatePdfDocumentSetting = usePdfDocumentSetting((state) => state.setState);

    useEffect(() => {
        if (data) setStatePdfDocumentSetting(data);
    }, [data, setStatePdfDocumentSetting]);

    return {data, isLoading, isError}
};