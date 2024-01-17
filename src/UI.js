export default function createUserInterface () {
const mainContainer = document.querySelector('.main-container');
const header = document.createElement('header');
const h1 = document.createElement('h1');
const nav = document.createElement('nav');
const navItem = document.createElement('div');
const buttonHome = document.createElement('button');
const buttonToday = document.createElement('button');
const buttonWeek = document.createElement('button');
const homeCount = document.createElement('span');
const todayCount = document.createElement('span');
const weekCount = document.createElement('span');
const projectContainer = document.createElement('div');
const h3 = document.createElement('h3');
const addProjectBtn = document.createElement('button');
const mainContent = document.createElement('div');


header.className = 'header';
h1.textContent = 'To Do List';
nav.className = 'nav';
navItem.className = 'nav-item';
buttonHome.className = 'button-home';
buttonHome.textContent = 'All Tasks';
homeCount.className = 'home-count';
buttonToday.className = 'button-today';
buttonToday.textContent = 'Today';
todayCount.className = 'today-count';
buttonWeek.className = 'button-week';
buttonWeek.textContent = 'Week';
weekCount.className = 'week-count';
projectContainer.className = 'project-container';
h3.textContent = 'Projects';
addProjectBtn.className = 'add-project';
addProjectBtn.textContent = '+add project';
mainContent.className ='main-content';

mainContainer.appendChild(header);
header.appendChild(h1);
mainContainer.appendChild(nav);

nav.appendChild(navItem);
navItem.appendChild(buttonHome);
buttonHome.appendChild(homeCount);
navItem.appendChild(buttonToday);
buttonToday.appendChild(todayCount);
navItem.appendChild(buttonWeek);
buttonWeek.appendChild(weekCount);
nav.appendChild(projectContainer);
projectContainer.appendChild(h3);
projectContainer.appendChild(addProjectBtn);

mainContainer.appendChild(mainContent);

return mainContainer

};