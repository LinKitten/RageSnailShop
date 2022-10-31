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
        productObj: {},
        activeIndex: 0

    },
    productInfo: {},
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
    handleItemTap(e) {
        const { index } = e.currentTarget.dataset;
        console.log(index);
        this.setData({
            activeIndex: index
        })
    },

    /**
 * 获取商品详情 
 */
    async getProductDetail(id) {
        const result = await requestUtil({
            url: '/product/detail',
            data: { id },
            // method: "get"
        });
        console.log(result);
        this.productInfo = result.message //存储当前的商品信息 用于购物车的操作
        const baseUrl = getBaseUrl();
        this.setData({
            productObj: result.message,
            baseUrl
        })
    },
    /**
     * 点击事件：商品加入购物车
     */
    handleCart() {
        this.setCartadd();
        wx.showToast({
            title: '加入成功',
            icon: "success",
            mask: true
        })
    },
    // 点击立即购买
    handleBuy() {
        this.setCartadd();
        wx.switchTab({
          url: '/pages/cart/index',
        })
    },
    //加入购物车
    setCartadd() {
        //  获取缓存中的购物车  获取不到变为n空，初始化为数值
        let cart = wx.getStorageSync('cart') || [];
        // 判断商品是否在购物车里面 (无：返回-1，有返回该商品下标)
        let index = cart.findIndex(v => v.id === this.productInfo.id);
        if (index === -1) { //购物车里面不存在当前商品
            this.productInfo.num = 1;//添加一个元素num
            this.productInfo.checked = true;//添加checked属性，默认选择商品
            cart.push(this.productInfo);
        } else {//购物车里面存在当前商品
            cart[index].num++;
        }
        wx.setStorageSync('cart', cart);//把购物车里的商品数据添加到缓存中
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


})