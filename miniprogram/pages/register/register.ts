import { routing } from "../../utils/routing"

Page({
     redirectURL: '',

    data:{
        birthDate: '1990-01-01',
        gendersIndex:0,
        genders:["未知", "男", "女", "其他"],
        licImgURL: '',
        licNo: '',
        name: '',
        state: 'UNSUBIMTTED' as 'UNSUBIMTTED' | 'PENDING' | 'VERIFIED',
    },

    onLoad(opt: Record<"redirect", string>){
        const o: routing.RegisterOpt = opt
        if(o.redirect){
            this.redirectURL = decodeURIComponent(o.redirect)
            console.log(this.redirectURL)
        }

    },

    onUploadLic(){
        //从本地相册选择图片或使用相机拍照。
        wx.chooseImage({
            success: res => {
                if(res.tempFilePaths.length > 0){
                    //setData将数据从逻辑层发送至渲染层
                    this.setData({
                    licImgURL: res.tempFilePaths[0],
                    })
                    setTimeout(() => {
                        this.setData({
                            licNo: 'c4820329323',
                            name: 'ice_moss',
                            gendersIndex: 1,
                            birthDate:'2021-12-01',
                        })
                    }, 1000);
                }
            }
        })
    
    },
    //选择性别
    onGenderChange(e:any){
        this.setData({
            gendersIndex: e.detail.value,
        })
    },
    //选择出生日期
    onBirthDateChange(e:any){
        this.setData({
            birthDate: e.detail.value,
        })
    },
    //递交审核
    onSubmit(){
        this.setData({
            //TODO:submit the from to server
            state: "PENDING",
        })
        setTimeout(() => {
            this.onlicVerified()
        }, 3000);
    },
    //从新递交
    onResubmit(){
        this.setData({
            state: "UNSUBIMTTED",
            licImgURL: '',
        })
    },
    onlicVerified(){
        this.setData({
            state: 'VERIFIED',
        })
        if(this.redirectURL){
            wx.redirectTo({
                url: this.redirectURL,
        
            })
        }
    }
})