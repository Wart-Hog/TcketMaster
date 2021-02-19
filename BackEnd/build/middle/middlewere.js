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
exports.validateUsername = exports.readFromJson = exports.writeOnJson = exports.findUserIndex = exports.checkTokenHeader = exports.checkDate = exports.myValidationResult = exports.eventValidator = exports.newUserValidator = void 0;
var express_validator_1 = require("express-validator");
var users_list = require('../../users_list.json');
var moment_1 = __importDefault(require("moment"));
var bluebird_1 = __importDefault(require("bluebird"));
var fs = bluebird_1.default.promisifyAll(require('fs'));
var typeAcceppted = ["music", "sport", "theatre"];
exports.newUserValidator = [
    express_validator_1.check('name').trim().not().isEmpty().withMessage('name is required'),
    express_validator_1.check('username').trim().not().isEmpty().withMessage('username is required'),
    express_validator_1.check('password').trim().not().isEmpty().withMessage('password is required'),
    express_validator_1.check('password').trim().isLength({ min: 6 }).withMessage('password is must be 6 long')
];
exports.eventValidator = [
    express_validator_1.check('name').trim().not().isEmpty().withMessage('name is required'),
    express_validator_1.check('place').trim().not().isEmpty().withMessage('place is required'),
    express_validator_1.check('type').isIn(typeAcceppted).withMessage('select at least one category'),
    express_validator_1.check('dateTime').trim().not().isEmpty().withMessage('valid date is required'),
    express_validator_1.check('price').trim().not().isEmpty().withMessage('price is required'),
];
var myValidationResult = function (req, res, next) {
    var result = express_validator_1.validationResult(req);
    var hasErr = !result.isEmpty();
    if (hasErr) {
        var err = result.array()[0].msg;
        return res.status(400).json({ success: false, message: err });
    }
    next();
};
exports.myValidationResult = myValidationResult;
var checkDate = function (date) {
    var aDate = moment_1.default(date, 'DD/MM/YYYY');
    return aDate.isValid();
};
exports.checkDate = checkDate;
var checkTokenHeader = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var readList, userToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, JSON.parse(fs.readFileSync('users_list.json'))];
            case 1:
                readList = _a.sent();
                userToken = req.header('token');
                if (!userToken)
                    return [2 /*return*/, res.status(401).json('missing token')];
                if (readList.find(function (item) { return item.token === userToken; })) {
                    next();
                }
                else {
                    return [2 /*return*/, res.status(401).json('invalid token')];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.checkTokenHeader = checkTokenHeader;
var findUserIndex = function (_a, res, next) {
    var username = _a.params.username;
    return __awaiter(void 0, void 0, void 0, function () {
        var readList, usernameIndex;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, JSON.parse(fs.readFileSync('users_list.json'))];
                case 1:
                    readList = _b.sent();
                    usernameIndex = readList.findIndex(function (item) { return item.username == username; });
                    if (usernameIndex == -1)
                        return [2 /*return*/, res.status(404).json({ message: "user not found" })];
                    else {
                        res.locals.usernameIndex = usernameIndex;
                        next();
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.findUserIndex = findUserIndex;
var writeOnJson = function (path, value, res) { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fs.writeFileSync(path, JSON.stringify(value, null, 2))];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, res.status(400).json({ message: err_1 })];
            case 3: return [2 /*return*/, res.status(201).json({ message: "writed" })];
        }
    });
}); };
exports.writeOnJson = writeOnJson;
var readFromJson = function (path, res) { return __awaiter(void 0, void 0, void 0, function () {
    var readList, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, JSON.parse(fs.readFileSync(path))];
            case 1:
                readList = _a.sent();
                return [2 /*return*/, readList];
            case 2:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(400).json({ message: err_2 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.readFromJson = readFromJson;
var validateUsername = function (_a, res, next) {
    var username = _a.body.username;
    return __awaiter(void 0, void 0, void 0, function () {
        var readList;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, JSON.parse(fs.readFileSync('users_list.json'))];
                case 1:
                    readList = _b.sent();
                    if (readList.find(function (item) { return item.username == username; }))
                        return [2 /*return*/, res.status(400).json({ message: "username already in use" })];
                    else {
                        next();
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.validateUsername = validateUsername;
