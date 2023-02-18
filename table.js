let fNameImgNosort = `<img id='firstName' class="img-tag" src='NoSort.png'>`;
let lNameImgNosort = `<img id='lastName' class="img-tag" src='NoSort.png'>`;
let aboutImgNosort = `<img id='about' class="img-tag" src='NoSort.png'>`;
let eyeColorImgNosort = `<img id='eyeColor' class="img-tag" src='NoSort.png'>`;

function showModal(id = 'id') {
    let modal = document.getElementById('modal-hidden');
    console.log(modal);
    modal.classList.remove('modal-hidden')
    modal.classList.add('modal')
    console.log(modal);
}

/*функция создания таблицы
    data -- данные для таблицы
    page -- текущая страница
    fNameImg -- иконка для колонки "Имя"
    lNameImg -- иконка для колонки "Фамилия"
    aboutImg -- иконка для колонки "Описание"
    eyeColorImg -- иконка для колонки "Цвет глаз"
*/

function drawTable(data,
                   page = 1,
                   fNameImg = fNameImgNosort,
                   lNameImg = lNameImgNosort,
                   aboutImg = aboutImgNosort,
                   eyeColorImg= eyeColorImgNosort){
    //шапка таблицы
    let ans = "<table class='table-main'><thead><tr>"
    if(!hiddenColumns.has("firstName")){
        ans+="<td >"+`${fNameImg}` +"Имя</td>";
    }
    if(!hiddenColumns.has("lastName")){
        ans+="<td >"+`${lNameImg}` +"Фамилия</td>";
    }
    if(!hiddenColumns.has("about")){
        ans+="<td >"+`${aboutImg}` +"Описание</td>";
    }
    if(!hiddenColumns.has("eyeColor")){
        ans+="<td >"+`${eyeColorImg}` +"Цвет глаз</td>"
    }
    ans+="</thead></tr>";

    let newData = data.slice((page-1)*10, page*10); //выбор текущей страницы
    for(let i=0;i<newData.length;i++){

        ans += `<tr class='row' id="${newData[i].id}" onclick="showModal('${newData[i].id}')">`

        if(!hiddenColumns.has("firstName")){
            ans+=`<td>${newData[i].name.firstName}</td>`;
        }
        if(!hiddenColumns.has("lastName")){
            ans+=`<td>${newData[i].name.lastName}</td>`;
        }
        if(!hiddenColumns.has("about")){
            ans+=`<td><div class='td-ab'>${newData[i].about}</div></td>`;
        }
        if(!hiddenColumns.has("eyeColor")){
            ans+=`<td><div style='background-color: ${newData[i].eyeColor};` +
                "height: 4vh; " +
                "width: 4vh;" +
                "border-radius: 2vh;" +
                "margin: auto;'> </div></td>"
        }


         ans+= "</tr>";
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
    let imgIcon;
    //Создание нужной иконки сортировки в шапке
    if(lastSorted.dir === "reversed"){
        imgIcon = `<img id="${col}" class="img-tag" src='SortAZ.png' alt="sort-icon">`
    }else{
        imgIcon = `<img id="${col}" class="img-tag" src='SortZA.png' alt="sort-icon">`
    }

    sortingParams = [fNameImgNosort,lNameImgNosort,aboutImgNosort,eyeColorImgNosort];

    let newTable;
    // вызываем функцию для формирования таблицы в зависимости от сортировки
    switch (col){
        case "firstName":
            sortingParams[0] = imgIcon
            newTable = drawTable(data, page, sortingParams[0],sortingParams[1],sortingParams[2],sortingParams[3]);
            break;
        case "lastName":
            sortingParams[1] = imgIcon
            newTable = drawTable(data, page, sortingParams[0],sortingParams[1],sortingParams[2],sortingParams[3]);
            break;
        case "about":
            sortingParams[2] = imgIcon
            newTable = drawTable(data, page, sortingParams[0],sortingParams[1],sortingParams[2],sortingParams[3]);
            break;
        case "eyeColor":
            sortingParams[3] = imgIcon
            newTable = drawTable(data, page, sortingParams[0],sortingParams[1],sortingParams[2],sortingParams[3]);
            break;
    }


    let div = document.getElementById("table-div"); //Перезаписываем таблицу
    div.innerHTML = newTable;
    div.innerHTML +=createModal()
    addListeners();

}
//Функция для создания EventListener'ов для сортировки
function addListeners(){
    const firstName = document.getElementById("firstName");
    firstName?.addEventListener("click", function () {
        sortTable(firstName.id,data_);
        }, false);

    const lastName = document.getElementById("lastName");
    lastName?.addEventListener("click", function () {
        sortTable(lastName.id,data_);
        }, false);

    const about = document.getElementById("about");
    about?.addEventListener("click", function () {
        sortTable(about.id,data_);
        }, false);

    const eyeColor = document.getElementById("eyeColor");
    eyeColor?.addEventListener("click", function () {
        sortTable(eyeColor.id,data_);
        }, false);
}

//Функция определяет данные для текущей страницы
function pagination(){
    let newPage = drawTable(data_,page)

    let table = document.getElementById('table-div');
    table.innerHTML = newPage;
    table.innerHTML +=createModal()

    let pageNum = document.getElementById('page');
    pageNum.innerHTML =" <h2 >"+page+"</h2>"

    addListeners()
}

function lastPage(){
    page = maxPage;

    pagination()
}

function firstPage(){
    page = 1;

    pagination()
}

function nextPage(){
    if(page<maxPage){
        page++;

        pagination()
    }
}

function prevPage(){
    if(page>1){
        page--;

        pagination()
    }
}

function createModal(){
    let modal = "<div  id='modal-hidden' class='modal-hidden'>" +
        "<form>" +
            "<h3>Введите новые данные:</h3>" +
            "<label>Имя</label><input type='text' id='first-name-input'></br>"+
            "<label>Фамилия</label><input type='text' id='second-name-input'></br>" +
            "<label>писание</label><input type='text' id='about-input'></br>"+
            "<label>Цвет глаз</label><input type='text' id='eye-color-input'></br>" +
            "<button>Отменить</button>"+
            "<button>Сохранить</button>"+
        "</form>" +
    "</div>"
    return modal
}

let hiddenColumns = new Set();
let sortingParams = [fNameImgNosort,lNameImgNosort,aboutImgNosort,eyeColorImgNosort]
// Создание таблицы с оригинальными данными
let table = document.createElement('div')
table.id = "table-div";
table.innerHTML = drawTable(data_)
document.body.append(table)

table.innerHTML += createModal()

let lastSorted = {col: "", dir: "right"} //объект, хранящий предыдущую сортировку(для обратной сортировки)

addListeners()

let page = 1; //текущая страница
let maxPage = Math.ceil(data_.length/10);

//Следующие 4 EventListener'a были вынесены из функции addListeners чтобы избежать их пересоздания
// при перерисовке таблицы
// Чекбоксы обозначают те колонки, которые будут скрыты
const firstNameCheckbox = document.querySelector('#firstName-checkbox');
firstNameCheckbox.addEventListener('change', () => {
    if (firstNameCheckbox.checked) {
        hiddenColumns.add(firstNameCheckbox.name)
    } else {
        hiddenColumns.delete(firstNameCheckbox.name)
    }
    let newTable = drawTable(data_, page,sortingParams[0],sortingParams[1],sortingParams[2],sortingParams[3]);
    let div = document.getElementById("table-div"); //Перезаписываем таблицу
    div.innerHTML = newTable;
    div.innerHTML+=createModal()

    addListeners();
});

const lastNameCheckbox = document.querySelector('#lastName-checkbox');
lastNameCheckbox.addEventListener('change', () => {
    if (lastNameCheckbox.checked) {
        hiddenColumns.add(lastNameCheckbox.name)
    } else {
        hiddenColumns.delete(lastNameCheckbox.name)
    }
    let newTable = drawTable(data_, page, sortingParams[0],sortingParams[1],sortingParams[2],sortingParams[3]);
    let div = document.getElementById("table-div"); //Перезаписываем таблицу
    div.innerHTML = newTable;
    div.innerHTML+=createModal()

    addListeners();
});

const aboutCheckbox = document.querySelector('#about-checkbox');
aboutCheckbox.addEventListener('change', () => {
    if (aboutCheckbox.checked) {
        hiddenColumns.add(aboutCheckbox.name)
    } else {
        hiddenColumns.delete(aboutCheckbox.name)
    }
    let newTable = drawTable(data_, page, sortingParams[0],sortingParams[1],sortingParams[2],sortingParams[3]);
    let div = document.getElementById("table-div"); //Перезаписываем таблицу
    div.innerHTML = newTable;
    div.innerHTML+=createModal()

    addListeners();
});

const eyeColorCheckbox = document.querySelector('#eyeColor-checkbox');
eyeColorCheckbox.addEventListener('change', () => {
    if (eyeColorCheckbox.checked) {
        hiddenColumns.add(eyeColorCheckbox.name)
    } else {
        hiddenColumns.delete(eyeColorCheckbox.name)
    }
    let newTable = drawTable(data_, page, sortingParams[0],sortingParams[1],sortingParams[2],sortingParams[3]);
    let div = document.getElementById("table-div"); //Перезаписываем таблицу
    div.innerHTML = newTable;
    div.innerHTML+=createModal()

    addListeners();
});
