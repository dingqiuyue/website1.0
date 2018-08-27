<template>
  <div class="Details">
    <div class="container">
      <div v-html="Content" class="paper"></div>
    </div>
  </div>
</template>

<script>
import Api from "./../api/api.js";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Details",
  data() {
    return {
      Content: ""
    };
  },
  components: {
    ...mapState(["pageId", "pageName", "parentRoute", "parentId", "parentMc"])
  },
  //初始进入路由时调用
  beforeRouteEnter(to, from, next) {
    next(vm => {
      //刷新则返回上级
      vm.$route.params.code? vm.GetDetails(vm.$route.params.code):vm.$router.back(-1);
    });
  },
  methods: {
    GetDetails(id) {
      Api.GetArticleContentByCode(id).then(res => {
        if (res) {
          this.ChangeImgSrc(res.HTML);
        } else {
          console.error(res);
        }
      });
    },
    //获取页面中图片src添加绝对路径
    ChangeImgSrc(res) {
      if (res)
        this.Content = res.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi,function(match, capture) {
            if (match)
              return match.replace(/src=[\'\"]?([^\'\"]*)[\'\"]?/gi, function(src,n) {
                //去除相对路径../..
                return (n.indexOf("http://") !== -1)? src:("src='" +"http://www.xhdgis.com" +n.replace(/[.]{2}\/[.]{2}/, "") +"'");
              });
          }
        );
    }
  }
};
</script>

<style scoped>
.Details {
  margin: 20px auto;
}
.Details .paper {
  text-align: left;
  padding: 0 80px;
}
</style>
