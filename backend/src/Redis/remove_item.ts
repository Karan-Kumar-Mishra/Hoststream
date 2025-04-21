import { redis_item_type } from "../Data/types";
import { get_redis } from "../Data/data";

export default async function remove_items(item_id: string) {
    const client = await get_redis();
    if (!client) return;

    const items = await client.lRange('WebList', 0, -1);


    for (const itemString of items) {
        try {
            const item: redis_item_type = JSON.parse(itemString);
            if (item.id === item_id) {

                await client.lRem('WebList', 1, itemString);
                return;
            }
        } catch (error) {
            console.error('Error parsing list item:', error);
        }
    }
}