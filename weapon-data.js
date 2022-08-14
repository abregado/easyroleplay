let weaponEffects = [
    {
        text: "Free action before making an attack roll: ${this.UsesPerDay}, +${this.AttackBonus} to this attack roll.",
        components: [
            {name: "AttackBonus", formula: "AttackBonus", startValue: 2},
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1},
        ]
    },
    {
        text: "Passive: +${this.AttackBonus} to attack rolls made using this weapon.",
        components: [
            {name: "AttackBonus", formula: "AttackBonus", startValue: 1},
        ]
    },
    {
        text: "Passive: Attacks by this weapon cause an extra +${this.DamageDice} ${this.RandomDamageType} damage.",
        components: [
            {name: "RandomDamageType", formula: "RandomDamageType", startValue: 0},
            {name: "DamageDice", formula: "DamageDice", startValue: 1},
        ]
    },
    {
        text: "Passive: Attacks by this weapon cause an extra +${this.DamageDice} ${this.RandomDamageType} damage.",
        components: [
            {name: "RandomDamageType", formula: "RandomDamageType", startValue: 1},
            {name: "DamageDice", formula: "DamageDice", startValue: 0},
        ]
    },
    {
        text: "Reaction when you hit with an attack using this weapon: deal an extra +${this.DamageDice} ${this.RandomDamageType} damage.",
        components: [
            {name: "RandomDamageType", formula: "RandomDamageType", startValue: 0},
            {name: "DamageDice", formula: "DamageDice", startValue: 3},
        ]
    },
    {
        text: "Passive: Attacks by this weapon cause an extra +${this.DamageDice} ${this.RandomDamageType} damage to ${this.RandomCreatureType} type creatures.",
        components: [
            {name: "RandomDamageType", formula: "RandomDamageType", startValue: 1},
            {name: "DamageDice", formula: "DamageDice", startValue: 1},
            {name: "RandomCreatureType", formula: "RandomCreatureType", startValue: 0},
        ]
    },
    {
        text: "Free action: Wield or sheath this weapon.",
    },
    {
        text: "Passive: Wielding the item does not take up a hand.",
    },
    {
        text: "Passive: This weapon cannot be disarmed.",
    },
    {
        text: "Passive: Weapon size reduced to Tiny when sheathed.",
    },
    {
        text: "Passive: Item weighs 0.5lb when sheathed.",
    },
    {
        text: "Action: Item is sheathed to an extradimensional space or unsheathed from that space.",
    },
    {
        text: "Bonus action: Item returns to your free hand if it is within 300ft.",
    },
    {
        text: "Reaction: Increase reach of the weapon by 10ft for the next attack.",
    },
    {
        text: "Passive: When you wound with this weapon, the target may not heal until your next turn begins.",
    },
    {
        text: "Reaction, When you wound with this weapon: ${this.UsesPerDay}, the target may not heal for the next 10 rounds.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 2},
        ]
    },
    {
        text: "Passive: Heal ${this.DamageDice} when rolling a critical hit.",
        components: [
            {name: "DamageDice", formula: "DamageDice", startValue: 2},
        ]
    },
    {
        text: "Reaction when you cause damage using this weapon: Heal ${this.DamageDice}.",
        components: [
            {name: "DamageDice", formula: "DamageDice", startValue: 1},
        ]
    },
    {
        text: "Reaction when you cause damage using this weapon: Gain ${this.DamageDice} temporary hit points.",
        components: [
            {name: "DamageDice", formula: "DamageDice", startValue: 2},
        ]
    },
    {
        text: "Free action: Once per turn, reroll a failed attack roll.",
    },
    {
        text: "Reaction, when a melee attack against you fails: Gain advantage on your next attack against the target.",
    },
    {
        text: "Reaction, when an melee attack against you fails: Move 5ft without provoking attacks of opportunity.",
    },
    {
        text: "Passive: Reroll fumbled attack rolls once.",
    },
    {
        text: "Passive: Causes critical hits on a 19 or 20.",
    },
    {
        text: "Free action, after you miss with a strike: Gain +${this.AttackBonus} to hit and damage on the next strike which hits. When you deal damage, this bonus resets to zero.",
        components: [
            {name: "AttackBonus", formula: "AttackBonus", startValue: 1},
        ]
    },
    {
        text: "Reaction, When you kill a target with this weapon: ${this.UsesPerDay}, Gain ${this.DamageDice} temporary hit points.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 3},
            {name: "DamageDice", formula: "DamageDice", startValue: 4},
        ]
    },
    {
        text: "Passive: Gain 2${this.DamageDice} temporary hitpoints when you kill a creature with this weapon.",
        components: [
            {name: "DamageDice", formula: "DamageDice", startValue: 1},
        ]
    },
    {
        text: "Passive: Reroll ${this.DiceMinimum} on damage dice against targets that cannot see you.",
        components: [
            {name: "DiceMinimum", formula: "DiceMinimum", startValue: 0}
        ]
    },
    {
        text: "Free action, when you take the Dash action: ${this.UsesPerDay}, make one attack roll with this weapon against a valid target.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1},
        ]
    },
    {
        text: "Free action, when you take the Dodge action: ${this.UsesPerDay}, make one attack roll with this weapon against a valid target.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1},
        ]
    },
]
