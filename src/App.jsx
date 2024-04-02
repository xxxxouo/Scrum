import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import Routes from "routers/index";
import SuspenseWithChunkError from "components/SuspenseWithChunkError";
import PageLoader from "components/Loader/PageLoader";
import useNotification from "hooks/useNotification";
import useMessage from "hooks/useMessage";
import useGlobal from "hooks/useGlobal";
import useGoLogin from "hooks/useGoLogin";
const App = () => {
  const element = useRoutes(Routes);
  const contextHolder = useNotification();
  const messageHolder = useMessage();
  useGlobal();
  useGoLogin();
  return (
    <SuspenseWithChunkError fallback={<PageLoader />}>
      {contextHolder}
      {messageHolder}
      {element}
    </SuspenseWithChunkError>
  );
};

export default App;
