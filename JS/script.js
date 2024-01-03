const painelMoedasBox = document.querySelector('.painel-moedas-box')
const nextBtn = document.querySelector('.proximo')
const previousBtn = document.querySelector('.anterior')
const moedaTitle = Array.from(document.querySelectorAll('.title'))
const moedaValue = Array.from(document.querySelectorAll('.value'))
const moeda = Array.from(document.querySelectorAll('.moeda'))
const proximo = document.querySelector('.proximo')
const anterior = document.querySelector('.anterior')
let counterSlide = 0

function fetchValue(){
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
    moedaTitle.forEach((item, index)=>{
      item.innerHTML = arrayCurrencys[index][0]
    })
    moedaValue.forEach((item, index)=>{
      item.innerHTML = arrayCurrencys[index][1].sell
    })
  })
}

function estilizando(){
  moeda.forEach((item, index)=>{
    item.style.left = index * 33 + '%'
  })
}

function slideHandle(){
  moeda.forEach(item=>{
    item.style.transform = `translateX(-${counterSlide * 100}%)`
  })
}

function next(){
  counterSlide++
  console.log(counterSlide)
  slideHandle()
}

function previous(){
  counterSlide--
  slideHandle()
}


estilizando()
fetchValue()
setInterval(fetchValue, 500)
proximo.addEventListener('click',()=>{next()})
anterior.addEventListener('click', ()=>{previous()})