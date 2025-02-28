function fortune() {
    var fortunes = ["AMOUNGUS", "FORTNITE", "IMPOSTER", "ILLEGAL", "DENIED", "TRY AGAIN IN THE NEXT: ETERNITY", "YOU ARE HORRIBLE", "DEATH", "YOU ARE DEAD :)", "YOU ARE GONNA DIE :)", "THE GRIM REAPER IS BEHIND YOU :)", "I SEE YOU", "WELCOME TO THE WILD WEST", "REMEMBER TO BE A HACKER", "ROBLOX", "2D puzzles are horrible"];
    var fortune = fortunes[Math.floor(Math.random()*fortunes.length)];
    document.getElementById('fortune').textContent=fortune;
}