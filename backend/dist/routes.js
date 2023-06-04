"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
exports.router = (0, express_1.Router)();
const Post = require('./Models/Post');
const User = require('./Models/User');
exports.router.get('/', (req, res) => {
    res.json({ serverWorking: true });
});
exports.router.get('/get-the-user', authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield User.findById(res.locals.user._id);
    res.json(user);
}));
exports.router.post('/add-post', authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newPost = req.body;
    console.log(newPost, ' -=-=');
    newPost.userId = res.locals.user._id;
    Post.create(newPost).then((post) => {
        res.json(post);
    });
}));
exports.router.get('/all-the-posts', (req, res) => {
    Post.find().populate('userId').then((posts) => {
        res.json(posts);
    });
});
exports.router.post('/authenticate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userJwt = (0, jwt_decode_1.default)(req.body.credential);
    const { sub, email, name, picture } = userJwt;
    let user = yield User.findOne({ sub, email });
    if (!user) {
        user = yield User.create({ sub, email, name, picture });
    }
    jsonwebtoken_1.default.sign({ user }, 'secret key', { expiresIn: '30min' }, (err, token) => {
        res.json({ user, token });
    });
}));
exports.router.put('/lambda', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('lamda hit');
    console.log(req.body);
}));
//Middle ware >>> Put this in the middle of any route where you want to authorize
function authorize(req, res, next) {
    let token = req.headers.authorization && req.headers.authorization.split(' ')[1]; //Token from front end 
    if (token) {
        jsonwebtoken_1.default.verify(token, 'secret key', (err, data) => {
            if (!err) {
                res.locals.user = data.user; //Set global variable with user data in the backend 
                next();
                return;
            }
            else {
                return res.status(403).json({ message: err });
            }
        });
    }
    else {
        return res.status(403).json({ message: "Must be logged in!" });
    }
}
// module.exports = router
