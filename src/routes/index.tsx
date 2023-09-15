import { createRouteData, redirect } from "solid-start"
import { isLoggedIn, pbAuthStore } from "~/pocketbase"

export function routeData() {
  createRouteData(() => {
    if (!isLoggedIn()) {
      return redirect("/login")
    }
  })
}
export default function Home() {
  return <h1>Welcome to the homepage</h1>
}
