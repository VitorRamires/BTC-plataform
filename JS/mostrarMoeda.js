  export default function mostrarMoedasBTC(){  

    const anterior = document.querySelector('.anterior')
    const proximo = document.querySelector('.proximo')
    const barraProgresso = document.querySelector('.progresso')
    const painelMoedaBox = document.querySelector('.painel-moedas-box')
    let counterSlide = 0
    let windowMatchMedia = window.matchMedia("(max-width:680px)")
    let verificadorShowMoeda = false
    

    function fetchValueMostrarMoeda(){
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
        estilizando(arrayCurrencys)
      })
    }


    function estilizando(arrayCurrencys){
      arrayCurrencys.forEach((item, index)=>{
        if(verificadorShowMoeda === false){
          let createMoeda = document.createElement('div')
          let createTitulo = document.createElement('p')
          let createValor = document.createElement('p')

          createMoeda.classList.add('moeda')
          createTitulo.classList.add('title')
          createValor.classList.add('value')

          painelMoedaBox.appendChild(createMoeda)
          createMoeda.appendChild(createTitulo)
          createMoeda.appendChild(createValor)
    
          createMoeda.style.left = index * 25 + '%'
          windowMatchMedia.matches ? createMoeda.style.left = index * 100 + '%' : createMoeda.style.left = index * 25 + '%'
          return
        }

        let allTitles = document.querySelectorAll('.title')
        let allValues = document.querySelectorAll('.value')

        allTitles.forEach((item, index) => {item.innerHTML = arrayCurrencys[index][0]})
        allValues.forEach((item, index) => {item.innerHTML = arrayCurrencys[index][1].sell})
      })

      verificadorShowMoeda = true
    }
    

    function slideHandle(){
      let moedas = document.querySelectorAll('.moeda')
      moedas.forEach(item=>{
        item.style.transform = `translateX(-${counterSlide * 100}%)`
        if(windowMatchMedia.matches){
          counterSlide > 27 ? counterSlide = 27 : barraProgresso.style.width = counterSlide * 3.7 + '%'
        } else {
          counterSlide > 24 ? counterSlide = 24 : barraProgresso.style.width = counterSlide * 4.3 + '%'
        }
      })
    }

    function next(){
      counterSlide++
      slideHandle()
      console.log(counterSlide)
    }

    function previous(){
      counterSlide === 0 ? counterSlide = 0 : counterSlide--
      slideHandle()
      console.log(counterSlide)
    }

    fetchValueMostrarMoeda()
    setInterval(fetchValueMostrarMoeda, 500)
    proximo.addEventListener('click',()=>{next()})
    anterior.addEventListener('click', ()=>{previous()})
}