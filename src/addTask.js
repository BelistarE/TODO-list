const addTaskDisplay = {
    init: function(){
        console.log('add task display initialized');

        const mainContent = document.querySelector('.main');
        if (mainContent) {
            mainContent.setAttribute('id', 'add-task');
        }

        
    },
    appendContainers: function(){
        //TODO
    }
};

export default addTaskDisplay;
