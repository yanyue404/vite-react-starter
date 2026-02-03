import axios from "axios";

// 如果需要加载提示，可以使用 Toast.show() 或其他 antd-mobile API
// function startLoading() {
//   // 使用 Toast 或其他加载组件
// }

// function endLoading() {
//   // 关闭加载提示
// }

const httpApi = axios.create({
  baseURL: `${location.origin}`,
  timeout: 10000,
});
httpApi.defaults.headers["Content-Type"] = "application/json";
httpApi.defaults.withCredentials = true; //允许写入cookie

/**
 * 请求拦截
 */
httpApi.interceptors.request.use(
  (config) => {
    // startLoading()
    return config;
  },
  (error) => {
    // endLoading(startLoading())
    return Promise.reject(error);
  }
);

/**
 * 响应拦截
 */
httpApi.interceptors.response.use(
  (response) => {
    // endLoading(startLoading());
    return response;
  },
  (error) => {
    // endLoading(startLoading());
    // error.message && ElMessage.error(error.message);
    return Promise.reject(error);
  }
);

export default httpApi;
