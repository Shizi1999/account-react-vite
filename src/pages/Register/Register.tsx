import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import authApi from '~/api/auth.api';
import path from '~/constant/path';

type FormData = {
  email: string;
  password: string;
};

function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation({
    mutationFn: (data: FormData) => {
      return authApi.register(data);
    },
    onSuccess: (res) => {
      const data = res.data;
      if (data.success) {
        navigate(path.verifyInformation);
      } else {
        message.error(data.message);
      }
    },
    onError: (err: any) => {
      message.error(err?.message);
    }
  });

  return (
    <Form form={form} name='normal_login' initialValues={{ remember: true }} onFinish={mutate}>
      <Form.Item name='email' rules={[{ required: true, type: 'email', message: 'The input is not valid E-mail!' }]}>
        <Input size='large' prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Email' />
      </Form.Item>
      <Form.Item name='password' rules={[{ required: true, min: 6, message: 'Please input your Password!' }]}>
        <Input.Password
          size='large'
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Password'
        />
      </Form.Item>
      <Form.Item
        name='confirmPassword'
        rules={[
          {
            required: true,
            message: 'Please confirm your password!'
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The confirm passwords that you entered do not match!');
            }
          })
        ]}
      >
        <Input.Password
          size='large'
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Cornfirm Password'
        />
      </Form.Item>
      <Form.Item>
        <Button loading={isLoading} type='primary' htmlType='submit' className='login-form-button w-full' size='large'>
          Sign up
        </Button>
      </Form.Item>
      <div className='mb-2'>
        Have account?
        <a href={path.login} className='text-blue-600 font-semibold ms-1'>
          Sign in
        </a>
      </div>
    </Form>
  );
}

export default Register;
