<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="email_from"
      label="发信人">
    </el-table-column>
    <el-table-column
      prop="email_title"
      label="邮件概要">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    created() {
      this.$axios.get(`/getInbox?email_address=${this.$route.query.email}`).then((res) => {
        this.tableData = res.data.data;
      })
    },
    data() {
      return {
        tableData: []
      }
    }
  }
</script>
