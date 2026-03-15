import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Genesis",
  tagline: "An AI agent framework built in Rust",
  favicon: "img/favicon.ico",
  url: "https://nooesc.github.io",
  baseUrl: "/genesis-wiki/",
  organizationName: "nooesc",
  projectName: "genesis-wiki",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
        },
        blog: false,
        theme: {
          customCss: [
            "./src/css/custom.css",
            "./src/css/tiers.css",
          ],
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    colorMode: {
      defaultMode: "dark",
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Genesis",
      items: [
        { type: "docSidebar", sidebarId: "wiki", label: "Docs", position: "left" },
        {
          href: "https://github.com/nooesc/genesis",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["rust", "toml", "yaml", "bash", "json"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
