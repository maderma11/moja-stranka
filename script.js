const pozdrav = document.getElementById("pozdrav");
const cas = document.getElementById("cas");
const input = document.getElementById("novaUloha");
const pridatBtn = document.getElementById("pridatBtn");
const zoznam = document.getElementById("zoznam");

// 1) Pozdrav a hodiny
function aktualizujCas() {
  const teraz = new Date();
  const hodina = teraz.getHours();

  if (hodina < 12) pozdrav.textContent = "Dobré ráno!";
  else if (hodina < 18) pozdrav.textContent = "pekne sa nalad!";
  else pozdrav.textContent = "Dobrý večer!";

  cas.textContent = "Čas: " + teraz.toLocaleTimeString("sk-SK");
}
aktualizujCas();
setInterval(aktualizujCas, 1000);

// 2) Zoznam úloh (ukladá sa v prehliadači)
let ulohy = JSON.parse(localStorage.getItem("ulohy")) || [];

function uloz() {
  localStorage.setItem("ulohy", JSON.stringify(ulohy));
}

function vykresli() {
  zoznam.innerHTML = "";
  ulohy.forEach((text, index) => {
    const li = document.createElement("li");
    li.textContent = text;

    const btn = document.createElement("button");
    btn.textContent = "Zmazať";
    btn.addEventListener("click", () => {
      ulohy.splice(index, 1);
      uloz();
      vykresli();
    });

    li.appendChild(btn);
    zoznam.appendChild(li);
  });
}

pridatBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text === "") return;
  ulohy.push(text);
  uloz();
  vykresli();
  input.value = "";
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") pridatBtn.click();
});

vykresli();

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