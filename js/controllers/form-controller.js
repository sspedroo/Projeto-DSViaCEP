//modulo/componente responsavel por tratar eventos do usuario


function State(){ //função que vai servir para instanciar um objeto, guardar informações relevantes do modulo
    this.btnSave = null;
    this.btnClear = null;

    this.inputCep = null;
    this.inputStreet = null;
    this.inputNumber = null;
    this.inputCity =  null;
    
    this.errorCep = null;
    this.errorNumber = null;
}

const state = new State();

export function init(){
    state.inputCep = document.forms.newAddress.cep;  //acessando o formulario utilizando o nome do formulario e logo dps o nome do campo CEP
    state.inputStreet = document.forms.newAddress.street; //nomes do atributo name
    state.inputNumber = document.forms.newAddress.number;
    state.inputCity = document.forms.newAddress.cidade;

    state.btnSave = document.forms.newAddress.btnSave;
    state.btnClear = document.forms.newAddress.btnClear;

    state.errorCep = document.querySelector('[data-error="cep"]')
    state.errorNumber = document.querySelector('[data-error="number"]')

    console.log(state)
}