import { loadEnv } from "vite";
import vue from '@vitejs/plugin-vue'

// mode 当前环境 development production
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log("env", env);
  return {
    plugins: [vue()]
  }
}
