"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runRulesOnFiles = runRulesOnFiles;
const rules_1 = require("../rules");
const ruleMatcher_1 = require("./ruleMatcher");
function runRulesOnFiles(files, context) {
    const findings = [];
    for (const file of files) {
        for (const rule of rules_1.allRules) {
            // Pass file language for workspace reviews (when context.language is "mixed")
            if (!(0, ruleMatcher_1.ruleApplies)(rule, context, file.language))
                continue;
            if (rule.check(file.content)) {
                findings.push({
                    rule,
                    filePath: file.path,
                });
            }
        }
    }
    return findings;
}
//# sourceMappingURL=ruleRunner.js.map