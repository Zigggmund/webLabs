const color_main_text = getComputedStyle(document.body).getPropertyValue('--main-text')
let table_rows = Object.values(document.querySelectorAll('#addresses tbody tr'));
const default_address = '<th>-</th><th>Красноярский край</th><th>Красноярский район</th><th>Красноярск</th><th>Улица-3</th><th>8</th><th>185</th>'

//добавление адресов
if (localStorage.getItem('addresses') != null){add_rows();}
function add_rows() {
    all_rows_data = JSON.parse(localStorage.getItem('addresses'));

    all_rows_data.forEach((row_data, i) => {
        if (row_data[row_data.length-1] == true) {
            remove_highlighing();
        } else {
            // ряд выделяется, если других больше нету
            row_data[row_data.length-1] = (table_rows.length == 0)?true: false;
        }

        let address = '<th>-</th>'
        row_data.slice(0, row_data.length - 1).forEach((data) => {
            address += `<th>${data}</th>`
        })
        let row = document.querySelector('#addresses tbody').insertRow(-1);
        row.innerHTML = address;
        console.log(table_rows, row_data[row_data.length-1], typeof row_data[row_data.length-1])
        if (row_data[row_data.length-1]) {
            row.classList.add('table-active');
        }
        add_delete_button(row);
        // обновляем ряды
        table_rows = Object.values(document.querySelectorAll('#addresses tbody tr'));
    })
    numbering();
    localStorage.removeItem('addresses');
}

// настройка кнопок и изменение стилей под кнопки

// добавление нового столбца к таблице
document.querySelector('#addresses thead tr').insertCell(0);

// кнопка +
let plusButton = document.createElement('input');
plusButton.type = 'image';
plusButton.style.maxHeight = '60px';
plusButton.style.position = 'absolute';
plusButton.style.right = '0px';
plusButton.style.bottom = '0px';
plusButton.src = '../../img/icons/plus.png';
plusButton.id = 'clone-address';
plusButton.addEventListener('click', add_default_row);
document.querySelector('#addresses > div').children[document.querySelector('#addresses > div').children.length - 1].appendChild(plusButton);

function add_default_row() {
    remove_highlighing();
    // выделяем добавленный элемент
    let row = document.querySelector('#addresses tbody').insertRow(-1);
    row.innerHTML = default_address;
    row.classList.add('table-active');

    add_delete_button(row);
    numbering();
}

function add_delete_button (row) {
    let deleteButton = document.createElement('input');
    deleteButton.type = 'image';
    deleteButton.class = 'exitButton';
    deleteButton.src = '../../img/icons/krest.png';
    deleteButton.style.maxHeight = '35px';
    deleteButton.addEventListener('click', (e) => {
        console.log('Адрес удален', row)
        if (row.classList.contains('table-active')){
            // выделение ряда, если это возможно
            try {
                row.parentElement.children[row == table_rows[0]? 1:0].classList.add('table-active')
            } catch(e) {}
        }
        row.parentElement.removeChild(row);
        numbering();
    })
    let cell = row.insertCell(0); // вставка клетки
    cell.style.border = `1px solid ${color_main_text}`;
    cell.appendChild(deleteButton);
}

// вспомогательные функции

function numbering() {
    table_rows = Object.values(document.querySelectorAll('#addresses tbody tr'));
    table_rows.forEach((row, i) => {
        row.children[1].innerHTML = i+1;
    })
}

function remove_highlighing() {
    table_rows.forEach((e) => {
        if (e.classList.contains('table-active')) {
            e.classList.remove('table-active');
        }
    })
}