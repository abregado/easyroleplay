import {ItemEffect} from "./ItemEffect.js";
import {Artifact} from "./Artifact.js";
import {ItemTypes} from "./Artifact.js";

/**
 * Handles generation of items
 */
export class ItemGenerator {

    /**
     * Generate a new item in the generate item box
     * @param itemId Id of an existing item in case we want to recreate an item
     */
    static generateItem(itemId) {
        let generator = new ItemGenerator();
        generator.#doGenerateItem(itemId);
    }

    /**
     * Method called to build the initial page content
     */
    run() {
        const itemCount = 5;

        //this.#insertHTML('generate-item', this.#createItemGenerationBox());

        for (let i=0;i<itemCount;i++){
            let seed = Math.floor(Math.random() * 10000000000);
            // make item property generation based on this seed
            Math.seedrandom(seed);
            var itemType = this.#determineItemType(null);
            var itemId = itemType.abbr + "-0-" + seed;
            this.#insertHTML('weakitems', this.#createItemCard(new Artifact(itemType,0), false, itemId));
        }

        for (let i=0;i<itemCount;i++){
            let seed = Math.floor(Math.random() * 10000000000);
            // make item property generation based on this seed
            Math.seedrandom(seed);
            var itemType = this.#determineItemType(null);
            var itemId = itemType.abbr + "-2-" + seed;
            this.#insertHTML('strongitems', this.#createItemCard(new Artifact(itemType,1), false, itemId));
        }

        for (let i=0;i<itemCount;i++){
            let seed = Math.floor(Math.random() * 10000000000);
            // make item property generation based on this seed
            Math.seedrandom(seed);
            var itemType = this.#determineItemType(null);
            var itemId = itemType.abbr + "-2-" + seed;
            this.#insertHTML('incredibleitems', this.#createItemCard(new Artifact(itemType,2), false, itemId));
        }

        var allItems = this.#buildOneOfEachItemEffect(accessoryEffects)
        const html = this.#createList(allItems, true);
        this.#insertHTML('allEffects', html);

        this.#createEventListeners();
    }

    #buildOneOfEachItemEffect(itemEffects) {
        let allEffectObject = {effects: []};
        itemEffects.forEach(effectData => {
            allEffectObject.effects.push(new ItemEffect(effectData))
        })
        return allEffectObject;
    }

    #createItemCard(inputData, strongLevelables, itemId) {
        var html = '';

        html += '<div class="item">';
        html += '<div class="tag-outer">';
        html += '<div class="inner">';
        html += `<div class="item-id">${inputData.price}gp</div>`;
        html += `<div class="item-name">${inputData.description}</div>`;
        html += '<hr>';
        html += `<div class="item-desc">${inputData.rarity} ${inputData.magic}</div>`;
        html += `<div class="item-id">id: ${itemId}</div></div></div>`;
        html += '</div>'
        html += '</div>'
        html += '<div class="paper-outer">';
        html += '<div class="inner">';
        html += '<ul class="effects">';
        inputData.effects.forEach(entry => {
            const filledText = entry.GenerateText(strongLevelables);
            html += `<li class="effect">${filledText}</li>`
        });
        html += '</ul>';
        html += '</div>'
        html += '</div>'
        html += '</div>'

        return html;
    }

    #createList(inputData, strongLevelables) {
        var html = '';

        html += '<div class="effectList"><ul>';

        inputData.effects.forEach(entry => {
            const filledText = entry.GenerateText(strongLevelables);
            html += `<li class="effect">${filledText}</li>`
        });

        html += '</ul></div>';

        return html;
    }

    #insertHTML(id, html) {
        var el = document.getElementById(id);

        if (!el) {
            alert(`Element with id ${id} not found`);
        }

        el.innerHTML = el.innerHTML + html;
    }

    #createEventListeners() {
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

    #determineItemType(category) {
        var itemType;

        if (category != undefined) {
            Object.values(ItemTypes).forEach((val) => {
                if (val.abbr == category) {
                    itemType = val;
                }
            });
        } else {
            var itemTypeSelection = document.getElementById("itemTypeSelect");
            var selectedItemType = itemTypeSelection.value;

            if ("Any" != selectedItemType) {
                var index = Object.keys(ItemTypes).lastIndexOf(selectedItemType);
                if (index < Object.keys(ItemTypes).length) {
                    itemType = Object.values(ItemTypes)[index];
                }
            }
        }

        // if no specific type was selected, choose one at random
        if (itemType === undefined) {
            var index = Math.floor(Math.random() * 10000) % Object.keys(ItemTypes).length;
            itemType = Object.values(ItemTypes)[index];
        } else {
            // burn one roll to keep up with the seed state
            Math.random();
        }
        return itemType;
    }

    /**
     * Generates a new item either or recreates one based on specified itemId
     * ItemId has form of: [item category]-[item level]-[used seed]
     * Generation Criteria may have following patterns:
     *   * ANY - any category, no filtering
     *   * WEP - any weapon
     *   * ACC - any accessory`
     * @param itemId Id of item to recreates
     */
    #doGenerateItem (inputItemId) {
        if (typeof inputItemId === 'string' && inputItemId === '') {
            // todo write messgae to the user
            return;
        }

        let seed;
        let initialSeed;
        let category;
        let itemId;
        let newItemId = inputItemId;
        var selectedLevel;

        if (inputItemId != undefined) {
            category = inputItemId.split("-")[0];
            selectedLevel = parseInt(inputItemId.split("-")[1]);
            itemId = inputItemId.split("-")[2];

            // save seed of randomness
            initialSeed = Math.floor(Math.random() * 10000000000);
            // set current seed determined by item id
            if (typeof itemId === "string") {
                seed = parseInt(itemId)
            } else {
                seed = itemId;
            }
        } else {
            var raritySelection = document.getElementById("raritySelectionSelect");
            selectedLevel = parseInt(raritySelection.value);
            seed = Math.floor(Math.random() * 10000000000);
        }

        Math.seedrandom(seed);

        var itemType = this.#determineItemType(category);

        // clear previously generated item
        var el = document.getElementById('generated-item');
        el.innerHTML = "";

        if (inputItemId === undefined) {
            newItemId = itemType.abbr + "-" + selectedLevel + "-" + seed;
        }

        var result = this.#createItemCard(new Artifact(itemType, selectedLevel), false, newItemId);
        this.#insertHTML('generated-item', result);

        if (itemId != undefined) {
            // reset seed back to randomized to end determination
            Math.seedrandom(initialSeed);
        }
    }
}

window.onload = new ItemGenerator().run();
