"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routing_1 = require("../../utils/routing");
Page({
    isPageShowing: false,
    data: {
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
        wx.scanCode({
            success: () => {
                const carID = 'car01';
                const redirectURL = routing_1.routing.Lock({ car_id: carID });
                wx.navigateTo({
                    url: routing_1.routing.register({ redirectURL: redirectURL })
                });
            },
            fail: console.error,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUE2QztBQUU3QyxJQUFJLENBQUM7SUFDSCxhQUFhLEVBQUMsS0FBSztJQUNuQixJQUFJLEVBQUU7UUFDTCxPQUFPLEVBQUU7WUFDUixJQUFJLEVBQUUsQ0FBQztZQUNQLE1BQU0sRUFBRSxDQUFDO1lBQ1QsWUFBWSxFQUFFLElBQUk7WUFDbEIsU0FBUyxFQUFFLElBQUk7WUFDZixNQUFNLEVBQUUsRUFBRTtZQUNWLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDZCxVQUFVLEVBQUUsSUFBSTtZQUNoQixZQUFZLEVBQUUsSUFBSTtZQUNsQixZQUFZLEVBQUUsS0FBSztZQUNuQixXQUFXLEVBQUUsS0FBSztZQUNsQixRQUFRLEVBQUUsS0FBSztZQUNmLGlCQUFpQixFQUFFLEtBQUs7WUFDeEIsZUFBZSxFQUFFLEtBQUs7WUFDdEIsYUFBYSxFQUFFLEtBQUs7U0FDckI7UUFFRCxRQUFRLEVBQUU7WUFDUixRQUFRLEVBQUMsa0JBQWtCO1lBQzNCLFNBQVMsRUFBRSxrQkFBa0I7U0FDOUI7UUFFRCxLQUFLLEVBQUUsRUFBRTtRQUVULE9BQU8sRUFBQztZQUNOO2dCQUNBLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLEVBQUUsRUFBQyxDQUFDO2dCQUNKLFFBQVEsRUFBRSxFQUFFO2dCQUNaLFNBQVMsRUFBRSxHQUFHO2dCQUNkLEtBQUssRUFBRSxFQUFFO2dCQUNULE1BQU0sRUFBRSxFQUFFO2FBQ1g7WUFDRDtnQkFDRSxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixFQUFFLEVBQUUsQ0FBQztnQkFDTCxRQUFRLEVBQUUsT0FBTztnQkFDakIsU0FBUyxFQUFFLE9BQU87Z0JBQ2xCLEtBQUssRUFBRSxFQUFFO2dCQUNULE1BQU0sRUFBRSxFQUFFO2FBQ1g7WUFDRDtnQkFDRSxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixFQUFFLEVBQUUs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ImltcG9ydCB7IHJvdXRpbmcgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcm91dGluZ1wiXG5cblBhZ2Uoe1xuICBpc1BhZ2VTaG93aW5nOmZhbHNlLFxuICBkYXRhOiB7XG4gICBzZXR0aW5nOiB7XG4gICAgc2tldzogMCwgIFxuICAgIHJvdGF0ZTogMCxcbiAgICBzaG93TG9jYXRpb246IHRydWUsICAgLy/lsZXnpLrkvY3nva5cbiAgICBzaG93U2NhbGU6IHRydWUsICAgLy/lsZXnpLrmr5TkvovlsLpcbiAgICBzdWJLZXk6ICcnLFxuICAgIGxheWVyU3R5bGU6IC0xLFxuICAgIGVuYWJsZVpvb206IHRydWUsXG4gICAgZW5hYmxlU2Nyb2xsOiB0cnVlLFxuICAgIGVuYWJsZVJvdGF0ZTogZmFsc2UsXG4gICAgc2hvd0NvbXBhc3M6IGZhbHNlLFxuICAgIGVuYWJsZTNEOiBmYWxzZSxcbiAgICBlbmFibGVPdmVybG9va2luZzogZmFsc2UsXG4gICAgZW5hYmxlU2F0ZWxsaXRlOiBmYWxzZSxcbiAgICBlbmFibGVUcmFmZmljOiBmYWxzZSxcbiAgfSxcblxuICBsb2NhdGlvbjogeyAgIC8v5b2T5YmN5L2N572uXG4gICAgbGF0aXR1ZGU6MzEuNzU2ODI1NTIxMTE1MzYzLFxuICAgIGxvbmdpdHVkZTogMTIwLjM3MjIyMTE0Nzg2MDUzLFxuICB9LFxuXG4gIHNjYWxlOiAxMCwgICAvL+W9k+WJjeavlOS+i+WwulxuICAvL+Wwj+i9puS9jee9rlxuICBtYXJrZXJzOltcbiAgICB7XG4gICAgaWNvblBhdGg6IFwiL3Jlc291cmNlcy9jYXIucG5nXCIsXG4gICAgaWQ6MCxcbiAgICBsYXRpdHVkZTogMjMsXG4gICAgbG9uZ2l0dWRlOiAxMTMsXG4gICAgd2lkdGg6IDE1LFxuICAgIGhlaWdodDogMjAsXG4gIH0sXG4gIHtcbiAgICBpY29uUGF0aDogXCIvcmVzb3VyY2VzL2Nhci5wbmdcIixcbiAgICBpZDogMSxcbiAgICBsYXRpdHVkZTogMjMuMDAzMixcbiAgICBsb25naXR1ZGU6IDExMy4wMDUsXG4gICAgd2lkdGg6IDE1LFxuICAgIGhlaWdodDogMjAsXG4gIH0sXG4gIHtcbiAgICBpY29uUGF0aDogXCIvcmVzb3VyY2VzL2Nhci5wbmdcIixcbiAgICBpZDogMixcbiAgICBsYXRpdHVkZTogMjkuNzU2ODI1NTIxMTE1MzYzLFxuICAgIGxvbmdpdHVkZTogMTIxLjg3MjIyMTE0Nzg2MDUzLFxuICAgIHdpZHRoOiAyMCxcbiAgICBoZWlnaHQ6IDMwLFxuICB9LFxuICB7XG4gICAgaWNvblBhdGg6IFwiL3Jlc291cmNlcy9jYXIucG5nXCIsXG4gICAgaWQ6IDMsXG4gICAgbGF0aXR1ZGU6IDI5Ljc1NjgyNTUyMTExNTM2MyxcbiAgICBsb25naXR1ZGU6IDEyMS44NzIyMjIxNDc4NjA1MyxcbiAgICB3aWR0aDogMTUsXG4gICAgaGVpZ2h0OiAyMCxcbiAgfSxcbiBdXG59LFxuXG4vL+iOt+WPluWIneWni+S9jee9ri/lvZPliY3kvY3nva5cbm9uTXlsb2NhdGlvblRhcCgpe1xuICB3eC5nZXRMb2NhdGlvbih7XG4gICAgdHlwZTogJ2djajAyJyxcbiAgICBzdWNjZXNzOiByZXMgPT57XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAvL2xvY2F0aW9u5Li65LiA5Liq5a+56LGh57G75Z6L77yM5ZyoXG4gICAgICAgIGxvY2F0aW9uOiB7XG4gICAgICAgICAgbGF0aXR1ZGU6IHJlcy5sYXRpdHVkZSxcbiAgICAgICAgICBsb25naXR1ZGU6IHJlcy5sb25naXR1ZGUsXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgIH0sXG4gICAgZmFpbDogKCkgPT57XG4gICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICBpY29uOlwibm9uZVwiLCAgLy/nlKjkuo7liqDplb/kvY3nva7mkYbmlL5cbiAgICAgICAgdGl0bGU6J+ivt+WJjeW+gOiuvue9rumhtemdouaOiOadgydcbiAgICAgIH0pXG4gICAgfVxuICB9KVxufSxcbi8v5omr5o+P54K55Ye7XG5vblNjYW5DbGlja2VkKCl7XG4gIC8v5L+d55WZ5b2T5YmN6aG16Z2i77yM6Lez6L2s5Yiw5bqU55So5YaF55qEcmVnaXN0ZXLpobXpnaLjgILkvYbmmK/kuI3og73ot7PliLAgdGFiYmFyIOmhtemdolxuICB3eC5zY2FuQ29kZSh7XG4gICAgc3VjY2VzczogKCkgPT57XG4gICAgICBjb25zdCBjYXJJRCA9ICdjYXIwMScgIC8v5qih5ouf5ZCO56uvSURcbiAgICAgIGNvbnN0IHJlZGlyZWN0VVJMID0gcm91dGluZy5Mb2NrKHtjYXJfaWQ6IGNhcklEfSkgIC8v57G75Z6L5by65YyW5pu/5Luj77yaYC9wYWdlcy9sb2NrL2xvY2s/Y2FyX2lkPSR7Y2FySUR9YCBcbiAgICAgIFxuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIC8v6Lez6L2s6IezbG9ja+mhtemdouWJjeWQkei3s+i9rOiHs3JlZ2lzdGVy6aG16Z2i77yM5bm25bCGY2FySUTmlL7lnKhyZWRpcmVjdFVSTOS4reS8oOiHs3JlZ2lzdGVy6aG16Z2iXG4gICAgICAgIC8v5pyA5ZCO5bCGY2FySUTkvKDoh7Nsb2Nr6aG16Z2iXG4gICAgICAgIHVybDogcm91dGluZy5yZWdpc3Rlcih7cmVkaXJlY3RVUkw6cmVkaXJlY3RVUkx9KSAgIC8vIOexu+Wei+W8uuWMluabv+S7o++8mmAvcGFnZXMvcmVnaXN0ZXIvcmVnaXN0ZXI/cmVkaXJlY3Q9JHtlbmNvZGVVUklDb21wb25lbnQocmVkaXJlY3RVUkwpfWAgXG4gICAgICB9KVxuICAgIH0sXG4gICAgZmFpbDpjb25zb2xlLmVycm9yLFxuICB9KVxufSxcblxub25TaG93KCl7XG4gIHRoaXMuaXNQYWdlU2hvd2luZyA9IHRydWU7XG59LFxuXG5vbkhpZGUoKXtcbiAgdGhpcy5pc1BhZ2VTaG93aW5nID0gZmFsc2U7XG5cbn0sXG5cbm9uTXlUcmlwc1RhcCgpe1xuICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICB1cmw6IHJvdXRpbmcubXl0cmlwcygpLFxuICB9KVxufSxcblxubW92ZUNhcnMoKXtcbiAgLy/lj6/pgJrov4cgd3guY3JlYXRlTWFwQ29udGV4dCDojrflj5bjgIJcbiAgLy9NYXBDb250ZXh0IOmAmui/hyBpZCDot5/kuIDkuKogbWFwIOe7hOS7tue7keWumu+8jOaTjeS9nOWvueW6lOeahCBtYXAg57uE5Lu244CCXG4gIGNvbnN0IG1hcCA9IHd4LmNyZWF0ZU1hcENvbnRleHQoXCJtYXBcIilcbiAgY29uc3QgZGVzdCA9IHtcbiAgICBsYXRpdHVkZTogMjMsXG4gICAgbG9uZ2l0dWRlOiAxMTMsXG4gIH1cbmNvbnN0IG1vdmVDYXJzID0gKCkgPT57XG4gIC8v5bmz56e7bWFya2Vy77yM5bim5Yqo55S744CCXG4gICBkZXN0LmxhdGl0dWRlICs9IDAuNSxcbiAgIGRlc3QubG9uZ2l0dWRlICs9IDAuNSxcbiAgbWFwLnRyYW5zbGF0ZU1hcmtlcih7XG4gICAgZGVzdGluYXRpb246IHtcbiAgICAgIGxhdGl0dWRlOiBkZXN0LmxhdGl0dWRlLFxuICAgICAgbG9uZ2l0dWRlOiBkZXN0LmxvbmdpdHVkZSxcbiAgICB9LFxuICAgIG1hcmtlcklkOiAwLFxuICAgIGF1dG9Sb3RhdGU6IGZhbHNlLFxuICAgIHJvdGF0ZTogMCxcbiAgICBkdXJhdGlvbjogNTAwMDAsXG4gICAgYW5pbWF0aW9uRW5kOigpID0+e1xuICAgICAgaWYodGhpcy5pc1BhZ2VTaG93aW5nKXtcbiAgICAgICAgbW92ZUNhcnMoKVxuICAgIH1cbiAgIH1cbiAgfSlcbn1cbm1vdmVDYXJzKClcbn1cbn0pXG5cbiJdfQ==