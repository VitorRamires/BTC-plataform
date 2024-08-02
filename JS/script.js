import conversorBtcParaMoeda from './btcMoedaConversor.js';
import mostrarMoedasBTC from './mostrarMoeda.js';
import conversorMoedaParaBtc from './moedaBtcConversor.js';

conversorBtcParaMoeda();
mostrarMoedasBTC();
conversorMoedaParaBtc();

export default function handleElements(title, value, mainElement) {
  let paragraphs = [title, value];

  let createParagraph = paragraphs.map((name) => {
    let newParagraphs = document.createElement('p');
    newParagraphs.classList.add(name);
    return newParagraphs;
  });

  createParagraph.forEach((item) => {
    mainElement.appendChild(item);
  });

  return {createParagraph, paragraphs}
}
