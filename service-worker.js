<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    
    <title>Cadangan PWA Fullscreen</title>
    
    <!-- Meta Tag Konfigurasi -->
    <meta name="application-name" content="Cadangan PWA Fullscreen">
    <meta name="apple-mobile-web-app-title" content="PWA Fullscreen">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="theme-color" content="#000000">
    <meta name="description" content="Cadangan PWA Landscape Fullscreen dengan Gambar Latar">
    
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="msapplication-tap-highlight" content="no">
    
    <!-- PWA Manifest & Icons -->
    <link rel="manifest" href="manifest.json">
    <link rel="icon" href="assets/icons/icon-96x96.png" type="image/png">
    <link rel="apple-touch-icon" href="assets/icons/icon-192x192.png">
    
    <!-- CSS untuk Menghilangkan Garis Putih & Menampilkan Gambar -->
    <style>
        * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
            border: none !important;
            outline: none !important;
        }
        html, body {
            width: 100vw;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
            background-color: #000000;
            background-image: url('assets/00.png');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            margin-top: 0 !important;
        }
        /* Style Fullscreen */
        :-webkit-full-screen {
            width: 100% !important;
            height: 100% !important;
            top: 0 !important;
        }
        :fullscreen {
            width: 100% !important;
            height: 100% !important;
            top: 0 !important;
        }
        /* Hilangkan Scrollbar */
        :-webkit-full-screen::-webkit-scrollbar,
        :fullscreen::-webkit-scrollbar,
        body::-webkit-scrollbar {
            display: none;
        }
    </style>
</head>
<body>
    <script>
        // Daftarkan Service Worker
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('service-worker.js')
                    .then(reg => console.log('Service Worker terdaftar:', reg.scope))
                    .catch(err => console.log('Gagal mendaftarkan Service Worker:', err));
            });
        }

        // Tombol Instal & Fullscreen Otomatis
        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            console.log('Tombol instal aplikasi siap ditampilkan');
        });

        // Masuk Fullscreen Otomatis
        window.addEventListener('load', () => {
            const enterFullscreen = () => {
                const docEl = document.documentElement;
                if (docEl.requestFullscreen) {
                    docEl.requestFullscreen({ navigationUI: "hide" });
                } else if (docEl.webkitRequestFullscreen) {
                    docEl.webkitRequestFullscreen({ navigationUI: "hide" });
                } else if (docEl.msRequestFullscreen) {
                    docEl.msRequestFullscreen();
                }
            };
            setTimeout(enterFullscreen, 500);
        });

        // Tetap Fullscreen Saat Ukuran Berubah
        window.addEventListener('resize', () => {
            if (!document.fullscreenElement) {
                const docEl = document.documentElement;
                if (docEl.requestFullscreen) {
                    docEl.requestFullscreen({ navigationUI: "hide" });
                }
            }
        });
    </script>
</body>
</html>
