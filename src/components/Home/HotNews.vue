<template>
    <div class="HotNews">
        <div class="container clearfix">
            <div class="news_panel">
                <div class="tem_title">
                    <span>热点新闻</span>
                    <a @click="toSubMenu(81,'新闻动态','news_trends')" class="more">更多</a>
                    <div class='tem_dian'></div>
                </div>
                <div class="tem_content" ref="newsBox">
                    <div class="pic" >
                          <transition-group tag="ul" name="slide">
                            <li v-for="(item,index) in NewsList" v-show="indexLi === index" :key="index" @mouseenter="stop()" @mouseleave="go()">
                              <a @click="toSubMenu(81,'新闻动态','news_trends',item)">
                                <div class="tem_img" :style="'background-image: url(http://www.xhdgis.com/images/'+item.CLS+')'">
                                </div>
                                <div class="tem_mc">
                                    <p>{{item.MC}}</p>
                                </div>
                                </a>
                            </li>
                          </transition-group>
                    </div>
                    <ol class="tab">
                        <li :class="{'on':indexLi === index}" v-for="(item,index) in NewsList.length" :key="index" @click="(indexLi !== index) && changeLi(index)"></li>
                    </ol>
                </div>
            </div>
            <div class="com_panel">
                <div class="tem_title">
                    <span>公司简介</span>
                    <a @click="toSubMenu(80,'关于我们','about_us')" class="more">更多</a>
                    <div class='tem_dian'></div>
                </div>
                <div class="tem_content">
                    <div class="matter" v-html="Introduce">
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
  name: "HotNews",
  data() {
    return {
      NewsList: String,
      Introduce: String,
      sublist: String,
      indexLi: 0,
      timer: String
    };
  },
  computed: {
    ...mapState(["pageId", "pageName", "parentRoute", "parentId", "parentMc"])
  },
  mounted() {
    //热点新闻
    this.GetHotNews(5, 811, true);
    //公司简介
    this.Getdetails(801);
    //轮播
    this.$nextTick(()=>{
      this.go();
    });
  },
  methods: {
    GetHotNews(num, code, ishot) {
      Api.GetIndexNewsList(num, code, ishot).then(res => {
        if (res) {
          this.NewsList = res.list;
        } else {
          console.error(res);
        }
      });
    },
    Getdetails(id) {
      Api.GetArticleContentByParentId(id).then(res => {
        if (res) {
          this.Introduce = res.HTML;
        } else {
          console.error(res);
        }
      });
    },
    //获取submenu中的第一个页面id名称，并跳转
    getsubMenufirst(id, name, nav) {
      Api.GetMenuList(id).then(res => {
        if (res) {
          this.sublist = res.list;
          //vuex传入
          this.$store.state.pageId = res.list[0].CODE;
          this.$store.state.pageName = res.list[0].MC;
          //localStorage中传入，防止刷新数据丢失
          Api.save("pageId", res.list[0].CODE);
          Api.save("pageName", res.list[0].MC);
          if (nav) {
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
            this.$router.push({
              name: "Normal",
              params: { name: name, id: this.pageId, sublist: this.sublist }
            });
          }
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
    },
    stop() {
      clearInterval(this.timer);
    },
    go() {
      var that = this;
      this.timer = setInterval(function() {
        that.changeLi(that.indexLi + 1);
      }, 3000);
    },
    //变化封装
    changeLi(i) {
      var length = this.NewsList.length;
      this.indexLi = i;
      if (this.indexLi >= length) {
        this.indexLi = 0;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.HotNews {
  // height: 800px;
  margin-bottom: 20px;
}
.tem_title {
  text-align: left;
  margin: 50px 30px 20px;
  span {
    position: relative;
    font-size: 24px;
    line-height: 36px;
    margin-left: 30px;
  }
  span:after {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #00b8ee;
    content: "";
    position: absolute;
    top: 30%;
    left: -20px;
    margin-left: -5px;
  }
  .more {
    float: right;
    line-height: 36px;
    height: 36px;
    padding-right: 10px;
    cursor: pointer;
  }
  .more:hover {
    color: #00b8ee;
  }
}
.tem_dian {
  position: relative;
  border-top: 1px #ccc solid;
  width: 100%;
  /* margin: auto; */
  height: 1px;
  /* text-align: left; */
}
.com_panel {
  float: right;
  width: 50%;
  .tem_content {
    position: relative;
    margin: 10px 30px 30px 40px;
    text-align: left;
    .matter {
      width: 100%;
      height: 310px;
      overflow: hidden;
      font-size: 14px;
    }
  }
}
.news_panel {
  float: left;
  width: 50%;
  position: relative;
  overflow: hidden;
  .tem_content {
    margin: 10px 30px 30px 30px;
    height: 310px;
    text-align: left;
    overflow: hidden;
    .pic {
      overflow: hidden;
      position: relative;
      width: 100%;
      height: 100%;
      ul {
        width: 100%;
        height: 100%;
        li {
          // float: left;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          // display: none;
        }
        li.active {
          // display: block;
        }
      }
      ul.transition {
        // transition: left 0.3s;
      }
      .tem_img {
        width: 100%;
        height: 270px;
        background: no-repeat center center/cover;
      }
      .tem_mc {
        cursor: pointer;
        margin-top: 10px;
        p {
          width: 100%;
          line-height: 30px;
          height: 30px;
          overflow: hidden;
          font-weight: bold;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p:hover {
          color: #00b8ee;
        }
      }
    }
  }
  .tab {
    position: absolute;
    width: 100px;
    height: 15px;
    bottom: 75px;
    right: 30px;
    li {
      float: left;
      width: 10px;
      height: 10px;
      margin-right: 10px;
      background-color: #eee;
      border-radius: 50%;
      cursor: pointer;
    }
    li.on {
      background-color: #00b8ee;
    }
  }
}
.slide-enter-active {
  transition: all 1s ease;
  transform: translate(0);
}
.slide-leave-active {
  transition: all 1s ease;
  transform: translate(-100%);
}
.slide-enter {
  transform: translateX(100%);
}

.slide-leave {
  transform: translateX(0);
}
</style>