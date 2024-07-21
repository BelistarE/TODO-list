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
            this.radioLogic();
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

            mainDiv.appendChild(this.todayContainer);
            
           
            this.todayContainer.appendChild(this.todayDiv); 
            this.todayContainer.appendChild(this.viewContent);
            
            this.btnContainer = document.createElement('div');
            this.btnContainer.setAttribute('id', 'btn-container');

            this.tasksContainer = document.createElement('div')
            this.tasksContainer.setAttribute('id', 'task-container');
            this.btnContainer.appendChild(this.tasksContainer);
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
        this.appendTaskBtn(); 
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
    hideTaskBtn: function(){
        const removeTaskBtn = document.querySelector('.task-btn');
        while (removeTaskBtn.firstChild) {
            removeTaskBtn.removeChild(removeTaskBtn.firstChild);
        }
    },
    appendTask: function(taskName, description, dueDate, priority){
        
    
    },
    appendTaskToday: function(taskName, description, dueDate, priority) {
        const container = document.getElementById('task-container');
        const thisTask = document.createElement('div');
        thisTask.classList.add('task');
    
        const taskTitle = document.createElement('h3');
        taskTitle.textContent = taskName; 
        thisTask.appendChild(taskTitle);
    
    
        container.appendChild(thisTask);

    },
    addTaskEvent: function() {
        let taskName = '';
        let description = '';
        let dueDate = '';
        let priority = '';
        this.addForm();
        const form = document.querySelector('.form-div > form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();  
      
            taskName = document.getElementById('task-name').value;
            description = document.getElementById('description').value;
            dueDate = document.getElementById('due-date').value;
            priority = document.querySelector('input[name="priority"]:checked').value;
      
            console.log('Task Name:', taskName);
            console.log('Description:', description);
            console.log('Due Date:', dueDate);
            console.log('Priority:', priority);

            this.appendTask(taskName, description, dueDate, priority);

            if (dueDate === 'Today'){
                console.log("the task is due today");
                this.appendTaskToday(taskName, description, dueDate, priority);
            }

            form.reset();
        });


    },

    addForm: function(){
        this.hideTaskBtn();
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

        const dueDateInput = document.createElement('input');
        dueDateInput.setAttribute('type', 'text');
        dueDateInput.setAttribute('id', 'due-date');
        dueDateInput.setAttribute('name', 'due-date');
        const flatpickrDiv = document.createElement('div');
        flatpickrDiv.setAttribute("id",'flatpickr-div');
        flatpickrDiv.appendChild(dueDateInput);

        const dateIcon = document.createElement('span');
        dateIcon.classList.add('calendar-icon');
        dateIcon.innerHTML = '&#128197;';
        flatpickrDiv.appendChild(dateIcon);

        otherDetails.appendChild(flatpickrDiv);
        

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
            priorityLabel.classList.add('custom-radio');
            priorityLabel.textContent = priority;

            prioritiesContainer.appendChild(priorityInput);
            prioritiesContainer.appendChild(priorityLabel);
            
    });

        const submitForm = document.createElement('div');
        submitForm.classList.add('submitForm')
        form.appendChild(submitForm);

        const cancelButton = document.createElement('button');
        cancelButton.classList.add('cancel');
        cancelButton.textContent = 'Cancel';
        submitForm.appendChild(cancelButton);
    
        const submitButton = document.createElement('button');
        submitButton.setAttribute('type', 'submit');
        submitButton.textContent = 'Add task';
        submitButton.classList.add('submit-button'); 
        submitForm.appendChild(submitButton);

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
            formatDate: formatDate,
        });
    
        flatpickrDiv.addEventListener('click', function() {
            dueDateInput.click(); 
            console.log("flatpicker clicked");
        });
    
       
    },
    cancelForm: function(){
        this.appendTaskBtn();
        while (this.mainElement.firstChild) {
            this.mainElement.removeChild(this.mainElement.firstChild);
        }
        console.log('content cleared');

    },
    radioLogic: function() {
        // Initialize radio buttons
        console.log('radiologic initialized');
        document.querySelectorAll('.singlePriority').forEach(radioDiv => {
            radioDiv.addEventListener('click', function() {
                console.log("radio button clicked");
                const radioInput = this.querySelector('input[type="radio"]');
                if (!radioInput.checked) {
                    radioInput.checked = true;
                    radioInput.dispatchEvent(new Event('change'));
                }
            });
        });
    
        document.querySelectorAll('.singlePriority input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', function() {
                console.log('button changed');
                document.querySelectorAll('.singlePriority').forEach(div => {
                    div.classList.remove('checked');
                });
                if (this.checked) {
                    this.closest('.singlePriority').classList.add('checked');
                }
            });
        });
    }
    
};

export default addTodayDisplay;

