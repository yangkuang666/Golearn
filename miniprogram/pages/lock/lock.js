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
const routing_1 = require("../../utils/routing");
const shareLocationKey = "share_location";
Page({
    data: {
        shareLocation: '',
        avatarURL: '',
    },
    onLoad(opt) {
        return __awaiter(this, void 0, void 0, function* () {
            const o = opt;
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
            success: loc => {
                console.log('starting a trips', {
                    location: {
                        latitude: loc.latitude,
                        longitude: loc.longitude,
                    },
                    avaterURL: this.data.shareLocation ? this.data.avatarURL : '',
                });
                const tripID = 'trips123';
                wx.showLoading({
                    title: "加载中",
                    mask: true,
                }),
                    setTimeout(() => {
                        wx.redirectTo({
                            url: routing_1.routing.driving({
                                trip_id: tripID
                            }),
                            complete: () => {
                                wx.hideLoading();
                            }
                        });
                    }, 3000);
            },
            fail: () => {
                wx.showToast({
                    icon: "none",
                    title: '请前往设置页授权位置信息',
                });
            },
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxpREFBNkM7QUFFN0MsTUFBTSxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQTtBQUV6QyxJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUM7UUFDRCxhQUFhLEVBQUUsRUFBRTtRQUNqQixTQUFTLEVBQUUsRUFBRTtLQUNoQjtJQUVLLE1BQU0sQ0FBQyxHQUE2Qjs7WUFDdEMsTUFBTSxDQUFDLEdBQW9CLEdBQUcsQ0FBQTtZQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDcEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLEVBQWMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFBO1lBQzlELElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1YsU0FBUyxFQUFFLFFBQVEsQ0FBQyxTQUFTO2FBQ2hDLENBQUMsQ0FBQTtRQUNOLENBQUM7S0FBQTtJQUVELGFBQWEsQ0FBQyxDQUFNO1FBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDZCxNQUFNLFFBQVEsR0FBK0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUE7UUFDOUQsTUFBTSxFQUFjLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2xELENBQUM7SUFJRCxlQUFlLENBQUMsQ0FBTTtRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQTtRQUN4QyxFQUFFLENBQUMsY0FBYyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDaEUsQ0FBQztJQUVELFdBQVc7UUFFUCxFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ1gsSUFBSSxFQUFDLE9BQU87WUFDWixPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRTtvQkFDNUIsUUFBUSxFQUFDO3dCQUNMLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTt3QkFDdEIsU0FBUyxFQUFDLEdBQUcsQ0FBQyxTQUFTO3FCQUMxQjtvQkFFRCxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFBLENBQUMsQ0FBQyxFQUFFO2lCQUMvRCxDQUFDLENBQUE7Z0JBQ0YsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFBO2dCQUV6QixFQUFFLENBQUMsV0FBVyxDQUFDO29CQUNYLEtBQUssRUFBRSxLQUFLO29CQUNaLElBQUksRUFBRSxJQUFJO2lCQUNiLENBQUM7b0JBQ0YsVUFBVSxDQUFDLEdBQUcsRUFBRTt3QkFDWixFQUFFLENBQUMsVUFBVSxDQUFDOzRCQUlWLEdBQUcsRUFBRSxpQkFBTyxDQUFDLE9BQU8sQ0FBQztnQ0FDakIsT0FBTyxFQUFFLE1BQU07NkJBQ2xCLENBQUM7NEJBQ0YsUUFBUSxFQUFFLEdBQUcsRUFBRTtnQ0FDWCxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7NEJBQ3BCLENBQUM7eUJBQ0osQ0FBQyxDQUFBO29CQUNOLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNqQixDQUFDO1lBQ0QsSUFBSSxFQUFFLEdBQUcsRUFBRTtnQkFDUCxFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNULElBQUksRUFBQyxNQUFNO29CQUNYLEtBQUssRUFBQyxjQUFjO2lCQUNyQixDQUFDLENBQUE7WUFDUixDQUFDO1NBQ0osQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUVKLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElBcHBPcHRpb24gfSBmcm9tIFwiLi4vLi4vYXBwb3B0aW9uXCJcbmltcG9ydCB7IHJvdXRpbmcgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcm91dGluZ1wiXG5cbmNvbnN0IHNoYXJlTG9jYXRpb25LZXkgPSBcInNoYXJlX2xvY2F0aW9uXCJcblxuUGFnZSh7XG4gICAgZGF0YTp7XG4gICAgICAgIHNoYXJlTG9jYXRpb246ICcnLFxuICAgICAgICBhdmF0YXJVUkw6ICcnLCAgLy/lpLTlg49cbiAgICB9LFxuICAgIFxuICAgIGFzeW5jIG9uTG9hZChvcHQ6IFJlY29yZDxcImNhcl9pZFwiLCBzdHJpbmc+KXtcbiAgICAgICAgY29uc3Qgbzogcm91dGluZy5Mb2NrT3B0ID0gb3B0XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5oKo6ZyA6KaB5byA6ZSB6L2m6L6G55qESUQ6XCIsIG8uY2FyX2lkKVxuICAgICAgICBjb25zdCB1c2VySW5mbyA9IGF3YWl0IGdldEFwcDxJQXBwT3B0aW9uPigpLmdsb2JhbERhdGEudXNlckluZm9cbiAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBhdmF0YXJVUkw6IHVzZXJJbmZvLmF2YXRhclVybCxcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgb25HZXRVc2VySW5mbyhlOiBhbnkpe1xuICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgICBjb25zdCB1c2VySW5mbzogV2VjaGF0TWluaXByb2dyYW0uVXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuICAgICAgICBnZXRBcHA8SUFwcE9wdGlvbj4oKS5yZXNvbHZlVXNlckluZm8odXNlckluZm8pXG4gICAgfSxcblxuXG5cbiAgICBvblNoYXJlTG9jYXRpb24oZTogYW55KSB7XG4gICAgICAgIHRoaXMuZGF0YS5zaGFyZUxvY2F0aW9uID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoc2hhcmVMb2NhdGlvbktleSwgdGhpcy5kYXRhLnNoYXJlTG9jYXRpb24pXG4gICAgfSxcbiAgICBcbiAgICBvblVubG9ja1RhcCgpe1xuICAgICAgICAvL+W8gOmUgeWJje+8jOiOt+WPluW9k+WJjeS9jee9ru+8jOWwhuaVsOaNruS4iuS8oOacjeWKoeWZqFxuICAgICAgICB3eC5nZXRMb2NhdGlvbih7XG4gICAgICAgICAgICB0eXBlOidnY2owMicsXG4gICAgICAgICAgICBzdWNjZXNzOiBsb2MgPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdGFydGluZyBhIHRyaXBzJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhdGl0dWRlOiBsb2MubGF0aXR1ZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9uZ2l0dWRlOmxvYy5sb25naXR1ZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBhdmF0ZXJVUkw6IHRoaXMuZGF0YS5zaGFyZUxvY2F0aW9uID8gdGhpcy5kYXRhLmF2YXRhclVSTDogJycsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyaXBJRCA9ICd0cmlwczEyMydcblxuICAgICAgICAgICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLliqDovb3kuK1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsICAgLy/kv53miqTmjInpkq5cbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6Lez6L2s6IezZHJpdmluZ++8jOW5tuWwhnRyaXBfaWTkvKDoh7Nkcml2aW5n6aG16Z2iXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXJsOiBgL3BhZ2VzL2RyaXZpbmcvZHJpdmluZz90cmlwX2lkPSR7dHJpcElEfWBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/kvb/nlKjlvLrnsbvlnotcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHJvdXRpbmcuZHJpdmluZyh7ICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJpcF9pZDogdHJpcElEXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6ICgpID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSwgMzAwMCk7ICAgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDogKCkgPT57XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgaWNvbjpcIm5vbmVcIiwgIC8v55So5LqO5Yqg6ZW/5L2N572u5pGG5pS+XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOifor7fliY3lvoDorr7nva7pobXmjojmnYPkvY3nva7kv6Hmga8nLFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBcbn0pXG5cbiJdfQ==