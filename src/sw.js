const swVersion = '0.1'

self.addEventListener('install', event => {
  
})

self.addEventListener('activate', event => {
  
})

self.addEventListener('fetch', event => {

})

self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting()
  }
})