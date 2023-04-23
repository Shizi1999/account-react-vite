import { Alert, Space, Typography } from 'antd';

const { Paragraph, Link } = Typography;
function DoneStep() {
  return (
    <div className='flex-1 h-full'>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Alert message='Congratulation. Everything is done!' type='success' showIcon />
      </Space>
      <div className='mt-2'>
        <Typography>
          <h3>Thank you for using my service</h3>
          <Paragraph>
            Visit our website to have more experience: <Link>https://fooshop.com.vn</Link>
          </Paragraph>
          <Paragraph>You may be like:</Paragraph>
          <Paragraph>
            <ul>
              <li>
                Sale up: <a href='tel:0123456789'>https://fooshop.com.vn/sale</a>
              </li>
              <li>
                Most rating product: <a href='https://www.facebook.com/ngocduc.k17c1'>https://fooshop.com.vn/rating</a>
              </li>
              <li>
                Click here to recieve advertisement by email: <a href='mailto: daungocduc1999@gmail.com'>register </a>
              </li>
            </ul>
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
    </div>
  );
}

export default DoneStep;
