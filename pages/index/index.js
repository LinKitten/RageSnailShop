// pages/index/index.js

// 导入request请求工具类
import { requestUtil } from '../../utils/requestUtil.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    requestUtil({ url: "http://localhost:8080/product/findSwiper", method: "GET" }).then(result => {
      // 成功的时候执行 对swiperList赋值
      this.setData({
        swiperList: result.message
      })
    })
  },


})