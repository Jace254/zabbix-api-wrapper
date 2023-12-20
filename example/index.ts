import ZabbixApi from "../lib";

// replace with your own credentials
const zabbix = new ZabbixApi(
    "customer", 
    "RacomDemo1234",
    "http://example.com/zabbix/api_jsonrpc.php"
)

const login = async () => await zabbix.login().catch((r) => r)

const getHosts = async () => await  zabbix.request("hostgroup.get", {
    "output": "extend",
    "sortfield": "name"
}).catch((r) => r)

const fetchAlerts = async () => await zabbix.request("alert.get", {
    "output":"extend",
    "limit": 10
}).catch((r) => r)

const getActions = async () => await zabbix.request("action.get", {
    "filter": {"name": "ZABBIX Action"},
    "select_operations": "extend",
    "select_conditions": "extend",
    "output": "extend"
}).catch((r) => r)


const getProblems = async () =>
  await zabbix.request("problem.get", {
    output: "extend",
    selectAcknowledges: "extend", // Optionally include acknowledgements
    selectTags: "extend", // Optionally include tags
    limit: 10,
  }).catch((r) => r);


async function test() {
    const code = await login()

    console.log(`Logged in with token ${code}`)

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

