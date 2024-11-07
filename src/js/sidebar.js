const sidebarBtn = document.querySelector('#sidebar-btn') 
const body = document.querySelector('body')

sidebarBtn.addEventListener('click',(e) => {
  e.preventDefault()
  body.classList.toggle('sidebar-toggle')
})