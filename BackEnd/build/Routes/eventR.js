"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var uuid_1 = require("uuid");
exports.router = express_1.default.Router();
var events_list = require('../../events_list.json');
var fs = require('fs');
exports.router.get('', function (_, res) {
    res.json(events_list);
});
exports.router.get('/:id', function (_a, res) {
    var id = _a.params.id;
    var event = events_list.find(function (item) { return item.id == id; });
    if (!event)
        res.status(404).json({ message: "resource not found" });
    res.json(event);
});
exports.router.post('', function (_a, res) {
    var _b = _a.body, type = _b.type, place = _b.place, dateTime = _b.dateTime;
    var event = {
        id: uuid_1.v4(),
        type: type,
        place: place,
        dateTime: dateTime
    };
    events_list = events_list.concat(event);
    var new_events_list = JSON.stringify(events_list);
    console.log(event);
    console.log(new_events_list);
    fs.writeFileSync('events_list.json', new_events_list);
    res.json("ok");
});
exports.router.delete('', function (_a, res) {
    var id = _a.body.id;
    var toDelete = events_list.find(function (item) { return item.id == id; });
    if (!toDelete)
        res.status(404).json({ message: "resource not found" });
    events_list.splice(toDelete, 1);
    var new_events_list = JSON.stringify(events_list);
    fs.writeFileSync('events_list.json', new_events_list);
    res.status(201).json({ message: "resource deleted" });
});
