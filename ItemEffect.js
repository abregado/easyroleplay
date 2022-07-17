import {
    ActionSpeedIncrease,
    AttackBonus,
    DamageTypes,
    SkillBonus,
    RandomSkillCheckType,
    SpellCountOfLevel,
    SpellLevel,
    TextNumber,
    TextUnits,
    ItemComponent,
    RandomAbilityScoreType,
    UsesPerDay,
    PartySkillBonus,
    RandomCreatureType,
    FeetIncrement,
    RandomCondition, DamageDice, DiceMinimum
} from "./ItemComponent.js";

const componentClasses = {
    "AttackBonus": AttackBonus,
    "SpellCountOfLevel": SpellCountOfLevel,
    "DamageTypes": DamageTypes,
    "TextUnits": TextUnits,
    "TextNumber": TextNumber,
    "SkillBonus": SkillBonus,
    "RandomSkillCheckType": RandomSkillCheckType,
    "SpellLevel": SpellLevel,
    "ActionSpeedIncrease": ActionSpeedIncrease,
    "RandomAbilityScoreType": RandomAbilityScoreType,
    "UsesPerDay": UsesPerDay,
    "PartySkillBonus": PartySkillBonus,
    "RandomCreatureType": RandomCreatureType,
    "FeetIncrement": FeetIncrement,
    "RandomCondition": RandomCondition,
    "DamageDice": DamageDice,
    "DiceMinimum": DiceMinimum,
}

class ItemEffect {
    text = ""
    components = []
    effectLevel = 0

    constructor(itemData) {
        this.text = itemData.text
        if (itemData.components != null){
            itemData.components.forEach(componentData=>{
                const componentClass = componentClasses[componentData.formula];
                if (componentClass == null){
                    console.error("No ComponentClass found with name: " + componentData.formula);
                }
                this.components.push(new componentClass(componentData.name,componentData.startValue))
            })
        }
    }

    GenerateText(strongLevelables = false) {
        const properties = {}

        this.components.forEach(component=>{
            properties[component.propertyName] = component.GenerateText();
            if (strongLevelables){
                if (component.CanLevelUp()){
                    properties[component.propertyName] = '<strong class="levelable">['+properties[component.propertyName]+']</strong>'
                } else {
                    properties[component.propertyName] = '<strong class="randomelement">['+properties[component.propertyName]+']</strong>'
                }
            }
        })

        console.log(properties)
        return new Function("return `" + this.text +"`;").call(properties);
    }
}

export {ItemEffect}
