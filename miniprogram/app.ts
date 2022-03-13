// app.ts
//import camelcaseKeys = require("camelcase-keys")
import camelcaseKeys = require("camelcase-keys")
import { IAppOption } from "./appoption"
import { auth } from "./service/proto_gen/auth/auth_pb"
//import { coolcar } from "./service/proto_gen/trip_pb"
//import { Coolcar } from "./service/request"
import { getSetting, getUserInfo } from "./utils/util"

let resolveUserInfo: (value: WechatMiniprogram.UserInfo | PromiseLike<WechatMiniprogram.UserInfo>) => void
let rejectUserInfo: (reason?: any) => void

// app.ts
App<IAppOption>({
  globalData: {
    userInfo: new Promise((resolve, reject) => {
      resolveUserInfo = resolve
      rejectUserInfo = reject
    })
  },
  
  async onLaunch() {
    wx.login({
      success: res => {
        console.log(res.code)
        //向后台发送res.code换取openId, sessionkeys, unionId
        wx.request({
          url: 'http://localhost:8080/v1/auth/login',
          method: 'POST',
          data:{
            code: res.code
          } as auth.v1.ILoginRequest,
          success: res =>{
            console.log(res.data)
            const loginResp: auth.v1.LoginResponse = auth.v1.LoginResponse.fromObject(
              camelcaseKeys(res.data as object))
            console.log(loginResp)
          },
          fail: console.error,
          
        })
      },
      fail: console.error
    })

    //获取用户信息
    try {
      const setting = await getSetting()
      if (setting.authSetting['scope.userInfo']) {
        const userInfoRes = await getUserInfo()
        resolveUserInfo(userInfoRes.userInfo)
      }
    } catch (err) {
      rejectUserInfo(err)
    }
  },
  resolveUserInfo(userInfo: WechatMiniprogram.UserInfo) {
    resolveUserInfo(userInfo)
  }
})
