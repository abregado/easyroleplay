let accessoryEffects = [
    {
        text: "Passive: You ${this.SkillBonus} your ${this.RandomSkillCheckType} checks.",
        components: [
            {name: "SkillBonus", formula: "SkillBonus", startLevel: 0, increasePerLevel: 1},
            {name: "RandomSkillCheckType", formula: "RandomSkillCheckType", startLevel: 0},
        ]
    },
    {
        text: "Free action: ${this.UsesPerDay}, You ${this.SkillBonus} your next ${this.RandomSkillCheckType} check.",
        components: [
            {name: "SkillBonus", formula: "SkillBonus", startLevel: 1, increasePerLevel: 1},
            {name: "RandomSkillCheckType", formula: "RandomSkillCheckType", startLevel: 0},
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 1},
        ],
        maxLevel: 1
    },
    {
        text: "Free action: ${this.UsesPerDay}, You gain advantage on your next ${this.RandomSkillCheckType} check.",
        components: [
            {name: "SkillBonus", formula: "SkillBonus", startLevel: 2},
            {name: "RandomSkillCheckType", formula: "RandomSkillCheckType", startLevel: 0},
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 0, increasePerLevel: 1},
        ]
    },
    {
        text: "Reaction when you cast any spell: Roll ${this.HitDice} hit dice and suffer the damage. The spell is considered ${this.HitDice} levels higher.",
        components: [
            {name: "HitDice", formula: "TextNumber", startLevel: 2, increasePerLevel: 1},
        ]
    },
    {
        text: "Action: ${this.UsesPerDay}, Boost a spell slot by two levels. You may not store more spell slots than your maximum.\",",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 0, increasePerLevel: 1},
        ]
    },
    {
        text: "Reaction when you cast a spell: ${this.UsesPerDay}, Boost a spell slot by one level. You may not store more spell slots than your maximum.\",",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 2, increasePerLevel: 1},
        ]
    },
    {
        text: "Ritual: ${this.UsesPerDay}, upgrade your lowest spell slot by three levels. You may not store more spell slots than your maximum.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 1, increasePerLevel: 1},
        ]
    },
    {
        text: "Reaction when you cast a spell with duration: ${this.UsesPerDay}, Double the duration of that spell.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 2, increasePerLevel: 1},
        ]
    },
    {
        text: "Reaction: ${this.UsesPerDay}, You gain advantage on your next ${this.RandomAbilityScoreType} saving throw.",
        components: [
            {name: "RandomAbilityScoreType", formula: "RandomAbilityScoreType", startLevel: 0},
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 0, increasePerLevel: 1},
        ]
    },
    {
        text: "Passive: You ${this.SkillBonus} any ${this.RandomAbility} saving throws you make.",
        components: [
            {name: "RandomAbility", formula: "RandomAbilityScoreType", startLevel: 0},
            {name: "SkillBonus", formula: "SkillBonus", startLevel: 0, increasePerLevel: 1},
        ]
    },
    {
        text: "Passive: You ${this.SkillBonus} any saving throws against effects caused by a ${this.RandomCreatureType} type creature.",
        components: [
            {name: "SkillBonus", formula: "SkillBonus", startLevel: 1, increasePerLevel: 1},
            {name: "RandomCreatureType", formula: "RandomCreatureType", startLevel: 0},
        ],
        maxLevel: 1
    },
    {
        text: "Reaction: ${this.UsesPerDay}, You gain advantage on the next saving throw made against effects caused by a ${this.RandomCreatureType} type creature",
        components: [
            {name: "RandomCreatureType", formula: "RandomCreatureType", startLevel: 0},
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 1, increasePerLevel: 1},
        ]
    },
    {
        text: "Action: Roll up to ${this.DiceMax} hit dice to gain temporary hit points equal to twice the total rolled, until your next rest.",
        components: [
            {name: "DiceMax", formula: "NumberIncrement", startLevel: 2, incrementSize: 2, increasePerLevel: 1}
        ]
    },
    {
        text: "Reaction when wounded by an attack: ${this.UsesPerDay}, Gain temporary hit points equal to your level, after the attack is resolved.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 1, increasePerLevel: 1},
        ]
    },
    {
        text: "${this.UsesPerDay}, your party is immune to being surprised by a group including at least one ${this.RandomCreatureType} type.",
        components: [
            {name: "RandomCreatureType", formula: "RandomCreatureType", startLevel: 0},
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 0, increasePerLevel: 1},
        ]
    },
    {
        text: "${this.UsesPerDay}, your party ${this.PartySkillBonus} initiative tests against a group including at least one ${this.RandomCreatureType} type.",
        components: [
            {name: "PartySkillBonus", formula: "PartySkillBonus", startLevel: 1, increasePerLevel: 1},
            {name: "RandomCreatureType", formula: "RandomCreatureType", startLevel: 0},
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 2},
        ],
        maxLevel: 1
    },
    {
        text: "Passive: Detect when a ${this.RandomCreatureType} type is within 60ft of you. Direction and location are not revealed.",
        components: [
            {name: "RandomCreatureType", formula: "RandomCreatureType", startLevel: 0},
        ],
        maxLevel: 0
    },
    {
        text: "Bonus action: Transfer up to ${this.TextUnits} of AC to a friendly target within ${this.FeetIncrement} until the start of your next turn.",
        components: [
            {name: "TextUnits", formula: "TextUnits", startLevel: 2, unitName: "point", increasePerLevel: 2},
            {name: "FeetIncrement", formula: "FeetIncrement", startLevel: 2, increasePerLevel: 1, incrementSize: 5},
        ]
    },
    {
        text: "Reaction: ${this.UsesPerDay}, immediately remove the ${this.RandomCondition} condition from yourself.",
        components: [
            {name: "RandomCondition", formula: "RandomCondition", startLevel: 0},
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 0, increasePerLevel: 1}
        ]
    },
    {
        text: "Action: ${this.UsesPerDay}, immediately remove the ${this.RandomCondition} condition from a willing target within ${this.FeetIncrement}.",
        components: [
            {name: "RandomCondition", formula: "RandomCondition", startLevel: 0},
            {name: "FeetIncrement", formula: "FeetIncrement", startLevel: 1, increasePerLevel: 1, incrementSize: 10},
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 0, increasePerLevel: 1},
        ]
    },
    {
        text: "Free action, at the end of your turn: ${this.UsesPerDay}, You gain advantage on a check to remove any condition.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 1, increasePerLevel: 1}
        ]
    },
    {
        text: "Reaction, at the start of your turn: Remove the ${this.RandomCondition} condition. Your speed is zero until the end of your next turn.",
        components: [
            {name: "RandomCondition", formula: "RandomCondition", startLevel: 1}
        ],
        maxLevel: 0
    },
    {
        text: "Free action: ${this.UsesPerDay}, the next hit die spent rolls maximum.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 1, increasePerLevel: 1},
        ]
    },
    {
        text: "Passive: You may reroll ${this.DiceMinimum} when you roll a hit die.",
        components: [
            {name: "DiceMinimum", formula: "DiceMinimum", startLevel: 0, increasePerLevel: 1}
        ]
    },
    {
        text: "Passive: Gain +${this.AttackBonus} on spell attack rolls.",
        components: [
            {name: "AttackBonus", formula: "AttackBonus", startLevel: 1, increasePerLevel: 1}
        ]
    },
    {
        text: "Passive: Damaging cantrips you cast cause +${this.AttackBonus} extra damage.",
        components: [
            {name: "AttackBonus", formula: "AttackBonus", startLevel: 1, increasePerLevel: 1}
        ]
    },
    {
        text: "Reaction: ${this.UsesPerDay}, Gain +${this.AttackBonus} bonus on your next spell attack roll.",
        components: [
            {name: "AttackBonus", formula: "AttackBonus", startLevel: 2, increasePerLevel: 1},
            {name:"UsesPerDay", formula: "UsesPerDay", startLevel: 0, increasePerLevel: 1}
        ]
    },
    {
        text: "Passive: Immunity to travel penalties from terrain and weather while in ${this.RandomEnvironment} environments.",
        components: [
            {name: "RandomEnvironment", formula: "RandomEnvironment", startLevel: 0}
        ],
        maxLevel: 0
    },
    {
        text: "Passive: Resistance to ${this.RandomDamageType} damage from environmental hazards.",
        components: [
            {name: "RandomDamageType", formula: "RandomDamageType", startLevel: 0}
        ],
        maxLevel: 0
    },
    {
        text: "${this.ActionSpeed}: Double the range of the next spell cast.",
        components: [
            {name: "ActionSpeed", formula: "ActionSpeedIncrease", startLevel: 1}
        ],
        maxLevel: 0
    },
    {
        text: "Reaction: Change the damage type of one cantrip from one of the following to another (${this.DamageTypes}) for the next attack.",
        components: [
            {name: "DamageTypes", formula: "DamageTypes", startLevel: 0, increasePerLevel: 1},
        ],
        maxLevel: 2
    },
    {
        text: "Free Action: ${this.UsesPerDay}, Gain Darkvision (60ft) for 1 hour.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 2, increasePerLevel: 1},
        ],
        maxLevel: 1
    },
    {
        text: "Passive: Gain Darkvision (${this.FeetIncrement})",
        components: [
            {name: "FeetIncrement", formula: "FeetIncrement", startLevel: 1, increasePerLevel: 1,incrementSize: 15},
        ]
    },
    {
        text: "Reaction: ${this.UsesPerDay}, An ally within 5ft may ${this.SkillBonus} the next saving throw they make.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 1, increasePerLevel: 1},
            {name: "SkillBonus", formula: "SkillBonus", startLevel: 2, increasePerLevel: 1},
        ]
    },
    {
        text: "${this.UsesPerDay} cast one of the follow cantrips: ${this.CantripOption}.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 1, increasePerLevel: 1},
            {name: "CantripOption", formula: "CantripOption", startLevel: 2, increasePerLevel: 1},
        ]
    },
    {
        text: "Reaction when hit by an attack: ${this.UsesPerDay}, cast an instantaneous level 1 spell that uses a Bonus action, and does not require concentration.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 1, increasePerLevel: 1},
        ]
    },
    {
        text: "Reaction, when you roll a Stealth check: ${this.UsesPerDay}, maximise the result. Gain the ${this.RandomCondition} condition until the end of your next turn.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 1, increasePerLevel: 1},
            {name: "RandomCondition", formula: "RandomCondition", startLevel: 0}
        ]
    },
    {
        text: "Ritual: ${this.UsesPerDay}, create 3${this.DamageDice} pieces of ammunition for a weapon you have by touching a non-magical weapon. The touched weapon disintegrates.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 1, increasePerLevel: 1},
            {name: "DamageDice", formula: "DamageDice", startLevel: 1, increasePerLevel: 1},
        ]
    },
    {
        text: "Passive: +${this.AttackBonus} to ammunition recovery rolls.",
        components: [
            {name: "AttackBonus", formula: "AttackBonus", startLevel: 1, increasePerLevel: 1},
        ],
        maxLevel: 1
    },
    {
        text: "Action: Spend a point of ${this.RandomClassResource} to gain a level ${this.SpellLevel} spell slot.",
        components: [
            {name: "RandomClassResource", formula: "RandomClassResource", startLevel: 0},
            {name: "SpellLevel", formula: "TextNumber", startLevel: 2, increasePerLevel: 1},
        ]
    },
    {
        text: "Free action: ${this.UsesPerDay}, You ${this.SkillBonus} Concentration checks for the duration of the next spell you cast.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 2},
            {name: "SkillBonus", formula: "SkillBonus", startLevel: 0, increasePerLevel: 1},
        ]
    },
    {
        text: "Reaction: ${this.UsesPerDay}, Reroll a failed Concentration check.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 1, increasePerLevel: 1},
        ]
    },
    {
        text: "Reaction: ${this.UsesPerDay}, the next spell you cast does not require both its Somatic and Verbal components.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 2, increasePerLevel: 1},
        ]
    },
    {
        text: "Ritual: ${this.UsesPerDay}, for 1 hour you understand, speak, read and write one language that you have in front of you during the ritual.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 1, increasePerLevel: 1},
        ]
    },
    {
        text: "Free action: ${this.UsesPerDay}, for ${this.NumberIncrement} minutes you can understand, speak, read and write ${this.RandomLanguage}.",
        components: [
            {name: "RandomLanguage", formula: "RandomLanguage", startLevel: 1},
            {name: "NumberIncrement", formula: "NumberIncrement", startLevel: 1, increasePerLevel: 1,incrementSize: 5},
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 1, increasePerLevel: 1},
        ]
    },
    {
        text: "Passive: You ${this.LevelledTextBlock} ${this.RandomLanguage} language.",
        components: [
            {name: "RandomLanguage", formula: "RandomLanguage", startLevel: 1},
            {name: "LevelledTextBlock", formula: "LevelledTextBlock", increasePerLevel: 1, startLevel: 1, levelStrings: [
                    "can read and understand spoken",
                    "know"
                ]}
        ],
        maxLevel: 1
    },
    {
        text: "Free action, when you heal a target: ${this.UsesPerDay}, You heal the same amount as the target.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 1, increasePerLevel: 1},
        ]
    },
    {
        text: "Passive: Heal ${this.DamageDice} hit points when casting a spell that heals a target.",
        components: [
            {name: "DamageDice", formula: "DamageDice", startLevel: 0, increasePerLevel: 1}
        ]
    },
    {
        text: "Reaction: Heal ${this.DamageDice} hit points when casting a spell on a friendly target.",
        components: [
            {name: "DamageDice", formula: "DamageDice", startLevel: 0, increasePerLevel: 1}
        ]
    },
    {
        text: "Passive: Targets you heal may reroll ${this.DiceMinimum} on dice for healing.",
        components: [
            {name: "DiceMinimum", formula: "DiceMinimum", startLevel: 0, increasePerLevel: 1}
        ]
    },
    {
        text: "Passive: You may reroll ${this.DiceMinimum} on dice for healing, when you are the target.",
        components: [
            {name: "DiceMinimum", formula: "DiceMinimum", startLevel: 0, increasePerLevel: 1}
        ]
    },
    {
        text: "Free action, when you heal a target: ${this.UsesPerDay}, you gain double the temporary hit points that the target healed. These last until your next rest.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 1, increasePerLevel: 1},
        ]
    },
    {
        text: "Passive: Gain ${this.DamageDice} temporary hit points when casting a spell that heals a target. These last until your next rest.",
        components: [
            {name: "DamageDice", formula: "DamageDice", startLevel: 1, increasePerLevel: 2}
        ]
    },
    {
        text: "Passive: +${this.AttackBonus} to ${this.RandomAttackRollType} attack rolls.",
        components: [
            {name: "RandomAttackRollType", formula: "RandomAttackRollType", startLevel: 1},
            {name: "AttackBonus", formula: "AttackBonus", startLevel: 1, increasePerLevel: 1}
        ]
    },
    {
        text: "Passive: You ${this.SkillBonus} to ${this.RandomAttackRollType} attack rolls.",
        components: [
            {name: "RandomAttackRollType", formula: "RandomAttackRollType", startLevel: 1},
            {name: "SkillBonus", formula: "SkillBonus", startLevel: 0, increasePerLevel: 1}
        ]
    },
    {
        text: "Passive: You ${this.SkillBonus} saving throws against creatures under the effect of one of your spells.",
        components: [
            {name: "SkillBonus", formula: "SkillBonus", startLevel: 0, increasePerLevel: 1}
        ],
        maxLevel: 2
    },
    {
        text: "Passive: +${this.AttackBonus} AC against attacks from creatures under the effect of one of your spells.",
        components: [
            {name: "AttackBonus", formula: "AttackBonus", startLevel: 2, increasePerLevel: 1}
        ]
    },
    {
        text: "Reaction when you cast a spell: ${this.UsesPerDay}, teleport ${this.FeetIncrement} to a point you have seen recently.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 0, increasePerLevel: 1},
            {name: "FeetIncrement", formula: "FeetIncrement", startLevel: 0, increasePerLevel: 1,incrementSize: 10},
        ]
    },
    {
        text: "Passive: Creatures already under the effect of one of your spells ${this.SkillPenalty} their Saving throws from spells you cast.",
        components: [
            {name: "SkillPenalty", formula: "SkillPenalty", startLevel: 0, increasePerLevel: 1}
        ]
    },
    {
        text: "Passive: Creatures already under the effect of one of your spells suffer -${this.AttackBonus} AC against spell attack rolls made against them.",
        components: [
            {name: "AttackBonus", formula: "AttackBonus", startLevel: 1, increasePerLevel: 1}
        ]
    },
    {
        text: "Passive: Regain ${this.TextNumber} hit die at the start of each short rest while attuned to this item.",
        components: [
            {name: "TextNumber", formula: "TextNumber", startLevel: 1, increasePerLevel: 1}
        ]
    },
    {
        text: "Passive: Reroll any spent hit dice once. You must accept the second result.",
        maxLevel: 0
    },
    {
        text: "Free action, before rolling Initiative: ${this.UsesPerDay}, your initiative score is ${this.NumberPlus} for this encounter.",
        components: [
            {name: "NumberPlus", formula: "NumberPlus", startLevel: 13, increasePerLevel: 1, extraNumber: 5},
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 0, increasePerLevel: 1},
        ]
    },
    {
        text: "Free action, after Initiative order has been calculated: ${this.UsesPerDay}, swap initiative count with one other willing player.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 1, increasePerLevel: 1},
        ]
    },
    {
        text: "Passive: +${this.AttackBonus} to your initiative rolls",
        components: [
            {name: "AttackBonus", formula: "AttackBonus", startLevel: 0, increasePerLevel: 1}
        ]
    },
    {
        text: "Free action, when you make an Insight check: ${this.UsesPerDay}, you automatically pass the Insight check, but the target knows that you know.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 0},
        ],
        maxLevel: 0
    },
    {
        text: "Free action, when you make an Insight check: ${this.UsesPerDay}, Learn the primary emotion the target is feeling right now. ",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 1},
        ],
        maxLevel: 0,
    },
    {
        text: "Free action when you take the Disengage action: ${this.UsesPerDay}, all your movement this round is considered teleportation.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 0, increasePerLevel: 1},
        ]
    },
    {
        text: "Bonus action, when you take the Disengage action: ${this.UsesPerDay}, Also take the Dash or Dodge action.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 0, increasePerLevel: 1},
        ]
    },
    {
        text: "Free action when you take the Disengage action: ${this.UsesPerDay}, You may move through spaces containing creatures.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startLevel: 1, increasePerLevel: 1},
        ]
    },

]
