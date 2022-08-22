import {ItemEffect} from "./ItemEffect.js";
import {SpendCharges} from "./ItemComponent.js";

const accessorySubtypes = [
    {size: "Tiny", price: [100,250], options: ["Ring", "Earring", "Brooch", "Amulet", "Bracelet", "Clasp", "Necklace", "Chain", "Pendant",  "Choker", "Torc", "Armlet", "Anklet", "Pin", "Locket", "Emblem", "Medallion"] },
    {size: "Tiny", price: [80,200], options: ["Quill", "Die", "Chalice", "Parchment", "Mechanical Object", "Horn", "Shell", "Lode", "Orb", "Crystal", "Form", "Band"] },
    {size: "Small", price: [50,150], options: ["Gloves", "Cap", "Bracer", "Helm", "Gauntlet", "Greaves", "Boots", "Belt", "Pauldron", "Cape", "Cloak", "Sash"] }
]

const weaponSubtypes = [
    {size: "Small", price: [80,200], options: ["Dagger", "Handaxe", "Shortsword", "Mace"]},
    {size: "Medium", price: [120,300], options: ["Longsword", "Warhammer", "Rapier", "Hammer", "Spear", "Quarterstaff"]},
    {size: "Large", price: [160,400], options: ["Halberd", "Greataxe", "Greatsword", "Maul"]}
    // TODO redesign categorisation of weapons
    // TODO add ranged weapons back in with their own effects
]

const armorSubtypes = [
    {size: "Light", price: [80,200], options: ["Padded", "Leather", "Studded leather"]},
    {size: "Medium", price: [120,300], options: ["Hide", "Chain shirt", "Scale mail", "Breastplate", "Half plate"]},
    {size: "Heavy", price: [160,400], options: ["Ring mail", "Chain mail", "Splint", "Plate"]}
    // TODO redesign categorisation of armors
]

/**
 * Enumeration of item types
 */
const ItemTypes = {
    Accessories: {data: accessoryEffects, subTypes: accessorySubtypes, abbr: "ACC"},
    Weapons: {data: weaponEffects, subTypes: weaponSubtypes, abbr: "WEP"},
    Armors: {data: armorEffects, subTypes: armorSubtypes, abbr: "ARM"}
}

const levelOptions = [
    {
        name: "Weak",
        cost: 200,
        options: [
            {
                effects: 1,
                extralevels: 0
            }
        ]
    },
    {
        name: "Strong",
        cost: 1000,
        options: [
            {
                effects: 1,
                extralevels: 1
            },
        ]
    },
    {
        name: "Incredible",
        cost: 10000,
        options: [
            {
                effects: 1,
                extralevels: 2
            },
        ]
    },
    {
        name: "Spectacular",
        cost: 50000,
        options: [
            {
                effects: 2,
                extralevels: 3
            },
            {
                effects: 2,
                extralevels: 3
            },
        ]
    },
]

const magicSchool = [
    "Abjuration",
    "Conjuration",
    "Divination",
    "Enchantment",
    "Evocation",
    "Illusion",
    "Necromancy",
    "Transmutation",
]

const chargeItemData = {
    text: "The item has ${this.TextUnits}. All charges recharge during a long rest.",
    components: [
        {name: "TextUnits", formula: "TextUnits", startLevel: 4, increasePerLevel: 1, unitName: "charge"}
    ]
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

        const levelData = levelOptions[Math.min(level,3)];
        const randomSubOption = RandomFromList(levelData.options);

        var effectDataList = itemTypes.data;
        var categoryList = itemTypes.subTypes;
        this.unselectedEffectData = Array.from(effectDataList);

        const randomCategory = RandomFromList(categoryList);

        this.magic = RandomFromList(magicSchool);
        this.description = RandomFromList(randomCategory.options);
        this.rarity = levelData.name;
        this.price = levelData.cost + randomCategory.price[0]
            + (Math.ceil(Math.random()* (randomCategory.price[1] - randomCategory.price[0]) / 10) * 10) ;

        for (let i = 0; i < randomSubOption.effects; i++){
            this.AddEffect();
        }

        for (let i = 0; i < randomSubOption.extralevels; i++){
            this.LevelUpOneEffect();
        }

        this.ChangeToCharges();
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

                let spendChargesProto = {
                    text: "",
                    startLevel: 5-component.componentLevel,
                };

                effect.components.push(new SpendCharges(component.propertyName,spendChargesProto));
                effect.RemoveComponentByFormula("UsesPerDay");
            })

            let ChargeItemEffect = new ItemEffect(chargeItemData);
            ChargeItemEffect.components[0].componentLevel = 4 + chargeBasedEffects.length;
            this.effects.push(ChargeItemEffect);
        }
    }

    AddEffect() {
        const randomIndex = Math.floor(Math.random() * this.unselectedEffectData.length);
        this.effects.push(new ItemEffect(this.unselectedEffectData[randomIndex]));
        this.unselectedEffectData.splice(randomIndex, 1);
    }

    LevelUpOneEffect(){
        const levellables = this.effects.filter(effect => effect.CanLevelUp())

        if (levellables.length > 0) {
            levellables[Math.floor(Math.random() * levellables.length)].LevelUp();
        } else {
            this.AddEffect()
        }
    }
}

export {Artifact}
export {ItemTypes}
