import React from "react";
import ComponentCreator from "@docusaurus/ComponentCreator";

export default [
  {
    path: "/__docusaurus/debug",
    component: ComponentCreator("/__docusaurus/debug", "3d6"),
    exact: true,
  },
  {
    path: "/__docusaurus/debug/config",
    component: ComponentCreator("/__docusaurus/debug/config", "914"),
    exact: true,
  },
  {
    path: "/__docusaurus/debug/content",
    component: ComponentCreator("/__docusaurus/debug/content", "c28"),
    exact: true,
  },
  {
    path: "/__docusaurus/debug/globalData",
    component: ComponentCreator("/__docusaurus/debug/globalData", "3cf"),
    exact: true,
  },
  {
    path: "/__docusaurus/debug/metadata",
    component: ComponentCreator("/__docusaurus/debug/metadata", "31b"),
    exact: true,
  },
  {
    path: "/__docusaurus/debug/registry",
    component: ComponentCreator("/__docusaurus/debug/registry", "0da"),
    exact: true,
  },
  {
    path: "/__docusaurus/debug/routes",
    component: ComponentCreator("/__docusaurus/debug/routes", "244"),
    exact: true,
  },
  {
    path: "/blog",
    component: ComponentCreator("/blog", "520"),
    exact: true,
  },
  {
    path: "/blog/archive",
    component: ComponentCreator("/blog/archive", "f4c"),
    exact: true,
  },
  {
    path: "/blog/first-blog-post",
    component: ComponentCreator("/blog/first-blog-post", "6c7"),
    exact: true,
  },
  {
    path: "/blog/long-blog-post",
    component: ComponentCreator("/blog/long-blog-post", "f06"),
    exact: true,
  },
  {
    path: "/blog/mdx-blog-post",
    component: ComponentCreator("/blog/mdx-blog-post", "bee"),
    exact: true,
  },
  {
    path: "/blog/tags",
    component: ComponentCreator("/blog/tags", "e13"),
    exact: true,
  },
  {
    path: "/blog/tags/docusaurus",
    component: ComponentCreator("/blog/tags/docusaurus", "a87"),
    exact: true,
  },
  {
    path: "/blog/tags/facebook",
    component: ComponentCreator("/blog/tags/facebook", "d62"),
    exact: true,
  },
  {
    path: "/blog/tags/hello",
    component: ComponentCreator("/blog/tags/hello", "d09"),
    exact: true,
  },
  {
    path: "/blog/tags/hola",
    component: ComponentCreator("/blog/tags/hola", "192"),
    exact: true,
  },
  {
    path: "/blog/welcome",
    component: ComponentCreator("/blog/welcome", "bfa"),
    exact: true,
  },
  {
    path: "/markdown-page",
    component: ComponentCreator("/markdown-page", "be1"),
    exact: true,
  },
  {
    path: "/docs",
    component: ComponentCreator("/docs", "b9e"),
    routes: [
      {
        path: "/docs/beispiele/intro",
        component: ComponentCreator("/docs/beispiele/intro", "e3e"),
        exact: true,
        sidebar: "tutorialSidebar",
      },
      {
        path: "/docs/editor/intro",
        component: ComponentCreator("/docs/editor/intro", "832"),
        exact: true,
        sidebar: "tutorialSidebar",
      },
      {
        path: "/docs/intro",
        component: ComponentCreator("/docs/intro", "5d5"),
        exact: true,
        sidebar: "tutorialSidebar",
      },
      {
        path: "/docs/syntax/befehle/entferne",
        component: ComponentCreator("/docs/syntax/befehle/entferne", "502"),
        exact: true,
        sidebar: "tutorialSidebar",
      },
      {
        path: "/docs/syntax/befehle/frage",
        component: ComponentCreator("/docs/syntax/befehle/frage", "d24"),
        exact: true,
        sidebar: "tutorialSidebar",
      },
      {
        path: "/docs/syntax/befehle/füge",
        component: ComponentCreator("/docs/syntax/befehle/füge", "bdb"),
        exact: true,
        sidebar: "tutorialSidebar",
      },
      {
        path: "/docs/syntax/befehle/gib",
        component: ComponentCreator("/docs/syntax/befehle/gib", "243"),
        exact: true,
        sidebar: "tutorialSidebar",
      },
      {
        path: "/docs/syntax/befehle/inline-code",
        component: ComponentCreator("/docs/syntax/befehle/inline-code", "6b1"),
        exact: true,
        sidebar: "tutorialSidebar",
      },
      {
        path: "/docs/syntax/befehle/kommentar",
        component: ComponentCreator("/docs/syntax/befehle/kommentar", "c05"),
        exact: true,
        sidebar: "tutorialSidebar",
      },
      {
        path: "/docs/syntax/befehle/rufe",
        component: ComponentCreator("/docs/syntax/befehle/rufe", "e0f"),
        exact: true,
        sidebar: "tutorialSidebar",
      },
      {
        path: "/docs/syntax/befehle/warte",
        component: ComponentCreator("/docs/syntax/befehle/warte", "9fb"),
        exact: true,
        sidebar: "tutorialSidebar",
      },
      {
        path: "/docs/syntax/intro",
        component: ComponentCreator("/docs/syntax/intro", "28f"),
        exact: true,
        sidebar: "tutorialSidebar",
      },
    ],
  },
  {
    path: "/",
    component: ComponentCreator("/", "f49"),
    exact: true,
  },
  {
    path: "*",
    component: ComponentCreator("*"),
  },
];
