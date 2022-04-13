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
const rental_pb_1 = require("../../service/proto_gen/rental/rental_pb");
const trip_1 = require("../../service/trip");
const format_1 = require("../../utils/format");
const routing_1 = require("../../utils/routing");
const updateIntervalSec = 5;
function DurationStr(sec) {
    const dur = format_1.formatDurtion(sec);
    return `${dur.hh}:${dur.mm}:${dur.ss}`;
}
Page({
    timer: undefined,
    tripID: '',
    data: {
        location: {
            latitude: 40.756825521115363,
            longitude: 121.67222114786053,
        },
        scale: 10,
        elapsed: '00:00:00',
        fee: '00.00',
    },
    onLoad(opt) {
        const o = opt;
        this.tripID = o.trip_id;
        console.log("记录行程", o.trip_id);
        trip_1.TripService.getTrip(o.trip_id).then(console.log);
        console.log("gettrip sussesful");
        this.setupLocationUpdator();
        this.setupTimer(this.tripID);
    },
    onUnload() {
        wx.stopLocationUpdate();
        if (this.timer) {
            clearInterval(this.timer);
        }
    },
    onEndTripTap() {
        trip_1.TripService.finishTrip(this.tripID).then(() => {
            wx.showLoading({
                title: "加载中",
                mask: true,
            }),
                setTimeout(() => {
                    wx.redirectTo({
                        url: routing_1.routing.mytrips(),
                        complete: () => {
                            wx.hideLoading();
                        }
                    });
                }, 3000);
        }).catch(err => {
            console.error(err);
            wx.showToast({
                title: "结束行程失败",
                icon: "none",
            });
        });
    },
    setupLocationUpdator() {
        wx.startLocationUpdate({
            fail: console.error,
        });
        wx.onLocationChange(loc => {
            console.log("location:", loc);
            this.setData({
                location: {
                    latitude: loc.latitude,
                    longitude: loc.longitude,
                },
            });
        });
    },
    setupTimer(tripID) {
        return __awaiter(this, void 0, void 0, function* () {
            const trip = yield trip_1.TripService.updateTripPos(tripID);
            if (trip.status !== rental_pb_1.rental.v1.TripStatus.IN_PROGRESS) {
                console.log("该行程不在进行中");
                return;
            }
            let secSinceLastUp = 0;
            let latUpdateDurationSec = trip.current.timestampSec - trip.start.timestampSec;
            this.setData({
                elapsed: DurationStr(latUpdateDurationSec),
                fee: format_1.formatfee(trip.current.feeCent)
            });
            this.timer = setInterval(() => {
                secSinceLastUp++;
                if (secSinceLastUp % 5 === 0) {
                    trip_1.TripService.updateTripPos(tripID, {
                        latitude: this.data.location.latitude,
                        longitude: this.data.location.longitude,
                    }).then(trip => {
                        var _a, _b, _c, _d;
                        console.log((_a = trip.current) === null || _a === void 0 ? void 0 : _a.feeCent);
                        latUpdateDurationSec = ((_b = trip.current) === null || _b === void 0 ? void 0 : _b.timestampSec) - ((_c = trip.start) === null || _c === void 0 ? void 0 : _c.timestampSec);
                        secSinceLastUp = 0;
                        this.setData({
                            fee: format_1.formatfee((_d = trip.current) === null || _d === void 0 ? void 0 : _d.feeCent),
                            location: this.data.location
                        });
                    }).catch(console.error);
                }
                this.setData({
                    elapsed: DurationStr(latUpdateDurationSec + updateIntervalSec),
                });
            }, 1000);
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJpdmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRyaXZpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3RUFBaUU7QUFDakUsNkNBQWdEO0FBQ2hELCtDQUE2RDtBQUM3RCxpREFBNkM7QUFFN0MsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLENBQUE7QUFDM0IsU0FBUyxXQUFXLENBQUMsR0FBVztJQUM1QixNQUFNLEdBQUcsR0FBRyxzQkFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzlCLE9BQU8sR0FBRyxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFBO0FBRzFDLENBQUM7QUFFRCxJQUFJLENBQUM7SUFDRCxLQUFLLEVBQUUsU0FBNkI7SUFDcEMsTUFBTSxFQUFFLEVBQUU7SUFFVixJQUFJLEVBQUU7UUFDRixRQUFRLEVBQUU7WUFDTixRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFNBQVMsRUFBRSxrQkFBa0I7U0FDaEM7UUFDRCxLQUFLLEVBQUUsRUFBRTtRQUNULE9BQU8sRUFBRSxVQUFVO1FBQ25CLEdBQUcsRUFBRSxPQUFPO0tBQ2Y7SUFHRCxNQUFNLENBQUMsR0FBOEI7UUFDakMsTUFBTSxDQUFDLEdBQXVCLEdBQUcsQ0FBQTtRQUVqQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUE7UUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzlCLGtCQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtRQUNoQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQTtRQUMzQixJQUFJLENBQUMs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QUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7O3dCQUNmLE9BQU8sQ0FBQyxHQUFHLE9BQUMsSUFBSSxDQUFDLE9BQU8sMENBQUUsT0FBTyxDQUFDLENBQUE7d0JBQ2xDLG9CQUFvQixHQUFHLENBQUEsTUFBQSxJQUFJLENBQUMsT0FBTywwQ0FBRSxZQUFhLEtBQUcsTUFBQSxJQUFJLENBQUMsS0FBSywwQ0FBRSxZQUFhLENBQUEsQ0FBQTt3QkFDOUUsY0FBYyxHQUFHLENBQUMsQ0FBQTt3QkFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQzs0QkFDVCxHQUFHLEVBQUUsa0JBQVMsQ0FBQyxNQUFBLElBQUksQ0FBQyxPQUFPLDBDQUFFLE9BQVEsQ0FBQzs0QkFDdEMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTt5QkFDL0IsQ0FBQyxDQUFBO29CQUNOLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7aUJBRTFCO2dCQUNELElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1QsT0FBTyxFQUFFLFdBQVcsQ0FBQyxvQkFBb0IsR0FBRyxpQkFBaUIsQ0FBQztpQkFDakUsQ0FBQyxDQUFBO1lBQ04sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ1osQ0FBQztLQUFBO0NBQ0osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVudGFsIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvcHJvdG9fZ2VuL3JlbnRhbC9yZW50YWxfcGJcIlxuaW1wb3J0IHsgVHJpcFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZS90cmlwXCJcbmltcG9ydCB7IGZvcm1hdER1cnRpb24sIGZvcm1hdGZlZSB9IGZyb20gXCIuLi8uLi91dGlscy9mb3JtYXRcIlxuaW1wb3J0IHsgcm91dGluZyB9IGZyb20gXCIuLi8uLi91dGlscy9yb3V0aW5nXCJcblxuY29uc3QgdXBkYXRlSW50ZXJ2YWxTZWMgPSA1XG5mdW5jdGlvbiBEdXJhdGlvblN0cihzZWM6IG51bWJlcil7XG4gICAgY29uc3QgZHVyID0gZm9ybWF0RHVydGlvbihzZWMpXG4gICAgcmV0dXJuIGAke2R1ci5oaH06JHtkdXIubW19OiR7ZHVyLnNzfWBcblxuXG59XG5cblBhZ2Uoe1xuICAgIHRpbWVyOiB1bmRlZmluZWQgYXMgbnVtYmVyfHVuZGVmaW5lZCxcbiAgICB0cmlwSUQ6ICcnLFxuXG4gICAgZGF0YToge1xuICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgICAgbGF0aXR1ZGU6IDQwLjc1NjgyNTUyMTExNTM2MyxcbiAgICAgICAgICAgIGxvbmdpdHVkZTogMTIxLjY3MjIyMTE0Nzg2MDUzLFxuICAgICAgICB9LFxuICAgICAgICBzY2FsZTogMTAsXG4gICAgICAgIGVsYXBzZWQ6ICcwMDowMDowMCcsXG4gICAgICAgIGZlZTogJzAwLjAwJyxcbiAgICB9LFxuXG4gICAgLy/pobXpnaLotbflp4vvvIxvcHTkuLrkuIrkuKrpobXpnaLkvKDpgIHmlbDmja5cbiAgICBvbkxvYWQob3B0OiBSZWNvcmQ8J3RyaXBfaWQnLCBzdHJpbmc+KXsgIC8vUmVjb3JkPCd0cmlwX2lkJywgc3RyaW5nPuihqOekunJpcF9pZOS4unN0cmluZ+exu+Wei1xuICAgICAgICBjb25zdCBvOiByb3V0aW5nLkRyaXZpbmdPcHQgPSBvcHRcbiAgICAgICAgLy9vLnRyaXBfaWQgPSBcIjYyNDU3MjlhZDZiYTk0NTRiZDA5MzFkM1wiXG4gICAgICAgIHRoaXMudHJpcElEID0gby50cmlwX2lkXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6K6w5b2V6KGM56iLXCIsIG8udHJpcF9pZClcbiAgICAgICAgVHJpcFNlcnZpY2UuZ2V0VHJpcChvLnRyaXBfaWQpLnRoZW4oY29uc29sZS5sb2cpXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0dHJpcCBzdXNzZXNmdWxcIilcbiAgICAgICAgdGhpcy5zZXR1cExvY2F0aW9uVXBkYXRvcigpXG4gICAgICAgIHRoaXMuc2V0dXBUaW1lcih0aGlzLnRyaXBJRClcbiAgICB9LFxuXG4gICAgb25VbmxvYWQoKXtcbiAgICAgICAgd3guc3RvcExvY2F0aW9uVXBkYXRlKClcbiAgICAgICAgaWYodGhpcy50aW1lcil7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZXIpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25FbmRUcmlwVGFwKCl7XG4gICAgICAgIFRyaXBTZXJ2aWNlLmZpbmlzaFRyaXAodGhpcy50cmlwSUQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuWKoOi9veS4rVwiLFxuICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsICAgLy/kv53miqTmjInpkq5cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogcm91dGluZy5teXRyaXBzKCksXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LCAzMDAwKTsgXG4gICAgICAgIH0pLmNhdGNoKGVyciA9PntcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLnu5PmnZ/ooYznqIvlpLHotKVcIixcbiAgICAgICAgICAgICAgICBpY29uOiBcIm5vbmVcIixcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIHNldHVwTG9jYXRpb25VcGRhdG9yKCl7XG4gICAgICAgIC8v6LW35aeL5L2N572uXG4gICAgICAgIHd4LnN0YXJ0TG9jYXRpb25VcGRhdGUoe1xuICAgICAgICAgICAgZmFpbDogY29uc29sZS5lcnJvcixcbiAgICAgICAgfSlcbiAgICAgICAgLy/lrp7ml7bmm7TmlrDkvY3nva5cbiAgICAgICAgd3gub25Mb2NhdGlvbkNoYW5nZShsb2MgPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvY2F0aW9uOlwiLCBsb2MpXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uOntcbiAgICAgICAgICAgICAgICAgICAgbGF0aXR1ZGU6IGxvYy5sYXRpdHVkZSxcbiAgICAgICAgICAgICAgICAgICAgbG9uZ2l0dWRlOmxvYy5sb25naXR1ZGUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICAvL+Wumuacn+WQkeaJp+ihjOivpeWHveaVsFxuICAgIGFzeW5jIHNldHVwVGltZXIodHJpcElEOiBzdHJpbmcpe1xuICAgICAgICBjb25zdCB0cmlwID0gYXdhaXQgVHJpcFNlcnZpY2UudXBkYXRlVHJpcFBvcyh0cmlwSUQpXG4gICAgICAgIC8v5a+56KGM56iL54q25oCB6L+b6KGM5L+d5oqkXG4gICAgICAgIGlmICh0cmlwLnN0YXR1cyAhPT0gcmVudGFsLnYxLlRyaXBTdGF0dXMuSU5fUFJPR1JFU1Mpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLor6XooYznqIvkuI3lnKjov5vooYzkuK1cIilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGxldCBzZWNTaW5jZUxhc3RVcCA9IDAgICAgICAgICAgICAgICAgICAgICAgLy/mm7TmlrDml7bpl7RcbiAgICAgICAgbGV0IGxhdFVwZGF0ZUR1cmF0aW9uU2VjID0gdHJpcC5jdXJyZW50IS50aW1lc3RhbXBTZWMhIC0gdHJpcC5zdGFydCEudGltZXN0YW1wU2VjISAgIC8v5LiK5LiA5qyh5pu05paw55qE5pWw5o2uXG4gXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBlbGFwc2VkOiBEdXJhdGlvblN0cihsYXRVcGRhdGVEdXJhdGlvblNlYyksXG4gICAgICAgICAgICBmZWU6IGZvcm1hdGZlZSh0cmlwLmN1cnJlbnQhLmZlZUNlbnQhKVxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PntcbiAgICAgICAgICAgIHNlY1NpbmNlTGFzdFVwKytcbiAgICAgICAgICAgIGlmIChzZWNTaW5jZUxhc3RVcCAlIDUgPT09IDApe1xuICAgICAgICAgICAgICAgIFRyaXBTZXJ2aWNlLnVwZGF0ZVRyaXBQb3ModHJpcElELCB7XG4gICAgICAgICAgICAgICAgICAgIGxhdGl0dWRlOiB0aGlzLmRhdGEubG9jYXRpb24ubGF0aXR1ZGUsXG4gICAgICAgICAgICAgICAgICAgIGxvbmdpdHVkZTogdGhpcy5kYXRhLmxvY2F0aW9uLmxvbmdpdHVkZSxcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbih0cmlwID0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0cmlwLmN1cnJlbnQ/LmZlZUNlbnQpXG4gICAgICAgICAgICAgICAgICAgIGxhdFVwZGF0ZUR1cmF0aW9uU2VjID0gdHJpcC5jdXJyZW50Py50aW1lc3RhbXBTZWMhIC0gdHJpcC5zdGFydD8udGltZXN0YW1wU2VjIVxuICAgICAgICAgICAgICAgICAgICBzZWNTaW5jZUxhc3RVcCA9IDBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZlZTogZm9ybWF0ZmVlKHRyaXAuY3VycmVudD8uZmVlQ2VudCEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246IHRoaXMuZGF0YS5sb2NhdGlvblxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGNvbnNvbGUuZXJyb3IpXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgZWxhcHNlZDogRHVyYXRpb25TdHIobGF0VXBkYXRlRHVyYXRpb25TZWMgKyB1cGRhdGVJbnRlcnZhbFNlYyksXG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCAxMDAwKVxuICAgIH1cbn0pXG5cblxuIl19