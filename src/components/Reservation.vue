<template>
  <div>
    <div class="row" v-for="item in content" :key="item.name">
      {{item.category_name}}
      <span class="btn">
        <el-switch @change="change(item.category_name,item.flag)"
                   v-model="item.flag" :ctive-value=true :inactive-value=false
                   active-color="#13ce66"
                   inactive-color="#cccccc"
        ></el-switch>
      </span>
    </div>
  </div>
</template>
<script>
  import {stringify} from "../modules/utils";

  export default {
    created() {
      this.$axios.get(`/getReservation?yb_userid=${this.yb_userid}`).then((res) => {
        this.content = res.data.data1;
        let data2 = res.data.data2;
        let i;
        if (data2) {
          for (i = 0; i < data2.length; i++) {
            let cname = data2[i].category_name;
            for (let j = 0; j < this.content.length; j++) {
              if (this.content[j].category_name === cname) {
                this.content[j].flag = true;
              }
            }

          }
        }
      });
    },
    data() {
      return {
        yb_userid: sessionStorage.getItem('yb_userid'),
        content: [],
      };
    },
    methods: {
      change(category_name, flag) {
        if (flag) {
          //增加订阅
          this.$axios.post('/addReservation', stringify({
            category_name,
            yb_userid: this.yb_userid
          })).then((res) => {
          })
        }
        if (!flag) {
          //删除订阅
          this.$axios.get(`/delReservation?category_name=${category_name}&yb_userid=${this.yb_userid}`).then((res) => {
          })
        }

      }
    }
  }
</script>
<style scoped>
  .row {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #ccc;
    line-height: 50px;
    font-size: 18px;
    font-weight: 600;
    color: #303133;
    margin: 5px 0;
    padding-left: 10px;
  }

  .btn {
    float: right;
    margin-right: 10px;
  }
</style>
