console.log('notification.js ONLINE!');

const createNewNotification = (title, mainContent, selfTimeout) => {
    console.log('createNewNotification FUNC called');
    const notificationDiv = document.createElement('div');
    notificationDiv.classList += 'notification';
    
    const closeButton = document.createElement('button');
    closeButton.classList += 'notificationCloseButton';
    closeButton.innerHTML = `x`;
    
    const titleH1 = document.createElement('h1');
    titleH1.classList += 'notificationTitle';
    titleH1.innerHTML = `${title}`;

    const contentP = document.createElement('p');
    contentP.classList += 'notificationContent';
    contentP.innerHTML = `${mainContent}`;

    notificationDiv.appendChild(titleH1);
    notificationDiv.appendChild(contentP);
    notificationDiv.appendChild(closeButton);

    // console.log('notificationDiv : ', notificationDiv);

    const timeoutId = setTimeout(() => {
        console.log('BOOOO');
        notificationDiv.remove();
    }, selfTimeout);

    closeButton.addEventListener('click', () => {
        console.log('closeButton EL called');
        console.log('event : ', event);

        notificationDiv.remove();
    })
    return notificationDiv
};

window.createNewNotification = createNewNotification;