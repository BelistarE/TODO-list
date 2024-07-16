const addTaskDisplay = {
    init: function(){
        console.log('add task display initialized');

        document.addEventListener('DOMContentLoaded', () => {
            const mainContent = document.querySelector('.main');
            //for testing
            if (mainContent) {
                mainContent.setAttribute('id', 'addTask');
            } else {
                console.error("Element with class 'main' not found.");
            }
        });

        
    },
};

export default addTaskDisplay;
