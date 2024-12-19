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
        const response = await api.get(`/api/Products/${id}?id=${id}`);
        return response.data;
    } catch (error) {
        console.log('Có lỗi xảy ra khi lấy sản phẩm có id = ' + id, error);
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

export const updateProduct = async (id, updatedProduct) => {
    try {
        const response = await api.put(`/api/Products/${id}?id=${id}`, updatedProduct);
        return response.data;
    } catch (error) {
        console.log('Cập nhật sản phẩm không thành công: ', error);
        throw error;
    }
}

export const deleteProduct = async (id) => {
    try {
        const response = await api.delete(`/api/Products/${id}?id=${id}`);
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
        console.log('Lỗi khi lấy loại: ', error);
        throw error;
    }
}

export const getCategoryById = async (id) => {
    try {
        const response = await api.get(`/api/Category/${id}?id=${id}`);
        return response.data;
    } catch (error) {
        console.log('Có lỗi xảy ra khi lấy loại có id = ' + id, error);
        throw error;
    }
}

export const getCategoryNameById = async (id) => {
    try {
        const response = await api.get(`/api/Category/${id}?id=${id}`);
        return response.data.category_name;
    } catch (error) {
        console.log('Có lỗi xảy ra khi lấy loại có id = ' + id, error);
        throw error;
    }
}

export const createCategory = async (newCategory) => {
    try {
        const response = await api.post(`/api/Category`, newCategory);
        return response.data;
    } catch (error) {
        console.log('Thêm loại không thành công: ', error);
        throw error;
    }
}

export const updateCategory = async (id, updatedCategory) => {
    try {
        const response = await api.put(`/api/Category/${id}?id=${id}`, updatedCategory);
        return response.data;
    } catch (error) {
        console.log('Cập nhật loại không thành công: ', error);
        throw error;
    }
}

export const deleteCategory = async (id) => {
    try {
        const response = await api.delete(`/api/Category/${id}?id=${id}`);
        return response.data;
    } catch (error) {
        console.log('Xóa loại không thành công: ', error);
        throw error;
    }
}

export const getCustomer = async () => {
    try {
        const response = await api.get(`/api/Customers`);
        return response.data;
    } catch (error) {
        console.log('Lỗi khi lấy khách hàng: ', error);
        throw error;
    }
}

export const getCustomerById = async (id) => {
    try {
        const response = await api.get(`/api/Customers/${id}?id=${id}`);
        return response.data;
    } catch (error) {
        console.log('Có lỗi xảy ra khi lấy khách hàng có id = ' + id, error);
        throw error;
    }
}

export const createCustomer = async (newCustomer) => {
    try {
        const response = await api.post(`/api/Customers`, newCustomer);
        return response.data;
    } catch (error) {
        console.log('Thêm khách hàng không thành công: ', error);
        throw error;
    }
}

export const updateCustomer = async (id, updatedCustomer) => {
    try {
        const response = await api.put(`/api/Customers/${id}?id=${id}`, updatedCustomer);
        return response.data;
    } catch (error) {
        console.log('Cập nhật khách hàng không thành công: ', error);
        throw error;
    }
}

export const deleteCustomer = async (id) => {
    try {
        const response = await api.delete(`/api/Customers/${id}?id=${id}`);
        return response.data;
    } catch (error) {
        console.log('Xóa khách hàng không thành công: ', error);
        throw error;
    }
}

export const getOrder = async () => {
    try {
        const response = await api.get(`/api/Orders`);
        return response.data;
    } catch (error) {
        console.log('Lỗi khi lấy hóa đơn: ', error);
        throw error;
    }
}

export const getOrderById = async (id) => {
    try {
        const response = await api.get(`/api/Orders/${id}?id=${id}`);
        return response.data;
    } catch (error) {
        console.log('Có lỗi xảy ra khi lấy hóa đơn có id = ' + id, error);
        throw error;
    }
}

export const createOrder = async (newOrder) => {
    try {
        const response = await api.post(`/api/Orders`, newOrder);
        return response.data;
    } catch (error) {
        console.log('Thêm hóa đơn không thành công: ', error);
        throw error;
    }
}

export const updateOrder = async (id, updatedOrder) => {
    try {
        const response = await api.put(`/api/Orders/${id}?id=${id}`, updatedOrder);
        return response.data;
    } catch (error) {
        console.log('Cập nhật hóa đơn không thành công: ', error);
        throw error;
    }
}

export const deleteOrder = async (id) => {
    try {
        const response = await api.delete(`/api/Orders/${id}?id=${id}`);
        return response.data;
    } catch (error) {
        console.log('Xóa hóa đơn không thành công: ', error);
        throw error;
    }
}

export const getOrderDetailsByOrderId = async (orderId) => {
    try {
        const response = await api.get(`/api/OrderDetails/getByOrderId?order_id=${orderId}`);
        return response.data;
    } catch (error) {
        console.log('Có lỗi khi lấy chi tiết hóa đơn với id = ' + orderId, error);
        throw error;
    }
};
