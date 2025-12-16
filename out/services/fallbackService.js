"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runFallbackReview = runFallbackReview;
const ruleRunner_1 = require("../engine/ruleRunner");
function runFallbackReview(files, context) {
    const findings = (0, ruleRunner_1.runRulesOnFiles)(files, context);
    if (findings.length === 0) {
        return "🟢 No violations detected for selected context.";
    }
    return `
## 🔍 Offline Multi-File Code Review

**Files Reviewed:** ${files.length}
**Language:** ${context.language}
**Scope:** ${context.scope}
**Tech Stack:** ${context.techStack.join(", ")}

${findings
        .map((f) => `
- **${f.rule.severity}** [${f.rule.id}] (${f.filePath})
  - ${f.rule.message}
  - Principle: ${f.rule.principle}
  - Rationale: ${f.rule.rationale}
`)
        .join("\n")}
`;
}
//# sourceMappingURL=fallbackService.js.map