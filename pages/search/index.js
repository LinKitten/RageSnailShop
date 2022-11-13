// pages/search/index.js
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
        productList: [],//商品数组
        inputValue: "",//输入框值
        isFocus: false,//取消按钮是否显示
    },
    TimeOutId: -1,
    handleInput(e) {
        // console.log(e);
        const { value } = e.detail;
        console.log(value);
        // 根据搜索框的是否有内容设置取消按钮的出现
        if (!value.trim()) {
            this.setData({
                productList: [],
                isFocus: false
            })
            return;
        }
        this.setData({
            isFocus: true
        })
        clearTimeout(this.TimeOutId)
        this.TimeOutId = setTimeout(() => {
            this.search(value);//调用数据
        }, 1000)
    },
    /**
     * 点击取消按钮
     */
    handleCancel() {
        this.setData({
            productList: [], // 商品数组
            isFocus: false, // 取消 按钮 是否显示
            inputValue: "" // 输入框的值
        })
    },
    /**
    * 请求后端 商品搜索
    */
    async search(q) {
        const result = await requestUtil({
            url: '/product/search',
            data: { q }
        });
        this.setData({
            productList: result.message
        })
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

    }
})