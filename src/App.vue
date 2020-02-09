<template>
  <div id="app">
    <MenuBar />
    <router-view></router-view>
  </div>
</template>

<script>
  import MenuBar from "./components/MenuBar";
  import {stringify} from "./modules/utils";

  export default {
    async created() {
      const {verify_request} = this.$route.query;
      if (verify_request) {
        const {data} = await this.$axios.get(`/getUser?verify_request=${verify_request}`);
        const {access_token} = data.visit_oauth;
        const {userid, username, usernick, usersex} = data.visit_user;
        await this.$axios.post('/newUser', stringify({
          yb_userid: userid, yb_username: username, yb_usernick: usernick, yb_sex: usersex
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        });

        sessionStorage.setItem('access_token', access_token);
        sessionStorage.setItem('yb_userid', userid);
        sessionStorage.setItem('yb_username', username);
        sessionStorage.setItem('yb_usernick', usernick);
        sessionStorage.setItem('yv_sex', usersex);
      }
    },

    name: "app",
    provide() {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
      return {
        reload: this.reload
      }
    },
    components: {
      MenuBar
    },
    data() {
      return {
        isRouterAlive: true                    //控制视图是否显示的变量
      }
    },
    methods: {
      reload() {
        this.isRouterAlive = false;            //先关闭，
        this.$nextTick(function () {
          this.isRouterAlive = true;         //再打开
        })
      }
    }
  };
</script>

<style>
  a {
    text-decoration: none;
  }
</style>


