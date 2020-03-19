let isMobileNav = false;


function initPage() {
    setUpWebShopPrices();
    setUpButtonListeners();
    registerNavigationEvents();
}

function setUpWebShopPrices() {
    const webShopPriceElementList = getWebShopPricesElement();
    webShopPriceElementList.forEach((value) => {
        value.innerHTML = '$ ' + getRandomPriceBetween(13, 25);
    })
}

function getRandomPriceBetween(minPrice, maxPrice) {
    const dollar = getRndInteger(minPrice, maxPrice);
    let penny = getRndInteger(0, 99);

    if (penny < 9)
        penny = `0${penny}`;

    return `${dollar}.${penny}`;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getWebShopPricesElement() {
    return document.querySelectorAll('.price-tag .amount');
}


function getWebShopItemElements() {
    return document.querySelectorAll('.shop-item');
}

function displaySelectedItemView() {
    getSelectedItemView().classList.remove('hidden');
}

function getSelectedItemView() {
    return document.getElementById('selected-shop-item');
}

function setupSelectedItemView(value) {
    getElementById('selected-item-name').innerHTML = value.dataset.name;
    getElementById('selected-item-img').src = value.dataset.img;
    getElementById('selected-item-description').innerHTML = value.dataset.description;
}

function displayShopItemDetails(value) {

    displaySelectedItemView();
    setupSelectedItemView(value);
}

function setupWebshopClickListener() {
    const webshopItems = getWebShopItemElements();
    webshopItems.forEach(value => {
        value.addEventListener('click', (e) => {
            e.stopPropagation();
            displayShopItemDetails(value)
        })
    });

    //stop propagation input
    document.querySelector('.shop .selected-shop-item .content').addEventListener('click', (e) => {
        e.stopPropagation();
    })
}


function setUpButtonListeners() {
    setupCloseButtonListener();
    setupWebshopClickListener();
    setupOrderButtonListener();
}

function setupCloseButtonListener() {
    const closeButtonSelectors = getCloseButtonElements();
    closeButtonSelectors.forEach(value => {
        value.addEventListener('click', (evt => onCloseButtonClick(value)))
    });
}

function getCloseButtonElements() {
    return document.querySelectorAll('.exit-button');
}


function onCloseButtonClick(value) {
    const targetSelector = value.dataset.exitTarget;
    hideElement(targetSelector);
}

function hideElement(targetSelector) {
    getElementById(targetSelector).classList.add('hidden');
}

function getElementById(elementId) {
    return document.getElementById(elementId);
}

function setupOrderButtonListener() {
    const orderButtonElementList = getOrderButtonElements()
    orderButtonElementList.forEach( button =>  {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            location.href = "#order-form";

        })
    })
}

function getOrderButtonElements() {
    return document.querySelectorAll('button.order-button');
}
const header = getElementById('main-header');

function toggleMobileNav() {
    if(header.classList.contains('focus-nav')){
        closeMobileNav();
    }else{
        openMobileNav();
    }
}
function openMobileNav() {
    isMobileNav = true;
    header.classList.add('focus-nav');
}

function closeMobileNav() {
    isMobileNav = false;
    header.classList.remove('focus-nav');
}

function registerNavigationEvents(){
    const nav = document.querySelectorAll('nav ul li a');

    const openButtonNav = document.querySelector('header .mobile-nav .toggle-nav');

    nav.forEach(function(elm) {
        elm.addEventListener("click", toggleActiveClass);
    });


    openButtonNav.addEventListener('click', (e) => {
       toggleMobileNav()
    });

    window.addEventListener('scroll', (e) => {
        const scroll = document.documentElement.scrollTop;
        const nav = getElementById('main-header');

        if(scroll > nav.scrollHeight){
            nav.classList.add('scrolled');
        }else {
            nav.classList.remove('scrolled');
        }


    });
}


function toggleActiveClass(ev){
    ev.preventDefault();

    const item = ev.target.parentNode; // li
    const target = getElementById(ev.target.getAttribute("href").substr(1));

    // return if already current
    if (Classie.has(item, 'active')) {
        return false;
    }

    // remove current
    Classie.remove(document.querySelector('.active'), 'active');

    // set current
    Classie.add(item, 'active');

    if(isMobileNav){
        closeMobileNav();
    }

    const headingOffset = 80;
    window.scrollTo(0, target.offsetTop - headingOffset);
}

class Classie {
    static has(elm, classString) {
        if(elm == null)
            return
        return elm.classList.contains(classString);
    }

    static add(elm, classString) {
        if(elm == null)
            return
        return elm.classList.add(classString);
    }

    static remove(elm, classString) {
        if(elm == null)
            return
        return elm.classList.remove(classString);
    }
}

EpSlider = 1;
prevEpSlider = EpSlider;
function nextEp(){
    EpSlider += 1
    if(EpSlider >= 3)
        EpSlider = 1;
    getElementById("ep" + EpSlider).style.opacity = 1;
    getElementById("ep" + prevEpSlider).style.opacity = 0;

    getElementById("episode-number").innerHTML  = "No. #" + EpSlider;

    prevEpSlider = EpSlider;

}

function prevEp(){
    prevSlide = slideCounter;
    slideCounter -= 1;
    moveSlide(1);
}
MIN_SlIDES = 1;
MAX_SLIDES = 2;
function next(){
    clearInterval(autoSlider);
    slideCounter += 1;
    prevSlide = slideCounter - 1;
    moveSlide();
}
function moveSlide(int){


    if(prevSlide < MIN_SlIDES )
        prevSlide = MAX_SLIDES;

    if(slideCounter > MAX_SLIDES)
        slideCounter = MIN_SlIDES;

    if(slideCounter < MIN_SlIDES)
        slideCounter = MAX_SLIDES;

    getElementById("slide" + prevSlide).style.opacity = 0;
    getElementById("p" + prevSlide).classList.remove("pActive");
    getElementById("slide" + slideCounter).style.opacity = 1;
    getElementById("p" + slideCounter).classList.add("pActive");

    console.log(prevSlide, slideCounter);
    autoSlider = setInterval(next, 4000)
}

initPage();
