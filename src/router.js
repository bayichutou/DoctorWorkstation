import Vue from "vue";
import Router from "vue-router";
//组件模块
import Login from "./components/login/login";
import Home from "./components/home/home";
import Dispensing from "./components/dispensing/dispensing";

Vue.use(Router);

export default new Router({
  routes: [
    //登录
    {
      path: "/login",
      name: "login",
      component: Login
    },
    //主页
    {
      path: "/home",
      name: "home",
      component: Home,
      children: [
        //发药
        {
          path: "dispensing", //以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
          name: "dispensing",
          component: Dispensing
        }
      ]
    },
    //默认跳转路由
    { path: "*", redirect: "/home/dispensing" }
  ]
});
