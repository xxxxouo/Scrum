import React, { Fragment, useEffect } from "react";
import { notification } from "antd";
import eventBus from "utils/event";

export default function useNotification() {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = msg => {
    api.error({
      message: `${msg}`,
      placement: "topRight",
    });
  };

  useEffect(() => {
    eventBus.on("global_error_tips", msg => {
      openNotification(msg);
    });
  }, []);

  return contextHolder;
}
