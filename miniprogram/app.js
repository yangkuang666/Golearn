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
const util_1 = require("./utils/util");
let resolveUserInfo;
let rejectUserInfo;
App({
    globalData: {
        userInfo: new Promise((resolve, reject) => {
            resolveUserInfo = resolve;
            rejectUserInfo = reject;
        })
    },
    onLaunch() {
        return __awaiter(this, void 0, void 0, function* () {
            wx.login({
                success: res => {
                    console.log(res.code);
                },
                fail: console.error
            });
            try {
                const setting = yield util_1.getSetting();
                if (setting.authSetting['scope.userInfo']) {
                    const userInfoRes = yield util_1.getUserInfo();
                    resolveUserInfo(userInfoRes.userInfo);
                }
            }
            catch (err) {
                rejectUserInfo(err);
            }
        });
    },
    resolveUserInfo(userInfo) {
        resolveUserInfo(userInfo);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBS0EsdUNBQXNEO0FBRXRELElBQUksZUFBc0csQ0FBQTtBQUMxRyxJQUFJLGNBQXNDLENBQUE7QUFHMUMsR0FBRyxDQUFhO0lBQ2QsVUFBVSxFQUFFO1FBQ1YsUUFBUSxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3hDLGVBQWUsR0FBRyxPQUFPLENBQUE7WUFDekIsY0FBYyxHQUFHLE1BQU0sQ0FBQTtRQUN6QixDQUFDLENBQUM7S0FDSDtJQUVLLFFBQVE7O1lBQ1osRUFBRSxDQUFDLEtBQUssQ0FBQztnQkFDUCxPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUU7b0JBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ3ZCLENBQUM7Z0JBQ0QsSUFBSSxFQUFFLE9BQU8sQ0FBQyxLQUFLO2FBQ3BCLENBQUMsQ0FBQTtZQUdGLElBQUk7Z0JBQ0YsTUFBTSxPQUFPLEdBQUcsTUFBTSxpQkFBVSxFQUFFLENBQUE7Z0JBQ2xDLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO29CQUN6QyxNQUFNLFdBQVcsR0FBRyxNQUFNLGtCQUFXLEVBQUUsQ0FBQTtvQkFDdkMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtpQkFDdEM7YUFDRjtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNaLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNwQjtRQUNILENBQUM7S0FBQTtJQUNELGVBQWUsQ0FBQyxRQUFvQztRQUNsRCxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDM0IsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGFwcC50c1xuLy9pbXBvcnQgY2FtZWxjYXNlS2V5cyA9IHJlcXVpcmUoXCJjYW1lbGNhc2Uta2V5c1wiKVxuaW1wb3J0IHsgSUFwcE9wdGlvbiB9IGZyb20gXCIuL2FwcG9wdGlvblwiXG4vL2ltcG9ydCB7IGNvb2xjYXIgfSBmcm9tIFwiLi9zZXJ2aWNlL3Byb3RvX2dlbi90cmlwX3BiXCJcbi8vaW1wb3J0IHsgQ29vbGNhciB9IGZyb20gXCIuL3NlcnZpY2UvcmVxdWVzdFwiXG5pbXBvcnQgeyBnZXRTZXR0aW5nLCBnZXRVc2VySW5mbyB9IGZyb20gXCIuL3V0aWxzL3V0aWxcIlxuXG5sZXQgcmVzb2x2ZVVzZXJJbmZvOiAodmFsdWU6IFdlY2hhdE1pbmlwcm9ncmFtLlVzZXJJbmZvIHwgUHJvbWlzZUxpa2U8V2VjaGF0TWluaXByb2dyYW0uVXNlckluZm8+KSA9PiB2b2lkXG5sZXQgcmVqZWN0VXNlckluZm86IChyZWFzb24/OiBhbnkpID0+IHZvaWRcblxuLy8gYXBwLnRzXG5BcHA8SUFwcE9wdGlvbj4oe1xuICBnbG9iYWxEYXRhOiB7XG4gICAgdXNlckluZm86IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHJlc29sdmVVc2VySW5mbyA9IHJlc29sdmVcbiAgICAgIHJlamVjdFVzZXJJbmZvID0gcmVqZWN0XG4gICAgfSlcbiAgfSxcbiAgXG4gIGFzeW5jIG9uTGF1bmNoKCkge1xuICAgIHd4LmxvZ2luKHtcbiAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy5jb2RlKVxuICAgICAgfSxcbiAgICAgIGZhaWw6IGNvbnNvbGUuZXJyb3JcbiAgICB9KVxuXG4gICAgLy/ojrflj5bnlKjmiLfkv6Hmga9cbiAgICB0cnkge1xuICAgICAgY29uc3Qgc2V0dGluZyA9IGF3YWl0IGdldFNldHRpbmcoKVxuICAgICAgaWYgKHNldHRpbmcuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pIHtcbiAgICAgICAgY29uc3QgdXNlckluZm9SZXMgPSBhd2FpdCBnZXRVc2VySW5mbygpXG4gICAgICAgIHJlc29sdmVVc2VySW5mbyh1c2VySW5mb1Jlcy51c2VySW5mbylcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJlamVjdFVzZXJJbmZvKGVycilcbiAgICB9XG4gIH0sXG4gIHJlc29sdmVVc2VySW5mbyh1c2VySW5mbzogV2VjaGF0TWluaXByb2dyYW0uVXNlckluZm8pIHtcbiAgICByZXNvbHZlVXNlckluZm8odXNlckluZm8pXG4gIH1cbn0pXG4iXX0=