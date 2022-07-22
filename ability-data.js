let itemEffects = [
    {
        text: "Passive: You ${this.SkillBonus} your ${this.RandomSkillCheckType} checks.",
        components: [
            {name: "SkillBonus", formula: "SkillBonus", startValue: 0},
            {name: "RandomSkillCheckType", formula: "RandomSkillCheckType", startValue: []},
        ]
    },
    {
        text: "Free action: ${this.UsesPerDay}, You ${this.SkillBonus} your next ${this.RandomSkillCheckType} check.",
        components: [
            {name: "SkillBonus", formula: "SkillBonus", startValue: 1},
            {name: "RandomSkillCheckType", formula: "RandomSkillCheckType", startValue: 0},
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1},
        ],
    },
    {
        text: "Free action: ${this.UsesPerDay}, You ${this.SkillBonus} your next ${this.RandomSkillCheckType} check.",
        components: [
            {name: "SkillBonus", formula: "SkillBonus", startValue: 2},
            {name: "RandomSkillCheckType", formula: "RandomSkillCheckType", startValue: 0},
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 0},
        ]
    },
    {
        text: "Reaction when you cast a spell: Spend a hit die instead of a level ${this.SpellLevel} spell slot.",
        components: [
            {name: "SpellLevel", formula: "TextNumber", startValue: 1}
        ]
    },
    {
        text: "${this.ActionSpeed}: ${this.UsesPerDay}, Spend a hit die to recharge a level ${this.SpellLevel} spell slot.",
        components: [
            {name: "SpellLevel", formula: "TextNumber", startValue: 1},
            {name: "ActionSpeed", formula: "ActionSpeedIncrease", startValue: 1},
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1}
        ]
    },
    {
        text: "${this.ActionSpeed}: ${this.UsesPerDay}, Spend any number of hit dice to recharge the same number of level one spell slots.",
        components: [
            {name: "ActionSpeed", formula: "ActionSpeedIncrease", startValue: 0},
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 0}
        ]
    },
    {
        text: "${this.ActionSpeed}: ${this.UsesPerDay},  Roll any number of hit dice and suffer that much damage. Recharge spell slots equal to the dice rolled + 1.",
        components: [
            {name: "ActionSpeed", formula: "ActionSpeedIncrease", startValue: 0},
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 0},
        ]
    },
    {
        text: "Free action: Roll up to ${this.MaxHitDice} hit die and suffer the damage. Recharge one level ${this.SpellLevel} spell slot per dice rolled.",
        components: [
            {name: "MaxHitDice", formula: "TextNumber", startValue: 1},
            {name: "SpellLevel", formula: "TextNumber", startValue: 1},
        ]
    },
    {
        text: "Reaction when you cast any spell: Roll ${this.HitDice} hit dice and suffer the damage. The spell is considered ${this.HitDice} levels higher.",
        components: [
            {name: "HitDice", formula: "TextNumber", startValue: 2},
        ]
    },
    {
        text: "Reaction when you cast a spell: ${this.UsesPerDay}, Spend a spell slot three levels lower.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 0},
        ]
    },
    {
        text: "Reaction when you cast a spell: ${this.UsesPerDay}, Boost a spell slot by two levels.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1},
        ]
    },
    {
        text: "Reaction when you cast a spell: ${this.UsesPerDay}, Boost a spell slot by one level.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 2},
        ]
    },
    {
        text: "Action: ${this.UsesPerDay}, upgrade your lowest spell slot by three levels. ",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 0},
        ]
    },
    {
        text: "Action: ${this.UsesPerDay}, upgrade your lowest spell slot by two levels. ",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1},
        ]
    },
    {
        text: "Action: ${this.UsesPerDay}, upgrade a spell slot one level.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 2},
        ]
    },
    {
        text: "Reaction when you cast a spell with duration: ${this.UsesPerDay}, Double the duration of that spell.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 2},
        ]
    },
    {
        text: "Reaction: ${this.UsesPerDay}, You ${this.SkillBonus} your next ${this.RandomAbility} saving throw.",
        components: [
            {name: "SkillBonus", formula: "SkillBonus", startValue: 1},
            {name: "RandomAbility", formula: "RandomAbilityScoreType", startValue: 0},
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 0},
        ]
    },
    {
        text: "Bonus action: ${this.UsesPerDay}, You ${this.SkillBonus} your next ${this.RandomAbility} saving throw.",
        components: [
            {name: "SkillBonus", formula: "SkillBonus", startValue: 2},
            {name: "RandomAbility", formula: "RandomAbilityScoreType", startValue: 0},
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 0},
        ]
    },
    {
        text: "Passive: You ${this.SkillBonus} any ${this.RandomAbility} saving throws you make.",
        components: [
            {name: "RandomAbility", formula: "RandomAbilityScoreType", startValue: 0},
            {name: "SkillBonus", formula: "SkillBonus", startValue: 0},
        ]
    },
    {
        text: "Reaction: You ${this.SkillBonus} any saving throws against effects caused by a ${this.RandomCreatureType} type creature until the start of your next turn.",
        components: [
            {name: "SkillBonus", formula: "SkillBonus", startValue: 1},
            {name: "RandomCreatureType", formula: "RandomCreatureType", startValue: 0},
        ]
    },
    {
        text: "Reaction: ${this.UsesPerDay}, You ${this.SkillBonus} a single saving throw made against effects caused by a ${this.RandomCreatureType} type creature",
        components: [
            {name: "SkillBonus", formula: "SkillBonus", startValue: 2},
            {name: "RandomCreatureType", formula: "RandomCreatureType", startValue: 0},
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 0},
        ]
    },
    {
        text: "Passive: You ${this.SkillBonus} any saving throws against effects caused by ${this.RandomCreatureType} type creatures.",
        components: [
            {name: "SkillBonus", formula: "SkillBonus", startValue: 0},
            {name: "RandomCreatureType", formula: "RandomCreatureType", startValue: 0},
        ]
    },
    {
        text: "${this.ActionSpeed}: Spend any number of hit dice to gain temporary hit points equal to twice the total rolled, until your next rest.",
        components: [
            {name: "ActionSpeed", formula: "ActionSpeedIncrease", startValue: 0}
        ]
    },
    {
        text: "Reaction when wounded by an attack: ${this.UsesPerDay}, Gain temporary hit points equal to your level, after the attack is resolved.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1},
        ]
    },
    {
        text: "Your party is immune to being surprised by a group including at least one ${this.RandomCreatureType} type, once per long rest.",
        components: [
            {name: "RandomCreatureType", formula: "RandomCreatureType", startValue: 0},
        ]
    },
    {
        text: "Your party ${this.PartySkillBonus} initiative tests against a group including at least one ${this.RandomCreatureType} type, once per long rest.",
        components: [
            {name: "PartySkillBonus", formula: "PartySkillBonus", startValue: 1},
            {name: "RandomCreatureType", formula: "RandomCreatureType", startValue: 0},
        ]
    },
    {
        text: "Passive: Detect when a ${this.RandomCreatureType} type is within 60ft of you. Direction and location are not revealed.",
        components: [
            {name: "RandomCreatureType", formula: "RandomCreatureType", startValue: 0},
        ]
    },
    {
        text: "Bonus action: Transfer up to ${this.TextUnits} of AC to a friendly target within ${this.FeetIncrement} until the start of your next turn.",
        components: [
            {name: "TextUnits", formula: "TextUnits", startValue: [2, "point"]},
            {name: "FeetIncrement", formula: "FeetIncrement", startValue: [2, 5]},
        ]
    },
    {
        text: "Reaction: ${this.UsesPerDay}, immediately remove the ${this.RandomCondition} condition from yourself.",
        components: [
            {name: "RandomCondition", formula: "RandomCondition", startValue: 0},
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 0}
        ]
    },
    {
        text: "Action: ${this.UsesPerDay}, immediately remove the ${this.RandomCondition} condition from a willing target within ${this.FeetIncrement}.",
        components: [
            {name: "RandomCondition", formula: "RandomCondition", startValue: 0},
            {name: "FeetIncrement", formula: "FeetIncrement", startValue: [2, 5]},
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 0},
        ]
    },
    {
        text: "Free action, at the end of your turn: ${this.UsesPerDay}, You ${this.SkillBonus} a check to remove any condition.",
        components: [
            {name: "SkillBonus", formula: "SkillBonus", startValue: 2},
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1}
        ]
    },
    {
        text: "Reaction, at the start of your turn: Remove the ${this.RandomCondition} condition. Your speed is zero until the end of your next turn.",
        components: [
            {name: "RandomCondition", formula: "RandomCondition", startValue: 1}
        ]
    },
    {
        text: "${this.ActionSpeed}: ${this.UsesPerDay}, Roll any number of hit die. Heal the amount rolled.",
        components: [
            {name: "ActionSpeed", formula: "ActionSpeedIncrease", startValue: 1},
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 0}
        ]
    },
    {
        text: "Free action: ${this.UsesPerDay}, the next hit die spent rolls maximum.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1},
        ]
    },
    {
        text: "Passive: You may reroll ${this.DiceMinimum} when you roll a hit die.",
        components: [
            {name: "DiceMinimum", formula: "DiceMinimum", startValue: 0}
        ]
    },
    {
        text: "Action: Gain +${this.AttackBonus} bonus on your next spell attack roll.",
        components: [
            {name: "AttackBonus", formula: "AttackBonus", startValue: 3}
        ]
    },
    {
        text: "Bonus action: Gain +${this.AttackBonus} bonus on your next spell attack roll.",
        components: [
            {name: "AttackBonus", formula: "AttackBonus", startValue: 2}
        ]
    },
    {
        text: "Passive: Choose a spell you know when you attune to the item. Gain a +${this.AttackBonus} bonus when casting that spell.",
        components: [
            {name: "AttackBonus", formula: "AttackBonus", startValue: 1}
        ]
    },
    {
        text: "Passive: Immunity to travel penalties from terrain and weather while in ${this.RandomEnvironment} environments.",
        components: [
            {name: "RandomEnvironment", formula: "RandomEnvironment", startValue: 0}
        ]
    },
    {
        text: "Passive: Resistance to ${this.RandomDamageType} damage from environmental hazards.",
        components: [
            {name: "RandomDamageType", formula: "RandomDamageType", startValue: 0}
        ]
    },
    {
        text: "${this.ActionSpeed}: Double the range of the next spell cast.",
        components: [
            {name: "ActionSpeed", formula: "ActionSpeedIncrease", startValue: 1}
        ]
    },
    {
        text: "Bonus Action: Increase the next ranged spell cast by ${this.FeetIncrement}.",
        components: [
            {name: "FeetIncrement", formula: "FeetIncrement", startValue: [0, 10]},
        ]
    },
    {
        text: "Reaction: Increase the next ranged spell attack cast by ${this.FeetIncrement}.",
        components: [
            {name: "FeetIncrement", formula: "FeetIncrement", startValue: [0, 5]},
        ]
    },
    {
        text: "${this.ActionSpeed}: ${this.UsesPerDay}, change the damage type of ${this.SpellCountOfLevel} from one of the following to another (${this.DamageTypes}) until your next rest ends.",
        components: [
            {name: "SpellCountOfLevel", formula: "SpellCountOfLevel", startValue: [1, 0]},
            {name: "DamageTypes", formula: "DamageTypes", startValue: 1},
            {name: "ActionSpeed", formula: "ActionSpeedIncrease", startValue: 0},
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 0}
        ]
    },
    {
        text: "Reaction: Change the damage type of one cantrip from one of the following to another (${this.DamageTypes}) for the next attack.",
        components: [
            {name: "DamageTypes", formula: "DamageTypes", startValue: 0},
        ]
    },
    {
        text: "Ritual: ${this.UsesPerDay}, gain Darkvision (${this.FeetIncrement}) for 1 hour.",
        components: [
            {name: "FeetIncrement", formula: "FeetIncrement", startValue: [2, 20]},
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1},
        ]
    },
    {
        text: "Bonus Action: ${this.UsesPerDay}, Gain Darkvision (${this.FeetIncrement}) for 10 minutes.",
        components: [
            {name: "FeetIncrement", formula: "FeetIncrement", startValue: [2, 10]},
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 3},
        ]
    },
    {
        text: "Passive: Gain Darkvision (${this.FeetIncrement})",
        components: [
            {name: "FeetIncrement", formula: "FeetIncrement", startValue: [2, 5]},
        ]
    },
    {
        text: "Action: ${this.UsesPerDay}, An ally within 5ft may ${this.SkillBonus} the next saving throw they make.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1},
            {name: "SkillBonus", formula: "SkillBonus", startValue: 2},
        ]
    },
    {
        text: "Reaction: ${this.UsesPerDay}, An ally within 5ft may ${this.SkillBonus} the next saving throw they make.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1},
            {name: "SkillBonus", formula: "SkillBonus", startValue: 1},
        ]
    },
    {
        text: "Reaction: An ally within 5ft may ${this.SkillBonus} the next saving throw they make.",
        components: [
            {name: "SkillBonus", formula: "SkillBonus", startValue: 0},
        ]
    },
    {
        text: "${this.UsesPerDay} cast one of the follow cantrips: ${this.CantripOption}.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1},
            {name: "CantripOption", formula: "CantripOption", startValue: 3},
        ]
    },
    {
        text: "${this.UsesPerDay} cast one of the follow cantrips: ${this.CantripOption}.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 0},
            {name: "CantripOption", formula: "CantripOption", startValue: 2},
        ]
    },
    {
        text: "You may cast the follow cantrips: ${this.CantripOption}.",
        components: [
            {name: "CantripOption", formula: "CantripOption", startValue: 1},
        ]
    },
    {
        text: "Stores ${this.SpellCountOfLevel}. Drains as soon as you cast any spell. Only and attuned user can store and cast these spells.",
        components: [
            {name: "SpellCountOfLevel", formula: "SpellCountOfLevel", startValue: [1, 2]},
        ]
    },
    {
        text: "Stores ${this.SpellCountOfLevel}. Drains at the start of any rest. Anyone can store. Attuned can cast as if they were the storer.",
        components: [
            {name: "SpellCountOfLevel", formula: "SpellCountOfLevel", startValue: [1, 1]},
        ]
    },
    {
        text: "Reaction when hit by an attack: ${this.UsesPerDay}, cast any spell that uses an action. You gain the ${this.RandomCondition} condition until the end of your next turn.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1},
            {name: "RandomCondition", formula: "RandomCondition", startValue: 1}
        ]
    },
    {
        text: "Reaction when hit by an attack: ${this.UsesPerDay}, cast an instantaneous level 1 spell that uses a Bonus action, and does not require concentration.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 2},
        ]
    },
    {
        text: "Reaction, when you roll a Stealth check: ${this.UsesPerDay}, maximise the result. Gain the ${this.RandomCondition} condition until the end of your next turn.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 2},
            {name: "RandomCondition", formula: "RandomCondition", startValue: 1}
        ]
    },
    {
        text: "Reaction, when you roll a Stealth check: ${this.UsesPerDay}, reroll the result. Gain the ${this.RandomCondition} condition until the end of your next turn.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 2},
            {name: "RandomCondition", formula: "RandomCondition", startValue: 0}
        ]
    },
    {
        text: "Ritual: ${this.UsesPerDay}, create 3${this.DamageDice} pieces of ammunition for a weapon you have by touching a non-magical weapon. The touched weapon disintegrates.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1},
            {name: "DamageDice", formula: "DamageDice", startValue: 1},
        ]
    },
    {
        text: "Action: ${this.UsesPerDay}, create ${this.DamageDice} pieces of ammunition for a weapon you have by touching a non-magical weapon. The touched weapon disintegrates.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 2},
            {name: "DamageDice", formula: "DamageDice", startValue: 1},
        ]
    },
    {
        text: "Passive: +${this.AttackBonus} to ammunition recovery rolls.",
        components: [
            {name: "AttackBonus", formula: "AttackBonus", startValue: 1},
        ]
    },
    {
        text: "Ritual: Spend a point of ${this.RandomClassResource} to gain a level ${this.SpellLevel} spell slot.",
        components: [
            {name: "RandomClassResource", formula: "RandomClassResource", startValue: 0},
            {name: "SpellLevel", formula: "TextNumber", startValue: 3},
        ]
    },
    {
        text: "Action: Spend a point of ${this.RandomClassResource} to gain a level ${this.SpellLevel} spell slot.",
        components: [
            {name: "RandomClassResource", formula: "RandomClassResource", startValue: 0},
            {name: "SpellLevel", formula: "TextNumber", startValue: 2},
        ]
    },
    {
        text: "Reaction: Spend a point of ${this.RandomClassResource} to gain a level ${this.SpellLevel} spell slot.",
        components: [
            {name: "RandomClassResource", formula: "RandomClassResource", startValue: 0},
            {name: "SpellLevel", formula: "TextNumber", startValue: 1},
        ]
    },
    {
        text: "Free action: ${this.UsesPerDay}, You ${this.SkillBonus} Concentration checks for the duration of the next spell you cast.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 2},
            {name: "SkillBonus", formula: "SkillBonus", startValue: 0},
        ]
    },
    {
        text: "Free action: ${this.UsesPerDay}, You ${this.SkillBonus} Concentration checks for the duration of the next spell you cast.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1},
            {name: "SkillBonus", formula: "SkillBonus", startValue: 1},
        ]
    },
    {
        text: "Reaction: ${this.UsesPerDay}, Reroll a failed Concentration check.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1},
        ]
    },
    {
        text: "Free action: ${this.UsesPerDay}, the next spell you cast does not require both its Somatic and Verbal components.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1},
        ]
    },
    {
        text: "Reaction: ${this.UsesPerDay}, the next spell you cast does not require both its Somatic and Verbal components.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 2},
        ]
    },
    {
        text: "Ritual: ${this.UsesPerDay}, for 1 hour you understand, speak, read and write one language that you have in front of you during the ritual.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1},
        ]
    },
    {
        text: "Free action: ${this.UsesPerDay}, for ${this.NumberIncrement} minutes you can understand, speak, read and write ${this.RandomLanguage}.",
        components: [
            {name: "RandomLanguage", formula: "RandomLanguage", startValue: 1},
            {name: "NumberIncrement", formula: "NumberIncrement", startValue: [0, 10]},
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1},
        ]
    },
    {
        text: "Passive: You can understand and read ${this.RandomLanguage}.",
        components: [
            {name: "RandomLanguage", formula: "RandomLanguage", startValue: 1}
        ]
    },
    {
        text: "Passive: You can understand, read, write and speak ${this.RandomLanguage}.",
        components: [
            {name: "RandomLanguage", formula: "RandomLanguage", startValue: 0}
        ]
    },
    {
        text: "Passive: You can understand and speak ${this.RandomLanguage}.",
        components: [
            {name: "RandomLanguage", formula: "RandomLanguage", startValue: 1}
        ]
    },
    {
        text: "Free action, when you heal a target: ${this.UsesPerDay}, You heal the same amount as the target.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1},
        ]
    },
    {
        text: "Passive: Heal ${this.DamageDice} hit points when casting a spell that heals a target.",
        components: [
            {name: "DamageDice", formula: "DamageDice", startValue: 1}
        ]
    },
    {
        text: "Passive: Heal ${this.DamageDice} hit points when casting a spell on a friendly target.",
        components: [
            {name: "DamageDice", formula: "DamageDice", startValue: 0}
        ]
    },
    {
        text: "Passive: Targets you heal may reroll ${this.DiceMinimum} on dice for healing.",
        components: [
            {name: "DiceMinimum", formula: "DiceMinimum", startValue: 0}
        ]
    },
    {
        text: "Passive: You may reroll ${this.DiceMinimum} on dice for healing, when you are the target.",
        components: [
            {name: "DiceMinimum", formula: "DiceMinimum", startValue: 0}
        ]
    },
    {
        text: "Free action, when you heal a target: ${this.UsesPerDay}, you gain double the temporary hit points that the target healed. These last until your next rest.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1},
        ]
    },
    {
        text: "Passive: Gain ${this.DamageDice} temporary hit points when casting a spell that heals a target. These last until your next rest.",
        components: [
            {name: "DamageDice", formula: "DamageDice", startValue: 1}
        ]
    },
    {
        text: "Free action, when you take the Attack action: ${this.UsesPerDay}, all attack rolls for this action gain a +2 bonus.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1},
        ]
    },
    {
        text: "Passive: +${this.AttackBonus} to ${this.RandomAttackRollType} attack rolls.",
        components: [
            {name: "RandomAttackRollType", formula: "RandomAttackRollType", startValue: 1},
            {name: "AttackBonus", formula: "AttackBonus", startValue: 1}
        ]
    },
    {
        text: "Passive: You ${this.SkillBonus} to ${this.RandomAttackRollType} attack rolls.",
        components: [
            {name: "RandomAttackRollType", formula: "RandomAttackRollType", startValue: 1},
            {name: "SkillBonus", formula: "SkillBonus", startValue: 0}
        ]
    },
    {
        text: "Passive: Creatures under the effect of one of your spells trigger AoO when moving into melee range of you.",
    },
    {
        text: "Passive: You ${this.SkillBonus} saving throws against creatures under the effect of one of your spells.",
        components: [
            {name: "SkillBonus", formula: "SkillBonus", startValue: 0}
        ]
    },
    {
        text: "Passive: +${this.AttackBonus} AC against attacks from creatures under the effect of one of your spells.",
        components: [
            {name: "AttackBonus", formula: "AttackBonus", startValue: 2}
        ]
    },
    {
        text: "Reaction when you cast a spell: ${this.UsesPerDay}, teleport ${this.FeetIncrement} to a point you have seen recently.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 0},
            {name: "FeetIncrement", formula: "FeetIncrement", startValue: [1, 10]}
        ]
    },
    {
        text: "Reaction when you cast a spell: ${this.UsesPerDay}, teleport ${this.FeetIncrement} to a point you have seen recently.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1},
            {name: "FeetIncrement", formula: "FeetIncrement", startValue: [1, 5]}
        ]
    },
    {
        text: "Passive: You can teleport ${this.FeetIncrement} every time you expend a spell slot.",
        components: [
            {name: "FeetIncrement", formula: "FeetIncrement", startValue: [0, 5]}
        ]
    },
    {
        text: "Passive: Creatures already under the effect of one of your spells ${this.SkillPenalty} their Saving throws from spells you cast.",
        components: [
            {name: "SkillPenalty", formula: "SkillPenalty", startValue: 0}
        ]
    },
    {
        text: "Passive: Creatures already under the effect of one of your spells suffer -${this.AttackBonus} AC against spell attack rolls you make against them.",
        components: [
            {name: "AttackBonus", formula: "AttackBonus", startValue: 0}
        ]
    },
    {
        text: "Passive: Regain ${this.TextNumber} hit die at the start of each short rest while attuned to this item.",
        components: [
            {name: "TextNumber", formula: "TextNumber", startValue: 1}
        ]
    },
    {
        text: "Passive: Reroll any spent hit dice once. You must accept the second result.",
    },
    {
        text: "Free action, before rolling Initiative: Once per day, your initiative score is ${this.NumberPlus} for this encounter.",
        components: [
            {name: "NumberPlus", formula: "NumberPlus", startValue: [1, 15]}
        ]
    },
    {
        text: "Free action, after Initiative order has been calculated: ${this.UsesPerDay}, swap initiative count with one other willing player.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1},
        ]
    },
    {
        text: "Passive: +${this.AttackBonus} to your initiative rolls",
        components: [
            {name: "AttackBonus", formula: "AttackBonus", startValue: 0}
        ]
    },
    {
        text: "Free action, when you make an Insight check: ${this.UsesPerDay}, you automatically pass the Insight check, but the target knows that you know.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 0},
        ]
    },
    {
        text: "Free action, when you make an Insight check: ${this.UsesPerDay}, Learn the primary emotion the target is feeling right now. ",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1},
        ]
    },
    {
        text: "Free action, when you make an Insight check: ${this.UsesPerDay}, Learn the target’s name. Fiends must make a DC 10 Charisma saving throw. On a failure you learn their true name. If you learn a true name, the item disintegrates.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 2},
        ]
    },
    {
        text: "Free action when you take the Disengage action: ${this.UsesPerDay}, all your movement this round is considered teleportation.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 0},
        ]
    },
    {
        text: "Bonus action, when you take the Disengage action: ${this.UsesPerDay}, Also take the Dash or Dodge action.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 0},
        ]
    },
    {
        text: "Free action when you take the Disengage action: ${this.UsesPerDay}, You may move through spaces containing creatures.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1},
        ]
    },

]
