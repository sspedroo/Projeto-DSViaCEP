//modulo/componente responsavel por tratar eventos do usuario
import Address from "../models/address.js";
import * as addressService from "../services/address-service.js";
import * as listController from "./list-controller.js";

function State() {
  //função que vai servir para instanciar um objeto, guardar informações relevantes do modulo
  this.address = new Address();

  this.btnSave = null;
  this.btnClear = null;

  this.inputCep = null;
  this.inputStreet = null;
  this.inputNumber = null;
  this.inputCity = null;

  this.errorCep = null;
  this.errorNumber = null;
}

const state = new State();

export function init() {
  state.inputCep = document.forms.newAddress.cep; //acessando o formulario utilizando o nome do formulario e logo dps o nome do campo CEP
  state.inputStreet = document.forms.newAddress.street; //nomes do atributo name
  state.inputNumber = document.forms.newAddress.number;
  state.inputCity = document.forms.newAddress.city;

  state.btnSave = document.forms.newAddress.btnSave;
  state.btnClear = document.forms.newAddress.btnClear;

  state.errorCep = document.querySelector('[data-error="cep"]');
  state.errorNumber = document.querySelector('[data-error="number"]');

  state.inputNumber.addEventListener("change", handleInputNumberChange); //campo numero
  state.inputNumber.addEventListener("keyup", handleInputNumberKeyup);
  state.btnClear.addEventListener("click", handleBtnClearClick); // botao limpar
  state.btnSave.addEventListener("click", handleBtnSaveClick); //botao salvar
  state.inputCep.addEventListener("change", handleInputCepChange); //campo cep
}

function handleInputNumberKeyup(event) {
  state.address.number = event.target.value; //pegando o valor do campo number e salvando no address.number
}

async function handleInputCepChange(event) {
  const cep = event.target.value;
  try {
    const address = await addressService.findByCep(cep); //chamando a função do addressService
    state.inputCity.value = address.city; //o valor do input recebe o address.city q [e uma informação recebida na função find.byCep q a const address recebeu
    state.inputStreet.value = address.street; //
    state.address = address;
    setFormError("cep", "");
    state.inputNumber.focus();
  } catch (e) {
    state.inputStreet.value = "";
    state.inputCity.value = "";
    setFormError("cep", "Informe um CEP válido");
  }
}

function handleBtnSaveClick(event) {
  event.preventDefault();

  const errors = addressService.getErrors(state.address);

  const keys = Object.keys(errors);

  if (keys.length > 0) {
    keys.forEach((key) => {
      setFormError(key, errors[key]);
    });
  } else {
    listController.addCard(state.address);
    clearForm();
  }
}

function handleInputNumberChange(event) {
  if (event.target.value == "") {
    setFormError("number", "Campo Requerido");
  } else {
    setFormError("number", "");
  }
}

function handleBtnClearClick(event) {
  event.preventDefault();
  clearForm();
}

function clearForm() {
  state.inputCep.value = "";
  state.inputCity.value = "";
  state.inputNumber.value = "";
  state.inputStreet.value = "";

  setFormError("cep", "");
  setFormError("number", "");
  state.address = new Address();
  state.inputCep.focus();
}

function setFormError(key, value) {
  //
  const element = document.querySelector(`[data-error="${key}"]`);
  element.innerHTML = value;
}
