import { createApp } from 'vue'
import App from './App.vue'
import handleError from "./utils/monitor";
const app = createApp(App)
// 异常监控上送报错信息    接口地址
handleError(app, import.meta.env.VITE_MONITOR_REPORT_API);
app.mount('#app')
