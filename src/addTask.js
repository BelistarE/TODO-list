const addTaskDisplay = {
    init: function(){
        console.log('add task display initialized');

        this.mainElement = document.querySelector('.main'); 
        if (this.mainElement) {
            this.mainElement.setAttribute('id', 'add-task');
            this.clearContent();
        }

        
    },
    clearContent: function() {
        
        while (this.mainElement.firstChild) {
            this.mainElement.removeChild(this.mainElement.firstChild);
        }
        console.log('content cleared');
    },
    appendContainers: function(){
        //TODO
    }
};

export default addTaskDisplay;
