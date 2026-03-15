import { writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";

const DOCS_DIR = join(__dirname, "..", "docs");

interface StubDef {
  path: string;
  title: string;
  description: string;
  crate?: string;
  sourceFiles?: string[];
}

const STUBS: StubDef[] = [
  // Getting Started (3)
  { path: "getting-started/installation", title: "Installation", description: "How to install Genesis" },
  { path: "getting-started/configuration", title: "Configuration", description: "Config file, env vars, profiles" },
  { path: "getting-started/first-chat", title: "First Chat", description: "Your first conversation with Eve" },
  // Architecture (6)
  { path: "architecture/overview", title: "Architecture Overview", description: "Crate map and design philosophy", crate: "genesis", sourceFiles: ["Cargo.toml"] },
  { path: "architecture/crate-map", title: "Crate Map", description: "13-crate dependency diagram" },
  { path: "architecture/agent-loop", title: "Agent Loop", description: "The think-act-think cycle", crate: "genesis-core", sourceFiles: ["crates/genesis-core/src/agent_loop.rs"] },
  { path: "architecture/execution-service", title: "Execution Service", description: "Unified execution path", crate: "genesis-core", sourceFiles: ["crates/genesis-core/src/execution.rs"] },
  { path: "architecture/provider-abstraction", title: "Provider Abstraction", description: "OpenAI format as lingua franca", crate: "genesis-provider", sourceFiles: ["crates/genesis-provider/src/client.rs"] },
  { path: "architecture/type-system", title: "Type System", description: "Shared types and enums", crate: "genesis-types", sourceFiles: ["crates/genesis-types/src/lib.rs"] },
  // CLI (35 top-level)
  { path: "cli/chat", title: "genesis chat", description: "Interactive Eve chat session", crate: "genesis-cli" },
  { path: "cli/run", title: "genesis run", description: "One-shot prompt execution", crate: "genesis-cli" },
  { path: "cli/serve", title: "genesis serve", description: "HTTP API server", crate: "genesis-cli" },
  { path: "cli/batch", title: "genesis batch", description: "Parallel prompt execution", crate: "genesis-cli" },
  { path: "cli/sessions", title: "genesis sessions", description: "Session management", crate: "genesis-cli" },
  { path: "cli/skills", title: "genesis skills", description: "Skill management", crate: "genesis-cli" },
  { path: "cli/tools", title: "genesis tools", description: "List available tools", crate: "genesis-cli" },
  { path: "cli/schedule", title: "genesis schedule", description: "Scheduled prompts", crate: "genesis-cli" },
  { path: "cli/model", title: "genesis model", description: "LLM provider/model management", crate: "genesis-cli" },
  { path: "cli/config", title: "genesis config", description: "Configuration inspection", crate: "genesis-cli" },
  { path: "cli/doctor", title: "genesis doctor", description: "Config and storage readiness", crate: "genesis-cli" },
  { path: "cli/info", title: "genesis info", description: "System overview", crate: "genesis-cli" },
  { path: "cli/status", title: "genesis status", description: "Status dashboard", crate: "genesis-cli" },
  { path: "cli/memory", title: "genesis memory", description: "Memory management", crate: "genesis-cli" },
  { path: "cli/personality", title: "genesis personality", description: "Personality switching", crate: "genesis-cli" },
  { path: "cli/nudge", title: "genesis nudge", description: "Self-reflection consolidation", crate: "genesis-cli" },
  { path: "cli/insights", title: "genesis insights", description: "Usage analytics", crate: "genesis-cli" },
  { path: "cli/context", title: "genesis context", description: "Project context files", crate: "genesis-cli" },
  { path: "cli/subagents", title: "genesis subagents", description: "Subagent inspection", crate: "genesis-cli" },
  { path: "cli/workflow", title: "genesis workflow", description: "Workflow management", crate: "genesis-cli" },
  { path: "cli/mcp", title: "genesis mcp", description: "MCP server management", crate: "genesis-cli" },
  { path: "cli/benchmark", title: "genesis benchmark", description: "Provider latency benchmarking", crate: "genesis-cli" },
  { path: "cli/pairing", title: "genesis pairing", description: "DM pairing authorization", crate: "genesis-cli" },
  { path: "cli/toolset", title: "genesis toolset", description: "Toolset distributions", crate: "genesis-cli" },
  { path: "cli/init", title: "genesis init", description: "Interactive setup wizard", crate: "genesis-cli" },
  { path: "cli/bootstrap", title: "genesis bootstrap", description: "Print starter assets", crate: "genesis-cli" },
  { path: "cli/login", title: "genesis login", description: "OAuth sign in", crate: "genesis-cli" },
  { path: "cli/logout", title: "genesis logout", description: "Sign out and clear credentials", crate: "genesis-cli" },
  { path: "cli/storage", title: "genesis storage", description: "Storage path management", crate: "genesis-cli" },
  { path: "cli/compress", title: "genesis compress", description: "Trajectory compression", crate: "genesis-cli" },
  { path: "cli/update", title: "genesis update", description: "Update Genesis from source", crate: "genesis-cli" },
  { path: "cli/completions", title: "genesis completions", description: "Shell completions", crate: "genesis-cli" },
  { path: "cli/uninstall", title: "genesis uninstall", description: "Uninstall Genesis", crate: "genesis-cli" },
  { path: "cli/eval", title: "genesis eval", description: "Evaluation suite overview", crate: "genesis-cli" },
  // Eval sub-commands (20)
  { path: "cli/eval/report", title: "eval report", description: "Build replay report for one trajectory" },
  { path: "cli/eval/summarize", title: "eval summarize", description: "Aggregate replay reports" },
  { path: "cli/eval/compare", title: "eval compare", description: "Compare two trajectory reports" },
  { path: "cli/eval/export-chatml", title: "eval export-chatml", description: "Export as ChatML JSONL" },
  { path: "cli/eval/export-sharegpt", title: "eval export-sharegpt", description: "Export as ShareGPT JSONL" },
  { path: "cli/eval/import-chatml", title: "eval import-chatml", description: "Import ChatML JSONL" },
  { path: "cli/eval/import-sharegpt", title: "eval import-sharegpt", description: "Import ShareGPT JSONL" },
  { path: "cli/eval/convert", title: "eval convert", description: "Convert between formats" },
  { path: "cli/eval/stats", title: "eval stats", description: "Dataset statistics" },
  { path: "cli/eval/quality", title: "eval quality", description: "Trajectory quality scoring" },
  { path: "cli/eval/auto-tag", title: "eval auto-tag", description: "Automatic semantic tagging" },
  { path: "cli/eval/tag-stats", title: "eval tag-stats", description: "Tag frequency distribution" },
  { path: "cli/eval/deduplicate", title: "eval deduplicate", description: "Find near-duplicate trajectories" },
  { path: "cli/eval/filter", title: "eval filter", description: "Filter trajectories by criteria" },
  { path: "cli/eval/split", title: "eval split", description: "Train/test split" },
  { path: "cli/eval/merge", title: "eval merge", description: "Merge trajectory directories" },
  { path: "cli/eval/manifest", title: "eval manifest", description: "Dataset manifest management" },
  { path: "cli/eval/validate", title: "eval validate", description: "Validate trajectory integrity" },
  { path: "cli/eval/pipeline", title: "eval pipeline", description: "Multi-step data pipeline" },
  { path: "cli/eval/sample", title: "eval sample", description: "Random trajectory sampling" },
  // Tools (36)
  { path: "tools/shell", title: "Shell", description: "Execute shell commands", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/shell.rs"] },
  { path: "tools/git", title: "Git", description: "Git operations", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/git.rs"] },
  { path: "tools/fs", title: "File System", description: "File I/O operations", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/fs.rs"] },
  { path: "tools/glob", title: "Glob", description: "File pattern matching", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/glob.rs"] },
  { path: "tools/tree", title: "Tree", description: "Directory tree visualization", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/tree.rs"] },
  { path: "tools/patch", title: "Patch", description: "File patching", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/patch.rs"] },
  { path: "tools/search", title: "Search", description: "Web search", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/search.rs"] },
  { path: "tools/web", title: "Web", description: "Web content fetching", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/web.rs"] },
  { path: "tools/web-search", title: "Web Search", description: "Web search wrapper", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/web_search.rs"] },
  { path: "tools/browse", title: "Browse", description: "Web browsing with readability", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/browse.rs"] },
  { path: "tools/browser", title: "Browser", description: "Browser automation", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/browser.rs"] },
  { path: "tools/vision", title: "Vision", description: "Image analysis", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/vision.rs"] },
  { path: "tools/image-gen", title: "Image Generation", description: "DALL-E image generation", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/image_gen.rs"] },
  { path: "tools/tts", title: "Text-to-Speech", description: "Text-to-speech synthesis", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/tts.rs"] },
  { path: "tools/transcribe", title: "Transcribe", description: "Audio transcription", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/transcribe.rs"] },
  { path: "tools/memory", title: "Memory", description: "Memory storage/retrieval", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/memory.rs"] },
  { path: "tools/skill", title: "Skill", description: "Skill CRUD", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/skill.rs"] },
  { path: "tools/skill-file", title: "Skill File", description: "Skill file management", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/skill_file.rs"] },
  { path: "tools/subagent", title: "Subagent", description: "Subagent spawning", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/subagent.rs"] },
  { path: "tools/session", title: "Session", description: "Session management", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/session.rs"] },
  { path: "tools/schedule", title: "Schedule", description: "Schedule management", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/schedule.rs"] },
  { path: "tools/todo", title: "Todo", description: "TODO management", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/todo.rs"] },
  { path: "tools/clarify", title: "Clarify", description: "Request clarification", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/clarify.rs"] },
  { path: "tools/reason", title: "Reason", description: "Extended reasoning", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/reason.rs"] },
  { path: "tools/export", title: "Export", description: "Session export", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/export.rs"] },
  { path: "tools/trajectory", title: "Trajectory", description: "Trajectory tracking", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/trajectory.rs"] },
  { path: "tools/send-message", title: "Send Message", description: "Platform messaging", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/send_message.rs"] },
  { path: "tools/channel-directory", title: "Channel Directory", description: "Messaging channel discovery", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/channel_directory.rs"] },
  { path: "tools/user-model", title: "User Model", description: "User trait modeling", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/user_model.rs"] },
  { path: "tools/code-execution", title: "Code Execution", description: "Python/JS code execution", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/code_execution.rs"] },
  { path: "tools/homeassistant", title: "Home Assistant", description: "Home Assistant control", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/homeassistant.rs"] },
  { path: "tools/docker", title: "Docker", description: "Docker command execution", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/docker.rs"] },
  { path: "tools/ssh", title: "SSH", description: "SSH command execution", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/ssh.rs"] },
  { path: "tools/process", title: "Process", description: "Process management", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/process.rs"] },
  { path: "tools/process-registry", title: "Process Registry", description: "Process tracking", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/process_registry.rs"] },
  { path: "tools/mixture", title: "Mixture", description: "Mixture of Agents", crate: "genesis-tools", sourceFiles: ["crates/genesis-tools/src/builtins/mixture.rs"] },
  // API (10)
  { path: "api/chat", title: "Chat API", description: "Chat, streaming, batch endpoints", crate: "genesis-gateway", sourceFiles: ["crates/genesis-gateway/src/commands.rs"] },
  { path: "api/sessions", title: "Sessions API", description: "Session CRUD endpoints", crate: "genesis-gateway" },
  { path: "api/skills", title: "Skills API", description: "Skill management endpoints", crate: "genesis-gateway" },
  { path: "api/memories", title: "Memories API", description: "Memory endpoints", crate: "genesis-gateway" },
  { path: "api/schedules", title: "Schedules API", description: "Schedule endpoints", crate: "genesis-gateway" },
  { path: "api/user-model", title: "User Model API", description: "Trait endpoints", crate: "genesis-gateway" },
  { path: "api/subagents", title: "Subagents API", description: "Subagent endpoints", crate: "genesis-gateway" },
  { path: "api/pairing", title: "Pairing API", description: "DM pairing endpoints", crate: "genesis-gateway" },
  { path: "api/health", title: "Health API", description: "Health and MCP status", crate: "genesis-gateway" },
  { path: "api/analytics", title: "Analytics API", description: "Insights and usage", crate: "genesis-gateway" },
  // Skills (3)
  { path: "skills/overview", title: "Skills Overview", description: "Skill system architecture", crate: "genesis-core", sourceFiles: ["crates/genesis-core/src/skills.rs"] },
  { path: "skills/skill-format", title: "SKILL.md Format", description: "Skill file specification", crate: "genesis-core", sourceFiles: ["crates/genesis-core/src/skill_manifest.rs"] },
  { path: "skills/skills-hub", title: "Skills Hub", description: "Hub client and skill installation", crate: "genesis-core", sourceFiles: ["crates/genesis-core/src/skills_hub.rs"] },
  // Storage (10)
  { path: "storage/overview", title: "Storage Overview", description: "SQLite architecture and schema", crate: "genesis-storage", sourceFiles: ["crates/genesis-storage/src/lib.rs"] },
  { path: "storage/sessions", title: "Session Store", description: "Sessions and messages", crate: "genesis-storage" },
  { path: "storage/memories", title: "Memory Store", description: "Long-term memory", crate: "genesis-storage" },
  { path: "storage/schedules", title: "Schedule Store", description: "Cron schedules", crate: "genesis-storage" },
  { path: "storage/skills", title: "Skill Store", description: "Skill definitions", crate: "genesis-storage" },
  { path: "storage/skill-usage", title: "Skill Usage Store", description: "Usage tracking", crate: "genesis-storage" },
  { path: "storage/subagents", title: "Subagent Store", description: "Subagent metadata", crate: "genesis-storage" },
  { path: "storage/user-model", title: "User Model Store", description: "User trait modeling", crate: "genesis-storage" },
  { path: "storage/pairing", title: "Pairing Store", description: "Platform authorization", crate: "genesis-storage" },
  { path: "storage/fts5", title: "Full-Text Search", description: "FTS5 implementation", crate: "genesis-storage" },
  // Providers (8)
  { path: "providers/overview", title: "Providers Overview", description: "Provider abstraction and ChatClient", crate: "genesis-provider", sourceFiles: ["crates/genesis-provider/src/client.rs"] },
  { path: "providers/openai", title: "OpenAI", description: "OpenAI provider", crate: "genesis-provider" },
  { path: "providers/anthropic", title: "Anthropic", description: "Anthropic with prompt caching", crate: "genesis-provider", sourceFiles: ["crates/genesis-provider/src/anthropic_types.rs"] },
  { path: "providers/gemini", title: "Gemini", description: "Google Gemini provider", crate: "genesis-provider", sourceFiles: ["crates/genesis-provider/src/gemini_types.rs"] },
  { path: "providers/openrouter", title: "OpenRouter", description: "OpenRouter with provider routing", crate: "genesis-provider" },
  { path: "providers/deepseek", title: "DeepSeek", description: "DeepSeek provider", crate: "genesis-provider" },
  { path: "providers/compatible", title: "Compatible", description: "OpenAI-compatible endpoints", crate: "genesis-provider" },
  { path: "providers/parsers", title: "Tool Call Parsers", description: "10 tool call parsers", crate: "genesis-provider", sourceFiles: ["crates/genesis-provider/src/parsers.rs"] },
  // MCP (3)
  { path: "mcp/overview", title: "MCP Overview", description: "Model Context Protocol", crate: "genesis-mcp", sourceFiles: ["crates/genesis-mcp/src/lib.rs"] },
  { path: "mcp/client", title: "MCP Client", description: "Connecting to MCP servers", crate: "genesis-mcp", sourceFiles: ["crates/genesis-mcp/src/client.rs"] },
  { path: "mcp/server", title: "MCP Server", description: "Exposing Genesis tools as MCP", crate: "genesis-mcp", sourceFiles: ["crates/genesis-mcp/src/server.rs"] },
  // Platforms (7)
  { path: "platforms/telegram", title: "Telegram", description: "Telegram bot integration", crate: "genesis-gateway" },
  { path: "platforms/discord", title: "Discord", description: "Discord bot integration", crate: "genesis-gateway" },
  { path: "platforms/slack", title: "Slack", description: "Slack bot integration", crate: "genesis-gateway" },
  { path: "platforms/whatsapp", title: "WhatsApp", description: "WhatsApp integration", crate: "genesis-gateway" },
  { path: "platforms/signal", title: "Signal", description: "Signal integration (requires signal-cli daemon)", crate: "genesis-gateway" },
  { path: "platforms/homeassistant", title: "Home Assistant", description: "Home Assistant webhook", crate: "genesis-gateway" },
  { path: "platforms/cli-api", title: "CLI and API", description: "CLI and HTTP API platforms", crate: "genesis-gateway" },
  // Security (4)
  { path: "security/context-security", title: "Context Security", description: "Prompt injection scanning", crate: "genesis-core", sourceFiles: ["crates/genesis-core/src/context_security.rs"] },
  { path: "security/guardrails", title: "Guardrails", description: "Safety constraints", crate: "genesis-core", sourceFiles: ["crates/genesis-core/src/guardrails.rs"] },
  { path: "security/credential-redaction", title: "Credential Redaction", description: "Regex-based redaction", crate: "genesis-core", sourceFiles: ["crates/genesis-core/src/sanitize.rs"] },
  { path: "security/auth-pairing", title: "Auth and Pairing", description: "OAuth and DM pairing", crate: "genesis-auth", sourceFiles: ["crates/genesis-auth/src/codex.rs"] },
  // Advanced (8)
  { path: "advanced/eval-system", title: "Evaluation System", description: "Evaluation framework", crate: "genesis-core", sourceFiles: ["crates/genesis-core/src/eval.rs"] },
  { path: "advanced/training-pipeline", title: "Training Pipeline", description: "Trajectory, quality, compression, tagging", crate: "genesis-core" },
  { path: "advanced/workflows", title: "Workflows", description: "Workflow engine", crate: "genesis-core", sourceFiles: ["crates/genesis-core/src/workflow.rs"] },
  { path: "advanced/scheduler", title: "Scheduler", description: "Cron job runtime", crate: "genesis-core", sourceFiles: ["crates/genesis-core/src/scheduler.rs"] },
  { path: "advanced/hooks", title: "Agent Hooks", description: "Pre/Post hook system", crate: "genesis-core", sourceFiles: ["crates/genesis-core/src/hooks.rs"] },
  { path: "advanced/personalities", title: "Personalities", description: "13 agent personalities", crate: "genesis-core", sourceFiles: ["crates/genesis-core/src/personality.rs"] },
  { path: "advanced/sandbox", title: "Sandbox Backends", description: "Singularity, Daytona, Modal", crate: "genesis-core" },
  { path: "advanced/embedding", title: "Embeddings", description: "Vector embeddings", crate: "genesis-core", sourceFiles: ["crates/genesis-core/src/embedding.rs"] },
  // TUI (1)
  { path: "tui/overview", title: "TUI Overview", description: "Terminal User Interface (in progress)", crate: "genesis-tui" },
  // Contributing (4)
  { path: "contributing/testing", title: "Testing", description: "Test conventions and patterns" },
  { path: "contributing/error-handling", title: "Error Handling", description: "thiserror and Result patterns" },
  { path: "contributing/adding-a-tool", title: "Adding a Tool", description: "Step-by-step guide" },
  { path: "contributing/crate-guide", title: "Crate Guide", description: "Per-crate overview for contributors" },
];

function generateMdx(stub: StubDef): string {
  const fm: string[] = ["---"];
  fm.push(`title: "${stub.title}"`);
  fm.push(`description: "${stub.description}"`);
  if (stub.crate) fm.push(`crate: ${stub.crate}`);
  if (stub.sourceFiles) {
    fm.push("source_files:");
    for (const sf of stub.sourceFiles) fm.push(`  - ${sf}`);
  }
  fm.push('last_synced_commit: "0000000"');
  fm.push("---");
  fm.push("");
  fm.push("import { What, How, Why } from '@site/src/components/TierContent';");
  fm.push("");
  fm.push("<What>");
  fm.push("");
  fm.push("*Content coming soon.*");
  fm.push("");
  fm.push("</What>");
  fm.push("");
  return fm.join("\n");
}

const dirEntries = new Map<string, StubDef[]>();

for (const stub of STUBS) {
  const filePath = join(DOCS_DIR, stub.path + ".mdx");
  mkdirSync(dirname(filePath), { recursive: true });
  if (!existsSync(filePath)) {
    writeFileSync(filePath, generateMdx(stub));
  }
  const dir = dirname(stub.path);
  if (!dirEntries.has(dir)) dirEntries.set(dir, []);
  dirEntries.get(dir)!.push(stub);
}

for (const [dir, stubs] of dirEntries) {
  const entries: Record<string, unknown> = {};
  for (const s of stubs) {
    const filename = s.path.split("/").pop() + ".mdx";
    entries[filename] = {
      sources: s.sourceFiles ?? [],
      last_synced_commit: "0000000",
      tier_coverage: { what: false, how: false, why: false },
    };
  }
  const manifest = { schema_version: 1, source_globs: [], entries };
  writeFileSync(
    join(DOCS_DIR, dir, "_manifest.json"),
    JSON.stringify(manifest, null, 2) + "\n"
  );
}

writeFileSync(
  join(DOCS_DIR, "_manifest.json"),
  JSON.stringify({ schema_version: 1, sections: [...dirEntries.keys()] }, null, 2) + "\n"
);

console.log("Generated " + STUBS.length + " stub pages and " + dirEntries.size + " manifests.");
