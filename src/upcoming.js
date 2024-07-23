const addUpcomingDisplay = {
    
    init: function() {
        
        this.mainElement = document.querySelector('.main'); 
        if (this.mainElement) {
            this.clearContent();
            console.log('upcoming display initialized');
            this.mainElement.setAttribute('id', 'upcomingContent');
            
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

    },

};

export default addUpcomingDisplay;