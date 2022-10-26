// pages/product_detail/index.js
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
        baseUrl: '',
        productObj:{},
        activeIndex:0

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options.id);//获取id
        const baseUrl = getBaseUrl();
        this.setData({
          baseUrl
        });
        this.getProductDetail(options.id)
    },
    /**
     * tab点击切换
     */
    handleItemTap(e){
        const {index} = e.currentTarget.dataset;
        console.log(index);
        this.setData({
            activeIndex:index
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    /**
   * 获取商品详情 
   */
    async getProductDetail(id){
        const result = await requestUtil({
            url:'/product/detail',
            data:{id},
            method:"get"
        });
        this.setData({
            productObj:result.message
        })
    }
})