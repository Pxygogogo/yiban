<template>
  <div v-if="this.isExist">
    <div class="top">
      <div class="ipt">
        <el-input placeholder="请输入邮箱地址..." v-model="email" clearable></el-input>
        <el-input placeholder="请输入密码..." v-model="password" show-password></el-input>
      </div>
      <div class="btn">
        <el-row>
          <el-button type="primary" round @click="bindEmail()">{{bind}}</el-button>
        </el-row>
      </div>
    </div>
    <div class="img-box">
      <p>成功绑定邮箱后即可接收订阅的通知！</p>
      <p>绑定邮箱目前只支持学校邮箱！</p>
    </div>
  </div>
  <div v-else style="width: 100%">
    <!--    <el-button type="primary" style="width: 100%" @click="bindEmail">更换绑定邮箱</el-button>-->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="email_from"
        label="发信人"
        width="150">
      </el-table-column>
      <el-table-column
        prop="email_title"
        label="邮件主题">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import {stringify} from "@/modules/utils";

  export default {
    created() {
      this.$axios.get(`/judgeEmail?yb_userid=${sessionStorage.getItem('yb_userid')}`).then((res) => {
        if (res.data.msg === "exist") {
          this.isExist = false;
          this.$axios.get(`/getInbox?email_address=${res.data.data.email_address}`).then((res) => {
            this.tableData = res.data.data;
          })
        }
      })
    },
    data() {
      return {
        bind: '绑定',
        email: "",
        password: '',
        tableData: [],
        isExist: true
      };
    },
    methods: {
      bindEmail() {
        if (this.email && this.password) {
          this.$axios.post('/bindEmail', stringify({
            email: this.email,
            password: this.password,
            yb_userid: sessionStorage.getItem('yb_userid')
          })).then((res) => {
            if (res.data.msg === "success") {
              this.open();
              this.$router.push(`inbox?email=${res.data.data.email_address}`);
            } else {
              this.openErr("绑定失败！");
            }
          })
        } else {
          this.openErr("邮箱密码不能为空");
        }
      },
      open() {
        this.$message({
          message: '绑定成功！',
          // type: 'success',
          showClose: true,
          center: true,
          duration: 1000
        });
      },
      openErr(txt) {
        this.$message.error({
          message: txt,
          showClose: true,
          center: true,
          duration: 1000
        });
      },
      changeEmail() {
        this.isExist = true;
        this.bind = '更改'
      },
    },
  };
</script>
<style scoped>
  .ipt {
    float: left;
    width: 65%;
    margin: 10px;
  }

  .el-input {
    margin-top: 10px;
  }

  .btn {
    float: right;
    margin: 45px 10px 10px 0;
  }

  .top {
    height: 120px;
  }

  .img-box {
    width: 100%;
    height: 420px;
    margin: 0 auto;
    background: url(../assets/social_media_3.svg) no-repeat center;
    background-size: 300px 300px;
  }

  .img-box p {
    text-align: center;
    font-size: 14px;
  }

  * {
    margin: 0;
    padding: 0;
  }


</style>
