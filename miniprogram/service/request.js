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
exports.Coolcar = void 0;
const camelcaseKeys = require("camelcase-keys");
const auth_pb_1 = require("./proto_gen/auth/auth_pb");
var Coolcar;
(function (Coolcar) {
    const serverAddr = 'http://localhost:8080';
    const AUTH_ERR = 'AUTH_ERR';
    const authData = {
        token: '',
        expiryMs: 0,
    };
    function sendRequestWithAuthRetry(o, a) {
        return __awaiter(this, void 0, void 0, function* () {
            const authOpt = a || {
                attachAuthHeader: true,
                renteyOnAuthERR: true,
            };
            try {
                console.log("try:调用login");
                yield login();
                return sendRequest(o, authOpt);
            }
            catch (err) {
                console.log("catch");
                if (err === AUTH_ERR && authOpt.renteyOnAuthERR) {
                    authData.token = '';
                    authData.expiryMs = 0;
                    console.log("再次调用sendRequestWithAuthRetry");
                    return sendRequestWithAuthRetry(o, {
                        attachAuthHeader: authOpt.attachAuthHeader,
                        renteyOnAuthERR: false,
                    });
                }
                else {
                    throw err;
                }
            }
        });
    }
    Coolcar.sendRequestWithAuthRetry = sendRequestWithAuthRetry;
    function login() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("判断token是否有效");
            if (authData.token && authData.expiryMs >= Date.now()) {
                return;
            }
            console.log("调用wxLoging");
            const wxResp = yield wxLoging();
            const reqTimeMs = Date.now();
            console.log("调用sendRequest方法");
            const resp = yield sendRequest({
                method: 'POST',
                path: '/v1/auth/login',
                data: {
                    code: wxResp.code,
                },
                respMarshaller: auth_pb_1.auth.v1.LoginResponse.fromObject,
            }, {
                attachAuthHeader: false,
                renteyOnAuthERR: false,
            });
            console.log("code:", wxResp.code);
            console.log("resp:", resp);
            console.log("重置token");
            authData.token = resp.accssToken;
            authData.expiryMs = reqTimeMs + resp.expiresIn * 1000;
            console.log("login结束");
        });
    }
    Coolcar.login = login;
    function sendRequest(o, a) {
        return new Promise((resolve, reject) => {
            const header = {};
            if (a.attachAuthHeader) {
                if (authData.token && authData.expiryMs >= Date.now()) {
                    header.authorization = "Bearer " + authData.token;
                    console.log("token有效: ", header.token);
                }
                else {
                    reject(AUTH_ERR);
                    console.log("token无效");
                    return;
                }
            }
            wx.request({
                url: serverAddr + o.path,
                method: o.method,
                data: o.data,
                header,
                success: res => {
                    console.log("data:", o.data);
                    if (res.statusCode === 401) {
                        reject(AUTH_ERR);
                        console.log("401的状态");
                    }
                    else if (res.statusCode >= 400) {
                        reject(res);
                    }
                    else {
                        resolve(o.respMarshaller(camelcaseKeys(res.data, {
                            deep: true,
                        })));
                    }
                },
                fail: reject
            });
        });
    }
    function wxLoging() {
        return new Promise((resolve, reject) => {
            wx.login({
                success: resolve,
                fail: reject,
            });
        });
    }
    function uploadfile(o) {
        const data = wx.getFileSystemManager().readFileSync(o.localPath);
        return new Promise((resolve, reject) => {
            wx.request({
                method: 'PUT',
                url: o.url,
                data,
                success: res => {
                    if (res.statusCode >= 400) {
                        reject(res);
                    }
                    else {
                        resolve();
                    }
                },
                fail: reject,
            });
        });
    }
    Coolcar.uploadfile = uploadfile;
})(Coolcar = exports.Coolcar || (exports.Coolcar = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQWdEO0FBQ2hELHNEQUErQztBQUUvQyxJQUFpQixPQUFPLENBd0p2QjtBQXhKRCxXQUFpQixPQUFPO0lBQ3BCLE1BQU0sVUFBVSxHQUFHLHVCQUF1QixDQUFBO0lBQzFDLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQTtJQUMzQixNQUFNLFFBQVEsR0FBRztRQUNiLEtBQUssRUFBRSxFQUFFO1FBQ1QsUUFBUSxFQUFFLENBQUM7S0FDZCxDQUFBO0lBZ0JELFNBQXNCLHdCQUF3QixDQUFXLENBQTBCLEVBQUUsQ0FBYzs7WUFDL0YsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFJO2dCQUNqQixnQkFBZ0IsRUFBRSxJQUFJO2dCQUN0QixlQUFlLEVBQUUsSUFBSTthQUN4QixDQUFBO1lBQ0QsSUFBRztnQkFDQyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO2dCQUMxQixNQUFNLEtBQUssRUFBRSxDQUFBO2dCQUNiLE9BQU8sV0FBVyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQTthQUNqQztZQUFDLE9BQU0sR0FBRyxFQUFDO2dCQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQ3BCLElBQUcsR0FBRyxLQUFLLFFBQVEsSUFBSSxPQUFPLENBQUMsZUFBZSxFQUFDO29CQUMzQyxRQUFRLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQTtvQkFDbkIsUUFBUSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUE7b0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQTtvQkFDM0MsT0FBTyx3QkFBd0IsQ0FBQyxDQUFDLEVBQUU7d0JBQy9CLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxnQkFBZ0I7d0JBQzFDLGVBQWUsRUFBRSxLQUFLO3FCQUN6QixD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Q1o7Z0JBQ0wsQ0FBQztnQkFDRCxJQUFJLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQWpCZSxrQkFBVSxhQWlCekIsQ0FBQTtBQUdMLENBQUMsRUF4SmdCLE9BQU8sR0FBUCxlQUFPLEtBQVAsZUFBTyxRQXdKdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2FtZWxjYXNlS2V5cyA9IHJlcXVpcmUoXCJjYW1lbGNhc2Uta2V5c1wiKVxuaW1wb3J0IHsgYXV0aCB9IGZyb20gXCIuL3Byb3RvX2dlbi9hdXRoL2F1dGhfcGJcIlxuXG5leHBvcnQgbmFtZXNwYWNlIENvb2xjYXJ7XG4gICAgY29uc3Qgc2VydmVyQWRkciA9ICdodHRwOi8vbG9jYWxob3N0OjgwODAnXG4gICAgY29uc3QgQVVUSF9FUlIgPSAnQVVUSF9FUlInXG4gICAgY29uc3QgYXV0aERhdGEgPSB7XG4gICAgICAgIHRva2VuOiAnJyxcbiAgICAgICAgZXhwaXJ5TXM6IDAsXG4gICAgfVxuXG4gICAgLy/lo7DmmI7mjqXlj6PvvIxyZXF1ZXN0T3B0aW9u6K+35rGC5YaF5a656YCJ6aG5XG4gICAgaW50ZXJmYWNlIHJlcXVlc3RPcHRpb248UkVRLCBSRVM+e1xuICAgICAgICBtZXRob2Q6ICdHRVQnfCdQVVQnfCdQT1NUJ3wnREVMRVRFJyxcbiAgICAgICAgcGF0aDogc3RyaW5nLFxuICAgICAgICBkYXRhPzogUkVRLFxuICAgICAgICByZXNwTWFyc2hhbGxlcjogKHI6IG9iamVjdCk9PlJFUyxcbiAgICB9XG4gICAgLy/lo7DmmI7mjqXlj6NcbiAgICBleHBvcnQgaW50ZXJmYWNlIEF1dGhPcHRpb24ge1xuICAgICAgICBhdHRhY2hBdXRoSGVhZGVyOiBib29sZWFuXG4gICAgICAgIHJlbnRleU9uQXV0aEVSUjogYm9vbGVhblxuICAgIH1cbiAgICBcbiAgICAvL+ihjOeoi+S4muWKoeWFpeWPo1xuICAgIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZW5kUmVxdWVzdFdpdGhBdXRoUmV0cnk8UkVRLCBSRVM+KG86IHJlcXVlc3RPcHRpb248UkVRLCBSRVM+LCBhPzogQXV0aE9wdGlvbik6UHJvbWlzZTxSRVM+e1xuICAgICAgICBjb25zdCBhdXRoT3B0ID0gYSB8fCB7XG4gICAgICAgICAgICBhdHRhY2hBdXRoSGVhZGVyOiB0cnVlLFxuICAgICAgICAgICAgcmVudGV5T25BdXRoRVJSOiB0cnVlLFxuICAgICAgICB9XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidHJ5Ouiwg+eUqGxvZ2luXCIpXG4gICAgICAgICAgICBhd2FpdCBsb2dpbigpXG4gICAgICAgICAgICByZXR1cm4gc2VuZFJlcXVlc3QobywgYXV0aE9wdClcbiAgICAgICAgfSBjYXRjaChlcnIpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYXRjaFwiKVxuICAgICAgICAgICAgaWYoZXJyID09PSBBVVRIX0VSUiAmJiBhdXRoT3B0LnJlbnRleU9uQXV0aEVSUil7XG4gICAgICAgICAgICAgICAgYXV0aERhdGEudG9rZW4gPSAnJ1xuICAgICAgICAgICAgICAgIGF1dGhEYXRhLmV4cGlyeU1zID0gMFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5YaN5qyh6LCD55Soc2VuZFJlcXVlc3RXaXRoQXV0aFJldHJ5XCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbmRSZXF1ZXN0V2l0aEF1dGhSZXRyeShvLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaEF1dGhIZWFkZXI6IGF1dGhPcHQuYXR0YWNoQXV0aEhlYWRlcixcbiAgICAgICAgICAgICAgICAgICAgcmVudGV5T25BdXRoRVJSOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgLy/nmbvlvZXor7fmsYLkuJrliqFcbiAgICBleHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9naW4oKXtcbiAgICAgICAgLy/liKTmlq10b2tlbuaYr+WQpuacieaViO+8jOaXoOaViOmcgOimgeeZu+W9leivt+axglxuICAgICAgICBjb25zb2xlLmxvZyhcIuWIpOaWrXRva2Vu5piv5ZCm5pyJ5pWIXCIpXG4gICAgICAgIGlmIChhdXRoRGF0YS50b2tlbiAmJiBhdXRoRGF0YS5leHBpcnlNcyA+PSBEYXRlLm5vdygpKSB7XG4gICAgICAgICAgICByZXR1cm4gXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCLosIPnlKh3eExvZ2luZ1wiKVxuICAgICAgICBjb25zdCB3eFJlc3AgPSBhd2FpdCB3eExvZ2luZygpICAvL2xvZ2luXG4gICAgICAgIGNvbnN0IHJlcVRpbWVNcyA9IERhdGUubm93KCkgICAgIC8vZ2V0bmV3dGltZVxuICAgICAgICAvL+iwg+eUqOS4muWKoeaWueazlVxuICAgICAgICBjb25zb2xlLmxvZyhcIuiwg+eUqHNlbmRSZXF1ZXN05pa55rOVXCIpXG4gICAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBzZW5kUmVxdWVzdDxhdXRoLnYxLklMb2dpblJlcXVlc3QsIGF1dGgudjEuSUxvZ2luUmVzcG9uc2U+ICh7XG4gICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxuICAgICAgICAgICAgcGF0aDogJy92MS9hdXRoL2xvZ2luJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBjb2RlOiB3eFJlc3AuY29kZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXNwTWFyc2hhbGxlcjogYXV0aC52MS5Mb2dpblJlc3BvbnNlLmZyb21PYmplY3QsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGF0dGFjaEF1dGhIZWFkZXI6IGZhbHNlLFxuICAgICAgICAgICAgcmVudGV5T25BdXRoRVJSOiBmYWxzZSxcbiAgICAgICAgfSlcbiAgICAgICAgY29uc29sZS5sb2coXCJjb2RlOlwiLHd4UmVzcC5jb2RlKVxuICAgICAgICBjb25zb2xlLmxvZyhcInJlc3A6XCIscmVzcClcbiAgICAgICAgY29uc29sZS5sb2coXCLph43nva50b2tlblwiKVxuICAgICAgICBhdXRoRGF0YS50b2tlbiA9IHJlc3AuYWNjc3NUb2tlbiFcbiAgICAgICAgLy/orr7nva50b2tlbuacieaViOaXtumXtFxuICAgICAgICBhdXRoRGF0YS5leHBpcnlNcyA9IHJlcVRpbWVNcyArIHJlc3AuZXhwaXJlc0luISAqIDEwMDBcbiAgICAgICAgY29uc29sZS5sb2coXCJsb2dpbue7k+adn1wiKVxuICAgIH1cblxuICAgIC8v5YaF6YOo6K+35rGC5Lia5Yqh5pa55rOV77yM55m75b2V6K+35rGC5LiK5Lyg55u45bqU5pWw5o2u5Yiw5ZCO5Y+w77yM5ZCO5Y+w6L+U5ZuedG9rZW7lkoxleHBpcnlNc1xuICAgIGZ1bmN0aW9uIHNlbmRSZXF1ZXN0PFJFUSwgUkVTPihvOiByZXF1ZXN0T3B0aW9uPFJFUSwgUkVTPiwgYTogQXV0aE9wdGlvbik6IFByb21pc2U8UkVTPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBoZWFkZXI6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fSAgLy/lo7DmmI5oZWFkZXLnmoTkuIDnp43mlrnlvI9cbiAgICAgICAgICAgIGlmKGEuYXR0YWNoQXV0aEhlYWRlcikge1xuICAgICAgICAgICAgICAgIGlmIChhdXRoRGF0YS50b2tlbiAmJiBhdXRoRGF0YS5leHBpcnlNcyA+PSBEYXRlLm5vdygpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vaGVhZGVyLmF1dGhvcml6YXRpb24gPSAnQmVhcmVyICcgKyBhdXRoRGF0YS50b2tlblxuICAgICAgICAgICAgICAgICAgICBoZWFkZXIuYXV0aG9yaXphdGlvbiA9IFwiQmVhcmVyIFwiICsgYXV0aERhdGEudG9rZW5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0b2tlbuacieaViDogXCIsIGhlYWRlci50b2tlbilcbiAgICAgICAgICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChBVVRIX0VSUilcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0b2tlbuaXoOaViFwiKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgdXJsOiBzZXJ2ZXJBZGRyICsgby5wYXRoLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogby5tZXRob2QsXG4gICAgICAgICAgICAgICAgZGF0YTogby5kYXRhLFxuICAgICAgICAgICAgICAgIGhlYWRlcixcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGF0YTpcIixvLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PT0gNDAxKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChBVVRIX0VSUilcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiNDAx55qE54q25oCBXCIpXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHJlcy5zdGF0dXNDb2RlID49IDQwMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVzKVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoby5yZXNwTWFyc2hhbGxlcihjYW1lbGNhc2VLZXlzKHJlcy5kYXRhIGFzIG9iamVjdCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZXA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSkpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG4gICAgXG4gICAgLy/osIPnlKjlvq7kv6FhcGnnmbvlvZXkuJrliqFcbiAgICBmdW5jdGlvbiB3eExvZ2luZygpOlByb21pc2U8V2VjaGF0TWluaXByb2dyYW0uTG9naW5TdWNjZXNzQ2FsbGJhY2tSZXN1bHQ+e1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT57XG4gICAgICAgICAgICB3eC5sb2dpbih7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogcmVzb2x2ZSxcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3QsXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgVXBsb2FkRmlsZU9wdHMge1xuICAgICAgICBsb2NhbFBhdGg6IHN0cmluZ1xuICAgICAgICB1cmw6IHN0cmluZ1xuICAgIH1cbiAgICBleHBvcnQgZnVuY3Rpb24gdXBsb2FkZmlsZShvOiBVcGxvYWRGaWxlT3B0cyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBkYXRhID0gd3guZ2V0RmlsZVN5c3RlbU1hbmFnZXIoKS5yZWFkRmlsZVN5bmMoby5sb2NhbFBhdGgpXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgICAgICAgIHVybDogby51cmwsXG4gICAgICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPj0gNDAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVzKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuICAgXG4gICAgXG59XG4iXX0=