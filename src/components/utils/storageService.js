import { CACH_KEEPING_TIME } from '../../config/constants'

class LocalStorageAdapter {
  set(keyName, value) {
    localStorage.setItem(keyName, JSON.stringify(value))
  }

  get(key) {
    return JSON.parse(localStorage.getItem(key))
  }

  remove(key) {
    const el = JSON.parse(localStorage.getItem(key))
    localStorage.removeItem(key)
    return el
  }

  clear() {
    localStorage.clear()
  }
}

class StorageService {
  constructor(typeStorage, key) {
    this.key = key
    StorageService.storage = typeStorage

    if (new Date().getTime() - this.get().ts > CACH_KEEPING_TIME) this.clear()
  }

  get() {
    return StorageService.storage.get(this.key) || {}
  }
  set(value) {
    return StorageService.storage.set(this.key, {
      ...value,
      ts: new Date().getTime(),
    })
  }
  remove() {
    return StorageService.storage.remove(this.key)
  }
  clear() {
    return StorageService.storage.clear()
  }
}

export const storage = new StorageService(new LocalStorageAdapter(), 'yapsData')

window.st = storage
