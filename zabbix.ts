export default class ZabbixApi {
  api_url: string;
  /**
   * @param id - Request Id
   */
  id: number;
  /**
   * @param auth_token - Authentication api token to use on zabbix
   */
  token: string | undefined;

  constructor(token: string, api_url: string) {
    this.api_url = api_url;
    this.token = token
    this.id = 0;
  }

  public async request(
    method: string,
    params: Record<string, any>,
  ): Promise<any> {
    params.output = params.output || "extend";
    const data = {
      method: method,
      params: params,
    };

    const response = await this.post(data);
    return this.wrap(response);
  }

  private async post(data: Record<string, any>): Promise<Response> {
    data.jsonrpc = "2.0";
    data.id = ++this.id;

    const options: RequestInit = {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`
      },
      body: JSON.stringify(data),
    };

    return await fetch(this.api_url, options);
  }


  private async wrap(response: Response): Promise<any> {
    if (!response.ok) {
      throw new Error(`HTTP request error. statusCode: ${response.status}`);
    }

    const body = await response.json();
    return body.result;
  }
}
