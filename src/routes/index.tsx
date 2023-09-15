import { For, createResource } from "solid-js";
import { createStore } from "solid-js/store";
import {
  createRouteData,
  createRouteMultiAction,
  redirect,
  useRouteData,
} from "solid-start";
import Card from "~/components/card";
import {
  createGoalFn,
  fetchGoalsFn,
  isLoggedIn,
  toggleGoalFn,
} from "~/pocketbase";

export function routeData() {
  console.log("calling home page routeData func");
  createRouteData(() => {
    if (!isLoggedIn()) {
      return redirect("/login");
    }
  });
  //change this to routeData if you need invalidation by key (to avoid having to call refetch for example)
  const [_goals] = createResource(fetchGoalsFn, { initialValue: [] });
  return { _goals };
}

export default function Home() {
  //this avoids the sending of another request for fetching, which would happen
  //if I were using createRouteData instead of createResource
  const { _goals } = useRouteData<typeof routeData>();
  const [goals, setGoals] = createStore(_goals());
  const [creatingGoal, createGoal] = createRouteMultiAction(
    async (form: FormData) => {
      setGoals([...goals, await createGoalFn(form)]);
    }
  );
  //--
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
        <For each={goals}>
          {(goal) => (
            <Card
              data={{
                id: goal.id,
                title: goal.title,
                description: goal.description || "",
                deadline: goal.deadline,
                completed: goal.completed
              }}
              onCheck={toggleGoalFn}
            />
          )}
        </For>
      </section>
      <section class="p-4 w-3/12">Resolutions</section>
      <section class="p-4 w-6/12">Regula</section>
    </main>
  );
}
