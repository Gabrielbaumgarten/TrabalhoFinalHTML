function ListarCategorias(){
    const httpRequest = new XMLHttpRequest()
    var resposta = ''

    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', 'http://loja.buiar.com/?key=3Tz81Yftd3C&c=categoria&t=listar&f=json', false)
    httpRequest.send()

    resposta.dados.forEach( categoria => {

        var divCategoria = document.createElement('div')
        divCategoria.classList.add('categoria')
        divCategoria.setAttribute('id', categoria.id)
        var p = document.createElement('p')
        
        p.innerHTML = categoria.id + '   ' + categoria.nome
        
        var divButtons = document.createElement('div')
        divButtons.classList.add('buttons')
        var link = document.createElement('a')
        link.setAttribute('href','adm-alterar-categoria.html')
        var iconEdit = document.createElement('img')
        iconEdit.setAttribute('src','../assets/icon-edit.svg')
        iconEdit.setAttribute('alt','Editar')
        iconEdit.setAttribute('onclick','PreencherId('+ categoria.id +')')
        var iconRemove = document.createElement('img')
        iconRemove.setAttribute('src','../assets/icon-remove.svg')
        iconRemove.setAttribute('alt','Remover')
        iconRemove.setAttribute('onclick','RemoverCategoria('+ categoria.id +')')

        link.appendChild(iconEdit)
        divButtons.appendChild(link)
        divButtons.appendChild(iconRemove)

        divCategoria.appendChild(p)
        divCategoria.appendChild(divButtons)
    
        var divListarCategorias = document.getElementById('lista-categorias')
        divListarCategorias.appendChild(divCategoria)
    })
}

function CriarCategoria(){
    const httpRequest = new XMLHttpRequest()
    var resposta = ''

    var nome_categoria = document.getElementById('nome_categoria').value

    if(nome_categoria == '') {
        alert('Preencha o nome da categoria!')
        return
    }

    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', "http://loja.buiar.com/?key=3Tz81Yftd3C&c=categoria&t=inserir&nome="+ nome_categoria +"&f=json", false)
    httpRequest.send()


    if(resposta.status == 'OK'){
        alert('Categoria criada com sucesso')
    }
}

function RemoverCategoria(id){
    const httpRequest = new XMLHttpRequest()
    var resposta = ''


    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', "http://loja.buiar.com/?key=3Tz81Yftd3C&c=produto&t=listar&f=json", false)
    httpRequest.send()

    var controle = true

    resposta.dados.forEach( produto =>{
        if(produto.categoria == id){
            controle = false
            return
        }
    })

    if(controle){
        httpRequest.open('GET', "http://loja.buiar.com/?key=3Tz81Yftd3C&c=categoria&t=remover&id="+ id +"&f=json", false)
        httpRequest.send()

        window.location.reload()
    } else{
        alert('Não foi possível remover a categoria, pois há produtos dentro dela!')
    }
}

function AlterarCategoria(){
    const httpRequest = new XMLHttpRequest()
    var resposta = ''

    var nome_categoria = document.getElementById('nome_categoria').value

    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', "http://loja.buiar.com/?key=3Tz81Yftd3C&c=categoria&t=alterar&nome="+ nome_categoria +"&f=json", false)
    httpRequest.send()


    if(resposta.status == 'OK'){
        alert('Categoria criada com sucesso')
    }
}

function PreencherId(id){
    var id_categoria = document.getElementById('id_categoria')
    id_categoria.value = id
}

function ListarCategoriasDropdown(){
    const httpRequest = new XMLHttpRequest()
    var resposta = ''

    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', 'http://loja.buiar.com/?key=3Tz81Yftd3C&c=categoria&t=listar&f=json', false)
    httpRequest.send()

    resposta.dados.forEach( categoria =>{
        var p = document.createElement('p')
        p.innerHTML = categoria.nome

        p.setAttribute('onclick', 'SelecionarCategoria("'+ categoria.nome +'")')
        // p.setAttribute('onclick', "SelecionarCategoria()")

        document.getElementById('myDropdown').appendChild(p)
    })
}

function SelecionarCategoria(nome){
    console.log('Aqui')
    var dropdownButton = document.getElementById('dropdown-button')
    dropdownButton.innerHTML = nome
}