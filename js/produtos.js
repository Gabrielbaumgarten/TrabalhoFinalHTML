function ListarProdutosAdm(){
  const httpRequest = new XMLHttpRequest()
    var resposta = ''

    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', 'http://loja.buiar.com/?key=3Tz81Yftd3C&c=produto&t=listar&f=json', false)
    httpRequest.send()

    resposta.dados.forEach( produto =>{

      var divProduto = document.createElement('div')
      divProduto.classList.add('produto')
      divProduto.setAttribute('id', produto.id)

      var p_id = document.createElement('p')
      
      p_id.innerHTML = produto.id

      var p_categoria = document.createElement('p')
      
      p_categoria.innerHTML = produto.categoria

      var img = new Image()
      img.setAttribute('src', '../assets/' + produto.imagem + '/img01.png')
      
      var p_nome = document.createElement('h1')
      p_nome.innerHTML = produto.nome
      
      var p_codigo = document.createElement('p')
      p_codigo.innerHTML = produto.codigo
      
      var p_preco = document.createElement('p')
      p_preco.innerHTML = 'R$' + produto.preco.split('.')[0] +',' + produto.preco.split('.')[1]


      var divButtons = document.createElement('div')
      divButtons.classList.add('buttons')

      var iconEdit = document.createElement('img')
      iconEdit.setAttribute('src','../assets/icon-edit.svg')
      iconEdit.setAttribute('alt','Editar')
      iconEdit.addEventListener('click',()=>{MontarAlterarProduto(produto.id, produto.categoria, produto.nome, produto.codigo, produto.preco, produto.descricao, produto.imagem, produto.peso)})

      var iconRemove = document.createElement('img')
      iconRemove.setAttribute('src','../assets/icon-remove.svg')
      iconRemove.setAttribute('alt','Remover')
      iconRemove.addEventListener('click',()=>{RemoverProduto(produto.id)})

      divButtons.appendChild(iconEdit)
      divButtons.appendChild(iconRemove)

      divProduto.appendChild(p_id)
      divProduto.appendChild(p_categoria)
      divProduto.appendChild(img)
      divProduto.appendChild(p_nome)
      divProduto.appendChild(p_codigo)
      divProduto.appendChild(p_preco)
      divProduto.appendChild(divButtons)


      var divAlterarProduto = document.createElement('div')
      divAlterarProduto.setAttribute('id', 'alterar_produto' + produto.id)
      divAlterarProduto.classList.add('conteudo')

      var formulario = document.createElement('div')
      formulario.classList.add('formulario')

      var labelIdProduto = document.createElement('label')
      labelIdProduto.setAttribute('for','id_produto')
      labelIdProduto.innerHTML = 'Id do Produto'

      var inputIdProduto = document.createElement('input')
      inputIdProduto.setAttribute('type','text')
      inputIdProduto.setAttribute('id','id_alterar_produto'+produto.id)
      inputIdProduto.setAttribute('disabled','true')
      
      var labelNomeProduto = document.createElement('label')
      labelNomeProduto.setAttribute('for','nome_produto')
      labelNomeProduto.innerHTML = 'Nome do Produto'

      var inputNomeProduto = document.createElement('input')
      inputNomeProduto.setAttribute('type','text')
      inputNomeProduto.setAttribute('id','nome_alterar_produto'+produto.id)

      var labelDescricaoProduto = document.createElement('label')
      labelDescricaoProduto.setAttribute('for','descricao_produto')
      labelDescricaoProduto.innerHTML = 'Descrição do Produto'

      var inputDescricaoProduto = document.createElement('input')
      inputDescricaoProduto.setAttribute('type','text')
      inputDescricaoProduto.setAttribute('id','descricao_alterar_produto'+produto.id)

      var labelImagemProduto = document.createElement('label')
      labelImagemProduto.setAttribute('for','imagem_produto')
      labelImagemProduto.innerHTML = 'Imagem do Produto'

      var inputImagemProduto = document.createElement('input')
      inputImagemProduto.setAttribute('type','text')
      inputImagemProduto.setAttribute('id','imagem_alterar_produto'+produto.id)

      var labelCategoriaProduto = document.createElement('label')
      labelCategoriaProduto.setAttribute('for','categoria_produto')
      labelCategoriaProduto.innerHTML = 'Categoria'

      var dropdown = document.createElement('div')
      dropdown.classList.add('dropdown')

      var buttonDropdown = document.createElement('button')
      buttonDropdown.setAttribute('id','categoria_alterar_produto'+produto.id)
      buttonDropdown.addEventListener('click', ()=>{dropdownFunction(produto.id)})
      buttonDropdown.classList.add('dropbtn')

      var divDropdown = document.createElement('div')
      divDropdown.setAttribute('id','myDropdown'+produto.id)
      divDropdown.classList.add('dropdown-content')

      dropdown.appendChild(buttonDropdown)
      dropdown.appendChild(divDropdown)


      var labelCodigoProduto = document.createElement('label')
      labelCodigoProduto.setAttribute('for','codigo_produto')
      labelCodigoProduto.innerHTML = 'Código do Produto'

      var inputCodigoProduto = document.createElement('input')
      inputCodigoProduto.setAttribute('type','text')
      inputCodigoProduto.setAttribute('id','codigo_alterar_produto'+produto.id)

      var labelPrecoProduto = document.createElement('label')
      labelPrecoProduto.setAttribute('for','preco_produto')
      labelPrecoProduto.innerHTML = 'Preço do Produto'

      var inputPrecoProduto = document.createElement('input')
      inputPrecoProduto.setAttribute('type','text')
      inputPrecoProduto.setAttribute('id','preco_alterar_produto'+produto.id)

      var labelPesoProduto = document.createElement('label')
      labelPesoProduto.setAttribute('for','peso_produto')
      labelPesoProduto.innerHTML = 'Peso do Produto'

      var inputPesoProduto = document.createElement('input')
      inputPesoProduto.setAttribute('type','text')
      inputPesoProduto.setAttribute('id','peso_alterar_produto'+produto.id)
      
      var button = document.createElement('button')
      button.addEventListener('click', ()=>{AlterarProduto(produto.id)})
      button.innerHTML = 'Alterar'

      formulario.appendChild(labelIdProduto)
      formulario.appendChild(inputIdProduto)

      formulario.appendChild(labelCodigoProduto)
      formulario.appendChild(inputCodigoProduto)

      formulario.appendChild(labelCategoriaProduto)
      formulario.appendChild(dropdown)

      formulario.appendChild(labelNomeProduto)
      formulario.appendChild(inputNomeProduto)

      formulario.appendChild(labelDescricaoProduto)
      formulario.appendChild(inputDescricaoProduto)

      formulario.appendChild(labelImagemProduto)
      formulario.appendChild(inputImagemProduto)

      formulario.appendChild(labelPrecoProduto)
      formulario.appendChild(inputPrecoProduto)

      formulario.appendChild(labelPesoProduto)
      formulario.appendChild(inputPesoProduto)

      formulario.appendChild(button)

      divAlterarProduto.appendChild(formulario)
      divAlterarProduto.style.display = 'none'

      var div = document.createElement('div')

      div.appendChild(divProduto)
      div.appendChild(divAlterarProduto)
        
      var divListarProdutos = document.getElementById('lista-produtos')
      divListarProdutos.appendChild(div)

      
      ListarCategoriasDropdown(produto.id)
    })
}

function RemoverProduto(id) {
  const httpRequest = new XMLHttpRequest()
  var resposta = ''


  httpRequest.onload = () => {
      resposta = JSON.parse(httpRequest.response)
  }

  httpRequest.open('GET', "http://loja.buiar.com/?key=3Tz81Yftd3C&c=produto&t=remover&id="+ id +"&f=json", false)
  httpRequest.send()

  if(resposta.status == 'OK'){
    alert('Produto removido com sucesso!')
    window.location.reload()
  } else{
    alert('OPS! Tivermos um problema ao tentar remover seu produto.')
  }
}

function CriarProduto(){
  const httpRequest = new XMLHttpRequest()
    var resposta = ''

    var codigo_produto = document.getElementById('codigo_produto').value
    var nome_produto = document.getElementById('nome_produto').value
    var categoria_produto = document.getElementById('dropdown-button').innerHTML
    var descricao_produto = document.getElementById('descricao_produto').value
    var preco_produto = document.getElementById('preco_produto').value
    var img_produto = document.getElementById('img_produto').value
    var peso_produto = document.getElementById('peso_produto').value



    httpRequest.onload = () => {
      resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', 'http://loja.buiar.com/?key=3Tz81Yftd3C&c=categoria&t=listar&f=json', false)
    httpRequest.send()


    resposta.dados.forEach( categoria =>{
      if(categoria.nome == categoria_produto){
        categoria_produto = categoria.id
      }
    })


    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', "http://loja.buiar.com/?key=3Tz81Yftd3C&c=produto&t=inserir"+
    '&codigo=' + codigo_produto +
    '&categoria=' + categoria_produto +
    '&nome='+ nome_produto +
    '&descricao=' + descricao_produto +
    '&preco=' + preco_produto +
    '&imagem=' + img_produto +
    '&peso=' + peso_produto +
    "&f=json", false)
    httpRequest.send()


    if(resposta.status == 'OK'){
        alert('Produto criado com sucesso')

        window.location.replace('adm-listar-produtos.html')
    }
}

function PreencheProduto(id, categoria, nome, codigo, preco, descricao, imagem, peso) {
  var id_produto = document.getElementById('id_alterar_produto'+id)
  var nome_produto = document.getElementById('nome_alterar_produto'+id)
  var categoria_produto = document.getElementById('categoria_alterar_produto'+id)
  var codigo_produto = document.getElementById('codigo_alterar_produto'+id)
  var preco_produto = document.getElementById('preco_alterar_produto'+id)
  var descricao_produto = document.getElementById('descricao_alterar_produto'+id)
  var imagem_produto = document.getElementById('imagem_alterar_produto'+id)
  var peso_produto = document.getElementById('peso_alterar_produto'+id)
  id_produto.value= id
  nome_produto.value = nome
  categoria_produto.innerHTML = categoria
  codigo_produto.value = codigo
  preco_produto.value = preco
  descricao_produto.value = descricao
  imagem_produto.value = imagem
  peso_produto.value = peso
}

function MontarAlterarProduto(id, categoria, nome, codigo, preco, descricao, imagem, peso) {

  var div = document.getElementById('alterar_produto'+id)

  if(div.style.display == 'none'){
      div.style.display = 'flex'
      div.style.height = 'fit-content'
      PreencheProduto(id, categoria, nome, codigo, preco, descricao, imagem, peso)
  } else{
      div.style.display = 'none'
  }
}

function AlterarProduto(id){
  const httpRequest = new XMLHttpRequest()
    var resposta = ''

    var id_produto = document.getElementById('id_alterar_produto'+id).value
    var codigo_produto = document.getElementById('codigo_alterar_produto'+id).value
    var nome_produto = document.getElementById('nome_alterar_produto'+id).value
    var categoria_produto = document.getElementById('categoria_alterar_produto'+id).innerHTML
    var descricao_produto = document.getElementById('descricao_alterar_produto'+id).value
    var preco_produto = document.getElementById('preco_alterar_produto'+id).value
    var img_produto = document.getElementById('imagem_alterar_produto'+id).value
    var peso_produto = document.getElementById('peso_alterar_produto'+id).value



    httpRequest.onload = () => {
      resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', 'http://loja.buiar.com/?key=3Tz81Yftd3C&c=categoria&t=listar&f=json', false)
    httpRequest.send()


    resposta.dados.forEach( categoria =>{
      if(categoria.nome == categoria_produto){
        categoria_produto = categoria.id
      }
    })


    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', "http://loja.buiar.com/?key=3Tz81Yftd3C&c=produto&t=alterar"+
    '&id=' + parseInt(id_produto) +
    '&codigo=' + codigo_produto +
    '&categoria=' + parseInt(categoria_produto) +
    '&nome='+ nome_produto +
    '&descricao=' + descricao_produto +
    '&preco=' + parseInt(preco_produto )+
    '&imagem=' + img_produto +
    '&peso=' + peso_produto +
    "&f=json", false)
    httpRequest.send()


    if(resposta.status == 'OK'){
        alert('Produto alterado com sucesso')

        window.location.replace('adm-listar-produtos.html')
    }
}

function dropdownFunction(id) {
  document.getElementById("myDropdown"+id).classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function ListarCategoriasDropdown(id){
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

      p.addEventListener('click',()=>{SelecionarCategoria(id, categoria.nome)})

      document.getElementById('myDropdown'+id).appendChild(p)
  })
}

function SelecionarCategoria(id,nome){
  var dropdownButton = document.getElementById('categoria_alterar_produto'+id)
  dropdownButton.innerHTML = nome

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
}

function ListarProdutos(categoria_id){
  const httpRequest = new XMLHttpRequest()
  var resposta = ''

  httpRequest.onload = () => {
      resposta = JSON.parse(httpRequest.response)
  }

  httpRequest.open('GET', 'http://loja.buiar.com/?key=3Tz81Yftd3C&c=produto&t=listar&f=json', false)
  httpRequest.send()
  
  
  resposta.dados.forEach(produto =>{
    if(produto.categoria == parseInt(categoria_id)){
      var divProduto = document.createElement('div')
      divProduto.classList.add('prod1')
      divProduto.setAttribute('draggable','true')
      divProduto.setAttribute('ondragstart', 'Drag(event)')
      divProduto.setAttribute('ondblclick', 'AdicionarNoCarrinhoDoubleClick(event)')
      // divProduto.addEventListener('click', ()=>{MudarPagina('produto.html?categoria='+categoria_id+'&id=' + produto.id)})
  
  
      var divEsquerda = document.createElement('div')
      divEsquerda.classList.add('esquerda')
  
      var divDireita = document.createElement('div')
      divDireita.classList.add('direita')
  
      var id = document.createElement('p')
      id.innerHTML = produto.id
      id.style.display = 'none'
  
      var imagem = new Image()
      imagem.src = '../assets/'+ produto.imagem + '/img01.png'
      imagem.setAttribute('draggable',false)
  
      var preco = document.createElement('p')
      preco.innerHTML = 'R$ ' + produto.preco.split('.')[0] + ',' + produto.preco.split('.')[1]
      preco.classList.add('preco')
  
      var titulo = document.createElement('p')
      titulo.innerHTML = produto.nome
      titulo.classList.add('titulo')
  
      var descricao = document.createElement('p')
      descricao.innerHTML = produto.descricao
      descricao.classList.add('descricao')
  
      divEsquerda.appendChild(imagem)
      divEsquerda.appendChild(preco)
  
      divDireita.appendChild(titulo)
      divDireita.appendChild(descricao)
  
      divProduto.appendChild(divEsquerda)
      divProduto.appendChild(divDireita)
      divProduto.appendChild(id)
  
      var divOpcoesProdutos = document.getElementById('opcoesProdutos')
  
      divOpcoesProdutos.appendChild(divProduto)
    }
  })
}

function AlterarCaminho(categoria_id){
  const httpRequest = new XMLHttpRequest()
  var resposta = ''

  httpRequest.onload = () => {
      resposta = JSON.parse(httpRequest.response)
  }

  httpRequest.open('GET', 'http://loja.buiar.com/?key=3Tz81Yftd3C&c=categoria&t=listar&f=json', false)
  httpRequest.send()

  resposta.dados.forEach( categoria =>{
    if(categoria.id == categoria_id){
      document.getElementById('pagina').innerHTML = categoria.nome
    }
  })
}

function BuscarProduto(produto_id){
  const httpRequest = new XMLHttpRequest()
  var resposta = ''

  httpRequest.onload = () => {
      resposta = JSON.parse(httpRequest.response)
  }

  httpRequest.open('GET', 'http://loja.buiar.com/?key=3Tz81Yftd3C&c=produto&t=listar&f=json&id='+produto_id, false)
  httpRequest.send()

  resposta.dados.forEach( produto =>{
    document.getElementById('produto_id').innerHTML = produto.id
    document.getElementById('produto_titulo').innerHTML = produto.nome
    document.getElementById('produto_descricao').innerHTML = produto.descricao
    document.getElementById('produto_imagem_principal').src = '../assets/' + produto.imagem + '/img01.png'
    document.getElementById('produto_imagem_alternativa_01').src = '../assets/' + produto.imagem + '/img02.png'
    document.getElementById('produto_imagem_alternativa_02').src = '../assets/' + produto.imagem + '/img03.png'
    document.getElementById('produto_imagem_alternativa_03').src = '../assets/' + produto.imagem + '/img04.png'
    document.getElementById('produto_preco').innerHTML ='R$ ' + produto.preco.split('.')[0] + ',' + produto.preco.split('.')[1]
  })
}
