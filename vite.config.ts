import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import pxtorem from "postcss-pxtorem";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
  css: {
    postcss: {
      plugins: [
        pxtorem({
          rootValue({ file }) {
            if (file.indexOf("sprite") !== -1) {
              return 100;
            }
            return file.indexOf("antd-mobile") !== -1 ? 50 : 100;
          },
          selectorBlackList: [], // 忽略转换正则匹配项
          propList: ["*"],
        }),
      ],
    },
  },
  build: {
    minify: "terser",
    terserOptions: {
      // 生产环境移除console
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    sourcemap: true /* 构建后是否生成 source map 文件 */,
    rollupOptions: {
      output: {
        chunkFileNames: "static/chunk/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
      },
    },
  },
  // 本地运行配置，及反向代理配置
  server: {
    host: "0.0.0.0",
    port: 9527,
    cors: true, // 默认启用并允许任何源
    open: false, // 在服务器启动时自动在浏览器中打开应用程序
    proxy: {
      "/api": {
        target: "https://api.github.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // 将 /api 变成空字符串
      },
    },
  },
});
