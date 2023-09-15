import PocketBase, { ClientResponseError } from "pocketbase";
import { ServerError, redirect } from "solid-start";

const pb = new PocketBase("http://127.0.0.1:8090");
//pb.authStore.onChange(() => console.log(pb.authStore));

export async function loginFn(form: FormData): Promise<Response | undefined> {
  console.log("runing login function for: ", form.get("username"));
  try {
    const { record } = await pb
      .collection("users")
      .authWithPassword<User>(
        form.get("username") as string,
        form.get("password") as string
      );
    const user: User = {
      id: record.id,
      username: record.username,
      name: record.name,
      email: record.email,
      avatar: record.avatar,
    };
    return redirect("/");
  } catch (error) {
    if (error instanceof ClientResponseError) {
      throw new ServerError("Failed to authenticate", {
        status: (error as ClientResponseError).status,
      });
    }
  }
}

export async function registerFn(form: FormData) {
  try {
    await pb.collection("users").create(form);
    //TODO
    //await pb.collection("users").requestVerification(form.get("email") as string);
    pb.authStore.clear();
    return redirect("/login");
  } catch (error) {
    if (error instanceof ClientResponseError) {
      console.error(error);
      throw new ServerError("Failed to register", {
        status: error.status,
      });
    }
  }
}

export function logoutFn(): Response {
  pb.authStore.clear();
  return redirect("/login");
}

export function isLoggedIn(): boolean {
  return pb.authStore.isValid;
}

export function pbAuthStore() {
  return pb.authStore;
}

export function username(): string {
  return pb.authStore.model?.username || "";
}

export function userId(): string {
  return pb.authStore.model?.id;
}

export async function createGoalFn(form: FormData): Promise<Goal> {
  form.append("user", userId());
  return await pb.collection("goals").create<Goal>(form);
}

export async function fetchGoalsFn(): Promise<Goal[]> {
  return await pb
    .collection("goals")
    .getFullList<Goal>({ filter: `user = "${userId()}"` });
}

export async function toggleGoalFn(form: FormData): Promise<Goal> {
  const completed = form.get("completed") === null ? false : true;
  const id = form.get("id") as string;
  return await pb
    .collection("goals")
    .update<Goal>(id, { completed: completed });
}
