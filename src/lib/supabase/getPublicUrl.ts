import { BASE_URL_IMAGE } from "."


export const getPublicUrlImage = (bucketName: string, imagePath: string) => {
    return `${BASE_URL_IMAGE}/${bucketName}/${imagePath}`
}