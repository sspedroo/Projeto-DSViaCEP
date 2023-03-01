import * as requestService from "./request-service.js";
import Address from "../models/address.js";

export async function findByCep(cep){
    const url = `https://viacep.com.br/ws/${cep}/json/`; //interpolando o parametro cep na url
    const result = await requestService.getJson(url); //passando a var url como paramentro na função
    const address = new Address(result.cep, result.logradouro, null, result.localidade);
    return address;
}

export function getErrors(address){
    const errors = {};

    if (!address.cep || address.cep == ""){
        errors.cep = "Campo Requerido";
    }
    if (!address.number || address.number == ""){
        errors.number = "Campo Requerido";
    }

    return errors;
}