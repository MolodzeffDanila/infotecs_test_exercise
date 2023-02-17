/*функция создания таблицы
    data -- данные для таблицы
    page -- текущая страница
*/

function drawTable(data, page = 1){
    let ans = "<table class='table-main'>" + //шапка таблицы
        "<thead><tr>" +
            "<td id='firstName'>Имя</td>" +
            "<td id='lastName'>Фамилия</td>" +
            "<td id='about'>Описание</td>" +
            "<td id='eyeColor'>Цвет глаз</td>" +
        "</thead></tr>";

    let newData = data.slice((page-1)*10, page*10); //выбор текущей страницы
    for(let item of newData){ //формирование строк таблицы
        ans += "<tr id="+ item.id + ">" +
            "<td>"+ item.name.firstName + "</td>" +
            "<td>"+ item.name.lastName + "</td>" +
            "<td><div class='td-ab'>"+ item.about + "</div></td>" +
            "<td>"+ item.eyeColor + "</td>" +
            "</tr>";
    }

    ans+="</table>"
    return  ans;
}
/*
функция для сортировки данных.
    col -- колонка, по которой сортируем
    data -- данные для сортировки
*/
function sortTable(col, data){
    //если предыдущая сортировка проводилась по этой же колонке и в прямом порядке,
    // то сортируем в обратном порядке, иначе сортируем в прямом порядке
    if(col === lastSorted.col && lastSorted.dir === "right"){
        if(col === "firstName" || col === "lastName"){
            data.sort((a,b) => {
                return b.name[col].localeCompare(a.name[col])
            })
        }else{
            data.sort((a,b) => {
                return b[col].localeCompare(a[col])
            })
        }
        lastSorted = {col, dir: "reversed"}
    }else{
        if(col === "firstName" || col === "lastName"){
            data.sort((a,b) => {
                return a.name[col].localeCompare(b.name[col])
            })
        }else{
            data.sort((a,b) => {
                return a[col].localeCompare(b[col])
            })
        }
        lastSorted = {col, dir: "right"}
    }

    let newTable = drawTable(data, page) // вызываем функцию для формирования таблицы
    let div = document.getElementById("table-div"); //Перезаписываем таблицу
    div.innerHTML = newTable;

    addListeners();
}
//Функция для создания EventListener'ов для сортировки
function addListeners(){
    const firstName = document.getElementById("firstName");
    firstName.addEventListener("click", function () {
        sortTable(firstName.id,data_);
        }, false);

    const lastName = document.getElementById("lastName");
    lastName.addEventListener("click", function () {
        sortTable(lastName.id,data_);
        }, false);

    const about = document.getElementById("about");
    about.addEventListener("click", function () {
        sortTable(about.id,data_);
        }, false);

    const eyeColor = document.getElementById("eyeColor");
    eyeColor.addEventListener("click", function () {
        sortTable(eyeColor.id,data_);
        }, false);
}

// Создание таблицы с оригинальными данными
let table = document.createElement('div')
table.id = "table-div";
table.innerHTML = drawTable(data_)
document.body.append(table)

let lastSorted = {col: "", dir: "right"} //объект, хранящий предыдущую сортировку(для обратной сортировки)

addListeners()

let page = 1; //текущая страница
let maxPage = Math.ceil(data_.length/10);

function nextPage(){
    if(page<maxPage){
        page++;

        let newPage = drawTable(data_,page)

        let table = document.getElementById('table-div');
        table.innerHTML = newPage;

        let pageNum = document.getElementById('page');
        pageNum.innerHTML =" <h2 >"+page+"</h2>"
    }
}

function prevPage(){
    if(page>1){
        page--;

        let newPage = drawTable(data_,page)

        let table = document.getElementById('table-div');
        table.innerHTML = newPage;

        let pageNum = document.getElementById('page');
        pageNum.innerHTML =" <h2>"+page+"</h2>"
    }
}