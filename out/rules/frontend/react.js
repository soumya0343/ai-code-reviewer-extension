"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactRules = void 0;
exports.reactRules = [
    {
        id: "REACT-SRP-01",
        area: "Component Design",
        principle: "SRP",
        severity: "BLOCKER",
        appliesTo: { framework: ["react"], scope: ["frontend"] },
        check: (code) => code.split("\n").length > 150,
        message: "Component exceeds 150 lines. Split logic using custom hooks or container/presenter pattern.",
        rationale: "Prevents God Components and improves reusability and testability.",
    },
    {
        id: "REACT-HOOKS-01",
        area: "Hooks Usage",
        principle: "Rules of Hooks",
        severity: "BLOCKER",
        appliesTo: { framework: ["react"] },
        check: (code) => /(if|for|while).*use(State|Effect|Memo|Callback)/s.test(code),
        message: "Hooks must not be called inside loops, conditions, or nested functions.",
        rationale: "React relies on consistent hook call order to track state correctly.",
    },
    {
        id: "REACT-KEYS-01",
        area: "List Rendering",
        principle: "Reconciliation",
        severity: "BLOCKER",
        appliesTo: { framework: ["react"] },
        check: (code) => {
            // Match .map((item, index) => ...) or .map((item, index) => ...) with key={index}
            const hasIndexParam = /\.map\s*\(\s*\([^,)]+,\s*index\s*\)/.test(code);
            const hasIndexKey = /key\s*=\s*\{?\s*index\s*\}?/.test(code);
            return hasIndexParam || hasIndexKey;
        },
        message: "Using array index as key. Use a stable, unique identifier instead.",
        rationale: "Incorrect keys break React's reconciliation algorithm.",
    },
    {
        id: "REACT-SECURITY-01",
        area: "Security",
        principle: "Secrets Management",
        severity: "CRITICAL",
        appliesTo: { framework: ["react"], scope: ["frontend"] },
        check: (code) => {
            // Match HARDCODED_TOKEN or similar patterns
            if (/HARDCODED[_\s-]?TOKEN/i.test(code))
                return true;
            // Match token=value or token: value patterns with quoted strings
            if (/(?:token|password|secret|api[_-]?key|apikey)\s*[:=]\s*["'][^"']+["']/i.test(code))
                return true;
            // Match URLs with token parameters
            if (/[?&](?:token|password|secret|api[_-]?key|apikey)\s*=\s*[A-Za-z0-9_-]{10,}/i.test(code))
                return true;
            return false;
        },
        message: "Hardcoded credentials, tokens, or secrets detected. Move to environment variables or secure storage.",
        rationale: "Hardcoded secrets expose sensitive data in source code and version control.",
    },
    {
        id: "REACT-ERROR-01",
        area: "Error Handling",
        principle: "Defensive Programming",
        severity: "HIGH",
        appliesTo: { framework: ["react"], scope: ["frontend"] },
        check: (code) => {
            // Find all fetch calls
            const fetchMatches = code.match(/fetch\s*\([^)]+\)/g);
            if (!fetchMatches || fetchMatches.length === 0)
                return false;
            // Check if any fetch call chain doesn't have .catch()
            for (const match of fetchMatches) {
                const matchIndex = code.indexOf(match);
                const afterMatch = code.substring(matchIndex);
                // Look for .catch or try-catch within reasonable distance (next 500 chars)
                const next500 = afterMatch.substring(0, 500);
                if (!/\.catch\s*\(/.test(next500) &&
                    !/try\s*\{[\s\S]{0,200}catch/.test(next500)) {
                    return true;
                }
            }
            return false;
        },
        message: "Fetch calls without error handling. Add .catch() or try-catch blocks.",
        rationale: "Unhandled network errors can crash the application or provide poor user experience.",
    },
    {
        id: "REACT-HOOKS-02",
        area: "Hooks Usage",
        principle: "Dependency Arrays",
        severity: "HIGH",
        appliesTo: { framework: ["react"] },
        check: (code) => {
            // Match useEffect with empty dependency array - handle multi-line with [\s\S]
            const useEffectPattern = /useEffect\s*\([^)]*\)\s*=>\s*\{([\s\S]*?)\}\s*,\s*\[\s*\]/g;
            let match;
            while ((match = useEffectPattern.exec(code)) !== null) {
                const body = match[1];
                // Check for state setters, fetch, or other side effects that might need dependencies
                if (/(?:set[A-Z]\w*|fetch|console\.(?:log|error|warn))/.test(body)) {
                    return true;
                }
            }
            return false;
        },
        message: "useEffect with empty dependency array may be missing dependencies. Review if all used values are included.",
        rationale: "Missing dependencies can cause stale closures and unexpected behavior.",
    },
];
//# sourceMappingURL=react.js.map