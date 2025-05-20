"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = find_item_by_route;
const Data_1 = require("../Data");
async function find_item_by_route(domain_key) {
    const client = await (0, Data_1.get_redis)();
    const allItems = await client?.LRANGE('WebList', 0, -1);
    if (!allItems)
        return null;
    for (const [key, value] of Object.entries(allItems)) {
        const item = JSON.parse(value);
        //  console.log("key route: ",domain_key,"item routes: ",item.route," ans-> ",(item.route == domain_key))
        if (item.domain == domain_key) {
            return item;
        }
    }
    return null;
}
