/* eslint-disable no-template-curly-in-string */
import React from 'react';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { Row, Col, Button, Form, Input, Select, DatePicker, Space } from 'antd';
import Toolbar from '~/components/UI/Toolbar';
import { useNavigate } from 'react-router-dom';
import ModalForm from '~/HOC/ModalForm';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '~/redux/reducer/ModalReducer';
import AddProductToReceipt from './AddProductToReceipt';
import * as SagaActionTypes from '~/redux/constants/constant';
import LoadingSpin from '~/components/UI/LoadingSpin/LoadingSpin';
import ProductsWarehouseTable from './ProductsWarehouseTable';
import Cookies from 'js-cookie';
import AlertCustom from '~/components/UI/Notification/Alert';

const dateFormat = 'DD/MM/YYYY';

const AddWarehouseReceipt = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [keyWord, setKeyWord] = useState('');
  const { loading } = useSelector((state) => state.productSlice);

  const [products, setProducts] = useState([]);
  const currentUser = useSelector((state) => state.authenticationSlice.currentUser);

  const isCreateReceiptSucceeded = useSelector((state) => state.receiptSlice.isCreateReceiptSucceeded);

  const validateMessages = {
    required: 'Cần nhập ${label}!',
    types: {
      email: '${label} không hợp lệ!',
      number: '',
    },
    number: {
      min: '${label} phải ít nhất từ ${min} trở lên',
      range: '${label} phải trong khoảng từ ${min} đến ${max}',
    },
  };

  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_PRODUCTS_SAGA });
  }, [dispatch]);

  useEffect(() => {
    if (isCreateReceiptSucceeded) {
      navigate('/warehouse-receipt', { replace: true });
    }
  }, [isCreateReceiptSucceeded]);

  const handleAddProduct = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
  };

  const handleEditProduct = (editedProduct) => {
    const updatedProducts = [...products];
    const existingProductIndex = updatedProducts.findIndex((product) => product._id === editedProduct._id);

    if (existingProductIndex !== -1) {
      updatedProducts[existingProductIndex].importPrice = editedProduct.importPrice;
      updatedProducts[existingProductIndex].sizes.forEach((size, index) => {
        size.quantity = editedProduct.sizes[index].quantity;
      });

      setProducts(updatedProducts);
    }
  };

  const handleRemoveProduct = (removeProduct) => {
    const updatedProducts = [...products];
    const filteredProducts = updatedProducts.filter((item) => item._id !== removeProduct._id);
    setProducts(filteredProducts);
  };

  const handleShowModalAddProduct = () => {
    dispatch(
      modalActions.showModal({
        title: 'Thêm sản phẩm',
        ComponentContent: <AddProductToReceipt onAddProduct={handleAddProduct} listProducts={products} />,
      }),
    );
  };

  const handleClose = () => {
    navigate('/warehouse-receipt');
  };

  const handleSubmit = () => {
    form.submit();
  };

  const onFinish = (values) => {
    if (products.length === 0) {
      AlertCustom({ type: 'error', title: 'Cần ít nhất một sản phẩm' });
    } else {
      const formattedProducts = products.map((product) => ({
        productId: product._id,
        sizes: product.sizes,
        importPrice: product.importPrice,
      }));
      const newReceipt = { ...values, products: formattedProducts, staff: currentUser._id };

      dispatch({ type: SagaActionTypes.CREATE_RECEIPT_SAGA, newReceipt });
    }
  };

  if (loading) {
    return <LoadingSpin />;
  }

  return (
    <>
      <Row>
        <Col span={24}>
          <Form
            name="add_reciept_form"
            form={form}
            onFinish={onFinish}
            initialValues={{
              staff: currentUser.name,
            }}
            validateMessages={validateMessages}
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '6px',
              filter: 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))',
              marginBottom: '10px',
            }}
          >
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col xs={24} sm={12} md={24} lg={12}>
                <Form.Item
                  name="date"
                  label="Ngày nhập hàng"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="Ngày nhập hàng"
                    format={dateFormat}
                    disabledDate={(current) => current.isAfter(dayjs())}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={24} lg={12}>
                <Form.Item name="staff" label="Nhân viên nhập hàng">
                  <Input
                    showSearch
                    placeholder="Nhân viên"
                    // value={currentUser.name}
                    // filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    // onChange={onChange}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={24} lg={12}>
                <Form.Item
                  name="supplier"
                  label="Nhà cung cấp"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Nhà cung cấp" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={24} lg={12}>
                <Form.Item
                  name="deliver"
                  label="Người giao hàng"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Người giao hàng" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={24}>
          <Toolbar title={'Thêm sản phẩm'} setKeyWord={setKeyWord} handleAdd={handleShowModalAddProduct} />
        </Col>
        <Col span={24}>
          <ProductsWarehouseTable
            keyWord={keyWord}
            data={products}
            onEditProduct={handleEditProduct}
            onRemoveProduct={handleRemoveProduct}
          />
        </Col>
        <Col span={24}></Col>
      </Row>
      <Row justify="end" style={{ marginTop: '8px' }}>
        <Space>
          <Button size="large" type="primary" onClick={handleSubmit}>
            Lưu
          </Button>
          <Button size="large" type="primary" danger onClick={handleClose}>
            Hủy
          </Button>
        </Space>
      </Row>
      <ModalForm />
    </>
  );
};

export default AddWarehouseReceipt;
