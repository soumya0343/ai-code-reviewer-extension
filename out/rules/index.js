"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allRules = void 0;
const react_1 = require("./frontend/react");
const flutter_1 = require("./frontend/flutter");
const go_1 = require("./backend/go");
const nodejs_1 = require("./backend/nodejs");
const java_1 = require("./backend/java");
const cpp_1 = require("./backend/cpp");
exports.allRules = [
    ...react_1.reactRules,
    ...flutter_1.flutterRules,
    ...go_1.goRules,
    ...nodejs_1.nodeRules,
    ...java_1.javaRules,
    ...cpp_1.cppRules,
];
//# sourceMappingURL=index.js.map