import React from "react";
import { useRoutes } from "react-router-dom";
import Routes from "routers/index";
import SuspenseWithChunkError from "components/SuspenseWithChunkError";
import PageLoader from "components/Loader/PageLoader";
import useNotification from "hooks/useNotification";
import useGlobal from "hooks/useGlobal";
const App = () => {
  const element = useRoutes(Routes);
  const contextHolder = useNotification();
  useGlobal();

  return (
    <SuspenseWithChunkError fallback={<PageLoader />}>
      {contextHolder}
      {element}
    </SuspenseWithChunkError>
  );
};

export default React.memo(App);
