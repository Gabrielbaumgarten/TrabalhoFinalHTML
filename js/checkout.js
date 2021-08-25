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