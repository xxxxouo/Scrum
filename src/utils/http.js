import axios from "axios";
import eventBus from "./event";

const instance = axios.create({});
//
instance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      // 未登陆
      if (response.data.code === 401) {
      }
      // 业务错误
      if (response.data.code !== 0 && response.data.code !== 401) {
        eventBus.emit("global_error_tips", response.data.msg);
      }
    } else {
      // 后台问题
      eventBus.emit("global_error_tips", response.data.message);
    }
    return Promise.resolve(response.data);
  },
  () => {
    console.log("response");
    return Promise.reject();
  },
);

export default instance;
