// Função para testar o tamanho da tela
function alterarMensagemDeEntrada() {
    var larguraDaJanela = window.innerWidth

    if(larguraDaJanela<1020){
        document.querySelector('p').innerHTML = 'Clique para jogar'
    }

  }
  
  // Chamar a função quando a página carregar
  window.onload = alterarMensagemDeEntrada;

  document.addEventListener('keypress', (ev)=>{
    if(ev.key === 'Enter')
    window.location.replace("game.html")
})

  document.addEventListener('click', ()=>{
    window.location.replace('game.html')
  })