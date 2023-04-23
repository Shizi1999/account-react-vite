import '~/index.css';
import { AppContext } from './context/app.context';
import useRouteElements from './useRouteElements';
import { useContext, useEffect } from 'react';
import { LocalStorageEventTarget } from './utils/auth';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';

function App() {
  const routeElements = useRouteElements();
  const { reset } = useContext(AppContext);
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset);
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset);
    };
  }, [reset]);
  return <ErrorBoundary>{routeElements}</ErrorBoundary>;
}

export default App;
