export type Severity = "BLOCKER" | "CRITICAL" | "HIGH" | "MEDIUM";

export interface ReviewRule {
  id: string;
  area: string;
  principle: string;
  severity: Severity;
  appliesTo: {
    language?: string[];
    framework?: string[];
    scope?: ("frontend" | "backend")[];
  };
  check: (code: string) => boolean;
  message: string;
  rationale: string;
}