<template>
  <div class="TypicalCase">
      <div class="container clearfix">
        <div class="h_title">
          <span class="h_item">典型案例</span>
          <div class='tem_dian'></div>
        </div>
        <div class="h_matter" ref="Appli">
          <div class="pic clearfix">
            <div class="wrapper">
              <div class="letter">
                <div class="letterColor bg1"></div>
                <div class="letterText top" >
                  <a class="wrap" @click="toSubMenu(83, '典型案例','typical_case',appList[0])">
                    <p class="tit" v-if="appList[0]">{{appList[0].MC}}</p>
                  </a>
                </div>
              </div>
              <div class="letter">
                <div class="letterText bottom" >
                  <a class="wrap " @click="toSubMenu(83, '典型案例','typical_case',appList[1])">
                    <p class="tit" v-if="appList[1]">{{appList[1].MC}}</p>
                  </a>
                </div>
                <div class="letterColor bg2"></div>
              </div>
              <div class="letter">
                <div class="letterColor bg3"></div>
                <div class="letterText top" >
                  <a class="wrap" @click="toSubMenu(83, '典型案例','typical_case',appList[2])">
                    <p class="tit" v-if="appList[2]">{{appList[2].MC}}</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Api from "./../../api/api.js";
import { mapState, mapMutations } from "vuex";

export default {
  name: "TypicalCase",
  data() {
    return {
      appList: String,
      index: 0,
      pW: 370
    };
  },
  computed: {
    ...mapState(["pageId", "pageName", "parentRoute", "parentId", "parentMc"])
  },
  mounted() {
    this.getsubMenufirst(83);
  },
  methods: {
    //获取submenu
    getsubMenufirst(id) {
      Api.GetMenuList(id).then(res => {
        if (res) {
          this.appList = res.list;
        } else {
          console.error(res);
        }
      });
    },
    toSubMenu(pid, pmc, pname, nav) {
      //state存入页面传递的参数值
      this.$store.state.parentId = pid;
      this.$store.state.parentMc = pmc;
      this.$store.state.parentRoute = pname;
      this.$store.state.pageId = nav.CODE;
      this.$store.state.pageName = nav.MC;
      //存入localStorage防止页面刷新vuex数据消失
      Api.save("parentId", pid);
      Api.save("parentMc", pmc);
      Api.save("parentRoute", pname);
      Api.save("pageId", nav.CODE);
      Api.save("pageName", nav.MC);
      this.$router.push({
        name: "Normal",
        params: {
          name: pname,
          id: this.pageId,
          sublist: this.List,
          ishome: true
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.TypicalCase {
  background-color: #fafafa;
  height: auto;
}
.h_title {
  padding: 50px 0 30px;
  .h_item {
    display: inline-block;
    padding: 10px 20px;
    font-size: 24px;
    line-height: 36px;
    height: 36px;
    width: 100px;
    margin-right: 10px;
    border-radius: 24px;
    cursor: pointer;
  }
  .h_item:hover {
    font-size: 25px;
  }
  .tem_dian {
    position: relative;
    border-top: 1px #ccc solid;
    width: 100%;
    height: 1px;
  }
  .tem_dian:before {
    display: inline-block;
    width: 30px;
    height: 10px;
    background: #fff;
    content: "";
    position: absolute;
    top: -5px;
    left: 50%;
    margin-left: -15px;
  }
  .tem_dian:after {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #309bff;
    content: "";
    position: absolute;
    top: -5px;
    left: 50%;
    margin-left: -5px;
  }
}
.h_matter {
  position: relative;
  padding: 40px 40px;
  height: 600px;
  overflow: hidden;
  @media screen and (max-width: 800px) {
    padding: 20px 20px;
  }

  @media screen and (max-width: 600px) {
    padding: 0px 0px;
    height: 1820px;
  }
  .pic {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
    .list {
      position: absolute;
      left: 0;
      width: 100%;
      li.panel {
        float: left;
        margin: 0 20px;
      }
    }
    .transition {
      transition: left 0.3s;
    }
  }
  a.wrap {
    width: auto;
    height: 100%;
    text-align: center;
    cursor: pointer;
    .tit {
      margin: 20px;
      height: 30px;
      padding-top: 25%;
      line-height: 30px;
      font-size: 22px;
      color: #fff;
    }
  }
  .more {
    cursor: pointer;
    a {
      display: inline-block;
      padding: 5px 15px;
      height: 30px;
      line-height: 30px;
      //   border: 1px #363f4d solid;
      color: #363f4d;
      font-weight: normal;
      font-size: 14px;
      text-decoration: none;
    }
  }
}

.wrapper {
  display: grid;
  grid-auto-rows: 500px;
  grid-template-columns: 1fr 1fr 1fr;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}
.letter {
  display: grid;
  grid-auto-rows: 250px;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: black;
  transition: all 0.3s ease;
  .letterColor {
    height: 100%;
    width: 100%;
    opacity: 0.9;
    background: no-repeat center center/cover;
  }
  .bg1 {
    background-image: url("./../../assets/index-function-2.jpg");
  }
  .bg2 {
    background-image: url("./../../assets/index-function-3.jpg");
  }
  .bg3 {
    background-image: url("./../../assets/index-function-4.jpg");
  }
  .letterText {
    vertical-align: middle;
    height: 100%;
    width: 100%;
    position: relative;
    background-color: #00b8ee;
    z-index: 1;
    &:before {
      content: "";
      display: block;
      width: 0;
      height: 0;
      border: 10px solid transparent;
      position: absolute;
      left: 45%;
    }
  }
  .top:before {
    border-bottom: 10px solid #00b8ee;
    top: -20px;
  }
  .bottom:before {
    top: 100%;
    border-top: 10px solid #00b8ee;
  }
  .letterText:hover {
    transform: scale(0.93);
    transition: all 1s ease;
  }
}
</style>
