import Vue from 'vue'

var vm = new Vue();

var apiUrl = "http://172.16.50.107:8088/api/Service"

var Api = {
	//存取localStorage中的数据
	save(key, value) { //存数据
		localStorage.setItem(key, JSON.stringify(value));
	},
	fetch(key) { //取数据
		return JSON.parse(localStorage.getItem(key)) || [];
	},
	_doPromise(url, params) {
		return new Promise((resolve, reject) => {
			vm.$http.get(url, {
				params: params
			}).then(res => {
				resolve(res.data)
			}, res => {
				// error callback
				reject(res)
				console.log('error: ', res)
			})
		})
	},
	//获取一级二级菜单
	GetMenuList(parent_id) {
		return this._doPromise(apiUrl + '/Menu.asmx/GetMenuList', {
			parent_id: parent_id
		})
	},
	//获取新闻列表
	GetNewsList(menu_code, pageIndex, pageSize) {
		return this._doPromise(apiUrl + '/Article.asmx/GetNewsList', {
			menu_code: menu_code,
			page_index: pageIndex || 1,
			page_size: pageSize || 10
		})
	},
	//获取新闻内容
	GetArticleContentByCode(id) {
		return this._doPromise(apiUrl + '/Article.asmx/GetArticleContentByCode', {
			code: id
		})
	},
	//获取二级菜单下的页面内容
	GetArticleContentByParentId(id) {
		return this._doPromise(apiUrl + '/Article.asmx/GetArticleContentByParentId', {
			parent_id: id
		})
	},
	//获取首页新闻资讯（公司新闻、行业新闻、热点新闻）列表
	GetIndexNewsList(num, menu_code, is_hot) {
		return this._doPromise(apiUrl + '/Article.asmx/GetIndexNewsList', {
			top: num,
			menu_code: menu_code,
			is_hot: is_hot,
		})
	}
}
export default Api