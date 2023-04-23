import { SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Button, StepProps, Steps } from 'antd';
import { useCallback, useState } from 'react';

import VerifyEmail from './VerifyEmail';
import UpdateInformation from './UpdateInformation';
import DoneStep from './DoneStep';
import images from '~/assets/images';
import { useNavigate } from 'react-router-dom';
import path from '~/constant/path';

const steps: StepProps[] = [
  {
    title: 'Verification',
    icon: <SolutionOutlined />
  },
  {
    title: 'Update infomation',
    icon: <UserOutlined />
  },
  {
    title: 'Done',
    icon: <SmileOutlined />
  }
];
function Verify() {
  const [verified, setVerified] = useState<boolean>(false);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const next = () => {
    if (verified) {
      if (current) setCurrent((prev) => prev + 1);
    }
  };

  const handleStepSuccess = useCallback(() => {
    setVerified(true);
    setCurrent((prev) => prev + 1);
  }, []);

  const handleEndStep = () => {
    navigate(path.home);
  };

  return (
    <div
      className='bg-gray-600 w-100 bg-center h-screen bg-cover bg-no-repeat bg-blend-multiply bg-opacity-60'
      style={{ backgroundImage: `url(${images.formBg})` }}
    >
      <div className='px-2 py-10 md:py-6 md:px-24 flex align-middle justify-center h-full ' style={{ width: '100%' }}>
        <div
          className='bg-white  rounded-xl px-2 py-2  md:px-10 md:pb-12 md:pt-8 relative overflow-hidden'
          style={{ width: '100%' }}
        >
          <Steps current={current} labelPlacement='horizontal' items={steps} />
          <div className='h-full mt-4 overflow-y-auto'>
            <div className='flex md:flex-row flex-col-reverse'>
              {current === 0 && <VerifyEmail onVerifySucces={handleStepSuccess} />}
              {current === 1 && <UpdateInformation onUpdateSuccess={handleStepSuccess} />}
              {current === 2 && <DoneStep />}
              <div className='flex-1 h-full md:flex  justify-center hidden ps-4'>
                <img className='object-scale-down' style={{ height: '70vh' }} src={images.salebanner} alt='' />
              </div>
            </div>
            <div className='hidden md:flex justify-between absolute bottom-4'>
              <div>
                {current < steps.length - 1 && (
                  <Button type='primary' onClick={() => next()}>
                    {current === 1 ? 'Skip' : 'Next'}
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button type='primary' onClick={handleEndStep}>
                    Done
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verify;
