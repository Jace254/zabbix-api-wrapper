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
class ZabbixApi {
    constructor(user, password, api_url) {
        this.user = user;
        this.password = password;
        this.api_url = api_url;
        this.id = 0;
    }
    request(method, params, token) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.auth();
            params.output = params.output || "extend";
            const data = {
                method: method,
                params: params,
                auth: (_a = token !== null && token !== void 0 ? token : this.auth_token) !== null && _a !== void 0 ? _a : null,
            };
            if (data.auth === null) {
                throw new Error("Missing auth token, run `login` or provide a token");
            }
            const response = yield this.post(data);
            return this.wrap(response);
        });
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.auth();
            return this.auth_token || null;
        });
    }
    post(data) {
        return __awaiter(this, void 0, void 0, function* () {
            data.jsonrpc = "2.0";
            data.id = ++this.id;
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json-rpc" },
                body: JSON.stringify(data),
            };
            return yield fetch(this.api_url, options);
        });
    }
    auth() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.auth_token) {
                const data = {
                    method: "user.login",
                    params: { user: this.user, password: this.password },
                };
                const response = yield this.post(data);
                if (!response.ok) {
                    throw new Error(`HTTP request error. statusCode: ${response.status}`);
                }
                const body = yield response.json();
                this.auth_token = body.result;
            }
        });
    }
    wrap(response) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!response.ok) {
                throw new Error(`HTTP request error. statusCode: ${response.status}`);
            }
            const body = yield response.json();
            return body.result;
        });
    }
}
exports.default = ZabbixApi;
//# sourceMappingURL=index.js.map