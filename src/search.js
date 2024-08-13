const addSearchDisplay = {
    init: function(){
        console.log('search display initialized');

        this.mainElement = document.querySelector('.main'); 
        if (this.mainElement) {
            //highlight sidebar
            const currentElements = document.querySelectorAll('.current');
            currentElements.forEach(element => {
                element.classList.remove('current');
            });
            const thsButton = document.getElementById('search');
            thsButton.classList.add('current');
            this.mainElement.setAttribute('id', 'searchPage');
            this.clearContent();
            this.appendContainers();
        }

        
    },
    clearContent: function() {
        
        while (this.mainElement.firstChild) {
            this.mainElement.removeChild(this.mainElement.firstChild);
        }
        console.log('content cleared');
    },
    appendContainers: function(){
        const mainDiv = document.getElementById('searchPage');
        this.appendBar(mainDiv);
        this.appendResults();
    },
    appendBar: function(mainDiv){
        const searchBar = document.createElement('input');
        searchBar.classList.add('search-bar');
        searchBar.setAttribute('id', 'searchQuery');
        searchBar.setAttribute('placeholder', "Enter task name or due date");
        const searchContainer = document.createElement('div');
        searchContainer.classList.add('search-container');

        const searchGroup = document.createElement('div');
        searchGroup.classList.add('search-group');

        const searchBtn = document.createElement('button');
        searchBtn.classList.add('search-btn');
        searchBtn.textContent="Search";

        searchGroup.appendChild(searchBar);
        searchGroup.appendChild(searchBtn);

        searchContainer.appendChild(searchGroup);
        mainDiv.appendChild(searchContainer);
    },
    appendResults: function() {
        const addHere = document.querySelector('.search-container');
        const resultsContainer = document.createElement('div');
        resultsContainer.classList.add('results-container');
        addHere.appendChild(resultsContainer);

        //results logic
        document.querySelector('.search-btn').addEventListener('click', () => {
            const query = document.getElementById('searchQuery').value;
            this.searchTasks(query); // 'this' refers to the object
        });

    },
    searchTasks: function(query){
        // Retrieve tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Filter tasks based on the search query (by name or due date)
    let results = tasks.filter(task => 
        task.taskName.toLowerCase().includes(query.toLowerCase()) ||
        task.dueDate.toLowerCase().includes(query.toLowerCase())
    );

    // Get the results container
    const resultsContainer = document.querySelector('.results-container');
    resultsContainer.innerHTML = ''; // Clear previous results

    // Display results
    if (results.length > 0) {
        results.forEach(task => {
            let taskElement = document.createElement('div');
            taskElement.classList.add('result');
            taskElement.innerHTML = `
                <strong>Name:</strong> ${task.taskName} <br>
                <strong>Description:</strong> ${task.description} <br>
                <strong>Due Date:</strong> ${task.dueDate}
            `;
            resultsContainer.appendChild(taskElement);
        });
    } else {
        resultsContainer.innerHTML = '<p>No tasks found matching the query.</p>';
    }
    },
};

export default addSearchDisplay;
