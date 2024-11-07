import axios from "axios";

interface ErrMsg {
  message?: string;
  status?: string;
  url?: string;
}

function startLoading() {
  const loading = showLoadingToast({ message: "加载中...", forbidClick: true, duration: 0 });
  return loading;
}

function endLoading(loading) {
  loading.close();
}

// setTimeout(() => {
//   loading.close()
// }, 2000)

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
