import axios from "axios";
import { APIURL } from "./config";

const APIBASEURL = APIURL


export const api = axios.create({
    baseURL: APIBASEURL
})