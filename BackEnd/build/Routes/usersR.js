"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
exports.router.put('/:username', middlewere_1.findUserIndex, function (_a, res) {
    var admin = _a.body.admin;
    var usernameIndex = res.locals.usernameIndex;
    users_list[usernameIndex].admin = admin;
    middlewere_1.writeOnJson('users_list.json', users_list, res);
});
exports.router.post('', middlewere_1.newUserValidator, middlewere_1.myValidationResult, middlewere_1.validateUsername, function (_a, res) {
    var _b = _a.body, name = _b.name, username = _b.username, password = _b.password, _c = _b.tickets, tickets = _c === void 0 ? [] : _c, admin = _b.admin;
    return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    admin = admin == undefined ? false : admin;
                    user = {
                        name: name,
                        username: username,
                        password: password,
                        tickets: tickets,
                        admin: admin
                    };
                    users_list = users_list.concat(user);
                    return [4 /*yield*/, fs.writeFileSync('users_list.json', JSON.stringify(users_list, null, 2))];
                case 1:
                    _d.sent();
                    return [2 /*return*/, res.status(201).json({ message: "writed" })];
            }
        });
    });
});
exports.router.post('/login', function (_a, res) {
    var _b = _a.body, username = _b.username, password = _b.password;
    return __awaiter(void 0, void 0, void 0, function () {
        var newtoken, readList, userIndex, new_users_list;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    newtoken = token.generate();
                    return [4 /*yield*/, JSON.parse(fs.readFileSync('users_list.json'))];
                case 1:
                    readList = _c.sent();
                    userIndex = readList.findIndex(function (item) {
                        return item.username === username && item.password === password;
                    });
                    if (userIndex == -1)
                        return [2 /*return*/, res.status(404).json({ message: "user not found" })];
                    readList[userIndex].token = newtoken;
                    new_users_list = JSON.stringify(readList, null, 2);
                    return [4 /*yield*/, fs.writeFileSync('users_list.json', new_users_list)];
                case 2:
                    _c.sent();
                    res.status(201).json(newtoken);
                    return [2 /*return*/];
            }
        });
    });
});
exports.router.post('/:username/tickets', middlewere_1.checkTokenHeader, middlewere_1.findUserIndex, function (_a, res) {
    var eventId = _a.body.eventId;
    return __awaiter(void 0, void 0, void 0, function () {
        var readEventList, readUserList, event, usernameIndex, newticket;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, JSON.parse(fs.readFileSync('events_list.json'))];
                case 1:
                    readEventList = _b.sent();
                    return [4 /*yield*/, JSON.parse(fs.readFileSync('users_list.json'))];
                case 2:
                    readUserList = _b.sent();
                    event = readEventList.find(function (item) { return item.id == eventId; });
                    if (!event)
                        return [2 /*return*/, res.status(404).json({ message: "event not found" })];
                    usernameIndex = res.locals.usernameIndex;
                    newticket = {
                        id: uuid_1.v4(usernameIndex),
                        event: event
                    };
                    readUserList[usernameIndex].tickets.push(newticket);
                    return [4 /*yield*/, middlewere_1.writeOnJson('users_list.json', readUserList, res)];
                case 3:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
exports.router.delete('/:username/tickets/:ticketId', middlewere_1.checkTokenHeader, middlewere_1.findUserIndex, function (_a, res) {
    var ticketId = _a.params.ticketId;
    return __awaiter(void 0, void 0, void 0, function () {
        var usernameIndex, readList, ticket;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    usernameIndex = res.locals.usernameIndex;
                    return [4 /*yield*/, middlewere_1.readFromJson('users_list.json', res)];
                case 1:
                    readList = _b.sent();
                    ticket = readList[usernameIndex].tickets.findIndex(function (item) { return item.id == ticketId; });
                    if (ticket === -1)
                        return [2 /*return*/, res.status(404).json({ message: "ticket not found" })];
                    readList[usernameIndex].tickets.splice(ticket, 1);
                    middlewere_1.writeOnJson('users_list.json', readList, res);
                    return [2 /*return*/];
            }
        });
    });
});
exports.router.get('/:username/tickets', middlewere_1.checkTokenHeader, middlewere_1.findUserIndex, function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var readList, usernameIndex;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, middlewere_1.readFromJson('users_list.json', res)];
            case 1:
                readList = _a.sent();
                usernameIndex = res.locals.usernameIndex;
                res.json(readList[usernameIndex].tickets);
                return [2 /*return*/];
        }
    });
}); });
exports.router.delete('/:username', middlewere_1.checkTokenHeader, middlewere_1.findUserIndex, function (_, res) {
    var usernameIndex = res.locals.usernameIndex;
    users_list.splice(usernameIndex, 1);
    middlewere_1.writeOnJson('users_list.json', users_list, res);
});
