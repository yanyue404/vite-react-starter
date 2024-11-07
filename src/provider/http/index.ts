import httpApi from "./http";
const { VITE_ENV } = import.meta.env; //环境  development 开发  test 测试环境  production 生产

interface Res {
  error_code?: string;
  error_message?: string;
}

// api日志样式
const styleEnum = {
  REQ: "font-size:16px;color:orange;",
  RES: "font-size:16px;color:green;",
  ERR: "font-size:16px;color:red;",
};

function log(title, style, data) {
  console.log(title, style ? styleEnum[style] : null, data);
}

const apiLog = {};
["req", "res", "err"].forEach((k) => {
  apiLog[k] = (title, data) => log(`%c${title}`, k.toUpperCase(), data);
});

export function GET(url, config?): Promise<API> {
  apiLog.res(`${url}:请求参数=====>`, url.split("?")[1]);

  return new Promise((resolve, reject) => {
    httpApi
      .get(url)
      .then((res) => {
        const data: Res = res.data;
        apiLog.res(`${name}:响应成功数据=====>`, data);
        if (data.error_code != "0" && data.error_message) {
          // showToast(data.error_message);
        }
        resolve(data);
      })
      .catch((err) => {
        apiLog.err(`${name}:响应失败数据=====>`, err);
        resolve(err);
      });
  });
}

export function POST(url, params?, config?): Promise<API> {
  apiLog.res(`${url}:请求参数=====>`, params);

  return new Promise((resolve, reject) => {
    httpApi["POST"](url, params, { headers: config?.headers || {} })
      .then((res) => {
        const data: Res = res.data;
        apiLog.res(`${name}:响应成功数据=====>`, data);
        if (data.error_code != "0" && data.error_message) {
          // showToast(data.error_message);
        }
        resolve(data);
      })
      .catch((err) => {
        apiLog.err(`${name}:响应失败数据=====>`, err);
        resolve(err);
      });
  });
}
