/**
 * 定义请求根路径 baseUrl
 */
const beasUrl = "http://10.225.82.104:8080";
// const beasUrl = "http://localhost:8080";
// 返回请求根路径
export const getBaseUrl=()=>{
    return beasUrl;
}
/**
 * 后端请求工具类
 */
export const requestUtil=(params)=>{
    return new Promise((resolve,reject)=>{
        wx.request({
          ...params,//解构url
          url:beasUrl+params.url,//请求url更改
          success:(result)=>{
              resolve(result.data)
          },
          fail:(err)=>{
              reject(err);
          }
        })
    });
}