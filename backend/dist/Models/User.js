"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    picture: String,
    sub: String
});
module.exports = (0, mongoose_1.model)('User', userSchema);
