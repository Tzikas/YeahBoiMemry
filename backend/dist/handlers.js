"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupHandler = exports.helloHandler = exports.rootHandler = void 0;
const helloBuilder = name => ({ hello: name });
const rootHandler = (_req, res) => {
    return res.send('API is working 🤓');
};
exports.rootHandler = rootHandler;
const helloHandler = (req, res) => {
    const { params } = req;
    const { name = 'World' } = params;
    const response = helloBuilder(name);
    return res.json(response);
};
exports.helloHandler = helloHandler;
const signupHandler = (req, res) => {
    const { params } = req;
    console.log('sign up', req.body);
    return res.json({ body: req.body });
};
exports.signupHandler = signupHandler;
