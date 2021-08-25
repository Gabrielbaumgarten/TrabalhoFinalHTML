function CarregarPedidos(){
    const httpRequest = new XMLHttpRequest()
    var resposta = ''

    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', 'http://loja.buiar.com/?key=3Tz81Yftd3C&c=pedido&t=listar&f=json', false)
    httpRequest.send()

    resposta.dados.forEach(pedido =>{

        var divExterna = document.createElement('div')

        var divPedido = document.createElement('div')
        divPedido.classList.add('pedido')

        var idPedido = document.createElement('p')
        idPedido.innerHTML = pedido.id

        var data = document.createElement('p')
        // data.innerHTML = pedido.time.split(' ')[0].split('-')[2] + pedido.time.split(' ')[0].split('-')[1] + pedido.time.split(' ')[0].split('-')[0] + ' ' +pedido.time.split(' ')[1]
        data.innerHTML = pedido.time

        var nome = document.createElement('p')
        nome.innerHTML = pedido.nome

        var cpf = document.createElement('p')
        cpf.innerHTML = pedido.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,'\$1.\$2.\$3\-\$4')

        var cep = document.createElement('p')
        cep.innerHTML = pedido.cep.replace(/(\d{2})(\d{3})(\d{3})/g,'\$1.\$2\-\$3')

        var endreco = document.createElement('p')
        endreco.innerHTML = pedido.rua +', '+ pedido.numero +' '+ pedido.complemento

        var bairro = document.createElement('p')
        bairro.innerHTML = pedido.bairro

        var cidade = document.createElement('p')
        cidade.innerHTML = pedido.cidade

        var estado = document.createElement('p')
        estado.innerHTML = pedido.uf

        var iconArrowDown = new Image()
        iconArrowDown.src = '../assets/icon-arrow-down.svg'
        iconArrowDown.addEventListener('click',()=>{AbrirPedidos(pedido.id)})

        var iconRemove = new Image()
        iconRemove.src = '../assets/icon-remove.svg'
        iconRemove.addEventListener('click',()=>{RemoverPedido(pedido.id)})

        divPedido.appendChild(idPedido)
        divPedido.appendChild(data)
        divPedido.appendChild(nome)
        divPedido.appendChild(cpf)
        divPedido.appendChild(cep)
        divPedido.appendChild(endreco)
        divPedido.appendChild(bairro)
        divPedido.appendChild(cidade)
        divPedido.appendChild(estado)
        divPedido.appendChild(iconArrowDown)
        divPedido.appendChild(iconRemove)

        divExterna.appendChild(divPedido)

        // adicionar os produtos
        divExterna.appendChild(ListarItensDoPedido(pedido.id))

        var listaPedidos = document.getElementById('lista-pedidos')
        listaPedidos.appendChild(divExterna)
    })

}

function ListarItensDoPedido(pedido_id){
    const httpRequest = new XMLHttpRequest()
    var resposta = ''

    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', 'http://loja.buiar.com/?key=3Tz81Yftd3C&c=item&t=listar&f=json', false)
    httpRequest.send()

    var divItens = document.createElement('div')
    divItens.setAttribute('id', 'itensPedido'+pedido_id)
    divItens.classList.add('itens')

    resposta.dados.forEach(item =>{
        if(pedido_id == item.pedido){
            var produto = ''
            httpRequest.onload = () => {
                produto = JSON.parse(httpRequest.response)
                produto = produto.dados[0]
            }
        
            httpRequest.open('GET', 'http://loja.buiar.com/?key=3Tz81Yftd3C&c=produto&t=listar&f=json&id='+item.produto, false)
            httpRequest.send()

            var divItem = document.createElement('div')
            divItem.classList.add('item')

            var imagem = new Image()
            imagem.src = '../assets/' + produto.imagem + '/img01.png'

            var nome = document.createElement('p')
            nome.innerHTML = produto.nome

            var quantidade = document.createElement('p')
            quantidade.innerHTML = parseInt(item.qtd)

            var valor = document.createElement('p')
            valor.innerHTML = 'R$ ' + (produto.preco * item.qtd) + ',00'

            divItem.appendChild(imagem)
            divItem.appendChild(nome)
            divItem.appendChild(quantidade)
            divItem.appendChild(valor)

            divItens.appendChild(divItem)
        }
    })

    return divItens
}

function AbrirPedidos(pedido_id){

    var itens = document.getElementById('itensPedido'+pedido_id)
    if(itens.style.height == 0 || itens.style.height == '0px'){
        itens.style.height = 'fit-content'
    } else{
        itens.style.height = '0'
    }

}

function RemoverPedido(pedido_id){
    const httpRequest = new XMLHttpRequest()
    var resposta = ''

    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', 'http://loja.buiar.com/?key=3Tz81Yftd3C&c=pedido&t=remover&f=json&id='+pedido_id, false)
    httpRequest.send()

    RemoverItensDoPedido(pedido_id)

    alert('Pedido removido com sucesso!')
    window.location.reload()
}

function RemoverItensDoPedido(pedido_id){
    const httpRequest = new XMLHttpRequest()
    var resposta = ''

    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', 'http://loja.buiar.com/?key=3Tz81Yftd3C&c=item&t=listar&f=json', false)
    httpRequest.send()

    resposta.dados.forEach( item =>{
        if(item.pedido == pedido_id){
            httpRequest.open('GET', 'http://loja.buiar.com/?key=3Tz81Yftd3C&c=item&t=remover&f=json&id='+item.id, false)
            httpRequest.send()
        }
    })
}