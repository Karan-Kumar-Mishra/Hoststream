"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = route_for_site;
const get_server_1 = __importDefault(require("./get_server"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
function route_for_site(site) {
    get_server_1.default.use(`${site.route}`, express_1.default.static(path_1.default.join(__dirname, "..", site.site_folder)));
    get_server_1.default.get(`${site.route}`, (req, res) => {
        const filePath = path_1.default.join(__dirname, "..", site.site_folder, "index.html");
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
