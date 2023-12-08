import axios from 'axios'
import store from '../store';

const api = axios.create({
    baseURL: 'api',
})

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = store.getters['getAccessToken'];
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        console.log(error)
        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = this.$store.getters.getRefreshToken;
                const response = await axios.post('/api/refresh-token', { refreshToken });
                const { token, refreshedToken } = response.data

                // Store the tokens in store's state for later use
                this.$store.dispatch('login', {
                    accessToken: token,
                    refreshToken: refreshedToken,
                });

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axios(originalRequest);
            } catch (error) {
                // Handle refresh token error or redirect to login
            }
        }

        return Promise.reject(error);
    }
);

export default api
