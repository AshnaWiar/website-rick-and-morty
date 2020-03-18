function initPage() {
    setUpWebShopPrices();
    setUpButtonListeners()
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
    console.log("called");
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
        })
    })
}

function getOrderButtonElements() {
    return document.querySelectorAll('button.order-button');
}

initPage();
