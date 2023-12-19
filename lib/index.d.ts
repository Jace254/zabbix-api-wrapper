declare class ZabbixApi {
    private user;
    private password;
    private api_url;
    private id;
    private auth_token;
    constructor(user: string, password: string, api_url: string);
    request(method: string, params: Record<string, any>): Promise<any>;
    login(): Promise<string | null>;
    private post;
    private auth;
    private wrap;
}
export default ZabbixApi;
