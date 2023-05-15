const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const cloud = document.querySelector('.clouds')

jump = ()=>{
    mario.classList.add('jump')

    setTimeout(()=>{
        mario.classList.remove('jump')
    }, 500)
}

const loop = setInterval(()=>{

    const pipePosition = pipe.offsetLeft
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')
    const cloudPosition = cloud.offsetLeft

if(pipePosition<=120 && pipePosition>0 && marioPosition<100){
    pipe.style.animation = 'none'
    pipe.style.left = `${pipePosition}px`

    mario.style.animation = 'none'
    mario.style.bottom = `${marioPosition}px`

    mario.src = './assets/game-over.png'
    mario.style.width = '80px'
    mario.style.marginLeft = '40px'

    cloud.style.animation = 'none'
    cloud.style.left = `${cloudPosition}px`

    clearInterval(loop)

    document.addEventListener('keyup', (Event)=>{
        if(Event.key === 'ArrowUp'){
            document.location.reload(true);
        }
    })
}

}, 10)

document.addEventListener('keyup', (Event)=>{
    if(Event.key === 'ArrowUp'){
        jump()
    }
})