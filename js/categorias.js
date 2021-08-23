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

    if (confirm('Tem certeza que deseja remover a categoria?')) {
        if (controle) {

            httpRequest.open('GET', "http://loja.buiar.com/?key=3Tz81Yftd3C&c=categoria&t=remover&id=" + id + "&f=json", false)
            httpRequest.send()

            window.location.reload()
        } else {
            alert('Não foi possível remover a categoria, pois há produtos dentro dela!')
        }
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

function CarregarPaginaCategorias(){
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
        divCategoria.addEventListener('click', ()=>{MudarPagina('produtos.html?categoria=' + categoria.id)})

        // definição da imagem de fundo
        var divImagem = document.createElement('div')
        divImagem.classList.add('bg-img')

        var imagem = new Image()
        if(categoria.nome.toLowerCase() == 'óculos de sol'){
            imagem.src = '../assets/oculosdesol.png' 
        } else if(categoria.nome.toLowerCase() == 'óculos de grau'){
            imagem.src = '../assets/oculosdegrau.png'
        } else if(categoria.nome.toLowerCase() == 'lentes de contato'){
            imagem.src = '../assets/lentes.png'
        }

        divImagem.appendChild(imagem)

        // Criação do icone
        var icon = new Image()
        if(categoria.nome.toLowerCase() == 'óculos de sol'){
            icon.src = '../assets/icon-oculos-sol.svg'
            icon.alt = 'Óculos de sol' 
        } else if(categoria.nome.toLowerCase() == 'óculos de grau'){
            icon.src = '../assets/icon-oculos-grau.svg'
            icon.alt = 'Óculos de grau'
        } else if(categoria.nome.toLowerCase() == 'lentes de contato'){
            icon.src = '../assets/icon-lentes.svg'
            icon.alt = 'Lentes de Contato'
        }

        // Criação do Título
        var titulo = document.createElement('h1')
        titulo.innerHTML = categoria.nome

        // Criação Sub-título
        var subtitulo = document.createElement('p')
        if(categoria.nome.toLowerCase() == 'óculos de sol'){
            subtitulo.innerHTML = 'Sunglasses'
        }else if(categoria.nome.toLowerCase() == 'óculos de grau'){
            subtitulo.innerHTML = 'Glasses'
        } else if(categoria.nome.toLowerCase() == 'lentes de contato'){
            subtitulo.innerHTML = 'Contact lenses'
        }

        // Criação da descrição
        var divDescricao = document.createElement('div')
        var descricao = document.createElement('p')
        descricao.classList.add('descricao')
        if(categoria.nome.toLowerCase() == 'óculos de sol'){
            descricao.innerHTML = 'Descubra nossas diversas opções de marcas e modelos'
        }else if(categoria.nome.toLowerCase() == 'óculos de grau'){
            descricao.innerHTML = 'Descubra nossas diversas opções de marcas e modelos'
        } else if(categoria.nome.toLowerCase() == 'lentes de contato'){
            descricao.innerHTML = 'Descubra nossas diversas opções de marcas e modelos'
        }


        divDescricao.appendChild(descricao)

        // Criação do botão
        var button = document.createElement('button')
        var text = document.createElement('p')
        text.innerHTML = 'Conhecer'

        const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const iconSvgPath = document.createElementNS('http://www.w3.org/2000/svg','path');
               
        iconSvg.setAttribute('width',"15")
        iconSvg.setAttribute('height',"20")
        iconSvg.setAttribute('viewBox',"0 0 15 20")
        iconSvg.setAttribute('fill',"none")

        iconSvgPath.setAttribute('d','M0.536 19.8857C0.697765 19.9698 0.879391 20.0083 1.06138 19.997C1.24337 19.9858 1.41886 19.9251 1.569 19.8217L14.569 10.8217C14.7018 10.7296 14.8104 10.6068 14.8854 10.4636C14.9603 10.3205 14.9995 10.1613 14.9995 9.99966C14.9995 9.83806 14.9603 9.67886 14.8854 9.53571C14.8104 9.39255 14.7018 9.26969 14.569 9.17766L1.569 0.177663C1.41897 0.0738554 1.24341 0.0130678 1.06131 0.00188176C0.879219 -0.00930423 0.697533 0.0295378 0.53593 0.114202C0.374326 0.198866 0.238963 0.326126 0.144497 0.482203C0.0500308 0.638279 6.15833e-05 0.817225 1.35831e-08 0.999663V18.9997C-3.00674e-05 19.1822 0.0499031 19.3613 0.144387 19.5174C0.238871 19.6736 0.374302 19.801 0.536 19.8857Z')
        iconSvgPath.setAttribute('fill','#736862')

        iconSvg.appendChild(iconSvgPath)

        button.appendChild(text)
        button.appendChild(iconSvg)

        divCategoria.appendChild(divImagem)
        divCategoria.appendChild(icon)
        divCategoria.appendChild(titulo)
        divCategoria.appendChild(subtitulo)
        divCategoria.appendChild(divDescricao)
        divCategoria.appendChild(button)

        document.getElementById('categorias').appendChild(divCategoria)
    })
}