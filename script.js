const sonic = document.querySelector('.sonic');
const monster = document.querySelector('.monster');
const cloud = document.querySelector('.clouds');
const ring = document.querySelector('.ring');
const contador = document.querySelector('.contador')

let valor = 0;
let contIncre = false;
let teste;
let onAir;
let isDouble;
let onFall;

jump = () => {
    sonic.classList.add('jump');
    onAir = true;
    setTimeout(() => {
        sonic.classList.remove('jump');
        onAir=false;
    }, 800);
}

doublejump = () =>{
    sonic.classList.remove('jump')
    sonic.classList.add('doublejump')
    isDouble = true;
    setTimeout(() => {
        sonic.classList.add('fall')
    sonic.classList.remove('doublejump')
    isDouble = false;
        setTimeout(() => {
            sonic.classList.remove('fall')
        }, 400)
    }, 400)
}

fall = () =>{
    sonic.classList.remove('jump')
    sonic.classList.remove('doublejump')
    sonic.classList.add('forcedfall')
    onFall = true;
    setTimeout(() => {
        sonic.classList.remove('forcedfall')
        onFall=false;
    }, 300);
}

document.addEventListener('keyup', (Event) => {
    if (Event.key === 'ArrowUp' && !onAir && !onFall) {
        jump();
    }
})

document.addEventListener('keyup', (Event)=>{

    if(Event.key === ' '&&onAir && !isDouble && !sonic.classList.contains('fall') && !sonic.classList.contains('forcedfall')){
        doublejump();
    }
})

document.addEventListener('keyup', (Event) => { 


    if (Event.key === 'ArrowDown' && !sonic.classList.contains('game-over') && (sonic.classList.contains('doublejump') || sonic.classList.contains('jump'))) {
        fall();
    }
})


function checkCollision() {
    const sonicPosition = +window.getComputedStyle(sonic).top.replace('px','')
    const ringPosition = +window.getComputedStyle(ring).top.replace('px', '')
    const ringLeft = ring.offsetLeft;


    if(sonicPosition>=ringPosition-80 && sonicPosition<=ringPosition+80 && ringLeft<=200 && ringLeft>0){
        if (!contIncre) {
            contador.innerHTML = `${++valor}`;
            ring.style.display = 'none'
            contIncre = true; // Marcando que o contador foi incrementado
          }
        } else {
          contIncre = false; // Resete a variável de controle quando não houver colisão
        }
    }

function setTop(){
    const sonicPosition = sonic.offsetTop
    sonic.style.setProperty('--top-atual', `${sonicPosition-2}px`)    
    sonic.style.setProperty('--top-final', `${sonicPosition-5}px`)
    sonic.style.setProperty('--top-meio', `${sonicPosition-120}px`)
}

const loop = setInterval(() => {
    const monsterPosition = monster.offsetLeft;
    const sonicPosition = +window.getComputedStyle(sonic).top.replace('px', '');
    const cloudPosition = cloud.offsetLeft;
    const ringPosition = ring.offsetLeft;

    if (monsterPosition <= 170 && monsterPosition > 0 && sonicPosition > 150) {
        monster.style.animation = 'none';
        monster.style.left = `${monsterPosition}px`;

        sonic.classList.add('game-over');

        sonic.style.animation = 'sonic-over 0.7s linear forwards';
        sonic.style.top = `${sonicPosition}px`;

        cloud.style.animation = 'none';
        cloud.style.left = `${cloudPosition}px`;

        ring.style.animation = 'ringEnd 0.3s ease forwards';
        setTimeout(()=>{
            ring.remove();
        },100)
        ring.style.left = `${ringPosition}px`;

        clearInterval(loop);
        clearInterval(ringReloadInterval);
        document.addEventListener('keyup', (Event) => {
            if (Event.key === 'ArrowUp') {
                document.location.reload(true);
            }
        });
        teste=false;
    }

    setTop();

     checkCollision();

}, 10);



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

let ringReloadInterval;

function startRingReload() {
    clearInterval(ringReloadInterval); // Limpa o intervalo anterior, se existir
    ringReloadInterval = setInterval(() => {
        ring.style.top = `${getRandomInt(0, 350)}px`;
        ring.style.display = 'block';
    }, 2000);
}
startRingReload();

ring.addEventListener('animationend', () => {
    ring.style.removeProperty('left'); // Remove a propriedade 'left'
    ring.style.removeProperty('top'); // Remove a propriedade 'top'
    ring.style.removeProperty('display'); // Remove a propriedade 'display'
    ring.style.removeProperty('animation')
 
 if(teste){
    setTimeout(() => {
        ring.style.animation = 'ring-animation 3s linear forwards'; // Inicia novamente a animação do anel
        startRingReload(); // Reinicia o intervalo para exibir o próximo anel
    }, 500); // Aguarda 100ms antes de reiniciar a animação para evitar problemas de renderização
}
})