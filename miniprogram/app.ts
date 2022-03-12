// app.ts
//import camelcaseKeys = require("camelcase-keys")
import { IAppOption } from "./appoption"
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
