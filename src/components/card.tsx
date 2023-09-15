import { JSX } from "solid-js";
import { createRouteAction } from "solid-start";
import { toggleGoalFn } from "~/pocketbase";

export default function Card(props: {
  children?: JSX.Element;
  data: {
    id: string;
    title: string;
    description: string;
    deadline: string;
    completed: boolean;
  };
  onCheck: Function;
}) {
  const [togglingGoal, toggleGoal] = createRouteAction((form: FormData) =>
    props.onCheck(form), { invalidate: "goals"}
  );
  return (
    <article class="flex">
      <div>
        <toggleGoal.Form>
          <input
            class="checkbox checkbox-secondary"
            type="checkbox"
            name="completed"
            checked={props.data.completed}
            onClick={(e) => e.currentTarget.form?.requestSubmit()}
          />
          <input type="hidden" name="id" value={props.data.id}/>
        </toggleGoal.Form>
      </div>
      <div>{props.data.title} | completed value in UI: {JSON.stringify(props.data.completed)}</div>
    </article>
  );
}
