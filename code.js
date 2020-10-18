"use strict";

// const ItemDeal = require ('./itemDeal').default;
// module.exports = ItemDeal;
import ItemDeal from "./ItemDeal";
import { getRandom, getUniq, json } from "./nordic_random";

const {
  motivation_array,
  important_color,
  animation_in,
  animation_out,
  Month_Arrey,
} = json;

let mot_speech = document.querySelector(".Mot_speech");
let select = document.querySelector("#important");
// 22.09.2020 querySelector - нужен хэштег
let field = document.querySelector("input");
let button = document.querySelector(".button_plus");
let deals = document.getElementById("deals");
// убрали хэштег из deals 22.09.2020 getElementById не нужен хэштег
// пишем смену наших цитат
setInterval(() => {
  mot_speech.innerHTML = motivation_array[getUniq()]; //тут юник дает индекс, а эррей подставляет значение из json
}, 5000);
// -1 чтобы не было undefined
// всегда измерение мили-секунды
//получает из объекта localStorage данные по ключу
// ключ - время создания в Unix - времени
// значение - экземпляр класса ItemDeal
// getItem(key) – получить данные по ключу key.
// setItem - в localStorage назначить значение

// function name(params) {

// }
// функция добавления дела
// addTask - имя функции
// Прочитать значение field, если не пустой input - проверка ввода
// Создаем объект todo
// Сохранение в JSON https://learn.javascript.ru/json
// Сохряняем в localStorage
// Вызвали функцию создания HTML (вывод на фронт)
// Очистить field

function addTask() {
  let content = field.value;
  if (!content) {
    // если content = пустой строке, то пустая строка + ! = True, тогда логическое выражение выполнится и функция прервет работу (content==='') - можно на это заменить
    return;
  }
  let todo = new ItemDeal(
    // text = убрали, была ошибка 22.09.2020
    content,
    // color = убрали, была ошибка 22.09.2020
    select.value - 1
  );
  let todo_to_JSON = JSON.stringify(todo);
  localStorage.setItem(+todo.now, todo_to_JSON);
  // поменяли item на todo
  GenerateDOM(todo);
  // documentobjectmodule - встраиваем в веб-сайт
  field.value = "";
}
button.addEventListener("click", addTask);
// что-то вроде onclick, но тут просто click, onclick нельзя отменить (например, при вводе неправильных данных пользователем, например)
// дальше вешаем событие на Enter
document.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    addTask();
  }
  // event.code == 13 номера https://keycode.info/ - перестал работать, в коде разараба можно увидеть что это уже не event.code, а char.Code
  // event.key == х, будет нажимать по x
});
// event - скрытый аргумент, некий параметр js, появляется когда мы вызываем различные слушатели событий, с помощью второго аргумент можно получать доступ к событию https://developer.mozilla.org/ru/docs/Web/API/EventTarget/addEventListener

function drawOnLoad() {
  // показать сохраннные дела - общая задача
  // нужно взять дела из LocalStorage - for
  // парсим из JSON
  // заново генерируем Date
  // отобразить GenerateDOM (вызов)
  for (let i = 0; i < localStorage.length; i++) {
    let lk_ley = localStorage.key(i);
    // Приняв число n (i), метод вернет имя n-ого (i-ого) ключа в localStorage
    let content = localStorage.getItem(lk_ley);
    let todo = JSON.parse(content);
    let tempo_date = Date.parse(todo.now);
    // распарсили
    todo.now = new Date(tempo_date);
    // пересобрали объект времени
    GenerateDOM(todo);
  }
}
// ()); - самовызывающаяся функция
drawOnLoad();
// вызов функции, выше можно заменить на самовызывающуюся
function GenerateDOM(obj) {
  // урок 22.09.2020
  deals.insertAdjacentHTML(
    "afterbegin",
    `
<div class="wrap_task ${important_color[obj.color]}" id=${+obj.now}>
<p class="todo_text">${obj.text}</p>
<p>${obj.now.getDate()} ${Month_Arrey[obj.now.getMonth()]}</p>
<div> <!--<i class="material-icons icon_edit">edit</i>--> <i class="material-icons icon_delete">delete</i>
</div>
</div>`
  );
  // +  -  добавляет, $ - знак итерполляции, id=${+obj.now} - присвоили айди задаче врапу
  // создать примыкающий объект https://developer.mozilla.org/ru/docs/Web/API/Element/insertAdjacentHTML берет код, который вы вставляете, переделывает и вставляет содержиме (либо текст либо html)
  // вставляет html документ, deals родитель, а документ после него наш html вставляется 'afterbegin'
  // `<div></div>` это сама структура, что мы вставляем
}
// https://bulma.io/documentation/helpers/color-helpers/ тут взяли цвет 22.09.2020
// чтобы функция заработала, ее нужно вызвать и создать

deals.addEventListener("click", (e) => {
  console.log(e);
  let trash = e.target.closest(".icon_delete");
  let wrap_task = trash.parentNode.parentNode;
  // parentnosde - посмотреть докуметацию
  // let wrap_task = e.target.closest(".wrap_task");
  //  цель - это самый ближайщий таск к клику
  wrap_task.remove();
  // убрали код из 2 строчек выше, так как был баг, что удалялся таск при нажатии нра любую область
  // переписали на другие две строчки выше
  localStorage.removeItem(wrap_task.getAttribute("id"));
  // нужно, чтобы удалялось из хранилища, а то при обновлениее задача вернется назад
  // из строки 127 - вытаскиваем id, что удалить
});

deals.addEventListener("click", (e) => {
//   console.log(e);
  // let pen = e.target.closest(".icon_edit");
  // let wrap_task = pen.parentNode.parentNode;
  // два раза - на два уровня выше
  // let todo_text = wrap_task.querySelector(".todo_text");
  // editable = todo_text.contentEditable
  // document.querySelector можно, но редактировался бы один, если All, то нужен цикл
  let todo_text = e.target.closest(".todo_text");
  let wrap_task = todo_text.parentNode;
  // чтобы ниже не сломалось и сохранялось, так как мы зкомментировали выше определение wrap_task
  todo_text.contentEditable = "true";
  /*
  // вариант с полным выделение текста
  let selecion = window.getSelection();
  // получение выделения или положение курсора, window - глобальный объект https://learn.javascript.ru/browser-environment
  let range = document.createRange();
  // создание протяженности символов, вырезка содержания стоаницы, какой-то кусок текста, если браузер представлят как колбасу, то range - это часть колбасы
  range.selectNodeContents(todo_text);
  // создание пространства, которое равно содержимому переданного узла todo_text, получаем его контент
  selecion.removeAllRanges();
  // удаляет все остальные выделения, было выделение, нажали на карандаш, оно должно слететь
  selecion.addRange(range);
  // выделить все на той протяженности, которую выбирали (см выше)
  todo_text.focus();
  */

  // вариант с курсором в конце текста
 let selecion = window.getSelection();
 selecion.collapse(todo_text, 1);
//  браузер считает, 0 - открывающий тэг, 1 - это сам текст, 2 - закрывающий тэг у todo


  wrap_task.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      let data = localStorage.getItem(wrap_task.id);
      let obj = JSON.parse(data);
      obj.text = todo_text.textContent;
      let obj_to_JSON = JSON.stringify(obj);
      localStorage.setItem(wrap_task.id, obj_to_JSON);
      // выше пять шагов локалсторэдж получение локалсторедж, распаковка, редактирование, упаковка, сохранение, без этого при обновлении страницы данные старые вставали
      todo_text.contentEditable = "false";
      // если в строчке есть "", то это строка, если кавычек нет, то это объект либо примитивный тип
    }
  });
  });
