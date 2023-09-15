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
      ? "text-accent"
      : "hover:text-accent";
  return (
    <Html lang="en" data-theme="emerald">
      <Head>
        <Title>SolidStart - With TailwindCSS</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <nav>
              <ul class="container flex items-center p-3 text-gray-200">
                <Show
                  when={
                    useLocation().pathname !== "/" &&
                    useLocation().pathname !== "/user"
                  }
                >
                  <li class={`${active("/login")} mx-1.5 sm:mx-6`}>
                    <A href="/login">Login</A>
                  </li>
                  <li class={`${active("/register")} mx-1.5 sm:mx-6`}>
                    <A href="/register">Register</A>
                  </li>
                </Show>
                <Show when={useLocation().pathname === "/" || useLocation().pathname === "/user"}>
                  <li class={`${active("/")} mx-1.5 sm:mx-6`}>
                    <A href="/user">{pbAuthStore()?.model?.username}</A>
                  </li>
                  <li class="mx-1.5 sm:mx-6 hover:text-accent">
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
