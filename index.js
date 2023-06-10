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
// ============================================================


// https://www.youtube.com/watch?v=SHiUyM_fFME
// Урок 8. JavaScript. Как работает Async, Await. Работа с сервером c fetch
// https://jsonplaceholder.typicode.com/
// https://jsonplaceholder.typicode.com/guide/

const delay = ms => {
  return new Promise(r => setTimeout(() => r(), ms))
}

// delay(2000).then(() => console.log('2 sec'))

let url = 'https://jsonplaceholder.typicode.com/todos'
/*
function fetchTodos() {
  console.log('fetchTodos started')
  return delay(2000).then(() => {
    // fetch(url).then(resp => resp.json())
    return fetch(url)
  }).then(resp => resp.json())
}

fetchTodos()
  .then(data => {
    console.log('data:', data)
  })
  .catch(err => console.error(err))
*/

async function fetchAsyncTodos() {
  console.log('fetchTodos started')
  try {
    await delay(2000)
    const resp = await fetch(url)
    const data = await resp.json()
    console.log('data:', data)
  } catch (err) {
    console.error(err)
  } finally {
    console.log('finally')
  }
}
// fetchAsyncTodos()

// ДЗ ===============================

document.addEventListener('DOMContentLoaded', async function () {
  // let url = 'https://aclive.ru/Content/Tests/json/users.json'
  let url = 'https://illicchpv.github.io/VladM_lessons/json/users.json'

  console.log('fetch users started')

  let rez;
  try {
    await delay(2000)
    const resp = await fetch(url)
    rez = await resp.json()
    console.log('rez:', rez)
  } catch (err) {
    console.error(err)
  } finally {
    console.log('finally rez:', rez)
    showUsers(rez)
  }


})
function showUsers(rez) {
  let $usersBox = document.getElementById('usersBox')
  let t = document.getElementById('usersBoxTempl').innerHTML
  document.getElementById('usersBoxTempl').remove()
  rez.users.forEach(pm => {
    let h = t
      .replaceAll("__name__", pm.name)
      .replaceAll("__role__", pm.role)
      .replaceAll("__src__", pm.img)
      .replaceAll("__id__", pm.id)
    // log(h)
    $usersBox.appendChild(htmlToElement(h))
  })


}
