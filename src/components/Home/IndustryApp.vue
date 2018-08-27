<template>
  <div class="IndustryApp">
      <div class="container clearfix">
        <div class="h_title">
          <span class="h_item">行业应用</span>
          <div class='tem_dian'></div>
        </div>
        <div class="h_matter" ref="Appli">
          <div class="pic  clearfix">
            <swiper :options="swiperOption"  class="list transition">
              <swiper-slide class="panel" v-for="(item,index) in List " :key="index">
                <a @click="toSubMenu(82, '主营业务','main_business',item)">
                  <div class="icon"></div>
                  <p class="tit">{{item.MC}}</p>
                </a>
              </swiper-slide>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
          </div>
          <!--<div class="last" @click="changeImg(-1)"></div>
          <div class="next" @click="changeImg(1)"></div>-->
          <div class="more">
             <a @click="toSubMenu(82, '主营业务','main_business',List[0])">
                查看更多
              </a>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Api from "./../../api/api.js";
import { mapState, mapMutations } from "vuex";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "IndustryApp",
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 3,
        speed: 600,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      List: String,
      index: 0,
      pW: 370,
      Theactive: 0,
      timer: ""
    };
  },
  computed: {
    ...mapState(["pageId", "pageName", "parentRoute", "parentId", "parentMc"])
  },
  mounted() {
    this.getsubMenufirst(82);
  },
  methods: {
    //获取submenu
    getsubMenufirst(id) {
      Api.GetMenuList(id).then(res => {
        if (res) {
          this.List = res.list;
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
    /*changeImg(m) {
      var Obox = this.$refs.Appli,
        Opicul = Obox.querySelector("ul.list"),
        length = this.List.length /3;
      //变化封装
      this.index = this.index + m;
      if (this.index >= length) {
        this.index = 0;
        fn(1);
      }
      if (this.index < 0) {
        this.index = length - 1;
        fn(length);
      }
      //操作ul位置
      Opicul.style.left = -this.index * this.pW * 3 + "px";

      function fn(x) {
        Opicul.classList.remove("transition");
        Opicul.style.left = "-" + (x - 1) + "00%";
        setTimeout(function() {
          Opicul.classList.add("transition");
        }, 20);
      }
    }*/
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style lang="scss" scoped>
.h_title {
  padding: 50px 0 30px;
  .h_item {
    transition: all 0.3s ease-in-out;
            -webkit-transition: all 0.3s ease-in-out;
            -moz-transition: all 0.3s ease-in-out;
            -ms-transition: all 0.3s ease-in-out;
            -o-transition: all 0.3s ease-in-out;  
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
  padding: 40px 30px;
  margin-bottom: 20px;
  height: 300px;
  overflow: hidden;
  .pic {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
    .list {
      position: absolute;
      left: 0;
      width: 100%;
      .panel {
        float: left;
        margin: 0;
        a {
          position: relative;
          display: inline-block;
          height: 100%;
          text-align: center;
          overflow: hidden;
          cursor: pointer;
          .icon {
            margin: 0 auto;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: url("./../../assets/logo.png") no-repeat center
              center/cover;
            box-shadow: 0px 0px 16px #dedede;
            border: 1px solid gray;
          }
          .tit {
            transition: all 0.6s ease-in-out;
            -webkit-transition: all 0.6s ease-in-out;
            -moz-transition: all 0.6s ease-in-out;
            -ms-transition: all 0.6s ease-in-out;
            -o-transition: all 0.6s ease-in-out;
            position: absolute;
            //margin: 20px 0;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            line-height: 200px;
            font-size: 14px;
            background-color:rgba(0,0,0,0.3);
            color: #eee;
            //padding: 5px;
            border: 1px solid gray;
            //border-radius: 4px;
          }
        }
        a:hover {
          .tit {
            top: 0px;
          }
        }
      }
    }
    .transition {
      transition: left 0.6s;
    }
  }
  .last,
  .next {
    position: absolute;
    top: 15%;
    width: 48px;
    height: 143px;
    z-index: 2;
    display: none;
    cursor: pointer;
  }
  .last {
    left: 0;
    background: url("./../../assets/tem.png") no-repeat left center;
  }
  .next {
    right: 0;
    background: url("./../../assets/tem.png") no-repeat right center;
  }
  .more {
    cursor: pointer;
    a {
      transition: all 0.3s ease-in-out;
            -webkit-transition: all 0.3s ease-in-out;
            -moz-transition: all 0.3s ease-in-out;
            -ms-transition: all 0.3s ease-in-out;
            -o-transition: all 0.3s ease-in-out;
      display: inline-block;
      padding: 0 15px;
      height: 30px;
      line-height: 30px;
      border: 1px solid #777;
      color: #777777;
      font-weight: normal;
      font-size: 14px;
      text-decoration: none;
      border-radius: 4px;
      &:hover {
        background-color: #309bff;
        border: none;
        font-size: 16px;
        padding: 5px 15px;
        color: #fff;
      }
    }
  }
}
.IndustryApp:hover {
  .last,
  .next {
    display: block;
  }
}
</style>
