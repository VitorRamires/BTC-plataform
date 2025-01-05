import FetchHandle from "./fetch.js";
import handleElements from "./script.js";

export default function conversorMoedaParaBtc() {
  const painelConvesor = document.querySelector(".conversor-painel");
  const BtnConversor = document.querySelector(".botao-converter");
  const conversorInput = document.querySelector("#input-btc");
  let verificadorConversor = false;

  function fetchBTCconversorMoeda() {
    let fetching = FetchHandle.fetchUrl("https://blockchain.info/ticker");
    fetching.then((arrayCurrencys) => {
      converterHandler(arrayCurrencys);
    });

    
    setTimeout(() => {
      window.scroll({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);

    console.log(document.body.scrollHeight)
  }

  function converterHandler(BTC) {
    let BTCvalue = conversorInput.value;
    if (BTCvalue === "" || BTCvalue === "0") {
      alert("Preencha corretamente");
      conversorInput.value = "";
      return;
    }

    BTC.forEach((item, index) => {
      let calculo = Number(BTCvalue * BTC[index][1].sell).toFixed(0);
      if (verificadorConversor === false) {
        let createElement = document.createElement("div");
        let handleReturn = handleElements(
          "title-conversor",
          "value-conversor",
          createElement
        );

        createElement.classList.add(
          "moedaBtc-conversor",
          "showOn",
          "convertido"
        );
        painelConvesor.classList.add("growHeigth");

        painelConvesor.appendChild(createElement);

        handleReturn.createParagraph[0].innerText = BTC[index][0];
        handleReturn.createParagraph[1].innerText = calculo;

        return;
      }

      let novoValor = document.querySelectorAll(".value-conversor");
      novoValor.forEach((item, index) => {
        let novoCalculo = Number(BTCvalue * BTC[index][1].sell).toFixed(0);
        console.log(item);
        item.innerHTML = novoCalculo;
      });
    });

    verificadorConversor = true;
  }

  BtnConversor.addEventListener("click", fetchBTCconversorMoeda);
}
