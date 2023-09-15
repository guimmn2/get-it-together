import { Show } from "solid-js"
import { A, createRouteAction } from "solid-start"
import { loginFn } from "~/pocketbase"

export default function Login() {
    const [loggingIn, login] = createRouteAction(async (form: FormData) => loginFn(form))
    return <>
    <login.Form>
    <label for="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="your beautiful name"
          id="username"
        />
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="super secret password"
          id="password"
        />
        <input type="submit" value="logIn" />
        <p>
          Don't have an account?{" "}
          <A class="hover:underline" href="/register">
            Register here
          </A>
        </p>
        <Show when={loggingIn.error}>
          <p class="text-red-600">{loggingIn.error.message}</p>
        </Show>
    </login.Form>
    </>
}