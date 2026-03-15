import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";

const SECTIONS = [
  { title: "Architecture", description: "Crate map, agent loop, execution service", link: "/docs/architecture/overview" },
  { title: "CLI Commands", description: "35 commands for chat, eval, tools, and more", link: "/docs/cli/chat" },
  { title: "Tools", description: "60+ builtin tools — shell, git, web, vision, and beyond", link: "/docs/tools/shell" },
  { title: "HTTP API", description: "50+ endpoints for chat, sessions, skills, and analytics", link: "/docs/api/chat" },
  { title: "Providers", description: "OpenAI, Anthropic, Gemini, OpenRouter, DeepSeek", link: "/docs/providers/overview" },
  { title: "Platforms", description: "Telegram, Discord, Slack, WhatsApp, Signal, Home Assistant", link: "/docs/platforms/telegram" },
];

const TIERS = [
  { key: "what", label: "What", description: "Plain language. What does it do? No code, no jargon.", color: "var(--eve-accent-primary)" },
  { key: "how", label: "How", description: "Parameters, examples, usage. How do I use it?", color: "var(--eve-accent-secondary)" },
  { key: "why", label: "Why", description: "Implementation, trade-offs, design rationale. Why was it built this way?", color: "var(--eve-success)" },
];

export default function Home() {
  return (
    <Layout title="Genesis Wiki" description="Documentation for the Genesis AI agent framework">
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Genesis</h1>
          <p className={styles.tagline}>An AI agent framework built in Rust</p>
          <div className={styles.metrics}>
            <span>13 crates</span>
            <span className={styles.dot}></span>
            <span>60+ tools</span>
            <span className={styles.dot}></span>
            <span>50+ API endpoints</span>
            <span className={styles.dot}></span>
            <span>7 platforms</span>
          </div>
        </section>

        <section className={styles.tierPhilosophy}>
          <h2 className={styles.sectionTitle}>Three ways to read</h2>
          <div className={styles.tierCards}>
            {TIERS.map(({ key, label, description, color }) => (
              <div key={key} className={styles.tierCard} style={{ borderLeftColor: color }}>
                <h3>{label}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.explore}>
          <h2 className={styles.sectionTitle}>Explore</h2>
          <div className={styles.sectionGrid}>
            {SECTIONS.map(({ title, description, link }) => (
              <Link key={title} to={link} className={styles.sectionCard}>
                <h3>{title}</h3>
                <p>{description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
