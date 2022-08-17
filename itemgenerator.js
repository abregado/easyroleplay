import {ItemEffect} from "./ItemEffect.js";
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
        const itemCount = 50;

        this.#insertHTML('generate-item', this.#createItemGenerationBox());
        this.#insertHTML('item-stock-section', this.#createItemStockSection());

        // for (let i=0;i<itemCount;i++){
        //     let seed = Math.floor(Math.random() * 10000000000);
        //     // make item property generation based on this seed
        //     Math.seedrandom(seed);
        //     var itemType = this.#determineItemType(null);
        //     var itemId = itemType.abbr + "-0-" + seed;
        //     this.#insertHTML('lowitems', this.#createItemCard(new Artifact(itemType,0), false, itemId));
        // }
        //
        // for (let i=0;i<itemCount;i++){
        //     let seed = Math.floor(Math.random() * 10000000000);
        //     // make item property generation based on this seed
        //     Math.seedrandom(seed);
        //     var itemType = this.#determineItemType(null);
        //     var itemId = itemType.abbr + "-2-" + seed;
        //     this.#insertHTML('highitems', this.#createItemCard(new Artifact(itemType,2), false, itemId));
        // }

        var allItems = this.#buildOneOfEachItemEffect(accessoryEffects)
        const html = this.#createList(allItems, true);
        this.#insertHTML('allEffects', html);

        this.#createEventListeners();
        this.#refreshStock();
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

        html += '<div class="item"><ul>';

        html += `<div class="desc">${inputData.rarity} ${inputData.description} (${inputData.size}/${inputData.magic}). ${inputData.price}gp, id: ${itemId}</div>`;

        inputData.effects.forEach(entry => {
            const filledText = entry.GenerateText(strongLevelables);
            html += `<li class="effect">${filledText}</li>`
        });

        html += '</ul></div>';

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

        var randomItemBtn = document.getElementById('refresh-stock-btn');
        randomItemBtn.addEventListener("click", () => {
            ItemGenerator.refreshItemStock();
        });

        var recreateItemTb = document.getElementById('recreate-item-tb');
        recreateItemTb.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                ItemGenerator.generateItem(event.target.value);
            }
        });
    }

    #determineItemType(category, typeSelectorId) {
        var itemType;

        if (category != undefined) {
            Object.values(ItemTypes).forEach((val) => {
                if (val.abbr == category) {
                    itemType = val;
                }
            });
        } else {
            var itemTypeSelection = document.getElementById(typeSelectorId);
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
     * Refresh stock of currently showed items
     */
    #refreshStock() {
        let seed = Math.floor(Math.random() * 10000000000);
        let initialSeed = seed;
        let newItemId;
        var initialSelectedLevel;
        var selectedLevel;
        var itemType;

        Math.seedrandom(seed);

        var raritySelection = document.getElementById("stockRaritySelectionSelect");
        initialSelectedLevel = parseInt(raritySelection.value);

        // clear previously generated stock
        var el = document.getElementById('item-stock');
        el.innerHTML = "";

        for (var i = 0; i < this.#stockSize; i++) {
            seed = Math.floor(Math.random() * 10000000000);
            Math.seedrandom(seed);

            itemType = this.#determineItemType(null, 'stockItemTypeSelect');
            selectedLevel = initialSelectedLevel;

            if (-1 == selectedLevel) {
                // for the moment, generate only 0 or 2
                let roll = Math.floor(Math.random() * 10);
                console.log(roll);
                selectedLevel = roll % 2 * 2;
            }

            newItemId = itemType.abbr + "-" + selectedLevel + "-" + seed;

            var result = this.#createItemCard(new Artifact(itemType, selectedLevel), false, newItemId);
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

        var itemType = this.#determineItemType(category, 'itemTypeSelect');

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

    #createItemGenerationBox() {
        var html = '';
        html += '<div class="generate-item-box">';
        html += '  <div class="side-by-side">';
        html += '    <div><input type="button" id="random-item-btn" value="Generate new item"></div>';
        html += '    <div>';
        html += '        <label for="item-id-text-box">Recreate item by its ID</label>';
        html += '         <input type="text" id="recreate-item-tb" name="item-id-text-box">';
        html += '    </div>';
        html += '  </div>';
        html += '  <div class="category-select">';
        html += '    <select id="raritySelectionSelect">';
        html += '      <option value="0">Uncommon</option>';
        html += '      <option value="2">Rare</option>';
        html += '    </select>';
        html += '    <select id="itemTypeSelect">';
        html += '      <option value="Any">Any Category</option>';
        html += '      <option value="Accessories">Accessories</option>';
        html += '      <option value="Weapons">Weapons</option>';
        html += '      <option value="Armors">Armors</option>';
        html += '    </select>';
        html += '  </div>';
        html += '<figure id="generated-item"></figure>';
        html += '</div>';
        return html;
    }

    #createItemStockSection() {
        var html = '';
        html += '<div class="side-by-side">';
        html += '  <div><input type="button" id="refresh-stock-btn" value="Refresh stock"></div>';
        html += '  <div class="category-select">';
        html += '    <select id="stockRaritySelectionSelect">';
        html += '      <option value="-1">Any Rarity</option>';
        html += '      <option value="0">Uncommon</option>';
        html += '      <option value="2">Rare</option>';
        html += '    </select>';
        html += '    <select id="stockItemTypeSelect">';
        html += '      <option value="Any">Any Category</option>';
        html += '      <option value="Accessories">Accessories</option>';
        html += '      <option value="Weapons">Weapons</option>';
        html += '      <option value="Armors">Armors</option>';
        html += '    </select>';
        html += '  </div>';
        html += '</div>';
        html += '<figure id="item-stock"></figure>';
        return html;
    }
}

window.onload = new ItemGenerator().run();