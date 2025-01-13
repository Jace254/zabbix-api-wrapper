"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ZabbixApi {
    api_url;
    id;
    token;
    constructor(token, api_url) {
        this.api_url = api_url;
        this.token = token;
        this.id = 0;
    }
    async request(method, params) {
        params.output = params.output || "extend";
        const data = {
            method: method,
            params: params,
        };
        const response = await this.post(data);
        return this.wrap(response);
    }
    async post(data) {
        data.jsonrpc = "2.0";
        data.id = ++this.id;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify(data),
        };
        return await fetch(this.api_url, options);
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