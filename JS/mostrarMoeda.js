import FetchHandle from './fetch.js';
import handleElements from './script.js';

export default function mostrarMoedasBTC() {
  const anterior = document.querySelector('.anterior');
  const proximo = document.querySelector('.proximo');
  const barraProgresso = document.querySelector('.progresso');
  const painelMoedaBox = document.querySelector('.painel-moedas-box');
  let counterSlide = 0;
  let windowMatchMedia = window.matchMedia('(max-width:680px)');
  let verificadorShowMoeda = false;

  function fetchValueMostrarMoeda() {
    let fetching = FetchHandle.fetchUrl('https://blockchain.info/ticker');
    fetching.then((arrayCurrencys) => {
      estilizando(arrayCurrencys);
    });
  }

  function estilizando(arrayCurrencys) {
    
    arrayCurrencys.forEach((item, index) => {
      if (verificadorShowMoeda === false) {
        let createMoeda = document.createElement('div');
        handleElements('title', 'value', createMoeda)

        createMoeda.classList.add('moeda');
        painelMoedaBox.appendChild(createMoeda);

        createMoeda.style.left = index * 25 + '%';
        windowMatchMedia.matches
          ? (createMoeda.style.left = index * 100 + '%')
          : (createMoeda.style.left = index * 25 + '%');
        return;
      }

      let allTitles = document.querySelectorAll('.title');
      let allValues = document.querySelectorAll('.value');

      allTitles.forEach((item, index) => {
        item.innerHTML = arrayCurrencys[index][0];
      });
      allValues.forEach((item, index) => {
        item.innerHTML = arrayCurrencys[index][1].sell;
      });
    });

    verificadorShowMoeda = true;
  }

  function slideHandle() {
    let moedas = document.querySelectorAll('.moeda');
    moedas.forEach((item) => {
      item.style.transform = `translateX(-${counterSlide * 100}%)`;
      if (windowMatchMedia.matches) {
        counterSlide > 27
          ? (counterSlide = 27)
          : (barraProgresso.style.width = counterSlide * 3.7 + '%');
      } else {
        counterSlide > 24
          ? (counterSlide = 24)
          : (barraProgresso.style.width = counterSlide * 4.3 + '%');
      }
    });
  }

  function next() {
    counterSlide++;
    slideHandle();
  }

  function previous() {
    counterSlide === 0 ? (counterSlide = 0) : counterSlide--;
    slideHandle();
  }

  fetchValueMostrarMoeda();
  setInterval(fetchValueMostrarMoeda, 500);
  proximo.addEventListener('click', () => {
    next();
  });
  anterior.addEventListener('click', () => {
    previous();
  });
}
