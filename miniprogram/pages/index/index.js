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
const prifile_1 = require("../../service/prifile");
const rental_pb_1 = require("../../service/proto_gen/rental/rental_pb");
const trip_1 = require("../../service/trip");
const routing_1 = require("../../utils/routing");
Page({
    isPageShowing: false,
    data: {
        avatarURL: '',
        setting: {
            skew: 0,
            rotate: 0,
            showLocation: true,
            showScale: true,
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
        location: {
            latitude: 31.756825521115363,
            longitude: 120.37222114786053,
        },
        scale: 10,
        markers: [
            {
                iconPath: "/resources/car.png",
                id: 0,
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
    onLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            const userInfo = yield getApp().globalData.userInfo;
            this.setData({
                avatarURL: userInfo.avatarUrl,
            });
        });
    },
    onMylocationTap() {
        wx.getLocation({
            type: 'gcj02',
            success: res => {
                this.setData({
                    location: {
                        latitude: res.latitude,
                        longitude: res.longitude,
                    },
                });
            },
            fail: () => {
                wx.showToast({
                    icon: "none",
                    title: '请前往设置页面授权'
                });
            }
        });
    },
    onScanClicked() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const trips = yield trip_1.TripService.getTrips(rental_pb_1.rental.v1.TripStatus.IN_PROGRESS);
            if ((((_a = trips.trips) === null || _a === void 0 ? void 0 : _a.length) || 0) > 0) {
                wx.showModal({
                    title: '行程提示',
                    content: '您有一个正在进行的行程',
                    success(res) {
                        if (res.confirm) {
                            console.log('用户点击确定');
                            wx.navigateTo({
                                url: routing_1.routing.driving({
                                    trip_id: trips.trips[0].id,
                                }),
                            });
                            return;
                        }
                        else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                        return;
                    }
                });
            }
            else {
                const carID = "梅赛德斯_奔驰AMG_苏B_0000";
                const redirectURL = routing_1.routing.Lock({ car_id: carID });
                const profil = yield prifile_1.ProfileService.getProfile();
                if (profil.identityStatus === rental_pb_1.rental.v1.IdentityStatus.VERIFIED) {
                    wx.showModal({
                        title: '认证提示',
                        content: '您的身份已认证',
                        success(res) {
                            if (res.confirm) {
                                console.log('用户点击确定');
                                wx.navigateTo({
                                    url: redirectURL,
                                });
                                return;
                            }
                            else if (res.cancel) {
                                console.log('用户点击取消');
                            }
                            return;
                        }
                    });
                }
                else {
                    wx.scanCode({
                        success: () => __awaiter(this, void 0, void 0, function* () {
                            const carID = "梅赛德斯_奔驰AMG_苏B_0000";
                            const redirectURL = routing_1.routing.Lock({ car_id: carID });
                            wx.navigateTo({
                                url: routing_1.routing.register({ redirectURL: redirectURL })
                            });
                        }),
                        fail: console.error,
                    });
                }
            }
        });
    },
    onShow() {
        this.isPageShowing = true;
    },
    onHide() {
        this.isPageShowing = false;
    },
    onMyTripsTap() {
        wx.navigateTo({
            url: routing_1.routing.mytrips(),
        });
    },
    moveCars() {
        const map = wx.createMapContext("map");
        const dest = {
            latitude: 23,
            longitude: 113,
        };
        const moveCars = () => {
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
                    animationEnd: () => {
                        if (this.isPageShowing) {
                            moveCars();
                        }
                    }
                });
        };
        moveCars();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLG1EQUFzRDtBQUN0RCx3RUFBaUU7QUFDakUsNkNBQWdEO0FBQ2hELGlEQUE2QztBQUU3QyxJQUFJLENBQUM7SUFDSCxhQUFhLEVBQUMsS0FBSztJQUNuQixJQUFJLEVBQUU7UUFDSixTQUFTLEVBQUUsRUFBRTtRQUNkLE9BQU8sRUFBRTtZQUNSLElBQUksRUFBRSxDQUFDO1lBQ1AsTUFBTSxFQUFFLENBQUM7WUFDVCxZQUFZLEVBQUUsSUFBSTtZQUNsQixTQUFTLEVBQUUsSUFBSTtZQUNmLE1BQU0sRUFBRSxFQUFFO1lBQ1YsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUNkLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFlBQVksRUFBRSxLQUFLO1lBQ25CLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsaUJBQWlCLEVBQUUsS0FBSztZQUN4QixlQUFlLEVBQUUsS0FBSztZQUN0QixhQUFhLEVBQUUsS0FBSztTQUNyQjtRQUVELFFBQVEsRUFBRTtZQUNSLFFBQVEsRUFBQyxrQkFBa0I7WUFDM0IsU0FBUyxFQUFFLGtCQUFrQjtTQUM5QjtRQUVELEtBQUssRUFBRSxFQUFFO1FBRVQsT0FBTyxFQUFDO1lBQ047Z0JBQ0EsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsRUFBRSxFQUFDLENBQUM7Z0JBQ0osUUFBUSxFQUFFLEVBQUU7Z0JBQ1osU0FBUyxFQUFFLEdBQUc7Z0JBQ2QsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsTUFBTSxFQUFFLEVBQUU7YUFDWDtZQUNEO2dCQUNFLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLEVBQUUsRUFBRSxDQUFDO2dCQUNMLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixTQUFTLEVBQUUsT0FBTztnQkFDbEIsS0FBSyxFQUFFLEVBQUU7Z0JB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RSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3RDLE1BQU0sSUFBSSxHQUFHO1lBQ1gsUUFBUSxFQUFFLEVBQUU7WUFDWixTQUFTLEVBQUUsR0FBRztTQUNmLENBQUE7UUFDSCxNQUFNLFFBQVEsR0FBRyxHQUFHLEVBQUU7WUFFbkIsSUFBSSxDQUFDLFFBQVEsSUFBSSxHQUFHO2dCQUNwQixJQUFJLENBQUMsU0FBUyxJQUFJLEdBQUc7Z0JBQ3RCLEdBQUcsQ0FBQyxlQUFlLENBQUM7b0JBQ2xCLFdBQVcsRUFBRTt3QkFDWCxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7d0JBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztxQkFDMUI7b0JBQ0QsUUFBUSxFQUFFLENBQUM7b0JBQ1gsVUFBVSxFQUFFLEtBQUs7b0JBQ2pCLE1BQU0sRUFBRSxDQUFDO29CQUNULFFBQVEsRUFBRSxLQUFLO29CQUNmLFlBQVksRUFBQyxHQUFHLEVBQUU7d0JBQ2hCLElBQUcsSUFBSSxDQUFDLGFBQWEsRUFBQzs0QkFDcEIsUUFBUSxFQUFFLENBQUE7eUJBQ2I7b0JBQ0YsQ0FBQztpQkFDRCxDQUFDLENBQUE7UUFDSixDQUFDLENBQUE7UUFDRCxRQUFRLEVBQUUsQ0FBQTtJQUNWLENBQUM7Q0FDQSxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IElBcHBPcHRpb24gfSBmcm9tIFwiLi4vLi4vYXBwb3B0aW9uXCJcbmltcG9ydCB7IFByb2ZpbGVTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvcHJpZmlsZVwiXG5pbXBvcnQgeyByZW50YWwgfSBmcm9tIFwiLi4vLi4vc2VydmljZS9wcm90b19nZW4vcmVudGFsL3JlbnRhbF9wYlwiXG5pbXBvcnQgeyBUcmlwU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL3RyaXBcIlxuaW1wb3J0IHsgcm91dGluZyB9IGZyb20gXCIuLi8uLi91dGlscy9yb3V0aW5nXCJcblxuUGFnZSh7XG4gIGlzUGFnZVNob3dpbmc6ZmFsc2UsXG4gIGRhdGE6IHtcbiAgICBhdmF0YXJVUkw6ICcnLFxuICAgc2V0dGluZzoge1xuICAgIHNrZXc6IDAsICBcbiAgICByb3RhdGU6IDAsXG4gICAgc2hvd0xvY2F0aW9uOiB0cnVlLCAgIC8v5bGV56S65L2N572uXG4gICAgc2hvd1NjYWxlOiB0cnVlLCAgIC8v5bGV56S65q+U5L6L5bC6XG4gICAgc3ViS2V5OiAnJyxcbiAgICBsYXllclN0eWxlOiAtMSxcbiAgICBlbmFibGVab29tOiB0cnVlLFxuICAgIGVuYWJsZVNjcm9sbDogdHJ1ZSxcbiAgICBlbmFibGVSb3RhdGU6IGZhbHNlLFxuICAgIHNob3dDb21wYXNzOiBmYWxzZSxcbiAgICBlbmFibGUzRDogZmFsc2UsXG4gICAgZW5hYmxlT3Zlcmxvb2tpbmc6IGZhbHNlLFxuICAgIGVuYWJsZVNhdGVsbGl0ZTogZmFsc2UsXG4gICAgZW5hYmxlVHJhZmZpYzogZmFsc2UsXG4gIH0sXG5cbiAgbG9jYXRpb246IHsgICAvL+W9k+WJjeS9jee9rlxuICAgIGxhdGl0dWRlOjMxLjc1NjgyNTUyMTExNTM2MyxcbiAgICBsb25naXR1ZGU6IDEyMC4zNzIyMjExNDc4NjA1MyxcbiAgfSxcblxuICBzY2FsZTogMTAsICAgLy/lvZPliY3mr5TkvovlsLpcbiAgLy/lsI/ovabkvY3nva5cbiAgbWFya2VyczpbXG4gICAge1xuICAgIGljb25QYXRoOiBcIi9yZXNvdXJjZXMvY2FyLnBuZ1wiLFxuICAgIGlkOjAsXG4gICAgbGF0aXR1ZGU6IDIzLFxuICAgIGxvbmdpdHVkZTogMTEzLFxuICAgIHdpZHRoOiAxNSxcbiAgICBoZWlnaHQ6IDIwLFxuICB9LFxuICB7XG4gICAgaWNvblBhdGg6IFwiL3Jlc291cmNlcy9jYXIucG5nXCIsXG4gICAgaWQ6IDEsXG4gICAgbGF0aXR1ZGU6IDIzLjAwMzIsXG4gICAgbG9uZ2l0dWRlOiAxMTMuMDA1LFxuICAgIHdpZHRoOiAxNSxcbiAgICBoZWlnaHQ6IDIwLFxuICB9LFxuICB7XG4gICAgaWNvblBhdGg6IFwiL3Jlc291cmNlcy9jYXIucG5nXCIsXG4gICAgaWQ6IDIsXG4gICAgbGF0aXR1ZGU6IDI5Ljc1NjgyNTUyMTExNTM2MyxcbiAgICBsb25naXR1ZGU6IDEyMS44NzIyMjExNDc4NjA1MyxcbiAgICB3aWR0aDogMjAsXG4gICAgaGVpZ2h0OiAzMCxcbiAgfSxcbiAge1xuICAgIGljb25QYXRoOiBcIi9yZXNvdXJjZXMvY2FyLnBuZ1wiLFxuICAgIGlkOiAzLFxuICAgIGxhdGl0dWRlOiAyOS43NTY4MjU1MjExMTUzNjMsXG4gICAgbG9uZ2l0dWRlOiAxMjEuODcyMjIyMTQ3ODYwNTMsXG4gICAgd2lkdGg6IDE1LFxuICAgIGhlaWdodDogMjAsXG4gIH0sXG4gXVxufSxcblxuXG5hc3luYyBvbkxvYWQoKSB7XG4gIGNvbnN0IHVzZXJJbmZvID0gYXdhaXQgZ2V0QXBwPElBcHBPcHRpb24+KCkuZ2xvYmFsRGF0YS51c2VySW5mb1xuICB0aGlzLnNldERhdGEoe1xuICAgIGF2YXRhclVSTDogdXNlckluZm8uYXZhdGFyVXJsLFxuICB9KVxufSxcblxuLy/ojrflj5bliJ3lp4vkvY3nva4v5b2T5YmN5L2N572uXG5vbk15bG9jYXRpb25UYXAoKXtcbiAgd3guZ2V0TG9jYXRpb24oe1xuICAgIHR5cGU6ICdnY2owMicsXG4gICAgc3VjY2VzczogcmVzID0+e1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgLy9sb2NhdGlvbuS4uuS4gOS4quWvueixoeexu+Wei++8jOWcqFxuICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgIGxhdGl0dWRlOiByZXMubGF0aXR1ZGUsXG4gICAgICAgICAgbG9uZ2l0dWRlOiByZXMubG9uZ2l0dWRlLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICB9LFxuICAgIGZhaWw6ICgpID0+e1xuICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgaWNvbjpcIm5vbmVcIiwgIC8v55So5LqO5Yqg6ZW/5L2N572u5pGG5pS+XG4gICAgICAgIHRpdGxlOifor7fliY3lvoDorr7nva7pobXpnaLmjojmnYMnXG4gICAgICB9KVxuICAgIH1cbiAgfSlcbn0sXG4vL+aJq+aPj+eCueWHu1xuYXN5bmMgb25TY2FuQ2xpY2tlZCgpe1xuICBjb25zdCB0cmlwcyA9IGF3YWl0IFRyaXBTZXJ2aWNlLmdldFRyaXBzKHJlbnRhbC52MS5UcmlwU3RhdHVzLklOX1BST0dSRVNTKVxuICBpZiAoKHRyaXBzLnRyaXBzPy5sZW5ndGggIHx8IDApID4gMCl7XG4gICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICB0aXRsZTogJ+ihjOeoi+aPkOekuicsXG4gICAgICBjb250ZW50OiAn5oKo5pyJ5LiA5Liq5q2j5Zyo6L+b6KGM55qE6KGM56iLJyxcbiAgICAgIHN1Y2Nlc3MgKHJlcykge1xuICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye756Gu5a6aJylcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogcm91dGluZy5kcml2aW5nKHtcbiAgICAgICAgICAgICAgdHJpcF9pZDogdHJpcHMudHJpcHMhWzBdLmlkISxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKVxuICAgICAgICB9XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH0pXG5cbiAgfWVsc2V7XG4gICAgY29uc3QgY2FySUQgPSBcIuaihei1m+W+t+aWr1/lpZTpqbBBTUdf6IuPQl8wMDAwXCIgIC8v5qih5ouf5ZCO56uvSURcbiAgICBjb25zdCByZWRpcmVjdFVSTCA9IHJvdXRpbmcuTG9jayh7Y2FyX2lkOiBjYXJJRH0pICAvL+exu+Wei+W8uuWMluabv+S7o++8mmAvcGFnZXMvbG9jay9sb2NrP2Nhcl9pZD0ke2NhcklEfWAgXG4gICAgY29uc3QgcHJvZmlsID0gYXdhaXQgUHJvZmlsZVNlcnZpY2UuZ2V0UHJvZmlsZSgpXG5cbiAgICBpZiAocHJvZmlsLmlkZW50aXR5U3RhdHVzID09PSByZW50YWwudjEuSWRlbnRpdHlTdGF0dXMuVkVSSUZJRUQpe1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICforqTor4Hmj5DnpLonLFxuICAgICAgICBjb250ZW50OiAn5oKo55qE6Lqr5Lu95bey6K6k6K+BJyxcbiAgICAgICAgc3VjY2VzcyAocmVzKSB7XG4gICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye756Gu5a6aJylcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgdXJsOiByZWRpcmVjdFVSTCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgLy/kv53nlZnlvZPliY3pobXpnaLvvIzot7PovazliLDlupTnlKjlhoXnmoRyZWdpc3RlcumhtemdouOAguS9huaYr+S4jeiDvei3s+WIsCB0YWJiYXIg6aG16Z2iXG4gICAgICB3eC5zY2FuQ29kZSh7XG4gICAgICAgIHN1Y2Nlc3M6IGFzeW5jICgpID0+e1xuICAgICAgICAgIFxuICAgICAgICAgIGNvbnN0IGNhcklEID0gXCLmooXotZvlvrfmlq9f5aWU6amwQU1HX+iLj0JfMDAwMFwiICAvL+aooeaLn+WQjuerr0lEXG4gICAgICAgICAgY29uc3QgcmVkaXJlY3RVUkwgPSByb3V0aW5nLkxvY2soe2Nhcl9pZDogY2FySUR9KSAgLy/nsbvlnovlvLrljJbmm7/ku6PvvJpgL3BhZ2VzL2xvY2svbG9jaz9jYXJfaWQ9JHtjYXJJRH1gIFxuICAgICAgICAgIFxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgLy/ot7Povazoh7Nsb2Nr6aG16Z2i5YmN5ZCR6Lez6L2s6IezcmVnaXN0ZXLpobXpnaLvvIzlubblsIZjYXJJROaUvuWcqHJlZGlyZWN0VVJM5Lit5Lyg6IezcmVnaXN0ZXLpobXpnaJcbiAgICAgICAgICAgIC8v5pyA5ZCO5bCGY2FySUTkvKDoh7Nsb2Nr6aG16Z2iXG4gICAgICAgICAgICB1cmw6IHJvdXRpbmcucmVnaXN0ZXIoe3JlZGlyZWN0VVJMOnJlZGlyZWN0VVJMfSkgICAvLyDnsbvlnovlvLrljJbmm7/ku6PvvJpgL3BhZ2VzL3JlZ2lzdGVyL3JlZ2lzdGVyP3JlZGlyZWN0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHJlZGlyZWN0VVJMKX1gIFxuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6Y29uc29sZS5lcnJvcixcbiAgICAgIH0pXG4gICAgLy8gfVxuICB9XG59XG59LFxuXG5cbm9uU2hvdygpe1xuICB0aGlzLmlzUGFnZVNob3dpbmcgPSB0cnVlO1xufSxcblxub25IaWRlKCl7XG4gIHRoaXMuaXNQYWdlU2hvd2luZyA9IGZhbHNlO1xuXG59LFxuXG5vbk15VHJpcHNUYXAoKXtcbiAgd3gubmF2aWdhdGVUbyh7XG4gICAgdXJsOiByb3V0aW5nLm15dHJpcHMoKSxcbiAgfSlcbn0sXG5cbm1vdmVDYXJzKCl7XG4gIC8v5Y+v6YCa6L+HIHd4LmNyZWF0ZU1hcENvbnRleHQg6I635Y+W44CCXG4gIC8vTWFwQ29udGV4dCDpgJrov4cgaWQg6Lef5LiA5LiqIG1hcCDnu4Tku7bnu5HlrprvvIzmk43kvZzlr7nlupTnmoQgbWFwIOe7hOS7tuOAglxuICBjb25zdCBtYXAgPSB3eC5jcmVhdGVNYXBDb250ZXh0KFwibWFwXCIpXG4gIGNvbnN0IGRlc3QgPSB7XG4gICAgbGF0aXR1ZGU6IDIzLFxuICAgIGxvbmdpdHVkZTogMTEzLFxuICB9XG5jb25zdCBtb3ZlQ2FycyA9ICgpID0+e1xuICAvL+W5s+enu21hcmtlcu+8jOW4puWKqOeUu+OAglxuICAgZGVzdC5sYXRpdHVkZSArPSAwLjUsXG4gICBkZXN0LmxvbmdpdHVkZSArPSAwLjUsXG4gIG1hcC50cmFuc2xhdGVNYXJrZXIoe1xuICAgIGRlc3RpbmF0aW9uOiB7XG4gICAgICBsYXRpdHVkZTogZGVzdC5sYXRpdHVkZSxcbiAgICAgIGxvbmdpdHVkZTogZGVzdC5sb25naXR1ZGUsXG4gICAgfSxcbiAgICBtYXJrZXJJZDogMCxcbiAgICBhdXRvUm90YXRlOiBmYWxzZSxcbiAgICByb3RhdGU6IDAsXG4gICAgZHVyYXRpb246IDUwMDAwLFxuICAgIGFuaW1hdGlvbkVuZDooKSA9PntcbiAgICAgIGlmKHRoaXMuaXNQYWdlU2hvd2luZyl7XG4gICAgICAgIG1vdmVDYXJzKClcbiAgICB9XG4gICB9XG4gIH0pXG59XG5tb3ZlQ2FycygpXG59XG59KVxuXG4iXX0=