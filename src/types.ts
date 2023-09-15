type SharedAttributes = {
    id: string;
    created: string | Date;
    title: string;
    description?: string;
    deadline?: string | Date;
  };
  
  type Goal = SharedAttributes & { completed: boolean };
  //maybe will only need to pass the id, maybe the whole associated parent Goal, not sure yet
  type Milestone = Goal & { parentGoal: string | Goal };
  type Resolution = SharedAttributes & { frequency: Frequency };
  
  type Frequency =
    | "daily"
    | "sun"
    | "mon"
    | "tue"
    | "wed"
    | "thu"
    | "fri"
    | "sat";
  
  //dunno if I'll need this but whatevs
  
  type User = {
      id: string,
      username: string,
      email: string,
      name: string,
      avatar?: string | File
  }