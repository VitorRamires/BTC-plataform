export default function conversorMoedaParaBtc(){

  const painelConvesor = document.querySelector('.conversor-painel')
  const BtnConversor = document.querySelector('.botao-converter')
  const conversorInput = document.querySelector('#input-btc')
  let verificadorConversor = false

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
    if(BTCvalue === '' || BTCvalue === '0'){
      alert('Preencha corretamente')
      conversorInput.value = ''
      return
    } 

    BTC.forEach((item, index)=>{
      let calculo = Number(BTCvalue * BTC[index][1].sell).toFixed(0)
      if((verificadorConversor === false)){
        let createElement = document.createElement('div')
        let title = document.createElement('p')
        let value = document.createElement('p')

        createElement.classList.add('moedaBtc-conversor', 'showOn', 'convertido')
        painelConvesor.classList.add('growWidth')
        title.classList.add('title-conversor')
        value.classList.add('value-conversor')

        painelConvesor.appendChild(createElement)
        createElement.appendChild(title)
        createElement.appendChild(value)

        value.innerHTML = calculo 
        title.innerHTML = BTC[index][0]
        return 
      } 
          
      let novoValor = document.querySelectorAll('.value-conversor')
      novoValor.forEach((item, index)=>{
        let novoCalculo = Number(BTCvalue * BTC[index][1].sell).toFixed(0)
        item.innerHTML = novoCalculo
      })  
    })
    
    verificadorConversor = true
  }

  function scroll(){
    setTimeout(()=>{
      window.scrollTo({
        top:document.body.scrollHeight,
        behavior:"smooth"
      })
    }, 100)
  }

  BtnConversor.addEventListener('click', scroll)
  BtnConversor.addEventListener('click',  fetchBTCconversorMoeda)

}