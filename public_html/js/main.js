function initPage() {
    setUpWebShopPrices();
}


function setUpWebShopPrices() {
    const webShopPriceElementList = getWebShopPricesElement();
    webShopPriceElementList.forEach((value) => {
        value.innerHTML = '&euro; ' + getRandomPriceBetween(13, 25);
    })
}

function getRandomPriceBetween(minPrice, maxPrice) {
    const dollar = getRndInteger(minPrice, maxPrice);
    let penny = getRndInteger(0, 99);

    if(penny < 9)
        penny = `0${penny}`;

    return `${dollar}.${penny}`;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getWebShopPricesElement() {
    return document.querySelectorAll('.price-tag .amount');
}


initPage();
