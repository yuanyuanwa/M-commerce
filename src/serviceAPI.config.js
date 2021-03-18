const { allowedMethods } = require("../service/appApi/user");

//基本路径
const BASEURL='https://www.fastmock.site/mock/672a975c04670f5e6d31191cf317570c/ecommerce/'
//本地后台的数据路径
const LOCALURL='http://localhost:3000/'

//所以配置到API下
const URL={
    getShoppingMailInfo:BASEURL+'index',//商场首页信息
    getGoodsInfo:BASEURL+'getGoodsInfo',
    //在service文件夹下appApi里文件写的然后在index.js里配置的路径
    registerURL:LOCALURL+'ss/register', //用户注册接口
    login:LOCALURL+'ss/login', //用户注册接口
    getDetailGoodsInfo:LOCALURL+'goods/getDetailGoodsInfo', //用户获取商品详情
    getCategoryList:LOCALURL+'goods/getCategoryList', //获取大类信息
    getCategorySubList:LOCALURL+'goods/getCategorySubList', //获取小类信息
    getGoodsListByCategorySubID:LOCALURL+'goods/getGoodsListByCategorySubID', //获取商品列表信息
}

module.exports=URL;