"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ticketsR_1 = require("./Routes/ticketsR");
var usersR_1 = require("./Routes/usersR");
var eventR_1 = require("./Routes/eventR");
var app = express_1.default();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
module.exports = app.listen(3005);
app.use('/tickets', ticketsR_1.router);
app.use('/events', eventR_1.router);
app.use('/users', usersR_1.router);