import { LoadingOutlined } from '@ant-design/icons';
import { Button, Alert, Space, Statistic, Input, Typography, message } from 'antd';
import { memo, useCallback, useContext, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import authApi from '~/api/auth.api';
import { message as antMessage } from 'antd';
import { AppContext } from '~/context/app.context';

const { Countdown } = Statistic;
const { Paragraph } = Typography;
function VerifyEmail({ onVerifySucces = () => {} }) {
  const { profile, setProfile } = useContext(AppContext);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [code, setCode] = useState('');
  const [deadline, setDeadline] = useState<number>(0);

  const resendCodeMutation = useMutation({
    mutationFn: () => {
      return authApi.resendVerifyCode();
    },
    onSuccess: (res) => {
      const data = res.data;
      if (!data.success) {
        antMessage.success(data.message);
      } else {
        antMessage.error(data.message);
      }
    },
    onError: (err) => {
      message.error('Something went wrong!');
    }
  });

  const verifyMutation = useMutation({
    mutationFn: (body: { verifyCode: string }) => {
      return authApi.verifyEmail(body);
    },
    onSuccess: (res) => {
      const data = res.data;
      if (data.success) {
        if (profile) {
          setProfile({ ...profile, verified: true });
        }
        onVerifySucces();
      } else {
        antMessage.error(data.message);
      }
    },
    onError: (err) => {
      message.error('Something went wrong!');
    }
  });
  const onFinish = useCallback(() => {
    setIsResending(false);
  }, []);

  const handleResend = () => {
    resendCodeMutation.mutate();
    const timeout = Date.now() + 60 * 1000;
    setDeadline(timeout);
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
    }, 60 * 1000);
  };

  const handleVerify = () => {
    if (code && code.length === 4) {
      verifyMutation.mutate({ verifyCode: code });
    } else {
      message.error('Please enter code with 4 character');
    }
  };

  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  return (
    <div className='flex-1 h-full'>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Alert
          message='We have sent you an verify email. Please check and enter your code!'
          type='info'
          showIcon
          action={
            <Button disabled={isResending} onClick={handleResend} size='small' type='default'>
              <div className='flex align-middle'>
                <div className='px-2'>Resend Email</div>
                {isResending && (
                  <Countdown valueStyle={{ fontSize: '0.8rem' }} value={deadline} onFinish={onFinish} format='mm:ss' />
                )}
              </div>
            </Button>
          }
        />
      </Space>
      <div className='my-4'>
        <Space.Compact style={{ width: '100%' }}>
          <Input value={code} onChange={handleChangeCode} placeholder='Verify code' />
          <Button disabled={verifyMutation.isLoading} onClick={handleVerify} type='primary'>
            <div className='flex align-middle'>
              {verifyMutation.isLoading && <LoadingOutlined style={{ fontSize: 20 }} spin className='me-2' />}
              Submit
            </div>
          </Button>
        </Space.Compact>
      </div>
      <Typography>
        <h3>Welcome with us</h3>
        <Paragraph>
          This set up only take a few minutes. To use all the features, please complete this set up. Thank you forusing
          my service
        </Paragraph>
        <Paragraph>If you get any problems. Please contact with us by:</Paragraph>
        <Paragraph>
          <ul>
            <li>
              Phone number: <a href='tel:0123456789'>+84.xxx.xxx</a>
            </li>
            <li>
              Facebook: <a href='https://www.facebook.com/ngocduc.k17c1'>https://www.facebook.com/ngocduc.k17c1</a>
            </li>
            <li>
              Email: <a href='mailto: daungocduc1999@gmail.com'>daungocduc1999@gmail.com</a>
            </li>
          </ul>
        </Paragraph>
      </Typography>
    </div>
  );
}

export default memo(VerifyEmail);
