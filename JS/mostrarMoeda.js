 const moedaTitle = Array.from(document.querySelectorAll('.title'))
  const moedaValue = Array.from(document.querySelectorAll('.value'))
  const moeda = Array.from(document.querySelectorAll('.moeda'))
  const proximo = document.querySelector('.proximo')
  const anterior = document.querySelector('.anterior')
  const barraProgresso = document.querySelector('.progresso')
  let counterSlide = 0
  let windowMatchMedia = window.matchMedia("(max-width:680px)")

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
      if(windowMatchMedia.matches){
        item.style.left = index * 100 + '%'
      } else {
        item.style.left = index * 33 + '%'
      }
    })
  }

  function slideHandle(){
    moeda.forEach(item=>{
      item.style.transform = `translateX(-${counterSlide * 100}%)`
      if(windowMatchMedia.matches){
        if(counterSlide > 27){
          item.style.transform = `translateX(-${27 * 100}%)`
        } else {
          item.style.transform = `translateX(-${counterSlide * 100}%)`
          barraProgresso.style.width = counterSlide * 3.7 + '%'
        }
      } else {
        if(counterSlide > 25){
          item.style.transform = `translateX(-${25 * 100}%)`
        } else {
          item.style.transform = `translateX(-${counterSlide * 100}%)`
          barraProgresso.style.width = counterSlide * 4 + '%'
        }
      }
    })
  }

  function next(){
    counterSlide++
    slideHandle()
  }

  function previous(){
    counterSlide--
    barraProgresso.style.width = counterSlide * 10 + '%'
    slideHandle()
  }

  estilizando()
  fetchValue()
  setInterval(fetchValue, 5000)
  proximo.addEventListener('click',()=>{next()})
  anterior.addEventListener('click', ()=>{previous()})

