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
        ans+="<td ><div id='firstName'>Имя</br>"+`${fNameImg}` +"</div></td>";
    }
    if(!hiddenColumns.has("lastName")){
        ans+="<td ><div id='lastName'>Фамилия</br>"+`${lNameImg}` +"</div></td>";
    }
    if(!hiddenColumns.has("about")){
        ans+="<td ><div id='about'>Описание</br>"+`${aboutImg}` +"</div></td>";
    }
    if(!hiddenColumns.has("eyeColor")){
        ans+="<td ><div id='eyeColor'>Цвет глаз</br>"+`${eyeColorImg}` +"</div></td>"
    }
    ans+="</thead></tr>";

    let newData = data.slice((page-1)*10, page*10); //выбор текущей страницы
    for(let i=0;i<newData.length;i++){

        ans += `<tr class='row' title='Редактировать' id="${newData[i].id}" onclick="onClickRow('${newData[i].id}')">`

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

        let paginationBlock = document.querySelector(".pagination-buttons-block");
        //Нелепая конструкция скрытия пагинации при скрытии всехстрок таблицы
        if(paginationBlock){
            if(hiddenColumns.size===4){
                paginationBlock.style.visibility = "hidden";
            }else{
                paginationBlock.style.visibility = "visible";
            }
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
    //Если до этого была обратная сортировка, то создаем иконку для прямого порядка
    //Иначе для обратного
    if(lastSorted.dir === "reversed"){
        imgIcon = `<img id="${col}" class="img-tag" src='../static/SortAZ.png' alt="sort-icon">`
    }else{
        imgIcon = `<img id="${col}" class="img-tag" src='../static/SortZA.png' alt="sort-icon">`
    }

    sortingParams = [fNameImgNosort,lNameImgNosort,aboutImgNosort,eyeColorImgNosort];

    let newTable;
    // вызываем функцию для формирования таблицы в зависимости от сортировки
    //А так же меняем массив строк, содержащий иконки для сортировки
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

    //Перезаписываем таблицу
    let div = document.getElementById("table-div");
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

//Константные строки, обозначающие страндартные иконки
let fNameImgNosort = `<img class="img-tag" src='./static/NoSort.png'>`;
let lNameImgNosort = `<img class="img-tag" src='./static/NoSort.png'>`;
let aboutImgNosort = `<img class="img-tag" src='./static/NoSort.png'>`;
let eyeColorImgNosort = `<img class="img-tag" src='./static/NoSort.png'>`;

//ИД редактируемой строки таблицы
let indexOfChange = 0;

//Множество скрытых колонок
let hiddenColumns = new Set();

//Массив иконок
let sortingParams = [fNameImgNosort,lNameImgNosort,aboutImgNosort,eyeColorImgNosort];

//Массив цветов для корректного автозаполнения внутри модального окна
let colors = {red:'#ff0000', blue:'#0000ff', brown:'#a52a2a', green:'#008000'};

// Создание таблицы с оригинальными данными
let table = document.createElement('div')
table.id = "table-div";
table.innerHTML = drawTable(data_)
document.body.append(table)

table.innerHTML += createModal()

let lastSorted = {col: "", dir: "right"} //объект, хранящий предыдущую сортировку(для обратной сортировки)
addListeners()

//текущая страница
let page = 1;
//Последняя страница
let maxPage = Math.ceil(data_.length/10);
