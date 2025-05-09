import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "inherit",
            h1: {
              fontSize: "3.75rem",
              marginTop: "0",
              marginBottom: "1.5rem",
              lineHeight: "1.2",
              fontWeight: "800",
              letterSpacing: "-0.025em",
            },
            h2: {
              fontSize: "2.5rem",
              marginTop: "2.5rem",
              marginBottom: "1.25rem",
              lineHeight: "1.3",
              fontWeight: "700",
              letterSpacing: "-0.025em",
            },
            h3: {
              fontSize: "2rem",
              marginTop: "2rem",
              marginBottom: "1rem",
              lineHeight: "1.4",
              fontWeight: "700",
            },
            h4: {
              fontSize: "1.5rem",
              marginTop: "1.75rem",
              marginBottom: "0.75rem",
              lineHeight: "1.5",
              fontWeight: "700",
            },
            p: {
              fontSize: "1.125rem",
              lineHeight: "1.75",
              marginTop: "1.25rem",
              marginBottom: "1.25rem",
            },
            a: {
              color: "inherit",
              textDecoration: "none",
              fontWeight: "500",
            },
            strong: {
              color: "inherit",
              fontWeight: "600",
            },
            code: {
              color: "inherit",
              fontWeight: "400",
              backgroundColor: "rgb(var(--tw-prose-code-bg) / 0.1)",
              borderRadius: "0.25rem",
              padding: "0.25rem 0.375rem",
            },
            pre: {
              backgroundColor: "rgb(var(--tw-prose-pre-bg) / 1)",
              color: "rgb(var(--tw-prose-pre-code) / 1)",
              borderRadius: "0.5rem",
              padding: "1rem",
              margin: "1.5rem 0",
            },
            blockquote: {
              borderLeftColor: "rgb(var(--tw-prose-quote-borders) / 1)",
              fontStyle: "normal",
              fontWeight: "500",
              marginTop: "1.6em",
              marginBottom: "1.6em",
              paddingLeft: "1em",
            },
            "blockquote p:first-of-type::before": {
              content: "none",
            },
            "blockquote p:last-of-type::after": {
              content: "none",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
