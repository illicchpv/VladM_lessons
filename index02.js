// ============================================================
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str) {
    return this.substring(0, str.length) === str;
  }
}
if (typeof String.prototype.endsWith != 'function') {
  String.prototype.endsWith = function (str) {
    return this.substring(this.length - str.length, this.length) === str;
  }
}
if (typeof (String.prototype.replaceAll) !== "function") {
  String.prototype.replaceAll = function (search, replace) {
    return this.split(search).join(replace);
  }
}
let log = console.log
const error = console.error
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function htmlToElement(html) {
  var template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}
const delay = ms => {
  return new Promise(r => setTimeout(() => r(), ms))
}
// ============================================================


// ДЗ ===============================
const url = 'https://jsonplaceholder.typicode.com/users'
let template = "";

document.addEventListener('DOMContentLoaded', async function () {
  // let url = 'https://aclive.ru/Content/Tests/json/users.json'
  // let url = 'https://illicchpv.github.io/VladM_lessons/json/users.json'

  const getDataButton = document.querySelector('#getDataBtn');
  template = document.getElementById('usersRowTempl').innerHTML
  document.getElementById('usersRowTempl').remove()

  getDataButton.addEventListener('click', () => showUsers())
})
async function showUsers(){
  const spinner = document.querySelector('#spinner');
  const dataTable = document.querySelector('#dataTable');
  let $tbody = document.querySelector("#dataTable tbody") // document.getElementById('usersBox')

  $tbody.innerHTML = ""
  spinner.innerHTML = ""
  spinner.style.display = 'flex';
  spinner.appendChild(htmlToElement('<h3>Loading...</h3>'))
  spinner.appendChild(htmlToElement('<div>fetch users started</div>'))

  console.log('fetch users started')
  let rez;
  try {
    await delay(1000)
    const resp = await fetch(url)
    spinner.appendChild(htmlToElement('<div>fetch responce ready</div>'))
    await delay(1000)
    rez = await resp.json()
    spinner.appendChild(htmlToElement('<div>fetch responce.json ready</div>'))
    await delay(1000)
    console.log('rez:', rez)
  } catch (err) {
    console.error(err)
  } finally {
    console.log('finally rez:', rez)
    // showUsers(rez)
  }

  rez.forEach(pm => {
    let h = template
      .replaceAll("__Name__", pm.name)
      .replaceAll("__Email__", pm.email)
      .replaceAll("__Phone__", pm.phone)
    // log(h)
    $tbody.appendChild(htmlToElement(h))
  })

  dataTable.style.display = 'block';
  spinner.style.display = 'none';
}