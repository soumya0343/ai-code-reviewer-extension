import * as vscode from "vscode";
import { ReviewedFile } from "../types/reviewedFile";
import { ReviewContext, ReviewScope } from "../types/reviewContext";
import { runAIReview } from "../services/aiService";

export async function reviewWorkspace() {
  const scope = await vscode.window.showQuickPick(
    ["frontend", "backend", "both"],
    { placeHolder: "Select code scope" }
  );
  if (!scope) return;

  const techStack = await vscode.window.showQuickPick(
    [
      "React",
      "Next.js",
      "Angular",
      "Node.js",
      "Express",
      "NestJS",
      "Spring Boot",
      "REST API",
      "GraphQL",
      "MongoDB",
      "PostgreSQL",
      "Dart",
      "Flutter",
      "Go",
      "NodeJS",
      "Java",
      "Cpp",
    ],
    { canPickMany: true, placeHolder: "Select tech stack" }
  );
  if (!techStack?.length) return;

  const context: ReviewContext = {
    scope: scope as ReviewScope,
    techStack,
    language: "mixed", // Mixed languages for workspace review
  };

  // Find all relevant source files, excluding unnecessary files
  const uris = await vscode.workspace.findFiles(
    "**/*.{ts,tsx,js,jsx,dart,go,java,cpp,h,hpp}",
    "**/{node_modules,dist,build,out,.git,.vscode,__pycache__,*.log,*.tmp}/**"
  );

  if (uris.length === 0) {
    vscode.window.showWarningMessage(
      "No relevant source files found in workspace"
    );
    return;
  }

  const files: ReviewedFile[] = [];

  for (const uri of uris) {
    try {
      const doc = await vscode.workspace.openTextDocument(uri);
      // Skip files that are too large (over 100KB) to avoid performance issues
      if (doc.getText().length > 100000) {
        continue;
      }
      files.push({
        path: vscode.workspace.asRelativePath(uri),
        language: doc.languageId,
        content: doc.getText(),
      });
    } catch (error) {
      // Skip files that can't be opened
      continue;
    }
  }

  if (files.length === 0) {
    vscode.window.showWarningMessage("No valid source files found to review");
    return;
  }

  // Show progress notification for long operations
  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: `Reviewing ${files.length} files...`,
      cancellable: false,
    },
    async (progress) => {
      const review = await runAIReview(files, context);

      const doc = await vscode.workspace.openTextDocument({
        content: review,
        language: "markdown",
      });

      vscode.window.showTextDocument(doc, { preview: false });
    }
  );
}
