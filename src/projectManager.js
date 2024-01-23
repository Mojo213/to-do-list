import Project from "./Project";
import ToDoItem from "./todo";
import { format } from 'date-fns';


 export default class ProjectManager {
  constructor() {
    this.projectList = [];
    this.selectedProject = null;
    this.addTaskForm = null;
    this.taskList = [];
    this.todayList = [];
    this.weekList = [];
  }

  saveToLocalStorage() {
    const data = {
      projectList: this.projectList,
      taskList: this.taskList,
    };
  
    localStorage.setItem('todoAppData', JSON.stringify(data));
  }
  
  loadFromLocalStorage() {
    const storedData = localStorage.getItem('todoAppData');
  
    if (storedData) {
      const data = JSON.parse(storedData);
  
      this.taskList = [];
  
      this.projectList = data.projectList.map(projectData => {
        const project = new Project(projectData.name);
  
        projectData.toDoList.forEach(taskData => {
          project.addToDoItem(taskData.title, taskData.description, taskData.dueDate, taskData.priority);
          this.taskList.push(taskData); 
        });
  
        return project;
      });
  
    
      data.taskList.forEach(taskData => {
        if (!this.projectList.some(project => project.toDoList.some(task => task.title === taskData.title))) {
          this.taskList.push(taskData);
        }
      });
    }
  }
  
  

  refreshUI() {
    this.updateProjectListUI();

  }

  updateProjectListUI() {
    const projectContainer = document.querySelector('.project-container');
    document.querySelectorAll('.project-button').forEach(button => button.remove());
  
    this.projectList.forEach(project => {
      const projectButton = this.createProjectButton(project);
      const deleteButton = this.createDeleteProjectButton(project.name, projectButton);
  
      projectContainer.appendChild(projectButton);
      projectContainer.appendChild(deleteButton);
    });
  }
  


  createProjectButton(project) {
    const projectButton = document.createElement('button');
    projectButton.textContent = project.name;
    projectButton.className = project.name;
    projectButton.classList.add('project-button');
    return projectButton;
  }

  createDeleteProjectButton(projectName, projectButton) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-project-button';

    deleteButton.addEventListener('click', () => {
      this.deleteProject(projectName);
      projectButton.remove();
      deleteButton.remove();
      this.saveToLocalStorage();
    });

    return deleteButton;
  }

  selectProject(projectButton) {
    const projectName = projectButton.textContent;
    this.selectedProject = this.projectList.find(project => project.name === projectName);

  }

  createProjectNameInput() {
    const projectNameDiv = document.createElement('div');
    const projectNameForm = document.createElement('form');
    const prjNameLabel = document.createElement('label');
    const prjNameInput = document.createElement('input');
    const addBtn = document.createElement('button');
    const cancelBtn = document.createElement('button');

    prjNameLabel.setAttribute('for', 'project-name');
    prjNameInput.id = 'project-name';
    prjNameInput.placeholder = 'Project name';
    addBtn.textContent = 'Add';
    cancelBtn.textContent = 'Cancel';

    projectNameDiv.appendChild(projectNameForm);
    projectNameForm.appendChild(prjNameLabel);
    projectNameForm.appendChild(prjNameInput);
    projectNameForm.appendChild(addBtn);
    projectNameForm.appendChild(cancelBtn);

    projectNameDiv.className = 'projectAddForm';
    projectNameForm.className = 'projectNameForm';
    addBtn.className = 'add-button';
    cancelBtn.className = 'cancel-button';

    return projectNameDiv;
  }


handleProjectButtonClick() {
  const projectContainer = document.querySelector('.project-container');
  const addProjectBtn = document.querySelector('.add-project');

  let projectNameDiv;

  addProjectBtn.addEventListener('click', (event) => {
    event.preventDefault();

    if (!projectNameDiv) {
      projectNameDiv = this.createProjectNameInput();
      projectContainer.appendChild(projectNameDiv);

      const cancelBtn = projectNameDiv.querySelector('.cancel-button');
      const addBtn = projectNameDiv.querySelector('.add-button');

      cancelBtn.addEventListener('click', (event) => {
        event.preventDefault();
        projectNameDiv.classList.add('hide-input');
      });

      addBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const projectNameInput = projectNameDiv.querySelector('#project-name');
        const projectName = projectNameInput.value.trim();
        const capitalizedProjectName = projectName.charAt(0).toUpperCase() + projectName.slice(1);

        if (capitalizedProjectName !== '' && !this.projectList.some(project => project.name === capitalizedProjectName)) {
          const newProject = new Project(capitalizedProjectName);
          this.projectList.push(newProject);

          const projectButton = this.createProjectButton(newProject);
          const deleteButton = this.createDeleteProjectButton(capitalizedProjectName, projectButton);
      
          projectContainer.appendChild(projectButton);
          projectContainer.appendChild(deleteButton);
      
          this.selectedProject = newProject;
      
          projectNameInput.value = '';
          projectNameDiv.classList.add('hide-input');
          this.saveToLocalStorage()
          
        } else {
          alert('Project name already exists. Choose another Project name.');
        }
      });
    } else {
      projectNameDiv.classList.toggle('hide-input');
    }
  });
}




  handleProjectClick() {
    const projectContainer = document.querySelector('.project-container');
    const mainContent = document.querySelector('.main-content');

    projectContainer.addEventListener('click', (event) => {
      const projectButton = event.target.closest('.project-button');

      if (projectButton) {
        this.selectProject(projectButton);

        mainContent.innerHTML = '';

        const projectNameDisplay = document.createElement('h1');
        projectNameDisplay.textContent = this.selectedProject.name;
        const todoTask = document.createElement('button');
        todoTask.textContent = '+add task';
        todoTask.className = 'add-todo-task';
        mainContent.appendChild(projectNameDisplay);
        mainContent.appendChild(todoTask);
        

        for (const task of this.selectedProject.toDoList) {
          
          const toDoDiv = this.createToDoTaskElement(task);
          mainContent.appendChild(toDoDiv);
          
        }
      }
    });
  }

  createTodoTaskForm() {
    const todoDiv = document.createElement('div');
    const todoForm = document.createElement('form');
    const todoNameLabel = document.createElement('label');
    const todoNameInput = document.createElement('input');
    const todoDescLabel = document.createElement('label');
    const todoDescInput = document.createElement('textarea');
    const todoDueDateLabel = document.createElement('label');
    const todoDueDateInput = document.createElement('input');
    const todoPriorityLabel = document.createElement('label');
    const todoPriorityInput = document.createElement('select');
    const priorityValueLow = document.createElement('option');
    const priorityValueMed = document.createElement('option');
    const priorityValueHigh = document.createElement('option');
    const addBtn = document.createElement('button');
    const cancelBtn = document.createElement('button');

    todoDiv.className = 'add-task-form';
    todoNameLabel.setAttribute('for', 'task-name');
    todoNameInput.id = 'task-name';
    todoNameInput.placeholder = 'Task name';
    todoNameInput.required = true;
    todoDescLabel.setAttribute('for', 'description');
    todoDescInput.id = 'description';
    todoDescInput.placeholder = 'Task description';
    todoDescInput.required = true;
    todoDueDateLabel.setAttribute('for', 'due-date');
    todoDueDateInput.id = 'due-date';
    todoDueDateInput.type = 'date';
    todoDueDateInput.required = true;
    todoPriorityLabel.setAttribute('for', 'priority');
    todoPriorityInput.id = 'priority';
    priorityValueLow.className = 'priority-low';
    priorityValueLow.textContent = 'Low';
    priorityValueMed.className = 'priority-med';
    priorityValueMed.textContent = 'Medium';
    priorityValueHigh.className = 'priority-high';
    priorityValueHigh.textContent = 'High';
    todoPriorityInput.required = true;
    addBtn.textContent = 'Add';
    addBtn.className = 'add-button';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.className = 'cancel-button';

    todoDiv.appendChild(todoForm);
    todoForm.appendChild(todoNameLabel);
    todoForm.appendChild(todoNameInput);
    todoForm.appendChild(todoDescLabel);
    todoForm.appendChild(todoDescInput);
    todoForm.appendChild(todoDueDateLabel);
    todoForm.appendChild(todoDueDateInput);
    todoForm.appendChild(todoPriorityLabel);
    todoForm.appendChild(todoPriorityInput);
    todoPriorityInput.appendChild(priorityValueLow);
    todoPriorityInput.appendChild(priorityValueMed);
    todoPriorityInput.appendChild(priorityValueHigh);
    todoForm.appendChild(addBtn);
    todoForm.appendChild(cancelBtn);

    return todoDiv;
  }

  handleAddTaskClick(taskButtonClass) {
    const mainContent = document.querySelector('.main-content');

    mainContent.addEventListener('click', (event) => {
      event.preventDefault();

      const addTaskButton = event.target.closest(taskButtonClass);
      if (addTaskButton) {
        if (!this.addTaskForm) {
          this.addTaskForm = this.createTodoTaskForm();
          mainContent.appendChild(this.addTaskForm);
        } else {
          this.addTaskForm.remove();
          this.addTaskForm = null;
          return;
        }

        const cancelBtn = this.addTaskForm.querySelector('.cancel-button');
        const addBtn = this.addTaskForm.querySelector('.add-button');

        cancelBtn.addEventListener('click', (event) => {
          event.preventDefault();
          this.addTaskForm.remove();
          this.addTaskForm = null;
          return;
        });

        addBtn.addEventListener('click', (event) => {
            event.preventDefault();
            const taskNameInput = document.querySelector('#task-name');
            const descriptionInput = document.querySelector('#description');
            const dueDateInput = document.querySelector('#due-date');
            const priorityInput = document.querySelector('#priority');
          
            const taskNameValue = taskNameInput.value.trim();
            const descriptionValue = descriptionInput.value;
            const dueDateValue = dueDateInput.value;
            const priorityValue = priorityInput.value;
          
            if (taskNameValue !== '' && descriptionValue !== '' && dueDateValue !== '' && priorityValue !== '') {
             
              const taskExists = this.taskList.some(task => task.title === taskNameValue);
          
              if (taskExists) {
                alert('Todo task already exists in another project. Choose a different name.');
              } else {
                const newToDoTask = new ToDoItem(taskNameValue, descriptionValue, dueDateValue, priorityValue);
          
                if (taskButtonClass === '.add-todo-task') {
                  this.selectedProject.toDoList.push(newToDoTask);
                  this.taskList.push(newToDoTask);
                  this.saveToLocalStorage()
    
                } else if (taskButtonClass === '.home-add-task-btn') {
                  this.taskList.push(newToDoTask);
                  this.saveToLocalStorage()
                 
                }
          
                const toDoDiv = this.createToDoTaskElement(newToDoTask);
                mainContent.appendChild(toDoDiv);
          
                this.addTaskForm.remove();
                this.addTaskForm = null;
                this.saveToLocalStorage()
              }
            } else {
              alert('Please ensure you have filled all fields.');
            }
          });
      }
    });
  }



  setPriorityColor(priority) {
    switch (priority) {
      case 'Low':
        return '#b4f7a3';
      case 'Medium':
        return '#f2a053';
      case 'High':
        return 'red';
      default:
        return 'white';
    }
  }


displayHomeProjectsTodo() {
    const home = document.querySelector('.button-home');
    const mainContent = document.querySelector('.main-content');
  
    home.addEventListener('click', () => {
      mainContent.innerHTML = ''; 
      const h2 = document.createElement('h2'); 
      const todoTask = document.createElement('button');
        todoTask.textContent = '+add task';
        todoTask.className = 'home-add-task-btn';
        
    
      h2.textContent = 'All Tasks';
       mainContent.appendChild(h2);
       mainContent.appendChild(todoTask); 

       if(this.taskList.length > 0){
      this.taskList.forEach(taskObj => {
        const toDoDiv = this.createToDoTaskElement(taskObj);
        
        mainContent.appendChild(toDoDiv);
      });} 
    });
}

displayTodayTodoTasks() {
  const today = document.querySelector('.button-today');
  const mainContent = document.querySelector('.main-content');

  today.addEventListener('click', () => {
    mainContent.innerHTML = ''; 
    const h2 = document.createElement('h2');
      
  
    h2.textContent = 'Today';
     mainContent.appendChild(h2);

     const currentDate =  this.formatDate(new Date());
     this.todayList = this.taskList.filter((task) => { const taskDueDate =  this.formatDate(task.dueDate); return taskDueDate === currentDate});

     if(this.todayList.length > 0){
    this.todayList.forEach(taskObj => {
      const toDoDiv = this.createToDoTaskElement(taskObj);
      
      mainContent.appendChild(toDoDiv);
    });} 
  });
}

displayWeekTodoTasks() {
  const week = document.querySelector('.button-week');
  const mainContent = document.querySelector('.main-content');

  week.addEventListener('click', () => {
    mainContent.innerHTML = ''; 
    const h2 = document.createElement('h2');
      
    h2.textContent = 'Week';
    mainContent.appendChild(h2);

    const todaysDate = new Date();
    const todaysDay = todaysDate.getDay();
    const daysUntilMonday = todaysDay === 0 ? 6 : todaysDay - 1;
    const weekStarting = new Date(todaysDate);
    weekStarting.setDate(todaysDate.getDate() - daysUntilMonday);

    const weekEnding = new Date(weekStarting);
    weekEnding.setDate(weekEnding.getDate() + 6);

    this.weekList = this.taskList.filter((task) => {
      const taskDueDate = new Date(task.dueDate);
      return taskDueDate >= weekStarting && taskDueDate <= weekEnding;
    });

    if (this.weekList.length > 0) {
      this.weekList.forEach(taskObj => {
        const toDoDiv = this.createToDoTaskElement(taskObj);
        mainContent.appendChild(toDoDiv);
      });
    } 
  });
}



createToDoTaskElement(task) {
  const toDoDiv = document.createElement('div');
  toDoDiv.className = 'to-do-div';

  const title = this.createTaskElement('to-do-header', task.title);
  const description = this.createTaskElement('to-do-description', task.description);
  const dueDate = this.createTaskElement('due-date', this.formatDate(new Date(task.dueDate)));

  toDoDiv.style.backgroundColor = this.setPriorityColor(task.priority);

  toDoDiv.appendChild(title);
  toDoDiv.appendChild(description);
  toDoDiv.appendChild(dueDate);
  
  const deleteButton = this.createDeleteTaskButton(toDoDiv);
  deleteButton.addEventListener('click', () => this.deleteTask());
  toDoDiv.appendChild(deleteButton);

  return toDoDiv;
}

createTaskElement(className, textContent) {
  const element = document.createElement('div');
  element.className = className;
  element.textContent = textContent;
  return element;
}

createDeleteTaskButton() {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.className = 'delete-task';

  deleteButton.addEventListener('click', () => {
    this.deleteTask();
  });

  return deleteButton;
}


  deleteTask(){
  const mainContent = document.querySelector('.main-content');

  mainContent.addEventListener('click', (event)=>{
  if(event.target.classList.contains('delete-task')){
   const toDoDiv = event.target.parentElement
   if (toDoDiv && toDoDiv.classList.contains('to-do-div')){
      const taskTitle = toDoDiv.querySelector('.to-do-header').textContent.trim();
      const indexOfItem = this.taskList.findIndex((task) => taskTitle === task.title);

    for (const project of this.projectList) {
      const indexOfProjectTask =  project.toDoList.findIndex((Task) => Task.title === taskTitle);
      if (indexOfProjectTask !== -1) {
        project.removeTodoItem(indexOfProjectTask);

      }
    }

    if (indexOfItem !== -1) {
         this.taskList.splice(indexOfItem, 1);
         toDoDiv.remove();
         
      } 
     
    }
  }    

  })

}
  

createDueDateInput(dueDateValue, task) {
  const dueDateInput = document.createElement('input');
  dueDateInput.type = 'date';
  dueDateInput.value = dueDateValue;

  dueDateInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const newDueDate = event.target.value;
      task.updateDueDate(newDueDate);

      const formattedDueDate = this.formatDate(newDueDate);

      const updatedDueDateDiv = document.createElement('div');
      updatedDueDateDiv.className = 'due-date';
      updatedDueDateDiv.textContent = formattedDueDate; 
      dueDateInput.replaceWith(updatedDueDateDiv);
      this.saveToLocalStorage();
    }
  });

  return dueDateInput;
}



handleDueDateClick() {
  const mainContent = document.querySelector('.main-content');

  mainContent.addEventListener('click', (event) => {
    const dateDiv = event.target.closest('.due-date');

    if (dateDiv) {
      const taskDiv = dateDiv.closest('.to-do-div');
      const dueDateValue = dateDiv.textContent.trim();

      if (taskDiv) {
        const titleDiv = taskDiv.querySelector('.to-do-header');
        const taskTitle = titleDiv.textContent.trim();

        const selectedTask = this.findTaskInArrays(taskTitle);

        if (selectedTask) {
          const dueDateInput = this.createDueDateInput(dueDateValue, selectedTask);

          dateDiv.replaceWith(dueDateInput);

          dueDateInput.focus();
          this.saveToLocalStorage();
        }
      }
    }
  });
}

findTaskInArrays(taskTitle) {

  const globalTask = this.taskList.find(task => task.title === taskTitle);
  if (globalTask) {
    return globalTask;
  }

  for (const project of this.projectList) {
    const projectTask = project.toDoList.find(task => task.title === taskTitle);
    if (projectTask) {
      return projectTask;
    }
  }

  return null;
}

formatDate(date) {
  return format(new Date(date), 'dd-MM-yyyy');
}

deleteProject(projectName) {
  const projectIndex = this.projectList.findIndex(project => project.name === projectName);
  const mainContent = document.querySelector('.main-content');
  
  if (projectIndex !== -1) {
    const deletedProject = this.projectList.splice(projectIndex, 1)[0];
    this.taskList = this.taskList.filter(task => !deletedProject.toDoList.some(projectTask => projectTask.title === task.title));

    mainContent.innerHTML = '';
    this.saveToLocalStorage();
  }
}

}
 





































 
    



    
    
    




