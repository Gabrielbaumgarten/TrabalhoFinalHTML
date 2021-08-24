function ListarCarrinho(){
    const httpRequest = new XMLHttpRequest()
    var resposta = ''

    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', 'http://localhost:3000/carrinho', false)
    httpRequest.send()

    console.log(resposta)

    AlterarIconeCarrinho(resposta.length)
    
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
function BuscarCEP(){
    const httpRequest = new XMLHttpRequest()
    var resposta = ''

    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', 'https://viacep.com.br/ws/' + document.getElementById('cep').value + '/json', false)
    httpRequest.send()

    console.log(resposta)
    console.log(resposta.logradouro)

    var rua = document.getElementById('rua')
    rua.innerText = 'Rua: ' + resposta.logradouro

    var bairro = document.getElementById('bairro')
    bairro.innerText = 'Bairro: ' + resposta.bairro

    var cidade = document.getElementById('cidade')
    cidade.innerText = 'Cidade: ' + resposta.localidade

    var uf = document.getElementById('uf')
    uf.innerText = "UF: " + resposta.uf
} 