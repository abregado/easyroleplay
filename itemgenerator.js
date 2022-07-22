import {ItemEffect} from "./ItemEffect.js";
import {Artifact} from "./Artifact.js";

function buildOneOfEachItemEffect(itemEffects){
    let allEffectObject = {effects:[]};
    itemEffects.forEach(effectData=>{
        allEffectObject.effects.push(new ItemEffect(effectData))
    })
    return allEffectObject;
}

function createItemCard(inputData,strongLevelables) {
    console.log(inputData);
    var html = '';

    html += '<div class="item"><ul>';

    html += `<div class="desc">${inputData.rarity} ${inputData.description} (${inputData.size}/${inputData.magic}). ${inputData.price}gp</div>`;

    inputData.effects.forEach(entry=>{
        const filledText = entry.GenerateText(strongLevelables);
        html += `<li class="effect">${filledText}</li>`
    });

    html += '</ul></div>';

    return html;
}

function createList(inputData,strongLevelables) {
    console.log(inputData);
    var html = '';

    html += '<div class="effectList"><ul>';

    inputData.effects.forEach(entry=>{
        const filledText = entry.GenerateText(strongLevelables);
        html += `<li class="effect">${filledText}</li>`
    });

    html += '</ul></div>';

    return html;
}


function insertHTML(id, html) {
    var el = document.getElementById(id);

    if(!el) {
        alert(`Element with id ${id} not found`);
    }

    el.innerHTML = el.innerHTML + html;
}

function run() {
    const itemCount = 50;

    for (let i=0;i<itemCount;i++){
        insertHTML('lowitems',createItemCard(new Artifact(itemEffects,0)));
    }

    for (let i=0;i<itemCount;i++){
        insertHTML('highitems',createItemCard(new Artifact(itemEffects,2)));
    }

    var allItems = buildOneOfEachItemEffect(itemEffects)
    const html = createList(allItems,true);
    insertHTML('allEffects',html);
}

window.onload = run;
