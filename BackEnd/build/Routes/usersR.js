"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
var events_list = require('../../events_list.json');
var users_list = require('../../users_list.json');
var fs = require('fs');
exports.router.get('', function (_, res) {
    res.json(users_list);
});
exports.router.get('/:username', function (_a, res) {
    var username = _a.params.username;
    var user = users_list.find(function (item) { return item.username == username; });
    if (!user)
        res.status(404).json({ message: "resource not found" });
    res.json(user);
});
exports.router.post('', function (_a, res) {
    var _b = _a.body, name = _b.name, username = _b.username, password = _b.password, _c = _b.tickets, tickets = _c === void 0 ? [] : _c;
    var user = {
        name: name,
        username: username,
        password: password,
        tickets: tickets
    };
    users_list = users_list.concat(user);
    var new_users_list = JSON.stringify(users_list);
    fs.writeFileSync('users_list.json', new_users_list);
    res.json("ok");
});
exports.router.post('/:username/tickets', function (_a, res) {
    var eventId = _a.body.eventId, username = _a.params.username;
    var event = events_list.find(function (item) { return item.id == eventId; });
    if (!event)
        return res.status(404).json({ message: "event not found" });
    var userIndex = users_list.findIndex(function (item) { return item.username == username; });
    if (userIndex == -1)
        return res.status(404).json({ message: "user not found" });
    console.log(userIndex);
    users_list[userIndex].tickets.push(event);
    var new_users_list = JSON.stringify(users_list);
    fs.writeFileSync('users_list.json', new_users_list);
    res.json({ message: "ticket created" });
});
exports.router.get('/:username/tickets', function (_a, res) {
    var username = _a.params.username;
    var usernameIndex = users_list.findIndex(function (item) { return item.username == username; });
    if (usernameIndex == -1)
        return res.status(404).json({ message: "user not found" });
    res.json(users_list[usernameIndex].tickets);
});
exports.router.delete('/:username/tickets', function (_a, res) {
    var username = _a.params.username, eventId = _a.body.eventId;
    var usernameIndex = users_list.findIndex(function (item) { return item.username == username; });
    if (usernameIndex == -1)
        return res.status(404).json({ message: "user not found" });
    var ticketIndex = users_list[usernameIndex].tickets.findIndex(function (item) { return item.id == eventId; });
    if (ticketIndex == -1)
        return res.status(404).json({ message: "ticket not found" });
    users_list[usernameIndex].tickets.splice(ticketIndex, 1);
    var new_users_list = JSON.stringify(users_list);
    fs.writeFileSync('users_list.json', new_users_list);
    res.json({ message: "ticket deleted" });
});
exports.router.delete('/', function (_a, res) {
    var username = _a.body.username;
    var toDeleted = users_list.find(function (item) { return item.username == username; });
    if (!toDeleted)
        res.status(404).json({ message: "resource not found" });
    users_list = users_list.splice(toDeleted, 1);
    var new_users_list = JSON.stringify(users_list);
    fs.writeFileSync('users_list.json', new_users_list);
    res.status(201).json({ message: "resource deleted" });
});
