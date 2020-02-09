<template>
  <div class="menuBar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item v-for="(item) in navList" :key="item.navUrl" :index="item.navUrl">
        <router-link :to="item.navUrl">
          <i :class="item.navIcon"></i>
          {{item.navName}}
        </router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>


<script>
import Notification from "./Notification";
import { log } from "util";
export default {
  components: {
    Notification
  },
  data() {
    return {
      activeIndex: this.$route.path,
      navList: [
        {
          navUrl: "/notification",
          navIcon: "el-icon-chat-dot-round",
          navName: "通知"
        },
        {
          navUrl: "/reservation",
          navIcon: "el-icon-folder-add",
          navName: "订阅"
        },
        { navUrl: "/email", navIcon: "el-icon-message", navName: "邮箱" }
      ]
    };
  },
  
  methods: {
    // handleSelect(key, keyPath) {}
  },
};
</script>

<style  scoped>
.menuBar{
  margin-bottom:10px;
}
</style>