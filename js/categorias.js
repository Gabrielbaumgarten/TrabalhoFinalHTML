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
        var p = document.createElement('p')
        
        p.innerHTML = categoria.nome
        
        var divButtons = document.createElement('div')
        divButtons.classList.add('buttons')
        var iconEdit = document.createElement('img')
        iconEdit.setAttribute('src','../assets/icon-edit.svg')
        iconEdit.setAttribute('alt','Editar')
        var iconRemove = document.createElement('img')
        iconRemove.setAttribute('src','../assets/icon-remove.svg')
        iconRemove.setAttribute('alt','Remover')

        divButtons.appendChild(iconEdit)
        divButtons.appendChild(iconRemove)

        divCategoria.appendChild(p)
        divCategoria.appendChild(divButtons)
    
        var divListarCategorias = document.getElementById('lista-categorias')
        divListarCategorias.appendChild(divCategoria)
    })
}