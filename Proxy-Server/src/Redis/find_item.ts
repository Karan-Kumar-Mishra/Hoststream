import { redis_item_type } from "../Data/types";
import { get_redis } from "../Data";

export default async function find_item_by_route(domain_key: string): Promise<redis_item_type | null> {
    const client = await get_redis();
    const allItems = await client?.LRANGE('WebList', 0, -1);

    if (!allItems) return null;

    for (const [key, value] of Object.entries(allItems)) {
        const item: redis_item_type = JSON.parse(value);
        
      //  console.log("key route: ",domain_key,"item routes: ",item.route," ans-> ",(item.route == domain_key))
        if (item.domain == domain_key) {
            return item;
        }
    }

    return null;
}