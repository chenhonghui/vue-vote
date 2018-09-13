export default {
  get (key) {
    let value = localStorage.getItem(key)
    if (value) {
      try {
        var parsedValue = JSON.parse(value)
        if (typeof parsedValue === 'object') {
          return parsedValue
        } else if (typeof parsedValue === 'number') {
          return parsedValue
        }
      } catch (e) {
        return value
      }
    } else {
      return false
    }
  },
  set (key, value) {
    if (typeof value === 'object') {
      const stringValue = JSON.stringify(value)
      localStorage.setItem(key, stringValue)
    } else {
      localStorage.setItem(key, value)
    }
  },
  remove (key) {
    localStorage.removeItem(key)
  },
  clear () {
    localStorage.clear()
  }
}
