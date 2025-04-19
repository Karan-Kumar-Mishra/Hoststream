import { redis_item_type } from "../Data/types";
import { get_redis } from "../Data/data";

export default async function find_item_by_route(route: string): Promise<redis_item_type | null> {
    const client = await get_redis();
    const allItems = await client?.LRANGE('WebList', 0, -1);

    if (!allItems) return null;

    for (const [key, value] of Object.entries(allItems)) {
        const item: redis_item_type = JSON.parse(value);
        
        console.log("key route: ",route,"item routes: ",item.route," ans-> ",(item.route == route))
        if (item.route == route) {
            return item;
        }
    }

    return null;
}