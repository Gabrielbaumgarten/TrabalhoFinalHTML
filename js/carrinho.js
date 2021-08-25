function AtualizarCarrinho(){
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

function ListarCarrinho(){
    const httpRequest = new XMLHttpRequest()
    var resposta = ''

    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', 'http://localhost:3000/carrinho', false)
    httpRequest.send()

    var id_itens_adicionados = []

    console.log('carrinho:')
    console.log(resposta)

    resposta.forEach(item =>{
        if(id_itens_adicionados.includes(item.produto_id)){
            console.log('Item já adicionado')
        } else{
            id_itens_adicionados.push(item.produto_id)

            var divProduto = document.createElement('div')
            divProduto.classList.add('produto')

            var imagem = new Image()
            imagem.src = '../assets/' + item.imagem + '/img01.png'

            var nome = document.createElement('h1')
            nome.innerHTML = item.nome
            
            var divQuantidade = document.createElement('div')
            divQuantidade.classList.add('quantidade')

            var iconMinus = new Image()
            iconMinus.src = '../assets/icon-minus.svg'
            iconMinus.addEventListener('click',()=>{DiminuirItem(item.produto_id)})

            var respostaQuantidade =''

            httpRequest.onload = () => {
                respostaQuantidade = JSON.parse(httpRequest.response)
            }
        
            httpRequest.open('GET', 'http://localhost:3000/carrinho?produto_id='+item.produto_id, false)
            httpRequest.send()


            var quantidade = document.createElement('p')
            quantidade.innerHTML = respostaQuantidade.length

            var iconAdd = new Image()
            iconAdd.src = '../assets/icon-add.svg'
            iconAdd.addEventListener('click',()=>{AdicionarMaisItem(item.produto_id)})

            var valor = document.createElement('p')
            valor.innerHTML = 'R$ ' + (item.preco * quantidade.innerHTML) +',00'

            var iconDelete = new Image()
            iconDelete.src = '../assets/icon-remove.svg'
            iconDelete.classList.add('icon-delete')
            iconDelete.addEventListener('click',()=>{RemoverTodosItens(item.produto_id)})

            divQuantidade.appendChild(iconMinus)
            divQuantidade.appendChild(quantidade)
            divQuantidade.appendChild(iconAdd)

            divProduto.appendChild(imagem)
            divProduto.appendChild(nome)
            divProduto.appendChild(divQuantidade)
            divProduto.appendChild(valor)
            divProduto.appendChild(iconDelete)
            // divProduto.appendChild(produtoId)

            var produtoCarrinho = document.getElementById('ProdutosCarrinho')
            produtoCarrinho.appendChild(divProduto)            

        }
    })
}

function SomarCarrinho(){
    const httpRequest = new XMLHttpRequest()
    var resposta = ''

    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', 'http://localhost:3000/carrinho', false)
    httpRequest.send()

    var soma  = 0

    resposta.forEach(item =>{
        soma = soma + parseInt(item.preco)
    })

    document.getElementById('valor_conta').innerHTML = 'R$ ' + soma + ',00'
}

function AdicionarMaisItem(produto_id){
    const httpRequest = new XMLHttpRequest()
    var resposta = ''

    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', 'http://localhost:3000/carrinho?produto_id='+produto_id, false)
    httpRequest.send()

    delete resposta[0].id
    httpRequest.open('POST', 'http://localhost:3000/carrinho', false)
    httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    httpRequest.send(JSON.stringify(resposta[0]))
}

function DiminuirItem(produto_id){
    const httpRequest = new XMLHttpRequest()
    var resposta = ''

    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', 'http://localhost:3000/carrinho?produto_id='+produto_id, false)
    httpRequest.send()

    httpRequest.open('DELETE', 'http://localhost:3000/carrinho/'+resposta[0].id, false)
    httpRequest.send()
}

function RemoverTodosItens(produto_id){
    const httpRequest = new XMLHttpRequest()
    var resposta = ''

    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', 'http://localhost:3000/carrinho?produto_id='+produto_id, false)
    httpRequest.send()

    resposta.forEach( item =>{
        httpRequest.open('DELETE', 'http://localhost:3000/carrinho/'+item.id, false)
        httpRequest.send()
    })
}

function LimparCarrinho(){
    const httpRequest = new XMLHttpRequest()
    var resposta = ''

    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', 'http://localhost:3000/carrinho', false)
    httpRequest.send()

    resposta.forEach( item =>{
        httpRequest.open('DELETE', 'http://localhost:3000/carrinho/'+item.id, false)
        httpRequest.send()
    })
}