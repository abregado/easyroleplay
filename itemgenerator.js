import {ItemEffect} from "./ItemEffect.js";
import {Artifact} from "./Artifact.js";

class ItemGenerator {

    buildOneOfEachItemEffect(itemEffects) {
        let allEffectObject = {effects: []};
        itemEffects.forEach(effectData => {
            allEffectObject.effects.push(new ItemEffect(effectData))
        })
        return allEffectObject;
    }

    createItemCard(inputData, strongLevelables, seed) {
        var html = '';

        html += '<div class="item"><ul>';

        html += `<div class="desc">${inputData.rarity} ${inputData.description} (${inputData.size}/${inputData.magic}). ${inputData.price}gp, id: ${seed}</div>`;

        inputData.effects.forEach(entry => {
            const filledText = entry.GenerateText(strongLevelables);
            html += `<li class="effect">${filledText}</li>`
        });

        html += '</ul></div>';

        return html;
    }

    createList(inputData, strongLevelables) {
        var html = '';

        html += '<div class="effectList"><ul>';

        inputData.effects.forEach(entry => {
            const filledText = entry.GenerateText(strongLevelables);
            html += `<li class="effect">${filledText}</li>`
        });

        html += '</ul></div>';

        return html;
    }

    insertHTML(id, html) {
        var el = document.getElementById(id);

        if (!el) {
            alert(`Element with id ${id} not found`);
        }

        el.innerHTML = el.innerHTML + html;
    }

    createItemGenerationBox() {
        var html = '';

        html += '<div class="generate-item-box">';
        html += '  <div class="side-by-side">';
        html += '    <div><input type="button" id="random-item-btn" value="Generate new item"></div>';
        html += '    <div>';
        html += '        <label for="item-id-text-box">Recreate item by its ID</label>';
        html += '         <input type="text" id="recreate-item-tb" name="item-id-text-box">';
        html += '    </div>';
        html += '  </div>';
        html += '  <div class="rarity-select">';
        html += '    <select id="raritySelectionSelect">';
        html += '      <option value="0">Uncommon</option>';
        html += '      <option value="2">Rare</option>';
        html += '    </select>';
        html += '  </div>';
        html += '<figure id="generated-item"></figure>';
        html += '</div>';

        return html;
    }

    createEventListeners() {
        var randomItemBtn = document.getElementById('random-item-btn');
        randomItemBtn.addEventListener("click", () => {
            ItemGenerator.generateItem();
        });

        var recreateItemTb = document.getElementById('recreate-item-tb');
        recreateItemTb.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                ItemGenerator.generateItem(event.target.value);
            }
        });
    }

    doGenerateItem (itemId) {
        var seed;
        var initialSeed;

        if (itemId != undefined) {
            // save seed of randomness
            initialSeed = Math.floor(Math.random() * 10000000000);
            // set current seed determined by item id
            if (typeof itemId === "string") {
                seed = parseInt(itemId)
            } else {
                seed = itemId;
            }
        } else {
            seed = Math.floor(Math.random() * 10000000000);
        }

        Math.seedrandom(seed);

        var raritySelection = document.getElementById("raritySelectionSelect");
        var selectedLevel = parseInt(raritySelection.value);

        var el = document.getElementById('generated-item');
        el.innerHTML = "";
        this.insertHTML('generated-item', this.createItemCard(new Artifact(itemEffects, selectedLevel), false, seed));

        if (itemId != undefined) {
            // reset seed back to randomized to end determination
            Math.seedrandom(initialSeed);
        }
    }

    static generateItem(itemId) {
        let generator = new ItemGenerator();
        generator.doGenerateItem(itemId);
    }

    run() {
        const itemCount = 50;

        this.insertHTML('generate-item', this.createItemGenerationBox());

        for (let i=0;i<itemCount;i++){
            let seed = Math.floor(Math.random() * 10000000000);
            Math.seedrandom(seed);
            this.insertHTML('lowitems', this.createItemCard(new Artifact(itemEffects,0), false, seed));
        }

        for (let i=0;i<itemCount;i++){
            let seed = Math.floor(Math.random() * 10000000000);
            Math.seedrandom(seed);
            this.insertHTML('highitems', this.createItemCard(new Artifact(itemEffects,2), false, seed));
        }

        var allItems = this.buildOneOfEachItemEffect(itemEffects)
        const html = this.createList(allItems, true);
        this.insertHTML('allEffects', html);

        this.createEventListeners();
    }
}

window.onload = new ItemGenerator().run();