import { redis_item_type } from "../Data/types";
import { get_redis } from "../Data/index";
export  default async function add_item(new_item:redis_item_type) {
    const client= get_redis();
    const itemString = JSON.stringify(new_item);
    return (await client)?.LPUSH('WebList',itemString);
}