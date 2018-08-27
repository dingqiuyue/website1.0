<template>
  <div class="Newslist">
      <!-- <div v-html="NewsList"></div> -->
      <div class="container dt-list">
        <ul class="list"> 
          <li class="clearfix" v-for="item in NewsList" :key="item.id"> 
            <div class="photo">
              <img :src="'http://www.xhdgis.com/Images/'+ item.CLS"  alt="img" width="200" height="120">
            </div>
            <div class="infos">
              <router-link :to="{name:'details',params:{code: item.CODE}}" @click.native="up()">
                <p class="title">{{item.MC}}</p>
              </router-link>
              <!-- <p class="content">{{item.HTML}}</p> -->
              <div class="time">
                <span>{{item.LASTMODIFYTIME}}</span>
              </div>
              <router-link :to="{name:'details',params:{code: item.CODE}}" class="details" @click.native="up()">查看详情</router-link>
            </div>
          </li>
        </ul>
        <div class="dede_pages">
          <ul class="pagelist">
            <li><a @click="Lastpage()">&lt;</a></li>
            <li v-for="(page,index) in pagelist" :key="page.id">
              <a @click="Getlist(0,page,10)" :class="{'thisclass': Curpage === page}">{{page}}</a>
            </li>
            <li><a @click="Nextpage()">&gt;</a></li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
import Api from "./../api/api.js";

export default {
  name: "Newslist",
  props:["page-id"],
  data() {
    return {
      NewsList: String,
      pageNum: Number,
      Curpage: 1,
      activelist: [1, 2, 3, 4]
    };
  },
  computed: {
    pagelist() {
      if(this.activelist.length > this.pageNum){
        this.activelist = [];
        for(var i=1; i<= this.pageNum; i++){
          this.activelist.push(i);
        }
      }else{
        this.activelist= [1,2,3,4];
      }
      return this.activelist;
    }
  },
  watch:{
    pageId(curVal,oldVal){
      if(curVal){
        this.Getlist(curVal,1);
      }
    }
  },
  // //初始进入路由时调用
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     // console.log(to);
  //     vm.Getlist(vm.$store.state.pageId || Api.fetch("pageId"), 1, 10);
  //   });
  // },
  // //路由:id更新时调用
  // beforeRouteUpdate(to, from, next) {
  //   this.Getlist(this.$store.state.pageId || Api.fetch("pageId"), 1, 10);
  //   next();
  // },
  mounted() {
    this.Getlist(this.pageId,1);
  },
  methods: {
    Getlist(id, pageIndex) {
      this.Curpage = pageIndex;
      if (!id) id = this.$store.state.pageId || Api.fetch("pageId");
      Api.GetNewsList(id, pageIndex, 10).then(res => {
        if (res) {
          this.NewsList = res.list;
          this.pageNum = Math.ceil(res.total / 10);
        } else {
          console.error(res);
        }
      });
    },
    Nextpage() {
      var length = this.activelist.length;
      if (this.Curpage < this.pageNum) {
        if (this.Curpage >= length) {
          for (var i = 0; i < length; i++) {
            this.activelist[i]++;
          }
        }
        this.Curpage++;
        this.Getlist(0, this.Curpage, 10);
      }
    },
    Lastpage() {
      var length = this.activelist.length;
      if (this.Curpage > 1) {
        if (this.Curpage <= this.activelist[0]) {
          for (var i = 0; i < length; i++) {
            this.activelist[i]--;
          }
        }
        this.Curpage--;
        this.Getlist(0, this.Curpage, 10);
      }
    },
    up(){
      this.$emit("isDetail",true);
    }
  }
};
</script>

<style scoped>
.Newslist { 
  margin-top: 20px;
}
.Newslist .dt-list ul.list {
  padding-bottom: 30px;
  min-height: 1000px;
}
.dt-list li {
  position: relative;
  text-align: left;
  padding: 20px 10px;
  border-bottom: 1px solid #e9e9e9;
}
.dt-list li:hover {
  box-shadow:3px 1px 10px #A9A9A9;
}
.dt-list .photo {
  float: left;
}
.dt-list .infos {
  float: left;
  padding-left: 20px;
}
.dt-list .infos .title {
  line-height: 36px;
  font-size: 16px;
  color: #000;
  padding-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
  display: block;
}

.dt-list .infos .content {
  line-height: 22px;
  font-size: 12px;
  color: #666;
}
.dt-list .infos .time {
  width: 100%;
  height: 12px;
  padding-top: 10px;
}
.dt-list .infos .time span {
  line-height: 12px;
  font-size: 12px;
  color: #999;
  width: auto;
}
.dt-list .infos .details {
  position: absolute;
  right: 10px;
  bottom: 30px;
  line-height: 10px;
  color: #309bff;
  display: block;
  font-size: 12px;
}
.dt-list .dede_pages {
  margin: 0 auto;
  width: 100%;
  height: 50px;
}
.dt-list .dede_pages .pagelist {
  border: none;
  line-height: 27px;
  padding: 0;
  width: auto;
  float: right;
}
.dt-list .dede_pages .pagelist li {
  float: left;
  width: auto;
  height: auto;
  padding: 0;
  margin: 0 4px;
  border-radius: 4px;
  cursor: pointer;
}
.dt-list .dede_pages .pagelist a.thisclass {
  color: #fff;
  background: #309bff;
  border: 1px solid #309bff;
}
.dede_pages .pagelist li a {
  display: block;
  width: 30px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  border-radius: 4px;
  border:1px solid #cad3de;
}
</style>
