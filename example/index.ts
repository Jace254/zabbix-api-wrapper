import * as ZabbixApi from "../lib";

// replace with your own credentials
const zabbix = new ZabbixApi.ZabbixApi(
    "cd88c094883d2676bf1010932bd03dea6a0a8e57c53917946a44b114d29f9c50",
    "http://172.16.6.2/api_jsonrpc.php",
)


const getHosts = async () => await  zabbix.request("hostgroup.get", {
    "output": "extend",
    "sortfield": "name"
}
).catch((r: any) => r)

const fetchAlerts = async () => await zabbix.request("alert.get", {
    "output":"extend",
    "limit": 10
}).catch((r: any) => r)

const getActions = async () => await zabbix.request("action.get", {
    "filter": {"name": "ZABBIX Action"},
    "select_operations": "extend",
    "select_conditions": "extend",
    "output": "extend"
}).catch((r: any) => r)


const getProblems = async () =>
  await zabbix.request("problem.get", {
    output: "extend",
    selectAcknowledges: "extend", // Optionally include acknowledgements
    selectTags: "extend", // Optionally include tags
    limit: 10,
  }).catch((r: any) => r);


async function test() {
    const hosts = await getHosts()

    console.log(`hosts: ${JSON.stringify(hosts,null, 2)}`)

    const alerts = await fetchAlerts()

    console.log(`alerts ${alerts}`)

    const actions = await getActions()

    console.log(`actions ${actions}`)

    const problems = await getProblems();

    console.log(`problems ${JSON.stringify(problems, null, 2)}`);
}

test()

