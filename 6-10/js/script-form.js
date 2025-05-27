function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
// расширение встроенного типа
Array.prototype.sum = function() {
    let total = this.reduce(function(total, e) {
        return total + +e;
    })
    return total;
}
Array.prototype.average = function() {
    return (this.sum() / this.length);
}
Array.prototype.range = function() {
    return (Math.max(...this) - Math.min(...this));
}

function clickForm(event) {
    if (event.key == 'Enter') {
        event.preventDefault(); // предотвратить очистку формы

        let prices = document.querySelector('#prices input').value.split(' ');
        console.log('Ввод пользователя', prices);

        prices = prices.filter(item => isNumeric(item));
        // конвертация в числа
        prices = prices.map(function (element) {
            return +element // + перед el - конвертация в int
        });
        console.log('Ввод пользователя только с числами', prices);

        // Общая стоимость
        //---
        // let sum = 0;
        // prices.forEach(element => {
        //     console.log(typeof element, element);
        //     sum += element 
        // });
        //---

        let sum = prices.sum();
        document.querySelector('#sum input').value = sum;
        console.log('Общая стоимость', sum);

        // Среднее
        //---
        // document.querySelector('#average input').value = (sum / prices.length).toFixed(2);
        //---
        
        let average = prices.average();
        document.querySelector('#average input').value = average.toFixed(2);
        console.log('Среднее', average);
        console.log('Округленное до 2 среднее', average.toFixed(2));

        // Диапозон
        //---
        // console.log(Math.max(prices)); // проблема - NaN
        // maxx = Math.max.apply(Math, prices) // теперь в функцию передаются все элеенты массива
        // minn = Math.min.apply(Math, prices)
        //---

        let range = prices.range();
        document.querySelector('#range input').value = range;
        console.log('Диапозон', range);
    }
};

// iNPUT: 700 900 1020 asdad   270
// OUTPUT: 2890 722.50 750

// 8 лаба

// способ создания объекта
const example_product = {
    price: 4000,
    name: 'Цианид',
    sale: '0%',
    amount: 6,

    take_one: function() {
        this.amount -= 1;
        console.log(`Заказан 1 ${this.name}; на складе осталось ${this.amount}`)
    }
}
example_product.sale = '60%'; // запись
console.log('Текущая скидка:', example_product.sale) // чтение
example_product.take_one();

class Products {
    constructor(name, price, sale, amount) {
        this.name = name;
        // тут проверка через сеттеры
        this.price = price;
        this.sale = sale;
        this.amount = amount;
    }

    set price(value) {
        this._price = ((!isNumeric(value)) || (value < 1))? 1000: +value;
    }
    set sale(value) {
        this._sale = ((!isNumeric(value)) || (value < 0) || (value > 100))? '0%': value + '%';
    }
    set amount(value) {
        this._amount = ((!isNumeric(value)) || (value < 1))? 0: +value;
    }

    get price() {return this._price}
    get amount() {return this._amount}
    get sale() {return this._sale}

    sell_product(amount) {
        if (!isNumeric(amount)) {
            console.log('Продажи: Получено не число');
        } else if (amount.includes('.')) {
            console.log('Продажи: Количество может быть только ЦЕЛЫМ числом');
        } else if (+amount < 1) {
            console.log('Продажи: Минимальное колво продаваемого товара - 1');
        } else if (+amount > this._amount) {
            console.log(`Продажи: Столько товаров нет в наличии (${this.amount})`);
        } else {
            this.amount -= +amount;
            console.log(`Продажи: Куплено ${+amount} ${this.name}; на складе осталось ${this.amount}`)
        }
    }
}

products = [
    new Products('Нурофен', '380'),
    new Products('Глазные капли', '340', '20', '9'),
    new Products('Фосфалюгель')
]
console.log(products);
// изменение/получение атрибутов
products[0].amount = 'axcadasd';
products[0].amount = -123;
products[0].amount = 15;
console.log(products[0].amount);
// использование методов
products[0].sell_product('1.123123');
products[0].sell_product('Hi bro');
products[1].sell_product('-200')
products[2].sell_product('1')
products[1].sell_product('5');