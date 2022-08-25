import {NpcNames} from "./npc-data.js";
import {NpcProfessions} from "./npc-data.js";

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