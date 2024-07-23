import { format } from 'date-fns';
import TaskData from './storage';

const addUpcomingDisplay = {
    
    init: function() {
        
        this.mainElement = document.querySelector('.main'); 
        if (this.mainElement) {
            this.clearContent();
            console.log('upcoming display initialized');
            this.mainElement.setAttribute('id', 'upcomingContent');
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
        
    },
    addDayDivs: function(){
        const allDates = this.getAllDates();
        console.log(allDates);

        const uniqueDates = [...new Set(allDates)];
        console.log("Unique dates:", uniqueDates);

        const today = new Date();
        const tomorrow = new Date(Date.now() + 86400000); // Add 24 hours in milliseconds

        // Format the dates using date-fns
        const formattedToday = 'Today';
        const formattedTomorrow = 'Tomorrow';

        const formattedDates = uniqueDates.map(date => {
            if (date === 'Today') return formattedToday;
            if (date === 'Tomorrow') return formattedTomorrow;
            return format(new Date(date), 'MMMM d'); // Format as "name of month" + day
        });

        // Sort the formatted dates with special handling for "today" and "tomorrow"
        const sortedDates = formattedDates.sort((a, b) => {
            if (a === formattedToday) return -1;
            if (b === formattedToday) return 1;
            if (a === formattedTomorrow) return (b === formattedToday) ? 1 : -1;
            if (b === formattedTomorrow) return (a === formattedToday) ? -1 : 1;
            return new Date(a) - new Date(b);
        });

        console.log("Sorted dates:", sortedDates);

        sortedDates.forEach(date => {
           
            console.log("Processing date:", date);
            const dateDiv = document.createElement('div');
            dateDiv.classList.add('date-div');
            
            const top = document.createElement('div');
            top.classList.add('top');
            const thisDate = document.createElement('h4');
            thisDate.textContent = date;
            top.appendChild(thisDate);
            dateDiv.appendChild(top);
            
            
            
            const upcomingContainer = document.getElementById("upcoming-div");
            upcomingContainer.appendChild(dateDiv);
        });

        this.checkForToday();
    },
    checkForToday: function(){
        const topDivs = document.querySelectorAll('.top');

        topDivs.forEach(topDiv => {
            const h4 = topDiv.querySelector('h4');
            
            if (h4 && h4.textContent.trim() === 'Today') {
                topDiv.classList.add('today-upcoming');
            }
        });
    },

    getAllDates: function(){
        const dates = []; 

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      
        tasks.forEach(task => {
          
          if (task && task.dueDate) {
            dates.push(task.dueDate);
          }
        });
      
        return dates;
    },


};

export default addUpcomingDisplay;