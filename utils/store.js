export function getStore(key) {
  const local = localStorage.getItem(key)
  if (local) {
    const data = JSON.parse(local)
    const time = new Date().getTime()
    if (data?.expires > time) {
      return data?.value
    } else {
      return {}
    }
  } else {
    return {}
  }
}

export function setStore(key, value) {
  const data = {
    expires: new Date().getTime() + 2 * 60 * 60 * 1000,
    value: value
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export function removeStore(key = '') {
  if (key) {
    localStorage.removeItem(key)
  } else {
    localStorage.clear()
  }
}
