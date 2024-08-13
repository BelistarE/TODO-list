import addTaskIcon from './icons/add-task.svg';
import todayIcon from './icons/calendar-star.svg';
import searchIcon from './icons/magnify.svg';
import upcomingIcon from './icons/calendar-range-outline.svg';
import sidebarIcon from './icons/sidebar.png';
import bugIcon from './icons/bug.png';

export function appendSidebar(name) {
    const app = document.getElementById('app');
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');
    const hiddenBtn = document.createElement('div');
    hiddenBtn.classList.add('hiddenBtn')

    const header = document.createElement('div');
    header.setAttribute('id', 'header');
    const headerLeft = document.createElement('div');
    const headerRight = document.createElement('div');
    headerLeft.setAttribute('id', 'header-left');
    headerRight.setAttribute('id', 'header-right');
    const greeting = document.createElement('h2');
    const userName = document.createElement('h3');
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('buttonDiv');

    //icon stuff
    const sidebarDiv = document.createElement('div');
    sidebarDiv.classList.add('toggleButton')
    const sdbrIcon = document.createElement('img');
    sdbrIcon.classList.add('icon');
    sdbrIcon.src = sidebarIcon;

    //custom name goes here
    userName.textContent = name;

    greeting.textContent = 'Hello there,';

    headerRight.appendChild(sidebarDiv);
    sidebarDiv.appendChild(sdbrIcon);
    sidebar.appendChild(header);
    header.appendChild(headerLeft);
    header.appendChild(headerRight);
    headerLeft.appendChild(greeting);
    headerLeft.appendChild(userName);
    sidebar.appendChild(buttonDiv);
    const buttons = [
        { text: 'Add Task', id: 'add-task', icon: addTaskIcon },
        { text: 'Search', id: 'search', icon: searchIcon },
        { text: 'Today', id: 'today', icon: todayIcon },
        { text: 'Upcoming', id: 'upcoming', icon: upcomingIcon }
    ];

    buttons.forEach(button => {
        const buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('button-wrapper');
        buttonWrapper.setAttribute('id', button.id)

        const icon = document.createElement('img');
        icon.src = button.icon; 
        icon.classList.add('button-icon');

        const buttonElement = document.createElement('button');
        buttonElement.textContent = button.text;

        buttonElement.classList.add('sidebar-button');

        buttonWrapper.appendChild(icon);
        buttonWrapper.appendChild(buttonElement);

        buttonDiv.appendChild(buttonWrapper);
    });

    const debugBtn = document.createElement('div');
    debugBtn.classList.add('button-wrapper');
    debugBtn.classList.add('debug');
    const bug = document.createElement('img');
    bug.src = bugIcon;
    bug.classList.add('button-icon');
    debugBtn.appendChild(bug);
    const bugDesc = document.createElement('button')
    bugDesc.textContent = "Clear History (Debug)";
    debugBtn.appendChild(bugDesc);
    sidebar.appendChild(debugBtn);

    debugBtn.addEventListener('click', () => {
        localStorage.clear();
        alert("local storage cleared, refresh the page to clear content");
        console.log('Local storage cleared');
    });

    app.appendChild(sidebar);
    //sidebar collapse button logic

    document.querySelector('.toggleButton').addEventListener('click', function() {
        console.log("sidebar button clicked");
        const sidebar = document.querySelector('.sidebar');
        
        if (sidebar.classList.contains('collapsed')) {
            // Reopen the sidebar
            sidebar.classList.remove('collapsed');
            sidebarDiv.classList.remove('translateRight');
        } else {
            // Collapse the sidebar
            sidebar.classList.add('collapsed');
            sidebarDiv.classList.add('translateRight');
            
        }
    });
    
      
      
}
