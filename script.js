const players = [
  { id: 1, name: "Alisson Becker", pos: "GK", points: 6 },
  { id: 2, name: "Trent Alexander-Arnold", pos: "DEF", points: 8 },
  { id: 3, name: "Kevin De Bruyne", pos: "MID", points: 10 },
  { id: 4, name: "Erling Haaland", pos: "FWD", points: 12 }
];

const playerList = document.getElementById("player-list");
const squadList = document.getElementById("squad-list");
const resetBtn = document.getElementById("reset");
const pointsDisplay = document.getElementById("points"); // 👈 add <p id="points"></p> in your HTML

let squad = [];

// Render players
players.forEach(player => {
  const li = document.createElement("li");
  li.textContent = `${player.name} (${player.pos}) - ${player.points} pts`;

  const btn = document.createElement("button");
  btn.textContent = "Add";
  btn.onclick = () => addToSquad(player);

  li.appendChild(btn);
  playerList.appendChild(li);
});

function addToSquad(player) {
  if (!squad.includes(player)) {
    squad.push(player);
    updateSquad();
  } else {
    alert(`${player.name} is already in your squad!`);
  }
}

function removeFromSquad(player) {
  squad = squad.filter(p => p.id !== player.id);
  updateSquad();
}

function updateSquad() {
  squadList.innerHTML = "";
  let totalPoints = 0;

  squad.forEach(player => {
    totalPoints += player.points;

    const li = document.createElement("li");
    li.textContent = `${player.name} (${player.pos}) - ${player.points} pts`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => removeFromSquad(player);

    li.appendChild(removeBtn);
    squadList.appendChild(li);
  });

  pointsDisplay.textContent = `Total Points: ${totalPoints}`;
}

resetBtn.onclick = () => {
  squad = [];
  updateSquad();
};
