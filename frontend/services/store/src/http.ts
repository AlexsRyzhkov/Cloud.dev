import axios from "axios";

const API_URL = 'http://localhost:3020'

const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

$api.interceptors.response.use((response) => {
    return response
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            await axios.get(`/api/auth/register/`, { baseURL: API_URL, withCredentials: true})
            return $api.request(originalRequest)
        } catch (e) {
            console.log('Не авторизован');
        }
    }
    throw error
})


export {$api}