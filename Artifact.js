import {ItemEffect} from "./ItemEffect.js";
import {SpendCharges} from "./ItemComponent.js";

const accessorySubtypes = [
    {size: "Tiny", price: [100,250], options: ["Ring", "Earring", "Brooch", "Amulet", "Bracelet", "Clasp", "Necklace", "Chain", "Pendant",  "Choker", "Torc", "Armlet", "Anklet", "Pin", "Locket", "Emblem", "Medallion"] },
    {size: "Tiny", price: [80,200], options: ["Quill", "Die", "Chalice", "Parchment", "Mechanical Object", "Horn", "Shell", "Lode", "Orb", "Crystal", "Form", "Band"] },
    {size: "Small", price: [50,150], options: ["Gloves", "Cap", "Bracer", "Helm", "Gauntlet", "Greaves", "Boots", "Belt", "Pauldron", "Cape", "Cloak", "Sash"] }
]

const weaponSubtypes = [
    {size: "Small", price: [80,200], options: ["Dagger", "Handaxe", "Shortsword", "Mace", "Shortbow"]},
    {size: "Medium", price: [120,300], options: ["Longsword", "Warhammer", "Rapier", "Hammer", "Spear", "Quarterstaff"]},
    {size: "Large", price: [160,400], options: ["Halberd", "Greataxe", "Greatsword", "Maul", "Longbow", "Heavy Crossbow", "Hand Crossbow"]}
    // TODO redesign categorisation of weapons
]

/**
 * Enumeration of item types
 */
const ItemTypes = {
    Accessories: {data: accessoryEffects, subTypes: accessorySubtypes, abbr: "ACC"},
    Weapons: {data: weaponEffects, subTypes: weaponSubtypes, abbr: "WEP"}
    // TODO add armors
}

const levelPrice = [
    {rarity:"Uncommon",cost:200},
    {rarity:"Rare",cost:1000},
    {rarity:"Rare",cost:2000},
    {rarity:"Rare",cost:3000},
    {rarity:"Very Rare",cost:10000},
    {rarity:"Very Rare",cost:20000},
]

const magicSchool = [
    "Abjuration ",
    "Conjuration ",
    "Divination ",
    "Enchantment ",
    "Evocation ",
    "Illusion ",
    "Necromancy ",
    "Transmutation ",
]

const chargeItemData = {
    text: "The item has 4 charges. All charges recharge during a long rest."
}


function RandomFromList(list) {
    return list[Math.floor(Math.random() * list.length)];
}

class Artifact {
    effects = [];
    unselectedEffectData = [];
    description = "";
    size = "";
    rarity = "";
    magic = "";
    price = 0;

    constructor(itemTypes, level) {
        if (itemTypes === undefined || level === undefined) {
            // todo add message for the user
            console.log("Insufficient parameters passed to the artifact constructor");
            return;
        }

        var effectDataList = itemTypes.data;
        var categoryList = itemTypes.subTypes;
        this.unselectedEffectData = Array.from(effectDataList);

        const randomCategory = RandomFromList(categoryList);
        const levelProperties = levelPrice[Math.min(level,5)]
        this.magic = RandomFromList(magicSchool);
        this.description = RandomFromList(randomCategory.options);
        this.size = randomCategory.size;
        this.rarity = levelProperties.rarity;
        this.price = levelProperties.cost + randomCategory.price[0]
            + (Math.ceil(Math.random()* (randomCategory.price[1] - randomCategory.price[0]) / 10) * 10) ;

        this.AddEffect()

        for (let i = 1; i < level; i++) {
            this.AddLevel()
        }

        this.ChangeToCharges()
    }

    ChangeToCharges() {

        let chargeBasedEffects = [];
        this.effects.forEach(effect=>{
            let component = effect.GetComponentByFormula("UsesPerDay");
            if ( component != null){
                chargeBasedEffects.push(effect)
            }
        })

        if (chargeBasedEffects.length>1){
            console.log("changing to charges");
            chargeBasedEffects.forEach(effect=>{
                let component = effect.GetComponentByFormula("UsesPerDay");
                effect.components.push(new SpendCharges(component.propertyName,5-component.componentLevel));
                effect.RemoveComponentByFormula("UsesPerDay");
            })

            this.effects.push(new ItemEffect(chargeItemData));
        }
    }

    AddEffect() {
        const randomIndex = Math.floor(Math.random() * this.unselectedEffectData.length);
        this.effects.push(new ItemEffect(this.unselectedEffectData[randomIndex]));
        this.unselectedEffectData.splice(randomIndex, 1);
    }

    AddLevel() {
        const randRoll = Math.random() * 2;
        if (randRoll > this.effects.length) {
            this.AddEffect()
        } else {
            this.LevelUpAllEffects()
        }
    }

    LevelUpAllEffects() {
        let extraLevels = 0

        this.effects.forEach(effect => {
            if (effect.CanLevelUp()) {
                effect.LevelUp()
            } else {
                extraLevels++;
            }
        })

        for (let i = 0; i < extraLevels; i++) {
            const levellables = this.effects.filter(effect => effect.CanLevelUp())
            if (levellables.length > 0) {
                levellables[Math.floor(Math.random() * levellables.length)].LevelUp();
            }
        }
    }
}

export {Artifact}
export {ItemTypes}
