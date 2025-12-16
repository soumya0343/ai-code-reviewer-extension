export type ReviewScope = "frontend" | "backend" | "both";

export interface ReviewContext {
  language: string;     // typescript, dart, go, java, cpp
  scope: ReviewScope;   // frontend | backend | both
  techStack: string[];  // react, flutter, spring, etc.
}