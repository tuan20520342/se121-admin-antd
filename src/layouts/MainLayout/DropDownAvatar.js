import React from 'react';
import { DownOutlined, SmileOutlined, UserOutlined, ExportOutlined } from '@ant-design/icons';
import { Dropdown, Space, Menu, Avatar, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AlertCustom from '~/components/UI/Notification/Alert';
import { useSelector, useDispatch } from 'react-redux';
const { Text } = Typography;

const DropDownAvatar = ({ visibleText }) => {
  // const { staff } = useSelector((state) => state.staffsSlice);
  const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      title: 'Bạn có chắc muốn đăng xuất?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#9b9b9b',
      confirmButtonText: 'Đăng xuất',
    }).then((result) => {
      if (result.isConfirmed) {
        AlertCustom({ type: 'success', title: 'Đăng xuất thành công' });
        navigate('/login');
      }
    });
  };
  const menu = (
    <Menu theme="dark">
      <Menu.Item
        key="1"
        icon={<UserOutlined />}
        onClick={() => {
          navigate('/profile');
        }}
      >
        Thông tin cá nhân
      </Menu.Item>
      <Menu.Item key="2" icon={<ExportOutlined />} onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
      <Space style={{ cursor: 'pointer' }}>
        <Avatar className="bg-blue-300" icon={<UserOutlined />} />
        {visibleText && <Text strong>Nguyễn Văn A</Text>}
      </Space>
    </Dropdown>
  );
};
export default DropDownAvatar;
