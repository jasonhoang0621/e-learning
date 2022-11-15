import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'https://login-core-server.herokuapp.com/api/',
    // baseURL: "http://localhost:4000/",
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `${token}` || ''
    return config
})
axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data
        }
        return response
    },
    async (error) => {
        if (error?.response?.status === 401) {
            localStorage.removeItem('token')
            window.location.href = '/'
        }
        const originalRequest = error.config
        if (error?.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true
            const result = await axiosClient.post('/refreshToken', {
                refreshToken: localStorage.getItem('refreshToken'),
                email: JSON.parse(localStorage.getItem('user'))?.email,
            })
            if (result?.errorCode) {
                localStorage.removeItem('token')
                localStorage.removeItem('refreshToken')
                window.location.href = '/'
                return
            }
            localStorage.setItem('token', result?.data?.token)
            localStorage.setItem('refreshToken', result?.data?.refreshToken)
            axiosClient.defaults.headers.common['Authorization'] =
                result?.data?.token
            return axiosClient(originalRequest)
        }
    }
)

export { axiosClient }
