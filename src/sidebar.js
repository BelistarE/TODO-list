import addTaskIcon from './icons/add-task.svg';
import todayIcon from './icons/calendar-star.svg';
import searchIcon from './icons/magnify.svg';
import upcomingIcon from './icons/calendar-range-outline.svg';
import sidebarIcon from './icons/sidebar.png';

export function appendSidebar(name) {
    const app = document.getElementById('app');
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');

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

    app.appendChild(sidebar);
}
