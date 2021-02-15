"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var middlewere_1 = require("../middle/middlewere");
var uuid_1 = require("uuid");
exports.router = express_1.default.Router();
var TokenGenerator = require('uuid-token-generator');
var token = new TokenGenerator();
var events_list = require('../../events_list.json');
var users_list = require('../../users_list.json');
var fs = require('fs');
exports.router.get('', function (_, res) {
    res.status(200).json(users_list);
});
exports.router.get('/:username', middlewere_1.checkTokenHeader, function (_a, res) {
    var username = _a.params.username;
    var user = users_list.find(function (item) { return item.username == username; });
    if (!user)
        return res.status(404).json({ message: "resource not found" });
    res.json(user);
});
exports.router.post('', function (_a, res) {
    var _b = _a.body, name = _b.name, username = _b.username, password = _b.password, _c = _b.tickets, tickets = _c === void 0 ? [] : _c;
    var user = {
        name: name,
        username: username,
        password: password,
        tickets: tickets,
    };
    users_list = users_list.concat(user);
    var new_users_list = JSON.stringify(users_list, null, 2);
    fs.writeFileSync('users_list.json', new_users_list);
    res.json("created");
});
exports.router.post('/login', function (_a, res) {
    var _b = _a.body, username = _b.username, password = _b.password;
    console.log(username);
    console.log(password);
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
exports.router.post('/:username/tickets', middlewere_1.checkTokenHeader, function (_a, res) {
    var eventId = _a.body.eventId, username = _a.params.username;
    var event = events_list.find(function (item) { return item.id == eventId; });
    if (!event)
        return res.status(404).json({ message: "event not found" });
    var userIndex = users_list.findIndex(function (item) { return item.username == username; });
    if (userIndex == -1)
        return res.status(404).json({ message: "user not found" });
    var newticket = {
        id: uuid_1.v4(),
        event: event
    };
    users_list[userIndex].tickets.push(newticket);
    var new_users_list = JSON.stringify(users_list, null, 2);
    fs.writeFileSync('users_list.json', new_users_list);
    res.json({ message: "ticket created" });
});
exports.router.get('/:username/tickets', middlewere_1.checkTokenHeader, function (_a, res) {
    var username = _a.params.username;
    var usernameIndex = users_list.findIndex(function (item) { return item.username == username; });
    if (usernameIndex == -1)
        return res.status(404).json({ message: "user not found" });
    res.json(users_list[usernameIndex].tickets);
});
exports.router.delete('/', middlewere_1.checkTokenHeader, function (_a, res) {
    var username = _a.body.username;
    var toDeleted = users_list.find(function (item) { return item.username == username; });
    if (!toDeleted)
        return res.status(404).json({ message: "resource not found" });
    users_list = users_list.splice(toDeleted, 1);
    var new_users_list = JSON.stringify(users_list, null, 2);
    fs.writeFileSync('users_list.json', new_users_list);
    res.status(201).json({ message: "resource deleted" });
});
