const form = document.mainForm;
const form_block = form.querySelector('#all-forms');
let confirm_btn = form.confirm;

let input_fields = form_block.querySelectorAll('input[type="text"]');

// начальная настройка стилей

//===ВОПРОС===
// почему при любом действии форма перезагружается

//disabled
Object.values(input_fields).forEach(function (el) {
    el.disabled = true;
    el.placeholder = 'Заполните предыдущий пункт'
})
input_fields[0].disabled = false;
input_fields[0].placeholder = 'Нужно заполнить';

//submit
confirm_btn.style.border = '3px solid red';

// обработка ивентов

function submitStandart(e) {
    e.preventDefault();
    console.log('Значения сброшены')
    if (input_fields.every()) {
        console.log('Адрес добавлен');
        let all_data = $('form').serializeArray();
        console.log('Данные собраны в один объект:', all_data)
    }
    else {
        console.log('Адрес не добавлен')
        alert('Данные не были получены; не все поля заполнены')
    }
    return false
}

function resetStandart(e) {
    console.log('Значения сброшены')
}

Object.values(input_fields).forEach(function (el) {
    el.addEventListener('onchange', function(e) {
        e.target.nextSibling.disabled = false;
        e.target.nextSibling.placeholder = 'Нужно заполнить';
    })
})