import { ToDoList } from "./todo";
import { Todo } from "./interface";

// //Variabler för HTML-element
const inputEl = document.getElementById("input") as HTMLTextAreaElement;
const priorityEl = document.getElementById("priority") as HTMLInputElement;
const addEl = document.getElementById("add") as HTMLInputElement;
const todosEl = document.getElementById("todos") as HTMLDivElement;
const errorEl = document.getElementById("error") as HTMLDivElement;

const initialTodoList = window.localStorage.getItem("todos");
const todoObject = new ToDoList(
  initialTodoList ? JSON.parse(initialTodoList || "") : []
);

function displayTodos(): void {
  todosEl.innerHTML = "";
  const todoList = todoObject.getTodos();
  todoList.forEach((todo, index) => {
    const divElement = document.createElement("div") as HTMLDivElement;
    divElement.classList.add("todo-div");

    const paragraphElement = document.createElement(
      "p"
    ) as HTMLParagraphElement;
    paragraphElement.textContent = todo.task;
    paragraphElement.classList.add("paragraph");

    const divForPriority = document.createElement("div") as HTMLDivElement;
    divForPriority.classList.add("div-for-priority");

    const priorityParagraph = document.createElement(
      "p"
    ) as HTMLParagraphElement;
    priorityParagraph.classList.add("priority");

    //Kontrollera att prioritet är satt
    if (todo.priority === 1) {
      priorityParagraph.textContent = "Prioritet: Hög";
      divElement.classList.add("high");
    } else if (todo.priority === 2) {
      priorityParagraph.textContent = "Prioritet: Medium";
      divElement.classList.add("medium");
    } else if (todo.priority === 3) {
      priorityParagraph.textContent = "Prioritet: Låg";
      divElement.classList.add("low");
    } else {
      errorEl.textContent = "Du måste välja en prioritet!";
      return;
    }

    if (todo.completed) {
      divElement.classList.add("completed");
    }

    const checkBoxElement = document.createElement("input") as HTMLInputElement;
    checkBoxElement.type = "checkbox";
    checkBoxElement.checked = todo.completed;
    checkBoxElement.addEventListener("change", function () {
      todoObject.markAsCompleted(todo, index);
      displayTodos();
    });
    checkBoxElement.classList.add("checkbox");

    divForPriority.appendChild(priorityParagraph);
    divForPriority.appendChild(checkBoxElement);

    divElement.appendChild(paragraphElement);
    divElement.appendChild(divForPriority);

    todosEl.appendChild(divElement);
  });
}
displayTodos();

addEl.addEventListener("click", function () {
  event?.preventDefault();

  const value = inputEl.value;
  const priority = priorityEl.value;

  todoObject.addTodo(value, parseInt(priority));
  displayTodos();
});
