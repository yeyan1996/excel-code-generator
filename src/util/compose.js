"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function compose() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function (arg) {
        return fns.reduceRight(function (pre, cur) {
            return cur(pre);
        }, arg);
    };
}
exports.compose = compose;
