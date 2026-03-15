import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  wiki: [
    {
      type: "category",
      label: "Getting Started",
      items: ["getting-started/installation", "getting-started/configuration", "getting-started/first-chat"],
    },
    {
      type: "category",
      label: "Architecture",
      items: ["architecture/overview", "architecture/crate-map", "architecture/agent-loop", "architecture/execution-service", "architecture/provider-abstraction", "architecture/type-system"],
    },
    {
      type: "category",
      label: "CLI",
      items: [
        "cli/chat", "cli/run", "cli/serve", "cli/batch", "cli/sessions", "cli/skills", "cli/tools",
        "cli/schedule", "cli/model", "cli/config", "cli/doctor", "cli/info", "cli/status", "cli/memory",
        "cli/personality", "cli/nudge", "cli/insights", "cli/context", "cli/subagents", "cli/workflow",
        "cli/mcp", "cli/benchmark", "cli/pairing", "cli/toolset", "cli/init", "cli/bootstrap",
        "cli/login", "cli/logout", "cli/storage", "cli/compress", "cli/update", "cli/completions", "cli/uninstall",
        {
          type: "category",
          label: "Eval",
          items: [
            "cli/eval", "cli/eval/report", "cli/eval/summarize", "cli/eval/compare",
            "cli/eval/export-chatml", "cli/eval/export-sharegpt", "cli/eval/import-chatml", "cli/eval/import-sharegpt",
            "cli/eval/convert", "cli/eval/stats", "cli/eval/quality", "cli/eval/auto-tag", "cli/eval/tag-stats",
            "cli/eval/deduplicate", "cli/eval/filter", "cli/eval/split", "cli/eval/merge",
            "cli/eval/manifest", "cli/eval/validate", "cli/eval/pipeline", "cli/eval/sample",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Tools",
      items: [
        "tools/shell", "tools/git", "tools/fs", "tools/glob", "tools/tree", "tools/patch",
        "tools/search", "tools/web", "tools/web-search", "tools/browse", "tools/browser",
        "tools/vision", "tools/image-gen", "tools/tts", "tools/transcribe", "tools/memory",
        "tools/skill", "tools/skill-file", "tools/subagent", "tools/session", "tools/schedule",
        "tools/todo", "tools/clarify", "tools/reason", "tools/export", "tools/trajectory",
        "tools/send-message", "tools/channel-directory", "tools/user-model", "tools/code-execution",
        "tools/homeassistant", "tools/docker", "tools/ssh", "tools/process", "tools/process-registry", "tools/mixture",
      ],
    },
    {
      type: "category",
      label: "HTTP API",
      items: ["api/chat", "api/sessions", "api/skills", "api/memories", "api/schedules", "api/user-model", "api/subagents", "api/pairing", "api/health", "api/analytics"],
    },
    {
      type: "category",
      label: "Skills",
      items: ["skills/overview", "skills/skill-format", "skills/skills-hub"],
    },
    {
      type: "category",
      label: "Storage",
      items: ["storage/overview", "storage/sessions", "storage/memories", "storage/schedules", "storage/skills", "storage/skill-usage", "storage/subagents", "storage/user-model", "storage/pairing", "storage/fts5"],
    },
    {
      type: "category",
      label: "Providers",
      items: ["providers/overview", "providers/openai", "providers/anthropic", "providers/gemini", "providers/openrouter", "providers/deepseek", "providers/compatible", "providers/parsers"],
    },
    {
      type: "category",
      label: "MCP",
      items: ["mcp/overview", "mcp/client", "mcp/server"],
    },
    {
      type: "category",
      label: "Platforms",
      items: ["platforms/telegram", "platforms/discord", "platforms/slack", "platforms/whatsapp", "platforms/signal", "platforms/homeassistant", "platforms/cli-api"],
    },
    {
      type: "category",
      label: "Security",
      items: ["security/context-security", "security/guardrails", "security/credential-redaction", "security/auth-pairing"],
    },
    {
      type: "category",
      label: "Advanced",
      items: ["advanced/eval-system", "advanced/training-pipeline", "advanced/workflows", "advanced/scheduler", "advanced/hooks", "advanced/personalities", "advanced/sandbox", "advanced/embedding"],
    },
    {
      type: "category",
      label: "TUI",
      items: ["tui/overview"],
    },
    {
      type: "category",
      label: "Contributing",
      items: ["contributing/testing", "contributing/error-handling", "contributing/adding-a-tool", "contributing/crate-guide"],
    },
  ],
};

export default sidebars;
