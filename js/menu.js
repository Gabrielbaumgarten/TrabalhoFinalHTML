function montaMenu() {

  var divOver = document.getElementsByClassName('overlay')[0]

  if (!document.body.contains(document.getElementsByClassName('overlay-menu')[0])){
    var divMenu = document.createElement('div')
    divMenu.className = 'overlay-menu'

    var image = new Image()
    image.src = '../assets/icon-close.svg'
    image.className = 'close-button'
    image.addEventListener('click', () => {
      // divOver = document.getElementsByClassName('overlay')[0]
      divOver.style.display = 'none'
    })

    divMenu.appendChild(image)

    var divOpcoes = document.createElement('div')
    divOpcoes.className = 'opcoes-menu'
    
    var div = document.createElement('div')
    var img = new Image()
    img.src = '../assets/icon-home.svg'
    var link = document.createElement('a')
    link.innerText = 'Home'
    link.href = '../paginas/index.html'
    
    div.appendChild(img)
    div.appendChild(link)
    divOpcoes.appendChild(div)

    div = document.createElement('div')
    img = new Image()
    img.src = '../assets/icon-categorias.svg'
    link = document.createElement('a')
    link.innerText = 'Categorias'
    link.href = '../paginas/categorias.html'

    div.appendChild(img)
    div.appendChild(link)
    divOpcoes.appendChild(div)

    div = document.createElement('div')
    img = new Image()
    img.src = '../assets/icon-adm.svg'
    link = document.createElement('a')
    link.innerText = 'Administração'
    link.href = '../paginas/adm-main.html'

    div.appendChild(img)
    div.appendChild(link)
    divOpcoes.appendChild(div)

    divMenu.appendChild(divOpcoes)
    divOver.appendChild(divMenu)

    divOver.style.display = 'flex'
    divOver.style.position = 'fixed'
    divOver.style.marginTop = '-8vh'

  } else {
    divOver.style.display = 'flex'
  }
  
  

}