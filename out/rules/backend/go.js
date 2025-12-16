"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goRules = void 0;
exports.goRules = [
    {
        id: "GO-ERR-01",
        area: "Error Handling",
        principle: "Explicit Errors",
        severity: "CRITICAL",
        appliesTo: { language: ["go"], scope: ["backend"] },
        check: (code) => /_ =\s*\w+\(/.test(code),
        message: "Ignored error return detected. Every error must be checked.",
        rationale: "Silent failures are dangerous in Go.",
    },
];
//# sourceMappingURL=go.js.map