import { allRules } from "../rules";
import { ReviewedFile } from "../types/reviewedFile";
import { ReviewContext } from "../types/reviewContext";
import { RuleFinding } from "../types/ruleFinding";
import { ruleApplies } from "./ruleMatcher";

export function runRulesOnFiles(
  files: ReviewedFile[],
  context: ReviewContext
): RuleFinding[] {
  const findings: RuleFinding[] = [];

  for (const file of files) {
    for (const rule of allRules) {
      // Pass file language for workspace reviews (when context.language is "mixed")
      if (!ruleApplies(rule, context, file.language)) continue;
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
