import addTaskIcon from './icons/add-task.svg';
import crossAdd from './icons/plus.svg';

const addTodayDisplay = {
    mainElement: null,

    init: function() {
        this.mainElement = document.querySelector('.main'); 
        if (this.mainElement) {
            this.clearContent();
            console.log('today display initialized');
            this.mainElement.setAttribute('id', 'todayContent');
            this.appendContainers();
        } else {
            console.error('Main element with class "main" not found.');
        }
    },

    clearContent: function() {
        while (this.mainElement.firstChild) {
            this.mainElement.removeChild(this.mainElement.firstChild);
        }
        console.log('content cleared');
    },

    appendContainers: function() {
        const mainDiv = document.getElementById('todayContent');
        if (mainDiv) {
            this.todayDiv = document.createElement('div');
            this.todayDiv.setAttribute('id', 'today-div');
            this.btnContainer = document.createElement('div');
            this.btnContainer.setAttribute('id', 'btn-container');

            mainDiv.appendChild(this.todayDiv); 
            mainDiv.appendChild(this.btnContainer);

            
            this.appendDefault();
            this.appendTaskBtn();
        } else {
            console.error('Main div with id "todayContent" not found.');
        }
    },

    appendDefault: function() {
        const todayHeader = document.createElement('h1');
        todayHeader.textContent = 'Today';
        
        this.todayDiv.appendChild(todayHeader);
        
    },

    appendTaskBtn: function() {
        const taskBtn = document.createElement('button');
        taskBtn.classList.add('task-btn');
        const plusIcon = document.createElement('img');
        plusIcon.src = crossAdd;
        const taskText = document.createElement('p');
        taskText.textContent = 'Add task';

        taskBtn.appendChild(plusIcon);
        taskBtn.appendChild(taskText);
        this.btnContainer.appendChild(taskBtn);


    }
};

export default addTodayDisplay;
