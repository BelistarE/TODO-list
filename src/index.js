import './style.css';
import today from './today';
import addTask from './addTask';
import { appendSidebar } from './sidebar'; 
let name = "beli";

console.log("Hewooo! To do list app loaded :3");

document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById('app');
   
    appendSidebar(name);

    const mainContent = document.createElement('div');
    mainContent.setAttribute('id', 'main');
    mainContent.classList.add('main');
    app.appendChild(mainContent);

    const mainModule = {
        init: function() {
            console.log('main module loaded');
            today.init();
            this.cacheDOM();
            this.btnFunctions();
        },
        cacheDOM: function() {
            this.addTask = document.querySelector('#add-task');
            this.today = document.getElementById('today');
        },
        btnFunctions: function() {
            this.today.addEventListener('click', () => {
                today.init();
            });
            this.addTask.addEventListener('click', () => {
                addTask.init();
            });
        },
    }

    mainModule.init();
});
