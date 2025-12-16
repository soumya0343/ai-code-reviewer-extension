"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.javaRules = void 0;
exports.javaRules = [
    {
        id: "JAVA-SRP-01",
        area: "OOP Design",
        principle: "SRP",
        severity: "BLOCKER",
        appliesTo: { language: ["java"], scope: ["backend"] },
        check: (code) => /class\s+\w+[\s\S]{1500,}/.test(code),
        message: "Large class detected. Likely violating Single Responsibility Principle.",
        rationale: "Large classes indicate multiple responsibilities.",
    },
];
//# sourceMappingURL=java.js.map