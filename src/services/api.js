/* API Configuration */

import axios from 'axios';

const API_URL = 'http://localhost:5281';

// Tạo một instance của Axios
const api = axios.create({
    baseURL: API_URL,
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});

// Thêm Interceptor cho request (thêm token vào headers)
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user')); // Lấy token từ localStorage
        if (user && user.token) {
            // console.log('Token: ', user.token);
            config.headers.Authorization = `Bearer ${user.token}`; // Thêm token vào headers
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Thêm Interceptor cho response (xử lý lỗi)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error('Unauthorized: Token hết hạn hoặc bạn không có quyền truy cập!');
            // Thêm logic chuyển hướng hoặc làm mới token tại đây
        }
        return Promise.reject(error);
    }
);

export default api;