const skillOptions = ["Animal Handling","History","Insight","Sleight of Hand","Stealth","Acrobatics","Athletics","Survival","Arcana","Persuasion","Deception","Intimidation","Medicine","Nature","Investigation","Performance","Religion"];
const abilityScoreOptions = ["Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma"];
const creatureTypeOptions = ["Aberration","Fiend","Beast","Monstrosity","Dragon","Undead","Ooze","Elemental","Fey","Celestial","Construct","Giant","Plant"];
const conditionTypeLevels = [
    ["Prone", "Poisoned", "Deafened", "Grappled"],
    ["Restrained", "Frightened", "Blinded", "Charmed", "Stunned"],
    ["Paralyzed", "Petrified"],
]


function RandomSkill () {
    const selectedSkill = skillOptions[Math.floor(Math.random() * skillOptions.length)];
    return selectedSkill;
}

function RandomAbilityScore () {
    return abilityScoreOptions[Math.floor(Math.random() * abilityScoreOptions.length)];
}

function RandomCreature () {
    return creatureTypeOptions[Math.floor(Math.random() * creatureTypeOptions.length)];
}

function RandomConditionOfLevel (level) {
    return conditionTypeLevels[level][Math.floor(Math.random() * conditionTypeLevels[level].length)];
}

export class ItemComponent {
    componentLevel = 0;
    maxLevel = 10;
    propertyName = "";

    constructor(propertyName,startingValues){
        this.propertyName = propertyName;
    }

    LevelUp () {
        this.componentLevel ++;
    }

    CanLevelUp () {
        return this.componentLevel < this.maxLevel;
    }

    GenerateText(){
        if (Math.abs(this.componentLevel)>1 || this.componentLevel === 0){
            return `${this.componentLevel} units`;
        }
        return `${this.componentLevel} unit`;
    }
}

export class ActionSpeedIncrease extends ItemComponent {
    levels= [
        "Ritual",
        "Action",
        "Bonus Action",
        "Reaction",
        "Free Action",
    ]

    constructor(propertyName,startingValues) {
        super(propertyName,startingValues);
        this.componentLevel = startingValues;
        this.maxLevel = 3;
    }

    GenerateText() {
        const total = Math.min(this.componentLevel, this.maxLevel);
        return this.levels[total];
    }

}

export class TextUnits extends ItemComponent {
    unitName = ""

    constructor(propertyName,startingValues) {
        super(propertyName,startingValues);
        this.componentLevel = startingValues[0];
        this.unitName = startingValues[1]
        this.maxLevel = 3;
    }

    GenerateText(){
        if (Math.abs(this.componentLevel)>1 || this.componentLevel === 0){
            return `${this.componentLevel} ${this.unitName}s`;
        }
        return `${this.componentLevel} ${this.unitName}`;
    }
}

export class AttackBonus extends ItemComponent {
    constructor(propertyName,startingValues) {
        super(propertyName,startingValues);
        this.componentLevel = startingValues
        this.maxLevel = 3;
    }

    static GenerateText(){
        return this.componenetLevel.toString();
    }
}

export class SpellCountOfLevel extends ItemComponent {
    spellLevelItem;

    constructor(propertyName,startingValues) {
        super(propertyName,startingValues);
        this.componentLevel = startingValues[0];
        this.spellLevelItem = new SpellLevel("SpellCountLevel",startingValues[1]);
        this.maxLevel = 4;
    }

    LevelUp() {
        if ((Math.random() > 0.5 && this.spellLevelItem.CanLevelUp()) || super.CanLevelUp() == false){
            this.spellLevelItem.LevelUp();
        }
        this.componentLevel ++;
    }

    CanLevelUp() {
        return super.CanLevelUp() || this.spellLevelItem.CanLevelUp();
    }

    GenerateText() {
        const levelText = this.spellLevelItem.GenerateText();

        if (Math.abs(this.componentLevel) > 1 || this.componentLevel === 0){
            return `${this.componentLevel} ${levelText}s`
        }
        return `a ${levelText}`
    }
}

export class SpellLevel extends ItemComponent {
    levels= [
        "cantrip",
        "level one spell",
        "level three spell",
        "level five spell",
        "level eight spell",
    ]

    constructor(propertyName,startingValues) {
        super(propertyName,startingValues);
        this.componentLevel = startingValues;
        this.maxLevel = 4;
    }

    GenerateText(){
        return this.levels[this.componentLevel];
    }
}

export class TextNumber extends ItemComponent {
    texts = [
        'zero',
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
        'ten'
    ]

    constructor(propertyName,startingValues) {
        super(propertyName,startingValues);
        this.componentLevel = startingValues;
        this.maxLevel = 10;
    }

    GenerateText() {
        return this.texts[this.componentLevel].toString();
    }

}

export class DamageTypes extends ItemComponent {
    damageLevels = [
        ['fire, cold, poison'],
        ['lightning, acid'],
        ['radiant, necrotic'],
        ['psychic, force']
    ];

    constructor(propertyName,startingValues) {
        super(propertyName,startingValues);
        this.componentLevel = startingValues;
        this.maxLevel = 3;
    }

    GenerateText(){
        var includedTypes = []

        for(var i=0;i<this.componentLevel;i++){
            const typesInLevel = this.damageLevels[i];
            typesInLevel.forEach(damage=>{
                includedTypes.push(damage)
            })
        }

        return includedTypes.join(', ').replace(/, ([^,]*)$/, ' and $1');
    }
}

export class SkillBonus extends ItemComponent {
    levels= [
        "may reroll 1's on",
        "add +1d4 to the total of",
        "gain advantage on",
    ]

    constructor(propertyName,startingValues) {
        super(propertyName,startingValues);
        this.componentLevel = startingValues;
        this.maxLevel = 2;
    }

    GenerateText() {
        return this.levels[this.componentLevel].toString();
    }
}

export class PartySkillBonus extends ItemComponent {
    levels= [
        "may reroll 1's on",
        "adds +1d4 to the total of",
        "gains advantage on",
    ]

    constructor(propertyName,startingValues) {
        super(propertyName,startingValues);
        this.componentLevel = startingValues;
        this.maxLevel = 2;
    }

    GenerateText() {
        return this.levels[this.componentLevel].toString();
    }
}

export class RandomSkillCheckType extends ItemComponent {
    skillName;

    constructor(propertyName,startingValues) {
        super(propertyName,startingValues);
        this.skillName = RandomSkill();
        this.componentLevel = 0;
        this.maxLevel = 0;
    }

    GenerateText() {
        return this.skillName.toString();
    }
}

export class RandomAbilityScoreType extends ItemComponent {
    abilityType;

    constructor(propertyName,startingValues) {
        super(propertyName,startingValues);
        this.abilityType = RandomAbilityScore();
        this.componentLevel = 0;
        this.maxLevel = 0;
    }

    GenerateText() {
        return this.abilityType.toString();
    }
}

export class RandomCreatureType extends ItemComponent {
    creatureType;

    constructor(propertyName,startingValues) {
        super(propertyName,startingValues);
        this.creatureType = RandomCreature();
        this.componentLevel = 0;
        this.maxLevel = 0;
    }

    GenerateText() {
        return this.creatureType.toString();
    }
}

export class RandomCondition extends ItemComponent {
    conditionType;

    constructor(propertyName,startingValues) {
        super(propertyName,startingValues);
        this.conditionType = RandomConditionOfLevel(startingValues);
        this.componentLevel = 0;
        this.maxLevel = 0;
    }

    GenerateText() {
        return this.conditionType.toString();
    }
}

export class UsesPerDay extends ItemComponent {
    levels = [
        "Once per day",
        "Twice per day",
        "Three times per day",
        "Four times per day",
        "Five times per day",
    ]

    constructor(propertyName,startingValues) {
        super(propertyName,startingValues);
        this.componentLevel = startingValues;
        this.maxLevel = 4;
    }

    GenerateText() {
        return this.levels[this.componentLevel].toString();
    }
}

export class FeetIncrement extends ItemComponent {
    incrementSize = 1;

    constructor(propertyName,startingValues) {
        super(propertyName,startingValues);
        this.componentLevel = startingValues[0];
        this.incrementSize = startingValues[1];
        this.maxLevel = 10;
    }

    GenerateText() {
        return `${(this.componentLevel+1)*this.incrementSize}ft`;
    }
}

export class DamageDice extends ItemComponent {
    levels = [
        "1",
        "d4",
        "d6",
        "d8",
        "d10",
        "d12",
        "2d6",
        "2d8",
        "3d6",
        "2d10",
    ]

    constructor(propertyName,startingValues) {
        super(propertyName,startingValues);
        this.componentLevel = startingValues;
        this.maxLevel = 4;
    }

    GenerateText() {
        return this.levels[this.componentLevel].toString();
    }
}

export class DiceMinimum extends ItemComponent {
    levels = [
        "1's",
        "results of 1 and 2",
        "results lower than 4",
        "results lower than 5",
    ]

    constructor(propertyName,startingValues) {
        super(propertyName,startingValues);
        this.componentLevel = startingValues;
        this.maxLevel = 4;
    }

    GenerateText() {
        return this.levels[this.componentLevel].toString();
    }
}
