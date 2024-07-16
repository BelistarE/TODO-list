console.log("Hewooo! To do list app loaded :3");

import './style.css';
import today from './today';
import addTask from './addTask';
import addTaskIcon from './icons/add-task.svg';
import todayIcon from './icons/calendar-star.svg';
import searchIcon from './icons/magnify.svg';
import upcomingIcon from './icons/calendar-range-outline.svg';
import sidebarIcon from './icons/sidebar.png';
let name = "beli";

function loadContent (name){
    document.addEventListener("DOMContentLoaded", () => {
        const app = document.getElementById('app');
       
        function appendSidebar() {
            const sidebar = document.createElement('div');
            sidebar.classList.add('sidebar');
          
        
            const header = document.createElement('div');
            header.setAttribute('id', 'header');
            const headerLeft = document.createElement('div');
            const headerRight = document.createElement('div');
            headerLeft.setAttribute('id', 'header-left');
            headerRight.setAttribute('id', 'header-right');
            const greeting = document.createElement('h2');
            const userName = document.createElement('h3');
            const buttonDiv = document.createElement('div');
            buttonDiv.classList.add('buttonDiv');

            //icon stuff
            const sidebarDiv = document.createElement('div');
            const sdbrIcon = document.createElement('img');
            sdbrIcon.classList.add('icon');
            sdbrIcon.src = sidebarIcon;

            //custom name goes here
            userName.textContent = name;

    
            greeting.textContent = 'Hello there,';

            headerRight.appendChild(sidebarDiv);
            sidebarDiv.appendChild(sdbrIcon);
            sidebar.appendChild(header);
            header.appendChild(headerLeft);
            header.appendChild(headerRight);
            headerLeft.appendChild(greeting);
            headerLeft.appendChild(userName);
            sidebar.appendChild(buttonDiv);
            
          
            const buttons = [
                { text: 'Add Task',id: 'add-task', icon: addTaskIcon },
                { text: 'Search',id: 'search', icon: searchIcon },
                { text: 'Today',id: 'today', icon: todayIcon },
                { text: 'Upcoming',id: 'upcoming', icon: upcomingIcon }
              ];
    
              buttons.forEach(button => {
                const buttonWrapper = document.createElement('div');
                buttonWrapper.classList.add('button-wrapper');
                buttonWrapper.setAttribute('id', button.id)
                
                const icon = document.createElement('img');
                icon.src = button.icon; 
                icon.classList.add('button-icon');
              
                const buttonElement = document.createElement('button');
                buttonElement.textContent = button.text;
              
                buttonElement.classList.add('sidebar-button');
                
                buttonWrapper.appendChild(icon);
                buttonWrapper.appendChild(buttonElement);
              
                buttonDiv.appendChild(buttonWrapper);
              });
            
            
            app.appendChild(sidebar);
        }
        function appendContent(){
            const mainContent = document.createElement('div');
            mainContent.setAttribute('id','main');
            mainContent.classList.add('main');
            app.appendChild(mainContent);
            const mainModule = {
                init:function(){
                    console.log('main module loaded');
                    today.init();
                    this.cacheDOM();
                    this.btnFunctions();

                },
                cacheDOM: function(){
                    this.addTask = document.querySelector('#add-task');
                    this.today = document.getElementById('today');
                },
                btnFunctions: function(){
                    this.today.addEventListener('click', () => {
                        today.init();
                    });
                    this.addTask.addEventListener('click', () => {
                        addTask.init();
                    });
                },
            }
            mainModule.init();
        }
        appendSidebar();
        appendContent();
      });
      

}
loadContent(name);
