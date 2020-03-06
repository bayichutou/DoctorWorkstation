import Vue from "vue";
import Router from "vue-router";
//组件模块
import Login from "./components/login/login";
import Dispending from "./components/dispending/dispending";

Vue.use(Router);

export default new Router({
  routes: [
    //登录
    { path: "/login", name: "login", component: Login },
    //发药
    { path: "/dispending", name: "dispending", component: Dispending },
    //默认跳转路由
    { path: "*", redirect: "/dispending" }
  ]
});
