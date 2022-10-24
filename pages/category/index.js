// pages/category/index.js
// 导入request请求工具类
import { getBaseUrl, requestUtil } from '../../utils/requestUtil.js'
// 引入Facebook 的regenerator库
import regeneratorRuntime from '../../lib/runtime/runtime.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        baseUrl: '',
        currentIndex: 0,//当前选中左侧菜单的索引
        scrollTop: 0, //设置竖向滚动条的位置
        leftMenuList: [], // 左侧菜单的数据
        rightContext: [], // 右侧商品数据
    },

    Cates: [],//所有商品类别数据

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //一开始就先加载请求根路径
        const baseUrl = getBaseUrl();
        this.setData({
            baseUrl
        })
        this.getCates();
    },

    /**
     * 获取商品分类数据
     */
    async getCates() {
        {
            const result = await requestUtil({
                url: "/bigType/findCategories",
                method: "GET",
            });
            this.Cates = result.message;
            let leftMenuList = this.Cates.map(v => v.name);
            this.setData({
                leftMenuList
            });
            let rightContext = this.Cates[0].smallTypeList;
            this.setData({
                leftMenuList,
                rightContext,
            })
        }
    },
    /**
    * 获取商品分类数据 从首页过来的
    */
    async getCates2(index) {
        {
            const result = await requestUtil({
                url: "/bigType/findCategories",
                method: "GET",
            });
            this.Cates = result.message;
            let leftMenuList = this.Cates.map(v => v.name);
            this.setData({
                leftMenuList
            });
            let rightContext = this.Cates[index].smallTypeList;
            this.setData({
                leftMenuList,
                rightContext,
                currentIndex: index,
                scrollTop:0,

            })
        }
    },
    /**
     * 左侧菜单点击切换事件
     */
    handleMenuItemChange(e) {
        const { index } = e.currentTarget.dataset;
        let rightContext = this.Cates[index].smallTypeList;
        this.setData({
            currentIndex: index,
            rightContext,
            scrollTop: 0, //滚动条重置为0
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
        // 获取index值
        const app = getApp();
        const { index } = app.globalData;
        if (index != -1) { //从首页跳转过来分类页面的
            this.getCates2(index);
            app.globalData.index = -1; //重置全局index
        }
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