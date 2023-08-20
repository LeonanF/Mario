
const sonic = document.querySelector('.sonic')
sonic.classList.add('paused')

const monster = document.querySelector('.monster')
monster.classList.add('paused')

const cloud = document.querySelector('.clouds')
cloud.classList.add('paused')

const ring = document.querySelector('.ring')
ring.classList.add('paused')

const contador = document.querySelector('.contador p')
contador.classList.add('paused')

const fp = document.querySelector('.first-page')

const gb = document.querySelector('.game-board')

function runGame() {


    sonic.classList.remove('paused')
    monster.classList.remove('paused')
    cloud.classList.remove('paused')
    ring.classList.remove('paused')
    contador.classList.remove('paused')
  
    let valor = 0
    let contIncre = false
    let teste
    let onAir
    let isDouble
    let onFall
    let sonicHeight = sonic.clientHeight;
  
    //Setter de variáveis CSS
    function setTranslateY(){
      const currentTransform = getComputedStyle(sonic).transform
      const currentTranslateY = getTranslateY(currentTransform)
      const percentTranslateY = (currentTranslateY/sonicHeight)*100
      document.documentElement.style.setProperty('--current-translateY', `${percentTranslateY}%`)
      document.documentElement.style.setProperty('--target-translateY', `${percentTranslateY-180}%`)
    }

    //Funções de pulo
    function jump() {
        if(!sonic.classList.contains('game-over')){
      sonic.classList.add('jump')}
      onAir = true
      setTimeout(() => {
        sonic.classList.remove('jump')
        onAir = false
      }, 700)
    }
    
    //Função de pulo duplo
    function doublejump() {
      setTranslateY()
      sonic.classList.remove('jump')
      sonic.classList.add('doublejump')
      isDouble = true
      setTimeout(() => {
        setTranslateY()
        sonic.classList.add('fall');
        sonic.classList.remove('doublejump')
        isDouble = false;
        setTimeout(() => {
          sonic.classList.remove('fall')
        }, 300)
      }, 500)
    }
  
    let teclaPress = false;

    //Teste se a tecla foi pressionada
    document.addEventListener('keydown', (event) => {
      if ((event.key === 'ArrowUp' || event.key === 'w') && !onAir && !onFall) {
        if(!teclaPress){
        jump()
        teclaPress = true
      }
      }
    })
    
    //Testa se a tecla foi liberada, para não ser possível pular de forma contínua
    document.addEventListener('keyup', ()=>{
      teclaPress = false;
    })


    document.addEventListener('keyup', (event) => {
      if (
        event.key === ' ' &&
        onAir &&
        !isDouble &&
        !sonic.classList.contains('fall')
      ) {
        doublejump()
      }
    })
    
    //Função para colisão com anel
    function checkCollisionRing() {
      const sonicPosition = +window.getComputedStyle(sonic).top.replace('px', '')
      const ringPosition = +window.getComputedStyle(ring).top.replace('px', '')
      const ringLeft = ring.offsetLeft
  
      if (
        sonicPosition >= ringPosition - 80 &&
        sonicPosition <= ringPosition + 80 &&
        ringLeft <= 200 &&
        ringLeft > 0
      ) {
        if (!contIncre) {
            ++valor
            let valorFormatado = valor.toString().padStart(4, '0')
          contador.innerHTML = `${valorFormatado}`
          ring.style.display = 'none'
          contIncre = true
        }
      } else {
        contIncre = false
      }
    }
  

    /*
    const loop = setInterval(() => {
      const monsterPosition = monster.offsetLeft
      const sonicPosition = +window.getComputedStyle(sonic).top.replace('px', '')
      const cloudPosition = cloud.offsetLeft
      const ringPosition = ring.offsetLeft
  
      if ((monsterPosition <= 110 && sonicPosition > 400 && monsterPosition > 0) || (monsterPosition <= 120 && sonicPosition > 430 && monsterPosition > 0)) {
        monster.style.animation = 'none'
        monster.style.left = `${monsterPosition}px`
  
        sonic.classList.add('game-over');

        sonic.style.animation = 'sonic-over 0.5s linear forwards'
        sonic.style.top = `${sonicPosition}px`
  
        cloud.style.animation = 'none'
        cloud.style.left = `${cloudPosition}px`
  
        ring.style.animation = 'ringEnd 0.3s ease forwards'
        setTimeout(() => {
          ring.remove()
        }, 100)
        ring.style.left = `${ringPosition}px`
  
        clearInterval(loop)
        clearInterval(ringReloadInterval)
        document.addEventListener('keyup', (event) => {
          setTimeout(()=>{
            if (event.key === 'ArrowUp') {
            document.location.reload()
          }
        }, 1200)})
        teste = false
      }

      checkCollisionRing()
    }, 10)
    */


    function getRandomInt(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min) + min)
    }
  
    let ringReloadInterval
  
    function startRingReload() {
      clearInterval(ringReloadInterval)
      ringReloadInterval = setInterval(() => {
        ring.style.top = `${getRandomInt(70, `${gb.offsetHeight-100}`)}px`
        ring.style.display = 'block';
      }, getRandomInt(2000, 3000))
    }
    startRingReload()
  
    ring.addEventListener('animationend', () => {
      ring.style.removeProperty('left')
      ring.style.removeProperty('top')
      ring.style.removeProperty('display')
      ring.style.removeProperty('animation');
  
      if (teste) {
        setTimeout(() => {
          ring.style.animation = 'ring-animation 3s linear forwards'
          startRingReload()
        }, 1000)
      }
    })
  }

  if (sonic.classList.contains('paused')) {
    function handleKeyUp(event) {
      if (event.key === 'Enter') {
        fp.remove()
        setTimeout(()=>{
        runGame()
        document.removeEventListener('keyup', handleKeyUp)
        }, 500)
      }
    }
  
    document.addEventListener('keyup', handleKeyUp)
  }

  //Função para atualizar o translateY atual e deixar o doublejump funcional
  function getTranslateY(matrix){
    const matrixValues = matrix.split(', ');
    return parseInt(matrixValues[5], 10);
  }
