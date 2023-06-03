"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    post: String,
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }
});
module.exports = (0, mongoose_1.model)('Post', postSchema);
