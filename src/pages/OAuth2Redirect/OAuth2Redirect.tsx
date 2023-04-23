import { DEFAULT_REDIRECT } from '~/constant/oauth2';
import { useQueryString } from '~/hooks/useQueryString';

function OAuth2Redirect() {
  const queryString = useQueryString();

  if (queryString?.token) {
    const url = localStorage.getItem('redirect') || '';
    if (url) {
      window.location.href = url + `?token=${queryString.token}`;
    } else {
      window.location.href = DEFAULT_REDIRECT + `?token=${queryString.token}`;
    }
    return <div>{queryString?.token && JSON.stringify(queryString.token)}</div>;
  } else {
    return <>Error</>;
  }
}

export default OAuth2Redirect;
