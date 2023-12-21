declare class ZabbixApi {
    user: string;
    password: string;
    api_url: string;
    id: number;
    auth_token: string | undefined;
    constructor(user: string, password: string, api_url: string);
    request(method: string, params: Record<string, any>, token?: string): Promise<any>;
    login(): Promise<string | null>;
    private post;
    private auth;
    private wrap;
}
export default ZabbixApi;
