import { JSX } from "solid-js";

export default function Card(props: {
  children?: JSX.Element;
  data: Goal | Resolution;
}) {
  return (
    <article>
      <div>checkbox div</div>
      <div>data div for {props.data.title}</div>
    </article>
  );
}
