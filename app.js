let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.classList.remove('hidden');

    installBtn.addEventListener('click', () => {
        installBtn.classList.add('hidden');
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('Pengguna menerima instalasi');
            } else {
                console.log('Pengguna menolak instalasi');
            }
            deferredPrompt = null;
        });
    });
});

window.addEventListener('appinstalled', (evt) => {
    console.log('Aplikasi terinstal', evt);
});
