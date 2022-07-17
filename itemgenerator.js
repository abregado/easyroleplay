import {ItemEffect} from "./ItemEffect.js";

function buildOneOfEachItemEffect(itemEffects){
    let allEffectObjects = [];
    itemEffects.forEach(effectData=>{
        allEffectObjects.push(new ItemEffect(effectData))
    })
    return allEffectObjects;
}

function createList(inputData,strongLevelables) {
    var html = '';

    html += '<ul>';

    inputData.forEach(entry=>{
        const filledText = entry.GenerateText(strongLevelables);
        html += `<li>${filledText}</li>`
    });

    html += '</ul>';

    return html;
}

function insertHTML(id, html) {
    var el = document.getElementById(id);

    if(!el) {
        alert(`Element with id ${id} not found`);
    }

    el.innerHTML = html;
}

function run() {
    var allItems = buildOneOfEachItemEffect(itemEffects)
    const html = createList(allItems,true);
    insertHTML('iteminfo',html);
}

window.onload = run;
