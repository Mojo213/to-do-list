(()=>{"use strict";class e{constructor(e,t,n,o){this.title=e,this.description=t,this.dueDate=n,this.priority=o}updateTitle(e){this.title=e}updateDescription(e){this.description=e}updateDueDate(e){this.dueDate=e}updatePriority(e){this.priority=e}}class t{constructor(e){this.name=e,this.toDoList=[]}addToDoItem(t,n,o,a){const d=new e(t,n,o,a);this.toDoList.push(d)}removeTodoItem(e){e>=0&&e<this.toDoList.length&&this.toDoList.splice(e,1)}}const n=new class{constructor(){this.projectList=[],this.selectedProject=null,this.addTaskForm=null,this.taskList=[]}createProjectNameInput(){const e=document.createElement("div"),t=document.createElement("form"),n=document.createElement("label"),o=document.createElement("input"),a=document.createElement("button"),d=document.createElement("button");return n.setAttribute("for","project-name"),o.id="project-name",o.placeholder="Project name",a.textContent="Add",d.textContent="Cancel",e.appendChild(t),t.appendChild(n),t.appendChild(o),t.appendChild(a),t.appendChild(d),e.className="projectAddForm",t.className="projectNameForm",a.className="add-button",d.className="cancel-button",e}handleProjectButtonClick(){const e=document.querySelector(".project-container");let n;document.querySelector(".add-project").addEventListener("click",(o=>{if(o.preventDefault(),n)n.classList.toggle("hide-input");else{n=this.createProjectNameInput(),e.appendChild(n);const o=n.querySelector(".cancel-button"),a=n.querySelector(".add-button");o.addEventListener("click",(e=>{e.preventDefault(),n.classList.add("hide-input")})),a.addEventListener("click",(o=>{o.preventDefault();const a=n.querySelector("#project-name"),d=a.value.trim(),c=d.charAt(0).toUpperCase()+d.slice(1);if(""===c||this.projectList.some((e=>e.name===c)))alert("Project name already exists. Choose another Project name.");else{const o=new t(c);this.projectList.push(o);const d=document.createElement("button");d.textContent=o.name,e.appendChild(d),d.className=o.name,d.classList.add("project-button"),this.selectedProject=o,a.value="",n.classList.add("hide-input")}}))}}))}handleProjectClick(){const e=document.querySelector(".project-container"),t=document.querySelector(".main-content");e.addEventListener("click",(e=>{const n=e.target.closest(".project-button");if(n){const e=n.textContent;this.selectedProject=this.projectList.find((t=>t.name===e)),t.innerHTML="";const o=document.createElement("h1");o.textContent=this.selectedProject.name;const a=document.createElement("button");a.textContent="+add task",a.className="add-todo-task",t.appendChild(o),t.appendChild(a);for(const e of this.selectedProject.toDoList){const n=this.createToDoTaskElement(e);t.appendChild(n)}}}))}createTodoTaskForm(){const e=document.createElement("div"),t=document.createElement("form"),n=document.createElement("label"),o=document.createElement("input"),a=document.createElement("label"),d=document.createElement("textarea"),c=document.createElement("label"),s=document.createElement("input"),i=document.createElement("label"),r=document.createElement("select"),l=document.createElement("option"),m=document.createElement("option"),u=document.createElement("option"),p=document.createElement("button"),h=document.createElement("button");return e.className="add-task-form",n.setAttribute("for","task-name"),o.id="task-name",o.placeholder="Task name",o.required=!0,a.setAttribute("for","description"),d.id="description",d.placeholder="Task description",d.required=!0,c.setAttribute("for","due-date"),s.id="due-date",s.type="date",s.placeholder="Select a date",s.required=!0,i.setAttribute("for","priority"),r.id="priority",l.className="priority-low",l.textContent="Low",m.className="priority-med",m.textContent="Medium",u.className="priority-high",u.textContent="High",r.required=!0,p.textContent="Add",p.className="add-button",h.textContent="Cancel",h.className="cancel-button",e.appendChild(t),t.appendChild(n),t.appendChild(o),t.appendChild(a),t.appendChild(d),t.appendChild(c),t.appendChild(s),t.appendChild(i),t.appendChild(r),r.appendChild(l),r.appendChild(m),r.appendChild(u),t.appendChild(p),t.appendChild(h),e}handleAddTaskClick(t){const n=document.querySelector(".main-content");n.addEventListener("click",(o=>{if(o.preventDefault(),o.target.closest(t)){if(this.addTaskForm)return this.addTaskForm.remove(),void(this.addTaskForm=null);this.addTaskForm=this.createTodoTaskForm(),n.appendChild(this.addTaskForm);const o=this.addTaskForm.querySelector(".cancel-button"),a=this.addTaskForm.querySelector(".add-button");o.addEventListener("click",(e=>{e.preventDefault(),this.addTaskForm.remove(),this.addTaskForm=null})),a.addEventListener("click",(o=>{o.preventDefault();const a=document.querySelector("#task-name"),d=document.querySelector("#description"),c=document.querySelector("#due-date"),s=document.querySelector("#priority"),i=a.value.trim(),r=d.value,l=c.value,m=s.value;if(""!==i&&""!==r&&""!==l&&""!==m)if(this.taskList.some((e=>e.title===i)))alert("Todo task already exists in another project. Choose a different name.");else{const o=new e(i,r,l,m);".add-todo-task"===t?(this.selectedProject.toDoList.push(o),this.taskList.push(o)):".home-add-task-btn"===t&&this.taskList.push(o);const a=this.createToDoTaskElement(o);n.appendChild(a),this.addTaskForm.remove(),this.addTaskForm=null}else alert("Please ensure you have filled all fields.")}))}}))}setPriorityColor(e){switch(e){case"Low":return"#b4f7a3";case"Medium":return"#f2a053";case"High":return"red";default:return"white"}}displayHomeProjectsTodo(){const e=document.querySelector(".button-home"),t=document.querySelector(".main-content");e.addEventListener("click",(()=>{t.innerHTML="";const e=document.createElement("h2"),n=document.createElement("button");n.textContent="+add task",n.className="home-add-task-btn",e.textContent="All Tasks",t.appendChild(e),t.appendChild(n),this.taskList.length>0&&this.taskList.forEach((e=>{const n=this.createToDoTaskElement(e);t.appendChild(n)}))}))}createToDoTaskElement(e){const t=document.createElement("div"),n=document.createElement("button"),o=document.createElement("div"),a=document.createElement("div"),d=document.createElement("div");return t.className="to-do-div",n.className="delete-task",o.className="to-do-header",a.className="to-do-description",d.className="to-do-date",o.textContent=e.title,a.textContent=e.description,d.textContent=e.dueDate,n.textContent="X",t.style.backgroundColor=this.setPriorityColor(e.priority),t.appendChild(n),t.appendChild(o),t.appendChild(a),t.appendChild(d),t}deleteTask(){document.querySelector(".main-content").addEventListener("click",(e=>{const n=e.target.closest(".delete-task");if(n){const e=n.closest(".to-do-div");if(e){const n=e.querySelector(".to-do-header");if(n){const o=n.textContent.trim(),a=this.taskList.findIndex((e=>e.title===o));if(-1!==a){this.selectedProject instanceof t&&this.selectedProject.removeTodoItem(a),this.taskList.splice(a,1)[0];for(const e of this.projectList){const t=e.toDoList.find((e=>e.title===o));t&&e.removeTodoItem(e.toDoList.indexOf(t))}e.remove()}}}}}))}};!function(){const e=document.querySelector(".main-container"),t=document.createElement("header"),n=document.createElement("h1"),o=document.createElement("nav"),a=document.createElement("div"),d=document.createElement("button"),c=document.createElement("button"),s=document.createElement("button"),i=document.createElement("span"),r=document.createElement("span"),l=document.createElement("span"),m=document.createElement("div"),u=document.createElement("h3"),p=document.createElement("button"),h=document.createElement("div");t.className="header",n.textContent="To Do List",o.className="nav",a.className="nav-item",d.className="button-home",d.textContent="All Tasks",i.className="home-count",c.className="button-today",c.textContent="Today",r.className="today-count",s.className="button-week",s.textContent="Week",l.className="week-count",m.className="project-container",u.textContent="Projects",p.className="add-project",p.textContent="+add project",h.className="main-content",e.appendChild(t),t.appendChild(n),e.appendChild(o),o.appendChild(a),a.appendChild(d),d.appendChild(i),a.appendChild(c),c.appendChild(r),a.appendChild(s),s.appendChild(l),o.appendChild(m),m.appendChild(u),m.appendChild(p),e.appendChild(h)}(),n.handleProjectButtonClick(),n.handleProjectClick(),n.handleAddTaskClick(".add-todo-task"),n.handleAddTaskClick(".home-add-task-btn"),n.displayHomeProjectsTodo(),n.deleteTask()})();