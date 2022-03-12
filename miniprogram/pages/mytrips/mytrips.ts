import { IAppOption } from "../../appoption"
import { routing } from "../../utils/routing"



interface Trip{
    id: string,
    statar: string,
    end:string,
    duration: string,
    fee: string,
    distance: string,
    stutar:string,
}

interface MainItem{
    id: string,
    navId: string,
    navScrollId: string,
    data: Trip,
}

interface NavItme{
    id: string,
    mainId: string,
    label: string,
}

interface MainItemQueryResults{
    id: string,
    top: number,
    dataset:{
        navId: string,
        navScrollId: string,
    }
    
}

Page({
    scrollStates:{
        mainItem: [] as MainItemQueryResults[],
    },
    data:{
        tripsHeight:0,
        avatarURL:'',
        trips:[] as Trip[],
        mainitem: [] as MainItem[],
        navitem: [] as NavItme[],
        mainscroll: '',
        navCount:0,
        navSelect: '',
        navScroll:'',
        imgUrls:[
            'https://img4.mukewang.com/6203223d00015e9817920764.jpg',
            'https://img.mukewang.com/6218389d0001e43e17920764.jpg',
            'https://img.mukewang.com/6216fef5000134df17920764.jpg',
            'https://img1.mukewang.com/621839280001e48017920764.jpg',
        ]
        
    },
    async onLoad(){
        this.populateTrip()
        const userInfo = await getApp<IAppOption>().globalData.userInfo
         this.setData({
            avatarURL: userInfo.avatarUrl,
        })
    },

    populateTrip(){
        const mainItem: MainItem[] = []
        const navItem: NavItme[] = []
        let navSelect = ''
        let prevNav = ''
        for(let i = 0; i <100; i++){
            const mainId = 'main-' + i 
            const navId = 'nav-' + i
            const tripId =  (10000 + i).toString()
            if(!prevNav){
                prevNav = navId
            }

            mainItem.push({
                id: mainId,
                navId: navId,
                navScrollId:prevNav,
                data:{
                    id: tripId,
                    statar: '南京',
                    end: '无锡',
                    duration: '4h',
                    fee: '200元',
                    distance: '200KM',
                    stutar: '进行中',
                }
            })
            navItem.push({
                id:navId,
                mainId: mainId,
                label: tripId,
            })
            if(i === 0){
                navSelect = navId
            }
            prevNav = navId
        }
        this.setData({
            mainItem,
            navItem,
            navSelect

        }, () =>{
            this.prepareScroll()
        })
    },
    //不是很懂
    onReady(){
        wx.createSelectorQuery().select('#heading')
            .boundingClientRect(rect =>{
                const height = wx.getSystemInfoSync().windowHeight - rect.height
                this.setData({
                    tripsHeight:height,
                    navCount: Math.round(height/50),
                })
            }).exec()
            
    },

    getchangePage(){
        wx.navigateTo({
            url:routing.register(), //register()为可选参数
        })
    },
    onGetUserInfo(e: any){
        console.log(e)
        const userInfo: WechatMiniprogram.UserInfo = e.detail.userInfo
        getApp<IAppOption>().resolveUserInfo(userInfo)
    },

    prepareScroll(){
        wx.createSelectorQuery().selectAll('.main-item').fields({
            id: true,
            dataset: true,
            rect: true,
        }).exec(res =>{
            this.scrollStates.mainItem = res[0]
        })

    },

    onnavitemTap(e: any){
        //数据绑定
        const mainId: string = e.currentTarget?.dataset.mainId
        //const navSelect:string = e.currentTarget?.id
        const navId: string = e.currentTarget?.id
        if(mainId && navId){
            this.setData({
                mainscroll: mainId,
                navSelect: navId,
    
            })
        }
    },

    onMainScroll(e: any){
        console.log(e)
        const top: number = e.currentTarget?.offsetTop + e.detail?.scrollTop
        if(top === undefined){
            return
        }
        const selItem = this.scrollStates.mainItem.find(Item => Item.top >= top)
        if(!selItem){
            return 
        }
        this.setData({
            navSelect: selItem.dataset.navId,
            navScroll: selItem.dataset.navScrollId,

            
        })
        
    }

})
