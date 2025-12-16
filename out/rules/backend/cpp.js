"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cppRules = void 0;
exports.cppRules = [
    {
        id: "CPP-RAII-01",
        area: "Memory Management",
        principle: "RAII",
        severity: "BLOCKER",
        appliesTo: { language: ["cpp"] },
        check: (code) => /\bnew\b|\bdelete\b/.test(code),
        message: "Raw new/delete detected. Use RAII and smart pointers.",
        rationale: "Prevents memory leaks and undefined behavior.",
    },
];
//# sourceMappingURL=cpp.js.map