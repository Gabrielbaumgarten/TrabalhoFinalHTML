function ListarCategorias(){
    // var form = document.getElementsByClassName('conteudo')
    // form[0].style.display = 'none'

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
        var iconEdit = document.createElement('img')
        iconEdit.setAttribute('src','../assets/icon-edit.svg')
        iconEdit.setAttribute('alt','Editar')
        //iconEdit.setAttribute('onclick','montaAlterarCategoria('+ parametros +')')
        iconEdit.addEventListener('click', function() {
            montaAlterarCategoria(categoria.id, categoria.nome)
         })
        var iconRemove = document.createElement('img')
        iconRemove.setAttribute('src','../assets/icon-remove.svg')
        iconRemove.setAttribute('alt','Remover')
        iconRemove.addEventListener('click',()=>{RemoverCategoria(categoria.id )})

        divButtons.appendChild(iconEdit)
        divButtons.appendChild(iconRemove)

        divCategoria.appendChild(p)
        divCategoria.appendChild(divButtons)

        var divAlterarCategoria = document.createElement('div')
        divAlterarCategoria.setAttribute('id', 'alterar_categoria' + categoria.id)
        divAlterarCategoria.classList.add('conteudo')

        var formulario = document.createElement('div')
        formulario.classList.add('formulario')

        var labelIdCategoria = document.createElement('label')
        labelIdCategoria.setAttribute('for','id_categoria')
        labelIdCategoria.innerHTML = 'Id da Categoria'

        var inputIdCategoria = document.createElement('input')
        inputIdCategoria.setAttribute('type','text')
        inputIdCategoria.setAttribute('id','id_alterar_categoria'+categoria.id)
        inputIdCategoria.setAttribute('readonly','true')
        
        var labelNomeCategoria = document.createElement('label')
        labelNomeCategoria.setAttribute('for','nome_categoria')
        labelNomeCategoria.innerHTML = 'Nome da Categoria'

        var inputNomeCategoria = document.createElement('input')
        inputNomeCategoria.setAttribute('type','text')
        inputNomeCategoria.setAttribute('id','nome_alterar_categoria'+categoria.id)
        
        var button = document.createElement('button')
        button.addEventListener('click', ()=>{AlterarCategoria()})
        button.innerHTML = 'Alterar'

        formulario.appendChild(labelIdCategoria)
        formulario.appendChild(inputIdCategoria)
        formulario.appendChild(labelNomeCategoria)
        formulario.appendChild(inputNomeCategoria)
        formulario.appendChild(button)

        divAlterarCategoria.appendChild(formulario)
        divAlterarCategoria.style.display = 'none'

        var div = document.createElement('div')

        div.appendChild(divCategoria)
        div.appendChild(divAlterarCategoria)
        
    
        var divListarCategorias = document.getElementById('lista-categorias')
        divListarCategorias.appendChild(div)
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

    if(controle && confirm('Tem certeza que deseja remover a categoria?')){
        httpRequest.open('GET', "http://loja.buiar.com/?key=3Tz81Yftd3C&c=categoria&t=remover&id="+ id +"&f=json", false)
        httpRequest.send()

        window.location.reload()
    } else{
        alert('Não foi possível remover a categoria, pois há produtos dentro dela!')
    }
}

function PreencheCategoria(id, nome) {
    var id_categoria = document.getElementById('id_alterar_categoria'+id)
    var nome_categoria = document.getElementById('nome_alterar_categoria'+id)
    id_categoria.value= id
    nome_categoria.value = nome
}

function montaAlterarCategoria(id, nome) {

    var div = document.getElementById('alterar_categoria'+id)

    if(div.style.display == 'none'){
        div.style.display = 'flex'
        div.style.height = 'fit-content'
        PreencheCategoria(id, nome)
    } else{
        div.style.display = 'none'
    }
}

function AlterarCategoria(){
    const httpRequest = new XMLHttpRequest()
    var resposta = ''

    var id = Number(document.getElementById('id_alterar_categoria').value)
    var nome_categoria = document.getElementById('nome_alterar_categoria').value

    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', "http://loja.buiar.com/?key=3Tz81Yftd3C&c=categoria&t=alterar&id="+id+"&nome="+ nome_categoria +"&f=json", false)
    httpRequest.send()


    if(resposta.status == 'OK'){
        alert('Categoria alterada com sucesso')
    }

    window.location.reload()
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