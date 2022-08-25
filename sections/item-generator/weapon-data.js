let weaponEffects = [
    {
        text: "Free action before making an attack roll: ${this.UsesPerDay}, +${this.AttackBonus} to this attack roll.",
        components: [
            {name: "AttackBonus", formula: "AttackBonus", startLevel: 3, increasePerLevel: 2},
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 1},
        ],
        maxLevel: 2
    },
    {
        text: "Passive: +${this.AttackBonus} to attack and damage rolls made using this weapon.",
        components: [
            {name: "AttackBonus", formula: "AttackBonus", startLevel: 1, increasePerLevel: 1},
        ],
        maxLevel: 2
    },
    {
        text: "Passive: +${this.AttackBonus} to attack rolls made using this weapon.",
        components: [
            {name: "AttackBonus", formula: "AttackBonus", startLevel: 2, increasePerLevel: 2},
        ],
        maxLevel: 2
    },
    {
        text: "Passive: Attacks by this weapon cause an extra +${this.DamageDice} ${this.RandomDamageType} damage.",
        components: [
            {name: "RandomDamageType", formula: "RandomDamageType", startLevel: 0},
            {name: "DamageDice", formula: "DamageDice", startLevel: 0, increasePerLevel: 1},
        ],
        maxLevel: 2
    },
    {
        text: "Reaction when you hit with an attack using this weapon: deal an extra +2${this.DamageDice} ${this.RandomDamageType} damage.",
        components: [
            {name: "RandomDamageType", formula: "RandomDamageType", startLevel: 0},
            {name: "DamageDice", formula: "DamageDice", startLevel: 1, increasePerLevel: 1},
        ],
        maxLevel: 2
    },
    {
        text: "Passive: Attacks by this weapon cause an extra +2${this.DamageDice} ${this.RandomDamageType} damage to ${this.RandomCreatureType} type creatures.",
        components: [
            {name: "RandomDamageType", formula: "RandomDamageType", startLevel: 1},
            {name: "DamageDice", formula: "DamageDice", startLevel: 0, increasePerLevel: 1},
            {name: "RandomCreatureType", formula: "RandomCreatureType", startLevel: 0},
        ],
        maxLevel: 2
    },
    {
        text: "Free action: Wield or sheath this weapon.",
        maxLevel: 0
    },
    {
        text: "Passive: Wielding the item does not take up a hand.",
        maxLevel: 0
    },
    {
        text: "Passive: This weapon cannot be disarmed.",
        maxLevel: 0
    },
    {
        text: "Passive: Weapon size reduced to Tiny when sheathed.",
        maxLevel: 0
    },
    {
        text: "Passive: Item weighs almost nothing when sheathed.",
        maxLevel: 0
    },
    {
        text: "Action: Item is sheathed to an extradimensional space or unsheathed from that space.",
        maxLevel: 0
    },
    {
        text: "Bonus action: Item returns to your free hand if it is within 300ft.",
        maxLevel: 0
    },
    {
        text: "Reaction: Increase reach of the weapon by 10ft for the next attack.",
        maxLevel: 0
    },
    {
        text: "Reaction, When you wound with this weapon: When you wound with this weapon, the target may not gain hitpoints ${this.NoHealTime}.",
        components: [
            {name: "NoHealTime", formula: "LevelledTextBlock", startLevel: 0, levelStrings: [
                    "until your next turn begins",
                    "for the next minute",
                    "for the next 24 hours"
            ], increasePerLevel: 1}
        ],
        maxLevel: 2
    },
    {
        text: "Passive: Heal ${this.DamageDice} when rolling a critical hit.",
        components: [
            {name: "DamageDice", formula: "DamageDice", startLevel: 2, increasePerLevel: 2},
        ],
        maxLevel: 2
    },
    {
        text: "Reaction when you cause damage using this weapon: Heal ${this.DamageDice}.",
        components: [
            {name: "DamageDice", formula: "DamageDice", startLevel: 0, increasePerLevel: 1},
        ],
        maxLevel: 2
    },
    {
        text: "Once per turn, reroll a failed attack roll.",
        maxLevel: 0,
    },
    {
        text: "Reaction, when a melee attack against you fails: Gain advantage on your next attack against the target.",
        maxLevel: 0,
    },
    {
        text: "Reaction, when a melee attack against you fails: Move 5ft without provoking attacks of opportunity.",
        maxLevel: 0,
    },
    {
        text: "Passive: Causes critical hits on a 19 or 20.",
        maxLevel: 0,
    },
    {
        text: "Free action, after you miss with a strike: Gain +${this.AttackBonus} to hit and damage on the next strike which hits. When you deal damage, this bonus resets to zero.",
        components: [
            {name: "AttackBonus", formula: "AttackBonus", startLevel: 1, increasePerLevel: 2},
        ],
        maxLevel: 2,
    },
    {
        text: "Reaction, When you kill a target with this weapon: ${this.UsesPerDay}, Gain 2${this.DamageDice} temporary hit points.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 1, increasePerLevel: 1},
            {name: "DamageDice", formula: "DamageDice", startLevel: 0, increasePerLevel: 2},
        ],
        maxLevel: 2
    },
    {
        text: "Passive: Gain 3${this.DamageDice} temporary hitpoints when you kill a creature with this weapon.",
        components: [
            {name: "DamageDice", formula: "DamageDice", startLevel: 1, increasePerLevel: 1},
        ],
        maxLevel: 2
    },
    {
        text: "Passive: Reroll ${this.DiceMinimum} on damage dice against targets that have not detected you.",
        components: [
            {name: "DiceMinimum", formula: "DiceMinimum", startLevel: 0, increasePerLevel: 1}
        ],
        maxLevel: 2
    },
    {
        text: "Free action, when you take the Dash action: ${this.UsesPerDay}, make one attack roll with this weapon against a valid target.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 1, increasePerLevel: 1},
        ],
        maxLevel: 2
    },
    {
        text: "Free action, when you take the Dodge action: ${this.UsesPerDay}, make one attack roll with this weapon against a valid target.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 1, increasePerLevel: 1},
        ],
        maxLevel: 2
    },
]
