<template>
  <header class="header">
    <nav class="navbar navbar-default fixed-top">
      <div class="container">
          <a class="nav-logo" title="新禾道科技" to="/home" id="logo">
            <img src="./../assets/XHDLogo.png" height="60px">
          </a>        
          <a id="menu" class="header__menu" v-on:click="show = !show">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"/>
            </svg>
          </a>
          <transition name="fade">
            <ul class="main-nav-tiny clearfix nav-right" v-if="show">
                <li class="first-nav-tiny">
                    <router-link to="/home" :class="{'active': isactive}">首页</router-link>
                </li>
                <li class="first-nav-tiny" v-for="nav in navList" :key="nav.id">
                    <a @click="toSubMenu(nav)" :class="{'active': ((Route === nav.ENAME) && !isactive)}">{{nav.MC}}</a> 
                </li>
            </ul>
          </transition>  
           <ul class="main-nav clearfix nav-right">
                <li class="first-nav">
                    <router-link to="/home" :class="{'active': isactive}">首页</router-link>
                </li>
                <li class="first-nav" v-for="nav in navList" :key="nav.id">
                    <a @click="toSubMenu(nav)" :class="{'active': ((Route === nav.ENAME) && !isactive)}">{{nav.MC}}</a> 
                </li>
            </ul>   
      </div>
    </nav>
  </header>
</template>

<script>
import Api from "./../api/api.js";
import { mapState, mapMutations } from "vuex";
import $ from 'jquery'

export default {
  name: "Header",
  data() {
    return {
      navList: [],
      sublist: [],
      show: false
      // pageId: 0
    };
  },
  computed: {
    ...mapState(["pageId", "pageName", "parentRoute", "parentId", "parentMc"]),
    isactive() {
      return this.$route.name === "Home";
    },
    Route() {
      return this.parentRoute || Api.fetch("parentRoute");
    }
  },
  mounted() {
    this.getMenu(0);
  },
  methods: {
    getMenu(parentId) {
      Api.GetMenuList(parentId).then(res => {
        if (res) {
          // console.log(res.list)
          this.navList = res.list;
        } else {
          console.error(res);
        }
      });
    },
    //获取submenu中的第一个页面id名称，并跳转
    getsubMenufirst(id, name) {
      Api.GetMenuList(id).then(res => {
        if (res) {
          this.sublist = res.list;
          //vuex传入
          this.$store.state.pageId = res.list[0].CODE;
          this.$store.state.pageName = res.list[0].MC;
          //localStorage中传入，防止刷新数据丢失
          Api.save("pageId", res.list[0].CODE);
          Api.save("pageName", res.list[0].MC);
          this.$router.push({
            name: "Normal",
            params: { name: name, id: this.pageId, sublist: this.sublist }
          });
        } else {
          console.error(res);
        }
      });
    },
    toSubMenu(nav) {
      //state存入页面传递的参数值
      this.$store.state.parentId = nav.CODE;
      this.$store.state.parentMc = nav.MC;
      this.$store.state.parentRoute = nav.ENAME;
      //存入localStorage防止页面刷新vuex数据消失
      Api.save("parentId", nav.CODE);
      Api.save("parentMc", nav.MC);
      Api.save("parentRoute", nav.ENAME);
      this.getsubMenufirst(nav.CODE, nav.ENAME);
      console.log($("li").html);
    },
  }
};
</script>

<style scoped>
.header {
  position: relative;
  height: 92px;
  margin: 0px auto;
  text-align: center;
}
.navbar {
  position: relative;
  background-color: #fff;
  border-bottom: 1px solid #e7e7e7;
  box-shadow: 0 1px 8px #e5e6e6;
  top: 0;
  min-height: 50px;
  margin-bottom: 0;
}
.fixed-top {
  position: fixed;
  right: 0;
  left: 0;
  z-index: 1030;
}
.nav-logo {
  float: left;
  height: auto;
  padding: 15px 15px;
  font-size: 18px;
  line-height: 20px;
  cursor: pointer;
}
ul.main-nav {
  float: right;
  margin-top: 36px;
  margin-right: auto;
}
ul.main-nav .first-nav {
  float: left;
  height: 30px;
  margin-right: 40px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
}
ul.main-nav .first-nav a {
  width: 120px;
  color: #333;
  font-size: 16px;
  padding: 10px 0;
}
ul.main-nav .first-nav a:hover,
ul.main-nav .first-nav a.active {
  border-bottom: 2px #00b8ee solid;
  color: #00b8ee;
  text-decoration: none;
}
ul.main-nav .first-nav .sub-nav {
  display: none;
}
.header__menu {
  display: none;
}

/*缩略菜单*/
@media (max-width: 750px) {
  .main-nav {
    display: none;
  }
  .header__menu {
    display: inline-block;
    position: absolute;
    right: 17%;
    padding-top: 24px;
  }
  .header__menu svg {
    width: 40px;
    fill: rgb(142, 150, 153);
  }
  .main-nav-tiny {
    background-color: #fff;
    width: 180px;
    position: absolute;
    right: 10%;
    top: 90px;
  }
  .first-nav-tiny {
    display: list-item;
    padding: 20px 0px;
    border-bottom: 1px solid #E0E0E0;
    width: 100%;
    text-align: center;
  }
  ul.main-nav-tiny .first-nav-tiny a:hover,
  ul.main-nav-tiny .first-nav-tiny a.active {
    border-bottom: 0px #00b8ee solid;
    color: #00b8ee;
    text-decoration: none;
  }
  ul.main-nav-tiny .first-nav-tiny a {
    font-size: 20px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
    transition: all .5s ease;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(-55px);
  }
}
@media (min-width: 751px) {
  .main-nav-tiny {
    display: none;
  }
} 

  

</style>
