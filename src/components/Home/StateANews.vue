<template>
  <div class="StateANews">
      <div class="container" ref="Obox">
        <div class="h_title">
            <span class="h_item com on">公司动态</span>
            <span class="h_item new">行业新闻</span>
            <div class='tem_dian'></div>
        </div>
        <div class="com_panel clearfix">
            <div class="l_panel">
                <a class="panel" @click="toSubMenu(81,'新闻动态','news_trends',Hotnew)" v-show="Hotnew.CLS">
                    <div class="pic" :style="'background-image:url(http://www.xhdgis.com/images/'+ Hotnew.CLS +')'"> </div>
                    <p class="title">{{Hotnew.MC}}</p>
                    <p class="details" v-html="Hotnew.HTML"></p>
                </a>
            </div>
            <ul class="r_list"> 
                <li class="clearfix" v-for="item in NewsList" :key="item.id">
                    <a @click="toSubMenu(81,'新闻动态','news_trends',item)">
                        <span class="arrow"></span>
                        <p class="title">{{item.MC}}</p>
                        <span class="fr">{{item.LASTMODIFYTIME.split(" ")[0]}}</span>
                    </a>
                </li>
            </ul>
        </div>
      </div>
  </div>
</template>

<script>
import Api from "./../../api/api.js";
import { mapState, mapMutations } from "vuex";

export default {
  name: "StateANews",
  data() {
    return {
      NewsList: String,
      Hotnew: String,
      tabcode: 811,
      tabname: "公司动态"
    };
  },
  computed: {
    ...mapState(["pageId", "pageName", "parentRoute", "parentId", "parentMc"])
  },
  mounted() {
    this.GetHotNews(8, 811, true);
    this.changePanel();
  },
  methods: {
    GetHotNews(num, code, ishot) {
      Api.GetIndexNewsList(num, code, ishot).then(res => {
        if (res) {
          // console.log(res);
          this.NewsList = res.list;
          this.Hotnew = res.list[0];
        } else {
          console.error(res);
        }
      });
    },
    changePanel() {
      var Obox = this.$refs.Obox;
      var Ocom = Obox.querySelector(".h_title .com");
      var Onew = Obox.querySelector(".h_title .new");
      var that = this;
      Ocom.onmouseenter = function() {
        Onew.classList.remove("on");
        this.classList.add("on");
        that.tabcode = 811;
        that.tabname = "公司动态";
        that.GetHotNews(8, 811, false);
      };
      Onew.onmouseenter = function() {
        Ocom.classList.remove("on");
        this.classList.add("on");
        that.tabcode = 812;
        that.tabname = "行业新闻";
        that.GetHotNews(8, 812, false);
      };
    },
    //获取submenu中的第一个页面id名称，并跳转
    getsubMenufirst(id, name, nav) {
      Api.GetMenuList(id).then(res => {
        if (res) {
          this.sublist = res.list;
          //vuex传入
          console.log(this.tabcode);
          this.$store.state.pageId = this.tabcode;
          this.$store.state.pageName = this.tabname;
          //localStorage中传入，防止刷新数据丢失
          Api.save("pageId", this.tabcode);
          Api.save("pageName", this.tabname);
          this.$router.push({
            name: "details",
            params: {
              name: name,
              id: this.pageId,
              sublist: this.sublist,
              code: nav.CODE
            }
          });
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
      //存入localStorage防止页面刷新vuex数据消失
      Api.save("parentId", pid);
      Api.save("parentMc", pmc);
      Api.save("parentRoute", pname);
      this.getsubMenufirst(pid, pname, nav);
    }
  }
};
</script>

<style lang="scss" scoped>
.StateANews {
  background-color: #fafafa;
}
.h_title {
  padding: 50px 0 30px;
  .h_item {
    display: inline-block;
    padding: 5px 20px;
    font-size: 24px;
    line-height: 36px;
    height: 36px;
    width: 100px;
    margin-right: 10px;
    border-radius: 24px;
    cursor: pointer;
    -webkit-transition: all 0.3s ease 0s; 
    -moz-transition: all 0.3s ease 0s; 
    -ms-transition: all 0.3s ease 0s; 
    -o-transition: all 0.3s ease 0s; 
    transition: all 0.3s ease 0s;
  }
  .h_item:hover {
    //font-size: 25px;
    transform: scale(1.1);
  }
  span.on {
    background-color: #00a0e9;
    color: #fff;
  }
}
.com_panel {
  position: relative;
  width: 100%;
  .l_panel {
    float: left;
    width: 50%;
    .panel {
      transition: all 0.3s ease-in-out;
            -webkit-transition: all 0.3s ease-in-out;
            -moz-transition: all 0.3s ease-in-out;
            -ms-transition: all 0.3s ease-in-out;
            -o-transition: all 0.3s ease-in-out;  
      display: block;
      margin: 10px 30px 30px 40px;
      overflow: hidden;
      //box-shadow: 1px 1px 16px #dedede;
      border-radius: 5px;
      background-color: #fff;
      .pic {
        // width: 100%;
        margin: 0px 0px 20px;
        height: 260px;
        background: no-repeat center center/cover;
      }
      p {
        height: 30px;
        margin: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
        cursor: pointer;
      }
      p.title {
        line-height: 30px;
        font-weight: bold;
        margin: 10px;
      }
    }
    .panel:hover {
      //box-shadow: 0px 0px 5px 2px #eee;
      box-shadow: 0px 0px 20px gray;
    }
  }
  .r_list {
    float: left;
    width: 50%;
    li {
      margin: 5px;
      cursor: pointer;
      a {
        position: relative;
        display: block;
        line-height: 30px;
        height: 30px;
        margin-top: 10px;
        padding-bottom: 5px;
        border-bottom: 1px solid #ddd;

        p {
          display: inline-block;
          width: 70%;
          text-align: left;
          height: 30px;
          line-height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
        }
        .arrow {
          position: absolute;
          top: 10px;
          left: 10px;
          width: 0px;
          height: 0px;
          border: 5px solid transparent;
          border-left: 5px solid #333;
          display: inline-block;
          line-height: 30px;
        }
        span.fr {
          color: #333;
          font-size: 14px;
        }
        &:hover {
          p,
          span {
            color: #00a0e9;
          }
          .arrow {
            border-left: 5px solid #00a0e9;
          }
        }
      }
    }
  }
}
</style>