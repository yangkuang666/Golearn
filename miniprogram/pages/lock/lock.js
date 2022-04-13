"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const trip_1 = require("../../service/trip");
const routing_1 = require("../../utils/routing");
const shareLocationKey = "share_location";
Page({
    carID: "",
    data: {
        shareLocation: '',
        avatarURL: '',
    },
    onLoad(opt) {
        return __awaiter(this, void 0, void 0, function* () {
            const o = opt;
            this.carID = o.car_id;
            console.log("您需要开锁车辆的ID:", o.car_id);
            const userInfo = yield getApp().globalData.userInfo;
            this.setData({
                avatarURL: userInfo.avatarUrl,
            });
        });
    },
    onGetUserInfo(e) {
        console.log(e);
        const userInfo = e.detail.userInfo;
        getApp().resolveUserInfo(userInfo);
    },
    onShareLocation(e) {
        this.data.shareLocation = e.detail.value;
        wx.setStorageSync(shareLocationKey, this.data.shareLocation);
    },
    onUnlockTap() {
        wx.getLocation({
            type: 'gcj02',
            success: (loc) => __awaiter(this, void 0, void 0, function* () {
                console.log('starting a trips', {
                    location: {
                        latitude: loc.latitude,
                        longitude: loc.longitude,
                    },
                    avaterURL: this.data.shareLocation ? this.data.avatarURL : '',
                });
                if (!this.carID) {
                    console.error("没有carID");
                    return;
                }
                let trip;
                try {
                    trip = yield trip_1.TripService.createTrip({
                        start: loc,
                        carId: this.carID,
                    });
                    if (!trip.id) {
                        console.error("没有返回tripID:", trip);
                        return;
                    }
                }
                catch (err) {
                    wx.showToast({
                        title: "创建行程失败",
                        icon: "none"
                    });
                    return;
                }
                wx.showLoading({
                    title: "加载中",
                    mask: true,
                }),
                    setTimeout(() => {
                        wx.redirectTo({
                            url: routing_1.routing.driving({
                                trip_id: trip.id,
                            }),
                            complete: () => {
                                wx.hideLoading();
                            }
                        });
                    }, 3000);
            }),
            fail: () => {
                wx.showToast({
                    icon: "none",
                    title: '请前往设置页授权位置信息',
                });
            },
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSw2Q0FBZ0Q7QUFFaEQsaURBQTZDO0FBRTdDLE1BQU0sZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUE7QUFFekMsSUFBSSxDQUFDO0lBQ0QsS0FBSyxFQUFFLEVBQUU7SUFDVCxJQUFJLEVBQUM7UUFDRCxhQUFhLEVBQUUsRUFBRTtRQUNqQixTQUFTLEVBQUUsRUFBRTtLQUNoQjtJQUVLLE1BQU0sQ0FBQyxHQUE2Qjs7WUFDdEMsTUFBTSxDQUFDLEdBQW9CLEdBQUcsQ0FBQTtZQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUE7WUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3BDLE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTSxFQUFjLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQTtZQUM5RCxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNWLFNBQVMsRUFBRSxRQUFRLENBQUMsU0FBUzthQUNoQyxDQUFDLENBQUE7UUFDTixDQUFDO0tBQUE7SUFFRCxhQUFhLENBQUMsQ0FBTTtRQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2QsTUFBTSxRQUFRLEdBQStCLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFBO1FBQzlELE1BQU0sRUFBYyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNsRCxDQUFDO0lBSUQsZUFBZSxDQUFDLENBQU07UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUE7UUFDeEMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQ2hFLENBQUM7SUFFRCxXQUFXO1FBRVAsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUNYLElBQUksRUFBQyxPQUFPO1lBQ1osT0FBTyxFQUFFLENBQU0sR0FBRyxFQUFDLEVBQUU7Z0JBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRTtvQkFDNUIsUUFBUSxFQUFDO3dCQUNMLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTt3QkFDdEIsU0FBUyxFQUFDLEdBQUcsQ0FBQyxTQUFTO3FCQUMxQjtvQkFFRCxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFBLENBQUMsQ0FBQyxFQUFFO2lCQUMvRCxDQUFDLENBQUE7Z0JBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQTtvQkFDeEIsT0FBTTtpQkFDVDtnQkFFRCxJQUFJLElBQTJCLENBQUE7Z0JBQy9CLElBQUc7b0JBQ0UsSUFBSSxHQUFHLE1BQU0sa0JBQVcsQ0FBQyxVQUFVLENBQUM7d0JBQ2pDLEtBQUssRUFBRSxHQUFHO3dCQUNWLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztxQkFDcEIsQ0FBQyxDQUFBO29CQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFDO3dCQUNULE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFBO3dCQUNsQyxPQUFNO3FCQUNUO2lCQUNKO2dCQUFBLE9BQU0sR0FBRyxFQUFFO29CQUNSLEVBQUUsQ0FBQyxTQUFTLENBQUM7d0JBQ1QsS0FBSyxFQUFFLFFBQVE7d0JBQ2YsSUFBSSxFQUFFLE1BQU07cUJBQ2YsQ0FBQyxDQUFBO29CQUNGLE9BQU07aUJBQ1Q7Z0JBRUQsRUFBRSxDQUFDLFdBQVcsQ0FBQztvQkFDWCxLQUFLLEVBQUUsS0FBSztvQkFDWixJQUFJLEVBQUUsSUFBSTtpQkFDYixDQUFDO29CQUNGLFVBQVUsQ0FBQyxHQUFHLEVBQUU7d0JBQ1osRUFBRSxDQUFDLFVBQVUsQ0FBQzs0QkFJVixHQUFHLEVBQUUsaUJBQU8sQ0FBQyxPQUFPLENBQUM7Z0NBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRzs2QkFDcEIsQ0FBQzs0QkFDRixRQUFRLEVBQUUsR0FBRyxFQUFFO2dDQUNYLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTs0QkFDcEIsQ0FBQzt5QkFDSixDQUFDLENBQUE7b0JBQ04sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2pCLENBQUMsQ0FBQTtZQUNELElBQUksRUFBRSxHQUFHLEVBQUU7Z0JBQ1AsRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDVCxJQUFJLEVBQUMsTUFBTTtvQkFDWCxLQUFLLEVBQUMsY0FBYztpQkFDckIsQ0FBQyxDQUFBO1lBQ1IsQ0FBQztTQUNKLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FFSixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQXBwT3B0aW9uIH0gZnJvbSBcIi4uLy4uL2FwcG9wdGlvblwiXG5pbXBvcnQgeyByZW50YWwgfSBmcm9tIFwiLi4vLi4vc2VydmljZS9wcm90b19nZW4vcmVudGFsL3JlbnRhbF9wYlwiXG5pbXBvcnQgeyBUcmlwU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL3RyaXBcIlxuLy9pbXBvcnQgeyBUcmlwU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL3RyaXBcIlxuaW1wb3J0IHsgcm91dGluZyB9IGZyb20gXCIuLi8uLi91dGlscy9yb3V0aW5nXCJcblxuY29uc3Qgc2hhcmVMb2NhdGlvbktleSA9IFwic2hhcmVfbG9jYXRpb25cIlxuXG5QYWdlKHtcbiAgICBjYXJJRDogXCJcIixcbiAgICBkYXRhOntcbiAgICAgICAgc2hhcmVMb2NhdGlvbjogJycsXG4gICAgICAgIGF2YXRhclVSTDogJycsICAvL+WktOWDj1xuICAgIH0sXG4gICAgXG4gICAgYXN5bmMgb25Mb2FkKG9wdDogUmVjb3JkPFwiY2FyX2lkXCIsIHN0cmluZz4pe1xuICAgICAgICBjb25zdCBvOiByb3V0aW5nLkxvY2tPcHQgPSBvcHRcbiAgICAgICAgdGhpcy5jYXJJRCA9IG8uY2FyX2lkXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5oKo6ZyA6KaB5byA6ZSB6L2m6L6G55qESUQ6XCIsIG8uY2FyX2lkKVxuICAgICAgICBjb25zdCB1c2VySW5mbyA9IGF3YWl0IGdldEFwcDxJQXBwT3B0aW9uPigpLmdsb2JhbERhdGEudXNlckluZm9cbiAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBhdmF0YXJVUkw6IHVzZXJJbmZvLmF2YXRhclVybCxcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgb25HZXRVc2VySW5mbyhlOiBhbnkpe1xuICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgICBjb25zdCB1c2VySW5mbzogV2VjaGF0TWluaXByb2dyYW0uVXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuICAgICAgICBnZXRBcHA8SUFwcE9wdGlvbj4oKS5yZXNvbHZlVXNlckluZm8odXNlckluZm8pXG4gICAgfSxcblxuXG5cbiAgICBvblNoYXJlTG9jYXRpb24oZTogYW55KSB7XG4gICAgICAgIHRoaXMuZGF0YS5zaGFyZUxvY2F0aW9uID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoc2hhcmVMb2NhdGlvbktleSwgdGhpcy5kYXRhLnNoYXJlTG9jYXRpb24pXG4gICAgfSxcbiAgICBcbiAgICBvblVubG9ja1RhcCgpe1xuICAgICAgICAvL+W8gOmUgeWJje+8jOiOt+WPluW9k+WJjeS9jee9ru+8jOWwhuaVsOaNruS4iuS8oOacjeWKoeWZqFxuICAgICAgICB3eC5nZXRMb2NhdGlvbih7XG4gICAgICAgICAgICB0eXBlOidnY2owMicsXG4gICAgICAgICAgICBzdWNjZXNzOiBhc3luYyBsb2MgPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdGFydGluZyBhIHRyaXBzJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhdGl0dWRlOiBsb2MubGF0aXR1ZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9uZ2l0dWRlOmxvYy5sb25naXR1ZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBhdmF0ZXJVUkw6IHRoaXMuZGF0YS5zaGFyZUxvY2F0aW9uID8gdGhpcy5kYXRhLmF2YXRhclVSTDogJycsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jYXJJRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuayoeaciWNhcklEXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRyaXA6IHJlbnRhbC52MS5JVHJpcEVudGl0eVxuICAgICAgICAgICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgdHJpcCA9IGF3YWl0IFRyaXBTZXJ2aWNlLmNyZWF0ZVRyaXAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBsb2MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FySWQ6IHRoaXMuY2FySUQsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0cmlwLmlkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5rKh5pyJ6L+U5ZuedHJpcElEOlwiLCB0cmlwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9Y2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIuWIm+W7uuihjOeoi+Wksei0pVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwibm9uZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIuWKoOi9veS4rVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZSwgICAvL+S/neaKpOaMiemSrlxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/ot7Povazoh7Nkcml2aW5n77yM5bm25bCGdHJpcF9pZOS8oOiHs2RyaXZpbmfpobXpnaJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy91cmw6IGAvcGFnZXMvZHJpdmluZy9kcml2aW5nP3RyaXBfaWQ9JHt0cmlwSUR9YFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+S9v+eUqOW8uuexu+Wei1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogcm91dGluZy5kcml2aW5nKHsgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmlwX2lkOiB0cmlwLmlkISxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogKCkgPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9LCAzMDAwKTsgICBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsOiAoKSA9PntcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICBpY29uOlwibm9uZVwiLCAgLy/nlKjkuo7liqDplb/kvY3nva7mkYbmlL5cbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6J+ivt+WJjeW+gOiuvue9rumhteaOiOadg+S9jee9ruS/oeaBrycsXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIFxufSlcblxuIl19