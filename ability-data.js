const itemEffects = [
    {
        text: "${this.ActionSpeed}: Spend ${this.ChargeCost}. Change the damage type of ${this.SpellCountOfLevel} from one of the following to another (${this.DamageTypes}) until your next rest ends.",
        components: [
            {name: "ChargeCost", formula: "TextUnits", startValue: [2, "charge"]},
            {name: "SpellCountOfLevel", formula: "SpellCountOfLevel", startValue: [1, 0]},
            {name: "DamageTypes", formula: "DamageTypes", startValue: 1},
            {name: "ActionSpeed", formula: "ActionSpeedIncrease", startValue: 0}
        ]
    },
    {
        text: "Passive: +${this.AttackBonus} to melee attack rolls using this weapon.",
        components: [
            {name: "AttackBonus", formula: "AttackBonus", startValue: 1},
        ]
    },
    {
        text: "Passive: You ${this.SkillBonus} your ${this.RandomSkillCheckType} checks.",
        components: [
            {name: "SkillBonus", formula: "SkillBonus", startValue: 0},
            {name: "RandomSkillCheckType", formula: "RandomSkillCheckType", startValue: []},
        ]
    },
    {
        text: "Free action: Twice per day, You ${this.SkillBonus} your next ${this.RandomSkillCheckType} check.",
        components: [
            {name: "SkillBonus", formula: "SkillBonus", startValue: 1},
            {name: "RandomSkillCheckType", formula: "RandomSkillCheckType", startValue: 0},
        ],
    },
    {
        text: "Free action: Once per day, You ${this.SkillBonus} your next ${this.RandomSkillCheckType} check.",
        components: [
            {name: "SkillBonus", formula: "SkillBonus", startValue: 2},
            {name: "RandomSkillCheckType", formula: "RandomSkillCheckType", startValue: 0},
        ]
    },
    {
        text: "Reaction when you cast a spell: Spend a hit die instead of a level ${this.SpellLevel} spell slot.",
        components: [
            {name: "SpellLevel", formula: "TextNumber", startValue: 1}
        ]
    },
    {
        text: "${this.ActionSpeed}: Spend a hit die to recharge a level ${this.SpellLevel} spell slot.",
        components: [
            {name: "SpellLevel", formula: "TextNumber", startValue: 1},
            {name: "ActionSpeed", formula: "ActionSpeedIncrease", startValue: 1}
        ]
    },
    {
        text: "${this.ActionSpeed}: Spend 4 charges, Spend any number of hit dice to recharge the same number of level one spell slots.",
        components: [
            {name: "ActionSpeed", formula: "ActionSpeedIncrease", startValue: 0}
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
        text: "Reaction when you cast any spell: Roll a number of hit dice equal to the spell level and suffer the damage. The spell is considered one level higher.",
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
        text: "Action: ${this.UsesPerDay}, Upgrade your lowest spell slot by three levels. ",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 0},
        ]
    },
    {
        text: "Action: ${this.UsesPerDay}, Upgrade your lowest spell slot by two levels. ",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 1},
        ]
    },
    {
        text: "Action: ${this.UsesPerDay}, Upgrade a spell slot one level.",
        components: [
            {name: "UsesPerDay", formula: "UsesPerDay", startValue: 2},
        ]
    },
    {
        text: "Reaction when you cast a spell with duration: Once per day, Double the duration.",
    },
    {
        text: "Reaction when you cast a spell with duration: Twice per day, Increase the duration by one minute.",
    },
    {
        text: "Reaction when you cast a spell with duration: Increase the duration by one round.",
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
            {name: "RandomAbility", formula: "RandomAbilityScoreType", startValue: 0},
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
        text: "Reaction: Twice per day, You ${this.SkillBonus} a single saving throw made against effects caused by a ${this.RandomCreatureType} type creature",
        components: [
            {name: "SkillBonus", formula: "SkillBonus", startValue: 2},
            {name: "RandomCreatureType", formula: "RandomCreatureType", startValue: 0},
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
            {name:"ActionSpeed", formula: "ActionSpeedIncrease",startValue: 0}
        ]
    },
    {
        text: "Reaction when wounded by an attack: Spend a charge. Gain temporary hit points equal to your level, after the attack is resolved.",
    },
    {
        text: "Your party is immune to being surprised by a group including at least one ${this.RandomCreatureType} type, once per long rest.",
        components: [
            {name: "RandomCreatureType", formula: "RandomCreatureType", startValue: 0},
        ]
    },
    {
        text: "Your party ${this.PartySkillBonus} on initiative tests against a group including at least one ${this.RandomCreatureType} type, once per long rest.",
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
            {name: "TextUnits", formula: "TextUnits", startValue: [2,"point"]},
            {name: "FeetIncrement", formula: "FeetIncrement", startValue: [2,5]},
        ]
    },
    {
        text: "Reaction: Once per day, immediately remove the ${this.RandomCondition} condition from yourself.",
        components: [
            {name: "RandomCondition",formula: "RandomCondition",startValue: 0}
        ]
    },
    {
        text: "Action: Once per day, immediately remove the ${this.RandomCondition} condition from a willing target within ${this.FeetIncrement}.",
        components: [
            {name: "RandomCondition",formula: "RandomCondition",startValue: 0},
            {name: "FeetIncrement", formula: "FeetIncrement", startValue: [2,5]},
        ]
    },
    {
        text: "Free action, at the end of your turn: Twice per day. You ${this.SkillBonus} a check to remove any condition.",
        components: [
            {name: "SkillBonus", formula: "SkillBonus", startValue: 2}
        ]
    },
    {
        text: "Reaction, at the start of your turn: Remove the ${this.RandomCondition} condition. Your speed is zero until the end of your next turn.",
        components: [
            {name: "RandomCondition",formula: "RandomCondition",startValue: 1}
        ]
    },
    {
        text: "Action: Once per day, Roll any number of hit die. Heal the amount rolled.",
    },
    {
        text: "Free action: Twice per day, the next hit die spent rolls maximum.",
    },
    {
        text: "Passive: You may reroll ${this.DiceMinimum} when you roll a hit die.",
        components: [
            {name:"DiceMinimum", formula: "DiceMinimum",startValue: 0}
        ]
    },
    {
        text: "Action: Gain ${this.AttackBonus} bonus on your next spell attack roll.",
        components: [
            {name:"AttackBonus", formula: "AttackBonus",startValue: 3}
        ]
    },
    {
        text: "Action: Gain ${this.DamageDice} bonus damage on your next spell attack roll. If you miss, this action is wasted.",
        components: [
            {name:"DamageDice", formula: "DamageDice",startValue: 3}
        ]
    },
    {
        text: "Bonus action: Gain ${this.AttackBonus} bonus on your next spell attack roll.",
        components: [
            {name:"AttackBonus", formula: "AttackBonus",startValue: 2}
        ]
    },
    {
        text: "Passive: Choose a spell you know when you attune to the item. Gain a +${this.AttackBonus} bonus when casting that spell.",
        components: [
            {name:"AttackBonus", formula: "AttackBonus",startValue: 1}
        ]
    },
    {
        text: "Passive: Immunity to travel penalties from one environment type.",
    },
    {
        text: "Passive: Resistance to one elemental environmental damage.",
    },
    {
        text: "Action: Double the range of the next spell cast.",
    },
    {
        text: "Bonus Action: Increase the next ranged spell cast by 15ft.",
    },
    {
        text: "Reaction: Increase the next ranged spell attack cast by ${this.FeetIncrement}.",
        components: [
            {name: "FeetIncrement", formula: "FeetIncrement", startValue: [0,5]},
        ]
    },
    {
        text: "Ritual: Spend 4 charges. Change the damage type of one spell to another damage type of the same level until your next rest.",
    },
    {
        text: "Action: Spend 2 charges. Change the damage type of one level 1 spell to another damage type of the same level.",
    },
    {
        text: "Reaction: Change the damage type of one cantrip to another damage type of the same level.",
    },
    {
        text: "Ritual: Twice per day, gain Darkvision (${this.FeetIncrement}) for 1 hour.",
        components: [
            {name: "FeetIncrement", formula: "FeetIncrement", startValue: [2,20]},
        ]
    },
    {
        text: "Bonus Action: Four times per day. Gain Darkvision (${this.FeetIncrement}) for 10 minutes.",
        components: [
            {name: "FeetIncrement", formula: "FeetIncrement", startValue: [2,10]},
        ]
    },
    {
        text: "Passive: Gain Darkvision (${this.FeetIncrement})",
        components: [
            {name: "FeetIncrement", formula: "FeetIncrement", startValue: [2,5]},
        ]
    },
    {
        text: "Action: Spend 4 charges. Grant an ally within 5ft level 3 bonus on the next saving throw they make.",
    },
    {
        text: "Reaction: Spend a charge. Grant an ally within 5ft level 2 bonus on a saving throw.",
    },
    {
        text: "Reaction: Grant an ally within 5ft level 1 bonus on a saving throw.",
    },
    {
        text: "Stores three cantrips. Spend 2 charges to cast any of them.",
    },
    {
        text: "Stores 2 cantrips. Spend 1 charge to cast any of them.",
    },
    {
        text: "Stores 1 cantrip. Costs nothing to cast.",
    },
    {
        text: "Stores one level two spell. Drains as soon as you cast a spell. Only Attuned can store and cast.",
    },
    {
        text: "Stores one level 1 spell. Drains at the start of any long rest. Anyone can store. Attuned can cast as if they were the storer.",
    },
    {
        text: "Stores up to 4 cantrip uses. Drains at the start of any long rest. Anyone can store. Attuned can cast as if they were the storer.",
    },
    {
        text: "Reaction when hit by an attack: Spend 4 charges. Cast any spell that uses an action. You gain a level 2 condition until the end of your next turn.",
    },
    {
        text: "Reaction when hit by an attack: Spend 2 charges. Cast an instantaneous level 1 spell that uses a Bonus action, and does not require concentration.",
    },
    {
        text: "Reaction when hit by an attack: Cast a cantrip that can target your attacker. Cantrip chosen when attuning.",
    },
    {
        text: "Reaction, when you roll a Stealth check: Spend 4 charges. Maximise the result. Gain a level 2 condition",
    },
    {
        text: "Reaction, when you roll a Stealth check: Spend 2 charges. Reroll the result. Gain a level 1 condition.",
    },
    {
        text: "Reaction, when you roll a Stealth check: Gain a level 2 condition and reroll the result.",
    },
    {
        text: "Ritual: Create 3x level 2 dice pieces of ammunition for a weapon you have by touching a non-magical weapon. The touched weapon disintegrates.",
    },
    {
        text: "Action: Create level 2 dice of ammunition for a weapon you have by touching a non-magical weapon. The touched weapon disintegrates.",
    },
    {
        text: "Passive: +2 to ammunition recovery rolls.",
    },
    {
        text: "Ritual: Spend your [class resource/Channel Divinity] to gain a level 3 spell slot.",
    },
    {
        text: "Action: Spend your [class resource/Channel Divinity] to gain a level 2 spell slot.",
    },
    {
        text: "Free action: Spend your [class resource/Channel Divinity] to gain a level 1 spell slot.",
    },
    {
        text: "Free action: Spend 4 charges. Gain level 3 bonus on Concentration checks for the duration of the next spell you cast.",
    },
    {
        text: "Reaction: Spend two charges. Reroll a failed Concentration check.",
    },
    {
        text: "Reaction: Spend a charge. Level 2 bonus on a Concentration check you are about to make. ",
    },
    {
        text: "Free action: Spend 4 charges. The next spell you cast does not require both its Somatic and Verbal components. It is also completely undetectable.",
    },
    {
        text: "Reaction: Spend a charge. The next spell you cast does not require one of its Somatic or Verbal components.",
    },
    {
        text: "Free action: Spend two charges. The next spell you cast does not require one of its Somatic or Verbal components.",
    },
    {
        text: "Ritual: Spend 4 charges. For 1 hour you understand, speak, read and write one language that you have in front of you during the ritual.",
    },
    {
        text: "Free action: Spend a charge. For 10 minutes you can understand, speak, read and write one language you did not know before. ",
    },
    {
        text: "Passive: You can understand and read one language you did not know before.",
    },
    {
        text: "Free action, when you heal a target: Spend 4 charges. You heal the same amount as the target.",
    },
    {
        text: "Passive: Level 2 damage healed when casting a spell that heals a target.",
    },
    {
        text: "Passive: Level 1 damage healed when casting a spell on a friendly target..",
    },
    {
        text: "Free action, when you heal a target: Spend 4 charges. You gain double the temporary hit points that the target healed. These last until your next rest.",
    },
    {
        text: "Passive: Level 3 damage temporary hit points when casting a spell that heals a target. These last until your next rest.",
    },
    {
        text: "Passive: Level 2 damage temporary hit points gained when casting a spell on a friendly target. These last until your next rest.",
    },
    {
        text: "Free action, when you take the Attack action: Spend 2 charges. All attack rolls gain a +2 bonus.",
    },
    {
        text: "Passive: +1 to [spell,melee,ranged] attack rolls when held.",
    },
    {
        text: "Passive: Level 1 bonus to [spell,melee,ranged] attack rolls when held.",
    },
    {
        text: "Passive: creatures under the effect of one of your spells trigger AoO when moving into melee range of you.",
    },
    {
        text: "Passive: Level 3 save bonus on saving throws against creatures under the effect of one of your spells.",
    },
    {
        text: "Passive: +2 AC against attacks from creatures under the effect of one of your spells.",
    },
    {
        text: "Reaction when you cast a spell: Spend 4 charges. Teleport 20ft to a point you have seen recently.",
    },
    {
        text: "Reaction when you cast a spell: Spend 2 charges. Teleport 10ft to a point you can see.",
    },
    {
        text: "Passive: You can teleport 5ft every time you expend a spell slot.",
    },
    {
        text: "Passive: Creatures already under the effect of one of your spells cannot move out of your threat range without using the disengage action.",
    },
    {
        text: "Passive: Creatures already under the effect of one of your spells suffer a level 2 penalty to their Saving throws from spells you cast.",
    },
    {
        text: "Passive: Creatures already under the effect of one of your spells suffer a level 2 penalty to their AC when you attack them.",
    },
    {
        text: "Passive: Regain one charge or one hit die during a short rest while attuned to this item.",
    },
    {
        text: "Passive: Reroll any spent hit dice once.",
    },
    {
        text: "Free action, before rolling Initiative: Spend 2 charges. Your initiative score is 18 + item level.",
    },
    {
        text: "Free action, after Initiative order has been calculated: Swap initiative count with one other willing player.",
    },
    {
        text: "Passive: +1 to initiative rolls",
    },
    {
        text: "Ritual: Transfer as many charges from this item to other items, 1-to-1.",
    },
    {
        text: "Action: Spend two charges. Another item you can touch recharges 1 charge.",
    },
    {
        text: "Passive: While attuned to this item, your other items have their max charge increased by 1.",
    },
    {
        text: "Free action, when you make an Insight check: Spend 2 charges. You automatically pass the Insight check, but the target knows that you know.",
    },
    {
        text: "Free action, when you make an Insight check: Spend 2 charges. Learn the primary emotion the target is feeling right now. ",
    },
    {
        text: "Free action, when you make an Insight check: Spend 1 charge. Learn the target’s name. Fiends must make a DC 10 Charisma saving throw. On a failure you learn their true name. If you learn a true name, the item disintegrates.",
    },
    {
        text: "Free action when you take the Disengage action: Spend 4 charges. All your movement this round is considered teleportation.",
    },
    {
        text: "Bonus action, when you take the Disengage action: Spend a charge. Also take the Dash or Dodge action.",
    },
    {
        text: "Passive: when you take the Disengage action: You may move through spaces containing creatures.",
    },

]
