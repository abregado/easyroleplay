import {NpcNames} from "./npc-data.js";
import {NpcProfessions} from "./npc-data.js";
import {NpcEmotions} from "./npc-data.js";
import {NpcBonds} from "./npc-data.js";

class NpcGenerator {

    run = function () {
        let randomIndex = Math.floor(Math.random() * 100) % Object.keys(NpcNames).length;
        let nameCategory = Object.values(NpcNames)[randomIndex];
        randomIndex = Math.floor(Math.random() * 1000) % nameCategory.length;
        let name = nameCategory[randomIndex];
        this.#replaceText("npc-name", name);

        randomIndex = Math.floor(Math.random() * 1000) % NpcProfessions.length;
        let profession = NpcProfessions[randomIndex];
        this.#replaceText("npc-profession", profession);

        randomIndex = Math.floor(Math.random() * 100) % Object.keys(NpcEmotions).length;
        let emotionCategory = Object.values(NpcEmotions)[randomIndex];
        randomIndex = Math.floor(Math.random() * 1000) % emotionCategory.length;
        let emotion = emotionCategory[randomIndex];
        this.#replaceText("npc-quirk", emotion);

        randomIndex = Math.floor(Math.random() * 1000) % NpcBonds.length;
        let bond = NpcBonds[randomIndex];
        this.#replaceText("npc-bond", bond);

    }

    #replaceText(id, text) {
        let el = document.getElementById(id);

        if (!el) {
            alert(`Element with id ${id} not found`);
        }

        el.innerText = text;
    }
}

window.onload = new NpcGenerator().run();