import { Show } from "solid-js";
import { A, createRouteAction, createRouteData } from "solid-start";
import { createServerAction$, redirect } from "solid-start/server";
import { isLoggedIn, registerFn } from "~/pocketbase";

export function routeData() {
  createRouteData(() => {
    if (isLoggedIn()) {
      return redirect("/")
    }
  })
}

export default function Register() {
  const [registering, register] = createRouteAction(
    async (form: FormData) => await registerFn(form)
  );
  return (
    <>
      <register.Form>
        <label for="email">Email</label>
        <input type="text" name="email" id="email" placeholder="jeff@yahoo.com" required/>
        <label for="username">Username</label>
        <input type="text" name="username" id="username" placeholder="your beautiful name" required/>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" placeholder="your super secret password" required/>
        <label for="passwordConfirm">Confirm Password</label>
        <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="again, super secret" required/>
        <input type="submit" value="Register" />
      </register.Form>
      <Show when={registering.error}>
      <p class="text-red-600">{registering.error.message}</p>
      </Show>
      <p>
        Already have an account? <A class="hover:underline" href="/login">Sign in here</A>
      </p>
    </>
  );
}
