const itemEffects = [
    {
        text: "Action: Spend ${this.ChargeCost}. Change the damage type of ${this.SpellCountOfLevel} from one of the following to another (${this.DamageTypes}) until your next rest ends.",
        properties: [
            {name: "ChargeCost", formula: "TextUnits", startValue: [2,"charge"]},
            {name: "SpellCountOfLevel", formula: "SpellCountOfLevel", startValue: [1,0]},
            {name: "DamageTypes", formula: "DamageTypes", startValue: 1}
            ]
    },
    {
        text: "Passive: +${this.AttackBonus} to melee attack rolls using this weapon.",
        properties: [
            {name: "AttackBonus", formula: "AttackBonus", startValue: 1},
        ]
    },
    {
        text: "Passive: ${this.SkillBonus} your ${this.SkillCheckType} checks.",
        properties: [
            {name: "SkillBonus", formula: "SkillBonus", startValue: 0},
            {name: "SkillCheckType", formula: "SkillCheckType", startValue: [0,1,2,3,4,5]},
        ]
    },
    {
        text: "Free action: Spend ${this.ChargeCost}. ${this.SkillBonus} your next ${this.SkillCheckType} check.",
        properties: [
            {name: "SkillBonus", formula: "SkillBonus", startValue: 1},
            {name: "SkillCheckType", formula: "SkillCheckType", startValue: [0,1,2,3,4,5]},
            {name: "ChargeCost", formula: "TextUnits", startValue: [2,"charge"]},
        ]
    },
    {
        text: "Free action: Spend ${this.ChargeCost}. ${this.SkillBonus} your next ${this.SkillCheckType} check.",
        properties: [
            {name: "SkillBonus", formula: "SkillBonus", startValue: 2},
            {name: "SkillCheckType", formula: "SkillCheckType", startValue: [0,1,2,3,4,5]},
            {name: "ChargeCost", formula: "TextUnits", startValue: [4,"charge"]},
        ]
    },
]


class Formula {
  static GenerateText(itemLevel,startingValue){
      const total = itemLevel + startingValue;
      if (Math.abs(total)>1 || total === 0){
          return `${total} units`;
      }
      return `${total} unit`;
  }
}

class TextUnits extends Formula {
    static GenerateText(itemLevel,startingValue){
        const total = startingValue[0];
        const unit = startingValue[1];
        if (Math.abs(total)>1 || total === 0){
            return `${total} ${unit}s`;
        }
        return `${total} ${unit}`;
    }
}

class AttackBonus extends Formula {
    static maxLevel = 3

    static GenerateText(itemLevel,startingValue){
        const total = Math.min(itemLevel + startingValue, this.maxLevel);
        return total.toString();
    }
}

class SpellCount extends Formula {
    static maxLevel = 3

    static GenerateText(itemLevel,startingValue) {
        const total = Math.min(itemLevel + startingValue, this.maxLevel);
        return total.toString();
    }
}

class ChargeCost extends Formula {
    static GenerateText(itemLevel,startingValue){
        return "chargecost";
    }
}

class SpellCountOfLevel extends Formula {
    static maxCount = 3
    static maxLevel = 4

    static GenerateText(itemLevel,startingValue) {
        const startingCount = startingValue[0];
        const startingLevel = startingValue[1];

        const count = Math.min(itemLevel + startingCount, this.maxCount);
        const levelText = SpellLevel.GenerateText(itemLevel,startingLevel);

        if (Math.abs(count) > 1 || count === 0){
            return `${count} ${levelText}s`
        }
        return `a ${levelText}`
    }
}

class SpellLevel extends Formula {
    static maxLevel = 4

    static levels= [
        "cantrip",
        "level one spell",
        "level three spell",
        "level five spell",
        "level eight spell",

    ]

    static GenerateText(itemLevel,startingValue){
        const total = Math.min(itemLevel + startingValue, this.maxLevel);
        return this.levels[total];
    }
}

class TextNumber extends Formula {
    static maxLevel = 10;

    static texts = [
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

    static GenerateText(itemLevel,startingValue) {
        const total = Math.min(itemLevel + startingValue, this.maxLevel);

        return this.texts[total].toString();
    }

}

class DamageTypes extends Formula {
    static damageLevels = [
        ['fire, cold, poison'],
        ['lightning, acid'],
        ['radiant, necrotic'],
        ['psychic, force']
    ];

    static maxLevel = 4

    static GenerateText(itemLevel,startingValue){
        const total = Math.min(itemLevel + startingValue, this.maxLevel);
        var includedTypes = []

        for(var i=0;i<total;i++){
            const typesInLevel = this.damageLevels[i];
            typesInLevel.forEach(damage=>{
                includedTypes.push(damage)
            })
        }

        return includedTypes.join(', ').replace(/, ([^,]*)$/, ' and $1');
    }
}

class SkillBonus extends Formula {
    static maxLevel = 2

    static levels= [
        "You may reroll 1's on",
        "Add +1d4 to the total of",
        "Gain advantage on",
    ]

    static GenerateText(itemLevel, startingValue) {
        const total = Math.min(itemLevel + startingValue, this.maxLevel);
        return this.levels[total].toString();
    }
}

class SkillCheckType extends Formula {
    static levels = [
        "History","Insight","Sleight of Hand","Stealth","Acrobatics","Athletics","Survival","Arcana","Persuasion"
    ]

    static GenerateText(itemLevel, startingValue) {
        const item = Math.floor(Math.random() * startingValue.length);
        console.log(item)
        const choice = startingValue[item];
        return this.levels[choice].toString();
    }
}

function fillItemText(itemEntry){
    const propertyFunctions = {
        "AttackBonus": AttackBonus,
        "SpellCountOfLevel": SpellCountOfLevel,
        "ChargeCost": ChargeCost,
        "DamageTypes": DamageTypes,
        "TextUnits": TextUnits,
        "TextNumber": TextNumber,
        "SkillBonus": SkillBonus,
        "SkillCheckType": SkillCheckType,
    }

    const properties = {}

    itemEntry.properties.forEach(property=>{
        properties[property.name] = propertyFunctions[property.formula].GenerateText(0,property.startValue);
    })

    console.log(properties)
    return new Function("return `" + itemEntry.text +"`;").call(properties);
}

function createList(inputData) {
    var html = '';

    html += '<ul>';

    inputData.forEach(entry=>{
        const filledText = fillItemText(entry);
        html += `<li>${filledText}</li>`
    });

    html += '</ul>';

    return html;
}

function insertHTML(id, html) {
    var el = document.getElementById(id);

    if(!el) {
        alert(`Element with id ${id} not found`);
    }

    el.innerHTML = html;
}

function run() {
    const html = createList(itemEffects);
    insertHTML('iteminfo',html);
}

window.onload = run;
