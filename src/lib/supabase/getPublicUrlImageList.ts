// https://ioehpysldibnjemrnfch.supabase.co/storage/v1/object/public/app_images/public/logo/general.png

import { BASE_URL_IMAGE } from "."


export const getPublicUrlImageList = (bucketName: string, path: string, imageName: string) => {
    return `${BASE_URL_IMAGE}${bucketName}/${path}/${imageName}`
}