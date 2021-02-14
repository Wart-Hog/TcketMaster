"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var usersR_1 = require("./Routes/usersR");
var eventR_1 = require("./Routes/eventR");
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var options = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'token',
        'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: "http://localhost:4200",
    preflightContinue: false,
};
app.use(cors_1.default(options));
module.exports = app.listen(3005);
app.use('/events', eventR_1.router);
app.use('/users', usersR_1.router);
