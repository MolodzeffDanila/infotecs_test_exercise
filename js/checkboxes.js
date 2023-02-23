//Следующие 4 EventListener'a были вынесены из функции addListeners чтобы избежать их пересоздания
// при перерисовке таблицы
// Чекбоксы обозначают те колонки, которые будут скрыты
//Обработчик события для скрытия колонки "Имя"
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

//Обработчик события для скрытия колонки "Фамилия"
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

//Обработчик события для скрытия колонки "Описание"
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

//Обработчик события для скрытия колонки "Цвет глаз"
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