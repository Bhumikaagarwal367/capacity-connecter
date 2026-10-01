// PWA, Offline Service Worker & Data Saver Handler
export class PWAManager {
  constructor(showToast) {
    this.showToast = showToast;
    this.deferredInstallPrompt = null;
    this.isLowData = localStorage.getItem('connect_capacity_low_data') === 'true';
    this.isOnline = navigator.onLine;

    this.initServiceWorker();
    this.initNetworkListeners();
    this.initInstallPrompt();
  }

  initServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((reg) => {
            console.log('[PWA] Service Worker registered successfully with scope:', reg.scope);
          })
          .catch((err) => {
            console.warn('[PWA] Service Worker registration failed:', err);
          });
      });
    }
  }

  initNetworkListeners() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.updateOfflineBanner();
      this.showToast('Network connection restored. Syncing latest course updates.', 'success');
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.updateOfflineBanner();
      this.showToast('You are currently offline. Showing saved study materials from device cache.', 'warning');
    });
  }

  initInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredInstallPrompt = e;
      const installBtn = document.getElementById('btn-install-pwa');
      if (installBtn) {
        installBtn.style.display = 'inline-flex';
      }
    });

    window.addEventListener('appinstalled', () => {
      this.deferredInstallPrompt = null;
      const installBtn = document.getElementById('btn-install-pwa');
      if (installBtn) installBtn.style.display = 'none';
      this.showToast('Connect Capacity installed successfully to your device!', 'success');
    });
  }

  promptInstall() {
    if (this.deferredInstallPrompt) {
      this.deferredInstallPrompt.prompt();
      this.deferredInstallPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('[PWA] User accepted installation prompt');
        }
        this.deferredInstallPrompt = null;
      });
    } else {
      this.showToast('To install on your mobile device or desktop, tap "Add to Home Screen" or the browser install icon in the address bar.', 'info');
    }
  }

  toggleLowData() {
    this.isLowData = !this.isLowData;
    localStorage.setItem('connect_capacity_low_data', this.isLowData ? 'true' : 'false');
    this.updateDataSaverUI();
    this.showToast(
      this.isLowData
        ? 'Data Saver Mode ON: Videos stream at 360p, high-res assets compressed (~70% data saved).'
        : 'Data Saver Mode OFF: Full resolution video streaming enabled.',
      this.isLowData ? 'success' : 'info'
    );
    return this.isLowData;
  }

  updateDataSaverUI() {
    const btn = document.getElementById('btn-toggle-data-saver');
    const badge = document.getElementById('data-saver-status-text');
    if (btn && badge) {
      if (this.isLowData) {
        btn.classList.add('data-saver-active');
        badge.textContent = 'Data Saver: ON ⚡';
      } else {
        btn.classList.remove('data-saver-active');
        badge.textContent = 'Data Saver: OFF';
      }
    }
  }

  updateOfflineBanner() {
    const banner = document.getElementById('offline-status-banner');
    if (banner) {
      if (!this.isOnline) {
        banner.style.display = 'flex';
      } else {
        banner.style.display = 'none';
      }
    }
  }
}
