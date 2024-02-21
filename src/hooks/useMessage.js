import { message } from "antd";
import React, { useEffect } from "react";
import eventBus from "utils/event";
function useMessage() {
  const [messageApi, contextHolder] = message.useMessage();
  const success = msg => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };
  const error = msg => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };
  useEffect(() => {
    eventBus.on("global_message", (type, msg) => {
      if (type === "success") {
        success(msg);
      } else if (type === "error") {
        error(msg);
      }
    });
  }, []);
  return contextHolder;
}

export default useMessage;
