import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Select, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getCategory } from '../../services/AdminService';

const ProductsForm = ({ visible, onOk, onCancel, initialValues }) => {
    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]);
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategory();
                setCategories(response);
            } catch (error) {
                message.error('Có lỗi khi tải danh mục:' + error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if(visible) {
            form.resetFields();
            if(initialValues) {
                form.setFieldsValue(initialValues);
                // Nếu có ảnh cũ
                if (initialValues.image_path) {
                    setFileList([{ uid: '-1', name: 'Uploaded Image', status: 'done', url: initialValues.image_path }]);
                }
            }
        }
    }, [visible, initialValues, form]);

    const handleUploadChange = ({ fileList }) => setFileList(fileList);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const formData = new FormData();

            // Thêm các trường khác vào formData
            for (let key in values) {
                formData.append(key, values[key]);
            }

            // Thêm file ảnh vào formData
            if (fileList.length > 0 && fileList[0].originFileObj) {
                formData.append('image', fileList[0].originFileObj);
            }

            onOk(formData); // Gửi FormData lên server
        } catch (error) {
            console.log('Validation failed:', error);
        }
    };

    return (
        <Modal
            title={initialValues ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm'}
            open={visible}
            onCancel={onCancel}
            footer={null} 
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    name="product_name"
                    label="Tên sản phẩm"
                    rules={[
                        { required: true, message: 'Vui lòng nhập tên sản phẩm' },
                        { min: 3, message: 'Tên sản phẩm ít nhất 3 ký tự' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="inventory_quantity"
                    label="Số lượng"
                    rules={[
                        { required: true, message: 'Vui lòng nhập số lượng' },
                    ]}
                >
                    <Input type='number'/>
                </Form.Item>
                <Form.Item
                    name="original_price"
                    label="Giá gốc"
                    rules={[
                        { required: true, message: 'Vui lòng nhập giá gốc' },
                    ]}
                >
                    <Input type='number'/>
                </Form.Item>
                <Form.Item
                    name="unit_price"
                    label="Giá bán"
                    rules={[
                        { required: true, message: 'Vui lòng nhập giá bán' },
                    ]}
                >
                    <Input type='number'/>
                </Form.Item>

                <Form.Item 
                    name="category_id"
                    label="Loại"
                    rules={[
                        { required: true, message: 'Vui lòng chọn loại' },
                    ]}
                >
                    <Select placeholder="----- Chọn loại -----">
                        {categories.map(category => (
                            <Select.Option key={category.category_id} value={category.category_id}>
                                {category.category_name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="image" label="Hình ảnh" valuePropName="fileList" getValueFromEvent={(e) => e.fileList}>
                    <Upload
                        fileList={fileList}
                        beforeUpload={() => false} // Không tự động upload
                        onChange={handleUploadChange}
                        listType="picture"
                    >
                        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mô tả cho sản phẩm'},
                    ]}
                >
                    <Input.TextArea 
                        autoSize={{ minRows: 3, maxRows: 3 }}
                    />
                </Form.Item>

                <Form.Item>
                    <Button 
                        style={{ marginRight: '10px' }}
                        type='primary'
                        htmlType="submit"
                    >
                        {initialValues ? 'Cập nhật' : 'Thêm mới'}
                    </Button>
                    <Button onClick={onCancel}>Hủy</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ProductsForm;