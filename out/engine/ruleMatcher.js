"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ruleApplies = ruleApplies;
function ruleApplies(rule, ctx, fileLanguage) {
    // Use file language if context language is "mixed" (workspace review)
    const languageToCheck = ctx.language === "mixed" && fileLanguage ? fileLanguage : ctx.language;
    return ((!rule.appliesTo.language ||
        rule.appliesTo.language.includes(languageToCheck)) &&
        (!rule.appliesTo.scope || scopeMatches(rule.appliesTo.scope, ctx.scope)) &&
        (!rule.appliesTo.framework ||
            rule.appliesTo.framework.some((f) => ctx.techStack.some((tech) => tech.toLowerCase() === f.toLowerCase()))));
}
function scopeMatches(ruleScopes, contextScope) {
    if (contextScope === "both") {
        // If context scope is "both", rule applies if it applies to frontend OR backend
        return ruleScopes.includes("frontend") || ruleScopes.includes("backend");
    }
    // Otherwise, check direct inclusion
    return ruleScopes.includes(contextScope);
}
//# sourceMappingURL=ruleMatcher.js.map