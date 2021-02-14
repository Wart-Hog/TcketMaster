"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDate = void 0;
var validationResult = require('express-validator').validationResult;
var moment_1 = __importDefault(require("moment"));
var myValidationResult = validationResult.withDefaults({
    formatter: function (error) {
        return {
            myLocation: error.location,
        };
    },
});
var checkDate = function (date) {
    var aDate = moment_1.default(date, 'DD/MM/YYYY');
    return aDate.isValid();
};
exports.checkDate = checkDate;
exports.myValidationResult;
