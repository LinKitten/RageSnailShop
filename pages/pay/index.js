// pages/cart/index.js
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
        address: {},
        cart: [],
        totalPrice: 0,//购物车商品总数
        totalNum: 0,//商品总金额
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const baseUrl = getBaseUrl();
        this.setData({
            baseUrl
        });
    },
    // 处理订单支付
    async handleOrderPay() {
        //#region 
        // wx.login({
        //   timeout: 5000,//最长等待时间
        //   success:(res)=>{    
        //   }
        // })

        // let res = await getWxLogin();
        // console.log(res.code);

        // 获取微信的信息
        // wx.getUserProfile({
        //     desc: '获取用户信息',
        //     success: (res) => {
        //         console.log(res.userInfo.nickName, res.userInfo.avatarUrl)
        //     }
        // })

        // let res2 = await getUserProfile();
        // console.log(res2.userInfo.nickName, res2.userInfo.avatarUrl);    
        //#endregion

        // 获取token
        const token = wx.getStorageSync('token');
        if (!token) {
            Promise.all([getWxLogin(), getUserProfile()]).then((res) => {
                console.log(res[0].code);
                console.log(res[1].userInfo.nickName, res[1].userInfo.avatarUrl);
                let loginParam = {
                    code: res[0].code,
                    nickName: res[1].userInfo.nickName,
                    avatarUrl: res[1].userInfo.avatarUrl
                    // https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
                }
                console.log(loginParam);
                // 做一个存储操作
                // wx.setStorageSync('userInfo', res[1].userInfo);
                this.WxLogin(loginParam); //调用请求
            })
        } else {
            console.log("token存在" + token);
            // 支付继续走，下一步创建订单
            console.log("支付继续走，创建订单");
            this.createOrder();
        }
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
    /*
           创建订单
       */
    async createOrder() {

        try {
            const totalPrice = this.data.totalPrice;
            const address = this.data.address.provinceName + this.data.address.cityName + this.data.address.countyName + this.data.address.detailInfo; // 请求体 收货地址
            const consignee = this.data.address.userName;//
            const telNumber = this.data.address.telNumber; // 请求体 联系电话
            let goods = [];//商品详情
            this.data.cart.forEach(v => goods.push({
                goodsId: v.id,
                goodsNumber: v.num,
                goodsPrice: v.price,
                goodsName: v.name,
                goodsPic: v.proPic
            }))
            console.log(goods)
            const orderParam = {
                totalPrice,
                address,
                consignee,
                telNumber,
                goods
            }
            const res = await requestUtil({
                url: '/my/order/create',
                method: 'POST',
                data: orderParam,

            });
            console.log('orderNo=' + res.orderNo);

            let orderNo = res.orderNo;
            // 调用统一下单，预支付
            const preparePayRes = await requestUtil({
                url: '/my/order/preparePay',
                method: 'POST',
                data: orderNo,
            });
            
           

            //删除缓存中，已经支付的商品
            let newCart = wx.getStorageSync('cart');
            newCart = newCart.filter(v => !v.checked);//删掉已经支付的商品
            wx.setStorageSync('cart', newCart);//重新放入缓存

            

            // wx.showToast({
            //     title: '支付成功',
            //     icon: 'none'
            // })
          
            // 跳转到订单页面
            // wx.navigateTo({
            //     url: '/pages/order/index?type=0',
            // })
            setTimeout(()=>{
                wx.showToast({
                    title: '支付成功',
                    icon: 'none'
                })
                wx.navigateTo({
                    url: '/pages/order/index?type=0',
                })
            },1000)

            let payRes = await requestPay(preparePayRes);


        } catch (error) {
            console.log(error);
            wx.showToast({
                title: '支付失败，请稍后尝试',
                icon: "none"
            })
        }



    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // 从缓存中获取数据，存入data
        const address = wx.getStorageSync('address');
        let cart = wx.getStorageSync('cart') || [];//cart为空时设置成一个空数组
        cart = cart.filter(v => v.checked)  //将选择的商品过滤出来
        let totalPrice = 0;
        let totalNum = 0;
        // 遍历cart中所有商品复选框的checked状态
        cart.forEach(v => {
            // 计算汇总购物车的商品数量
            totalNum += v.num;
            // 计算汇总购物车的商品总价
            totalPrice += v.price * v.num;
        })
        this.setData({
            cart,
            totalNum,
            address,
            totalPrice,
        })
    },

})