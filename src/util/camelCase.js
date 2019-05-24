"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function camelCase(str) {
    return str.replace(/_(\w)/g, function (match) {
        return match.slice(1, 2).toUpperCase();
    });
}
exports.camelCase = camelCase;
//# sourceMappingURL=camelCase.js.map