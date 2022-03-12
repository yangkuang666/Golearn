import { IAppOption } from "../../appoption"
import { routing } from "../../utils/routing"

const shareLocationKey = "share_location"

Page({
    data:{
        shareLocation: '',
        avatarURL: '',  //头像
    },
    
    async onLoad(opt: Record<"car_id", string>){
        const o: routing.LockOpt = opt
        console.log("您需要开锁车辆的ID:", o.car_id)
        const userInfo = await getApp<IAppOption>().globalData.userInfo
         this.setData({
            avatarURL: userInfo.avatarUrl,
        })
    },

    onGetUserInfo(e: any){
        console.log(e)
        const userInfo: WechatMiniprogram.UserInfo = e.detail.userInfo
        getApp<IAppOption>().resolveUserInfo(userInfo)
    },



    onShareLocation(e: any) {
        this.data.shareLocation = e.detail.value
        wx.setStorageSync(shareLocationKey, this.data.shareLocation)
    },
    
    onUnlockTap(){
        //开锁前，获取当前位置，将数据上传服务器
        wx.getLocation({
            type:'gcj02',
            success: loc =>{
                    console.log('starting a trips', {
                        location:{
                            latitude: loc.latitude,
                            longitude:loc.longitude,
                        },

                        avaterURL: this.data.shareLocation ? this.data.avatarURL: '',
                    })
                    const tripID = 'trips123'

                    wx.showLoading({
                        title: "加载中",
                        mask: true,   //保护按钮
                    }),
                    setTimeout(() => {
                        wx.redirectTo({
                             //跳转至driving，并将trip_id传至driving页面
                             //url: `/pages/driving/driving?trip_id=${tripID}`
                             //使用强类型
                            url: routing.driving({     
                                trip_id: tripID
                            }),
                            complete: () =>{
                                wx.hideLoading()
                            }
                        })
                    }, 3000);   
            },
            fail: () =>{
                wx.showToast({
                    icon:"none",  //用于加长位置摆放
                    title:'请前往设置页授权位置信息',
                  })
            },
        })
    },
    
})

