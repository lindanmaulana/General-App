import { SUPABASEURL } from "../config";

const BASE_URL_IMAGE = `${SUPABASEURL}/storage/v1/object/public/`
const BUCKET_APP_IMAGES = "app_images"
const PATH_LOGO = "public/logo"

console.log({BASE_URL_IMAGE})

export {
    BASE_URL_IMAGE,
    BUCKET_APP_IMAGES,
    PATH_LOGO
}