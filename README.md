# Zabbix API Wrapper

A TypeScript wrapper for the Zabbix API that makes it easy to interact with your Zabbix server.

## Installation

```sh
npm i zabbix-api-wrapper
# or
yarn add zabbix-api-wrapper
# or
pnpm add zabbix-api-wrapper
```

## Usage

```typescript
import * as ZabbixApi from "zabbix-api-wrapper";

// Initialize the API client
const zabbix = new ZabbixApi.ZabbixApi(
    "your-auth-token",
    "http://your-zabbix-server/api_jsonrpc.php"
);

// Example: Get host information
const host = await zabbix.request(
    "host.get", // the method
    { // The parameters
        output: ["host", "hostId"],
        selectTags: 'extend',
        filter: {
            host: ["your-host"],
        },
    }
);
```

Refer to [Zabbix API Docs](https://www.zabbix.com/documentation/current/en/manual/api/reference) on methods and parameters

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](./LISENCE)
