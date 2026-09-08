
const candidates = [
  { name: "Mini Game", icon: "🎮", votes: 0 },
  { name: "Mini Store", icon: "🛒", votes: 0 },
  { name: "To-Do App", icon: "📝", votes: 0 },
  { name: "Quiz App", icon: "🧠", votes: 0 }
];

let totalVotes = 0;

function vote(index) {
  candidates[index].votes++;
  totalVotes++;

  updateUI();
  showFeedback(`✅ Vote berhasil! Kamu memilih ${candidates[index].icon} ${candidates[index].name}`);
}


function updateUI() {
  document.querySelector("#totalVotes").textContent = totalVotes;


  candidates.forEach((cand, i) => {
    const percent = totalVotes === 0 ? 0 : Math.round((cand.votes / totalVotes) * 100);
    
    document.querySelector(`#votes-${i}`).textContent = `${cand.votes} vote`;
    document.querySelector(`#percent-${i}`).textContent = `${percent}%`;
    document.querySelector(`#bar-${i}`).style.width = `${percent}%`;
  });

  updateLeader();
}


function updateLeader() {
  if (totalVotes === 0) return;

  let leader = candidates[0];
  candidates.forEach(cand => {
    if (cand.votes > leader.votes) {
      leader = cand;
    }
  });

  document.querySelector("#leaderName").textContent = `${leader.icon} ${leader.name}`;
  document.querySelector("#leaderDesc").textContent = `${leader.votes} vote — sementara berada di posisi pertama 🔥`;
}


function showFeedback(msg) {
  document.querySelector("#feedback").textContent = msg;
}


document.querySelector("#resetBtn").addEventListener("click", () => {
  candidates.forEach(cand => cand.votes = 0);
  totalVotes = 0;
  
  document.querySelector("#leaderName").textContent = "Belum ada pemenang";
  document.querySelector("#leaderDesc").textContent = "Belum ada vote yang masuk.";
  showFeedback("Voting telah di-reset.");
  
  updateUI();
});


document.querySelector("#fullscreenBtn").addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});