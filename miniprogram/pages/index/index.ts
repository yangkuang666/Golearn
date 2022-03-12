import { routing } from "../../utils/routing"

Page({
  isPageShowing:false,
  data: {
   setting: {
    skew: 0,  
    rotate: 0,
    showLocation: true,   //展示位置
    showScale: true,   //展示比例尺
    subKey: '',
    layerStyle: -1,
    enableZoom: true,
    enableScroll: true,
    enableRotate: false,
    showCompass: false,
    enable3D: false,
    enableOverlooking: false,
    enableSatellite: false,
    enableTraffic: false,
  },

  location: {   //当前位置
    latitude:31.756825521115363,
    longitude: 120.37222114786053,
  },

  scale: 10,   //当前比例尺
  //小车位置
  markers:[
    {
    iconPath: "/resources/car.png",
    id:0,
    latitude: 23,
    longitude: 113,
    width: 15,
    height: 20,
  },
  {
    iconPath: "/resources/car.png",
    id: 1,
    latitude: 23.0032,
    longitude: 113.005,
    width: 15,
    height: 20,
  },
  {
    iconPath: "/resources/car.png",
    id: 2,
    latitude: 29.756825521115363,
    longitude: 121.87222114786053,
    width: 20,
    height: 30,
  },
  {
    iconPath: "/resources/car.png",
    id: 3,
    latitude: 29.756825521115363,
    longitude: 121.87222214786053,
    width: 15,
    height: 20,
  },
 ]
},

//获取初始位置/当前位置
onMylocationTap(){
  wx.getLocation({
    type: 'gcj02',
    success: res =>{
      this.setData({
        //location为一个对象类型，在
        location: {
          latitude: res.latitude,
          longitude: res.longitude,
        },
      })
    },
    fail: () =>{
      wx.showToast({
        icon:"none",  //用于加长位置摆放
        title:'请前往设置页面授权'
      })
    }
  })
},
//扫描点击
onScanClicked(){
  //保留当前页面，跳转到应用内的register页面。但是不能跳到 tabbar 页面
  wx.scanCode({
    success: () =>{
      const carID = 'car01'  //模拟后端ID
      const redirectURL = routing.Lock({car_id: carID})  //类型强化替代：`/pages/lock/lock?car_id=${carID}` 
      
      wx.navigateTo({
        //跳转至lock页面前向跳转至register页面，并将carID放在redirectURL中传至register页面
        //最后将carID传至lock页面
        url: routing.register({redirectURL:redirectURL})   // 类型强化替代：`/pages/register/register?redirect=${encodeURIComponent(redirectURL)}` 
      })
    },
    fail:console.error,
  })
},

onShow(){
  this.isPageShowing = true;
},

onHide(){
  this.isPageShowing = false;

},

onMyTripsTap(){
  wx.navigateTo({
    url: routing.mytrips(),
  })
},

moveCars(){
  //可通过 wx.createMapContext 获取。
  //MapContext 通过 id 跟一个 map 组件绑定，操作对应的 map 组件。
  const map = wx.createMapContext("map")
  const dest = {
    latitude: 23,
    longitude: 113,
  }
const moveCars = () =>{
  //平移marker，带动画。
   dest.latitude += 0.5,
   dest.longitude += 0.5,
  map.translateMarker({
    destination: {
      latitude: dest.latitude,
      longitude: dest.longitude,
    },
    markerId: 0,
    autoRotate: false,
    rotate: 0,
    duration: 50000,
    animationEnd:() =>{
      if(this.isPageShowing){
        moveCars()
    }
   }
  })
}
moveCars()
}
})

