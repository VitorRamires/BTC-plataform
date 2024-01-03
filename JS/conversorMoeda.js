const painelConvesor = document.querySelector('.conversor-painel')
const BtnConversor = document.querySelector('.botao-converter')
const conversorInput = document.querySelector('#input-btc')
let verificador = false

function fetchBTCconversorMoeda(){
  fetch('https://blockchain.info/ticker')
  .then(response=>{
    let responseJson = response.json()
    return responseJson
  })
  .then(responseJson => {
    let allCurrencys = responseJson
    return allCurrencys
  })
  .then((allCurrencys) => {
    let arrayCurrencys = Object.entries(allCurrencys)
    converterHandler(arrayCurrencys) 
  })
}

function converterHandler(BTC){
  let BTCvalue = conversorInput.value
    BTC.forEach((item, index)=>{
      let calculo = Number(BTCvalue * BTC[index][1].sell).toFixed(0)
      if((verificador === false )){
        let createElement = document.createElement('p')
        createElement.classList.add('moedaBTC-conversor', 'convertido')
        painelConvesor.appendChild(createElement)
        createElement.innerHTML = BTC[index][0]+": "+ calculo 
      } else {
        let teste = document.querySelectorAll('.convertido')
        teste.forEach((item, index)=>{
          let novoCalculo = BTC[index][0]+": "+ Number(BTCvalue * BTC[index][1].sell).toFixed(1)
          item.innerHTML = novoCalculo
        })
      }
    })
    verificador = true
}




BtnConversor.addEventListener('click',  fetchBTCconversorMoeda)