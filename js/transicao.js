function startTrasition(){
    var transicao = document.getElementById('transicao')
    var transicao1 = document.getElementById('transicao1')
    var transicao2 = document.getElementById('transicao2')
    var transicao3 = document.getElementById('transicao3')

    transicao.style.display = 'flex'
    transicao1.classList.add('start')
    transicao2.classList.add('start')
    transicao3.classList.add('start')
}