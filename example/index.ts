import ZabbixApi from "../lib";

const zabbix = new ZabbixApi("customer", "RacomDemo1234"," http://demo-zabbix.racom.eu/zabbix/api_jsonrpc.php")

zabbix.login().then((value) => {
    console.log(value)
})