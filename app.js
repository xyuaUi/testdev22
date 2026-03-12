let deferredPrompt;
const installBtn = document.getElementById('installBtn');

// Cek apakah aplikasi sudah diinstal
const checkInstalled = () => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isIosStandalone = window.navigator.standalone === true;
    if (isStandalone || isIosStandalone) {
        installBtn.classList.add('hidden');
    }
};

// Inisialisasi cek
checkInstalled();

// Tangkap event instalasi
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.classList.remove('hidden');
});

// Aksi klik tombol instal
installBtn.addEventListener('click', () => {
    installBtn.classList.add('hidden');
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            deferredPrompt = null;
        });
    }
});

// Event setelah instalasi
window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
});

// Cek ulang saat ukuran layar berubah
window.addEventListener('resize', checkInstalled);
