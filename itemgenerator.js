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
    //console.log(inputData);
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

    let randomizedSeed = Math.random();

    Math.seedrandom(685780167);
    insertHTML('lowitems',createItemCard(new Artifact(itemEffects,0)));

    Math.seedrandom(randomizedSeed);
    insertHTML('lowitems',createItemCard(new Artifact(itemEffects,0)));

    // for (let i=0;i<itemCount;i++){
    //     insertHTML('lowitems',createItemCard(new Artifact(itemEffects,0)));
    // }
    //
    // for (let i=0;i<itemCount;i++){
    //     insertHTML('highitems',createItemCard(new Artifact(itemEffects,2)));
    // }

    var allItems = buildOneOfEachItemEffect(itemEffects)
    const html = createList(allItems,true);
    insertHTML('allEffects',html);
}

// MY STUFF
function manageSeed() {
    let newSeed = Math.floor(Math.random() * 1000000000);
    // console.log("new seed: " + newSeed);

    newSeed = 685780167;
    Math.seedrandom(newSeed);
    let num1 = Math.random() * 1000000000;
    let num2 = Math.random() * 1000000000;
    console.log(num1 + ", " + num2);

    newSeed = 365719938;
    Math.seedrandom(newSeed);
    num1 = Math.random() * 1000000000;
    num2 = Math.random() * 1000000000;
    console.log(num1 + ", " + num2);

    newSeed = 12587601;
    Math.seedrandom(newSeed);
    num1 = Math.random() * 1000000000;
    num2 = Math.random() * 1000000000;
    console.log(num1 + ", " + num2);
}

// Define the Murmur3Hash function
function MurmurHash3(string) {
    let i = 0;
    let hash = 0;
    for (i, hash = 1779033703 ^ string.length; i < string.length; i++) {
        let bitwise_xor_from_character = hash ^ string.charCodeAt(i);
        hash = Math.imul(bitwise_xor_from_character, 3432918353);
        hash = hash << 13 | hash >>> 19;
    }

    hash = Math.imul(hash ^ (hash >>> 16), 2246822507);
    hash = Math.imul(hash ^ (hash >>> 13), 3266489909);
    return (hash ^= hash >>> 16) >>> 0;
    // why was he returning a function instead of a hash result?
    // return () => {
    //     // Return the hash that you can use as a seed
    //     hash = Math.imul(hash ^ (hash >>> 16), 2246822507);
    //     hash = Math.imul(hash ^ (hash >>> 13), 3266489909);
    //     return (hash ^= hash >>> 16) >>> 0;
    // }
}

function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    return [(h1^h2^h3^h4)>>>0, (h2^h1)>>>0, (h3^h1)>>>0, (h4^h1)>>>0];
}



window.onload = run;
