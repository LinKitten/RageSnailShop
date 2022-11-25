/**
 * 定义请求根路径 baseUrl
 */
const beasUrl = "http://10.225.83.228:8080";
// const beasUrl = "http://localhost:8080";
// const beasUrl = "http://192.168.75.238:8080";

//同时并发请求的次数
// let ajaxTimes = 0;

// 返回请求根路径
export const getBaseUrl = () => {
    return beasUrl;
}
// wx login封装
export const getWxLogin = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            timeout: 5000,//最长等待时间
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    });
}
// wx getUserProfile封装
export const getUserProfile = () => {
    return new Promise((resolve, reject) => {
        wx.getUserProfile({
            desc: '获取用户信息',
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    });
}
/**
 * 后端请求工具类
 */
export const requestUtil = (params) => {
    // 判断url中是否带有 /my/ 请求的是私有路径 带上header token
    let header = { ...params.header };
    if (params.url.includes("/my/")) {
        // 拼接header 带上token
        header["token"] = wx.getStorageSync('token');
    }

    //#region 
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
    //#endregion

    return new Promise((resolve, reject) => {
        wx.request({
            ...params,//解构url
            header,
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

/**
* promise形式的 小程序的微信支付
*/
export const requestPay = (pay) => {
    return new Promise((resolve, reject) => {
        wx.requestPayment({
            ...pay,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    });
}