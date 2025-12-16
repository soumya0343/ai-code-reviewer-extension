import * as vscode from "vscode";
import { reviewWorkspace } from "./commands/reviewWorkspace";
import { reviewCurrentFile } from "./commands/reviewFile";

export function activate(ctx: vscode.ExtensionContext) {
  ctx.subscriptions.push(
    vscode.commands.registerCommand(
      "aiCodeReviewer.reviewWorkspace",
      reviewWorkspace
    ),
    vscode.commands.registerCommand(
      "aiCodeReviewer.reviewFile",
      reviewCurrentFile
    )
  );
}
