(function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(function(reg) {
        console.log('The service worker has been registered ', reg);
      })
      .catch(function(err) {
        console.log(err);
      });

      navigator.serviceWorker.addEventListener('controllerchange', function(event) {
        console.log('[controllerchange] A "controllerchange" event has happened within navigator.serviceWorker: ', event);


        navigator.serviceWorker.controller.addEventListener('statechange', function() {
          console.log('[controllerchange][statechange] A "statechange" has occured: ', this.state);

          if (this.state === 'activated') {
            document.getElementById('offlineNotification').classList.remove('hidden');
          }
        });
      });
  }
}());
