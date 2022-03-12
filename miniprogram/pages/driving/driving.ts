import { routing } from "../../utils/routing"

const centPerSec = 1

function formatfee(feer: number): string{
    return (feer/100).toFixed(2)

}
function formatDurtion(Sec:number){
    const h = Math.floor(Sec/3600)   //转化小时
    Sec -= h * 3600
    const m = Math.floor(Sec/60)     //转化分钟
    Sec -= m * 60
    const s = Math.floor(Sec)
    return `${padstring(h)}:${padstring(m)}:${padstring(s)}`
}

//需要将时间显示两个零，例如：0 => 00
 function padstring(n: number): string{
    if(n < 10){
        return '0'+n.toFixed(0)
    }
    else{
        return n.toFixed(0)
    }
}


Page({
    timer: undefined as number|undefined,
    tripID: '',

    data: {
        location: {
            latitude: 40.756825521115363,
            longitude: 121.67222114786053,
        },
        scale: 10,
        elapsed: '00:00:00',
        fee: '45.72',
    },
    //页面起始，opt为上个页面传送数据
    onLoad(opt: Record<'trip_id', string>){  //Record<'trip_id', string>表示rip_id为string类型
        const o: routing.DrivingOpt = opt
        console.log("记录行程", o.trip_id)

        this.setupLocationUpdator()
        this.setupTimer()
    },

    onUnload(){
        wx.stopLocationUpdate()
        if(this.timer){
            clearInterval(this.timer)
        }
    },

    onEndTripTap(){
        wx.showLoading({
            title: "加载中",
            mask: true,   //保护按钮
        }),
        setTimeout(() => {
            wx.redirectTo({
                url: "/pages/learncss/learncss",
                complete: () =>{
                    wx.hideLoading()
                }
            })
        }, 3000);   
    },

    setupLocationUpdator(){
        //起始位置
        wx.startLocationUpdate({
            fail: console.error,
        })
        //实时更新位置
        wx.onLocationChange(loc =>{
            console.log("location:", loc)
            this.setData({
                location:{
                    latitude: loc.latitude,
                    longitude:loc.longitude,
                },
            })
        })
    },
    //定期向执行该函数
    setupTimer(){
        let elapsedSec = 0
        let cents = 0
        this.timer = setInterval(() =>{
            elapsedSec ++
            cents ++
            cents *= centPerSec
            this.setData({
                elapsed: formatDurtion(elapsedSec),
                fee: formatfee(cents)
            })
        }, 1000)
    }
})
