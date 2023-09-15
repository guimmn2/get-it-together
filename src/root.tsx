// @refresh reload
import { Show, Suspense } from "solid-js";
import {
  useLocation,
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
  createRouteAction,
} from "solid-start";
import "./root.css";
import { logoutFn, pbAuthStore } from "./pocketbase";

export default function Root() {
  const location = useLocation();
  const [_, logout] = createRouteAction(async () => logoutFn())
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - With TailwindCSS</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <nav class="bg-sky-800">
              <ul class="container flex items-center p-3 text-gray-200">
                <Show
                  when={
                    useLocation().pathname !== "/" &&
                    useLocation().pathname !== "/user"
                  }
                >
                  <li class={`border-b-2 ${active("/login")} mx-1.5 sm:mx-6`}>
                    <A href="/login">Login</A>
                  </li>
                  <li class={`border-b-2 ${active("/register")} mx-1.5 sm:mx-6`}>
                    <A href="/register">Register</A>
                  </li>
                </Show>
                <Show when={useLocation().pathname === "/"}>
                  <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
                    <A href="/user">{pbAuthStore()?.model?.username}</A>
                  </li>
                  <li class={`mx-1.5 sm:mx-6`}>
                    <button
                      onClick={() => logout()}
                    >
                      Logout
                    </button>
                  </li>
                </Show>
              </ul>
            </nav>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
