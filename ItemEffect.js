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
    RandomCondition,
    DamageDice,
    DiceMinimum,
    RandomEnvironment,
    RandomDamageType,
    CantripOption,
    RandomCantrip,
    NumberIncrement, RandomClassResource, RandomLanguage, RandomAttackRollType, SkillPenalty, NumberPlus
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
    "RandomEnvironment": RandomEnvironment,
    "RandomDamageType": RandomDamageType,
    "CantripOption": CantripOption,
    "RandomCantrip": RandomCantrip,
    "NumberIncrement": NumberIncrement,
    "RandomClassResource": RandomClassResource,
    "RandomLanguage": RandomLanguage,
    "RandomAttackRollType": RandomAttackRollType,
    "SkillPenalty": SkillPenalty,
    "NumberPlus": NumberPlus,

}

class ItemEffect {
    text = ""
    components = []
    effectLevel = 0

    constructor(itemData) {
        this.text = itemData.text
        console.log(this.text);
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
                if (component.isProperty){
                    properties[component.propertyName] = '<strong class="randomelement">['+properties[component.propertyName]+']</strong>';
                } else {
                    properties[component.propertyName] = '<strong class="levelable">['+properties[component.propertyName]+']</strong>';
                }
            }
        })

        return new Function("return `" + this.text +"`;").call(properties);
    }

    LevelUp(){
        const levelables = this.components.filter(component=>component.CanLevelUp());
        if (levelables.length > 0) {
            const randomIndex = Math.floor(Math.random() * levelables.length);
            levelables[randomIndex].LevelUp();
            this.effectLevel++;
        } else {
            console.log("No levelable effects!")
        }
    }

    CanLevelUp(){
        let result = true;

        this.components.forEach(component=>{
            if (component.CanLevelUp() == false) {
                result = false;
            }
        })

        return result;
    }
}

export {ItemEffect}
