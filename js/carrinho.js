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

    var rua = document.createElement('p')
    rua.innerText = resposta.logradouro

    var bairro = document.createElement('p')
    bairro.innerText = resposta.bairro
    
    var cidade = document.createElement('p')
    cidade.innerText = resposta.localidade

    var uf = document.createElement('p')
    uf.innerText = resposta.uf

    var divDados = document.getElementById('dados')
    divDados.appendChild(rua)
    divDados.appendChild(bairro)
    divDados.appendChild(cidade)
    divDados.appendChild(uf)

} 