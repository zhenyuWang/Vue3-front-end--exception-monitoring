import { loadEnv } from "vite";
import vue from '@vitejs/plugin-vue'
// 引入upload sourcemap rollup plugin
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
      // 使用upload sourcemap rollup plugin
      uploadSourceMap({
        // 基本路径，判断当前环境使用
        baseUrl: env.VITE_BASE_API,
        // 处理目标文件夹接口地址
        handleTargetFolderUrl: `${env.VITE_MONITOR_UPLOAD_API}/emptyFolder`,
        // 上传sourcemap文件接口地址
        uploadUrl: `${env.VITE_MONITOR_UPLOAD_API}/uploadSourceMap`,
      }),
    ],
    build: {
      // 构建后是否生成 source map 文件
      sourcemap: true,
    }
  }
}
