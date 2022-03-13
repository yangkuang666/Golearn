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
const camelcaseKeys = require("camelcase-keys");
const auth_pb_1 = require("./service/proto_gen/auth/auth_pb");
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
                    wx.request({
                        url: 'http://localhost:8080/v1/auth/login',
                        method: 'POST',
                        data: {
                            code: res.code
                        },
                        success: res => {
                            console.log(res.data);
                            const loginResp = auth_pb_1.auth.v1.LoginResponse.fromObject(camelcaseKeys(res.data));
                            console.log(loginResp);
                        },
                        fail: console.error,
                    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsZ0RBQWdEO0FBRWhELDhEQUF1RDtBQUd2RCx1Q0FBc0Q7QUFFdEQsSUFBSSxlQUFzRyxDQUFBO0FBQzFHLElBQUksY0FBc0MsQ0FBQTtBQUcxQyxHQUFHLENBQWE7SUFDZCxVQUFVLEVBQUU7UUFDVixRQUFRLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDeEMsZUFBZSxHQUFHLE9BQU8sQ0FBQTtZQUN6QixjQUFjLEdBQUcsTUFBTSxDQUFBO1FBQ3pCLENBQUMsQ0FBQztLQUNIO0lBRUssUUFBUTs7WUFDWixFQUFFLENBQUMsS0FBSyxDQUFDO2dCQUNQLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRTtvQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtvQkFFckIsRUFBRSxDQUFDLE9BQU8sQ0FBQzt3QkFDVCxHQUFHLEVBQUUscUNBQXFDO3dCQUMxQyxNQUFNLEVBQUUsTUFBTTt3QkFDZCxJQUFJLEVBQUM7NEJBQ0gsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO3lCQUNVO3dCQUMxQixPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUU7NEJBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7NEJBQ3JCLE1BQU0sU0FBUyxHQUEwQixjQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQ3ZFLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBYyxDQUFDLENBQUMsQ0FBQTs0QkFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTt3QkFDeEIsQ0FBQzt3QkFDRCxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUs7cUJBRXBCLENBQUMsQ0FBQTtnQkFDSixDQUFDO2dCQUNELElBQUksRUFBRSxPQUFPLENBQUMsS0FBSzthQUNwQixDQUFDLENBQUE7WUFHRixJQUFJO2dCQUNGLE1BQU0sT0FBTyxHQUFHLE1BQU0saUJBQVUsRUFBRSxDQUFBO2dCQUNsQyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtvQkFDekMsTUFBTSxXQUFXLEdBQUcsTUFBTSxrQkFBVyxFQUFFLENBQUE7b0JBQ3ZDLGVBQWUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUE7aUJBQ3RDO2FBQ0Y7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixjQUFjLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDcEI7UUFDSCxDQUFDO0tBQUE7SUFDRCxlQUFlLENBQUMsUUFBb0M7UUFDbEQsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzNCLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhcHAudHNcbi8vaW1wb3J0IGNhbWVsY2FzZUtleXMgPSByZXF1aXJlKFwiY2FtZWxjYXNlLWtleXNcIilcbmltcG9ydCBjYW1lbGNhc2VLZXlzID0gcmVxdWlyZShcImNhbWVsY2FzZS1rZXlzXCIpXG5pbXBvcnQgeyBJQXBwT3B0aW9uIH0gZnJvbSBcIi4vYXBwb3B0aW9uXCJcbmltcG9ydCB7IGF1dGggfSBmcm9tIFwiLi9zZXJ2aWNlL3Byb3RvX2dlbi9hdXRoL2F1dGhfcGJcIlxuLy9pbXBvcnQgeyBjb29sY2FyIH0gZnJvbSBcIi4vc2VydmljZS9wcm90b19nZW4vdHJpcF9wYlwiXG4vL2ltcG9ydCB7IENvb2xjYXIgfSBmcm9tIFwiLi9zZXJ2aWNlL3JlcXVlc3RcIlxuaW1wb3J0IHsgZ2V0U2V0dGluZywgZ2V0VXNlckluZm8gfSBmcm9tIFwiLi91dGlscy91dGlsXCJcblxubGV0IHJlc29sdmVVc2VySW5mbzogKHZhbHVlOiBXZWNoYXRNaW5pcHJvZ3JhbS5Vc2VySW5mbyB8IFByb21pc2VMaWtlPFdlY2hhdE1pbmlwcm9ncmFtLlVzZXJJbmZvPikgPT4gdm9pZFxubGV0IHJlamVjdFVzZXJJbmZvOiAocmVhc29uPzogYW55KSA9PiB2b2lkXG5cbi8vIGFwcC50c1xuQXBwPElBcHBPcHRpb24+KHtcbiAgZ2xvYmFsRGF0YToge1xuICAgIHVzZXJJbmZvOiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICByZXNvbHZlVXNlckluZm8gPSByZXNvbHZlXG4gICAgICByZWplY3RVc2VySW5mbyA9IHJlamVjdFxuICAgIH0pXG4gIH0sXG4gIFxuICBhc3luYyBvbkxhdW5jaCgpIHtcbiAgICB3eC5sb2dpbih7XG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMuY29kZSlcbiAgICAgICAgLy/lkJHlkI7lj7Dlj5HpgIFyZXMuY29kZeaNouWPlm9wZW5JZCwgc2Vzc2lvbmtleXMsIHVuaW9uSWRcbiAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MDgwL3YxL2F1dGgvbG9naW4nLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgY29kZTogcmVzLmNvZGVcbiAgICAgICAgICB9IGFzIGF1dGgudjEuSUxvZ2luUmVxdWVzdCxcbiAgICAgICAgICBzdWNjZXNzOiByZXMgPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSlcbiAgICAgICAgICAgIGNvbnN0IGxvZ2luUmVzcDogYXV0aC52MS5Mb2dpblJlc3BvbnNlID0gYXV0aC52MS5Mb2dpblJlc3BvbnNlLmZyb21PYmplY3QoXG4gICAgICAgICAgICAgIGNhbWVsY2FzZUtleXMocmVzLmRhdGEgYXMgb2JqZWN0KSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxvZ2luUmVzcClcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGNvbnNvbGUuZXJyb3IsXG4gICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZmFpbDogY29uc29sZS5lcnJvclxuICAgIH0pXG5cbiAgICAvL+iOt+WPlueUqOaIt+S/oeaBr1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzZXR0aW5nID0gYXdhaXQgZ2V0U2V0dGluZygpXG4gICAgICBpZiAoc2V0dGluZy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xuICAgICAgICBjb25zdCB1c2VySW5mb1JlcyA9IGF3YWl0IGdldFVzZXJJbmZvKClcbiAgICAgICAgcmVzb2x2ZVVzZXJJbmZvKHVzZXJJbmZvUmVzLnVzZXJJbmZvKVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmVqZWN0VXNlckluZm8oZXJyKVxuICAgIH1cbiAgfSxcbiAgcmVzb2x2ZVVzZXJJbmZvKHVzZXJJbmZvOiBXZWNoYXRNaW5pcHJvZ3JhbS5Vc2VySW5mbykge1xuICAgIHJlc29sdmVVc2VySW5mbyh1c2VySW5mbylcbiAgfVxufSlcbiJdfQ==