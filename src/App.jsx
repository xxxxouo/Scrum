import React from 'react';
import { useRoutes } from 'react-router-dom';
import Routes from 'routers/index';
import Layout from 'components/Layout/Layout';
import SuspenseWithChunkError from 'components/SuspenseWithChunkError';
import PageLoader from 'components/Loader/PageLoader';
const App = ()=> {
  const element = useRoutes(Routes);
  return (
    <SuspenseWithChunkError fallback={<PageLoader />} >
      { element}
    </SuspenseWithChunkError>
  );
}

export default React.memo(App);
