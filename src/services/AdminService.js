import api from './api';

// Lấy danh sách Products
export const getProduct = async () => {
    try{
        const response = await api.get('/api/Products');
        return response.data;
    } catch (error) {
        console.log('Có lỗi xảy ra khi lấy danh sách sản phẩm:', error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const response = await api.get(`/api/Products/${id}`);
        return response.data;
    } catch (error) {
        console.log('Có lỗi xảy ra khi lấy sản phẩm có id = ', id);
        throw error;
    }
}

export const createProduct = async (newProduct) => {
    try {
        const response = await api.post(`/api/Products`, newProduct);
        return response.data;
    } catch (error) {
        console.log('Thêm sản phẩm không thành công: ', error);
        throw error;
    }
}

export const updateProduct = async (id, updateProduct) => {
    try {
        const response = await api.put(`/api/Products/${id}`, updateProduct);
        return response.data;
    } catch (error) {
        console.log('Cập nhật sản phẩm không thành công: ', error);
        throw error;
    }
}

export const deleteProduct = async (id) => {
    try {
        const response = await api.delete(`/api/Products/${id}`);
        return response.data;
    } catch (error) {
        console.log('Xóa sản phẩm không thành công: ', error);
        throw error;
    }
}

export const searchProduct = async (authorName) => {
    try {
        const response = await api.get(`/api/Products/author/${authorName}`);
        return response.data;
    } catch (error) {
        console.log('Không tìm thấy: ', error);
        throw error;
    }
}

export const getCategory = async () => {
    try {
        const response = await api.get(`/api/Category`);
        return response.data;
    } catch (error) {
        console.log('Lỗi khi lấy category: ', error);
        throw error;
    }
}

export const getCategoryById = async (id) => {
    try {
        const response = await api.get(`/api/Category/${id}?id=${id}`);
        return response.data;
    } catch (error) {
        console.log('Có lỗi xảy ra khi lấy category có id = ', id);
        throw error;
    }
}

export const getCategoryNameById = async (id) => {
    try {
        const response = await api.get(`/api/Category/${id}?id=${id}`);
        return response.data.category_name;
    } catch (error) {
        console.log('Có lỗi xảy ra khi lấy category có id = ', id);
        throw error;
    }
}