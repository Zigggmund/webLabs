// anchors[] was removed
let anchors = [];
let links = [];

Object.values(document.querySelectorAll('a')).forEach(function(element) {
    if (element.href.includes('#')) {
        anchors.push(element);
    } else {
        links.push(element);
    }
})

console.log('---LINKS---');
links.forEach(printLinksProperties);
console.log('---ANCHORS---');
anchors.forEach(printAnchorsProperties);
console.log('---IMAGES---');
Object.values(document.images).forEach(printImagesProperties);

function printLinksProperties(element) {
    let href = 'href=' + element.href + ';';
    let text = 'text=' + element.innerHTML + ';';
    let color = 'color=' + getComputedStyle(element).getPropertyValue('color') + ';';
    printProperties(element, [href, text, color]);
} 
function printAnchorsProperties(element) {
    let href = 'href=' + element.href.slice(element.href.indexOf('#')) + ';';
    let text = 'text=' + element.innerHTML + ';';
    let color = 'color=' + getComputedStyle(element).getPropertyValue('color') + ';';
    printProperties(element, [href, text, color]);
} 
function printImagesProperties(element) {
    let src = 'source=' + element.src + ';';
    let size = 'size=' + element.naturalHeight + '*' + element.naturalWidth + ';';
    let border = 'border=' + getComputedStyle(element).getPropertyValue('border') + ';';
    printProperties(element, [src, size, border]);
}

function printProperties(element, properties){
    console.log(('=' + element.tagName + '='), ...properties);
}

const scroll_img = document.querySelector('#scroll-img');
const scroll_left = document.querySelector('#scroll-img-left-arrow');
const scroll_right = document.querySelector('#scroll-img-right-arrow');
const first_number_scroll = 1;
const last_number_scroll = 5;

scroll_left.addEventListener('click', scrollImage);
scroll_right.addEventListener('click', scrollImage);

function scrollImage(e) {
    function imageExists(image_url){
        var http = new XMLHttpRequest();
        http.open('HEAD', image_url, false);
        http.send();
        return http.status != 404;
    }

    let orig_extension = scroll_img.src.split('.')[scroll_img.src.split('.').length - 1];
    let orig_name_without_extension = scroll_img.src.replace('.'+orig_extension, '');
    let orig_path_no_number = orig_name_without_extension.slice(0, -1);
    let orig_number = Number(orig_name_without_extension.replace(orig_path_no_number, ''));
    // console.log(orig_name_without_extension);
    // console.log(orig_extension);
    // console.log(orig_path_no_number);
    // console.log(orig_number);

    if (((orig_number + +e.target.dataset.scroll) >= first_number_scroll) && ((orig_number + +e.target.dataset.scroll) <= last_number_scroll)) {
        orig_number += +e.target.dataset.scroll;
    } else {
        orig_number = ((orig_number + +e.target.dataset.scroll) > last_number_scroll) ? first_number_scroll: last_number_scroll; 
    }

    let new_name = orig_path_no_number+orig_number+'.'+orig_extension;
    console.log(scroll_img.src, '->', new_name);
    scroll_img.src = new_name;
}

// события

const product_arrows = Object.values(document.querySelectorAll('#popular .scroll-buttons > *'));
const special_arrows = Object.values(document.querySelectorAll('#special .scroll-buttons > *'));
const product_ribbon = document.querySelector('#product-ribbon');
const special_ribbon = document.querySelector('#special-ribbon');

console.log(`Product arrows: ${product_arrows}`);
console.log(`Special arrows: ${special_arrows}`);

// желательно переделать в одну функцию
function scrollProducts(e) {
    console.log('Лента товаров на', +e.target.dataset.scroll)
    product_ribbon.scrollLeft += +e.target.dataset.scroll;
    activateButton(e);
} 
function scrollSpecial(e) {
    console.log('Лента спецпредложений на', +e.target.dataset.scroll)
    special_ribbon.scrollLeft += +e.target.dataset.scroll;
    activateButton(e);
}
function activateButton(e) {
    let left_ar;
    if (e.target.id.includes('special')){
        left_ar = document.querySelector('#special-left-arrow');
    } else {
        left_ar = document.querySelector('#product-left-arrow');
    }
    left_ar_display = getComputedStyle(left_ar).getPropertyValue('display');
    if (left_ar_display == 'none'){
        console.log('Теперь левая кнопка отобржается!')
        left_ar.style.display = 'block';
    }
}

product_arrows.forEach(function(e) {
    e.addEventListener('mousedown', scrollProducts)
})
special_arrows.forEach(function(e) {
    e.addEventListener('mousedown', scrollSpecial)
})