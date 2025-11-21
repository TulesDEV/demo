import { useRouter, useMatch, rootRouteId, ErrorComponent, Link, createRootRoute, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, notFound, createRouter } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, c as createServerFn } from "../server.js";
import axios from "redaxios";
function DefaultCatchBoundary({ error }) {
  const router2 = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId
  });
  console.error(error);
  return /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6", children: [
    /* @__PURE__ */ jsx(ErrorComponent, { error }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center flex-wrap", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
          },
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
          children: "Try Again"
        }
      ),
      isRoot ? /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
          children: "Home"
        }
      ) : /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
          onClick: (e) => {
            e.preventDefault();
            window.history.back();
          },
          children: "Go Back"
        }
      )
    ] })
  ] });
}
function NotFound({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2 p-2", children: [
    /* @__PURE__ */ jsx("div", { className: "text-gray-600 dark:text-gray-400", children: children || /* @__PURE__ */ jsx("p", { children: "The page you are looking for does not exist." }) }),
    /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => window.history.back(),
          className: "bg-emerald-500 text-white px-2 py-1 rounded-sm uppercase font-black text-sm",
          children: "Go back"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "bg-cyan-600 text-white px-2 py-1 rounded-sm uppercase font-black text-sm",
          children: "Start Over"
        }
      )
    ] })
  ] });
}
const appCss = "/assets/app-C2SzQr83.css";
const seo = ({
  title,
  description,
  keywords,
  image
}) => {
  const tags = [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: "@tannerlinsley" },
    { name: "twitter:site", content: "@tannerlinsley" },
    { name: "og:type", content: "website" },
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    ...image ? [
      { name: "twitter:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "og:image", content: image }
    ] : []
  ];
  return tags;
};
const Route$5 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      ...seo({
        title: "Tules | LinkedIn Outreach Automation Demo",
        description: "Tules previews AI-assisted LinkedIn outreach campaigns, inbox automation, and analytics for prospective clients."
      })
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" }
    ]
  }),
  errorComponent: (props) => /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(DefaultCatchBoundary, { ...props }) }),
  notFoundComponent: () => /* @__PURE__ */ jsx(NotFound, {}),
  component: RootComponent
});
function RootComponent() {
  return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
function RootDocument({ children }) {
  const navItems = [
    { label: "Overview", href: "#overview" },
    { label: "Pipeline", href: "#pipeline" },
    { label: "Campaigns", href: "#campaigns" },
    { label: "Activity", href: "#activity" }
  ];
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { className: "bg-slate-950 text-slate-50", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900", children: [
        /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-6xl items-center gap-6 px-6 py-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(Link, { to: "/", className: "text-xl font-semibold tracking-tight", children: "Tules" }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200", children: [
              /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-emerald-400 animate-pulse" }),
              "Demo site"
            ] })
          ] }),
          /* @__PURE__ */ jsx("nav", { className: "hidden flex-1 items-center gap-6 text-sm text-slate-300 md:flex", children: navItems.map((item) => /* @__PURE__ */ jsx("a", { href: item.href, className: "transition hover:text-white", children: item.label }, item.href)) }),
          /* @__PURE__ */ jsxs("div", { className: "ml-auto flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-400", children: [
            /* @__PURE__ */ jsx("span", { className: "hidden md:inline", children: "Interactive mock experience" }),
            /* @__PURE__ */ jsx("span", { className: "rounded-full border border-white/20 px-3 py-1 text-white text-[11px]", children: "Sandbox ready" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "pb-10", children }),
        /* @__PURE__ */ jsx("footer", { className: "border-t border-white/5 bg-slate-950/90", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 text-sm text-slate-400 md:flex-row md:items-center md:justify-between", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "(c) ",
            (/* @__PURE__ */ new Date()).getFullYear(),
            " Tules Demo Workspace."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "Mock environment for showcasing outreach automation." })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(TanStackRouterDevtools, { position: "bottom-right" }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const fn = async (...args) => {
    const serverFn = await getServerFnById(functionId);
    return serverFn(...args);
  };
  return Object.assign(fn, {
    url,
    functionId,
    [TSS_SERVER_FUNCTION]: true
  });
};
const loginFn_createServerFn_handler = createSsrRpc("c734b57656130e92f97e5895851097dba28c0c97bd955c5a94d61db533974b39");
createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(loginFn_createServerFn_handler, async ({
  data
}) => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    email: data.email,
    ok: true,
    error: false,
    message: "Demo login accepted"
  };
});
const Route$4 = createFileRoute("/_authed")({
  beforeLoad: () => ({
    demoAuthenticated: true
  })
});
const $$splitComponentImporter$3 = () => import("./index-Jp_TYMB3.js");
const Route$3 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const fetchPost_createServerFn_handler = createSsrRpc("fcc606bc6a4391068ed708ee59e18e7e8c5685d0fa5f2f3f35a0d234c04f679f");
const fetchPost = createServerFn({
  method: "GET"
}).inputValidator((d) => d).handler(fetchPost_createServerFn_handler, async ({
  data: postId
}) => {
  console.info(`Fetching post with id ${postId}...`);
  const post = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`).then((r) => r.data).catch((err) => {
    console.error(err);
    if (err.status === 404) {
      throw notFound();
    }
    throw err;
  });
  return post;
});
const fetchPosts_createServerFn_handler = createSsrRpc("9d2d75863ee5cc1769ed0162f4537aed3a4f16255a893cf6e946a857810a32df");
const fetchPosts = createServerFn({
  method: "GET"
}).handler(fetchPosts_createServerFn_handler, async () => {
  console.info("Fetching posts...");
  await new Promise((r) => setTimeout(r, 1e3));
  return axios.get("https://jsonplaceholder.typicode.com/posts").then((r) => r.data.slice(0, 10));
});
const $$splitComponentImporter$2 = () => import("./posts-BDHVqC-Y.js");
const Route$2 = createFileRoute("/_authed/posts")({
  loader: () => fetchPosts(),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./posts.index-DU8oxB5n.js");
const Route$1 = createFileRoute("/_authed/posts/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitNotFoundComponentImporter = () => import("./posts._postId-Bc3qVAHe.js");
const $$splitComponentImporter = () => import("./posts._postId-B8Bml0PW.js");
const Route = createFileRoute("/_authed/posts/$postId")({
  loader: ({
    params: {
      postId
    }
  }) => fetchPost({
    data: postId
  }),
  errorComponent: PostErrorComponent,
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
function PostErrorComponent({
  error
}) {
  return /* @__PURE__ */ jsx(ErrorComponent, { error });
}
const AuthedRoute = Route$4.update({
  id: "/_authed",
  getParentRoute: () => Route$5
});
const IndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$5
});
const AuthedPostsRoute = Route$2.update({
  id: "/posts",
  path: "/posts",
  getParentRoute: () => AuthedRoute
});
const AuthedPostsIndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthedPostsRoute
});
const AuthedPostsPostIdRoute = Route.update({
  id: "/$postId",
  path: "/$postId",
  getParentRoute: () => AuthedPostsRoute
});
const AuthedPostsRouteChildren = {
  AuthedPostsPostIdRoute,
  AuthedPostsIndexRoute
};
const AuthedPostsRouteWithChildren = AuthedPostsRoute._addFileChildren(
  AuthedPostsRouteChildren
);
const AuthedRouteChildren = {
  AuthedPostsRoute: AuthedPostsRouteWithChildren
};
const AuthedRouteWithChildren = AuthedRoute._addFileChildren(AuthedRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AuthedRoute: AuthedRouteWithChildren
};
const routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  NotFound as N,
  Route$2 as R,
  Route as a,
  router as r
};
