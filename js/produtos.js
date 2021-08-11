function ListarProdutos(){
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

      var link = document.createElement('a')
      link.setAttribute('href','adm-alterar-categoria.html')

      var iconEdit = document.createElement('img')
      iconEdit.setAttribute('src','../assets/icon-edit.svg')
      iconEdit.setAttribute('alt','Editar')

      var iconRemove = document.createElement('img')
      iconRemove.setAttribute('src','../assets/icon-remove.svg')
      iconRemove.setAttribute('alt','Remover')
      iconRemove.setAttribute('onclick','RemoverProduto('+ produto.id +')')

      link.appendChild(iconEdit)
      divButtons.appendChild(link)
      divButtons.appendChild(iconRemove)

      divProduto.appendChild(p_id)
      divProduto.appendChild(p_categoria)
      divProduto.appendChild(img)
      divProduto.appendChild(p_nome)
      divProduto.appendChild(p_codigo)
      divProduto.appendChild(p_preco)
      divProduto.appendChild(divButtons)
  
      var divListarProdutos = document.getElementById('lista-produtos')
      divListarProdutos.appendChild(divProduto)
    })
}

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
        alert('Categoria criada com sucesso')

        window.location.replace('adm-listar-produtos.html')
    }
}