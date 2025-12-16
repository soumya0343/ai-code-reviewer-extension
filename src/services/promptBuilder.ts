import { ReviewContext } from "../types/reviewContext";
import { ReviewedFile } from "../types/reviewedFile";

export function buildPrompt(files: ReviewedFile[], context: ReviewContext): string {
  return `
You are a senior software engineer performing a professional code review.

CONTEXT:
- Scope: ${context.scope}
- Tech Stack: ${context.techStack.join(", ")}
- Language: ${context.language}

Evaluate the code using industry best practices for the selected stack.

Check for:
1. Clean code & readability
2. Architecture & separation of concerns
3. Security & data validation
4. Performance & scalability
5. Error handling & edge cases
6. Maintainability & extensibility
7. Testability & production readiness

Respond EXACTLY in this format:

## Summary

## Critical Issues
- [Severity: HIGH]
- [Severity: MEDIUM]

## Improvements

## Best Practice Recommendations

## Suggested Refactor (if any)

${files.map(file => `FILE: ${file.path}
\`\`\`${file.language}
${file.content}
\`\`\`
`).join('\n\n')}
`;
}
