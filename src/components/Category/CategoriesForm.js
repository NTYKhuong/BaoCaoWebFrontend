import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const CategoriesForm = ({ visible, onOk, onCancel, initialValues }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if(visible) {
            form.resetFields();
            if(initialValues) {
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
            title={initialValues ? 'Sửa Loại' : 'Thêm Loại'}
            open={visible}
            onCancel={onCancel}
            footer={null} 
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    name="category_name"
                    label="Tên loại"
                    rules={[
                        { required: true, message: 'Vui lòng nhập tên loại' },
                        { min: 3, message: 'Tên loại ít nhất 3 ký tự' },
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

export default CategoriesForm;