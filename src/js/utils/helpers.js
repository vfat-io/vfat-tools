/* bling.js - https://gist.github.com/paulirish/12fb951a8b893a454b32 */

window.$ = selector => {
  const query = document.querySelectorAll(selector)

  return query.length <= 1 ? query[0] : query
}

function singleNodeAddEventListener(name, fn) {
  this.addEventListener(name, fn)
}

function singleNodeRemoveEventListener(name, fn) {
  this.removeEventListener(name, fn)
}

Node.prototype.on = singleNodeAddEventListener
window.on = singleNodeAddEventListener

Node.prototype.off = singleNodeRemoveEventListener
window.off = singleNodeRemoveEventListener

function multipleNodesAddEventListener(name, fn) {
  this.forEach(elem => {
    elem.on(name, fn)
  })
}

function multipleNodesRemoveEventListener(name, fn) {
  this.forEach(elem => {
    elem.off(name, fn)
  })
}

NodeList.prototype.on = multipleNodesAddEventListener

NodeList.prototype.off = multipleNodesRemoveEventListener

/* END bling.js */
