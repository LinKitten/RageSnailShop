/**
 * 后端请求工具类
 */
export const requestUtil=(params)=>{
    return new Promise((resolve,reject)=>{
        wx.request({
          ...params,//解构url
          success:(result)=>{
              resolve(result.data)
          },
          fail:(err)=>{
              reject(err);
          }
        })
    });
}