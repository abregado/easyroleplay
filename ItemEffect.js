import {
    ActionSpeedIncrease,
    AttackBonus,
    ArmorClassBonus,
    DamageTypes,
    SkillBonus,
    RandomSkillCheckType,
    SpellCountOfLevel,
    SpellLevel,
    TextNumber,
    TextUnits,
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
    NumberIncrement,
    RandomClassResource,
    RandomLanguage,
    RandomAttackRollType,
    SkillPenalty,
    NumberPlus,
    ListOfDamageTypes, SpendCharges
} from "./ItemComponent.js";

const componentClasses = {
    "AttackBonus": AttackBonus,
    "ArmorClassBonus": ArmorClassBonus,
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
    "ListOfDamageTypes": ListOfDamageTypes,
    "SpendCharges": SpendCharges,

}

class ItemEffect {
    text = ""
    components = []
    effectLevel = 0

    constructor(itemData) {
        this.text = itemData.text;
        if (itemData.components != null) {
            itemData.components.forEach(componentData => {
                const componentClass = componentClasses[componentData.formula];
                if (componentClass == null) {
                    console.error("No ComponentClass found with name: " + componentData.formula);
                }
                this.components.push(new componentClass(componentData.name, componentData.startValue))
            })
        }
    }

    GetComponentByFormula(formulaName){
        let result = null;
        this.components.forEach(component=>{
            if (component.formulaName == formulaName){
                // console.log("found formula component")
                result = component;
            }
        });
        return result;
    }

    RemoveComponentByFormula(formulaName){
        let result = -1;
        for (var i=0;i<this.components.length;i++){
            const component = this.components[i];
            if (component.formulaName == formulaName) {
                result = i;
                return;
            }
        }
        this.components.splice(result,1);
    }

    GenerateText(strongLevelables = false) {
        const properties = {}

        this.components.forEach(component => {
            properties[component.propertyName] = component.GenerateText();
            if (strongLevelables) {
                if (component.isRandom) {
                    properties[component.propertyName] = '<strong class="randomelement">[' + properties[component.propertyName] + ']</strong>';
                } else if (component.CanLevelUp()) {
                    properties[component.propertyName] = '<strong class="levelable">[' + properties[component.propertyName] + ']</strong>';
                }
            }
        })

        return new Function("return `" + this.text + "`;").call(properties);
    }

    LevelUp() {
        const levelables = this.components.filter(component => component.CanLevelUp());
        if (levelables.length > 0) {
            const randomIndex = Math.floor(Math.random() * levelables.length);
            levelables[randomIndex].LevelUp();
            this.effectLevel++;
        } else {
            console.log("No levelable effects!")
        }
    }

    CanLevelUp() {
        let result = true;

        this.components.forEach(component => {
            if (component.CanLevelUp() === false) {
                result = false;
            }
        })

        return result;
    }
}

export {ItemEffect}
