/**
 * 定义请求根路径 baseUrl
 */
// const beasUrl = "http://10.225.83.228:8080";
const beasUrl = "http://localhost:8080";

//同时并发请求的次数
// let ajaxTimes = 0;

// 返回请求根路径
export const getBaseUrl = () => {
    return beasUrl;
}
/**
 * 后端请求工具类
 */
export const requestUtil = (params) => {

    // var start = new Date().getTime();
    // console.log("ajaxTimes=" + ajaxTimes)
    // ajaxTimes++;
    // // 显示加载中 效果
    // wx.showLoading({
    //     title: '加载中',
    //     mask: true
    // });
    // // 模拟网络延迟加载
    // while (true) {
    //     if (new Date().getTime()-start>3*1000) break;
    // };

    return new Promise((resolve, reject) => {
        wx.request({
            ...params,//解构url
            url: beasUrl + params.url,//请求url更改
            success: (result) => {
                resolve(result.data)
            },
            fail: (err) => {
                reject(err);
            },
            // complete: () => {
            //     ajaxTimes--;
            //     if (ajaxTimes == 0) {
            //         // 关闭正在等待的图标
            //         wx.hideLoading()
            //     }
            // }
        })
    });
}