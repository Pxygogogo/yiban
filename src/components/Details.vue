<template>
  <div>
    <!--    <div @click="gotoIndex()"><img src="../assets/return.svg" alt=""></div>-->
    <div v-for="detail in notice" :key="detail._id" style="width: 100%;overflow: hidden">
      <h3>{{detail.notice_title}}</h3>
      <el-button type="primary" @click="sendEmail()">发送到邮箱</el-button>
      <div class="tips">{{detail.notice_time}}</div>
      <div class="tips">{{detail.category_name}}——{{detail.notice_publisher}}</div>
      <pre class="el-textarea" style="width: 100%;white-space: pre-wrap "
           v-html="detail.notice_content" />
    </div>

  </div>


</template>

<script>

  import {stringify} from "@/modules/utils";

  export default {

    created() {
      this.$axios.get(`/notice/details?_id=${this.$route.query.id}`).then((res) => {
        this.notice = res.data.map(n => ({
          ...n,
          notice_content: n.notice_content.replace(/ {2,}/g, ' ')
        }));
      })
    },
    data() {
      return {
        notice: []
      }
    },
    methods: {
      // gotoIndex() {
      //   this.$router.go(-1);
      // }
      sendEmail() {
        let yb_userid = sessionStorage.getItem('yb_userid');
        let obj = this.notice[0];
        eval("obj.yb_userid=" + yb_userid);
        this.$axios.post('/sendEmail', stringify(obj)).then((res) => {
          if (res.data.msg === 'send success') {
            this.open();
          } else {
            this.openErr();
          }
        })
      },
      open() {
        this.$message({
          message: '发送成功！',
          // type: 'success',
          showClose: true,
          center: true,
          duration: 1000
        });
      },
      openErr() {
        this.$message.error({
          message: '发送失败！',
          showClose: true,
          center: true,
          duration: 1000
        });
      },
    },
  }
</script>

<style scoped>

  h3 {
    margin-top: 10px;
    padding: 10px 4px;
  }

  .tips {
    text-align: right;
    margin-right: 10px;
  }

</style>
