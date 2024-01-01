export default class ZabbixApi {
  user: string;
  password: string;
  api_url: string;
  /**
   * @param id - Request Id
   */
  id: number;
  /**
   * @param auth_token - Authentication api token to use on zabbix
   */
  auth_token: string | undefined;

  constructor(user: string, password: string, api_url: string) {
    this.user = user;
    this.password = password;
    this.api_url = api_url;
    this.id = 0;
  }

  public async request(
    method: string,
    params: Record<string, any>,
    token?: string
  ): Promise<any> {
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

  public async login(): Promise<string | null> {
    await this.auth();
    return this.auth_token || null;
  }

  private async post(data: Record<string, any>): Promise<Response> {
    data.jsonrpc = "2.0";
    data.id = ++this.id;

    const options: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json-rpc" },
      body: JSON.stringify(data),
    };

    return await fetch(this.api_url, options);
  }

  private async auth(): Promise<void> {
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

  private async wrap(response: Response): Promise<any> {
    if (!response.ok) {
      throw new Error(`HTTP request error. statusCode: ${response.status}`);
    }

    const body = await response.json();
    return body.result;
  }
}
