"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Page({
    redirectURL: '',
    data: {
        birthDate: '1990-01-01',
        gendersIndex: 0,
        genders: ["未知", "男", "女", "其他"],
        licImgURL: '',
        licNo: '',
        name: '',
        state: 'UNSUBIMTTED',
    },
    onLoad(opt) {
        const o = opt;
        if (o.redirect) {
            this.redirectURL = decodeURIComponent(o.redirect);
            console.log(this.redirectURL);
        }
    },
    onUploadLic() {
        wx.chooseImage({
            success: res => {
                if (res.tempFilePaths.length > 0) {
                    this.setData({
                        licImgURL: res.tempFilePaths[0],
                    });
                    setTimeout(() => {
                        this.setData({
                            licNo: 'c4820329323',
                            name: 'ice_moss',
                            gendersIndex: 1,
                            birthDate: '2021-12-01',
                        });
                    }, 1000);
                }
            }
        });
    },
    onGenderChange(e) {
        this.setData({
            gendersIndex: e.detail.value,
        });
    },
    onBirthDateChange(e) {
        this.setData({
            birthDate: e.detail.value,
        });
    },
    onSubmit() {
        this.setData({
            state: "PENDING",
        });
        setTimeout(() => {
            this.onlicVerified();
        }, 3000);
    },
    onResubmit() {
        this.setData({
            state: "UNSUBIMTTED",
            licImgURL: '',
        });
    },
    onlicVerified() {
        this.setData({
            state: 'VERIFIED',
        });
        if (this.redirectURL) {
            wx.redirectTo({
                url: this.redirectURL,
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpc3Rlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLElBQUksQ0FBQztJQUNBLFdBQVcsRUFBRSxFQUFFO0lBRWhCLElBQUksRUFBQztRQUNELFNBQVMsRUFBRSxZQUFZO1FBQ3ZCLFlBQVksRUFBQyxDQUFDO1FBQ2QsT0FBTyxFQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDO1FBQzlCLFNBQVMsRUFBRSxFQUFFO1FBQ2IsS0FBSyxFQUFFLEVBQUU7UUFDVCxJQUFJLEVBQUUsRUFBRTtRQUNSLEtBQUssRUFBRSxhQUF1RDtLQUNqRTtJQUVELE1BQU0sQ0FBQyxHQUErQjtRQUNsQyxNQUFNLENBQUMsR0FBd0IsR0FBRyxDQUFBO1FBQ2xDLElBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBQztZQUNWLElBQUksQ0FBQyxXQUFXLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1NBQ2hDO0lBRUwsQ0FBQztJQUVELFdBQVc7UUFFUCxFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ1gsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUNYLElBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDO29CQUU1QixJQUFJLENBQUMsT0FBTyxDQUFDO3dCQUNiLFNBQVMsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztxQkFDOUIsQ0FBQyxDQUFBO29CQUNGLFVBQVUsQ0FBQyxHQUFHLEVBQUU7d0JBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQzs0QkFDVCxLQUFLLEVBQUUsYUFBYTs0QkFDcEIsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLFlBQVksRUFBRSxDQUFDOzRCQUNmLFNBQVMsRUFBQyxZQUFZO3lCQUN6QixDQUFDLENBQUE7b0JBQ04sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUNaO1lBQ0wsQ0FBQztTQUNKLENBQUMsQ0FBQTtJQUVOLENBQUM7SUFFRCxjQUFjLENBQUMsQ0FBSztRQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsWUFBWSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztTQUMvQixDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsaUJBQWlCLENBQUMsQ0FBSztRQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsU0FBUyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztTQUM1QixDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxPQUFPLENBQUM7WUFFVCxLQUFLLEVBQUUsU0FBUztTQUNuQixDQUFDLENBQUE7UUFDRixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO1FBQ3hCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRCxVQUFVO1FBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULEtBQUssRUFBRSxhQUFhO1lBQ3BCLFNBQVMsRUFBRSxFQUFFO1NBQ2hCLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFDRCxhQUFhO1FBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULEtBQUssRUFBRSxVQUFVO1NBQ3BCLENBQUMsQ0FBQTtRQUNGLElBQUcsSUFBSSxDQUFDLFdBQVcsRUFBQztZQUNoQixFQUFFLENBQUMsVUFBVSxDQUFDO2dCQUNWLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVzthQUV4QixDQUFDLENBQUE7U0FDTDtJQUNMLENBQUM7Q0FDSixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByb3V0aW5nIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3JvdXRpbmdcIlxuXG5QYWdlKHtcbiAgICAgcmVkaXJlY3RVUkw6ICcnLFxuXG4gICAgZGF0YTp7XG4gICAgICAgIGJpcnRoRGF0ZTogJzE5OTAtMDEtMDEnLFxuICAgICAgICBnZW5kZXJzSW5kZXg6MCxcbiAgICAgICAgZ2VuZGVyczpbXCLmnKrnn6VcIiwgXCLnlLdcIiwgXCLlpbNcIiwgXCLlhbbku5ZcIl0sXG4gICAgICAgIGxpY0ltZ1VSTDogJycsXG4gICAgICAgIGxpY05vOiAnJyxcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIHN0YXRlOiAnVU5TVUJJTVRURUQnIGFzICdVTlNVQklNVFRFRCcgfCAnUEVORElORycgfCAnVkVSSUZJRUQnLFxuICAgIH0sXG5cbiAgICBvbkxvYWQob3B0OiBSZWNvcmQ8XCJyZWRpcmVjdFwiLCBzdHJpbmc+KXtcbiAgICAgICAgY29uc3Qgbzogcm91dGluZy5SZWdpc3Rlck9wdCA9IG9wdFxuICAgICAgICBpZihvLnJlZGlyZWN0KXtcbiAgICAgICAgICAgIHRoaXMucmVkaXJlY3RVUkwgPSBkZWNvZGVVUklDb21wb25lbnQoby5yZWRpcmVjdClcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVkaXJlY3RVUkwpXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBvblVwbG9hZExpYygpe1xuICAgICAgICAvL+S7juacrOWcsOebuOWGjOmAieaLqeWbvueJh+aIluS9v+eUqOebuOacuuaLjeeFp+OAglxuICAgICAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHJlcy50ZW1wRmlsZVBhdGhzLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAvL3NldERhdGHlsIbmlbDmja7ku47pgLvovpHlsYLlj5HpgIHoh7PmuLLmn5PlsYJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgbGljSW1nVVJMOiByZXMudGVtcEZpbGVQYXRoc1swXSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpY05vOiAnYzQ4MjAzMjkzMjMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdpY2VfbW9zcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZGVyc0luZGV4OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpcnRoRGF0ZTonMjAyMS0xMi0wMScsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgXG4gICAgfSxcbiAgICAvL+mAieaLqeaAp+WIq1xuICAgIG9uR2VuZGVyQ2hhbmdlKGU6YW55KXtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGdlbmRlcnNJbmRleDogZS5kZXRhaWwudmFsdWUsXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICAvL+mAieaLqeWHuueUn+aXpeacn1xuICAgIG9uQmlydGhEYXRlQ2hhbmdlKGU6YW55KXtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGJpcnRoRGF0ZTogZS5kZXRhaWwudmFsdWUsXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICAvL+mAkuS6pOWuoeaguFxuICAgIG9uU3VibWl0KCl7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAvL1RPRE86c3VibWl0IHRoZSBmcm9tIHRvIHNlcnZlclxuICAgICAgICAgICAgc3RhdGU6IFwiUEVORElOR1wiLFxuICAgICAgICB9KVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25saWNWZXJpZmllZCgpXG4gICAgICAgIH0sIDMwMDApO1xuICAgIH0sXG4gICAgLy/ku47mlrDpgJLkuqRcbiAgICBvblJlc3VibWl0KCl7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBzdGF0ZTogXCJVTlNVQklNVFRFRFwiLFxuICAgICAgICAgICAgbGljSW1nVVJMOiAnJyxcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIG9ubGljVmVyaWZpZWQoKXtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIHN0YXRlOiAnVkVSSUZJRUQnLFxuICAgICAgICB9KVxuICAgICAgICBpZih0aGlzLnJlZGlyZWN0VVJMKXtcbiAgICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgICAgIHVybDogdGhpcy5yZWRpcmVjdFVSTCxcbiAgICAgICAgXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxufSkiXX0=