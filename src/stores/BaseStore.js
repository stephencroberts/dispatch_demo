import { EventEmitter } from 'events'
var CHANGE_EVENT = 'change'

class BaseStore extends EventEmitter {

  emitChange() {
    this.emit(CHANGE_EVENT)
  }

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  /**
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }
}

export default BaseStore