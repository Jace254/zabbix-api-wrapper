export default class ZabbixApi {
    api_url: string;
    id: number;
    token: string | undefined;
    constructor(token: string, api_url: string);
    request(method: string, params: Record<string, any>): Promise<any>;
    private post;
    private wrap;
}
