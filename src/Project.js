
import ToDoItem from "./todo";

export default class Project{
    constructor (name){
     this.name = name;
     this.toDoList = []; 
    }

    addToDoItem (title, description, dueDate, priority){
        const newTask = new ToDoItem(title, description, dueDate, priority);
        this.toDoList.push(newTask);  
    }

    
   removeTodoItem(index) {
        if (index >= 0 && index < this.toDoList.length) {
            this.toDoList.splice(index, 1);
        }
    }
}





