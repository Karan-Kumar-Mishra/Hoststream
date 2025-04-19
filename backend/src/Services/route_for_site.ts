import server from "./get_server";
import { locations } from "../Data/data";
import Database from "../Database";
import express from "express";
import path from "path";
import { site_type } from "../Data/types.js";
import Redis from "../Redis";
export default function route_for_site(site: site_type, user_id: string) {

    server.use(`${site.route}`, express.static(path.join(__dirname, "..", site.site_folder)));
    server.get(`${site.route}`, (req, res) => {

        const filePath = path.join(__dirname, "..", site.site_folder, "index.html");
        console.log("file path: ", filePath);

        res.sendFile(filePath, (err) => {
            if (err) {
                console.error(`Error sending file: ${err.message}`);
                res.status(404).send("File not found");
            }
        });
    });
}
/*
  this methode is not efficient 
  i trying to use the other methode where 
  i save the context of each site in realtime database 
*/
