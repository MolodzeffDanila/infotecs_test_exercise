
/*Функция запоминает текущий id строки для изменения, а так же отрисовывает модальное окно
--id - ИД записи, которая сейчас изменяется
*/
function onClickRow(id){
    let modal = document.getElementById('modal-hidden');
    modal.classList.remove('modal-hidden')
    modal.classList.add('modal')
    indexOfChange = id;
    showModal()
}
// Функция производит автозаполнение полей для ввода и создает обработчк событий для кнопки сохранения
function showModal() {
    let currElem;
    for(let item of data_){
        if(item.id === indexOfChange){
            currElem = item;
        }
    }
    //Автозаполнение
    const firstNameInput = document.querySelector('#first-name-input');
    firstNameInput.value = currElem.name.firstName;
    const lastNameInput = document.querySelector('#second-name-input');
    lastNameInput.value = currElem.name.lastName;
    const aboutInput = document.querySelector('#about-input');
    aboutInput.value = currElem.about;
    const eyeColorInput = document.querySelector('#eye-color-input');
    if(colors[currElem.eyeColor]){
        eyeColorInput.value = colors[currElem.eyeColor]
    }else{
        eyeColorInput.value = currElem.eyeColor
    }
    //Вешаем обработчик событий на кнопку "Сохранить"
    const submitButton = document.querySelector('#save-button');
    submitButton.addEventListener('click', () => {
        //Изменение нужной строки в таблице
        for(let item of data_){
            if(item.id === indexOfChange){
                item.name.firstName = firstNameInput.value;
                item.name.lastName = lastNameInput.value;
                item.about = aboutInput.value;
                item.eyeColor = eyeColorInput.value;
            }
        }
        //Перерисовывание таблицы
        let newPage = drawTable(data_, page, sortingParams[0],sortingParams[1],sortingParams[2],sortingParams[3])

        let table = document.getElementById('table-div');
        table.innerHTML = newPage;
        table.innerHTML +=createModal();
        addListeners()
    }, {once: true});

}

//Функция скрывает модальное окно и перерисовывает таблицу
function closeModal(){

    let modal = document.getElementById('modal-hidden');
    modal.classList.remove('modal');
    modal.classList.add('modal-hidden');

    let newPage = drawTable(data_, page, sortingParams[0],sortingParams[1],sortingParams[2],sortingParams[3])

    let table = document.getElementById('table-div');
    table.innerHTML = newPage;
    table.innerHTML +=createModal();

    addListeners();
}

//Функция формирует строку-запись DOM-элемента модального окна
function createModal(){
    let modal = "<div  id='modal-hidden' class='modal-hidden'>" +
        "<div id='modal-header'><h3>Введите новые данные:</h3></div>" +
        "<label class='modal-label'>Имя:</label><input type='text' id='first-name-input'></br>"+
        "<label class='modal-label'>Фамилия:</label><input type='text' id='second-name-input'></br>" +
        "<label class='modal-label'>Описание:</label><textarea rows='10' id='about-input'></textarea></br>"+
        //selectEyeColor() +
        "<p>Выберите цвет глаз:</p><input type='color' id='eye-color-input'>"+
        "<div id='buttons-modal'><button id='cancel-button' onclick='closeModal()'>Отменить</button>"+
        "<button id='save-button'>Сохранить</button></div>"+
        "</div>"
    return modal
}