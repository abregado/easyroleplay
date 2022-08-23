const skillOptions = ["Animal Handling", "History", "Insight", "Sleight of Hand", "Stealth", "Acrobatics", "Athletics", "Survival", "Arcana", "Persuasion", "Deception", "Intimidation", "Medicine", "Nature", "Investigation", "Performance", "Religion"];
const abilityScoreOptions = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
const creatureTypeOptions = ["Aberration", "Fiend", "Beast", "Monstrosity", "Dragon", "Undead", "Ooze", "Elemental", "Fey", "Celestial", "Construct", "Giant", "Plant"];
const conditionTypeLevels = [
    ["Prone", "Poisoned", "Deafened", "Grappled"],
    ["Restrained", "Frightened", "Blinded", "Charmed", "Stunned"],
    ["Paralyzed", "Petrified"],
]
const damageTypeOptions = [
    ['fire', 'cold', 'poison', 'lightning', 'acid', 'thunder'],
    ['radiant', 'necrotic'],
    ['psychic', 'force']
];
const environmentTypeOptions = ["Arctic", "Coast", "Desert", "Forest", "Grassland", "Mountain", "Swamp", "Underdark", "Urban"];
const cantripOptions = [
    "Acid Splash",
    "Blade Ward",
    "Booming Blade",
    "Chill Touch",
    "Control Flames",
    "Create Bonfire",
    "Dancing Lights",
    "Decompose",
    "Encode Thoughts",
    "Fire Bolt",
    "Friends",
    "Frostbite",
    "Green-Flame Blade",
    "Guidance",
    "Gust",
    "Infestation",
    "Light",
    "Lightning Lure",
    "Mage Hand",
    "Magic Stone",
    "Mending",
    "Message",
    "Mind Sliver",
    "Minor Illusion",
    "Mold Earth",
    "Poison Spray",
    "Prestidigitation",
    "Primal Savagery",
    "Produce Flame",
    "Ray of Frost",
    "Resistance",
    "Sacred Flame",
    "Sapping Sting",
    "Shape Water",
    "Shocking Grasp",
    "Spare the Dying",
    "Sword Burst",
    "Thaumaturgy",
    "Thorn Whip",
    "Thunderclap",
    "True Strike",
];
const classResourceOptions = ["Channel Divinity", "Bardic Inspiration", "Wildshape"]
const languageOptions = [
    ["Dwarvish", "Elvish", "Giant", "Gnomish", "Goblin", "Halfling", "Orc", "Undercommon"],
    ["Abyssal", "Celestial", "Draconic", "Deep Speech", "Infernal", "Primordial", "Sylvan"]
]
const attackRollType = [
    'ranged spell',
    'melee spell',
    'ranged weapon',
    'melee weapon'
]


function RandomFromList(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function RandomFromLevelOfList(list, level) {
    return list[level][Math.floor(Math.random() * list[level].length)];
}

function RandomListFromList(list, entries) {
    let result = [];
    const listCopy = Array.from(list);

    for (let i = 0; i < entries; i++) {
        const randomIndex = Math.floor(Math.random() * listCopy.length);
        result.push(listCopy.splice(randomIndex, 1));
    }

    return result;
}

export class ItemComponent {
    formulaName = "ItemComponent";
    isProperty = false;
    componentLevel = 0;
    maxLevel = 10;
    propertyName = "";
    prototypeData = {};

    constructor(propertyName, prototypeData) {
        this.propertyName = propertyName;
        this.prototypeData = prototypeData;
    }

    LevelUp() {
        this.componentLevel += this.prototypeData.increasePerLevel;
        this.componentLevel = Math.min(this.componentLevel,this.maxLevel);

        Math.random(); // burn one iteration
    }

    CanLevelUp() {
        return this.prototypeData.increasePerLevel != null && (this.componentLevel < this.maxLevel);
    }

    GenerateText() {
        if (Math.abs(this.componentLevel) > 1 || this.componentLevel === 0) {
            return `${this.componentLevel} units`;
        }
        return `${this.componentLevel} unit`;
    }
}

export class ActionSpeedIncrease extends ItemComponent {
    levels = [
        "Ritual",
        "Action",
        "Bonus Action",
        "Reaction",
        "Free Action",
    ]

    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.componentLevel = prototypeData.startLevel;
        this.formulaName = "ActionSpeedIncrease";
        this.maxLevel = 3;
    }

    GenerateText() {
        const total = Math.min(this.componentLevel, this.maxLevel);
        return this.levels[total];
    }

}

export class TextUnits extends ItemComponent {
    unitName = ""

    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.componentLevel = prototypeData.startLevel;
        this.unitName = prototypeData.unitName;
        this.formulaName = "TextUnits";
        this.maxLevel = 10;
    }

    GenerateText() {
        if (Math.abs(this.componentLevel) > 1 || this.componentLevel === 0) {
            return `${this.componentLevel} ${this.unitName}s`;
        }
        return `${this.componentLevel} ${this.unitName}`;
    }
}

export class AttackBonus extends ItemComponent {
    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.componentLevel = prototypeData.startLevel;
        this.maxLevel = 10;
        this.formulaName = "AttackBonus";
    }

    GenerateText() {
        return this.componentLevel.toString();
    }
}

export class ArmorClassBonus extends ItemComponent {
    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.componentLevel = prototypeData.startLevel;
        this.maxLevel = 3;
        this.formulaName = "ArmorClassBonus";
    }

    GenerateText() {
        return this.componentLevel.toString();
    }
}



export class SpellLevel extends ItemComponent {
    levels = [
        "level one spell",
        "level three spell",
        "level five spell",
        "level eight spell",
    ]

    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.componentLevel = prototypeData.startLevel;
        this.maxLevel = 4;
        this.formulaName = "SpellLevel";
    }

    GenerateText() {
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

    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.componentLevel = prototypeData.startLevel;
        this.maxLevel = 10;
        this.formulaName = "TextNumber";
    }

    GenerateText() {
        return this.texts[this.componentLevel].toString();
    }

}

export class DamageTypes extends ItemComponent {
    damageLevels = [
        ['fire, cold, poison, lightning, acid, thunder'],
        ['radiant, necrotic'],
        ['psychic, force']
    ];

    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.componentLevel = prototypeData.startLevel;
        this.maxLevel = 2;
        this.formulaName = "DamageTypes";
    }

    GenerateText() {
        var includedTypes = []

        for (var i = 0; i <= this.componentLevel; i++) {
            const typesInLevel = this.damageLevels[i];
            typesInLevel.forEach(damage => {
                includedTypes.push(damage)
            })
        }

        return includedTypes.join(', ').replace(/, ([^,]*)$/, ' and $1');
    }
}

export class SkillBonus extends ItemComponent {
    levels = [
        "may reroll 1's on",
        "add +1d4 to the total of",
        "gain advantage on",
    ]

    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.componentLevel = prototypeData.startLevel;
        this.maxLevel = 2;
        this.formulaName = "SkillBonus";
    }

    GenerateText() {
        return this.levels[this.componentLevel].toString();
    }
}

export class PartySkillBonus extends ItemComponent {
    levels = [
        "may reroll 1's on",
        "adds +1d4 to the total of",
        "gains advantage on",
    ]

    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.componentLevel = prototypeData.startLevel;
        this.maxLevel = 2;
        this.formulaName = "PartySkillBonus";
    }

    GenerateText() {
        return this.levels[this.componentLevel].toString();
    }
}

export class RandomSkillCheckType extends ItemComponent {
    skillName;

    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.skillName = RandomFromList(skillOptions);
        this.componentLevel = 0;
        this.maxLevel = 0;
        this.isProperty = true;
        this.formulaName = "RandomSkillCheckType";
    }

    GenerateText() {
        return this.skillName.toString();
    }
}

export class RandomAbilityScoreType extends ItemComponent {
    abilityType;

    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.abilityType = RandomFromList(abilityScoreOptions);
        this.componentLevel = 0;
        this.maxLevel = 0;
        this.isProperty = true;
        this.formulaName = "RandomAbilityScoreType";
    }

    GenerateText() {
        return this.abilityType.toString();
    }
}

export class RandomCreatureType extends ItemComponent {
    creatureType;

    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.creatureType = RandomFromList(creatureTypeOptions);
        this.componentLevel = 0;
        this.maxLevel = 0;
        this.isProperty = true;
        this.formulaName = "RandomCreatureType";
    }

    GenerateText() {
        return this.creatureType.toString();
    }
}

export class RandomCondition extends ItemComponent {
    conditionType;

    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.conditionType = RandomFromLevelOfList(conditionTypeLevels, prototypeData.startLevel);
        this.componentLevel = 0;
        this.maxLevel = 0;
        this.isProperty = true;
        this.formulaName = "RandomCondition";
    }

    GenerateText() {
        return this.conditionType.toString();
    }
}

export class RandomEnvironment extends ItemComponent {
    environmentType;

    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.environmentType = RandomFromList(environmentTypeOptions);
        this.componentLevel = 0;
        this.maxLevel = 0;
        this.isProperty = true;
        this.formulaName = "RandomEnvironment";
    }

    GenerateText() {
        return this.environmentType.toString();
    }
}

export class RandomDamageType extends ItemComponent {
    damageType;

    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.damageType = RandomFromLevelOfList(damageTypeOptions, prototypeData.startLevel);
        this.componentLevel = 0;
        this.maxLevel = 0;
        this.isProperty = true;
        this.formulaName = "RandomDamageType";
    }

    GenerateText() {
        return this.damageType.toString();
    }
}

export class UsesPerDay extends ItemComponent {
    levels = [
        "Once per day",
        "Twice per day",
        "Three times per day",
        "Four times per day",
    ]

    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.componentLevel = prototypeData.startLevel;
        this.maxLevel = 3;
        this.formulaName = "UsesPerDay";
        this.isProperty = true;
    }

    GenerateText() {
        return this.levels[Math.min(this.componentLevel,this.maxLevel)].toString();
    }
}

export class FeetIncrement extends ItemComponent {
    incrementSize = 1;

    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.componentLevel = prototypeData.startLevel;
        this.incrementSize = prototypeData.incrementSize;
        this.maxLevel = 10;
        this.formulaName = "FeetIncrement";
    }

    GenerateText() {
        return `${(this.componentLevel + 1) * this.incrementSize}ft`;
    }
}

export class NumberIncrement extends ItemComponent {
    incrementSize = 1;

    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.componentLevel = prototypeData.startLevel;
        this.incrementSize = prototypeData.incrementSize;
        this.maxLevel = 10;
        this.formulaName = "NumberIncrement";
    }

    GenerateText() {
        return `${(this.componentLevel + 1) * this.incrementSize}`;
    }
}

export class DamageDice extends ItemComponent {
    levels = [
        "d4",
        "d6",
        "d8",
        "d10",
        "d12",
    ]

    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.componentLevel = prototypeData.startLevel;
        this.maxLevel = 4;
        this.formulaName = "DamageDice";
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

    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.componentLevel = prototypeData.startLevel;
        this.maxLevel = 3;
        this.formulaName = "DiceMinimum";
    }

    GenerateText() {
        return this.levels[this.componentLevel].toString();
    }
}

export class RandomCantrip extends ItemComponent {
    cantripName;

    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.cantripName = RandomFromList(cantripOptions);
        this.componentLevel = 0;
        this.maxLevel = 0;
        this.isProperty = true;
        this.isRandom = true;
        this.formulaName = "RandomCantrip";
    }

    GenerateText() {
        return this.cantripName.toString();
    }
}

export class CantripOption extends ItemComponent {
    cantripsList = [];

    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.componentLevel = prototypeData.startLevel;
        this.maxLevel = 3;
        this.cantripsList = RandomListFromList(cantripOptions, prototypeData.startLevel)
        this.isProperty = true;
        this.isRandom = true;
        this.formulaName = "CantripOption";
    }

    GenerateText() {
        return this.cantripsList.join(', ').replace(/, ([^,]*)$/, ' or $1');
    }
}

export class RandomClassResource extends ItemComponent {
    resourceType;

    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.resourceType = RandomFromList(classResourceOptions);
        this.componentLevel = 0;
        this.maxLevel = 0;
        this.isProperty = true;
        this.isRandom = true;
        this.formulaName = "RandomClassResource";
    }

    GenerateText() {
        return this.resourceType.toString();
    }
}

export class RandomLanguage extends ItemComponent {
    languageName;

    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.languageName = RandomFromLevelOfList(languageOptions, prototypeData.startLevel);
        this.componentLevel = 0;
        this.maxLevel = 0;
        this.isProperty = true;
        this.isRandom = true;
        this.formulaName = "RandomLanguage";
    }

    GenerateText() {
        return this.languageName.toString();
    }
}

export class RandomAttackRollType extends ItemComponent {
    attackRollType;

    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.attackRollType = RandomFromList(attackRollType);
        this.componentLevel = 0;
        this.maxLevel = 0;
        this.isProperty = true;
        this.isRandom = true;
        this.formulaName = "RandomAttackRollType";
    }

    GenerateText() {
        return this.attackRollType.toString();
    }
}

export class SkillPenalty extends ItemComponent {
    levels = [
        "must reroll 20's on",
        "subtract 1d4 to the total of",
        "suffer disadvantage on",
    ]

    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.componentLevel = prototypeData.startLevel;
        this.maxLevel = 2;
        this.formulaName = "SkillPenalty";
    }

    GenerateText() {
        return this.levels[this.componentLevel].toString();
    }
}

export class LevelledTextBlock extends ItemComponent {
    levelStrings = []

    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.levelStrings = prototypeData.levelStrings;
        this.maxLevel = this.levelStrings.length -1;
        this.formulaName = "LevelledTextBlock";
    }

    GenerateText() {
        return this.levelStrings[this.componentLevel];
    }
}

export class NumberPlus extends ItemComponent {
    extraNumber = 0;

    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.componentLevel = prototypeData.startLevel;
        this.extraNumber = prototypeData.extraNumber;
        this.maxLevel = 10;
        this.formulaName = "NumberPlus";
    }

    GenerateText() {
        return (this.componentLevel + this.extraNumber).toString();
    }
}

export class ListOfDamageTypes extends ItemComponent {
    damageTypes = [];

    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.componentLevel = prototypeData.startLevel;
        this.maxLevel = 4;
        this.isRandom = true;
        this.damageTypes = RandomListFromList(damageTypeOptions[0], prototypeData.startLevel)
        this.isProperty = true;
        this.formulaName = "ListOfDamageTypes";
    }

    GenerateText() {
        return this.damageTypes.join(', ').replace(/, ([^,]*)$/, ' or $1');
    }
}

export class SpendCharges extends ItemComponent {
    constructor(propertyName, prototypeData) {
        super(propertyName, prototypeData);
        this.componentLevel = prototypeData.startLevel;
        this.maxLevel = 10;
        this.formulaName = "SpendCharges";
    }

    GenerateText() {
        return `Spend ${this.componentLevel} charges`
    }
}
