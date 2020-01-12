"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function camelcase(str) {
    return str.replace(/_(\w)/g, function (match) {
        return match.slice(1, 2).toUpperCase();
    });
}
exports.camelcase = camelcase;
