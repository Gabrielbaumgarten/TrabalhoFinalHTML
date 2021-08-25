function Drag(event){
    event.dataTransfer.setData('id', event.target.children[2].innerHTML)
    // event.dataTransfer.setData('text', event.target.id)
}

function Drop(event){
    event.preventDefault()
    var id = event.dataTransfer.getData('id')

    const httpRequest = new XMLHttpRequest()
    var resposta = ''

    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', 'http://loja.buiar.com/?key=3Tz81Yftd3C&c=produto&t=listar&id="'+id+'"&f=json', false)
    httpRequest.send()

    AdicionarNoCarrinho(resposta.dados[0])

    AlterarIconeCarrinho(NumProdutosCarrinho())
}

function AllowDrop(event){
    event.preventDefault()
}

function AdicionarNoCarrinhoDoubleClick(event){
    var id = event.currentTarget.children[2].innerHTML

    const httpRequest = new XMLHttpRequest()
    var resposta = ''

    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', 'http://loja.buiar.com/?key=3Tz81Yftd3C&c=produto&t=listar&id="'+id+'"&f=json', false)
    httpRequest.send()

    AdicionarNoCarrinho(resposta.dados[0])

    AlterarIconeCarrinho(NumProdutosCarrinho())
}

function AdicionarNoCarrinho(produto){

    var obj = JSON.stringify(produto)
    obj = obj.replace('id','produto_id')

    const httpRequest = new XMLHttpRequest()
    var resposta = ''

    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('POST', 'http://localhost:3000/carrinho', false)
    httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    httpRequest.send(obj)
}

function NumProdutosCarrinho(){
    const httpRequest = new XMLHttpRequest()
    var resposta = ''

    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', 'http://localhost:3000/carrinho', false)
    httpRequest.send()

    return resposta.length
}

function AlterarIconeCarrinho(numProdutos){
    var imagem = document.getElementById('carrinho')
    
    switch(numProdutos){
        case 0:
            imagem.src = '../assets/icon-carrinho-0.svg'
            break
        case 1:
            imagem.src = '../assets/icon-carrinho-1.svg'
            break
        case 2:
            imagem.src = '../assets/icon-carrinho-2.svg'
            break
        case 3:
            imagem.src = '../assets/icon-carrinho-3.svg'
            break
        case 4:
            imagem.src = '../assets/icon-carrinho-4.svg'
            break
        case 5:
            imagem.src = '../assets/icon-carrinho-5.svg'
            break
        case 6:
            imagem.src = '../assets/icon-carrinho-6.svg'
            break
        case 7:
            imagem.src = '../assets/icon-carrinho-7.svg'
            break
        case 8:
            imagem.src = '../assets/icon-carrinho-8.svg'
            break
        case 9:
            imagem.src = '../assets/icon-carrinho-9.svg'
            break
        default:
            imagem.src = '../assets/icon-carrinho-9+.svg'
            break
    }
}

function AdicionarNoCarrinhoClick(){
    var id =document.getElementById('produto_id').innerHTML

    const httpRequest = new XMLHttpRequest()
    var resposta = ''

    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', 'http://loja.buiar.com/?key=3Tz81Yftd3C&c=produto&t=listar&id="'+id+'"&f=json', false)
    httpRequest.send()

    AdicionarNoCarrinho(resposta.dados[0])

    // var numero = NumProdutosCarrinho()
    // AlterarIconeCarrinho(numero)
  }