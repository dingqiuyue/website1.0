import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//数据
const state={
    parentId: 0,
    parentMc: '',
    parentRoute: '',
    pageId: 0,
    pageName: ''
}

//相对于computed 作用于state的过滤操作....
const getters={
    
}

//函数  主要用来操控stste中的数据

const mutations ={

}

//来调用mutations里面的方法,进行异步操作

const actions = {
    //默认接收一个参数
    addagepro(a){
    
    a.commit('addage')
        
    }
}

//暴露出去，提供vue使用
export default new Vuex.Store({
    //用来保存数据的
    state,
    mutations,
    actions,
    getters
    
})

//在main.js中引入import store from './vuex'
//必须使用store命名