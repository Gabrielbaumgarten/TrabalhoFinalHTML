function Drag(event){
    event.dataTransfer.setData('text', event.target.id)
}

function Drop(event){
    event.preventDefault()
    var data = event.dataTransfer.getData('text')

    AdicionarNoCarrinho()

    console.log('drop')
    var imagem = document.getElementById('carrinho')
    imagem.src = '../assets/icon-carrinho-1.svg'
}

function AllowDrop(event){
    event.preventDefault()
}

function AdicionarNoCarrinho(){

    obj = '{"nome": "Drop"}'

    const httpRequest = new XMLHttpRequest()
    var resposta = ''

    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('POST', 'http://localhost:3000/carrinho', false)
    httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    httpRequest.send(obj)
}