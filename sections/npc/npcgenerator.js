import {NpcNames} from "./npc-data.js";
import {NpcProfessions} from "./npc-data.js";
import {NpcEmotions} from "./npc-data.js";
import {NpcBonds} from "./npc-data.js";

function RandomFromList(list) {
    return list[Math.floor(Math.random() * list.length)];
}
function RandomFromObject(list) {
    const keys = Object.keys(list);
    return list[keys[Math.floor(Math.random() * keys.length)]];
}

/**
 * Handles generation of items
 */
class NpcGenerator {

    /**
     * Method called to build the initial page content
     */
    run = function () {
        this.#insertRandomNpcName();
        this.#insertRandomNpcProfession();
        this.#insertRandomNpcQuirk();
        this.#insertRandomNpcBond();

        this.#addEventListeners();
    }

    #insertRandomNpcName() {
        let randomIndex = Math.floor(Math.random() * 100) % Object.keys(NpcNames).length;
        let nameCategory = Object.values(NpcNames)[randomIndex];
        randomIndex = Math.floor(Math.random() * 1000) % nameCategory.length;
        let name = nameCategory[randomIndex];
        this.#replaceText("npc-name", name);
    }

    #insertRandomNpcProfession() {
        let randomIndex = Math.floor(Math.random() * 1000) % NpcProfessions.length;
        let profession = NpcProfessions[randomIndex];
        this.#replaceText("npc-profession", profession);
    }

    #insertRandomNpcQuirk() {
        let randomIndex = Math.floor(Math.random() * 100) % Object.keys(NpcEmotions).length;
        let emotionCategory = Object.values(NpcEmotions)[randomIndex];
        let speaking = RandomFromList(emotionCategory.speaking);
        let listening = RandomFromList(emotionCategory.listening);

        this.#replaceText("npc-quirk-speaking", speaking);
        this.#replaceText("npc-quirk-listening", listening);
    }

    #insertRandomNpcBond() {
        let randomIndex = Math.floor(Math.random() * 1000) % NpcBonds.length;
        let bond = NpcBonds[randomIndex];
        this.#replaceText("npc-bond", bond);
    }

    #addEventListeners() {
        const btns = document.querySelectorAll('.reRoll-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', function handleClick(event) {
               if ((event.target.id != undefined && event.target.id != 'undefined')
                   && event.target.id.includes('reroll')) {
                   let instance = new NpcGenerator();
                   switch (event.target.id) {
                       case "npc-name-reroll":
                           instance.#insertRandomNpcName();
                           break;
                       case "npc-profession-reroll":
                           instance.#insertRandomNpcProfession();
                           break;
                       case "npc-quirk-reroll":
                           instance.#insertRandomNpcQuirk();
                           break;
                       case "npc-bond-reroll":
                           instance.#insertRandomNpcBond();
                           break;
                   }
               }
            });
        });
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

