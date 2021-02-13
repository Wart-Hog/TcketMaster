"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var uuid_1 = require("uuid");
exports.router = express_1.default.Router();
var db = require('../../DB.json');
var fs = require('fs');
exports.router.get('', function (_, res) {
    res.json("ciao");
});
exports.router.post('', function (_a, res) {
    var _b = _a.body, type = _b.type, place = _b.place, dateTime = _b.dateTime;
    var event = {
        id: uuid_1.v4(),
        type: type,
        place: place,
        dateTime: dateTime
    };
    db = db.concat(event);
    var newDb = JSON.stringify(db);
    console.log(event);
    console.log(newDb);
    fs.writeFileSync('DB.json', newDb);
    res.json("ok");
});
