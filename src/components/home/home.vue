<template>
  <el-container class="page">
    <el-header class="header">
      <div class="logo"></div>
      <div>
        <el-dropdown>
          <el-avatar
            style="transform: translate(-10px, 28%);"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!--                <span>王小虎</span>-->
      </div>
    </el-header>
    <el-container>
      <el-aside width="201px">
        <el-menu default-active="1" class="el-menu-vertical">
          <el-menu-item index="1">
            <i class="el-icon-location"></i>
            <span slot="title">在线复诊</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">医患交流</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">发药</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="page-content bg_main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "home"
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  background-color: #20374b;
  text-align: right;
  font-size: 12px;
  line-height: 60px;
  color: #fff;
}

.logo {
  width: 200px;
  height: 60px;
  background: url("../../assets/images/logo/logo.png") no-repeat center;
  background-size: 90%;
}

.page-content {
  min-width: 1400px;
}

.el-menu-vertical {
  height: 100%;
}
</style>
