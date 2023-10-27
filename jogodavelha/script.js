var cimaDireita = document.getElementById("cantoDCima"); //Quadrado do canto direito superior
var cimaCentro = document.getElementById("centroCima"); //Quadrado do meio superior
var cimaEsquerda = document.getElementById("cantoECima"); //Quadrado do canto esquerdo superior
var meioDireito = document.getElementById("meioDireito"); //Quadrado do meio direiro
var centro = document.getElementById("meio"); //Quadrado do centro do jogo da velha
var meioEsquerdo = document.getElementById("meioEsquerdo"); //Quadrado do meio esquerdo do jogo da velha
var baixoDireito = document.getElementById("cantoDBaixo"); //Quadrado do canto inferior direito
var baixoCentro = document.getElementById("centroBaixo"); //Quadrado do centro inferior
var baixoEsquerdo = document.getElementById("cantoEBaixo"); //Quadrado do canto inferior esquerdo

//Loop que adiciona um ouvinte de eventos em cada botão 
for (let b = 0; b < 9; b++) {
  document.getElementsByClassName('jogo')[b].addEventListener('click', () => jogadaPrincipal(document.getElementsByClassName('jogo')[b]))
}
document.querySelector('#jogadaatual').innerText = 'O' //Define a vez da primeira jogada para a bola
document.getElementById('jogadaatual').style.color = '#6565ff' //Define a cor correspondente para o azul
var contadorDeJogadas = 0 //número de jogadas(max 9)
var BolaOuX = true; //Variável que define se é bola ou X
var vitoriaX = 0 //Número de vitórias do X
var vitoriaO = 0 //Número de vitórias da bola
document.getElementById('vitoriasO').innerText = vitoriaO //Mostra as vitórias da bola
document.getElementById('vitoriasX').innerText = vitoriaX //Mostra as vitórias do X
var botJoga = true //Permite que o bot jogue assim que for acionado
var contaVitoria = true //Variável que permite ou não se a função de contar vitórias pode ser chamada
function jogadaPrincipal(jogo) {//Função que efetua as jogadas
  contadorDeJogadas++
  if (BolaOuX) {//Checa se é a vez da bola ou do X
    jogo.value = "O";
    jogo.style.color = "#6565ff";
  } else {
    jogo.value = "X";
    jogo.style.color = "#fa645e";
  }
  BolaOuX = !BolaOuX; //Inverte o valor da variável para alternar as jogadas
  BolaOuX ? document.querySelector('#jogadaatual').innerText = 'O' : document.querySelector('#jogadaatual').innerText = 'X' //Checa de quem é a vez e mostra no canto da tela
  BolaOuX ? document.getElementById('jogadaatual').style.color = '#6565ff' : document.getElementById('jogadaatual').style.color = '#fa645e' //Checa de quem é a vez e define a cor correspondente
  //Se o jogo não estiver acabado e a opção de bot estiver ligada então o bot poderá jogar
  if (!fimdeJogo() && document.querySelector('#bot').checked) {
    bot() //Função que chama o bot
  } else if (fimdeJogo()) { //Se o jogo estiver acabado, mesmo se for acionado o bot não vai jogar
    botJoga = false
  }

  return (jogo.disabled = true); //Desabilita o botão clicado
}
//Função de vitória
function vitoria() {
  //Checa se houve vitórias na vertical, horizontal ou diagonal
  if (vitoriaVertical() || vitoriaHorizontal() || vitoriaDiagonal()) {
    !BolaOuX ? document.body.style.backgroundColor = '#6565ff' : document.body.style.backgroundColor = '#fa645e'
    return true;
  }
}
//Função de vitótias verticais
function vitoriaVertical() {
  //Checa se a vitória é possível na linha da direita
  if (meioDireito.value != " ") {
    //Checa se os valores da linha da direita são iguais
    if (cimaDireita.value == meioDireito.value && baixoDireito.value == cimaDireita.value) {
      return true;
    }
  }
  //Checa se a vitória é possível na linha do meio
  if (centro.value != " ") {
    //Checa se os valores da linha do meio são iguais
    if (cimaCentro.value == centro.value && centro.value == baixoCentro.value) {
      return true;
    }
  }
  //Checa se a vitória é possível na linha da esquerda
  if (meioEsquerdo.value != " ") {
    //Checa se os valores da linha da esquerda são iguais
    if (cimaEsquerda.value == meioEsquerdo.value && meioEsquerdo.value == baixoEsquerdo.value) {
      return true
    }
  }
}
//Função de vitórias horizontais
function vitoriaHorizontal() {
  //Checa se a vitória horizontal é possível em cima
  if (cimaCentro.value != " ") {
    //Checa se os valores da linha de cima são iguais
    if (cimaDireita.value === cimaCentro.value && cimaCentro.value === cimaEsquerda.value) {
      return true;
    }
  }
  //Checa se a vitória horizontal é possível no meio
  if (centro.value != " ") {
    //Checa se os valores da linha do meio são iguais
    if (meioDireito.value === centro.value && centro.value === meioEsquerdo.value) {
      return true;
    }
  }
  //Checa se a vitória horizontal é possível em baixo
  if (baixoCentro.value != " ") {
    //Checa se os valores da linha de baixo são iguais
    if (baixoDireito.value === baixoCentro.value && baixoCentro.value === baixoEsquerdo.value) {
      return true;
    }
  }
}
//Função de vitórias diagonais
function vitoriaDiagonal() {
  //Checa se é possível ter uma vitória diagonal
  if (centro.value != " ") {
    //Checa os valores dos quadrados para definir se tem vitória na diagonal
    if (cimaDireita.value == centro.value && centro.value == baixoEsquerdo.value) {
      return true;
    } else if (cimaEsquerda.value == centro.value && centro.value == baixoDireito.value) {
      return true;
    }
  }
}
//Função que checa se ocorreu empate
function empate() {
  //Checa se o número de jogadas chegou a quantidade máxima
  if (contadorDeJogadas === 9) {
    document.body.style.backgroundColor = '#02c091'//Muda a cor de fundo para a cor padrão
    return true
  } else {
    return false
  }
}
//Função de fim de jogo
function fimdeJogo() {
  //Checa se houve vitória
  if (vitoria()) {
    contaVitoria = true //permite que a função de contar vitórias seja chamada
    //Se houver uma vitória o código bloqueia todos as jogadas
    for (let b = 0; b < 9; b++) {
      document.getElementsByClassName("jogo")[b].disabled = true;
    }
    document.getElementById("resultado").innerHTML = `Vitória<br>`; //Vitória
    //Comando que vai mostrar o vencedor
    if (!BolaOuX) { //Se O tiver vencido
      let vencedor = document.createElement('p')//Cria um parágrafo
      vencedor.setAttribute('id', 'vencedor') //Define um id para o parágrafo
      vencedor.innerHTML = 'O' //Mostra que a bola foi o vencedor
      document.querySelector('#resultado').appendChild(vencedor)//atribui parágrafo criado á div de resultado
      document.getElementById('vencedor').style.color = '#6565ff' //Define a cor do parágrafo para azul
    } else { //se X tiver vencido
      let vencedor = document.createElement('p') //Cria um parágrafo
      vencedor.setAttribute('id', 'vencedor') //Define um id para o parágrafo
      vencedor.innerHTML = 'X' //Mostra que o X foi o vencedor
      document.querySelector('#resultado').appendChild(vencedor) //atribui parágrafo criado á div de resultado
      document.getElementById('vencedor').style.color = '#fa645e' //Define a cor do parágrafo para vermelho
    }
    novoJogo() //Chama a função de novo jogo
    return true
    //Checa se houve empate
  } else if (empate()) {
    //Desabilita todas as jogadas
    for (let b = 0; b < 9; b++) {
      document.getElementsByClassName("jogo")[b].disabled = true;
    }
    document.getElementById('resultado').innerHTML = 'Fim de Jogo, <strong>VELHA</strong><br>' //Mostra o motivo do fim do jogo
    novoJogo() //Chama a função de novo jogo
    return true
  }
  return false
}
//Função de novo jogo
function novoJogo() {
  let botao = document.createElement('button') //Cria um botão
  botao.setAttribute('id', 'novoJogo') //Define o id do botão
  botao.textContent = 'Novo Jogo' //Define o texto dentro do botão para 'Novo Jogo'
  document.querySelector('#resultado').appendChild(botao) //Atribui o botão para a div de resultado do jogo
  //Quando o botão criado for clicado
  botao.onclick = function () {
    for (let b = 0; b < 9; b++) {
      document.getElementsByClassName("jogo")[b].disabled = false; //Habilita para que todos os botões sejam clicados novamente
      document.getElementsByClassName('jogo')[b].value = " " //Limpa os quadrados
      contadorDeJogadas = 0 //Define o número de jogadas para 0
    }
    contaVitoria && contadorVitorias() //chama a função de contar vitórias se ocorreu uma vitória
    document.getElementById('resultado').innerHTML = null //Limpa a área de resultados da partida
    botJoga = true //permite que o bot jogue após ser ativado se o botão for clicado
    !BolaOuX && document.querySelector('#bot').checked ? bot() : false//Se a bola ganhou e o bot estiver ativado ele vai jogar logo depois de um novo jogo ser iniciado
  }
}
//Função que conta as vitórias
function contadorVitorias() {
  //Checa quem foi o vencedor
  if (!BolaOuX) {
    vitoriaO++ //Adiciona uma vitória à bola
  } else {
    vitoriaX++ //Adicona uma vitória ao X
  }
  document.getElementById('vitoriasO').innerText = vitoriaO //Mostra a vitória adicionada da bola
  document.getElementById('vitoriasX').innerText = vitoriaX //Mostra a vitória adicionada do X
  contaVitoria = false //define a variável de permissão para false
}
//Função do bot
function bot() {
  let jogadasBot = []//Jogadas do bot
  for (let i = 0; i < 9; i++) { //Passa pelos elementos do jogo da velha
    if (document.getElementsByClassName('jogo')[i].value == " ") {//checa as jogadas que o bot pode fazer
      jogadasBot.push(document.getElementsByClassName('jogo')[i]) //Adiciona a jogada na array se a jogada for válida
    }
  }
  setTimeout(() => { //Adiciona um tempinho só para que o bot não jogue instatâneamente
    if (!BolaOuX) { //o bot só pode jogar quando for X
      const indiceAleatorio = Math.floor(Math.random() * jogadasBot.length); //Escolhe um índice aleatório
      jogadaPrincipal(jogadasBot[indiceAleatorio]) //O índice é usado para selecionar um elemento da array para que o bot possa jogar chamando a função principal de jogada
    }
  }, 200);//Tempo que o bot espera
}
document.querySelector('#bot').addEventListener('click', () => botJoga ? bot() : false) //Se a variável botJoga for igual a true a função do bot poderá ser chamada