import { loadEnv } from "vite";
import vue from '@vitejs/plugin-vue'
import uploadSourceMap from "./src/plugins/rollup-plugin-upload-sourcemap";

// mode 当前环境 development production
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log("env", env);
  return {
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
