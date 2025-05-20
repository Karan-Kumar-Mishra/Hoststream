"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = remove_items;
const Data_1 = require("../Data");
async function remove_items(item_id) {
    const client = await (0, Data_1.get_redis)();
    if (!client)
        return;
    const items = await client.lRange('WebList', 0, -1);
    for (const itemString of items) {
        try {
            const item = JSON.parse(itemString);
            if (item.id === item_id) {
                await client.lRem('WebList', 1, itemString);
                return;
            }
        }
        catch (error) {
            console.error('Error parsing list item:', error);
        }
    }
}
