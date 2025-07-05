import { Router } from "express";
import start_container from "./start_container";
import create_container from "./create_container";
import stop_container from "./stop_container";
import delete_container from "./delete_container";


const routerModule = {
    start_container,
    create_container,
    stop_container,
    delete_container
};

export default routerModule;