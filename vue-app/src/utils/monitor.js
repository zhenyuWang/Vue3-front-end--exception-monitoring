import axios from "axios";
// 获取浏览器信息
function getBrowserInfo() {
  const agent = navigator.userAgent.toLowerCase();
  const regIE = /msie [\d.]+;/gi;
  const regIE11 = /rv:[\d.]+/gi;
  const regFireFox = /firefox\/[\d.]+/gi;
  const regQQ = /qqbrowser\/[\d.]+/gi;
  const regEdg = /edg\/[\d.]+/gi;
  const regSafari = /safari\/[\d.]+/gi;
  const regChrome = /chrome\/[\d.]+/gi;
  // IE10及以下
  if (regIE.test(agent)) {
    return agent.match(regIE)[0];
  }
  // IE11
  if (regIE11.test(agent)) {
    return "IE11";
  }
  // firefox
  if (regFireFox.test(agent)) {
    return agent.match(regFireFox)[0];
  }
  // QQ
  if (regQQ.test(agent)) {
    return agent.match(regQQ)[0];
  }
  // Edg
  if (regEdg.test(agent)) {
    return agent.match(regEdg)[0];
  }
  // Chrome
  if (regChrome.test(agent)) {
    return agent.match(regChrome)[0];
  }
  // Safari
  if (regSafari.test(agent)) {
    return agent.match(regSafari)[0];
  }
}
// 捕获报错方法
export default function handleError(Vue,baseUrl) {
  if (!baseUrl) {
    console.log("baseUrl", baseUrl);
    return;
  }
  Vue.config.errorHandler = (err, vm) => {
    // 获取当前环境
    let environment = "测试环境";
    if (import.meta.env.VITE_BASE_API === "production_base_api") {
      environment = "生产环境";
    }
    // 发送请求上送报错信息
    axios({
      method: "post",
      url: `${baseUrl}/reportError`,
      data: {
        environment,
        location: window.location.href,
        message: err.message,
        stack: err.stack,
        // 以下信息可以放在vuex store中维护
        // 用户ID
        userId:"001",
        // 用户名称
        userName:"张三",
        // 路由记录
        routerHistory:[
          {
            fullPath:"/login",
            name:"Login",
            query:{},
            params:{},
          },{
            fullPath:"/home",
            name:"Home",
            query:{},
            params:{},
          }
        ],
        // 点击记录
        clickHistory:[
          {
            pageX:50,
            pageY:50,
            nodeName:"div",
            className:"test",
            id:"test",
            innerText:"测试按钮"
          }
        ],
      },
    });
  };
}
