"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var middlewere_1 = require("../middle/middlewere");
var uuid_1 = require("uuid");
var bluebird_1 = __importDefault(require("bluebird"));
exports.router = express_1.default.Router();
var TokenGenerator = require('uuid-token-generator');
var token = new TokenGenerator();
var users_list = require('../../users_list.json');
var fs = bluebird_1.default.promisifyAll(require('fs'));
exports.router.get('', function (_, res) {
    res.status(200).json(users_list);
});
exports.router.get('/:username', middlewere_1.checkTokenHeader, middlewere_1.findUserIndex, function (_, res) {
    var usernameIndex = res.locals.usernameIndex;
    res.json(users_list[usernameIndex]);
});
exports.router.put('/:username', function (_a, res) {
    var admin = _a.body.admin;
    var usernameIndex = res.locals.usernameIndex;
    users_list[usernameIndex].admin = admin;
    middlewere_1.writeOnJson('users_list.json', users_list, res);
});
exports.router.post('', function (_a, res) {
    var _b = _a.body, name = _b.name, username = _b.username, password = _b.password, _c = _b.tickets, tickets = _c === void 0 ? [] : _c;
    var user = {
        name: name,
        username: username,
        password: password,
        tickets: tickets,
        admin: false
    };
    users_list = users_list.concat(user);
    middlewere_1.writeOnJson('users_list.json', users_list, res);
});
exports.router.post('/login', function (_a, res) {
    var _b = _a.body, username = _b.username, password = _b.password;
    var newtoken = token.generate();
    var userIndex = users_list.findIndex(function (item) {
        return item.username === username && item.password === password;
    });
    if (userIndex == -1)
        return res.status(404).json({ message: "user not found" });
    users_list[userIndex].token = newtoken;
    var new_users_list = JSON.stringify(users_list, null, 2);
    fs.writeFileSync('users_list.json', new_users_list);
    res.json(newtoken);
});
exports.router.post('/:username/tickets', middlewere_1.checkTokenHeader, middlewere_1.findUserIndex, function (_a, res) {
    var eventId = _a.body.eventId;
    var readList = JSON.parse(fs.readFileSync('events_list.json'));
    var event = readList.find(function (item) { return item.id == eventId; });
    if (!event)
        return res.status(404).json({ message: "event not found" });
    var usernameIndex = res.locals.usernameIndex;
    var newticket = {
        id: uuid_1.v4(),
        event: event
    };
    users_list[usernameIndex].tickets.push(newticket);
    middlewere_1.writeOnJson('users_list.json', users_list, res);
});
exports.router.delete('/:username/tickets/:ticketId', middlewere_1.checkTokenHeader, middlewere_1.findUserIndex, function (_a, res) {
    var ticketId = _a.params.ticketId;
    var usernameIndex = res.locals.usernameIndex;
    var ticket = users_list[usernameIndex].tickets.findIndex(function (item) { return item.id == ticketId; });
    if (ticket === -1)
        return res.status(404).json({ message: "ticket not found" });
    users_list[usernameIndex].tickets.splice(ticket, 1);
    middlewere_1.writeOnJson('users_list.json', users_list, res);
});
exports.router.get('/:username/tickets', middlewere_1.checkTokenHeader, middlewere_1.findUserIndex, function (_, res) {
    var usernameIndex = res.locals.usernameIndex;
    res.json(users_list[usernameIndex].tickets);
});
exports.router.delete('/:username', middlewere_1.checkTokenHeader, middlewere_1.findUserIndex, function (_, res) {
    var usernameIndex = res.locals.usernameIndex;
    users_list.splice(usernameIndex, 1);
    middlewere_1.writeOnJson('users_list.json', users_list, res);
});
