// pages/my/index.js
// 导入request请求工具类 // 导入getBaseUrl
import {
    getBaseUrl,
    requestUtil,
    getWxLogin,
    getUserProfile,
    requestPay,
} from '../../utils/requestUtil.js'
// 引入 facebook的regenerator库
import regeneratorRuntime from '../../lib/runtime/runtime.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        baseUrl: '',
        userInfo: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const baseUrl = getBaseUrl();
        this.setData({
            baseUrl
        });

        // 获取token
        const token = wx.getStorageSync('token');
        if (!token) {
            wx.showModal({
                cancelColor: 'cancelColor',
                title: "友情提示",
                content: "微信授权后才可以登录个人中心",
                success: (res) => {
                    Promise.all([getWxLogin(), getUserProfile()]).then((res) => {
                        console.log(res[0].code);
                        console.log(res[1].userInfo.nickName, res[1].userInfo.avatarUrl);
                        let loginParam = {
                            code: res[0].code,
                            nickName: res[1].userInfo.nickName,
                            avatarUrl: res[1].userInfo.avatarUrl

                        }
                        console.log(loginParam);
                        // 把用户信息放到缓存中
                        wx.setStorageSync('userInfo', res[1].userInfo);
                        this.setData({
                            userInfo: res[1].userInfo
                        })
                        this.WxLogin(loginParam); //调用请求
                    })
                }
            })
        } else {
            console.log("token存在" + token);
            const userInfo = wx.getStorageSync('userInfo');
            this.setData({
                userInfo
            })
        }
    },

/**
 * 点击编辑收货地址
 */
    handleEditAddress(){
        wx.chooseAddress({
          success: (result) => {},
        })
    },
    /**
     * 请求后端获取用户token
     * @param {*} loginParam 
     */
    async WxLogin(loginParam) {
        const result = await requestUtil({
            url: '/users/wxlogin',
            data: loginParam,
            method: 'post'
        });
        console.log(result);
        let token = result.token;
        if (result.code == 0) {
            // 存储token到缓存
            wx.setStorageSync('token', token);
            // 支付继续走，下一步创建订单
            console.log("支付继续走，创建订单");
            this.createOrder();
        }
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