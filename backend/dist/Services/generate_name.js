"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generate_name;
function generate_name(length = 5) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomName = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomName += characters[randomIndex];
    }
    return randomName;
}
