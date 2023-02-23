//Функция перерисовывает таблицу и обновляет номер страницы в DOM
function pagination(){
    //Перерисовывание таблицы
    let newPage = drawTable(data_, page, sortingParams[0],sortingParams[1],sortingParams[2],sortingParams[3]);

    let table = document.getElementById('table-div');
    table.innerHTML = newPage;
    table.innerHTML +=createModal()

    //Обновление страницы
    let pageNum = document.getElementById('page');
    pageNum.innerHTML =" <h2 >"+page+"</h2>"

    addListeners();
}

//Функция "переводит" на последнюю страницу и запускает функцию перерисовки
function lastPage(){
    page = maxPage;
    let button = document.querySelectorAll('.right')
    button[0].style.visibility = 'hidden';
    button[1].style.visibility = 'hidden';
    button = document.querySelectorAll('.left')
    button[0].style.visibility = 'visible';
    button[1].style.visibility = 'visible';
    pagination()
}

//Функция "переводит" на первую страницу и запускает функцию перерисовки
function firstPage(){
    page = 1;
    let button = document.querySelectorAll('.left')
    button[0].style.visibility = 'hidden';
    button[1].style.visibility = 'hidden';
    button = document.querySelectorAll('.right')
    button[0].style.visibility = 'visible';
    button[1].style.visibility = 'visible';
    pagination()
}

//Функция "переводит" на следующую страницу и запускает функцию перерисовки
function nextPage(){
    if(page<maxPage){
        page++;
        let button = document.querySelectorAll('.left')
        button[0].style.visibility = 'visible';
        button[1].style.visibility = 'visible';
        if(page === maxPage){
            console.log(page)
            let button = document.querySelectorAll('.right')
            button[0].style.visibility = 'hidden';
            button[1].style.visibility = 'hidden';
        }
        pagination();
    }
}

//Функция "переводит" на предыдущую страницу и запускает функцию перерисовки
function prevPage(){
    if(page>1){
        page--;
        let button = document.querySelectorAll('.right');
        button[0].style.visibility = 'visible';
        button[1].style.visibility = 'visible';
        if(page===1){
            let button = document.querySelectorAll('.left')
            button[0].style.visibility = 'hidden';
            button[1].style.visibility = 'hidden';
        }
        pagination()
    }
}