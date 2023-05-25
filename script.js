
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

sonic.style.setProperty('--top-base', '565px')

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
    let forcedfall
  
    function jump() {
        if(!sonic.classList.contains('game-over')){
      sonic.classList.add('jump')}
      onAir = true
      forcedfall = false;
      setTimeout(() => {
        sonic.classList.remove('jump')
        onAir = false
      }, 700)
    }
  
    function doublejump() {
      sonic.classList.remove('jump')
      sonic.classList.add('doublejump')
      isDouble = true
      if(!forcedfall){
      setTimeout(() => {
        sonic.classList.add('fall');
        sonic.classList.remove('doublejump')
        isDouble = false;
        setTimeout(() => {
          sonic.classList.remove('fall')
        }, 300)
      }, 500)
    }}
  
    function fall() {
      sonic.classList.remove('jump')
      sonic.classList.remove('doublejump')
      sonic.classList.add('forcedfall')
      onFall = true
      setTimeout(() => {
        sonic.classList.remove('forcedfall')
        onFall = false
      }, 150)
    }
  
    let teclaPress = false;

    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowUp' && !onAir && !onFall) {
        if(!teclaPress){
        jump()
        teclaPress = true
      }
      }
    })
  
    document.addEventListener('keyup', (event)=>{
      teclaPress = false;
    })

    document.addEventListener('keyup', (event) => {
      if (
        event.key === ' ' &&
        onAir &&
        !isDouble &&
        !sonic.classList.contains('fall') &&
        !sonic.classList.contains('forcedfall')
      ) {
        doublejump()
      }
    })
  
    document.addEventListener('keyup', (event) => {
      if (
        event.key === 'ArrowDown' &&
        !sonic.classList.contains('game-over') &&
        (sonic.classList.contains('doublejump') || sonic.classList.contains('jump'))
      ) {
        forcedfall=true;
        fall()
      }
    })
  
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
  
    function setTop() {
      const sonicPosition = sonic.offsetTop;
      document.documentElement.style.setProperty('--top-atual', `${sonicPosition-2}px`);
      document.documentElement.style.setProperty('--top-final', `${sonicPosition-10}px`)
      document.documentElement.style.setProperty('--top-meio', `${sonicPosition + 10}px`)
    }

    const loop = setInterval(() => {
      const monsterPosition = monster.offsetLeft
      const sonicPosition = +window.getComputedStyle(sonic).top.replace('px', '')
      const cloudPosition = cloud.offsetLeft
      const ringPosition = ring.offsetLeft
  
      if ((monsterPosition <= 110 && sonicPosition > 400 && monsterPosition > 0) || (monsterPosition <= 120 && sonicPosition > 430 && monsterPosition > 0)) {
        monster.style.animation = 'none'
        monster.style.left = `${monsterPosition}px`
  
        sonic.classList.add('game-over');

        sonic.style.animation = 'sonic-over 0.7s linear forwards'
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
  
      setTop()

      checkCollisionRing()
    }, 10)
  
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
      if (event.key === 'ArrowUp') {
        fp.remove()
        setTimeout(()=>{
        runGame()
        document.removeEventListener('keyup', handleKeyUp)
        }, 500)
      }
    }
  
    document.addEventListener('keyup', handleKeyUp)
  }