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
Page({
    scrollStates: {
        mainItem: [],
    },
    data: {
        tripsHeight: 0,
        avatarURL: '',
        trips: [],
        mainitem: [],
        navitem: [],
        mainscroll: '',
        navCount: 0,
        navSelect: '',
        navScroll: '',
        imgUrls: [
            'https://img4.mukewang.com/6203223d00015e9817920764.jpg',
            'https://img.mukewang.com/6218389d0001e43e17920764.jpg',
            'https://img.mukewang.com/6216fef5000134df17920764.jpg',
            'https://img1.mukewang.com/621839280001e48017920764.jpg',
        ]
    },
    onLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            this.populateTrip();
            const userInfo = yield getApp().globalData.userInfo;
            this.setData({
                avatarURL: userInfo.avatarUrl,
            });
        });
    },
    populateTrip() {
        const mainItem = [];
        const navItem = [];
        let navSelect = '';
        let prevNav = '';
        for (let i = 0; i < 100; i++) {
            const mainId = 'main-' + i;
            const navId = 'nav-' + i;
            const tripId = (10000 + i).toString();
            if (!prevNav) {
                prevNav = navId;
            }
            mainItem.push({
                id: mainId,
                navId: navId,
                navScrollId: prevNav,
                data: {
                    id: tripId,
                    statar: '南京',
                    end: '无锡',
                    duration: '4h',
                    fee: '200元',
                    distance: '200KM',
                    stutar: '进行中',
                }
            });
            navItem.push({
                id: navId,
                mainId: mainId,
                label: tripId,
            });
            if (i === 0) {
                navSelect = navId;
            }
            prevNav = navId;
        }
        this.setData({
            mainItem,
            navItem,
            navSelect
        }, () => {
            this.prepareScroll();
        });
    },
    onReady() {
        wx.createSelectorQuery().select('#heading')
            .boundingClientRect(rect => {
            const height = wx.getSystemInfoSync().windowHeight - rect.height;
            this.setData({
                tripsHeight: height,
                navCount: Math.round(height / 50),
            });
        }).exec();
    },
    getchangePage() {
        wx.navigateTo({
            url: routing_1.routing.register(),
        });
    },
    onGetUserInfo(e) {
        console.log(e);
        const userInfo = e.detail.userInfo;
        getApp().resolveUserInfo(userInfo);
    },
    prepareScroll() {
        wx.createSelectorQuery().selectAll('.main-item').fields({
            id: true,
            dataset: true,
            rect: true,
        }).exec(res => {
            this.scrollStates.mainItem = res[0];
        });
    },
    onnavitemTap(e) {
        var _a, _b;
        const mainId = (_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.dataset.mainId;
        const navId = (_b = e.currentTarget) === null || _b === void 0 ? void 0 : _b.id;
        if (mainId && navId) {
            this.setData({
                mainscroll: mainId,
                navSelect: navId,
            });
        }
    },
    onMainScroll(e) {
        var _a, _b;
        console.log(e);
        const top = ((_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.offsetTop) + ((_b = e.detail) === null || _b === void 0 ? void 0 : _b.scrollTop);
        if (top === undefined) {
            return;
        }
        const selItem = this.scrollStates.mainItem.find(Item => Item.top >= top);
        if (!selItem) {
            return;
        }
        this.setData({
            navSelect: selItem.dataset.navId,
            navScroll: selItem.dataset.navScrollId,
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXl0cmlwcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15dHJpcHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxpREFBNkM7QUFxQzdDLElBQUksQ0FBQztJQUNELFlBQVksRUFBQztRQUNULFFBQVEsRUFBRSxFQUE0QjtLQUN6QztJQUNELElBQUksRUFBQztRQUNELFdBQVcsRUFBQyxDQUFDO1FBQ2IsU0FBUyxFQUFDLEVBQUU7UUFDWixLQUFLLEVBQUMsRUFBWTtRQUNsQixRQUFRLEVBQUUsRUFBZ0I7UUFDMUIsT0FBTyxFQUFFLEVBQWU7UUFDeEIsVUFBVSxFQUFFLEVBQUU7UUFDZCxRQUFRLEVBQUMsQ0FBQztRQUNWLFNBQVMsRUFBRSxFQUFFO1FBQ2IsU0FBUyxFQUFDLEVBQUU7UUFDWixPQUFPLEVBQUM7WUFDSix3REFBd0Q7WUFDeEQsdURBQXVEO1lBQ3ZELHVEQUF1RDtZQUN2RCx3REFBd0Q7U0FDM0Q7S0FFSjtJQUNLLE1BQU07O1lBQ1IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFBO1lBQ25CLE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTSxFQUFjLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQTtZQUM5RCxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNWLFNBQVMsRUFBRSxRQUFRLENBQUMsU0FBUzthQUNoQyxDQUFDLENBQUE7UUFDTixDQUFDO0tBQUE7SUFFRCxZQUFZO1FBQ1IsTUFBTSxRQUFRLEdBQWUsRUFBRSxDQUFBO1FBQy9CLE1BQU0sT0FBTyxHQUFjLEVBQUUsQ0FBQTtRQUM3QixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUE7UUFDbEIsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFBO1FBQ2hCLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUM7WUFDdkIsTUFBTSxNQUFNLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQTtZQUMxQixNQUFN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QztZQUNmLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsVUFBVSxFQUFFLE1BQU07Z0JBQ2xCLFNBQVMsRUFBRSxLQUFLO2FBRW5CLENBQUMsQ0FBQTtTQUNMO0lBQ0wsQ0FBQztJQUVELFlBQVksQ0FBQyxDQUFNOztRQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDZCxNQUFNLEdBQUcsR0FBVyxPQUFBLENBQUMsQ0FBQyxhQUFhLDBDQUFFLFNBQVMsV0FBRyxDQUFDLENBQUMsTUFBTSwwQ0FBRSxTQUFTLENBQUEsQ0FBQTtRQUNwRSxJQUFHLEdBQUcsS0FBSyxTQUFTLEVBQUM7WUFDakIsT0FBTTtTQUNUO1FBQ0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQTtRQUN4RSxJQUFHLENBQUMsT0FBTyxFQUFDO1lBQ1IsT0FBTTtTQUNUO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULFNBQVMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUs7WUFDaEMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVztTQUd6QyxDQUFDLENBQUE7SUFFTixDQUFDO0NBRUosQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUFwcE9wdGlvbiB9IGZyb20gXCIuLi8uLi9hcHBvcHRpb25cIlxuaW1wb3J0IHsgcm91dGluZyB9IGZyb20gXCIuLi8uLi91dGlscy9yb3V0aW5nXCJcblxuXG5cbmludGVyZmFjZSBUcmlwe1xuICAgIGlkOiBzdHJpbmcsXG4gICAgc3RhdGFyOiBzdHJpbmcsXG4gICAgZW5kOnN0cmluZyxcbiAgICBkdXJhdGlvbjogc3RyaW5nLFxuICAgIGZlZTogc3RyaW5nLFxuICAgIGRpc3RhbmNlOiBzdHJpbmcsXG4gICAgc3R1dGFyOnN0cmluZyxcbn1cblxuaW50ZXJmYWNlIE1haW5JdGVte1xuICAgIGlkOiBzdHJpbmcsXG4gICAgbmF2SWQ6IHN0cmluZyxcbiAgICBuYXZTY3JvbGxJZDogc3RyaW5nLFxuICAgIGRhdGE6IFRyaXAsXG59XG5cbmludGVyZmFjZSBOYXZJdG1le1xuICAgIGlkOiBzdHJpbmcsXG4gICAgbWFpbklkOiBzdHJpbmcsXG4gICAgbGFiZWw6IHN0cmluZyxcbn1cblxuaW50ZXJmYWNlIE1haW5JdGVtUXVlcnlSZXN1bHRze1xuICAgIGlkOiBzdHJpbmcsXG4gICAgdG9wOiBudW1iZXIsXG4gICAgZGF0YXNldDp7XG4gICAgICAgIG5hdklkOiBzdHJpbmcsXG4gICAgICAgIG5hdlNjcm9sbElkOiBzdHJpbmcsXG4gICAgfVxuICAgIFxufVxuXG5QYWdlKHtcbiAgICBzY3JvbGxTdGF0ZXM6e1xuICAgICAgICBtYWluSXRlbTogW10gYXMgTWFpbkl0ZW1RdWVyeVJlc3VsdHNbXSxcbiAgICB9LFxuICAgIGRhdGE6e1xuICAgICAgICB0cmlwc0hlaWdodDowLFxuICAgICAgICBhdmF0YXJVUkw6JycsXG4gICAgICAgIHRyaXBzOltdIGFzIFRyaXBbXSxcbiAgICAgICAgbWFpbml0ZW06IFtdIGFzIE1haW5JdGVtW10sXG4gICAgICAgIG5hdml0ZW06IFtdIGFzIE5hdkl0bWVbXSxcbiAgICAgICAgbWFpbnNjcm9sbDogJycsXG4gICAgICAgIG5hdkNvdW50OjAsXG4gICAgICAgIG5hdlNlbGVjdDogJycsXG4gICAgICAgIG5hdlNjcm9sbDonJyxcbiAgICAgICAgaW1nVXJsczpbXG4gICAgICAgICAgICAnaHR0cHM6Ly9pbWc0Lm11a2V3YW5nLmNvbS82MjAzMjIzZDAwMDE1ZTk4MTc5MjA3NjQuanBnJyxcbiAgICAgICAgICAgICdodHRwczovL2ltZy5tdWtld2FuZy5jb20vNjIxODM4OWQwMDAxZTQzZTE3OTIwNzY0LmpwZycsXG4gICAgICAgICAgICAnaHR0cHM6Ly9pbWcubXVrZXdhbmcuY29tLzYyMTZmZWY1MDAwMTM0ZGYxNzkyMDc2NC5qcGcnLFxuICAgICAgICAgICAgJ2h0dHBzOi8vaW1nMS5tdWtld2FuZy5jb20vNjIxODM5MjgwMDAxZTQ4MDE3OTIwNzY0LmpwZycsXG4gICAgICAgIF1cbiAgICAgICAgXG4gICAgfSxcbiAgICBhc3luYyBvbkxvYWQoKXtcbiAgICAgICAgdGhpcy5wb3B1bGF0ZVRyaXAoKVxuICAgICAgICBjb25zdCB1c2VySW5mbyA9IGF3YWl0IGdldEFwcDxJQXBwT3B0aW9uPigpLmdsb2JhbERhdGEudXNlckluZm9cbiAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBhdmF0YXJVUkw6IHVzZXJJbmZvLmF2YXRhclVybCxcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgcG9wdWxhdGVUcmlwKCl7XG4gICAgICAgIGNvbnN0IG1haW5JdGVtOiBNYWluSXRlbVtdID0gW11cbiAgICAgICAgY29uc3QgbmF2SXRlbTogTmF2SXRtZVtdID0gW11cbiAgICAgICAgbGV0IG5hdlNlbGVjdCA9ICcnXG4gICAgICAgIGxldCBwcmV2TmF2ID0gJydcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8MTAwOyBpKyspe1xuICAgICAgICAgICAgY29uc3QgbWFpbklkID0gJ21haW4tJyArIGkgXG4gICAgICAgICAgICBjb25zdCBuYXZJZCA9ICduYXYtJyArIGlcbiAgICAgICAgICAgIGNvbnN0IHRyaXBJZCA9ICAoMTAwMDAgKyBpKS50b1N0cmluZygpXG4gICAgICAgICAgICBpZighcHJldk5hdil7XG4gICAgICAgICAgICAgICAgcHJldk5hdiA9IG5hdklkXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1haW5JdGVtLnB1c2goe1xuICAgICAgICAgICAgICAgIGlkOiBtYWluSWQsXG4gICAgICAgICAgICAgICAgbmF2SWQ6IG5hdklkLFxuICAgICAgICAgICAgICAgIG5hdlNjcm9sbElkOnByZXZOYXYsXG4gICAgICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgICAgICAgIGlkOiB0cmlwSWQsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRhcjogJ+WNl+S6rCcsXG4gICAgICAgICAgICAgICAgICAgIGVuZDogJ+aXoOmUoScsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAnNGgnLFxuICAgICAgICAgICAgICAgICAgICBmZWU6ICcyMDDlhYMnLFxuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZTogJzIwMEtNJyxcbiAgICAgICAgICAgICAgICAgICAgc3R1dGFyOiAn6L+b6KGM5LitJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgbmF2SXRlbS5wdXNoKHtcbiAgICAgICAgICAgICAgICBpZDpuYXZJZCxcbiAgICAgICAgICAgICAgICBtYWluSWQ6IG1haW5JZCxcbiAgICAgICAgICAgICAgICBsYWJlbDogdHJpcElkLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGlmKGkgPT09IDApe1xuICAgICAgICAgICAgICAgIG5hdlNlbGVjdCA9IG5hdklkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2TmF2ID0gbmF2SWRcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgbWFpbkl0ZW0sXG4gICAgICAgICAgICBuYXZJdGVtLFxuICAgICAgICAgICAgbmF2U2VsZWN0XG5cbiAgICAgICAgfSwgKCkgPT57XG4gICAgICAgICAgICB0aGlzLnByZXBhcmVTY3JvbGwoKVxuICAgICAgICB9KVxuICAgIH0sXG4gICAgLy/kuI3mmK/lvojmh4JcbiAgICBvblJlYWR5KCl7XG4gICAgICAgIHd4LmNyZWF0ZVNlbGVjdG9yUXVlcnkoKS5zZWxlY3QoJyNoZWFkaW5nJylcbiAgICAgICAgICAgIC5ib3VuZGluZ0NsaWVudFJlY3QocmVjdCA9PntcbiAgICAgICAgICAgICAgICBjb25zdCBoZWlnaHQgPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpLndpbmRvd0hlaWdodCAtIHJlY3QuaGVpZ2h0XG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgdHJpcHNIZWlnaHQ6aGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBuYXZDb3VudDogTWF0aC5yb3VuZChoZWlnaHQvNTApLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KS5leGVjKClcbiAgICAgICAgICAgIFxuICAgIH0sXG5cbiAgICBnZXRjaGFuZ2VQYWdlKCl7XG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOnJvdXRpbmcucmVnaXN0ZXIoKSwgLy9yZWdpc3Rlcigp5Li65Y+v6YCJ5Y+C5pWwXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBvbkdldFVzZXJJbmZvKGU6IGFueSl7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpXG4gICAgICAgIGNvbnN0IHVzZXJJbmZvOiBXZWNoYXRNaW5pcHJvZ3JhbS5Vc2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgICAgIGdldEFwcDxJQXBwT3B0aW9uPigpLnJlc29sdmVVc2VySW5mbyh1c2VySW5mbylcbiAgICB9LFxuXG4gICAgcHJlcGFyZVNjcm9sbCgpe1xuICAgICAgICB3eC5jcmVhdGVTZWxlY3RvclF1ZXJ5KCkuc2VsZWN0QWxsKCcubWFpbi1pdGVtJykuZmllbGRzKHtcbiAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgZGF0YXNldDogdHJ1ZSxcbiAgICAgICAgICAgIHJlY3Q6IHRydWUsXG4gICAgICAgIH0pLmV4ZWMocmVzID0+e1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxTdGF0ZXMubWFpbkl0ZW0gPSByZXNbMF1cbiAgICAgICAgfSlcblxuICAgIH0sXG5cbiAgICBvbm5hdml0ZW1UYXAoZTogYW55KXtcbiAgICAgICAgLy/mlbDmja7nu5HlrppcbiAgICAgICAgY29uc3QgbWFpbklkOiBzdHJpbmcgPSBlLmN1cnJlbnRUYXJnZXQ/LmRhdGFzZXQubWFpbklkXG4gICAgICAgIC8vY29uc3QgbmF2U2VsZWN0OnN0cmluZyA9IGUuY3VycmVudFRhcmdldD8uaWRcbiAgICAgICAgY29uc3QgbmF2SWQ6IHN0cmluZyA9IGUuY3VycmVudFRhcmdldD8uaWRcbiAgICAgICAgaWYobWFpbklkICYmIG5hdklkKXtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgbWFpbnNjcm9sbDogbWFpbklkLFxuICAgICAgICAgICAgICAgIG5hdlNlbGVjdDogbmF2SWQsXG4gICAgXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uTWFpblNjcm9sbChlOiBhbnkpe1xuICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgICBjb25zdCB0b3A6IG51bWJlciA9IGUuY3VycmVudFRhcmdldD8ub2Zmc2V0VG9wICsgZS5kZXRhaWw/LnNjcm9sbFRvcFxuICAgICAgICBpZih0b3AgPT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZWxJdGVtID0gdGhpcy5zY3JvbGxTdGF0ZXMubWFpbkl0ZW0uZmluZChJdGVtID0+IEl0ZW0udG9wID49IHRvcClcbiAgICAgICAgaWYoIXNlbEl0ZW0pe1xuICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBuYXZTZWxlY3Q6IHNlbEl0ZW0uZGF0YXNldC5uYXZJZCxcbiAgICAgICAgICAgIG5hdlNjcm9sbDogc2VsSXRlbS5kYXRhc2V0Lm5hdlNjcm9sbElkLFxuXG4gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgfVxuXG59KVxuIl19