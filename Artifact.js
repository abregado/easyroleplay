import {ItemEffect} from "./ItemEffect.js";

class Artifact {
    effects = []
    unselectedEffectData = []

    constructor(effectDataList, level) {
        this.unselectedEffectData = Array.from(effectDataList);

        this.AddEffect()

        for (let i = 1; i < level; i++) {
            this.AddLevel()
        }

        console.log(`item length is ${this.effects.length}`);
    }

    AddEffect() {
        const randomIndex = Math.floor(Math.random() * this.unselectedEffectData.length);
        this.effects.push(new ItemEffect(this.unselectedEffectData[randomIndex]));
        this.unselectedEffectData.splice(randomIndex, 1);
    }

    AddLevel() {
        const randRoll = Math.random() * 2;
        if (randRoll > this.effects.length) {
            this.AddEffect()
        } else {
            this.LevelUpAllEffects()
        }
    }

    LevelUpAllEffects() {
        let extraLevels = 0

        this.effects.forEach(effect => {
            if (effect.CanLevelUp()) {
                effect.LevelUp()
            } else {
                extraLevels++;
            }
        })

        for (let i = 0; i < extraLevels; i++) {
            const levellables = this.effects.filter(effect => effect.CanLevelUp())
            if (levellables.length > 0) {
                levellables[Math.floor(Math.random() * levellables.length)].LevelUp();
            }
        }
    }
}

export {Artifact}
