const addTodayDisplay = {
    init: function(){
        console.log('today display initialized');

        document.addEventListener('DOMContentLoaded', () => {
            const mainContent = document.querySelector('.main');
            
            mainContent.setAttribute('id', 'today');
            
        });


        this.appendContainers();
    },
    appendContainers: function(){
    
    },
    
}
export default addTodayDisplay;