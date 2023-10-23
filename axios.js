import axios from "axios";
import store from "/src/store/store";

const instance = axios.create({
    baseURL: 'https://gateway.scan-interfax.ru/api/v1/',
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
    }
});

instance.interceptors.request.use( async config => {
    const token = await store.getState()?.user.accessToken;
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
    return config
}, error => {
        return Promise.reject(error);
    }
)

export default instance