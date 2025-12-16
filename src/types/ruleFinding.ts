import { ReviewRule } from "./reviewRule";

export interface RuleFinding {
  rule: ReviewRule;
  filePath: string;
}
