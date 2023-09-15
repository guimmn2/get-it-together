import { For } from "solid-js";
import { createRouteData, createRouteMultiAction, redirect } from "solid-start";
import Card from "~/components/card";
import { createGoalAction, fetchGoalsFn, isLoggedIn } from "~/pocketbase";

export function routeData() {
  createRouteData(() => {
    if (!isLoggedIn()) {
      return redirect("/login");
    }
  });
}

export default function Home() {
  const goals = createRouteData(fetchGoalsFn);
  const [creatingGoal, createGoal] = createRouteMultiAction(
    async (form: FormData) => createGoalAction(form)
  );
  return (
    <main class="flex flex-row space-x-4">
      <section class="p-4 w-3/12 flex flex-col">
        <h1>Goals</h1>
        <createGoal.Form>
          <input
            type="text"
            name="title"
            placeholder="add a goal"
            class="input"
          />
        </createGoal.Form>
        <For each={goals()}>{(goal) => <Card data={goal}/>}</For>
      </section>
      <section class="p-4 w-3/12">Resolutions</section>
      <section class="p-4 w-6/12">Regula</section>
    </main>
  );
}
