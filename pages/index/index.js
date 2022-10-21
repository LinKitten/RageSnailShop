// pages/index/index.js

// 导入request请求工具类 // 导入getBaseUrl
import {
  getBaseUrl,
  requestUtil
} from '../../utils/requestUtil.js'
// 引入 facebook的regenerator库
import regeneratorRuntime from '../../lib/runtime/runtime.js'
Page({


  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList: [],
    baseUrl: '',
    bigTypeList: [],
    bigTypeList_row1: [],
    bigTypeList_row2: [],
    hotProductList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //一开始就先加载请求根路径
    const baseUrl = getBaseUrl();
    this.setData({
      baseUrl
    })
    //发送异步请求 从后端获取数据
    // wx.request({
    //   url: "http://localhost:8080/product/findSwiper",
    //   method: "GET",
    //   success:(result)=>{
    //     console.log(result);
    //     // 赋值
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   }
    // })
    // 
    this.getSwiperList();
    this.getBigTypeList();
    this.getHotProductList();
  },
  // 轮播图获取数据
  async getSwiperList() {
    // requestUtil({ url: "/product/findSwiper", method: "GET" })
    //   .then(result => {
    //     const baseUrl = getBaseUrl();
    //     // 成功的时候执行 对swiperList赋值
    //     this.setData({
    //       swiperList: result.message,
    //       baseUrl
    //     })
    //   })
    const result = await requestUtil({
      url: "/product/findSwiper",
      method: "GET"
    });
    // 成功的时候执行 对swiperList赋值
    this.setData({
      swiperList: result.message,
    })
  },
  /**
   * 获取热门商品推荐数据
   */
  async getHotProductList() {
    const result = await requestUtil({
      url: "/product/findHot",
      method: "GET"
    });
    // 成功的时候执行 对swiperList赋值
    this.setData({
      hotProductList: result.message,
    })
  },

  //异步函数 金刚区 获取bigTypeList 并初始化row1和row2
  async getBigTypeList() {
    const result = await requestUtil({
      url: "/bigType/findAll",
      method: "GET"
    });
    console.log(result);
    const bigTypeList = result.message;
    // 过滤 分别拿到两行的数据
    const bigTypeList_row1 = bigTypeList.filter((item, index) => {
      return index < 5;
    });
    const bigTypeList_row2 = bigTypeList.filter((item, index) => {
      return index >= 5;
    });
    this.setData({
      bigTypeList,
      bigTypeList_row1,
      bigTypeList_row2
    })
  }


})