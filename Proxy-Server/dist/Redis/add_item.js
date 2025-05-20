"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = add_item;
const index_1 = require("../Data/index");
async function add_item(new_item) {
    const client = (0, index_1.get_redis)();
    const itemString = JSON.stringify(new_item);
    return (await client)?.LPUSH('WebList', itemString);
}
