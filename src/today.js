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
        const taskBtn = document.querySelector('.task-btn');
        taskBtn.addEventListener('click', () => {
            this.addTaskEvent();
        });
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
            this.todayContainer = document.createElement('div');
            this.todayContainer.classList.add('today-container');
            this.todayDiv = document.createElement('div');
            this.todayDiv.setAttribute('id', 'today-div');
            this.viewContent = document.createElement('div');
            this.viewContent.classList.add('viewContent');

            // Append the container to the main div
            mainDiv.appendChild(this.todayContainer);
            
            // Use 'this' to access todayContainer
            this.todayContainer.appendChild(this.todayDiv); 
            this.todayContainer.appendChild(this.viewContent);
            
            // Initialize btnContainer here
            this.btnContainer = document.createElement('div');
            this.btnContainer.setAttribute('id', 'btn-container');
            this.viewContent.appendChild(this.btnContainer);

            this.appendDefault();
        } else {
            console.error('Main div with id "todayContent" not found.');
        }
    },

    appendDefault: function() {
        const todayHeader = document.createElement('h1');
        todayHeader.textContent = 'Today';
        
        this.todayDiv.appendChild(todayHeader);
        this.appendTaskBtn(); // Make sure to call this after btnContainer is initialized
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
    },

    addTaskEvent: function() {
        console.log('button clicked');
        this.addForm();

    },

    addForm: function(){
        const formDiv = document.createElement('div');
        formDiv.classList.add('form-div');
        const btnContainer = document.getElementById('btn-container');
        const form = document.createElement('form');

        const taskNameInput = document.createElement('input');
        taskNameInput.setAttribute('type', 'text');
        taskNameInput.setAttribute('id', 'task-name');
        taskNameInput.setAttribute('name', 'task-name');
        taskNameInput.setAttribute('placeholder', 'Task name');
        form.appendChild(taskNameInput);

        const descriptionInput = document.createElement('input');
        descriptionInput.setAttribute('type', 'text');
        descriptionInput.setAttribute('id', 'description');
        descriptionInput.setAttribute('name', 'description');
        descriptionInput.setAttribute('placeholder', 'Description');
        form.appendChild(descriptionInput);

        const otherDetails = document.createElement('div')
        otherDetails.setAttribute('id', 'other-details');
        form.appendChild(otherDetails);

        const dueDateInput = document.createElement('input')
        dueDateInput.setAttribute('type', 'text');
        dueDateInput.setAttribute('id', 'due-date');
        dueDateInput.setAttribute('name', 'due-date');
        otherDetails.appendChild(dueDateInput);

        const prioritiesDiv = document.createElement('div');
        prioritiesDiv.setAttribute('id', 'priorities-div');
        otherDetails.appendChild(prioritiesDiv);


        const priorities = ['Priority 1', 'Priority 2', 'Priority 3'];
            priorities.forEach((priority, index) => {
            const prioritiesContainer = document.createElement('div');
            prioritiesContainer.classList.add('singlePriority');
            prioritiesDiv.appendChild(prioritiesContainer);
            const priorityInput = document.createElement('input');
            priorityInput.setAttribute('type', 'radio');
            priorityInput.setAttribute('id', `priority-${index}`);
            priorityInput.setAttribute('name', 'priority');
            priorityInput.setAttribute('value', priority.toLowerCase());

            const priorityLabel = document.createElement('label');
            priorityLabel.setAttribute('for', `priority-${index}`);
            priorityLabel.textContent = priority;

            prioritiesContainer.appendChild(priorityInput);
            prioritiesContainer.appendChild(priorityLabel);
            
    });


        formDiv.appendChild(form);
        btnContainer.appendChild(formDiv);

        function formatDate(date, format, locale) {
            const now = new Date();
            if (date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
                return "Today";
            }
            return flatpickr.formatDate(date, format, locale);
        }

        flatpickr("#due-date", {
            dateFormat: "Y-m-d",
            altInput: true,
            altFormat: "F j, Y",
            defaultDate: "today",
            formatDate: formatDate
        });

    },

    cancelForm: function(){

    }

};

export default addTodayDisplay;

