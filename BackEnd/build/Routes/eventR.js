"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var uuid_1 = require("uuid");
var _a = require('../middle/middlewere'), myValidationResult = _a.myValidationResult, checkDate = _a.checkDate;
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
    var _b = _a.body, name = _b.name, type = _b.type, place = _b.place, dateTime = _b.dateTime;
    var event = {
        name: name,
        id: uuid_1.v4(),
        type: type,
        place: place,
        dateTime: dateTime
    };
    if (!checkDate(dateTime))
        return res.status(400).json({ message: 'incorrect date' });
    if ((type == "music" || type == "sport" || type == "theatre")) {
        events_list = events_list.concat(event);
        var new_events_list = JSON.stringify(events_list, null, 2);
        fs.writeFileSync('events_list.json', new_events_list);
        res.json("succesfully recorded");
    }
    else {
        res.status(400).json({ message: "invalid body" });
    }
});
exports.router.delete('', function (_a, res) {
    var id = _a.body.id;
    var toDelete = events_list.find(function (item) { return item.id == id; });
    if (!toDelete)
        res.status(404).json({ message: "resource not found" });
    events_list = events_list.splice(toDelete, 1);
    var new_events_list = JSON.stringify(events_list);
    fs.writeFileSync('events_list.json', new_events_list);
    res.status(201).json({ message: "resource deleted" });
});
