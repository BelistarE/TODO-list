import crossAdd from './icons/plus.svg';
import TaskData from './storage';

/*hello friend! if you are reading this because you saw this project in TOP and want help or inspiration,
i sincerely apologize for my jumbeled code. i wrote this over the span of 3 weeks and it is not very organized.
give me a follow on insta tho @is_abeli
*/
const addTodayDisplay = {
    mainElement: null,

    init: function() {
        
        this.mainElement = document.querySelector('.main'); 
        if (this.mainElement) {
            this.clearContent();
            console.log('today display initialized');
            this.mainElement.setAttribute('id', 'todayContent');
            this.appendContainers();
            this.loadToday();
        } else {
            console.error('Main element with class "main" not found.');
        }
        
        
    },
    loadToday: function(){
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskData => {
            this.appendTaskToday(taskData.taskName, taskData.description, taskData.dueDate, taskData.priority);
            

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
            this.task1Div = document.createElement('div');
            this.task1Div.setAttribute('id', 'prioritycontainer-1');
            this.task1Div.classList.add('priority-num')
            this.task2Div = document.createElement('div');
            this.task2Div.setAttribute('id', 'prioritycontainer-2');
            this.task2Div.classList.add('priority-num')
            this.task3Div = document.createElement('div');
            this.task3Div.setAttribute('id', 'prioritycontainer-3');
            this.task3Div.classList.add('priority-num')
            this.tasksContainer.appendChild(this.task1Div);
            this.tasksContainer.appendChild(this.task2Div);
            this.tasksContainer.appendChild(this.task3Div);

            this.btnContainer.appendChild(this.tasksContainer);
            this.viewContent.appendChild(this.btnContainer);

            this.appendDefault();
        } else {
            console.error('Main div with id "todayContent" not found.');
        }
    },

    appendDefault: function() {
        console.log("appenddefault");
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
        taskBtn.addEventListener('click', () => {
            this.addTaskEvent();
            this.radioLogic();
        });
    },
    hideTaskBtn: function() {
        console.log("hideTaskBtn");
    
        const taskBtns = document.querySelectorAll('.task-btn');
    
        taskBtns.forEach(taskBtn => {
            taskBtn.remove();
        });
    
    },
    handleTaskCompletion: function() {
        const buttons = document.querySelectorAll('.priority-button-check');
        buttons.forEach(button => {
          button.addEventListener('click', () => {
            console.log('finished task');
            const taskDiv = button.closest('.task');
            
            if (taskDiv) {
              const taskId = taskDiv.getAttribute('data-id');
              this.removeTaskFromLocalStorage(taskId);
              taskDiv.remove();
              this.updateBorders();
            }
          });
        });
      },
      
      removeTaskFromLocalStorage: function(taskId) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(task => task.id != taskId);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      },
    
    
    appendTask: function(taskID, taskName, description, dueDate, priority) {
        console.log("appendtask");
        
        const taskData = new TaskData(taskID, taskName, description, dueDate, priority);
        
        // Store taskData in local storage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskData);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    
    },
    appendTaskToday: function(taskName, description, taskId, priority) {
        console.log("appendtasktoday");
        
        const thisTask = document.createElement('div');
        thisTask.setAttribute('data-id', taskId);
        const taskContent = document.createElement('div');
        taskContent.classList.add('task-displaycontent');
        const taskCheck = document.createElement('button');
        const formattedPriority = priority.replace(" ", "container-").toLowerCase();
        const selectedPriority = document.getElementById(formattedPriority);
        thisTask.classList.add('task');

        const formattedbuttonclass = priority.replace(" ", "button-").toLowerCase();
        taskCheck.classList.add(formattedbuttonclass);
        taskCheck.classList.add('priority-button-check');
        taskCheck.textContent = " ";
        thisTask.appendChild(taskCheck);

        const taskTitle = document.createElement('h3');
        taskTitle.textContent = taskName; 
        taskContent.appendChild(taskTitle);
        const taskDescription = document.createElement('p');
        taskDescription.textContent = description;
        taskContent.appendChild(taskDescription);
    
        thisTask.appendChild(taskContent);
        selectedPriority.appendChild(thisTask);

        this.updateBorders();
        this.handleTaskCompletion();

        
    },
    updateBorders: function(){
        const containers = ['prioritycontainer-1', 'prioritycontainer-2', 'prioritycontainer-3'];
  
        
        const containersWithContent = containers
            .map(containerId => document.getElementById(containerId))
            .filter(container => container && container.hasChildNodes());
        
        
        containers.forEach((containerId, index) => {
            const container = document.getElementById(containerId);
            
            if (container) {
               
                const hasContent = containersWithContent.includes(container);
                
                
                const isNotLastWithContent = index < containersWithContent.length - 1;
                
                
                if (hasContent && isNotLastWithContent) {
                    container.classList.add('border-visible');
                } else {
                    container.classList.remove('border-visible');
                }
            }
        });
    },
    addTaskEvent: function() {
        console.log("addtaskevent");
        let taskName = '';
        let description = '';
        let dueDate = '';
        let priority = '';
        this.addForm();
        const form = document.querySelector('.form-div > form');
        const buttonCheck = document.querySelectorAll('.singlePriority');
        form.addEventListener('submit', (event) => {
            event.preventDefault();  
      
            taskName = document.getElementById('task-name').value;
            description = document.getElementById('description').value;
            dueDate = document.getElementById('due-date').value;
            priority = document.querySelector('input[name="priority"]:checked').value;
            const taskId = Date.now();
            document.getElementById('task-name').value = '';
            document.getElementById('description').value = '';

            


            if (dueDate === 'Today'){
                console.log("the task is due today");
                this.appendTaskToday(taskName, description, taskId, priority);
                buttonCheck.forEach(button => {
                    button.classList.remove('checked');
                });
            }

            this.appendTask(taskId, taskName, description, dueDate, priority);

            
        });


    },

    addForm: function(){
        console.log("addform");
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
        cancelButton.setAttribute('type', 'button');
        submitForm.appendChild(cancelButton);

        cancelButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.cancelForm(); 
        });
    
        const submitButton = document.createElement('button');
        submitButton.setAttribute('type', 'submit');
        submitButton.textContent = 'Add task';
        submitButton.classList.add('submit-button'); 
        submitForm.appendChild(submitButton);

        formDiv.appendChild(form);
        btnContainer.appendChild(formDiv);

        function formatDate(date, format, locale) {
            const now = new Date();
            const tomorrow = new Date();
            tomorrow.setDate(now.getDate() + 1); 
        
            if (date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
                return "Today";
            }
            if (date.getDate() === tomorrow.getDate() && date.getMonth() === tomorrow.getMonth() && date.getFullYear() === tomorrow.getFullYear()) {
                return "Tomorrow";
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
        });

        taskNameInput.addEventListener('input', function() {
            if (taskNameInput.value.trim() !== '') {
                submitButton.classList.remove('button-default');
                submitButton.classList.add('button-active');
            } else {
                submitButton.classList.remove('button-active');
                submitButton.classList.add('button-default');
            }
        });
    
       
    },
    cancelForm: function(){
        console.log("cancelForm");
        const formDiv = document.querySelector('.form-div');
        if (formDiv) {
            formDiv.remove(); 
        }
        console.log('form cleared');
        this.appendTaskBtn(); 
    },
    radioLogic: function() {
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

