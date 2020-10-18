const json =require ('./data.json');


// export function gr(min, max) {
function getRandom(min,max){
    let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
// выведи сюда, чтобы потом ей пользоваться в других местах
// export - она будет экспортироваться
// ceil - честное округление
// exports.getRandom = gr;


// ниже функция, чтобы он давал цитаты рандомно, но друг за другом, без повторений

var pool = []; // имеет вид 0,1,2,3 ...n
  function generatePool (){
    for (let i = 0; i < json.motivation_array.length; i++) {
      pool [i]= i;
    }
    return pool;
  }
  pool = generatePool(); // создала выше пул, тут вызвала

function getUniq(){//убрали в аргументе arr, т.к. есть pool + export default  - экспортировать по умолчанию
  /* возвращает уникальные значения
  для массива motivation_arrey
  по принципу исключения
  */
  function getUniqRandom(){
    if(pool.length == 0){
      pool = generatePool();
      console.log("Перезапуск цепочки");
    }
    let index = Math.floor(pool.length * Math.random());
    let delete_item = pool.splice(index, 1); //нужно, чтобы правильно работала функция выше, чтобы всегда выпадали все числа, и не было такого, что 3 не выпал, например
    return delete_item [0]; //возвращает, что выпало рандомно
  }
return getUniqRandom();
}
export {getRandom, getUniq, json}