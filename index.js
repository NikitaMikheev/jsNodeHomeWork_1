import {readFileSync, writeFileSync, openSync} from "fs"; // импортируем встроенные функции модуля fs

// let str = '(Проверка ()()()на скобки вот ((такие))'; // Получение строки. ДЛЯ ЗАДАЧИ 1 (работает)


/* const args = process.argv; // строка вводится через консоль. ДЛЯ ЗАДАЧИ 2 (работает)
let str = args[2];  */


/* let str = readFileSync('textFile.js', {encoding: 'utf8'}); // Получение строки из файла textFile для проверки на скобки. ДЛЯ ЗАДАЧИ 3 (работает)



function check(str) { // Функция проверки через стек, используя методы push/pop
    let arrStr = str.split('');
    let stack = []; // стэк

    for (let index = 0; index < arrStr.length; index++) {

        if(arrStr[index] === "(") {
            stack.push(arrStr[index]); // добавление в стэк
        }

        else if(arrStr[index] === ")") {
            if(!stack.pop(arrStr[index])) { //снятие верхнего элемента
                return console.log("Не хватает скобок"); 
            }
        }
    }

    if (stack.length === 0) {
        return console.log("Количество скобок правильное");
    }

    else {
        return console.log("Не хватает скобок");
    }
}

check(str); // Вызов функции */



// ЗАДАЧА 4. Передача пути к файлу параметром командной строки

const args = process.argv;
let file = args[2];
const cd = openSync(file, 'r');
let JSONfile = args[3];


// ЗАДАЧА 5. Парсер csv файла в json. Работает 

function cvsParse(cd, JSONfile) {
    let cvsString = readFileSync(cd, {encoding: 'utf8'}); // получаем строки

    let cvsArr = cvsString.split(/\r\n|\r|\n/);
    let arr = [];
    for (let index = 0; index < cvsArr.length; index++) {
        arr.push(cvsArr[index].split(','));
    }
    console.log(arr);
    let arrayJSON = [];
    let rowLengthcount = arr[0].length;
    let columnLengthcount = arr.length-1;
    if(arr.length>=arr[0].length) {
      let minuslength = arr.length - arr[0].length;
      rowLengthcount = arr.length - minuslength;
      columnLengthcount = arr.length[0]-1;
  }
  
    for (let index = 0; index < rowLengthcount; index++) {
        let count = index;
        for (let i = 1; i < columnLengthcount; i++) {

            let key = arr[0][count];
            let value = arr[i][count];
            arrayJSON.push({[key] : value});
        }
    }
    console.log(arrayJSON);
    let strJSON = JSON.stringify(arrayJSON, null, " ");
    writeFileSync(JSONfile + '.json', strJSON); // !!! НАЗВАНИЕ СОЗДАВАЕМОГО ФАЙЛА ПЕРЕДАЕМ ПАРАМЕТРОМ КОНСОЛИ !!! */
    return strJSON;
}

let backToObj = cvsParse(cd, JSONfile);





rewriteAndCheckJSON(backToObj, JSONfile); //ЗАДАЧА 6. Проверка файла JSON и добавления поля. ПРОДОЛЖЕНИЕ ЗАДАЧИ 5. Теперь созданный файл мы проверяем на верный формат, добавляем в объекты поля, и парсим снова в JSON
function rewriteAndCheckJSON(backToObj, JSONfile) {
    let objFromJSON;
    try {
        try {
            objFromJSON = JSON.parse(backToObj);
        }    
        
        catch(error) {
            throw new Error('Данные не в формате JSON!')
        }
        for (let index = 0; index < objFromJSON.length; index++){
        let key = 'new';
        let value = 'value';
        objFromJSON[index][key] = value;
        }

        let secondJSON = JSON.stringify(objFromJSON, null, " ");

        writeFileSync(JSONfile + 'New.json', secondJSON); //создаст файл с таким же названием и прибавит New
    }
    catch(error) {
        throw new Error('Ошибка выполнения! Не удаётся перезаписать файл');
    }    
}



// ЗАДАЧА 7 ЛОГГЕР. Создает текстовый файл log в папке проекта, куда записывает Дату, функцию, результат и параметры
 function logger(priem, value1, value2) {
    let result = priem(value1, value2);
    const data = new Date();
    
    return function functi() {
        let strLogger = `Дата: ${data}` + `\nФункция: ${priem}` + `\nРезультат выполнения функции: ${result}` + `\nПараметры функции: ${value1} и ${value2}`
        return writeFileSync('log.txt', strLogger);
      }
  }
  
  let fu = logger(testFunction, 10, 20);
  fu();
  
  
  function testFunction(a,b) {
        let c=6;
        let d=10;
        return a+b+c+d;
  }
