"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeRules = void 0;
exports.nodeRules = [
    /* =====================================================
       ERROR HANDLING & RELIABILITY
       ===================================================== */
    {
        id: "NODE-ERR-01",
        area: "Error Handling",
        principle: "Reliability",
        severity: "BLOCKER",
        appliesTo: {
            language: ["javascript", "typescript"],
            scope: ["backend"],
        },
        check: (code) => /(await\s+)?(fetch|axios|axios\.\w+)\(/.test(code) &&
            !/(try\s*{[\s\S]*?catch\s*\(|\.catch\()/.test(code),
        message: "Async network call detected without explicit error handling.",
        rationale: "Unhandled promise rejections can crash Node.js processes or cause silent failures.",
    },
    {
        id: "NODE-ERR-02",
        area: "Error Handling",
        principle: "Fail Fast",
        severity: "CRITICAL",
        appliesTo: {
            language: ["javascript", "typescript"],
            scope: ["backend"],
        },
        check: (code) => /catch\s*\(\s*\w*\s*\)\s*{\s*}/.test(code),
        message: "Empty catch block detected. Errors are swallowed.",
        rationale: "Swallowing errors makes debugging impossible and hides production failures.",
    },
    /* =====================================================
       ASYNC / AWAIT & PROMISE MANAGEMENT
       ===================================================== */
    {
        id: "NODE-ASYNC-01",
        area: "Async Flow",
        principle: "Correctness",
        severity: "HIGH",
        appliesTo: {
            language: ["javascript", "typescript"],
            scope: ["backend"],
        },
        check: (code) => /async\s+function|\=\s*async\s*\(/.test(code) &&
            /return\s+\w+\(/.test(code) &&
            !/await\s+\w+\(/.test(code),
        message: "Async function returning a promise without await.",
        rationale: "Missing await can cause unhandled rejections or incorrect execution order.",
    },
    /* =====================================================
       EXPRESS / API DESIGN
       ===================================================== */
    {
        id: "NODE-EXP-01",
        area: "API Design",
        principle: "Single Responsibility Principle",
        severity: "HIGH",
        appliesTo: {
            language: ["javascript", "typescript"],
            scope: ["backend"],
        },
        check: (code) => /app\.(get|post|put|delete)\(/.test(code) &&
            code.split("\n").length > 200,
        message: "Route handler appears to contain excessive logic.",
        rationale: "Controllers should delegate business logic to services to preserve SRP.",
    },
    {
        id: "NODE-EXP-02",
        area: "API Reliability",
        principle: "Explicit Responses",
        severity: "CRITICAL",
        appliesTo: {
            language: ["javascript", "typescript"],
            scope: ["backend"],
        },
        check: (code) => /app\.(get|post|put|delete)\([\s\S]*?\)\s*{[\s\S]*?}/.test(code) &&
            !/res\.status\(/.test(code),
        message: "Express route handler does not explicitly set HTTP status codes.",
        rationale: "Implicit 200 responses can hide failures and break API contracts.",
    },
    /* =====================================================
       DEPENDENCY INVERSION & ARCHITECTURE
       ===================================================== */
    {
        id: "NODE-DIP-01",
        area: "Architecture",
        principle: "Dependency Inversion Principle",
        severity: "HIGH",
        appliesTo: {
            language: ["javascript", "typescript"],
            scope: ["backend"],
        },
        check: (code) => /new\s+\w+Service\(/.test(code),
        message: "Direct instantiation of services detected.",
        rationale: "Depending on concrete implementations instead of abstractions reduces testability and flexibility.",
    },
    /* =====================================================
       SECURITY
       ===================================================== */
    {
        id: "NODE-SEC-01",
        area: "Security",
        principle: "Input Validation",
        severity: "BLOCKER",
        appliesTo: {
            language: ["javascript", "typescript"],
            scope: ["backend"],
        },
        check: (code) => /req\.(body|query|params)/.test(code) &&
            !/(joi|zod|yup|express-validator)/i.test(code),
        message: "Request data used without visible validation.",
        rationale: "Unvalidated input is a common source of injection and logic vulnerabilities.",
    },
    {
        id: "NODE-SEC-02",
        area: "Security",
        principle: "Secrets Management",
        severity: "BLOCKER",
        appliesTo: {
            language: ["javascript", "typescript"],
            scope: ["backend"],
        },
        check: (code) => /(password|secret|token|apiKey)\s*=\s*["']/i.test(code),
        message: "Hardcoded secret detected in backend code.",
        rationale: "Secrets must never be committed to source code.",
    },
    /* =====================================================
       PERFORMANCE & SCALABILITY
       ===================================================== */
    {
        id: "NODE-PERF-01",
        area: "Performance",
        principle: "Non-blocking IO",
        severity: "CRITICAL",
        appliesTo: {
            language: ["javascript", "typescript"],
            scope: ["backend"],
        },
        check: (code) => /(fs\.readFileSync|fs\.writeFileSync|child_process\.execSync)/.test(code),
        message: "Blocking synchronous operation detected in Node.js backend.",
        rationale: "Blocking the event loop degrades performance and scalability.",
    },
];
//# sourceMappingURL=nodejs.js.map