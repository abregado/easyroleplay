const MAX_COOKIE_SIZE = 4096;
const SIZE_BUFFER = 20;
const SEVEN_DAYS = 7;
const BASKET_COOKIE = 'basket-cookie';

addItemToBasket = function (caller) {
    let itemHtml = caller.parentElement;
    let effects = itemHtml.querySelectorAll('.effect');
    let basketObj;

    let itemObject = {};
    itemObject.desc = itemHtml.querySelector('.desc').innerText;
    itemObject.effects = [];
    effects.forEach( effect => {
        itemObject.effects.push(effect.innerText);
    });

    // check for existing cookie
    let bCookie = getCookie(BASKET_COOKIE);
    if (bCookie == '') {
        basketObj = [];
    } else {
        basketObj = JSON.parse(bCookie);
    }
    basketObj.push(itemObject);

    if (JSON.stringify(basketObj).length + SIZE_BUFFER > MAX_COOKIE_SIZE) {
        // TODO change into normal error message
        alert('Maximum basket size reached');
        return;
    }

    // create a basket cookie
    setCookie(BASKET_COOKIE, JSON.stringify(basketObj), SEVEN_DAYS);
}

function removeItemFromBasket(caller) {
    let itemNode = caller.parentNode.parentNode.parentNode;
    let parent = itemNode.parentNode;
    let index = Array.prototype.indexOf.call(parent.children, itemNode);
    let bCookie = getCookie(BASKET_COOKIE);
    let basketObj = JSON.parse(bCookie);;

    basketObj.splice(index, 1);
    setCookie(BASKET_COOKIE, JSON.stringify(basketObj), SEVEN_DAYS);
    loadBasket();
}

// function editItem(caller) {
//     let block = caller.parentNode;
//     let parent = itemHtml.parentNode;
//     let itemNode = caller.parentNode.parentNode.parentNode;
//     let index = Array.prototype.indexOf.call(parent.children, itemNode);
//     let bCookie = getCookie(BASKET_COOKIE);
//
//     let basketObj = JSON.parse(bCookie);;
//
//     basketObj.splice(index, 1);
//     setCookie(BASKET_COOKIE, JSON.stringify(basketObj), SEVEN_DAYS);
//     loadBasket();
// }

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

loadBasket = function() {
    // reset basket content
    document.getElementById('item-basket-section').innerHTML = "";

    let basketCookie = getCookie('basket-cookie');
    if (basketCookie == '') {
        insertHTML('item-basket-section', '<p>No items in basket</p>');
        document.getElementById('basket-item-count').innerText = "0";
        return;
    }

    let basket = JSON.parse(basketCookie);
    basket.forEach(item => {
        insertHTML('item-basket-section', createBasketItemCard(item));
    });
    document.getElementById('basket-item-count').innerText = basket.length;
}

insertHTML = function (id, html) {
    var el = document.getElementById(id);

    if (!el) {
        alert(`Element with id ${id} not found`);
    }

    el.innerHTML = el.innerHTML + html;
}

createBasketItemCard = function (inputData) {
    var html = '';
    html += '<div class="item"><ul>';
    html += `<div class="desc">${inputData.desc}</div>`;
    inputData.effects.forEach(entry => {
        html += `<li class="effect">${entry}</li>`;
    });
    html += '  <div class="side-by-side">';
    html += '    <input class="remove-item-btn" type="button" onclick="removeItemFromBasket(this)" value="Remove" />';
    html += '  </div>';
    html += '</ul></div>';
    return html;
}

// wait for document to be fully loaded
document.addEventListener("DOMContentLoaded", function(event) {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("basketBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal and populate items
    btn.onclick = function() {
        modal.style.display = "block";
        loadBasket();
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});


