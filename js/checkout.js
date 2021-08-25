function listeners() {

    let cep = document.getElementById('cep-cliente');
    let cpf = document.getElementById('cpf-cliente');
    cep.addEventListener('input', maskCep);
    cpf.addEventListener('input', maskCpf);
    cep.addEventListener('blur', buscarCEP);
    cpf.addEventListener('blur', validaCPF);

}
function maskCpf() {
    this.value = this.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,'\$1.\$2.\$3\-\$4');
}
function maskCep() {
    this.value = this.value.replace(/(\d{2})(\d{3})(\d{3})/g,'\$1.\$2\-\$3');
}

function validaCPF(){
    if (this.value === '') {
        return;
    }
    if (this.value.length !== 14) {
        window.alert('Preencha um CPF válido!');
        this.value = '';
    }

}

function buscarCEP() {
    if (this.value === '') {
        return;
    }

    let numerosCEP = this.value.replace(/\D/g, '');
    if (numerosCEP.length < 8) {
        window.alert('Preencha um CEP válido!');
        this.value = '';
        return;
    }

    const httpRequest = new XMLHttpRequest()
    var resposta = ''

    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', " https://viacep.com.br/ws/"+numerosCEP+"/json", false)
    httpRequest.send()

    if(!("erro" in resposta)){
        document.getElementById('rua-cliente').value = resposta.logradouro;
        document.getElementById('bairro-cliente').value = resposta.bairro;
        document.getElementById('cidade-cliente').value = resposta.localidade;
        document.getElementById('uf-cliente').value = resposta.uf;

    } else{
        window.alert('CEP não encontrado.');
        this.value = '';
    }
}

function RealizarPedido(){
    const httpRequest = new XMLHttpRequest()
    var resposta = ''

    var nome = document.getElementById('nome-cliente').value
    var cpf = document.getElementById('cpf-cliente').value
    cpf = parseInt(cpf.replace('.','').replace('.','').replace('-',''))
    var cep = document.getElementById('cep-cliente').value
    cep = parseInt(cep.replace('.','').replace('-',''))
    var rua = document.getElementById('rua-cliente').value
    var numero = parseInt(document.getElementById('numero-cliente').value)
    var complemento = document.getElementById('comp-cliente').value
    var bairro = document.getElementById('bairro-cliente').value
    var cidade = document.getElementById('cidade-cliente').value
    var estado = document.getElementById('uf-cliente').value


    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', 'http://loja.buiar.com/?key=3Tz81Yftd3C&c=pedido&t=inserir&nome='+nome+'&f=json&cpf='+cpf+'&cep='+cep+'&rua='+rua+'&numero='+numero+'&complemento='+complemento+'&bairro='+bairro+'&cidade='+cidade+'&uf='+estado, false)
    httpRequest.send()

    var pedido_id = resposta.dados.id

    var carrinho = ''

    httpRequest.onload = () => {
        carrinho = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', 'http://localhost:3000/carrinho', false)
    httpRequest.send()

    var produtos_adicionados = []

    carrinho.forEach(item =>{

        if(!produtos_adicionados.includes(item.produto_id)){

            var respostaQuantidade =''
    
            httpRequest.onload = () => {
                respostaQuantidade = JSON.parse(httpRequest.response)
            }
        
            httpRequest.open('GET', 'http://localhost:3000/carrinho?produto_id='+item.produto_id, false)
            httpRequest.send()
    
    
    
            httpRequest.onload = () => {
                carrinho = JSON.parse(httpRequest.response)
            }
        
            httpRequest.open('GET',
             'http://loja.buiar.com/?key=3Tz81Yftd3C&c=item&t=inserir&pedido='+pedido_id+
                '&produto='+item.produto_id+
                '&qtd='+respostaQuantidade.length+
                '&f=json',
                 false)
            httpRequest.send()

            produtos_adicionados.push(item.produto_id)
        }

    })

    alert('Pedido cadastrado com sucesso!\nO numero do seu pedido é '+ pedido_id)
}