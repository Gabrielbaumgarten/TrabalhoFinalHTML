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
      divProduto.classList.add('categoria')
      divProduto.setAttribute('id', produto.id)
      
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