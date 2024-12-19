import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select, message, InputNumber } from "antd";
import { getProduct } from "../../services/AdminService";

const OrdersForm = ({ visible, onOk, onCancel, initialValues }) => {
    const [form] = Form.useForm();
    const [products, setProducts] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]); // Danh sách sản phẩm đã chọn
    const [totalPrice, setTotalPrice] = useState(0); // Trạng thái lưu tổng tiền

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProduct();
                console.log('product: ', response);
                setProducts(response);
            } catch (error) {
                message.error("Có lỗi khi tải sản phẩm: " + error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (visible) {
            form.resetFields();
            console.log("Initial values:", initialValues);
            if (initialValues) {
                form.setFieldsValue(initialValues);
                setOrderDetails(initialValues.Order_details || []); // Load Order_details vào state
                setTotalPrice(initialValues.total_price || 0); // Load tổng tiền từ API
            } else {
                setOrderDetails([]); // Reset nếu không có dữ liệu
                setTotalPrice(0); // Reset tổng tiền nếu tạo mới
            }
        }
    }, [visible, initialValues, form]);

    // Cập nhật tổng tiền
    const updateTotalPrice = (details) => {
        const total = details.reduce((sum, detail) => {
            const product = products.find(p => p.product_id === detail.product_id);
            const unitPrice = product ? product.unit_price : 0;
            return sum + (unitPrice * (detail.total_quantity || 0));
        }, 0);
        setTotalPrice(total);
    };

    // Thêm sản phẩm vào danh sách chi tiết hóa đơn
    const addOrderDetail = () => {
        const updatedDetails = [...orderDetails, { product_id: null, total_quantity: 1 }];
        setOrderDetails(updatedDetails);
        updateTotalPrice(updatedDetails);
    };

    const handleDetailChange = (index, field, value) => {
        const updatedDetails = [...orderDetails];
        updatedDetails[index][field] = value;
    
        // Tự động cập nhật sale_price nếu field là product_id
        if (field === "product_id") {
            const selectedProduct = products.find(p => p.product_id === value);
            if (selectedProduct) {
                updatedDetails[index].sale_price = selectedProduct.unit_price;
            }
        }
    
        setOrderDetails(updatedDetails);
        updateTotalPrice(updatedDetails);
    };

    const removeOrderDetail = (index) => {
        const updatedDetails = [...orderDetails];
        updatedDetails.splice(index, 1);
        setOrderDetails(updatedDetails);
        updateTotalPrice(updatedDetails);
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            
            // Validation cho Order_details
            for (let i = 0; i < orderDetails.length; i++) {
                const detail = orderDetails[i];
                if (!detail.product_id) {
                    message.error(`Vui lòng chọn sản phẩm cho mục ${i + 1}`);
                    return;
                }
                if (!detail.total_quantity || detail.total_quantity <= 0) {
                    message.error(`Vui lòng nhập số lượng hợp lệ cho mục ${i + 1}`);
                    return;
                }
            }
    
            const orderPayload = {
                ...values,
                total_price: totalPrice, // Gửi tổng tiền
                Order_details: orderDetails,
            };
    
            console.log("Payload gửi lên:", orderPayload);
            onOk(orderPayload);
        } catch (error) {
            console.log("Validation failed:", error);
        }
    };    

    return (
        <Modal
            title={initialValues ? "Sửa Hóa Đơn" : "Thêm Hóa Đơn"}
            open={visible}
            onCancel={onCancel}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    name="customer_name"
                    label="Tên khách hàng"
                    rules={[{ required: true, message: "Vui lòng nhập tên khách hàng" }]}
                >
                    <Input disabled={!!initialValues} />
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Địa chỉ"
                    rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
                >
                    <Input.TextArea
                        autoSize={{ minRows: 3, maxRows: 3 }}
                    />
                </Form.Item>

                <Form.Item
                    name="phone_number"
                    label="Số điện thoại"
                    rules={[{ required: true, message: "Vui lòng nhập số điện thoại" },
                    { min: 10, max: 10, message: 'Số điện thoại phải đủ 10 chữ số' }
                    ]}
                >
                    <Input />
                </Form.Item>

                {/* Danh sách chi tiết hóa đơn */}
                <div>
                    <h4>Chi Tiết Hóa Đơn</h4>
                    {orderDetails.map((detail, index) => (
                        <div key={index} style={{ display: "flex", gap: "5px", marginBottom: "5px" }}>
                            <Select
                                placeholder="----- Chọn sản phẩm -----"
                                style={{ flex: 1, width: "20rem" }}
                                value={detail.product_id}
                                onChange={(value) => handleDetailChange(index, "product_id", value)}
                            >
                                {products.map((product) => (
                                    <Select.Option key={product.product_id} value={product.product_id}>
                                        {product.product_name}
                                    </Select.Option>
                                ))}
                            </Select>
                            
                            <InputNumber
                                min={1}
                                placeholder="Số lượng"
                                value={detail.total_quantity}
                                onChange={(value) => handleDetailChange(index, "total_quantity", value)}
                            />
                            <Input 
                                style={{ width: "10rem" }}
                                placeholder="Giá bán"
                                value={detail.sale_price}
                                disabled
                            />
                            <Button onClick={() => removeOrderDetail(index)} >
                                Xóa
                            </Button>
                        </div>
                    ))}
                    <Button onClick={addOrderDetail} type="dashed" style={{ marginTop: "5px" }}>
                        Thêm Sản Phẩm
                    </Button>
                </div>
                
                {/* Hiển thị tổng tiền */}
                <div style={{ marginTop: "10px", fontWeight: "bold" }}>
                    Tổng tiền: {totalPrice.toLocaleString()} VND
                </div>

                <Form.Item>
                    <Button
                        style={{ marginRight: "10px", marginTop: "10px" }}
                        type="primary"
                        htmlType="submit"
                    >
                        {initialValues ? "Cập nhật" : "Thêm mới"}
                    </Button>
                    <Button onClick={onCancel}>Hủy</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default OrdersForm;
