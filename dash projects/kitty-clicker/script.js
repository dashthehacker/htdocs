class SaveManager {
    constructor() {
        this.saveKey = "kittyclickersave";
        this.defaultSave = {
            clicks: 0,
            catName: "Kitty",
            catSkin: "default",
            powerUps: [],
        };
    }

    checkIfSaveExists() {
        if (!localStorage.getItem(this.saveKey)) {
            console.log("No save found, creating new save...");
            this.createSave();
        } else {
            console.log("Save exists.");
        }
    }

    createSave() {
        console.log("Creating default save...");
        localStorage.setItem(this.saveKey, JSON.stringify(this.defaultSave));
    }

    load() {
        const saveData = localStorage.getItem(this.saveKey);
        console.log("Loaded save data:", saveData);
        return saveData ? JSON.parse(saveData) : null;
    }

    update(updatedSave) {
        localStorage.setItem(this.saveKey, JSON.stringify(updatedSave));
    }

    resetSave() {
        this.createSave();
    }
}
const skinDictionary = {
    default: "skins/default.png"
};

function catpng(skin) {
    return skinDictionary[skin] || skinDictionary["default"];
}

function updateclicks(clickercounter, save, saveManager) {
    save.clicks += 1;
    clickercounter.textContent = save.clicks;
    console.log("Updated clicks:", save.clicks);
    saveManager.update(save);
}

function initthegame(cat, gamesaveManager, thecounter) {
    if (gamesaveManager && thecounter) {
        gamesaveManager.checkIfSaveExists();
        let save = gamesaveManager.load();
        console.log("Cat skin to set:", save?.catSkin);
        cat.src = catpng(save?.catSkin);
        thecounter.textContent = save.clicks;
        cat.addEventListener("click", () => updateclicks(thecounter, save, gamesaveManager));
    } else {
        alert("Some error occurred in the DOMContentLoaded game init");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM content loaded");  
    const saveManager = new SaveManager();
    console.log("SaveManager instantiated:", saveManager);  
    saveManager.checkIfSaveExists();
    const save = saveManager.load();
    console.log("Save data:", save);  
    initthegame(document.getElementById('dacat'), saveManager, document.getElementById('dacounter'));
});