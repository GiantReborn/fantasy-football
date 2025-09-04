// fpl-sample.js
// Simple Fantasy Premier League sample in one file

// Define some players
const players = [
  { id: 1, name: "Alisson Becker", pos: "GK" },
  { id: 2, name: "Trent Alexander-Arnold", pos: "DEF" },
  { id: 3, name: "Kevin De Bruyne", pos: "MID" },
  { id: 4, name: "Erling Haaland", pos: "FWD" }
]

// Define a squad (11 normally, but here just 4 for demo)
const squad = [1, 2, 3, 4] // player IDs

// Define events from a match
// type: "minutes", "goal", "assist", "clean_sheet", "yellow", "red"
const events = [
  { player_id: 1, type: "minutes", value: 90 },
  { player_id: 1, type: "clean_sheet" },
  { player_id: 2, type: "minutes", value: 90 },
  { player_id: 2, type: "assist" },
  { player_id: 3, type: "minutes", value: 75 },
  { player_id: 3, type: "goal" },
  { player_id: 4, type: "minutes", value: 90 },
  { player_id: 4, type: "goal" },
  { player_id: 4, type: "goal" }
]

// Simple scoring system
function scoreEvent(event, pos) {
  switch (event.type) {
    case "minutes": return event.value >= 60 ? 2 : 1
    case "goal":
      if (pos === "FWD") return 4
      if (pos === "MID") return 5
      return 6 // DEF or GK
    case "assist": return 3
    case "clean_sheet":
      if (pos === "GK" || pos === "DEF") return 4
      if (pos === "MID") return 1
      return 0
    case "yellow": return -1
    case "red": return -3
    default: return 0
  }
}

// Calculate squad score
function calculateScore(squad, players, events) {
  const points = {}
  for (const pid of squad) points[pid] = 0

  for (const ev of events) {
    if (!points.hasOwnProperty(ev.player_id)) continue
    const player = players.find(p => p.id === ev.player_id)
    points[ev.player_id] += scoreEvent(ev, player.pos)
  }

  let total = 0
  console.log("Points breakdown:")
  for (const pid of squad) {
    const player = players.find(p => p.id === pid)
    console.log(`${player.name} (${player.pos}) -> ${points[pid]} pts`)
    total += points[pid]
  }
  console.log("Total Squad Points:", total)
}

// Run sample
calculateScore(squad, players, events)
