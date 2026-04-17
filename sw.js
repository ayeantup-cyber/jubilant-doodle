// Minimal Service Worker for PWA compliance
self.addEventListener('install', (e) => {
  console.log('PWA Service Worker Installed');
});

self.addEventListener('fetch', (e) => {
  // Required for PWA, even if empty
});
