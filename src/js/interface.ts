//Egen typ för prioritet
export type Priority = 1 | 2 | 3;

//Interface för ToDoList
export interface Todo {
  task: string;
  completed: boolean;
  priority: Priority; // 1-3, där 1 är viktigast och 3 är minst viktigt
}
