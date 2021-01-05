import { handleRequest, handleError } from './handler'

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request).catch(err => handleError(err)))
})
