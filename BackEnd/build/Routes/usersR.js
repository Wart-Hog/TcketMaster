"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
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
    var _b = _a.body, name = _b.name, username = _b.username, password = _b.password, _c = _b.events, events = _c === void 0 ? [] : _c;
    var user = {
        name: name,
        username: username,
        password: password,
        events: events
    };
    users_list = users_list.concat(user);
    var new_users_list = JSON.stringify(users_list);
    fs.writeFileSync('users_list.json', new_users_list);
    res.json("ok");
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
