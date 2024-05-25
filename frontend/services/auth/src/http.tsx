import axios from "axios";

const API_URL = 'http://localhost:3020'

const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

export {$api}