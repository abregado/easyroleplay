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
            {name: "AttackBonus", formula: "AttackBonus", startValue: 2},
        ]
    },
    {
        text: "Passive: Each time you attack with this weapon choose either ${this.ListOfDamageTypes} damage. The attack causes an extra +${this.DamageDice} damage of the type chosen.",
        components: [
            {name: "ListOfDamageTypes", formula: "ListOfDamageTypes", startValue: 2},
            {name: "DamageDice", formula: "DamageDice", startValue: 1},
        ]
    }
]
