import { Todo, Priority } from "./interface";

export class ToDoList implements Todo {
  task: string;
  completed: boolean;
  priority: Priority;

  //Array med todo-objekt
  todos: Todo[];

  constructor(todolist: Todo[]) {
    // this.task = task;
    // this.completed = completed;
    // this.priority = priority;
    // //Ladda från local storage
    // this.loadFromLocalStorage();
    this.todos = todolist;
  }

  //Metod för att lägga till nya todos med prioritet
  addTodo(task: string, priority: number): boolean {
    if (task != "" && priority >= 1 && priority <= 3) {
      const newTodo: Todo = {
        task: task,
        completed: false,
        priority: priority as Priority,
      };
      //Lägg till aktivitet i array
      this.todos.push(newTodo);
      this.saveToLocalStorage();
      return true;
    } else {
      return false;
    }
  }

  //Metod för att markera todos som klara
  markTodoCompleted(todoIndex: number): void {
    if (todoIndex >= 0 && todoIndex < this.todos.length) {
      this.todos[todoIndex].completed = true;
      this.saveToLocalStorage();
    }
  }

  //Metod för att hämta hela listan av todos
  getTodos(): Todo[] {
    return this.todos || [];
  }

  //Metod för att spara todos till LocalStorage
  saveToLocalStorage(): void {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  //Metod för att hämta todos från LocalStorage
  loadFromLocalStorage(): void {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  }

  markAsCompleted(todo: Todo, index: number): void {
    this.todos[index].completed = !todo.completed;
    this.saveToLocalStorage();
  }
}
