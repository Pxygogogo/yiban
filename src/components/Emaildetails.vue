<template>
  <div>
    <div @click="gotoIndex()"><img src="../assets/return.svg" alt=""></div>
    <div v-for="detail in notice" :key="detail._id" style="width: 100%;overflow: hidden">
      <h3>{{detail.email_title}}</h3>
      <div class="tips">{{detail.email_from}}</div>
      <pre class="el-textarea" style="width: 100%;white-space: pre-wrap "
           v-html="detail.email_content" />
    </div>

  </div>


</template>

<script>
  export default {
    created() {
      this.$axios.get(`/email/details?_id=${this.$route.query.id}`).then((res) => {
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
      gotoIndex() {
        this.$router.go(-1);
      }
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
