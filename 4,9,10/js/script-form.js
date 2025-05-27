const form = document.mainForm;
const form_block = form.querySelector('#all-forms');
let confirm_btn = form.confirm;
let input_fields = Object.values(form_block.querySelectorAll('input[type="text"]'));

// словарь с данными
let all_data = [];

// начальная настройка стилей

primary_style();
function primary_style() {
    //добавление disabled ко всем input
    input_fields.forEach(function (el) {
        el.disabled = true;
        el.placeholder = 'Заполните предыдущий пункт'
    })
    input_fields[0].disabled = false;
    input_fields[0].placeholder = 'Нужно заполнить';

    //submit
    confirm_btn.style.border = '3px solid red';
    form.addEventListener('submit', submitStandart);
}

document.querySelector('#exit-button').addEventListener('click', (e) => {
    // window.location.href='index.html';
    alert('asasdasd');
    return false;
})

//===ВОПРОС===
// почему при любом действии форма перезагружается

// обработка ивентов

function submitStandart(e) {
    e.preventDefault();
    
    if (!(input_fields.some(el => el.value.length === 0))) {
        console.log('Адрес добавлен');
        alert('Адрес успешно добавлен')
        saveData();
    }
    else {
        // срабатывает при нажатии на крестик
        console.log('Адрес не добавлен')
        alert('Адрес успешно добавлен' + e.currentTarget)
        alert('Данные не были получены; не все поля заполнены')
    }
    return false
}

function resetStandart(e) {
    console.log('Значения сброшены')
    primary_style(); // disabled для input
}

function saveData(){
    let data = [];
    input_fields.forEach((e) => {
        data.push(e.value);
    })
    data.push(form_block.querySelector('input[type="checkbox"]').checked)
    all_data.push(data);
    localStorage.setItem('addresses', JSON.stringify(all_data));
    console.log(localStorage.getItem('addresses'));
}

// открытие поля после ввода
input_fields.forEach( (el, i) => {
    el.addEventListener('input', function(e) {
        // когда длина поля меняется
        if (e.target.value.length != 0) {
            // если длина != 0
            if (input_fields.every((el) => el.value.length != 0)) {
                // если все поля заполнены
                confirm_btn.style.border = 'none';
            }
            if (input_fields.length != (i+1)) {
                // если поле не последнее
                console.log('nextDisable')
                input_fields[i+1].disabled = false;
                input_fields[i+1].placeholder = 'Нужно заполнить';
            }
        } else {
            if (confirm_btn.style.border == 'none') {
                confirm_btn.style.border = '3px solid red';
            }
        }
    })
})