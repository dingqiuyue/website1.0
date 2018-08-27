<template>
  <div class="Normal">
    <transition name="fade" mode="out-in">
      <sub-banner :type="parentRoute" v-show="flag"></sub-banner>
    </transition>        
      <sub-menu :sublist="sublist" v-show="flag"></sub-menu>
            
      <!-- 过度效果，减少页面闪烁 -->
     <transition name="fade" mode="out-in">
          <!-- 动态路由 传参直接绑定在component中 -->
          <component v-bind:is="currentView" :page-id="pageId" @isDetail="updetail"></component>
     </transition>
  </div>
</template>

<script>
import subMenu from "./../components/subMenu.vue";
import subBanner from "./../components/subBanner.vue";
import newsList from "./../components/Newslist.vue";
import Content from "./../components/Content.vue";
import { mapState, mapMutations } from "vuex";
import Api from "./../api/api.js";

export default {
  name: "Normal",
  data() {
    return {
      sublist: [],
      flag: false,
      isdetails: false //判断是否为详情页
    };
  },
  components: {
    "sub-menu": subMenu,
    "sub-banner": subBanner,
    "news-list": newsList,
    "mian-content": Content
  },
  computed: {
    ...mapState(["pageId", "pageName", "parentRoute", "parentId", "parentMc"]),
    currentView() {
      if (!this.isdetails) {
        console.log(this.isdetails);
        console.log(this.parentRoute);
        if (this.parentRoute === "news_trends") {
          return "news-list";
        } else {
          return "mian-content";
        }
      } else {
        return "router-view";
      }
    }
  },
  //从其他页面首次进入该组件时执行
  beforeRouteEnter(to, from, next) {
    next(vm => {
      //从首页进入时直接到详情页
      if (to.params.code) {
        vm.isdetails = true;
      }
      if (!to.params.ishome) {
        vm.getsubMenufirst(vm.$store.state.parentId);
      }
    });
  },
  //页面路径submenu变化时，路由更新执行
  beforeRouteUpdate(to, from, next) {
    if (to.params.sublist) {
      this.sublist = to.params.sublist;
    }
    this.isdetails = false;
    this.$store.state.pageId = to.params.id;
    next();
  },
  mounted() {
    //判断vuex是否有值，否则用localStorage中的值传入（页面刷新时）
    this.$store.state.parentId = this.parentId || Api.fetch("parentId");
    this.$store.state.parentMc = this.parentMc || Api.fetch("parentMc");
    this.$store.state.parentRoute =
      this.parentRoute || Api.fetch("parentRoute");
    this.sublist = this.$route.params.sublist;
    //父组件传递props异步数据到子组件，先获取数据，再加载子组件
    this.flag = true;
  },
  methods: {
    //获取sunmenu中的第一个页面id名称，并跳转
    getsubMenufirst(id) {
      Api.GetMenuList(id).then(res => {
        if (res) {
          this.sublist = res.list;
          //vuex传入
          this.$store.state.pageId = res.list[0].CODE;
          this.$store.state.pageName = res.list[0].MC;
          //localStorage中传入，防止刷新数据丢失
          Api.save("pageId", res.list[0].CODE);
          Api.save("pageName", res.list[0].MC);
        } else {
          console.error(res);
        }
      });
    },
    updetail(bool) {
      this.isdetails = bool;
    }
  }
};
</script>

<style scoped>

</style>
