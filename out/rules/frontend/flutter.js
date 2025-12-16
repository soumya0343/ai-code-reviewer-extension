"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flutterRules = void 0;
exports.flutterRules = [
    {
        id: "FLUTTER-IMM-01",
        area: "Immutability",
        principle: "Predictable State",
        severity: "CRITICAL",
        appliesTo: {
            language: ["dart"],
            framework: ["flutter"],
            scope: ["frontend"],
        },
        check: (code) => /extends\s+(StatelessWidget|StatefulWidget)[\s\S]*?[^final]\s+\w+;/.test(code),
        message: "All widget configuration fields must be marked final.",
        rationale: "Ensures immutability and allows Flutter engine optimizations.",
    },
];
//# sourceMappingURL=flutter.js.map