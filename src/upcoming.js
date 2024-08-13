import { format, parseISO, isValid, startOfToday, isBefore, parse } from 'date-fns';
import TaskData from './storage';

const addUpcomingDisplay = {
    
    init: function() {
        
        this.mainElement = document.querySelector('.main'); 
        if (this.mainElement) {
            const currentElements = document.querySelectorAll('.current');
            currentElements.forEach(element => {
                element.classList.remove('current');
            });
            const thsButton = document.getElementById('upcoming');
            thsButton.classList.add('current');
            this.clearContent();
            console.log('upcoming display initialized');
            this.mainElement.setAttribute('id', 'upcomingContent');
            this.appendContainers();
            this.checkComplete();
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

    appendContainers: function(){
        const mainDiv = document.getElementById('upcomingContent');
        const upcomingContainer = document.createElement('div');
        upcomingContainer.setAttribute('id', 'upcoming-div');

        //title
        const title = document.createElement('h1');
        title.textContent = "Upcoming";
        upcomingContainer.appendChild(title);

        const daysDiv = document.createElement('div');
        daysDiv.setAttribute('id', 'days-div');
        upcomingContainer.appendChild(daysDiv);


        mainDiv.appendChild(upcomingContainer);
        this.addDayDivs();
        this.loadTasks();
        this.checkIfViableDate();
        
    },
    addDayDivs: function() {
        const allDates = this.getAllDates();
        console.log(allDates);
    
        const uniqueDates = [...new Set(allDates)];
        console.log("Unique dates:", uniqueDates);
    
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        console.log("today", today, "tomorrow", tomorrow);
        
        const overdueDates = uniqueDates.filter(this.checkOverdue);
        console.log("overdueDates", overdueDates);

        if (overdueDates){
            const dateDiv = document.createElement('div');
            dateDiv.classList.add('date-div');
            dateDiv.classList.add("overdue-dates")
            const thisDate = document.createElement('h4');
            thisDate.textContent = "Overdue";
    
            const top = document.createElement('div');
            top.classList.add('top');
    
            top.appendChild(thisDate);
            dateDiv.appendChild(top);
    
            const upcomingContainer = document.getElementById("upcoming-div");
            upcomingContainer.appendChild(dateDiv);
        }

        const formattedDates = uniqueDates.map(date => {
            console.log(date);
            if (date === "Today") return 'Today';
            if (date === "Tomorrow") return 'Tomorrow';
            try {
                return format(parseISO(date), 'MMMM d'); // Format as "name of month" + day
            } catch (e) {
                console.error(`Invalid date format: ${date}`, e);
                return null; // Skip invalid dates
            }
        }).filter(date => date !== null); // Filter out any invalid dates
    
        // Sort the formatted dates with special handling for "Today" and "Tomorrow"
        const sortedDates = formattedDates.sort((a, b) => {
            if (a === 'Today') return -1;
            if (b === 'Today') return 1;
            if (a === 'Tomorrow') return (b === 'Today') ? 1 : -1;
            if (b === 'Tomorrow') return (a === 'Today') ? -1 : 1;
            return new Date(a) - new Date(b);
        });
    
        console.log("Sorted dates:", sortedDates);
        
        sortedDates.forEach(date => {
            if (date !== "Tomorrow" && date !== "Today"){
            const parsedDate = parse(date, 'MMMM d', new Date());
            console.log(`Parsed date for '${date}':`, parsedDate)

            const formattedDate = format(parsedDate, 'yyyy-MM-dd');
            if (!this.checkOverdue(formattedDate)) {
                console.log("Processing date:", date);
                const dateDiv = document.createElement('div');
                dateDiv.classList.add('date-div');
                const thisDate = document.createElement('h4');
                thisDate.textContent = date;
                const dateClass = date.replace(/\s+/g, '-').replace(/[^\w-]/g, '').toLowerCase();
                dateDiv.classList.add(dateClass);
                const top = document.createElement('div');
                top.classList.add('top');
        
                top.appendChild(thisDate);
                dateDiv.appendChild(top);
        
                const upcomingContainer = document.getElementById("upcoming-div");
                upcomingContainer.appendChild(dateDiv);
            }
            }else{
            if (!this.checkOverdue(date)) {
                console.log("Processing date:", date);
                const dateDiv = document.createElement('div');
                dateDiv.classList.add('date-div');
                const thisDate = document.createElement('h4');
                thisDate.textContent = date;
                const dateClass = date.replace(/\s+/g, '-').replace(/[^\w-]/g, '').toLowerCase();
                dateDiv.classList.add(dateClass);
                const top = document.createElement('div');
                top.classList.add('top');
        
                top.appendChild(thisDate);
                dateDiv.appendChild(top);
        
                const upcomingContainer = document.getElementById("upcoming-div");
                upcomingContainer.appendChild(dateDiv);
            }
        }
        
        });
        
        this.checkForToday();
    },       
    

    checkForToday: function() {
        const topDivs = document.querySelectorAll('.top');

        topDivs.forEach(topDiv => {
            const h4 = topDiv.querySelector('h4');
            
            if (h4 && h4.textContent.trim() === 'Today') {
                topDiv.classList.add('today-upcoming');
            }
        });
    },

    getAllDates: function() {
        const dates = []; 

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      
        tasks.forEach(task => {
          
          if (task && task.dueDate) {
            dates.push(task.dueDate);
          }
        });
      
        return dates;
    },

    addTasks: function(task) {
        //check for iverdue dates and add them to the overdue container
        if (this.checkOverdue(task.dueDate)){
            console.log("processing overdue task", task.dueDate)
            const overdueDiv = document.querySelector(".overdue-dates");
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            taskDiv.setAttribute('data-id', task.id);
            
            const taskDescDiv = document.createElement('div');
            taskDescDiv.classList.add('task-div-upcoming');
            const taskTitle = document.createElement('h3');
            taskTitle.textContent = task.taskName;
            
            const taskDescription = document.createElement('p');
            taskDescription.textContent = task.description;
            
            const finishButton = document.createElement('button');
            finishButton.classList.add('task-btn-upcoming');
            taskDiv.appendChild(finishButton);
        
            taskDescDiv.appendChild(taskTitle);
            taskDescDiv.appendChild(taskDescription);
            taskDiv.appendChild(taskDescDiv);
            overdueDiv.appendChild(taskDiv);
        }
        const today = new Date();
        const tomorrow = new Date(Date.now() + 86400000); // Add 24 hours in milliseconds
    
        const todayFormatted = format(today, 'yyyy-MM-dd');
        const tomorrowFormatted = format(tomorrow, 'yyyy-MM-dd');
        
        let formattedDate;
        if (task.dueDate === "Today") {
            formattedDate = 'today';
        } else if (task.dueDate === "Tomorrow") {
            formattedDate = 'tomorrow';
        } else {
            const parsedDate = parseISO(task.dueDate);
            if (!isValid(parsedDate)) {
                console.error(`Invalid date: ${task.dueDate}`);
                return; // Exit the function if the date is invalid
            }
            formattedDate = format(parsedDate, 'MMMM d');
        }
    
        console.log(formattedDate);
        let dateClass = formattedDate.replace(/\s+/g, '-').replace(/[^\w-]/g, '').toLowerCase();
        
        console.log(dateClass);
        if (!this.checkOverdue(task.dueDate)) {
        // Find or create the div for the task's due date
        let dateDiv = document.querySelector(`.${dateClass}`);
        
        if (!dateDiv) {
            dateDiv = document.createElement('div');
            dateDiv.classList.add(dateClass);
            dateDiv.innerHTML = `<h4>${formattedDate}</h4>`;
            // Append the dateDiv to a known parent element
            const parentElement = document.querySelector('#tasksContainer');
            if (parentElement) {
                parentElement.appendChild(dateDiv);
            } else {
                console.error('Parent element for tasks not found');
            }
        }
        
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.setAttribute('data-id', task.id);
        
        const taskDescDiv = document.createElement('div');
        taskDescDiv.classList.add('task-div-upcoming');
        const taskTitle = document.createElement('h3');
        taskTitle.textContent = task.taskName;
        
        const taskDescription = document.createElement('p');
        taskDescription.textContent = task.description;
        
        const finishButton = document.createElement('button');
        finishButton.classList.add('task-btn-upcoming');
        taskDiv.appendChild(finishButton);
    
        taskDescDiv.appendChild(taskTitle);
        taskDescDiv.appendChild(taskDescription);
        taskDiv.appendChild(taskDescDiv);
        dateDiv.appendChild(taskDiv);
        }
    },    
    
    loadTasks: function() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        
        tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        
        tasks.forEach(task => {
            this.addTasks(task);
        });
    },
    checkOverdue: function(dateString) {
        const today = startOfToday();
    
        const inputDate = parseISO(dateString);
    
        return isBefore(inputDate, today);
    },
    checkComplete: function() {
        const deleteButtons = document.querySelectorAll('.task-btn-upcoming');
    
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const taskElement = button.closest('.task');
    
                if (taskElement) {
                    const taskId = taskElement.getAttribute('data-id');
    
                    taskElement.remove();
                    
                    // Retrieve and update tasks in localStorage
                    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                    tasks = tasks.filter(task => task.id !== parseInt(taskId));
                    localStorage.setItem('tasks', JSON.stringify(tasks));
    
                    console.log("Task with ID " + taskId + " deleted");
    
                    this.checkIfViableDate();
                }
            });
        });
    },
    checkIfViableDate: function() {
        const dateDivs = document.querySelectorAll('.date-div');
    
        dateDivs.forEach(dateDiv => {
            if (dateDiv.children.length === 1) {
                // Only one child, hide the dateDiv
                dateDiv.style.display = 'none';
            } else {
                // Two or more children, show the dateDiv
                dateDiv.style.display = 'block';
            }
        });
    },

};

export default addUpcomingDisplay;