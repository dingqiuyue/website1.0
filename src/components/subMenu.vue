<template>
    <div class="Menu">
        <div class="container">
              <div class="clearfix pr navposition">
                  <div class=" waypoint">
                      <i class="text-center fa fa-map-marker fa-fw"></i>您的位置&nbsp;:&nbsp;
                      <a href="/home" title="首页">首页</a> &gt; 
                      <a href="javascript:void(0);">{{parentMc}}</a> &gt; 
                      <a href="javascript:void(0);">{{pageName}}</a>
                  </div>
                  <div class="nav_crumb" data-action="fadeInRight" style="opacity: 1;">
                      <ul class="clearfix">
                          <li :class="{'on': pageId === nav.CODE}" v-for="nav in sublist" :key="nav.id" @click="up(nav)">
                              <router-link :to="{name:'Normal',params:{id:nav.CODE,name:parentRoute}}" :title="nav.MC" >{{nav.MC}}</router-link>
                              <span></span>
                          </li>
                      </ul>
                  </div>
              </div>
        </div>
    </div>
</template>
<script>
import Api from "./../api/api.js";
import { mapState, mapMutations } from "vuex";

export default {
  name: "sunMenu",
  props: ["sublist"],
  data() {
    return {
      navList: []
    };
  },
  mounted() {
    // console.log(this.sublist);
  },
  computed: {
    ...mapState(["pageId", "pageName", "parentRoute", "parentId", "parentMc"])
  },
  methods: {
    up(nav, index) {
      this.$store.state.pageName = nav.MC;
    }
  }
};
</script>

<style scoped>
.Menu {
  /* background: #f1f1f1; */
}
.navposition {
  width: 100%;
  line-height: 60px;
}
.waypoint{
  text-align: left;
  font-size: 14px;
}
.nav_crumb {
  /* float: left; */
  background-color: #f1f1f1; 
}
.nav_crumb ul li {
  height: 60px;
  line-height: 60px;
  position: relative;
  float: left;
  text-align: center;
  max-width: 20%;
}
.nav_crumb ul li span {
  display: none;
  width: 100%;
  height: 5px;
  background: #008eb8;
  position: absolute;
  top: -5px;
  left: 0;
}
.nav_crumb ul li a {
  display: block;
  padding: 0 10px;
  height: 100%;
  font-size: 16px;
  color: #333;
  text-decoration: none;
  border-right: 1px solid #ddd;
  /* max-width: 100px; */
  overflow: hidden;
}
.nav_crumb ul li.on span {
  display: block;
}
.nav_crumb ul li.on a {
  background: #00b8ee;
  color: #fff;
}
</style>

