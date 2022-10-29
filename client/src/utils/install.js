const installBtn = document.querySelector('button');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // store triggered events to be used later
     window.deferredPrompt = event;
    // remove the hide class from the button before app has been installed
    installBtn.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
installBtn.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    // if the button event isn't available, return
    if (!promptEvent) {
        return;
    }
    // show install prompt during click event
    promptEvent.prompt();
    // now that event has been called, the deferred prompt variable has to be reset
    window.deferredPrompt = null;
    // now that installation prompt has occurred, hide the install button
    installBtn.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
