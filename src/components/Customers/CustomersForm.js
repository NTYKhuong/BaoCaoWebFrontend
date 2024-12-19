import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const CustomersForm = ({ visible, onOk, onCancel, initialValues }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            form.resetFields();
            if (initialValues) {
                form.setFieldsValue(initialValues);
            }
        }
    }, [visible, initialValues, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            onOk(values); // Gọi hàm onOk khi các trường hợp đều hợp lệ
        } catch (error) {
            console.log('Validation failed:', error);
        }
    };

    return (
        <Modal
            title={initialValues ? 'Sửa Khách Hàng' : 'Thêm Khách Hàng'}
            open={visible}
            onCancel={onCancel}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    name="customer_name"
                    label="Tên khách hàng"
                    rules={[
                        { required: true, message: 'Vui lòng nhập tên khách hàng' },
                        { min: 3, message: 'Tên sản phẩm ít nhất 3 ký tự' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Địa chỉ"
                    rules={[
                        { required: true, message: 'Vui lòng nhập địa chỉ' },
                        { min: 3, message: 'Tên sản phẩm ít nhất 3 ký tự' },
                    ]}
                >
                    <Input.TextArea
                        autoSize={{ minRows: 3, maxRows: 4 }}
                    />
                </Form.Item>

                <Form.Item
                    name="phone_number"
                    label="Số điện thoại"
                    rules={[
                        { required: true, message: 'Vui lòng nhập điện thoại' },
                        { min: 10, max: 10, message: 'Số điện thoại phải đủ 10 chữ số' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button
                        style={{ marginRight: '10px' }}
                        type='primary'
                        htmlType="submit">
                        {initialValues ? 'Cập nhật' : 'Thêm mới'}
                    </Button>
                    <Button onClick={onCancel}>Hủy</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CustomersForm;