import { IAppOption } from "../../appoption"
import { rental } from "../../service/proto_gen/rental/rental_pb"
import { TripService } from "../../service/trip"
//import { TripService } from "../../service/trip"
import { routing } from "../../utils/routing"

const shareLocationKey = "share_location"

Page({
    carID: "",
    data:{
        shareLocation: '',
        avatarURL: '',  //头像
    },
    
    async onLoad(opt: Record<"car_id", string>){
        const o: routing.LockOpt = opt
        this.carID = o.car_id
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
            success: async loc =>{
                    console.log('starting a trips', {
                        location:{
                            latitude: loc.latitude,
                            longitude:loc.longitude,
                        },

                        avaterURL: this.data.shareLocation ? this.data.avatarURL: '',
                    })
                    if (!this.carID) {
                        console.error("没有carID")
                        return
                    }
                    
                    let trip: rental.v1.ITripEntity
                    try{
                         trip = await TripService.createTrip({
                            start: loc,
                            carId: this.carID,
                        })
                        if (!trip.id){
                            console.error("没有返回tripID:", trip)
                            return
                        }
                    }catch(err) {
                        wx.showToast({
                            title: "创建行程失败",
                            icon: "none"
                        })
                        return
                    }
                    
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
                                trip_id: trip.id!,
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

