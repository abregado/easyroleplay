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
    "Druidcraft",
    "Eldritch Blast",
    "Encode Thoughts",
    "Fire Bolt",
    "Friends",
    "Frostbite",
    "Green-Flame Blade",
    "Guidance",
    "Gust",
    "Hand of Radiance",
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
    "Shillelagh",
    "Shocking Grasp",
    "Spare the Dying",
    "Sword Burst",
    "Thaumaturgy",
    "Thorn Whip",
    "Thunderclap",
    "Toll the Dead",
    "True Strike",
    "Vicious Mockery",
    "Word of Radiance",
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
    isProperty = false;
    componentLevel = 0;
    maxLevel = 10;
    propertyName = "";

    constructor(propertyName, startingValues) {
        this.propertyName = propertyName;
    }

    LevelUp() {
        this.componentLevel++;
    }

    CanLevelUp() {
        return this.componentLevel < this.maxLevel;
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

    constructor(propertyName, startingValues) {
        super(propertyName, startingValues);
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

    constructor(propertyName, startingValues) {
        super(propertyName, startingValues);
        this.componentLevel = startingValues[0];
        this.unitName = startingValues[1]
        this.maxLevel = 3;
    }

    GenerateText() {
        if (Math.abs(this.componentLevel) > 1 || this.componentLevel === 0) {
            return `${this.componentLevel} ${this.unitName}s`;
        }
        return `${this.componentLevel} ${this.unitName}`;
    }
}

export class AttackBonus extends ItemComponent {
    constructor(propertyName, startingValues) {
        super(propertyName, startingValues);
        this.componentLevel = startingValues
        this.maxLevel = 3;
    }

    GenerateText() {
        return this.componentLevel.toString();
    }
}

export class SpellCountOfLevel extends ItemComponent {
    spellLevelItem;

    constructor(propertyName, startingValues) {
        super(propertyName, startingValues);
        this.componentLevel = startingValues[0];
        this.spellLevelItem = new SpellLevel("SpellCountLevel", startingValues[1]);
        this.maxLevel = 4;
    }

    LevelUp() {
        if ((Math.random() > 0.5 && this.spellLevelItem.CanLevelUp()) || super.CanLevelUp() === false) {
            this.spellLevelItem.LevelUp();
        }
        this.componentLevel++;
    }

    CanLevelUp() {
        return super.CanLevelUp() || this.spellLevelItem.CanLevelUp();
    }

    GenerateText() {
        const levelText = this.spellLevelItem.GenerateText();

        if (Math.abs(this.componentLevel) > 1 || this.componentLevel === 0) {
            return `${this.componentLevel} ${levelText}s`
        }
        return `a ${levelText}`
    }
}

export class SpellLevel extends ItemComponent {
    levels = [
        "cantrip",
        "level one spell",
        "level three spell",
        "level five spell",
        "level eight spell",
    ]

    constructor(propertyName, startingValues) {
        super(propertyName, startingValues);
        this.componentLevel = startingValues;
        this.maxLevel = 4;
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

    constructor(propertyName, startingValues) {
        super(propertyName, startingValues);
        this.componentLevel = startingValues;
        this.maxLevel = 10;
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

    constructor(propertyName, startingValues) {
        super(propertyName, startingValues);
        this.componentLevel = startingValues;
        this.maxLevel = 2;
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

    constructor(propertyName, startingValues) {
        super(propertyName, startingValues);
        this.componentLevel = startingValues;
        this.maxLevel = 2;
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

    constructor(propertyName, startingValues) {
        super(propertyName, startingValues);
        this.componentLevel = startingValues;
        this.maxLevel = 2;
    }

    GenerateText() {
        return this.levels[this.componentLevel].toString();
    }
}

export class RandomSkillCheckType extends ItemComponent {
    skillName;

    constructor(propertyName, startingValues) {
        super(propertyName, startingValues);
        this.skillName = RandomFromList(skillOptions);
        this.componentLevel = 0;
        this.maxLevel = 0;
        this.isProperty = true;
    }

    GenerateText() {
        return this.skillName.toString();
    }
}

export class RandomAbilityScoreType extends ItemComponent {
    abilityType;

    constructor(propertyName, startingValues) {
        super(propertyName, startingValues);
        this.abilityType = RandomFromList(abilityScoreOptions);
        this.componentLevel = 0;
        this.maxLevel = 0;
        this.isProperty = true;
    }

    GenerateText() {
        return this.abilityType.toString();
    }
}

export class RandomCreatureType extends ItemComponent {
    creatureType;

    constructor(propertyName, startingValues) {
        super(propertyName, startingValues);
        this.creatureType = RandomFromList(creatureTypeOptions);
        this.componentLevel = 0;
        this.maxLevel = 0;
        this.isProperty = true;
    }

    GenerateText() {
        return this.creatureType.toString();
    }
}

export class RandomCondition extends ItemComponent {
    conditionType;

    constructor(propertyName, startingValues) {
        super(propertyName, startingValues);
        this.conditionType = RandomFromLevelOfList(conditionTypeLevels, startingValues);
        this.componentLevel = 0;
        this.maxLevel = 0;
        this.isProperty = true;
    }

    GenerateText() {
        return this.conditionType.toString();
    }
}

export class RandomEnvironment extends ItemComponent {
    environmentType;

    constructor(propertyName, startingValues) {
        super(propertyName, startingValues);
        this.environmentType = RandomFromList(environmentTypeOptions);
        this.componentLevel = 0;
        this.maxLevel = 0;
        this.isProperty = true;
    }

    GenerateText() {
        return this.environmentType.toString();
    }
}

export class RandomDamageType extends ItemComponent {
    damageType;

    constructor(propertyName, startingValues) {
        super(propertyName, startingValues);
        this.damageType = RandomFromLevelOfList(damageTypeOptions, startingValues);
        this.componentLevel = 0;
        this.maxLevel = 0;
        this.isProperty = true;
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
        "Five times per day",
    ]

    constructor(propertyName, startingValues) {
        super(propertyName, startingValues);
        this.componentLevel = startingValues;
        this.maxLevel = 4;
    }

    GenerateText() {
        return this.levels[this.componentLevel].toString();
    }
}

export class FeetIncrement extends ItemComponent {
    incrementSize = 1;

    constructor(propertyName, startingValues) {
        super(propertyName, startingValues);
        this.componentLevel = startingValues[0];
        this.incrementSize = startingValues[1];
        this.maxLevel = 10;
    }

    GenerateText() {
        return `${(this.componentLevel + 1) * this.incrementSize}ft`;
    }
}

export class NumberIncrement extends ItemComponent {
    incrementSize = 1;

    constructor(propertyName, startingValues) {
        super(propertyName, startingValues);
        this.componentLevel = startingValues[0];
        this.incrementSize = startingValues[1];
        this.maxLevel = 10;
    }

    GenerateText() {
        return `${(this.componentLevel + 1) * this.incrementSize}`;
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

    constructor(propertyName, startingValues) {
        super(propertyName, startingValues);
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

    constructor(propertyName, startingValues) {
        super(propertyName, startingValues);
        this.componentLevel = startingValues;
        this.maxLevel = 3;
    }

    GenerateText() {
        return this.levels[this.componentLevel].toString();
    }
}

export class RandomCantrip extends ItemComponent {
    cantripName;

    constructor(propertyName, startingValues) {
        super(propertyName, startingValues);
        this.cantripName = RandomFromList(cantripOptions);
        this.componentLevel = 0;
        this.maxLevel = 0;
        this.isProperty = true;
    }

    GenerateText() {
        return this.cantripName.toString();
    }
}

export class CantripOption extends ItemComponent {
    cantripsList = [];

    constructor(propertyName, startingValues) {
        super(propertyName, startingValues);
        this.componentLevel = startingValues;
        this.maxLevel = 3;
        this.cantripsList = RandomListFromList(cantripOptions, startingValues)
        this.isProperty = true;
    }

    GenerateText() {
        return this.cantripsList.join(', ').replace(/, ([^,]*)$/, ' or $1');
    }
}

export class RandomClassResource extends ItemComponent {
    resourceType;

    constructor(propertyName, startingValues) {
        super(propertyName, startingValues);
        this.resourceType = RandomFromList(classResourceOptions);
        this.componentLevel = 0;
        this.maxLevel = 0;
        this.isProperty = true;
    }

    GenerateText() {
        return this.resourceType.toString();
    }
}

export class RandomLanguage extends ItemComponent {
    languageName;

    constructor(propertyName, startingValues) {
        super(propertyName, startingValues);
        this.languageName = RandomFromLevelOfList(languageOptions, startingValues);
        this.componentLevel = 0;
        this.maxLevel = 0;
        this.isProperty = true;
    }

    GenerateText() {
        return this.languageName.toString();
    }
}

export class RandomAttackRollType extends ItemComponent {
    attackRollType;

    constructor(propertyName, startingValues) {
        super(propertyName, startingValues);
        this.attackRollType = RandomFromList(attackRollType);
        this.componentLevel = 0;
        this.maxLevel = 0;
        this.isProperty = true;
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

    constructor(propertyName, startingValues) {
        super(propertyName, startingValues);
        this.componentLevel = startingValues;
        this.maxLevel = 2;
    }

    GenerateText() {
        return this.levels[this.componentLevel].toString();
    }
}

export class NumberPlus extends ItemComponent {
    extraNumber = 0;

    constructor(propertyName, startingValues) {
        super(propertyName, startingValues);
        this.componentLevel = startingValues[0];
        this.extraNumber = startingValues[1];
        this.maxLevel = 10;
    }

    GenerateText() {
        return (this.componentLevel + this.extraNumber).toString();
    }
}
