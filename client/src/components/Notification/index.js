import './styles.scss'

const error = (msg) => {
  const element = document.createElement('div')
  element.innerHTML = `<div class="notification-wrapper"><div class="notification"><div class="dot error"></div><span>${msg}</span></div></div>`
  document.body.append(element)
  setTimeout(() => element.remove(), 3000)
}

const success = (msg) => {
  const element = document.createElement('div')
  element.innerHTML = `<div class="notification-wrapper"><div class="notification"><div class="dot success"></div><span>${msg}</span></div></div>`
  document.body.append(element)
  setTimeout(() => element.remove(), 2000)
}

const Notification = { success, error }

export default Notification
