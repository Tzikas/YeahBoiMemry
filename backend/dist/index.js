"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handlers_1 = require("./handlers");
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const URI = process.env.MONGODB_URI || 'mongodb://localhost/Pets';
mongoose_1.default
    .connect(URI)
    .then(x => console.log(`Connected to ${x.connections[0].name}`))
    .catch((err) => console.error("Error connecting to Mongo", err));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:3000", "https://yeahboi.netlify.app", "https://61o6pwyekh.execute-api.us-east-1.amazonaws.com", "https://61o6pwyekh.execute-api.us-east-1.amazonaws.com/dev", "https://61o6pwyekh.execute-api.us-east-1.amazonaws.com/dev/hello-world"] //Swap this with the client url 
}));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.get('/', handlers_1.rootHandler);
app.use('/api', routes_1.router);
const port = process.env.PORT || '8000';
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
}).on("error", console.error);
