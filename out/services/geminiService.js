"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runGemini = runGemini;
const vscode = __importStar(require("vscode"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 800;
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function runGemini(prompt) {
    const config = vscode.workspace.getConfiguration("aiCodeReviewer");
    const apiKey = config.get("geminiApiKey");
    if (!apiKey) {
        throw new Error("Gemini API key missing");
    }
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        const response = await (0, node_fetch_1.default)(`https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: prompt }],
                    },
                ],
            }),
        });
        // ✅ SUCCESS
        if (response.ok) {
            const data = await response.json();
            return (data.candidates?.[0]?.content?.parts?.[0]?.text ??
                "No response from Gemini");
        }
        // 🔁 RATE LIMIT — retry with backoff
        if (response.status === 429 && attempt < MAX_RETRIES) {
            const delay = BASE_DELAY_MS * Math.pow(2, attempt - 1);
            console.warn(`[AI Code Reviewer] Gemini rate limited (429). Retrying in ${delay}ms (attempt ${attempt})`);
            await sleep(delay);
            continue;
        }
        // ❌ Other errors → fail fast
        const errorText = await response.text();
        throw new Error(`Gemini API error ${response.status}: ${errorText}`);
    }
    throw new Error("Gemini rate limit exceeded after retries");
}
//# sourceMappingURL=geminiService.js.map