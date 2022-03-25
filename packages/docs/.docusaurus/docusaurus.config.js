/*
AUTOGENERATED - DON'T EDIT
Your edits in this file will be overwritten in the next build!
Modify the docusaurus.config.js file at your site's root instead.
*/
export default {
  title: "InCode",
  tagline: "Einfach programmieren",
  url: "https://docs.incodelang.de",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "incodedevs",
  projectName: "incode",
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath:
            "C:\\Users\\bensi\\Desktop\\Projects\\JuFo\\InCode\\Editor\\packages\\docs\\sidebars.js",
          editUrl:
            "https://github.com/incodedevs/incode/tree/v4.x/packages/docs",
        },
        theme: {
          customCss:
            "C:\\Users\\bensi\\Desktop\\Projects\\JuFo\\InCode\\Editor\\packages\\docs\\src\\css\\custom.css",
        },
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: "InCode",
      logo: {
        alt: "InCode Logo",
        src: "img/incode-400.png",
      },
      items: [
        {
          type: "doc",
          docId: "intro",
          position: "left",
          label: "Tutorial",
        },
        {
          href: "https://github.com/incodedevs/incode",
          label: "GitHub",
          position: "right",
        },
      ],
      hideOnScroll: false,
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Tutorial",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Discord",
              href: "https://discord.gg/9T5JEyXsrA",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/incodedevs",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/incodedevs/incode",
            },
          ],
        },
      ],
      copyright:
        "Copyright © 2022 The InCode Developers. Built with Docusaurus.",
    },
    prism: {
      theme: {
        plain: {
          color: "#393A34",
          backgroundColor: "#f6f8fa",
        },
        styles: [
          {
            types: ["comment", "prolog", "doctype", "cdata"],
            style: {
              color: "#999988",
              fontStyle: "italic",
            },
          },
          {
            types: ["namespace"],
            style: {
              opacity: 0.7,
            },
          },
          {
            types: ["string", "attr-value"],
            style: {
              color: "#e3116c",
            },
          },
          {
            types: ["punctuation", "operator"],
            style: {
              color: "#393A34",
            },
          },
          {
            types: [
              "entity",
              "url",
              "symbol",
              "number",
              "boolean",
              "variable",
              "constant",
              "property",
              "regex",
              "inserted",
            ],
            style: {
              color: "#36acaa",
            },
          },
          {
            types: ["atrule", "keyword", "attr-name", "selector"],
            style: {
              color: "#00a4db",
            },
          },
          {
            types: ["function", "deleted", "tag"],
            style: {
              color: "#d73a49",
            },
          },
          {
            types: ["function-variable"],
            style: {
              color: "#6f42c1",
            },
          },
          {
            types: ["tag", "selector", "keyword"],
            style: {
              color: "#00009f",
            },
          },
        ],
      },
      darkTheme: {
        plain: {
          color: "#F8F8F2",
          backgroundColor: "#282A36",
        },
        styles: [
          {
            types: ["prolog", "constant", "builtin"],
            style: {
              color: "rgb(189, 147, 249)",
            },
          },
          {
            types: ["inserted", "function"],
            style: {
              color: "rgb(80, 250, 123)",
            },
          },
          {
            types: ["deleted"],
            style: {
              color: "rgb(255, 85, 85)",
            },
          },
          {
            types: ["changed"],
            style: {
              color: "rgb(255, 184, 108)",
            },
          },
          {
            types: ["punctuation", "symbol"],
            style: {
              color: "rgb(248, 248, 242)",
            },
          },
          {
            types: ["string", "char", "tag", "selector"],
            style: {
              color: "rgb(255, 121, 198)",
            },
          },
          {
            types: ["keyword", "variable"],
            style: {
              color: "rgb(189, 147, 249)",
              fontStyle: "italic",
            },
          },
          {
            types: ["comment"],
            style: {
              color: "rgb(98, 114, 164)",
            },
          },
          {
            types: ["attr-name"],
            style: {
              color: "rgb(241, 250, 140)",
            },
          },
        ],
      },
      additionalLanguages: [],
    },
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    docs: {
      versionPersistence: "localStorage",
    },
    metadata: [],
    hideableSidebar: false,
    autoCollapseSidebarCategories: false,
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 3,
    },
  },
  baseUrlIssueBanner: true,
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
    localeConfigs: {},
  },
  onDuplicateRoutes: "warn",
  staticDirectories: ["static"],
  customFields: {},
  plugins: [],
  themes: [],
  titleDelimiter: "|",
  noIndex: false,
};
