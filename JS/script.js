const fetchCurrency = fetch('https://blockchain.info/ticker')
const painelMoedasBox = document.querySelector('.painel-moedas-box')
const nextBtn = document.querySelector('.proximo')
const previousBtn = document.querySelector('.anterior')

fetchCurrency.then(response=>{
  return response.json()
})
.then(responseJson => {
  let allCurrencys = responseJson
  return allCurrencys
})
.then((allCurrencys) => {
    let currencysKeys = Object.entries(allCurrencys)
    let currencys = []
    currencysKeys.forEach((currency, index)=>{
      const createElement = document.createElement('div')
      const title = document.createElement('h3')
      const value = document.createElement('p')

      painelMoedasBox.appendChild(createElement)
      createElement.appendChild(title)
      createElement.appendChild(value) 

      createElement.classList.add('currency')
      title.classList.add('title')
      value.classList.add('value')

      title.innerHTML = currency[0]
      value.innerHTML = currency[1].sell
      createElement.style.left = index * (100/3) + "%"

      currencys.push(createElement)
    })
    return currencys
})
.then(elementosHTML => {
  let sliderCount = 0
  function sliderHandler(){
    elementosHTML.forEach(elemento=>{
      elemento.style.transform = `translateX(-${sliderCount * 100}%)`
    })
  }

  function next(){
    sliderCount++
    sliderHandler()
  }

  function previous(){
    sliderCount--
    sliderHandler()
  }
  
  nextBtn.addEventListener('click', next)
  previousBtn.addEventListener('click', previous)
})

