export default class ToDoItem {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
    
      updateDueDate(newDueDate) {
        this.dueDate = newDueDate;
      }
    
      updatePriority(newPriority) {
        this.priority = newPriority;
      }    
    
}


