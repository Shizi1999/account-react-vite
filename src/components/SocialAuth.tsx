import FaceBook from '~/components/Facebook';
import Google from '~/components/Google';
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from '~/constant/oauth2';
function SocialAuth() {
  return (
    <>
      <h2 className='text-xl font-semibold leading-tight tracking-tight text-blue-500'>
        Continue with your social account
      </h2>
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-2'>
        <a
          href={FACEBOOK_AUTH_URL}
          className='border border-gray-300 px-2 py-3 text-center rounded-md mb-2 relative hover:bg-gray-100'
        >
          <FaceBook className='absolute' width={26} height={26} />
          <span className='text-gray-500'>Continue with facebook</span>
        </a>
        <a
          href={GOOGLE_AUTH_URL}
          className='border border-gray-300 px-2 py-3 text-center rounded-md mb-2 relative hover:bg-gray-100'
        >
          <Google className='absolute' width={26} height={26} />
          <span className='text-gray-500'>Continue with google</span>
        </a>
      </div>
      <div className='m-0 flex text-gray-500 items-center'>
        <div className='flex-1 bg-gray-300' style={{ height: '2px' }}></div>
        <div className='px-4'>OR</div>
        <div className='flex-1 bg-gray-300' style={{ height: '2px' }}></div>
      </div>
    </>
  );
}

export default SocialAuth;
