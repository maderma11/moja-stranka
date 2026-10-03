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
setInterval(aktualizujCas, 1000); // opakuj každú sekundu

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