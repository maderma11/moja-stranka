// 3) Hra: kameň, papier, nožnice
const volby = ["kamen", "papier", "noznice"];
const nazvy = {
  kamen: "🪨 Kameň",
  papier: "📄 Papier",
  noznice: "✂️ Nožnice"
};

let skoreTy = 0;
let skorePc = 0;

const vysledok = document.getElementById("vysledok");
const skoreTyEl = document.getElementById("skoreTy");
const skorePcEl = document.getElementById("skorePc");
const resetBtn = document.getElementById("resetBtn");

document.querySelectorAll(".volba").forEach((tlacidlo) => {
  tlacidlo.addEventListener("click", () => {
    const tvoja = tlacidlo.dataset.volba;
    const pocitac = volby[Math.floor(Math.random() * 3)];
    let text;

    if (tvoja === pocitac) {
      text = "Remíza!";
    } else if (
      (tvoja === "kamen" && pocitac === "noznice") ||
      (tvoja === "papier" && pocitac === "kamen") ||
      (tvoja === "noznice" && pocitac === "papier")
    ) {
      skoreTy++;
      text = "Vyhral si! 🎉";
    } else {
      skorePc++;
      text = "Počítač vyhral 🤖";
    }

    vysledok.textContent =
      "Ty: " + nazvy[tvoja] + " | Počítač: " + nazvy[pocitac] + " → " + text;
    skoreTyEl.textContent = skoreTy;
    skorePcEl.textContent = skorePc;
  });
});

resetBtn.addEventListener("click", () => {
  skoreTy = 0;
  skorePc = 0;
  skoreTyEl.textContent = 0;
  skorePcEl.textContent = 0;
  vysledok.textContent = "Vyber si!";
});