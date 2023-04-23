import { Outlet } from 'react-router-dom';
import images from '~/assets/images';
import SocialAuth from '~/components/SocialAuth';
import { useQueryString } from '~/hooks/useQueryString';

export type LayoutProps = {
  children?: React.ReactNode;
  socialOption?: boolean;
};

function FormLayout({ socialOption }: LayoutProps) {
  const queryString = useQueryString();
  localStorage.setItem('redirect', queryString?.redirect || '');
  return (
    <div
      className='bg-gray-600 h-screen w-100 bg-center bg-cover bg-no-repeat bg-blend-multiply bg-opacity-60'
      style={{ backgroundImage: `url(${images.formBg})` }}
    >
      <section>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md md:max-w-xl xl:p-0 '>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <a
                href='/?redirect=http://localhost:3001/signup?abc'
                className='flex items-center mb-6 text-2xl font-semibold'
              >
                <img
                  className='w-8 h-8 mr-2'
                  src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
                  alt='logo'
                />
                Fooshop
              </a>
              {socialOption && <SocialAuth />}
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FormLayout;
