/*本地存储*/
const STORAGE_KEY = "INTRODUCE"

export default {
  fetch () {
    return window.JSON.parse(window.localStorage.getItem(STORAGE_KEY) || true)
  },
  save (items) {
    window.localStorage.setItem(STORAGE_KEY, window.JSON.stringify(items))
  }
}
