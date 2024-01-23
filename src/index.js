import createUserInterface from "./UI";
import ProjectManager from "./projectManager";


const projectManager = new ProjectManager();



createUserInterface();
projectManager.handleProjectButtonClick();
projectManager.handleProjectClick();
projectManager.handleAddTaskClick(".add-todo-task");
projectManager.handleAddTaskClick(".home-add-task-btn");
projectManager.displayHomeProjectsTodo();
projectManager.handleDueDateClick();
projectManager.displayTodayTodoTasks();
projectManager.displayWeekTodoTasks();
projectManager.loadFromLocalStorage();
projectManager.refreshUI();





