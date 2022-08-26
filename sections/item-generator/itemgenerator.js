import {Artifact} from "./Artifact.js";
import {ItemTypes} from "./Artifact.js";

/**
 * Handles generation of items
 */
export class ItemGenerator {

    #stockSize = 5;

    /**
     * Generate a new item in the generate item box
     * @param itemId Id of an existing item in case we want to recreate an item
     */
    static generateItem(itemId) {
        let generator = new ItemGenerator();
        generator.#doGenerateItem(itemId);
    }

    /**
     * Refresh items in stock
     */
    static refreshItemStock() {
        let generator = new ItemGenerator();
        generator.#refreshStock();
    }

    /**
     * Method called to build the initial page content
     */
    run() {
        this.#createEventListeners();
        this.#refreshStock();
    }

    #insertHTML(id, html) {
        let el = document.getElementById(id);

        if (!el) {
            alert(`Element with id ${id} not found`);
        }

        el.innerHTML = el.innerHTML + html;
    }

    #createEventListeners() {
        let randomItemBtn = document.getElementById('random-item-btn');
        randomItemBtn.addEventListener("click", () => {
            ItemGenerator.generateItem();
        });

        randomItemBtn = document.getElementById('refresh-stock-btn');
        randomItemBtn.addEventListener("click", () => {
            ItemGenerator.refreshItemStock();
        });

        let recreateItemTb = document.getElementById('recreate-item-tb');
        recreateItemTb.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                ItemGenerator.generateItem(event.target.value);
            }
        });
    }

    #determineItemType(category, typeSelectorId) {
        let itemType;

        if (category != undefined) {
            Object.values(ItemTypes).forEach((val) => {
                if (val.abbr == category) {
                    itemType = val;
                }
            });
        } else {
            let itemTypeSelection = document.getElementById(typeSelectorId);
            let selectedItemType = itemTypeSelection.value;

            if ("Any" != selectedItemType) {
                let index = Object.keys(ItemTypes).lastIndexOf(selectedItemType);
                if (index < Object.keys(ItemTypes).length) {
                    itemType = Object.values(ItemTypes)[index];
                }
            }
        }

        // if no specific type was selected, choose one at random
        if (itemType === undefined) {
            let index = Math.floor(Math.random() * 10000) % Object.keys(ItemTypes).length;
            itemType = Object.values(ItemTypes)[index];
        } else {
            // burn one roll to keep up with the seed state
            Math.random();
        }
        return itemType;
    }

    /**
     * Refresh stock of currently showed items
     */
    #refreshStock() {
        let seed = Math.floor(Math.random() * 10000000000);
        let initialSeed = seed;
        let newItemId;
        let initialSelectedLevel;
        let selectedLevel;
        let itemType;

        Math.seedrandom(seed);

        let raritySelection = document.getElementById("stockRaritySelectionSelect");
        initialSelectedLevel = parseInt(raritySelection.value);

        // clear previously generated stock
        let el = document.getElementById('item-stock');
        el.innerHTML = "";

        for (let i = 0; i < this.#stockSize; i++) {
            selectedLevel = initialSelectedLevel;

            if (-1 == selectedLevel) {
                // for the moment, generate only 0 or 2
                let roll = Math.floor(Math.random() * 3);
                selectedLevel = roll;
            }

            seed = Math.floor(Math.random() * 10000000000);
            Math.seedrandom(seed);

            itemType = this.#determineItemType(null, 'stockItemTypeSelect');
            newItemId = itemType.abbr + "-" + selectedLevel + "-" + seed;

            let result = this.#createItemCard(new Artifact(itemType, selectedLevel), false, newItemId);
            this.#insertHTML('item-stock', result);
        }

        Math.seedrandom(initialSeed);
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
            // todo write message to the user
            return;
        }

        let seed;
        let initialSeed;
        let category;
        let itemId;
        let newItemId = inputItemId;
        let selectedLevel;

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
            let raritySelection = document.getElementById("raritySelectionSelect");
            selectedLevel = parseInt(raritySelection.value);
            seed = Math.floor(Math.random() * 10000000000);
        }

        Math.seedrandom(seed);
        console.log("used seed: " + seed);

        let itemType = this.#determineItemType(category, 'itemTypeSelect');

        // clear previously generated item
        let el = document.getElementById('generated-item');
        el.innerHTML = "";

        if (inputItemId === undefined) {
            newItemId = itemType.abbr + "-" + selectedLevel + "-" + seed;
        }

        let result = this.#createItemCard(new Artifact(itemType, selectedLevel), false, newItemId);
        this.#insertHTML('generated-item', result);

        if (itemId != undefined) {
            // reset seed back to randomized to end determination
            Math.seedrandom(initialSeed);
        }
    }

    #createItemCard(inputData, strongLevelables, itemId) {
        let html = '';

        html += '<div class="item-outer">';

        html += '<div class="item">';
        html += '<div class="tag-outer">';
        html += '<div class="inner fantasy">';
        html += `<div class="item-price">${inputData.price}gp</div>`;
        html += `<div class="item-name">${inputData.description}</div>`;
        html += '<hr>';
        html += `<div class="item-desc">${inputData.rarity} ${inputData.magic}</div>`;
        html += `<div class="item-id">id: ${itemId}</div>`;
        html += '</div>';
        html += '</div>';
        html += '<div class="paper-outer">';
        html += '<div class="inner">';
        html += '<ul class="effects">';
        inputData.effects.forEach(entry => {
            const filledText = entry.GenerateText(strongLevelables);
            html += `<li class="effect">${filledText}</li>`
        });
        html += '</ul>';

        html += '</div>';
        html += '</div>'
        html += '<div class="bottom-overlap"><input class="add-to-basket-btn button-28" type="button" onclick="addItemToBasket(this)" value="Add to basket"></input>'
        html += '</div>'

        html += '</div>'

        return html;
    }
}

window.onload = new ItemGenerator().run();
