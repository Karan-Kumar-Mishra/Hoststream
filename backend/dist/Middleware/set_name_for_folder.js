"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = set_name_for_folder;
function set_name_for_folder(req, res, next) {
    // if(req.body.for)
    //{   
    console.log("body in middleware:", req.body);
    //}
    next();
}
