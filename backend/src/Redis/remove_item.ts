import { redis_item_type } from "../Data/types";
import { get_redis } from "../Data/data";
export default async function remove_items(item_key:redis_item_type) {
    const client= get_redis();
    const itemString = JSON.stringify(item_key);
    return (await client)?.LREM('WebList',1,itemString);
}