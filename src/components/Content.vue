<template>
  <div class="Content">
    <div class="container">
        <div class="content_title pr text-center mm50">
            <div class="title_line"></div>
            <div class="title_name pr"></div>
        </div>
        <div v-if="Content=== ''"><p>资料整理中……</p></div>
        <div v-else class="paper"><div v-html="Content"></div></div>
    </div>
  </div>
</template>
<script>
import Api from "./../api/api.js";
import $ from 'jquery';

export default {
  name: "Content",
  props: ["pageId"],
  data() {
    return {
      Content: String
    };
  },
  watch: {
    pageId(curVal, oldVal) {
      if (curVal) {
        this.Getdetails(curVal, 1);
      }
    }
  },
  // //初始进入路由时调用
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.Getdetails(vm.$store.state.pageId || Api.fetch("pageId"));
  //   });
  // },
  // //路由:id更新时调用
  // beforeRouteUpdate(to, from, next) {
  //   this.Getdetails(this.$store.state.pageId || Api.fetch("pageId"));
  //   next();
  // },
  mounted() {
    this.Getdetails(this.pageId);
  },
  methods: {
    Getdetails(id) {
      Api.GetArticleContentByParentId(id).then(res => {
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
                //去除相对路径../..  同时排除绝对路径
                return  (n.indexOf("http://") !== -1)? src:("src='" +"http://www.xhdgis.com" +n.replace(/[.]{2}\/[.]{2}/, "") +"'");
              });
          }
        );
    }
  }
};
</script>

<style scoped>
.Content {
  width: 100%;
  padding: 50px 0;
  min-height: 300px;
}
.Content .paper {
  text-align: left;
  padding: 0 80px;
} 
img {
  width: 100%;
}
</style>
