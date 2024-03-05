self.registration.update();
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  event.respondWith(
    new Response('Intercepted content!')
  );
  // Inform the client using postMessage API
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'interceptedRequest',
        message: 'The request was intercepted!'
      });
    });
  });
});
