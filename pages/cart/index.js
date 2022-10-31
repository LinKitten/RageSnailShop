// pages/cart/index.js
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
        address: {},
        cart: [],
        allChecked: false, //全选框状态
        totalPrice: 0,//购物车商品总数
        totalNum: 0,//商品总金额
    },
    /**
     *  获取收货地址
     */
    handleChooseAddress() {
        wx.chooseAddress({
            success: (result) => {
                console.log(result);
                // 存储到缓存中
                wx.setStorageSync('address', result)
            },
        })
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

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // 从缓存中获取数据，存入data
        const address = wx.getStorageSync('address');
        const cart = wx.getStorageSync('cart') || [];//cart为空时设置成一个空数组

        this.setData({
            address,
        })
        this.setCart(cart);
    },

    /**
     * 商品选中事件处理
     */
    handleItemChange(e) {
        // console.log(e);
        const { id } = e.currentTarget.dataset;
        // console.log(this.data);
        let { cart } = this.data;
        let index = cart.findIndex(v => v.id === id);
        cart[index].checked = !cart[index].checked;//取反

        this.setCart(cart);//重新处理

    },

    // 商品全选事件处理
    handleItemAllCheck() {
        let { cart, allChecked } = this.data;
        console.log(cart, allChecked);
        allChecked = !allChecked;
        cart.forEach(v => v.checked = allChecked);
        //   重新计算
        this.setCart(cart);
    },

    // 商品数量的编辑功能
    handleItemNumEdit(e) {
        const { id, operation } = e.currentTarget.dataset;
        console.log(id, operation, this.data);
        let { cart } = this.data;
        let index = cart.findIndex(v => v.id === id);
        if (cart[index].num === 1 && operation === -1) {
            wx.showModal({
                this:'来自系统的提示',
                content:'你确定要删除吗？',
              cancelColor: 'cancelColor',
              success:(res)=>{
                  if(res.confirm){
                      cart.splice(index,1)//在index的地方开始删除一个数据
                      this.setCart(cart);//更新数据
                  }
              }
            })
        } else {
            cart[index].num += operation; //加上1或-1
            //   重新计算
            this.setCart(cart);
        }

    },
    //点击结算功能
    handlePay(){
        const {address,totalNum} = this.data;
        if(!address){
            wx.showToast({
              title: '您还没有选择收货地址',
              icon: 'none',
            })
            return;
        }
        if(totalNum===0){
            wx.showToast({
              title: '您还没有选择要购买的商品',
              icon: 'none',
            })
            return;
        }
        wx.navigateTo({
          url: '/pages/pay/index',//跳转到支付页面
        })
    },
    //设置购物车状态 重新计算底部工具栏 全选 总结 总数量 重新设置缓存
    setCart(cart) {
        let allChecked = true;
        let totalPrice = 0;
        let totalNum = 0;
        // 遍历cart中所有商品复选框的checked状态
        cart.forEach(v => {
            if (v.checked) {
                // console.log(v.checked,allChecked);
                // 计算汇总购物车的商品数量
                totalNum += v.num;
                // 计算汇总购物车的商品总价
                totalPrice += v.price * v.num;

            } else {
                allChecked = false;
            }
        })
        allChecked = cart.length != 0 ? allChecked : false;
        console.log(allChecked);
        this.setData({
            cart,
            allChecked,
            totalNum,
            totalPrice,
        })
        // cart设置到缓存重
        wx.setStorageSync('cart', cart)
    }

})