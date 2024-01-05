const converterBTN = document.querySelector('.botao-converterMoeda')
const inputValor = document.querySelector('#moedaValor')
const todosValores = document.querySelector('#moedasDisponiveis')
const respostaBTC = document.querySelector('.resposta-BTC')

function fetchMoedaConversorBTC(){
  fetch('https://blockchain.info/ticker')
  .then(response => {
    let dadosJson = response.json()
    return dadosJson
  }) 
  .then(dadosJson => {
    let dadosArray = Object.entries(dadosJson)
    estilizandoValores(dadosArray)
    return dadosArray 
  })
}

function estilizandoValores(dadosArray){
  dadosArray.forEach(simbolo => {
    let createOption = document.createElement("option")
    let moedaSimbolo = simbolo[0]
    
    createOption.getAttribute('value', moedaSimbolo)
    createOption.innerHTML = moedaSimbolo
    todosValores.appendChild(createOption)

    convertendoValores(dadosArray, createOption)
  })
}

function convertendoValores(dadosArray, createOption){
  let valorSelecionado = todosValores.options[todosValores.selectedIndex].value
  dadosArray.forEach((item, index)=>{
    let calculoConversao  = Number(inputValor.value / dadosArray[index][1].sell).toFixed(9)
    if(valorSelecionado === item[0]){
      respostaBTC.innerHTML = calculoConversao
    }
  })
}


fetchMoedaConversorBTC()
converterBTN.addEventListener('click', fetchMoedaConversorBTC)
