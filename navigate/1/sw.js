self.addEventListener('install', function(event) {
  // Perform install steps
});

self.addEventListener('activate', function(event) {
  // Activate the new service worker
  event.waitUntil(self.clients.claim());
});

// Check for updates to the service worker
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'checkForUpdate') {
    self.registration.update();
  }
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  // Perform any necessary processing
  console.log('Request intercepted:', event.request.url);
  if (url.pathname.includes('test')) {
    event.respondWith(
      new Response('Intercepted content!')
    );
  }
  // Inform the client using postMessage API
  event.waitUntil(
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: 'interceptedRequest',
          message: 'The request to jobcolo.com was intercepted!'
        });
      });
    })
  );
});


