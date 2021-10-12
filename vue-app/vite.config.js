import { loadEnv } from "vite";
import vue from '@vitejs/plugin-vue'
import uploadSourceMap from "./src/plugins/rollup-plugin-upload-sourcemap";

// mode 当前环境 development production
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    server: {
      open: true,
      port: 3000,
      host: "0.0.0.0",
      proxy: {
        // 本地测试异常监控用
        "/mointor": {
          target: 'http://127.0.0.1:7001',
          changeOrigin: true,
        },
      },
    },
    plugins: [
      vue(),
      // 打包后上传sourcemap
      uploadSourceMap({
        baseUrl: env.VITE_BASE_API,
        handleTargetFolderUrl: `${env.VITE_MONITOR_UPLOAD_API}/emptyFolder`,
        uploadUrl: `${env.VITE_MONITOR_UPLOAD_API}/uploadSourceMap`,
      }),
    ],
    build: {
      // 构建后是否生成 source map 文件
      sourcemap: true,
    }
  }
}
