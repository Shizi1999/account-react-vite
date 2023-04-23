import { Button, Form, Input, Radio, message } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { LoadingOutlined } from '@ant-design/icons';
import { useCallback, useState } from 'react';
import { UserAddressType, UserInformation } from '~/types/user.type';
import { message as antMessage } from 'antd';

import UserAddress from '~/components/UserAddress';
import userApi from '~/api/user.api';

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
};

const email = localStorage.getItem('email') || '';
function UpdateInformation({ onUpdateSuccess }: { onUpdateSuccess: () => void }) {
  const [form] = Form.useForm();
  const [userAddress, setUserAddress] = useState<UserAddressType>({ isValid: false });

  const { isLoading, mutate } = useMutation({
    mutationFn: (body: UserInformation) => {
      return userApi.updateInformation(body);
    },
    onSuccess: (res) => {
      const data = res.data;
      console.log(data);

      if (data.success) {
        antMessage.success(data.message);
        onUpdateSuccess();
      } else {
        antMessage.error(data.message);
      }
    },
    onError: (err) => {}
  });

  const handleSubmit = (values: FormData) => {
    if (userAddress.isValid) {
      userAddress.name = `${values.firstName.trim()} ${values.lastName.trim()}`;
      userAddress.phoneNumber = values.phone;
      const { isValid, ...atrr } = userAddress;
      const user = { ...values, email };
      userAddress.defaultAddress = true;
      mutate({ ...user, userAddress: { ...atrr } });
    } else {
      message.error('Address is invalid');
    }
  };

  const handleAddressChange = useCallback((value: UserAddressType) => {
    setUserAddress(value);
  }, []);

  return (
    <div className='flex-1 h-full'>
      <Form form={form} name='update-information' layout='vertical' onFinish={handleSubmit}>
        <Form.Item
          name='firstName'
          rules={[{ required: true, message: 'Input your firstname' }]}
          required
          label='First name'
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='lastName'
          rules={[{ required: true, message: 'Input your lastname' }]}
          required
          label='Last name'
        >
          <Input />
        </Form.Item>
        <Form.Item
          required
          name='phone'
          rules={[
            { required: true, message: 'Please input phone number!' },
            { pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/, message: 'Phone number is invalid!' }
          ]}
          label='Phone'
        >
          <Input />
        </Form.Item>
        <Form.Item
          validateTrigger='onBlur'
          required
          label='Gender'
          name='gender'
          rules={[{ required: true, message: 'Select your gender' }]}
        >
          <Radio.Group>
            <Radio value='true'>Male</Radio>
            <Radio value='false'>Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label='Address' required>
          <UserAddress onAddressChange={handleAddressChange} itemClassName='flex-1 mx-1' />
        </Form.Item>
        <Button htmlType='submit' type='primary' disabled={isLoading}>
          <div className='flex align-middle'>
            {isLoading && <LoadingOutlined style={{ fontSize: 20 }} spin className='me-2' />}
            Submit
          </div>
        </Button>
      </Form>
    </div>
  );
}

export default UpdateInformation;
