import { Col, Form, InputNumber, Row, Typography } from 'antd';
import Container from '~/components/UI/Container/Container';

const { Title } = Typography;

function ProductPrice() {
  return (
    <Container>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col span={24}>
          <Title level={4}>Giá sản phẩm</Title>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item name="oldPrice" label="Giá gốc">
            <InputNumber
              className="rounded"
              min={0}
              addonAfter={<div>VNĐ</div>}
              placeholder="Giá gốc"
              formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => parseInt(value.replace(/\$\s?|(,*)/g, ''))}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="price"
            label="Giá bán"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              className="rounded"
              min={0}
              addonAfter={<div>VNĐ</div>}
              placeholder="Giá bán"
              formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => parseInt(value.replace(/\$\s?|(,*)/g, ''))}
            />
          </Form.Item>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductPrice;
