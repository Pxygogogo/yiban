<template>
  <div>
    <div class="tag-box">
      <el-tag v-for="tag in category" :key="tag.category_id" @click="getSpecific(tag.category_name)" type>
        {{tag.category_name}}
      </el-tag>
    </div>
    <el-card shadow="hover" v-for="item in notice" :key="item._id" @click.native="details(item._id)">
      <div class="title">
        <h3>{{item.notice_title}}</h3>
      </div>
      <div class="organization">
        {{item.category_name}}
        <div class="date">{{item.notice_date}}</div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    inject: ['reload'],
    created() {
      //主页，获取通知
      this.$axios.get("/index", {
        // 还可以直接把参数拼接在url后边
      }).then((res) => {
        this.notice = res.data.data;
      }).catch((error) => {
        console.log(error);
      });
      //获取所有的用户订阅了w的分类
      this.$axios.get(`/category?yb_userid=${sessionStorage.getItem('yb_userid')}`).then((res) => {
        this.category = res.data;
      }).catch((error) => {
        console.log(error);
      });
    },
    data() {
      return {
        notice: [],
        category: {}

      };
    },
    methods: {
      details(id) {
        this.$router.push({
          path: `/details?id=${id}`
        });
      },
      getSpecific(category_name) {
        this.$axios.get(`/specific?category_name=${category_name}`).then((res) => {
          this.notice = res.data.data;
          this.reload();
        })
      }

    }
  };
</script>

<style scoped>
  .el-card {
    border-radius: 10px;
    margin: 10px 10px;
    cursor: pointer;
  }

  .el-tag {
    margin: 5px 10px;
  }

  .title {
    width: 100%;
    height: 15%;
    margin: 4px 0;
  }

  .title h3 {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .organization {
    font-weight: 200;
    color: #c0c4cc;
    font-size: 14px;
  }

  .date {
    float: right;
    font-weight: 200;
    color: #c0c4cc;
    font-size: 14px;
  }

  .tag-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }
</style>
