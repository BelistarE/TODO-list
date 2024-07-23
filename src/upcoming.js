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
        const title = document.createElement('h2');
        title.textContent = "Upcoming";
        upcomingContainer.appendChild(title);

        //for the future
        


        mainDiv.appendChild(upcomingContainer);
    },

};

export default addUpcomingDisplay;