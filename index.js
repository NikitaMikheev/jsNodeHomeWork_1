import {readFileSync, writeFileSync} from "fs"; // импортируем встроенные функции модуля fs

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


// ЗАДАЧА 5. Парсер csv файла в json. Работает 

function cvsParse(file) {
    let cvsString = readFileSync('testExcel.csv', {encoding: 'utf8'}); // получаем строки

    let cvsArr = cvsString.split(/\r\n|\r|\n/);
    let arr = [];
    for (let index = 0; index < cvsArr.length; index++) {
        arr.push(cvsArr[index].split(';'));
    }
    console.log(arr);
    let arrayJSON = [];
    let minusLength = -1;
    if(arr.length>=arr[0].length) {
      minusLength = arr.length - arr[0].length;
  }
  
    for (let index = 0; index < arr.length-minusLength; index++) {
        let count = index;
        for (let i = 1; i < arr.length-1; i++) {

            let key = arr[0][count];
            let value = arr[i][count];
            arrayJSON.push({[key] : value});
        }
    }
    console.log(arrayJSON);
    let strJSON = JSON.stringify(arrayJSON);
    writeFileSync(file + '.json', strJSON); // !!! НАЗВАНИЕ СОЗДАВАЕМОГО ФАЙЛА ПЕРЕДАЕМ ПАРАМЕТРОМ КОНСОЛИ !!! */
}

cvsParse(file);
