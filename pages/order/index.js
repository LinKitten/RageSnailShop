// pages/order/index.js


// 导入request请求工具类 // 导入getBaseUrl
import {
    getBaseUrl,
    requestUtil
} from '../../utils/requestUtil.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        baseUrl: '',
        orders: [],
        tabs: [
            {
                id: 0,
                value: "全部订单",
                isActive: true,
            },
            {
                id: 1,
                value: "待付款",
                isActive: false,
            },
            {
                id: 2,
                value: "待收货",
                isActive: false,
            },
            {
                id: 3,
                value: "退款/退货",
                isActive: false,
            },
        ],

    },
    // 接口参数
    QueryParams: {
        type: 0,
        page: 1,//当前页
        pageSize: 10,//每页记录数

    },

    // 总页数
    totalPage: 1,

    // 根据标题索引激活选中的标签
    changeTitlByIndex(index) {
        // 切换标题
        let { tabs } = this.data;
        tabs.forEach((v, i) => i == index ? v.isActive = true : v.isActive = false);
        this.setData({
            tabs
        })
    },

    /**
     * tab点击事件处理
     * @param {*} e 
     */
    handleTabsItemChange(e) {
        // const { index } = e.currentTarget.dataset;
        const { index } = e.detail
        // 切换标题
        this.changeTitlByIndex(index)
        // 获取订单列表
        this.QueryParams.type = index;
        // 重置
        this.QueryParams.page = 1;
        this.setData({
            orders: []
        })
        this.getOrders();


    },

    /**
    * 获取订单
    */
    async getOrders() {
        const res = await requestUtil({ url: '/my/order/list', data: this.QueryParams });
        console.log(res)
        this.totalPage = res.totalPage;
        this.setData({
            orders: [...this.data.orders, ...res.orderList]
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
        console.log("show");
        // 获取当前的小程序的页面栈 -数组 长度最大是10个页面
        let pages = getCurrentPages();
        // console.log(pages);
        let currentPage = pages[pages.length - 1];//得到当前页
        const { type } = currentPage.options;
        console.log("type= " + type);
        this.changeTitlByIndex(type);//切换标题
        this.QueryParams.type = type;
        this.QueryParams.page =1;
        this.setData({
            orders: []
        })
        this.getOrders();
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
        console.log("下拉刷新");
        this.QueryParams.page = 1;
        this.setData({ //清空
            orders: []
        })
        this.getOrders();//获取页数据
        //数据加载完 手动关闭等待效果
        wx.stopPullDownRefresh({

        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        // console.log("触底");
        if (this.QueryParams.page >= this.totalPage) {//当前页大于总页数
            // 没有下一页数据
            console.log("没有下一页数据");
            wx.showToast({
                title: '已经是最后一页了哦',
                icon: "none"
            })
        } else {
            console.log("有下一页数据");
            this.QueryParams.page++;
            this.getOrders();
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})