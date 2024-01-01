"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ZabbixApi {
    user;
    password;
    api_url;
    id;
    auth_token;
    constructor(user, password, api_url) {
        this.user = user;
        this.password = password;
        this.api_url = api_url;
        this.id = 0;
    }
    async request(method, params, token) {
        await this.auth();
        params.output = params.output || "extend";
        const data = {
            method: method,
            params: params,
            auth: token ?? this.auth_token ?? null,
        };
        if (data.auth === null) {
            throw new Error("Missing auth token, run `login` or provide a token");
        }
        const response = await this.post(data);
        return this.wrap(response);
    }
    async login() {
        await this.auth();
        return this.auth_token || null;
    }
    async post(data) {
        data.jsonrpc = "2.0";
        data.id = ++this.id;
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json-rpc" },
            body: JSON.stringify(data),
        };
        return await fetch(this.api_url, options);
    }
    async auth() {
        if (!this.auth_token) {
            const data = {
                method: "user.login",
                params: { user: this.user, password: this.password },
            };
            const response = await this.post(data);
            if (!response.ok) {
                throw new Error(`HTTP request error. statusCode: ${response.status}`);
            }
            const body = await response.json();
            this.auth_token = body.result;
        }
    }
    async wrap(response) {
        if (!response.ok) {
            throw new Error(`HTTP request error. statusCode: ${response.status}`);
        }
        const body = await response.json();
        return body.result;
    }
}
exports.default = ZabbixApi;
//# sourceMappingURL=zabbix.js.map