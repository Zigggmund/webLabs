const table_rows = document.querySelectorAll('#addresses tbody tr');

// настройка кнопок и изменение стилей под кнопки

let plusButton = document.createElement('input');
plusButton.type = 'image';
plusButton.height = '60px';
plusButton.width = '60px';
plusButton.style.position = 'absolute';
plusButton.style.right = '0px';
plusButton.src = '../../img/icons/plus.png';
plusButton.id = 'clone-address';

console.log(document.querySelector('#addresses > div:last-child'))
document.querySelector('#addresses > div:last-child').style.border = '1px solid black';
document.querySelector('#addresses > div:last-child').appendChild(plusButton);

//===ВОПРОС===
// почему не отображаются элементы
Object.values(table_rows).forEach(function(el) {
    let deleteButton = document.createElement('input');
    deleteButton.type = 'image';
    deleteButton.height = '30px';
    deleteButton.width = '30px';
    deleteButton.class = 'exitButton';
    deleteButton.src = '../../img/icons/krest.png'
})